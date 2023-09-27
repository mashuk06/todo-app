import { defineStore } from "pinia";
import { reactive } from "vue";

const taskStore = defineStore("task", () => {
  const tasks = reactive([]);

  const addTask = (taskName) => {
    return tasks.push({ name: taskName, done: false });
  };
  const removeTask = (index) => {
    return tasks.splice(index, 1);
  };
  const toggleTaskStatus = (index) => {
    return tasks[index].done = !tasks[index].done;
  };

  return {
    tasks,
    addTask,
    removeTask,
    toggleTaskStatus,
  };
});

export { taskStore };
