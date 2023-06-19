var express = require("express");
var router = express.Router();
var pool = require("./pool");
var upload = require("./multer");

router.post("/banners_image_submit", upload.any(), function (req, res, next) {
  var pictures = "";
  req.files.map((item) => {
    {
      pictures += item.filename + ",";
    }
  });
  pictures = pictures.substring(0, pictures.length - 1);

  try {
    pool.query(
      "insert into banners(banners,status) values(?,?)",
      [pictures, req.body.status],
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

module.exports = router;
