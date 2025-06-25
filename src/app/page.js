'use client';
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-indigo-100 to-purple-200 p-6 text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-indigo-800 mb-4 drop-shadow-md">
        Velkommen til Quizzen!
      </h1>
      <p className="text-lg md:text-xl text-gray-700 mb-8">
        Test din viden indenfor sport, historie og meget mere. Klar på udfordringen?
      </p>
      <button
        onClick={() => window.location.href = '/quiz'}
        className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-semibold rounded-lg shadow transition"
      >
        Start Quiz
      </button>
    </div>
  );
}
