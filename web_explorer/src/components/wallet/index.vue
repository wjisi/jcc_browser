<template>
  <div id="wallet" class="blo">
     <div class="blockDetailTitle">
      <div class="walletHeader">
        <div>{{$t('message.wallet.currentWalletAddress')}}:<span style="color:#06aaf9;padding-left:10px;">{{wallet}}</span></div>
        <div class="tille" >{{$t('message.wallet.remainingSum')}} <i class="iconfont icon-xiangxiaxianshijiantou tilleIcon"></i></div>
      </div>
      <Ul v-show="!isEmptyObject(walletBalance)">
        <li>
          <div><span>SWTC<span>{{walletBalance.SWTC_value}}</span></span> <span>{{$t('message.wallet.frozen')}}:<span>{{walletBalance.SWTC_frozen}}</span></span></div>
          <div><span>JDBT<span>{{walletBalance.JDBT_value}}</span></span> <span>{{$t('message.wallet.Issuer')}}:<span>jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or</span></span></div>
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
      <Ul v-show="isEmptyObject(walletBalance)">
        <div v-if="loading"  style="height:80px;width:100%" v-loading="true" element-loading-spinner="el-icon-loading" element-loading-text="拼命加载中"></div>
        <div v-else  style="height:80px;width:100%;text-align:center;line-height:80px;color: #909399;">{{$t('message.home.notransaction')}}</div>
      </Ul>
      </div>
    <!-- <div class="previous">
      <i class="iconfont icon-fanhuishangyiyeicon"></i>
      <span @click="goback">返回上一页</span>
    </div> -->
    <div class="title">
       <span class="titleItem1">{{$t('message.blockDetailList.transactiontype')}}</span>
      <el-select v-model="selectTypeValue"  @change="changeTransactionType" style="width:100px">
        <el-option v-for="item in  transactionType" :key="item.selectTypeValue" :label="item.label" :value="item.selectTypeValue"></el-option>
      </el-select>
      <span class="titleItem">{{$t('message.blockDetailList.transactionmode')}}</span>
      <el-select v-model="selectModeValue"  @change="changeTransactionMode" style="width:100px">
        <el-option v-for="item in transactionMode" :key="item.selectModeValue" :label="item.label" :value="item.selectModeValue"></el-option>
      </el-select>
      <span class="titleItem1">{{$t('message.wallet.transactionCurrency')}}</span>
      <el-select v-model="base"  @change="changeTransactionCurrency" style="width:100px">
        <el-option v-for="item in  transactionCurrency" :key="item.base" :label="item.baseTitle" :value="item.base"></el-option>
      </el-select>
       <span><i class="iconfont"  icon-jiaoyijineshuliangzhuanhuan></i></span>
      <el-select v-model="selectCurrencyCounterValue"  @change="changeTransactionCounterType" style="width:100px">
        <el-option v-for="item in  transactionCounterType" :key="item.selectCurrencyCounterValue" :label="item.label" :value="item.selectCurrencyCounterValue"></el-option>
      </el-select>
      <span class="selctionData">{{$t('message.wallet.dateRange')}}
        <el-date-picker v-model="startTime" type="date" value-format="yyyy-MM-dd" :placeholder="$t('message.wallet.startTime')" style="width:120px"></el-date-picker>至
        <el-date-picker v-model="endTime" type="date" value-format="yyyy-MM-dd" :placeholder="$t('message.wallet.endTime')" style="width:120px"></el-date-picker>
        <span class="sure" @click="selectTimerange">{{$t('message.blockList.confirm')}}</span>
      </span>
    </div>
    <div class="bockList">
      <div class="historicalList">
        <el-table :data="historicalList" style="width:100%" row-class-name="walletrowClass" header-row-class-name="walletHeaderRowclass" >
          <div slot="empty" style="font-size:18px;">
            <div v-if="loading" v-loading="true" element-loading-spinner="el-icon-loading" element-loading-text="拼命加载中"></div>
            <div style="margin:100px 0;" v-else ><img src='../../images/not _found_list.png' /><div>{{$t('message.home.notransaction')}}</div></div>
          </div>
           <el-table-column prop="matchFlag"  width="30px">
             <template slot-scope="scope">
             <i class="iconfont"  :class="scope.row.matchFlag" style="font-size:15px;color: #18c9dd;"></i>
            </template>
           </el-table-column>
           <el-table-column prop="time" :label="$t('message.blockDetailList.transactiontime')" align="left" header-align="left" width="150px">
          </el-table-column>
          <el-table-column prop="type" :label="$t('message.blockDetailList.transactiontype')" id="ellipsis" width="110px" align="left" header-align="left">
             <template slot-scope="scope">
              <div style="display: flex;align-items: center;"><span :class="scope.row.displayDifferentBg"  style="margin-right:6px;"></span>{{scope.row.type}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="flag" :label="$t('message.blockDetailList.transactionmode')" id="ellipsis" width="100px" align="center">
               <template slot-scope="scope">
                  <span :style="{ color:scope.row.displayDifferentColor }">{{scope.row.flag}}</span>
              </template>
          </el-table-column>
          <el-table-column prop="account" :label="$t('message.wallet.TransactionToHome')" id="ellipsis" align="center" min-width="10%">
            <template slot-scope="scope">
              <span class="hashSpan"  @click="jumpWalletPage(scope.row.account)">{{scope.row.account}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="hash" :label="$t('message.home.dealhash')" id="ellipsis" align="center" min-width="13%">
           <template slot-scope="scope">
              <span class="hashSpan" @click="jumpDetail(scope.row.hash)">{{scope.row.hash}}</span>
            </template>
          </el-table-column>
           <el-table-column prop="tradePrice" :label="$t('message.wallet.tradePrice')" id="ellipsis" align="center" min-width="6%">
            <template slot-scope="scope">
               <span v-if="scope.row.judgeTrade === 1">
                   <span>{{divided(scope.row.takerGetsValue,scope.row.takerPaysValue)}}</span>
                   <span>{{cnyTransformCNT(scope.row.takerGetsCurrency)}}</span>
              </span>
               <span v-else-if="scope.row.judgeTrade === 2">
                 <span>{{divided(scope.row.takerPaysValue,scope.row.takerGetsValue)}}</span>
                 <span>{{cnyTransformCNT(scope.row.takerPaysCurrency)}}</span>
                </span>
              <span v-else>---</span>
            </template>
          </el-table-column>
           <el-table-column prop="transactionAmount"  :label="$t('message.trade.amount')"  id="ellipsis"   align="right" header-align="right"  min-width="14%" >
            <template slot-scope="scope">
                <span v-show="scope.row.takerPaysCurrency" class="pays">
                    <span style="color:#18c9dd;">{{scope.row.takerGetsValue}}</span>
                    <span>{{cnyTransformCNT(scope.row.takerGetsCurrency)}}</span>
                    <i class="iconfont icon-jiaoyijineshuliangzhuanhuan "></i>
                    <span style="color:#18c9dd;">{{scope.row.takerPaysValue}}</span>
                    <span>{{cnyTransformCNT(scope.row.takerPaysCurrency)}}</span>
                </span>
                <span v-show="!scope.row.takerPaysCurrency">
                      <span style="color:#18c9dd;">{{scope.row.takerValue}}</span>
                      <span>{{cnyTransformCNT(scope.row.takerCurreny)}}</span>
                </span>
            </template>
          </el-table-column>
          <!-- <el-table-column type="expand" width="35" align="left">
            <template slot-scope="props">
              <el-form label-position="right" inline class="demo-table-expand">
                <el-form-item :label="$t('message.wallet.TransactionToHome')"><span>{{ props.row.account }}</span></el-form-item>
              </el-form>
            </template>
          </el-table-column> -->
          <el-table-column  width="30px"></el-table-column>
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
  // isEmptyObject,
  queryHistoricalWallet
} from "@/js/fetch";
import {
  getTransactionType,
  getTransactionMode,
  getMatchFlag,
  getFlagColor,
  getTypeBg
} from "@/js/utils";
import { BigNumber } from "bignumber.js";
export default {
  name: "wallet",
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
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
          selectTypeValue: "offerCancel",
          label: this.$t("message.wallet.offerCancel")
        },
        {
          selectTypeValue: "Send,Receive",
          label: this.$t("message.wallet.Payment")
        }
      ],
      transactionMode: [
        { selectModeValue: "", label: this.$t("message.wallet.allMode") },
        { selectModeValue: 1, label: this.$t("message.wallet.Purchase") },
        { selectModeValue: 2, label: this.$t("message.wallet.Sale") }
      ],
      transactionCurrency: [
        {
          base: "",
          baseTitle: this.$t("message.wallet.allCurrency")
        },
        { base: "SWTC", baseTitle: "SWTC" },
        { base: "JJCC", baseTitle: "JCC" },
        { base: "JMOAC", baseTitle: "MOAC" },
        { base: "JBIZ", baseTitle: "BIZ" },
        { base: "JSLASH", baseTitle: "SLASH" },
        { base: "JDABT", baseTitle: "DABT" },
        { base: "HJT", baseTitle: "HJT" },
        { base: "JSTM", baseTitle: "STM" },
        { base: "JSNRC", baseTitle: "SNRC" },
        { base: "MYT", baseTitle: "MYT" },
        { base: "JCALL", baseTitle: "CALL" },
        { base: "JEKT", baseTitle: "EKT" },
        { base: "BIC", baseTitle: "BIC" },
        { base: "YUT", baseTitle: "YUT" },
        { base: "JETH", baseTitle: "ETH" },
        { base: "VCC", baseTitle: "VCC" },
        { base: "JCKM", baseTitle: "CKM" }
      ],
      historicalList: [],
      walletlist: [],
      selectModeValue: "",
      base: "",
      selectCurrencyCounterValue: "",
      selectTypeValue: "",
      startTime: "",
      endTime: "",
      timer: "",
      total: 0,
      allpage: 1,
      gopage: 100,
      currentPage: 1,
      loading: false,
      walletBalance: {},
      wallet: "",
      transactionPairs: {},
      defaultTransactionCurrency: {},
      type: "",
      buyOrSell: "",
      pair: ""
    };
  },
  mounted() {
    setTimeout(() => {
      this.transactionPairs = this.$store.getters.transactionPairs;
      // localStorage.setItem("transactionCurrency", this.transactionCurrency);
      this.defaultTransactionCurrency = this.transactionCurrency;
      console.log("交易对：", this.$store.getters.transactionPairs);
    }, 500);
  },
  created() {
    this.wallet = this.$route.query.wallet;
    this.getBalanceList("jGVTKPD7xxQhzG9C3DMyKW9x8mNz4PjSoe");
    this.getHistoricalList();
  },
  computed: {
    transactionCounterType() {
      if (this.selectTypeValue === "Send,Receive") {
        return [
          {
            selectCurrencyCounterValue: "",
            label: this.$t("message.wallet.tradeArea")
          }
        ];
      } else {
        if (this.base === "SWTC") {
          return [
            {
              selectCurrencyCounterValue: "",
              label: this.$t("message.wallet.tradeArea")
            },
            { selectCurrencyCounterValue: "CNY", label: "CNT" },
            { selectCurrencyCounterValue: "ETH", label: "ETH" }
          ];
        } else {
          return [
            {
              selectCurrencyCounterValue: "",
              label: this.$t("message.wallet.tradeArea")
            },
            { selectCurrencyCounterValue: "SWTC", label: "SWTC" },
            { selectCurrencyCounterValue: "CNY", label: "CNT" },
            { selectCurrencyCounterValue: "ETH", label: "ETH" }
          ];
        }
      }
    }
  },
  methods: {
    divided(num1, num2) {
      if (num1 > 0 && num2 > 0) {
        return new BigNumber(num1)
          .dividedBy(new BigNumber(num2))
          .decimalPlaces(10)
          .toNumber();
      } else if (num1 === "0" || num2 === "0") {
        return "0";
      } else {
        return "---";
      }
    },
    clearGopage() {
      this.gopage = "";
    },
    jumpSizeChange() {
      if (this.currentPage !== parseInt(this.gopage)) {
        this.currentPage = this.gopage;
        this.loading = false;
        this.getHistoricalList();
      }
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.loading = false;
      this.getHistoricalList();
    },
    jumpWalletPage(value) {
      if (value && value !== "---") {
        const { href } = this.$router.resolve({
          name: "wallet",
          query: { wallet: value }
        });
        window.open(href, "_blank");
      }
    },
    async getHistoricalList() {
      this.historicalList = [];
      if (this.loading) {
        return;
      }
      this.loading = true;
      let data = {
        page: this.currentPage || 1,
        size: 20,
        begin: this.startTime || "",
        end: this.endTime || "",
        type: this.type || "",
        buyOrSell: this.buyOrSell || "",
        pair: this.pair || "",
        wallet: this.wallet || ""
      };
      console.log(data);
      let res = await queryHistoricalWallet(data);
      console.log(res, "wallet");

      if (res.result === true && (res.code === 0 || res.code === "0")) {
        this.historicalList = this.getHistoryData(res);
      } else {
        this.historicalList = [];
        this.total = 0;
        this.gopage = 0;
      }
      this.loading = false;
    },
    async getBalanceList(wallet) {
      let res = await querySpecifiedWallet(wallet);
      console.log(res, "walletTail");
      if (res.result === true && (res.code === 0 || res.code === "0")) {
        this.walletBalance = this.getWalletBalanceData(res);
      } else {
        this.walletBalance = {};
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
      if (
        this.selectTypeValue === "Send,Receive" ||
        this.selectModeValue === "Send" ||
        this.selectModeValue === "Receive"
      ) {
        this.type = this.selectModeValue;
        this.buyOrSell = "";
      } else {
        this.buyOrSell = this.selectModeValue;
      }
    },
    changeTransactionCurrency() {
      this.judgePairIsTranter();
    },
    changeTransactionCounterType() {
      this.bash = "";
      // this.transactionCurrency = localStorage.getItem("transactionCurrency");
      this.judgePairIsTranter();
      if (this.selectCurrencyCounterValue === "ETH") {
        this.transactionCurrency = this.transactionPairs.JETH;
      } else if (this.selectCurrencyCounterValue === "CNY") {
        this.transactionCurrency = this.transactionPairs.CNY;
      } else if (this.selectCurrencyCounterValue === "SWTC") {
        this.transactionCurrency = this.transactionPairs.SWTC;
      } else {
        this.transactionCurrency = this.defaultTransactionCurrency;
      }
    },
    changeTransactionType() {
      this.selectModeValue = "";
      this.selectCurrencyCounterValue = "";
      this.base = "";
      this.type = this.selectTypeValue;
      if (this.selectTypeValue === "Send,Receive") {
        this.transactionCurrency = this.defaultTransactionCurrency;
        this.transactionMode = [
          { selectModeValue: "", label: this.$t("message.wallet.allMode") },
          {
            selectModeValue: "Receive",
            label: this.$t("message.wallet.Receive")
          },
          {
            selectModeValue: "Send",
            label: this.$t("message.wallet.Send")
          }
        ];
      } else {
        this.transactionMode = [
          { selectModeValue: "", label: this.$t("message.wallet.allMode") },
          {
            selectModeValue: 1,
            label: this.$t("message.wallet.Purchase")
          },
          { selectModeValue: 2, label: this.$t("message.wallet.Sale") }
        ];
      }
    },
    judgePairIsTranter() {
      if (this.selectTypeValue === "Send,Receive") {
        this.pair = this.base;
      } else {
        this.pair = `${this.base}-${this.selectCurrencyCounterValue}`;
        if (this.pair === "-") {
          this.pair = "";
        }
      }
    },
    isEmptyObject(obj) {
      for (let name in obj) {
        return false;
      }
      return true;
    },
    selectTimerange() {
      console.log(this.startTime);
      this.getHistoricalList();
    },
    judgeTransferFailure(value) {
      if (!value) {
        return "zhuanzhangshiba";
      }
    },
    getHistoryData(res) {
      let i = 0;
      let list = [];
      if (res && res.data && res.data.list.length > 0) {
        for (; i < res.data.list.length; i++) {
          list.push({
            type:
              this.$t(getTransactionType(res.data.list[i].type)) ||
              this.$t("message.wallet.unknown"),
            flag:
              this.$t(getTransactionMode(res.data.list[i].flag)) ||
              this.$t(getTransactionMode(res.data.list[i].type)) ||
              "----",
            time: this.handleHashtime(res.data.list[i].time) || "----",
            displayDifferentColor:
              getFlagColor(res.data.list[i].flag) ||
              getFlagColor(res.data.list[i].type) ||
              "",
            displayDifferentBg: getTypeBg(res.data.list[i].type) || "",
            takerPaysCurrency: this.displayDefaultCurrency(
              res.data.list[i].takerPays
            ).currency,
            takerPaysValue: this.displayDefaultValues(
              res.data.list[i].takerPays
            ).value,
            takerGetsCurrency: this.displayDefaultCurrency(
              res.data.list[i].takerGets
            ).currency,
            takerGetsValue:
              this.displayDefaultValues(res.data.list[i].takerGets).value ||
              "----",
            takerCurreny: this.displayDefaultCurrency(res.data.list[i].amount)
              .currency,
            takerValue:
              this.displayDefaultValues(res.data.list[i].amount).value ||
              "----",
            account: res.data.list[i].account || "----",
            hash: res.data.list[i].hash || "----",
            matchFlag:
              getMatchFlag(res.data.list[i].matchFlag) ||
              getMatchFlag(this.judgeTransferFailure(res.data.list[i].success)),
            judgeTrade: res.data.list[i].flag
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
        return { currency: "undefined" };
      }
    },
    jumpDetail(hash) {
      const { href } = this.$router.resolve({
        name: "tradeDetail",
        query: { hash: hash }
      });
      window.open(href, "_blank");
      // window.open("#/trade/tradeDetail/" + "?hash=" + hash, "_blank");
      // this.$router.push({
      //   name: "tradeDetail",
      //   params: { hash: hash }
      // });
    },
    fillZero(value) {
      if (value < 10) {
        value = "0" + value;
      }
      return value;
    },
    cnyTransformCNT(value) {
      if (value === "CNY") {
        return "CNT";
      } else {
        return value;
      }
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
        fillZero(dateIn.getMinutes()) +
        ":" +
        fillZero(dateIn.getSeconds());
      return hashTime;
    }
  }
};
</script>
<style lang="scss" scoped>
#wallet {
  text-align: center;
  min-width: 1000px;
  padding: 0 70px;
  padding-bottom: 110px;
  background: #f2f8fc;
  .offerAffectBg {
    height: 15.5px;
    width: 15.5px;
    background-image: url("../../images/OfferAffect.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    display: inline-block;
  }
  .offerCancelBg {
    height: 15.5px;
    width: 15.5px;
    background-image: url("../../images/OfferCancel.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    display: inline-block;
  }
  .offerCreateBg {
    height: 15.5px;
    width: 15.5px;
    background-image: url("../../images/OfferCreate.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    display: inline-block;
  }
  .transferBg {
    height: 15.5px;
    width: 15.5px;
    background-image: url("../../images/transfer.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    display: inline-block;
    //  position: absolute;
    // bottom: 20px;
    justify-content: center;
    align-items: center;
  }
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
    font-size: 15px;
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
      min-width: 330px;
      border-bottom: 1px solid #e0e8ed;
      div {
        // min-width: 280px;
        display: flex;
        justify-content: space-between;
        flex: 1;
        span span {
          margin-left: 10px;
        }
        span:nth-child(2) {
          // min-width: 290px;
          // display: inline-block;
          white-space: nowrap;
          overflow: hidden;
          // margin-left: 20px;
          // background: red;
          text-overflow: ellipsis;
          text-align: right;
        }
      }
      div:nth-child(1) {
        padding-right: 20px;
      }
      div:nth-child(2) {
        border-left: 1px solid #e0e8ed;
        padding-left: 20px;
        //  span:nth-child(1) {
        //   background: red;
        // }
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
// .el-table__expanded-cell {
//   padding: 0px 20px !important;
//   padding-top: 16px !important;
//   background: #f8f8f8;
//   width: 80px !important;
//   font-size: 12px;
//   .el-form-item {
//     width: 320px;
//     color: #383a4b;
//     overflow: hidden;
//     display: flex;
//     justify-content: flex-start;
//     align-items: center;
//     white-space: nowrap;
//     margin-left: 10px;
//   }
// }
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
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
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
  .sortButton:hover {
    color: #289ef5;
    border: 1px solid #289ef5;
    cursor: pointer;
  }
  li .inputDiv {
    width: 36px;
    height: 36px;
    border: 1px solid #959595;
    display: inline-block;
    margin: 0 10px;
    border-radius: 6px;
    input[type="text"],
    input[type="password"],
    textarea {
      text-indent: 0px;
      text-align: center;
    }
  }
  li div input {
    border-radius: 6px;
    width: 36px;
    height: 36px;
    border: 0;
  }
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
    // bottom: 1.8px;
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