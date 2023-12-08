import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'; // Import the 'chart.js/auto' module

const LineChart = ({ input, label }) => {
    const data = {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        datasets: [
            {
                label: label ,
                data: input,
                fill: false,
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 2
            }
        ]
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    return (
        <div >
            <h2>{label}</h2>
            <Line data={data} options={options} />
        </div>
    );
};

export default LineChart;
