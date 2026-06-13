const quetion = [
    {
        question: "What does HTML stand for?",
        Answer: [
            {text: "A) Hyper Text Markup Language", correct: true},
            {text: "B) High Tech Modern Language", correct: false},
            {text: "C) Hyper Transfer Markup Language", correct: false},
            {text: "D) Home Tool Markup Language", correct: false}
        ]
    },
    {
        question: "Which version of HTML introduced semantic elements like article and nav?",
        Answer: [
            {text: "A) HTML 4.01", correct: false},
            {text: "B) HTML5", correct: true},
            {text: "C) XHTML", correct: false},
            {text: "D) HTML 3.2", correct: false}
        ]
    },
    {
        question: "Which attribute is used to specify a placeholder text in an input field?",
        Answer: [
            {text: "A) place", correct: false},
            {text: "B) holder", correct: false},
            {text: "C) placeholder", correct: true},
            {text: "D) text", correct: false}
        ]
    },
    {
        question: "What is the correct file extension for an HTML file?",
        Answer: [
            {text: "A) .txt", correct: false},
            {text: "B) .css", correct: false},
            {text: "C) .html or .htm", correct: true},
            {text: "D) .js", correct: false}
        ]
    },
    {
        question: "Which HTML5 feature allows you to play audio files directly in browser?",
        Answer: [
            {text: "A) Flash player", correct: false},
            {text: "B) Audio element", correct: true},
            {text: "C) Media plugin", correct: false},
            {text: "D) Sound player", correct: false}
        ]
    },
    {
        question: "Which element is used for the main heading of a webpage?",
        Answer: [
            {text: "A) Heading 6", correct: false},
            {text: "B) Heading 1", correct: true},
            {text: "C) Heading 3", correct: false},
            {text: "D) Heading 4", correct: false}
        ]
    },
    {
        question: "Which input type is specifically used for email addresses in HTML5?",
        Answer: [
            {text: "A) text", correct: false},
            {text: "B) email", correct: true},
            {text: "C) password", correct: false},
            {text: "D) number", correct: false}
        ]
    },
    {
        question: "What does CSS stand for?",
        Answer: [
            {text: "A) Creative Style Sheets", correct: false},
            {text: "B) Computer Style Sheets", correct: false},
            {text: "C) Cascading Style Sheets", correct: true},
            {text: "D) Colorful Style Sheets", correct: false}
        ]
    },
    {
        question: "Which element is used to create a line break in HTML?",
        Answer: [
            {text: "A) break line", correct: false},
            {text: "B) line break", correct: false},
            {text: "C) br", correct: true},
            {text: "D) new line", correct: false}
        ]
    },
    {
        question: "Which attribute makes an input field mandatory to fill?",
        Answer: [
            {text: "A) must", correct: false},
            {text: "B) needed", correct: false},
            {text: "C) require", correct: false},
            {text: "D) required", correct: true}
        ]
    }
];

const app = document.querySelector('.app');
const nameInput = document.querySelector('.name input[placeholder="Enter your name"]');
const emailInput = document.querySelector('.name input[placeholder="enter your email"]');
const passwordInput = document.querySelector('.name input[placeholder="enter your Password"]');
const signinBtn = document.querySelector('#btn');
const que = document.querySelector('#question');
const ansBtn = document.querySelector('#ans-btn');
const nextBtn = document.querySelector('#next');
const getCertBtn = document.querySelector('#next-gt');
const replayBtn = document.querySelector('.replay');
const al = document.querySelector('.name');
let h4 = document.querySelector('.h4');
let cqi = 0;
let score = 0;
let userName = '';
let timeLeft = 300;
let timeInterval = null;
const certificateDiv = document.querySelector('.certifi');

signinBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    userName = nameInput.value.trim();
    const userEmail = emailInput.value.trim();
    const userPassword = passwordInput.value.trim();
    
    if(userName === ''){
        alert('Please enter your name');
        nameInput.focus();
        return;
    }
    
    if(userEmail === ''){
        alert('Please enter your email address');
        emailInput.focus();
        return;
    }
    
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailPattern.test(userEmail)){
        alert('Please enter a valid email address');
        emailInput.focus();
        return;
    }
    
    if(userPassword === ''){
        alert('Please enter your password');
        passwordInput.focus();
        return;
    }
    
    if(userPassword.length < 4){
        alert('Password must be at least 4 characters');
        passwordInput.focus();
        return;
    }
    
    app.style.display = 'block';
    al.style.display = 'none';
    
    const certName = document.querySelector('.certifi h2');
    if(certName) certName.textContent = userName;
    
    alert('Welcome ' + userName);
    
    timeLeft = 300;
    h4.innerHTML = '5:00';
    h4.style.display = 'block';
    
    if(timeInterval) clearInterval(timeInterval);
    
    timeInterval = setInterval(() => {
        if(timeLeft <= 0){
            clearInterval(timeInterval);
            alert(`Time's up ${userName}!`);
            showResult();
        } else {
            timeLeft--;
            let minutes = Math.floor(timeLeft / 60);
            let seconds = timeLeft % 60;
            h4.innerHTML = minutes + ':' + (seconds < 10 ? '0' + seconds : seconds);
        }
    }, 1000);
    
    startQuiz();
});

function startQuiz() {
    cqi = 0;
    score = 0;
    nextBtn.style.display = 'block';
    getCertBtn.style.display = 'none';
    replayBtn.style.display = 'none';
    showQuestion();
}

function showQuestion() {
    reset();
    let currentQuestion = quetion[cqi];
    let questionNo = cqi + 1;
    que.innerHTML = questionNo + ". " + currentQuestion.question;
    currentQuestion.Answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        ansBtn.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
    });
}

function reset(){
    while(ansBtn.firstChild){
        ansBtn.removeChild(ansBtn.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const iscorrect = selectedBtn.dataset.correct === 'true';
    
    if(iscorrect){
        selectedBtn.style.backgroundColor = "rgb(55, 252, 88)";
        score++;
    }
    else{
        selectedBtn.style.backgroundColor = "rgb(255, 80, 57)";
    }
    
    Array.from(ansBtn.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.style.backgroundColor = 'rgb(55, 252, 88)';
        }
        button.disabled = true;
    });
}

function nextQuestion() {
    cqi++;
    if(cqi < quetion.length){
        showQuestion();
    }else{
        showResult();
    }
}

function showResult(){
    reset();
    nextBtn.style.display = 'none';
    getCertBtn.style.display = 'block';
    replayBtn.style.display = 'block';
    
    if(score >= 5){
        que.innerHTML = `Congratulations ${userName}! Your score is ${score} out of ${quetion.length}! You passed! 🎉`;
    } else {
        que.innerHTML = `${userName}, your score is ${score} out of ${quetion.length}. Pass mark is 5. You failed! 😞`;
    }
}

nextBtn.addEventListener('click', () => {
    if(cqi < quetion.length - 1){
        nextQuestion();
    } else if(cqi === quetion.length - 1) {
        nextQuestion();
    }
});

getCertBtn.addEventListener('click', () => {
    if(score >= 5){
        clearInterval(timeInterval);
        app.style.display = 'none';
        certificateDiv.style.display = 'block';
    } else {
        alert('You need to pass the quiz first! Score at least 5 out of 10.');
    }
});

replayBtn.addEventListener('click', () => {
    clearInterval(timeInterval);
    timeLeft = 300;
    h4.innerHTML = '5:00';
    startQuiz();
    timeInterval = setInterval(() => {
        if(timeLeft <= 0){
            clearInterval(timeInterval);
            alert(`Time's up ${userName}!`);
            showResult();
        } else {
            timeLeft--;
            let minutes = Math.floor(timeLeft / 60);
            let seconds = timeLeft % 60;
            h4.innerHTML = minutes + ':' + (seconds < 10 ? '0' + seconds : seconds);
        }
    }, 1000);
});

certificateDiv.style.display = 'none';