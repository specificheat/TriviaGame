$(document).ready(function () {
    var options = [
        {
            question: "At age 12 musk taught himself computer programing and created a video game called Blastar which he sold for.", 
            choice: ["$50", "$500", "$1000", "$5000"],
            answer: 1,
            photo: "assets/images/500.jpeg"
         },
         {
             question: "Musk went to graduate school at Stanford Universityand left after?", 
            choice: ["2 days", "2 weeks ", "2 months", "2 years"],
            answer: 0,
            photo: "assets/images/2days.png width: 200px height:200px"
         }, 
         {
             question: "Musk named his 7th child?", 
            choice: ["Cool baby #1", "Grimes2", "XÆa-12", "Lonnie" ],
            answer: 2,
            photo: "assets/images/Baby.png"
        }, 
        {
            question: "Elons parents thought he might be?", 
            choice: ["Intelligent", "Stupid", "Deaf", "Not funny" ],
            answer: 2,
            photo: "assets/images/Signlanguage.jpeg"
        }, 
        {
            question: "Elon owns one of these", 
            choice: ["Michael Jacksons leather jacket", "Paul newmans leather pants", "neil diamonds sequin jacket", "James bonds lotus" ],
            answer: 3,
            photo: "assets/images/Lotus.jpeg"
        }, 
        { 
            question: "Elon musk used to drink?", 
            choice: ["Long Island iced teas on monday morning", "96 oz of diet coke per day", "lemondrops with lunch", "Tuna juice smoothies" ],
            answer: 1,
            photo: "assets/images/Dietcoke.jpeg"
        }, 
        {
            question: "Elon's mother is?", 
            choice: ["living under a bridge", "a model", "a roofer", "a professor at UC Berkley" ],
            answer: 1,
            photo: "assets/images/MOM.jpeg width: 200px height:200px"
        }, 
        {
            question: "In college Elon ran a _________ out of his house", 
            choice: ["Night club", "Brothel", "Chess club", "Student Lounge" ],
            answer: 0,
            photo: "assets/images/Nightclub.jpeg"
        }];
    
    var correctCount = 0;
    var wrongCount = 0;
    var unanswerCount = 0;
    var timer = 20;
    var intervalId;
    var userGuess ="";
    var running = false;
    var qCount = options.length;
    var pick;
    var index;
    var newArray = [];
    var holder = [];
    
    
    
    $("#reset").hide();
    //click start button to start game
    $("#start").on("click", function () {
            $("#start").hide();
            displayQuestion();
            runTimer();
            for(var i = 0; i < options.length; i++) {
        holder.push(options[i]);
    }
        })
    //timer start
    function runTimer(){
        if (!running) {
        intervalId = setInterval(decrement, 1000); 
        running = true;
        }
    }
    //timer countdown
    function decrement() {
        $("#timer").html("<h3>Time remaining: " + timer + "</h3>");
        timer --;
    
        //stop timer if reach 0
        if (timer === 0) {
            unanswerCount++;
            stop();
            $("#answer").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }	
    }
    
    //timer stop
    function stop() {
        running = false;
        clearInterval(intervalId);
    }
    //randomly pick question in array if not already shown
    //display question and loop though and display possible answers
    function displayQuestion() {
        //generate random index in array
        index = Math.floor(Math.random()*options.length);
        pick = options[index];
    
    //	if (pick.shown) {
    //		//recursive to continue to generate new index until one is chosen that has not shown in this game yet
    //		displayQuestion();
    //	} else {
    //		console.log(pick.question);
            //iterate through answer array and display
            $("#q1").html("<h2>" + pick.question + "</h2>");
            for(var i = 0; i < pick.choice.length; i++) {
                var userChoice = $("<div>");
                userChoice.addClass("answerchoice");
                userChoice.html(pick.choice[i]);
                //assign array position to it so can check answer
                userChoice.attr("data-guessvalue", i);
                $("#answer").append(userChoice);
    //		}
    }
    
    
    
    //click function to select answer and outcomes
    $(".answerchoice").on("click", function () {
        //grab array position from userGuess
        userGuess = parseInt($(this).attr("data-guessvalue"));
    
        //correct guess or wrong guess outcomes
        if (userGuess === pick.answer) {
            stop();
            correctCount++;
            userGuess="";
            $("#answer").html("<p>Correct!</p>");
            hidepicture();
    
        } else {
            stop();
            wrongCount++;
            userGuess="";
            $("#answer").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }
    })
    }
    
    
    function hidepicture () {
        $("#answer").append("<img src=" + pick.photo + ">");
        newArray.push(pick);
        options.splice(index,1);
    
        var hidpic = setTimeout(function() {
            $("#answer").empty();
            timer= 20;
    
        //run the score screen if all questions answered
        if ((wrongCount + correctCount + unanswerCount) === qCount) {
            $("#q1").empty();
            $("#q1").html("<h3>Game Over!  Here's how you did: </h3>");
            $("#answer").append("<h4> Correct: " + correctCount + "</h4>" );
            $("#answer").append("<h4> Incorrect: " + wrongCount + "</h4>" );
            $("#answer").append("<h4> Unanswered: " + unanswerCount + "</h4>" );
            $("#reset").show();
            correctCount = 0;
            wrongCount = 0;
            unanswerCount = 0;
    
        } else {
            runTimer();
            displayQuestion();
    
        }
        }, 3000);
    
    
    }
    
    $("#reset").on("click", function() {
        $("#reset").hide();
        $("#answer").empty();
        $("#q1").empty();
        for(var i = 0; i < holder.length; i++) {
            options.push(holder[i]);
        }
        runTimer();
        displayQuestion();
    
    })
    
    })