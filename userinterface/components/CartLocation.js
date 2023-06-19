import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Paper } from "@mui/material";
import { useState } from "react";
import PhoneVerification from "./PhoneVerification";
import { propsToClassKey } from "@mui/styles";
import { useNavigate } from "react-router-dom";
export default function CartLocation(props) {
  const [status, setStatus] = useState(false);
  var navigate = useNavigate();
  const handleClick = () => {
    if (props.btnTitle == "ADDRESS TO PROCEEDE") setStatus(true);
    else navigate("/makepayment");
  };

  const showAddress = () => {
    return props.userAddress.map((item) => {
      return (
        <div style={{ direction: "flex", flexDirection: "column" }}>
          <div>{item.username}</div>
          <div>{item.addressone}</div>
          <div>{item.addresstwo}</div>
          <div>
            {item.city}, {item.state} {item.pincode}
          </div>
        </div>
      );
    });
  };
  return (
    <div>
      <Paper elevation={2}>
        <div style={{ padding: "3%" }}>
          <div
            style={{
              display: "flex",
              padding: "2% 2% 3% 1% ",
              alignItems: "center",
            }}
          >
            <LocationOnIcon fontSize="large" style={{ color: "#028A0F" }} />
            <div style={{ fontFamily: "Poppins", fontWeight: "bold" }}>
              Your Delivery Adderes
              {showAddress()}
            </div>
          </div>
          <div
            style={{
              padding: "3%",
              cursor: "pointer",
              borderRadius: 7,
              background: "#028A0F",
              display: "flex",
              justifyContent: "center",
              color: "#ffffff",
            }}
            onClick={handleClick}
          >
            {props.btnTitle}
          </div>
        </div>
      </Paper>
      <PhoneVerification
        setStatus={setStatus}
        status={status}
        setBtnTitle={props.setBtnTitle}
        setUserAddress={props.setUserAddress}
        userAddress={props.userAddress}
      />
    </div>
  );
}
