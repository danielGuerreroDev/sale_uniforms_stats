import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Axios from "axios";
import { BarChart } from "@mui/x-charts/BarChart";
import MainContainer from "../components/MainContainer.jsx";

const OptionsButton = () => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [options, setOptions] = useState(null);
  const [data, setData] = useState(null);
  const [title, setTitle] = useState(null);

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

  const optionsMapped = options?.map((option) => {
    return (
      <MenuItem key={option.id} onClick={() => optionsMenuItem(option.api, option.name)}>
        {option.name}
      </MenuItem>
    );
  });

  const optionsButton = (event) => {
    setOpen(!open);
    setAnchorEl(event.currentTarget);
  };

  const optionsMenuItem = (api, name) => {
    getData(api);
    setTitle(name);
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

  const component = data ? (
    <BarChart
      xAxis={[{ scaleType: "band", data: cAxisData }]}
      series={[{ data: seriesData }]}
      width={920}
      height={600}
      bottomAxis={null}
    />
  ) : null;

  return (
    <>
      <Button
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
      <MainContainer title={title} component={component} />
    </>
  );
};

export default OptionsButton;
