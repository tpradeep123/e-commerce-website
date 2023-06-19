import { serverURL } from "../../aministrator/services/FetchNodeServices";
import { Divider, Paper } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import PlusMinusComponent from "./PlusMinusComponent";
export default function CartProducts({ cartData, pageRefresh }) {
  var dispatch = useDispatch();
  const handleQtyChange = (selectedProduct, value) => {
    var product = selectedProduct;
    if (value >= 1) {
      product["qty"] = value;
      dispatch({
        type: "ADD_PRODUCT",
        payload: [product.productlistid, product],
      });
    } else {
      product["qty"] = 0;
      dispatch({
        type: "DELETE_PRODUCT",
        payload: [product.productlistid, product],
      });
    }
    pageRefresh();
  };
  const addCart = () => {
    return cartData.map((item) => {
      return (
        <div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div
              style={{
                display: "flex",
                width: "90%",
                marginTop: "2%",
                marginBottom: "2%",
              }}
            >
              <div
                style={{
                  width: "16%",
                  display: "flex",
                  justifyContent: "center",
                  padding: 5,
                  paddingRight: 30,
                  height: 90,
                }}
              >
                <img src={`${serverURL}/images/${item.picture}`} width="100%" />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ fontFamily: "Poppins" }}>
                  {item.productlistname}
                </div>
                <div style={{ fontFamily: "Poppins", fontSize: 12 }}>
                  {item.offer > 0 ? (
                    <div>
                      &#8377;{item.offer}/{item.weight}
                    </div>
                  ) : (
                    <div>
                      &#8377;{item.rate}/{item.weight}
                    </div>
                  )}
                  {item.weight}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    fontWeight: "bold",
                    marginTop: "1%",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "Poppins",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {item.offer > 0 ? (
                      <>&#8377;{item.offer * item.qty}</>
                    ) : (
                      <>&#8377;{item.rate * item.qty}</>
                    )}
                  </div>
                  <div
                    style={{
                      marginLeft: "7%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {item.offer > 0 ? (
                      <s>&#8377;{item.rate * item.qty}</s>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div style={{ marginTop: "3%", marginRight: "5%" }}>
              <PlusMinusComponent
                qty={item?.qty}
                onChange={(value) => handleQtyChange(item, value)}
              />
            </div>
          </div>
          <Divider style={{ marginLeft: "3%", marginRight: "3%" }}></Divider>
        </div>
      );
    });
  };
  return (
    <div style={{ width: "100%" }}>
      <Paper style={{ width: "100%" }} elevation={3}>
        {addCart()}
      </Paper>
    </div>
  );
}
