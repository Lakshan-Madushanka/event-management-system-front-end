<template>
  <div class="bg-[url('../assets/images/bg.png')] bg-repeat">
    <template v-if="isAppLoading">
      <MainAppLoader />
    </template>

    <template v-else>
      <NavBar />
      <Alert
        v-if="alertState.message"
        :id="alertState.id"
        :type="alertState.type"
        :message="alertState.message"
      />

      <router-view />
    </template>
  </div>
</template>

<script>
import { ref, reactive, watch, computed } from "vue";
import { useStore } from "vuex";
import NavBar from "./components/navbar/NavBar.vue";
import Alert from "./components/alert/Alert.vue";
import MainAppLoader from "./components/appLoadingIndicator/MainAppLoader.vue";

export default {
  components: {
    NavBar,
    Alert,
    MainAppLoader,
  },

  setup() {
    const store = useStore();

    const date = ref();

    const alertState = reactive({
      id: 0,
      type: "",
      message: "",
    });

    store.dispatch("auth/authUser");
    store.dispatch("calender/fetchHolidays");

    watch(
      () => store.state.alert,
      () => {
        const alert = store.getters.getAlert;
        console.log("alert app", alert);
        Object.assign(alertState, { ...alert, id: Math.random() });
      }
    );

    return {
      alertState,
      isAppLoading: computed(() => store.state.isLoading),
      date,
    };
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
}

/* #nav {
  padding: 30px;
} */

/* #nav a {
  font-weight: bold;
  color: #2c3e50;
} */

/* #nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
