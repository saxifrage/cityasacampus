# learn

Find our roadmap, documentation, and on-boarding information for contributors at [cityasacampus.org](http://cityasacampus.org)

To edit documentation or the roadmap, switch to the gh-pages branch.

## Join our chat on Gitter

[![Join the chat at https://gitter.im/saxifrage/learn](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/saxifrage/learn?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)
[ ![Codeship Status for saxifrage/learn](https://codeship.com/projects/be3edb90-b14b-0132-d033-3edef27c5b65/status?branch=master)](https://codeship.com/projects/69801)



## Install

###Linux (using apt-get)
```bash
$ sudo su root
$ apt-get update
$ apt-get -y install ruby rubygems-integration
$ apt-get -y install postgresql postgresql-contrib libpq-dev
$ gem install rails
$ vim /etc/postgresql/9.4/main/pg_hba.conf #local dev only!
# TYPE  DATABASE        USER            ADDRESS                 METHOD
local   all             all                                     trust
host    all             all             127.0.0.1/32            trust
host    all             all             ::1/128                 trust
$ service postgresql restart
$ sudo su postgres
$ createuser your-username
$ createdb learn_dev
$ sudo su your-username
$ bundle install
$ rails server #open browser @ localhost:3000
```

###Windows (using choco)
coming soon

###Mac (using brew)
coming soon

## License
MIT
