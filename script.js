const apod_url = "https://api.nasa.gov/planetary/apod?";
const mars_url =
  "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&";
const myKey = "api_key=vPFqHmcIegwQ6lnwUGp701XvW4JcJXf5ZfpiogIJ";

function httpGet(url) {
  let xmlHttpReq = new XMLHttpRequest();
  xmlHttpReq.open("GET", url + myKey, false);
  xmlHttpReq.send(null);
  return xmlHttpReq.responseText;
}

//API to call APOD
var apod_json = httpGet(apod_url);
var apod_array = JSON.parse(apod_json);

//API to call Mars Photos
var mars_json = httpGet(mars_url);
var mars_array = JSON.parse(mars_json);

//Update the index.html

//Update the APOD
document.getElementById("apod_image").src = apod_array.hdurl;
document.getElementById("apod_title").innerHTML = apod_array.title;
document.getElementById("apod_explanation").innerHTML = apod_array.explanation;
document.getElementById("apod_date").innerHTML = apod_array.date;

//Update the Ma
document.getElementById("mars_image").src = mars_array.photos[0].img_src;
document.getElementById("mars_rover").innerHTML = "Rover Name: " + mars_array.photos[0].rover.name;
document.getElementById("mars_sol").innerHTML = "Sol: " + mars_array.photos[0].sol;
document.getElementById("mars_earth").innerHTML = "Earth Date: " + mars_array.photos[0].earth_date;
(function myLoop(i) {
  setTimeout(function () {
    document.getElementById("mars_image").src = mars_array.photos[i].img_src;
    document.getElementById("mars_rover").innerHTML =
      "Rover Name: " + mars_array.photos[i].rover.name;
    document.getElementById("mars_sol").innerHTML =
      "Sol: " + mars_array.photos[i].sol;
    document.getElementById("mars_earth").innerHTML =
      "Earth Date: " + mars_array.photos[i].earth_date;
    if (--i) myLoop(i); //  increment i and call myLoop again if i < mars_array.length
  }, 3000);
}) (Object.keys(mars_array).length);
