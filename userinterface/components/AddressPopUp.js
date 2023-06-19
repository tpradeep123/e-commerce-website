import {
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  Select,
  InputLabel,
  MenuItem,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import { useEffect, useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import { postData } from "../../aministrator/services/FetchNodeServices";

export default function AddressPopUp(props) {
  const [emailid, setEmailid] = useState("");
  const [open, setOpen] = useState(props.status);
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [addressOne, setAddressOne] = useState("");
  const [addressTwo, setAddressTwo] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  useEffect(
    function () {
      setOpen(props.status);
    },
    [props]
  );

  const handleSubmit = async () => {
    var body = {
      emailid: emailid,
      mobileno: props.mobileno,
      addressone: addressOne,
      addresstwo: addressTwo,
      state: state,
      city: city,
      pincode: zipCode,
      username: title + " " + name,
      addressstatus: "default",
    };
    var result = await postData("userinterface/add_address", body);
  };

  return (
    <div>
      <Dialog fullWidth open={open} maxWidth={"md"}>
        <DialogContent>
          <div style={{ width: "100%", display: "flex" }}>
            <div style={{ width: "50%", display: "flex", marginRight: "3%" }}>
              <img src="assets/googl_ED.jpg" width="100%" />
            </div>
            <div style={{ width: "50%" }}>
              <div
                style={{
                  fontFamily: "Poppins",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                Enter complete address
              </div>

              <div style={{ marginTop: "2%", color: "#95a5a6" }}>
                This allow us to find you easily and give you timely delivery
                experience
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: "3%",
                }}
              >
                <FormControl style={{ width: "25%" }}>
                  <InputLabel id="demo-simple-select-label">Title</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Title"
                    onChange={(event) => {
                      setTitle(event.target.value);
                    }}
                  >
                    <MenuItem value="Continue">Mr</MenuItem>
                    <MenuItem value="Discontinue">Miss</MenuItem>
                    <MenuItem value="Popular">Mrs</MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                  style={{ width: "70%", marginLeft: "5%" }}
                  label="Receiver's name"
                />
              </div>
              <TextField
                onChange={(event) => {
                  setEmailid(event.target.value);
                }}
                size="medium"
                label="email address"
                fullWidth
                style={{ marginTop: "3%" }}
              />
              <TextField
                onChange={(event) => {
                  setAddressOne(event.target.value);
                }}
                size="medium"
                label="Address one"
                fullWidth
                style={{ marginTop: "3%" }}
              />
              <TextField
                onChange={(event) => {
                  setAddressTwo(event.target.value);
                }}
                fullWidth
                style={{ marginTop: "3%" }}
                label="Address two"
              />
              <TextField
                onChange={(event) => {
                  setCity(event.target.value);
                }}
                fullWidth
                style={{ marginTop: "3%" }}
                label="City"
              />
              <TextField
                onChange={(event) => {
                  setState(event.target.value);
                }}
                fullWidth
                style={{ marginTop: "3%" }}
                label="State"
              />
              <TextField
                onChange={(event) => {
                  setZipCode(event.target.value);
                }}
                fullWidth
                style={{ marginTop: "3%" }}
                label="Zip code"
              />
              <div style={{ marginTop: "3%" }}>save address as</div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: "3%",
                }}
              >
                <div
                  style={{
                    marginRight: "3%",
                    border: "1px solid #028A0F",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "14%",
                    height: 25,
                    fontSize: 13,
                    borderRadius: 8,
                  }}
                >
                  Home
                </div>
                <div
                  style={{
                    marginRight: "3%",
                    border: "1px solid #028A0F",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "14%",
                    height: 25,
                    fontSize: 13,
                    borderRadius: 8,
                  }}
                >
                  Work
                </div>
                <div
                  style={{
                    border: "1px solid #028A0F",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "14%",
                    height: 25,
                    fontSize: 13,
                    borderRadius: 8,
                  }}
                >
                  Other
                </div>
              </div>
              <div
                style={{
                  marginTop: "5%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button
                  onClick={() => handleSubmit()}
                  fullWidth
                  variant="contained"
                  style={{ background: "#028A0F", width: "100%" }}
                >
                  save address
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
