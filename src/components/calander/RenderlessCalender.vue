<script>
export default {
  data() {
    return {
      days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      monthNames: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      onGoingYear: new Date().getFullYear(),
      onGoingMonth: new Date().getMonth() + 1,
      currentDate: new Date().getDate(),
      currentMonth: new Date().getMonth() + 1,
      currentYear: new Date().getFullYear(),
    };
  },
  computed: {
    currentMonthName() {
      return new Date(this.currentYear, this.currentMonth - 1).toLocaleString(
        "en-us",
        { month: "long" }
      );
    },
    availableYears() {
      return [this.onGoingYear - 1, this.onGoingYear, this.onGoingYear + 1];
    },
  },
  methods: {
    lastDate() {
      return new Date(this.currentYear, this.currentMonth, 0).getDate();
    },
    startingDay() {
      const previousMonthDays = new Date(
        this.currentYear,
        this.currentMonth - 1,
        0
      ).getDate();
      const elapseDays = new Date(
        this.currentYear,
        this.currentMonth - 1,
        1
      ).getDay();

      const lowerBound = previousMonthDays - elapseDays + 1;

      let days = [];

      for (let i = lowerBound; i <= previousMonthDays; i++) {
        days.push(i);
      }

      return days;
    },
    currentDayName() {
      return new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        this.currentDate
      ).toLocaleString("en-us", { weekday: "long" });
    },
    currentDateClass(date) {
      const calenderFullDate = new Date(
        this.currentYear,
        this.currentMonth - 1,
        date
      ).toDateString();
      const currentFullDate = new Date().toDateString();
      return calenderFullDate === currentFullDate && "activeDay";
    },
    next() {
      if (this.currentMonth === 12) {
        this.currentMonth = 1;
        this.currentYear++;
      } else {
        this.currentMonth++;
      }
    },
    prev() {
      if (this.currentMonth === 1) {
        this.currentMonth = 12;
        this.currentYear--;
      } else {
        this.currentMonth--;
      }
    },
    onChangeMonth($event) {
      this.currentMonth = parseInt($event.target.value) + 1;
    },
    onChangeYear($event) {
      this.currentYear = $event.target.value;
    },
  },

  render() {
    return (
      this.$slots.default &&
      this.$slots.default({
        days: this.days,
        currentDate: this.currentDate,
        currentMonth: this.currentMonth,
        currentMonthName: this.currentMonthName,
        currentYear: this.currentYear,
        lastDate: this.lastDate,
        startingDay: this.startingDay,
        currentDayName: this.currentDayName,
        currentDateClass: this.currentDateClass,
        next: this.next,
        prev: this.prev,
        monthNames: this.monthNames,
        onChangeMonth: this.onChangeMonth,
        onChangeYear: this.onChangeYear,
        availableYears: this.availableYears,
        onGoingYear: this.onGoingYear,
        onGoingMonth: this.onGoingMonth,
      })
    );
  },
};
</script>
