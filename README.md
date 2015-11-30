# City as a Campus

Find our roadmap, documentation, and on-boarding information for contributors at [cityasacampus.org](http://cityasacampus.org)

To edit documentation or the roadmap, switch to the gh-pages branch.

If you are interesting in setting up City as a Campus for your city, please review [Getting Started](https://github.com/saxifrage/cityasacampus/blob/master/GETTING_STARTED.md).

## Github Issue Tracker Extension (Kanban Board)
install https://www.zenhub.io/

## Development Environment

See `dev/README.md` for automated development environment install (Ubuntu is the officially supported distribution). If using Mac or a Linux other than Ubuntu see the following logs: 

 - [Mac OS](https://github.com/saxifrage/cityasacampus/issues/57)
 - [Fedora](https://github.com/saxifrage/cityasacampus/issues/213)


### Running the App

```bash
./node_modules/.bin/gulp &
bundle exec rails server
```

## Deploying to Heroku
Our production instance is deployed on [Heroku](https://www.heroku.com/). To deploy your own, create a Heroku account, install the [Heroku Toolbelt](https://toolbelt.heroku.com/), and then issue the following commands in the project root.


```bash
heroku login
heroku create

heroku buildpacks:add heroku/nodejs   # for compiling assets during deployment 
heroku buildpacks:add heroku/ruby     # for Rails

# a nice way to get random tokens - http://stackoverflow.com/a/2793856 - pick one!
alias random_token="cat /dev/urandom | env LC_CTYPE=C tr -cd 'a-f0-9' | head -c 64"   # Max OS
alias random_token="cat /dev/urandom | tr -cd 'a-f0-9' | head -c 64"                  # Linux

heroku config:set APP_SECRET=`random_token`
heroku config:set APP_TOKEN=`random_token`

git push heroku
```

After you push the app for the first time, Heroku should provision a PostgreSQL database for you and set some environment variables. Double-check them.

```
$ heroku config
=== foo-bar-1234 Config Vars
APP_SECRET:               deadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef
APP_TOKEN:                fa1afe1fa1afe1fa1afe1fa1afe1fa1afe1fa1afe1fa1afe1fa1afe1fa1afe1f
DATABASE_URL:             postgres://beef:feed@ec2-1-2-3-4.compute-1.amazonaws.com:5432/deaf
LANG:                     en_US.UTF-8
RACK_ENV:                 production
RAILS_ENV:                production
RAILS_SERVE_STATIC_FILES: enabled
SECRET_KEY_BASE:          facefeedfacefeedfacefeedfacefeedfacefeedfacefeedfacefeedfacefeedfacefeedfacefeedfacefeedfacefeedfacefeedfacefeedfacefeedfacefeed
$
```

If everything looks right, then you're ready to populate the database. Use the `db:schema:load` task to load our schema into the database that Heroku has already created for you, and optionally the `db:seed` task to insert some seed data once the schema is loaded. Check [the Rails source](https://github.com/rails/rails/blob/v4.2.1/activerecord/lib/active_record/railties/databases.rake) for a full list of available db-related tasks, or use `heroku run rake -T db`.

```bash
heroku run rake db:schema:load
heroku run rake db:seed
```

If that works, then you should be all set! Visit the app in your browser at https://foo-bar-1234.herokuapp.com/. If you loaded seed data, click on "Explore" to see the app in action.


## License
MIT
