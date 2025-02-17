import { defineStore } from 'pinia'

export type Product = {
  id: number
  name: string
  description: string
  category: string
  price: number
  imageUrl: string
  status: 'active' | 'archived'
  stock: number
  sku: string
  createdAt: string
  stats: {
    totalSales: number
    totalRevenue: number
    viewCount: number
  }
}

export const useProductsStore = defineStore('products', () => {
  const products = ref<Product[]>([
    {
      id: 1,
      name: "Premium Wireless Headphones",
      description: "High-quality wireless headphones with noise cancellation",
      category: "Electronics",
      price: 199.99,
      imageUrl: "https://placehold.co/400x400",
      status: 'active',
      stock: 45,
      sku: "HDX-100",
      createdAt: "2024-01-15",
      stats: {
        totalSales: 234,
        totalRevenue: 46798.66,
        viewCount: 1520
      }
    },
    {
      id: 2,
      name: "Ergonomic Office Chair",
      description: "Comfortable office chair with lumbar support",
      category: "Furniture",
      price: 299.99,
      imageUrl: "https://placehold.co/400x400",
      status: 'active',
      stock: 20,
      sku: "CHR-200",
      createdAt: "2024-02-01",
      stats: {
        totalSales: 89,
        totalRevenue: 26699.11,
        viewCount: 890
      }
    },
    {
      id: 3,
      name: "Smart Watch Pro",
      description: "Advanced smartwatch with health tracking features",
      category: "Electronics",
      price: 249.99,
      imageUrl: "https://placehold.co/400x400",
      status: 'active',
      stock: 30,
      sku: "SWP-300",
      createdAt: "2024-02-15",
      stats: {
        totalSales: 156,
        totalRevenue: 38998.44,
        viewCount: 1230
      }
    }
  ])

  const searchTerm = ref('')
  const selectedCategory = ref('all')
  const priceRange = ref({ min: 0, max: 1000 })
  const statusFilter = ref('active')

  const categories = computed(() => {
    const uniqueCategories = new Set(products.value.map(p => p.category))
    return Array.from(uniqueCategories)
  })

  const filteredProducts = computed(() => {
    return products.value.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
                          product.sku.toLowerCase().includes(searchTerm.value.toLowerCase())
      const matchesCategory = selectedCategory.value === 'all' || product.category === selectedCategory.value
      const matchesPrice = product.price >= priceRange.value.min && product.price <= priceRange.value.max
      const matchesStatus = statusFilter.value === 'all' || product.status === statusFilter.value

      return matchesSearch && matchesCategory && matchesPrice && matchesStatus
    })
  })

  const addProduct = (product: Omit<Product, 'id' | 'stats'>) => {
    const newProduct = {
      ...product,
      id: Math.max(...products.value.map(p => p.id)) + 1,
      stats: {
        totalSales: 0,
        totalRevenue: 0,
        viewCount: 0
      }
    }
    products.value.push(newProduct)
  }

  const updateProduct = (id: number, updates: Partial<Product>) => {
    const index = products.value.findIndex(p => p.id === id)
    if (index !== -1) {
      products.value[index] = { ...products.value[index], ...updates }
    }
  }

  const archiveProduct = (id: number) => {
    updateProduct(id, { status: 'archived' })
  }

  return {
    products,
    searchTerm,
    selectedCategory,
    priceRange,
    statusFilter,
    categories,
    filteredProducts,
    addProduct,
    updateProduct,
    archiveProduct
  }
})