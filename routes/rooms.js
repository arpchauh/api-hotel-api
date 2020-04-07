const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  //reject a file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else cb(null, false);
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

require("../models/rooms_model");

const Hotel = mongoose.model("hotel");

router.get("/", (req, res) => {
  Hotel.find({})
    .then(hotel => {
      res.json({
        hotels: hotel
      });
    })
    .catch(err => {
      console.log(err);
      res.status(404).json({ hotel: null });
    });
});

router.post("/", upload.single("image"), (req, res) => {
  console.log(req.file);
  const errors = [];

  if (!req.file.path) {
    errors.push({ text: "Please enter image destination" });
  }
  if (!req.body.Room) {
    errors.push({ text: "Please room details" });
  }
  if (!req.body.Price) {
    errors.push({ text: "Please Enter Price" });
  }
  if (!req.body.Type) {
    errors.push({ text: "Please Enter type" });
  }

  if (!req.body.Contact) {
    errors.push({ text: "Please Enter contact" });
  }
  if (errors.length > 0) {
    res.json({
      errors: errors
    });
  } else {
    const hotel = {
      image: req.file.path,
      Room: req.body.Room,
      Price: req.body.Price,
      Type: req.body.Type,
      Contact: req.body.Contact
    };
    new Hotel(hotel)
      .save()
      .then(data => {
        res.json({
          hotel: data
        });
      })
      .catch(err => {
        res.status(404).json({ hotel: null });
      });
  }
});

router.delete("/:id", (req, res) => {
  Hotel.findByIdAndDelete({
    _id: req.params.id
  })
    .then(data => {
      res.json({ hotel: data, msg: "Successfully deleted" });
    })
    .catch(err => {
      console.log(err);
      res.status(404).json({ hotel: null });
    });
});

router.put("/:id", upload.single("image"), (req, res) => {
  Hotel.findOneAndUpdate(
    {
      _id: req.params.id
    },
    {
      image: req.file.path,
      Room: req.body.Room,
      Price: req.body.Price,
      Type: req.body.Type,
      Contact: req.body.Contact
    }
  )
    .then(data => {
      res.json({ hotel: data });
    })
    .catch(err => {
      console.log(err);
      res.status(404).json({ hotel: null, msg: "Not updated" });
    });
});
module.exports = router;
