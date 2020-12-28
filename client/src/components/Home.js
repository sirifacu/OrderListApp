import React, { Component } from 'react';
import axios from 'axios';
import Chart from 'chart.js';

export default class Home extends Component {
    constructor(){
        super();
        this.state = {
            values: [],
            months: [],
            totals: []
        }
    }

    componentDidMount() {
      axios.get('pedido/grafico12Meses')
        .then( (res) => {
          this.setState({...this.state, values: res.data});
          this.draw(); })
        .catch( (err) => console.log(err) );  
    }

    draw = () => {
        let mesn = '';
        let monthsArr = []
        let totalsArr = []
        // eslint-disable-next-line
        this.state.values.map(x => {
          switch( parseInt(x._id.mes) ) {
            case 1:
              mesn = 'Enero';
              break;
            case 2:
              mesn = 'Febrero';
              break;
            case 3:
              mesn = 'Marzo';
              break;
            case 4:
              mesn = 'Abril';
              break;
            case 5:
              mesn = 'Mayo';
              break;
            case 6:
              mesn = 'Junio';
              break;
            case 7:
              mesn = 'Julio';
              break;
            case 8:
              mesn = 'Agosto';
              break;
            case 9:
              mesn = 'Septiembre';
              break;
            case 10:
              mesn = 'Octubre';
              break;
            case 11:
              mesn = 'Noviembre';
              break;
            case 12:
              mesn = 'Diciembre';
              break;
            default: 
              mesn = 'error'
          }
          monthsArr.push(mesn + ' - ' + x._id.year);
          this.setState({...this.state, months: monthsArr});
          totalsArr.push(x.total);
          this.setState({...this.state, totals: totalsArr});
        });
        var ctx = document.getElementById('myChart');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: this.state.months,
                datasets: [{
                    label: 'Venta de los últimos 6 meses',
                    data: this.state.totals,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
      }

      render(){
        return (
            <div className="container" style={{width: '75%'}}>
                <div className="ct-chart">
                    <canvas id="myChart"></canvas>
                </div>
            </div>
        )
      }
}

