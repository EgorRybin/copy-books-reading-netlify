import styled from 'styled-components';

export const WrapperStatistics = styled.div`
position: relative;
@media screen and (min-width: 1280px) {
    margin-bottom: 40px;
}

`;

export const WrapperGoalsTimer = styled.div`

@media screen and (min-width: 1280px) {
   
justify-content: space-between;
gap: 32px;
display: flex;
flex-direction: column;
/* margin: 0 32px 0 0; */
max-width: 65%;
	}
`;


export const BoxTimerTraining = styled.div`
margin-bottom: 40px;

@media screen and (min-width: 768px) {
    margin-bottom: 12px;
}

@media screen and (min-width: 1280px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 20px;



	}
`;