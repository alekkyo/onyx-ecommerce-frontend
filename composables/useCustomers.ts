import { defineStore } from 'pinia'

export const useCustomersStore = defineStore('customers', () => {
  const customers = ref([
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      address: '123 Main St, New York, NY 10001',
      createdAt: '2024-01-15',
      totalOrders: 12,
      totalSpent: 2456.78,
      orders: [
        { id: 1, date: '2024-03-15', total: 299.99, status: 'delivered' },
        { id: 2, date: '2024-02-28', total: 199.99, status: 'processing' },
      ]
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '+1 (555) 987-6543',
      address: '456 Oak Ave, Los Angeles, CA 90001',
      createdAt: '2024-02-01',
      totalOrders: 8,
      totalSpent: 1789.45,
      orders: [
        { id: 3, date: '2024-03-10', total: 449.99, status: 'delivered' },
        { id: 4, date: '2024-03-01', total: 129.99, status: 'delivered' },
      ]
    },
    {
      id: 3,
      name: 'Robert Johnson',
      email: 'robert.j@example.com',
      phone: '+1 (555) 246-8135',
      address: '789 Pine St, Chicago, IL 60601',
      createdAt: '2024-02-15',
      totalOrders: 5,
      totalSpent: 987.65,
      orders: [
        { id: 5, date: '2024-03-18', total: 199.99, status: 'processing' },
      ]
    }
  ])

  const searchTerm = ref('')
  const filterStatus = ref('all')

  const filteredCustomers = computed(() => {
    return customers.value.filter(customer => {
      const matchesSearch = 
        customer.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
        customer.phone.includes(searchTerm.value)
      
      return matchesSearch
    })
  })

  return {
    customers,
    searchTerm,
    filterStatus,
    filteredCustomers
  }
})