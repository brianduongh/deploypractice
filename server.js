const path = require('path');
const express = require("express");
const Sequelize = require("sequelize");
const sequelize = new Sequelize("mysql:8889/justo");

var db = require(__dirname + "/models");

var bc = require("bcrypt-nodejs");

const multer = require("multer");
const fs = require("fs");

const validator = require("validator");

const moment = require("moment");

const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

var cookieParser = require('cookie-parser');
app.use(cookieParser());

/* This is for multer. */
app.use(express.static('/uploads'))

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Add routes, both API and view
// app.use(routes);

// Start the API server
db.sequelize.sync({force: false}).then(function() {
	app.listen(PORT, function() {
		console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
	});
});


/* -----------------------ONLY-UTILS-GO-HERE!----------------------- */

/*
   This takes a request, and returns a promise with the relevent
   JSON as a parameter.
*/
function extractJSONFromRequest(req){
	var prom = new Promise(function(resolve, reject){
		resolve(req.body);
	});

	return prom;
}
module.exports.extractJSONFromRequest = extractJSONFromRequest;

function generateRandomId(lengthOfRandomId){
	var id = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for (let i = 0; i < lengthOfRandomId; i++){
		id += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return id;

}
module.exports.generateRandomId = generateRandomId;
/* ----------------------------------------------------------- */

/* ----------------------------------------------------------------------------------------------- */
/* Everything that is under this is strictly for adding images to the server for the profile page. */
/* ----------------------------------------------------------------------------------------------- */
app.get("/profilePicUpload", function(req, res){
	res.writeHead(200, {
		"Content-Type": "text/html"
	});
	fs.readFile("./client/src/components/Upload/index.js"
		// "./testFiles/uploadImage.html"
		, "utf8", function(err, data) {
		if (err) throw err;
		res.write(data);
		res.end();
	});
});

const handleErrorInProfilePicUpload = function(err, res) {
  res
    .status(500)
    .contentType("text/plain")
    .end("Oops! Something went wrong with the upload! \n" + err);
};

const upload = multer({
  dest:path.join(__dirname,  "/uploads")
  // You might also want to set some limits: https://github.com/expressjs/multer#limits
});

app.get('/api/allUsers', function(req,res) {
  //res.send(true);
  console.log(false);
  var cookies = req.cookies;
	console.log("--------------" + JSON.stringify(cookies) );
	extractJSONFromRequest(req).then(function(data){
		db.sessions.find({
			where: {
				session_id: bc.hashSync(cookies.session_id, cookies.salt)
			}
		}).then(function(session){
			if(session){
				db.users.findAll()
        .then(function(data){
					res.json({ users: data });
          // .then(function(newPosting){
					// 	res.setHeader("Content-Type", "application/json");
					// 	res.end( JSON.stringify({message: "Successfully created new posting " + JSON.stringify(newPosting) }) );
					// });
				});
			}else{
				res.setHeader("Content-Type", "application/json");
				res.end( JSON.stringify({message: "Could not find a user with this session. Try loggin in again if this persists. "}) );
			}
		});
	});
})

app.post(
	"/account/:userid",
	upload.single("file" /* name attribute of <file> element in your form */),
	function(req, res){
		const newFileName = (new Date()).getTime();
		const tempPath = req.file.path;
		const targetPath = path.join(__dirname, "./uploads/" + newFileName + ".png");
			if (path.extname(req.file.originalname).toLowerCase() === ".png") {
			fs.rename(tempPath, targetPath, err => {
				if (err) return handleErrorInProfilePicUpload(err, res);
				db.users.find({where: {id: req.params.userid}}).then(function(users){
					users.updateAttributes({
						image: newFileName
					});
				});
				console.log(req.path)
				// res.json({success:true});
				// res.redirect("/account/" + req.params.userid)
				res.redirect(req.path)

			});
		} else {
			fs.unlink(tempPath, err => {
				if (err) return handleErrorInProfilePicUpload(err, res);
				res
					.status(403)
					.contentType("text/plain")
					.end("Only .png files allowed");
			});
		}
	}
);

/* ----------------------------------------------------------------------------------- */
/* -----------------------------THIS-IS-FOR-THE-API-SHEIS----------------------------- */
/* ----------------------------------------------------------------------------------- */

/* This allows users to log in, and get a cookie for their session. */
app.post("/api/attemptLogin", function(req, res){
	extractJSONFromRequest(req).then(function(data){
		db.users.find({
			where: {
				email: data.email
			}
		}).then(function(user){
      console.log(user);
			if(user){
				if(bc.compareSync(data.password, user.password)){
					var sessionId = generateRandomId(255);
					var salt = bc.genSaltSync(10);
					db.sessions.create({
						session_id: bc.hashSync(sessionId, salt),
						session_user_id: user.id
					}).then(function(sess){
						res.writeHead(200, {
							"Set-Cookie": [
								"session_id=" + sessionId + "; HttpOnly;  path=/;",
								"salt=" + salt + "; HttpOnly;  path=/;"
							],
							"Content-Type": "application/json"
						});
						res.end( JSON.stringify({successMessage: "Welcome " + user.first_name}) );
					});
				}else{
					res.setHeader("Content-Type", "application/json");
					res.end( JSON.stringify({failureMessage: "Login failed. One of the fields entered were incorrect. "}) );
				}
			}else{
				res.setHeader("Content-Type", "application/json");
				res.end( JSON.stringify({failureMessage: "Login failed. One of the fields entered were incorrect. "}) );
			}
		});
	});
});

/* This adds a new user to the database. */
app.post("/api/newUser", function(req, res){
	var cookies = req.cookies;
	extractJSONFromRequest(req).then(function(data){
		db.users.create({
			first_name:      data.first_name,
			last_name:       data.last_name,
			email:           data.email,
			password:        bc.hashSync(data.password),
			image:           data.image,
			user_type:       data.user_type,
			user_rate:       data.user_rate || null,
			user_profession: data.user_profession || null,
			user_title:      data.user_title || null
		}).then(function(newUser){
			res.setHeader("Content-Type", "application/json");
			res.end( JSON.stringify({message: "Successfully created new user " + JSON.stringify(newUser) }) );
		});
	});
});

/* This is what allows users to log out. */
app.post("/api/logout", function(req, res){
	var cookies = req.cookies;
	db.sessions.destroy({
		where: {
			session_id: bc.hashSync(cookies.session_id, cookies.salt)
		}
	}).then(function(destroyed){
		res.setHeader("Content-Type", "application/json");
		if(destroyed){
			res.end( JSON.stringify({message: "Logged user " + destroyed.session_id + " out."}) );
		}else{
			res.end( JSON.stringify({message: "Attempted to log user out, but they were already logged out!"}) );
		}
	});
});

/* This allows users to create new postings in their name. */
app.post("/api/newPosting", function(req, res){
	var cookies = req.cookies;
	extractJSONFromRequest(req).then(function(data){
		db.sessions.find({
			where: {
				session_id: bc.hashSync(cookies.session_id, cookies.salt)
			}
		}).then(function(session){
			if(session){
				db.users.find({
					where: {
						id: session.session_user_id
					}
				}).then(function(user){
					db.postings.create({
						posting_owner: data.posting_owner
					}).then(function(newPosting){
						res.setHeader("Content-Type", "application/json");
						res.end( JSON.stringify({message: "Successfully created new posting " + JSON.stringify(newPosting) }) );
					});
				});
			}else{
				res.setHeader("Content-Type", "application/json");
				res.end( JSON.stringify({message: "Could not find a user with this session. Try loggin in again if this persists. "}) );
			}
		});
	});
});

app.post("/api/newJob", function(req, res){
	var cookies = req.cookies;
	extractJSONFromRequest(req).then(function(data){
		db.sessions.find({
			where: {
				session_id: bc.hashSync(cookies.session_id, cookies.salt)
			}
		}).then(function(session){
			if(session){
				db.users.find({
					where: {
						id: session.session_user_id
					}
				}).then(function(user){
					db.jobs.create({
						job_hours:    data.job_hours,
						posting:      data.posting,
						job_employee: user.id
					}).then(function(newJob){
						res.end( JSON.stringify({message: "Successfully created new job " + JSON.stringify(newJob) }) );
					});
				});
			}else{
				res.setHeader("Content-Type", "application/json");
				res.end( JSON.stringify({message: "Could not find a user with this session. Try loggin in again if this persists. "}) );
			}
		});
	});
});

/* This little beauty gives you users that are not the same type as you. */
app.post("/api/requestInfoOnUsers", function(req, res){
	var cookies = req.cookies;
	extractJSONFromRequest(req).then(function(data){
		db.sessions.find({
			where: {
				session_id: bc.hashSync(cookies.session_id, cookies.salt)
			}
		}).then(function(session){
			if(session){
				db.users.find({
					where: {
						id: session.session_user_id
					}
				}).then(function(user){
					if(user.user_type === "employer"){
						db.users.find({
							where: {
								user_type: "employee"
							}
						}).then(function(requestedUsers){
							for(let i in requestedUsers){
								requestedUsers[i].password = "None of your business";
							}
							res.setHeader("Content-Type", "application/json");
							res.end( JSON.stringify(requestedUsers) );
						});
					}else if(user.user_type === "employee"){
						db.users.find({
							where: {
								user_type: "employer"
							}
						}).then(function(requestedUsers){
							for(let i in requestedUsers){
								requestedUsers[i].password = "None of your business";
							}
							res.setHeader("Content-Type", "application/json");
							res.end( JSON.stringify(requestedUsers) );
						});
					}else{
						res.setHeader("Content-Type", "application/json");
						res.end( JSON.stringify({message: "Could not do what you requested because you are neither an employer nor employee. Are you Neo? "}) );
					}
				});
			}else{
				res.setHeader("Content-Type", "application/json");
				res.end( JSON.stringify({message: "Could not find a user with this session. Try loggin in again if this persists. "}) );
			}
		});
	});
});

/* This little beauty gives you a user depending on the id */
app.post("/api/requestInfoOnUser", function(req, res){
	var cookies = req.cookies;
	extractJSONFromRequest(req).then(function(data){
		db.sessions.find({
			where: {
				session_id: bc.hashSync(cookies.session_id, cookies.salt)
			}
		}).then(function(session){
			if(session){
				db.users.find({
					where: {
						id: session.session_user_id
					}
				}).then(function(user){
					if(user.user_type === "employer"){
						db.users.findOne({
							where: {
								user_type: "employee",
								id: data.id
							}
						}).then(function(requestedUsers){
							for(let i in requestedUsers){
								requestedUsers[i].password = "None of your business";
							}
							res.setHeader("Content-Type", "application/json");
							res.end( JSON.stringify(requestedUsers) );
						});
					}else if(user.user_type === "employee"){
						db.users.findOne({
							where: {
								user_type: "employer",
								id: data.id
							}
						}).then(function(requestedUsers){
							for(let i in requestedUsers){
								requestedUsers[i].password = "None of your business";
							}
							res.setHeader("Content-Type", "application/json");
							res.end( JSON.stringify(requestedUsers) );
						});
					}else{
						res.setHeader("Content-Type", "application/json");
						res.end( JSON.stringify({message: "Could not do what you requested because you are neither an employer nor employee. Are you Neo? "}) );
					}
				});
			}else{
				res.setHeader("Content-Type", "application/json");
				res.end( JSON.stringify({message: "Could not find a user with this session. Try loggin in again if this persists. "}) );
			}
		});
	});
});