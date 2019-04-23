#!/usr/bin/env python
import json
import os
import sys


ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
PACKAGES_PATH = os.path.join(ROOT, "packages")


def main():
    tag = os.getenv("CIRCLE_TAG")

    ls = sorted(os.listdir(PACKAGES_PATH))

    packages = [p for p in ls if os.path.isdir(os.path.join(PACKAGES_PATH, p))]

    mismatches = []
    for package in sorted(packages):
        with open(os.path.join(PACKAGES_PATH, package, "package.json"), "r") as f:
            package_json = json.load(f)
        if tag != "v{}".format(package_json.get("version")):
            mismatches.append(package)

    for package in mismatches:
        info = "Git tag: {0} does not match the version of this package: {1}\n"
        sys.stderr.write(info.format(tag, package))

    if mismatches:
        return 1

    return 0


if __name__ == "__main__":
    sys.exit(main())
