var P1name = '';
var P2name = '';
var maxScore = 5;

const StartGamebtn = document.querySelector(".PlayerInfobtn");
const Form = document.querySelector('.infoForm');
const ScoreBoard = document.querySelector('.content');

const P1DisplayName = document.querySelector("#P1DisplayName");
const P2DisplayName = document.querySelector("#P2DisplayName");
const P1DN = document.querySelector("#P1DN");
const P2DN = document.querySelector("#P2DN");

const targetScore = document.querySelector("#maximum");

StartGamebtn.addEventListener('click', function() {
    P1name = document.querySelector('.P1Name').value;
    P2name = document.querySelector('.P2Name').value;

    console.log(`${P1name} vs ${P2name}`);

    P1DisplayName.textContent = P1name
    P2DisplayName.textContent = P2name
    P1DN.textContent = P1name
    P2DN.textContent = P2name
    
    maxScore = parseInt(document.querySelector('#maxscore').value);
    
    Form.classList.add('hide')
    ScoreBoard.classList.remove('hide')

    targetScore.textContent = maxScore

})

// Score Tracking below

let P1score = 0;
let P2score = 0;

const P1Display = document.querySelector("#P1score");
const P2Display = document.querySelector("#P2score");

const P1plusbtn = document.querySelector('.btnP1Scoreup');
const P2plusbtn = document.querySelector('.btnP2Scoreup');
const P1minusbtn = document.querySelector('.btnP1Scoredown');
const P2minusbtn = document.querySelector('.btnP2Scoredown');

const resetbtn = document.querySelector('.btnreset');

let IsGameover = false;

if (P1score === 0) {
    P1minusbtn.classList.add('btnnotusable')    
}

if (P2score === 0) {
    P2minusbtn.classList.add('btnnotusable')    
}

P1plusbtn.addEventListener('click', () => {
    
    if (!IsGameover) {
        P1score += 1;
        P1Display.textContent = P1score;
        
        P1minusbtn.classList.remove('btnnotusable')    
        
        if (P1score === maxScore) {
            IsGameover = true;
            P1Display.classList.add("winningPlayer")
            P2Display.classList.add("losingPlayer")
            
            P1minusbtn.classList.add('btnnotusable')
            P2minusbtn.classList.add('btnnotusable')
        }
    }
})

P2plusbtn.addEventListener('click', () => {
    
    if (!IsGameover) {
        P2score += 1;
        P2Display.textContent = P2score;

        P2minusbtn.classList.remove('btnnotusable')

        if (P2score === maxScore) {
            IsGameover = true;
            P2Display.classList.add("winningPlayer")
            P1Display.classList.add("losingPlayer")

            P1minusbtn.classList.add('btnnotusable')
            P2minusbtn.classList.add('btnnotusable')
        }
    }
})

P1minusbtn.addEventListener('click', () => {
    
    if (!IsGameover && P1score>0) {
        P1score -= 1;
        P1Display.textContent = P1score;
        if (P1score === 0) {
            P1minusbtn.classList.add('btnnotusable')    
        }
    }
})

P2minusbtn.addEventListener('click', () => {
    
    if (!IsGameover && P2score>0) {
        P2score -= 1;
        P2Display.textContent = P2score;
        if (P2score === 0) {
            P2minusbtn.classList.add('btnnotusable')    
        }
    }
})

resetbtn.addEventListener('click', () => {

    let x = confirm("Do you wish to reset the score? (Refresh to change players)");
    if (x) {
        
        IsGameover = false;
        
        P1score = 0;
        P2score = 0;
        P1Display.textContent = P1score;
        P2Display.textContent = P2score;
        P1Display.classList.remove("winningPlayer")
        P1Display.classList.remove("losingPlayer")
        P2Display.classList.remove("winningPlayer")
        P2Display.classList.remove("losingPlayer")
        P1minusbtn.classList.add('btnnotusable')
        P2minusbtn.classList.add('btnnotusable')
    }  
})