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
import { useStyles } from "./ProductCss";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";

export default function DisplayAllProduct() {
  const navigate = useNavigate();
  const [productList, setProductList] = useState([]);
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

  const [productId, setProductId] = useState("");
  const [open, setOpen] = useState(false);
  const [btnStatus, setButtonStatus] = useState(false);
  const [oldPicture, setOldPicture] = useState("");
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

  const fillSubCategory = () => {
    return subCategoryList.map((item) => {
      return (
        <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
      );
    });
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
    /*if(!picture.bytes)
        {
        handleError('picture','Please select icon')
      isValid=false
        }*/

    return isValid;
  };
  const fetchProductList = async () => {
    var result = await getData("product/product_list");
    setProductList(result.data);
  };

  function showProduct() {
    return (
      <MaterialTable
        title="Product list"
        columns={[
          { title: "Category name", field: "categoryname" },
          { title: "Subcategory name", field: "subcategoryname" },
          { title: "Product name", field: "productname" },
          { title: "Discription", field: "description" },
          { title: "Status", field: "status" },
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
        data={productList}
        actions={[
          {
            icon: "edit",
            tooltip: "edit Product",
            onClick: (event, rowData) => handleOpen(rowData),
          },
          {
            icon: "add",
            tooltip: "Add User",
            isFreeAction: true,
            onClick: (event) => navigate("/dashboard/productinterface"),
          },
        ]}
      />
    );
  }

  const handlePicture = (event) => {
    setPicture({
      file: URL.createObjectURL(event.target.files[0]),
      bytes: event.target.files[0],
    });
    handleError("picture", null);
    setButtonStatus(true);
  };

  const handleCancel = () => {
    setPicture({ file: `${serverURL}/images/${oldPicture}`, bytes: "" });
    setButtonStatus(false);
  };

  const handleEditData = async () => {
    setOpen(false);
    if (Validation()) {
      var body = {
        productid: productId,
        categoryid: categoryId,
        subcategoryid: subCategoryId,
        productname: productName,
        description: description,
        status: status,
      };
      var result = await postData("product/product_edit_data", body);
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

  const handleDelete = async () => {
    setOpen(false);

    var body = { productid: productId };
    var result = await postData("product/product_delete_data", body);
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

  const showProductForm = () => {
    return (
      <div className={classes.displaybox}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <div className={classes.headingStyle}>Add new Product</div>
          </Grid>

          <Grid item xs={6}>
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
          <Grid item xs={6}>
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
          <Grid item xs={6}>
            <TextField
              value={productName}
              error={error.productname ? true : false}
              helperText={error.productname}
              onFocus={() => handleError("productname", null)}
              onChange={(event) => setProductName(event.target.value)}
              fullWidth
              variant="outlined"
              label="Product name"
            />
          </Grid>
          <Grid item xs={6}>
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
          <Grid item xs={12}>
            <TextField
              value={description}
              error={error.description ? true : false}
              helperText={error.description}
              onFocus={() => handleError("description", null)}
              onChange={(event) => setDescription(event.target.value)}
              fullWidth
              variant="outlined"
              label="Description"
            />
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
            <Button onClick={handleEditData} variant="contained" fullWidth>
              EDIT
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button onClick={handleDelete} variant="contained" fullWidth>
              DELETE
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  };

  useEffect(function () {
    fetchProductList();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = (rowData) => {
    fetchAllSubCategory(rowData.categoryid);
    setSubCategoryId(rowData.categoryid);
    setProductId(rowData.productid);
    setCategoryId(rowData.categoryid);
    setSubCategoryId(rowData.subcategoryid);
    setProductName(rowData.productname);
    setDescription(rowData.description);
    setStatus(rowData.status);
    setPicture({ file: `${serverURL}/images/${rowData.picture}`, bytes: "" });
    setOpen(true);
    setOldPicture(rowData.picture);
  };

  const handleEditIcon = async () => {
    setButtonStatus(false);
    setOpen(false);
    var formData = new FormData();
    formData.append("productid", productId);
    formData.append("picture", picture.bytes);
    var result = await postData("product/product_edit_picture", formData);
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

  const displayProductDialog = () => {
    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>{showProductForm()}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <div className={classes.displaycontainer}>
      <div className={classes.displaybox}>{showProduct()}</div>
      {displayProductDialog()}
    </div>
  );
}
