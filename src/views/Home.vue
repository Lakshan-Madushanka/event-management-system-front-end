<template>
  <div class="home">
    <h1
      class="mx-auto mt-10 text-2xl font-bold text-fuchsia-900 tracking-wider"
    >
      Welcome to Event Management System
    </h1>

    <Calender />
  </div>
</template>

<script>
// @ is an alias to /src

//import MainCalender from "../components/calander/MainCalander.vue";
import SubCalender from "../components/calander/AppCalender.vue";
export default {
  name: "Home",
  components: { Calender: SubCalender },
};
</script>
