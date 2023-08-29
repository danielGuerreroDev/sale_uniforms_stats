import React, { useEffect, useState } from "react";
import MainContainer from "../components/MainContainer.jsx";
import Axios from "axios";

function Hi() {
	return 'Test';
};

const BestSellingSize = () => {
	const [data, setData] = useState([]);

	const getData = () => {
		Axios.get('https://quetzal-hug.com/api/bestSellingSize.php').then(res => {
			setData(res.data);
		})
	};

	useEffect(() => {
		getData();
	},[]);

	const rows = data?.map((item) => (
		item.id
	));

	console.log(rows);

	return (
		<div>
			<MainContainer
				component={<Hi />}
			/>
		</div>
	);
}

export default BestSellingSize;
