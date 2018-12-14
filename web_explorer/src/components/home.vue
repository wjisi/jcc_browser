<template>
  <div id="home">
    <!-- periodic table moudle -->
    <div class="kLineWrap">{{$t("message.kLine")}}</div>
    <div class="listWrap">
      <!-- latest block list -->
      <ul class="blockList">
        <div style="position:relative;overflowvisible;">
          <li class="listHead">
            <div>
              <i class="iconfont icon-dashuju" style="font-size:20px;"></i>
              <span>{{$t("message.block")}}</span>
            </div>
            <button @click="searchAll('block')" class="button">
              {{$t("message.viewall")}}
            </button>
          </li>
          <div style>
            <li v-for="(item  , index) of  listnum" :key="index">
              <div class="listsmallleft">
                <div class="leftlist">
                  <div class="dateTime">
                    <div style="color: white; ">{{item.dateTime}}</div>
                  </div>
                </div>
                <div class="rightlist">
                  <div class="_id">ID:{{item._id}}</div>
                  <div class="time">{{$t("message.time")}}:{{item.dateTime}}</div>
                  <div class="hash">{{item.time}}</div>
                </div>
              </div>
            </li>
          </div>
        </div>
      </ul>
      <div style="width:30px;"></div>
      <!-- latest transaction list -->
      <ul class="transactionList">
        <li class="listHead">
          <div>
            <i class="iconfont icon-jiaoyiguanli"></i>
            <span>{{$t("message.transaction")}}</span>
          </div>
            <button class="button">{{$t("message.viewall")}}</button>
        </li>
        <li v-for="(item  , index) of  listnum" :key="index">
          <div class="listsmallleft">
            <div class="leftlist">
              <div class="dateTime">
                <div style="color: white; ">{{item.dateTime}}</div>
              </div>
            </div>
            <div class="rightlist">
              <div class="_id">ID:{{item._id}}</div>
              <div class="time">{{$t("message.time")}}:{{item.dateTime}}</div>
              <div class="hash">{{$t("message.time")}}:{{item.time}}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getBlocklist } from "../js/fetch";
export default {
  name: "home",
  created() {
    this.$store.commit("updateContentTitle", "close");
    this.getBlocklists();
  },
  data() {
    return {
      listnum: []
    };
  },
  methods: {
    getBlocklists() {
      getBlocklist(5)
        .then(data => {
          console.log(data);
          this.listnum = data.data.data;
        })
        .catch(error => {
          this.$message.error(error.msg);
        });
    },
    searchAll(to) {
      this.$store.dispatch("updateCurrentNav", to);
      this.$router.push(`/${to}`);
    }
  }
};
</script>

<style lang="scss" scoped>
#home {
  width: 96%;
  padding: 2%;
  min-height: 510px;
  font-size: 13px;
  color: #464646;
}
.kLineWrap {
  height: 100px;
  line-height: 100px;
  margin-bottom: 20px;
  border-radius: 5px;
  background-color: #fff;
}
.listWrap {
  display: flex;
  align-items: start;
  justify-content: space-between;
  ul {
    list-style: none;
    padding: 0;
    width: 50%;
    border-radius: 1px;
    .listHead {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 44px;
      background-color: #fff;
      border-bottom: 3px solid #f8f8f8;
      div {
        margin-left: 16px;
        font-size: 16px;
        font-weight: 400;
        color: #4e4e4e;
        i {
          margin-right: 4px;
        }
      }
    }
    .listsmallleft {
      height: 120px;
      width: 100%;
      border: 1px #ccc;
      background-color: #ffffff;
      margin-top: 3px;
      display: flex;
    }
    .leftlist {
      height: 100%;
      width: 50%;
      display: flex;
      justify-content: center;
      flex-direction: column;
    }
    .dateTime {
      height: 70%;
      width: 60%;
      background-color: #929292;
      margin-left: 20%;
      display: flex;
      justify-content: center;
      flex-direction: column;
      font-size: 30%px;
    }
    .rightlist {
      height: 100%;
      width: 50%;
      display: flex;
      justify-content: center;
      flex-direction: column;
      text-align: left;
      font-size: 30%;
      line-height: 30px;
    }
    .button {
      padding: 4px;
      margin-right: 16px;
      min-width: 65px;
      user-select: none;
      cursor: pointer;
      border: 1px solid #929292;
    }
  }
}
</style>
