task :npm do
  system('cd ~/client && npm uninstall --save-dev gulp-sass')
  system('cd ~/client && npm install --save-dev gulp-sass@2')
  system('cd ~/client && npm install')
end
