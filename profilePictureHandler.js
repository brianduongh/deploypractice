const moment = require("moment");

const Sequelize = require("sequelize");
const sequelize = new Sequelize("mysql:3306/justo");

var db = require(__dirname + "/models");

/* | */

const multer = require("multer");

const handleError = (err, res) => {
	res
		.status(500)
		.contentType("text/plain")
		.end("Oops! Something went wrong with the upload! \n" + err);
};

const upload = multer({
	dest: "/uploads"
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
				if (err) return handleError(err, res);
				db.users.find({where: {id: req.params.userid}}).then(function(users){
					console.log(users);
				});
				res.status(200).contentType("text/plain").end("File uploaded!");
			});
		} else {
			fs.unlink(tempPath, err => {
				if (err) return handleError(err, res);
				res
					.status(403)
					.contentType("text/plain")
					.end("Only .png files are allowed!");
			});
		}
	}
);
