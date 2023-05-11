# CSS566-Frontend

# API callings:
## backend url 'http://localhost:8080/guess'
Request: POST JSON {'username','answer','score','trial'}
'username' is the username. 'answer' is the answer submitted by user. 'score' is the current score. 'trial' is the number of left trials

Response: JSON {'correct','arr','score'}
'correct' is boolean of whether the current guess is correct. 'arr' is an array of whether each alphabet is correct. Correct should be 1. Non-existing should be 0. Wrong place should be -1. For example, the target word is apple and user answer is abplle, then the 'arr' should be [1,0,1,1,-1,-1]. Wrong place can be redundant alphabets. 'score' is the new score from backend.

## 'http://localhost:8080/hint'
Request: GET JSON {'username','answer','score'}
'username' is the username. 'answer' is the answer submitted by user. 'score' is the current score.

Response: JSON {'hint','score'}
'hint' is a string to be displayed as a text message. 'score' is the new score from backend.

## 'http://localhost:8080/highscores'
Request: GET

Response: JSON {'user1':score1, 'user2':score2, 'user3':score3}
The 'user1/2/3' should be usernames. The score1/2/3 should be their scores. There is no limit of number of 'user'.

## 'http://localhost:8080/mission'
Request: GET

Response: JSON {'mission'}
'mission' should be a string of description of today's mission.
