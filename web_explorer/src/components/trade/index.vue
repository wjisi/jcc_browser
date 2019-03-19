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
            <div v-else >暂无数据</div>
          </div>
          <el-table-column  width="46px"></el-table-column>
          <el-table-column type="index" :label="$t('message.hashList.sort')" min-width="10%"></el-table-column>
          <el-table-column prop="_id"  :label="$t('message.hashList.blockHash')"  id="ellipsis" align="center" header-align="center" min-width="72%">
            <template slot-scope="scope">
              <span class="hashSpan">{{handleData(scope.row._id)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="transNum"  :label="$t('message.transaction')"  align="right" header-align="right"   min-width="18%">
            <template slot-scope="scope">
              <span class="transNumSpan">{{handleData(scope.row.transNum,1)}}</span>
            </template>
          </el-table-column>
          <el-table-column width="46px"></el-table-column>
        </el-table>
      </div>
        <ul class="pagination">
        <li>
          <el-pagination background layout="prev, pager, next" :total="total" :page-size="20" :current-page="parseInt(currentPage)" @current-change="handleCurrentChange"></el-pagination>
        </li>
        <li>{{$t('message.blockList.goto')}}
          <div class="inputDiv"><input type="text"  v-model="gopage" @focus="clearGopage"></div>
          <!-- placeholder="100" -->
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
export default {
  name: "trade",
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      selectedDate: "",
      tranList: [],
      getRowClass: String,
      index: String,
      labelclass: String,
      hashtime: String,
      total: 0,
      loading: false,
      currentPage: 1,
      gopage: 100
    };
  },
  created() {
    let data = {
      page: 0,
      size: 20
    };
    this.getAllList(data);
  },
  methods: {
    async getAllList(data) {
      if (this.loading) {
        return;
      }
      this.loading = true;
      let res = await getTranslist(data);
      console.log(res);

      if (res.result === true && (res.code === 0 || res.code === "0")) {
        this.total = res.data.count;
        this.tranList = res.data.list;
      }
      this.loading = false;
    },
    clearGopage() {
      this.gopage = "";
    },
    jumpSizeChange() {
      this.currentPage = this.gopage;
      let data = {
        size: 20,
        page: this.gopage || 100
      };
      this.loading = false;
      this.getAllList(data);
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
    setDatetiem(val) {
      this.selectedDate = val;
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
  min-width: 768px;
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
      width: 50px;
    }
    span {
      display: inline-block;
      width: 120px;
      height: 40px;
      line-height: 40px;
      border-radius: 21px;
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
#trade .el-pager .el-icon-more {
  display: none;
}
#trade .el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: rgba(255, 255, 255, 0);
}
</style>