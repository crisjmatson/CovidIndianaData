let url = "https://api.covid19api.com/live/country/united-states";
var ctx = document.getElementById("myChart");
let data;
let state;
let indianaNumbers = [];
let indianaDates = [];
let date;
let confirmed;
let active;
let recovered;
let deaths;

fetch(url)
	.then((resp) => resp.json()) // Transform the data into json
	.then(function (data) {
		// data is list of all countries
		//    console.log(data);
		getIndiana(data); // call data out of current function to new getIndiana
	})

	.catch(function () {
		console.log("try again");
	});

function getIndiana(data) {
	const pullIndiana = data.values();
	for (const value of pullIndiana) {
		if (value.Province == "Indiana") {
      indianaNumbers.push(value);
//      getTime(indianaNumbers) -- doesn't work to pass thru data 
		}
	}
}
indianaNumbers.sort(function (a, b) {
	var dateA = new Date(a.Date),
		dateB = new Date(b.Date);
  return dateA - dateB;
}); //sorting function to have array in order by date property
console.log(indianaNumbers); //sorted array of indiana data for past month

function getTime(indianaNumbers) {
const pullDates = indianaNumbers.values();
	for (const date of pullDates) {
		if (date.Date == "Indiana") {
			indianaDates.push(date);
		}
  }
}
console.log(Array.isArray(indianaNumbers));  // !!!!
console.log(indianaNumbers.valueOf(0));






// can't access object properties by usual array methods. is 'object' type.

//var first = indianaNumbers.slice(2)
//console.log(first); ---doesn't work

//console.log(Object.values(indianaNumbers)); //--doesn't work, empty array

// let openIN = [...indianaNumbers] //using spread operator to make copy..?
// console.log(openIN); //prints empty array.

/* CHART from chartjs.org -- NPM install error pls help
var myLineChart = new myChart(ctx, {
  type: 'line',
  data: data,
  options: options
}); */

//  code prior to debug with donovan in power hour 8/11
/*
  function getIndiana(data){ //function with fetch data in json
    const pullIndiana = data.values(); //names iterator 
//    console.log(pullIndiana);
    for (const value of pullIndiana){ // begins for-of loop on json array 
      if (value.Province == "Indiana"){ // if state is IN
//        console.log(value);
        indianaNumbers.push(value); // add to empty array declared above
//        return indianaNumbers; //send new array of IN data to global scope
      } /* else {
        console.log(); //don't need this but it wasn't working without it? 
      } ; 
    }
  };
  console.log(indianaNumbers); //array of indiana data for past month */
