<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Demo Account Credentials
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="rounded-md shadow-sm space-y-4">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
            <input 
              id="email" 
              v-model="email" 
              type="email" 
              required 
              class="input-field" 
            />
          </div>
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <input 
              id="password" 
              v-model="password" 
              type="password" 
              required 
              class="input-field" 
            />
          </div>
        </div>

        <div class="flex items-center justify-between">
          <NuxtLink to="/forgot-password" class="text-sm text-blue-600 hover:text-blue-500">
            Forgot your password?
          </NuxtLink>
        </div>

        <div>
          <button type="submit" class="w-full btn-primary">
            Sign in
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
const email = ref('admin@example.com')
const password = ref('admin123')

const handleLogin = () => {
  // Mock login validation
  if (email.value === 'admin@example.com' && password.value === 'admin123') {
    navigateTo('/dashboard')
  } else {
    alert('Invalid credentials. Please use the demo account.')
  }
}
</script>