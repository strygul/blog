import tempfile
import unittest
from pathlib import Path

import remove_image_metadata


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
        outside = Path(self.temporary_directory.name).parent / "outside.jpg"
        outside.write_bytes(b"outside fixture")
        try:
            (self.folder / "linked.jpg").symlink_to(outside)

            result = remove_image_metadata.scan_folder(self.folder)

            self.assertEqual(result.images, ())
            self.assertEqual(result.skipped_files, 1)
        finally:
            outside.unlink()


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
