import axios from 'axios';
import { getUUID } from "./utils";
import store from 'store';

const service = axios.create({
  withCredentials: true,
  timeout: 30000
})

// server's url and port
const infoHosts = process.env.infoHosts;
const infoPort = process.env.infoPort;

const getInfoHost = () => {
  let uri = "";
  if (process.env.NODE_ENV === "production") {
    let hosts = store.getters.hosts.infoHosts.length === 0 ? infoHosts : store.getters.hosts.infoHosts;
    uri = "https://" + hosts + ":" + infoPort;
  }
  return uri;
}

// get configuration file from server
export const getConfig = async () => {
  let url = window.location.origin + '/static/config/jc_config.json' + '?t=' + new Date().getTime();
  let res = await service({
    url: url,
    method: "get"
  });
  return res
}

/** get last six blocks */
export const getBlocklist = async () => {
  let res = await service({
    url: getInfoHost() + `/block/new/${getUUID()}`,
    method: "get"
  })
  console.log(res)
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

/** get blockDetail list by hash
 *  @param {Object}data
 *  {hash,from,to,amount}
 */
export const getBlockDetail = async (data) => {
  let res = await service({
    url: getInfoHost() + `/blockHASH/?HASH=${(data.hash)}&pageStart=${data.from}&pageEnd=${data.to}&pageSize=${data.amount}`,
    method: "get"
  })
  return res;
}