import React from "react";
import MainContainer from "../components/MainContainer.jsx";

function Hi() {
	return 'Test';
};

const BestSellingSize = () => {
	return (
		<div>
			<MainContainer
				component={<Hi />}
			/>
		</div>
	);
}

export default BestSellingSize;
