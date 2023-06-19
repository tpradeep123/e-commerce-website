import React, { createRef } from "react";
import { useStyles } from "./UserInterfaceCss";
import { Button, Grid, Paper, Avatar } from "@mui/material";
import Divider from "@mui/material/Divider";

import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import { serverURL } from "../../aministrator/services/FetchNodeServices";

export default function CategoryListComponent({ data, getSubCategoryId }) {
  const classes = useStyles();

  const handleClick = (item) => {
    getSubCategoryId(item.subcategoryid, item.subcategoryname);
  };
  const listView = () => {
    return data.map((item) => {
      return (
        <div
          onClick={() => handleClick(item)}
          style={{
            cursor: "pointer",
            display: "flex",
            justifyContent: "left",
            width: 200,
            flexDirection: "column",
          }}
        >
          <Paper
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              height: 65,
            }}
            elevation={3}
          >
            <div>
              <Avatar
                src={`${serverURL}/images/${item.icon}`}
                sx={{ width: 56, height: 56 }}
              />
            </div>
            <div
              style={{
                fontFamily: "Poppins",
                fontSize: "100%",
                paddingLeft: "4%",
              }}
            >
              {item.subcategoryname}
            </div>
          </Paper>
          <Divider />
        </div>
      );
    });
  };

  return <div>{listView()}</div>;
}
