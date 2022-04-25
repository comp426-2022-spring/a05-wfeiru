// Focus div based on nav button click
document.getElementById("homenav").onclick = function(){
    document.getElementById("home").className = "";
    document.getElementById("single").className = "hidden";
    document.getElementById("multi").className = "hidden";
    document.getElementById("guess").className = "hidden";
};

document.getElementById("singlenav").onclick = function(){
    document.getElementById("home").className = "hidden";
    document.getElementById("single").className = "";
    document.getElementById("multi").className = "hidden";
    document.getElementById("guess").className = "hidden";
};

document.getElementById("multinav").onclick = function(){
    document.getElementById("home").className = "hidden";
    document.getElementById("single").className = "hidden";
    document.getElementById("multi").className = "";
    document.getElementById("guess").className = "hidden";
};

document.getElementById("guessnav").onclick = function(){
    document.getElementById("home").className = "hidden";
    document.getElementById("single").className = "hidden";
    document.getElementById("multi").className = "hidden";
    document.getElementById("guess").className = "";
};

// Flip one coin and show coin image to match result when button clicked
function flipCoin() {
    fetch('http://localhost:5555/app/flip/')
        .then((response) => {
            return response.json();
        })
        .then((result) => {
            console.log(result);
            document.getElementById("result").innerHTML = result.flip;
            if(result.flip === "heads"){
                document.getElementById("heads").style.display = 'block';
                document.getElementById("tails").style.display = 'none';
            } else if(result.flip === "tails"){
                document.getElementById("heads").style.display = 'none';
                document.getElementById("tails").style.display = 'block';
            }
            document.getElementById("coin").style.display = 'none';
        })
}

// Flip multiple coins and show coin images in table as well as summary results
// Enter number and press button to activate coin flip series
function flipManyCoins() {
    var num = document.getElementById("number").value;
    fetch('http://localhost:5555/app/flip/coins', {
        body: JSON.stringify({"number": num}),
        headers: {"Content-Type": "application/json",},
        method: "post"
    })
        .then((response) => {
            return response.json();
        })
        .then((result) => {
            console.log(result);
            document.getElementById("results_heads").innerHTML = result.summary.heads;
            document.getElementById("results_tails").innerHTML = result.summary.tails;
            
            var chart = document.getElementById("chart");
            chart.innerHTML = '';
            var data = document.createElement("table");
            var row = data.insertRow();
            const arr = result.raw;
            var i = 0;
            while(i < arr.length){
                var row = data.insertRow();
                for(var j = 0; j < 5; j++){
                    if(i < arr.length){
                        var cell = row.insertCell();
                        var image = document.createElement('img');
                        image.setAttribute("src", "/assets/img/"+arr[i]+".png");
                        image.setAttribute("class", "smallcoin");
                        cell.appendChild(image); 
                        i++;
                    }
                }
            }
            chart.appendChild(data);
        })
}

// Guess a flip by clicking either heads or tails button
function guessHeads() {
    fetch('http://localhost:5555/app/flip/call/heads')
        .then((response) => {
            return response.json();
        })
        .then((result) => {
            console.log(result);
        })
}

function guessTails() {
    fetch('http://localhost:5555/app/flip/call/tails')
        .then((response) => {
            return response.json();
        })
        .then((result) => {
            console.log(result);
        })
}