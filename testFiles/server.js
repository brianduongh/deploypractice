const http = require("http");
const path = require("path");
const fs = require("fs");

const express = require("express");

const app = express();
const httpServer = http.createServer(app);

const PORT = process.env.PORT || 3000;

const moment = require("moment");

const Sequelize = require("sequelize");
const sequelize = new Sequelize("mysql:3306/justo");

var db = require(__dirname + "/../models");

httpServer.listen(3000, () => {
  console.log(`Server is listening on port ${PORT}`);
});

// put the HTML file containing your form in a directory named "public" (relative to where this script is located)
app.get("/", function(req, res){
	res.writeHead(200, {
		"Content-Type": "text/html"
	});
	fs.readFile("uploadImage.html", "utf8", function(err, data) {
		if (err) throw err;
		res.write(data);
		res.end();
	});
});

/* Stuff goes here! */

const multer = require("multer");

const handleErrorInProfilePicUpload = (err, res) => {
  res
    .status(500)
    .contentType("text/plain")
    .end("Oops! Something went wrong with the upload! \n" + err);
};

const upload = multer({
  dest: "/uploads"
  // you might also want to set some limits: https://github.com/expressjs/multer#limits
});

app.post(
	"/upload/:userid",
	upload.single("file" /* name attribute of <file> element in your form */),
	function(req, res){
		const newFileName = (new Date()).getTime();
		const tempPath = req.file.path;
		const targetPath = path.join(__dirname, "./uploads/" + newFileName + ".png");
			if (path.extname(req.file.originalname).toLowerCase() === ".png") {
			fs.rename(tempPath, targetPath, err => {
				if (err) return handleErrorInProfilePicUpload(err, res);
				db.users.find({where: {id: req.params.userid}}).then(function(users){
					console.log(users.filteredContent);
					users.updateAttributes({
						image: newFileName
					});
				});
				res.status(200).contentType("text/plain").end("File uploaded!");
			});
		} else {
			fs.unlink(tempPath, err => {
				if (err) return handleErrorInProfilePicUpload(err, res);
				res
					.status(403)
					.contentType("text/plain")
					.end("Only .png files are allowed!");
			});
		}
	}
);
