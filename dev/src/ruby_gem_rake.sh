#!/bin/bash

if !(which ruby >/dev/null); then
  echo "Installing Ruby, Gem, and Rake"
  cd /tmp
  wget http://ftp.ruby-lang.org/pub/ruby/2.1/ruby-2.1.4.tar.gz 
  tar -xvzf ruby-2.1.4.tar.gz
  cd ruby-2.1.4/
  sudo ./configure --prefix=/usr/local
  sudo make
  sudo make install
fi
