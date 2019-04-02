<template>
  <div id="transnumDetail" class="blo">
      <div class="walletHeader">
        <div> {{$t('message.trade.number')}}:<span style="color:#06aaf9;padding-left:10px;">#{{transactionNumber}}</span></div>
        <div class="tille" >{{$t('message.trade.narrationAndOthers')}} <i class="iconfont icon-xiangxiaxianshijiantou tilleIcon"></i></div>
      </div>
       <div v-show="!defaultSign" class="walletDetaultLoader" >
        <div v-if="loading"  style="height:80px;width:100%" v-loading="true" element-loading-spinner="el-icon-loading" element-loading-text="拼命加载中"></div>
        <div v-else  style="height:80px;width:100%;text-align:center;line-height:80px;">{{$t('message.home.notransaction')}}</div>
      </div>
      <component  v-show="defaultSign" :transnumkList="transnumkList"  :is="currentView"></component>
     <div style="font-size:18px;color:#909399" v-if="currentView!=='offerCreate'">
       <div class="title">{{$t('message.trade.detail')}}</div>
      <div style="margin:100px 0;">
              <div><i class="iconfont icon-zanwuxiaoguo" style="font-size:200px;"></i></div>
              <div>{{$t('message.home.notradedetail')}}</div>
      </div>
     </div>
    <div class="bockList" v-else>
      <div class="bockListData">
        <div class="title">{{$t('message.trade.detail')}}</div>
        <el-table :data="tradeDetailList" style="width:100%"  row-class-name="transnumDetailrowClass" header-row-class-name="transnumDetailHeaderRowclass">
           <div slot="empty" style="font-size:18px;" >
            <div v-if="loading" v-loading="true" element-loading-spinner="el-icon-loading" element-loading-text="拼命加载中"></div>
            <div style="margin:100px 0;"  v-else ><img src='../../images/not _found_list.png' /><div>{{$t('message.home.notransaction')}}</div></div>
          </div>
          <el-table-column  width="30px" align="center">
              <template slot-scope="scope">
              <i class="iconfont"  :class="scope.row.matchFlag" style="font-size:15px;color: #18c9dd;"></i>
            </template>
          </el-table-column>
          <el-table-column prop="sort"  :label="$t('message.blockDetailList.serialnumber')"  id="ellipsis" width="50px">
          </el-table-column>
          <el-table-column prop="flag"  :label="$t('message.blockDetailList.transactionmode')"  id="ellipsis" align="center"  width="100px">
            <template slot-scope="scope">
                 <span   :style="{ color:displayDifferentColor }">{{scope.row.isOffercancer}}</span>
          </template>
          </el-table-column>
          <el-table-column prop="transactionAmount"  :label="$t('message.trade.amount')"  id="ellipsis"  align="center"  min-width="60%" >
            <template slot-scope="scope">
                <span v-show="scope.row.previous">
                    <span style="color:#18c9dd;">{{scope.row.finalTradePayValue}}</span>
                    <span>{{cnyTransformCNT(scope.row.takerPaysCurrency)}}</span>
                    <i class="iconfont icon-jiaoyijineshuliangzhuanhuan "></i>
                    <span style="color:#18c9dd;">{{scope.row.finalTradeGetValue}}</span>
                    <span>{{cnyTransformCNT(scope.row.takerGetsCurrency)}}</span>
                </span>
                <span v-show="!scope.row.previous">
                    <span style="color:#18c9dd;">{{scope.row.finalTradeGetValue}}</span>
                    <span>{{cnyTransformCNT(scope.row.takerGetsCurrency)}}</span>
                    <i class="iconfont icon-jiaoyijineshuliangzhuanhuan "></i>
                    <span style="color:#18c9dd;">{{scope.row.finalTradePayValue}}</span>
                    <span>{{cnyTransformCNT(scope.row.takerPaysCurrency)}}</span>
                </span>
            </template>
          </el-table-column>
            <el-table-column prop="tradePrice" :label="$t('message.wallet.tradePrice')" id="ellipsis" align="center" min-width="40%">
            <template slot-scope="scope">
               <span v-if="scope.row.judgeTrade=1">
                   <span style="color:#18c9dd;">{{divided(scope.row.finalTradeGetValue,scope.row.finalTradePayValue)}}</span>
                   <span>{{cnyTransformCNT(scope.row.takerGetsCurrency)}}</span>
              </span>
               <span v-else>
                 <span style="color:#18c9dd;">{{divided(scope.row.finalTradePayValue,scope.row.finalTradeGetValue)}}</span>
                 <span>{{cnyTransformCNT(scope.row.takerGetsCurrency)}}</span>
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="account" :label="$t('message.wallet.TransactionToHome')" id="ellipsis" align="center" width="320px">
            <template slot-scope="scope">
              <span class="hashSpan">{{scope.row.account}}</span>
            </template>
          </el-table-column>
          <el-table-column  width="30px"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import { getBlockDetail } from "../../js/fetch";
import offerCancel from "./offerCancel";
import offerCreate from "./offerCreate";
import payment from "./payment";
import { getMatchFlag, getFlagColor } from "../../js/utils";
// queryDelegateWallet,
// queryWalletIncome,
import {
  getTransactionType,
  getTransactionMode,
  SelectTypeComponents
} from "@/js/utils";
import { BigNumber } from "bignumber.js";
export default {
  name: "transnumDetail",
  components: { offerCancel, offerCreate, payment },
  data() {
    return {
      transactionNumber: "",
      loading: false,
      currentView: "",
      transnumkList: { memos: [{ Memo: { MemoData: "" } }] },
      tradeDetailList: [],
      index: 0,
      defaultSign: false,
      displayDifferentColor: "",
      isBuyOrSell: ""
    };
  },
  created() {
    console.log(this.$route.query, "1213");
    this.transactionNumber = this.$route.query.hash;
    this.getData();
  },
  methods: {
    async getData() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      this.hash = this.transactionNumber;
      let res = await getBlockDetail(this.hash);
      console.log(res, "123");
      if (res.result === true && (res.code === 0 || res.code === "0")) {
        this.isBuyOrSell = res.data.flag;
        this.displayDifferentColor = getFlagColor(res.data.flag) || "";
        this.transnumkList = this.handelDealHashData(res);
        this.tradeDetailList = this.handelTradeDetailList(
          res.data.affectedNodes
        );
        this.defaultSign = true;
      } else {
        this.transnumkList = { memos: [{ Memo: { MemoData: "" } }] };
        this.defaultSign = false;
      }
      this.loading = false;
    },
    // clearGopage() {
    //   this.gopage = "";
    // },
    handleData(value) {
      return value;
    },
    divided(num1, num2) {
      if (num1 > 0 && num2 > 0) {
        return new BigNumber(num1)
          .dividedBy(new BigNumber(num2))
          .decimalPlaces(7)
          .toNumber();
      } else if (num1 === "0" || num2 === "0") {
        return "0";
      } else {
        return "---";
      }
    },
    handelTradeDetailList(res) {
      let list = [];
      if (res && res.length > 0) {
        let i = 0;
        for (; i < res.length; i++) {
          list.push({
            sort: i + 1,
            account: res[i].account || "---",
            judgeTrade: res[i].flag,
            matchFlag: getMatchFlag(res[i].matchFlag) || "",
            takerPaysCurrency: this.displayDefaultCurrency(
              res[i].final.takerPays
            ).currency,
            takerGetsCurrency: this.displayDefaultCurrency(
              res[i].final.takerGets
            ).currency,
            finalTradeGetValue: this.judgeFinalTradePrice(
              this.displayDefaultValues(
                this.displayDefaultTakerPays(res[i].previous).takerGets
              ).value,
              this.displayDefaultValues(res[i].final.takerGets).value
            ),
            finalTradePayValue: this.judgeFinalTradePrice(
              this.displayDefaultValues(
                this.displayDefaultTakerPays(res[i].previous).takerPays
              ).value,
              this.displayDefaultValues(res[i].final.takerPays).value
            ),
            flag: this.$t(getTransactionMode(res[i].flag)) || "---",
            previous: res[i].previous || "",
            isOffercancer: this.judgeIsOfferCaner(
              res[i].previous,
              this.isBuyOrSell
            )
          });
        }
      }
      console.log(list, "fanhui");
      return list;
    },
    handelDealHashData(res) {
      let list = {};
      if (res && res.data) {
        res = res.data;
        this.currentView = SelectTypeComponents(res.type);
        list = {
          type:
            this.$t(getTransactionType(res.type)) ||
            this.$t("message.wallet.unknown"),
          block: res.seq || "---",
          account: res.account || "---",
          fee: res.fee || "---",
          amountCurrency:
            this.displayDefaultCurrency(res.amount).currency || "---",
          amountValue: this.displayDefaultValues(res.amount).value,
          time: this.handleHashtime(res.time),
          matchFlag: res.matchFlag,
          matchPaysCurrency:
            this.displayDefaultCurrency(res.matchPays).currency || "---",
          matchPaysValue: this.displayDefaultValues(res.matchPays).value,
          matchGetsCurrency:
            this.displayDefaultCurrency(res.matchGets).currency || "---",
          matchGetsValue: this.displayDefaultValues(res.matchGets).value,
          takerPaysCurrency:
            this.displayDefaultCurrency(res.takerPays).currency || "---",
          takerPaysValue: this.displayDefaultValues(res.takerPays).value,
          takerGetsCurrency:
            this.displayDefaultCurrency(res.takerGets).currency || "---",
          takerGetsValue: this.displayDefaultValues(res.takerGets).value,
          memos: res.memos || [{ Memo: { MemoData: "---" } }],
          flag:
            this.$t(getTransactionMode(res.flag)) ||
            this.$t(getTransactionMode(res.type)) ||
            "----",
          dest: res.dest || "---",
          succ: this.judgeDealSuccess(res.succ) || "---",
          judgeTrade: res.flag
        };
      }
      // this.defaultValue = "---";
      return list;
    },
    cnyTransformCNT(value) {
      if (value === "CNY") {
        return "CNT";
      } else {
        return value;
      }
    },
    judgeIsOfferCaner(value, value2) {
      if (value) {
        return this.$t(getTransactionMode(value2));
      } else {
        console.log(value, "443");
        return this.$t("message.wallet.offerCancel");
      }
    },
    judgeDealSuccess(value) {
      if (value && value === "tesSUCCESS") {
        return this.$t("message.trade.successtrade");
      } else {
        return undefined;
      }
    },
    judgeFinalTradePrice(value1, value2) {
      console.log(value1, value2, "12");
      if (value1) {
        return new BigNumber(value1)
          .minus(new BigNumber(value2))
          .decimalPlaces(10)
          .toNumber();
      } else {
        return value2;
      }
    },
    judgeIsMatch(value) {
      if (value) {
        return this.$t("message.trade.ismatch");
      } else {
        return undefined;
      }
    },
    displayDefaultMemoData(value) {
      if (value) {
        return value;
      } else {
        return { MemoData: undefined };
      }
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
    displayDefaultTakerPays(value) {
      if (value) {
        return value;
      } else {
        return { takerPays: undefined };
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
    },
    fillZero(value) {
      if (value < 10) {
        value = "0" + value;
      }
      return value;
    }
  }
};
</script>
<style lang="scss" scoped>
#transnumDetail {
  text-align: center;
  min-width: 980px;
  padding: 0 70px;
  padding-bottom: 110px;
  background: #f2f8fc;
  .walletDetaultLoader {
    width: 100%;
    // overflow: hidden;
    // border: 2px solid #c1e9f1;
    height: 80px;
    // border-radius: 8px;
    background: #ffffff;
    margin-bottom: 20px;
    color: #909399;
  }
  .hashSpan {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #3b3f4c;
    font-size: 14px;
  }
  // // .hashSpan:hover {
  // //   color: #06aaf9;
  // //   cursor: pointer;
  // }
  .tille {
    display: flex;
    align-items: center;
    color: #18c9dd;
    font-size: 14px;
  }
  .tilleIcon {
    font-size: 10px;
    float: right;
    padding: 4px 0 0 10px;
    color: #18c9dd;
  }
  .walletHeader {
    // background: red;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    color: #3e3f45;
    padding: 10px 0;
  }
}
.title {
  background: linear-gradient(right, #0ab1f2, #26e0cc);
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #ffffff;
  font-size: 16px;
  border-bottom: 1px #d0eef5;
}
.transnum {
  background-color: #f2f8fc;
  border: 1px solid #d0eef5;
  .transnumList {
    min-height: 660px;
    background: #ffffff;
    li {
      display: flex;
      justify-content: space-between;
      padding: 0 20px;
      font-size: 14px;
      color: #868080;
      height: 40px;
      align-content: center;
      border-bottom: 1px solid #e0e8ed;
      span {
        height: 40px;
        line-height: 40px;
      }
    }
  }
}
</style>
<style  lang="scss" >
.el-table {
  th {
    border-bottom: 1px solid #e0e8ed;
  }
}
.transnumDetailHeaderRowclass {
  color: #3b3f4c;
  font-size: 14px;
  height: 40px;
}
#blockdetail .transnumDetailrowClass {
  font-size: 12px;
  height: 40px;
}
#blockdetail .pagination .is-background {
  .el-pager li:not(.disabled).active {
    background: #18c9dd;
    color: #ffffff;
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
  }
}
#blockdetail .el-pager .el-icon-more {
  display: none;
}
</style>