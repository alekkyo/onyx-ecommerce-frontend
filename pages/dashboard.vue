<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-6">Dashboard</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="card p-6">
        <div class="flex items-center justify-between mb-2">
          <h2 class="text-[var(--text-secondary)]">Total Orders</h2>
          <ShoppingCartIcon class="w-6 h-6 text-[var(--primary)]" />
        </div>
        <p class="text-3xl font-bold text-[var(--text)]">123</p>
        <p class="text-sm text-[var(--text-secondary)] mt-2">+12% from last month</p>
      </div>
      
      <div class="card p-6">
        <div class="flex items-center justify-between mb-2">
          <h2 class="text-[var(--text-secondary)]">Total Customers</h2>
          <UsersIcon class="w-6 h-6 text-[var(--secondary)]" />
        </div>
        <p class="text-3xl font-bold text-[var(--text)]">456</p>
        <p class="text-sm text-[var(--text-secondary)] mt-2">+5% from last month</p>
      </div>
      
      <div class="card p-6">
        <div class="flex items-center justify-between mb-2">
          <h2 class="text-[var(--text-secondary)]">Total Products</h2>
          <CubeIcon class="w-6 h-6 text-[var(--accent)]" />
        </div>
        <p class="text-3xl font-bold text-[var(--text)]">789</p>
        <p class="text-sm text-[var(--text-secondary)] mt-2">+8% from last month</p>
      </div>
      
      <div class="card p-6">
        <div class="flex items-center justify-between mb-2">
          <h2 class="text-[var(--text-secondary)]">Total Revenue</h2>
          <CurrencyDollarIcon class="w-6 h-6 text-[var(--success)]" />
        </div>
        <p class="text-3xl font-bold text-[var(--text)]">$10,234</p>
        <p class="text-sm text-[var(--text-secondary)] mt-2">+15% from last month</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ShoppingCartIcon, UsersIcon, CubeIcon, CurrencyDollarIcon } from '@heroicons/vue/24/outline'
</script>