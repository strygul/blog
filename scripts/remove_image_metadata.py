#!/usr/bin/env python3
"""Create metadata-free copies of root-level images using ExifTool."""

import argparse
from dataclasses import dataclass
import os
from pathlib import Path
import shutil
import stat
import subprocess
import sys


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


@dataclass(frozen=True)
class ProcessingResult:
    output_directory: Path
    cleaned_images: int
    skipped_files: int
    skipped_directories: int


def validate_folder(folder: Path) -> None:
    try:
        if not folder.exists():
            raise MetadataRemovalError(f"Folder does not exist: {folder}")
        if not folder.is_dir():
            raise MetadataRemovalError(f"Path is not a directory: {folder}")
    except OSError as error:
        raise MetadataRemovalError(f"Unable to access folder {folder}: {error}") from error


def scan_folder(folder: Path) -> ScanResult:
    images = []
    skipped_files = 0
    skipped_directories = 0

    try:
        for entry in sorted(folder.iterdir(), key=lambda path: path.name.casefold()):
            if entry.is_symlink():
                skipped_files += 1
            elif entry.is_dir():
                skipped_directories += 1
            elif entry.is_file() and entry.suffix.lower() in SUPPORTED_EXTENSIONS:
                images.append(entry)
            elif entry.is_file():
                skipped_files += 1
    except OSError as error:
        raise MetadataRemovalError(f"Unable to scan folder {folder}: {error}") from error

    return ScanResult(tuple(images), skipped_files, skipped_directories)


def find_exiftool() -> str:
    executable = shutil.which("exiftool")
    if executable is None:
        raise MetadataRemovalError(
            "ExifTool is required but was not found on PATH. "
            "Install it from https://exiftool.org/ and try again."
        )
    return executable


def prepare_output_directory(folder: Path) -> Path:
    output_directory = folder / OUTPUT_DIRECTORY_NAME
    try:
        output_status = output_directory.lstat()
    except FileNotFoundError:
        try:
            output_directory.mkdir()
            output_status = output_directory.lstat()
        except OSError as error:
            raise MetadataRemovalError(
                f"Unable to create output directory {output_directory}: {error}"
            ) from error
    except OSError as error:
        raise MetadataRemovalError(
            f"Unable to inspect output path {output_directory}: {error}"
        ) from error

    if stat.S_ISLNK(output_status.st_mode):
        raise MetadataRemovalError(f"Output path must not be a symlink: {output_directory}")
    if not stat.S_ISDIR(output_status.st_mode):
        raise MetadataRemovalError(f"Output path is not a directory: {output_directory}")

    return output_directory


def remove_metadata(folder: Path) -> ProcessingResult:
    validate_folder(folder)
    executable = find_exiftool()
    scan = scan_folder(folder)
    if not scan.images:
        raise MetadataRemovalError(f"No supported images found in: {folder}")

    output_directory = prepare_output_directory(folder)
    command = [
        executable,
        "-all=",
        "-jumbf:all=",
        "-o",
        f"{output_directory}{os.sep}",
        "--",
        *(str(image) for image in scan.images),
    ]
    try:
        completed = subprocess.run(
            command,
            capture_output=True,
            text=True,
            check=False,
        )
    except OSError as error:
        raise MetadataRemovalError(f"Unable to start ExifTool: {error}") from error
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


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="Create metadata-free copies of root-level images using ExifTool."
    )
    parser.add_argument("folder", type=Path, help="folder containing the images")
    return parser


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


if __name__ == "__main__":
    raise SystemExit(main())
