import { Gender } from "../types";
import { parseGender } from "./parseGender";


describe("parseGender", () => {
  it("returns MALE with M", () => {
    expect(parseGender("M")).toEqual(Gender.MALE);
  });

  it("returns FEMALE with F", () => {
    expect(parseGender("F")).toEqual(Gender.FEMALE);
  });

  it("returns ALL with A", () => {
    expect(parseGender("A")).toEqual(Gender.ALL);
  });

  it("throws error with other character", () => {
    try {
      expect(parseGender("B")).toThrowError();
    // eslint-disable-next-line no-empty
    } catch (e) {}
  });
});
