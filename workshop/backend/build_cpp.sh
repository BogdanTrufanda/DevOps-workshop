#!/bin/bash
file_path=$1
g++ $1 -o "$1.o"
echo "$1.o"