
let sp1 = document.querySelector("#sp1"); // X
let sp2 = document.querySelector("#sp2"); // O
let clear = document.querySelector("#clear"); // clear button
let computer = document.querySelector("#computer"); // computer button
let computerCheck = false; // Flag to track if computer mode is enabled
  
computer.addEventListener("click", () => {
    // Toggle computer mode on and off
    computerCheck = !computerCheck;
    
    // Update button style and text to indicate the mode
    if (computerCheck) {
        computer.style.cssText = "background:lightcoral";
        computer.innerText = "Computer Mode Off"; // Change button text to Manual Mode when in computer mode
    } else {
        computer.style.cssText = "background:greenyellow";
        computer.innerText = "Computer Mode On"; // Change button text to Computer Mode when in manual mode
    }
});

let boxes = document.querySelectorAll(".b1");
let resetBtn = document.querySelector("#resbtn");
let msg = document.querySelector(".msg");
let turn0 = true;

let winnerX = 0;
let winnerO = 0;

const wining_pattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

show_winner = (winner) => {
    setTimeout(() => {
        let down = true;
        msg.innerText = `CONGRATS! WINNER IS ${winner} PLAYER`;
        
        if (down) {
            msg.style.cssText = "height:500px";
            down = false;
        }
    }, 500);
};

const check_winner = () => {
    for (let pattern of wining_pattern) {
        if (
            boxes[pattern[0]].innerText === "X" &&
            boxes[pattern[1]].innerText === "X" &&
            boxes[pattern[2]].innerText === "X"
        ) {
            let winner = "X";
            show_winner(winner);
            
            winnerX++;
            sp1.innerText = winnerX;
            if(computerCheck){sp1.innerText--;}
            
            clear.addEventListener("click", () => {
                sp1.innerText = "";
                winnerX = 0;
                if (winnerX == 0) {
                    sp1.innerText = 0;
                }
            });
            return; // Stop checking further patterns
        } else if (
            boxes[pattern[0]].innerText === "O" &&
            boxes[pattern[1]].innerText === "O" &&
            boxes[pattern[2]].innerText === "O"
        ) {
            winnerO++;
            let winner = "O";
            show_winner(winner);
            sp2.innerText = winnerO;

            clear.addEventListener("click", () => {
                sp2.innerText = "";
                winnerO = 0;
                if (winnerO == 0) {
                    sp2.innerText = 0;
                }
            });
            return; // Stop checking further patterns
        }
    }
    let isdraw = true;
    boxes.forEach((box) => {
        if (box.innerText == "") {
            isdraw = false;
        }
    });
    if (isdraw) {
        msg.innerText = "OOPS! MATCH DRAW";
        msg.style.cssText = "height:500px";
    }
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        // Player X's turn
        if (turn0) {
            box.innerText = "X";
            box.disabled = true; // Disable clicked box
            turn0 = false; // Switch turn to O
            check_winner(); // Check if X has won
        } 
        // Player O's turn (manual player) when not in computer mode
        else if (!turn0 && !computerCheck) {
            box.innerText = "O";
            box.disabled = true; // Disable clicked box
            turn0 = true; // Switch turn to X
            check_winner(); // Check if O has won
        }

        // Computer's turn if computerCheck is enabled
        if (computerCheck && !turn0) {
            setTimeout(() => {
                let winnerC = "O"; // Computer symbol
                let emptyBoxes = Array.from(boxes).filter((box) => box.innerText === ""); // Find empty boxes
                if (emptyBoxes.length > 0) {
                    let randomBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)]; // Random empty box
                    randomBox.innerText = winnerC; // Computer marks its symbol
                    randomBox.disabled = true; // Disable the box
                    turn0 = true; // Switch turn back to Player X
                    check_winner(); // Check if O (computer) has won
                }
                
            }, 1000); // Delay for computer's move
        }
    });
});

resetBtn.addEventListener("click", () => {
    boxes.forEach((box) => {
        box.innerText = ""; // Clear box text
        box.disabled = false; // Enable all boxes
        msg.innerText = "";
        msg.style.cssText = "height:20px";
    });
    turn0 = true; // Reset turn to Player O
}); 