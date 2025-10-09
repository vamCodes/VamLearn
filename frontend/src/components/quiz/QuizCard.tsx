import React from "react";
import type { QuizQuestion } from "../../types";
import MCQCard from "./MCQCard";
import SAQCard from "./SAQCard";
import LAQCard from "./LAQCard";

interface QuizCardProps {
  question: QuizQuestion;
  onAnswer: (id: string, value: string) => void;
  submitted: boolean;
}

const QuizCard: React.FC<QuizCardProps> = ({ question, onAnswer, submitted }) => {
  switch (question.type) {
    case "MCQ":
      return <MCQCard question={question} onAnswer={onAnswer} submitted={submitted} />;
    case "SAQ":
      return <SAQCard question={question} onAnswer={onAnswer} submitted={submitted} />;
    case "LAQ":
      return <LAQCard question={question} submitted={submitted} />;
    default:
      return null;
  }
};

export default QuizCard;