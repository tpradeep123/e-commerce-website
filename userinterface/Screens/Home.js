import { useState, useEffect } from "react";
import Header from "../components/Header";
import BannerComponent from "../components/BannerComponent";
import { useStyles } from "../components/UserInterfaceCss";
import CircleScrollComponent from "../components/CircleScrollComponent";
import ProductComponent from "../components/ProductComponent";
import Footer from "../components/Footer";
import BannerAds from "../components/BannerAds";
import BannersAds from "../components/BannerAds";
import {
  postData,
  getData,
} from "../../aministrator/services/FetchNodeServices";

export default function Home(props) {
  const classes = useStyles();
  const [banners, setBanners] = useState([]);
  const [category, setCategory] = useState([]);
  const [productsMilk, setProductsMilk] = useState([]);
  const [trending, setTrending] = useState([]);

  const fetchAllBanners = async () => {
    var result = await getData("userinterface/fetch_all_banners");
    var images = result.data.banners.split(",");
    setBanners(images);
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
    fetchAllBanners();
    fetchAllcategories("Continue");
    fetchAllcategories("Trending");
    fetchProductMilk("Milk, Bread & Butter");
  }, []);

  return (
    <div>
      <Header />
      <div className={classes.homeMainDiv}>
        <div className={classes.homeBannerDiv}>
          <BannerComponent images={banners} />
        </div>
        <div className={classes.homeBannerDiv}>
          <BannersAds />
        </div>
        <div className={classes.homeCircleDiv}>
          <CircleScrollComponent
            category={category}
            title="Popular Categories"
          />
        </div>
        <div className={classes.homeCircleDiv}>
          <ProductComponent
            title="Milk, Bread & Butter"
            products={productsMilk}
          />
        </div>
        <div className={classes.homeCircleDiv}>
          <CircleScrollComponent
            category={trending}
            title="Trending Categories"
          />
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
