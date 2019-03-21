<template>
  <div id="headerNav">
    <!-- logo -->
    <div class="headLogo" @click="backhome('home')">
      <img :src="logo" >
      <span>{{$t("message.homeTitle")}}</span>
    </div>
    <div style="display:flex;align-items:center;">
      <!-- login button -->
      <div style="display:inline-block;white-space:nowrap;cursor:pointer;margin-right:20px;" @click="toLogin">
        <span style="font-size:13px;user-select:none;">{{$t("message.login")}}</span>
        <i class="iconfont icon-xiangxiaxianshijiantou" style="font-size:15px;"></i>
      </div>
      <!-- search input -->
      <div class="searchWarp">
        <input type="text" v-model="searchContent" :placeholder="$t('message.searchPlaceholder')">
        <span class="serachButton" @click="confirmSearch">
          <i class="iconfont icon-sousuoicon"></i>
        </span>
      </div>
      <!-- switch language -->
      <el-dropdown @command="switchLanguage" trigger="click">
        <span class="el-dropdown-link">{{languageList[currentLanguage].name}}
          <i class="iconfont icon-yuyanqiehuan"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item :command="item.label" v-for="(item,index) in languageList" :key="index">{{item.name}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import logo from "@/images/logo_NavHead.png";
var homeTitle = document.getElementById("homepage_title");
export default {
  name: "headerNav",
  data() {
    return {
      logo,
      searchContent: "",
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
    },
    currentNav() {
      return this.$store.getters.currentNav;
    }
  },
  methods: {
    toLogin() {
      this.$router.push({ name: "login" });
    },
    confirmSearch(value) {
      if (this.searchContent === "") {
        this.$message({
          type: "error",
          message: this.$t("message.inputSearchContent"),
          duration: 1600,
          showClose: true
        });
      } else if (/^\d{64}$/.test(this.searchContent)) {
        this.$router.push({
          name: "wallet",
          params: { wallet: this.searchContent }
        });
      } else if (/^\d{32}$/.test(this.searchContent)) {
        this.$router.push({
          name: "wallet",
          params: { wallet: this.searchContent }
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
    // confirmSearch() {
    //   if (this.searchContent === "") {
    //     this.$message({
    //       type: "error",
    //       message: this.$t("message.inputSearchContent"),
    //       duration: 1600,
    //       showClose: true
    //     });
    //   } else {
    //   }
    // },
    switchLanguage(lang) {
      this.$i18n.locale = lang;
      localStorage.setItem("languageType", lang);
      homeTitle.innerHTML = this.$t("message.homeTitle");
      this.showLanguage = false;
    },
    backhome(to) {
      this.$store.dispatch("updateCurrentNav", to);
      this.$router.push(`/${to}`);
    }
  }
};
</script>

<style lang="scss" scoped>
#headerNav {
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 70px;
  padding: 0 70px;
  background-color: #234ade;
  color: #f4f4fb;
}
.headLogo {
  display: flex;
  align-items: center;
  margin-right: 20px;
  cursor: pointer;
  img {
    width: 40px;
    height: 40px;
  }
  span {
    display: inline-block;
    font-size: 18px;
    color: #f4f4fb;
    margin-left: 20px;
    text-align: left;
  }
}
.searchWarp {
  display: inline-block;
  white-space: nowrap;
  margin-right: 40px;
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
</style>