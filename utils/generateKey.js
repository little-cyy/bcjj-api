const NodeRSA = require("node-rsa");

/**
 * 生成 RSA 公私钥对
 * @return {Object} { publicKey, privateKey }
 */
const generateKey = () => {
  const key = new NodeRSA({ b: 1024 });
  const privateKey = key.exportKey("pkcs1-private");
  const publicKey = key.exportKey("pkcs1-public-pem");
  return { publicKey, privateKey };
};

/**
 * 使用公钥进行加密，加密出错会抛出异常
 * @param {any} data 需要加密的数据，会使用 JSON.stringify 序列化
 * @param {string} publicKey
 * @return {string} 加密后的密文
 */
const encrypt = (data, publicKey = process.env.RSA_PUBLIC_KEY) => {
  try {
    const key = new NodeRSA(publicKey, "public");
    return key.encrypt(data, "base64");
  } catch (error) {
    return false;
  }
};

/**
 * 使用私钥进行解密，解密出错会抛出异常
 * @param {string} secretText 密文
 * @param {string} privateKey 私钥
 * @return {String} 解密后的明文，会使用 JSON.parse 反序列化
 */
const decrypt = (secretText, privateKey = process.env.RSA_PRIVATE_KEY) => {
  try {
    const keyRSA = new NodeRSA(privateKey, "private", {
      encryptionScheme: "pkcs1",
    });
    // By default it will use the node crypto library with the CVE
    keyRSA.setOptions({ environment: "browser" });
    return keyRSA.decrypt(secretText, "utf8");
  } catch (error) {
    return false;
  }
};

module.exports = { generateKey, encrypt, decrypt };
