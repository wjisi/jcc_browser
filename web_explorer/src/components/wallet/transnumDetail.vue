<template>
  <div id="blockdetail" class="blo">
    <div class="blockDetailTitle">
      <div class="walletHeader">
        <div> {{$t('message.trade.number')}}:<span style="color:#06aaf9;padding-left:10px;">#{{1}}</span></div>
        <div class="tille" >{{$t('message.trade.narrationAndOthers')}} <i class="iconfont icon-xiangxiaxianshijiantou tilleIcon"></i></div>
      </div>
      <Ul>
        <li>
           <div><span>{{$t('message.trade.type')}}</span>  <span>1</span></div>
           <div><span>{{$t('message.trade.booknumber')}}</span>  <span>2</span></div>
        </li>
          <li>
           <div><span>{{$t('message.trade.initiator')}}</span>  <span>1</span></div>
           <div><span>{{$t('message.trade.costs')}}</span>  <span>2</span></div>
        </li>
         <li>
           <div><span>{{$t('message.trade.amount')}}</span>  <span>1</span></div>
           <div><span>{{$t('message.trade.note')}}</span>  <span>2</span></div>
        </li>
        <li>
           <div><span>{{$t('message.trade.to')}}</span>  <span>1</span></div>
           <div><span>{{$t('message.trade.results')}}</span>  <span>2</span></div>
        </li>
         <li>
           <div><span>{{$t('message.trade.dealamount')}}</span>  <span>1</span></div>
           <div><span></span>  <span>2</span></div>
        </li>
      </Ul>
      </div>
    <div class="bockList">
      <div class="title">{{$t('message.trade.effect')}}</div>
        <ul>
      <li v-for="(item,index) of  transnumDetail" :key="index"  >
        <span>{{item.message}}</span><span>{{item.message}}</span>
      </li>
    </ul>
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
import { getBlockDetail } from "../../js/fetch";
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
      hash: "",
      loading: false,
      total: 0,
      currentPage: 1,
      gopage: 100,
      transnumDetail: [
        { message: "foo" },
        { message: "boo" },
        { message: "coo" },
        { message: "doo" }
      ]
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      this.hash = this.$route.params.hash;
      let res = await getBlockDetail(this.hash);
      if (res.result === true && (res.code === 0 || res.code === "0")) {
        console.log(res, "111111");
        this.total = res.data.count;
        this.blockList = res.data.list;
        this.bash = res.data.info;
      }
      this.loading = false;
    },
    clearGopage() {
      this.gopage = "";
    },
    handleData(value) {
      return value;
    },
    jumpSizeChange() {
      this.currentPage = this.gopage;
      this.loading = false;
      this.getData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;

      this.loading = false;
      this.getData();
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
    handleHashtime(time) {
      let { fillZero } = this;
      let dateIn = new Date((time + 946684800) * 1000);
      let hashTime = {};
      fillZero(dateIn.getDate());
      hashTime.time =
        fillZero(dateIn.getHours()) + ":" + fillZero(dateIn.getMinutes());
      hashTime.date =
        fillZero(dateIn.getFullYear()) +
        "-" +
        fillZero(dateIn.getMonth() + 1) +
        "-" +
        fillZero(dateIn.getDate());
      return hashTime.date;
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
}
.blockDetailTitle {
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
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  margin-top: 20px;
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
#blockdetail .pagination .is-background {
  .el-pager li:not(.disabled).active {
    background: #18c9dd;
    color: #ffffff;
  }
  .el-pager li {
    background: #ffffff;
    width: 40px;
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