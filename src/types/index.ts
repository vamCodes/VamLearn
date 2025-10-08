// Tab types
export type TabType = 'quiz' | 'chat' | 'progress' | 'pdf-viewer';
export type QuizQuestionType = "MCQ" | "SAQ" | "LAQ";

export interface QuizQuestion {
  id: string;                // Unique ID for the question
  type: QuizQuestionType;    // Question type: MCQ, SAQ, LAQ
  question: string;          // The question text
  options?: string[];        // Only for MCQs
  answer: string;            // Correct answer
  explanation: string;       // Optional explanation for the answer
  userAnswer?: string;       // The answer selected/typed by the user
}
// PDF Types
export interface PDF {
  id: string;
  name: string;
  url: string;
  file? : File;
  type: 'uploaded' | 'sample';
  uploadDate: string;
  textContent?: PDFTextContent;
  metadata?: PDFMetadata;
}






export interface PDFTextContent {
  totalPages: number;
  pages: PDFPage[];
  fullText: string;
}

export interface PDFPage {
  pageNumber: number;
  text: string;
}

export interface PDFMetadata {
  title?: string;
  author?: string;
  subject?: string;
  keywords?: string;
  pageCount: number;
}

// Quiz Types
export type QuestionType = 'mcq' | 'saq' | 'laq';
export type QuizType = 'mcq' | 'saq' | 'laq' | 'mixed';
export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export interface Question {
  id: string;
  type: QuestionType;
  question: string;
  options?: string[]; // Only for MCQ
  correctAnswer: number | string; // index for MCQ, text for SAQ/LAQ
  explanation: string;
  topic: string;
  difficulty: DifficultyLevel;
}

export interface Quiz {
  id: string;
  pdfId: string;
  pdfName: string;
  type: QuizType;
  questions: Question[];
  createdAt: string;
}

export interface QuizAttempt {
  quizId: string;
  answers: Record<string, number | string>; // questionId -> answer
  score: number;
  totalPoints: number;
  percentage: number;
  completedAt: string;
}

export interface QuizResult {
  score: number;
  totalPoints: number;
  percentage: number;
  results: QuestionResult[];
}

export interface QuestionResult extends Question {
  userAnswer?: number | string;
  isCorrect: boolean;
  feedback?: string;
}

// Chat Types
export interface Chat {
  id: string;
  title: string;
  pdfId?: string;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  citations?: Citation[];
  timestamp: string;
}

export interface Citation {
  pageNumber: number;
  text: string;
  relevanceScore?: number;
}

// Progress Types
export interface Progress {
  id: string;
  strengths: string[]; // Topic names
  weaknesses: string[]; // Topic names
  history: QuizAttempt[];
  totalQuizzes: number;
  averageScore: number;
  lastUpdated: string;
}

export interface TopicProgress {
  topic: string;
  attemptsCount: number;
  averageScore: number;
  isStrength: boolean;
  isWeakness: boolean;
}

// App State Types
export interface AppState {
  pdfs: PDF[];
  selectedPdf: PDF | null;
  currentTab: TabType;
  isLoading: boolean;
  error: string | null;
  apiKey: string;
}

// API Response Types
export interface ApiError {
  message: string;
  code?: string;
  details?: any;
}

// UI Component Props Types
export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  icon?: React.ReactNode;
}

export interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  fullScreen?: boolean;
}

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}