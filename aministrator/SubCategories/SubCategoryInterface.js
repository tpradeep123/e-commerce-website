import { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  Button,
  Avatar,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  IconButton,
} from "@mui/material";
import { useStyles } from "./SubCategoryCss";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { postData } from "../services/FetchNodeServices";
import Swal from "sweetalert2";
import { getData } from "../services/FetchNodeServices";
import ViewListIcon from "@mui/icons-material/ViewList";
import { useNavigate } from "react-router-dom";

export default function SubCategoryInterface() {
  const navigate = useNavigate();
  const classes = useStyles();
  const [status, setStatus] = useState("");
  const [icon, setIcon] = useState({ file: "/assets/cart.png", bytes: "" });
  const [subCategoryName, setSubCategoryName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [error, setError] = useState({});
  const [categoryList, setCategoryList] = useState([]);

  useEffect(function () {
    fetchAllCategory();
  }, []);

  const fetchAllCategory = async () => {
    var result = await getData("category/category_list");
    setCategoryList(result.data);
  };

  const fillCategory = () => {
    return categoryList.map((item) => {
      return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>;
    });
  };

  const handlePicture = (event) => {
    setIcon({
      file: URL.createObjectURL(event.target.files[0]),
      bytes: event.target.files[0],
    });
    handleError("icon", null);
  };

  const handleError = (input, value) => {
    setError((prev) => ({ ...prev, [input]: value }));
  };

  const validation = () => {
    var isValid = true;

    if (!categoryId) {
      handleError("categoryid", "Please Input category");
      isValid = false;
    }
    if (!subCategoryName) {
      handleError("subcategoryname", "Please Input Sub category");
      isValid = false;
    }
    if (!status) {
      handleError("status", "Please select Status");
      isValid = false;
    }
    if (!icon.bytes) {
      handleError("icon", "Please select icon");
      isValid = false;
    }
    return isValid;
  };

  const handleClick = async () => {
    console.log(error);
    if (validation()) {
      var formData = new FormData();
      formData.append("categoryid", categoryId);
      formData.append("subcategoryname", subCategoryName);
      formData.append("status", status);
      formData.append("icon", icon.bytes);
      var result = await postData("subcategory/subcategorysubmit", formData);
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
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <Grid container spacing={3}>
          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div className={classes.headingStyle}>Add New Sub Category</div>
            <div>
              <ViewListIcon
                color="primary"
                onClick={() => navigate("/dashboard/displayallsubcategory")}
              />
            </div>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Categories</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={categoryId}
                label="category id"
                onChange={(event) => {
                  setCategoryId(event.target.value);
                }}
                onFocus={() => handleError("categoryid", null)}
                error={error.categoryid ? true : false}
              >
                <MenuItem>-Select Status-</MenuItem>

                {fillCategory()}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              error={error.subcategoryname ? true : false}
              helperText={error.subcategoryname}
              onFocus={() => handleError("subcategoryname", null)}
              onChange={(event) => setSubCategoryName(event.target.value)}
              label="sub category name"
              variant="outlined"
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status}
                label="status"
                onChange={(event) => {
                  setStatus(event.target.value);
                }}
                onFocus={() => handleError("status", null)}
                error={error.status ? true : false}
              >
                <MenuItem value="-Select Status-">-Select Status-</MenuItem>
                <MenuItem value="Continue">Continue</MenuItem>
                <MenuItem value="Discontinue">Discontinue</MenuItem>
                <MenuItem value="Popular">Popular</MenuItem>
                <MenuItem value="Trending">Trending</MenuItem>
              </Select>
            </FormControl>
            <div className={classes.errorText}>{error.status}</div>
          </Grid>

          <Grid item xs={6}>
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
            >
              <input
                onChange={handlePicture}
                hidden
                accept="image/*"
                type="file"
              />
              <PhotoCamera />
            </IconButton>
            <div className={classes.errorText}>{error.icon}</div>
          </Grid>

          <Grid item xs={6}>
            <Avatar
              alt="icon"
              src={icon.file}
              style={{ width: 70, height: 70 }}
              variant="rounded"
            />
          </Grid>
          <Grid item xs={6}>
            <Button onClick={handleClick} variant="contained" fullWidth>
              Submit
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" fullWidth>
              reset
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
