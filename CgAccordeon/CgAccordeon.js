class CgAccordeon {
  constructor(selector, options) {
    let defaultOptions = {
      activeClass: 'accordeon--active',
      dataAttribute: 'accordeon',
      topClass: 'accordeon__top',
      bodyClass: 'accordeon__body',
      speed: 300,
    };

    this.$elements = document.querySelectorAll(selector);
    this.options = Object.assign(defaultOptions, options);

    this.#clickHandler();
  }

  #clickHandler() {
    this.$elements.forEach(($element) => {
      $element.querySelector(`.${this.options.topClass}`).addEventListener('click', () => {
        if (this.isOpen($element)) {
          this.close($element);
        } else {
          this.open($element);
        }
      });
    });
  }

  isOpen($element) {
    return $element.classList.contains(`${this.options.activeClass}`) ? true : false;
  }

  open($element) {
    if (
      document.querySelector(
        `.${this.options.activeClass}[data-${this.options.dataAttribute}=${$element.dataset.accordeon}]`
      )
    ) {
      this.close(
        document.querySelector(
          `.${this.options.activeClass}[data-${this.options.dataAttribute}=${$element.dataset.accordeon}]`
        )
      );
    }

    const $elementBody = $element.querySelector(`.${this.options.bodyClass}`);

    $elementBody.style.setProperty('--speed', `${this.options.speed / 1000}s`);
    $elementBody.style.maxHeight = $elementBody.scrollHeight + 'px';
    $element.classList.add(`${this.options.activeClass}`);
  }

  close($element) {
    const $elementBody = $element.querySelector(`.${this.options.bodyClass}`);

    $element.classList.remove(`${this.options.activeClass}`);
    $elementBody.style.maxHeight = null;
  }
}
