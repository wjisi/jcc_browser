<template>
  <div id="block">
    <div class="selectionDate">
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

      <div class="block">
        <el-pagination :page-size="20" :pager-count="11" layout="prev, pager, next" :total="1000"></el-pagination>
      </div>
    </div>
    <div class="bockList">
      <el-table :data="blockList" style="width:100%">
        <el-table-column prop="_id" :label="$t('message.blockList.height')" style="width:10%"></el-table-column>
        <el-table-column
          prop="dateTime"
          :label="$t('message.blockList.dateTime')"
          style="width:20%"
        ></el-table-column>
        <el-table-column
          prop="transNum"
          :label="$t('message.blockList.transctionNums')"
          style="width:10%"
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
    <el-pagination
      :page-size="20"
      :pager-count="11"
      layout="prev, pager, next"
      :total="1000"
      style="width:30%"
    ></el-pagination>
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
  min-width: 800px;
  background-color: white;
}
.demonstration {
  font-weight: bold;
  font-size: 18px;
}
.selectionDate {
  margin-top: 30px;
  margin-bottom: 50px;
  .selectionButton {
    float: left;
    width: 350px;
    height: 40px;
  }
}
</style>
