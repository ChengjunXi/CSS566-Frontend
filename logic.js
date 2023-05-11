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


submitButton.onclick = async () => {
    if (+leftTrials.innerHTML === 0) {
        return
    }

    let response = await fetch('http://localhost:8080/guess',{
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'username': userName.value,
            'answer': guess.value,
            'score': +score.innerHTML,
            'trial': +leftTrials.innerHTML
        })
    });

    response = await response.json()
    
    // //Test
    // guess.value='abble'
    // response = {
    //     'correct': true,
    //     'arr': [1, 1, 1, 1, 1],
    //     'score': 10
    // }

    leftTrials.innerHTML = +leftTrials.innerHTML - 1
    let arr = response['arr']

    if (response['correct']) {
        message.innerHTML = '<div>Success!</div>'
        score.innerHTML = response['score']
        submitButton.disabled=true
    }
    else if (+leftTrials.innerHTML === 0){
        message.innerHTML='<div>Failed.</div>'
    }
    else {
        message.innerHTML='<div>Try again.</div>'
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
    let response = await fetch('http://localhost:8080/hint',{
        method: "GET",
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
    let response = await fetch('http://localhost:8080/highscores');

    response = await response.json()

    // //Test
    // response = {
    //     'user1': 999,
    //     'user2': 888,
    //     'user3': 777
    // }

    highscores.innerHTML = ''
    for (let username in response) {
        highscores.innerHTML=highscores.innerHTML+username+': '+response[username]+'<br>'
    }
}

async function getMission() {
    let g_response = await fetch('http://localhost:8080/mission');

    g_response = await g_response.json()
    // g_response = { 'mission': 'test_mission' }
    mission.innerHTML=g_response['mission']
}

getMission()