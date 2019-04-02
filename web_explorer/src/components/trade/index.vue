<template>
  <div id="trade" class="blo">
    <div class="selectionDate">
      <div class="blocktitle">
        <img src='../../images/latest_trade_title.png' />
        <span>{{$t('message.hashList.latestdeal')}}</span>
      </div>
      <!-- <div class="selectionButton">
        {{$t("message.screendate")}}
        <el-date-picker v-model="selectedDate" align="right"  type="date" :picker-options="pickerOptions"  value-format="yyyy-MM-dd" @change="setDatetiem"></el-date-picker>
      </div> -->
    </div>
    <div class="bockList">
      <div class="bockListData">
        <el-table :data="tranList" style="width:100%" :row-style="rowStyle"  row-class-name="traderowClass" header-row-class-name="tradeHeaderRowclass">
           <div slot="empty" style="font-size:18px;">
            <div v-if="loading" v-loading="true" element-loading-spinner="el-icon-loading" element-loading-text="拼命加载中"></div>
           <div v-else style="margin:100px 0;"><img src='../../images/not _found_list.png' /><div>{{$t('message.home.notransaction')}}</div></div>
          </div>
          <el-table-column  width="30px"></el-table-column>
          <!-- <el-table-column prop="sort" :label="$t('message.hashList.sort')" min-width="8%"></el-table-column> -->
           <el-table-column prop="sort" :label="$t('message.blockDetailList.serialnumber')" min-width="8%"></el-table-column>
          <!-- <el-table-column prop="seq"  :label="$t('message.blockDetailList.serialnumber')"  id="ellipsis" min-width="12%">
            <template slot-scope="scope">
              <i class="iconfont"  :class="scope.row.matchFlag" style="font-size:15px;color: #18c9dd;"></i>{{scope.row.seq}}
            </template>
          </el-table-column> -->
          <el-table-column prop="type" :label="$t('message.blockDetailList.transactiontype')" id="ellipsis" min-width="10%" align="left" header-align="left">
             <template slot-scope="scope">
              <div style="display: flex;align-items: center;"><span :class="scope.row.displayDifferentBg" style="margin-right:6px;"></span>{{scope.row.type}}</div>
            </template>
          </el-table-column>
           <el-table-column prop="flag" :label="$t('message.blockDetailList.transactionmode')" id="ellipsis" min-width="8%" align="center">
               <template slot-scope="scope">
                  <span :style="{ color:scope.row.displayDifferentColor }">{{scope.row.flag}}</span>
              </template>
          </el-table-column>
          <el-table-column prop="_id"  :label="$t('message.home.dealhash')"  id="ellipsis" align="center" header-align="center" min-width="37%">
            <template slot-scope="scope">
              <span class="hashSpan" @click="jumpDetail(scope.row._id)">{{handleData(scope.row._id)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="transactionAmount"  :label="$t('message.trade.tradeVolume')"  id="ellipsis"  align="right" header-align="right"  min-width="27%" >
            <template slot-scope="scope">
                <span v-show="scope.row.takerPaysValue" class="pays">
                    <span style="color: #18c9dd;">{{scope.row.takerGetsValue}}</span>
                    <span>{{cnyTransformCNT(scope.row.takerGetsCurrency)}}</span>
                    <i class="iconfont icon-jiaoyijineshuliangzhuanhuan "></i>
                    <span style="color: #18c9dd;">{{scope.row.takerPaysValue}}</span>
                    <span>{{cnyTransformCNT(scope.row.takerPaysCurrency)}}</span>
                </span>
                <span v-show="!scope.row.takerPaysValue">
                      <span style="color: #18c9dd;">{{scope.row.takerValue}}</span>
                      <span>{{scope.row.takerCurreny}}</span>
                </span>
            </template>
          </el-table-column>
          <el-table-column width="30px"></el-table-column>
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
import { getTranslist } from "../../js/fetch";
import {
  getTransactionType,
  getTransactionMode,
  getFlagColor,
  getTypeBg
} from "@/js/utils";
export default {
  name: "trade",
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      // selectedDate: "",
      tranList: [],
      // getRowClass: String,
      index: String,
      // defaultValue: "",
      // labelclass: String,
      // hashtime: String,
      total: 0,
      loading: false,
      currentPage: 1,
      gopage: 1
    };
  },
  created() {
    let data = {
      page: 1,
      size: 20
    };
    this.getAllList(data);
  },
  methods: {
    async getAllList(data) {
      this.tranList = [];
      if (this.loading) {
        return;
      }
      this.loading = true;
      let res = await getTranslist(data);
      console.log(res, "jiao yi");

      if (res.result === true && (res.code === 0 || res.code === "0")) {
        this.total = res.data.count;
        this.tranList = this.handleGetData(res.data.list);
      } else {
        this.tranList = [];
        this.total = 0;
        this.gopage = 0;
      }
      this.loading = false;
    },
    handleGetData(res) {
      let i = 0;
      let list = [];
      for (; i < res.length; i++) {
        list.push({
          sort: (this.currentPage - 1) * 20 + i + 1,
          // seq: res[i].seq || "----",
          _id: res[i]._id,
          type:
            this.$t(getTransactionType(res[i].type)) ||
            this.$t("message.wallet.unknown"),
          flag:
            this.$t(getTransactionMode(res[i].flag)) ||
            this.$t(getTransactionMode(res[i].type)) ||
            "----",
          displayDifferentBg: getTypeBg(res[i].type) || "",
          displayDifferentColor:
            getFlagColor(res[i].flag) || getFlagColor(res[i].type) || "",
          takerPaysCurrency: this.displayDefaultCurrency(res[i].takerPays)
            .currency,
          takerPaysValue: this.displayDefaultValues(res[i].takerPays).value,
          takerGetsCurrency:
            this.displayDefaultCurrency(res[i].takerGets).currency || "---",
          takerGetsValue: this.displayDefaultValues(res[i].takerGets).value,
          takerCurreny:
            this.displayDefaultCurrency(res[i].amount).currency || "---",
          takerValue: this.displayDefaultValues(res[i].amount).value,
          // takerFlag: this.judgeIsMatch(res[i].takerFlag) || "---",
          // displayDifferentCircles: getType(res.data.list[i].flag) || "",
          // transNum: this.handleData(res[i].transNum, 1),
          // hash: res[i].hash,
          time: this.handleHashtime(res[i].time)
        });
      }
      // this.defaultValue = "---";
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
    },
    fillZero(value) {
      if (value < 10) {
        value = "0" + value;
      }
      return value;
    },
    clearGopage() {
      this.gopage = "";
    },
    jumpSizeChange() {
      if (this.currentPage !== parseInt(this.gopage)) {
        this.currentPage = this.gopage;
        let data = {
          size: 20,
          page: this.gopage || 1
        };
        this.loading = false;
        this.getAllList(data);
      }
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      let data = {
        page: val,
        size: 20
      };
      this.loading = false;
      this.getAllList(data);
    },
    jumpDetail(hash) {
      const { href } = this.$router.resolve({
        name: "tradeDetail",
        query: { hash: hash }
      });
      window.open(href, "_blank");
      // window.open("#/trade/tradeDetail" + "?hash=" + hash, "_blank");
      // this.$router.push({
      //   name: "tradeDetail",
      //   params: { hash: hash }
      // });
    },
    rowStyle({ row, rowIndex }) {
      return "height:40px";
    },
    handleData(value, code = 0) {
      if (value) {
        return value;
      } else {
        if (code === 1) {
          return "0.01SWTC";
        } else {
          return "null";
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
#trade {
  background-color: #f2f8fc;
  text-align: center;
  padding: 0 70px;
  min-width: 980px;
  .offerAffectBg {
    height: 15.5px;
    width: 15.5px;
    background-image: url("../../images/OfferAffect.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    display: inline-block;
    // position: absolute;
    // bottom: 20px;
    // justify-content: center;
    // align-items: center;
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
  // .pays {
  //   background: red;
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
.demonstration {
  font-weight: bold;
  font-size: 18px;
}
.selectionDate {
  padding: 30px 0 20px 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .blocktitle {
    height: 60px;
    line-height: 60px;
    display: flex;
    img {
      width: 60px;
      height: 60px;
    }
    span {
      display: inline-block;
      width: 120px;
      height: 40px;
      line-height: 40px;
      border-radius: 20px;
      margin: 10px 0 0 20px;
      color: #fff;
      font-size: 18px;
      background: linear-gradient(right, #04abf9, #23dccd);
    }
  }
}
</style>

<style  lang="scss" >
#trade .tradeHeaderRowclass {
  color: #3b3f4c;
  font-size: 14px;
  height: 40px;
}
#trade .traderowClass:nth-child(odd) {
  background: #f2f8fc;
  height: 40px;
}
#trade .traderowClass td:nth-child(2) {
  color: #3b3f4c;
  font-size: 14px;
}
#trade .el-table .cell {
  .hashSpan {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #3b3f4c;
    font-size: 14px;
    cursor: pointer;
  }
  .hashSpan:hover {
    color: #06aaf9;
  }
  .transNumSpan {
    color: #6f6868;
  }
}
#trade .pagination .is-background {
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
#trade .el-pager .el-icon-more {
  display: none;
}
#trade .el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: rgba(255, 255, 255, 0);
}
</style>