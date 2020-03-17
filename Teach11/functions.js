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
                    output.setAttribute("onclick", 'movieDetails("' + movieData.Search[i].imdbID + '")');

                    
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

                    target.innerHTML = "<p>Title: " + movieDetails.Title + "</p>"; 
                    target.innerHTML += '<img src="' + movieDetails.Poster + '" alt="' + movieDetails.Title + ' Poster">'; 
                    target.innerHTML += "<p>Year: " + movieDetails.Year + "</p>";                  
                    target.innerHTML += "<p>Genre: " + movieDetails.Genre + "</p>";
                    target.innerHTML += "<p>Director: " + movieDetails.Director + "</p>";
                    target.innerHTML += "<p>Writer: " + movieDetails.Writer + "</p>";
                    target.innerHTML += "<p>Runtime: " + movieDetails.Runtime + "</p>";
                    target.innerHTML += "<p>Released: " + movieDetails.Released + "</p>";
                    target.innerHTML += "<p>Actors: " + movieDetails.Actors + "</p>";
                    target.innerHTML += "<p>Plot: " + movieDetails.Plot + "</p>";
                    target.innerHTML += "<p>Language: " + movieDetails.Language + "</p>";
                    target.innerHTML += "<p>Country: " + movieDetails.Country + "</p>";
                    target.innerHTML += "<p>Awards: " + movieDetails.Awards + "</p>";
                    target.innerHTML += "<p>Rating: " + movieDetails.Ratings.Source[0] + "</p>";
                    target.innerHTML += "<p>BoxOffice: " + movieDetails.BoxOffice + "</p>";
                    target.innerHTML += "<p>Production: " + movieDetails.Production + "</p>";
                

            } catch (err) {
                console.log(err.message + "in" + ajax.responseText)
            }

        }
    }
    ajax.send();
}