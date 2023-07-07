
import React, { Component } from "react";
import Chart from "react-apexcharts";

class ChartLoad extends Component {
  constructor(props) {
    super(props);

    this.state = {
        options:{
            series: [{
            data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
          }],
            chart: {
            type: 'bar',
            height: 350
          },
          plotOptions: {
            bar: {
              borderRadius: 4,
              horizontal: true,
            }
          },
          dataLabels: {
            enabled: false
          },
          xaxis: {
            categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan',
              'United States', 'China', 'Germany', 'Germany', 'Germany', 'Germany', 'Germany', 'Germany', 'Germany', 'Germany', 'Germany', 'Germany', 'Germany', 'Germany', 'Germany', 'Germany', 'Germany', 'Germany', 'Germany', 'Germany', 'Germany'
            ],
          }
          },
      series: [
        {
          name: "series-1",
          data: [30, 40, 45, 50, 49, 60, 70, 91]
        }
      ]
    };
  }


  componentDidMount() {
    const fetchProfessors = async () => {
      try {
        const response = await fetch('http://localhost:3000/grabProfessors');
        const data = await response.json();
        const rows = data.map((item) => ({
          lastname: item.last_name,
          middlename: item.middle_name,
          firstname: item.first_name,
          employment: item.employment,
          maxUnits: item.max_units,
        }));


        console.log(rows, "AHHAHAHAHAHAHHAH ANONA")
  
     
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchProfessors();
  }
  



  render() {
    return (
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="bar"
              width={"580"}
            height = {"900"}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ChartLoad;