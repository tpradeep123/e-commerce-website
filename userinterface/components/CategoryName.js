import React, { createRef, useState, useEffect } from "react";
import { useStyles } from "./UserInterfaceCss";

import { Button, Grid, Paper, Avatar, Box } from "@mui/material";
import Divider from "@mui/material/Divider";
import Slider from "react-slick";
import { serverURL } from "../../aministrator/services/FetchNodeServices";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import { getData } from "../../aministrator/services/FetchNodeServices";

export default function CategoryName(data) {
  const classes = useStyles();
  const [category, setCategory] = useState([]);

  const fetchCategory = async () => {
    var result = await getData("userinterface/fetch_all_category");
    setCategory(result.data);
  };

  useEffect(function () {
    fetchCategory();
  }, []);

  console.log("aaaa", category);

  const fetchCategoryName = () => {
    return category.map((item) => {
      return (
        <div
          style={{
            width: "12%",
            cursor: "pointer",
            direction: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div>{item.categoryname}</div>
        </div>
      );
    });
  };
  return (
    <Paper
      style={{
        width: "100%",
        height: "10%",
        display: "flex",
        flexDirection: "row",
      }}
      elevation={2}
    >
      {fetchCategoryName()}
    </Paper>
  );
}
