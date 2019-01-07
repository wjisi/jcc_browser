<template>
  <div id="tradeDetail">
    <div class="tradeDetailTitle">
      <span class="tille">
        {{$t('message.trade.number')}}:<span style="color:#06aaf9;padding-left:10px;">1</span>
      </span>
      <Ul>
        <li><span>{{$t('message.trade.type')}}</span><span>3</span></li><li><span>{{$t('message.trade.books')}}</span><span class="lasthash">4</span></li><li>
          <span>{{$t('message.trade.initiator')}}</span><span>5</span></li><li><span>{{$t('message.trade.costs')}}</span><span>6</span></li>
          <li><span>{{$t('message.trade.amount')}}</span><span>3</span></li><li><span>{{$t('message.trade.note')}}</span><span class="lasthash">4</span></li><li>
          <span>{{$t('message.trade.to')}}</span><span>5</span></li><li><span>{{$t('message.trade.results')}}</span><span>6</span></li>
          <li><span>{{$t('message.trade.dealamount')}}</span><span>3</span></li>
      </Ul>
    </div>
    <trade-value-detail></trade-value-detail>
  </div>
</template>

<script>
import tradeValueDetail from "./tradeValueDetail";
export default {
  components: {
    tradeValueDetail
  },
  name: "tradeDetail",
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
#tradeDetail {
  background-color: #f2f8fc;
  text-align: left;
  padding: 0 70px;
  min-width: 768px;
  height: 1100px;
}

.tradeDetailTitle {
  text-align: left;
  div {
    display: inline-block;
  }
  .tille {
    width: 50%;
    padding: 16px 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 14px;
    color: #3e3f45;
    float: left;
  }
  .tille:nth-child(2) {
    color: #18c9dd;
    font-size: 14px;
    white-space: nowrap;
    width: calc(50% - 20px);
  }
  ul {
    width: 100%;
    overflow: hidden;
    border: 2px solid #c1e9f1;
    border-radius: 8px;
    background: #ffffff;
    margin-bottom: 20px;

    li {
      display: inline-block;
      width: calc(50% - 41px);
      height: 40px;
      line-height: 40px;
      padding: 0 20px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      color: #5f5d5d;
      font-size: 14px;
      position: relative;
      vertical-align: top;
      span:nth-child(2) {
        white-space: nowrap;
        position: absolute;
        right: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .lasthash {
        width: calc(100% - 138px);
        font-size: 12px;
        text-align: right;
      }
    }
    li:nth-child(odd) {
      border-bottom: 1px solid #e0e8ed;
      border-right: 1px solid #e0e8ed;
    }
    li:nth-child(even) {
      border-bottom: 1px solid #e0e8ed;
    }
  }
}
</style>
