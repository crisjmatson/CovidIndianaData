let url = "https://api.covid19api.com/live/country/united-states";
var ctx = document.getElementById("myChart");
let data;
let state;
let date;
let caseStatus = ["Active", "Confirmed", "Recovered", "Deaths"];
let indianaCaseFiles = [];
let indianaDates = [];
let confirmedCases = [];
let activeCases = [];
let recoveredCases = [];
let deathsCases = [];

fetch(url)
	.then((resp) => resp.json()) // Transform the data into json
	.then(function (data) {
		// data is list of all countries
		//	    console.log(data);
		getIndiana(data); // call data out of current function to new getIndiana
	})
	.catch(function () {
		//		console.log("not yet");
	});

function getIndiana(freshJSON) {
	//function called in initial fetch
	// console.log(freshJSON);       // full USA data here

	for (file of freshJSON) {
		//set up for loop to go through array
		if (file.Province == "Indiana") {
			//set condition to state
			indianaCaseFiles.push(file); //add cases matching state to array
		}
	} //added IN cases to indianaCaseFiles
	sortCases(indianaCaseFiles);
	//	let sortedCases = indianaCaseFiles.forEach(sortCases);
	//	console.log(sortedCases);
}
/*
	const pullIndiana = Object.values(); // 
	for (const value of pullIndiana) {
		if (value.Province == "Indiana") {
			indianaCaseFiles.push(value);
		}
	}
	sortCases(indianaCaseFiles); //  getTime(indianaCaseFiles); //puts case files out as arg to getTime
 */
function sortCases(allCases) {
	var sorted = allCases.sort((a, b) => {
		if (a.Date > b.Date) {
			return 1;
		} else {
			return -1;
		}
	});
	//	console.log(sorted);
	createDataPointArrays(sorted);
}

function createDataPointArrays(sortedCases) {
	activeCases = sortedCases.map((dayRpt) => dayRpt.Active);
	confirmedCases = sortedCases.map((dayRpt) => dayRpt.Confirmed);
	recoveredCases = sortedCases.map((dayRpt) => dayRpt.Recovered);
	deathsCases = sortedCases.map((dayRpt) => dayRpt.Deaths);
	dateCases = sortedCases.map((dayRpt) => dayRpt.Date);
	formatDateList = dateCases.map(
		(date) => date.slice(5, 7)+'/'+date.slice(8, 10)+'/'+date.slice(2, 4));

	/* format(dateCases);
  0-3, 5-6, 8-9
  - 5-6, 8-9, 2-3 -
 "2020-04-13T00:00:00Z" */

	var myChart = new Chart(ctx, {
		type: "line",
		data: {
			labels: formatDateList,
			caseStatus,
			datasets: [
				{
					label: "Active",
					data: activeCases,
					backgroundColor: "#F5BE73",
					borderColor: "#F5BE73",
					borderWidth: 1,
					fill: false,
				},
				{
					label: "Confirmed",
					data: confirmedCases,
					backgroundColor: "#D39847",
					borderColor: "#D39847",
					borderWidth: 1,
					fill: false,
				},
				{
					label: "Recovered",
					data: recoveredCases,
					backgroundColor: "#B57926",
					borderColor: "#B57926",
					borderWidth: 1,
					fill: false,
				},
				{
					label: "Deaths",
					data: deathsCases,
					backgroundColor: "#8F580C",
					borderColor: "#8F580C",
					borderWidth: 1,
					fill: false,
				},
			],
		},
	});
}
//"2020-04-13T00:00:00Z"
/*
function dateFormat(unFormatted) {
	let formatted = [];
	for (mess of unFormatted) {
		let first = mess.substr(0, 10);
		let firstSplit = first.split("-");
		const [year, month, day] = firstSplit;
		formatted.push(`${month}/${day}/${year}`);
	}
	return formatted;
}

function format(timeStamp){
  let timeStamped = [];
  for (case of timeStamp) {
			let first = case.substr(0, 10);
			let firstSplit = first.split("-");
			const [year, month, day] = firstSplit;
			timeStamped.push(`${month}/${day}/${year}`);
    }
  return timeStamped;
};
    */
