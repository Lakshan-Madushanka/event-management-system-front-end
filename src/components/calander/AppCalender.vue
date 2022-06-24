<template>
  <div class="absolute bottom-7 right-16" v-if="holidays.isLoading">
    <ContentLoadingSpinner title="Calander loading ! " />
  </div>

  <RenderlessCalender v-slot="contex" v-else>
    <div class="calendar absolute bottom-2 right-2">
      <div
        class="w-10 absolute right-[-5px] top-[-35px] hover:cursor-pointer"
        @click="shouldDisplayCalander = !shouldDisplayCalander"
      >
        <img :src="imageSrc" />
      </div>

      <TransitionGroup
        enter-active-class="animate__animated animate__rotateIn"
        leave-active-class="animate__animated  animate__rotateOut"
        appear
      >
        <div v-if="shouldDisplayCalander">
          <div class="calendar__opts">
            <select
              name="calendar__month"
              id="calendar__month"
              @change="contex.onChangeMonth($event)"
            >
              <option
                v-for="(month, index) in contex.monthNames"
                :key="month"
                :value="index"
                :selected="index === contex.onGoingMonth - 1"
              >
                {{ month.slice(0, 3) }}
              </option>
            </select>

            <select
              name="calendar__year"
              id="calendar__year"
              @change="contex.onChangeYear($event)"
            >
              <option
                v-for="year in contex.availableYears"
                :key="year"
                :value="year"
                :selected="year === contex.onGoingYear"
              >
                {{ year }}
              </option>
            </select>
          </div>

          <div class="calendar__body">
            <div class="calendar__days">
              <div v-for="day in contex.days" :key="day">
                {{ day.slice(0, 1) }}
              </div>
            </div>

            <div class="calendar__dates">
              <div
                class="calendar__date calendar__date--grey"
                v-for="day in contex.startingDay()"
                :key="day"
              >
                <span>{{ day }}</span>
              </div>
              <div
                class="calendar__date"
                :class="contex.currentDateClass(date)"
                v-for="date in contex.lastDate()"
                :key="date"
              >
                {{
                  holidays.data &&
                  setCurrentHolidays(
                    contex.currentYear,
                    contex.currentMonth,
                    date,
                    contex.currentMonthName
                  )
                }}

                <template
                  v-if="holidays.data && getCurrentHolidaysNames().length > 0"
                >
                  <div class="relative">
                    <span
                      v-tooltip="getTooltipContents()"
                      class="bg-yellow-200 text-red-600 rounded-3xl inline-block w-full"
                      >{{ date }}
                    </span>
                    <div
                      class="absolute z-10 inline-block px-1 left-10 text-xs bg-pink-400 text-white"
                      v-if="(length = getCurrentHolidaysNames().length) > 1"
                    >
                      {{ length }}
                    </div>
                  </div>
                </template>
                <span class="inline-block w-full relative" v-else>
                  {{ date }}
                </span>
              </div>
            </div>
          </div>

          <div class="calendar__buttons text-purple-500">
            <p>
              {{ contex.onGoingYear }}/{{ contex.onGoingMonth }}/{{
                contex.currentDate
              }}
              ({{ contex.currentDayName() }})
            </p>
            <p>
              <span>Regional holidays</span>
              <span class="inline-block ml-2 w-4 h-4 bg-yellow-200"></span>
            </p>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </RenderlessCalender>
</template>

<script>
import { ref, watch } from "vue";
import RenderlessCalender from "./RenderlessCalender.vue";
import useCalender from "../../composables/calender";
import ContentLoadingSpinner from "../spinner/ContentLoadingSpinner.vue";
import moment from "moment";
export default {
  components: {
    RenderlessCalender,
    ContentLoadingSpinner,
  },
  setup() {
    const { holidays } = useCalender();

    let currentHolidays = [];
    const shouldDisplayCalander = ref(true);
    const imageSrc = ref("");

    watch(
      shouldDisplayCalander,
      (shouldDisplayCalander) => {
        if (shouldDisplayCalander) {
          imageSrc.value = require("../../assets/images/minus.png");
        } else {
          imageSrc.value = require("../../assets/images/plus.jpg");
        }
      },
      { immediate: true }
    );

    const setCurrentHolidays = (year, month, day, monthName) => {
      let tmpCurrentHolidays = [];
      const currentDate = moment({ year, month: month - 1, day });
      const monthHoliidays = holidays.data[monthName];

      monthHoliidays.forEach(function (data) {
        if (currentDate.isSame(data.date)) {
          tmpCurrentHolidays.push(data.name);
        }
      });

      currentHolidays = tmpCurrentHolidays;
    };

    const getCurrentHolidaysNames = () => {
      return currentHolidays;
    };

    const getTooltipContents = () => {
      let list = "";

      currentHolidays.forEach((name) => {
        list += ` <li  class="px-6 py-2 border-b border-gray-200 w-full rounded-t-lg" >
                      ${name}
                   </li>`;
      });

      list = ` <div class="flex justify-center">
                  <ul class="bg-white rounded-lg border border-gray-200  text-gray-900">
                    ${list}
                  </ul>
              </div> `;

      return { content: list, html: true };
    };

    return {
      shouldDisplayCalander,
      imageSrc,
      holidays,
      currentHolidays,
      setCurrentHolidays,
      getCurrentHolidaysNames,
      getTooltipContents,
    };
  },
};
</script>

<style lang="css" scoped>
.calendar {
  --side-padding: 20px;
  --border-radius: 34px;
  --accent-br: 15px;
  width: 400px;
}
.calendar select {
  background-color: #f3f4f6;
  padding: 15px 20px;
}
.calendar__opts,
.calendar__buttons {
  background-color: #fff;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 15px;
}
.calendar__opts {
  border-top-left-radius: var(--border-radius);
  border-top-right-radius: var(--border-radius);
  padding: 20px var(--side-padding);
}
.calendar__body {
  background-image: linear-gradient(to bottom, #f3f4f6, #fff);
}
.calendar__days {
  background-color: #fff;
  padding: 0 var(--side-padding) 10px;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}
.calendar__days > div {
  text-align: center;
  font-weight: 700;
  font-size: 1.02rem;
  color: #c5c8ca;
}
.calendar__dates {
  padding: 10px var(--side-padding);
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}
.calendar__date {
  --height: calc(400px / 6 - var(--side-padding));
  text-align: center;
  height: var(--height);
  line-height: var(--height);
  font-weight: 600;
  font-size: 1.02rem;
  cursor: pointer;
  position: relative;
}
.calendar__date::before {
  content: "";
  position: absolute;
  background-color: rgba(255, 255, 255, 0);
  width: 100%;
  height: calc(var(--height) * 0.9);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: var(--accent-br);
  transition: background-color 0.3s ease;
}
.calendar__date:not(.calendar__date--selected):not(.calendar__date--grey):hover::before {
  background-color: #ededed;
}
.calendar__date--grey {
  color: #c5c8ca;
  cursor: not-allowed;
}
.calendar__date--selected {
  color: #ff374b;
}
.calendar__date--selected::before {
  background-color: #ffeaec;
  border-radius: 0px;
}
.calendar__date--first-date::before {
  border-top-left-radius: var(--accent-br);
  border-bottom-left-radius: var(--accent-br);
}
.calendar__date--last-date::before {
  border-top-right-radius: var(--accent-br);
  border-bottom-right-radius: var(--accent-br);
}
.calendar__date--range-start::after {
  content: "";
  position: absolute;
  bottom: 3px;
  border-radius: 24px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #ff374b;
  width: 10px;
  height: 4px;
}
.calendar__date--range-end {
  color: #fff;
}
.calendar__date--range-end::before {
  box-shadow: 0 15px 20px -3px rgba(255, 55, 75, 0.35);
  background-color: #ff374b;
  border-radius: var(--accent-br);
  z-index: 1;
}
.calendar__date--range-end::after {
  content: "";
  position: absolute;
  height: calc(var(--height) * 0.9);
  background-color: #ffeaec;
  width: 50px;
  top: 50%;
  right: 50%;
  transform: translateY(-50%);
}
.calendar__date span {
  position: relative;
  z-index: 1;
}
.calendar__buttons {
  padding: 10px var(--side-padding) 20px;
  border-bottom-left-radius: var(--border-radius);
  border-bottom-right-radius: var(--border-radius);
}
.calendar__button {
  cursor: pointer;
}
.calendar__button--grey {
  background-color: #f3f4f6;
}
.calendar__button--primary {
  background-color: #1752ff;
  color: #fff;
  transition: box-shadow 0.3s cubic-bezier(0.21, 0.68, 0.09, 0.27),
    transform 0.2s linear;
}
.calendar__button--primary:hover {
  box-shadow: 0 20px 30px -13px rgba(23, 82, 255, 0.45);
  transform: translateY(-3px);
}
.calendar__button--primary:active {
  box-shadow: 0 10px 10px -6px rgba(23, 82, 255, 0.45);
  transform: translateY(-1px);
}

body {
  display: grid;
  place-items: center;
  background-color: #eaedf2;
  height: 100vh;
  font-family: "Nunito", sans-serif;
  font-size: 14px;
  margin: 3vmin;
}

select,
button {
  font-family: inherit;
  font-weight: 700;
  font-size: 1.02rem;
  border-radius: 20px;
  outline: none;
  border: 0;
  padding: 15px 20px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

select {
  background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Capa_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='960px' height='560px' viewBox='0 0 960 560' enable-background='new 0 0 960 560' xml:space='preserve'%3E%3Cg id='Rounded_Rectangle_33_copy_4_1_'%3E%3Cpath d='M480,344.181L268.869,131.889c-15.756-15.859-41.3-15.859-57.054,0c-15.754,15.857-15.754,41.57,0,57.431l237.632,238.937 c8.395,8.451,19.562,12.254,30.553,11.698c10.993,0.556,22.159-3.247,30.555-11.698l237.631-238.937 c15.756-15.86,15.756-41.571,0-57.431s-41.299-15.859-57.051,0L480,344.181z'/%3E%3C/g%3E%3C/svg%3E");
  background-size: 24px;
  background-repeat: no-repeat;
  background-position: calc(100% - var(--side-padding)) center;
}

.activeDay {
}
.activeDay {
  color: #fff;
}
.activeDay::before {
  background-color: blue;
  box-shadow: 0 15px 20 -3px rgba(27, 23, 215, 0.35);
  border-radius: var(--accent-br);
  z-index: 1;
}
.azctiveDay::after {
  content: "";
  position: absolute;
  height: calc(var(--height) * 0.9);
  background-color: #ffeaec;
  width: 50px;
  top: 50%;
  right: 50%;
  transform: translateY(-50%);
}

.holiday {
}
.holiday {
  color: #fff;
}
.holiday::before {
  background-color: blue;
  box-shadow: 0 15px 20 -3px rgba(27, 23, 215, 0.35);
  border-radius: var(--accent-br);
  z-index: 1;
}
</style>
