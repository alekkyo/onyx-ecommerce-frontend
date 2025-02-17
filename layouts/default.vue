<template>
  <div>
    <AuthCheck v-if="!isLoginPage">
      <Navigation />
      <main class="p-4 sm:ml-64 mt-16">
        <div class="p-4 rounded-lg">
          <slot />
        </div>
      </main>
    </AuthCheck>
    <slot v-else />
  </div>
</template>

<script setup>
const route = useRoute()
const isLoginPage = computed(() => route.path === '/login' || route.path === '/forgot-password')
</script>