<template>
  <div class="p-4">
    <div class="mb-6">
      <div class="flex items-center gap-4 mb-4">
        <button @click="navigateTo('/products')" class="text-blue-600 hover:text-blue-800">
          <ArrowLeftIcon class="w-5 h-5" />
        </button>
        <h1 class="text-2xl font-bold">Product Details</h1>
      </div>
    </div>

    <div v-if="product" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Product Information -->
      <div class="lg:col-span-2 space-y-6">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex justify-between items-start mb-6">
            <h2 class="text-xl font-semibold">Product Information</h2>
            <div class="flex gap-2">
              <button 
                @click="handleArchive" 
                class="px-4 py-2 text-red-600 bg-red-50 rounded-md hover:bg-red-100"
              >
                {{ product.status === 'active' ? 'Archive' : 'Unarchive' }}
              </button>
              <button @click="isEditing = true" class="btn-primary">
                Edit Product
              </button>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <img :src="product.imageUrl" :alt="product.name" class="w-full h-64 object-cover rounded-lg" />
            </div>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-600">Name</label>
                <div class="text-gray-900">{{ product.name }}</div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-600">Description</label>
                <div class="text-gray-900">{{ product.description }}</div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-600">Category</label>
                <div class="text-gray-900">{{ product.category }}</div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-600">Price</label>
                <div class="text-gray-900">${{ product.price.toFixed(2) }}</div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-600">SKU</label>
                <div class="text-gray-900">{{ product.sku }}</div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-600">Stock</label>
                <div class="text-gray-900">{{ product.stock }}</div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-600">Status</label>
                <div 
                  class="inline-block px-2 py-1 text-xs rounded-full"
                  :class="product.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'"
                >
                  {{ product.status }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Product Statistics -->
      <div class="space-y-6">
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-semibold mb-4">Product Statistics</h2>
          <div class="space-y-4">
            <div class="bg-gray-50 p-4 rounded-lg">
              <div class="text-sm text-gray-600">Total Sales</div>
              <div class="text-2xl font-bold text-gray-900">{{ product.stats.totalSales }}</div>
            </div>
            <div class="bg-gray-50 p-4 rounded-lg">
              <div class="text-sm text-gray-600">Total Revenue</div>
              <div class="text-2xl font-bold text-gray-900">${{ product.stats.totalRevenue.toFixed(2) }}</div>
            </div>
            <div class="bg-gray-50 p-4 rounded-lg">
              <div class="text-sm text-gray-600">View Count</div>
              <div class="text-2xl font-bold text-gray-900">{{ product.stats.viewCount }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Product Modal -->
    <TransitionRoot appear :show="isEditing" as="template">
      <Dialog as="div" @close="isEditing = false" class="relative z-50">
        <TransitionChild
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900 mb-4">
                  Edit Product
                </DialogTitle>

                <form @submit.prevent="handleUpdate" class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700">Name</label>
                    <input v-model="editedProduct.name" type="text" required class="input-field" />
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700">Description</label>
                    <textarea v-model="editedProduct.description" required class="input-field"></textarea>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700">Category</label>
                    <input v-model="editedProduct.category" type="text" required class="input-field" />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700">Price</label>
                    <input v-model.number="editedProduct.price" type="number" step="0.01" required class="input-field" />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700">SKU</label>
                    <input v-model="editedProduct.sku" type="text" required class="input-field" />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700">Stock</label>
                    <input v-model.number="editedProduct.stock" type="number" required class="input-field" />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700">Image URL</label>
                    <input v-model="editedProduct.imageUrl" type="url" required class="input-field" />
                  </div>

                  <div class="flex justify-end gap-2">
                    <button type="button" @click="isEditing = false" class="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
                      Cancel
                    </button>
                    <button type="submit" class="btn-primary">
                      Update Product
                    </button>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useProductsStore } from '~/composables/useProducts'
import { ArrowLeftIcon } from '@heroicons/vue/24/outline'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'

const route = useRoute()
const store = useProductsStore()

const product = computed(() => 
  store.products.find(p => p.id === parseInt(route.params.id))
)

const isEditing = ref(false)
const editedProduct = ref({})

watchEffect(() => {
  if (product.value) {
    editedProduct.value = { ...product.value }
  } else {
    navigateTo('/products')
  }
})

const handleUpdate = () => {
  store.updateProduct(product.value.id, editedProduct.value)
  isEditing.value = false
}

const handleArchive = () => {
  const newStatus = product.value.status === 'active' ? 'archived' : 'active'
  store.updateProduct(product.value.id, { status: newStatus })
}
</script>