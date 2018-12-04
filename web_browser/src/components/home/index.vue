<template>
  <div id="home">
    <!-- Left style -->
   <Ul class="homeleft">
     <!-- Left head style -->
    <li class="leftcontenttop">
       <div class="left">
         <i class="iconfont icon-property"></i>
         {{this.$t("message.block")}}
       </div>
       <div class="right">
         {{this.$t("message.viewall")}}
       </div>
    </li>
         <!-- Left list style -->
    <li class="leftcontentbottom" v-for="item  of  listnum" :key="item">
      <div class="listsmallleft">
        <div class="listleft"></div>
        <div class="listright" style="text-align: left">
          <div v-for="item  of  smalllist" :key="item.id">
          {{item.text}}
        </div>
        </div>
      </div>
    </li>
   </Ul>

       <!-- Right style -->
   <ul class="homeright">
        <!-- Right head style -->
    <li class="leftcontenttop">
       <div class="left">
         <i class="iconfont icon-property"></i>
         {{this.$t("message.block")}}
       </div>
       <div class="right">
         {{this.$t("message.viewall")}}
       </div>
           </li>
        <!-- Right list style -->
    <li class="leftcontentbottom"   v-for="item  of  listnum1" :key="item">
      <div class="listsmallright">
        <div class="iconleft">
          <i class="iconfont icon-property"></i>
        </div>
        <div class="textright">
           <Ul>
            <li>{{$t("message.miners")}}<span>#0X0CA33B81C52</span></li>
            <li>{{$t("message.sendout")}}<span>0X0CA33B81C52</span>接受方35秒</li>
            <li><span>0X0CA33B81C52</span></li>
            <li><span>数额0以太币</span></li>
          </Ul>
        </div>
      </div>
    </li>
   </ul>

  </div>
</template>

<script>
export default {
  name: "home",
   data () {
    return {
     smalllist: [{
       id: "001",
       text: this.$t("message.block")},
       {
       id: "002",
       text: "Ethermine"},
       {
       id: "003",
       text: "35交易于18秒"},
       {
       id: "004",
       text: "区块奖励3.0267以太币"}
       ],
       listnum: [1, 2, 3, 4, 5, 6],
       listnum1: [1, 2, 3, 4, 5, 6]
    };
  }
};
</script>

<style scoped>
#home {
  width: 100%;
  height: 100%;
  margin-top: 100px;
  background: #FFF;
}
li{list-style-type: none;}
.homeleft{float: left;}
.homeright{float: right;margin-left: 10px;}
.homeright,.homeleft{width: 40%;height: 700px;text-align: left;border: 1px  solid #FFF;overflow: scroll;}
/* head  style */
.leftcontenttop{height: 50px;background: #FFFFFF;line-height:50px;width: 100%;}
.left{height: 50px;line-height: 50px;padding-left: 8px;float: left}
.right{height: 30px;line-height: 30px;float: right;border: 1px  solid  #FFF;border: 1px  solid #000;margin: 10px 30px}

/* Left  list style */
.listsmallleft{height: 120px;border: 1px solid #ccc;padding: 8px;padding-top: 55px;}
.listleft{background: #8f8a8a;width: 120px;height: 74px;float: left}
.listright{padding-left: 130px;}
.listright  div{font-size: 15px;padding-bottom: 7px;}

/*Right  list  style */
.listsmallright{height: 120px;border: 1px solid #ccc;padding: 8px;border-left: 2px  #1b926a solid;padding-top: 55px;}
.iconleft{height: 100%;float: left;margin-top: 14px;}
.textright li{list-style-type: none;text-align: left;margin: 0px}
.textright li  span{color: #b5c9c0;font-size: 15px}
</style>
