<template>
  <nav
    class="bg-blue-100 border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800"
  >
    <div class="container flex flex-wrap justify-between items-center mx-auto">
      <a href="https://flowbite.com" class="flex items-center">
        <img
          src="../../assets/images/event.jpg"
          class="mr-3 h-6 sm:h-9"
          alt="Flowbite Logo"
        />
        <span
          class="self-center text-xl font-semibold whitespace-nowrap dark:text-white"
          >Event Management</span
        >
      </a>

      <NavBarProfileButton />
      <div
        class="hidden justify-between items-center w-full md:flex md:w-auto md:order-1"
        id="mobile-menu-2"
      >
        <NavBarLinks />
      </div>
    </div>
  </nav>
</template>

<script>
import { ref } from "vue";
import NavBarProfileButton from "./NavBarProfileButton.vue";
import NavBarLinks from "./NavBarLinks.vue";
export default {
  components: {
    NavBarProfileButton,
    NavBarLinks,
  },
  setup() {
    const profileIconVisibility = ref(false);

    return { profileIconVisibility };
  },
};
</script>
