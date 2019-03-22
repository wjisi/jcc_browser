<template>
  <div id="wallet" class="blo">
     <div class="blockDetailTitle">
      <div class="walletHeader">
        <div>{{$t('message.wallet.currentWalletAddress')}}:<span style="color:#06aaf9;padding-left:10px;">#{{wallet}}</span></div>
        <div class="tille" >{{$t('message.wallet.remainingSum')}} <i class="iconfont icon-xiangxiaxianshijiantou tilleIcon"></i></div>
      </div>
      <Ul>
        <li>
          <div><span>SWTC<span>{{walletBalance.SWTC_value}}</span></span>  <span>{{$t('message.wallet.frozen')}}:<span>{{walletBalance.SWTC_frozen}}</span></span></div>
           <div><span>JDBT<span>{{walletBalance.JDBT_value}} </span></span><span>{{$t('message.wallet.Issuer')}}:<span>jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or</span></span></div>
        </li>
         <li>
           <div><span>UST<span>{{walletBalance.UST_value}}</span></span>  <span>{{$t('message.wallet.Issuer')}}:<span>jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or</span></span></div>
           <div><span>JJCC<span>{{walletBalance.JJCC_value}}</span></span>  <span>{{$t('message.wallet.Issuer')}}:<span>jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or</span></span></div>
        </li>
        <li>
           <div><span>CNT<span>{{walletBalance.CNT_value}}</span></span>  <span>{{$t('message.wallet.Issuer')}}:<span>jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or</span></span></div>
           <div><span>JCALL<span>{{walletBalance.JCALL_value}}</span></span>  <span>{{$t('message.wallet.Issuer')}}:<span>jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or</span></span></div>
        </li>
       <li>
          <div><span>ECP<span>{{walletBalance.ECP_value}}</span></span>  <span>{{$t('message.wallet.Issuer')}}:<span>jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or</span></span></div>
           <div><span>JEKT<span>{{walletBalance.JEKT_value}}</span></span>  <span>{{$t('message.wallet.Issuer')}}:<span>jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or</span></span></div>
        </li>
         <li>
          <div><span>JETH<span>{{walletBalance.JETH_value}}</span></span>  <span>{{$t('message.wallet.Issuer')}}:<span>jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or</span></span></div>
           <div><span>JMOAC<span>{{walletBalance.JMOAC_value}}</span></span>  <span>{{$t('message.wallet.Issuer')}}:<span>jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or</span></span></div>
        </li>
         <li>
          <div><span>VCC<span>{{walletBalance.VCC_value}}</span></span>  <span>{{$t('message.wallet.Issuer')}}:<span>jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or</span></span></div>
           <div><span>JSTM<span>{{walletBalance.JSTM_value}}</span></span>  <span>{{$t('message.wallet.Issuer')}}:<span>jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or</span></span></div>
        </li>
      </Ul>
      </div>
    <!-- <div class="previous">
      <i class="iconfont icon-fanhuishangyiyeicon"></i>
      <span @click="goback">返回上一页</span>
    </div> -->
    <div class="title">
      <span class="titleItem">{{$t('message.blockDetailList.transactionmode')}}</span>
      <el-select v-model="selectModeValue"  @change="changeTransactionMode" style="width:100px">
        <el-option v-for="item in transactionMode" :key="item.selectModeValue" :label="item.label" :value="item.selectModeValue"></el-option>
      </el-select>
      <span class="titleItem1">{{$t('message.wallet.transactionCurrency')}}</span>
      <el-select v-model="selectCurrencyValue"  @change="changeTransactionCurrency" style="width:100px">
        <el-option v-for="item in  transactionCurrency" :key="item.selectCurrencyValue" :label="item.label" :value="item.selectCurrencyValue"></el-option>
      </el-select>
       <span class="titleItem1">{{$t('message.blockDetailList.transactiontype')}}</span>
      <el-select v-model="selectTypeValue"  @change="changeTransactionType" style="width:100px">
        <el-option v-for="item in  transactionType" :key="item.selectTypeValue" :label="item.label" :value="item.selectTypeValue"></el-option>
      </el-select>
      <span class="selctionData">{{$t('message.wallet.dateRange')}}
        <el-date-picker v-model="startTime" type="date" value-format="yyyy-MM-dd" :placeholder="$t('message.wallet.startTime')"></el-date-picker>至
        <el-date-picker v-model="endTime" type="date" value-format="yyyy-MM-dd" :placeholder="$t('message.wallet.endTime')"></el-date-picker>
        <span class="sure" @click="selectTimerange">确认</span>
      </span>
    </div>
    <div class="bockList">
      <div class="historicalList">
        <el-table :data="historicalList" style="width:100%" row-class-name="walletrowClass" header-row-class-name="walletHeaderRowclass" :cell-style="cellStyle">
          <div slot="empty" style="font-size:18px;">
            <div v-if="loading" v-loading="true" element-loading-spinner="el-icon-loading" element-loading-text="拼命加载中"></div>
            <div v-else ><img src='../../images/not _found_list.png' /><div>暂无数据</div></div>
          </div>
          <el-table-column prop="type" :label="$t('message.blockDetailList.transactiontype')" id="ellipsis" min-width="10%" align="center" header-align="center">
             <template slot-scope="scope">
              <i class="iconfont"  :class="scope.row.matchFlag" style="font-size:15px;color: #18c9dd;"></i>{{scope.row.type}}
            </template>
          </el-table-column>
          <el-table-column prop="flag" :label="$t('message.blockDetailList.transactionmode')" id="ellipsis" min-width="13%" align="center">
               <template slot-scope="scope">
                 <i class="iconfont"  :class="scope.row.displayDifferentCircles" style="font-size:8px;color: #18c9dd;margin-right:3px;"></i>{{scope.row.flag}}
              </template>
          </el-table-column>
          <el-table-column prop="time" :label="$t('message.blockDetailList.transactiontime')" align="center" min-width="15%">
          </el-table-column>
          <el-table-column prop="transactionAmount"  :label="$t('message.trade.amount')"  id="ellipsis"  align="center"  min-width="14%" >
                <template slot-scope="scope">
                  <span>
                  <span>{{scope.row.transactionAmount.matchPaysValue}}</span>
                  <span>{{scope.row.transactionAmount.matchPaysCurrency}}</span>
                  <span>{{scope.row.transactionAmount.matchGetsValue}}</span>
                  <span>{{scope.row.transactionAmount.matchPaysCurrency}}</span>
                </span>
               </template>
          </el-table-column>
          <el-table-column prop="account" :label="$t('message.wallet.TransactionToHome')" id="ellipsis" align="center" min-width="10%">
            <template slot-scope="scope">
              <span class="hashSpan" @click="jumpDetail(scope.row.hash)">{{scope.row.account}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="hash" :label="$t('message.home.dealhash')" id="ellipsis" align="center" min-width="13%">
           <template slot-scope="scope">
              <span class="hashSpan" @click="jumpDetail(scope.row.hash)">{{scope.row.hash}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
       <ul class="pagination">
        <li>
          <el-pagination background layout="prev, pager, next" :total="total" :page-size="20" :current-page="parseInt(currentPage)" @current-change="handleCurrentChange"></el-pagination>
        </li>
        <li>{{$t('message.blockList.goto')}}
          <div class="inputDiv"><input type="text"  v-model="gopage" @focus="clearGopage"></div>
          {{$t('message.blockList.page')}}
        </li>
        <li>
          <div class="sortButton" @click="jumpSizeChange">{{$t('message.blockList.confirm')}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import {
  querySpecifiedWallet,
  // queryDelegateWallet,
  queryHistoricalWallet
} from "@/js/fetch";
import {
  getStyle,
  getTransactionType,
  getTransactionMode,
  getMatchFlag,
  getType
} from "@/js/utils";
export default {
  name: "wallet",
  // beforeRouteEnter(to, from, next) {
  //   next(vm => {
  //     vm.$store.dispatch("updateCurrentPage", "historyStatus");
  //     vm.$store.dispatch("updateCurrentNode", vm.$route.params.wallet);
  //     vm.getData();
  //     vm.changeTransactionMode();
  //   });
  // },
  // beforeRouteLeave(to, from, next) {
  //   clearInterval(this.timer);
  //   next();
  // },
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      transactionMode: [
        { selectModeValue: 0, label: this.$t("message.wallet.allMode") },
        { selectModeValue: 1, label: this.$t("message.wallet.Purchase") },
        { selectModeValue: 2, label: this.$t("message.wallet.Sale") },
        { selectModeValue: 3, label: this.$t("message.wallet.Income") },
        { selectModeValue: 4, label: this.$t("message.wallet.Expenditure") }
      ],
      transactionCurrency: [
        {
          selectCurrencyValue: "",
          label: this.$t("message.wallet.allCurrency")
        },
        { selectCurrencyValue: "CNT", label: "CNT" },
        { selectCurrencyValue: "ETH", label: "ETH" },
        { selectCurrencyValue: "SWTC-CNY", label: "SWTC" },
        { selectCurrencyValue: "MOAC", label: "MOAC" }
      ],
      transactionType: [
        { selectTypeValue: "", label: this.$t("message.wallet.alltype") },
        {
          selectTypeValue: "OfferCreate",
          label: this.$t("message.wallet.offerCreate")
        },
        {
          selectTypeValue: "OfferAffect",
          label: this.$t("message.wallet.offerAffect")
        },
        {
          selectTypeValue: "fferAffect",
          label: this.$t("message.wallet.offerAffect")
        },
        {
          selectTypeValue: 4,
          label: this.$t("message.wallet.transferaccounts")
        }
      ],
      historicalList: [],
      walletlist: [],
      selectModeValue: this.$t("message.wallet.allMode"),
      selectCurrencyValue: this.$t("message.wallet.allCurrency"),
      selectTypeValue: this.$t("message.wallet.alltype"),
      startTime: "",
      endTime: "",
      timer: "",
      total: 0,
      allpage: 1,
      startup_time: {},
      gopage: 100,
      currentPage: 1,
      clearTitle: "清除定时器",
      loading: false,
      walletBalance: {},
      wallet: "jGVTKPD7xxQhzG9C3DMyKW9x8mNz4PjSoe"
    };
  },
  created() {
    // this.wallet = this.$route.params.wallet;
    this.getBalanceList("jGVTKPD7xxQhzG9C3DMyKW9x8mNz4PjSoe");
    let data = {
      page: this.currentPage || 1,
      size: 20,
      begin: this.startTime || "",
      end: this.endTime || "",
      type: "",
      buyOrSell: "0",
      pair: "",
      wallet: this.wallet
    };
    this.getHistoricalList(data);
  },
  methods: {
    clearGopage() {
      this.gopage = "";
    },
    jumpSizeChange() {
      this.currentPage = this.gopage;
      let data = {
        page: this.currentPage || "0",
        size: 20,
        begin: this.startTime || "",
        end: this.endTime || "",
        type: "",
        buyOrSell: this.selectModeValue || "",
        pair: this.selectCurrencyValue || "",
        wallet: this.wallet || ""
      };
      this.loading = false;
      this.getHistoricalList(data);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      let data = {
        page: this.currentPage,
        size: 20,
        begin: this.startTime,
        end: this.endTime,
        type: "OfferCreate,OfferAffect",
        buyOrSell: this.selectModeValue,
        pair: this.selectCurrencyValue,
        wallet: this.wallet
      };
      this.loading = false;
      this.getHistoricalList(data);
    },
    cellStyle(data) {
      if (data.columnIndex === 0) {
        return getStyle(data.row.server_state);
      }
      return "";
    },
    async getHistoricalList(data) {
      if (this.loading) {
        return;
      }
      this.loading = true;
      // let data = {
      //   page: this.currentPage,
      //   size: 20,
      //   begin: this.startTime,
      //   end: this.endTime,
      //   type: "OfferCreate,OfferAffect",
      //   buyOrSell: this.selectModeValue,
      //   pair: this.selectCurrencyValue,
      //   wallet: this.wallet
      // };
      let res = await queryHistoricalWallet(data);
      console.log(res, "wallet");
      if (res.result === true && (res.code === 0 || res.code === "0")) {
        this.historicalList = this.getHistoryData(res);
      }
      this.loading = false;
    },
    async getBalanceList(wallet) {
      let res = await querySpecifiedWallet(wallet);
      console.log(res, "walletTail");
      // let data = {
      //   page: 0,
      //   size: 20,
      //   wallet: "jGVTKPD7xxQhzG9C3DMyKW9x8mNz4PjSoe"
      // };
      if (res.result === true && (res.code === 0 || res.code === "0")) {
        this.walletBalance = this.getWalletBalanceData(res);
      }
    },
    getWalletBalanceData(res) {
      let list = {};
      if (res && res.data) {
        res = res.data;
        list = {
          SWTC_value: this.displayDefaultValues(res.SWTC.value) || "0.0000",
          SWTC_frozen: this.displayDefaultValues(res.SWTC.frozen) || "0.0000",
          JDBT_value:
            this.displayDefaultValues(
              res.JDBT_jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or
            ).value || "0.0000",
          UST_value:
            this.displayDefaultValues(
              res.UST_jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or
            ).value || "0.0000",
          JJCC_value:
            this.displayDefaultValues(
              res.JJCC_jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or
            ).value || "0.0000",
          CNT_value:
            this.displayDefaultValues(
              res.CNT_jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or
            ).value || "0.0000",
          JCALL_value:
            this.displayDefaultValues(
              res.JCALL_jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or
            ).value || "0.0000",
          ECP_value:
            this.displayDefaultValues(
              res.ECP_jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or
            ).value || "0.0000",
          JEKT_value:
            this.displayDefaultValues(
              res.JEKT_jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or
            ).value || "0.0000",
          JETH_value:
            this.displayDefaultValues(
              res.JEKT_jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or
            ).value || "0.0000",
          JMOAC_value:
            this.displayDefaultValues(
              res.JMOAC_jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or
            ).value || "0.0000",
          VCC_value:
            this.displayDefaultValues(
              res.VCC_jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or
            ).value || "0.0000",
          JSTM_value:
            this.displayDefaultValues(
              res.JSTM_jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or
            ).value || "0.0000"
        };
      }
      return list;
    },
    changeTransactionMode() {
      console.log(this.selectModeValue);
      let data = {
        page: this.currentPage || "0",
        size: 20,
        begin: this.startTime || "",
        end: this.endTime || "",
        type: "",
        buyOrSell: this.selectModeValue || "",
        pair: this.selectCurrencyValue || "",
        wallet: this.wallet || ""
      };
      this.loading = false;
      this.getHistoricalList(data);
    },

    changeTransactionCurrency() {
      console.log(this.selectCurrencyValue);
      let data = {
        page: this.currentPage || "0",
        size: 20,
        begin: this.startTime || "",
        end: this.endTime || "",
        type: "",
        buyOrSell: this.selectModeValue || "",
        pair: this.selectCurrencyValue || "",
        wallet: this.wallet || ""
      };
      this.getHistoricalList(data);
    },
    changeTransactionType() {
      let data = {
        page: this.currentPage || "0",
        size: 20,
        begin: this.startTime || "",
        end: this.endTime || "",
        type: "",
        buyOrSell: this.selectModeValue || "",
        pair: this.selectCurrencyValue || "",
        wallet: this.wallet || ""
      };
      this.getHistoricalList(data);
    },
    selectTimerange() {
      let data = {
        page: this.currentPage || "0",
        size: 20,
        begin: this.startTime || "",
        end: this.endTime || "",
        type: "",
        buyOrSell: this.selectModeValue || "",
        pair: this.selectCurrencyValue || "",
        wallet: this.wallet || ""
      };
      this.getHistoricalList(data);
    },
    getHistoryData(res) {
      let i = 0;
      let list = [];
      if (res && res.data && res.data.list.length > 0) {
        for (; i < res.data.list.length; i++) {
          list.push({
            type: getTransactionType(res.data.list[i].type) || "----",
            flag: getTransactionMode(res.data.list[i].flag) || "----",
            time: this.handleHashtime(res.data.list[i].time) || "----",
            transactionAmount: {
              matchPaysCurrency: this.displayDefaultCurrency(
                res.data.list[i].matchPays
              ).currency,
              matchPaysValue: this.displayDefaultValues(
                res.data.list[i].matchPays
              ).value,
              matchGetsCurrency: this.displayDefaultCurrency(
                res.data.list[i].matchGets
              ).currency,
              matchGetsValue: this.displayDefaultValues(
                res.data.list[i].matchGets
              ).value
            },
            account: res.data.list[i].account || "----",
            hash: res.data.list[i].hash || "----",
            matchFlag: getMatchFlag(res.data.list[i].matchFlag) || "",
            displayDifferentCircles: getType(res.data.list[i].flag) || ""
          });
        }
        this.total = res.data.count;
        this.allpage = Math.ceil(this.total / 20);
        this.gopage = this.allpage;
      } else {
        this.total = 0;
        this.allpage = 0;
        this.gopage = 0;
      }
      return list;
    },
    displayDefaultValues(value) {
      if (value) {
        return value;
      } else {
        return { value: undefined };
      }
    },
    displayDefaultCurrency(value) {
      if (value) {
        return value;
      } else {
        return { currency: undefined };
      }
    },
    jumpDetail(hash) {
      this.$router.push({
        name: "tradeDetail",
        params: { hash: hash }
      });
    },
    fillZero(value) {
      if (value < 10) {
        value = "0" + value;
      }
      return value;
    },
    handleHashtime(time) {
      let { fillZero } = this;
      let dateIn = new Date((time + 946684800) * 1000);
      let hashTime = "";
      // fillZero(dateIn.getDate());
      hashTime =
        fillZero(dateIn.getFullYear()) +
        "-" +
        fillZero(dateIn.getMonth() + 1) +
        "-" +
        fillZero(dateIn.getDate()) +
        " " +
        fillZero(dateIn.getHours()) +
        ":" +
        fillZero(dateIn.getMinutes());
      return hashTime;
    }
  }
};
</script>
<style lang="scss" scoped>
#wallet {
  text-align: center;
  min-width: 768px;
  padding: 0 70px;
  padding-bottom: 110px;
  background: #f2f8fc;
  .hashSpan {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #3b3f4c;
    font-size: 14px;
  }
  .hashSpan:hover {
    color: #06aaf9;
    cursor: pointer;
  }
}

.blockDetailTitle {
  text-align: left;
  div {
    display: inline-block;
  }
  .tille {
    display: flex;
    align-items: center;
    color: #18c9dd;
    font-size: 14px;
  }
  .tilleIcon {
    font-size: 14px;
    float: right;
    padding: 4px 0 0 10px;
    color: #18c9dd;
  }
  .walletHeader {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    color: #3e3f45;
    padding: 10px 0;
  }

  ul {
    width: 100%;
    display: flex;
    flex-flow: column;
    border: 2px solid #c1e9f1;
    border-radius: 8px;
    background: #ffffff;
    margin-bottom: 20px;
    li {
      display: flex;
      justify-content: space-between;
      height: 40px;
      line-height: 40px;
      padding: 0 20px;
      white-space: nowrap;
      text-overflow: ellipsis;
      color: #5f5d5d;
      font-size: 14px;
      border-bottom: 1px solid #e0e8ed;
      div {
        display: flex;
        justify-content: space-between;
        flex: 1;
        span:nth-child(1) span {
          margin: 10px;
        }
        span:nth-child(2) span {
          margin: 10px;
        }
      }
      div:nth-child(1) {
        padding-right: 20px;
      }
      div:nth-child(2) {
        border-left: 1px solid #e0e8ed;
        padding-left: 20px;
      }
    }
  }
}
.bockList {
  border: 1px solid #e0e8ed;
}
.title {
  width: 100%;
  text-align: left;
  margin-top: 20px;
  margin-bottom: 20px;
  .titleItem {
    font-size: 16px;
    color: #383a4b;
  }
  .titleItem1 {
    font-size: 16px;
    color: #383a4b;
    padding-left: 10px;
  }
}
.el-select {
  width: 155px;
  margin-left: 10px;
}
#walllet {
  min-width: 940px;
  padding: 0 30px;
  padding-bottom: 110px;
  background: #f9faff;
  .selction {
    padding: 30px 0 20px 0;
    height: 40px;
    line-height: 40px;
    text-align: left;
    font-size: 16px;
    color: #383a4b;
  }
  .interval {
    padding: 0 10px 0;
  }
}
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  font-size: 14px;
  padding-top: 20px;
  padding-bottom: 110px;
  .sortButton {
    border: 1px solid #959595;
    border-radius: 6px;
    height: 36px;
    line-height: 36px;
    width: 50px;
    margin-left: 20px;
    background: #f2f8fc;
    padding: 0 3px;
  }
  li .inputDiv {
    width: 36px;
    height: 36px;
    border: 1px solid #959595;
    display: inline-block;
    margin: 0 10px;
    border-radius: 6px;
  }
  li div input {
    border-radius: 6px;
    width: 36px;
    height: 36px;
    border: 0;
  }
}
.el-select-dropdown__item {
  font-size: 14px;
  color: #565a65;
}
.el-select-dropdown__item:hover {
  background: #f2fbef;
  opacity: 80%;
}
</style>

<style  lang="scss" >
.el-icon-arrow-right {
  font-size: 16px;
}
.el-table__expanded-cell {
  padding: 0px 20px !important;
  padding-top: 16px !important;
  background: #f8f8f8;
  width: 80px !important;
  font-size: 12px;
  .el-form-item:nth-child(odd) {
    width: 60%;
    color: #383a4b;
    overflow: hidden;
    white-space: nowrap;
  }
  .el-form-item:nth-child(even) {
    width: 32%;
    color: #383a4b;
  }
}
.walletHeaderRowclass {
  color: #383a4b;
  font-size: 14px;
  height: 40px;
  // th {
  //   border-right: 1px solid #e0e8ed;
  // }
  // th:nth-child(n + 8) {
  //   border-right: 0px;
  // }
}
#wallet .walletrowClass {
  font-size: 12px;
  height: 40px;
  // td {
  //   border-right: 1px solid #e0e8ed;
  // }
  // td:nth-child(n + 8) {
  //   border-right: 0px;
  // }
}
.el-picker-panel {
  width: 330px;
  height: 348px;
}
.selctionData {
  right: 0;
  color: #383a4b;
  font-size: 16px;
  display: inline-block;
  float: right;
  overflow: hidden;
  .sure {
    width: 38px;
    height: 38px;
    line-height: 40px;
    border: 1px solid #959595;
    background: #f9faff;
    display: inline-block;
    padding: 0 8px;
    padding-right: 5px;
    border-radius: 6px;
  }
  .sure:hover {
    color: #289ef5;
    border: 1px solid #289ef5;
    cursor: pointer;
  }
  input::-webkit-input-placeholder {
    color: #565a65;
    font-size: 14px;
    position: relative;
    left: 0px;
    top: 3px;
  }
  .el-date-editor {
    text-align: center;
    width: 130px;
    height: 40px;
    line-height: 40px;
    margin: 0 6px 0 6px;
    text-align: left;
    bottom: 1.8px;
  }
}
.el-input__prefix {
  right: 7px;
  bottom: 2px;
  .el-input__icon {
    float: right;
    font-size: 18px;
  }
}
.el-input__inner {
  padding: 0 7px 0 7px !important;
  height: 40px;
}
#wallet .pagination .is-background {
  .el-pager li:not(.disabled).active {
    background: #5769fa;
    border: 0px;
    color: #fff;
  }
  .el-pager li {
    background: #ffffff;
    min-width: 40px;
    height: 40px;
    line-height: 40px;
    margin-right: 10px;
    border-radius: 6px;
    font-size: 14px;
    color: #959595;
    border: 1px solid #959595;
  }
  .btn-next,
  .btn-prev {
    background: #ffffff;
    width: 40px;
    height: 40px;
    line-height: 40px;
    margin-right: 10px;
    border-radius: 6px;
    font-size: 14px;
    color: #959595;
    border: 1px solid #959595;
  }
}
#wallet .el-pager .el-icon-more {
  display: none;
}
.selected span {
  color: #565a65;
  font-size: 14px;
  font-weight: normal;
}
.el-table__expand-icon {
  transform: rotate(90deg);
  margin-right: 10px;
  .el-icon {
    margin-left: -8px;
    margin-top: -8px;
  }
}
.el-table__expand-icon--expanded {
  transform: rotate(-90deg);
}
.el-button {
  border: 0;
  background: none;
  font-size: 12px;
}
</style>