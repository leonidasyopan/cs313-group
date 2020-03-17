function movieSearch() {
    const apiKey = "b4d7e28f";

    var movieTitle = document.getElementById('searchBox').value,
        url = "https://www.omdbapi.com/?s=" + movieTitle + "&apikey=" + apiKey;

    getAJAX(url);

}

function getAJAX(url) {

    //Start AJAX
    var ajax = new XMLHttpRequest();
    ajax.open('GET', url, false);

    //Send the proper header information along with the request
    //ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    ajax.onreadystatechange = function() { //Call a function when the state changes.
        if (ajax.readyState == 4 && ajax.status == 200) {

            try {
                console.log(ajax.responseText);
                let movieData = JSON.parse(ajax.responseText);
                for (let i = 0; i < movieData.Search.length; i++) {

                    let output = document.createElement("li");
                    output.innerHTML = movieData.Search[i].Title;
                    output.classList.add("movieSearchResult");

                    let searchResults = document.getElementById("searchResults");
                    searchResults.appendChild(output);

                }

                return ajax.responseText;
            } catch (err) {
                console.log(err.message + "in" + ajax.responseText)
            }

        }
    }
    ajax.send();
}