import { Pitapat, PitapatStatus } from "../types";
import { getPitapatStatus } from "./getPitapatStatus";


const mockPitapats: Pitapat[] = [
  { from: 1, to: 2 },
  { from: 1, to: 3 },
  { from: 2, to: 1 },
];

describe("getPitapatStatus", () => {
  it("returns MATCHED when both sent and received", () => {
    expect(getPitapatStatus(1, 2, mockPitapats)).toEqual(PitapatStatus.MATCHED);
  });

  it("returns SENT when only sent", () => {
    expect(getPitapatStatus(1, 3, mockPitapats)).toEqual(PitapatStatus.SENT);
  });

  it("returns RECEIVED when only received", () => {
    expect(getPitapatStatus(3, 1, mockPitapats)).toEqual(PitapatStatus.RECEIVED);
  });
});
