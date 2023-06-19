import React, { createRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { serverURL } from "../../aministrator/services/FetchNodeServices";
import { WidthFull } from "@mui/icons-material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useStyles } from "./UserInterfaceCss";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function CircleScrollComponent(props) {
  var navigate = useNavigate();
  var sliderRef = createRef();
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const lg = useMediaQuery(theme.breakpoints.down("lg"));
  const md = useMediaQuery(theme.breakpoints.down("md"));

  var color = [
    "#f6e58d",
    "#4cd137",
    "#00a8ff",
    "#45aaf2",
    "#fed330",
    "#2bcbba",
    "#ffaf40",
    "#ffb8b8",
    "#55efc4",
  ];

  const classes = useStyles();
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: sm ? 3 : md ? 3 : lg ? 4 : 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const handleClick = (item) => {
    navigate("/productviewwithcategory", {
      state: { categoryid: item.categoryid },
    });
  };

  const showImages = () => {
    return props.category.map((item) => {
      return (
        <div onClick={() => handleClick(item)} className={classes.categoryDiv}>
          <div
            className={sm ? classes.categoryCircle2 : classes.categoryCircle1}
            style={{
              background: color[parseInt(Math.random() * (color.length - 1))],
            }}
          >
            <img src={`${serverURL}/images/${item.icon}`} width="70%" />
          </div>
          <div className={sm ? classes.categoryName2 : classes.categoryName1}>
            {item.categoryname}
          </div>
        </div>
      );
    });
  };

  const handleBackClick = () => {
    sliderRef.current.slickPrev();
  };

  const handleForwadClick = () => {
    sliderRef.current.slickNext();
  };
  return (
    <div>
      <div className={classes.categoryHeadingContainer}>
        <div
          className={classes.categoryTitle}
          style={{ fontSize: !lg ? 22 : 16 }}
        >
          {props.title}
        </div>
        {!lg ? (
          <>
            {" "}
            <div className={classes.categoryArrow}>
              <div>
                <ArrowBackIosNewIcon
                  className={classes.leftArrow}
                  onClick={handleBackClick}
                />
              </div>
              <div>
                <ArrowForwardIosIcon
                  className={classes.rightArrow}
                  onClick={handleForwadClick}
                />
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
      <Slider {...settings} ref={sliderRef}>
        {showImages()}
      </Slider>
    </div>
  );
}
