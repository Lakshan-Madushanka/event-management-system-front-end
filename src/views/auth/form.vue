<template>
  <BaseTemplate>
    <template #form>
      <!-- name input -->

      <div class="mb-6">
        <input
          type="text"
          class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          id="name"
          placeholder="Name "
          v-model="state.name"
        />
        <p class="mt-2 text-pink-600 text-sm" v-if="v$.name.required.$invalid">
          Name is required.
        </p>
      </div>
      <!-- Email input -->
      <div class="mb-6">
        <input
          type="text"
          class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          id="email"
          placeholder="Email address"
          v-model="state.email"
        />
        <p class="mt-2 text-pink-600 text-sm" v-if="v$.email.required.$invalid">
          Email address is required.
        </p>
        <p class="mt-2 text-pink-600 text-sm" v-if="v$.email.email.$invalid">
          Please provide a valid email address.
        </p>
        <template v-if="formErrors.messages.email">
          <p
            class="mt-2 text-pink-600 text-sm"
            v-for="error in formErrors.messages.email"
            :key="error"
          >
            {{ error }}
          </p>
        </template>
      </div>

      <!-- Password input -->
      <div class="mb-6">
        <input
          type="password"
          class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          id="password"
          placeholder="Password"
          v-model="state.password"
        />
        <p
          class="mt-2 text-pink-600 text-sm"
          v-if="v$.password.required.$invalid"
        >
          Password is required
        </p>
        <p
          class="mt-2 text-pink-600 text-sm"
          v-if="v$.password.minLength.$invalid"
        >
          Password length
        </p>
        <template v-if="formErrors.messages.password">
          <p
            class="mt-2 text-pink-600 text-sm"
            v-for="error in formErrors.messages.password"
            :key="error"
          >
            {{ error }}
          </p>
        </template>
      </div>

      <div class="mb-6">
        <input
          type="password"
          class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          id="passwordConfirmation"
          placeholder="Password Confirmation"
          v-model="state.passwordConfirmation"
        />
        <p
          class="mt-2 text-pink-600 text-sm"
          v-if="v$.passwordConfirmation.required.$invalid"
        >
          Passwords confirmation required
        </p>
        <p
          class="mt-2 text-pink-600 text-sm"
          v-if="v$.passwordConfirmation.sameAsPassword.$invalid"
        >
          The password must be at least 8 characters.
        </p>
      </div>

      <div class="flex justify-between items-center mb-6">
        <div class="form-group form-check">
          <input
            type="checkbox"
            class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
            id="exampleCheck2"
          />
          <label
            class="form-check-label inline-block text-gray-800"
            for="exampleCheck2"
            >Remember me</label
          >
        </div>
        <!-- <a href="#!" class="text-gray-800">Forgot password?</a> -->
      </div>
    </template>
    <template #submitButton>
      <SubmitButton
        @submitButtonClicked="submit"
        :isFormInvalid="v$.$invalid"
      />
    </template>
  </BaseTemplate>
</template>

<script>
import { reactive, toRef, watch } from "vue";
import { computed } from "vue";

import { useStore } from "vuex";
import useVuelidate from "@vuelidate/core";

import { required, email, sameAs, minLength } from "@vuelidate/validators";
import BaseTemplate from "./BaseTemplate.vue";
import SubmitButton from "./SubmitButton.vue";
export default {
  components: {
    BaseTemplate,
    SubmitButton,
  },
  setup() {
    const store = useStore();

    const state = reactive({
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    });
    const formErrors = reactive({ messages: {} });

    const isLoading = computed(() => store.state.auth.isLoading);

    const passwordRef = toRef(state, "password");

    const rules = {
      name: { required },
      email: { required, email },
      password: { required, minLength: minLength(5) },
      passwordConfirmation: {
        required,
        sameAsPassword: sameAs(passwordRef),
      },
    };

    watch(
      () => store.state.auth.errors,
      function () {
        formErrors.messages = store.getters["auth/errors"].messages;
      }
    );

    const submit = () => {
      v$.value.$touch();

      if (v$.value.$invalid || isLoading.value) return;

      store.dispatch("auth/signUp", {
        ...state,
        password_confirmation: state.passwordConfirmation,
      });
    };

    const v$ = useVuelidate(rules, state, { $lazy: true, $autoDirty: true });
    return {
      state,
      v$,
      formErrors,
      submit,
    };
  },
};
</script>
