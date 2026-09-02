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
        if entry.is_symlink():
            skipped_files += 1
        elif entry.is_dir():
            skipped_directories += 1
        elif entry.is_file() and entry.suffix.lower() in SUPPORTED_EXTENSIONS:
            images.append(entry)
        elif entry.is_file():
            skipped_files += 1

    return ScanResult(tuple(images), skipped_files, skipped_directories)
