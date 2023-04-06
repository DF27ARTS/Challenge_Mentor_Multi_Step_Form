/* __________ Inports __________ */
import { CheckInputFormatStageOne } from "./form-stage-one.js";
import { checkValuesSelectedStageThree } from "./form-stage-three.js";
import { recreateSidebarButton, setSidebarActiveButton } from "./sidebar.js";

/* __________ Tags __________ */
const goBackButton = document.querySelector(".form-go-back");
const goAheadButton = document.querySelector(".form-next-step");
const sliderSection = document.querySelectorAll(".slider-section");
const form = document.querySelector("form");

const ThankYouMessage = document.querySelector(".success-message-container");

const DomElement = document.documentElement;

/* __________ Variables __________ */

export const ThankyouMessageIsOpen = false;

/* __________ Observer __________ */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (entry.target === sliderSection[0]) {
          FormGoBackButton(0, true);
          FormGoAheadButton(1);
          setSidebarActiveButton(0);
        }
        if (entry.target === sliderSection[1]) {
          FormGoBackButton(0);
          FormGoAheadButton(2);
          setSidebarActiveButton(1);
        }
        if (entry.target === sliderSection[2]) {
          FormGoBackButton(1);
          FormGoAheadButton(3);
          setSidebarActiveButton(2);
        }
        if (entry.target === sliderSection[3]) {
          FormGoBackButton(2);
          FormGoAheadButton(4, true, true);
          setSidebarActiveButton(3);
        }
      }
    });
  },
  {
    root: form,
  }
);

sliderSection.forEach((section) => {
  observer.observe(section);
});

/* __________ Functions __________ */

const FormGoBackButton = (value, hideButton = false) => {
  goBackButton?.classList.toggle("display-none", hideButton);

  const HandleClick = () => {
    DomElement?.style.setProperty("--translate-fomrY", `-${value}${value}0%`);
  };

  if (value >= 0) {
    goBackButton?.addEventListener("click", HandleClick, { once: true });
  }
};

const FormGoAheadButton = (
  value,
  confirmButton = false,
  thankYouMessage = false
) => {
  goAheadButton?.classList.toggle("confirm", confirmButton);
  if (confirmButton) {
    goAheadButton.innerText = "Confirm";
  } else {
    goAheadButton.innerText = "Next Step";
  }

  const HandleClick = () => {
    // if (!CheckInputFormatStageOne()) return;
    // if (!checkValuesSelectedStageThree()) return;

    DomElement?.style.setProperty("--translate-fomrY", `-${value}${value}0%`);
  };

  const openThankYouMessage = () => {
    // if (!checkValuesSelectedStageThree()) return;
    recreateSidebarButton();
    ThankYouMessage?.classList.add("success-message-active");
  };

  if (value === 4) {
    changeConfirmButton(openThankYouMessage, "Confirm", "confirm");
  }

  if (value <= 3) {
    changeConfirmButton(HandleClick, "Next Step");
  }
};

const changeConfirmButton = (eventListener, text, className = null) => {
  const formNavigationButtons = document.querySelector(
    ".form-navigation-buttons"
  );
  const formNextStep = document.querySelector(".form-next-step");

  formNavigationButtons.removeChild(formNextStep);

  const button = document.createElement("button");
  button.classList.add("form-next-step");
  if (className) button.classList.add(className);
  button.textContent = text;
  button.addEventListener("click", () => eventListener());

  formNavigationButtons.appendChild(button);
};
