var express = require("express");
var router = express.Router();
var pool = require("./pool");
var upload = require("./multer");

/* GET home page. */
router.post(
  "/categorysubmit",
  upload.single("icon"),
  function (req, res, next) {
    try {
      pool.query(
        "insert into category(categoryname,status,icon) values(?,?,?)",
        [req.body.categoryname, req.body.status, req.file.filename],
        function (error, result) {
          if (error) {
            return res
              .status(200)
              .json({ status: false, message: "Server Error(Database) ...." });
          } else {
            return res
              .status(200)
              .json({
                status: true,
                message: "Category submitted Sucessfully....",
              });
          }
        }
      );
    } catch (e) {
      return res
        .status(200)
        .json({
          status: false,
          message: "server not responding pls contact server administrator...",
        });
    }
  }
);

router.get("/category_list", function (req, res, next) {
  try {
    pool.query("select * from category", function (error, result) {
      if (error) {
        return res.status(200).json({ status: false, data: [] });
      } else {
        return res.status(200).json({ status: true, data: result });
      }
    });
  } catch (e) {
    return res.status(200).json({ status: false, data: [] });
  }
});

router.post("/category_edit_data", function (req, res, next) {
  try {
    pool.query(
      "update category set categoryname=?,status=? where categoryid=?",
      [req.body.categoryname, req.body.status, req.body.categoryid],
      function (error, result) {
        if (error) {
          return res
            .status(500)
            .json({ status: false, message: "Server Error(Database) ...." });
        } else {
          return res
            .status(200)
            .json({ status: true, message: "Category Edited Sucessfully...." });
        }
      }
    );
  } catch (e) {
    return res
      .status(200)
      .json({
        status: false,
        message: "server not responding pls contact server administrator...",
      });
  }
});

router.post(
  "/category_edit_icon",
  upload.single("icon"),
  function (req, res, next) {
    try {
      pool.query(
        "update category set icon=? where categoryid=?",
        [req.file.filename, req.body.categoryid],
        function (error, result) {
          if (error) {
            return res
              .status(500)
              .json({ status: false, message: "Server Error(Database) ...." });
          } else {
            return res
              .status(200)
              .json({ status: true, message: "Icon Updated Sucessfully...." });
          }
        }
      );
    } catch (e) {
      return res
        .status(200)
        .json({
          status: false,
          message: "server not responding pls contact server administrator...",
        });
    }
  }
);

router.post("/category_delete_data", function (req, res, next) {
  try {
    pool.query(
      "delete from category where categoryid=?",
      [req.body.categoryid],
      function (error, result) {
        if (error) {
          return res
            .status(500)
            .json({ status: false, message: "Server Error(Database) ...." });
        } else {
          return res
            .status(200)
            .json({
              status: true,
              message: "Category Deleted Sucessfully....",
            });
        }
      }
    );
  } catch (e) {
    return res
      .status(200)
      .json({
        status: false,
        message: "server not responding pls contact server administrator...",
      });
  }
});

module.exports = router;
