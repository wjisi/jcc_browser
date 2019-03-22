<template>
  <div id="transnumDetail" class="blo">
    <div class="transnumDetailTitle">
      <div class="walletHeader">
        <div> {{$t('message.trade.number')}}:<span style="color:#06aaf9;padding-left:10px;">#{{transactionNumber}}</span></div>
        <div class="tille" >{{$t('message.trade.narrationAndOthers')}} <i class="iconfont icon-xiangxiaxianshijiantou tilleIcon"></i></div>
      </div>
      <Ul>
        <li>
           <div><span>{{$t('message.trade.type')}}</span>  <span>{{transnumkList.type}}</span></div>
           <div><span>{{$t('message.trade.booknumber')}}</span>  <span>{{transnumkList.block}}</span></div>
        </li>
          <li>
           <div><span>{{$t('message.trade.initiator')}}</span>  <span>{{transnumkList.account}}</span></div>
           <div><span>{{$t('message.trade.costs')}}</span>  <span>{{transnumkList.fee}}</span></div>
        </li>
         <li>
           <div>
               <span>{{$t('message.trade.amount')}}</span>
               <span v-show="transnumkList.realPaysValue">
                 <span>{{transnumkList.realPaysValue}}</span>
                 <span>{{transnumkList.realPaysCurrency}}</span>
                 <span>{{transnumkList.realGetsValue}}</span>
                 <span>{{transnumkList.realGetsCurrency}}</span>
               </span>
               <span v-show="!transnumkList.realPaysValue">{{defaultValue}}</span>
          </div>
           <div><span>{{$t('message.trade.note')}}</span>  <span>{{transnumkList.memos[0].Memo.MemoData}}</span></div>
        </li>
        <li>
           <div><span>{{$t('message.trade.to')}}</span>  <span>{{transnumkList.dest}}</span></div>
           <div><span>{{$t('message.trade.results')}}</span>  <span>{{transnumkList.succ}}</span></div>
        </li>
         <li>
           <div>
             <span>{{$t('message.trade.dealamount')}}</span>
             <span v-show="transnumkList.matchPaysValue">
               <span>{{transnumkList.matchPaysValue}}</span>
               <span>{{transnumkList.matchPaysCurrency}}</span>
               <span>{{transnumkList.matchGetsValue}}</span>
               <span>{{transnumkList.matchGetsCurrency}}</span>
            </span>
            <span v-show="!transnumkList.matchPaysValue">{{defaultValue}}</span>
          </div>
           <div><span>{{$t('message.trade.ismatch')}}</span>  <span>{{transnumkList.matchFlag}}</span></div>
        </li>
      </Ul>
      </div>
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
import { getTransactionType } from "@/js/utils";
// , getTransactionMode
export default {
  name: "transnumDetail",
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
      // total: 0,
      // currentPage: 1,
      // gopage: 100,
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
          succ: this.judgeDealSuccess(res.succ) || "---",
          matchPaysCurrency: this.displayDefaultCurrency(res.matchPays)
            .currency,
          matchPaysValue: this.displayDefaultValues(res.matchPays).value,
          matchGetsCurrency: this.displayDefaultCurrency(res.matchGets)
            .currency,
          matchGetsValue: this.displayDefaultValues(res.matchGets).value,
          matchFlag: this.judgeIsMatch(res.matchFlag) || "---",
          affectedNodes: res.affectedNodes || {}
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
    judgeObject(value) {
      // debugger;
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
    // handleCurrentChange(val) {
    //   this.currentPage = val;

    //   this.loading = false;
    //   this.getTransnumDetail();
    // },
    // handlegettransnumDetail(res) {
    //   let i = 0;
    //   let list = [];
    //   for (; i < res.length; i++) {
    //     list.push({
    //       _id: res[i]._id,
    //       transNum: res[i].transNum,
    //       hash: res[i].hash,
    //       time: this.handleHashtime(res[i].time)
    //     });
    //   }
    //   return list;
    // },
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
// .pagination {
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   font-size: 14px;
//   padding-top: 20px;
//   padding-bottom: 110px;
//   .sortButton {
//     border: 1px solid #959595;
//     border-radius: 6px;
//     height: 36px;
//     line-height: 36px;
//     width: 50px;
//     margin-left: 20px;
//     background: #f2f8fc;
//     padding: 0 3px;
//   }
//   li .inputDiv {
//     width: 36px;
//     height: 36px;
//     border: 1px solid #959595;
//     display: inline-block;
//     margin: 0 10px;
//     border-radius: 6px;
//   }
//   li div input {
//     border-radius: 6px;
//     width: 36px;
//     height: 36px;
//     border: 0;
//   }
// }
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
// .pagination {
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   background: #ffffff;
//   font-size: 14px;
//   .sortButton {
//     border: 1px solid #959595;
//     border-radius: 6px;
//     height: 36px;
//     line-height: 36px;
//     width: 50px;
//     margin-left: 20px;
//     background: #f2f8fc;
//   }
//   li .input {
//     width: 36px;
//     height: 36px;
//     border: 1px solid #959595;
//     display: inline-block;
//     border-radius: 6px;
//     margin: 0 10px;
//   }
//   li div input {
//     border-radius: 6px;
//     width: 36px;
//     height: 36px;
//     border: 0;
//   }
// }
</style>

// <style  lang="scss" >
// #transnumDetail .pagination .is-background {
//   .el-pager li:not(.disabled).active {
//     background: #18c9dd;
//     color: #ffffff;
//   }
//   .el-pager li {
//     background: #ffffff;
//     width: 40px;
//     height: 40px;
//     line-height: 40px;
//     margin-right: 10px;
//     border-radius: 6px;
//     font-size: 14px;
//     color: #959595;
//   }
//   .btn-next,
//   .btn-prev {
//     background: #ffffff;
//     width: 40px;
//     height: 40px;
//     line-height: 40px;
//     margin-right: 10px;
//     border-radius: 6px;
//     font-size: 14px;
//     color: #959595;
//   }
// }
// #transnumDetail .el-pager .el-icon-more {
//   display: none;
// }
</style>