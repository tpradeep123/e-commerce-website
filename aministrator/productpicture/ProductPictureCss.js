import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#d1d8e0",
    // width: '100vw',
    height: "88vh",
  },

  box: {
    width: "60vw",
    height: "auto",
    padding: 15,
    background: "#fff",
    borderRadius: 20,
  },
  headingStyle: {
    fontFamily: "Poppins",
    fontWeight: 600,
    letterSpacing: 1,
    fontSize: 18,
  },
});
