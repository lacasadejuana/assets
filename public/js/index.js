window.producto = window.producto || window.productos
if (!window.productos) location.href = "/1/grupo-1"
window.images = productos.fotos;
console.log(window.images.map((i) => i.url))
window.vertientesGallery = function ($el, grupo) {
  return {
    ...grupo,
    description: grupo.descripcion,
    isFullScreen: false,
    showArrows: false,
    count: images.length,
    activeImage: 0,
    $imageEl: $el.querySelector("#main_image"),
    $thumbNavEl: $el.querySelectorAll("ul")[1] || null,
    $zoomEl: $el.querySelector("*[data-zoom]"),
    $lensEl: $el.querySelector("*[data-lens]"),
    zoomIsActive: false,
    zoomRatio: { width: 1, height: 1 },
    zoomSize: null,
    lensSize: null,
    previewSize: null,
    copied_msg: false,
    fullSizeZoomDisabled: true,
    fullSizeZoomIsActive: false,
    $fullSizeZoomEl: null,
    fullSizeZoomSize: null,
    init() {
      document.title = this.title;
      let [unused, id, curent_slug] = location.pathname.split('/')
      console.log({ id, curent_slug, slug: grupo.slug })

    },
    copyPermalink() {
      this.copied_msg = true;
      // Copy the text inside the text field
      navigator.clipboard ? navigator.clipboard.writeText(this.permalink) : null;
      setTimeout(() => this.copied_msg = false, 500)
    },
    nextImage: function () {
      this.activeImage =
        this.activeImage + 1 < this.count ? this.activeImage + 1 : 0;
      console.log({ activeImage: this.activeImage, url: images[this.activeImage].url })
    },

    prevImage: function () {
      this.activeImage =
        this.activeImage > 0 ? this.activeImage - 1 : this.count - 1;
      console.log({ activeImage: this.activeImage, url: images[this.activeImage].url })
    },
    setActiveImage(i, image) {
      this.activeImage = i;
      console.log({ activeImage: this.activeImage, url: images[this.activeImage].url, currentThumb: image.thumb })
    },
    mousewheelEvent: function (event) {
      if (event.deltaY > 0) {
        this.nextImage();
        event.preventDefault();
      } else if (event.deltaY < 0) {
        this.prevImage();
        event.preventDefault();
      }
    },

    scroll: function () {
      this.scrollToImage();
      this.scrollToThumb();
    },

    scrollToThumb: function () {
      if (!this.$thumbNavEl) {
        return;
      }
      const $activeThumb = this.$thumbNavEl.querySelector(
        "ul li:nth-child(0n+" + (this.activeImage + 1) + ")"
      );
      if ($activeThumb) {
        this.$thumbNavEl.offsetTop =
          $activeThumb.offsetTop +
          this.$thumbNavEl.clientHeight / 2 -
          $activeThumb.clientHeight / 2;
        this.$thumbNavEl.scrollLeft =
          $activeThumb.offsetLeft -
          this.$thumbNavEl.clientWidth / 2 +
          $activeThumb.clientWidth / 2;
      }
    },

    scrollToImage: function () {
      const $activeImage = this.$imageEl.children[this.activeImage + 1];
      this.$imageEl.scrollLeft = $activeImage.offsetLeft;
      if (this.isFullScreen) {
        this.showFullScreenImage();
      }
    },

    toggleFullScreen: function () {

      this.isFullScreen
        ? this.closeFullScreen()
        : this.openFullScreen();
      console.log({ toggleFullScreen: this.isFullScreen })
      // wait for css rendering then scroll to active image
      let _this = this;
      setTimeout(function () {
        _this.scroll();
      }, 100);
    },

    openFullScreen: function () {
      document.body.style.overflowY = "hidden";
      document.body.style.height = "100vh";
      this.isFullScreen = true;

      // wait for css transition because we need the element size
      setTimeout(this.showFullScreenImage.bind(this), 200);
    },

    closeFullScreen: function () {
      document.body.style.overflowY = null;
      document.body.style.height = null;
      this.isFullScreen = false;
      this.$fullSizeZoomEl.remove();
      this.zoomOut;
      console.log({ closeFullScreen: this.isFullScreen })

      this.fullScreenContainer = document.querySelector('#fullscreen_container')
      let innerspan = this.fullScreenContainer.querySelector('span')
      if (innerspan) innerspan.remove();


      this.fullScreenContainer.className = ''
      console.log({ isFullScreen: this.isFullScreen })
      // wait for css transition and remove zoom
      setTimeout(this.zoomOut.bind(this), 100);
    },

    showFullScreenImage: async function () {
      console.log({ isFullScreen: this.isFullScreen })
      if (this.$fullSizeZoomEl) {
        this.$fullSizeZoomEl.remove();
      }

      this.$fullSizeZoomEl = document.createElement("span");
      this.$fullSizeZoomEl.classList.add(
        "top-0", "left-0",
        "inline-block", "w-full", "h-full",
        "bg-contain", "bg-center", "bg-no-repeat",
        "cursor-zoom-in",
        "transition-all", "duration-300", "ease-out"
      );
      this.fullScreenContainer = document.querySelector('#fullscreen_container')
      this.fullScreenContainer.classList.add(
        "absolute", "top-0", "left-0",
        "h-screen", "z-50",
        "transition-all", "duration-300", "ease-out"


      );

      this.fullSizeZoomSize = this.$fullSizeZoomEl.getBoundingClientRect();
      this.fullSizeImageSize = await this.getImageMeta(
        images[this.activeImage].original
      );

      this.$fullSizeZoomEl.style.backgroundImage = "url('" + images[this.activeImage].original + "')";

      if (this.fullSizeImageSize.width > this.fullSizeZoomSize.width || this.fullSizeImageSize.height > this.fullSizeZoomSize.height) {
        this.fullSizeZoomDisabled = false;
      }
      this.fullScreenContainer.append(this.$fullSizeZoomEl);

      this.isFullScreen = true
    },

    updateFullScreenZoom: function (event) {
      let x = event.layerX - event.target.offsetLeft;
      let y = event.layerY - event.target.offsetTop;

      x = -1 * (this.fullSizeImageSize.width - this.fullSizeZoomSize.width) / (this.fullSizeZoomSize.width / x);
      y = -1 * (this.fullSizeImageSize.height - this.fullSizeZoomSize.height) / (this.fullSizeZoomSize.height / y);

      this.$fullSizeZoomEl.style.backgroundPosition = x + "px " + y + "px";
    },

    resetFullScreenZoom: function () {
      this.$fullSizeZoomEl.classList.add("bg-contain", "cursor-zoom-in");
      this.$fullSizeZoomEl.classList.remove("bg-auto", "cursor-zoom-out");
      this.$fullSizeZoomEl.style.backgroundPosition = "center";
    },

    setFullScreenZoom: function () {
      this.$fullSizeZoomEl.classList.remove("bg-contain", "cursor-zoom-in");
      this.$fullSizeZoomEl.classList.add("bg-auto", "cursor-zoom-out");
    },

    showZoom: function () {
      this.zoomIsActive = true;
    },

    hideZoom: function () {
      this.zoomIsActive = false;
    },

    zoomOut: function () {
      if (this.isFullScreen) {
        if (this.fullSizeZoomIsActive) {
          this.resetFullScreenZoom();
        }
        return;
      }
      this.hideZoom();
    },

    zoomIn: async function () {

      if (this.isFullScreen) {
        if (this.fullSizeZoomIsActive) {
          this.setFullScreenZoom();
        }
        return;
      }

      this.showZoom();
      this.$zoomEl.style.backgroundImage = null;
      this.origImgSize = await this.getImageMeta(
        images[this.activeImage].original
      );
      this.previewSize = this.$imageEl.getBoundingClientRect();
      this.zoomSize = this.$zoomEl.getBoundingClientRect();
      this.hideZoom();

      // display origin image
      this.$zoomEl.style.backgroundImage = "url('" + images[this.activeImage].original + "')";

      // original image to preview image ratio
      this.zoomRatio.width = this.origImgSize.width / this.previewSize.width;
      this.zoomRatio.height = this.origImgSize.height / this.previewSize.height;

      // lens size
      this.lensSize = {
        width: this.zoomSize.width / this.zoomRatio.width + 4,
        height: this.zoomSize.height / this.zoomRatio.height + 4
      };
      this.$lensEl.style.width = this.lensSize.width + "px";
      this.$lensEl.style.height = this.lensSize.height + "px";

      this.showZoom();
    },

    zoomMove: function (event) {
      event.stopPropagation();

      if (this.isFullScreen) {
        if (!this.fullSizeZoomDisabled && this.fullSizeZoomIsActive) {
          this.updateFullScreenZoom(event);
        }
        return;
      }

      if (!this.lensSize) {
        return;
      }

      // lens position
      let x = event.layerX - event.target.offsetLeft - this.lensSize.width / 2;
      let y = event.layerY - event.target.offsetTop - this.lensSize.height / 2;
      x = x > 0 ? x : 0;
      y = y > 0 ? y : 0;
      x =
        x + this.lensSize.width > this.previewSize.width
          ? this.previewSize.width - this.lensSize.width
          : x;
      y =
        y + this.lensSize.height > this.previewSize.height
          ? this.previewSize.height - this.lensSize.height
          : y;

      // translate (with transform-gpu class) has better performance than absolute positioning
      this.$lensEl.style.webkitTransform = "translateX(" + x + "px) translateY(" + y + "px)";

      // zoom image position
      this.$zoomEl.style.backgroundPosition = (x * -this.zoomRatio.width) + "px " + (y * -this.zoomRatio.height) + "px";
    },

    toggleFullSizeZoom: function (event) {
      this.fullSizeZoomIsActive
        ? this.closeFullSizeZoom(event)
        : this.showFullSizeZoom(event);
    },

    closeFullSizeZoom: function (event) {
      this.fullSizeZoomIsActive = false;
      this.resetFullScreenZoom();
    },

    showFullSizeZoom: function (event) {
      this.fullSizeZoomIsActive = true;
      this.setFullScreenZoom();
    },

    getImageMeta(url) {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = (err) => reject(err);
        img.src = url;
      });
    }
  };
};
