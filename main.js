String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

const alpButTop = document.querySelector(".top");
const alpButBot = document.querySelector(".bot");

//Creating 26 Alphabetical Buttons
for(let i=0; i<15; i++){
    alpButTop.innerHTML+= `<button class ="btn btn-primary">${String.fromCharCode(65+i)}</button>`;
}

for(let i=15; i<26; i++){
    alpButBot.innerHTML+= `<button class ="mt-2 btn btn-primary">${String.fromCharCode(65+i)}</button>`;
}

//Text goes inside this node
const textNode = document.querySelector(".but-show");

//Creating array of Questions!
const questions = ["I N D I A", "A U S T R A L I A", "E N G L A N D"];


//Select a random question -> 
const randomIdx = Math.floor(Math.random() * (questions.length -1 - 0 + 1));

//BRING THE BLANK SPACES -
textNode.innerText = "";
for(let i=0; i<questions[randomIdx].length; i++){
    if(questions[randomIdx][i] >= "A" && questions[randomIdx][i] <= "Z" ){
        textNode.innerText += " _"; 
    }
    

    if(questions[randomIdx][i] === "-")
        textNode.innerText += " - ";

}

let iniStr = textNode.innerText;
const size = textNode.innerText.length;


//Checking if the user pressed the proper key!
//All nav nums button
const alphBut = document.querySelectorAll(".btn");

//ImageNode
const imageNode = document.getElementById("hang-photo");
console.log(imageNode);

console.log(questions[randomIdx]);

let wrongNo = 0;

const resultNode = document.querySelector(".result");

alphBut.forEach((but) => {
    but.addEventListener("click", () =>{

        const currAlph = but.innerText;

        but.classList.remove("btn-primary");
        but.classList.add("btn-danger");
        but.disabled = true;
        

        //If char exists
        if(questions[randomIdx].includes(currAlph)){
            
            let idx = 0;

            //Creating a set to store different index of same alphabet

            const mySet = new Set();

            for(idx = 0; idx<questions[randomIdx].length; idx++){
                mySet.add(questions[randomIdx].indexOf(currAlph,idx));
            }

            mySet.delete(-1);
            
            const myArr = [...mySet];

            //Updating oldString to newString and keep making changes to newString;
            let newStr;

            for(let i=0; i<myArr.length; i++){
                newString = iniStr.replaceAt(myArr[i],currAlph);
                iniStr = newString;
            }

            //iniStr CONTAINS THE FINAL STRING;
            textNode.innerText = iniStr;


        }

        else{
            wrongNo++;

            if(wrongNo >= 1){
                imageNode.src = `${wrongNo+1}.png`
            }

            if(wrongNo === 6){
                alphBut.forEach((but) => {
                    // but.classList = "btn";
                    // but.classList += " btn-danger";
                    but.classList.remove("btn-primary");
                    but.classList.add("btn-danger");
                    but.disabled = true;
                })
            }
            
        }

        if(wrongNo === 6){
            resultNode.innerText = "You have Lost! :(";
        }

        if(textNode.innerText === questions[randomIdx]){
            resultNode.innerText = "You have Won! :)"
        }


    })
})