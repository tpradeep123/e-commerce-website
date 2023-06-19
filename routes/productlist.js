var express = require("express");
var router = express.Router();
var pool = require("./pool");
var upload = require("./multer");

router.post(
  "/productlistsubmit",
  upload.single("picture"),
  function (req, res, next) {
    try {
      pool.query(
        "insert into productlist(categoryid,subcategoryid,productid,productlistname,description,rate,offer,weight,stock,status,picture) values(?,?,?,?,?,?,?,?,?,?,?)",
        [
          req.body.categoryid,
          req.body.subcategoryid,
          req.body.productid,
          req.body.productlistname,
          req.body.description,
          req.body.rate,
          req.body.offer,
          req.body.weight,
          req.body.stock,
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

router.get("/productlist_list", function (req, res, next) {
  try {
    pool.query(
      "select PL.*,(select C.categoryname from category C where C.categoryid=PL.categoryid) as categoryname,(select S.subcategoryname from subcategory S where S.subcategoryid=PL.subcategoryid) as subcategoryname ,(select P.productname from products P where P.productid=PL.productid)as productname from  productlist PL",
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

router.post("/productlist_edit_data", function (req, res, next) {
  try {
    pool.query(
      "update productlist set categoryid=?,subcategoryid=?,productid=?,productlistname=?,description=?,rate=?,offer=?,weight=?,stock=?,status=? where productlistid=?",
      [
        req.body.categoryid,
        req.body.subcategoryid,
        req.body.productid,
        req.body.productlistname,
        req.body.description,
        req.body.rate,
        req.body.offer,
        req.body.weight,
        req.body.stock,
        req.body.status,
        req.body.productlistid,
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
  "/productlist_edit_picture",
  upload.single("picture"),
  function (req, res, next) {
    try {
      pool.query(
        "update productlist set picture=? where productlistid=?",
        [req.file.filename, req.body.productlistid],
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
                message: "Picture updated Sucessfully...",
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
  "/productlist_delete_data",
  upload.single("picture"),
  function (req, res, next) {
    try {
      pool.query(
        " delete from productlist where productlistid=?",
        [req.body.productlistid],
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
                message: "productlist deleted Succesfully ...",
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

module.exports = router;
