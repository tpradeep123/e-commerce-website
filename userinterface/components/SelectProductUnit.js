import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import {
  getData,
  postData,
} from "../../aministrator/services/FetchNodeServices";
import PlusMinusComponent from "./PlusMinusComponent";
import { useDispatch, useSelector } from "react-redux";
export default function SelectProductUnit({ product, refershPage }) {
  const [units, setUnits] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(product);
  const cart = useSelector((state) => state.products);
  const cartItems = Object.values(cart);
  const searchInCart = () => {
    var searchProducts = cartItems.filter((item) => {
      return item.productlistid == product.productlistid;
    });
    if (searchProducts?.length != 0) setSelectedProduct(searchProducts[0]);
    else {
      product["qty"] = 0;
      setSelectedProduct(product);
    }
  };

  useEffect(() => {
    searchInCart();
  }, []);

  var dispatch = useDispatch();
  const fetchAllProductUnits = async () => {
    var result = await postData(
      "userinterface/fetch_all_products_by_productid",
      { productid: product.productid }
    );

    setUnits(result.data);
  };

  useEffect(function () {
    fetchAllProductUnits();
  }, []);

  const handleClick = (item, index) => {
    item["qty"] = 0;
    setSelectedProduct(item);
  };

  const handleQtyChange = (value) => {
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
    refershPage();
  };
  const showProductDetails = () => {
    return units.map((item, index) => {
      return (
        <div
          onClick={() => handleClick(item, index)}
          style={{
            marginRight: "3%",
            cursor: "pointer",
            width: "20%",
            height: "auto",
            borderRadius: 20,
            border:
              item.productlistid == selectedProduct.productlistid
                ? "1px solid #4cd137"
                : "1px solid #dcdde1",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              background: "#0984e3",
              borderBottomLeftRadius: 8,
              borderBottomRightRadius: 8,
              width: "50%",
              height: "auto",
              marginLeft: "25%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                padding: 2,
                fontFamily: "Poppins",
                fontSize: 10,
                color: "white",
                fontWeight: "bold",
              }}
            >
              {parseInt(((item.rate - item.offer) / item.rate) * 100)}% OFF
            </div>
          </div>
          <div
            style={{
              height: "auto",
              width: "80%",
              marginLeft: "10%",
              marginTop: "2%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                fontFamily: "Poppins",
                fontSize: 13,
                fontWeight: "bold",
              }}
            >
              {item.weight}
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div
                style={{
                  fontFamily: "Poppins",
                  fontSize: 13,
                  fontWeight: "bold",
                  paddingRight: "20%",
                }}
              >
                {item.offer == 0 ? (
                  <> &#8377;{item.rate}</>
                ) : (
                  <s>&#8377;{item.rate}</s>
                )}
              </div>
              <div
                style={{
                  fontFamily: "Poppins",
                  fontSize: 13,
                  fontWeight: "bold",
                }}
              >
                &#8377;{item.offer}
              </div>
            </div>
          </div>
        </div>
      );
    });
  };
  return (
    <div>
      <div
        style={{
          marginLeft: "6%",
          color: "#7f8c8d",
          marginTop: "2%",
          fontSize: 13,
          fontFamily: "Poppins",
        }}
      >
        Select Unit
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginLeft: "6%",
          marginTop: "2%",
        }}
      >
        {showProductDetails()}
      </div>
      <PlusMinusComponent
        qty={selectedProduct?.qty}
        onChange={handleQtyChange}
      />
    </div>
  );
}
