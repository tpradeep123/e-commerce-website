import { useState } from "react";
import { useStyles } from "./BannersCss";
import { Button, Grid } from "@mui/material";
import { postData } from "../services/FetchNodeServices";
import Swal from "sweetalert2";
import { DropzoneArea } from "material-ui-dropzone";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function BannersInterface() {
  const classes = useStyles();
  const [status, setStatus] = useState("");
  const [banners, setBanners] = useState("");

  const handleClick = async () => {
    var formData = new FormData();
    formData.append("status", status);
    banners.map((item, index) => {
      formData.append("picture" + index, item);
    });
    var result = await postData("banners/banners_image_submit", formData);
    if (result.status) {
      Swal.fire({
        icon: "success",
        title: result.message,
        showConfirmButton: true,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: result.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div className={classes.headingStyle}>Banners Picture</div>
          </Grid>
          <Grid item xs={12}>
            <DropzoneArea
              acceptedFiles={["image/*"]}
              dropzoneText={"Drag and drop an image here or click"}
              filesLimit={6}
              onChange={(files) => setBanners(files)}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Status
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value="Show"
                  control={
                    <Radio
                      onChange={(event) => setStatus(event.target.value)}
                    />
                  }
                  label="Show"
                />
                <FormControlLabel
                  value="Hide"
                  control={
                    <Radio
                      onChange={(event) => setStatus(event.target.value)}
                    />
                  }
                  label="Hide"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <Button onClick={handleClick} variant="contained" fullWidth>
              Submit
            </Button>
          </Grid>

          <Grid item xs={6}>
            <Button variant="contained" fullWidth>
              Reset
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
