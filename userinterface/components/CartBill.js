import { Paper, Divider } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { useSelector } from "react-redux";
import { useEffect } from "react";
export default function CartBill(props) {
  const cart = useSelector((state) => state.products);
  const cartData = Object.values(cart);

  useEffect(function () {
    props.pageRefresh();
  });

  var totalOffer = cartData.reduce((p1, p2) => {
    return p1 + p2.offer * p2.qty;
  }, 0);

  var totalAmount = cartData.reduce((p1, p2) => {
    return p1 + p2.rate * p2.qty;
  }, 0);

  var totalSaving = totalAmount - totalOffer;

  return (
    <Paper elevation={2}>
      <div style={{ display: "flex", flexDirection: "column", padding: "5%" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div style={{ marginTop: "1%", fontSize: 15 }}>Item total</div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "22%",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ marginTop: "1%" }}>
              <s>&#8377;{totalAmount}</s>
            </div>
            <div style={{ fontWeight: "bold" }}>&#8377;{totalOffer}</div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              marginTop: "1%",
              fontSize: 14,
              width: "59%",
              color: "#84817a",
              display: "flex",
              alignItem: "center",
              justifyContent: "cneter",
            }}
          >
            <div>Handling Charge</div>
            <div style={{ color: "#27ae60", marginLeft: "2%" }}>
              (&#8377;10 saved)
            </div>
            <InfoIcon
              style={{ cursor: "pointer", margin: "2%" }}
              fontSize="10px"
            />
          </div>
          <div style={{ marginTop: "1%" }}>
            {totalAmount > 0 ? <>5</> : <>0</>}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              marginTop: "1%",
              fontSize: 14,
              color: "#84817a",
              display: "flex",
              alignItem: "center",
              justifyContent: "cneter",
            }}
          >
            Delivery
            <InfoIcon
              style={{ marginTop: "6%", cursor: "pointer", marginLeft: "3%" }}
              fontSize="10px"
            />
          </div>
          <div style={{ marginTop: "1%" }}>
            {totalAmount > 499 ? <>0</> : <>50</>}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div style={{ marginTop: "1%" }}>To pay</div>
          <div style={{ marginTop: "1%" }}>&#8377;{totalOffer + 5}</div>
        </div>
        <Divider style={{ marginTop: "2%", marginBottom: "4%" }}></Divider>
      </div>
    </Paper>
  );
}
