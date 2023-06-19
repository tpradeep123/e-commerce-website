import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  container: {
    width: "100vw",
  },

  appBar: {
    background: "#fff",
    width: "100%",
  },

  toolBarDiv: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },

  logoStyle: {
    color: "#000",
    fontFamily: "Poppins",
    fontSize: 24,
    cursor: "pointer",
  },

  searchBar: {
    display: "flex",
    justifyContent: "center",
    width: "80%",
    paddingLeft: 3,
    paddingRight: 3,
  },

  icons: {
    color: "#2980b9",
    marginLeft: "auto",
    display: "flex",
    justifyContent: "space-between",
  },
  homeMainDiv: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    marginLeft: "2%",
    marginRight: "2%",
    marginTop: "1%",
  },

  homeBannerDiv: {
    width: "100%",
  },

  homeCircleDiv: {
    width: "100%",
    marginTop: 20,
  },
  arrowDiv: {
    position: "relative",
  },

  leftArrow: {
    color: "#000",
  },

  rightArrow: {
    color: "#000",
  },

  bannerLeftArrow: {
    position: "absolute",
    top: "45%",
    left: "1%",
    zIndex: 1,
    width: 40,
    height: 40,
    borderRadius: 20,
    background: "#fff",
    opacity: 0.7,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  bannerRightArrow: {
    position: "absolute",
    top: "45%",
    right: "1%",
    zIndex: 1,
    width: 40,
    height: 40,
    borderRadius: 20,
    background: "#fff",
    opacity: 0.7,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  categoryDiv: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItem: "center",
    cursor: "pointer",
  },

  categoryCircle1: {
    padding: 2,
    width: 160,
    height: 160,
    borderRadius: 80,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },

  categoryCircle2: {
    padding: 2,
    width: 80,
    height: 80,
    borderRadius: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },

  categoryName1: {
    textAlign: "center",
    margin: 5,
    width: 180,
    fontfamily: "Poppins",
    fontSize: 14,
    fontWeight: 700,
  },

  categoryName2: {
    textAlign: "center",
    margin: 5,
    width: 90,
    fontfamily: "Poppins",
    fontSize: 10,
    fontWeight: 700,
  },

  categoryHeadingContainer: {
    padding: 5,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  categoryTitle: {
    fontfamily: "Poppins",
    fontWeight: "bold",
    marginBottom: 10,
  },

  categoryArrow: {
    display: "flex",
    flexDirection: "row",
    width: "4%",
  },

  paperDiv: {
    margin: 2,
  },

  productPaperDiv: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItem: "center",
    paddingBottom: 10,
    width: 180,
    height: 250,
  },

  productPaperImage: {
    padding: 2,
    width: 178,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },

  productPaperName: {
    textAlign: "center",
    margin: 5,
    width: 180,
    fontfamily: "Poppins",
    fontSize: 14,
    fontWeight: 700,
  },

  productDetailsDiv: {
    width: 178,
    fontFamily: "Poppins",
    padding: 2,
    display: "flex",
    flexDirection: "column",
  },

  productDetailsName: {
    paddingLeft: 10,
    fontSize: 12,
  },

  detailsButtonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  detailsDiv: {
    display: "flex",
    flexDirection: "column",
  },

  detailsButton: {
    paddingRight: 10,
  },

  footerContainer: {
    width: "100vw",
    height: "35vh",
    marginTop: 30,
  },

  footerIcon: {
    paddingLeft: "5%",
    color: "#576574",
  },

  footerIconInsta: {
    color: "#576574",
  },

  footerGrid1: {
    display: "flex",
    flexDirection: "column",
    marginLeft: "14%",
    marginTop: "10%",
  },

  footerLogoName: {
    fontFamily: "Poppins",
    fontSize: 35,
  },

  footerIconDiv: {
    paddingTop: 10,
    color: "#576574",
  },

  footerGrid2: {
    marginLeft: "15%",
    marginTop: "11%",
  },

  footerText: {
    paddingBottom: "5%",
  },

  footerGrid3: {
    marginLeft: "15%",
    marginTop: "11%",
  },

  footerGrid4: {
    marginLeft: "15%",
    marginTop: "11%",
    display: "flex",
    flexDirection: "column",
  },

  footerDownloadText: {
    paddingBottom: "5%",
  },

  productPageContainer: {
    width: "100vw",
    height: "100vh",
  },

  productLeftArrow: {
    position: "absolute",
    top: "45%",
    left: "1%",
    zIndex: 1,
    width: 30,
    height: 30,
    borderRadius: 15,
    background: "red",
    opacity: 0.7,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  productpageDetailsHeading: {
    fontFamily: "Poppins",
    fontSize: 17,
    paddingTop: "2%",
    letterSpacing: 1,
    fontWeight: 600,
  },

  productpageDetails: {
    fontFamily: "Poppins",
    fontSize: 13,
    letterSpacing: 1,
  },

  productPageSliderDiv: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  productImageDiv: {
    width: "50vw",
    height: "65vh",
  },

  productImage: {
    paddingLeft: "13%",
    width: "100%",
    direction: "flex",
    alignItem: "center",
    justifyContent: "center",
  },

  productSliderDiv: {
    paddingLeft: "8%",
    paddingTop: "2%",
    paddingRight: "8%",
    height: "7%",
  },

  productDetailMainDiv: {
    paddingLeft: "8%",
    display: "flex",
    justifyContent: "left",
    flexDirection: "column",
  },

  productDetailsHeadingText: {
    fontFamily: "Poppins",
    fontSize: 27,
    fontWeight: 700,
    letterSpacing: 1,
    paddingTop: "5%",
  },

  productPageGrid2Div: {
    width: "50vw",
    height: "100vh",
  },

  productGrid2FirstDiv: {
    marginTop: "7%",
    marginLeft: "6%",
  },

  productG2FirstLine: {
    fontSize: 13,
  },

  productG2ProductName: {
    fontFamily: "Poppins",
    fontSize: 25,
    fontWeight: "bold",
    paddingTop: "1%",
  },

  timer: {
    display: "flex",
    alignItems: "center",
    paddingTop: "1%",
  },

  viewAll: {
    fontFamily: "Poppins",
    fontSize: 20,
    color: "green",
    paddingTop: "1%",
    paddingBottom: "2%",
  },

  buttonMainContainer: {
    marginTop: "2%",
    marginLeft: "6%",
  },

  buttonMainDiv: {
    display: "flex",
    flexDirection: "row",
    paddingTop: "2%",
    width: "30%",
    justifyContent: "space-between",
  },

  button1Div: {
    borderStyle: "solid",
    borderWidth: "thin",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: 90,
    height: 65,
    borderRadius: 15,
  },

  buttonWeight: {
    paddingLeft: "30%",
  },

  buttonRate: {
    paddingLeft: "36%",
  },

  button2Rate: {
    paddingLeft: "36%",
    paddingLeft: "30%",
  },

  addButtonContainer: {
    display: "flex",
    alignItems: "center",
    paddingTop: "2%",
  },

  addButtonDiv: {
    borderStyle: "solid",
    borderWidth: "thin",
    borderColor: "#4cd137",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: 90,
    height: 35,
    borderRadius: 10,
  },

  buttonText: {
    paddingLeft: "30%",
    boarder: "thin",
    fontWeight: "bold",
    color: "#009432",
  },

  productGrid2detailscontainer: {
    display: "flex",
    flexDirection: "column",
    paddingLeft: "6%",
    paddingTop: "2%",
  },

  G2detailsText: {
    fontFamily: "Poppins",
    fontWeight: "bold",
    paddingBottom: "2%",
  },

  details1Div: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
  },
  textDiv: {
    display: "flex",
    flexDirection: "column",
    paddingLeft: "2.5%",
  },
  textStyle: {
    fontSize: 13,
  },
  details2Div: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    paddingTop: "2%",
    paddingBottom: "2%",
  },
  details3Div: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
  },

  productIconButton: {
    display: "flex",
    flexDirection: "row",
    background: "green",
  },

  productImageIcon: {
    display: "flex",
    alignItems: "center",
    width: "50%",
    justifyContent: "center",
    background: "red",
  },

  productIconText: {
    display: "flex",
    alignItems: "center",
    style: "Poppins",
    fontSize: "100%",
    fontWeight: 400,
  },

  bannerAdsLeftArrow: {
    position: "absolute",
    top: "68%",
    left: "1%",
    zIndex: 1,
    width: 30,
    height: 30,
    borderRadius: 15,
    background: "#f1c40f",
    opacity: 0.9,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  bannerAdsRightArrow: {
    position: "absolute",
    top: "68%",
    right: "2%",
    zIndex: 1,
    width: 30,
    height: 30,
    borderRadius: 15,
    background: "#f1c40f",
    opacity: 0.9,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  adsLeftArrow: {
    color: "#000",
  },

  adsRightArrow: {
    color: "#000",
  },

  productImageLeftArrow: {
    position: "absolute",
    top: "45%",
    left: "1%",
    zIndex: 1,
    width: 40,
    height: 40,
    borderRadius: 20,
    background: "#fff",
    opacity: 0.7,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  productRightArrow: {
    position: "absolute",
    top: "45%",
    right: "1%",
    zIndex: 1,
    width: 40,
    height: 40,
    borderRadius: 20,
    background: "#fff",
    opacity: 0.7,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
