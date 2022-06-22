const {
  passwordStrength,
  strengthMessages,
} = require("../src/password-checker.js");

describe("The paswordStrength function should check that a password", () => {
  it("exists", () => {
    expect(passwordStrength("")).toEqual(strengthMessages.invalid);
  });
  it("exists", () => {
    expect(passwordStrength()).toEqual(strengthMessages.invalid);
  });
  it("is has no less than 8 characters", () => {
    expect(passwordStrength("12")).toEqual(strengthMessages.invalid);
  });
  it("that meets only 3 conditions is considered 'weak'", () => {
    expect(passwordStrength("123456789")).toEqual(strengthMessages.weak);
  });
  it("that meets between 4 or 5 conditions is considered 'medium'", () => {
    expect(passwordStrength("123456ABC")).toEqual(strengthMessages.medium);
  });
  it("that meets 6 or 7 conditions is considered 'strong'", () => {
    expect(passwordStrength("1234ABab@")).toEqual(strengthMessages.strong);
  });
});
