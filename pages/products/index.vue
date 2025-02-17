<template>
  <div class="p-4">
    <div class="mb-6">
      <div class="flex justify-between items-center mb-4">
        <h1 class="text-2xl font-bold">Products</h1>
        <button @click="showNewProductModal = true" class="btn-primary">
          Add New Product
        </button>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div>
          <input
            type="text"
            v-model="store.searchTerm"
            placeholder="Search products..."
            class="input-field"
          />
        </div>
        <div>
          <select v-model="store.selectedCategory" class="input-field">
            <option value="all">All Categories</option>
            <option v-for="category in store.categories" :key="category" :value="category">
              {{ category }}
            </option>
          </select>
        </div>
        <div>
          <select v-model="store.statusFilter" class="input-field">
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="archived">Archived</option>
          </select>
        </div>
        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">Price Range</label>
          <div class="flex gap-2">
            <input
              type="number"
              v-model="store.priceRange.min"
              placeholder="Min"
              class="input-field"
            />
            <input
              type="number"
              v-model="store.priceRange.max"
              placeholder="Max"
              class="input-field"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <div v-for="product in store.filteredProducts" :key="product.id" 
           class="bg-white rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer"
           @click="navigateTo(`/products/${product.id}`)">
        <img :src="product.imageUrl" :alt="product.name" class="w-full h-48 object-cover rounded-t-lg" />
        <div class="p-4">
          <div class="flex justify-between items-start mb-2">
            <h2 class="text-lg font-semibold">{{ product.name }}</h2>
            <span 
              class="px-2 py-1 text-xs rounded-full"
              :class="product.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'"
            >
              {{ product.status }}
            </span>
          </div>
          <p class="text-gray-600 text-sm mb-2">{{ product.category }}</p>
          <p class="text-lg font-bold">${{ product.price.toFixed(2) }}</p>
          <p class="text-sm text-gray-500">SKU: {{ product.sku }}</p>
        </div>
      </div>
    </div>

    <!-- New Product Modal -->
    <TransitionRoot appear :show="showNewProductModal" as="template">
      <Dialog as="div" @close="showNewProductModal = false" class="relative z-50">
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
                  Add New Product
                </DialogTitle>

                <form @submit.prevent="handleAddProduct" class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700">Name</label>
                    <input v-model="newProduct.name" type="text" required class="input-field" />
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700">Description</label>
                    <textarea v-model="newProduct.description" required class="input-field"></textarea>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700">Category</label>
                    <input v-model="newProduct.category" type="text" required class="input-field" />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700">Price</label>
                    <input v-model.number="newProduct.price" type="number" step="0.01" required class="input-field" />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700">SKU</label>
                    <input v-model="newProduct.sku" type="text" required class="input-field" />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700">Stock</label>
                    <input v-model.number="newProduct.stock" type="number" required class="input-field" />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700">Image URL</label>
                    <input v-model="newProduct.imageUrl" type="url" required class="input-field" />
                  </div>

                  <div class="flex justify-end gap-2">
                    <button type="button" @click="showNewProductModal = false" class="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
                      Cancel
                    </button>
                    <button type="submit" class="btn-primary">
                      Add Product
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
import { ref, defineComponent } from 'vue'
import { useProductsStore } from '~/composables/useProducts'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'

const store = useProductsStore()
const showNewProductModal = ref(false)

const defaultProduct = {
  name: '',
  description: '',
  category: '',
  price: 0,
  imageUrl: 'https://placehold.co/400x400',
  status: 'active',
  stock: 0,
  sku: '',
  createdAt: new Date().toISOString().split('T')[0]
}

const newProduct = ref({ ...defaultProduct })

const handleAddProduct = () => {
  store.addProduct(newProduct.value)
  showNewProductModal.value = false
  newProduct.value = { ...defaultProduct }
}
</script>