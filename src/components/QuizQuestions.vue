<template>
  <div
    class="w-full max-w-2xl bg-white dark:bg-gray-900 p-12 rounded-lg shadow-2xl"
  >
    <div v-if="currentQuestion" class="flex flex-col items-center">
      <div class="w-full max-w-xl mx-auto">
        <!-- Timer Progress Bar -->
        <div class="mb-4">
          <div class="text-xl font-medium text-red-600 dark:text-red-400 mb-2">
            Time Left: {{ timer }}s
          </div>
          <div class="relative h-2 bg-red-200 rounded">
            <div
              class="absolute top-0 left-0 h-full bg-red-500 rounded"
              :style="{ width: (timer / 25) * 100 + '%' }"
            ></div>
          </div>
        </div>

        <!-- Quiz Progress Bar -->
        <div class="mb-8">
          <div
            class="text-xl font-medium text-teal-600 dark:text-teal-400 mb-2"
          >
            Progress: {{ progress }}%
          </div>
          <div class="w-full bg-teal-400 h-3 rounded-full">
            <div
              class="h-full bg-teal-600 rounded-full"
              :style="{ width: progress + '%' }"
            ></div>
          </div>
        </div>
      </div>

      <!-- Question Text -->
      <div
        class="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100 text-center"
      >
        {{ currentQuestion.question }}
      </div>
      <!-- Answer Options -->
      <div class="w-full space-y-4">
        <button
          v-for="(option, index) in currentQuestion.options"
          :key="index"
          @click.prevent="$emit('check-answer', option)"
          :aria-label="'Option ' + option"
          :class="{
            'bg-green-500 text-white':
              showNextButton && option === currentQuestion.correct_answer,
            'bg-red-500 text-white':
              showNextButton &&
              option !== currentQuestion.correct_answer &&
              option === selectedOption,
            'bg-orange-500 text-white':
              autoSelectedOption && option === selectedOption,
            'bg-gray-200 text-gray-800':
              !showNextButton && option !== selectedOption,
          }"
          class="block w-full text-left py-4 px-6 rounded-lg shadow-lg hover:bg-opacity-80 transition-transform transform hover:scale-105 text-lg"
          :disabled="showNextButton"
        >
          {{ option }}
        </button>
      </div>
      <!-- Next Question Button -->
      <button
        v-if="showNextButton"
        @click="$emit('next-question')"
        class="w-full bg-teal-500 text-white py-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 mt-8 text-xl"
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
  autoSelectedOption: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["check-answer", "next-question"]);
</script>
