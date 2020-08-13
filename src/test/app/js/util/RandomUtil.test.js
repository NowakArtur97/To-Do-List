import RandomUtil from "../../../../main/app/js/util/RandomUtil";

test("when get random number should return number between scope", () => {
  const randomValue = RandomUtil.getRandomNumber(1, 5);
  expect(randomValue).toBeDefined();
  expect(randomValue).toBeGreaterThanOrEqual(1);
  expect(randomValue).toBeLessThanOrEqual(5);
  expect(randomValue).not.toBeNaN();
});

test("when get random number without arguments should return NaN", () => {
  const randomValue = RandomUtil.getRandomNumber();
  expect(randomValue).toBeNaN();
});

test("when get random number without all arguments should return NaN", () => {
  const randomValue = RandomUtil.getRandomNumber(2);
  expect(randomValue).toBeNaN();
});
