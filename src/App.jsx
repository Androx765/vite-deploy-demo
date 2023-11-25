import React, { useState } from 'react';
import epic_win from './assets/win.png'
import sad from './assets/sad.png'
import mid from './assets/mid.png'
import happy from './assets/happy.png'

const questions = [
    {
        question: 'Frage 1: Was ist die Hauptstadt von Deutschland?',
        answers: ['Berlin', 'Paris', 'London', 'Rom'],
        correctAnswer: 'Berlin'
    },
    {
        question: 'Frage 2: Was ist die Hauptstadt von Frankreich?',
        answers: ['Berlin', 'Paris', 'London', 'Rom'],
        correctAnswer: 'Paris'
    },
    // Füge weitere Fragen hier hinzu
];

const App = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [win, setWin] = useState(false);
    const [image, setImage] = useState(mid)
    const correctPoints = 10;
    const handleAnswerClick = (selectedAnswer) => {
        let updatedScore = score; // Speichere den aktuellen Score
        if (selectedAnswer === questions[currentQuestion].correctAnswer) {
            updatedScore += correctPoints; // Aktualisiere den Score
            setScore(updatedScore); // Setze den neuen Score
            setImage(happy)
        } else {
            setImage(sad)
        }

        // Hier könntest du den Code ergänzen, um zur nächsten Frage zu gehen

        if (questions.length - 1 == currentQuestion) {
            if (updatedScore < questions.length * correctPoints) {
                setCurrentQuestion(0)
                setScore(0)
            } else {
                setImage(epic_win)
                setWin(true)
            }
        } else {
            setCurrentQuestion(currentQuestion + 1);
        }

    };
    const handleReplayClicked = () => {
        setCurrentQuestion(0)
        setScore(0)
        setWin(false)
        setImage(mid)
    }

    return (
        <div className="App">
            <div className="image-container">
                <img src={image} alt="Bild" />
            </div>
            {win ?
                <div>
                    <h2>DU HAST GEWONNEN</h2>
                    <button onClick={() => handleReplayClicked()}>
                        Nochmal?
                    </button>
                </div>
                :
<div>
    <div className="quiz-container">
        <h2>{questions[currentQuestion].question}</h2>
        <div className="answers">
            {questions[currentQuestion].answers.map((answer, index) => (
                <button key={index} onClick={() => handleAnswerClick(answer)}>
                    {answer}
                </button>
            ))}
        </div>
    </div>
</div>
            }
        </div >
    );
};

export default App;
