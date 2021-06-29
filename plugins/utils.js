// import Vue from 'vue'

export function isUndefined(value) {
  // Obtain `undefined` value that's
  // guaranteed to not have been re-assigned
  const undef = void (0)
  return value === undef
}

export function hasValue(value) {
  // Obtain `undefined` value that's
  // guaranteed to not have been re-assigned
  const undef = void (0)
  return value !== undef && value !== null && value !== ''
}

export function capitalize(s) {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export function mod(n, m) {
  const remain = n % m
  return Math.floor(remain >= 0 ? remain : remain + m)
};
