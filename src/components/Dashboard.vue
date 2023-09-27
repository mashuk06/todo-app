<script setup>
    import { ref, computed } from 'vue'
    import { taskStore } from '../store/taskStore'
    import { authStore } from '../store/authStore'
    import { toast } from 'vue3-toastify'
    import 'vue3-toastify/dist/index.css'
    import { useRouter } from 'vue-router'

    const taskName = ref('')
    const router = useRouter()
    const tStore = taskStore()
    const auth = authStore()
    const tasks = computed(() => tStore.tasks)

    const addTask = () => {
        if (taskName.value == '') {
            toast.error('Please Enter Task Name!')
            return false
        }
        const taskCreated = tStore.addTask(taskName.value)
        if (taskCreated) {
            taskName.value = ''
            toast.success('Task Added Successfully!')
        }
    }

    const removeTask = (index) => {
        const taskRemoved = tStore.removeTask(index)
        if (taskRemoved) {
            toast.success('Task Deleted Successfully!')
        }
    }

    const toggleTaskStatus = (index) => {
        const taskStatusChanged = tStore.toggleTaskStatus(index)
        toast.success('Task Status Changed Successfully!')
    }

    const logout = () => {
        auth.logout()
        toast.success('Logged Out Successfully!')
        setTimeout(() => {
            router.push('/')
        }, 100)
    }
</script>
<template>
    <div class="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
        <div class="bg-gray-300 rounded shadow p-6 m-4 w-full">
            <div class="mb-4">
                <div class="flex justify-between items-center mb-4">
                    <h1 class="text-grey-darkest">Todo List</h1>
                    <p>Currently Logged in as: <b>{{ auth.currentUser.email }}</b></p>
                    <button @click="logout"
                        class="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                        Logout
                    </button>
                </div>
                <div class="flex mt-4">
                    <input v-model="taskName"
                        class="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
                        placeholder="Add Todo" />
                    <button @click.prevent="addTask"
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Add
                    </button>
                </div>
            </div>
            <div v-for="(task, index) in tasks" :key="index">
                <div class="flex mb-4 items-center justify-between">
                    <p :class="{ 'line-through text-green': task.done, 'text-grey-darkest': !task.done }">
                        {{ index + 1 }}. {{ task.name }}
                    </p>
                    <div class="flex">
                        <button @click.prevent="toggleTaskStatus(index)"
                            :class="{'bg-yellow-500 hover:bg-yellow-600': task.done,'bg-green-500 hover:bg-green-600': !task.done}"
                            class="text-white font-bold py-2 px-4 rounded">
                            {{ task.done ? "Not Done" : "Done" }}
                        </button>
                        <button @click.prevent="removeTask(index)"
                            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
</style>
