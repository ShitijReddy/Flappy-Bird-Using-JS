let topScoreChanged = false;

document.addEventListener('DOMContentLoaded', () => {
    // Set the top score
    let player = prompt("Enter your name","Unknown")
    let nameEle = document.querySelector('.name-content')
    nameEle.innerHTML = player
    
    let topSCoreEle = document.querySelector('.top-score-content')
    let topSCorerEle = document.querySelector('.top-scorer-content')

    // Fetching the Top Score from Local Storage
    // if(topScoreChanged) {
    let t = localStorage.getItem('topscore')
    topSCoreEle.innerHTML = t
    let topper = localStorage.getItem('topscorer')
    topSCorerEle.innerHTML = topper
    // }

    
    const bird = document.querySelector('.bird')
    const gameDisplay = document.querySelector('.game-container')
    const ground = document.querySelector('.ground')

    let isGameOver = false;
    let birdLeft = 220
    let birdBottom = 200
    let gravity  = 2

    function startGame() {
        birdBottom -= gravity
        bird.style.bottom = birdBottom + 'px'
        bird.style.left = birdLeft + 'px'
    }
    let gameTimerId = setInterval(startGame, 20)

    function control(e) {
        if (e.keyCode === 32) {
            jump()
        }
        if(e.keyCode === 13) {
            startGame()
        }
    }

    function jump() {
        if(birdBottom < 510){
            birdBottom += 50
        }
        
        bird.style.bottom = birdBottom + 'px'
        console.log(birdBottom)
    }
    document.addEventListener('keyup', control)
    let score = 0;
    function generateObstacle() {
        let randomHeight = Math.random() * 200
        if(randomHeight < 20) randomHeight = 30
        console.log("Height:"+ randomHeight)
        let obstacleLeft = 500
        let obstacleBottom = randomHeight

        console.log("Obstacle Bottom:" + obstacleBottom)

        const obstacle = document.createElement('div')
        const upperObstacle = document.createElement('div')

        if(!isGameOver) obstacle.classList.add('obstacle')
        if(!isGameOver) upperObstacle.classList.add('obstacle')
        if(!isGameOver) upperObstacle.classList.add('upperObstacle')

        gameDisplay.appendChild(obstacle)
        gameDisplay.appendChild(upperObstacle)
 
        obstacle.style.left = obstacleLeft + 'px'
        obstacle.style.bottom = obstacleBottom + 'px'
        let gap = 150
        upperObstacle.style.height = 430 - randomHeight - gap +'px'
        upperObstacle.style.left = obstacleLeft + 'px'
        
        let upperObstacleBottom = upperObstacle.style.bottom;
        let score_ele = document.querySelector('.score-content')
        score_ele.innerHTML = score
        function moveObstacle() {
            obstacleLeft -= 2
            obstacle.style.left = obstacleLeft + 'px'
            upperObstacle.style.left = obstacleLeft + 'px'
            
            if(obstacleLeft === -60) {
                clearInterval(moveObstacle)
                gameDisplay.removeChild(obstacle)
                gameDisplay.removeChild(upperObstacle)
            }
            
            if ((obstacleLeft >= birdLeft-60 && obstacleLeft <= birdLeft+60) 
                && 
            ((birdBottom < obstacleBottom + 150) || birdBottom > obstacleBottom + 255)
                || 
            birdBottom <= 80)
            {
                gameOver()
                console.log(upperObstacleBottom)
                clearInterval(timerId)
                console.log(score)
            }
            else if(obstacleLeft == birdLeft -62){
                score += 1
                score_ele.innerHTML = score
            }
        }
        
        let timerId = setInterval(moveObstacle,20)
        if(!isGameOver) setTimeout(generateObstacle, 3200)
    }
    generateObstacle()
    document.addEventListener('keyup', control)
    function gameOver() {
        clearInterval(gameTimerId)
        console.log('Game Over!!')
        isGameOver = true;
        document.removeEventListener('keyup', control)
        
        let topScore = parseInt(topSCoreEle.innerHTML);
        if(score > topScore){
            topScoreChanged = true
            alert(`Kudos! You are the Top Scorer with ${score} points`)
            topScore = score
            // topSCoreEle = document.querySelector('.top-score-content')
            localStorage.setItem('topscore', topScore)
            topSCoreEle.innerHTML = topScore;

            localStorage.setItem('topscorer', player)
            topSCorerEle.innerHTML = player
        }
        

    }

})