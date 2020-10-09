/* WEATHER API START
  DON'T
  please, don't use this sample:
  https://samples.openweathermap.org/data/2.5/weather?q=Aarhus,DK&appid=YOURTOKENHERE
  DO
  Use the api as below:
  https://api.openweathermap.org/data/2.5/weather?q=Aarhus,DK&appid=YOURTOKENHERE
  
  PS:
  Probably your token will not activate right away. Have some patience here.
  */
const token = "91d315ae2063a35157f1715be037723b"; // save your token in this variable
const aarhus = "https://api.openweathermap.org/data/2.5/weather?q=Aarhus&lang=da,DK&appid=" +
    token +
    "&units=metric" + "&lang=da";

$(document).ready(function () {

    // get the weather data
    fetch(aarhus).then(response => {
        return response.json();
    }).then(data => {

        // Work with JSON data here
        console.log(data); // show what's in the json
        $('#result').append('<div class="weatherInfo">' + data.weather[0].description +
            ' i ' + data.name + ' og temperaturen er ' + data.main.temp + ' grader.' +
            '<figure><img src="http://openweathermap.org/img/w/' +
            data.weather[0].icon + '.png" alt="The weather : ' +
            data.weather[0].description + 
            '"></figure>' +
            '</div>');

        // here are the icons: https://openweathermap.org/weather-conditions 

    }).catch(err => {
        // Do something for an error here
        console.log('There was an error ...');
    });


    //WEATHER API SLUT
    console.log("Hej verden");

    //MAPS START
    mapboxgl.accessToken = 'pk.eyJ1Ijoic2lnbmVnYWRlZ2FhcmQiLCJhIjoiY2tmcWtsbzdhMGx0YjJybXQyZHk3cWs4cyJ9.IaHuBWhAu17MMIFWDEygnw';
    var map = new mapboxgl.Map({
        container: 'map', // container id
        style: 'mapbox://styles/signegadegaard/ckfqkr3f71idz1an08j6x4ty2', // style URL
        center: [10.206, 56.159], // starting position [lng, lat]
        zoom: 15 // starting zoom

    });

    var marker = new mapboxgl.Marker()
        .setLngLat([10.206, 56.159])
        .addTo(map);

    //MAPS SLUT


}); // document ready end

  //FORMS START

    var currentTab = 0; // Current tab is set to be the first tab (0)
    showTab(currentTab); // Display the current tab

    function showTab(n) {
        // This function will display the specified tab of the form...
        var x = document.getElementsByClassName("tab");
        x[n].style.display = "block";
        //... and fix the Previous/Next buttons:
        if (n == 0) {
            document.getElementById("prevBtn").style.display = "none";
        } else {
            document.getElementById("prevBtn").style.display = "inline";
        }
        if (n == (x.length - 1)) {
            document.getElementById("nextBtn").innerHTML = "Submit";
        } else {
            document.getElementById("nextBtn").innerHTML = "Next";
        }
        //... and run a function that will display the correct step indicator:
        fixStepIndicator(n)
    }

    function nextPrev(n) {
        // This function will figure out which tab to display
        var x = document.getElementsByClassName("tab");
        // Exit the function if any field in the current tab is invalid:
        if (n == 1 && !validateForm()) return false;
        // Hide the current tab:
        x[currentTab].style.display = "none";
        // Increase or decrease the current tab by 1:
        currentTab = currentTab + n;
        // if you have reached the end of the form...
        if (currentTab >= x.length) {
            // ... the form gets submitted:
            document.getElementById("regForm").submit();
            return false;
        }
        // Otherwise, display the correct tab:
        showTab(currentTab);
    }

    function validateForm() {
        // This function deals with validation of the form fields
        var x, y, i, valid = true;
        x = document.getElementsByClassName("tab");
        y = x[currentTab].getElementsByTagName("input");
        // A loop that checks every input field in the current tab:
        for (i = 0; i < y.length; i++) {
            // If a field is empty...
            if (y[i].value == "") {
                // add an "invalid" class to the field:
                y[i].className += " invalid";
                // and set the current valid status to false
                valid = false;
            }
        }
        // If the valid status is true, mark the step as finished and valid:
        if (valid) {
            document.getElementsByClassName("step")[currentTab].className += " finish";
        }
        return valid; // return the valid status
    }

    function fixStepIndicator(n) {
        // This function removes the "active" class of all steps...
        var i, x = document.getElementsByClassName("step");
        for (i = 0; i < x.length; i++) {
            x[i].className = x[i].className.replace(" active", "");
        }
        //... and adds the "active" class on the current step:
        x[n].className += " active";
    }
