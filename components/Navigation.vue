<template>
  <nav class="fixed top-0 z-50 w-full bg-[var(--card)] border-b border-[var(--border)]">
    <div class="px-4 py-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center justify-start">
          <button @click="sidebarOpen = !sidebarOpen" class="p-2 text-[var(--text-secondary)] rounded-lg hover:bg-[var(--background)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] lg:hidden">
            <Bars3Icon class="w-6 h-6" />
          </button>
          <span class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap ml-2">E-commerce CMS</span>
        </div>
        <div class="flex items-center gap-4">
          <button @click="logout" class="btn-primary">Logout</button>
        </div>
      </div>
    </div>
  </nav>

  <aside :class="[
    'fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform bg-[var(--card)] border-r border-[var(--border)]',
    sidebarOpen ? 'translate-x-0' : '-translate-x-full',
    'lg:translate-x-0'
  ]">
    <div class="h-full px-4 pb-4 overflow-y-auto">
      <ul class="space-y-2">
        <li v-for="(item, index) in menuItems" :key="index">
          <NuxtLink :to="item.path" 
                    class="flex items-center p-2 text-[var(--text)] rounded-lg hover:bg-[var(--background)] transition-colors duration-200"
                    :class="{ 'bg-[var(--background)]': route.path === item.path }">
            <component :is="item.icon" class="w-5 h-5 text-[var(--primary)]" />
            <span class="ml-3">{{ item.name }}</span>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue'
import { HomeIcon, UsersIcon, CubeIcon, ShoppingCartIcon, UserGroupIcon, Bars3Icon } from '@heroicons/vue/24/outline'

const route = useRoute()
const sidebarOpen = ref(false)

const menuItems = [
  { name: 'Dashboard', path: '/dashboard', icon: HomeIcon },
  { name: 'Customers', path: '/customers', icon: UsersIcon },
  { name: 'Products', path: '/products', icon: CubeIcon },
  { name: 'Orders', path: '/orders', icon: ShoppingCartIcon },
  { name: 'Users', path: '/users', icon: UserGroupIcon }
]

const logout = () => {
  navigateTo('/login')
}
</script>