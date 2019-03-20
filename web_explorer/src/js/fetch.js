import axios from 'axios';
import { getUUID } from "./utils";
import store from 'store';

const service = axios.create({
  withCredentials: true,
  timeout: 30000
})
const resSuccess = (res) => {
  let response = {};
  if (res.status === 200) {
    let {
      data
    } = res;
    if (data.code === '0') {
      response.result = true;
      response.data = data.data;
      response.code = data.code;
    } else {
      response.result = false;
      response.data = res.data;
      response.code = data.code;
      response.msg = data.msg
    }
    return response
  }
  return {
    result: false,
    msg: res.statusText
  }
}

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
  return resSuccess(res);
}

/** get last six blocks */
export const getlastBlocklist = async () => {
  let res = await service({
    url: getInfoHost() + `/block/new/${getUUID()}`,
    method: "get"
  })
  return resSuccess(res);
}

/** get last six trans */
export const getLatestDeal = async (num = 6) => {
  let res = await service({
    url: getInfoHost() + `/trans/new/${getUUID()}`,
    method: "get"
  })
  return resSuccess(res);
}

/** get  blocks  */
export const getBlocklist = async (data) => {
  let res = await service({
    // url: getInfoHost() + `/block/all/${getUUID()}?p=${(data.page-1)}&s=${data.size}`,
    url: getInfoHost() + '/block/all/' + getUUID() + '?p=' + (data.page - 1) + '&s=' + data.size,
    method: "get"
  })
  return resSuccess(res);
}

/** get blockDetail list by hash
 *  @param {Object}data
 *  {hash,from,to,amount}
 */
export const getBlockDetail = async (hash) => {
  let res = await service({
    url: getInfoHost() + '/hash/detail/' + getUUID() + '?h=' + hash,
    method: "get"
    // url: getInfoHost() + `/blockHASH/?HASH=${(data.hash)}&pageStart=${data.from}&pageEnd=${data.to}&pageSize=${data.amount}`,
    // method: "get"
  })
  return resSuccess(res);
}

/** get last six trans detail */
export const getTranslist = async (data) => {
  let res = await service({
    // url: getInfoHost() + `/block/all/${getUUID()}?p=${(data.page-1)}&s=${data.size}`,
    url: getInfoHost() + '/trans/all/' + getUUID() + '?p=' + (data.page - 1) + '&s=' + data.size,
    method: "get"
  })
  return resSuccess(res);
}

// Balance query for specified Wallet
export const querySpecifiedWallet = async (wallet) => {
  let res = await service({
    url: getInfoHost() + '/wallet/balance/' + getUUID() + '?w=' + wallet,
    method: "get"
  })
  return resSuccess(res);
}

// Current delegate query for specified Wallet
export const queryDelegateWallet = async (data) => {
  let res = await service({
    url: getInfoHost() + '/wallet/offer/' + getUUID() + '?p=' + (data.page - 1) + '&s=' + data.size + '&c=' + data.pair + '&bs=' + data.buyOrSell + '&w=' + data.wallet,
    method: "get"
  })
  return resSuccess(res);
}

// Historical transaction queries for specified wallets
export const queryHistoricalWallet = async (data) => {
  let res = await service({
    // url: getInfoHost() + '/wallet/trans/' + getUUID() + '?p=' + (data.page-1) + '&s=' + data.size ,
    url: getInfoHost() + '/wallet/trans/' + getUUID() + '?p=' + (data.page - 1) + '&s=' + data.size + '&b=' + data.start + '&e=' + data.end + '&t=' + data.type + '&bs=' + data.buyOrSell + '&c=' + data.pair + '&w=' + data.wallet,
    method: "get"
  })
  return resSuccess(res);
}

// query  Wallet Income
export const queryWalletIncome = async (wallet) => {
  let res = await service({
    // url: getInfoHost() + '/wallet/trans/' + getUUID() + '?p=' + (data.page-1) + '&s=' + data.size ,
    url: getInfoHost() + '/wallet/profit/' + getUUID() + '?addr=' + wallet,
    method: "get"
  })
  return resSuccess(res);
}