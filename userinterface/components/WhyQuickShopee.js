import { serverURL } from "../../aministrator/services/FetchNodeServices";

export default function WhyQuickShopee() {
  var features = [
    {
      id: "1",
      name: "Superfast Delivery",
      details:
        "Get your order delivered to your doorstep at the earliest from dark stores near you.",
      logo: "10_minute_delivery.avif",
    },
    {
      id: "2",
      name: "Best Prices & Offers",
      details:
        "Best price destination with offers directly from the manufacturers.",
      logo: "Best_Prices_Offers.avif",
    },
    {
      id: "3",
      name: " Wide Assortment",
      details:
        "Choose from 5000+ products across food, personal care, household & other categories.",
      logo: "Wide_Assortment.avif",
    },
  ];

  const showDetails = () => {
    return features.map((item) => {
      return (
        <div>
          <div
            style={{
              display: "flex",
              width: "85%",
              padding: 10,
              marginLeft: "5%",
              fontFamily: "Poppins",
            }}
          >
            <div>
              <img src={`${serverURL}/images/${item.logo}`} width="100%" />
            </div>
            <div style={{ marginLeft: "2%" }}>
              <div
                style={{
                  fontFamily: "Poppins",
                  fontSize: 13,
                  fontweight: "bold",
                }}
              >
                {item.name}
              </div>
              <div
                style={{
                  fontSize: 12,
                  fontFamily: "Poppins",
                  color: "#7f8c8d",
                }}
              >
                {item.details}
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
        style={{ marginLeft: "6%", fontWeight: "bold", fontFamily: "Poppins" }}
      >
        Why shop from WhyQuickShopee
      </div>
      {showDetails()}
    </div>
  );
}
