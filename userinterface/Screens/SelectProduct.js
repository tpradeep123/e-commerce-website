import Header from "../components/Header";
import Divider from "@mui/material/Divider";
import SelectProductShowImage from "../components/SelectProductShowImage";
import { useStyles } from "../components/UserInterfaceCss";
import SelectProductDetails from "../components/SelectProductDetails";
import SelectProductName from "../components/SelectProductName";
import WhyQuickShopee from "../components/WhyQuickShopee";
import Footer from "../components/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
export default function SelectProduct() {
  const classes = useStyles();
  var location = useLocation();
  var navigate = useNavigate();
  var product = location.state.product;
  const [refersh, setRefersh] = useState(false);
  const refershPage = () => {
    setRefersh(!refersh);
  };
  return (
    <div>
      <Header />
      <div className={classes.homeMainDiv}>
        <div style={{ width: "100%", display: "flex" }}>
          <div style={{ width: "50%" }}>
            <SelectProductShowImage product={product} />
            <Divider
              style={{ marginTop: "5%", marginBottom: "5%", width: "98%" }}
            />
            <SelectProductDetails />
          </div>
          <Divider
            orientation="vertical"
            flexItem
            style={{ marginLeft: "2%" }}
          ></Divider>
          <div style={{ width: "50%" }}>
            <SelectProductName product={product} refershPage={refershPage} />

            <Divider style={{ marginTop: "3%", marginBottom: "3%" }} />
            <WhyQuickShopee />
          </div>
        </div>
      </div>
      <Divider />
      <Footer />
    </div>
  );
}
