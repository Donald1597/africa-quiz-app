<template>
  <div
    class="w-full max-w-2xl mx-auto bg-gradient-to-r from-indigo-100 to-indigo-200 p-12 rounded-lg shadow-2xl"
  >
    <h2 class="text-4xl font-extrabold mb-8 text-gray-800 dark:text-gray-200">
      Welcome to the Quiz
    </h2>

    <!-- Instructions or Tips -->
    <div class="mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h3 class="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
        How to Start
      </h3>
      <p class="text-lg text-gray-700 dark:text-gray-300">
        <strong>Welcome!</strong> To get started, select a category and
        difficulty level that interests you. <br /><br />
        Once you begin the quiz, you'll be presented with questions tailored to
        your choices. Best of luck and enjoy!
      </p>
    </div>

    <!-- Category Selection -->
    <div class="mb-6">
      <label
        for="category"
        class="block text-gray-700 dark:text-gray-300 text-lg mb-2"
      >
        <span class="font-semibold">Category</span>
      </label>
      <select
        v-model="localSelectedCategory"
        id="category"
        class="block w-full border-gray-300 dark:border-gray-700 rounded-lg shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-lg py-2 px-4 hover:border-indigo-600 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 cursor-pointer appearance-none transition-transform transform hover:scale-105"
      >
        <option value="">Select a category</option>
        <option value="africa">Africa</option>
        <option value="benin">Benin</option>
        <option value="vodoun">Vodoun</option>
      </select>
    </div>

    <!-- Difficulty Selection -->
    <div class="mb-6">
      <label
        for="difficulty"
        class="block text-gray-700 dark:text-gray-300 text-lg mb-2"
      >
        <span class="font-semibold">Difficulty</span>
      </label>
      <select
        v-model="localSelectedDifficulty"
        id="difficulty"
        class="block w-full border-gray-300 dark:border-gray-700 rounded-lg shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-lg py-2 px-4 hover:border-indigo-600 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 cursor-pointer appearance-none transition-transform transform hover:scale-105"
      >
        <option value="">Select difficulty</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
    </div>

    <!-- Start Quiz Button -->
    <button
      :disabled="!localSelectedCategory || !localSelectedDifficulty"
      @click="startQuiz"
      class="w-full bg-indigo-600 text-white py-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:bg-indigo-700 disabled:opacity-50 disabled:bg-gray-400 text-xl flex items-center justify-center"
    >
      <span class="mr-2">🎉</span> Start Quiz
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  selectedCategory: {
    type: String,
    default: "",
  },
  selectedDifficulty: {
    type: String,
    default: "",
  },
});

const localSelectedCategory = ref(props.selectedCategory);
const localSelectedDifficulty = ref(props.selectedDifficulty);

const emit = defineEmits(["start-quiz"]);

const startQuiz = () => {
  emit(
    "start-quiz",
    localSelectedCategory.value,
    localSelectedDifficulty.value
  );
};
</script>
