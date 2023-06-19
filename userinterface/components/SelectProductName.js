import TimerIcon from "@mui/icons-material/Timer";
import SelectProductUnit from "./SelectProductUnit";
import { Divider } from "@mui/material";
export default function SelectProductName({ product, refershPage }) {
  var productDetails = [
    {
      id: 1,
      category: "Home",
      subcategory: "Milk",
      product: "Amul Taza Milk",
      company: "Amul",
      delivery: "10 MINS",
    },
  ];

  const showProductName = () => {
    return (
      <div>
        <div style={{ width: "98%" }}>
          <div
            style={{
              display: "flex",
              width: "98%",
              padding: 5,
              marginLeft: "6%",
              marginTop: "10%",
              fontFamily: "Poppins",
            }}
          >
            <div style={{ fontSize: 13 }}>
              {"xxxxxx"} / {"xxxxx"} / {"xxxxxxxxx"}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "Poppins",
              paddingLeft: "6%",
            }}
          >
            <div style={{ fontSize: 25, fontWeight: "bold" }}>
              {product.productlistname}
            </div>
          </div>
          <div style={{ display: "flex", height: 18 }}>
            <div
              style={{
                display: "flex",
                background: "#ecf0f1",
                fontFamily: "Poppins",
                marginLeft: "6%",
                justifyContent: "center",
                alignItems: "center",
                width: "10%",
              }}
            >
              <div>
                <TimerIcon style={{ fontSize: "13px" }} />
              </div>
              <div style={{ fontSize: 13, fontWeight: "bold" }}>{"10 MIN"}</div>
            </div>
          </div>
          <div
            style={{
              fontFamily: "Poppins",
              fontSize: 18,
              marginLeft: "6%",
              padding: 5,
              color: "green",
              fontWeight: "bold",
            }}
          >
            View all by {"amul"}
          </div>
          <Divider />
          <SelectProductUnit product={product} refershPage={refershPage} />
        </div>
      </div>
    );
  };
  return <div>{showProductName()}</div>;
}
