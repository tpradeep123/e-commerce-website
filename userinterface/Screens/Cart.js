import Header from "../components/Header";
import { useStyles } from "../components/UserInterfaceCss";
import { Divider, Grid, Button } from "@mui/material";
import CartProducts from "../components/CartProducts";
import CartOffer from "../components/CartOffer";
import CartBill from "../components/CartBill";
import CartLocation from "../components/CartLocation";
import CartDeliveryTips from "../components/CartDeliveryTips";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Cart() {
  const classes = useStyles();
  const [refresh, setRefersh] = useState(false);
  const [userAddress, setUserAddress] = useState([]);
  const [btnTitle, setBtnTitle] = useState("ADDRESS TO PROCEEDE");
  const cart = useSelector((state) => state.products);
  const cartData = Object.values(cart);

  const pageRefresh = () => {
    setRefersh(!refresh);
  };
  return (
    <div>
      <Header />
      <div className={classes.homeMainDiv}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "78%",
            marginBottom: "1%",
            marginTop: "1%",
            marginLeft: "2%",
          }}
        >
          <div
            style={{
              fontFamily: "Poppins",
              fontSize: 20,
              fontWeight: "bold",
              marginLeft: "1%",
            }}
          >
            {`Cart (${cartData.length}) Items`}
          </div>
          <div
            style={{
              border: "1px solid #028A0F",
              width: "6%",
              borderRadius: 5,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "#ffffff",
            }}
          >
            Empty
          </div>
        </div>
        <div style={{ width: "100%", display: "flex" }}>
          <div style={{ width: "60%", marginLeft: "12%" }}>
            <CartProducts cartData={cartData} pageRefresh={pageRefresh} />
            <CartDeliveryTips />
          </div>
          <div style={{ width: "40%", marginRight: "10%" }}>
            <div style={{ paddingLeft: "5%" }}>
              <CartOffer />
              <div style={{ marginTop: "5%" }}>
                <CartBill pageRefresh={pageRefresh} />
              </div>
              <div style={{ marginTop: "5%" }}>
                <CartLocation
                  btnTitle={btnTitle}
                  setBtnTitle={setBtnTitle}
                  setUserAddress={setUserAddress}
                  userAddress={userAddress}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
