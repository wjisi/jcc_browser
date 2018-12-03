<template>
  <div id="home">
<<<<<<< HEAD
    <!-- Left side -->
    <div class="homeleft">

     <div class="leftcontenttop">
       <div class="left">
         <i class="iconfont icon-property"></i>
         {{this.$t("message.block")}}
       </div>
       <div class="right">
         {{this.$t("message.viewall")}}
       </div>
    </div>

    <div class="leftcontentbottom" v-for="item  of  listnum" :key="item">
      <div class="listsmallleft">
        <div class="listleft"></div>
        <div class="listright" style="text-align: left">
          <div v-for="item  of  smalllist" :key="item.id">
          {{item.text}}
        </div>
        </div>
      </div>
=======
    HOME
    <i class="iconfont icon-property"></i>
    <i class="iconfont icon-wallet"></i>
    <div>
      {{this.$t("message.block")}}
>>>>>>> f17669e43586a977900af7064e668f0d597e9eeb
    </div>

  </div>

    <!-- Right side -->
    <div class="homeright">

     <div class="leftcontenttop">
       <div class="left">
         <i class="iconfont icon-property"></i>
         {{this.$t("message.block")}}
       </div>
       <div class="right">
         {{this.$t("message.viewall")}}
       </div>
    </div>

    <div class="leftcontentbottom"  v-for="item  of  listnum1"  :key="item">
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
    </div>

   </div>

  </div>
</template>

<script>
export default {
  name: "home",
<<<<<<< HEAD
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
=======
  data() {
    return {};
>>>>>>> f17669e43586a977900af7064e668f0d597e9eeb
  }
};
</script>

<style scoped>
#home {
  width: 100%;
  height: 100%;
  margin-top: 100px;
  background: #FFF
}
.homeleft{float: left;}
.homeright{float: right;}
.homeright,.homeleft{width: 45%;height: 700px;text-align: left;  overflow: auto;border: 1px  solid  #FFF;position: relative;}
.leftcontenttop{height: 50px;background: #FFFFFF;line-height:50px;position: fixed;width: 40%;}
.left{height: 50px;line-height: 50px;padding-left: 8px;float: left;}
.right{height: 30px;line-height: 30px;float: right;border: 1px  solid  #FFF;margin: 8px;padding: 0 8px}


/* Left style */
.listsmallleft{height: 120px;border: 1px solid #ccc;padding: 8px;padding: 5px;padding-top: 55px;}
.listleft{background: #8f8a8a;width: 120px;height: 74px;float: left}
.listright{padding-left: 130px;}
.listright  div{font-size: 15px;padding-bottom: 7px;}

/* Left style */
.listsmallright{height: 120px;border: 1px solid #ccc;padding: 8px;border-left: 2px  #1b926a solid;padding-top: 55px;}
.iconleft{height: 100%;float: left;margin-top: 14px;}
.textright li{list-style-type: none;text-align: left;margin: 0px}
.textright li  span{color: #b5c9c0;font-size: 15px}
</style>
