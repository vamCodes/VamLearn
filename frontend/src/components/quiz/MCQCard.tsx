import React from "react";
import type { QuizQuestion } from "../../types";

interface MCQCardProps {
  question: QuizQuestion;
  onAnswer: (id: string, value: string) => void;
  submitted: boolean;
}

const MCQCard: React.FC<MCQCardProps> = ({ question, onAnswer, submitted }) => {
  return (
    <div className="p-4 border rounded shadow-sm">
      <p className="font-semibold mb-2">{question.question}</p>
      {question.options?.map((opt) => (
        <label key={opt} className="block cursor-pointer mb-1">
          <input
            type="radio"
            name={question.id}
            value={opt}
            checked={question.userAnswer === opt}
            onChange={(e) => onAnswer(question.id, e.target.value)}
            className="mr-2"
            disabled={submitted}
          />
          {opt}
        </label>
      ))}
      {submitted && (
        <div className="mt-2 text-gray-700">
          <strong>Answer:</strong> {question.answer} <br />
          <strong>Explanation:</strong> {question.explanation}
        </div>
      )}
    </div>
  );
};

export default MCQCard;