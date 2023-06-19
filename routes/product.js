var express = require("express");
var router = express.Router();
var pool = require("./pool");
var upload = require("./multer");

router.post(
  "/productsubmit",
  upload.single("picture"),
  function (req, res, next) {
    try {
      pool.query(
        "insert into products(categoryid,subcategoryid,productname,description,status,picture) values(?,?,?,?,?,?)",
        [
          req.body.categoryid,
          req.body.subcategoryid,
          req.body.productname,
          req.body.description,
          req.body.status,
          req.file.filename,
        ],
        function (error, result) {
          if (error) {
            console.log(error);
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

router.get("/product_list", function (req, res, next) {
  try {
    pool.query(
      "select P.*,(select C.categoryname from category C where C.categoryid=P.categoryid) as categoryname,(select S.subcategoryname from subcategory S where S.subcategoryid=P.subcategoryid) as subcategoryname from  products P",
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

router.post(
  "/product_edit_picture",
  upload.single("picture"),
  function (req, res, next) {
    try {
      pool.query(
        "update products set picture=? where productid=?",
        [req.file.filename, req.body.productid],
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

router.post("/product_edit_data", function (req, res, next) {
  try {
    pool.query(
      "update products set categoryid=?,subcategoryid=?,productname=?,description=?,status=? where productid=?",
      [
        req.body.categoryid,
        req.body.subcategoryid,
        req.body.productname,
        req.body.description,
        req.body.status,
        req.body.productid,
      ],
      function (error, result) {
        if (error) {
          console.log(error);
          return res
            .status(200)
            .json({ status: false, message: "Server error (Database)..." });
        } else {
          return res
            .status(200)
            .json({ status: true, message: "Product edited succesfully..." });
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

router.post(
  "/product_delete_data",
  upload.single("picture"),
  function (req, res, next) {
    try {
      pool.query(
        " delete from products where productid=?",
        [req.body.productid],
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

router.post("/productlist_by_subcategoryid", function (req, res, next) {
  try {
    pool.query(
      "select P.*,(select S.subcategoryname from subcategory S where S.subcategoryid=P.subcategoryid) as subcategoryname from products P where P.subcategoryid=?",
      [req.body.subcategoryid],
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
