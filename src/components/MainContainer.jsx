import React from "react";
import { makeStyles } from "@mui/styles";

const styles = makeStyles({
	mainContainer: {
		alignItems: 'center',
		display: 'flex !important',
		flexDirection: 'column',
		justifyContent: 'center',
		width: '100%',
	}
});

const MainContainer = ({ component }) => {
	const classes = styles();

	return (
		<>
			<div className={classes.mainContainer}>
				{component}
			</div>
		</>
	);
}

export default MainContainer;
