<template>
<div id="tradeValueDetail">
  <div class="tradeResult">{{$t('message.trade.effect')}}</div>
  <div class="index" v-show="listnum.length === 1">
    <ul>
      <li v-for="(item,index) of  listnum" :key="index"  >
        <span>{{item.message}}</span><span style="text-align:right">{{item.message}}</span>
      </li>
    </ul>
  </div>
  <div class="index" v-show="listnum.length === 2">
    <ul>
      <li v-for="(item,index) of  listnum" :key="index"  >
        <span>{{item.message}}</span><span style="text-align:right">{{item.message}}</span>
      </li>
    </ul>
  </div>
  <div class="index" v-show="listnum.length === 3">
    <ul>
      <li v-for="(item,index) of  listnum" :key="index"  >
        <span>{{item.message}}</span><span style="text-align:right">{{item.message}}</span>
      </li>
    </ul>
  </div>
  <div class="index" v-show="listnum.length === 4">
    <ul>
      <li v-for="(item,index) of  listnum" :key="index"  >
        <span>{{item.message}}</span><span style="text-align:right">{{item.message}}</span>
      </li>
    </ul>
  </div>
</div>
</template>
<script>
export default {
  data() {
    return {
      listnum: [
        { message: "foo" },
        { message: "boo" },
        { message: "coo" },
        { message: "doo" }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
.tradeResult {
  height: 40px;
  background: linear-gradient(to right, #23dccd, #04a8f9);
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
}
.index {
  width: 100%;
  height: 660px;
  background: #ffffff;
}
li {
  span {
    display: inline-block;
    width: calc(50% - 42px);
    height: 40;
    padding: 0px 20px;
    vertical-align: middle;
    border-bottom: 1px solid #e0e8ed;
    color: #868080;
    font-size: 14px;
    line-height: 40px;
  }
}
</style>