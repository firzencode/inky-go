#!/bin/bash
rm -rf ./build
rm -rf ./dist
pyinstaller -F main.py -i ./favicon.ico -w -n "Inky Go"
# pyinstaller ./main.spec