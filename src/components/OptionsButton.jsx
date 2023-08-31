import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Axios from "axios";
import { BarChart } from "@mui/x-charts/BarChart";
import MainContainer from "../components/MainContainer.jsx";
import { makeStyles } from "@mui/styles";

const styles = makeStyles({
  hola: {
    '& .MuiButtonBase-root': {
      color: 'red !important',
    },
  },
});

const OptionsButton = () => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [options, setOptions] = useState(null);
  const [data, setData] = useState(null);

  const getOptions = () => {
    options
      ? null
      : Axios.get("https://quetzal-hug.com/api/chart_options.php").then(
          (res) => {
            setOptions(res.data);
          }
        );
  };

  const getData = (value) => {
    value
      ? Axios.get(`https://quetzal-hug.com/api/${value}.php`).then((res) => {
          setData(res.data);
        })
      : null;
  };

  useEffect(() => {
    getOptions();
  }, []);

  // const rows = data?.map((item) => (
  // 	item.id
  // ));

  const optionsMapped = options?.map((option) => {
    return (
      <MenuItem key={option.id} onClick={() => optionsMenuItem(option.api)}>
        {option.name}
      </MenuItem>
    );
  });

  console.log(options);
  console.log(data);

  const optionsButton = (event) => {
    setOpen(!open);
    setAnchorEl(event.currentTarget);
  };

  const optionsMenuItem = (value) => {
    getData(value);
    setOpen(!open);
  };

  const onClose = () => {
    setOpen(!open);
  };

  const cAxisData = data?.map((item) => {
    return item.detail;
  });

  const seriesData = data?.map((value) => {
    return parseInt(value.amount);
  });

  const classes = styles();

  const component = data ? (
    <BarChart
      xAxis={[{ scaleType: "band", data: cAxisData }]}
      series={[{ data: seriesData }]}
      width={920}
      height={600}
    />
  ) : null;

  return (
    <>
      <Button
        className={classes.hola}
        id="options-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={optionsButton}
      >
        Options
      </Button>
      <Menu
        id="options-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={onClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {optionsMapped}
      </Menu>
      <MainContainer component={component} />
    </>
  );
};

export default OptionsButton;
// The implementation has changed;
// - Router doesn't necessary
// quitar modulos react-router-dom
// display:none con Styles en labels horizontales
// poner titulo de la opción seleccionada / arriba
