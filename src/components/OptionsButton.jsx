import React, { useState } from "react";
import MainContainer from "./MainContainer.jsx";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const OptionsButton = () => {
	const [open, setOpen] = useState(false);
	const [anchorEl, setAnchorEl] = useState(null);

	const optionsButtonClick = (event) => {
		setOpen(!open);
		setAnchorEl(event.currentTarget);
	};

	const optionsMenuClick = () => {
		setOpen(!open);
	}

	return (
		<>
			<Button
				id="options-button"
				aria-controls={open ? 'basic-menu' : undefined}
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
				onClick={optionsButtonClick}
			>
				Options
			</Button>
			<Menu
				id="options-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={optionsMenuClick}
				MenuListProps={{
					'aria-labelledby': 'basic-button',
				}}
			>
				<MenuItem onClick={optionsMenuClick}>A</MenuItem>
				<MenuItem onClick={optionsMenuClick}>B</MenuItem>
				<MenuItem onClick={optionsMenuClick}>C</MenuItem>
			</Menu>
		</>
	);
}

export default OptionsButton;
