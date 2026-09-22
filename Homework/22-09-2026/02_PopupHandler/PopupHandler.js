/*
Захотелось оптимизировать код, используя классы и методы. Может быть потому что предыдущее задание было на 
эту тему)). Подумал, что будет не рационально навешивать обработчики на документ до того как будет создан экземпляр класса. И заранее проверить, что элементы существуют еще на этапе инициализации.
*/

class PopupHandler {
  constructor(
    trigger,
    popupSelector = "[class^='popup']",
    activeClass = "is-active",
  ) {
    this.document = document;
    this.trigger = trigger;
    this.popup = document.querySelector(popupSelector);
    this.activeClass = activeClass;

    this.init();
  }

  init() {
    if (!this.trigger || !this.popup) {
      return;
    }

    this.document.addEventListener("keydown", (e) => {
      const key = e.key;

      if (key === "Escape") {
        this.popup.classList.remove(this.activeClass);
      }
    });

    this.document.addEventListener("click", (e) => {
      if (e.target === this.popup) {
        this.popup.classList.remove(this.activeClass);
      }
    });
  }

  openPopup() {
    this.trigger.addEventListener("click", () => {
      this.popup.classList.add(this.activeClass);
    });
  }

  closePopup() {
    this.trigger.addEventListener("click", () => {
      this.popup.classList.remove(this.activeClass);
    });
  }
}

// Пример использования
const popup1 = new PopupHandler(
  document.querySelector(".popup-trigger"),
  ".popup-1",
  "is-active",
);
