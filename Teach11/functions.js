function movieSearch() {
    const apiKey = "b4d7e28f";

    var movieTitle = document.getElementById('searchBox').value,
        url = "http://www.omdbapi.com/?apikey=" + apiKey + "&s" + movieTitle;

    var movieData = getAJAX(url);

    console.log(movieData);


}

function getAJAX(url) {

    //Start AJAX
    var ajax = new XMLHttpRequest();
    ajax.open('GET', url, true);

    //Send the proper header information along with the request
    //ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    ajax.onreadystatechange = function() { //Call a function when the state changes.
        if (ajax.readyState == 4 && ajax.status == 200) {
            console.log(ajax.responseText);
            try {
                var object = JSON.parse(ajax.responseText)
            } catch (err) {
                console.log(err.message + "in" + ajax.responseText)
            }

            return object;

        }
    }
    ajax.send();
}