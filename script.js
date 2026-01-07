 const display = document.getElementById('display');
    
    const liveResult = document.getElementById('liveResult')
     
    let finalResult = "0";
    let justEvaluted = false;

    function appendToDisplay(input) {
        if (justEvaluted) {
            if (isAnOperator(input)) {
                display.textContent += input;
            } else {
                display.textContent = input;
            }
            justEvaluted = false;
        } 
        else if (display.textContent === "0" && ! isAnOperator(input)) {
            display.textContent = input;
        }
        else{
            display.textContent += input;
        }

        display.classList.add("top")
        display.classList.remove("center")
        display.classList.remove("hide")
        calculateLive()
    }
    function isAnOperator(char) {
        return /[+\-×÷%]/.test(char)
    }
    
    function clearDisplay() {
            display.textContent = "0";
            liveResult.textContent = "";
             finalResult = "";
             justEvaluted = false;
    }
    
    function clearLastDisplay() {
        display.textContent = display.textContent.slice(0, -1);
        if (display.textContent === "") display.textContent = "0";
        calculateLive();
    }
    
    
function calculateLive() {
    const expr = display.textContent;

    // Avoid empty expression
    if (!/[+\-×÷%]/.test(expr)) {
        liveResult.textContent = "";
        return;
    }

    const formattedExpr = expr.replace(/×/g, "*")
          .replace(/÷/g, "/")
          .replace(/%/g, "/100");

    try {
        const result = eval(formattedExpr); // evaluate expression
        if (Number.isFinite(result)) {
            finalResult = result;
            liveResult.textContent = result;
        }
    }

    catch {
        liveResult.textContent = ""; // incomplete expression
    }
}

function calculate() {
    if (finalResult !== "") {
        display.textContent = finalResult;
        liveResult.textContent = "";
        justEvaluted = true;
    }
}