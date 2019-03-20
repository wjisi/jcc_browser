<template>
  <div id="block" class="blo">
    <div class="selectionDate">
      <div class="blocktitle">
        <img src='../../images/block_height_title.png' />
        <span>{{$t('message.blockList.blockheight')}}</span>
      </div>
      <div class="selectionButton">
        {{$t("message.screendate")}}
        <el-date-picker v-model="selectedDate" align="right"  type="date" :picker-options="pickerOptions"  value-format="yyyy-MM-dd" @change="setDatetiem"></el-date-picker>
        <Button>{{$t('message.blockList.confirm')}}</Button>
      </div>
    </div>
    <div class="bockList">
      <div class="bockListData">
        <el-table :data="blockList" style="width:100%"  row-class-name="blockRowClass" header-row-class-name="blockHeaderRowclass">
           <div slot="empty" style="font-size:18px;">
            <div v-if="loading" v-loading="true" element-loading-spinner="el-icon-loading" element-loading-text="拼命加载中"></div>
            <div v-else >暂无数据</div>
          </div>
          <el-table-column  width="46px"></el-table-column>
          <el-table-column type="index" :label="$t('message.blockList.sort')" min-width="15%"></el-table-column>
          <el-table-column prop="_id" :label="$t('message.blockList.blockheight')"  min-width="18%"  align="center" header-align="center">
            <template slot-scope="scope">
              <span class="idSpan" @click="jumpDetail(scope.row.hash)">{{handleData(scope.row._id)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="time" :label="$t('message.blockList.dateTime')"  min-width="22%"  header-align="center" align="center">
            <template slot-scope="scope">
              <span style="margin-right:10px;">{{scope.row.time.time}}</span>
              <span>{{scope.row.time.date}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="transNum" min-width="13%"  :label="$t('message.blockList.transctionNums')"  align="center" header-align="center">
            <template slot-scope="scope">
              <span class="transNumSpan">{{handleData(scope.row.transNum)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="hash"  :label="$t('message.hash')"  id="ellipsis" align="right" header-align="center" min-width="32%">
            <template slot-scope="scope">
              <span class="hashSpan" @click="jumpDetail(scope.row.hash)">{{handleData(scope.row.hash)}}</span>
            </template>
          </el-table-column>
          <el-table-column  width="46px" ></el-table-column>
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
import { getBlocklist } from "../../js/fetch";
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
      blockList: [],
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
      debugger;
      let res = await getBlocklist(data);
      console.log(res, 1);
      console.log(res.result, 2);
      if (res.result === true && (res.code === 0 || res.code === "0")) {
        this.total = res.data.count;
        this.blockList = this.handleGetData(res.data.list);
      }
      this.loading = false;
    },
    setDatetiem(val) {
      this.selectedDate = val;
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
      return hashTime;
    },
    handleData(value) {
      return value;
    },
    jumpDetail(hash) {
      this.$router.push({
        name: "blockDetail",
        params: { hash: hash }
      });
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
#block {
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
  .selectionButton {
    float: left;
    height: 30px;
    margin-right: 20%;
    button {
      height: 37px;
    }
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
    cursor: pointer;
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
#block .rowClass td:nth-child(2) {
  color: #3b3f4c;
  font-size: 14px;
}
.rowClass:hover {
  background-color: rgba(255, 255, 255, 1);
}
#block .el-table .cell {
  .timespan {
    margin-left: 10px;
  }
  .idSpan {
    color: #18c9dd;
  }
  .idSpan:hover {
    color: #06aaf9;
    font-size: 14px;
    cursor: pointer;
  }
  .timespan {
    color: #6f6868;
  }
  .transNumSpan {
    color: #6f6868;
  }
  .hashSpan {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #3b3f4c;
    font-size: 14px;
  }
  .hashSpan:hover {
    color: #06aaf9;
    cursor: pointer;
  }
}
</style>
<style  lang="scss"  >
#block .pagination .is-background {
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
#block .el-pager .el-icon-more {
  display: none;
}
#block .el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: rgba(255, 255, 255, 0);
}
#block .blockHeaderRowclass {
  color: #3b3f4c;
  font-size: 14px;
  height: 40px;
}
#block .blockRowClass:nth-child(odd) {
  background: #f2f8fc;
  height: 40px;
}
.selectionButton .el-date-editor {
  width: 150px;
}
</style>
