import React, { createRef } from "react";
import Slider from "react-slick";
import { serverURL } from "../../aministrator/services/FetchNodeServices";
import { Button } from "@mui/material";
import { useStyles } from "./UserInterfaceCss";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function SingleProductDetails(props) {
  var item = props.item;
  var navigate = useNavigate();
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const lg = useMediaQuery(theme.breakpoints.down("lg"));
  const md = useMediaQuery(theme.breakpoints.down("md"));
  const xs = useMediaQuery(theme.breakpoints.down("xs"));

  const classes = useStyles();

  const handleClick = (item) => {
    navigate(props.url, { state: { product: item } });
  };
  const showImages = () => {
    return (
      <div onClick={() => handleClick(item)} className={classes.paperDiv}>
        <Paper
          className={classes.productPaperDiv}
          style={{ cursor: "pointer" }}
          elevation={2}
          variant="outlined"
        >
          <div className={classes.productPaperImage}>
            <img src={`${serverURL}/images/${item.picture}`} width="80%" />
          </div>
          <div className={classes.productPaperName}>{item.productlistname}</div>
          <div className={classes.productDetailsDiv}>
            <div className={classes.productDetailsName}>{item.weight}</div>
            <div className={classes.detailsButtonContainer}>
              <div className={classes.detailsDiv}>
                <div className={classes.productDetailsName}>
                  {item.offer == 0 ? (
                    <>&#8377;{item.rate}</>
                  ) : (
                    <s>&#8377;{item.rate}</s>
                  )}
                </div>
                <div className={classes.productDetailsName}>
                  {item.offer == 0 ? <></> : <>&#8377;{item.offer}</>}
                </div>
              </div>
              <div className={classes.detailsButton}>
                <Button variant="outlined" color="success">
                  Add
                </Button>
              </div>
            </div>
          </div>
        </Paper>
      </div>
    );
  };

  return <div>{showImages()}</div>;
}
