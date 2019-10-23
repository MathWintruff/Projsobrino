function PlotGrafic(vFase){
    Highcharts.chart('Grafic', {

        chart: {
            type: 'spline'
        },

        title: {
            text: 'Grafico de tensao do secundario do transformador',
            style: {
                color: "maroon"
            }
        },

        subtitle: {
            text: ''
        },

        yAxis: {
            title: {
                text: 'Tensao de Saida ( V )',
                style: {
                    color: "maroon"
                }
            },
            plotBands: [{
                from: 0,
                to: 10000,
                color: "rgb(140,0,0,0.75)",
                label: {
                    text: "Lado Positivo",
                    style: {
                        color: "White"
                    }
                }

            },
            {
                from: 0,
                to: -10000,
                color: "rgb(67,71,84,0.95)",
                label: {
                    text: "Lado Negativo",
                    style: {
                        color: "white"
                    }
                }

            }
        ]
        },
        xAxis: {
            title: {
                text: 'Delta(T) em Graus',
                style: {
                    color: "maroon"
                }
            }    
        },

        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },
        tooltip:{
            valueSuffix: " Volts"

        },

        plotOptions: {
            spline: {
                lineWidth: 2

            },
            series: {
                label: {
                    connectorAllowed: true
                },
                marker: {
                    enabled: false

                },
                pointInterval: 90,
                pointStart: 0
            }
        },

        series: [{
            name: 'R',
            //data: [[0,0], [1,10], [2,0], [3,-10], [4,0], [5,10], [6,0]],
            data: [0,vFase,0,-vFase,0,vFase,0,-vFase,0,vFase,0,-vFase,0],
            color: "black"
        },{
            name: 'S',
            pointStart: 120,
            data: [0,vFase,0,-vFase,0,vFase,0,-vFase,0,vFase,0,-vFase,0],
            color: "purple"
        },{
            name: 'T',
            pointStart: 240,
            data: [0,vFase,0,-vFase,0,vFase,0,-vFase,0,vFase,0,-vFase,0],
            color: "red"
        }/*,{
            name: 'Entrada',
            data: [[0,10], [1,10], [2,0], [3,-10], [4,0], [5,10]],
            color: "black"
        }*/],
        

        responsive: {
            rules: [{
                condition: {
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }

    });
}