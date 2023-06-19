import { Paper } from "@mui/material";
export default function CartDeliveryTips() {
  return (
    <Paper elevation={2} style={{ width: "100%", marginTop: "2%" }}>
      <div style={{ padding: "3%" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "left",
            flexDirection: "column",
          }}
        >
          <div style={{ fontFamily: "Poppins", fontWeight: "bold" }}>
            Delivery partner tip
          </div>
          <div
            style={{
              fontFamily: "Poppins",
              fontSize: 13,
              color: "#84817a",
              marginTop: "1%",
            }}
          >
            The entire amount will be sent to your delivery partner
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div
            style={{
              width: "12%",
              border: "1px solid #8395a7",
              borderRadius: 10,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 25,
              marginTop: "2%",
              marginRight: "2%",
            }}
          >
            &#8377; 10
          </div>
          <div
            style={{
              width: "12%",
              border: "1px solid #8395a7",
              borderRadius: 10,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 25,
              marginTop: "2%",
              marginRight: "2%",
            }}
          >
            &#8377; 20
          </div>
          <div
            style={{
              width: "12%",
              border: "1px solid #8395a7",
              borderRadius: 10,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 25,
              marginTop: "2%",
              marginRight: "2%",
            }}
          >
            &#8377; 35
          </div>
          <div
            style={{
              width: "12%",
              border: "1px solid #8395a7",
              borderRadius: 10,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 25,
              marginTop: "2%",
            }}
          >
            &#8377; 50
          </div>
        </div>
      </div>
    </Paper>
  );
}
