<template>
  <div id="block">
    <div class="selectionDate">
      <div class="blocktitle">
        <i class="iconfont icon-jiaoyiguanli"></i>
        <span>区块高度</span>
      </div>
      <div class="selectionButton">
        {{$t("message.screendate")}}
        <el-date-picker
          v-model="selectedDate"
          align="right"
          type="date"
          :picker-options="pickerOptions"
          value-format="yyyy-MM-dd"
          @change="setDatetiem"
        ></el-date-picker>
        <button style="height:30px">确定</button>
      </div>
    </div>
    <div class="bockList">
      <el-table :data="blockList" style="width:100%" :stripe="true">
        <el-table-column prop="_id" :label="$t('message.blockList.height')" style="width:5%"></el-table-column>
        <el-table-column
          prop="dateTime"
          :label="$t('message.blockList.dateTime')"
          style="width:30%"
        ></el-table-column>
        <el-table-column
          prop="transNum"
          :label="$t('message.blockList.transctionNums')"
          style="width:5%"
          align="center"
        ></el-table-column>
        <el-table-column prop="hash" :label="$t('message.hash')" id="ellipsis" style="width:30%">
          <template slot-scope="scope">{{handleHashdata(scope.row.hash)}}</template>
        </el-table-column>
        <el-table-column
          prop="parentHash"
          :label="$t('message.blockList.parentHash')"
          id="ellipsis"
          style="width:30%"
        >
          <template slot-scope="scope">{{handleHashdata(scope.row.parentHash)}}</template>
        </el-table-column>
      </el-table>
    </div>
    <ul class="pagination">
      <li>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="1000"
          :page-size="20"
          :page-count="20"
        ></el-pagination>
      </li>
      <li>
        跳至
        <input type="text">
        页
      </li>
      <li>
        <button>确定</button>
      </li>
    </ul>
  </div>
</template>
<script>
import { getBlocklist, getDayBlocklist } from "../../js/fetch";
export default {
  name: "block",
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      selectedDate: "",
      blockList: []
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
    handleHashdata(value) {
      let hashdata = value.substring(0, 20) + "...";
      return hashdata;
    }
  }
};
</script>
<style lang="scss" scoped>
#block {
  width: 100%;
  min-height: 900px;
  min-width: 750px;
  background-color: white;
  text-align: center;
}
.demonstration {
  font-weight: bold;
  font-size: 18px;
}
.selectionDate {
  margin-top: 30px;
  margin-bottom: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .blocktitle span {
    display: inline-block;
    height: 40px;
    line-height: 40px;
    background: #120fe4;
    border-radius: 3px;
    padding: 0 5px;
    color: #fff;
  }
  .selectionButton {
    float: left;
    width: 350px;
    height: 30px;
  }
}
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  li {
    margin-right: 10px;
  }
  li input {
    border: 0px;
    outline: solid 1px #ccc;
    width: 35px;
    height: 23px;
  }
}
</style>