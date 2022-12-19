import React, { useState } from "react";
import "./estilos.css";

function Calculator() {
  const [result, setresult] = useState("");
  const [numScreen, setnumScreen] = useState("");
  const [operator, setoperator] = useState(false);
  const [uniqOperator, setuniqOperator] = useState(false);
  const [uniqCom, setuniqCom] = useState(false);
  const [countParentheses, setCountParentheses] = useState(0);
  const [openParentheses, setOpenParentheses] = useState(false);

  const parentheses = (par) => {
    if (!openParentheses && par === "(") {
      setOpenParentheses(true);
      setCountParentheses(countParentheses + 1);
      setnumScreen(numScreen + par);
    }
    if (!openParentheses && par === "(" && !uniqOperator && numScreen.length>0) {
      setOpenParentheses(true);
      setCountParentheses(countParentheses + 1);
      setnumScreen(numScreen + "*" + par);
    }
    if (par === ")" && countParentheses > 0) {
      setOpenParentheses(false);
      setCountParentheses(countParentheses - 1);
      setnumScreen(numScreen + par);
    }
  };

  const commumUnique = () => {
    if (!uniqCom) {
      setuniqCom(true);
      setnumScreen(numScreen + ".");
    }
  };

  const calculate = () => {
    let result = eval(numScreen);
    try {
      setresult(result);
      setoperator(true);
      setuniqCom(false);
      setCountParentheses(0);
      setOpenParentheses(false);
    } catch (error) {
      setresult("ERROR");
    }
  };

  const digitCalc = (bt) => {
    let digitedItems = bt;
    try {
      if (
        numScreen.length > 1 &&
        operator &&
        (bt === "/" || bt === "*" || bt === "-" || bt === "+")
      ) {
        digitedItems = result + bt;
        setnumScreen(digitedItems);
        setoperator(false);
        setOpenParentheses(false)
      } else if (operator) {
        setresult("");
        setnumScreen(bt);
        setoperator(false);
        setOpenParentheses(false)
      } else if (isNaN(bt) && !uniqOperator) {
        setnumScreen(numScreen + digitedItems);
        setuniqCom(false);
        setuniqOperator(true);
        setOpenParentheses(false)
      } else if (!isNaN(bt)) {
        setnumScreen(numScreen + digitedItems);
        setuniqOperator(false);
        setOpenParentheses(false)
      }
    } catch (error) {
      console.log(error);
    }
  };
  const cleanMemory = () => {
    setnumScreen("");
    setresult("");
    setCountParentheses(0);
    setOpenParentheses(false);
    return;
  };
  const cleanType = () => {
    let screenLength = numScreen;
    screenLength = screenLength.substring(0, screenLength.length - 1);
    setnumScreen(screenLength);
  };

  document.title = "Simple React Calculator"

  return (
    <>
      <h3 id="head">Simple react calculator</h3>
      <div className="container">
        <div id="telaNum">{numScreen}</div>
        <div id="telaResposta">{result}</div>
      </div>
      <div className="botoes">
        <button onClick={() => cleanMemory()}>AC</button>
        <button onClick={() => parentheses("(")}>(</button>
        <button onClick={() => parentheses(")")}>)</button>
        <button onClick={() => digitCalc("/")}>÷</button>
        <button onClick={() => digitCalc("7")}>7</button>
        <button onClick={() => digitCalc("8")}>8</button>
        <button onClick={() => digitCalc("9")}>9</button>
        <button onClick={() => digitCalc("*")}>x</button>
        <button onClick={() => digitCalc("4")}>4</button>
        <button onClick={() => digitCalc("5")}>5</button>
        <button onClick={() => digitCalc("6")}>6</button>
        <button onClick={() => digitCalc("-")}>-</button>
        <button onClick={() => digitCalc("1")}>1</button>
        <button onClick={() => digitCalc("2")}>2</button>
        <button onClick={() => digitCalc("3")}>3</button>
        <button onClick={() => digitCalc("+")}>+</button>
        <button onClick={() => commumUnique()}>.</button>
        <button onClick={() => digitCalc("0")}>0</button>
        <button onClick={() => cleanType()}>Del</button>
        <button onClick={() => calculate()}>=</button>
      </div>
    </>
  );
}

export default Calculator;
