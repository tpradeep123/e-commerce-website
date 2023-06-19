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
import { useStyles } from "./SubCategoryCss";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";

export default function DisplayAllSubCategory() {
  const navigate = useNavigate();
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [open, setOpen] = useState(false);
  const [subCategoryId, setSubCategoryId] = useState("");
  const [status, setStatus] = useState("");
  const [icon, setIcon] = useState({ file: "/assets/cart.png", bytes: "" });
  const [subCategoryName, setSubCategoryName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [error, setError] = useState({});
  const [btnStatus, setButtonStatus] = useState(false);
  const [oldIcon, setOldIcon] = useState("");
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
    /* if(!icon.bytes)
    {
      handleError('icon','Please select icon')
      isValid=false
    }*/
    return isValid;
  };

  const handleEditData = async () => {
    setOpen(false);
    if (validation()) {
      var body = {
        subcategoryid: subCategoryId,
        categoryid: categoryId,
        subcategoryname: subCategoryName,
        status: status,
      };
      var result = await postData("subcategory/subcategory_edit_data", body);
      if (result.status) {
        console.log(result);
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
    fetchSubCategoryList();
  };

  const handlePicture = (event) => {
    setIcon({
      file: URL.createObjectURL(event.target.files[0]),
      bytes: event.target.files[0],
    });
    handleError("icon", null);
    setButtonStatus(true);
  };

  const handleCancel = () => {
    setIcon({ file: `${serverURL}/images/${oldIcon}`, bytes: "" });
    setButtonStatus(false);
  };

  const handleEditIcon = async () => {
    setButtonStatus(false);
    setOpen(false);
    var formData = new FormData();
    formData.append("subcategoryid", subCategoryId);
    formData.append("icon", icon.bytes);
    var result = await postData("subcategory/subcategory_edit_icon", formData);
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

    fetchSubCategoryList();
  };

  const handleDelete = async () => {
    setOpen(false);

    {
      var body = { subcategoryid: subCategoryId };
      var result = await postData("subcategory/subcategory_delete_data", body);
      if (result.status) {
        console.log(result);
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
    fetchSubCategoryList();
  };

  const showSubCategoryForm = () => {
    return (
      <div
        className={{
          width: "50vw",
          height: "auto",
          padding: 15,
          background: "#fff",
          borderRadius: 20,
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <div className={classes.headingStyle}>Add New Sub Category</div>
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
              value={subCategoryName}
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
            <div className={classes.errorText}>{error.icon}</div>
          </Grid>

          <Grid item xs={4}>
            <Avatar
              alt="icon"
              src={icon.file}
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
              Edit
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button onClick={handleDelete} variant="contained" fullWidth>
              Delete
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  };

  const classes = useStyles();

  const fetchSubCategoryList = async () => {
    var result = await getData("subcategory/subcategory_list");
    setSubCategoryList(result.data);
  };

  function showSubCategory() {
    return (
      <MaterialTable
        title="Sub category list"
        columns={[
          { title: "Category name", field: "categoryname" },
          { title: "Subcategory name", field: "subcategoryname" },
          { title: "Status", field: "status" },
          {
            title: "Icon",
            field: "icon",
            render: (rowData) => (
              <Avatar
                src={`${serverURL}/images/${rowData.icon}`}
                style={{ width: 75 }}
                variant="rounded"
              />
            ),
          },
        ]}
        data={subCategoryList}
        actions={[
          {
            icon: "edit",
            tooltip: "edit sub category",
            onClick: (event, rowData) => handleOpen(rowData),
          },
          {
            icon: "add",
            tooltip: "Add User",
            isFreeAction: true,
            onClick: (event) => navigate("/dashboard/subcategoryinterface"),
          },
        ]}
      />
    );
  }

  useEffect(function () {
    fetchSubCategoryList();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = (rowData) => {
    setSubCategoryId(rowData.subcategoryid);
    setCategoryId(rowData.categoryid);
    setSubCategoryName(rowData.subcategoryname);
    setStatus(rowData.status);
    setIcon({ file: `${serverURL}/images/${rowData.icon}`, bytes: "" });
    setOpen(true);
    setOldIcon(rowData.icon);
  };

  const displaySubCategoryDialog = () => {
    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>{showSubCategoryForm()}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  };
  return (
    <div className={classes.displaycontainer}>
      <div className={classes.displaybox}>{showSubCategory()}</div>
      {displaySubCategoryDialog()}
    </div>
  );
}
