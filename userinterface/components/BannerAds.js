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

export default function BannersAds(props) {
  const classes = useStyles();
  var sliderRef = createRef();
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };

  var images = [
    { id: 1, images: "d1.avif" },
    { id: 2, images: "d2.avif" },
    { id: 3, images: "d3.avif" },
    { id: 4, images: "d4.avif" },
    { id: 5, images: "d5.avif" },
    { id: 6, images: "d6.avif" },
  ];

  const showImages = () => {
    return images.map((item) => {
      return (
        <div>
          <div style={{ width: "99%", height: "50%" }}>
            <img src={`${serverURL}/images/${item.images}`} width="90%" />
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
    <div style={{ width: "100%", height: "100%", paddingTop: "2%" }}>
      <div>
        <Slider {...settings} ref={sliderRef}>
          {showImages()}
        </Slider>
        <div className={classes.bannerAdsLeftArrow}>
          <ArrowBackIosNewIcon
            className={classes.adsLeftArrow}
            onClick={handleBackClick}
          />
        </div>
        <div className={classes.bannerAdsRightArrow}>
          <ArrowForwardIosIcon
            className={classes.adsRightArrow}
            onClick={handleForwadClick}
          />
        </div>
      </div>
    </div>
  );
}
