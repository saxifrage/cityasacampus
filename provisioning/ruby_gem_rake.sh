#!/bin/bash

if !(which ruby >/dev/null); then
  cd /tmp
  wget http://ftp.ruby-lang.org/pub/ruby/2.1/ruby-2.1.5.tar.gz 
  tar -xvzf ruby-2.1.5.tar.gz
  cd ruby-2.1.5/
  sudo ./configure --prefix=/usr/local
  sudo make
  sudo make install
fi