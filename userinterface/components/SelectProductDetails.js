export default function SelectProductDetails() {
  var details = [
    {
      id: "1",
      heading: "Key Features",
      details: "Wholesome taste  Healthy and nutritious milk Rich in calcium",
    },
    {
      id: "2",
      heading: "Ingredients",
      details: "Toned Milk,Fat,SNF",
    },
    {
      id: "3",
      heading: "Unit",
      details: "1 Lit",
    },
    {
      id: "4",
      heading: "Packing Type",
      details: "Tetra Pak",
    },
    {
      id: "5",
      heading: "Manufacturer Details",
      details:
        "Kaira District Co-operative Milk Producers Union Limited, Anand 388 001. At Food Complex Mogar, Mogar. Lic. No. - 10014021001010.",
    },
    {
      id: "6",
      heading: "Marketed By",
      details:
        "Procter & Gamble Plaza, Cardinal Gracious Road, Chakala, Andheri East, Mumbai, Maharashtra 400099",
    },
    {
      id: "7",
      heading: "Country Of Origin",
      details: "India",
    },
    {
      id: "8",
      heading: "Customer Care Details",
      details:
        "Email: info@quickshopee.com, Customer Care Number: +91-8982309405",
    },
    {
      id: "9",
      heading: "Expiry Date",
      details: "Please refer to the packaging of the product for expiry date",
    },
    {
      id: "10",
      heading: "Seller",
      details: "TAMS GLOBAL PRIVATE LIMITED",
    },
    {
      id: "11",
      heading: "Description",
      details:
        "Amul Taaza Toned (Tetrapak) Milk is pasteurized with great nutritional value. It can be consumed directly or can be used for preparing tea, coffee, sweets, khoya, curd, buttermilk, ghee etc.",
    },
    {
      id: "12",
      heading: "Disclaimer",
      details:
        "Every effort is made to maintain accuracy of all information. However, actual product packaging and materials may contain more and/or different information. It is recommended not to solely rely on the information presented.",
    },
  ];

  const fillDetails = () => {
    return details.map((item) => {
      return (
        <div>
          <div
            style={{
              width: "85%",
              marginTop: "2%",
              fontFamily: "Poppins",
              fontSize: 14,
            }}
          >
            {item.heading}
          </div>
          <div
            style={{
              width: "85%",
              fontFamily: "Poppins",
              fontSize: 13,
              color: "#7f8c8d",
            }}
          >
            {item.details}
          </div>
        </div>
      );
    });
  };
  return (
    <div>
      <div style={{ display: "flex" }}>
        <div
          style={{ fontSize: 20, fontWeight: "bold", fontFamily: "Poppins" }}
        >
          Product Details
        </div>
      </div>
      <div>{fillDetails()}</div>
    </div>
  );
}
