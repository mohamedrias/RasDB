/**
 * User: Rias
 * Date: 12/18/14
 * Time: 7:52 PM
 * Description : Testing RAS DB
 * File name : rasdb.tests.js
 */

var results = document.getElementById("results");
globaldata = [{"name":"Amy MacKinnon","github":"amy-mac","email":"amy@amy-mac.com","team":"camels","id":1},{"name":"Alex Sanchez","github":"alex-2539","email":"alejandrogapan@gmail.com","team":"snakes","id":0},{"name":"Bryan Kahler","github":"bkahler","email":"bkahler3@gmail.com","team":"snakes","id":2},{"name":"Christian","github":"WizardNinja89","email":"winjacan@gmail.com","team":"snakes","id":3},{"name":"Colt Steele","github":"Colt","email":"coltsteele1@gmail.com","team":"camels","id":4},{"name":"Dana J Wright","github":"danajwright","email":"danajwright@gmail.com","team":"snakes","id":5},{"name":"Francisco Alberini","github":"falberini","email":"f.alberini@gmail.com","team":"camels","id":6},{"name":"Francisco Orozco","github":"fo95116","email":"fo95116@gmail.com","team":"snakes","id":7},{"name":"Imogen Wentworth","github":"negomi","email":"imogen.wentworth@gmail.com","team":"snakes","id":8},{"name":"James Casey","github":"jamkcas","email":"jamkcas@gmail.com","team":"camels","id":9},{"name":"Jason Levy","github":"JasonLev","email":"jasond.levy@gmail.com","team":"snakes","id":10},{"name":"Jee Song","github":"jeesong","email":"jeewsong@gmail.com","team":"camels","id":11},{"name":"Jennie Louie","github":"jennielouie","email":"jennie.louie@gmail.com","team":"camels","id":12},{"name":"Kristine Lai","github":"screamingmunch","email":"screamingmunch@gmail.com","team":"snakes","id":13},{"name":"Lauren Benichou","github":"laurenbenichou","email":"laurenbenichou@gmail.com","team":"camels","id":14},{"name":"Leonidez Acosta","github":"leonidez","email":"acosta.leonidez@gmail.com","team":"camels","id":15},{"name":"Luke Whiting","github":"zestos","email":"zestos@gmail.com","team":"snakes","id":16},{"name":"Marco Cerna","github":"rocketfish","email":"marco.a.cerna@gmail.com","team":"snakes","id":17},{"name":"Margaret Morris","github":"margaretblue","email":"margaretblue@gmail.com","team":"camels","id":18},{"name":"Mike Kyriacou","github":"mkyriacou","email":"strattica@gmail.com","team":"camels","id":19},{"name":"Miriam Neubauer","github":"MiriamNeubauer","email":"miriam.neubauer@cdtm.de","team":"snakes","id":20},{"name":"Nico Crisafulli","github":"panicbus","email":"elementalair@gmail.com","team":"camels","id":21},{"name":"Richard Yang","github":"elyrly","email":"elyrly@gmail.com","team":"camels","id":22},{"name":"Santiago Gomez Lavin","github":"gomezlavin","email":"gomezlavin@gmail.com","team":"camels","id":23},{"name":"Sara LaFassett","github":"sarlaf","email":"sara@lafassett.com","team":"snakes","id":24},{"name":"Shindo Strzelczyk","github":"shindostrz","email":"shindostrz@gmail.com","team":"snakes","id":25},{"name":"Skyler Benge","github":"SkylerBenge","email":"scbenge@hotmail.com","team":"camels","id":26},{"name":"Smith Suth","github":"mcsuth","email":"seimith@gmail.com","team":"camels","id":27},{"name":"Spencer Eldred","github":"spencereldred","email":"eldredspencer@gmail.com","team":"snakes","id":28},{"name":"Stephen Johnston","github":"sjgjohnston","email":"johnston.sjg@gmail.com","team":"snakes","id":29},{"name":"Steven Noe","github":"KillerDesigner","email":"steve@killerdesigner.com","team":"snakes","id":30},{"name":"Tejas Mehta","github":"tmehta2442","email":"tj@tejas-mehta.com","team":"camels","id":31},{"name":"Wes Cargen","github":"wcargen","email":"wcargen@gmail.com","team":"camels","id":32}];

function setup() {
	var data = [{"name":"Amy MacKinnon","github":"amy-mac","email":"amy@amy-mac.com","team":"camels","id":1},{"name":"Alex Sanchez","github":"alex-2539","email":"alejandrogapan@gmail.com","team":"snakes","id":0},{"name":"Bryan Kahler","github":"bkahler","email":"bkahler3@gmail.com","team":"snakes","id":2},{"name":"Christian","github":"WizardNinja89","email":"winjacan@gmail.com","team":"snakes","id":3},{"name":"Colt Steele","github":"Colt","email":"coltsteele1@gmail.com","team":"camels","id":4},{"name":"Dana J Wright","github":"danajwright","email":"danajwright@gmail.com","team":"snakes","id":5},{"name":"Francisco Alberini","github":"falberini","email":"f.alberini@gmail.com","team":"camels","id":6},{"name":"Francisco Orozco","github":"fo95116","email":"fo95116@gmail.com","team":"snakes","id":7},{"name":"Imogen Wentworth","github":"negomi","email":"imogen.wentworth@gmail.com","team":"snakes","id":8},{"name":"James Casey","github":"jamkcas","email":"jamkcas@gmail.com","team":"camels","id":9},{"name":"Jason Levy","github":"JasonLev","email":"jasond.levy@gmail.com","team":"snakes","id":10},{"name":"Jee Song","github":"jeesong","email":"jeewsong@gmail.com","team":"camels","id":11},{"name":"Jennie Louie","github":"jennielouie","email":"jennie.louie@gmail.com","team":"camels","id":12},{"name":"Kristine Lai","github":"screamingmunch","email":"screamingmunch@gmail.com","team":"snakes","id":13},{"name":"Lauren Benichou","github":"laurenbenichou","email":"laurenbenichou@gmail.com","team":"camels","id":14},{"name":"Leonidez Acosta","github":"leonidez","email":"acosta.leonidez@gmail.com","team":"camels","id":15},{"name":"Luke Whiting","github":"zestos","email":"zestos@gmail.com","team":"snakes","id":16},{"name":"Marco Cerna","github":"rocketfish","email":"marco.a.cerna@gmail.com","team":"snakes","id":17},{"name":"Margaret Morris","github":"margaretblue","email":"margaretblue@gmail.com","team":"camels","id":18},{"name":"Mike Kyriacou","github":"mkyriacou","email":"strattica@gmail.com","team":"camels","id":19},{"name":"Miriam Neubauer","github":"MiriamNeubauer","email":"miriam.neubauer@cdtm.de","team":"snakes","id":20},{"name":"Nico Crisafulli","github":"panicbus","email":"elementalair@gmail.com","team":"camels","id":21},{"name":"Richard Yang","github":"elyrly","email":"elyrly@gmail.com","team":"camels","id":22},{"name":"Santiago Gomez Lavin","github":"gomezlavin","email":"gomezlavin@gmail.com","team":"camels","id":23},{"name":"Sara LaFassett","github":"sarlaf","email":"sara@lafassett.com","team":"snakes","id":24},{"name":"Shindo Strzelczyk","github":"shindostrz","email":"shindostrz@gmail.com","team":"snakes","id":25},{"name":"Skyler Benge","github":"SkylerBenge","email":"scbenge@hotmail.com","team":"camels","id":26},{"name":"Smith Suth","github":"mcsuth","email":"seimith@gmail.com","team":"camels","id":27},{"name":"Spencer Eldred","github":"spencereldred","email":"eldredspencer@gmail.com","team":"snakes","id":28},{"name":"Stephen Johnston","github":"sjgjohnston","email":"johnston.sjg@gmail.com","team":"snakes","id":29},{"name":"Steven Noe","github":"KillerDesigner","email":"steve@killerdesigner.com","team":"snakes","id":30},{"name":"Tejas Mehta","github":"tmehta2442","email":"tj@tejas-mehta.com","team":"camels","id":31},{"name":"Wes Cargen","github":"wcargen","email":"wcargen@gmail.com","team":"camels","id":32}];
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
	Students = new RasDB(data);
	assert(Students instanceof RasDB, "Students is an instance of RasDB");
	assert(Students.get().length===data.length, "Get() returns list of objects in an array");
	assert(Students.find() instanceof RasDB, "Find with empty params must return RasDB instance");
	assert(Students.find().get().length === data.length, "Find with empty params will return entire objectstore");
	console.log(Students.findById(0).get(0));
	console.log(data[0]);
	assert(Students.findById(0).get(0)===data[1], "Both the wrapped object and original object are same");
	(function() {
		var originalObject = data[1];
		var foundObject = Students.findById(0).get(0);
		foundObject.name = "Rias";
		assert(foundObject.name===originalObject.name, "If the object is changed via find, must also change the original object as well");
		Students.findById(0).exec(function(ele) {
			console.log(ele);
		})
		foundObject = null;
		console.log("Original object");
		console.log(originalObject);
	})();
	console.log(Students.first().get()[0]);
	console.log(data[0]);
	assert(Students.first().get()[0]==data[0], "first() provides the first element of the array");
	console.log(Students.OBJECTSTORE);
	console.log(Students.last());
	console.log(data[data.length-1]);
	assert(Students.last().get()[0]==data[data.length-1], "last() provides the last element of the array");

/*	assert(Students.sort().get()[0]===data[1], "Empty sort must return the list in ascending order based on ID");
	/*console.log(Students.findById(0).get());
	assert(Students.get().length===data.length, "After deletion of objects, even the original object must be deleted")
*/
	assert(Students.findById(0).get(0)===data[1], "Both the wrapped object and original object are same");
})();