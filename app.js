let word = "";
let endgame = false;
let length =  3;
let number = [1,2,3,4,5,6,7,8,9];
let inputbox = document.getElementById("Input_Section"); //Player input box.
let score = 0;
let Correct = new Audio("Sound/Correct.mp3"); //Music, When answer is correct.
let Game_Over = new Audio("Sound/Game_Over.mp3"); //Music, when answer is incorrect.
let Wait_Song = new Audio("Sound/Wait_Song.mp3"); //Music, while show the numbers.

window.addEventListener("load" , () =>{ //Window load hide the number box.
    let Game = document.getElementById("Game_Section");
    Game.classList.add("hidden");
});

function StartGame()
{
    let Button_Start = document.getElementById("Game_Button");
    inputbox.classList.remove("hidden");
    Button_Start.classList.add("hidden");
    let Game = document.getElementById("Game_Section");
    let Text = document.getElementById("Game_Text");
    Game.classList.remove("hidden");
    for (let i = 3; i >= 1; i--) { //Count down. 
        setTimeout(() => {Text.innerHTML = i.toString();}, (4 - i) * 1000); 
    }
    setTimeout(() => {Text.innerHTML = "Game Start!!!";}, 4000);
    setTimeout(() => {GenerateWord();} , 5000);
}

function GenerateWord()
{
    setTimeout(() => {Correct.pause(); Correct.currentTime = 0;},1000); //Pause correct song.
    if(!endgame)
    {
        word = "";
        for(let i = 0; i < length; i++)
        {
            let index = Math.floor(Math.random() * 10);
            word += index.toString();
        }
        console.log(word);
        let Text = document.getElementById("Game_Text");
        Text.classList.remove("hidden");
        Text.innerHTML = word;
        inputbox.placeholder = "Wait...";
        HiddenText()
    }
}


inputbox.addEventListener("keydown", (event) =>{
    if (event.key === "Enter") //Press enter to submit.
    {
        if (inputbox.value === word) //Correct Answer.
        {
            length += 1;
            score += 1;
            inputbox.value = "";
            inputbox.disabled = true;
            let Score_Board = document.getElementById("Game_Score");
            Score_Board.innerHTML = "";
            Score_Board.innerHTML = "Score : " + score.toString();
            Correct.play();
            GenerateWord();
        }
        else //Wrong Answer.
        {
            endgame = true;
            alert("End Game You Input Wrong Number!!!"); //Show messagebox when player give wrong answer.
            let Text = document.getElementById("Game_Text");
            Text.classList.remove("hidden");
            Game_Over.play();
            Text.innerHTML = "Game Over";
            inputbox.disabled = true;
            let button_restart = document.getElementById("Game_Button_End");
            button_restart.classList.remove("hidden");
        }
    }
    else if (!/^[0-9]$/.test(event.key) && event.key != "Backspace") //Player can only press 0-9 and Backspace
    {
        event.preventDefault(); 
    }
});

function HiddenText() //Player has 3 seconds to remember the numbers.
{
    let Text = document.getElementById("Game_Text");
    Wait_Song.play();
    Wait_Song.playbackRate = (score*0.1) + 1; //Increase song speed to build pressure.
    setTimeout(() => {Text.classList.add("hidden"); inputbox.disabled = false; inputbox.placeholder = "Write Your Number"; Wait_Song.pause(); Wait_Song.currentTime = 0;}, 3000);
}

function RestartGame() //Restart game 
{
    window.location.reload();
}