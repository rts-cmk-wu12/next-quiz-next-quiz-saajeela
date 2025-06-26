'use client';
import { useSearchParams, useRouter } from 'next/navigation';

export default function ResultPage() {
  const params = useSearchParams();
  const router = useRouter();
  const score = params.get('score');
  const total = params.get('total');

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-green-100 text-center p-6">
      <h2 className="text-3xl font-bold text-green-700 mb-4">Resultat 🎉</h2>
      <p className="text-lg mb-6">
        Du fik <strong>{score}</strong> ud af <strong>{total}</strong> rigtige!
      </p>
      <button
        onClick={() => router.push('/')}
        className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition"
      >
        Prøv en ny quiz
      </button>
    </div>
  );
}
