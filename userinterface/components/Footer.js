import React from "react";
import { Grid, Button, Divider } from "@mui/material";
import { useStyles } from "./UserInterfaceCss";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import AppleIcon from "@mui/icons-material/Apple";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

export default function Footer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const lg = useMediaQuery(theme.breakpoints.down("lg"));
  const md = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <div className={classes.footerContainer}>
      <Grid container spacing={3}>
        <Grid item xs={sm ? 12 : 3}>
          <div className={classes.footerGrid1}>
            <div className={classes.footerLogoName}>
              {md ? <>QS</> : <>QuickShoppe</>}
            </div>
            <div className={classes.fotterIconDiv}>
              <InstagramIcon
                className={classes.footerIconInsta}
                fontSize="large"
              />
              <TwitterIcon className={classes.footerIcon} fontSize="large" />
              <LinkedInIcon className={classes.footerIcon} fontSize="large" />
              <FacebookIcon className={classes.footerIcon} fontSize="large" />
            </div>
            <div style={{ color: "#576574" }}>TomarIndustry@Limited</div>
          </div>
        </Grid>
        <Grid item xs={sm ? 6 : 3}>
          <div className={classes.footerGrid2}>
            <p>home</p>
            <p>Delivery Areas</p>
            <p>Careers</p>
            <p>Customer Support</p>
            <p>Press</p>
          </div>
        </Grid>
        <Grid item xs={sm ? 6 : 3}>
          <div className={classes.footerGrid3}>
            <p>Privacy Policy</p>
            <p>Terms of Use</p>
            <p>Risponsible Disclosure Policy</p>
          </div>
        </Grid>
        <Grid item xs={sm ? 12 : 3}>
          <div className={classes.footerGrid4}>
            <p>Download App</p>
            <Button
              style={{ marginTop: "1%", width: "70%", color: "#576574" }}
              variant="outlined"
              startIcon={<PhoneAndroidIcon />}
            >
              download
            </Button>
            <Button
              style={{
                size: "large",
                marginTop: "3%",
                width: "70%",
                color: "#576574",
              }}
              variant="outlined"
              startIcon={<AppleIcon />}
            >
              download
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
