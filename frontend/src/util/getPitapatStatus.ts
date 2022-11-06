import { PitapatStatus , Pitapat } from "../types";


export function getPitapatStatus(myKey: number, otherKey: number, pitapats: Pitapat[]): PitapatStatus {
  const sended = pitapats.filter((p) => (p.from === myKey) && (p.to === otherKey)).length > 0;
  const received = pitapats.filter((p) => (p.from === otherKey) && (p.to === myKey)).length > 0;
  if (sended && received) { return PitapatStatus.MATCHED; }
  else if (sended) { return PitapatStatus.SENT; }
  else if (received) { return PitapatStatus.RECEIVED; }
  else { return PitapatStatus.NONE; }
}
