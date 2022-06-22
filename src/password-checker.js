const logger = require("../logger");

const errors = {
  existence: "password should exist",
  strLength: "password should be longer than 8 characters",
  lowerCase: "password should have at least one lowercase letter",
  upperCase: "password should have at least one uppercase letter",
  digit: "password should have at least have one digit",
  specialCharacter: "password should have at least one special character",
  whitespaceCheck: "password should have at least one whitespace character",
};

const regex = {
  lowerCase: /[a-z]/,
  upperCase: /[A-Z]/,
  digit: /\d/,
  specialCharacter: /[^a-zA-Z\d\s]/,
  whiteSpace: /\s/,
};

const strengthMessages = {
  strong: "strong",
  medium: "medium",
  weak: "weak",
  invalid: "invalid",
};

const functionName = {
  strength: "strength",
  validity: "validity",
};

function errorExecution(errorMessage, functionType, listOfErrors) {
  if (functionType === functionName.strength) {
    listOfErrors.push(errorMessage);
  } else if (functionType === functionName.validity) {
    logger.debug("User password is not valid");
    logger.error(errorMessage);
    throw new Error(errorMessage);
  }
}

function existenceCheck(password, functionType, listOfErrors) {
  if (password === undefined || password.length === 0) {
    errorExecution(errors.existence, functionType, listOfErrors);
  }
}

function lengthCheck(password, functionType, listOfErrors) {
  if (password === undefined || password.length <= 8) {
    errorExecution(errors.strLength, functionType, listOfErrors);
  }
}

function lowerCaseCheck(password, functionType, listOfErrors) {
  if (regex.lowerCase.test(password) === false) {
    errorExecution(errors.lowerCase, functionType, listOfErrors);
  }
}

function upperCaseCheck(password, functionType, listOfErrors) {
  if (regex.upperCase.test(password) === false) {
    errorExecution(errors.upperCase, functionType, listOfErrors);
  }
}

function digitCheck(password, functionType, listOfErrors) {
  if (regex.digit.test(password) === false) {
    errorExecution(errors.digit, functionType, listOfErrors);
  }
}

function specialCharacterCheck(password, functionType, listOfErrors) {
  if (regex.specialCharacter.test(password) === false) {
    errorExecution(errors.specialCharacter, functionType, listOfErrors);
  }
}

function whitespaceCheck(password, functionType, listOfErrors) {
  if (regex.whiteSpace.test(password) === false) {
    errorExecution(errors.whitespaceCheck, functionType, listOfErrors);
  }
}

function passwordIsValid(password) {
  const functionType = functionName.validity;

  if (
    !existenceCheck(password, functionType) &&
    !lengthCheck(password, functionType) &&
    !lowerCaseCheck(password, functionType) &&
    !upperCaseCheck(password, functionType) &&
    !digitCheck(password, functionType) &&
    !specialCharacterCheck(password, functionType) &&
    !whitespaceCheck(password, functionType)
  ) {
    logger.debug("User password is valid");
    return true;
  }
}

function passwordStrength(password) {
  const functionType = functionName.strength;
  const listOfErrors = [];

  existenceCheck(password, functionType, listOfErrors);
  lengthCheck(password, functionType, listOfErrors);
  lowerCaseCheck(password, functionType, listOfErrors);
  upperCaseCheck(password, functionType, listOfErrors);
  digitCheck(password, functionType, listOfErrors);
  specialCharacterCheck(password, functionType, listOfErrors);
  whitespaceCheck(password, functionType, listOfErrors);

  const conditionsMet = 7 - listOfErrors.length;

  if (
    listOfErrors[0] === errors.existence ||
    listOfErrors[0] === errors.strLength
  ) {
    return strengthMessages.invalid;
  }
  if (conditionsMet === 3) {
    return strengthMessages.weak;
  }
  if (conditionsMet >= 4 && conditionsMet < 6) {
    return strengthMessages.medium;
  }
  if (conditionsMet >= 6) {
    return strengthMessages.strong;
  }
}

module.exports = {
  passwordIsValid,
  passwordStrength,
  errors,
  strengthMessages,
};
