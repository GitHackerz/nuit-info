import { Line } from 'react-chartjs-2';

const LineChart = () => {
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Monthly Sales',
                data: [12, 19, 3, 5, 2, 3, 15],
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
        <div>
            <h2>Monthly Sales Line Chart</h2>
            <Line data={data} options={options} />
        </div>
    );
};

export default LineChart;
