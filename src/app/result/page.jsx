'use client'
 
import { useRouter, useSearchParams } from 'next/navigation'
 
export default function ResultPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const score = searchParams.get('score')
  const total = searchParams.get('total')
 
 
  return (
 
   
    <div className="max-w-xl w-full h-200 bg-indigo-100 to-purple-200shadow rounded-lg p-16 flex flex-col items-center justify-center text-center m-auto">
      <h2 className="text-3xl font-bold text-green-700 mb-4">Result</h2>
      <p className="text-lg mb-6">
        You have <strong>{score}</strong> out of <strong>{total}</strong> correct answers!
      </p>
      <button
        onClick={() => router.push('/')}
        className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition"
      >
        Start new  quiz
      </button>
    </div>
  )
}