import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
    ScriptableContext,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);
const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: false,
            text: 'Chart.js Line Chart',
        },
    },
};
const labels = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'];

export const data = {
    labels,
    datasets: [
        {
            fill: true,
            label: 'Doanh thu',
            data: [190, 180, 175, 190, 195, 190, 200],
            borderColor: '#FF993C',
            backgroundColor: (context: ScriptableContext<"line">) => {
                const ctx = context.chart.ctx;
                const gradient = ctx.createLinearGradient(0, 0, 0, 200);
                gradient.addColorStop(0, "rgba(250,160,95,1)");
                gradient.addColorStop(1, "rgba(255,255,255,0)");
                return gradient;
            },
            pointRadius: 0,
            tension: 0.3,
        }
    ],
};

const LineChart: React.FC = () => {
    return (
        <Line
            data={data}
            height="200px"
            options={options} />
    )
}

export default LineChart