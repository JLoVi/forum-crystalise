<template>
  <button :class="`button ${btnStyle} ${height} ${width}`" v-bind="$attrs" v-on="$listeners">
    <slot class="text" />
  </button>
</template>

<script>
export default {
  name: 'AppButton',
  props: {
    btnStyle: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.button {
  font: inherit;
  background-color: black;
  color: white;
  padding: 5px;
  cursor: pointer;
  border: 1px solid black;
}

.button:hover,
.button:active {
  background-color: rgb(51, 51, 51);
  border: 1px solid black;
}

.inverted {
  background-color: white;
  color: black;
  border: 1px solid transparent;
}

.inverted:hover,
.inverted:active {
  color: #ccc;
  background-color: white;
  border: 1px solid transparent;
}

.cancel {
  background-color: red;
  color: white;
  border: 1px solid transparent;
}

.cancel:hover,
.cancel:active {
  background-color: salmon;
  border: 1px solid transparent;
  color: white;
}

.add {
  background-color: green;
  color: white;
  border: 1px solid transparent;
}

.add:hover,
.add:active {
  background-color: lightgreen;
  border: 1px solid transparent;
  color: white;
}
.delete {
  padding: 3px;
  background-color: red;
  color: white;
  border: 1px solid transparent;
}

.delete:hover,
.delete:active {
  background-color: salmon;
  border: 1px solid transparent;
  color: white;
}

.navigate {
  padding: 3px;
  background-color: #b4894b;
  color: white;
  border: 1px solid transparent;
}

.navigate:hover,
.navigate:active {
  background-color: #b4894b;
  border: 1px solid transparent;
  color: white;
}

.low {
  height: 4vh;
  /* padding: 1vh; */
}
.mid {
  height: 6vh;
  /* padding: 1vh; */
}
.high {
  height: 8vh;
}
.xhigh {
  height: 10vh;
}

.lapi {
  padding: 3px;
  align-self: center;
  width: 100%;
  /* background-color: #b4894b; */
  background-color: #e8e8e8;
  border: 1px solid transparent;
  transition: 0.4s ease-in-out;
  color: black;
}

.lapi:hover,
.lapi:active {
  background-color: #b4894b;
  border: 1px solid transparent;
  /* color: white; */
  color: #e8e8e8;
}

.lapi-inv {
  padding: 3px;
  align-self: center;
  width: 100%;
  /* background-color: #b4894b; */
  background: transparent;
  border: 1px solid transparent;
  transition: 0.4s ease-in-out;
  color: black;
}

.lapi:hover,
.lapi:active,
.lapi-inv:hover {
  background-color: #b4894b;
  border: 1px solid transparent;
  /* color: white; */
  color: #e8e8e8;
}

.text {
    /* font-size: 0.9rem; */
    font-size: 18px;
    text-align: center;
    /* font-family: 'SegoeUILight', sans-serif; */
    /* font-family: 'din-2014-narrow', sans-serif; */
    line-height: 2;
}

.narrow {
  width: auto;
  min-width: 10%;
  /* padding: 1vh; */
}
.mid-wide {
  width: 20%;
  /* padding: 1vh; */
}
.wide {
  width: 100%;
}

</style>
