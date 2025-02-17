import { ref, computed, onUnmounted } from "vue";
import { africaQuiz } from "@/quizData/africaQuiz.js";
import { beninQuiz } from "@/quizData/beninQuiz.js";
import { vodounQuiz } from "@/quizData/vodounQuiz.js";

export function useQuiz() {
  const quizzes = {
    africa: africaQuiz,
    benin: beninQuiz,
    vodoun: vodounQuiz,
  };

  const questions = ref([]);
  const currentQuestionIndex = ref(0);
  const score = ref(0);
  const showNextButton = ref(false);
  const selectedOption = ref(null);
  const autoSelectedOption = ref(false);
  const timer = useTimer(25, handleTimerExpire);
  const detailedResults = ref([]);
  const quizStarted = ref(false);
  const selectedCategory = ref("");
  const selectedDifficulty = ref("");
  const showScore = ref(false);

  const currentQuestion = computed(
    () => questions.value[currentQuestionIndex.value] || null
  );

  const progress = computed(
    () => (currentQuestionIndex.value / questions.value.length) * 100
  );

  function startQuiz(category, difficulty) {
    selectedCategory.value = category;
    selectedDifficulty.value = difficulty;
    showScore.value = false;

    const selectedQuiz = quizzes[selectedCategory.value];
    const filteredQuestions = selectedQuiz
      .filter((q) => q.difficulty === selectedDifficulty.value)
      .map((q) => ({
        question: q.question,
        options: shuffleArray(q.options),
        correct_answer: q.correct_answer,
      }));

    // Shuffle the filtered questions
    shuffleArray(filteredQuestions);

    // Take the first 10 questions (or fewer if there aren't 10)
    questions.value = filteredQuestions.slice(0, 10);

    currentQuestionIndex.value = 0;
    score.value = 0;
    detailedResults.value = [];
    timer.reset();
    quizStarted.value = true;
    selectedOption.value = null;
    autoSelectedOption.value = false;
  }

  function handleTimerExpire() {
    if (!showNextButton.value && selectedOption.value === null) {
      const correctAnswer = currentQuestion.value.correct_answer;
      checkAnswer(correctAnswer, true); // Auto-select correct answer and mark as not selected by user
    }
  }

  function checkAnswer(option, autoSelected = false) {
    selectedOption.value = option;
    const correctAnswer = currentQuestion.value.correct_answer;
    const isCorrect = option === correctAnswer;

    if (!autoSelected) {
      // Award points only if the user selected the answer
      if (isCorrect) score.value++;
    }

    detailedResults.value.push({
      question: currentQuestion.value.question,
      userAnswer: autoSelected ? "No Answer" : option,
      correctAnswer,
      correct: autoSelected ? null : isCorrect,
    });

    showNextButton.value = true;
    timer.stop();

    autoSelectedOption.value = autoSelected;
  }

  function nextQuestion() {
    currentQuestionIndex.value++;
    if (currentQuestionIndex.value >= questions.value.length) {
      quizStarted.value = false;
      showScore.value = true;
    } else {
      showNextButton.value = false;
      selectedOption.value = null;
      autoSelectedOption.value = false;
      timer.reset();
    }
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  onUnmounted(() => timer.stop());

  return {
    questions,
    currentQuestionIndex,
    score,
    showNextButton,
    selectedOption,
    autoSelectedOption,
    timer: timer.value,
    detailedResults,
    quizStarted,
    selectedCategory,
    selectedDifficulty,
    showScore,
    currentQuestion,
    progress,
    startQuiz,
    nextQuestion,
    checkAnswer,
  };
}

// Timer Composable
function useTimer(initialTime, onExpire) {
  const timer = ref(initialTime);
  const timerInterval = ref(null);

  const start = () => {
    timerInterval.value = setInterval(() => {
      if (timer.value > 0) {
        timer.value--;
      } else {
        clearInterval(timerInterval.value);
        if (onExpire) onExpire();
      }
    }, 1000);
  };

  const stop = () => clearInterval(timerInterval.value);

  const reset = () => {
    timer.value = initialTime;
    stop();
    start();
  };

  const pause = () => clearInterval(timerInterval.value);

  return { value: timer, start, stop, reset, pause };
}
