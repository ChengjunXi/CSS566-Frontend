const MAX_TRIAL=10


let submitButton = document.getElementById('submit')
let guess = document.getElementById('guess')
let userName = document.getElementById('username')
let leftTrials = document.getElementById('left-trials')
let message = document.getElementById('message')
let hintButton = document.getElementById('hint')
let score = document.getElementById('score')
let hintText = document.getElementById('hintText')
let mission = document.getElementById('mission')
let highscores = document.getElementById('highscores')
let highscoresButton = document.getElementById('highscoresButton')
let newGameButton = document.getElementById('new')
let password = document.getElementById('password')


submitButton.onclick = async () => {
    if (+leftTrials.innerHTML === 0) {
        return
    }

    let response = await fetch('http://34.133.96.172:8081/guess',{
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'username': userName.value,
            'password': password.value,
            'answer': guess.value,
            'score': +score.innerHTML,
            'trial': +leftTrials.innerHTML
        })
    });

    response = await response.json()
    
    // //Test
    // guess.value='abble'
    // response = {
    //     'correct': false,
    //     'arr': [0, -1, 1, 1, 1],
    //     'score': 10,
    //     'sourceURL': 'https://roamingkitty.com/'
    // }
    if (response.error) {
        message.innerHTML = '<div>Error: ' + 'entered too many letters'  + '</div>'
        return
    }

    leftTrials.innerHTML = +leftTrials.innerHTML - 1
    let arr = response['arr']
    score.innerHTML = response['score']

    if (response['correct']) {
        message.innerHTML = '<div>Success! '+'<a href="'+response['sourceURL']+'">Link to source</a></div>'
        submitButton.disabled=true
    }
    
    else if (+leftTrials.innerHTML === 0){
        message.innerHTML = '<div>Failed. ' + '<a href="' + response['sourceURL'] + '">Link to source</a></div>'
    }
    else {
        message.innerHTML = '<div>Try again.</div>'
    }
    for (let i in arr) {
        let ch = document.createElement('span')
        ch.innerHTML=guess.value.charAt(i)
        if (arr[i] === 0) {
            ch.classList.add('non')
        }
        else if (arr[i] === 1) {
            ch.classList.add('right')
        }
        else {
            ch.classList.add('wrong')
        }
        message.appendChild(ch)
    }
}

hintButton.onclick = async () => {
    let response = await fetch('http://34.133.96.172:8081/hint',{
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'username': userName.value,
            'answer': guess.value,
            'score': +score.innerHTML
        })
    });

    response = await response.json()
    
    // //Test
    // response = {
    //     'hint': 'a',
    //     'score': 9
    // }

    hintText.innerHTML = '<div>Hint: ' + response['hint'] + '</div>'
    score.innerHTML = response['score']
}

highscoresButton.onclick = async () => {
    let response = await fetch('http://34.133.96.172:8081/highscores');
    response = await response.json();

    // Ensure the highscores div is empty before appending
    highscores.innerHTML = '';

    for (let entry of response) {
        // Create a new div for each entry and append it to the highscores div
        let newScoreEntry = document.createElement("div");
        newScoreEntry.className = "highscore";

        // Add username and score to this div
        newScoreEntry.innerHTML = "<span>" + entry["username"] + ": </span><span>" + entry["score"] + "</span>";

        highscores.appendChild(newScoreEntry);
    }
}





newGameButton.onclick = () => {
    leftTrials.innerHTML = MAX_TRIAL
    submitButton.disabled=false
}

async function getMission() {
    let g_response = await fetch('http://34.133.96.172:8081/mission');

    g_response = await g_response.json()
    // g_response = { 'mission': 'test_mission' }
    mission.innerHTML=g_response['mission']
}

getMission()

leftTrials.innerHTML = MAX_TRIAL
