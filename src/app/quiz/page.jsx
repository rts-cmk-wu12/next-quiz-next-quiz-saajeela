'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function QuizPage() {
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState('');
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
    setLoading(false);
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleAnswer = (answer) => {
    const correct = questions[index].correct_answer;
    if (answer === correct) setScore(prev => prev + 1);
    setSelected(answer);

    setTimeout(() => {
      if (index + 1 < questions.length) {
        setIndex(prev => prev + 1);
        setSelected('');
      } else {
        router.push(`/result?score=${score + (answer === correct ? 1 : 0)}&total=${questions.length}`);
      }
    }, 1000);
  };

  if (loading || questions.length === 0) {
    return <div className="min-h-screen flex items-center justify-center bg-pink-200 text-xl">Henter spørgsmål...</div>;
  }

  const current = questions[index];
  const answers = [...current.incorrect_answers, current.correct_answer].sort();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-300 text-center px-4 py-8">
      <div className="max-w-xl w-full bg-blue-50 shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-blue-800 mb-6" dangerouslySetInnerHTML={{ __html: current.question }} />
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

