<template>
  <div class="w3-container w3-flex w3-content w3-indigo" style="justify-content: space-between">
    <h3 class="xw3-left">
      <RouterLink to="/"> Sight Words</RouterLink>
    </h3>
    <h3 class="xw3-left">
      <RouterLink to="/math"> Math World!</RouterLink>
    </h3>
    <h3 class="xw3-right">
      <RouterLink to="/about">About</RouterLink>
    </h3>
  </div>
</template>
<script>
export default {
  name: 'NavBar'
}
</script>

<style scoped>

a {
  text-decoration: none;
}

a.router-link-active {
  font-weight: bold;
}

</style>