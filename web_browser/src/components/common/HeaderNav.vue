<template>
  <div id="headerNav">
    <div class="headLogo">
      <i class="iconfont icon-weichain_logo" style="color:#0f3988; font-size: 20px"></i>
    </div>
    <div class="headContent">
      <!-- Search part -->
      <div class="searchWrap">
        <div style="display:inline;cursor:pointer;" @click="toLogin">
          <span style="font-size:13px;color:#555;user-select:none;">{{$t("message.login")}}</span>
          <i class="iconfont icon-zhanghuanquan" style="font-size:13px;margin-right:20px;color:#555;"></i>
        </div>
        <div style="display:inline-block;white-space:nowrap;">
          <input type="text" v-model="searchContent" :placeholder="$t('message.searchPlaceholder')">
          <span class="serachButton" @click="confirmSearch">{{$t("message.search")}}</span>
        </div>
      </div>
      <!-- Nav part -->
      <div class="headNavbar">
        <span :class="{'navButton':true,'selectNav':currentView===item.to}" @click="navClick(item.to)" v-for="(item,index) in navTitles" :key="index" v-show="item.isShow">{{item.name}}</span>
      </div>
    </div>
    <!-- switch language -->
    <div class="languageSwitch">
      <el-popover placement="bottom" trigger="hover" v-model="showLanguage">
          <div v-for="(item,index) in languageList" :key="index"  @click="switchLanguage(index);" class="languageContent">
             <span :class="`jcc-${item.label}-icon`"></span>
            <div style="display:inline-block;min-width:60px;margin-left:15px;">{{item.name}}</div>
          </div>
          <div slot="reference" style="width:100px;color:#0f3988;position:relative;top:25px;left:10px;cursor:pointer;">
            <i class="iconfont icon-zixunzhongxinicon" style="font-size:13.5px;float:left;position:relative;top:2.5px;"></i>
            <span style="padding-left:4px;float:left;">{{languageList[currentLanguage].name}}</span>
          </div>
        </el-popover>
    </div>
  </div>
</template>

<script>
var homeTitle = document.getElementById("homepage_title");
export default {
  name: "headerNav",
  data() {
    return {
      currentView: "",
      searchContent: "",
      showLanguage: false,
      languageList: {
        zh: { label: "zh", name: "简体中文" },
        en: { label: "en", name: "English" }
      }
    };
  },
  created() {
    this.navClick("home");
  },
  computed: {
    currentLanguage() {
      return this.$i18n.locale;
    },
    navTitles() {
      return [
        { name: this.$t("message.indexPage"), isShow: true, to: "home" },
        { name: this.$t("message.blockchain"), isShow: true, to: "blockchain" },
        { name: this.$t("message.tokens"), isShow: true, to: "tokens" },
        { name: this.$t("message.moreInfo"), isShow: true, to: "moreInfo" }
      ];
    }
  },
  methods: {
    toLogin() {
      this.$router.push({ name: "login" });
    },
    navClick(to) {
      this.currentView = to;
      this.$router.push(`/${to}`);
    },
    confirmSearch() {
      if (this.searchContent === "") {
        this.$message({
          type: "error",
          message: "请输入搜索内容",
          duration: 1600,
          showClose: true
        });
        return;
      }
      alert("跳转搜索结果页");
    },
    switchLanguage(index) {
      let lang = this.languageList[index].label;
      this.$i18n.locale = lang;
      localStorage.setItem("languageType", lang);
      homeTitle.innerHTML = this.$t("message.homeTitle");
      this.showLanguage = false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/css/icon.scss";
#headerNav {
  font-size: 14px;
  display: flex;
  align-items: center;
  min-height: 88px;
  justify-content: space-between;
  padding: 0 30px;
  border-bottom: 2px solid #eeeeee;
}
.headLogo {
  width: 20%;
  min-width: 180px;
  padding-left: 20px;
  text-align: left;
}
.headContent {
  display: flex;
  flex-flow: column;
  width: 80%;
  min-width: 350px;
  height: 88px;
  font-weight: 500;
}
.searchWrap {
  box-sizing: border-box;
  width: 100%;
  padding: 15px 10px 0px 0;
  text-align: right;
  white-space: nowrap;
  align-items: flex-end;
  input {
    float: left;
    width: 320px;
    height: 28px;
    text-indent: 5px;
    // outline: none;
    font-size: 14px;
    border: 1px solid #c2c2c2;
    border-right: none;
  }
  .serachButton {
    display: inline-block;
    min-width: 45px;
    padding: 0 5px;
    height: 32px;
    line-height: 34px;
    text-align: center;
    background-color: rgb(59, 143, 238);
    color: #fff;
    user-select: none;
    border-radius: 0 3px 3px 0;
    cursor: pointer;
  }
}
.headNavbar {
  box-sizing: border-box;
  display: flex;
  white-space: nowrap;
  align-items: flex-end;
  justify-content: flex-start;
  min-width: 400px;
  height: 50px;
  .navButton {
    display: inline-block;
    height: 29px;
    min-width: 80px;
    padding: 0 5px;
    position: relative;
    top: 3px;
    border-bottom: 2px solid #eeeeee;
    color: #5f5f5f;
    cursor: pointer;
    &:hover {
      color: rgba(39, 101, 218, 0.8);
      border-bottom: 2px solid #2765dacc;
    }
  }
  .selectNav {
    color: rgba(39, 101, 218, 0.8);
    border-bottom: 2px solid #2765dacc;
  }
}

.languageContent {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 22px;
  margin: 0;
  color: #232b34;
  font-size: 13px;
  padding: 5px 0;
  line-height: 22px;
  border-radius: 2px;
  cursor: pointer;
  &:hover {
    background-color: #d0eaef;
  }
}
</style>