<template>
  <div class="text-center lg:text-left mb-10">
    <button
      type="button"
      class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
      :class="{ 'cursor-not-allowed': isFormInvalid || isLoading }"
      :disabled="isFormInvalid"
      @click="submit()"
    >
      <ButtonSpinner v-if="isLoading" />
      {{ $route.name === "signIn" ? "Sign in" : "Sign up" }}
    </button>

    <p class="text-sm font-semibold mt-2 pt-1 mb-0">
      {{
        isSignInRoute ? "Don't have an account?" : "Already have an account?"
      }}
      <router-link
        :to="optionalRoute"
        class="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out underline"
        >{{ isSignInRoute ? "Sign up" : "Sign in" }}</router-link
      >
    </p>
  </div>
</template>

<script>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import ButtonSpinner from "../../components/spinner/ButtonSpinner.vue";
export default {
  emits: ["submitButtonClicked"],
  props: { isFormInvalid: { default: false, type: Boolean } },
  components: { ButtonSpinner },
  setup(props, { emit }) {
    const store = useStore();
    const route = useRoute();

    const isSignInRoute = route.name === "signIn";
    const optionalRoute =
      route.name === "signIn" ? { name: "signUp" } : { name: "signIn" };

    const isLoading = computed(() => store.state.auth.isLoading);

    const submit = () => {
      emit("submitButtonClicked");
    };

    return { submit, isLoading, optionalRoute, isSignInRoute };
  },
};
</script>
