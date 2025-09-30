document.addEventListener("DOMContentLoaded", () => {
  const site = {
    imageZoom: {
      images: [],
      currentIndex: 0,

      init: function () {
        const imageZoomButtons = document.querySelectorAll(
          "button.image-spotlight"
        );
        if (!imageZoomButtons) return;

        const images = document.querySelectorAll("button.image-spotlight img");
        if (!images) return;
        this.images = images;

        const imageDialog = document.querySelector("#image-spotlight");
        if (!imageDialog) return;

        const imageCloseBtn = imageDialog.querySelector(
          "button[data-type='close']"
        );
        if (imageCloseBtn) {
          imageCloseBtn.addEventListener("click", () => {
            imageDialog.close();
          });
        }

        const imagePrevBtn = imageDialog.querySelector(
          "button[data-type='prev']"
        );
        if (imagePrevBtn) {
          imagePrevBtn.addEventListener("click", () => {
            this.prevImage(imageDialog);
          });
        }

        const imageNextBtn = imageDialog.querySelector(
          "button[data-type='next']"
        );
        if (imageNextBtn) {
          imageNextBtn.addEventListener("click", () => {
            this.nextImage(imageDialog);
          });
        }

        imageZoomButtons.forEach((button, index) => {
          button.addEventListener("click", () => {
            imageDialog.setAttribute("data-loading", "true");
            this.currentIndex = index;
            this.showImage(imageDialog);
            imageDialog.showModal();
          });
        });
      },

      showImage: function (dialog) {
        const dialogImage = dialog.querySelector(
          "button[data-type='image'] img"
        );
        if (!dialogImage) return;

        dialogImage.src = this.images[this.currentIndex].src;
        dialogImage.onload = () => {
          dialog.setAttribute("data-loading", "false");
          dialogImage.onload = null;
        };
      },

      nextImage: function (dialog) {
        dialog.setAttribute("data-loading", "true");
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.showImage(dialog);
      },

      prevImage: function (dialog) {
        dialog.setAttribute("data-loading", "true");
        this.currentIndex =
          (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.showImage(dialog);
      },
    },

    init: function () {
      this.imageZoom.init();
    },

    start: function () {
      setTimeout(() => {
        document.body.setAttribute("data-loading", "false");
      }, 0);
    },
  };

  window.addEventListener("load", () => {
    site.init();
    site.start();
  });
});
