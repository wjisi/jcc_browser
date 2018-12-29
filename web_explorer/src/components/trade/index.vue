<template>
  <div id="trade" class="blo">
    <div class="selectionDate">
      <div class="blocktitle">
        <img src='../../images/latest_trade_title.png' />
        <span>{{$t('message.hashList.latestdeal')}}</span>
      </div>
      <div class="selectionButton">
        {{$t("message.screendate")}}
        <el-date-picker v-model="selectedDate" align="right"  type="date" :picker-options="pickerOptions"  value-format="yyyy-MM-dd" @change="setDatetiem"
        ></el-date-picker>
      </div>
    </div>
    <div class="bockList">
       <div class="bockListData">
         <el-table :data="blockList" style="width:100%" :row-style="rowStyle"  row-class-name="hashrowClass" header-row-class-name="hashHeaderRowclass">
         <el-table-column  width="46px"></el-table-column>
         <el-table-column type="index" :label="$t('message.hashList.sort')" width="80px"></el-table-column>
         <el-table-column prop="hash"  :label="$t('message.hashList.blockHash')"  id="ellipsis" align="center" header-align="center" min-width="67%">
             <template slot-scope="scope"><span class="hashSpan">{{handleData(scope.row.hash)}}</span></template>
         </el-table-column>
         <el-table-column prop="transNum"  :label="$t('message.transaction')"  align="right" header-align="right"   min-width="33%">
             <template slot-scope="scope"><span class="transNumSpan">{{handleData(scope.row.transNum)}}</span></template>
         </el-table-column>
          <el-table-column  width="46px"></el-table-column>
        </el-table>
       </div>
       <ul class="pagination">
         <li><el-pagination background layout="prev, pager, next" small     :page-size="20"  :page-count="212" ></el-pagination></li>
         <!-- <el-pagination small layout="prev, pager, next" background  ></el-pagination> -->
         <li>
          {{$t('message.hashList.goto')}}<div class="input"><input type="text" placeholder="100"></div>{{$t('message.hashList.page')}}
        </li>
         <li><div class="sortButton">{{$t('message.hashList.confirm')}}</div></li>
       </ul>
    </div>
  </div>
</template>
<script>
import { getBlocklist, getDayBlocklist } from "../../js/fetch";
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
      blockList: [],
      getRowClass: String,
      index: String,
      labelclass: String,
      hashtime: String
    };
  },
  created() {
    this.getAllList();
  },
  methods: {
    async getAllList(nums = 20) {
      let res = await getBlocklist(nums);
      this.blockList = res.data.data;
      console.log(this.blockList);
    },
    setDatetiem(val) {
      this.selectedDate = val;
    },
    async getListByFilter() {
      let data = {
        date: this.selectedDate,
        from: 1,
        to: 2,
        amount: 10
      };
      let res = await getDayBlocklist(data);
      this.blockList = res.data.data;
    },
    rowStyle({ row, rowIndex }) {
      return "height:40px";
    },
    handleData(value) {
      return value;
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
#hash .hashHeaderRowclass {
  color: #3b3f4c;
  font-size: 14px;
  height: 40px;
}
#hash .hashrowClass:nth-child(odd) {
  background: #f2f8fc;
  height: 40px;
}
#hash .hashrowClass td:nth-child(2) {
  color: #3b3f4c;
  font-size: 14px;
}
#hash .el-table .cell {
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
#hash .pagination .is-background {
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
#hash .el-pager .el-icon-more {
  display: none;
}
#hash .el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: rgba(255, 255, 255, 0);
}
</style>