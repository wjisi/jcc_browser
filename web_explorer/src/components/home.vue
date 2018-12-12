<template>
  <div id="home">
    <!-- periodic table moudle -->
    <div class="kLineWrap">成交量及交易历史K线图</div>
    <div class="listWrap">
      <!-- latest block list -->
      <ul class="blockList">
        <li class="listHead">
          <div>
            <i class="iconfont icon-dashuju" style="font-size:20px;"></i><span>{{$t("message.block")}}</span>
          </div>
          <p>{{$t("message.viewall")}}</p>
        </li>
        <li></li>
      </ul>
      <div style="width:30px;"></div>
      <!-- latest transaction list -->
      <ul class="transactionList">
        <li class="listHead">
          <div>
          <i class="iconfont icon-jiaoyiguanli"></i><span>{{$t("message.transaction")}}</span>
          </div>
          <p>{{$t("message.viewall")}}</p>
        </li>
        <li></li>
      </ul>
    </div>
  </div>
</template>

<script>
// import { getDayBlocklist } from "../js/fetch";
export default {
  name: "home",
  data() {
    return {
      blockList: []
    };
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
      p {
        padding: 4px;
        margin-right: 16px;
        min-width: 65px;
        user-select: none;
        cursor: pointer;
        border: 1px solid #929292;
      }
    }
  }
}
</style>
