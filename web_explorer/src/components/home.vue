<template>
   <div id="home" >
     <section>
       <span style="height:24.3%;bottom:50px;padding:0;margin:0;"><img src="../images/index_top.png" style="width:100%height:100%;"></span>
     </section>
     <section class="init">
       <div class="top">
         <div class="topLeft">
            <div class="index" ><img src="../images/logo_index.png"></div>
            <p class="browser">{{$t("message.homeTitle")}}</p>
            <div class="searchWarp">
              <input type="text" v-model="searchContent" :placeholder="$t('message.searchPlaceholder')">
              <span class="serachButton"  @click="confirmSearch">
                <i class="iconfont icon-sousuoicon"></i>
              </span>
            </div>
         </div>
         <div class="topRight" style="position:relative">
          <div id="changelan">
            <el-dropdown @command="switchLanguage" trigger="click">
              <span class="el-dropdown-link">{{languageList[currentLanguage].name}}
                <i class="iconfont icon-yuyanqiehuan"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="item.label" v-for="(item,index) in languageList" :key="index">{{item.name}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
           </div>
          <div class="state">
             <span>{{$t("message.home.basedon")}}<br>{{$t("message.home.decentralized ")}}</span>
          </div>
          <span id="index_net"><img src="../images/index_net.png" style="width:100%height:100%"></span>
         </div>
        </div>
        <div style="position:absolute;top:100%;right:5%;display:flex;align-items:center;">
          <span  style="color:#828f90;font-size:16px;">{{$t('message.home.Update')}}</span>
          <el-switch style="width:42px;height:42px;margin-left:10px" v-model="showSwitch" active-color="#18c79e" inactive-color="#cbd1d2"  @change="isrefreshData"></el-switch>
        </div>
     </section>
     <section >
      <div class="pilot">
        <div style="display:flex;align-items:center;">
          <img src="../images/block_height_title.png" style="height:60px;width:50px;">
          <span class="block">{{$t("message.blockList.blockheight")}}</span>
        </div>
        <span class="buttom" @click="searchAll('block')">
          <i class="iconfont icon-chakangengduoicon"></i>
          {{$t("message.viewall")}}</span>
      </div>
      <div id="list"   v-show="listnum.length !==0">
          <li v-for="(item,index) of  listnum" :key="index" :class="'class'+index" >
            <div style="display:flex;">
              <div id="erect">
                <div :class="'className'+index"></div>
              </div>
              <div id="listValue">
                <div>
                  <div id="_id">{{$t("message.home.height")}}:{{item._id}}</div>
                  <span>
                    <p style="font-size:20px;">{{item.transNum}}</p>
                    <p style="font-size:15px;">{{$t("message.home.dealNums")}}</p>
                  </span>
                </div>
                  <p class="hash"  style="font-size:12px;" @click="jumpDetail('blockDetail',item.hash)" >{{item.hash}}</p>
                  <p class="time" >{{handleHashtime(item.time)}}</p>
              </div>
            </div>
          </li>
        </div>
        <div v-show="listnum.length === 0" class="v-show" style="background-color:#fff;margin:0 5%;padding:40px 0;">{{$t('message.home.nodata')}}</div>
     </section>
     <section>
      <div class="end" style="margin:0 5%;">
        <div class="endTop" >
          <div style="display:flex;align-items:center;">
            <img src="../images/latest_trade_title.png" style="height:60px;width:50px;">
            <span class="block">{{$t("message.hashList.latestdeal")}}</span>
          </div>
          <span class="buttom" @click="searchAll('trade')" >
            <i class="iconfont icon-chakangengduoicon"></i>
            {{$t("message.viewall")}}</span>
        </div>
        <div class="endMidder">
           <el-table :data="latestdeal" style="width:100%" :row-style="rowStyle"  row-class-name="traderowClass" header-row-class-name="tradeHeaderRowclass">
           <!-- <div slot="empty" style="font-size:18px;">
            <div v-if="loading" v-loading="true" element-loading-spinner="el-icon-loading" element-loading-text="拼命加载中"></div>
            <div v-else ><img src='../../images/not _found_list.png' /></div>
          </div> -->
          <el-table-column  width="30px"></el-table-column>
          <!-- <el-table-column prop="sort" :label="$t('message.hashList.sort')" min-width="8%"></el-table-column> -->
           <el-table-column type="index" :label="$t('message.blockDetailList.serialnumber')" min-width="8%"></el-table-column>
          <!-- <el-table-column prop="seq"  :label="$t('message.blockDetailList.serialnumber')"  id="ellipsis" min-width="12%">
            <template slot-scope="scope">
              <i class="iconfont"  :class="scope.row.matchFlag" style="font-size:15px;color: #18c9dd;"></i>{{scope.row.seq}}
            </template>
          </el-table-column> -->
          <el-table-column prop="type" :label="$t('message.blockDetailList.transactiontype')" id="ellipsis" min-width="13%" align="center" header-align="center">
             <template slot-scope="scope">
              <i class="iconfont"  :class="scope.row.matchFlag" style="font-size:15px;color: #18c9dd;"></i>{{scope.row.type}}
            </template>
          </el-table-column>
           <el-table-column prop="flag" :label="$t('message.blockDetailList.transactionmode')" id="ellipsis" min-width="13%" align="center">
               <template slot-scope="scope">
                  <span :style="{ color:scope.row.displayDifferentColor }">{{scope.row.flag}}</span>
              </template>
          </el-table-column>
          <el-table-column prop="_id"  :label="$t('message.home.dealhash')"  id="ellipsis" align="center" header-align="center" min-width="47%">
            <template slot-scope="scope">
              <span class="hashSpan" @click="jumpDetail(scope.row._id)">{{handleData(scope.row._id)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="transactionAmount"  :label="$t('message.trade.tradeVolume')"  id="ellipsis"  align="center"  min-width="14%" >
            <template slot-scope="scope">
                <span v-show="scope.row.takerPaysValue" class="pays">
                    <span>{{scope.row.takerPaysValue}}</span>
                    <span>{{scope.row.takerPaysCurrency}}</span>
                    <i class="iconfont icon-jiaoyijineshuliangzhuanhuan paysI"></i>
                    <span>{{scope.row.takerGetsValue}}</span>
                    <span>{{scope.row.takerGetsCurrency}}</span>
                </span>
                <span v-show="!scope.row.takerPaysValue">
                      <span>{{scope.row.takerValue}}</span><span>{{scope.row.takerCurreny}}</span>
                </span>
            </template>
          </el-table-column>
          <el-table-column width="30px"></el-table-column>
        </el-table>
        </div>
    </div>
     </section>
     <section>
      <div class="endEnd">
        <div class="endEndLeft" >
          <img src="../images/logo_footer.png">
          <span>{{$t("message.homeTitle")}}</span>
          <div></div>
          <span>{{$t("message.home.anhui")}}</span>
        </div>
        <div class="endEndRignt">
          <span>{{$t("message.home.officialwebsite")}}</span>
          <div></div>
          <span>{{$t("message.home.Contactus")}}</span>
        </div>
      </div>
     </section>
   </div>
</template>
<script>
import { getlastBlocklist, getLatestDeal, getBlockDetail } from "../js/fetch";
import {
  getTransactionType,
  getTransactionMode,
  getFlagColor
} from "@/js/utils";
var homeTitle = document.getElementById("homepage_title");
export default {
  name: "home",
  created() {
    this.getlastBlocklists();
    this.getLatestDeals();
  },
  data() {
    return {
      searchContent: "",
      listnum: [],
      latestdeal: [],
      showLanguage: false,
      showSwitch: false,
      timer: "",
      languageList: {
        zh: { label: "zh", name: "简体中文" },
        en: { label: "en", name: "English" }
      }
    };
  },
  computed: {
    currentLanguage() {
      return this.$i18n.locale;
    }
  },
  beforeDestory() {
    clearInterval(this.timer);
  },
  methods: {
    async getlastBlocklists() {
      this.listnum = [];
      let res = await getlastBlocklist();
      console.log(res, "shou ye 1");
      if (res.result === true && (res.code === 0 || res.code === "0")) {
        this.listnum = res.data.list;
        console.log(this.listnum);
      }
    },
    async getLatestDeals() {
      this.latestdeal = [];
      let res = await getLatestDeal();
      console.log(res, "shou ye 2");
      if (res.result === true && (res.code === 0 || res.code === "0")) {
        this.latestdeal = this.handleGetData(res.data.list);
      }
    },
    searchAll(to) {
      this.$store.dispatch("updateCurrentNav", to);
      this.$router.push(`/${to}`);
    },
    rowStyle({ row, rowIndex }) {
      if (rowIndex % 2 === 0) {
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
    },
    switchLanguage(lang) {
      this.$i18n.locale = lang;
      localStorage.setItem("languageType", lang);
      homeTitle.innerHTML = this.$t("message.homeTitle");
      this.showLanguage = false;
    },
    isrefreshData() {
      clearInterval(this.timer);
      if (this.showSwitch) {
        setInterval(() => {
          this.getlastBlocklists();
          this.getLatestDeals();
        }, 10000);
      }
      // console.log(this.showSwitch);
    },
    handleGetData(res) {
      let i = 0;
      let list = [];
      for (; i < res.length; i++) {
        list.push({
          // sort: (this.currentPage - 1) * 20 + i + 1,
          // seq: res[i].seq || "----",
          _id: res[i]._id,
          type: getTransactionType(res[i].type) || "---",
          flag:
            getTransactionMode(res[i].flag) ||
            getTransactionMode(res[i].type) ||
            "----",
          displayDifferentColor:
            getFlagColor(res[i].flag) || getFlagColor(res[i].type) || "",
          takerPaysCurrency: this.displayDefaultCurrency(res[i].takerPays)
            .currency,
          takerPaysValue: this.displayDefaultValues(res[i].takerPays).value,
          takerGetsCurrency: this.displayDefaultCurrency(res[i].takerGets)
            .currency,
          takerGetsValue:
            this.displayDefaultValues(res[i].takerGets).value || "----",
          takerCurreny: this.displayDefaultCurrency(res[i].amount).currency,
          takerValue: this.displayDefaultValues(res[i].amount).value || "----",
          // takerFlag: this.judgeIsMatch(res[i].takerFlag) || "---",
          // displayDifferentCircles: getType(res.data.list[i].flag) || "",
          // transNum: this.handleData(res[i].transNum, 1),
          // hash: res[i].hash,
          time: this.handleHashtime(res[i].time)
        });
      }
      // this.defaultValue = "---";
      return list;
    },
    displayDefaultValues(value) {
      if (value) {
        return value;
      } else {
        return { value: undefined };
      }
    },
    displayDefaultCurrency(value) {
      if (value) {
        return value;
      } else {
        return { currency: undefined };
      }
    },
    handleHashtime(time) {
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
    },
    fillZero(value) {
      if (value < 10) {
        value = "0" + value;
      }
      return value;
    },
    jumpDetail(name, hash) {
      this.$router.push({
        name: name,
        params: { hash: hash }
      });
    },
    displayDefaultHashType(value) {
      if (value) {
        return value;
      } else {
        return { value: undefined };
      }
    },
    getHashType(key) {
      let map = new Map([[1, "blockDetail"], [2, "tradeDetail"]]);
      console.log(map.get(key), "135465");
      return map.get(key);
    },
    async jumpDetailByHash(value) {
      let res = await getBlockDetail(value);
      console.log(res, value);
      if (res.result === true && (res.code === 0 || res.code === "0")) {
        let hashType =
          this.getHashType(this.displayDefaultHashType(res.data).hashType) ||
          this.getHashType(res.data.info.hashType);
        console.log(hashType, 1);
        this.$router.push({
          name: hashType,
          params: { hash: value }
        });
      } else {
        this.$message({
          type: "error",
          message: this.$t("message.inputCorrectSearchContent"),
          duration: 1600,
          showClose: true
        });
      }
    },
    confirmSearch(value) {
      if (this.searchContent === "") {
        this.$message({
          type: "error",
          message: this.$t("message.inputSearchContent"),
          duration: 1600,
          showClose: true
        });
      } else if (/^[0-9A-Za-z]{34}$/.test(this.searchContent)) {
        this.$router.push({
          name: "wallet",
          params: { wallet: this.searchContent }
        });
      } else if (/^[0-9A-Za-z]{64}$/.test(this.searchContent)) {
        this.jumpDetailByHash(this.searchContent);
      } else {
        this.$message({
          type: "error",
          message: this.$t("message.inputCorrectSearchContent"),
          duration: 1600,
          showClose: true
        });
      }
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
  span > span {
    position: relative;
  }
  span > div {
    height: 850px;
    background: #1850d7;
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
    #changelan {
      display: flex;
      justify-content: flex-end;
      margin-top: 6%;
      margin-bottom: 5px;
      margin-right: 5%;
    }
    .state {
      color: #cee5ff;
      font-weight: bold;
      position: absolute;
      top: 26%;
      right: 35%;
      font-size: 14px;
    }
    #index_net {
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
.el-dropdown-link {
  display: inline-block;
  white-space: nowrap;
  height: 36px;
  border: 1px solid #18c9dd;
  border-radius: 6px;
  line-height: 38px;
  padding: 0 10px;
  color: #fff;
  cursor: pointer;
  margin-right: 4%;
  i {
    font-size: 8px;
    margin-left: 8px;
    position: relative;
    bottom: 1px;
  }
}
.el-dropdown-menu {
  background-color: #fff;
  .el-dropdown-menu__item {
    padding: 0 22px;
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
  // width: 91.25%;
  margin-top: 1.5%;
  // height: 450px;
  .idSpan2 {
    color: #6f6868;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .idSpan2:hover {
    color: #06aaf9;
    cursor: pointer;
  }
}
.buttom {
  width: 150px;
  color: #b1c0cb;
  text-align: right;
}
.buttom:hover {
  color: #18c9dd;
  cursor: pointer;
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
.searchWarp {
  display: inline-block;
  white-space: nowrap;
  margin-left: 19%;
  margin-top: 8%;
  min-width: 320px;
  input {
    float: left;
    width: 320px;
    height: 40px;
    text-indent: 5px;
    font-size: 14px;
    border: none;
    border-radius: 4px 0 0 4px;
    background-color: #f9f9f9;
  }
  .serachButton {
    display: inline-block;
    min-width: 45px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background-color: #18c9dd;
    color: #fff;
    user-select: none;
    border-radius: 0 4px 4px 0;
    cursor: pointer;
  }
}
#list {
  display: flex;
  width: 91.25%;
  height: 85px;
  margin-left: 4%;
  margin-top: 1.5%;
  li {
    background-color: #fff;
    width: 16.6%;
    height: 190px;
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
}
.showEnd {
  width: 100%;
  height: 40%;
  display: flex;
  flex-direction: column;
  .v-show {
    width: 91.25%;
    height: 185px;
    margin-left: 4%;
    margin-top: 1.5%;
    color: #6f6868;
    display: flex;
    background-color: black;
    justify-content: center;
    align-items: center;
  }
}
.hash {
  width: 90%;
  height: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
  margin-top: 10%;
  color: #6f6868;
}
.hash:hover {
  color: #06aaf9;
  cursor: pointer;
}
.time {
  margin-top: 8%;
  color: #8a8d90;
  font-size: 12px;
  text-align: left;
}
.pilot {
  padding: 0 5%;
  height: 22%;
  display: flex;
  align-items: center;
  margin-top: 6%;
  margin-bottom: 1%;
  justify-content: space-between;
}
.endTop {
  height: 22%;
  display: flex;
  align-items: center;
  margin-top: 11%;
  justify-content: space-between;
}
.endEnd {
  position: relative;
  display: flex;
  background: #1850d7;
  align-items: center;
  padding: 30px 5%;
  margin-top: 80px;
  justify-content: space-between;
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
    text-align: right;
    // margin-left:100px;
    // span {
    //   width: 100px;
    // }
    span:hover {
      color: #18c9dd;
      cursor: pointer;
    }
    div {
      margin: 0 20px;
      width: 2px;
      height: 14px;
      background: #eef1fe;
      border-radius: 1px;
    }
  }
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
.hashSpan {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #3b3f4c;
  font-size: 14px;
  cursor: pointer;
}
.hashSpan:hover {
  color: #06aaf9;
}
</style>