import { useEffect, useState } from "react";
import { Button } from "@mui/material";
export default function PlusMinusComponent(props) {
  const [value, setValue] = useState();
  useEffect(() => {
    setValue(props.qty);
  }, [props]);
  const handlePlusClick = () => {
    setValue((prev) => {
      if (prev < 5) {
        props.onChange(prev + 1);
        return prev + 1;
      } else {
        props.onChange(prev);
        return prev;
      }
    });
  };

  const handleMinusClick = () => {
    setValue((prev) => {
      if (prev >= 1) {
        props.onChange(prev - 1);
        return prev - 1;
      }
    });
  };
  return (
    <div>
      <div style={{ marginLeft: "8%", marginTop: "2%", height: 30 }}>
        {value == 0 ? (
          <Button onClick={handlePlusClick} variant="outlined" color="success">
            ADD
          </Button>
        ) : (
          <div
            style={{
              border: "1px solid #028A0F",
              color: "#fff",
              background: "#028A0F",
              width: 65,
              height: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderRadius: 5,
            }}
          >
            <div
              onClick={handleMinusClick}
              style={{
                cursor: "pointer",
                background: "#028A0F",
                color: "#fff",
                fontWeight: "bold",
                width: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 1,
                paddingBottom: 3,
              }}
            >
              -
            </div>
            <div style={{ fontWeight: "bold" }}>{value}</div>
            <div
              onClick={handlePlusClick}
              style={{
                cursor: "pointer",
                background: "#028A0F",
                color: "#fff",
                fontWeight: "bold",
                width: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 1,
                paddingBottom: 3,
              }}
            >
              +
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
