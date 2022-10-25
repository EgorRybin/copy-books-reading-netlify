
import React from 'react';
import {
	TimerMain,
	TimerStyle,
	TimerContainer,
	TimerHeader,
	TimerCounter,
	TimerCol,
	TimerBox,
	TimerTime,
	TimerText,
	TimerSec,
} from 'ui/TimerBlock';
import css from './TimerBlock.module.css';
import { useSelector } from 'react-redux';
import { getEndDate } from 'redux/library/librarySelector';

const TimerBlock = () => {
	const endDate = useSelector(getEndDate);
	// console.log(endDate);
	return (
		<>
			<TimerMain>
				{/* блок "До кінця року залишилось" -----> */}
				<div>
					<TimerHeader>До закінчення року залишилось</TimerHeader>
					<TimerStyle className={css.mRight}>
						<TimerContainer>
							<Timer endDate={'December, 31, 2022'} />
						</TimerContainer>
					</TimerStyle>
				</div>

				{/* блок "До досягнення мети залишилось" -----> */}
				<div>
					<TimerHeader>До досягнення мети залишилось</TimerHeader>
					<TimerStyle>
						<TimerContainer>
							<Timer endDate={endDate} />
						</TimerContainer>
					</TimerStyle>
				</div>
			</TimerMain>
			
		</>
	);
};

const Timer = ({ endDate }) => {
	const [days, setDays] = React.useState(0);
	const [hours, setHours] = React.useState(0);
	const [minutes, setMinutes] = React.useState(0);
	const [seconds, setSeconds] = React.useState(0);


	
	// const deadline = 'December, 31, 2022';
	const deadline = endDate;

	const getTime = () => {
		const time = Date.parse(deadline) - Date.now();

		setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
		setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
		setMinutes(Math.floor((time / 1000 / 60) % 60));
		setSeconds(Math.floor((time / 1000) % 60));
	};

	React.useEffect(() => {
		if (!Boolean(endDate)) {
		return;
	}
		const interval = setInterval(() => getTime(deadline), 1000);

		return () => clearInterval(interval);
	});

	return (
		<TimerCounter className={css.lastChild} role="timer">
			<TimerCol>
				<TimerBox>
					<TimerTime id="day">{days < 10 ? '0' + days : days}</TimerTime>
					<TimerText>дн</TimerText>
				</TimerBox>
			</TimerCol>
			<TimerCol>
				<TimerBox>
					<TimerTime id="hour">{hours < 10 ? '0' + hours : hours}</TimerTime>
					<TimerText>год</TimerText>
				</TimerBox>
			</TimerCol>
			<TimerCol>
				<TimerBox>
					<TimerTime id="minute">
						{minutes < 10 ? '0' + minutes : minutes}
					</TimerTime>
					<TimerText>хв</TimerText>
				</TimerBox>
			</TimerCol>
			<TimerCol>
				<TimerBox>
					<TimerSec id="second">
						{seconds < 10 ? '0' + seconds : seconds}
					</TimerSec>
					<TimerText>сек</TimerText>
				</TimerBox>
			</TimerCol>
		</TimerCounter>
	);
};

export default TimerBlock;
