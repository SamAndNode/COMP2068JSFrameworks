const prompt = require ('prompt');

prompt.start();

prompt.get(['userSelection'], function(err, result){
    
    const userSelection = result.userSelection.toUpperCase();

    if(userSelection !== 'ROCK' && userSelection !== 'PAPER' && userSelection != 'SCISSORS'){
        console.log("Invalid Selection. Please choose ROCK, PAPER or SCISSORS (in UPPERCASE).")
        return;
    }

    console.log("Your Selection: " + userSelection);

    const randomNumber = Math.random();

function getComputerSelection(randomNumber){
    if (randomNumber >= 0 && randomNumber <= 0.34){
        return 'PAPER';
    }
    if (randomNumber > 0.34 && randomNumber <= 0.67){
        return 'SCISSORS';
    }
    else{
        return 'ROCK';
    }
    
}

    const computerSelection = getComputerSelection(randomNumber);

    console.log("Computer Selection: " + computerSelection);

    let winner;
    if(userSelection === computerSelection){
        winner = "It's a tie";
    }
    else if(
        (userSelection==='ROCK' && computerSelection==='SCISSORS') ||
        (userSelection==='SCISSORS' && computerSelection==='PAPER') ||
        (userSelection==='PAPER' && computerSelection==='ROCK')

    )
    {
        winner = "User wins";
    }
    else{
        winner = "Computer wins";
    }
    console.log(winner);
})


