import React, { useState, useEffect } from "react";
import "../styles/typinggame.css";

function TypingGame() {
  const [quoteArr, setQuoteArr] = useState([]);
  const [iterator, setIterator] = useState(0);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(0);
  const [timerId, setTimerId] = useState(null);
  const [timestamp, setTimestamp] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isTestStarted, setIsTestStarted] = useState(false);

  useEffect(() => {
    getQuoteArr();
  }, []);

  async function getQuoteArr() {
    try {
      const response = await fetch("https://type.fit/api/quotes");
      const data = await response.json();
      const selectedQuotes = selectRandomElements(data, 10);
      setQuoteArr(selectedQuotes);
    } catch (error) {
      console.error(error);
    }
  }

  function selectRandomElements(array, numberOfElements) {
    let randomElements = [];
    for (let i = 0; i < numberOfElements; i++) {
      let randomIndex = Math.floor(Math.random() * array.length);
      randomElements.push(array[randomIndex]);
    }
    return randomElements;
  }

  function updateQuote() {
    if (iterator === 10) {
      clearInterval(timerId);
      setTimerId(null);
      setIsTestStarted(false);
      alert("TEST COMPLETED");
      localStorage.setItem("score", score);
      localStorage.setItem("avgTime", timer / 10);
      return;
    }

      setIterator(iterator+1);
  }

  function compareText() {
    // console.log(inputValue+quoteArr[iterator].text);
    if(iterator<10){

      let str=document.getElementById('inp').value.toLowerCase();
      let str1=quoteArr[iterator].text.toLowerCase();
      console.log(str+str1);
      if(str==str1){return 1;}
      return 0;
    }
    else{
      clearInterval(timerId);
      setTimerId(null);
      setIsTestStarted(false);
      alert("TEST COMPLETED");
      localStorage.setItem("score", score);
      localStorage.setItem("avgTime", timer / 10);
    }
    // return inputValue.toLowerCase() == quoteArr[iterator].text.toLowerCase();
  }

  function handleKeyPress(event) {
    // console.log(event.key,"KEY");
    if (event.key === "Enter") {
      // event.preventDefault();
      if (compareText()) {
        alert("correct");
        setScore((prevScore) => prevScore + 1);
      } else {
        alert("incorrect");
      }
      setInputValue("");
      setTimeout(() => {
        updateQuote();
        setTimestamp((prevTimestamp) => [...prevTimestamp, timer]);
      }, 1000);
    }
  }

  function handleStart() {
    getQuoteArr();
    setIterator(0);
    setScore(0);
    setTimer(0);
    setTimestamp([]);
    setIsTestStarted(true);
    setTimerId(setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000));
  }

  return (
    <div className="typing-game">
      {isTestStarted ? (
        <>
          <div className="timer">{timer}</div>
          <div className="quote">{quoteArr[iterator]?.text}</div>
          <textarea
          id="inp"
            className="input"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            onKeyDown={handleKeyPress}
          />
        </>
      ) : (
        <button className="start-button" onClick={handleStart}>
          Start Test
        </button>
      )}
    </div>
  );
}

export default TypingGame;
