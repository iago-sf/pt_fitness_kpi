<script setup>
import { computed, ref, watch } from "vue"

const props = defineProps(["show", "title", "actionText"])
const emit = defineEmits(["close", "action"])

const modalState = computed({
  get: () => props.show,
  set: (value) => {
    emit("update:show", value)
  },
})
</script>

<template>
  <div :class="modalState ? 'block' : 'hidden'">
    <div class="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div class="fixed inset-0 flex justify-center items-center">
        <div class="bg-primer p-4 w-[90%] md:w-1/2 rounded-md">
          <div class="flex justify-between">
            <h1 class="text-secun text-3xl font-bold">
              {{ props.title }}
            </h1>
            <button
              @click="emit('close')"
              class="text-secun font-semibold py-2 px-4 border border-secun hover:bg-secun hover:text-primer rounded shadow transition-colors"
            >
              X
            </button>
          </div>

          <div class="my-5">
            <slot />
          </div>

          <div class="flex justify-center">
            <button
              @click="emit('action')"
              class="text-secun font-semibold py-2 px-4 border border-secun hover:bg-secun hover:text-primer rounded shadow transition-colors"
            >
              {{ props.actionText }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
