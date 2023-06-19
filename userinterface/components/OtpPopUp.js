import {
  Dialog,
  Button,
  DialogContent,
  DialogTitle,
  DialogContentText,
  FormControl,
  TextField,
} from "@mui/material";
import { useState, useEffect } from "react";
import AddressPopUp from "./AddressPopUp";
import {
  postData,
  getData,
} from "../../aministrator/services/FetchNodeServices";
import { useDispatch } from "react-redux";
export default function OtpPopUp(props) {
  const [open, setOpen] = useState(props.status);
  const [getInputOtp, setInputOtp] = useState();
  const [status, setStatus] = useState(false);
  const [handleDialog, setHandleDialog] = useState(true);
  var dispatch = useDispatch();
  useEffect(
    function () {
      if (handleDialog) setOpen(props.status);
    },
    [props]
  );

  const handleClick = async () => {
    if (parseInt(props.otp) == parseInt(getInputOtp)) {
      var mobilenostatus = await postData("userinterface/check_mobile_no", {
        mobileno: props.mobileno,
      });
      if (mobilenostatus.status) {
        var addressstatus = await postData(
          "userinterface/check_address_by_mobile_no",
          { mobileno: props.mobileno }
        );
        if (addressstatus.status) {
          setOpen(false);
          setStatus(false);
          //phone number Status
          props.setStatus(false);
          setHandleDialog(false);
          props.setBtnTitle("Proceed to Payment");
          props.setUserAddress(addressstatus.data);
          dispatch({ type: "ADD_USER", payload: [addressstatus.data[0]] });
        } else {
          setStatus(true);
        }
      } else {
        setStatus(true);
      }
    } else alert("Invalid OTP");
  };

  const checkOtp = (event) => {
    var inputOtp = "";
    if (document.getElementById("first").value.length == 1) {
      document.getElementById("second").focus();
      inputOtp += document.getElementById("first").value;
    }
    if (document.getElementById("second").value.length == 1) {
      document.getElementById("third").focus();
      inputOtp += document.getElementById("second").value;
    }
    if (document.getElementById("third").value.length == 1) {
      document.getElementById("fourth").focus();
      inputOtp += document.getElementById("third").value;
    }
    if (document.getElementById("fourth").value.length == 1) {
      inputOtp += document.getElementById("fourth").value;
      setInputOtp(inputOtp);
    }
  };
  return (
    <div>
      <Dialog fullWidth open={open}>
        <DialogTitle
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "2%",
          }}
        >
          Phone Number Verification
        </DialogTitle>
        <DialogContent style={{ background: "#e6e6f0" }}>
          <DialogContentText
            style={{
              marginTop: "7%",
              display: "flex",
              color: "#2d3436",
              justifyContent: "center",
              fontFamily: "Poppins",
            }}
          >
            Enter 4 digit code sent to your phone
          </DialogContentText>
          <DialogContentText
            style={{
              marginTop: "1%",
              color: "#2d3436",
              display: "flex",
              justifyContent: "center",
              fontFamily: "Poppins",
            }}
          >
            {`+91xxxxxx${props.mobileno.substring(4)}`}
          </DialogContentText>
          <div
            style={{
              display: "flex",
              width: "70%",
              marginTop: "5%",
              marginLeft: "15%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TextField
              id="first"
              onChange={(event) => checkOtp(event)}
              style={{ width: "15%", marginRight: "5%" }}
            />
            <TextField
              id="second"
              onChange={(event) => checkOtp(event)}
              style={{ width: "15%", marginRight: "5%" }}
            />
            <TextField
              id="third"
              onChange={(event) => checkOtp(event)}
              style={{ width: "15%", marginRight: "5%" }}
            />
            <TextField
              id="fourth"
              onChange={(event) => checkOtp(event)}
              style={{ width: "15%" }}
            />
          </div>
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
              marginTop: "3%",
              marginBottom: "3%",
              display: "flex",
              color: "#2d3436",
              justifyContent: "center",
              fontFamily: "Poppins",
              fontSize: 13,
            }}
          >
            Resend code in (20 secs)
          </div>
        </DialogContent>
      </Dialog>
      <AddressPopUp mobileno={props.mobileno} status={status} />
    </div>
  );
}
