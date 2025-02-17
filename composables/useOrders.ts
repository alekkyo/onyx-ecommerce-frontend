import { defineStore } from 'pinia'

export type OrderStatus = 'NEW' | 'IN_PROGRESS' | 'SHIPPED' | 'COMPLETED'

export type OrderItem = {
  productId: number
  name: string
  quantity: number
  price: number
  total: number
}

export type Order = {
  id: number
  customerId: number
  customerName: string
  customerEmail: string
  items: OrderItem[]
  total: number
  status: OrderStatus
  createdAt: string
  updatedAt: string
}

export const useOrdersStore = defineStore('orders', () => {
  const orders = ref<Order[]>([
    {
      id: 1,
      customerId: 1,
      customerName: 'John Doe',
      customerEmail: 'john.doe@example.com',
      items: [
        {
          productId: 1,
          name: 'Premium Wireless Headphones',
          quantity: 1,
          price: 199.99,
          total: 199.99
        },
        {
          productId: 3,
          name: 'Smart Watch Pro',
          quantity: 1,
          price: 249.99,
          total: 249.99
        }
      ],
      total: 449.98,
      status: 'NEW',
      createdAt: '2024-04-01T10:00:00Z',
      updatedAt: '2024-04-01T10:00:00Z'
    },
    {
      id: 2,
      customerId: 2,
      customerName: 'Jane Smith',
      customerEmail: 'jane.smith@example.com',
      items: [
        {
          productId: 2,
          name: 'Ergonomic Office Chair',
          quantity: 2,
          price: 299.99,
          total: 599.98
        }
      ],
      total: 599.98,
      status: 'IN_PROGRESS',
      createdAt: '2024-04-02T14:30:00Z',
      updatedAt: '2024-04-02T15:00:00Z'
    },
    {
      id: 3,
      customerId: 3,
      customerName: 'Robert Johnson',
      customerEmail: 'robert.j@example.com',
      items: [
        {
          productId: 1,
          name: 'Premium Wireless Headphones',
          quantity: 1,
          price: 199.99,
          total: 199.99
        }
      ],
      total: 199.99,
      status: 'SHIPPED',
      createdAt: '2024-04-03T09:15:00Z',
      updatedAt: '2024-04-03T11:00:00Z'
    },
    {
      id: 4,
      customerId: 1,
      customerName: 'John Doe',
      customerEmail: 'john.doe@example.com',
      items: [
        {
          productId: 3,
          name: 'Smart Watch Pro',
          quantity: 1,
          price: 249.99,
          total: 249.99
        }
      ],
      total: 249.99,
      status: 'COMPLETED',
      createdAt: '2024-03-25T16:45:00Z',
      updatedAt: '2024-03-28T10:30:00Z'
    }
  ])

  const statusFilter = ref<OrderStatus | 'ALL'>('ALL')

  const filteredOrders = computed(() => {
    let filtered = orders.value

    // Filter by status
    if (statusFilter.value !== 'ALL') {
      filtered = filtered.filter(order => order.status === statusFilter.value)
    }

    // Sort by creation date (oldest active orders first)
    return filtered.sort((a, b) => {
      // Put completed orders at the end
      if (a.status === 'COMPLETED' && b.status !== 'COMPLETED') return 1
      if (a.status !== 'COMPLETED' && b.status === 'COMPLETED') return -1
      
      // Sort by date for non-completed orders
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    })
  })

  const updateOrderStatus = (orderId: number, status: OrderStatus) => {
    const order = orders.value.find(o => o.id === orderId)
    if (order) {
      order.status = status
      order.updatedAt = new Date().toISOString()
    }
  }

  return {
    orders,
    statusFilter,
    filteredOrders,
    updateOrderStatus
  }
})