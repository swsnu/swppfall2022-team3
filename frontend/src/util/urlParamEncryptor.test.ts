import urlParamEncryptor from "./urlParamEncryptor";


describe("urlParamEncryptor", () => {
  it("should be same after encryption and decryption", () => {
    const data = {
      to: 1,
      from: 2,
    };
    const encryptedData = decodeURIComponent(urlParamEncryptor.encrypt(data));
    const decryptedData = urlParamEncryptor.decrypt(encryptedData);
    expect(decryptedData).toEqual(data);
  });
})
