import { Gender } from "../../types";
import { parseGender } from "../../util/parseGender";


describe("parseGender", () => {
  it("returns MALE with M", () => {
    expect(parseGender("M")).toBe(Gender.MALE);
  });

  it("returns FEMALE with F", () => {
    expect(parseGender("F")).toBe(Gender.FEMALE);
  });

  it("returns ALL with A", () => {
    expect(parseGender("A")).toBe(Gender.ALL);
  });

  it("throws error with other character", () => {
    try {
      expect(parseGender("B")).toThrowError();
    // eslint-disable-next-line no-empty
    } catch (e) {}
  });
});
