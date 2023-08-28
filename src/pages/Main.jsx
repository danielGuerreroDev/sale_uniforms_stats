import React, { Suspense } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import OptionsButton from '../components/OptionsButton.jsx';

const MainContainer = React.lazy(() => import('../components/MainContainer.jsx'));

function MainPage() {
	return (
		<>
			<Suspense fallback={<LinearProgress />}>
				<MainContainer
					component={<OptionsButton />}
				/>
			</Suspense>
		</>
	);
}

export default MainPage;
