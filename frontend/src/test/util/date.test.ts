import { dateToString } from "../../util/date";


describe("date test", () => {

  it("should translate date when 1 digit month and 1 digit day", () => {
    const date = dateToString(new Date("2000-01-01"));
    expect(date).toEqual("2000-01-01");
  });

  it("should translate date when 2 digit month and 2 digit day", () => {
    const date = dateToString(new Date("2000-12-31"));
    expect(date).toEqual("2000-12-31");
  });
});
