# learn

Find our roadmap, documentation, and on-boarding information for contributors at [cityasacampus.org](http://cityasacampus.org)

To edit documentation or the roadmap, switch to the gh-pages branch.

If you are interesting in setting up City as a Campus for your city, please review [Getting Started](https://github.com/saxifrage/cityasacampus/blob/master/GETTING_STARTED.md).

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)
[ ![Codeship Status for saxifrage/learn](https://codeship.com/projects/be3edb90-b14b-0132-d033-3edef27c5b65/status?branch=master)](https://codeship.com/projects/69801)



## Install

This project depends on Git, Ruby, Rubygems, Node, NPM, Gulp, and Postgresql, please see instructions for your system to get these dependencies installed.

###Application install
```bash
$ git clone git@github.com:saxifrage/cityasacampus.git
$ cd cityasacampus
$ bundle install
$ rake db:setup
# $ rake db:seed (optional if you want some test data...) 
$ cd client
$ npm i
$ gulp
```

### Running the app
```bash
$ rails s
```

Visit the app in your browser at http://localhost:3000/

###Mac (from source)
See [install log](https://github.com/saxifrage/cityasacampus/issues/57).

## License
MIT
