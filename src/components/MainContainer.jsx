import React from "react";
import { makeStyles } from 'tss-react/mui';

const styles = makeStyles()({
	mainContainer: {
		alignItems: 'center',
		display: 'flex !important',
		flexDirection: 'column',
		justifyContent: 'center',
		width: '100%',
	}
});

const MainContainer = ({ title, component }) => {
	const { classes } = styles();

	return (
		<>
			<div className={classes.mainContainer}>
				{title? <h2>{title}</h2> : null}
				{component}
			</div>
		</>
	);
}

export default MainContainer;
