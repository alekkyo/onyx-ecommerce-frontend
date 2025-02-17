<template>
  <div class="p-4">
    <div class="mb-6">
      <h1 class="text-2xl font-bold mb-4">Orders</h1>
      <div class="flex gap-4 mb-4">
        <select v-model="store.statusFilter" class="input-field">
          <option value="ALL">All Orders</option>
          <option value="NEW">New Orders</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="SHIPPED">Shipped</option>
          <option value="COMPLETED">Completed</option>
        </select>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Items
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="order in store.filteredOrders" :key="order.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">#{{ order.id }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ order.customerName }}</div>
                <div class="text-sm text-gray-500">{{ order.customerEmail }}</div>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm text-gray-900">
                  <div v-for="item in order.items" :key="item.productId" class="mb-1">
                    {{ item.quantity }}x {{ item.name }}
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">${{ order.total.toFixed(2) }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 py-1 text-xs rounded-full" 
                      :class="{
                        'bg-blue-100 text-blue-800': order.status === 'NEW',
                        'bg-yellow-100 text-yellow-800': order.status === 'IN_PROGRESS',
                        'bg-purple-100 text-purple-800': order.status === 'SHIPPED',
                        'bg-green-100 text-green-800': order.status === 'COMPLETED'
                      }">
                  {{ order.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">
                  {{ new Date(order.createdAt).toLocaleDateString() }}
                </div>
                <div class="text-xs text-gray-500">
                  {{ new Date(order.createdAt).toLocaleTimeString() }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <select 
                  v-if="order.status !== 'COMPLETED'"
                  :value="order.status"
                  @change="store.updateOrderStatus(order.id, $event.target.value)"
                  class="text-sm border border-gray-300 rounded-md p-1"
                >
                  <option value="NEW">New</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="SHIPPED">Shipped</option>
                  <option value="COMPLETED">Completed</option>
                </select>
                <span v-else class="text-sm text-gray-500">No actions available</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useOrdersStore } from '~/composables/useOrders'

const store = useOrdersStore()
</script>