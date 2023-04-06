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

export const checkValuesSelectedStageThree = () => {
  let result = false;
  stage_three.forEach((value) => {
    if (!value.name || !value.value) {
      result = true;
    }
  });
  return result;
};

/* __________ Listeners __________ */
singleAddOnsCard?.forEach((card, index) => {
  card.addEventListener("click", () => HandleClickAddOns(index));
});
