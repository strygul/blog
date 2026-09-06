# Image Metadata Removal Script Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a safe command-line script that strips removable metadata from root-level images into a `metadata-free` child directory while preserving every source file.

**Architecture:** A single Python 3 utility owns folder validation, non-recursive image selection, ExifTool discovery, subprocess execution, and concise CLI reporting. Standard-library `unittest` tests exercise pure scanning logic and run the real wrapper process against a narrow fake ExifTool executable at the external-process boundary.

**Tech Stack:** Python 3 standard library, ExifTool CLI, `unittest`, npm scripts

**Spec:** `docs/superpowers/specs/2026-09-02-remove-image-metadata-design.md`

## Global Constraints

- Accept exactly one positional folder path.
- Inspect regular files directly inside that folder only; never recurse.
- Write output only to a `metadata-free` child directory.
- Never modify or overwrite a source image.
- Support `.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`, `.tif`, `.tiff`, `.heic`, `.heif`, and `.avif`, case-insensitively.
- Invoke ExifTool with `-all=`, `-jumbf:all=`, and `-o`; never invoke through a shell.
- Do not create the output directory when no supported images exist.
- Exit non-zero for invalid input, missing ExifTool, no images, or ExifTool failure.
- Use only the Python standard library in the wrapper and its tests.

---

### Task 1: Folder Validation and Non-Recursive Image Selection

**Files:**
- Create: `remove_image_metadata.py`
- Create: `tests/test_remove_image_metadata.py`

**Interfaces:**
- Consumes: `pathlib.Path`
- Produces: `MetadataRemovalError`, `ScanResult`, `validate_folder(folder: Path) -> None`, and `scan_folder(folder: Path) -> ScanResult`

- [ ] **Step 1: Write failing tests for supported root-level selection**

Create `tests/test_remove_image_metadata.py` with expectations derived from literal file names:

```python
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
```

Production mutations caught: dropping an extension, matching extensions case-sensitively, recursing into a child directory, treating unsupported files as images, losing deterministic ordering, or accepting an invalid input path.

- [ ] **Step 2: Run the tests and verify the expected RED state**

Run:

```sh
python3 -m unittest tests/test_remove_image_metadata.py -v
```

Expected: FAIL with `ModuleNotFoundError: No module named 'remove_image_metadata'`.

- [ ] **Step 3: Implement validation and scanning only**

Create `remove_image_metadata.py`:

```python
#!/usr/bin/env python3
"""Create metadata-free copies of root-level images using ExifTool."""

from dataclasses import dataclass
from pathlib import Path


SUPPORTED_EXTENSIONS = frozenset(
    {
        ".jpg",
        ".jpeg",
        ".png",
        ".webp",
        ".gif",
        ".tif",
        ".tiff",
        ".heic",
        ".heif",
        ".avif",
    }
)
OUTPUT_DIRECTORY_NAME = "metadata-free"


class MetadataRemovalError(Exception):
    """Raised when metadata removal cannot be completed safely."""


@dataclass(frozen=True)
class ScanResult:
    images: tuple[Path, ...]
    skipped_files: int
    skipped_directories: int


def validate_folder(folder: Path) -> None:
    if not folder.exists():
        raise MetadataRemovalError(f"Folder does not exist: {folder}")
    if not folder.is_dir():
        raise MetadataRemovalError(f"Path is not a directory: {folder}")


def scan_folder(folder: Path) -> ScanResult:
    images = []
    skipped_files = 0
    skipped_directories = 0

    for entry in sorted(folder.iterdir(), key=lambda path: path.name.casefold()):
        if entry.is_dir():
            skipped_directories += 1
        elif entry.is_file() and entry.suffix.lower() in SUPPORTED_EXTENSIONS:
            images.append(entry)
        elif entry.is_file():
            skipped_files += 1

    return ScanResult(tuple(images), skipped_files, skipped_directories)
```

- [ ] **Step 4: Run the focused tests and verify GREEN**

Run:

```sh
python3 -m unittest tests/test_remove_image_metadata.py -v
```

Expected: all four tests PASS with no warnings or tracebacks.

- [ ] **Step 5: Commit the scanning boundary**

```sh
git add remove_image_metadata.py tests/test_remove_image_metadata.py
git commit -m "Add root-level image selection"
```

---

### Task 2: ExifTool Execution and Command-Line Behavior

**Files:**
- Modify: `remove_image_metadata.py`
- Modify: `tests/test_remove_image_metadata.py`

**Interfaces:**
- Consumes: `ScanResult`, `OUTPUT_DIRECTORY_NAME`, an `exiftool` executable on `PATH`, and one folder path from the CLI
- Produces: `ProcessingResult`, `remove_metadata(folder: Path) -> ProcessingResult`, `build_parser() -> argparse.ArgumentParser`, and `main(argv: list[str] | None = None) -> int`

- [ ] **Step 1: Add a focused fake for the external ExifTool process**

Append these imports and the test class to `tests/test_remove_image_metadata.py`. The fake earns its place because ExifTool is an external executable not installed by the repository; the real Python wrapper, filesystem, process launch, arguments, exit status, stdout, and stderr remain exercised.

```python
import json
import os
import subprocess
import sys


SCRIPT = Path(__file__).resolve().parents[1] / "remove_image_metadata.py"


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
for source_name in arguments[output_flag_index + 2:]:
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
```

- [ ] **Step 2: Write failing tests for successful copying and safe arguments**

Add this test to `CommandLineTests`:

```python
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
                str(image),
            ],
        )
```

Production mutations caught: omitting output creation, passing nested or unsupported files, modifying a source, misreporting counts, constructing a shell command, or omitting/reordering required ExifTool flags.

- [ ] **Step 3: Run the new test and verify RED**

Run both new tests:

```sh
python3 -m unittest tests.test_remove_image_metadata.CommandLineTests -v
```

Expected: both FAIL because the script has no CLI entry point, creates no output directory, and never invokes the fake ExifTool.

- [ ] **Step 4: Implement the ExifTool process and CLI success path**

Add the imports, result type, functions, and entry point below to `remove_image_metadata.py`:

```python
import argparse
import os
import shutil
import subprocess
import sys


@dataclass(frozen=True)
class ProcessingResult:
    output_directory: Path
    cleaned_images: int
    skipped_files: int
    skipped_directories: int


def find_exiftool() -> str | None:
    return shutil.which("exiftool")


def remove_metadata(folder: Path) -> ProcessingResult:
    scan = scan_folder(folder)
    output_directory = folder / OUTPUT_DIRECTORY_NAME
    output_directory.mkdir(exist_ok=True)
    command = [
        find_exiftool(),
        "-all=",
        "-jumbf:all=",
        "-o",
        f"{output_directory}{os.sep}",
        *(str(image) for image in scan.images),
    ]
    subprocess.run(
        command,
        capture_output=True,
        text=True,
        check=False,
    )

    return ProcessingResult(
        output_directory=output_directory,
        cleaned_images=len(scan.images),
        skipped_files=scan.skipped_files,
        skipped_directories=scan.skipped_directories,
    )


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description=(
            "Create metadata-free copies of root-level images using ExifTool."
        )
    )
    parser.add_argument("folder", type=Path, help="folder containing the images")
    return parser


def main(argv: list[str] | None = None) -> int:
    args = build_parser().parse_args(argv)
    result = remove_metadata(args.folder)

    print(f"Cleaned {result.cleaned_images} images into: {result.output_directory}")
    print(
        f"Skipped {result.skipped_files} unsupported file(s) and "
        f"{result.skipped_directories} child directory/directories."
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
```

- [ ] **Step 5: Run the success-path test and verify GREEN**

Run:

```sh
python3 -m unittest tests.test_remove_image_metadata.CommandLineTests -v
```

Expected: both tests PASS.

- [ ] **Step 6: Write failing tests for validation and external failures**

Add the following tests to `CommandLineTests`:

```python
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
```

Production mutations caught: output creation before dependency/no-image validation, swallowed dependency/process failures, invoking ExifTool for invalid input, or allowing an existing cleaned copy to be replaced.

- [ ] **Step 7: Run the expanded tests and inspect the RED state**

Run:

```sh
python3 -m unittest tests/test_remove_image_metadata.py -v
```

Expected failures:

- missing ExifTool creates the output directory before the process launch fails;
- no-image input returns success and creates an empty output directory;
- a missing folder raises an uncaught filesystem error instead of the domain error;
- fake ExifTool exit code `7` is ignored and the wrapper returns success.
- an existing destination triggers fake ExifTool exit code `1`, which the wrapper ignores.

- [ ] **Step 8: Implement only the demonstrated validation and failure handling**

Replace `find_exiftool`, `remove_metadata`, and `main` with these guarded versions; keep `ProcessingResult` and `build_parser` unchanged:

```python
def find_exiftool() -> str:
    executable = shutil.which("exiftool")
    if executable is None:
        raise MetadataRemovalError(
            "ExifTool is required but was not found on PATH. "
            "Install it from https://exiftool.org/ and try again."
        )
    return executable


def remove_metadata(folder: Path) -> ProcessingResult:
    validate_folder(folder)
    executable = find_exiftool()
    scan = scan_folder(folder)
    if not scan.images:
        raise MetadataRemovalError(f"No supported images found in: {folder}")

    output_directory = folder / OUTPUT_DIRECTORY_NAME
    output_directory.mkdir(exist_ok=True)
    command = [
        executable,
        "-all=",
        "-jumbf:all=",
        "-o",
        f"{output_directory}{os.sep}",
        *(str(image) for image in scan.images),
    ]
    completed = subprocess.run(
        command,
        capture_output=True,
        text=True,
        check=False,
    )
    if completed.returncode != 0:
        details = completed.stderr.strip() or completed.stdout.strip()
        message = "ExifTool failed while processing the images."
        if details:
            message = f"{message}\n{details}"
        raise MetadataRemovalError(message)

    return ProcessingResult(
        output_directory=output_directory,
        cleaned_images=len(scan.images),
        skipped_files=scan.skipped_files,
        skipped_directories=scan.skipped_directories,
    )


def main(argv: list[str] | None = None) -> int:
    args = build_parser().parse_args(argv)
    try:
        result = remove_metadata(args.folder)
    except MetadataRemovalError as error:
        print(f"Error: {error}", file=sys.stderr)
        return 1

    print(f"Cleaned {result.cleaned_images} images into: {result.output_directory}")
    print(
        f"Skipped {result.skipped_files} unsupported file(s) and "
        f"{result.skipped_directories} child directory/directories."
    )
    return 0
```

Do not add recursive processing, overwrite flags, optional output names, or new dependencies.

- [ ] **Step 9: Run the complete Python test file and verify GREEN**

Run:

```sh
python3 -m unittest tests/test_remove_image_metadata.py -v
```

Expected: all tests PASS with no warnings or tracebacks.

- [ ] **Step 10: Commit the working command-line utility**

```sh
git add remove_image_metadata.py tests/test_remove_image_metadata.py
git commit -m "Add ExifTool metadata removal script"
```

---

### Task 3: Repository Test Integration and User Documentation

**Files:**
- Modify: `package.json`
- Modify: `README.md`

**Interfaces:**
- Consumes: `tests/test_remove_image_metadata.py` and `remove_image_metadata.py`
- Produces: `npm run test:metadata`, an updated aggregate `npm test`, and copy-paste usage instructions

- [ ] **Step 1: Add the Python test command to the normal repository checks**

Update `package.json` scripts to retain all existing checks and include the utility tests:

```json
"scripts": {
  "dev": "astro dev",
  "build": "astro build",
  "test:metadata": "python3 -m unittest tests/test_remove_image_metadata.py -v",
  "test": "npm run test:metadata && npm run build && node --test tests/*.test.mjs",
  "preview": "astro preview",
  "astro": "astro"
}
```

- [ ] **Step 2: Verify the focused npm entry point**

Run:

```sh
npm run test:metadata
```

Expected: all metadata-removal tests PASS.

- [ ] **Step 3: Document prerequisites, safety behavior, and usage**

Add this section to `README.md` after the Commands table:

````markdown
## Remove image metadata

Install [ExifTool](https://exiftool.org/) and make sure the `exiftool`
command is available on your `PATH`. Then run:

```sh
python3 remove_image_metadata.py /path/to/pictures
```

The script processes supported images directly inside the supplied folder
and writes cleaned copies to a new `metadata-free` child folder. It does
not recurse into subfolders, modify source images, or overwrite existing
cleaned copies.
````

- [ ] **Step 4: Run all repository verification**

Run:

```sh
npm test
```

Expected: Python utility tests PASS, the Astro production build completes successfully, and every Node test passes.

- [ ] **Step 5: Check formatting and the final change set**

Run:

```sh
git diff --check
git status --short
```

Expected: `git diff --check` produces no output. Status shows only the intended implementation-plan, script, test, package, and README changes not already committed by earlier tasks.

- [ ] **Step 6: Commit repository integration and documentation**

```sh
git add package.json README.md docs/superpowers/plans/2026-09-02-remove-image-metadata.md
git commit -m "Document image metadata removal workflow"
```

---

## Final Verification

- [ ] Run `python3 remove_image_metadata.py --help` and confirm it documents the required folder argument.
- [ ] Run `npm test` once more from a clean prompt and confirm every check passes.
- [ ] Run `git status --short` and confirm no intended change is left uncommitted.
- [ ] If a real `exiftool` is available, create a disposable fixture containing known EXIF and C2PA/JUMBF metadata, run the script, and verify the copied image with `exiftool -G -a -s metadata-free/<name>`. Do not alter a repository asset for this optional integration check.
