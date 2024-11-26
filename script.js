$(document).ready(function() {
    loadMoods(); // will load entry moods from localstorage

    $("#saveInput").click(function() { //on click save button
        const mood = $("#variants").val(); // gets mood selection
        let note = $("#comment").val().trim(); // gets comment/note from user
        
        if (note === "") {
            note = "Empty"; // value is "Empty" if no input
        }

        if (mood) { // a mood is selected
            const moodEntry = {
                mood: mood, // property assigning
                note: note, // stores data into property
                date: new Date().toLocaleDateString() // adds the date from computer
            };

            setTimeout(() => { //set as a delay for the runtime and execution process
            let moods = JSON.parse(localStorage.getItem("moods")) || []; // this will retrieve data from local storage

            moods.push(moodEntry); // will output/display the new entry simultaneously
            localStorage.setItem("moods", JSON.stringify(moods)); // will store it in the local storage

            $("#comment").val(""); // clearing
            loadMoods(); 
        }, 200);
        } else { // will display if invalid
            alert("Please select a mood."); 
        }
    });

    function loadMoods() { // display of output
        $("#mood-list").empty(); // clears remaining content
        const moods = JSON.parse(localStorage.getItem("moods")) || []; // retrieves the data
        moods.forEach(function(entry, index)  { // iteration for each entry at a position in the list/array
            $("#mood-list").append( //adds to the list
                `<p>${entry.date}: Mood [<i>${entry.mood}</i>] <br> Note: <strong>${entry.note}</strong> <!--format to display in the html-->

                <button class="delete" data-index="${index}">Delete</button></>`
                //will delete respective to its position in the list
            );
        });

        $(".delete").click(function() { //will delete an item
            setTimeout(() => {
            const index = $(this).data("index"); // gets its position
            moods.splice(index, 1); // removes the entry
            localStorage.setItem("moods", JSON.stringify(moods)); // updates the storage
            loadMoods(); // presents the updated version
        }, 200);
        });
    }
});