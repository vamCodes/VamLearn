import React, { useState } from 'react';
import type { PDF } from '../types';
import Button from '../components/common/Button';
import {gener}



interface QuizTabProps {
  selectedPdf: PDF | null;
  extractedText: string;
}

interface QuizQuestion {
  id: string;
  type: 'MCQ' | 'SAQ' | 'LAQ';
  question: string;
  options?: string[];
  answer: string;
  explanation: string;
  userAnswer?: string;
}

const QuizTab: React.FC<QuizTabProps> = ({ selectedPdf, extractedText }) => {
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

 const generateQuiz = async () => {
  if (!extractedText || extractedText.length === 0) return alert('No text extracted.');
  setLoading(true);
  setSubmitted(false);

  try {
    // Take only first chunk for now
    const firstChunk = Array.isArray(extractedText) ? extractedText[0] : extractedText;
    console.log("🧾 Sending this text chunk to Groq:", firstChunk.slice(0, 4000)); // log preview
    const response = await fakeGPTQuizGenerator(firstChunk);
    setQuizQuestions(response);
  } catch (err) {
    console.error(err);
    alert('Failed to generate quiz.');
  } finally {
    setLoading(false);
  }
};

  const handleAnswerChange = (id: string, value: string) => {
    setQuizQuestions(prev =>
      prev.map(q => (q.id === id ? { ...q, userAnswer: value } : q))
    );
  };

  const handleSubmit = () => {
    let totalScore = 0;
    quizQuestions.forEach(q => {
      if (q.userAnswer?.trim().toLowerCase() === q.answer.trim().toLowerCase()) {
        totalScore++;
      }
    });
    setScore(totalScore);
    setSubmitted(true);
  };

  if (!selectedPdf)
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-500">
        <p>Please select a PDF to start your quiz.</p>
      </div>
    );

  return (
    <div className="flex flex-col items-center p-8">
      <h2 className="text-2xl font-semibold mb-2 text-center">
        Here's the PDF you selected:
      </h2>
      <p className="text-lg text-gray-600 mb-6 text-center">{selectedPdf.name}</p>

      <Button onClick={generateQuiz} loading={loading} variant="primary" size="lg">
        Generate Quiz
      </Button>

      <div className="w-full max-w-3xl mt-6 space-y-4">
        {quizQuestions.map(q => (
          <div key={q.id} className="p-4 border rounded shadow-sm">
            <p className="font-semibold">{q.question}</p>

            {q.type === 'MCQ' && q.options && (
              <div className="mt-2 space-y-1">
                {q.options.map(opt => (
                  <label key={opt} className="block cursor-pointer">
                    <input
                      type="radio"
                      name={q.id}
                      value={opt}
                      checked={q.userAnswer === opt}
                      onChange={e => handleAnswerChange(q.id, e.target.value)}
                      className="mr-2"
                    />
                    {opt}
                  </label>
                ))}
              </div>
            )}

            {(q.type === 'SAQ' || q.type === 'LAQ') && (
              <input
                type="text"
                className="border p-2 w-full mt-2 rounded"
                value={q.userAnswer || ''}
                onChange={e => handleAnswerChange(q.id, e.target.value)}
              />
            )}

            {submitted && (
              <p className="mt-2 text-gray-700">
                <strong>Answer:</strong> {q.answer} <br />
                <strong>Explanation:</strong> {q.explanation}
              </p>
            )}
          </div>
        ))}

        {quizQuestions.length > 0 && !submitted && (
          <Button onClick={handleSubmit} variant="success" size="md">
            Submit Quiz
          </Button>
        )}

        {submitted && (
          <p className="mt-4 font-bold text-lg text-center">
            Your score: {score} / {quizQuestions.length}
          </p>
        )}
      </div>
    </div>
  );
};

export default QuizTab;