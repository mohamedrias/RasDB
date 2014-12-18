/**
 * User: Rias
 * Date: 12/18/14
 * Time: 7:52 PM
 * Description : Testing RAS DB
 * File name : rasdb.tests.js
 */

var results = document.getElementById("results");

function setup() {
	var data = [{ "_id" : 0, "name" : "aimee Zank", "scores" : [ { "type" : "exam", "score" : 1.463179736705023 }, { "type" : "quiz", "score" : 11.78273309957772 }, { "type" : "homework", "score" : 6.676176060654615 }, { "type" : "homework", "score" : 35.8740349954354 } ] },
		{ "_id" : 1, "name" : "Aurelia Menendez", "scores" : [ { "type" : "exam", "score" : 60.06045071030959 }, { "type" : "quiz", "score" : 52.79790691903873 }, { "type" : "homework", "score" : 71.76133439165544 }, { "type" : "homework", "score" : 34.85718117893772 } ] },
		{ "_id" : 2, "name" : "Corliss Zuk", "scores" : [ { "type" : "exam", "score" : 67.03077096065002 }, { "type" : "quiz", "score" : 6.301851677835235 }, { "type" : "homework", "score" : 20.18160621941858 }, { "type" : "homework", "score" : 66.28344683278382 } ] },
		{ "_id" : 3, "name" : "Bao Ziglar", "scores" : [ { "type" : "exam", "score" : 71.64343899778332 }, { "type" : "quiz", "score" : 24.80221293650313 }, { "type" : "homework", "score" : 1.694720653897219 }, { "type" : "homework", "score" : 42.26147058804812 } ] },
		{ "_id" : 4, "name" : "Zachary Langlais", "scores" : [ { "type" : "exam", "score" : 78.68385091304332 }, { "type" : "quiz", "score" : 90.29631013680419 }, { "type" : "homework", "score" : 34.41620148042529 }, { "type" : "homework", "score" : 19.21886443577987 } ] },
		{ "_id" : 5, "name" : "Wilburn Spiess", "scores" : [ { "type" : "exam", "score" : 44.87186330181261 }, { "type" : "quiz", "score" : 25.72395114668016 }, { "type" : "homework", "score" : 10.53058536508186 }, { "type" : "homework", "score" : 63.42288310628662 } ] },
		{ "_id" : 6, "name" : "Jenette Flanders", "scores" : [ { "type" : "exam", "score" : 37.32285459166097 }, { "type" : "quiz", "score" : 28.32634976913737 }, { "type" : "homework", "score" : 16.58341639738951 }, { "type" : "homework", "score" : 81.57115318686338 } ] },
		{ "_id" : 7, "name" : "Salena Olmos", "scores" : [ { "type" : "exam", "score" : 90.37826509157176 }, { "type" : "quiz", "score" : 42.48780666956811 }, { "type" : "homework", "score" : 67.18328596625217 }, { "type" : "homework", "score" : 96.52986171633331 } ] },
		{ "_id" : 8, "name" : "Daphne Zheng", "scores" : [ { "type" : "exam", "score" : 22.13583712862635 }, { "type" : "quiz", "score" : 14.63969941335069 }, { "type" : "homework", "score" : 75.94123677556644 }, { "type" : "homework", "score" : 73.29753303407691 } ] },
		{ "_id" : 9, "name" : "Sanda Ryba", "scores" : [ { "type" : "exam", "score" : 97.00509953654694 }, { "type" : "quiz", "score" : 97.80449632538915 }, { "type" : "homework", "score" : 12.47568017314781 }, { "type" : "homework", "score" : 25.27368532432955 } ] },
		{ "_id" : 10, "name" : "Denisha Cast", "scores" : [ { "type" : "exam", "score" : 45.61876862259409 }, { "type" : "quiz", "score" : 98.35723209418343 }, { "type" : "homework", "score" : 19.31113429145131 }, { "type" : "homework", "score" : 55.90835657173456 } ] },
		{ "_id" : 11, "name" : "Marcus Blohm", "scores" : [ { "type" : "exam", "score" : 78.42617835651868 }, { "type" : "quiz", "score" : 82.58372817930675 }, { "type" : "homework", "score" : 87.49924733328717 }, { "type" : "homework", "score" : 15.81264595052612 } ] },
		{ "_id" : 12, "name" : "Quincy Danaher", "scores" : [ { "type" : "exam", "score" : 54.29841278520669 }, { "type" : "quiz", "score" : 85.61270164694737 }, { "type" : "homework", "score" : 14.78936520432093 }, { "type" : "homework", "score" : 80.40732356118075 } ] },
		{ "_id" : 13, "name" : "Jessika Dagenais", "scores" : [ { "type" : "exam", "score" : 90.47179954427436 }, { "type" : "quiz", "score" : 90.3001402468489 }, { "type" : "homework", "score" : 95.17753772405909 }, { "type" : "homework", "score" : 78.18795058912879 } ] },
		{ "_id" : 14, "name" : "Alix Sherrill", "scores" : [ { "type" : "exam", "score" : 25.15924151998215 }, { "type" : "quiz", "score" : 68.64484047692098 }, { "type" : "homework", "score" : 13.66179556675781 }, { "type" : "homework", "score" : 24.68462152686763 } ] },
		{ "_id" : 15, "name" : "Tambra Mercure", "scores" : [ { "type" : "exam", "score" : 69.15650225331579 }, { "type" : "quiz", "score" : 3.311794422000724 }, { "type" : "homework", "score" : 45.03178973642521 }, { "type" : "homework", "score" : 42.19409476640781 } ] }
	];
	return data;
}

function assert(condition, description) {
	var p = document.createElement("p");
	p.innerText = description;
	try {
		if(condition) {
			p.className = "success";
		} else {
			p.className = "failure";
		}
	} catch(err) {
		p.className = "failure";
	}

	results.appendChild(p);
}

/**
 * Test case 1: Check if RasDB exists
 */

assert(RasDB && window.RasDB, "RasDB is available for developers to extend client side data manipulation");

(function() {
	var data = setup();
	var Students = new RasDB(data);
	assert(Students instanceof RasDB, "Students is an instance of RasDB");
	assert(Students.get().length===data.length, "Get() returns list of objects in an array");
	assert(Students.find() instanceof RasDB, "Find with empty params must return RasDB instance");
	assert(Students.find().get().length === data.length, "Find with empty params will return entire objectstore");
})();