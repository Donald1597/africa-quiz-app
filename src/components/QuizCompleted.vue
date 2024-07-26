<template>
  <div
    class="w-full max-w-2xl text-center p-8 bg-white dark:bg-gray-900 rounded-lg shadow-2xl"
  >
    <h2 class="text-5xl font-extrabold text-gray-900 dark:text-gray-100 mb-6">
      Quiz Completed
    </h2>

    <div
      v-if="score === totalQuestions"
      class="text-2xl text-teal-600 dark:text-teal-400 mb-4"
    >
      Congratulations! You got a perfect score!
    </div>
    <div
      v-else-if="score / totalQuestions > 0.8"
      class="text-2xl text-teal-600 dark:text-teal-400 mb-4"
    >
      Great job! You scored over 80%!
    </div>

    <h3 class="text-3xl text-gray-800 dark:text-gray-200 mb-8">
      Your score is
      <span class="font-bold text-teal-600 dark:text-teal-400">{{
        score
      }}</span>
      out of {{ totalQuestions }}
    </h3>

    <!-- Progress Bar -->
    <div class="mt-8">
      <h3 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Your Performance:
      </h3>
      <div class="relative pt-1">
        <div class="flex mb-2 items-center justify-between">
          <div
            class="text-xs font-semibold inline-block py-1 px-2 rounded-full text-teal-600 bg-teal-200"
          >
            {{ score }} / {{ totalQuestions }}
          </div>
        </div>
        <div class="flex h-2 mb-4 overflow-hidden text-xs bg-teal-200 rounded">
          <div
            class="flex flex-col text-center whitespace-nowrap text-white shadow-none transition-all duration-500 ease-in-out"
            :style="{ width: (score / totalQuestions) * 100 + '%' }"
            :class="{
              'bg-teal-600': score / totalQuestions <= 0.8,
              'bg-green-600': score / totalQuestions > 0.8,
            }"
          ></div>
        </div>
      </div>
    </div>

    <!-- Detailed Results -->
    <div v-if="detailedResults.length" class="mt-12">
      <h3 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
        Details:
      </h3>
      <div class="grid grid-cols-1 gap-6">
        <div
          v-for="(result, index) in detailedResults"
          :key="index"
          class="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md"
        >
          <div class="font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Question {{ index + 1 }}:
          </div>
          <div class="text-gray-800 dark:text-gray-200 mb-2">
            {{ result.question }}
          </div>
          <div class="text-gray-900 dark:text-gray-100 mb-2">
            Your Answer:
            <span
              :class="{
                'text-green-600 dark:text-green-400':
                  result.correct && result.userAnswer !== 'No Answer',
                'text-red-600 dark:text-red-400':
                  !result.correct && result.userAnswer !== 'No Answer',
                'text-gray-400 dark:text-gray-600':
                  result.userAnswer === 'No Answer',
              }"
            >
              {{ result.userAnswer === null ? "No Answer" : result.userAnswer }}
            </span>
          </div>
          <div class="text-gray-600 dark:text-gray-400 mb-2">
            Correct Answer:
            <span class="font-bold text-teal-600 dark:text-teal-400">
              {{ result.correctAnswer }}
            </span>
          </div>
          <div class="text-gray-700 dark:text-gray-300">
            <span
              :class="{
                'text-green-600 dark:text-green-400': result.correct,
                'text-red-600 dark:text-red-400': !result.correct,
                'text-gray-400 dark:text-gray-600':
                  result.userAnswer === 'No Answer',
              }"
            >
              {{
                result.correct === null
                  ? "No Answer"
                  : result.correct
                  ? "Correct"
                  : "Incorrect"
              }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <button
      @click="reloadPage"
      aria-label="Restart Quiz"
      class="w-full bg-teal-600 text-white py-4 rounded-lg shadow-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 transition-transform transform hover:scale-105 mt-8 text-xl"
    >
      Restart Quiz
    </button>
  </div>
</template>

<script setup>
defineProps({
  score: {
    type: Number,
    default: 0,
  },
  totalQuestions: {
    type: Number,
    default: 0,
  },
  detailedResults: {
    type: Array,
    default: () => [],
  },
});

const reloadPage = () => {
  window.location.reload();
};
</script>
