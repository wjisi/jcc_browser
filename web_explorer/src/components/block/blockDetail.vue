<template>
  <div id="blockdetail" class="blo">
    <div class="blockDetailTitle">
      <span class="tille">
        {{$t('message.blockDetailList.currentblock')}}:<span style="color:#06aaf9;padding-left:10px;">#{{bash.block}}</span>
      </span>
      <span class="tille" >{{$t('message.blockDetailList.hashnumber')}}:<span style="padding-left:10px;">{{bash._id}}</span>
      </span>
      <i class="iconfont icon-xiangxiaxianshijiantou tilleIcon"></i>
      <Ul>
        <li><span>{{$t('message.blockDetailList.closetime')}}</span><span>{{bash.block}}</span></li><li><span>{{$t('message.blockDetailList.lasthash')}}</span><span class="lasthash">{{bash.parentHash}}</span></li><li>
          <span>{{$t('message.blockDetailList.Transactionvolume')}}</span><span>{{bash.transNum}}</span></li><li><span>SWTC{{$t('message.blockDetailList.total')}}</span><span>{{bash.hashType}}</span></li>
      </Ul>
    </div>
    <div class="bockList">
      <div class="bockListData">
        <div class="title">{{$t('message.blockDetailList.latestdeal')}}</div>
        <el-table :data="blockList" style="width:100%"  row-class-name="BlockDetailrowClass" header-row-class-name="BlockDetailHeaderRowclass">
          <el-table-column  width="30px"></el-table-column>
          <el-table-column prop="seq"  :label="$t('message.blockDetailList.serialnumber')"  id="ellipsis" min-width="12%">
            <template slot-scope="scope">
              <span style="color:#6f6868;font-size:12px;">{{handleData(scope.row.seq)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="type"  :label="$t('message.blockDetailList.transactiontype')"  id="ellipsis"  min-width="10%">
            <template slot-scope="scope">
              <span style="color:#6f6868;font-size:12px;">{{handleData(scope.row.type)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="hashType"  :label="$t('message.blockDetailList.transactionmode')"  id="ellipsis" align="center"  min-width="10%">
            <template slot-scope="scope">
              <span class="spanHashType">{{handleData(scope.row.hashType)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="time"  :label="$t('message.blockDetailList.transactiontime')"  id="ellipsis" align="center"  min-width="13%">
            <template slot-scope="scope"><span>{{handleHashtime(scope.row.time)}}</span></template>
          </el-table-column>
          <el-table-column prop="upperHash"  :label="$t('message.blockDetailList.transactionnumber')"  id="ellipsis" align="center"  min-width="25%">
            <template slot-scope="scope">
              <span class="spanUpperHash">{{handleData(scope.row.upperHash)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="account"  :label="$t('message.blockDetailList.sender')"  id="ellipsis" align="center"  min-width="24%">
            <template slot-scope="scope">
              <span  class="spanAccount">{{handleData(scope.row.account)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="fee" :label="$t('message.blockDetailList.servicecharge')"  align="center"  min-width="6%"></el-table-column>
          <el-table-column  width="30px"></el-table-column>
        </el-table>
      </div>
      <ul class="pagination">
        <li>
          <el-pagination background layout="prev, pager, next" small :page-size="20" :page-count="212" ></el-pagination>
        </li>
        <li>
          {{$t('message.hashList.goto')}}
          <div class="input"><input type="text" placeholder="100"></div>
          {{$t('message.hashList.page')}}
        </li>
        <li>
          <div class="sortButton">{{$t('message.hashList.confirm')}}</div>
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
      hash: "718B0EA840DAFD58B28065BD687D9C339262B34D9422439B51E06CE6288CBDF8"
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      this.hash = this.$route.params.hash;
      let data = {
        hash: this.hash,
        from: 1,
        to: 2,
        amount: 20
      };
      let res = await getBlockDetail(data);
      this.blockList = res.data.data.TX;
      console.log(res);
      this.bash = res.data.data.base;
    },
    handleData(value) {
      return value;
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
.spanUpperHash {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.spanAccount {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.spanAccount:hover {
  color: #06aaf9;
  font-size: 12px;
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