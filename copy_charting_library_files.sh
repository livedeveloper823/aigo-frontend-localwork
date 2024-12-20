#!/bin/sh

remove_if_directory_exists() {
	if [ -d "$1" ]; then rm -Rf "$1"; fi
}

create_if_directory_does_not_exists() {
	if [ ! -d "$1" ]; then mkdir "$1"; fi
}

BRANCH="master";

REPOSITORY='https://github.com/tradingview/charting_library/'

LATEST_HASH=$(git ls-remote $REPOSITORY $BRANCH | grep -Eo '^[[:alnum:]]+')

remove_if_directory_exists "$LATEST_HASH"

git clone -q --depth 1 -b "$BRANCH" $REPOSITORY "$LATEST_HASH"