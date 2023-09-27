import { defineStore } from "pinia";
import { reactive } from "vue";

const authStore = defineStore("auth", () => {
  const users = reactive([]);
  const currentUser = reactive({});

  const checkPassword = (password, confirmPassword) => {
    return password === confirmPassword;
  };
  const checkExistingUser = (email) => {
    return users.some((user) => user.email === email);
  };
  const register = (email, password) => {
    return users.push({ email, password });
  };
  const login = (email, password) => {
    const user = users.find(
      (user) => user.email === email && user.password === password
    );
    if (user) {
      return Object.assign(currentUser, user)
    }
  };
  const logout = () => {
    return Object.assign(currentUser, {})
  };

  return {
    users,
    currentUser,
    checkPassword,
    checkExistingUser,
    register,
    login,
    logout,
  };
});

export { authStore };
