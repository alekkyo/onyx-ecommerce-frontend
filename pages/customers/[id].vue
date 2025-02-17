<template>
  <div class="p-4">
    <div class="mb-6">
      <div class="flex items-center gap-4 mb-4">
        <button @click="navigateTo('/customers')" class="text-blue-600 hover:text-blue-800">
          <ArrowLeftIcon class="w-5 h-5" />
        </button>
        <h1 class="text-2xl font-bold">Customer Profile</h1>
      </div>
    </div>

    <div v-if="customer" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Customer Information -->
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-semibold mb-4">Customer Information</h2>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-600">Name</label>
            <div class="text-gray-900">{{ customer.name }}</div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600">Email</label>
            <div class="text-gray-900">{{ customer.email }}</div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600">Phone</label>
            <div class="text-gray-900">{{ customer.phone }}</div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600">Address</label>
            <div class="text-gray-900">{{ customer.address }}</div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600">Customer Since</label>
            <div class="text-gray-900">{{ new Date(customer.createdAt).toLocaleDateString() }}</div>
          </div>
        </div>
      </div>

      <!-- Customer Statistics -->
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-semibold mb-4">Statistics</h2>
        <div class="grid grid-cols-2 gap-4">
          <div class="bg-gray-50 p-4 rounded-lg">
            <div class="text-sm text-gray-600">Total Orders</div>
            <div class="text-2xl font-bold text-gray-900">{{ customer.totalOrders }}</div>
          </div>
          <div class="bg-gray-50 p-4 rounded-lg">
            <div class="text-sm text-gray-600">Total Spent</div>
            <div class="text-2xl font-bold text-gray-900">${{ customer.totalSpent.toFixed(2) }}</div>
          </div>
          <div class="bg-gray-50 p-4 rounded-lg">
            <div class="text-sm text-gray-600">Average Order Value</div>
            <div class="text-2xl font-bold text-gray-900">
              ${{ (customer.totalSpent / customer.totalOrders).toFixed(2) }}
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Orders -->
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-semibold mb-4">Recent Orders</h2>
        <div class="space-y-4">
          <div v-for="order in customer.orders" :key="order.id" 
               class="border-b border-gray-200 last:border-b-0 pb-4 last:pb-0">
            <div class="flex justify-between items-center">
              <div>
                <div class="text-sm font-medium text-gray-900">Order #{{ order.id }}</div>
                <div class="text-sm text-gray-500">{{ new Date(order.date).toLocaleDateString() }}</div>
              </div>
              <div>
                <div class="text-sm font-medium text-gray-900">${{ order.total.toFixed(2) }}</div>
                <div class="text-sm">
                  <span :class="{
                    'text-green-600': order.status === 'delivered',
                    'text-blue-600': order.status === 'processing'
                  }">
                    {{ order.status.charAt(0).toUpperCase() + order.status.slice(1) }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ArrowLeftIcon } from '@heroicons/vue/24/outline'

const route = useRoute()
const store = useCustomersStore()

const customer = computed(() => 
  store.customers.find(c => c.id === parseInt(route.params.id))
)

// Redirect if customer not found
watchEffect(() => {
  if (!customer.value) {
    navigateTo('/customers')
  }
})
</script>