import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface DonutProps {
    title: string,
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
    const data = {
        labels: ['Vé chưa sử dụng', 'Vé đã sử dụng'],
        datasets: [
            {
                label: 'Gói gia đình',
                data: [13568, 56024],
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
        <Doughnut data={data} options={options} height={"200px"} />
    )
}

export default DonutChart