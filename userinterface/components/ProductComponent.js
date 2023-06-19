import React,{createRef} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {serverURL} from '../../aministrator/services/FetchNodeServices'
import { Button} from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useStyles } from "./UserInterfaceCss";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery,Paper } from "@mui/material";

export default function ProductComponent(props){

  var sliderRef=createRef()
  const theme= useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('sm'));
  const lg = useMediaQuery(theme.breakpoints.down('lg'));
  const md = useMediaQuery(theme.breakpoints.down('md'));
  const xs = useMediaQuery(theme.breakpoints.down('xs'));

  const classes=useStyles()
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: xs?1:sm?2:md?3:lg?4:6,
        slidesToScroll: 1,
        autoplay:false,
        autoplaySpeed:2000,
    
      };

     

    const showImages=()=>{
      return props.products.map((item)=>{
        return (<div className={classes.paperDiv}><Paper className={classes.productPaperDiv} elevation={2} variant="outlined">
            <div className={classes.productPaperImage} >
         <img src={`${serverURL}/images/${item.picture}` } width='80%'/>
        </div>
        <div className={classes.productPaperName}>{item.productlistname}</div>
        <div className={classes.productDetailsDiv}>
        <div className={classes.productDetailsName}>{item.weight}</div>
        <div className={classes.detailsButtonContainer}>
        <div className={classes.detailsDiv}>
        <div className={classes.productDetailsName}>{item.offer==0?<>&#8377;{item.rate}</>:<s>&#8377;{item.rate}</s>}</div>
        <div className={classes.productDetailsName}>{item.offer==0?<></>:<>&#8377;{item.offer}</>}</div>
        </div>
    <div className={classes.detailsButton}>
         <Button variant='outlined' color="success">Add</Button>
        </div>
        </div>
        </div>
        </Paper></div>)
      })
    }

    const handleBackClick=()=>{
      sliderRef.current.slickPrev() 
    }

    const handleForwadClick=()=>{
   sliderRef.current.slickNext()
    }
    return(

        <div>
          <div className={classes.categoryHeadingContainer}>
        <div className={classes.categoryTitle} style={{fontSize:!lg?22:16}}>
              {props.title}
            </div>
           {!lg?<> <div className={classes.categoryArrow}>
          <div>
           <ArrowBackIosNewIcon  className={classes.leftArrow}  onClick={handleBackClick}/>
           </div>
           <div >
            <ArrowForwardIosIcon className={classes.rightArrow} onClick={handleForwadClick} />
           </div>
           </div></>:<></>}
           </div>
           <Slider {...settings} ref={sliderRef}>
           {showImages()}
          </Slider>
        
        </div>
            )
}