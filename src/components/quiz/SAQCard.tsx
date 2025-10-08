import React from "react";
import type { QuizQuestion } from "../../types";

interface SAQCardProps {
  question: QuizQuestion;
  onAnswer: (id: string, value: string) => void;
  submitted: boolean;
}

const SAQCard: React.FC<SAQCardProps> = ({ question, onAnswer, submitted }) => {
  return (
    <div className="p-4 border rounded shadow-sm">
      <p className="font-semibold mb-2">{question.question}</p>
      <input
        type="text"
        value={question.userAnswer || ""}
        onChange={(e) => onAnswer(question.id, e.target.value)}
        className="border p-2 w-full rounded"
        disabled={submitted}
      />
      {submitted && (
        <div className="mt-2 text-gray-700">
          <strong>Answer:</strong> {question.answer}
        </div>
      )}
    </div>
  );
};

export default SAQCard;