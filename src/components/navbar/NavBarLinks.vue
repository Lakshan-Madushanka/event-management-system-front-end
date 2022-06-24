<template>
  <ul
    class="flex flex-col font-serif font-weight mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-base md:font-medium"
  >
    <li>
      <router-link
        :to="{ name: 'Home' }"
        class="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
        aria-current="page"
        >Home</router-link
      >
    </li>
    <li>
      <router-link
        :to="{ name: 'About' }"
        class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
        >About</router-link
      >
    </li>
  </ul>
</template>

<style scoped>
.font-weight {
  font-weight: bold;
}
</style>
