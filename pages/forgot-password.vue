<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Reset your password</h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleResetPassword">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
          <input id="email" v-model="email" type="email" required class="input-field" />
        </div>

        <div class="flex items-center justify-between">
          <NuxtLink to="/login" class="text-sm text-blue-600 hover:text-blue-500">
            Back to login
          </NuxtLink>
        </div>

        <div>
          <button type="submit" class="w-full btn-primary">
            Send reset link
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
const email = ref('')

const handleResetPassword = () => {
  // TODO: Implement password reset logic
  navigateTo('/login')
}
</script>