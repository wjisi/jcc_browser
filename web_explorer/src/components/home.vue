<template>
   <div id="home" >
     <span>
       <span style="height:24.3%; "><img src="../images/index_top.png"></span>
       <span style="height:38.4%;"><img src="../images/index_show.png"></span>
       <div></div>
     </span>
     <div class="init" >
      <div class="top">
         <div class="topLeft">
            <div class="index" ><img src="../images/logo_index.png"></div>
            <p class="browser">{{$t("message.home.browser")}}</p>
            <div class="search">
              <input type="text" id="in" :placeholder="$t('message.searchPlaceholder')" /><button class="btn_search" @click="serch()">{{$t("message.search")}}</button>
            </div>
         </div>
         <div class="topRight" >
            <p >{{$t("message.home.basedon")}}<br>{{$t("message.home.decentralized ")}}</p>
            <div><img src="../images/index_net.png"></div>
         </div>
      </div>
        <div class="show">
          <div class="showTop">
            <div class="showTopLeft">
              <div class="showTopLeftValue"><span>{{$t("message.home.providefunction")}}</span></div>
            </div>
            <div class="showTopRight">
              <div style="width:50%;margin-left:42%">
                <p id="title">{{$t("message.home.donot")}}</p>
                <p id="value">{{$t("message.home.donotvalue")}}</p>
                <div style="margin-left:10%;">
                  <p id="title">{{$t("message.home.realtime")}}</p>
                  <p id="value">{{$t("message.home.realtimevalue")}}</p>
                </div>
                <p id="title">{{$t("message.home.recordquery")}}</p>
                <p id="value">{{$t("message.home.recordqueryvalue")}}</p>
              </div>
            </div>
          </div>
          <div class="showEnd">
            <div class="showEndTop">
              <div style="display:flex;align-items:center;">
                <img src="../images/block_height_title.png" style="height:60px;width:50px;">
                <div class="block">{{$t("message.blockList.blockheight")}}</div>
              </div>
                <div class="buttom" @click="searchAll('block')">→{{$t("message.viewall")}}</div>
            </div>
              <div id="list">
                <li v-for="(item,index) of  listnum" :key="index" :class="'class'+index" >
                  <div style="display:flex;">
                    <div id="erect">
                      <div :class="'className'+index"></div>
                    </div>
                    <div id="listValue">
                      <div>
                        <p id="_id">{{$t("message.home.height")}} {{item._id}}</p>
                        <span>
                          <p style="font-size:20px;">{{item.transNum}}</p>
                          <p style="font-size:15px;">{{$t("message.home.dealNums")}}</p>
                        </span>
                      </div>
                        <p class="hash" >{{item.hash}}</p>
                        <p class="time" >{{item.dateTime}}</p>
                    </div>
                  </div>
                </li>
              </div>
          </div>
       </div>
      <div class="end">
        <div class="endTop" >
          <div style="display:flex;align-items:center;">
            <img src="../images/latest_trade_title.png" style="height:60px;width:50px;">
            <div class="block">{{$t("message.hashList.latestdeal")}}</div>
          </div>
          <div class="buttom" @click="searchAll('block')" >→{{$t("message.viewall")}}</div>
        </div>
         <div class="endMidder"  >
            <el-table :data="listnum"  style="width: 100%" :row-style="rowStyle"  :header-row-style="headerRowStyle">
            <el-table-column prop="_id" :label="$t('message.hashList.sort')" min-width="15%"  align="center" header-align="center">
              <template slot-scope="scope"><span class="idSpan2">{{handleData(scope.rowIndex)}}</span></template>
            </el-table-column>
            <el-table-column id="hash" prop="hash" :label="$t('message.hashList.blockHash')" min-width="70%"  align="center" header-align="center">
              <template slot-scope="scope"><span class="idSpan2">{{handleData(scope.row.hash)}}</span></template>
            </el-table-column>
            <el-table-column prop="transNum" :label="$t('message.home.deal')" min-width="15%"  align="center" header-align="center">
            </el-table-column>
            </el-table>
         </div>
         <div class="endEnd">
            <div class="endEndLeft" >
              <img src="../images/logo_footer.png">
              <span>{{$t("message.home.browser")}}</span>
              <div></div>
              <span>{{$t("message.home.anhui")}}</span>
            </div>
            <div class="endEndRignt">
              <span id="value">{{$t("message.home.officialwebsite")}}</span>|
              <span id="value">{{$t("message.home.cooperation")}}</span>|
              <span id="value">{{$t("message.home.partners")}}</span>|
              <span id="value">{{$t("message.home.Contactus")}}</span>
          </div>
        </div>
      </div>
    </div>
   </div>
</template>

<script>
import { getBlocklist } from "../js/fetch";
export default {
  name: "home",
  created() {
    this.getBlocklists();
  },
  data() {
    return {
      listnum: [],
      sort: [{ id: "1" }]
    };
  },
  methods: {
    getBlocklists() {
      getBlocklist(6)
        .then(data => {
          console.log(data);
          console.log(data.data.data.length);
          this.listnum = data.data.data;
        })
        .catch(error => {
          this.$message.error(error.msg);
        });
    },
    searchAll(to) {
      this.$store.dispatch("updateCurrentNav", to);
      this.$router.push(`/${to}`);
    },
    rowStyle({ row, rowIndex }) {
      if (rowIndex % 2 === 0) {
        console.log(rowIndex);
        return "background:#f2f8fc;color:#3b3f4c;font-size:14px;";
      } else {
        return "color:#3b3f4c;font-size:14px;";
      }
    },
    headerRowStyle() {
      return "font-size:14px;color:#3b3f4c;";
    },
    handleData(value) {
      return value;
    }
  }
};
</script>
<style lang="scss" scoped>
#home {
  width: 100%;
  background: #f2f8fc;
  display: flex;
  flex-direction: column;
  span > div {
    height: 800px;
    background: #1850d7;
    position: relative;
    bottom: 10px;
  }
  span > img {
    width: 100%;
    height: 100%;
  }
}
.init {
  position: absolute;
  width: 100%;
}
.top {
  width: 100%;
  height: 25%;
  display: flex;
  .topLeft {
    width: 50%;
    height: 100%;
    flex-direction: column;
  }
  .topRight {
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    p {
      font-size: 12px;
      color: #cee5ff;
      font-weight: bold;
      margin-top: 6%;
      margin-bottom: 5px;
    }
    div {
      width: 82%;
      height: 81.3%;
    }
    img {
      height: 100%;
      width: 100%;
      margin-left: 12%;
    }
  }
}
.show {
  width: 100%;
  height: 624px;
  display: flex;
  flex-direction: column;
  .showTop {
    width: 100%;
    height: 60%;
    display: flex;
    flex-direction: row;
  }
  .showTopLeft {
    width: 50%;
    height: 100%;
    .showTopLeftValue {
      float: left;
      color: #ffffff;
      background: linear-gradient(to right, #23dccd, #04a8f9);
      border-radius: 20px;
      text-align: left;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 25%;
      width: 54%;
      margin-top: 13%;
      margin-left: 11%;
      font-size: 18px;
      min-width: 320px;
      min-height: 94px;
      span {
        width: 85%;
      }
    }
  }
  .showTopRight {
    width: 50%;
    height: 100%;
    text-align: left;
    font-size: 14px;
    #title {
      color: #3b3434;
      margin-bottom: 9px;
      margin-top: 13%;
    }
    #value {
      color: #797b7e;
      width: 80%;
    }
  }
}
.endMidder {
  width: 91.25%;
  margin-left: 4%;
  margin-top: 1.5%;
  .idSpan2 {
    color: #6f6868;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .idSpan2:hover {
    color: #06aaf9;
  }
}
.buttom {
  width: 150px;
  color: #c7cfd5;
  text-align: right;
}
.buttom:hover {
  color: #18c9dd;
}
.index {
  height: 60px;
  width: 60px;
  margin-left: 54.5%;
  margin-top: 5%;
  img {
    width: 100%;
    height: 100%;
  }
}

.block {
  height: 40px;
  width: 120px;
  background: linear-gradient(to right, #23dccd, #04a8f9);
  margin-left: 20px;
  border-radius: 20px;
  color: #f2f8fc;
  display: flex;
  align-items: center;
  justify-content: center;
}
.browser {
  font-size: 22px;
  color: #f4f4fb;
  margin-top: 14px;
  height: 31px;
  width: 50%;
  margin-left: 34%;
  min-width: 176px;
}
.search {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-left: 19%;
  margin-top: 8%;
  min-width: 320px;
  #in {
    outline: none;
    width: 55%;
    height: 40px;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    font-size: 14px;
    color: #a19fae;
    border: none;
    outline: none;
  }
  .btn_search {
    width: 44px;
    height: 40px;
    color: #ffffff;
    background: #18c9dd;
    border: none;
    outline: none;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }
}
li {
  background-color: #f2f8fc;
  width: 16.6%;
  height: 190%;
  list-style-type: none;
  border-right: 1px solid;
  border-right-color: #e8e8e8;
  #listValue {
    width: 90%;
    height: 100%;
    margin-left: 4%;
    display: flex;
    flex-direction: column;
    div {
      width: 100%;
      height: 40%;
      display: flex;
    }
    #_id {
      width: 60%;
      text-align: left;
      margin-top: 22%;
    }
    span {
      width: 30%;
      display: flex;
      flex-direction: column;
      margin-top: 8%;
      p {
        color: #93a3b7;
      }
    }
  }
}
.showEnd {
  width: 100%;
  height: 40%;
  display: flex;
  flex-direction: column;
}
.showEndTop {
  width: 91.25%;
  height: 22%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 4%;
  margin-top: 6%;
  justify-content: space-between;
}
.hash {
  width: 90%;
  height: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 12px;
  margin-top: 15%;
  color: #6f6868;
}
.hash:hover {
  color: #06aaf9;
}
.time {
  margin-top: 3%;
  color: #8a8d90;
  font-size: 12px;
  text-align: left;
}
.endTop {
  width: 91.25%;
  height: 22%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 4%;
  margin-top: 10%;
  justify-content: space-between;
}
.endEnd {
  display: flex;
  align-items: center;
  height: 80px;
  width: 91.25%;
  margin-left: 4%;
  justify-content: space-between;
  margin-top: 5%;
  .endEndLeft {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #f4f5fe;
    width: 60%;
    span {
      margin-left: 10px;
    }
    div {
      margin-left: 10px;
      width: 2px;
      height: 14px;
      background: #eef1fe;
      border-radius: 1px;
    }
    img {
      height: 30px;
      width: 30px;
    }
  }
  .endEndRignt {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #6b9eff;
    span {
      margin-left: 3%;
      margin-right: 3%;
      width: 100px;
    }
    #value:hover {
      color: #18c9dd;
    }
  }
}
#list {
  display: flex;
  width: 91.25%;
  height: 85px;
  margin-left: 4%;
  margin-top: 1.5%;
}
#erect {
  height: 124px;
  width: 8px;
  background: #e8e8e8;
  border-radius: 8px;
  margin-top: 9%;
  margin-left: 7%;
}
.className0,
.className1,
.className2,
.className3,
.className4,
.className5 {
  height: 98px;
  width: 8px;
  border-radius: 8px;
  margin-top: 26px;
}
.className0 {
  background: #2783f7;
}
.className1 {
  background: #549fff;
}
.className2 {
  background: #49b6ff;
}
.className3 {
  background: #30c4fa;
}
.className4 {
  background: #2ce1e8;
}
.className5 {
  background: #35e3c1;
}
.class0 {
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
}
.class5 {
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
}
</style>
