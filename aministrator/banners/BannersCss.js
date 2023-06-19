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
    width: "50vw",
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
  errorText: {
    fontSize: 12,
    color: "red",
    paddingTop: 5,
    paddingLeft: 10,
  },
  displaycontainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "#d1d8e0",
    background: "#95a5a6",
    // width: '100vw',
    height: "88vh",
  },

  displaybox: {
    width: "60vw",
    height: "auto",
    padding: 15,
    background: "#fff",
    borderRadius: 20,
  },
});
