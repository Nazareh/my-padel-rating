<template>
  <input
    v-if="inputType === 'text'"
    :type="inputType"
    :placeholder="placeholder"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />

  <div v-if="inputType === 'number'" class="form-floating mb-3">
    <input
      :type="inputType"
      class=""
      min="0"
      step="1"
      :placeholder="placeholder"
      pattern="\d*"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>

  <div v-if="inputType === 'time'" class="form-floating mb-3">
    <input
      :type="inputType"
      step="900"
      min="07:00"
      max="23:00"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <label for="floatingInput" class="text-gray-700">{{ placeholder }}</label>
  </div>

  <div
    v-if="inputType === 'date'"
    class="datepicker form-floating relative mb-3"
  >
    <input
      type="date"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <label for="floatingInput" class="text-gray-700">{{ placeholder }}</label>
  </div>
</template>

<script>
export default {
  name: "BaseInput",
  props: ["placeholder", "inputType", "modelValue"],
};
</script>

<style scoped>
input {
  @apply m-0 block w-full rounded border border-solid border-gray-300 bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none;
}
</style>
