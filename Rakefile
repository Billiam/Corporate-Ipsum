desc 'Set manifest version'
task :version do
  require 'json'
  file = File.expand_path('../src/manifest.json', __FILE__)
  data = JSON.parse(IO.binread(file))
  data['version'] = `bundle exec semver format "%M.%m.%p%s"`.chomp
  IO.binwrite(file, JSON.pretty_generate(data))
end

desc 'Build extension'
task :build do
  Dir.chdir File.dirname(__FILE__)

  begin
    File.delete 'build/corporate-ipsum.zip'
  rescue => e
  end

  puts `zip -r build/corporate-ipsum.zip src`
end
