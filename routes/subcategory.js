var express = require("express");
var router = express.Router();
var pool = require("./pool");
var upload = require("./multer");

router.post(
  "/subcategorysubmit",
  upload.single("icon"),
  function (req, res, next) {
    try {
      pool.query(
        "insert into subcategory(categoryid,subcategoryname,status,icon) values(?,?,?,?)",
        [
          req.body.categoryid,
          req.body.subcategoryname,
          req.body.status,
          req.file.filename,
        ],
        function (error, result) {
          if (error) {
            return res
              .status(200)
              .json({ status: false, message: "Server error (Database)..." });
          } else {
            return res
              .status(200)
              .json({ status: true, message: "Succesfully submit..." });
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
  }
);

router.get("/subcategory_list", function (req, res, next) {
  try {
    pool.query(
      "select S.*,(select C.categoryname from category C where C.categoryid=S.categoryid) as categoryname from subcategory S",
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

router.post("/subcategory_edit_data", function (req, res, next) {
  try {
    pool.query(
      "update subcategory set categoryid=?,subcategoryname=?,status=? where subcategoryid=?",
      [
        req.body.categoryid,
        req.body.subcategoryname,
        req.body.status,
        req.body.subcategoryid,
      ],
      function (error, result) {
        if (error) {
          return res
            .status(200)
            .json({ status: false, message: "Server error (Database)..." });
        } else {
          return res
            .status(200)
            .json({
              status: true,
              message: "Sub Category Edited Succesfully...",
            });
        }
      }
    );
  } catch (e) {
    return res
      .status(200)
      .json({
        status: false,
        message: "server nor responde please contact administrator...",
      });
  }
});

router.post(
  "/subcategory_edit_icon",
  upload.single("icon"),
  function (req, res, next) {
    try {
      pool.query(
        "update subcategory set icon=? where subcategoryid=?",
        [req.file.filename, req.body.subcategoryid],
        function (error, result) {
          if (error) {
            return res
              .status(200)
              .json({ status: false, message: "Server error (Database)..." });
          } else {
            return res
              .status(200)
              .json({
                status: true,
                message: "Subcategory Icon edited Suce...",
              });
          }
        }
      );
    } catch (e) {
      return res
        .status(200)
        .json({
          status: false,
          message: "server nor responde please contact administrator...",
        });
    }
  }
);

router.post(
  "/subcategory_delete_data",
  upload.single("icon"),
  function (req, res, next) {
    try {
      pool.query(
        " delete from subcategory where subcategoryid=?",
        [req.body.subcategoryid],
        function (error, result) {
          if (error) {
            return res
              .status(200)
              .json({ status: false, message: "Server error (Database)..." });
          } else {
            return res
              .status(200)
              .json({
                status: true,
                message: "Sub Category deleted Succesfully ...",
              });
          }
        }
      );
    } catch (e) {
      return res
        .status(200)
        .json({
          status: false,
          message: "server nor responde please contact administrator...",
        });
    }
  }
);

router.post("/subcategorylist_by_categoryid", function (req, res, next) {
  try {
    pool.query(
      "select S.*,(select C.categoryname from category C where C.categoryid=S.categoryid) as categoryname from subcategory S where S.categoryid=?",
      [req.body.categoryid],
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
