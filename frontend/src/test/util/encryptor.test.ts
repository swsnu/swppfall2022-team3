import encryptor from "../../util/encryptor";


describe("encryptor", () => {
  it("should be same after encryption and decryption", () => {
    const data = {
      to: 1,
      from: 2,
    };
    const encryptedData = decodeURIComponent(encryptor.encrypt(data));
    const decryptedData = encryptor.decrypt(encryptedData);
    expect(decryptedData).toEqual(data);
  });
});
