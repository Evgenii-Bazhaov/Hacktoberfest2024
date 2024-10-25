//managing the storage
class StorageManager {
    //getting the list of submitted questions
    static getSavedQuestions() {
      return JSON.parse(localStorage.getItem("savedQuestions")) || [];
    }
  
    //getting the list of review questions 
    static getReviewQuestions() {
      return JSON.parse(localStorage.getItem("reviewQuestions")) || [];
    }
  
    //updating the list of saved and review questions in local storage(Database)
    static saveQuestions(savedQuestions, reviewQuestions) {
      localStorage.setItem("savedQuestions", JSON.stringify(savedQuestions));
      localStorage.setItem("reviewQuestions", JSON.stringify(reviewQuestions));
    }
  }
  
  //Dealing with all functionality of LeetCode Problem helper
  class QuestionApp {
    constructor() {
      this.savedQuestions = StorageManager.getSavedQuestions();  //assigning list of submitted questions to an object 
      this.reviewQuestions = StorageManager.getReviewQuestions();  //assigning lost of review questions to an object
      this.addQuestionButton = document.getElementById("addQuestionButton");  //assigning object to addQuestion button
      this.practiceButton = document.getElementById("practiceButton"); //assigning object to practice button
      this.showSavedQuestionsButton = document.getElementById("showSavedQuestionsButton"); //assigning object to showSavedQuestion button
      this.showReviewButton = document.getElementById("showReviewButton");  //assigning object to showReview button
      this.questionsList = document.getElementById("questionsList");  //assigning object to questionList(it represents the submitted question list to be displayed on screeen)
      this.reviewList = document.getElementById("reviewList");       //assigning  object to review list(it represnts the review question list to be displayed on screen)
      this.practiceList = document.getElementById("practiceList");   //assigning object to practice list(it represnts the practice question list to be displayed on screen )
      this.reviewButton = document.getElementById("reviewButton");   //assigning object to removeReview button
      this.removeReviewButton = document.getElementById("removeReviewButton");    //assigning object to removeReview button
  
      //assigning event listeners to objects (means what function will be called when button clicked)
      this.addQuestionButton.addEventListener("click", this.handleAddQuestion.bind(this)); 
      this.practiceButton.addEventListener("click", this.handlePractice.bind(this));
      this.showSavedQuestionsButton.addEventListener("click", this.displayQuestions.bind(this));
      this.showReviewButton.addEventListener("click", this.displayReviewQuestions.bind(this));
      this.reviewButton.addEventListener("click", this.handleReview.bind(this));
      this.removeReviewButton.addEventListener("click", this.handleRemoveReview.bind(this));
    }
    
    //handling the functionality of add question button
    handleAddQuestion() {
      //getting list of all tabs that are active and on the currentWindow
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs && tabs[0] && tabs[0].url) {   //checking validity
          const questionLink = tabs[0].url;     //getting the question URL
          const matches = questionLink.match(/https:\/\/leetcode.com\/problems\/([^/]+)/);  //matching URL with the predefined format if not matched then array is null is matched fully then contain the matched substring
          const text = matches ? matches[1] : null; 
  
          //checking if link of question is valid or not
          if (!text) {
            alert("Invalid URL");
            return;
          }
  
          //checking if question is already in submitted list questions.
          if (this.savedQuestions.includes(questionLink)) {
            alert("This question is already saved.");
          } 
          else  //checking if question is already in review list questions 
          if (this.reviewQuestions.includes(questionLink)) {
            alert("This question is already in the review list.");
          } 
          else
           {
            //if above condition false adding question to the saved Question list.
            this.savedQuestions.push(questionLink);
            alert("Question added to submitted list.");
            StorageManager.saveQuestions(this.savedQuestions, this.reviewQuestions);
            this.displayQuestions(); //displaying the saved question list.
          }
        }
      });
    }
  
  
    //handle practice question button logic
    handlePractice() {
      //checking if no. of saved questions are less than 5 or not
      if (this.savedQuestions.length < 5) { 
        alert("You need to save at least 5 questions to practice.");
      } else {
        //calling random function to get list of random questions
        const practiceQuestions = this.getRandomQuestions(this.savedQuestions, 5);
        //Callint the function to display the list of random questions.
        this.displayPracticeQuestions(practiceQuestions);
      }
    }
  
  
    //getting random questions list
    getRandomQuestions(questions, count) {
      const shuffled = [...questions];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled.slice(0, count);
    }
  
    //displaying list of practice questions
    displayPracticeQuestions(practiceQuestions) {
      this.questionsList.classList.add("hidden");
      this.reviewList.classList.add("hidden");
      this.practiceList.classList.remove("hidden");
  
      //setting the inner html means displaying the list of practice question
      this.practiceList.innerHTML = practiceQuestions.map((question, index) => {
        //matching the link of question to the predefined format.
        const matches = question.match(/https:\/\/leetcode.com\/problems\/([^/]+)/);
        const text = matches ? matches[1] : "Invalid URL";
        return `
          <div class="question-box">
            <a href="${question}" target="_blank">
              <p>${index + 1}. ${text}</p>
            </a>
          </div>
        `;
      }).join("");
  
    }
  
    //displaying list of submitted questions
    displayQuestions() {
      //showing and hiding the list of questions.
      this.reviewList.classList.add("hidden");
      this.practiceList.classList.add("hidden");
      this.questionsList.classList.remove("hidden");
      this.questionsList.innerHTML = this.savedQuestions.map((question, index) => {
        const matches = question.match(/https:\/\/leetcode.com\/problems\/([^/]+)/);
        const text = matches ? matches[1] : "Invalid URL";
        return `
          <div class="question-box">
            <a href="${question}" target="_blank">
              <p>${index + 1}. ${text}</p>
            </a>
          </div>
        `;
      }).join("");
    }
  
  
    //displaying list of review questions
    displayReviewQuestions() {
      //showing and hiding the list of questions.
      this.questionsList.classList.add("hidden");
      this.practiceList.classList.add("hidden");
      this.reviewList.classList.remove("hidden");
      this.reviewList.innerHTML = this.reviewQuestions.map((question, index) => {
        const matches = question.match(/https:\/\/leetcode.com\/problems\/([^/]+)/);
        const text = matches ? matches[1] : "Invalid URL";
        return `
          <div class="question-box">
            <a href="${question}" target="_blank">
              <p>${index + 1}. ${text}</p>
            </a>
          </div>
        `;
      }).join("");
    }
  
    //handling add to review later button logic
    handleReview() {
      //
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs && tabs[0] && tabs[0].url) {
          const questionLink = tabs[0].url;
          const matches = questionLink.match(/https:\/\/leetcode.com\/problems\/([^/]+)/);
          const text = matches ? matches[1] : null;
  
          if (text) {
            const savedIndex = this.savedQuestions.indexOf(questionLink);
            if (savedIndex !== -1) {
              this.savedQuestions.splice(savedIndex, 1);
              this.reviewQuestions.push(questionLink);
              StorageManager.saveQuestions(this.savedQuestions, this.reviewQuestions);
              this.displayReviewQuestions();
            } else if (!this.reviewQuestions.includes(questionLink)) {
              this.reviewQuestions.push(questionLink);
              StorageManager.saveQuestions(this.savedQuestions, this.reviewQuestions);
              this.displayReviewQuestions();
            } else {
              alert("This question is already in the review list.");
            }
          }
        }
      });
    }
  
  
    //handling the remove from review button logic
    handleRemoveReview() {
      //getting list of all tabs that are active and on the currentWindow
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs && tabs[0] && tabs[0].url) {
          const questionLink = tabs[0].url;
          const matches = questionLink.match(/https:\/\/leetcode.com\/problems\/([^/]+)/);
          const text = matches ? matches[1] : null;
  
          if (text) {
            const reviewIndex = this.reviewQuestions.indexOf(questionLink);
            if (reviewIndex !== -1) { //checking if question is already present in review list
              this.reviewQuestions.splice(reviewIndex, 1); //removing question from review list. 
              this.savedQuestions.push(questionLink); //adding question to saved question list.
              //updating the saved and review list questions in database.
              StorageManager.saveQuestions(this.savedQuestions, this.reviewQuestions); 
              this.displayReviewQuestions(); //displaying review list.
              this.displayQuestions(); //displaying saved question list.
            } else {
              //giving alert iif question is not in review list.
              alert("This question is not in the review list.");
            }
          }
        }
      });
    }
   
  }
  
  // Initialize the object of questionApp class, when DOM content fully loded 
  document.addEventListener("DOMContentLoaded", function () {
    new QuestionApp();
  });