import { AppBar, Toolbar, Grid, Paper, Avatar } from "@mui/material";
import { serverURL } from "../services/FetchNodeServices";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";
import { Route, Routes } from "react-router-dom";
import CategoryInterface from "../categories/CategoryInterface";
import SubCategoryInterface from "../SubCategories/SubCategoryInterface";
import DisplayAllCategory from "../categories/DisplayAllCategory";
import DisplayAllSubCategory from "../SubCategories/DisplayAllSubCategory";
import DisplayAllProduct from "../Product/DisplayAllProduct";
import ProductInterface from "../Product/ProductInterface";
import ProductListInterface from "../ProductList/ProductListInterface";
import DisplayAllProductList from "../ProductList/DisplayAllProductList";
import BannersInterface from "../banners/BannersInterface";
import ProductPictures from "../productpicture/ProductPicture";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  var admin = JSON.parse(localStorage.getItem("ADMIN"));

  const navigate = useNavigate();
  return (
    <div>
      <AppBar style={{ background: "#fff" }}>
        <Toolbar>
          <div
            style={{
              color: "#000",
              fontFamily: "Poppins",
              letterSpacing: 1,
              fontWeight: "bold",
              fontSize: 24,
            }}
          >
            QuickShopee
          </div>
        </Toolbar>
      </AppBar>
      <div style={{ marginTop: "5%" }}>
        <Grid container spacing={3}>
          <Grid item xs={2}>
            <Paper
              style={{
                width: 200,
                display: "flex",
                flexDirection: "column",
                margin: 5,
                padding: 5,
                marginButtom: 10,
              }}
            >
              <Paper
                elevation={3}
                style={{
                  background: "#bdc3c7",
                  flexDirection: "column",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 10,
                  marginBottom: 10,
                }}
              >
                <Avatar
                  src={`${serverURL}/images/pradeep.jpg`}
                  style={{ width: 70, height: 70, paddingButtom: 5 }}
                />
                <div
                  style={{
                    fontFamily: "Poppins",
                    fontWeight: "bold",
                    paddingBottom: 5,
                  }}
                >
                  {admin.adminname}
                </div>

                <div
                  style={{
                    fontSize: 12,
                    fontFamily: "Poppins",
                    fontWeight: "bold",
                    paddingBottom: 5,
                  }}
                >
                  {admin.emailid}
                </div>
              </Paper>
              <List>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => navigate("/dashboard/displayallcategory")}
                  >
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <span
                          style={{ fontFamily: "Poppins", fontWeight: "500" }}
                        >
                          Category
                        </span>
                      }
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => navigate("/dashboard/displayallsubcategory")}
                  >
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <span
                          style={{ fontFamily: "Poppins", fontWeight: "500" }}
                        >
                          Sub Category
                        </span>
                      }
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => navigate("/dashboard/displayallproduct")}
                  >
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <span
                          style={{ fontFamily: "Poppins", fontWeight: "500" }}
                        >
                          Product
                        </span>
                      }
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => navigate("/dashboard/displayallproductlist")}
                  >
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <span
                          style={{ fontFamily: "Poppins", fontWeight: "500" }}
                        >
                          Product List
                        </span>
                      }
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => navigate("/dashboard/productpictures")}
                  >
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <span
                          style={{ fontFamily: "Poppins", fontWeight: "500" }}
                        >
                          Product Pictures
                        </span>
                      }
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => navigate("/dashboard/bannersinterface")}
                  >
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <span
                          style={{ fontFamily: "Poppins", fontWeight: "500" }}
                        >
                          Banners
                        </span>
                      }
                    />
                  </ListItemButton>
                </ListItem>
                <Divider />
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <span
                          style={{ fontFamily: "Poppins", fontWeight: "500" }}
                        >
                          Logout
                        </span>
                      }
                    />
                  </ListItemButton>
                </ListItem>
              </List>
            </Paper>
          </Grid>
          <Grid item xs={10}>
            <Routes>
              <Route
                element={<CategoryInterface />}
                path="/categoryinterface"
              />
              <Route
                element={<SubCategoryInterface />}
                path="/subcategoryinterface"
              />
              <Route
                element={<DisplayAllCategory />}
                path="/displayallcategory"
              />
              <Route
                element={<DisplayAllSubCategory />}
                path="/displayallsubcategory"
              />
              <Route
                element={<DisplayAllProduct />}
                path="/displayallproduct"
              />
              <Route element={<ProductInterface />} path="/productinterface" />
              <Route
                element={<ProductListInterface />}
                path="/productlistinterface"
              />
              <Route
                element={<DisplayAllProductList />}
                path="/displayallproductlist"
              />
              <Route element={<BannersInterface />} path="/bannersinterface" />
              <Route element={<ProductPictures />} path="/productpictures" />
            </Routes>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
