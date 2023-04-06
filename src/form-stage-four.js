/* __________ Imports ___________ */
import { userInformation } from "./form-information.js";

/* __________ Tags ___________ */
const containerConfirmDataTwo = document.querySelector(
  ".container-confirm-data-two"
);
const totalText = document.querySelector(".total-text");
const totalAmount = document.querySelector(".total-amount");

const billSelected = document.querySelector(".bill-selected");
const totalBilAmount = document.querySelector(".total-bill-amount");

const changeLink = document.querySelector(".change-link");

/* __________ User Information ___________ */
const { stage_three, stage_two } = userInformation;

/* __________ Set Add Ons on the Element ___________ */
stage_three.forEach((object) => {
  if (object.name) {
    const mainDiv = document.createElement("div");
    mainDiv.className = "container-confirm-add-ons";
    mainDiv.setAttribute("area-add-ons", `${object.name}`);

    const secondDiv = document.createElement("div");
    secondDiv.className = "confirm-add-ons-text";
    secondDiv.textContent = object.name;
    mainDiv.appendChild(secondDiv);

    const thirdDiv = document.createElement("div");
    thirdDiv.className = "confirm-add-ons-amount";
    thirdDiv.textContent = object.value;
    mainDiv.appendChild(thirdDiv);

    containerConfirmDataTwo.appendChild(mainDiv);
  }
});

/* __________ Function ___________ */
export const setNewChild = (name, value = null, create) => {
  if (create) {
    const mainDiv = document.createElement("div");
    mainDiv.className = "container-confirm-add-ons";
    mainDiv.setAttribute("area-add-ons", `${name}`);

    const secondDiv = document.createElement("div");
    secondDiv.className = "confirm-add-ons-text";
    secondDiv.textContent = name;
    mainDiv.appendChild(secondDiv);

    const thirdDiv = document.createElement("div");
    thirdDiv.className = "confirm-add-ons-amount";
    thirdDiv.textContent = value;
    mainDiv.appendChild(thirdDiv);

    containerConfirmDataTwo.appendChild(mainDiv);
  } else {
    const currentTag = document.querySelector(`[area-add-ons="${name}"]`);
    containerConfirmDataTwo.removeChild(currentTag);
  }
};

export const setTotalAmount = () => {
  const totalAmountArray = [];
  let billType;
  stage_three.forEach((values) => {
    if (values.value) {
      billType = !billType ? values.value.split("/")[1] : billType;
      totalAmountArray.push(
        parseInt(values.value.split("/")[0].replace("+$", ""))
      );
    }
  });

  totalAmountArray.push(
    parseInt(stage_two.billing.split("/")[0].replace("$", ""))
  );

  if (billType === "yr") {
    totalText.textContent = "Total (per year)";
    totalAmount.textContent = `+$${totalAmountArray.reduce(
      (can, item) => (can += item)
    )}/yr`;
  } else {
    totalText.textContent = "Total (per month)";
    totalAmount.textContent = `+$${totalAmountArray.reduce(
      (amount, item) => (amount += item)
    )}/mo`;
  }
};

export const setBillingAmount = (name, bill) => {
  const plan = bill.split("/")[1];

  billSelected.textContent =
    plan === "yr" ? `${name} (Yearly)` : `${name} (Monthly)`;
  totalBilAmount.textContent = bill;

  setTotalAmount();
};

setTotalAmount();

// change information on alice change in the stage two
export const changeBillingAndAddOnsMonthlyYearly = (value) => {
  /* _____ Change billing from "Monthly" to "Yearly" and vice versa._____ */

  const _billSelected = document.querySelector(".bill-selected");
  const _totalBilAmount = document.querySelector(".total-bill-amount");

  const Bill = _billSelected.textContent.split(" ")[0].trim();
  const Amount = _totalBilAmount.textContent
    .split("/")[0]
    .replace("$", "")
    .trim();

  if (value === "yearly") {
    if (_billSelected) _billSelected.textContent = `${Bill} (Yearly)`;
    if (_totalBilAmount) _totalBilAmount.textContent = `$${Amount}0/yr`;

    stage_two.name = `${Bill} (Yearly)`;
    stage_two.billing = `$${Amount}0/yr`;
  } else {
    if (_billSelected) _billSelected.textContent = `${Bill} (Monthly)`;
    if (_totalBilAmount)
      _totalBilAmount.textContent = `$${Amount.replace("0", "")}/mo`;

    stage_two.name = `${Bill} (Monthly)`;
    stage_two.billing = `$${Amount.replace("0", "")}/mo`;
  }

  /* _____ Change Add Ons from "mo" to "yr" and vice versa._____ */

  const confirmAddOnsAmount = document.querySelectorAll(
    ".confirm-add-ons-amount"
  );

  if (value === "yearly") {
    confirmAddOnsAmount?.forEach((text, index) => {
      const Amount = text.textContent.split("/")[0].replace("+$", "");
      text.textContent = `+$${Amount}0/yr`;
      stage_three[index].value = `+$${Amount}0/yr`;
    });
  } else {
    confirmAddOnsAmount?.forEach((text, index) => {
      const Amount = text.textContent
        .split("/")[0]
        .replace("+$", "")
        .replace("0", "");
      text.textContent = `+$${Amount}/mo`;
      stage_three[index].value = `+$${Amount}/mo`;
    });
  }

  /* _____ Change Total amount from "(per month)" to "(per year)" and vice versa._____ */

  const totalAmountText = document.querySelector(".total-text");
  const totalAmountNumber = document.querySelector(".total-amount");

  const totalText = totalAmountText.textContent.split(" ")[0].trim();
  const totalNumber = totalAmountNumber.textContent
    .split("/")[0]
    .replace("+$", "");

  if (value === "yearly") {
    totalAmountText.textContent = `${totalText} (per year)`;
    totalAmountNumber.textContent = `+$${totalNumber}0/yr`;
  } else {
    totalAmountText.textContent = `${totalText} (per month)`;
    totalAmountNumber.textContent = `+$${totalNumber.replace("0", "")}/mo`;
  }
};

/* __________ Listener ___________ */
changeLink.addEventListener("click", () => {
  document.documentElement?.style.setProperty("--translate-fomrY", `-110%`);
  setSidebarActiveButton(1);
});
