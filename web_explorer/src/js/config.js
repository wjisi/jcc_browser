import { getConfig } from "./fetch";
import store from 'store/';

const getConfigs = async () => {
  let res = await getConfig();
  if (!res || !res.data || !res.data.infoHosts) {
    return;
  }
  let hosts = {
    infoHosts: []
  };
  let { infoHosts, transPairs } = res.data;
  if (Array.isArray(infoHosts) && infoHosts.length > 0) {
    hosts.infoHosts = infoHosts;
  }
  store.dispatch("updateHosts", hosts);

  if (transPairs) {
    store.dispatch("updateTransactionPairs", transPairs);
  }
}

export {
  getConfigs
}