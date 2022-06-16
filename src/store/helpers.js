export const hadnleValidationErrors = (err, commit) => {
  if (err.response.status == 422) {
    let title = err.response.data.message;

    commit("setErrors", {
      title,
      messages: err.response.data.errors,
    });
    commit("setAlert", { type: "danger", message: title }, { root: true });
  }
};
