import toastr from "toastr";

const defaultOptions = {
  progressBar: true,
  positionClass: "toast-bottom-left",
  preventDuplicates: true,
  showDuration: "300",
  hideDuration: "1000",
  timeOut: "5000",
  extendedTimeOut: "1000",
};

export const toastError = (message = "Something went wrong...", title = "Error") => {
  toastr.options = defaultOptions;
  toastr.error(message, title);
};

export const toastSuccess = (message = "Success operation", title = "Success") => {
  toastr.options = {
    ...defaultOptions,
    timeOut: "1500",
  };
  toastr.success(message, title);
};

export const toastWarning = (message = "", title = "Warning") => {
  toastr.options = defaultOptions;
  toastr.warning(message, title);
};

export const toastInfo = (message, title) => {
  toastr.options = defaultOptions;
  toastr.info(message, title);
};
