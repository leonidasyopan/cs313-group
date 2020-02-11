function submit() {
    var book = document.getElementById('book').value,
        chapter = document.getElementById('chapter').value,
        verse = document.getElementById('verse').value,
        content = document.getElementById('content').value;

        var items = document.getElementsByName('topics');
        var selectedItems = {};
        for (var i=0; i <items.length;i++) {
            if(items[i].type=='checkbox' && items[i].checked==true)
                selectedItems.push(items[i].value);
        }

        if (document.getElementById("newTopic").checked == true) {
           
            var newTopicName = document.getElementById("topic");


             //Ajax add to SQL -- Topic

             var ajax = new XMLHttpRequest();
             var url = 'addtopic.php';
             var params = 'topic=' + newTopicName;
             ajax.open('POST', url, false)

             ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

             ajax.onreadystatechange = function () {
                 if(ajax.readyState == 4 && ajax.status == 200) {
                     console.log(ajax.responseText);
                 }
             }



            var newTopicID = ajax.send(params)

            selectedItems.push(newTopicID)

            var newTopic = document.createElement('input');
            newTopic.setAttribute("type", "text");
            newTopic.setAttribute("name", "topics");
            newTopic.setAttribute("value", newTopicID);
            var newTopicLabel = document.createElement('span');
            newTopicLabel.innerHTML = newTopicName;
            document.getElementById("topics").appendChild
        }

        //AJAX add to SQL -- Scripture

        //AJAX add to SQL -- Lookups

}