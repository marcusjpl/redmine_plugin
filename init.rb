Redmine::Plugin.register :redmine_scrum_metrics do
  name 'Owse Scrum Metrics plugin'
  author 'Author name'
  description 'This is a plugin for Redmine'
  version '0.0.1'
  url 'http://example.com/path/to/plugin'
  author_url 'http://example.com/about'
  
  permission :burndown, { :burndown => [:index] }, :public => true

  menu :project_menu, :burndown, { :controller => 'burndown', :action => 'index' }, 
  	   :caption => 'Burndown', :after => :activity, :param => :project_id
end
