let url = "https://api.covid19api.com/live/country/united-states";
var ctx = document.getElementById("myChart");
let caseStatus = ["Active", "Confirmed", "Recovered", "Deaths"];
let indianaCaseFiles = [];

fetch(url)
	.then((resp) => resp.json())
	.then(function (data) {
		getIndiana(data);
	})
	.catch(function () {
		console.log("error in data response");
	});

function getIndiana(freshJSON) {
	for (file of freshJSON) {
		if (file.Province == "Indiana") {
			indianaCaseFiles.push(file);
		}
	}
	sortCases(indianaCaseFiles);
}

function sortCases(allCases) {
	var sorted = allCases.sort((a, b) => {
		if (a.Date > b.Date) {
			return 1;
		} else {
			return -1;
		}
	});
	createDataPointArrays(sorted);
}

function createDataPointArrays(sortedCases) {
	activeCases = sortedCases.map((dayRpt) => dayRpt.Active);
	confirmedCases = sortedCases.map((dayRpt) => dayRpt.Confirmed);
	recoveredCases = sortedCases.map((dayRpt) => dayRpt.Recovered);
	deathsCases = sortedCases.map((dayRpt) => dayRpt.Deaths);
	dateCases = sortedCases.map((dayRpt) => dayRpt.Date);
	formatDateList = dateCases.map(
		(date) =>
			date.slice(5, 7) + "/" + date.slice(8, 10) + "/" + date.slice(2, 4)
	);

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
					borderColor: "#D39847",/*  */
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
