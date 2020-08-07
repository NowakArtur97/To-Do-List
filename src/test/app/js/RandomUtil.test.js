import RandomUtil from "../../../main/app/js/util/RandomUtil";

test("when get random number should return number between scope", () => {
  const randomValue = RandomUtil.getRandomNumber(1, 5);
  console.log(randomValue);
});
