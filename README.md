# learn

Find our roadmap, documentation, and on-boarding information for contributors at [cityasacampus.org](http://cityasacampus.org)

To edit documentation or the roadmap, switch to the gh-pages branch.

## Join our chat on Gitter

[![Join the chat at https://gitter.im/saxifrage/learn](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/saxifrage/learn?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)
[ ![Codeship Status for saxifrage/learn](https://codeship.com/projects/be3edb90-b14b-0132-d033-3edef27c5b65/status?branch=master)](https://codeship.com/projects/69801)



## Install

This project depends on Git, Ruby, Rubygems, and Postgresql, please see instructions for your system to get these dependencies installed.

###Application install
```bash
$ git clone git@github.com:saxifrage/learn.git
$ cd learn
$ bundle install
$ rake db:setup
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
See [install log](https://github.com/saxifrage/learn/issues/57).

## License
MIT
