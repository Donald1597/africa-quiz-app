<template>
  <div
    class="w-full max-w-2xl bg-white dark:bg-gray-900 p-12 rounded-lg shadow-2xl"
  >
    <h2 class="text-5xl font-extrabold mb-8 text-gray-900 dark:text-gray-100">
      Welcome to the Quiz
    </h2>
    <div class="mb-8">
      <select
        v-model="localSelectedCategory"
        id="category"
        class="block w-full border-gray-300 dark:border-gray-700 rounded-lg shadow-sm bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-lg py-2 px-3 hover:border-teal-600 focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50 cursor-pointer appearance-none"
      >
        <option value="">Select a category</option>
        <option value="africa">Africa</option>
        <option value="benin">Benin</option>
        <option value="vodoun">Vodoun</option>
      </select>
    </div>

    <div class="mb-8">
      <select
        v-model="localSelectedDifficulty"
        id="difficulty"
        class="block w-full border-gray-300 dark:border-gray-700 rounded-lg shadow-sm bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-lg py-2 px-3 hover:border-teal-600 focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50 cursor-pointer appearance-none"
      >
        <option value="">Select difficulty</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
    </div>
    <button
      :disabled="!localSelectedCategory || !localSelectedDifficulty"
      @click="startQuiz"
      class="w-full bg-teal-600 text-white py-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 disabled:opacity-50 disabled:bg-gray-400 text-xl"
    >
      Start Quiz
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
