function MetricsController() {
	this.self = this

	// construtor
	this.drawGraphs = function() {
		this.plotBurndown(this.fetchBurndownData())
		this.plotMetricsPie(this.fetchMetricsData())
	}

	// monta o grafico de burndown
	this.plotBurndown = function(datasets) {
		var data = []
		var i = 0;
		$.each(datasets, function(key, val) {
			val.color = i;
			++i;
		});
			
		var keys = _.keys(datasets)
		_.each(keys, function(it) {
			data.push(datasets[it]);
		})

		if (data.length > 0) {
			$.plot("#chart-burndown", data, {
				yaxis: {
					min: 0
				},
				xaxis: {
					tickDecimals: 0
				}
			});
		}
	}

	// monta o grafico de pizza das metricas
	this.plotMetricsPie = function(data) {
		var labelFormatter = function(label, slice) {
			return "<div style='text-align:center;padding:2px;color:#fff;'>" + label + "<br/>" + Math.round(slice.percent) + "%</div>";
		}

		$.plot('#chart-metrics', data, {
			series: {
				pie: { 
					show: true,
					radius: 3/4,
					label: {
						show: true,
						formatter: labelFormatter,
						radius: 3/4,
						background: { 
							opacity: 0.5,
							color: "#000"
						}
					}
				}
			},
			legend: {
				show: false
			}
		})
	}

	// busca os valores para o grafico de burndown
	this.fetchBurndownData = function() {
		return {
			"baseline": {
				label: "Baseline",
				data: [[1988, 483994], [1989, 479060], [1990, 457648], [1991, 401949], [1992, 424705], [1993, 402375], [1994, 377867], [1995, 357382], [1996, 337946], [1997, 336185], [1998, 328611], [1999, 329421], [2000, 342172], [2001, 344932], [2002, 387303], [2003, 440813], [2004, 480451], [2005, 504638], [2006, 528692]]
			},        
			"previsto": {
				label: "Previsto",
				data: [[1988, 218000], [1989, 203000], [1990, 171000], [1992, 42500], [1993, 37600], [1994, 36600], [1995, 21700], [1996, 19200], [1997, 21300], [1998, 13600], [1999, 14000], [2000, 19100], [2001, 21300], [2002, 23600], [2003, 25100], [2004, 26100], [2005, 31100], [2006, 34700]]
			},
			"realizado": {
				label: "Realizado",
				data: [[1988, 4382], [1989, 4498], [1990, 4535], [1991, 4398], [1992, 4766], [1993, 4441], [1994, 4670], [1995, 4217], [1996, 4275], [1997, 4203], [1998, 4482], [1999, 4506], [2000, 4358], [2001, 4385], [2002, 5269], [2003, 5066], [2004, 5194], [2005, 4887], [2006, 4891]]
			}
		};
	}

	// busca os valores para o grafico de pizza das metricas
	this.fetchMetricsData = function() {
		var data = []
		data.push({ label: 'Corretivas', data: 20 })		
		data.push({ label: 'Planejadas', data: 10 })
		data.push({ label: 'Erro', data: 5 })

		return data;
	}
}