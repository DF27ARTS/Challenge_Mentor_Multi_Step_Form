/* __________ Imports __________ */
import { userInformation } from "./form-information.js";
import { setNewChild, setTotalAmount } from "./form-stage-four.js";

/* __________ Tags __________ */
const singleAddOnsCard = document.querySelectorAll(".single-add-ons-card");
const addOnsCardAmount = document.querySelectorAll(".add-ons-card-amount");

const { stage_three } = userInformation;

/* __________ Functions __________ */
const HandleClickAddOns = (index) => {
  const value = singleAddOnsCard[index].classList.contains("check-mark-active");
  const areaAmount = addOnsCardAmount[index].getAttribute("area-amount");
  if (value) {
    const NAME = `${areaAmount
      .split("_")
      .join(" ")[0]
      .toUpperCase()}${areaAmount.split("_").join(" ").slice(1)}`;

    singleAddOnsCard[index].classList.remove("check-mark-active");
    userInformation.stage_three[index].name = "";
    userInformation.stage_three[index].value = "";

    setNewChild(NAME, false);
    setTotalAmount();
  } else {
    const NAME = `${areaAmount
      .split("_")
      .join(" ")[0]
      .toUpperCase()}${areaAmount.split("_").join(" ").slice(1)}`;
    const VALUE = addOnsCardAmount[index].textContent.replace("\n", "").trim();

    singleAddOnsCard[index].classList.add("check-mark-active");
    userInformation.stage_three[index].name = NAME;
    userInformation.stage_three[index].value = VALUE;

    setNewChild(NAME, VALUE, true);
    setTotalAmount();
  }
};

const clearAlertMessage = () => {
  const addOnsContainer = document.querySelector(".container-add-ons");
  const alertContainer = document.querySelector(".alert-message");

  setTimeout(() => {
    alertContainer?.classList.remove("active");
    setTimeout(() => {
      if (alertContainer) addOnsContainer?.removeChild(alertContainer);
    }, 500);
  }, 4500);
};

const HandleClickCloseAlertMessage = (e) => {
  e.preventDefault();

  const addOnsContainer = document.querySelector(".container-add-ons");
  const alertContainer = document.querySelector(".alert-message");

  alertContainer?.classList.remove("active");
  setTimeout(() => {
    addOnsContainer.removeChild(alertContainer);
  }, 500);
};

const setAlertMessageSectionThree = () => {
  const addOnsContainer = document.querySelector(".container-add-ons");

  const alertContainer = document.createElement("div");
  alertContainer?.classList.add("alert-message");

  const closeAlertButton = document.createElement("button");
  closeAlertButton?.classList.add("closed-alert-button");
  closeAlertButton.textContent = "+";
  closeAlertButton?.addEventListener("click", (e) =>
    HandleClickCloseAlertMessage(e)
  );

  const alertMessageText = document.createElement("div");
  alertMessageText?.classList.add("alert-message-text");
  alertMessageText.textContent = "Select your add-ons package";

  alertContainer.appendChild(closeAlertButton);
  alertContainer.appendChild(alertMessageText);

  addOnsContainer?.appendChild(alertContainer);

  setTimeout(() => {
    alertContainer?.classList.add("active");
  }, 50);

  clearAlertMessage();
};

export const checkValuesSelectedStageThree = () => {
  let result = false;
  stage_three.forEach((value) => {
    if (value.name || value.value) {
      result = true;
    }
  });

  if (!result) setAlertMessageSectionThree();
  return result;
};

/* __________ Listeners __________ */
singleAddOnsCard?.forEach((card, index) => {
  card.addEventListener("click", () => HandleClickAddOns(index));
});
