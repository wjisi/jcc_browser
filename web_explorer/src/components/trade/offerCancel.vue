<template>
  <div id="offerCancel" class="blo">
    <div class="offerCancelTitle">
      <div class="walletHeader">
        <div> {{$t('message.trade.number')}}:<span style="color:#06aaf9;padding-left:10px;">#{{transactionNumber}}</span></div>
        <div class="tille" >{{$t('message.trade.narrationAndOthers')}} <i class="iconfont icon-xiangxiaxianshijiantou tilleIcon"></i></div>
      </div>
      <Ul>
        <li>
           <div><span>{{$t('message.trade.type')}}</span>  <span>{{transnumkList.type}}</span></div>
           <div><span>{{$t('message.trade.booknumber')}}</span>  <span>{{transnumkList.block}}</span></div>
        </li>
          <li>
           <div><span>{{$t('message.trade.initiator')}}</span>  <span>{{transnumkList.account}}</span></div>
           <div><span>{{$t('message.trade.fuelCosts')}}</span>  <span>{{transnumkList.fee}}</span></div>
        </li>
         <li>
           <div>
               <span>{{$t('message.trade.entrustAmount')}}</span>
               <span v-show="transnumkList.realPaysValue">
                 <span>{{transnumkList.realPaysValue}}</span>
                 <span>{{transnumkList.realPaysCurrency}}</span>
                 <span>{{transnumkList.realGetsValue}}</span>
                 <span>{{transnumkList.realGetsCurrency}}</span>
               </span>
          </div>
           <div class="note">
             <span>{{$t('message.home.time')}}</span>
             <span>{{transnumkList.time}}</span>
             </div>
        </li>
        <li>
            <div>
             <span>{{$t('message.trade.entrustprice')}}</span>
             <span>{{transnumkList.price}}</span>
          </div>
           <!-- <div><span>{{$t('message.trade.to')}}</span>  <span>{{transnumkList.dest}}</span></div> -->
           <div><span>{{$t('message.trade.results')}}</span>  <span>{{transnumkList.succ}}</span></div>
        </li>
         <li>
           <div>
             <span>{{$t('message.blockDetailList.transactionmode')}}</span><span>{{transnumkList.flag}}</span></div>
           <div><span>{{$t('message.trade.note')}}</span><span></span></div>
        </li>
      </Ul>
      </div>
  </div>
</template>
<script>
export default {
  name: "offerCancel",
  data() {
    return {
      transnumkList: {}
    };
  }
};
</script>
<style lang="scss" scoped>
#offerCancel {
  text-align: center;
  min-width: 768px;
  padding: 0 70px;
  padding-bottom: 110px;
  background: #f2f8fc;
}
.offerCancelTitle {
  text-align: left;
  .tille {
    display: flex;
    align-items: center;
    color: #18c9dd;
    font-size: 14px;
  }
  .tilleIcon {
    font-size: 14px;
    float: right;
    padding: 4px 0 0 10px;
    color: #18c9dd;
  }
  .walletHeader {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    color: #3e3f45;
    padding: 10px 0;
  }

  ul {
    width: 100%;
    display: flex;
    flex-flow: column;
    border: 2px solid #c1e9f1;
    border-radius: 8px;
    background: #ffffff;
    margin-bottom: 20px;
    li {
      display: flex;
      justify-content: space-between;
      height: 40px;
      line-height: 40px;
      padding: 0 20px;
      white-space: nowrap;
      text-overflow: ellipsis;
      color: #5f5d5d;
      font-size: 14px;
      min-width: 320px;
      border-bottom: 1px solid #e0e8ed;
      div {
        min-width: 280px;
        display: flex;
        justify-content: space-between;
        flex: 1;
        span:nth-child(2) {
          min-width: 280px;
          display: inline-block;
          white-space: nowrap;
          overflow: hidden;
          margin-left: 20px;
          text-overflow: ellipsis;
          text-align: right;
        }
      }
      div:nth-child(1) {
        padding-right: 20px;
      }
      div:nth-child(2) {
        border-left: 1px solid #e0e8ed;
        padding-left: 20px;
      }
    }
  }
}
</style>
