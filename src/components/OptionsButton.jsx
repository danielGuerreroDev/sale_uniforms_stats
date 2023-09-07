import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Axios from "axios";
import { BarChart } from "@mui/x-charts/BarChart";
import MainContainer from "../components/MainContainer.jsx";

const OptionsButton = () => {
  const [open, setOpen] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [options, setOptions] = useState(null);
  const [data, setData] = useState(null);
  const [dataDetail, setDataDetail] = useState(null);
  const [title, setTitle] = useState(null);
  const [name, setName] = useState(null);

  const getOptions = () => {
    options
      ? null
      : Axios.get("https://quetzal-hug.com/api/chart_options.php").then(
          (res) => {
            setOptions(res.data);
          }
        );
  };

  const getDetailOptions = (api, name) => {
    const nameCapitalized = name[0].toUpperCase() + name.substring(1);
    Axios.get(`https://quetzal-hug.com/api/${api + nameCapitalized}.php`).then(
      (res) => {
        setData(res.data);
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

  const getDataDetail = (api, id) => {
    api
      ? Axios.get(`https://quetzal-hug.com/api/${api + id}.php`).then((res) => {
          setDataDetail(res.data);
        })
      : null;
  };

  useEffect(() => {
    getOptions();
  }, [options]);

  const optionsMapped = options?.map((option) => {
    return (
      <MenuItem
        key={option.id}
        onClick={() => optionsMenuItem(option.id, option.api, option.name)}
      >
        {option.name}
      </MenuItem>
    );
  });

  const optionsDetailMapped = dataDetail?.map((option) => {
    return (
      <MenuItem
        key={option.id_detail}
        onClick={() =>
          optionsDetailMenuItem(option.api_detail, option.name_detail)
        }
      >
        {option.name_detail}
      </MenuItem>
    );
  });

  const optionsButton = (event) => {
    setOpen(!open);
    setAnchorEl(event.currentTarget);
  };

  const optionsDetailButton = () => {
    setOpenDetail(!openDetail);
  };

  const optionsMenuItem = (id, api, name) => {
    getData(api);
    getDataDetail(api, id);
    setTitle(name);
    setOpen(!open);
    setName(null);
  };

  const optionsDetailMenuItem = (api, name) => {
    getDetailOptions(api, name);
    setName(name);
    setOpenDetail(!openDetail);
  };

  const onClose = () => {
    setOpen(!open);
  };

  const onCloseDetail = () => {
    setOpenDetail(!openDetail);
  };

  const cAxisData = data?.map((item) => {
    return item.detail;
  });

  const seriesData = data?.map((value) => {
    return parseInt(value.amount);
  });

  const component = (
    <BarChart
      xAxis={[{ scaleType: "band", data: data ? cAxisData : ["Sin datos"] }]}
      series={[{ data: data ? seriesData : [0] }]}
      width={920}
      height={600}
      bottomAxis={null}
    />
  );

  const DetailButton = () => {
    return (
      <>
        <Button
          id="options-detail-button"
          aria-controls={openDetail ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={openDetail ? "true" : undefined}
          onClick={optionsDetailButton}
        >
          Buscar por escuela
        </Button>
        <Menu
          id="options-detail-menu"
          anchorEl={anchorEl}
          open={openDetail}
          onClose={onCloseDetail}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {optionsDetailMapped}
        </Menu>
      </>
    );
  };

  return (
    <>
      <Button
        id="options-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={optionsButton}
      >
        Opciones
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

      {dataDetail ? <DetailButton /> : null}

      <MainContainer
        title={name ? title + " " + name : title}
        component={component}
      />
    </>
  );
};

export default OptionsButton;
