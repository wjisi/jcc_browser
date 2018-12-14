<template>
  <div id="block">
    <div class="selectionDate">
      <div class="demonstration">{{$t("message.selectiondate")}}</div>
      <el-date-picker v-model="selectedDate" align="right" type="date" :picker-options="pickerOptions" value-format="yyyy-MM-dd" @change="setDatetiem"></el-date-picker>
    </div>
    <el-table :data="blockList" style="width:100%" height="100%">
      <el-table-column prop="_id" :label="$t('message.blockList.id')" width="110%"></el-table-column>
      <el-table-column prop="dateTime" :label="$t('message.blockList.dateTime')" width="200%"></el-table-column>
      <el-table-column prop="hash" :label="$t('message.hash')" width="350"></el-table-column>
      <el-table-column prop="parentHash" :label="$t('message.blockList.parentHash')" width="350"></el-table-column>
      <el-table-column prop="transNum" :label="$t('message.blockList.transctionNums')" width="100"></el-table-column>
    </el-table>
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
  display: flex;
  min-width: 700px;
  justify-content: center;
  margin-bottom: 30px;
  overflow: hidden;
}
</style>
