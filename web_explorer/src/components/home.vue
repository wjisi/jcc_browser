<template>
   <div id="home" >
     <span>
       <span style="height:24.3%;bottom:5px;"><img src="../images/index_top.png"></span>
       <span style="height:38.4%;top:10px;"><img src="../images/index_show.png"></span>
       <div></div>
     </span>
     <div class="init" >
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
         <div class="topRight" >
           <div id="changelan">
              <p>{{$t("message.home.basedon")}}<br>{{$t("message.home.decentralized ")}}</p>
              <el-dropdown @command="switchLanguage" trigger="click">
                <span class="el-dropdown-link">{{languageList[currentLanguage].name}}
                  <i class="iconfont icon-yuyanqiehuan"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="item.label" v-for="(item,index) in languageList" :key="index">{{item.name}}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
           </div>
           <span id="index_net"><img src="../images/index_net.png"></span>
        </div>
      </div>
        <div class="show">
          <div class="showTop">
            <div class="showTopLeft">
              <div class="showTopLeftValue"><span>{{$t("message.home.providefunction ")}}</span></div>
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
                        <p class="hash" >{{item.hash}}</p>
                        <p class="time" >{{item.dateTime}}</p>
                    </div>
                  </div>
                </li>
              </div>
              <div v-show="listnum.length === 0" class="v-show">{{$t('message.home.nodata')}}</div>
          </div>
       </div>
      <div class="end">
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
            <el-table :data="latestdeal"  style="fit:false;" :row-style="rowStyle"  :header-row-style="headerRowStyle" >
            <el-table-column type="index" :label="$t('message.hashList.sort')" width="195"  align="center" header-align="center">
            </el-table-column>
            <el-table-column id="hash" prop="_id" :label="$t('message.home.dealhash')" min-width="70%"  align="center" header-align="center">
            </el-table-column>
            <el-table-column prop="time" :label="$t('message.home.time')" min-width="15%"  align="center" header-align="center">
               <template slot-scope="scope">
                  <span class="hashSpan" >{{handleHashtime(scope.row.time)}}</span>
                </template>
            </el-table-column>
            </el-table>
         </div>
         <div class="endEnd">
            <div class="endEndLeft" >
              <img src="../images/logo_footer.png">
              <span>{{$t("message.homeTitle")}}</span>
              <div></div>
              <span>{{$t("message.home.anhui")}}</span>
            </div>
            <div class="endEndRignt">
              <span>{{$t("message.home.officialwebsite")}}</span>|
              <span>{{$t("message.home.cooperation")}}</span>|
              <span>{{$t("message.home.partners")}}</span>|
              <span>{{$t("message.home.Contactus")}}</span>
          </div>
        </div>
      </div>
    </div>
   </div>
</template>

<script>
import { getlastBlocklist, getLatestDeal } from "../js/fetch";
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
  methods: {
    getlastBlocklists() {
      getlastBlocklist()
        .then(data => {
          console.log(data, 1);
          this.listnum = data.data.list;
        })
        .catch(error => {
          this.$message.error(error.msg);
        });
    },
    getLatestDeals() {
      getLatestDeal()
        .then(data => {
          console.log(data, 2);
          this.latestdeal = data.data.list;
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
    handleHashtime(time) {
      let { fillZero } = this;
      let dateIn = new Date((time + 946684800) * 1000);
      let hashTime = "";
      // fillZero(dateIn.getDate());
      hashTime =
        fillZero(dateIn.getHours()) +
        ":" +
        fillZero(dateIn.getMinutes()) +
        " " +
        fillZero(dateIn.getFullYear()) +
        "-" +
        fillZero(dateIn.getMonth() + 1) +
        "-" +
        fillZero(dateIn.getDate());
      return hashTime;
    },
    fillZero(value) {
      if (value < 10) {
        value = "0" + value;
      }
      return value;
    },
    confirmSearch() {
      if (this.searchContent === "") {
        this.$message({
          type: "error",
          message: this.$t("message.inputSearchContent"),
          duration: 1600,
          showClose: true
        });
        return;
      }
      alert("跳转搜索结果页");
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
      align-items: center;
      justify-content: space-around;
      margin-top: 6%;
      margin-bottom: 5px;
    }
    p {
      width: 30%;
      font-size: 12px;
      color: #cee5ff;
      font-weight: bold;
      margin-left: 31%;
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
  width: 91.25%;
  margin-left: 4%;
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
  color: #c7cfd5;
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
}
.showEnd {
  width: 100%;
  height: 40%;
  display: flex;
  flex-direction: column;
  .v-show {
    width: 91.25%;
    height: 85px;
    margin-left: 4%;
    margin-top: 1.5%;
    color: #6f6868;
    display: flex;
    background-color: #f2f8fc;
    justify-content: center;
    align-items: center;
  }
}
.hash {
  width: 90%;
  height: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 12px;
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
  width: 91.25%;
  height: 22%;
  display: flex;
  align-items: center;
  margin-left: 4%;
  margin-top: 6%;
  justify-content: space-between;
}
.endTop {
  width: 91.25%;
  height: 22%;
  display: flex;
  align-items: center;
  margin-left: 4%;
  margin-top: 10%;
  justify-content: space-between;
}
.endEnd {
  position: relative;
  top: 270px;
  display: flex;
  align-items: center;
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
      width: 100px;
    }
    span:hover {
      color: #18c9dd;
      cursor: pointer;
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
</style>
