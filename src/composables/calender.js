import { reactive, watch } from "vue";
import { useStore } from "vuex";

export default () => {
  const holidays = reactive({
    isLoading: false,
    data: null,
  });
  const store = useStore();

  watch(
    store.state.calender,
    (calender) => {
      holidays.isLoading = calender.isLoading;
      holidays.data = store.getters["calender/getHolidays"];
    },
    { immediate: true }
  );

  return {
    holidays,
  };
};
