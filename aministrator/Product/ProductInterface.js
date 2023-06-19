import React from "react";
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
import { useStyles } from "./ProductCss";
import { PhotoCamera } from "@mui/icons-material";
import { postData, getData } from "../services/FetchNodeServices";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import ViewListIcon from "@mui/icons-material/ViewList";

export default function ProductInterface() {
  const navigate = useNavigate();
  const classes = useStyles();
  const [picture, setPicture] = useState({
    file: "/assets/cart.png",
    bytes: "",
  });
  const [productName, setProductName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);

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

  const fetchAllSubCategory = async (cid) => {
    var result = await postData("subcategory/subcategorylist_by_categoryid", {
      categoryid: cid,
    });
    setSubCategoryList(result.data);
  };

  const handleCategoryChange = (event) => {
    setCategoryId(event.target.value);
    fetchAllSubCategory(event.target.value);
  };

  const fillSubCategory = () => {
    return subCategoryList.map((item) => {
      return (
        <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
      );
    });
  };

  const handlePicture = (event) => {
    setPicture({
      file: URL.createObjectURL(event.target.files[0]),
      bytes: event.target.files[0],
    });
    handleError("picture", null);
  };

  const handleError = (input, value) => {
    setError((prev) => ({ ...prev, [input]: value }));
  };

  const Validation = () => {
    var isValid = true;

    if (!categoryId) {
      handleError("categoryid", "Pls Fill category Name");
      isValid = false;
    }

    if (!subCategoryId) {
      handleError("subcategoryid", "Pls Fill Sub Category Name");
      isValid = false;
    }

    if (!productName) {
      handleError("productname", "Pls Fill Product Name");
      isValid = false;
    }

    if (!description) {
      handleError("description", "Pls Fill Descripton");
      isValid = false;
    }

    if (!status) {
      handleError("status", "Please select Status");
      isValid = false;
    }
    if (!picture.bytes) {
      handleError("picture", "Please select icon");
      isValid = false;
    }

    return isValid;
  };

  const handleClick = async () => {
    console.log(error);
    if (Validation()) {
      var formData = new FormData();
      formData.append("categoryid", categoryId);
      formData.append("subcategoryid", subCategoryId);
      formData.append("productname", productName);
      formData.append("description", description);
      formData.append("status", status);
      formData.append("picture", picture.bytes);
      var result = await postData("product/productsubmit", formData);
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
            <div className={classes.headingStyle}>Add new Product</div>
            <div>
              <ViewListIcon
                color="primary"
                onClick={() => navigate("/dashboard/displayallproduct")}
              />
            </div>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Categories</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={categoryId}
                label="category id"
                onChange={handleCategoryChange}
                onFocus={() => handleError("categoryid", null)}
                error={error.categoryid ? true : false}
              >
                <MenuItem>-Select Status-</MenuItem>

                {fillCategory()}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Sub Categories
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={subCategoryId}
                label="sub category id"
                onChange={(event) => {
                  setSubCategoryId(event.target.value);
                }}
                onFocus={() => handleError("subcategoryid", null)}
                error={error.subcategoryid ? true : false}
              >
                <MenuItem>-Select Status-</MenuItem>

                {fillSubCategory()}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={error.productname ? true : false}
              helperText={error.productname}
              onFocus={() => handleError("productname", null)}
              onChange={(event) => setProductName(event.target.value)}
              fullWidth
              variant="outlined"
              label="Product name"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={error.description ? true : false}
              helperText={error.description}
              onFocus={() => handleError("description", null)}
              onChange={(event) => setDescription(event.target.value)}
              fullWidth
              variant="outlined"
              label="Description"
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
                onChange={(event) => setStatus(event.target.value)}
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
            <div className={classes.errorText}>{error.picture}</div>
          </Grid>
          <Grid item xs={6}>
            <Avatar
              alt="icon"
              src={picture.file}
              style={{ width: 70, height: 70 }}
              variant="rounded"
            />
          </Grid>
          <Grid item xs={6}>
            <Button onClick={handleClick} variant="contained" fullWidth>
              SUBMIT
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" fullWidth>
              RESET
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
