task :gulp do
  system('npm install -g gulp')
  system('cd ~/client && gulp production')
end
