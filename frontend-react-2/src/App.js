import Header from './components/Header/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faVolumeUp, faVolumeDown, faArrowRight, faRedo } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useRef } from 'react';
import useSound from 'use-sound';
// Bensound
import soundUrl from './dreams.mp3';
import './App.css';

const ModelAUrl = 'http://127.0.0.1:5000/generate'

function App() {
  const [questions, setQuestions] = useState([
    {"question": "What's your favorite color?", "answer": ""},
    {"question": "How old are you?", "answer": ""},
    // ... Add more questions as needed
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const inputRef = useRef(null);

  const [volume, setVolume] = useState(1);
  const [play, { pause, sound, paused }] = useSound(soundUrl, { volume });

  const changeVolume = (delta) => {
    let newVolume = volume + delta;
    newVolume = Math.min(Math.max(newVolume, 0), 1); // Ensure volume is between 0 and 1
    setVolume(newVolume);
    if (sound) {
      sound.volume(newVolume);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleNext(currentIndex, questions, setCurrentIndex)
    }
  };
  

  const isLastQuestion = currentIndex === questions.length - 1;
  const isBeyondLastQuestion = currentIndex >= questions.length;

  return (
    <div className="App">
      <header className="App-header">
        <Header />
        <h1>{currentIndex >= questions.length ? "Thank you for your answers!" : questions[currentIndex].question}</h1>
        <div className="input-container">
          <input
            type="text"
            value={currentIndex >= questions.length ? "" : questions[currentIndex].answer}
            className="real-textbox"
            ref={inputRef}
            onKeyPress={handleKeyPress}
            onChange={(e) => {
              const updatedQuestions = [...questions];
              updatedQuestions[currentIndex].answer = e.target.value;
              setQuestions(updatedQuestions);
            }}
          />
          <button 
            onClick={() => {
              if (isLastQuestion) {
                handleGenerate(questions); // This function should handle the generate action.
                setCurrentIndex(currentIndex + 1);
              } else {
                handleNext(currentIndex, questions, setCurrentIndex);
              }
            }}
            disabled={isBeyondLastQuestion}
          >
          <FontAwesomeIcon icon={isLastQuestion ? faPlay : faArrowRight} />
          </button>
          <button onClick={ () => resetAnswers(questions, setQuestions, setCurrentIndex) }>
            <FontAwesomeIcon icon={faRedo} />
          </button>
        </div>
      <div className="input-container">
        <button onClick={play} aria-label="Play sound">
          <FontAwesomeIcon icon={faPlay} />
        </button>
        <button onClick={() => {pause()}} aria-label="Stop sound">
          <FontAwesomeIcon icon={faPause} />
        </button>
        <button onClick={() => changeVolume(-0.1)} aria-label="Decrease volume">
          <FontAwesomeIcon icon={faVolumeDown} />
        </button>
        <button onClick={() => changeVolume(0.1)} aria-label="Increase volume">
          <FontAwesomeIcon icon={faVolumeUp} />
        </button>
      </div>
    </header>
    </div>
  );
}

function handleNext(currentIndex, questions, setCurrentIndex) {
  setCurrentIndex(currentIndex + 1);
}

const resetAnswers = (questions, setQuestions, setCurrentIndex) => {
  // Reset all answers
  const resetQuestions = questions.map(q => ({ ...q, answer: "" }));
  setQuestions(resetQuestions);

  // Reset the index to the initial one
  setCurrentIndex(0);
}

function handleGenerate(questions) {
  var result = sendAnswers(questions)
  alert(result)
  return result
}

function sendAnswers(questions) {
  fetch(ModelAUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(questions)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

export default App;
