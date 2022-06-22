const { passwordIsValid, errors } = require("../src/password-checker.js");

describe("The paswordIsValid function should check that a password", () => {
  it("exists", () => {
    expect(function () {
      passwordIsValid("");
    }).toThrow(new Error(errors.existence));
  });
  it("exists", () => {
    expect(function () {
      passwordIsValid();
    }).toThrow(new Error(errors.existence));
  });
  it("has no less than 8 characters", () => {
    expect(function () {
      passwordIsValid("1234567");
    }).toThrow(new Error(errors.strLength));
  });
  it("has at least one lowercase letter", () => {
    expect(function () {
      passwordIsValid("1234567AB");
    }).toThrow(new Error(errors.lowerCase));
  });
  it("has at least one uppercase letter", () => {
    expect(function () {
      passwordIsValid("1234567ab");
    }).toThrow(new Error(errors.upperCase));
  });
  it("has at least one digit", () => {
    expect(function () {
      passwordIsValid("ABCDef j@");
    }).toThrow(new Error(errors.digit));
  });
  it("has at least one special character", () => {
    expect(function () {
      passwordIsValid("ABCDef312");
    }).toThrow(new Error(errors.specialCharacter));
  });
  it("has at least one whitespace character", () => {
    expect(function () {
      passwordIsValid("ABCDef31@");
    }).toThrow(new Error(errors.whitespaceCheck));
  });
  it("returns true if all the conditions are met", () => {
    expect(passwordIsValid("ABCDef31@ ")).toEqual(true);
  });
});
