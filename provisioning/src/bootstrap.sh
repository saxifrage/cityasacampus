#!/bin/bash
set -e

BRANCH=deployment
URL="https://raw.githubusercontent.com/saxifrage/cityasacampus/$BRANCH/provisioning/src/bootstrap.sh"

_recurse() {
  pass=`cat /dev/urandom | tr -cd 'a-f0-9' | head -c 8`
  echo "You are root. Setting up a caac user with password '$pass' ..."
  useradd -m caac -G sudo
  echo "caac:$pass" | chpasswd
  curl $URL | sudo -Hu caac bash
}

_install() {
  echo "Installing as $(whoami) ..."
  echo "Installing to $(echo ~)/cityasacampus ..."
  sudo apt-get update -y
  sudo apt-get install -y git-core
  git clone https://github.com/saxifrage/cityasacampus.git ~/cityasacampus
  cd ~/cityasacampus/provisioning
  git checkout $BRANCH
  ./src/install.sh
}

if [ "$(id -u)" == "0" ]; then
  _recurse
else
  _install
fi
