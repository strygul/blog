import json
import os
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path
from unittest import mock

import remove_image_metadata


SCRIPT = Path(__file__).resolve().parents[1] / "remove_image_metadata.py"


class ScanFolderTests(unittest.TestCase):
    def setUp(self):
        self.temporary_directory = tempfile.TemporaryDirectory()
        self.folder = Path(self.temporary_directory.name)

    def tearDown(self):
        self.temporary_directory.cleanup()

    def test_selects_supported_extensions_case_insensitively(self):
        supported_names = {
            "one.JPG",
            "two.jpeg",
            "three.PNG",
            "four.webp",
            "five.GIF",
            "six.tif",
            "seven.TIFF",
            "eight.heic",
            "nine.HEIF",
            "ten.avif",
        }
        for name in supported_names:
            (self.folder / name).write_bytes(b"image fixture")
        (self.folder / "notes.txt").write_text("not an image", encoding="utf-8")
        nested = self.folder / "nested"
        nested.mkdir()
        (nested / "hidden.jpg").write_bytes(b"nested fixture")

        result = remove_image_metadata.scan_folder(self.folder)

        self.assertEqual({path.name for path in result.images}, supported_names)
        self.assertEqual(result.skipped_files, 1)
        self.assertEqual(result.skipped_directories, 1)

    def test_returns_images_in_stable_name_order(self):
        for name in ("z.jpg", "A.jpg", "m.jpg"):
            (self.folder / name).write_bytes(b"image fixture")

        result = remove_image_metadata.scan_folder(self.folder)

        self.assertEqual(
            [path.name for path in result.images],
            ["A.jpg", "m.jpg", "z.jpg"],
        )

    def test_skips_image_symlinks(self):
        outside_directory = self.folder / "outside"
        outside_directory.mkdir()
        outside = outside_directory / "outside.jpg"
        outside.write_bytes(b"outside fixture")

        (self.folder / "linked.jpg").symlink_to(outside)

        result = remove_image_metadata.scan_folder(self.folder)

        self.assertEqual(result.images, ())
        self.assertEqual(result.skipped_files, 1)


class ValidateFolderTests(unittest.TestCase):
    def test_rejects_a_missing_path(self):
        with tempfile.TemporaryDirectory() as temporary_directory:
            missing = Path(temporary_directory) / "missing"

            with self.assertRaisesRegex(
                remove_image_metadata.MetadataRemovalError,
                "Folder does not exist",
            ):
                remove_image_metadata.validate_folder(missing)

    def test_rejects_a_file_path(self):
        with tempfile.TemporaryDirectory() as temporary_directory:
            file_path = Path(temporary_directory) / "photo.jpg"
            file_path.write_bytes(b"image fixture")

            with self.assertRaisesRegex(
                remove_image_metadata.MetadataRemovalError,
                "Path is not a directory",
            ):
                remove_image_metadata.validate_folder(file_path)


class OperationalErrorTests(unittest.TestCase):
    def setUp(self):
        self.temporary_directory = tempfile.TemporaryDirectory()
        self.folder = Path(self.temporary_directory.name)
        (self.folder / "one.jpg").write_bytes(b"image fixture")

    def tearDown(self):
        self.temporary_directory.cleanup()

    def test_wraps_directory_enumeration_failures(self):
        with (
            mock.patch("remove_image_metadata.find_exiftool", return_value="exiftool"),
            mock.patch.object(Path, "iterdir", side_effect=PermissionError("denied")),
            self.assertRaisesRegex(
                remove_image_metadata.MetadataRemovalError,
                "Unable to scan folder.*denied",
            ),
        ):
            remove_image_metadata.remove_metadata(self.folder)

    def test_wraps_output_directory_creation_failures(self):
        with (
            mock.patch("remove_image_metadata.find_exiftool", return_value="exiftool"),
            mock.patch.object(Path, "mkdir", side_effect=PermissionError("denied")),
            self.assertRaisesRegex(
                remove_image_metadata.MetadataRemovalError,
                "Unable to create output directory.*denied",
            ),
        ):
            remove_image_metadata.remove_metadata(self.folder)

    def test_wraps_exiftool_launch_failures(self):
        with (
            mock.patch("remove_image_metadata.find_exiftool", return_value="exiftool"),
            mock.patch(
                "remove_image_metadata.subprocess.run",
                side_effect=FileNotFoundError("exiftool disappeared"),
            ),
            self.assertRaisesRegex(
                remove_image_metadata.MetadataRemovalError,
                "Unable to start ExifTool.*exiftool disappeared",
            ),
        ):
            remove_image_metadata.remove_metadata(self.folder)


class CommandLineTests(unittest.TestCase):
    def setUp(self):
        self.temporary_directory = tempfile.TemporaryDirectory()
        self.root = Path(self.temporary_directory.name)
        self.bin_directory = self.root / "bin"
        self.bin_directory.mkdir()
        self.exiftool = self.bin_directory / "exiftool"
        self.exiftool.write_text(
            """#!/usr/bin/env python3
import json
import os
import shutil
import sys
from pathlib import Path

arguments = sys.argv[1:]
capture_path = os.environ.get("FAKE_EXIFTOOL_CAPTURE")
if capture_path:
    Path(capture_path).write_text(json.dumps(arguments), encoding="utf-8")

exit_code = int(os.environ.get("FAKE_EXIFTOOL_EXIT", "0"))
if exit_code:
    print("synthetic ExifTool failure", file=sys.stderr)
    raise SystemExit(exit_code)

output_flag_index = arguments.index("-o")
output_directory = Path(arguments[output_flag_index + 1])
source_arguments = arguments[output_flag_index + 2:]
if source_arguments and source_arguments[0] == "--":
    source_arguments = source_arguments[1:]
elif any(Path(source_name).name.startswith("-") for source_name in source_arguments):
    print("filename was interpreted as an option", file=sys.stderr)
    raise SystemExit(1)

for source_name in source_arguments:
    source = Path(source_name)
    destination = output_directory / source.name
    if destination.exists():
        print(f"destination exists: {destination}", file=sys.stderr)
        raise SystemExit(1)
    shutil.copyfile(source, destination)
""",
            encoding="utf-8",
        )
        self.exiftool.chmod(0o755)
        self.environment = os.environ.copy()
        self.environment["PATH"] = (
            f"{self.bin_directory}{os.pathsep}{self.environment.get('PATH', '')}"
        )

    def tearDown(self):
        self.temporary_directory.cleanup()

    def run_script(self, folder, *, environment=None):
        return subprocess.run(
            [sys.executable, str(SCRIPT), str(folder)],
            capture_output=True,
            text=True,
            env=environment or self.environment,
            check=False,
        )

    def test_creates_cleaned_root_level_copies_and_reports_skips(self):
        pictures = self.root / "pictures"
        pictures.mkdir()
        (pictures / "one.jpg").write_bytes(b"first image")
        (pictures / "two.PNG").write_bytes(b"second image")
        (pictures / "notes.txt").write_text("not an image", encoding="utf-8")
        nested = pictures / "nested"
        nested.mkdir()
        (nested / "hidden.jpg").write_bytes(b"nested image")

        completed = self.run_script(pictures)

        self.assertEqual(completed.returncode, 0, completed.stderr)
        output_directory = pictures / "metadata-free"
        self.assertEqual(
            {path.name for path in output_directory.iterdir()},
            {"one.jpg", "two.PNG"},
        )
        self.assertEqual((pictures / "one.jpg").read_bytes(), b"first image")
        self.assertEqual((pictures / "two.PNG").read_bytes(), b"second image")
        self.assertIn("Cleaned 2 images", completed.stdout)
        self.assertIn("Skipped 1 unsupported file", completed.stdout)
        self.assertIn("1 child directory", completed.stdout)

    def test_passes_safe_exact_arguments_for_a_path_with_spaces(self):
        pictures = self.root / "pictures with spaces"
        pictures.mkdir()
        image = pictures / "photo one.JPG"
        image.write_bytes(b"image fixture")
        capture = self.root / "arguments.json"
        environment = self.environment.copy()
        environment["FAKE_EXIFTOOL_CAPTURE"] = str(capture)

        completed = self.run_script(pictures, environment=environment)

        self.assertEqual(completed.returncode, 0, completed.stderr)
        self.assertEqual(
            json.loads(capture.read_text(encoding="utf-8")),
            [
                "-all=",
                "-jumbf:all=",
                "-o",
                f"{pictures / 'metadata-free'}{os.sep}",
                "--",
                str(image),
            ],
        )

    def test_processes_a_leading_hyphen_filename_as_an_image(self):
        pictures = self.root / "pictures"
        pictures.mkdir()
        image = pictures / "-portrait.jpg"
        image.write_bytes(b"image fixture")

        completed = self.run_script(pictures)

        self.assertEqual(completed.returncode, 0, completed.stderr)
        self.assertEqual(
            (pictures / "metadata-free" / "-portrait.jpg").read_bytes(),
            b"image fixture",
        )

    def test_missing_exiftool_fails_without_creating_output(self):
        pictures = self.root / "pictures"
        pictures.mkdir()
        (pictures / "one.jpg").write_bytes(b"image fixture")
        environment = self.environment.copy()
        environment["PATH"] = ""

        completed = self.run_script(pictures, environment=environment)

        self.assertEqual(completed.returncode, 1)
        self.assertIn("ExifTool is required", completed.stderr)
        self.assertFalse((pictures / "metadata-free").exists())

    def test_no_images_fails_without_creating_output(self):
        pictures = self.root / "pictures"
        pictures.mkdir()
        (pictures / "notes.txt").write_text("not an image", encoding="utf-8")

        completed = self.run_script(pictures)

        self.assertEqual(completed.returncode, 1)
        self.assertIn("No supported images", completed.stderr)
        self.assertFalse((pictures / "metadata-free").exists())

    def test_invalid_folder_fails_without_running_exiftool(self):
        missing = self.root / "missing"
        capture = self.root / "arguments.json"
        environment = self.environment.copy()
        environment["FAKE_EXIFTOOL_CAPTURE"] = str(capture)

        completed = self.run_script(missing, environment=environment)

        self.assertEqual(completed.returncode, 1)
        self.assertIn("Folder does not exist", completed.stderr)
        self.assertFalse(capture.exists())

    def test_exiftool_failure_is_reported_and_propagated(self):
        pictures = self.root / "pictures"
        pictures.mkdir()
        (pictures / "one.jpg").write_bytes(b"image fixture")
        environment = self.environment.copy()
        environment["FAKE_EXIFTOOL_EXIT"] = "7"

        completed = self.run_script(pictures, environment=environment)

        self.assertEqual(completed.returncode, 1)
        self.assertIn("ExifTool failed", completed.stderr)
        self.assertIn("synthetic ExifTool failure", completed.stderr)
        self.assertTrue((pictures / "metadata-free").is_dir())
        self.assertEqual(list((pictures / "metadata-free").iterdir()), [])

    def test_existing_cleaned_copy_is_not_overwritten(self):
        pictures = self.root / "pictures"
        pictures.mkdir()
        source = pictures / "one.jpg"
        source.write_bytes(b"new source image")
        output_directory = pictures / "metadata-free"
        output_directory.mkdir()
        existing = output_directory / "one.jpg"
        existing.write_bytes(b"existing cleaned image")

        completed = self.run_script(pictures)

        self.assertEqual(completed.returncode, 1)
        self.assertIn("destination exists", completed.stderr)
        self.assertEqual(source.read_bytes(), b"new source image")
        self.assertEqual(existing.read_bytes(), b"existing cleaned image")

    def test_rejects_an_output_path_that_is_a_regular_file(self):
        pictures = self.root / "pictures"
        pictures.mkdir()
        source = pictures / "one.jpg"
        source.write_bytes(b"source image")
        output_path = pictures / "metadata-free"
        output_path.write_text("not a directory", encoding="utf-8")

        completed = self.run_script(pictures)

        self.assertEqual(completed.returncode, 1)
        self.assertIn("Error: Output path is not a directory", completed.stderr)
        self.assertEqual(source.read_bytes(), b"source image")
        self.assertEqual(output_path.read_text(encoding="utf-8"), "not a directory")

    def test_rejects_an_output_symlink_without_touching_its_target(self):
        pictures = self.root / "pictures"
        pictures.mkdir()
        source = pictures / "one.jpg"
        source.write_bytes(b"source image")
        external_output = self.root / "external-output"
        external_output.mkdir()
        sentinel = external_output / "sentinel.jpg"
        sentinel.write_bytes(b"external data")
        output_link = pictures / "metadata-free"
        try:
            output_link.symlink_to(external_output, target_is_directory=True)
        except OSError as error:
            self.skipTest(f"symlink creation is unavailable: {error}")

        completed = self.run_script(pictures)

        self.assertEqual(completed.returncode, 1)
        self.assertIn("Error: Output path must not be a symlink", completed.stderr)
        self.assertEqual(source.read_bytes(), b"source image")
        self.assertEqual(sentinel.read_bytes(), b"external data")
        self.assertEqual(list(external_output.iterdir()), [sentinel])
