import React from 'react';
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

// import { Line } from 'react-chartjs-2';
import {
	getStartDate,
	getEndDate,
	getPagesPerDay,
	getStats,
	getCurrentlyReading,
} from '../../redux/library/librarySelector';
import { useSelector } from 'react-redux';
// import { red } from '@mui/material/colors';

// import faker from 'faker';
import {
	ChartWrapper,
	ChartBox,
	ChartTitle,
	ChartTime,
	ChartNumber,
	ChartInfo,
	ChartInfoBox,
	// ChartLineName,
	// ChartLineNameBox
} from 'ui/ChartStyled';

// window.onload=function(){
// let draw = ChartJS.controllers.line.prototype.draw;
// ChartJS.controllers.line = ChartJS.controllers.line.extend({
//     draw: function() {
//            let ctx = this.chart.chart.ctx;
//         ctx.save();
//         ctx.shadowColor = 'red';
//         ctx.shadowBlur = 10;
//         ctx.shadowOffsetX = 0;
//         ctx.shadowOffsetY = 4;
//         ctx.stroke();
//         draw.apply(this, arguments);
//         ctx.restore();
//     }
// });

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

const options = {
	responsive: true,

	plugins: {
		legend: {
			display: false,
			position: 'center',
			backgroundColor: 'white',
		},

		tooltip: {
			intersect: false,
			boxWidth: 4,
			boxHeight: 4,
			boxPadding: 6,
			titleFont: { weight: 'bold', size: 16, family: 'Montserrat' },
			caretSize: 6,
			titleSpacing: 2,
			cornerRadius: 3,
			usePointStyle: false,

		}
	},

	scales: {
		xAxes: {
			ticks: {
				display: false,
			},
			grid: {
				// display: false,
				lineWidth: 2,
				color: '#B1B5C2',
				borderColor: '#B1B5C2',
				borderWidth: 2,
			},
		},
		yAxes: {
			ticks: {
				display: false,
			},
			grid: {
				display: false,
			},
		},
	},
};

// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export default function LineChart() {
	const stats = useSelector(getStats);
	const startDate = useSelector(getStartDate);
	const endDate = useSelector(getEndDate);
	const pagesPerDay = useSelector(getPagesPerDay);
	const currentlyReading = useSelector(getCurrentlyReading);

	const generateDateArr = function (start, end) {
		const startDate = new Date(start);
		const endDate = new Date(end);
		const arr = [];
		const dt = new Date(startDate);

		while (dt <= endDate) {
			const fullDate = `${dt.getFullYear()}-${
				dt.getMonth() + 1
			}-${dt.getDate()}`;
			arr.push({ time: fullDate });
			dt.setDate(dt.getDate() + 1);
		}
		return arr;
	};

	const datesArr = generateDateArr(startDate, endDate);

	const statsPlan = datesArr.map(stat => {
		const newStat = { ...stat };
		newStat.pagesCount = pagesPerDay;
		return newStat;
	});

	const factPlan = datesArr.map(day => {
		const { time } = day;
		const newStat = { ...day, pagesCount: 0 };

		stats.forEach(el => {
			const factDate = new Date(el.time);
			const factFullDate = `${factDate.getFullYear()}-${
				factDate.getMonth() + 1
			}-${factDate.getDate()}`;

			if (factFullDate === time) {
				newStat.pagesCount += el.pagesCount;
			}
		});

		return newStat;
	});

	const data = {
		labels: datesArr.map(el => el.time),
		datasets: [
			{
				label: 'План', // вычислить за сколько дней прочесть книгу и количество страниц startData & endDatta
				data: statsPlan.map(stat => stat.pagesCount),
				pointBorderWidth: 6,
				borderColor: '#091E3F',
				backgroundColor: '#091E3F',
				lineTension: 0.4,
			},
			{
				label: 'Факт', // stats (key) > [data.количество страницї]
				data: factPlan.map(stat => stat.pagesCount),
				borderColor: '#FF6B08',
				backgroundColor: '#FF6B08',
				lineTension: 0.4,
				pointBorderWidth: 6,
			},
		],
	};

	return (
		<>
			{currentlyReading.length === 0 && (
				<ChartInfoBox>
					<ChartInfo>
						Тут буде відображена Ваша статистика читання коли почнете
						тренування:
					</ChartInfo>
				</ChartInfoBox>
			)}
			<ChartBox>
				<ChartTitle>
					Кількість сторінок / день <ChartNumber>34</ChartNumber>{' '}
				</ChartTitle>
				<ChartWrapper options={options} data={data} />
				{/* <ChartLineNameBox>
					<ChartLineName>План</ChartLineName>
					<ChartLineName>Факт</ChartLineName>
				</ChartLineNameBox> */}
				<ChartTime>Час </ChartTime>
			</ChartBox>
		</>
	);
}
