const fs = require("fs");

const deleteFile = (filepath) => {
  fs.unlink(filepath, (err) => {
    if (err) {
      res.redirect("/500");
    }
  });
};

exports.deleteFile = deleteFile;
