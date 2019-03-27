<template>
  <div id="transnumDetail" class="blo">
      <div class="walletHeader">
        <div> {{$t('message.trade.number')}}:<span style="color:#06aaf9;padding-left:10px;">#{{transactionNumber}}</span></div>
        <div class="tille" >{{$t('message.trade.narrationAndOthers')}} <i class="iconfont icon-xiangxiaxianshijiantou tilleIcon"></i></div>
      </div>
      <component  :transnumkList="transnumkList"  :is="currentView"></component>
    <div class="bockList">
      <div class="bockListData">
        <div class="title">{{$t('message.trade.detail')}}</div>
        <el-table :data="tradeDetailList" style="width:100%"  row-class-name="transnumDetailrowClass" header-row-class-name="transnumDetailHeaderRowclass">
           <div slot="empty" style="font-size:18px;">
            <div v-if="loading" v-loading="true" element-loading-spinner="el-icon-loading" element-loading-text="拼命加载中"></div>
            <div v-else ><img src='../../images/not _found_list.png' /></div>
          </div>
          <el-table-column  width="30px"></el-table-column>
          <el-table-column prop="seq"  :label="$t('message.blockDetailList.serialnumber')"  id="ellipsis" min-width="9%">
            <template slot-scope="scope">
              <i class="iconfont"  :class="scope.row.matchFlag" style="font-size:15px;color: #18c9dd;"></i>{{scope.row.seq}}
            </template>
          </el-table-column>
          <el-table-column prop="flag"  :label="$t('message.blockDetailList.transactionmode')"  id="ellipsis" align="center"  min-width="9%">
            <template slot-scope="scope">
                 <i class="iconfont"  :class="scope.row.displayDifferentCircles" style="font-size:8px;color: #18c9dd;margin-right:3px;"></i>{{scope.row.flag}}
          </template>
          </el-table-column>
          <el-table-column prop="transactionAmount"  :label="$t('message.trade.amount')"  id="ellipsis"  align="center"  min-width="14%" >
            <template slot-scope="scope">
                <span v-show="scope.row.takerPaysValue" class="pays">
                    <span>{{scope.row.takerPaysValue}}</span>
                    <span>{{scope.row.takerPaysCurrency}}</span>
                    <i class="iconfont icon-jiaoyijineshuliangzhuanhuan paysI"></i>
                    <span>{{scope.row.takerGetsValue}}</span>
                    <span>{{scope.row.takerGetsCurrency}}</span>
                </span>
                <span v-show="!scope.row.takerPaysValue">
                      <span>{{scope.row.takerValue}}</span><span>{{scope.row.takerCurreny}}</span>
                </span>
            </template>
          </el-table-column>
            <el-table-column prop="tradePrice" :label="$t('message.wallet.tradePrice')" id="ellipsis" align="center" min-width="10%">
            <template slot-scope="scope">
               <span v-if="scope.row.judgeTrade === 1">
                   <span>{{parseInt(scope.row.takerGetsValue)/parseInt(scope.row.takerPaysValue)}}</span>
                   <span>{{scope.row.takerGetsCurrency}}</span>
              </span>
               <span v-else-if="scope.row.judgeTrade === 2"><span>{{parseInt(scope.row.takerPaysValue)/parseInt(scope.row.takerGetsValue)}}</span><span>{{scope.row.takerGetsCurrency}}</span></span>
              <span v-else>---</span>
            </template>
          </el-table-column>
          <el-table-column prop="account" :label="$t('message.wallet.TransactionToHome')" id="ellipsis" align="center" min-width="10%">
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
import { getMatchFlag } from "../../js/utils";
// queryDelegateWallet,
// queryWalletIncome,
import {
  getTransactionType,
  getTransactionMode,
  SelectTypeComponents
} from "@/js/utils";
export default {
  name: "transnumDetail",
  components: { offerCancel, offerCreate, payment },
  data() {
    return {
      transactionNumber:
        "E2CF127D9AB7B2E92BE5533F61E270D7094DF079281DD84C1EEAB33ED0AF5C55",
      loading: false,
      currentView: payment,
      transnumkList: { memos: [{ Memo: { MemoData: "" } }] },
      tradeDetailList: [],
      index: 0
    };
  },
  created() {
    this.transactionNumber = this.$route.params.hash;
    // this.getTransnumDetail();
    this.getData();
  },
  methods: {
    async getData() {
      // if (this.loading) {
      //   return;
      // }
      this.loading = true;
      this.hash =
        this.$route.params.hash ||
        "E2CF127D9AB7B2E92BE5533F61E270D7094DF079281DD84C1EEAB33ED0AF5C55";
      let res = await getBlockDetail(this.hash);
      if (res.result === true && (res.code === 0 || res.code === "0")) {
        console.log(res, "99999999");
        this.transnumkList = this.handelDealHashData(res);
        this.tradeDetailList =
          this.handelTradeDetailList(res.data.affectedNodes) || [];
      } else {
        this.transnumkList = [];
      }
      this.loading = false;
    },
    // clearGopage() {
    //   this.gopage = "";
    // },
    handleData(value) {
      return value;
    },
    handelTradeDetailList(res) {
      let list = [];
      if (res && res.length > 0) {
        let i = 0;
        for (; i < res.length; i++) {
          list.push({
            seq: res[i].seq || "---",
            account: res[i].account || "---",
            judgeTrade: res[i].flag,
            matchFlag: getMatchFlag(res[i].matchFlag) || "",
            // amountCurrency: this.displayDefaultCurrency(res[i].amount).currency,
            // amountValue:
            //   this.displayDefaultValues(res[i].amount).value || "---",
            // realPaysCurrency: this.displayDefaultCurrency(res[i].realPays).currency,
            // realPaysValue: this.displayDefaultValues(res[i].realPays).value,
            // realGetsCurrency: this.displayDefaultCurrency(res[i].realGets).currency,
            // realGetsValue: this.displayDefaultValues(res[i].realGets).value,
            takerPaysCurrency:
              this.displayDefaultCurrency(res[i].final.takerPays).currency ||
              "---",
            takerPaysValue: this.displayDefaultValues(res[i].final.takerPays)
              .value,
            takerGetsCurrency: this.displayDefaultCurrency(
              res[i].final.takerGets
            ).currency,
            takerGetsValue: this.displayDefaultValues(res[i].final.takerGets)
              .value,
            flag:
              getTransactionMode(res[i].flag) ||
              getTransactionMode(res[i].type) ||
              "----"
          });
        }
      }
      return list;
    },
    handelDealHashData(res) {
      let list = {};
      if (res && res.data) {
        res = res.data;
        this.currentView = SelectTypeComponents(res.type);
        list = {
          type: getTransactionType(res.type) || "---",
          block: res.seq || "---",
          account: res.account || "---",
          fee: res.fee || "---",
          amountCurrency: this.displayDefaultCurrency(res.amount).currency,
          amountValue: this.displayDefaultValues(res.amount).value || "---",
          time: this.handleHashtime(res.time) || "---",
          matchFlag: res.matchFlag || "---",
          matchPaysCurrency: this.displayDefaultCurrency(res.matchPays)
            .currency,
          matchPaysValue: this.displayDefaultValues(res.matchPays).value,
          matchGetsCurrency: this.displayDefaultCurrency(res.matchGets)
            .currency,
          matchGetsValue: this.displayDefaultValues(res.matchGets).value,
          takerPaysCurrency:
            this.displayDefaultCurrency(res.takerPays).currency || "---",
          takerPaysValue: this.displayDefaultValues(res.takerPays).value,
          takerGetsCurrency: this.displayDefaultCurrency(res.takerGets)
            .currency,
          takerGetsValue: this.displayDefaultValues(res.takerGets).value,
          memos: res.memos || [{ Memo: { MemoData: "---" } }],
          flag:
            getTransactionMode(res.flag) ||
            getTransactionMode(res.type) ||
            "----",
          dest: res.dest || "----",
          succ: this.judgeDealSuccess(res.succ) || "---",
          judgeTrade: res.flag
        };
      }
      // this.defaultValue = "---";
      return list;
    },
    // jumpSizeChange() {
    //   this.currentPage = this.gopage;
    //   this.loading = false;
    //   this.getTransnumDetail();
    // },
    // judge(value) {
    //   console.log(value);
    //   return value;
    // },
    judgeDealSuccess(value) {
      if (value && value === "tesSUCCESS") {
        return this.$t("message.trade.successtrade");
      } else {
        return undefined;
      }
    },
    asciiConverString(value) {
      let dd = "";
      if (value && value !== "---") {
        for (var i = 0; i < value.length; i++) {
          dd += String.fromCharCode(value.charCodeAt(i));
        }
      }
      // console.log(value, "12");
      return dd || "---";
    },

    judgeObject(value) {
      // let value = [].slice.call([{ Memo: { MemoData: "---" } }])[0];
      // return typeof value;
      // return value;
      console.log(value instanceof Array);
      return value[0];
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
    font-size: 14px;
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