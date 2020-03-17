function movieSearch() {
    const apiKey = "b4d7e28f";

    var movieTitle = document.getElementById('searchBox').value,
        url = "https://www.omdbapi.com/?s=" + movieTitle + "&apikey=" + apiKey;

    var movieData = getAJAX(url);
    console.log(movieData);
    movieData = JSON.parse(movieData);

    console.log(movieData);

    for (let i = 0; i < movieData.length; i++) {



        let output = document.createElement("li");
        output.innerHTML = movieData[i].title;
        output.classList.add("movieSearchResult");

        let searchResults = document.getElementById("searchResults");
        searchResults.appendChild(output);

    }

}

function getAJAX(url) {

    //Start AJAX
    var ajax = new XMLHttpRequest();
    ajax.open('GET', url, true);

    //Send the proper header information along with the request
    //ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    ajax.onreadystatechange = function() { //Call a function when the state changes.
        if (ajax.readyState == 4 && ajax.status == 200) {

            try {
                console.log(ajax.responseText);
                return ajax.responseText;
            } catch (err) {
                console.log(err.message + "in" + ajax.responseText)
            }

        }
    }
    ajax.send();
}