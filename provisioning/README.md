# CaaC Configuration & Management

## Installation

```shell
#run on remote server...
sudo apt-get install -y git-core &&
git clone https://github.com/saxifrage/cityasacampus.git /home/ubuntu/cityasacampus &&
cd /home/ubuntu/cityasacampus/provisioning &&
sed -i -- 's/{{home_user}}/ubuntu/g' ./src/* && #{{home_user}} is replaced in files with 'ubuntu'
./src/system.sh &&
./src/node_npm_gulp.sh &&
./src/ruby_gem_rake.sh &&
./src/rails.sh &&
./src/bundler.sh &&
./src/postgres.sh {deployuser} {password} && #fill these variables in
./src/project.sh {appsecret} {apptoken} && #fill these variables in
./src/nginx.sh &&
./src/puma.sh
```

## Deployment

```shell
#todo
```