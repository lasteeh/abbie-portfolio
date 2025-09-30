document.addEventListener("DOMContentLoaded", () => {
  const site = {
    init: function () {
      setTimeout(() => {
        document.body.setAttribute("data-loading", "false");
      }, 0);
    },
  };

  window.addEventListener("load", () => {
    site.init();
  });
});
