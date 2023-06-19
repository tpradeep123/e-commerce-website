import { useState, useEffect } from "react";
import Header from "../components/Header";
import { useStyles } from "../components/UserInterfaceCss";
import ProductComponent from "../components/ProductComponent";
import Footer from "../components/Footer";
import { Grid } from "@mui/material";
import {postData,getData,} from "../../aministrator/services/FetchNodeServices";
import SubCategoryName from "../components/CategoryListComponent";
import { useNavigate, useLocation } from "react-router-dom";
import CategoryListComponent from "../components/CategoryListComponent";
import SingleProductDetails from "../components/SingleProductDetails";
import CategoryName from "../components/CategoryName";

export default function ProductViewWithCategory(props) {
  const classes = useStyles();
  const [subCategory, setSubcategory] = useState([]);
  const [subCategoryId, setSubCategoryId] = useState("");
  const [productList, setProductList] = useState([]);
  const [category, setCategory] = useState([]);
  const [productsMilk, setProductsMilk] = useState([]);
  const [trending, setTrending] = useState([]);
  const [subCategoryName, setSubCategoryName] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  //  console.log('location',location.state.categoryid)

  const fetchAllSubcategory = async () => {
    var result = await postData(
      "userinterface/fetch_all_subcategory_by_categoryid",
      { categoryid: location.state.categoryid }
    );

    setSubcategory(result.data);
  };

  const fetchAllcategories = async (status) => {
    var result = await postData("userinterface/fetch_all_category", {
      status: status,
    });
    if (status == "Continue") setCategory(result.data);
    else if (status == "Trending") setTrending(result.data);
  };

  const fetchProductMilk = async (subcategoryname) => {
    var result = await postData("userinterface/fetch_products_by_subcategory", {
      subcategoryname: subcategoryname,
    });
    setProductsMilk(result.data);
  };

  useEffect(function () {
    fetchAllSubcategory();
  }, []);

  const fetchAllProductSubcategory = async (scid) => {
    var result = await postData(
      "userinterface/fetch_all_products_by_subcategory",
      { subcategoryid: scid }
    );

    setProductList(result.data);
  };

  const getSubCategoryId = (scid, sname) => {
    setSubCategoryName(sname);
    setSubCategoryId(scid);
    fetchAllProductSubcategory(scid);
  };

  const fetchAllProductByCategory = async () => {
    var result = await postData(
      "userinterface/fetch_all_products_by_categoryid",
      { categoryid: location.state.categoryid }
    );
    setProductList(result.data);
  };

  useEffect(function () {
    fetchAllProductByCategory();
  }, []);

  const listofProducts = () => {
    return productList.map((item) => {
      return <SingleProductDetails item={item} url={"/selectproduct"} />;
    });
  };

  return (
    <div>
      <Header />
      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        <CategoryName />
      </div>
      <div className={classes.homeBannerDivContainor}>
        <Grid container spacing={2}>
          <Grid item={2}>
            <CategoryListComponent
              data={subCategory}
              getSubCategoryId={getSubCategoryId}
            />
          </Grid>
          <Grid item xs={10}>
            <div
              style={{
                fontFamily: "Poppins",
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              {subCategoryName} ({productList.length}) Items
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              {listofProducts()}
            </div>
          </Grid>
        </Grid>
        <div style={{ width: "100%", marginTop: 20 }}>
          <Footer />
        </div>
      </div>
    </div>
  );
}
