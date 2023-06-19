import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputAdornment,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { useState, useEffect } from "react";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import OtpPopUp from "./OtpPopUp";

export default function PhoneVerification(props) {
  const [open, setOpen] = useState(props.status);
  const [status, setStatus] = useState(false);
  const [mobileno, setMobileno] = useState("");
  const [otpGen, setOtpGen] = useState("");

  useEffect(
    function () {
      setOpen(props.status);
    },
    [props]
  );

  const generateOtp = () => {
    var otp = parseInt(Math.random() * 8999) + 1000;
    alert(otp);
    setOtpGen(otp);
  };

  const handleClick = () => {
    setStatus(true);
    generateOtp();
  };

  return (
    <div>
      <Dialog fullWidth open={open}>
        <DialogTitle style={{ display: "flex", justifyContent: "center" }}>
          Phone Number Verification
        </DialogTitle>
        <DialogContent style={{ background: "#e6e6f0" }}>
          <DialogContentText
            style={{
              marginTop: "7%",
              display: "flex",
              justifyContent: "center",
              fontFamily: "Poppins",
            }}
          >
            Enter your phone number to login/Sign up
          </DialogContentText>
          <FormControl
            style={{
              marginTop: "7%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <OutlinedInput
              style={{ width: "60%" }}
              onChange={(event) => setMobileno(event.target.value)}
              startAdornment={
                <InputAdornment position="start">
                  <PhoneAndroidIcon />
                  +91
                </InputAdornment>
              }
            />
          </FormControl>
          <div
            style={{
              marginTop: "5%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              onClick={handleClick}
              fullWidth
              variant="contained"
              style={{ background: "#028A0F", width: "60%" }}
            >
              next
            </Button>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              fontFamily: "Poppins",
              fontSize: 14,
              color: "#7f8c8d",
              marginTop: "4%",
            }}
          >
            By continuing,you agree to our
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              marginTop: "4%",
            }}
          >
            <div
              style={{
                cursor: "pointer",
                marginRight: "5%",
                fontFamily: "Poppins",
                fontSize: 12,
              }}
            >
              <u>Terms of service</u>
            </div>
            <div
              style={{ cursor: "pointer", fontFamily: "Poppins", fontSize: 12 }}
            >
              <u>Privacy policy</u>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <OtpPopUp
        setStatus={props.setStatus}
        otp={otpGen}
        setBtnTitle={props.setBtnTitle}
        mobileno={mobileno}
        status={status}
        setUserAddress={props.setUserAddress}
        userAddress={props.userAddress}
      />
    </div>
  );
}
