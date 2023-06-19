import { useState, useEffect } from "react";
import { AppBar, Toolbar, useMediaQuery } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useTheme } from "@mui/material/styles";
import { useStyles } from "./UserInterfaceCss";
import { useSelector } from "react-redux";
import Badge from "@mui/material/Badge";
import { useNavigate } from "react-router-dom";
import Cart from "../Screens/Cart";

export default function Header(props) {
  const classes = useStyles();
  const theme = useTheme();
  const navigate = useNavigate();
  var products = useSelector((state) => state.products);
  var totalproducts = Object.keys(products);
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <div className={classes.container}>
      <AppBar position="static" style={{ background: "#fff", width: "100%" }}>
        <Toolbar>
          <div className={classes.toolBarDiv}>
            <div
              className={classes.logoStyle}
              onClick={() => navigate("/home")}
            >
              {matches ? `Quickshoppe` : `QS`}
            </div>
            <div className={classes.searchBar}>
              <FormControl
                sx={{ m: 1, width: matches ? `60%` : `80%` }}
                variant="outlined"
              >
                <OutlinedInput
                  id="outlined-adornment-weight"
                  endAdornment={
                    <InputAdornment position="end">
                      <SearchOutlinedIcon />
                    </InputAdornment>
                  }
                  aria-describedby="outlined-weight-helper-text"
                  inputProps={{
                    "aria-label": "weight",
                  }}
                />
              </FormControl>
            </div>
            <div className={classes.icons}>
              <Badge badgeContent={totalproducts.length} color="error">
                <ShoppingCartIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/cart")}
                />
              </Badge>
              <PersonIcon style={{ paddingLeft: "3%" }} />
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
