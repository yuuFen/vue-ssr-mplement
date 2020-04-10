<template>
<div>
  <h2>Index Page</h2>
  <p>num: {{ $store.state.cnt }}</p>
  <button @click="$store.commit('add')">add</button>
</div>
</template>

<script>
export default {}
</script>

<style></style>
