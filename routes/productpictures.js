var express = require("express");
var router = express.Router();
var pool = require("./pool");
var upload = require("./multer");

router.post("/productpictures_submit", upload.any(), function (req, res, next) {
  var pictures = "";
  req.files.map((item) => {
    {
      pictures += item.filename + ",";
    }
  });
  pictures = pictures.substring(0, pictures.length - 1);
  try {
    pool.query(
      "insert into productpictures(categoryid,subcategoryid,productid,productlistid,pictures) values(?,?,?,?,?)",
      [
        req.body.categoryid,
        req.body.subcategoryid,
        req.body.productid,
        req.body.productlistid,
        pictures,
      ],
      function (error, result) {
        if (error) {
          return res
            .status(200)
            .json({ status: false, message: "Server error (Database)..." });
        } else {
          return res
            .status(200)
            .json({ status: true, message: "Banners Submit Succesfully..." });
        }
      }
    );
  } catch (e) {
    return res
      .status(200)
      .json({
        status: false,
        message: "server not respond please contact administrator...",
      });
  }
});

router.post("/productlistname_by_productid", function (req, res, next) {
  try {
    pool.query(
      "select PL.*,(select P.productname from products P where P.productid=PL.productid) as productname from productlist PL where PL.productid=?",
      [req.body.productid],
      function (error, result) {
        if (error) {
          return res.status(200).json({ status: false, data: [] });
        } else {
          return res.status(200).json({ status: true, data: result });
        }
      }
    );
  } catch (e) {
    return res.status(200).json({ status: false, data: [] });
  }
});

module.exports = router;
