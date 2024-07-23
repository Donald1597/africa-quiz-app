<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-gray-900 dark:to-gray-800"
  >
    <QuizStartScreen
      v-if="!quizStarted && !showScore"
      :selectedCategory="selectedCategory"
      :selectedDifficulty="selectedDifficulty"
      @start-quiz="startQuiz"
    />

    <QuizQuestions
      v-if="quizStarted && currentQuestionIndex < questions.length"
      :currentQuestion="currentQuestion"
      :timer="timer"
      :progress="progress"
      :showNextButton="showNextButton"
      :selectedOption="selectedOption"
      :autoSelectedOption="autoSelectedOption"
      @check-answer="checkAnswer"
      @next-question="nextQuestion"
    />

    <QuizCompleted
      v-if="showScore"
      :score="score"
      :totalQuestions="questions.length"
      :detailedResults="detailedResults"
      @restart-quiz="restartQuiz"
    />
  </div>
</template>

<script setup>
import QuizStartScreen from "@/components/QuizStartScreen.vue";
import QuizQuestions from "@/components/QuizQuestions.vue";
import QuizCompleted from "@/components/QuizCompleted.vue";
import { useQuiz } from "@/composables/useQuiz";

const {
  questions,
  currentQuestionIndex,
  score,
  showNextButton,
  selectedOption,
  timer,
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
  restartQuiz,
  autoSelectedOption,
} = useQuiz();
</script>
