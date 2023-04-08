/* __________ User Information __________ */
export const userInformation = {
  stage_one: {
    name: "",
    email: "",
    phone: "",
  },
  stage_two: {
    name: "Arcade",
    billing: "$9/mo",
  },
  stage_three: [
    {
      name: "Online service",
      value: "+$1/mo",
    },
    {
      name: "Larger storage",
      value: "+$2/mo",
    },
    {
      name: "",
      value: "",
    },
  ],
};

/* __________ Functions __________ */
export const validateInformationPovided = (property) => {
  const stageOne = userInformation.stage_one;
  return stageOne[property] ? true : false;
};

export const validateInputFormat = (property) => {
  const validations = {
    NAME: /^[a-zA-Z\s]+$/,
    EMAIL: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    PHONE: /^\+(?:[0-9] ?){6,14}[0-9]$/,
  };

  const stageOne = userInformation.stage_one;
  return validations[property.toUpperCase()].test(stageOne[property]);
};

export const validateFormStageOne = (array) => {
  const stageOne = userInformation.stage_one;
  const validations = {
    NAME: /^[a-zA-Z\s]+$/,
    EMAIL: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    PHONE: /^\+(?:[0-9] ?){6,14}[0-9]$/,
  };

  const checkSingleInput = (name) => {
    if (
      stageOne[name] &&
      validations[name.toUpperCase()].test(stageOne[name])
    ) {
      return true;
    } else {
      return false;
    }
  };

  let value =
    checkSingleInput(array[0].name) &&
    checkSingleInput(array[1].name) &&
    checkSingleInput(array[2].name);

  return value;
};
