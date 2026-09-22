const defaultOptions = {
  percent: 0,
  repeat: 0,
  ease: "none",
  duration: 0.4,
};

export const clearXPosition = (target) =>
  gsap.to(target, {
    xPercent: defaultOptions.percent,
    repeat: defaultOptions.repeat,
    ease: defaultOptions.ease,
    duration: defaultOptions.duration,
  });

export const clearYPosition = (target) =>
  gsap.to(target, {
    yPercent: defaultOptions.percent,
    repeat: defaultOptions.repeat,
    ease: defaultOptions.ease,
    duration: defaultOptions.duration,
  });

export const moveXPosition = ({
  target,
  percent = 120,
  repeat = defaultOptions.repeat,
  ease = defaultOptions.ease,
  duration = 0.3,
}) =>
  gsap.to(target, {
    xPercent: percent,
    repeat: repeat,
    ease: ease,
    duration: duration,
  });

export const moveYPosition = ({
  target,
  percent = -120,
  repeat = defaultOptions.repeat,
  ease = defaultOptions.ease,
  duration = 0.3,
}) =>
  gsap.to(target, {
    yPercent: percent,
    repeat: repeat,
    ease: ease,
    duration: duration,
  });

// ===============================================

function init(origin, destination, direction, trigger) {
  // ?trigger не используется? Можно удалить
  const isDesktopMedia = window.matchMedia("(min-width: 1200px)").matches;

  // Часто повторяющиеся DOM-селекторы можно вынести в переменные
  const cta = document.querySelector(".cta");
  const img = document.querySelector(".img");
  const block = document.querySelector(".block");
  const grid = document.querySelector(".grid");
  const container = document.querySelector(".container");
  const mobileText = document.querySelector(".mobile-text");

  // Объединяем ветки с одинаковым условием
  if (!isDesktopMedia) {
    // Логика для мобильной версии
    if (origin.index == 0 && direction == "down") {
      moveXPosition({ target: cta, percent: -120 });
      moveXPosition({ target: img });
    } else if (origin.index == 1 && direction == "up") {
      clearXPosition(cta);
      clearXPosition(img);
    }

    if (origin.index == 1 && direction == "down") {
      moveXPosition(grid);
    } else if (origin.index == 2 && direction == "up") {
      clearXPosition(grid);
    }

    if (origin.index == 2 && direction == "down") {
      moveXPosition(container);
      moveXPosition(mobileText);
    } else if (origin.index == 3 && direction == "up") {
      clearXPosition(container);
      clearXPosition(mobileText);
    }
  } else {
    // Логика для десктопной версии
    if (destination.index == 0 && direction == "up") {
      clearXPosition(cta);
      clearXPosition(img);
      clearYPosition(block);
      clearXPosition(grid);
    }

    if (origin.index == 0 && direction == "down") {
      moveYPosition({ target: block });
      destination.item.classList.add("bg");
    } else if (origin.index == 1 && direction == "up") {
      clearYPosition(block);
      origin.item.classList.remove("bg");
    }

    if (origin.index == 2 && direction == "up") {
      destination.item.classList.add("bg");
    }
  }
}
