$.fn.waterfallChart = function(options, yaxis_max) {
	var element = $(this),
			chartOptions = {},
			barCount = options.series.data.length,
			data = options.series.data,
			seriesOptions = [];

	seriesOptions.push({
		type: 'column',
		cursor: 'pointer',
		point: {
			events: {
				click: function() { 
					alert(this.series.name+" --- "+this.category);
				}
			}
		},
    name: options.series.name,
		borderColor: 'black',
    data: options.series.data,
		groupPadding: 0,
		pointPadding:.1,
	});
	
	// loop through all except the last one - last one is Total
	for (var i=0; i < barCount-1; i++) {
		seriesOptions.push($.lineConnector([[i, data[i].y], [i+1, data[i].y]]));
	};
			
	chartOptions = {
		chart: {
			renderTo: element.attr("id")
		},
		title: {text: ''},
		legend: {enabled: false},
		tooltip: { enabled: false},
		credits: {enabled: false},
		yAxis: {
			title: {text: null},
			min: 0,
			max: options.ymax,
			gridLineColor: null,
			labels: {enabled: false}
		},
		xAxis: {
			categories: options.categories,
			lineWidth: 2,
			lineColor: 'black'
		},	
		plotOptions: {
			allowPointSelect: true,
			column: {
				dataLabels: {
					enabled: true,
					formatter: function(){
						return this.point.y - this.point.low;
					}
				}
			}
		},
	  series: seriesOptions
	}
	return new Highcharts.Chart(chartOptions);
};

$.lineConnector = function(lineData) {
	var lineConnectorOptions = {
		data: [],
		color: 'black',
		dashStyle: 'dash',
		marker: {enabled: false},
		lineWidth: 1,
		shadow: false,
		enableMouseTracking: false
	}
	return $.extend(lineConnectorOptions, {data: lineData});
};