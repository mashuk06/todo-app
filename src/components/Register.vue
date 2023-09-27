<script setup>
  import { ref } from 'vue'
  import { authStore } from '../store/authStore'
  import { toast } from 'vue3-toastify'
  import 'vue3-toastify/dist/index.css'
  import { useRouter } from 'vue-router'

  const email = ref('')
  const password = ref('')
  const confirmPassword = ref('')
  const router = useRouter()
  const auth = authStore()
  const signUp = () => {
    if (!email.value) {
      toast.error('Enter email address!')
      return false
    }
    if (!password.value) {
      toast.error('Enter Password!')
      return false
    }
    if (!confirmPassword.value) {
      toast.error('Enter Confirm Password!')
      return false
    }

    const userExists = auth.checkExistingUser(email.value)
    if (userExists) {
      toast.error('User already exists. Try again!')
      return false
    }
    const passwordMatched = auth.checkPassword(password.value, confirmPassword.value)
    if (!passwordMatched) {
      toast.error('Password and Confirm Password did not match. Try again!')
      return false
    }
    const registration = auth.register(email.value, password.value)
    if (registration) {
      toast.success('Registration successful. You can login now !')
      setTimeout(() => {
        router.push('/')
      }, 1000)
    }
  }
</script>

<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
        alt="Your Company">
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign up to create your
        account
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" action="#" method="POST">
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
          <div class="mt-2">
            <input id="email" v-model="email" type="email" required
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
          </div>
        </div>
        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
          </div>
          <div class="mt-2">
            <input id="password" v-model="password" type="password" required
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
          </div>
        </div>
        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Confirm Password</label>
          </div>
          <div class="mt-2">
            <input id="password" v-model="confirmPassword" type="password" required
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
          </div>
        </div>
        <div>
          <button type="button" @click.prevent="signUp"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign
            up</button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm text-gray-500">
        Already a member?
        <a href="#" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
          <router-link :to="{ name: 'login' }">Login</router-link>
        </a>
      </p>
    </div>
  </div>
</template>

<style scoped>

</style>
