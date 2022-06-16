<template>
  <section class="mt-10">
    <div class="mx-40 px-6 text-gray-800">
      <div
        class="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6"
      >
        <div
          class="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0"
        >
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            class="w-full"
            alt="Sample image"
          />
        </div>
        <div class="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
          <form>
            <div
              class="flex flex-row items-center justify-center lg:justify-start"
            >
              <p class="text-blue-600 font-bold text-2xl mb-5 mr-4">
                {{ $route.name == "signUp" ? "Sign up" : "sign In" }}
              </p>
            </div>
            <slot name="form" />
            <slot name="submitButton" />
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
