/* __________ Imports __________ */
import { userInformation } from "./form-information.js";
import {
  changeBillingAndAddOnsMonthlyYearly,
  setBillingAmount,
} from "./form-stage-four.js";

/* __________ Tags __________ */
const monthlyOrYearlyBill = document.querySelectorAll(
  ".month-year-slider-text"
);
const monthYearSlicer = document.querySelector(".month-year-slicer");
const billingCards = document.querySelectorAll(".billing-card");

/* __________ Functions __________ */
const setBillingOption = (index) => {
  const currentBillingOption = document.querySelector(
    ".month-year-slider-text-active"
  );
  currentBillingOption?.classList.remove("month-year-slider-text-active");
  monthlyOrYearlyBill[index].classList.add("month-year-slider-text-active");
};

const HandleClickFormSlicer = () => {
  const currentSliderValue = document.querySelector(
    ".month-year-slicer-active"
  );
  if (!currentSliderValue) {
    monthYearSlicer?.classList.add("month-year-slicer-active");
    setBillingOption(1);
    chageCardBillValue("year");
  } else {
    monthYearSlicer?.classList.remove("month-year-slicer-active");
    setBillingOption(0);
    chageCardBillValue("month");
  }
};

const chageCardBillValue = (value) => {
  const currentBillingAmount = document.querySelectorAll(".billing-amount");
  const addOnsCardAmount = document.querySelectorAll(".add-ons-card-amount");

  if (value === "year") {
    currentBillingAmount?.forEach((card) => {
      const currentValue = card.textContent.split("/")[0].replace("$", "");
      card.classList.remove("display-none");
      card.textContent = `$${currentValue}0/yr`;
    });
    addOnsCardAmount?.forEach((amount) => {
      const currentValue = amount.textContent.split("/")[0].replace("+$", "");
      amount.textContent = `+$${currentValue}0/yr`;
    });
    changeBillingAndAddOnsMonthlyYearly("yearly");
  } else {
    currentBillingAmount?.forEach((card) => {
      const currentValue = card.textContent
        .split("/")[0]
        .replace("$", "")
        .replace("0", "");
      card.classList.add("display-none");
      card.textContent = `$${currentValue}/mo`;
    });
    addOnsCardAmount?.forEach((amount) => {
      const currentValue = amount.textContent
        .split("/")[0]
        .replace("+$", "")
        .replace("0", "");
      amount.textContent = `+$${currentValue}/mo`;
    });
    changeBillingAndAddOnsMonthlyYearly("Monthly");
  }
};

const HandleClickSelectBill = (index) => {
  const currentBillingAmount =
    document.querySelectorAll(".billing-amount")[index].textContent;
  const billingCardTitle = document.querySelectorAll(".billing-card-title")[
    index
  ].textContent;
  const cardSelected = document.querySelector(".card-selected");

  const currentValue = currentBillingAmount.split("/")[0].replace("$", "");
  userInformation.stage_two.name = billingCardTitle;
  userInformation.stage_two.billing = currentValue;

  setBillingAmount(billingCardTitle, currentBillingAmount);

  cardSelected?.classList.remove("card-selected");
  billingCards[index].classList.add("card-selected");
};

/* __________ Listeners __________ */
monthYearSlicer?.addEventListener("click", HandleClickFormSlicer);
billingCards?.forEach((card, index) => {
  card.addEventListener("click", () => HandleClickSelectBill(index));
});
