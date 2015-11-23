#!/bin/bash

if [ ! -d "/home/{{home_user}}/cityasacampus" ]; then
  sudo apt-get update -y

  sudo apt-get install -y \
    build-essential\
    python-software-properties \
    curl \
    sqlite3 \
    libsqlite3-dev \
    libxml2-dev \
    libxslt1-dev \
    libreadline-dev \
    libyaml-dev \
    libcurl4-openssl-dev \
    libncurses5-dev \
    libgdbm-dev \
    libffi-dev \
    zlib1g-dev \
    libssl-dev
fi