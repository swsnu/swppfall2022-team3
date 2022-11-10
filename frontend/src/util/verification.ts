export function getCode() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < 6; i++) {
    const random = (window.crypto.getRandomValues(new Uint32Array(1))[0] / 4294967296) * charactersLength;
    result += characters.charAt(Math.floor(random));
  }
  return result;
}
