import {PitapatStatus, User} from "../types";
import { Pitapat} from "../types";

export function getPitapatStatus(user: User, myKey: number, pitapats: Pitapat[]): PitapatStatus {
  const sended = pitapats.filter((p) => (p.from === myKey) && (p.to === user?.key)).length > 0;
  const received = pitapats.filter((p) => (p.from === user?.key) && (p.to === myKey)).length > 0;
  if (sended && received) { return PitapatStatus.MATCHED; }
  else if (sended) { return PitapatStatus.SENT; }
  else if (received) { return PitapatStatus.RECEIVED; }
  else { return PitapatStatus.NONE; }
}
