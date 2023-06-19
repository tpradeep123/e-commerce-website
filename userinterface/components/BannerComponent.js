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

export default function BannerComponent(props) {
  const classes = useStyles();
  var sliderRef = createRef();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const showImages = () => {
    return props.images.map((item) => {
      return (
        <div>
          <img src={`${serverURL}/images/${item}`} width="100%" />
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
    <div className={classes.arrowDiv}>
      <Slider {...settings} ref={sliderRef}>
        {showImages()}
      </Slider>
      {matches ? (
        <>
          <div className={classes.bannerLeftArrow}>
            <ArrowBackIosNewIcon
              className={classes.leftArrow}
              onClick={handleBackClick}
            />
          </div>
        </>
      ) : (
        <></>
      )}
      {matches ? (
        <>
          <div className={classes.bannerRightArrow}>
            <ArrowForwardIosIcon
              className={classes.rightArrow}
              onClick={handleForwadClick}
            />
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
