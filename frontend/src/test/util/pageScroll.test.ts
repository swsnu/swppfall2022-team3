import { savePageYPosition, scrollToPrevPosition } from "../../util/pageScroll";


describe("pageScroll", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  afterAll(() => {
    sessionStorage.clear();
  });

  it("savePageYPosition should do nothing when ref.current is empty", () => {
    const urlPath = "";
    savePageYPosition({ current: null }, urlPath);
    expect(sessionStorage.getItem(`prevYOffset-${urlPath}`)).toBe(null);
  });

  it("savePageYPosition should set sessionStorage item", () => {
    const element = document.createElement("div");
    const urlPath = "";
    savePageYPosition({ current: element }, urlPath);
    const savedValue = sessionStorage.getItem(`prevYOffset-${urlPath}`);
    expect(savedValue).toBeTruthy();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    expect(parseInt(savedValue!)).toBe(element.scrollTop);
  });

  it("savePageYPosition should distinguish pitapat list tab (received)", () => {
    const element = document.createElement("div");
    const urlPath = "";
    savePageYPosition({ current: element }, urlPath, true, true);
    const savedValue = sessionStorage.getItem(`prevYOffset-${urlPath}-received`);
    expect(savedValue).toBeTruthy();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    expect(parseInt(savedValue!)).toBe(element.scrollTop);
  });

  it("savePageYPosition should distinguish pitapat list tab (sent)", () => {
    const element = document.createElement("div");
    const urlPath = "";
    savePageYPosition({ current: element }, urlPath, true, false);
    const savedValue = sessionStorage.getItem(`prevYOffset-${urlPath}-sent`);
    expect(savedValue).toBeTruthy();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    expect(parseInt(savedValue!)).toBe(element.scrollTop);
  });

  it("scrollToPrevPosition should set scrollTop", () => {
    const element = document.createElement("div");
    const urlPath = "";
    const prevYOffset = "100";
    sessionStorage.setItem(`prevYOffset-${urlPath}`, prevYOffset);
    scrollToPrevPosition({ current: element }, urlPath);
    expect(element.scrollTop).toBe(parseInt(prevYOffset));
  });

  it("scrollToPrevPosition should distinguish pitapat list tab (received)", () => {
    const element = document.createElement("div");
    const urlPath = "";
    const prevYOffset = "100";
    sessionStorage.setItem(`prevYOffset-${urlPath}-received`, prevYOffset);
    scrollToPrevPosition({ current: element }, urlPath, true, true);
    expect(element.scrollTop).toBe(parseInt(prevYOffset));
  });

  it("scrollToPrevPosition should distinguish pitapat list tab (sent)", () => {
    const element = document.createElement("div");
    const urlPath = "";
    const prevYOffset = "100";
    sessionStorage.setItem(`prevYOffset-${urlPath}-sent`, prevYOffset);
    scrollToPrevPosition({ current: element }, urlPath, true, false);
    expect(element.scrollTop).toBe(parseInt(prevYOffset));
  });
});
