import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Data } from '../../types/type';

ChartJS.register(ArcElement, Tooltip, Legend);


interface DonutProps {
    title: string,
    data:Data
}
const DonutChart = (props: DonutProps) => {
    const options = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                position: 'right' as const,
            },
            title: {
                display: true,
                text: props.title,
            },
        },
    };
    const datas = {
        labels: ['Vé chưa sử dụng', 'Vé đã sử dụng'],
        datasets: [
            {
                label: props.title,
                data: [props.data.unused, props.data.used],
                backgroundColor: [
                    '#FF8A48',
                    '#4F75FF'
                ],
                borderColor: [
                    '#FF8A48',
                    '#4F75FF'
                ],
                borderWidth: 1,
            },
        ],
    };
    return (
        <Doughnut data={datas} options={options} height={"200px"} />
    )
}

export default DonutChart