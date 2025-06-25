'use client';
import { useState, useEffect } from 'react';

export default function QuizPage() {
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState('');
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchQuestions = async () => {
    setLoading(true);
    const res = await fetch(
      'https://opentdb.com/api.php?amount=5&category=21&difficulty=easy&type=multiple'
    );
    const data = await res.json();
    setQuestions(data.results);
    setIndex(0);
    setScore(0);
    setSelected('');
    setDone(false);
    setLoading(false);
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleAnswer = (answer) => {
    const correct = questions[index].correct_answer;
    if (answer === correct) setScore(score + 1);
    setSelected(answer);

    setTimeout(() => {
      if (index + 1 < questions.length) {
        setIndex(index + 1);
        setSelected('');
      } else {
        setDone(true);
      }
    }, 1000);
  };

  if (loading || questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pink-200 text-xl">
        Henter spørgsmål...
      </div>
    );
  }

  if (done) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-green-100 text-center p-6">
        <h2 className="text-3xl font-bold text-green-700 mb-4">Resultat 🎉</h2>
        <p className="text-lg mb-6">
          Du fik <strong>{score}</strong> ud af <strong>{questions.length}</strong> rigtige!
        </p>
        <button
          onClick={fetchQuestions}
          className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition"
        >
          Prøv en ny quiz
        </button>
      </div>
    );
  }

  const current = questions[index];
  const answers = [...current.incorrect_answers, current.correct_answer].sort();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-300 text-center px-4 py-8">
      <div className="max-w-xl w-full bg-blue-50 shadow rounded-lg p-6">
        <h2
          className="text-xl font-semibold text-blue-800 mb-6"
          dangerouslySetInnerHTML={{ __html: current.question }}
        />
        <div className="grid gap-3">
          {answers.map((a) => (
            <button
              key={a}
              onClick={() => handleAnswer(a)}
              disabled={!!selected}
              className={`px-4 py-2 rounded-lg border font-medium transition ${
                selected
                  ? a === current.correct_answer
                    ? 'bg-green-400 text-white border-green-600'
                    : a === selected
                    ? 'bg-red-400 text-white border-red-600'
                    : 'bg-gray-100 text-gray-700'
                  : 'hover:bg-blue-100'
              }`}
              dangerouslySetInnerHTML={{ __html: a }}
            />
          ))}
        </div>
        <p className="mt-4 text-gray-600">
          Spørgsmål {index + 1} / {questions.length}
        </p>
      </div>
    </div>
  );
}
