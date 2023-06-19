import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#d1d8e0",
    // width: '100vw',
    height: "auto",
  },

  box: {
    width: "60vw",
    height: "80vh",
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
    justifyContent: "center",
    background: "#d1d8e0",
    //width: '100vw',
    height: "auto",
  },

  displaybox: {
    width: "75vw",
    height: "auto",
    padding: 10,
    background: "#fff",
    borderRadius: 20,
  },
});
