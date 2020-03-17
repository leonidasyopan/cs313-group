function movieSearch() {
    const apiKey = "b4d7e28f";

    var movieTitle = document.getElementById('searchBox').value,
        url = "https://www.omdbapi.com/?s=" + movieTitle + "&apikey=" + apiKey;


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
                var output;
                for (let i = 0; i < movieData.Search.length; i++) {

                    let element = document.createElement("li");
                    output.innerHTML = movieData.Search[i].Title;
                    output.classList.add("movieSearchResult");

                    
                    output.appendChild(element);

                }
                document.getElementById("searchResults").appendChild(output);

            } catch (err) {
                console.log(err.message + "in" + ajax.responseText)
            }

        }
    }
    ajax.send();
}