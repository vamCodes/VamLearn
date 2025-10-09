import React from "react";
import type { QuizQuestion } from "../../types";

interface LAQCardProps {
  question: QuizQuestion;
  submitted: boolean;
}

const LAQCard: React.FC<LAQCardProps> = ({ question, submitted }) => {
  return (
    <div className="p-4 border rounded shadow-sm">
      <p className="font-semibold mb-2">{question.question}</p>
      {submitted ? (
        <div className="mt-2 text-gray-700">
          <strong>Answer:</strong> {question.answer}
        </div>
      ) : (
        <textarea
        //   disabled
          placeholder="Write your answer here (not scored automatically)"
          className="border p-2 w-full rounded h-24 resize-none text-gray-500"
        />
      )}
    </div>
  );
};

export default LAQCard;