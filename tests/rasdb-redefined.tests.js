/**
 * User: Rias
 * Date: 12/29/14
 * Time: 11:12 AM
 * Description : Description will be here
 * File name : rasdb-redefined.tests.js
 */

function assert(description, condition) {
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

var DB = new RasDB("TODOApp");

assert("New instance of radDB is created", DB instanceof RasDB);
assert("TODOApp namespace is created successfully", typeof DB.OBJECTSTORE[DB.namespace] == "object");

var todo = DB.collection("todo");
assert("todo collection is created successfully", todo instanceof Collection);

assert("todo collection with namespace is created inside the database", typeof DB.OBJECTSTORE[DB.namespace][todo.collectionName]=="object");

var UserDB = new RasDB("User");

assert("New instance of radDB is created", UserDB instanceof RasDB);
assert("TODOApp namespace is created successfully", typeof UserDB.OBJECTSTORE[UserDB.namespace] == "object");

var userAccounts = UserDB.collection("accounts");
assert("todo collection is created successfully", userAccounts instanceof Collection);

assert("todo collection with namespace is created inside the database", typeof UserDB.OBJECTSTORE[UserDB.namespace][userAccounts.collectionName]=="object");

var account = {
	accountNumber : "123",
	name : "Savings",
	balance: 14000,
	currency: "USD",
	nickname : "My husbands saving's account"
};
userAccounts.insert(account);

assert("New object can be added to the collection inside particular database", UserDB.OBJECTSTORE[UserDB.namespace][userAccounts.collectionName][0]==account);

var accounts = [{
	accountNumber: "234",
	name : "Savings",
	balance: 13000,
	currency: "USD",
	nickname : "Niel's Account"
},{
	accountNumber: "454",
	name : "Current",
	balance: 1000,
	currency: "USD",
	nickname : "Rias's Account"
},{
	accountNumber: "3434",
	name : "ISA",
	balance: 3000,
	currency: "USD",
	nickname : "Rekha's Account"
}];

userAccounts.dump(accounts);

assert("Dumping an array of objects adds the objects to existing ObjectStore", UserDB.OBJECTSTORE[UserDB.namespace][userAccounts.collectionName].length==4);

userAccounts.dump(accounts, true);

assert("Dumping an array with reset flag set will replace existing objectStore", UserDB.OBJECTSTORE[UserDB.namespace][userAccounts.collectionName].length==3);
