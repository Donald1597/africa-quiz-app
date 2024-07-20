<template>
  <div
    class="w-full max-w-2xl bg-white dark:bg-gray-900 p-12 rounded-lg shadow-2xl"
  >
    <div v-if="currentQuestion" class="flex flex-col items-center">
      <div class="w-full mb-8">
        <div class="flex justify-between items-center mb-4">
          <span class="text-xl font-medium text-red-600 dark:text-red-400">
            Time Left: {{ timer }}s
          </span>
        </div>
        <div
          class="w-full bg-teal-600 h-3 rounded-full"
          :style="{ width: progress + '%' }"
        ></div>
      </div>
      <div
        class="text-2xl font-semibold mb-8 text-gray-900 dark:text-gray-100 text-center"
      >
        {{ currentQuestion.question }}
      </div>
      <div class="w-full space-y-4">
        <button
          v-for="(option, index) in currentQuestion.options"
          :key="index"
          @click.prevent="$emit('check-answer', option)"
          :class="{
            'bg-green-600 text-white':
              showNextButton && option === currentQuestion.correct_answer,
            'bg-red-600 text-white':
              showNextButton &&
              option !== currentQuestion.correct_answer &&
              option === selectedOption,
            'bg-gray-200 text-gray-800': !showNextButton,
          }"
          class="block w-full text-left py-4 px-6 rounded-lg shadow-lg hover:bg-opacity-80 transition-transform transform hover:scale-105 text-lg"
          :disabled="showNextButton"
        >
          {{ option }}
        </button>
      </div>
      <button
        v-if="showNextButton"
        @click="$emit('next-question')"
        class="w-full bg-teal-600 text-white py-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 mt-8 text-xl"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  currentQuestion: {
    type: Object,
    default: () => ({}),
  },
  timer: {
    type: Number,
    default: 0,
  },
  progress: {
    type: Number,
    default: 0,
  },
  showNextButton: {
    type: Boolean,
    default: false,
  },
  selectedOption: {
    type: [String, null],
    default: null,
  },
});

const emit = defineEmits(["check-answer", "next-question"]);
</script>
