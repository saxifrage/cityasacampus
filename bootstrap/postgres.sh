#!/bin/bash

if !(which psql >/dev/null); then
  echo "Installing Postgresql"
  sudo apt-get install -y \
    postgresql \
    libpq-dev \
    postgresql-contrib \
    postgresql-common

  echo "Creating learn_dev database as superdbuser $(whoami)"
  echo "CREATE ROLE $(whoami) LOGIN SUPERUSER;" | sudo -u postgres psql
  sudo su postgres -c "createdb learn_dev --owner '$(whoami)'"

  echo "Allowing dev environment use passwordless database access"
  sudo mv -f pg_hba.conf /etc/postgresql/9.3/main/

  sudo service postgresql reload
fi