<template>
  <div id="transnumDetail" class="blo">
      <component  :transnumkList="transnumkList"  :is="currentView"></component>
    <div class="transnum">
      <div class="title">{{$t('message.trade.effect')}}</div>
        <ul class="transnumList" >
          <li v-for="(item,index) of  affectedNodes" :key="index"  >
           <span>{{item.message}}</span><span>{{item.message}}</span>
          </li>
        </ul>
       <!-- <ul class="pagination">
        <li>
          <el-pagination background layout="prev, pager, next" :total="total" :page-size="20" :current-page="parseInt(currentPage)" @current-change="handleCurrentChange"></el-pagination>
        </li>
        <li style="min-width: 1.08rem">{{$t('message.blockList.goto')}}
          <div class="inputDiv"><input type="text"  v-model="gopage" @focus="clearGopage"></div>
          {{$t('message.blockList.page')}}
        </li>
        <li>
          <div class="sortButton" @click="jumpSizeChange">{{$t('message.blockList.confirm')}}</div>
        </li>
      </ul> -->
    </div>
  </div>
</template>
<script>
import {
  // queryDelegateWallet,
  // queryWalletIncome,
  getBlockDetail
} from "../../js/fetch";
import offerCancel from "./offerCancel";
import offerCreate from "./offerCreate";
import payment from "./payment";
import { getTransactionType } from "@/js/utils";
export default {
  name: "transnumDetail",
  components: { offerCancel, offerCreate, payment },
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      hashtime: {},
      bash: {},
      transactionNumber: "",
      loading: false,
      currentView: offerCreate,
      transnumkList: { memos: [{ Memo: { MemoData: "" } }] },
      defaultValue: "",
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
      console.log(res);

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
          realPaysCurrency: this.displayDefaultCurrency(res.realPays).currency,
          realPaysValue: this.displayDefaultValues(res.realPays).value,
          realGetsCurrency: this.displayDefaultCurrency(res.realGets).currency,
          realGetsValue: this.displayDefaultValues(res.realGets).value,
          memos: res.memos || [{ Memo: { MemoData: "---" } }],
          dest: res.dest || "----",
          succ: this.judgeDealSuccess(res.succ) || "---",
          matchPaysCurrency: this.displayDefaultCurrency(res.matchPays)
            .currency,
          matchPaysValue: this.displayDefaultValues(res.matchPays).value,
          matchGetsCurrency: this.displayDefaultCurrency(res.matchGets)
            .currency,
          matchGetsValue: this.displayDefaultValues(res.matchGets).value,
          matchFlag: this.judgeIsMatch(res.matchFlag) || "---",
          affectedNodes: res.affectedNodes || []
          // [{ Memo: { MemoData: "---" } }]
          // { final:
          //        {takerGets: {currency: "",  value: ""},
          //         takerPays: {currency: "", value: ""}
          //        }
          //  },
          // takerPaysCurrency: this.displayDefaultCurrency(res.takerPays)
          //   .currency,
          // takerPaysValue: this.displayDefaultValues(res.takerPays).value,
          // takerGetsCurrency: this.displayDefaultCurrency(res.takerGets)
          //   .currency
        };
      }
      this.defaultValue = "---";
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
}
.transnumDetailTitle {
  text-align: left;
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