<template>
  <div class="p-4">
    <div class="mb-6">
      <div class="flex justify-between items-center mb-4">
        <h1 class="text-2xl font-bold">Users</h1>
        <button @click="showNewUserModal = true" class="btn-primary">
          Add New User
        </button>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <input
            type="text"
            v-model="store.searchTerm"
            placeholder="Search users..."
            class="input-field"
          />
        </div>
        <div>
          <select v-model="store.roleFilter" class="input-field">
            <option value="ALL">All Roles</option>
            <option value="ADMIN">Admin</option>
            <option value="MANAGER">Manager</option>
            <option value="EDITOR">Editor</option>
          </select>
        </div>
        <div>
          <select v-model="store.statusFilter" class="input-field">
            <option value="ALL">All Status</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              User
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Role
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Created
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Last Login
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="user in store.filteredUsers" :key="user.id">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm font-medium text-gray-900">{{ user.name }}</div>
              <div class="text-sm text-gray-500">{{ user.email }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span class="px-2 py-1 text-xs rounded-full" 
                    :class="{
                      'bg-purple-100 text-purple-800': user.role === 'ADMIN',
                      'bg-blue-100 text-blue-800': user.role === 'MANAGER',
                      'bg-green-100 text-green-800': user.role === 'EDITOR'
                    }">
                {{ user.role }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span class="px-2 py-1 text-xs rounded-full" 
                    :class="{
                      'bg-green-100 text-green-800': user.status === 'ACTIVE',
                      'bg-red-100 text-red-800': user.status === 'INACTIVE'
                    }">
                {{ user.status }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ new Date(user.createdAt).toLocaleDateString() }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never' }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex gap-2">
                <button 
                  @click="editUser(user)"
                  class="text-blue-600 hover:text-blue-800"
                >
                  Edit
                </button>
                <button 
                  @click="store.toggleUserStatus(user.id)"
                  :class="{
                    'text-red-600 hover:text-red-800': user.status === 'ACTIVE',
                    'text-green-600 hover:text-green-800': user.status === 'INACTIVE'
                  }"
                >
                  {{ user.status === 'ACTIVE' ? 'Deactivate' : 'Activate' }}
                </button>
                <button 
                  v-if="user.id !== 1"
                  @click="confirmDelete(user)"
                  class="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- User Modal (New/Edit) -->
    <TransitionRoot appear :show="showNewUserModal || showEditUserModal" as="template">
      <Dialog as="div" @close="closeModal" class="relative z-50">
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
                  {{ showEditUserModal ? 'Edit User' : 'Add New User' }}
                </DialogTitle>

                <form @submit.prevent="handleSubmit" class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700">Name</label>
                    <input v-model="userForm.name" type="text" required class="input-field" />
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700">Email</label>
                    <input v-model="userForm.email" type="email" required class="input-field" />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700">Role</label>
                    <select v-model="userForm.role" required class="input-field">
                      <option value="ADMIN">Admin</option>
                      <option value="MANAGER">Manager</option>
                      <option value="EDITOR">Editor</option>
                    </select>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700">Status</label>
                    <select v-model="userForm.status" required class="input-field">
                      <option value="ACTIVE">Active</option>
                      <option value="INACTIVE">Inactive</option>
                    </select>
                  </div>

                  <div class="flex justify-end gap-2">
                    <button type="button" @click="closeModal" class="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
                      Cancel
                    </button>
                    <button type="submit" class="btn-primary">
                      {{ showEditUserModal ? 'Update User' : 'Add User' }}
                    </button>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Delete Confirmation Modal -->
    <TransitionRoot appear :show="showDeleteModal" as="template">
      <Dialog as="div" @close="showDeleteModal = false" class="relative z-50">
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
                  Confirm Delete
                </DialogTitle>

                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    Are you sure you want to delete this user? This action cannot be undone.
                  </p>
                </div>

                <div class="mt-4 flex justify-end gap-2">
                  <button
                    type="button"
                    class="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                    @click="showDeleteModal = false"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    class="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
                    @click="handleDelete"
                  >
                    Delete
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUsersStore } from '~/composables/useUsers'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'

const store = useUsersStore()

const showNewUserModal = ref(false)
const showEditUserModal = ref(false)
const showDeleteModal = ref(false)
const userToDelete = ref(null)

const defaultUserForm = {
  name: '',
  email: '',
  role: 'EDITOR',
  status: 'ACTIVE'
}

const userForm = ref({ ...defaultUserForm })

const closeModal = () => {
  showNewUserModal.value = false
  showEditUserModal.value = false
  userForm.value = { ...defaultUserForm }
}

const editUser = (user) => {
  userForm.value = { ...user }
  showEditUserModal.value = true
}

const confirmDelete = (user) => {
  userToDelete.value = user
  showDeleteModal.value = true
}

const handleDelete = () => {
  if (userToDelete.value) {
    store.deleteUser(userToDelete.value.id)
    showDeleteModal.value = false
    userToDelete.value = null
  }
}

const handleSubmit = () => {
  if (showEditUserModal.value) {
    store.updateUser(userForm.value.id, userForm.value)
  } else {
    store.addUser(userForm.value)
  }
  closeModal()
}
</script>