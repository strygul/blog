# Image metadata removal: final fix report

Fix base reviewed: `855e9f6ee47edc96053e2c54ef4a9ff897a40962`.

## Root cause and TDD evidence

The original implementation treated `metadata-free` as safe after
`mkdir(exist_ok=True)`, which follows an existing directory symlink. It also
passed image paths directly to ExifTool, allowing a filename beginning with a
hyphen to be parsed as an option. Filesystem operations and process launch
were not translated into the command-line error type.

Regression tests were added before production changes. The test doubles the
external ExifTool executable only; filesystem setup and the command-line
wrapper run for real. The test that proves output-symlink safety keeps both
the scanned folder and the external target under its test-owned temporary
root.

RED command:

```sh
python3 -m unittest tests/test_remove_image_metadata.py -v
```

Relevant RED result: 18 tests ran with 4 failures and 3 errors. The exact
argument assertion showed the missing `--`; the leading-hyphen image was
rejected as an option; a regular-file `metadata-free` path emitted a Python
traceback; an output symlink was accepted; and enumeration, output-creation,
and launch errors escaped as raw `OSError` subclasses.

GREEN command:

```sh
python3 -m unittest tests/test_remove_image_metadata.py -v
```

Result: 18 tests ran, all passed.

## Findings disposition

1. **Important: unsafe output destination.** Addressed. `prepare_output_directory`
   inspects `metadata-free` with `lstat`, rejects symlinks and all non-directory
   entries, and wraps inspection/creation errors as `MetadataRemovalError`.
   The CLI test proves a sentinel in an external symlink target stays untouched;
   another proves a regular-file destination yields the documented `Error:` form.

2. **Important: leading-hyphen image filename.** Addressed. The command now puts
   `--` between the output arguments and source images. The fake ExifTool parser,
   exact argument assertion, and `-portrait.jpg` integration regression cover the
   behavior.

3. **Important: unsafe test fixture outside its temporary directory.** Addressed.
   The input-symlink scan fixture now creates its outside file inside the test's
   own temporary directory and relies on automatic `TemporaryDirectory` cleanup.

4. **Important: contextual operational errors.** Addressed. Folder access,
   enumeration, output inspection/creation, and ExifTool process-launch failures
   are translated to contextual `MetadataRemovalError` instances. Focused tests
   cover deterministic enumeration, creation, and launch failures; the
   regular-file output conflict verifies the CLI error rendering.

5. **Minor: Unix-specific fake executable and symlink permissions.** Remaining
   concern, documented here by the requested triage. The suite conditionally skips
   the symlink test when symlink creation is unavailable, but the extensionless
   executable fake still targets Unix-like environments. The design does not
   require Windows support, so no platform launcher was added.

6. **Minor: README output wording and supported extensions.** Addressed. The
   README now says `metadata-free` is created if needed and lists all supported
   image extensions.

7. **Ledger: temporary-file isolation.** Addressed by moving the scan-symlink
   fixture's outside file under the owning test temporary directory. No shared or
   fixed external test path remains.

## Final verification

```sh
npm test
```

Passed: metadata suite (18 tests), Astro production build, and Node suite (16
tests). Astro emitted its pre-existing content-collection and unused-import
warnings, but the command exited successfully.

```sh
python3 remove_image_metadata.py --help
git diff --check
```

The help command exited successfully and `git diff --check` produced no output.

## Files changed

- `remove_image_metadata.py`
- `tests/test_remove_image_metadata.py`
- `README.md`
- `.superpowers/sdd/2026-09-02-remove-image-metadata/final-fix-report.md`

## Self-review

Re-read the design specification and every finding after implementation. The
output remains a direct child named `metadata-free`; valid existing directories
are preserved; source images and external symlink targets are not modified;
ExifTool receives filenames only after `--`; and normal error paths are rendered
through the command's `MetadataRemovalError` handler. The only remaining concern
is the explicitly triaged Unix-like test-fixture portability limitation above.
