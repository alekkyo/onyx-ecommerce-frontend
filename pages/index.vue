<template>
  <div>
    <ClientOnly>
      <span>Redirecting...</span>
    </ClientOnly>
  </div>
</template>

<script setup>
onMounted(() => {
  navigateTo('/login')
})
</script>