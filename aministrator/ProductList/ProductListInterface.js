import React from "react";
import {
  TextField,
  Avatar,
  Grid,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useStyles } from "./ProductListCss";
import { PhotoCamera } from "@mui/icons-material";
import { postData, getData } from "../services/FetchNodeServices";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import ViewListIcon from "@mui/icons-material/ViewList";

export default function ProductListInterface() {
  const navigate = useNavigate();
  const classes = useStyles();
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const [productId, setProductId] = useState("");
  const [productListName, setProductListName] = useState("");
  const [description, setDescription] = useState("");
  const [rate, setRate] = useState("");
  const [offer, setOffer] = useState("");
  const [weight, setWeight] = useState("");
  const [stock, setStock] = useState("");
  const [status, setStatus] = useState("");
  const [picture, setPicture] = useState({
    file: "/assets/cart.png",
    bytes: "",
  });
  const [error, setError] = useState({});
  const [categoryList, setCategoryList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [type, setType] = useState("");

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
      handleError("categoryid", "Pls fill categoryid");
      isValid = false;
    }

    if (!subCategoryId) {
      handleError("subcategoryid", "Pls fill subcategoryid");
      isValid = false;
    }

    if (!productId) {
      handleError("productid", "Pls fill productid");
      isValid = false;
    }

    if (!productListName) {
      handleError("productlistname", "Pls fill productlistname");
      isValid = false;
    }

    if (!description) {
      handleError("description", "Pls fill description");
      isValid = false;
    }

    if (!rate) {
      handleError("rate", "Pls fill rate");
      isValid = false;
    }

    if (!offer) {
      handleError("offer", "Pls fill offer");
      isValid = false;
    }

    if (!weight) {
      handleError("weight", "Pls fill weight");
      isValid = false;
    }
    if (!stock) {
      handleError("stock", "Pls fill stock");
      isValid = false;
    }

    if (!status) {
      handleError("status", "Pls fill status");
      isValid = false;
    }

    if (!picture.bytes) {
      handleError("picture", "Pls fill Picture");
      isValid = false;
    }

    return isValid;
  };

  const handleClick = async () => {
    if (Validation()) {
      var formData = new FormData();
      formData.append("categoryid", categoryId);
      formData.append("subcategoryid", subCategoryId);
      formData.append("productid", productId);
      formData.append("productlistname", productListName);
      formData.append("description", description);
      formData.append("offer", offer);
      formData.append("rate", rate);
      formData.append("weight", weight + " " + type);
      formData.append("stock", stock);
      formData.append("status", status);
      formData.append("picture", picture.bytes);
      var result = await postData("productlist/productlistsubmit", formData);
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
            <div className={classes.headingStyle}>Add New Product List</div>
            <div>
              <ViewListIcon
                color="primary"
                onClick={() => navigate("/dashboard/displayallproductlist")}
              />
            </div>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={categoryId}
                label="sub category"
                onChange={handleCategoryChange}
                onFocus={() => handleError("categoryid", null)}
                error={error.categoryid ? true : false}
              >
                <MenuItem value="-Select Status-">-Select Status-</MenuItem>
                {fillCategory()}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
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
                onFocus={() => handleError("subcategoryid", null)}
                error={error.subcategoryid ? true : false}
              >
                <MenuItem value="-Select Status-">-Select Status-</MenuItem>
                {fillSubCategory()}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Product</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={productId}
                label="sub category"
                onChange={(event) => setProductId(event.target.value)}
                onFocus={() => handleError("productid", null)}
                error={error.productid ? true : false}
              >
                <MenuItem value="-Select Status-">-Select Status-</MenuItem>
                {fillProduct()}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              error={error.productlistname ? true : false}
              helperText={error.productlistname}
              onFocus={() => handleError("productlistname", null)}
              onChange={(event) => setProductListName(event.target.value)}
              label="product list name"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              error={error.description ? true : false}
              helperText={error.description}
              onFocus={() => handleError("description", null)}
              onChange={(event) => setDescription(event.target.value)}
              label="description"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              error={error.weight ? true : false}
              helperText={error.weight}
              onFocus={() => handleError("weight", null)}
              onChange={(event) => setWeight(event.target.value)}
              label="Weight"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={type}
                label="type"
                onChange={(event) => {
                  setType(event.target.value);
                }}
              >
                <MenuItem value="-Select Status-">-Select Status-</MenuItem>
                <MenuItem value="kg">Kg</MenuItem>
                <MenuItem value="ltr">ltr</MenuItem>
                <MenuItem value="ml">ml</MenuItem>
                <MenuItem value="g">g</MenuItem>
                <MenuItem value="Piece">Piece</MenuItem>
              </Select>
            </FormControl>
            <div className={classes.errorText}>{error.weight}</div>
          </Grid>
          <Grid item xs={4}>
            <TextField
              error={error.stock ? true : false}
              helperText={error.stock}
              onFocus={() => handleError("stock", null)}
              onChange={(event) => setStock(event.target.value)}
              label="stock"
              variant="outlined"
              fullWidth
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              error={error.rate ? true : false}
              helperText={error.rate}
              onFocus={() => handleError("rate", null)}
              onChange={(event) => setRate(event.target.value)}
              label="rate"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              error={error.offer ? true : false}
              helperText={error.offer}
              onFocus={() => handleError("offer", null)}
              onChange={(event) => setOffer(event.target.value)}
              label="offer"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
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
            <Button onClick={handleClick} fullWidth variant="contained">
              SUBMIT
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button fullWidth variant="contained">
              RESET
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
