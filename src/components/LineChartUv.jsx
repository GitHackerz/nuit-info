import { Line } from 'react-chartjs-2';
import 'chart.js/auto'; // Import the 'chart.js/auto' module

const LineChartTemp = ({ inputUv }) => {
    const data = {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        datasets: [
            {
                label: 'UV Index',
                data: inputUv,
                fill: false,
                borderColor: 'rgba(255,0,0,1)',
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
            <h2>UV Index</h2>
            <Line data={data} options={options} />
        </div>
    );
};

export default LineChartTemp;
