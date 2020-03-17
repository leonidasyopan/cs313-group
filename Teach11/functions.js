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
                
                document.getElementById("searchResults").innerHTML = "";
                for (let i = 0; i < movieData.Search.length; i++) {

                    let output = document.createElement("li");
                    output.innerHTML = movieData.Search[i].Title;
                    output.classList.add("movieSearchResult");
                    output.setAttribute("onclick", 'movieDetails(' + movieData.Search[i].imbdID + ')');

                    
                    document.getElementById("searchResults").appendChild(output);

                }
                

            } catch (err) {
                console.log(err.message + "in" + ajax.responseText)
            }

        }
    }
    ajax.send();
}

function movieDetails(id) {
    const apiKey = "b4d7e28f";

    var  url = "https://www.omdbapi.com/?i=" + id + "&apikey=" + apiKey;


    //Start AJAX
    var ajax = new XMLHttpRequest();
    ajax.open('GET', url, false);

    //Send the proper header information along with the request
    //ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    ajax.onreadystatechange = function() { //Call a function when the state changes.
        if (ajax.readyState == 4 && ajax.status == 200) {

            try {
                console.log(ajax.responseText);
                let movieDetails = JSON.parse(ajax.responseText);
                
                target = document.getElementById("movieDetailDiv");
        

                    target.innerHTML = "Title: " + movieDetails.Title + "<br>"; 
                    target.innerHTML += "Poster: " + movieDetails.Poster + "<br>"; 
                    target.innerHTML += "Year: " + movieDetails.Year + "<br>";                  
                    target.innerHTML += "Genre: " + movieDetails.Genre + "<br>";
                    target.innerHTML += "Director: " + movieDetails.Director + "<br>";
                    target.innerHTML += "Writer: " + movieDetails.Writer + "<br>";
                    target.innerHTML += "Runtime: " + movieDetails.Runtime + "<br>";
                    target.innerHTML += "Released: " + movieDetails.Released + "<br>";
                    target.innerHTML += "Actors: " + movieDetails.Actors + "<br>";
                    target.innerHTML += "Plot: " + movieDetails.Plot + "<br>";
                    target.innerHTML += "Language: " + movieDetails.Language + "<br>";
                    target.innerHTML += "Country: " + movieDetails.Country + "<br>";
                    target.innerHTML += "Awards: " + movieDetails.Awards + "<br>";
                    target.innerHTML += "Rating: " + movieDetails.Ratings.Source[0] + "<br>";
                    target.innerHTML += "BoxOffice: " + movieDetails.BoxOffice + "<br>";
                    target.innerHTML += "Production: " + movieDetails.Production + "<br>";
                

            } catch (err) {
                console.log(err.message + "in" + ajax.responseText)
            }

        }
    }
    ajax.send();
}