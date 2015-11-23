#!/bin/bash

if !(which psql >/dev/null); then
  sudo apt-get install -y \
    postgresql \
    libpq-dev \
    postgresql-contrib \
    postgresql-common

  printf "Enter postgres username to create: "; read username
  printf "Enter postgres password for $username: "; read password

  echo "CREATE ROLE $username WITH PASSWORD '$password' LOGIN SUPERUSER;" | sudo -u postgres psql
  sudo su postgres -c "createdb learn_prod --owner '$1'"
  sudo service postgresql reload

  sudo bash -c "echo \"export APP_DATABASE_USER=$1\" >> /etc/profile"
  sudo bash -c "echo \"export APP_DATABASE_PASS=$2\" >> /etc/profile"
  source /etc/profile
fi
