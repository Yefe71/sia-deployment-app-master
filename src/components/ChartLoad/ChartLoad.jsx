
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
            categories: []
          },
          yaxis: {
            min: 0,
            max: 24,
      
          },
          
          },
          series: [
            {
              name: "Current Units",
              data: [],

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
          currentUnits: item.current_units,
        }));
  
        const sortedRows = rows.sort((a, b) => a.lastname.localeCompare(b.lastname));
        
  
        this.setState({
          options: {
            ...this.state.options,
            xaxis: {
              ...this.state.options.xaxis,
              categories: sortedRows.map((item) => `${item.lastname} ${item.middlename} ${item.firstname}`),
            },
          },
          series: [
            {
              name: "Current Units",
              data: sortedRows.map((item) => item.currentUnits),
            },
          ],
        });
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
            height = {"1000"}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ChartLoad;