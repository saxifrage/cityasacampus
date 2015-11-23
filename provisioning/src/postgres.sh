#!/bin/bash

if !(which psql >/dev/null); then
  sudo apt-get install -y \
    postgresql \
    libpq-dev \
    postgresql-contrib \
    postgresql-common

  pass=`cat /dev/urandom | tr -cd 'a-f0-9' | head -c 16`

  echo "CREATE ROLE $USER WITH PASSWORD '$pass' LOGIN SUPERUSER;" | sudo -u postgres psql
  sudo su postgres -c "createdb learn_prod --owner '$USER'"
  sudo service postgresql reload

  sudo bash -c "echo \"export APP_DATABASE_USER=$USER\" >> /etc/profile"
  sudo bash -c "echo \"export APP_DATABASE_PASS=$pass\" >> /etc/profile"
  source /etc/profile
fi
