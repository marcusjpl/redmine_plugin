class BurndownController < ApplicationController
	unloadable
	
	menu_item :burndown

	before_filter :find_project

	def index
	  respond_to do |format|
      format.html { carrega_valores_pie_chart } 
     # format.json { render json: @usuarios }
    end
	end
	
	def find_project
		@project = Project.find(params[:project_id])
	rescue ActiveRecord::RecordNotFound
		render_404
	end
	
	def carrega_valores_pie_chart
	  @total_tarefas = Tracker.select(:name).count
	  @tipo_tarefas = Tracker.all
	  @sprint_corrente = Version.select(:name).where(["project_id = ? and status = ?", @project.id,"open" ]).order('created_on DESC').first
	  @tarefas_por_sprint = Tracker.joins(
	                         "LEFT OUTER JOIN issues on trackers.id = issues.tracker_id").joins(
	                         "LEFT OUTER JOIN projects on projects.id = issues.project_id").joins(
	                         "LEFT OUTER JOIN versions on versions.project_id = issues.project_id").where(
	                         "versions.id = 1 and versions.status = 'open' and projects.id = 1")
	  
	  map = Hash.new
	  
	  @tarefas_por_sprint.each do |tarefa|
	    if map[tarefa.name] == nil
	       map[tarefa.name] = 1
	    else
	       map[tarefa.name] = map[tarefa.name] + 1
	    end   
	  end
	  puts map
	  
	  
	end
	
end
