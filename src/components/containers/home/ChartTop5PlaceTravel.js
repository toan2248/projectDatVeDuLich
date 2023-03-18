import React from 'react';
import { 
  Chart as ChartJS, 
  ArcElement, 
  Tooltip, 
  Legend ,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import {
} from 'chart.js';

import "../../../styles/statistical/chartTopTravel.scss"

ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

let ChartTop5PlaceTravel = ({dataChartPie}) => {

  let backgroundColor = [
          'rgba(255, 99, 132, 0.2)','rgba(54, 162, 235, 0.2)','rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)','rgba(153, 102, 255, 0.2)','rgba(255, 159, 64, 0.2)',
          'rgba(60, 88, 145, 0.2)','rgba(60, 88, 21, 0.2)','rgba(33, 222, 232, 0.2)','rgba(201, 103, 218, 0.2)'
        ]
  let borderColor = [
          'rgba(255, 99, 132, 1)','rgba(54, 162, 235, 1)','rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)','rgba(153, 102, 255, 1)','rgba(255, 159, 64, 1)',
          'rgba(60, 88, 145, 1)','rgba(60, 88, 21, 1)','rgba(33, 222, 232, 1)','rgba(201, 103, 218, 1)'
        ]

  let pieChart = {
    labels: dataChartPie.map((travel) => {
      return `${travel.placeTravelID} - ${travel.touristName}`
    }),
    datasets: [
      {
        label: '# Tổng số vé',
        data: dataChartPie.map((travel) => {
          return travel.totalTicket
        }),
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: 1,
      },
    ],
  };

  let options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Doanh Thu',
      },
    },
  };

  let labels = [""];
  const dataBarChart = {
    labels,
    datasets: [
      ...dataChartPie.map((travel, index) => {
        return (
          {
            label: `${travel.placeTravelID} - ${travel.touristName}`,
            data: labels.map(() => travel.revenue),
            backgroundColor: backgroundColor[index],
            borderColor : borderColor[index],
            borderWidth : 1
          }
        )
      })
    ],
  };
    return (
        <div className="chart-top-travel" style={{backgroundColor : "white"}}>
            <span className="header-top">TOP 5 ĐỊA ĐIỂM DU LỊCH ĐƯỢC ƯA THÍCH NHẤT</span>
            <div className="chart">
                <div className="schema">
                    <Pie data={pieChart} 
                    options = {{
                      onClick : (evt, element) => {
                        console.log(element[0].index);
                      }
                    }}
                    />
                </div>
                <div className="revenue">
                  <Bar options={options} data={dataBarChart} />
                </div>
            </div>
        </div>
    )
}

export default ChartTop5PlaceTravel