<!DOCTYPE html>
<html>
    <head>
        <title>CS313 Group 04 - Teach 03</title>

        <link rel="stylesheet" href="styles.css" type="text/css">
    </head>
    <body>


        <main>
            <h1> CS313 Group 04 - Teach 03</h1>
            <form method="post" action="index.php">
                <fieldset>
                    <legend>Personal Information:</legend>
                    <label for="name">Name:</label> 
                    <input type="text" name="name" id="name">
                    <label for="email">Email:</label> 
                    <input type="text" name="email" id="email">
                </fieldset>    

                <!-- majors -->
                <fieldset>
                    <legend>Course:</legend>
                    <label for="computer-science">Computer Science</label> 
                    <input type="radio" name="major" id="computer-science" value="Computer Science">
                    <label for="wdd">Web Design and Development</label> 
                    <input type="radio" name="major" id="wdd" value="Web Design and Development">
                    <label for="cit">Computer information Technology</label> 
                    <input type="radio" name="major" id="cit" value="Computer information Technology">
                    <label for="computer-engineering">Computer Engineering</label> 
                    <input type="radio" name="major" id="computer-engineering" value="Computer Engineering">
                    <label for="comments">Comments:</label>  
                    <input type="textarea" name="comments" id="comments">
                <fieldset>

                <!-- continents -->
                <fieldset>
                    <legend>Please check the continents that you have visited:</legend>
                    <label for="north-america">North America</label> 
                    <input type="checkbox" name="north-america" id="north-america" value="North America">
                    <label for="south-america">South America</label> 
                    <input type="checkbox" name="south-america" id="south-america" value="South America">
                    <label for="europe">Europe</label> 
                    <input type="checkbox" name="europe" id="europe" value="Europe">
                    <label for="asia">Asia</label>
                    <input type="checkbox" name="asia" id="asia" value="Asia">
                    <label for="australia">Australia</label>
                    <input type="checkbox" name="australia" id="australia" value="Australia">
                    <label for="africa">Africa</label>
                    <input type="checkbox" name="africa" id="africa" value="Africa">
                    <label for="antarctica">Antarctica</label>
                    <input type="checkbox" name="antarctica" id="antarctica" value="Antarctica">
                </fieldset>
            </form>
        </main>
        <footer>
        </footer>
    </body>
</html>