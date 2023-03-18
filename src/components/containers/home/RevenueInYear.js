import React from 'react';
import {faker} from '@faker-js/faker';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import "../../../styles/statistical/revenueInYear.scss"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

let RevenueInYear = ({dataRevenue}) => {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
            position: 'top',
            },
            title: {
            display: true,
            text: 'Doanh Thu Trong Năm',
            },
        },
    };

    let date = new Date()
    let monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    // let labels = monthsOfYear.slice(0,date.getMonth()+1)
    let labels = monthsOfYear.slice(0,12)
    let data = {
        labels,
        datasets: [
            ...dataRevenue.map((arrayTravel) => {
                let data = arrayTravel.map((travel) => travel.revenue)
                let randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
                let randomByte = () => randomNumber(0, 255)
                let randomPercent = () => (randomNumber(50, 100) * 0.01).toFixed(2)
                let randomCssRgba = () => `rgba(${[randomByte(), randomByte(), randomByte(), randomPercent()].join(',')})`
                let colorRandom = randomCssRgba()
                return (
                    {
                        label: `${arrayTravel[0].placeTravelID}-${arrayTravel[0].touristName}`,
                        data: data,
                        borderColor: colorRandom,
                        backgroundColor: colorRandom,
                    }
                )
            }),
        ],
    };
    
    return (
        <div className="revenue-in-year">
            <span className="title-revenue-in-year">Doanh Thu Trong Năm</span>
            <div className="chart-revenue-in-year">
                <Line options={options} data={data} />
            </div>
        </div>
    )
}

export default RevenueInYear