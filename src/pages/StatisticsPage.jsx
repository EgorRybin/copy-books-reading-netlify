import TimerBlock from 'components/TimerBlock/TimerBlock';
import Statistics from 'components/Statistics/Statistics';
import LineChart from 'components/Chart/Chart';
import MyGoals from 'components/MyGoals/MyGoals';
import { Section, Container } from 'ui/BasicStyles';
import { StatisticsContainerCommon } from 'ui/StatisticsPage';
import {WrapperGoalsTimer, BoxTimerTraining} from 'ui/StatisticsPage';
import { useSelector } from 'react-redux';
import {
	getCurrentlyReading,
	getFinishedReading,
} from '../redux/library/librarySelector';
import TrainingList from 'components/TrainingList';

export const StatisticsPage = () => {
	const currentlyReading = useSelector(getCurrentlyReading);
	const finishedReading = useSelector(getFinishedReading);

	return (
		<Section>
			<Container>
				<WrapperGoalsTimer>
					<BoxTimerTraining>
					<TimerBlock />
				<TrainingList
					books={[...finishedReading, ...currentlyReading]}
					// startDate={startDate}
					// endDate={endDate}
					// booksDelete={hanleDelete}
				/>
					</BoxTimerTraining>
				<MyGoals />
				</WrapperGoalsTimer>
				<LineChart />
				<StatisticsContainerCommon>
					<Statistics />
				</StatisticsContainerCommon>
			</Container>
		</Section>
	);
};
