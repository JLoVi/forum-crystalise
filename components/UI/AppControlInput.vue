<template>
  <div class="input-control">
    <label class="label"><slot /></label>
    <!-- :id="`${inpType}-${Math.random()}`" -->
    <input
      v-if="controlType === 'input' && inpType === 'text'"
      :id="`${fieldType}`"
      v-bind="$attrs"
      :name="`${fieldType}`"
      autocomplete="on"
      :value="value"
      :type="inpType"
      @input="$emit('input', $event.target.value)"
    >
    <input
      v-if="controlType === 'input' && inpType === 'number'"
      v-bind="$attrs"
      :value="value"
      :type="inpType"
      :min="1970"
      :max="2100"
      @input="$emit('input', $event.target.value)"
    >
    <textarea
      v-if="controlType === 'textarea'"
      v-bind="$attrs"
      rows="10"
      :value="value"
      :type="inpType"
      @input="$emit('input', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  name: 'AppControlInput',
  props: {
    controlType: {
      type: String,
      default: 'input'
    },
    value: {
      type: String,
      default: ''
    },
    inpType: {
      type: String,
      default: 'text'
    },
    fieldType: {
      type: String,
      default: `${Math.random()}`
    }
  }
}
</script>

<style scoped>
.input-control {
  margin: 10px 0;
}

.input-control label {
  display: block;
  font-weight: bold;
}

.input-control input,
.input-control textarea {
  display: block;
  width: 100%;
  box-sizing: border-box;
  font: inherit;
  border: 1px solid #ccc;
  padding: 5px;
}

.input-control input:focus,
.input-control textarea:focus {
  background-color: #eee;
  outline: none;
}

.label {
  text-transform: capitalize;
}

textarea:invalid,
input:invalid {
  border: 2px dashed red;
}

textarea:valid,
input:valid {
  border: 2px solid black;
}

</style>
