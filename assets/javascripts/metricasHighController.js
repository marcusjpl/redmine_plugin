function MetricsController() {
	this.self = this

	// construtor
	this.drawGraphs = function() {
		this.fetchBurndownData(this.plotBurndown)
		this.fetchMetricsData(this.plotMetricsPie)
	}

	// monta o grafico de burndown
	this.plotBurndown = function(data) {
		$('#chart-burndown').highcharts({
			chart: {
                type: 'spline'
            },
			title: {
				text: 'Gráfico de Burndown da Sprint'
			},
            xAxis: {
            	type: 'datetime',
            	title: {
                	text: 'Dias'
                },
                
                dateTimeLabelFormats: { // don't display the dummy year
                    month: '%e. %b',
                    year: '%b'
                }
            },
            yAxis: {
                title: {
                    text: 'Horas'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                valueSuffix: 'hrs'
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            series: data
        });
	}

	// monta o grafico de pizza das metricas
	this.plotMetricsPie = function(data) {
		$('#chart-metrics').highcharts({
	        chart: {
	            plotBackgroundColor: null,
	            plotBorderWidth: null,
	            plotShadow: false
	        },
	        title: {
	            text: 'Distribuição das tarefas do projeto'
	        },
	        tooltip: {
	    	    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
	        },
	        plotOptions: {
	            pie: {
	                allowPointSelect: true,
	                cursor: 'pointer',
	                dataLabels: {
	                    enabled: true,
	                    color: '#000000',
	                    connectorColor: '#000000',
	                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
	                }
	            }
	        },
	        series: [{
	            type: 'pie',
	            name: 'porcentagem',
	            data: data
	        }]
	    });
	}

	this.generateData = function() {
		var data = []
		_(10).times(function(n){
			console.log(n)
			data.push([Date.UTC(2013, 10, 1 + n), _.random(0, 100)])
		})
		console.log(data)
		return data
	}

	// busca os valores para o grafico de burndown
	this.fetchBurndownData = function(plot) {
		var data = [{
                name: 'Baseline',
                data: [this.generateData()]
            }, {
                name: 'Planejadas',
                data: [this.generateData()]
            }, {
                name: 'Realizadas',
                data: [this.generateData()]
            }];

        plot(data)
	}

	// busca os valores para o grafico de pizza das metricas
	this.fetchMetricsData = function(plot) {
		var data = [
                ['Corretivas',  45.0],
                ['Planejadas',  26.8],
                ['Erro', 		12.8]
            ]

        plot(data)
	}
}