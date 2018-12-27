import axios from 'axios';
// import store from 'store';

const service = axios.create({
  withCredentials: true,
  timeout: 30000
})

// server's url and port
const infoHosts = process.env.infoHosts
const infoPort = process.env.infoPort

const getInfoHost = () => {
  let uri = "";
  if (process.env.NODE_ENV === "production") {
    let host = infoHosts[Math.floor(Math.random() * infoHosts.length)];
    uri = "https://" + host + ":" + infoPort;
  }
  return uri;
}

/** get all block list
 * @param {number} num (amount of blocks want to get)
 *  */
export const getBlocklist = async (num = 6) => {
  let res = await service({
    url: getInfoHost() + `/newblocks?number=${parseInt(num)}`,
    method: "get"
  })
  return res;
}

/** get block list by date
 *  @param {Object}data
 *  {date,from,to,amount}
 */
export const getDayBlocklist = async (data) => {
  let res = await service({
    url: getInfoHost() + `/dayBlocks/?day=${data.date}&pageStart=${data.from}&pageEnd=${data.to}&pageSize=${data.amount}`,
    method: "get"
  })
  return res;
}
/**
 * get Latest Deal
 * @param {num} num (amount of Deal want to get)
 */
export const getLatestDeal = async (num = 6) => {
  let res = await service({
    url: getInfoHost() + `/Hash?new=${parseInt(num)}`,
    method: "get"
  })
  return res;
}