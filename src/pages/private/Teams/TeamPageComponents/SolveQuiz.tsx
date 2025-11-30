import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "@/services/react-query/api";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { DtoSolveQuizRequest, DtoSolveQuestionRequest, DtoSolveQuizResponse } from "@/api";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";

interface ReadQuizQuestionResponse {
  quiz_question_id: string;
  question: string;
  quiz_options: string[];
}

interface ReadQuizResponse {
  quiz_id: string;
  quiz_title: string;
  quiz_questions: ReadQuizQuestionResponse[];
}

export default function SolveQuiz() {
  const { teamId, quizId } = useParams<{ teamId: string; quizId: string }>();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState<ReadQuizResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<DtoSolveQuizResponse | null>(null);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (!quizId) return;
    const fetchQuiz = async () => {
      try {
        const res = await api.quizzesIdTestGet(quizId);
        setQuiz(res.data as unknown as ReadQuizResponse);
      } catch (err) {
        toast.error("Failed to load quiz");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [quizId]);

  const questions = quiz?.quiz_questions || [];
  const currentQuestion = questions[currentIndex];

  const handleOptionSelect = (option: string) => {
    if (!currentQuestion?.quiz_question_id) return;
    const qid = currentQuestion.quiz_question_id;
    // Single selection - replace the answer array with just the selected option
    setAnswers({ ...answers, [qid]: [option] });
    console.log(`Selected option for ${qid}:`, [option]);
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const handleFinish = async () => {
    if (!quizId) return;
    console.log("Current answers state:", answers);
    console.log("Questions:", questions);
    setSubmitting(true);
    try {
      const attempts: DtoSolveQuestionRequest[] = questions.map(q => {
        const questionId = q.quiz_question_id || "";
        const userAnswer = answers[questionId] || [];
        console.log(`Question ${questionId} answer:`, userAnswer);
        return {
          quiz_question_id: questionId,
          answer: userAnswer
        };
      });
      console.log("Attempts being sent:", attempts);
      const payload: DtoSolveQuizRequest = {
        quiz_id: quizId,
        attempts
      };
      console.log("Full payload:", JSON.stringify(payload, null, 2));
      const res = await api.quizzesIdTestPost(quizId, payload);
      const quizResult: DtoSolveQuizResponse = res.data;
      console.log("Quiz result:", quizResult);
      setResult(quizResult);
      setShowResults(true);
    } catch (err) {
      toast.error("Failed to submit quiz");
      console.error("Submission error:", err);
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: unknown } };
        console.error("Error response:", axiosErr.response?.data);
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Skeleton className="w-96 h-64" />
      </div>
    );
  }

  if (!quiz || questions.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-muted-foreground">No questions found.</p>
      </div>
    );
  }

  // Show results screen
  if (showResults && result) {
    const correctCount = result.questions_answers?.filter(q => q.is_correct).length || 0;
    const totalQuestions = questions.length;
    const percentage = Math.round((correctCount / totalQuestions) * 100);

    return (
      <div className="p-6 max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Quiz Results</h2>
          <Button onClick={() => navigate(`/teams/${teamId}`)}>Back to Team</Button>
        </div>

        <Card className="p-6">
          <div className="text-center space-y-2">
            <h3 className="text-4xl font-bold">{percentage}%</h3>
            <p className="text-lg text-muted-foreground">
              {correctCount} out of {totalQuestions} correct
            </p>
            {percentage === 100 && <p className="text-green-500 font-semibold">Perfect Score! 🎉</p>}
            {percentage >= 80 && percentage < 100 && <p className="text-blue-500 font-semibold">Great Job! 👏</p>}
            {percentage >= 60 && percentage < 80 && <p className="text-yellow-500 font-semibold">Good Effort! 👍</p>}
            {percentage < 60 && <p className="text-orange-500 font-semibold">Keep Practicing! 💪</p>}
          </div>
        </Card>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Review Answers</h3>
          {questions.map((q, idx) => {
            const questionResult = result.questions_answers?.find(
              r => r.quiz_question_id === q.quiz_question_id
            );
            const isCorrect = questionResult?.is_correct || false;
            const correctAnswers = questionResult?.correct_fields || [];
            const userAnswers = answers[q.quiz_question_id || ""] || [];

            return (
              <Card key={q.quiz_question_id} className="p-4">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <h4 className="font-medium">Question {idx + 1}: {q.question}</h4>
                    {isCorrect ? (
                      <span className="text-green-500 font-semibold">✓ Correct</span>
                    ) : (
                      <span className="text-red-500 font-semibold">✗ Incorrect</span>
                    )}
                  </div>
                  <div className="space-y-2">
                    {q.quiz_options?.map((option: string) => {
                      const isUserAnswer = userAnswers.includes(option);
                      const isCorrectAnswer = correctAnswers.includes(option);
                      return (
                        <div
                          key={option}
                          className={`p-3 rounded-lg border-2 ${
                            isCorrectAnswer
                              ? "border-green-500 bg-green-50 dark:bg-green-950"
                              : isUserAnswer
                              ? "border-red-500 bg-red-50 dark:bg-red-950"
                              : "border-border"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            {isCorrectAnswer && <span className="text-green-500">✓</span>}
                            {isUserAnswer && !isCorrectAnswer && <span className="text-red-500">✗</span>}
                            <span>{option}</span>
                            {isCorrectAnswer && <span className="text-xs text-muted-foreground ml-auto">(Correct)</span>}
                            {isUserAnswer && !isCorrectAnswer && <span className="text-xs text-muted-foreground ml-auto">(Your answer)</span>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen relative p-6">
      {/* Exit Button */}
      <Button
        variant="outline"
        className="absolute top-6 left-6"
        onClick={() => navigate(`/teams/${teamId}`)}
      >
        Exit Quiz
      </Button>

      {/* Left Arrow */}
      <button
        onClick={handlePrev}
        disabled={currentIndex === 0}
        className="absolute left-8 p-4 rounded-full bg-card shadow-lg hover:shadow-xl transition disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>

      {/* Center Card */}
      <Card className="w-full max-w-2xl p-8 shadow-2xl">
        <div className="mb-4 text-sm text-muted-foreground">
          Question {currentIndex + 1} / {questions.length}
        </div>
        <h2 className="text-2xl font-semibold mb-6">{currentQuestion?.question || "No question text"}</h2>
        <div className="space-y-3">
          {currentQuestion?.quiz_options?.map((option: string, i: number) => {
            const qid = currentQuestion.quiz_question_id || "";
            const selected = answers[qid]?.includes(option) || false;
            console.log(`Rendering option "${option}" for question ${qid}, selected:`, selected);
            return (
              <button
                key={i}
                onClick={() => {
                  console.log(`Clicked option "${option}" for question ${qid}`);
                  handleOptionSelect(option);
                }}
                className={`w-full text-left p-4 rounded-lg border-2 transition ${
                  selected
                    ? "border-primary bg-primary/10"
                    : "border-border bg-card hover:border-primary/50"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
        {currentIndex === questions.length - 1 && (
          <Button
            className="w-full mt-6"
            onClick={handleFinish}
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Finish Quiz"}
          </Button>
        )}
      </Card>

      {/* Right Arrow */}
      <button
        onClick={handleNext}
        disabled={currentIndex === questions.length - 1}
        className="absolute right-8 p-4 rounded-full bg-card shadow-lg hover:shadow-xl transition disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <ChevronRight className="w-8 h-8" />
      </button>
    </div>
  );
}
