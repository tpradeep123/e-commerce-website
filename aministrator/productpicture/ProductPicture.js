import React from "react";
import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useStyles } from "./ProductPictureCss";
import { getData, postData } from "../services/FetchNodeServices";
import { DropzoneArea } from "material-ui-dropzone";
import Swal from "sweetalert2";

export default function ProductPictures() {
  const classes = useStyles();
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const [productId, setProductId] = useState("");
  const [productListId, setProductListId] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [productListName, setProductListName] = useState([]);
  const [error, setError] = useState({});
  const [productPicture, setProductPicture] = useState("");

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

  const fetchAllProduct = async (sid) => {
    var result = await postData("product/productlist_by_subcategoryid", {
      subcategoryid: sid,
    });
    setProductList(result.data);
  };

  const handleSubCategoryChange = (event) => {
    setSubCategoryId(event.target.value);
    fetchAllProduct(event.target.value);
  };

  const fillProduct = () => {
    return productList.map((item) => {
      return <MenuItem value={item.productid}>{item.productname}</MenuItem>;
    });
  };

  const fetchAllProductList = async (pid) => {
    var result = await postData(
      "productpictures/productlistname_by_productid",
      { productid: pid }
    );
    setProductListName(result.data);
  };

  const handleProductChange = (event) => {
    setProductId(event.target.value);
    fetchAllProductList(event.target.value);
  };

  const fillProductList = () => {
    return productListName.map((item) => {
      return (
        <MenuItem value={item.productlistid}>
          {item.productlistname} {item.weight}
        </MenuItem>
      );
    });
  };

  const handleClick = async () => {
    var formData = new FormData();
    formData.append("categoryid", categoryId);
    formData.append("subcategoryid", subCategoryId);
    formData.append("productid", productId);
    formData.append("productlistid", productListId);
    productPicture.map((item, index) => {
      formData.append("pictures" + index, item);
    });

    var result = await postData(
      "productpictures/productpictures_submit",
      formData
    );
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
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <div className={classes.headingStyle}>Product Pictures</div>
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={categoryId}
                label="category"
                onChange={handleCategoryChange}
                /* onFocus={()=>handleError('categoryid',null)}*/
                error={error.categoryid ? true : false}
              >
                {fillCategory()}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Sub category
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={subCategoryId}
                label="sub category"
                onChange={handleSubCategoryChange}
                /* onFocus={()=>handleError('subcategoryid',null)}*/
                error={error.subcategoryid ? true : false}
              >
                {fillSubCategory()}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Product</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={productId}
                label="sub category"
                onChange={handleProductChange}
                /*onFocus={()=>handleError('productid',null)}*/
                error={error.productid ? true : false}
              >
                {fillProduct()}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Product List
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={productListId}
                label="Product List"
                onChange={(event) => setProductListId(event.target.value)}
                /* onFocus={()=>handleError('productid',null)}*/
                error={error.productlistid ? true : false}
              >
                {fillProductList()}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <DropzoneArea
              acceptedFiles={["image/*"]}
              dropzoneText={"Drag and drop an image here or click"}
              filesLimit={6}
              onChange={(files) => setProductPicture(files)}
            />
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
