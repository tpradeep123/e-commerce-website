import React, { createRef, useEffect, useState } from "react";
import { useStyles } from "./UserInterfaceCss";
import { Button, Grid, Paper, Avatar } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { serverURL } from "../../aministrator/services/FetchNodeServices";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { postData } from "../../aministrator/services/FetchNodeServices";

export default function SelectProductShowImage({ product }) {
  const classes = useStyles();
  const [getImages, setImages] = useState([]);
  var sliderRef = createRef();
  const [image, setImage] = useState("");
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    arrows: false,
  };

  const fetchAllPictures = async () => {
    var result = await postData(
      "userinterface/fetch_all_multipleimages_by_productlistid",
      { productlistid: product.productlistid }
    );
    var pic = result.data[0].pictures.split(",");
    setImages(pic);
    setImage(`${serverURL}/images/${pic[0]}`);
  };
  const handleChangeImage = (item) => {
    setImage(`${serverURL}/images/${item}`);
  };

  useEffect(function () {
    fetchAllPictures();
  }, []);

  const showImages = () => {
    return getImages.map((item) => {
      return (
        <div onClick={() => handleChangeImage(item)} style={{ margin: 2 }}>
          <Paper
            style={{
              cursor: "pointer",
              borderRadius: 10,
              paddingLeft: 10,
              width: 70,
              height: 80,
              display: "flex",
              justifyContent: "center",
              alignItem: "center",
            }}
            elevation={2}
            variant="outlined"
          >
            <div className={classes.productPageSliderDiv}>
              <img src={`${serverURL}/images/${item}`} width="100%" />
            </div>
          </Paper>
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
      <div style={{ width: "50%", marginTop: "10%", marginLeft: "25%" }}>
        <img src={image} width="100%" />
      </div>
      <div style={{ width: "100%" }}>
        <div style={{ width: "92%", display: "flex" }}>
          <div style={{ width: "6%", marginTop: "3%", marginRight: 10 }}>
            <div
              style={{
                cursor: "pointer",
                top: "45%",
                left: "1%",
                color: "#fff",
                zIndex: 1,
                width: 40,
                height: 40,
                borderRadius: 20,
                background: "#ecf0f1",
                opacity: 0.7,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ArrowBackIosNewIcon
                className={classes.adsLeftArrow}
                onClick={handleBackClick}
              />
            </div>
          </div>
          <div style={{ width: "95%" }}>
            <Slider {...settings} ref={sliderRef}>
              {showImages()}
            </Slider>
          </div>
          <div style={{ width: "6%", marginTop: "3%", marginRight: 10 }}>
            <div
              style={{
                cursor: "pointer",
                top: "45%",
                left: "1%",
                color: "#fff",
                zIndex: 1,
                width: 40,
                height: 40,
                borderRadius: 20,
                background: "#ecf0f1",
                opacity: 0.7,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ArrowForwardIosIcon
                className={classes.adsRightArrow}
                onClick={handleForwadClick}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
