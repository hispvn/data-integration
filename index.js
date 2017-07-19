const fetch = require("node-fetch");
const jsonfile = require("jsonfile");
const moment = require("moment");
const fs = require("fs");
const config = require("./config.json");

let lastUpdatedDuration = "";
const dataValues = {
	dataValues: []
};
switch (config.periodType) {
	case "daily":
		lastUpdatedDuration = "1d";
		break;
	case "weekly":
		lastUpdatedDuration = "7d";
		break;
	case "monthly":
		lastUpdatedDuration = "30d";
		break;
	case "quarterly":
		lastUpdatedDuration = "90d";
		break;
	case "yearly":
		lastUpdatedDuration = "365d";
		break;
	default:
		throw new Error("Invalid period type");
}



const createAuthenticationHeader = (username, password) => {
	return "Basic " + new Buffer(username + ":" + password).toString("base64");
};
const getData = () => {
	return fetch(
			`${config.instanceABaseUrl}/api/dataValueSets?orgUnit=${config.rootOrgUnitId}&lastUpdatedDuration=${lastUpdatedDuration}&dataSet=${config.dataSetId}&children=true`, {
				headers: {
					Authorization: createAuthenticationHeader(config.instanceAUsername, config.instanceAPassword)
				}
			}
		)
		.then(result => result.json())
		.then(data => {
			dataValues.dataValues = data.dataValues;
		});
};

const pushData = () => {
	return fetch(
			`${config.instanceBBaseUrl}/api/dataValueSets`, {
				headers: {
					Authorization: createAuthenticationHeader(config.instanceBUsername, config.instanceBPassword),
					'Content-Type': 'application/json'
				},
				method: 'POST',
				body: JSON.stringify(dataValues)
			}
		)
		.then(result => result.json())
		.then(json => saveHistory(json))
};


const saveHistory = (summary) => {
	let newLine = `=====================================
Running date: ${moment().format("YYYY-DD-MM, HH:mm:ss")}
Imported: ${summary.importCount.imported}
Updated: ${summary.importCount.updated}
Ignored: ${summary.importCount.ignored}
Deleted: ${summary.importCount.deleted}` + "\r\n";
	fs.appendFileSync('./history.log', newLine);
};


getData()
	.then(() => pushData());