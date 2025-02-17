<template>
  <slot v-if="isAuthenticated" />
  <div v-else>
    <p>Redirecting to login...</p>
  </div>
</template>

<script setup>
const isAuthenticated = ref(true) // TODO: Implement proper authentication check
const route = useRoute()

watch(() => route.path, () => {
  if (!isAuthenticated.value && route.path !== '/login') {
    navigateTo('/login')
  }
})
</script>