import { Line } from 'react-chartjs-2';
import 'chart.js/auto'; // Import the 'chart.js/auto' module

const LineChartTemp = ({ inputMin, inputMax }) => {
    const data = {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        datasets: [
            {
                label: 'Max Temperature',
                data: inputMax,
                fill: false,
                borderColor: 'rgba(255,0,0,1)',
                borderWidth: 2
            },
            {
                label: 'Min Temperature',
                data: inputMin,
                fill: false,
                borderColor: 'rgba(0,255,0,1)',
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
            <h2>Temperature</h2>
            <Line data={data} options={options} />
        </div>
    );
};

export default LineChartTemp;
