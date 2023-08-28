import React from "react";
import {
  Route,
  Routes,
} from 'react-router-dom';
import MainPage from "./pages/Main.jsx";
import BestSellingSize from "./pages/BestSellingSize.jsx";

const App = () => {
	const routes = [
		{
			path: '/',
			exact: false,
			page: null,
		},
		{
			path: '/pages/BestSellingSize',
			exact: false,
			page: <BestSellingSize />,
		},
	];
	return (
		<div>
			<MainPage />
			<Routes>
				{
					routes.map((route, index) => (
						<Route
							element={route.page}
							exact={route.exact}
							key={index}
							path={route.path}
						/>
					))
				}
			</Routes>
		</div>
	);
}

export default App
