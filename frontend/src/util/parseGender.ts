import { Gender } from "../types";


export function parseGender(gender: string): Gender {
  if (gender === "M") {
    return Gender.MALE;
  }
  else if (gender === "F") {
    return Gender.FEMALE;
  }
  else if (gender === "A") {
    return Gender.ALL;
  }
  else {
    throw Error("invalid gender string");
  }
}
