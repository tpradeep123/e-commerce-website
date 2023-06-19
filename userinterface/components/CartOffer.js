import { Paper } from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
export default function CartOffer() {
  return (
    <Paper elevation={2}>
      <div style={{ padding: "3%" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: "2%",
            marginLeft: "2%",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", flexDirection: "row" }}>
            <LocalOfferIcon style={{ color: "#27ae60" }} />
            <div style={{ fontFamily: "Poppins" }}>Avail Offers/Coupons</div>
          </div>
          <div style={{ marginRight: "2%" }}>
            <ArrowRightIcon style={{ color: "#028A0F", cursor: "pointer" }} />
          </div>
        </div>
      </div>
    </Paper>
  );
}
