const IP2Region = require("ip2region").default;
const useragent = require("useragent");

/**
 * @param {ip}
 * @returns  {province,city}
 * @description    根据ip获取省份，城市
 */
const getAddressByIp = (ip) => {
  if (!ip) return "";
  const query = new IP2Region();
  const { province, city } = query.search(ip);
  return { province, city };
};

/**
 * @param {req.headers["user-agent"]} 未处理的浏览器信息
 * @returns  {Agent} 解析后的浏览器信息
 * @description    解析浏览器信息
 */
const getUserAgent = (agent) => {
  return useragent.parse(agent);
};

module.exports = {
  getAddressByIp,
  getUserAgent,
};
