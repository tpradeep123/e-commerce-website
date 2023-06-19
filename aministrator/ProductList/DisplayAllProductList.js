import { useEffect, useState } from "react";
import MaterialTable from "@material-table/core";
import { getData, serverURL } from "../services/FetchNodeServices";
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

import Swal from "sweetalert2";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { postData } from "../services/FetchNodeServices";
import { useStyles } from "./ProductListCss";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";

export default function DisplayAllProductList() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const [productId, setProductId] = useState("");
  const [productListId, setProductListId] = useState("");
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
  const [productListData, setproductListData] = useState([]);
  const [open, setOpen] = useState(false);
  const [btnStatus, setButtonStatus] = useState(false);
  const [oldPicture, setOldPicture] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [productList, setProductList] = useState([]);

  ////    Category Dropdown fill    /////////
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

  //////    Subcategory dropdown Fill    ///////////////////
  const fetchAllSubCategory = async (cid) => {
    var result = await postData("subcategory/subcategorylist_by_categoryid", {
      categoryid: cid,
    });
    setSubCategoryList(result.data);
  };

  const fillSubCategory = () => {
    return subCategoryList.map((item) => {
      return (
        <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
      );
    });
  };

  /////////  Product dropdown Fill ////////////////////
  const fetchAllProduct = async (sid) => {
    var result = await postData("product/productlist_by_subcategoryid", {
      subcategoryid: sid,
    });
    setProductList(result.data);
  };

  const fillProduct = () => {
    return productList.map((item) => {
      return <MenuItem value={item.productid}>{item.productname}</MenuItem>;
    });
  };

  const fetchProductList = async () => {
    var result = await getData("productlist/productlist_list");
    setproductListData(result.data);
  };

  const handlePicture = (event) => {
    setPicture({
      file: URL.createObjectURL(event.target.files[0]),
      bytes: event.target.files[0],
    });
    handleError("picture", null);
    setButtonStatus(true);
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

    /* if(!picture.bytes)
     {
       handleError('picture','Pls fill Picture')
       isValid=false
     }*/

    return isValid;
  };

  ///////////  For Edit Dialog Data   /////////////////
  const handleEditData = async () => {
    setOpen(false);
    if (Validation()) {
      var body = {
        productlistid: productListId,
        categoryid: categoryId,
        subcategoryid: subCategoryId,
        productid: productId,
        productlistname: productListName,
        description: description,
        rate: rate,
        offer: offer,
        weight: weight,
        stock: stock,
        status: status,
      };
      var result = await postData("productlist/productlist_edit_data", body);
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
      fetchProductList();
    }
  };

  ///////    For Delete Data     ////////////////////
  const handleDelete = async () => {
    setOpen(false);

    var body = { productlistid: productListId };
    var result = await postData("productlist/productlist_delete_data", body);
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
    fetchProductList();
  };

  ///////   For Display Product List Form In Dialog  /////////////////

  const showProductListForm = () => {
    return (
      <div
        className={{
          width: "auto",
          height: "auto",
          padding: 15,
          background: "#fff",
          borderRadius: 20,
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <div className={classes.headingStyle}>Edit/Delete Product List</div>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={categoryId}
                label="category"
                onChange={(event) => setCategoryId(event.target.value)}
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
                onChange={(event) => setSubCategoryId(event.target.value)}
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
                label="Product"
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
              value={productListName}
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
              value={description}
              error={error.description ? true : false}
              helperText={error.description}
              onFocus={() => handleError("description", null)}
              onChange={(event) => setDescription(event.target.value)}
              label="description"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Weight</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={weight}
                label="weight"
                onChange={(event) => {
                  setWeight(event.target.value);
                }}
                onFocus={() => handleError("weight", null)}
                error={error.weight ? true : false}
              >
                <MenuItem value="-Select Status-">-Select Status-</MenuItem>
                <MenuItem value="kg">Kg</MenuItem>
                <MenuItem value="Liter">Liter</MenuItem>
                <MenuItem value="Piece">Piece</MenuItem>
              </Select>
            </FormControl>
            <div className={classes.errorText}>{error.weight}</div>
          </Grid>
          <Grid item xs={6}>
            <TextField
              value={stock}
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
              value={rate}
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
              value={offer}
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
          <Grid item xs={4}>
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
          <Grid item xs={4}>
            <Avatar
              alt="icon"
              src={picture.file}
              style={{ width: 70, height: 70 }}
              variant="rounded"
            />
          </Grid>
          <Grid item xs={4}>
            {btnStatus ? (
              <>
                <Button onClick={handleEditIcon}>SAVE</Button>
                <Button onClick={handleCancel}>CANCEL</Button>
              </>
            ) : (
              <></>
            )}
          </Grid>
          <Grid item xs={6}>
            <Button onClick={handleEditData} fullWidth variant="contained">
              EDIT
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button onClick={handleDelete} fullWidth variant="contained">
              DELETE
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  };

  //////////  Show Table Formate  ///////////////

  function showProductList() {
    return (
      <MaterialTable
        title="Product list"
        columns={[
          {
            title: "Category name",
            field: "categoryname",
            render: (rowData) => (
              <div>
                <div>{rowData.categoryname}</div>
                <div>{rowData.subcategoryname}</div>
              </div>
            ),
          },

          {
            title: "Product name",
            field: "productname",
            render: (rowData) => (
              <div>
                <div>{rowData.productname}</div>
                <div>{rowData.productlistname}</div>
              </div>
            ),
          },

          { title: "Description", field: "description" },
          {
            title: "Rate",
            field: "rate",
            render: (rowData) => (
              <div>
                <div>
                  <s>{rowData.rate}</s>
                </div>
                <div>{rowData.offer}</div>
              </div>
            ),
          },

          { title: "Weight", field: "weight" },
          {
            title: "Stock/Status",
            field: "stock",
            render: (rowData) => (
              <div>
                <div>{rowData.stock}</div>
                <div>{rowData.status}</div>
              </div>
            ),
          },

          {
            title: "Picture",
            field: "picture",
            render: (rowData) => (
              <Avatar
                src={`${serverURL}/images/${rowData.picture}`}
                style={{ width: 75 }}
                variant="rounded"
              />
            ),
          },
        ]}
        data={productListData}
        actions={[
          {
            icon: "edit",
            tooltip: "edit Product list",
            onClick: (event, rowData) => handleOpen(rowData),
          },
          {
            icon: "add",
            tooltip: "Add User",
            isFreeAction: true,
            onClick: (event) => navigate("/dashboard/productlistinterface"),
          },
        ]}
      />
    );
  }

  useEffect(function () {
    fetchProductList();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setPicture({ file: `${serverURL}/images/${oldPicture}`, bytes: "" });
    setButtonStatus(false);
  };

  const handleEditIcon = async () => {
    setButtonStatus(false);
    setOpen(false);
    var formData = new FormData();
    formData.append("productlistid", productListId);
    formData.append("picture", picture.bytes);
    var result = await postData(
      "productlist/productlist_edit_picture",
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
    fetchProductList();
  };

  const handleOpen = (rowData) => {
    fetchAllSubCategory(rowData.categoryid);
    fetchAllProduct(rowData.subcategoryid);
    setCategoryId(rowData.categoryid);
    setSubCategoryId(rowData.subcategoryid);
    setProductId(rowData.productid);
    setProductListId(rowData.productlistid);
    setProductListName(rowData.productlistname);
    setDescription(rowData.description);
    setRate(rowData.rate);
    setOffer(rowData.offer);
    setWeight(rowData.weight);
    setStock(rowData.stock);
    setStatus(rowData.status);
    setPicture({ file: `${serverURL}/images/${rowData.picture}`, bytes: "" });
    setOpen(true);
    setOldPicture(rowData.picture);
  };

  const displayProductListDialog = () => {
    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>{showProductListForm()}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>CANCEL</Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <div className={classes.displaycontainer}>
      <div className={classes.displaybox}>{showProductList()}</div>
      {displayProductListDialog()}
    </div>
  );
}
