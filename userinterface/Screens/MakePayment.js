import { useCallback, useEffect } from "react";
import useRazorpay from "react-razorpay";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { serverURL } from "../../aministrator/services/FetchNodeServices";

export default function MakePayment() {
  const Razorpay = useRazorpay();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  var user = useSelector((state) => state.user);
  var userdata = Object.values(user)[0];
  const products = useSelector((state) => state.products);
  const productList = Object.values(products);
  let total = productList.reduce((a, b) => {
    return a + b.offer * b.qty;
  }, 0);

  const handlePayment = () => {
    const options = {
      key: "rzp_test_GQ6XaPC6gMPNwH",
      amount: parseInt(total * 100),
      currency: "INR",
      name: "QuickShoppe",
      description: "Test Transaction",
      image: "/assets/quickshoppe.jpeg",

      handler: (res) => {
        console.log(res);

        dispatch({ type: "CLEAR_CART", payload: [] });
        navigate("/home");
      },
      prefill: {
        name: "pradeep",
        email: "youremail@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzpay = new Razorpay(options);
    rzpay.open();
  };

  useEffect(function () {
    var timeout = setTimeout(handlePayment, 1000);
  }, []);

  return <div className="App"></div>;
}
