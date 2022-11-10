import { getCode } from "./verification";


describe("verification", () => {
  it("returns verification code", () => {
    Object.defineProperty(window, "crypto", {
      value: { getRandomValues: jest.fn().mockReturnValue(0) },
      writable: true,
    });
    const code = getCode();
    expect(code).toBe("AAAAAA");
  });
});
