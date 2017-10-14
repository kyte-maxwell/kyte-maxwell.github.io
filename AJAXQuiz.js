var questionType;
var questionNum;
var quizURL;

function setQuestion(jText) {
  var jArray = JSON.parse(jText);
  questionNum = Math.floor(Math.random() * jArray.length);
  questionType = Math.floor(Math.random() * 2);
  var question
  if (questionType == 0) {
    question = "What is the capital of " + jArray[questionNum].state;
  } else {
    question = "What state is " + jArray[questionNum].capital + " the capital of?";
  }
  var questionCode = "<input type = 'text' id = 'field'><button onclick = 'getJSON(" + quizURL + ", setAnswer, " + questionType + ", " + questionNum + ")'>Answer</button><p id = 'output'>";
  document.getElementById("Response").innerHTML = questionCode;
}

function setAnswer(jText) {
  var answer;
  var jArray = JSON.parse(jText);
  if (questionType == 0) {
    answer = jArray[questionNum].capital;
  } else {
    answer = jArray[questionNum].state;
  }
  var field = document.getElementById("field").value;
  if (answer == field) {
    document.getElementById("output").innerHTML = "Correct!";
  } else {
    document.getElementById("output").innerHTML = "Incorrect. Try Again.";
  }
}

function getJSON(url, setFunction) {
  quizURL = url;
  var variable = new XMLHttpRequest();
  variable.onreadystatechange = function() {
     if (this.readyState == 4 && this.status == 200) {
         setFunction(this.responseText);
     }
  };
  variable.open("GET", url, true);
  variable.send();
}
