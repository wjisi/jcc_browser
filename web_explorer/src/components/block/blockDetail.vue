<template>
  <div id="blockdetail" class="blo">
    <div class="blockDetailTitle">
      <span class="tille">
        {{$t('message.blockDetailList.currentblock')}}:<span style="color:#06aaf9;padding-left:10px;">#{{bash.block}}</span>
      </span>
      <span class="tille" >{{$t('message.blockDetailList.blockhashnumber')}}:<span style="padding-left:10px;">{{bash._id}}</span>
      </span>
      <i class="iconfont icon-xiangxiaxianshijiantou tilleIcon"></i>
      <Ul v-show="!isEmptyObject(bash)">
        <li><span>{{$t('message.blockDetailList.closetime')}}</span><span>{{handleHashtime(bash.time)}}</span></li><li><span>{{$t('message.blockDetailList.lasthash')}}</span><span class="lasthash">{{bash.parentHash}}</span></li><li>
          <span>{{$t('message.blockDetailList.Transactionvolume')}}</span><span>{{bash.transNum}}</span></li><li><span>SWTC{{$t('message.blockDetailList.total')}}</span><span>{{bash.hashType}}</span></li>
      </Ul>
      <Ul v-show="isEmptyObject(bash)">
        <div v-if="loading"  style="height:80px;width:100%" v-loading="true" element-loading-spinner="el-icon-loading" element-loading-text="拼命加载中"></div>
        <div v-else  style="height:80px;width:100%;text-align:center;line-height:80px; color: #909399;">{{$t('message.home.notransaction')}}</div>
      </Ul>
    </div>
    <div class="bockList">
      <div class="bockListData">
        <div class="title">{{$t('message.trade.tradeRecord')}}</div>
        <el-table :data="blockList" style="width:100%"  row-class-name="BlockDetailrowClass" header-row-class-name="BlockDetailHeaderRowclass">
           <div slot="empty" style="font-size:18px;">
            <div v-if="loading" v-loading="true" element-loading-spinner="el-icon-loading" element-loading-text="拼命加载中"></div>
            <div style="margin:100px 0;" v-else ><img src='../../images/not _found_list.png' /><div>{{$t('message.home.notransaction')}}</div></div>
          </div>
          <el-table-column  width="30px"></el-table-column>
          <el-table-column prop="seq"  :label="$t('message.blockDetailList.serialnumber')"  id="ellipsis" min-width="9%">
             <template slot-scope="scope">
              <i class="iconfont"  :class="scope.row.matchFlag" style="font-size:15px;color: #18c9dd;"></i>{{scope.row.seq}}
            </template>
          </el-table-column>
          <el-table-column prop="type" :label="$t('message.blockDetailList.transactiontype')" id="ellipsis" min-width="10%" align="left" header-align="left">
             <template slot-scope="scope">
              <div style="display: flex;align-items: center;"><span :class="scope.row.displayDifferentBg"></span>{{scope.row.type}}</div>
            </template>
          </el-table-column>
           <el-table-column prop="flag" :label="$t('message.blockDetailList.transactionmode')" id="ellipsis" min-width="13%" align="center">
               <template slot-scope="scope">
                  <span :style="{ color:scope.row.displayDifferentColor }">{{scope.row.flag}}</span>
              </template>
          </el-table-column>
          <!-- <el-table-column prop="time"  :label="$t('message.blockDetailList.transactiontime')"  id="ellipsis" align="center"  min-width="13%">
            <template slot-scope="scope"><span>{{handleHashtime(scope.row.time)}}</span></template>
          </el-table-column> -->
          <el-table-column prop="_id"  :label="$t('message.home.dealhash')"  id="ellipsis" align="center"  min-width="32%">
            <template slot-scope="scope">
              <span class="spanAccount" @click="jumpDetail(scope.row._id)">{{scope.row._id}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="account"  :label="$t('message.blockDetailList.sender')"  id="ellipsis" align="center"  min-width="28%">
            <template slot-scope="scope">
              <span  class="spanAccount"  @click="jumpDetail(scope.row._id)">{{scope.row.account}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="fee" :label="$t('message.blockDetailList.servicecharge')"  align="center"  min-width="11%">
             <template slot-scope="scope">
              <span >{{scope.row.fee}}swtc</span>
            </template>
          </el-table-column>
          <el-table-column  width="30px"></el-table-column>
        </el-table>
      </div>
       <ul class="pagination">
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
      </ul>
    </div>
  </div>
</template>
<script>
import { getBlockDetail, getTransListByHash } from "../../js/fetch";
import {
  getTransactionType,
  getTransactionMode,
  // getType,
  getMatchFlag,
  getTypeBg,
  getFlagColor,
  isEmptyObject
} from "@/js/utils";
export default {
  name: "blockdetail",
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      blockList: [],
      hashtime: {},
      bash: {},
      hash: "CB3FD2D5A8513DBA74705F022A7E8A0415116B497612FD3DCB8CB0B7AEF76713",
      loading: false,
      total: 0,
      currentPage: 1,
      gopage: 1
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getTranstionListByHash() {
      this.blockList = [];
      if (this.loading) {
        return;
      }
      this.loading = true;
      let data = {
        page: this.currentPage || "1",
        size: 20,
        total: this.total,
        hash: this.hash || ""
      };
      let res = await getTransListByHash(data);
      console.log(res, "blockdata1");
      if (res.result === true && (res.code === 0 || res.code === "0")) {
        this.blockList = this.handleHistoryData(res);
      } else {
        this.blockList = [];
        this.total = 0;
        this.gopage = 0;
      }
      this.loading = false;
    },
    async getData() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      this.hash =
        this.$route.params.hash ||
        "CB3FD2D5A8513DBA74705F022A7E8A0415116B497612FD3DCB8CB0B7AEF76713";
      let res = await getBlockDetail(this.hash);
      console.log(res, "blockdata2");
      if (res.result === true && (res.code === 0 || res.code === "0")) {
        this.total = res.data.count;
        this.blockList = this.handleHistoryData(res);
        this.bash = res.data.info;
      } else {
        this.blockList = [];
        this.bash = {};
        this.total = 0;
        this.gopage = 0;
      }
      this.loading = false;
    },
    clearGopage() {
      this.gopage = "";
    },
    handleHistoryData(res) {
      let i = 0;
      let list = [];
      if (res && res.data && res.data.list.length > 0) {
        for (; i < res.data.list.length; i++) {
          list.push({
            matchFlag: getMatchFlag(res.data.list[i].matchFlag) || "",
            seq: res.data.list[i].seq || "----",
            type: this.$t(getTransactionType(res.data.list[i].type)) || "",
            flag: this.$t(getTransactionMode(res.data.list[i].flag)) || "----",
            displayDifferentBg: getTypeBg(res.data.list[i].type) || "",
            displayDifferentColor:
              getFlagColor(res.data.list[i].flag) ||
              getFlagColor(res.data.list[i].type) ||
              "",
            // displayDifferentCircles: getType(res.data.list[i].flag) || "",
            // time: this.handleHashtime(res.data.list[i].time) || "----",
            fee: res.data.list[i].fee || "----",
            account: res.data.list[i].account || "----",
            _id: res.data.list[i]._id || "----"
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
    isEmptyObject(bash) {
      if (isEmptyObject(bash)) {
        return true;
      } else {
        return false;
      }
    },
    jumpSizeChange() {
      this.currentPage = this.gopage;
      this.loading = false;
      this.getTranstionListByHash();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.loading = false;
      this.getTranstionListByHash();
    },
    handleGetData(res) {
      let i = 0;
      let list = [];
      for (; i < res.length; i++) {
        list.push({
          _id: res[i]._id,
          transNum: res[i].transNum,
          hash: res[i].hash,
          time: this.handleHashtime(res[i].time)
        });
      }
      return list;
    },
    jumpDetail(hash) {
      this.$router.push({
        name: "tradeDetail",
        params: { hash: hash }
      });
    },
    handleHashtime(time) {
      if (time) {
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
#blockdetail {
  text-align: center;
  min-width: 768px;
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
.blockDetailTitle {
  text-align: left;
  div {
    display: inline-block;
  }
  .tille {
    width: 50%;
    padding: 16px 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 16px;
    color: #3e3f45;
    float: left;
  }
  .tille:nth-child(2) {
    color: #18c9dd;
    font-size: 14px;
    white-space: nowrap;
    width: calc(50% - 20px);
  }
  .tilleIcon {
    width: 20px;
    font-size: 14px;
    float: right;
    padding: 16px 0;
    color: #18c9dd;
  }

  ul {
    width: 100%;
    overflow: hidden;
    border: 2px solid #c1e9f1;
    height: 80px;
    border-radius: 8px;
    background: #ffffff;
    margin-bottom: 20px;
    li {
      display: inline-block;
      width: calc(50% - 41px);
      height: 40px;
      line-height: 40px;
      padding: 0 20px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      color: #5f5d5d;
      font-size: 14px;
      position: relative;
      vertical-align: top;
      span:nth-child(2) {
        white-space: nowrap;
        position: absolute;
        right: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .lasthash {
        width: calc(100% - 138px);
        font-size: 12px;
        text-align: right;
      }
    }
    li:nth-child(1) {
      border-bottom: 1px solid #e0e8ed;
    }
    li:nth-child(2) {
      border-bottom: 1px solid #e0e8ed;
    }
    li:nth-child(odd) {
      border-right: 1px solid #e0e8ed;
    }
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
.bockList {
  background-color: #f2f8fc;
  border: 1px solid #d0eef5;
}
// ..spanAccount { {
//   overflow: hidden;
//   text-overflow: ellipsis;
//   white-space: nowrap;
// }
.spanAccount {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.spanAccount:hover {
  color: #06aaf9;
  font-size: 12px;
  cursor: pointer;
}
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  font-size: 14px;
  padding: 20px 0;
  .sortButton {
    border: 1px solid #959595;
    border-radius: 6px;
    height: 36px;
    line-height: 36px;
    width: 50px;
    margin-left: 20px;
    background: #f2f8fc;
  }
  li .input {
    width: 36px;
    height: 36px;
    border: 1px solid #959595;
    display: inline-block;
    border-radius: 6px;
    margin: 0 10px;
  }
  li div input {
    border-radius: 6px;
    width: 36px;
    height: 36px;
    border: 0;
  }
}
</style>

<style  lang="scss" >
.el-table {
  th {
    border-bottom: 1px solid #e0e8ed;
  }
}
.BlockDetailHeaderRowclass {
  color: #3b3f4c;
  font-size: 14px;
  height: 40px;
}
#blockdetail .BlockDetailrowClass {
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