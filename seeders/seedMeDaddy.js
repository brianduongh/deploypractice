const moment = require("moment");

const Sequelize = require("sequelize");
const sequelize = new Sequelize("mysql:8889/justo");

var db = require(__dirname + "/../models");

var bc = require("bcrypt-nodejs");

var users = [
	["Caasi",     "Lemroh"],
	["Iman",      "Uman"],
	["Arthur",    "KingOfTheBrittains"],
	["Spongebob", "Squarepants"],
	["Patrick",   "Square"],
	["Mr",        "Crabs"],
	["Ismael",    "Cannibal"],
	["Judas",     "Rope"],
	["Ugandan",   "Knuckles"],
	["Inigmatic", "SmokingMan"],
	["Scully",    "Moulder"],
	["George",    "Wash"],
	["Alex",      "Ham"],
	["Rainman",   "Jeapordy"],
	["Caesar",    "Confodere"],
	["Peter",     "Greate"],
	["Joan",      "Ark"],
	["Pat",       "Henry"],
	["Nathan",    "Hale"],
	["Count",     "Dankula"]
];

var lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dui quis mi posuere sagittis ut ac velit. Nulla at sapien tincidunt, cursus sapien quis, lacinia nisl. Fusce pharetra libero sapien, vel facilisis eros placerat ut.";

function addUsers(){
	var usersPromise = new Promise(function(resolve, reject){
		for(let i in users){
			db.users.create({
				first_name: users[i][0],
				last_name:  users[i][1],
				email:      users[i][0] + users[i][1] + "@example.com",
				password:   bc.hashSync(users[i][0]+users[i][1])
			}).then(function(result){

			});
		}
		resolve(users);
	});
	return usersPromise;
}

addUsers().then(function(){addTheRest(1);});
function addTheRest(times){
		var owner = Math.floor(Math.random()*((users.length-1) - 0 + 1))+0;
		var employees = [];
		for(let k = 0; k < 5; k++){
			var newEmployee = Math.floor(Math.random()*((users.length-1) - 0 + 1))+0;
			while(newEmployee == owner || employees.includes(newEmployee)){
				newEmployee = Math.floor(Math.random()*((users.length-1) - 0 + 1))+0;
			}
			employees.push(newEmployee);
		}
		db.postings.create({
			posting_title: "Title"+times,
			posting_type: "Personal",
			posting_desc: lorem,
			posting_tags: "personal, cs, computerCS, computer science, loli",
			posting_completion_deadline: moment().add(Math.floor(Math.random()*(60 - 42))+42, 'days').format('YYYY-MM-DD HH:mm:ss'),
			posting_owner: owner
		}).then(function(postingsRes){
			for(let k in employees){
				console.error(k + " " + employees + " " + employees[k]);
				db.bids.create({
					employee_rate: ((Math.floor(Math.random()*((1000) - 7.25 + 1))+7.25)/100),
					notes: lorem,
					deadline: ((new Date()).getDate() + Math.floor(Math.random()*(42 - 7 + 1))+7),
					posting: postingsRes.dataValues.id,
					employee: employees[k]
				}).then(function(bidsRes){
					db.posting_employees.create({
						bid: bidsRes.dataValues.id,
						posting: postingsRes.dataValues.id,
						employee: employees[k]
					}).then(function(posting_employeesRes){
						for(let l = 0; l < 5; l++){
							var tf = Math.random() > 0.5;
							db.terms.create({
								currently_working: false,
								start_time: moment().format('YYYY-MM-DD HH:mm:ss'),
								end_time: moment().add(Math.floor(Math.random()*(480 - 61))+61, 'minutes').format('YYYY-MM-DD HH:mm:ss'),
								paid: tf,
								term_summery: lorem,
								posting_employee: posting_employeesRes.dataValues.id
							}).then(function(termRes){

							});
						}
					});
				});
			}
			console.log("\t\t" + (times>0) + " " + times);
			if(times > 0){
				addTheRest(times-1);
			}
		});

}
