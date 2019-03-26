<template>
  <div id="transnumDetail" class="blo">
      <div class="walletHeader">
        <div> {{$t('message.trade.number')}}:<span style="color:#06aaf9;padding-left:10px;">#{{transactionNumber}}</span></div>
        <div class="tille" >{{$t('message.trade.narrationAndOthers')}} <i class="iconfont icon-xiangxiaxianshijiantou tilleIcon"></i></div>
      </div>
      <component  :transnumkList="transnumkList"  :is="currentView"></component>
    <div class="transnum">
      <div class="title">{{$t('message.trade.effect')}}</div>
        <ul class="transnumList" >
          <li v-for="(item,index) of  affectedNodes" :key="index"  >
           <span>{{item.message}}</span><span>{{item.message}}</span>
          </li>
        </ul>
    </div>
  </div>
</template>
<script>
import { getBlockDetail } from "../../js/fetch";
import offerCancel from "./offerCancel";
import offerCreate from "./offerCreate";
import payment from "./payment";
// queryDelegateWallet,
// queryWalletIncome,
import { getTransactionType, getTransactionMode } from "@/js/utils";
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
      affectedNodes: [],
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
        // this.total = res.data.count;
        this.transnumkList = this.handelDealHashData(res);
        // this.bash = res.data.info;
      } else {
        this.transnumkList = [];
      }
      // this.loading = false;
    },
    // clearGopage() {
    //   this.gopage = "";
    // },
    handleData(value) {
      return value;
    },
    handelDealHashData(res) {
      let list = {};
      if (res && res.data) {
        res = res.data;
        list = {
          type: getTransactionType(res.type) || "---",
          block: res.seq || "---",
          account: res.account || "---",
          fee: res.fee || "---",
          amountCurrency: this.displayDefaultCurrency(res.amount).currency,
          amountValue: this.displayDefaultValues(res.amount).value || "---",
          time: this.handleHashtime(res.time) || "---",
          // realPaysCurrency: this.displayDefaultCurrency(res.realPays).currency,
          // realPaysValue: this.displayDefaultValues(res.realPays).value,
          // realGetsCurrency: this.displayDefaultCurrency(res.realGets).currency,
          // realGetsValue: this.displayDefaultValues(res.realGets).value,
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
          succ: this.judgeDealSuccess(res.succ) || "---"
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
    judgeDealSuccess(value) {
      if (value === "tesSUCCESS") {
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
      console.log(value, "12");
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
  // .transnumDetailTitle {
  // text-align: left;
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