# Image Metadata Removal Script Design

## Purpose

Add a command-line utility that accepts a folder path, finds supported images directly inside that folder, and writes metadata-free copies to a child folder. Source files and nested folders remain untouched.

## Command-Line Interface

The script will live at the repository root as `remove_image_metadata.py` and run with Python 3:

```sh
python3 remove_image_metadata.py /path/to/pictures
```

The positional argument must identify an existing directory. The output directory is always named `metadata-free` and is created directly inside the supplied directory.

## Image Selection

Selection is non-recursive. The script examines only regular files directly inside the supplied directory and matches extensions case-insensitively.

Supported extensions are:

- `.jpg` and `.jpeg`
- `.png`
- `.webp`
- `.gif`
- `.tif` and `.tiff`
- `.heic` and `.heif`
- `.avif`

Other files and all child directories are skipped. If no supported images are found, the script exits with an error and does not create an output directory.

## Metadata Removal

The script delegates metadata removal to the `exiftool` executable. It invokes ExifTool with `-all=` to delete all removable metadata and `-jumbf:all=` to explicitly remove C2PA/JUMBF provenance metadata. It passes `-o` with the output directory so ExifTool creates cleaned copies rather than modifying source files.

ExifTool may retain structural data that is required to decode or render an image. It does not recompress the encoded image data when rewriting metadata, so image quality is preserved.

The wrapper passes file paths as subprocess arguments rather than constructing a shell command. This supports spaces and shell-sensitive characters safely.

## Existing Output

The output directory may already exist. ExifTool's `-o` behavior does not overwrite an existing destination file. If a destination name conflicts, ExifTool reports the failure and leaves both files unchanged.

This permits adding newly cleaned images on later runs without silently replacing previous results.

## Errors and Reporting

Before scanning, the script verifies that:

- the supplied path exists and is a directory;
- `exiftool` is available on `PATH`.

Missing ExifTool produces an actionable installation message. Invalid input, no supported images, or any ExifTool failure produces a non-zero exit code.

On success, the script reports the number of cleaned images and the output directory. It also reports the number of unsupported root-level files and child directories that were skipped. ExifTool diagnostics are surfaced when processing fails.

## Testing

Tests use Python's standard-library `unittest` framework. They cover:

- case-insensitive selection of each supported extension;
- exclusion of unsupported files and nested images;
- rejection of missing and non-directory input paths;
- the no-images case without creating an output directory;
- missing-ExifTool handling;
- exact ExifTool arguments, including paths containing spaces;
- output directory creation;
- propagation of ExifTool failures;
- success and skip-count reporting.

The subprocess boundary is exercised with a temporary fake `exiftool` executable because ExifTool is an external system dependency and is not installed in the repository. The repository's existing test command will include these Python tests so the utility remains covered by normal verification.
