/* __________ Imports __________ */
import { CheckInputFormatStageOne } from "./form-stage-one.js";
import { checkValuesSelectedStageThree } from "./form-stage-three.js";

/* __________ Tags __________ */
const stepNumber = document.querySelectorAll(".step-number");
const sliderSection = document.querySelectorAll(".slider-section");

/* __________ Functions __________ */
export const setSidebarActiveButton = (index) => {
  const stepNumberActive = document.querySelector(".step-number-active");
  stepNumberActive?.classList.remove("step-number-active");

  stepNumber[index]?.classList.add("step-number-active");
};

export const recreateSidebarButton = () => {
  const singleStepContainer = document.querySelectorAll(
    ".single-step-container"
  );
  const stepNumber = document.querySelectorAll(".step-number");

  stepNumber.forEach((button, index) => {
    singleStepContainer[index].removeChild(button);

    const newButton = document.createElement("button");
    newButton.classList.add("step-number");
    newButton.classList.add("finished");
    if (index === 3) newButton.classList.add("step-number-active");
    newButton.textContent = `${index + 1}`;
    newButton.type = "button";

    singleStepContainer[index].insertBefore(
      newButton,
      singleStepContainer[index].firstChild
    );
  });
};

/* __________ Listeners __________ */
stepNumber.forEach((button, index) => {
  button.addEventListener("click", () => {
    if (!CheckInputFormatStageOne()) return;

    if (index === 3 && !checkValuesSelectedStageThree()) {
      setSidebarActiveButton(2);
      sliderSection?.forEach((section) => {
        section.style.transform = `translateX(-220%)`;
      });

      return;
    }

    setSidebarActiveButton(index);
    sliderSection?.forEach((section) => {
      section.style.transform = `translateX(-${index}${index}0%)`;
    });
  });
});
