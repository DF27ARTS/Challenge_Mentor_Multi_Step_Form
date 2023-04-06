/* __________ Listeners __________ */
import {
  userInformation,
  validateInputFormat,
  validateInformationPovided,
  validateFormStageOne,
} from "./form-information.js";

/* __________ Variables __________ */
let validateInputsOnChange = false;

/* __________ Tags __________ */
const singleInputContainer = document.querySelectorAll(
  ".single-input-container"
);
const singleInput = document.querySelectorAll(".single-input");

/* __________ Funtions __________ */
const HandleChange = ({ target }) => {
  const { value, name } = target;
  userInformation.stage_one[name] = value;
  if (validateInputsOnChange) {
    singleInput.forEach((input, index) => {
      singleInputContainer[index].classList.toggle(
        "field-required",
        validateInformationPovided(input.name) === false ||
          validateInputFormat(input.name) === false
          ? true
          : false
      );
    });
  }
};

const activeErrorAnimation = () => {
  const setAnimationError = (array) => {
    array.forEach((input, index) => {
      singleInputContainer[index].classList.toggle(
        "field-required",
        validateInformationPovided(input.name) &&
          validateInputFormat(input.name)
          ? false
          : true
      );
    });

    const fieldRequired = document.querySelector(".field-required");
    fieldRequired?.classList.add("active-error-animation");

    setTimeout(() => {
      fieldRequired?.classList.remove("active-error-animation");
    }, 200);
  };

  setAnimationError(singleInput);
};

export const CheckInputFormatStageOne = () => {
  const result = validateFormStageOne(singleInput);

  if (result === false) {
    activeErrorAnimation();
    validateInputsOnChange = true;
    return false;
  } else {
    return true;
  }
};

/* __________ Listeners __________ */
singleInput?.forEach((input) => {
  input.addEventListener("change", HandleChange);
});
