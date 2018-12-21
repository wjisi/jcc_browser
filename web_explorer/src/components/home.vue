<template>
   <div id="home" style="width:100%;background:#f2f8fc;display:flex;flex-direction:column;">
     <div style="width:100%;height:100%; position:relative;">
       <div style="width:100%;height:24.3%;"><img src="../images/index_top.png" style="height:100%;width:100%"></div>
       <div style="width:100%;height:38.4%;"><div style="background:#f2f8fc;;width:100%;height:1%;"></div><img src="../images/index_show.png" style="height:100%;width:100%"></div>
       <div style="width:100%;height:800px;background:#1850d7;position:relative;bottom:10px;"></div>
     </div>
     <div class="init" style="position:absolute;width:100%;hight:1600px;z-indent:2;display:flex;flex-direction:column;">
       <div class="top" style="width:100%;height:25%;display:flex;flex-direction:row;">
         <div class="topLeft" style="width:50%;height:100%;display:flex;flex-direction:column;">
            <div class="index" style="height:60px;width:60px; margin-left: 54.5%;margin-top: 5%;"><img src="../images/logo_index.png" alt="" style="width:100%;height:100%;"></div>
            <div style="font-size:22px;color:#F4F4FB;margin-top:14px;height:31px;width:50%;margin-left:34%;min-width:176px;">井畅区块链浏览器</div>
            <!-- <input type="text" style="> -->
            <div class="search" style="display:flex;flex-direction:row;justify-content:center;margin-left:19%;margin-top:8%;min-width:320px;">
              <input type="text" id="in"  placeholder="请输入钱包地址或交易哈希"/><button class="btn_search">搜索</button>
            </div>
         </div>
         <div class="topRight" style="width:50%;height:100%;dispaly:flex;flex-direction:column;justify-content:center;">
            <div style="font-size:12px;color:#CEE5FF;font-weight:bold;margin-top:6%;margin-bottom:5px;">基于区块链技术构建的<br>去中心化互享生态互联网交易网络</div>
            <div class="net" style="width: 82%;height: 81.3%;"><img src="../images/index_net.png" alt="" style="height:100%;width:100%;margin-left:12%"></div>
         </div>
       </div>
       <div class="show" style="width:100%;height:624px;display:flex;flex-direction:column;">
          <div class="showTop" style="width:100%;height:60%;display:flex;flex-direction:row;">
            <div class="showTopLeft" style="width:50%;height:100%;">
              <div class="showTopLeftValue" style="height: 25%;width: 54%;margin-top: 13%;margin-left: 11%; font-size: 18px;min-width:320px;min-height:94px;"><div style="heigth:100%;width:85%;">井畅区块链浏览器提供对井通和井畅等互享网账本的实时浏览功能，交易检测功能，以及互享</div></div>
            </div>
            <div class="showTopRight" style="width:50%;height:100%;text-align: left;">
              <div style="width:50%;margin-left:42%">
                <div id="title">不可篡改表征价值</div>
                <p id="value">提供对威链、墨客、井通等互享网账本的实时浏览功能<br>唯一、不可篡改表征价值</p>
                <div style="margin-left:10%;">
                <p id="title">实时浏览功能</p>
                <p id="value">互联网联盟公链透明、公开的基础<br>交易记录查询等功能</p>
                </div>
                <p id="title">交易记录查询</p>
                <p id="value">交易记录查询等功能<br>互联网联盟公链透明、公开的基础</p>
              </div>
            </div>
          </div>
          <div class="showEnd" style="width:100%;height:40%;display;flex;flex-direction:column;">
              <div class="showEndTop" style="width:91.25%;height:22%;display:flex;flex-direction:row;align-items:center;margin-left:4%;margin-top:6%;justify-content:space-between;">
                <div style="display:flex;flex-direction:row;align-items:center;">
                  <img src="../images/block_height_title.png" style="height:60px;width:50px;">
                  <div class="block">区块高度</div>
                </div>
                <div class="buttom" @click="searchAll('block')" style=" width:150px;color:#c7cfd5;text-align:right;" onMouseOut="this.style.color='#c7cfd5'" onMouseOver="this.style.color='#18c9dd'">→查看更多</div>
              </div>
              <div class="showEndEnd" style="width:100%;height:88%;">
                <div style="display:flex;flex-direction:row;width:91.25%;height:85px;margin-left:4%;margin-top:1.5%;">
                  <li v-for="(item  , index) of  listnum" :key="index" :class="'class'+index" style="background-color:#f2f8fc ;
                      width:16.6%;height:190%;list-style-type:none;border-right:1px solid;border-right-color:#e8e8e8;">
                    <div style="display:flex;flex-direction:row;width:100%;height:100%;">
                      <div  style="height:124px;width:8px;background:#e8e8e8;border-radius:8px;margin-top:9%;margin-left:7%;">
                        <div :class="'className'+index" style="height:98px;width:8px;border-radius:8px;margin-top:26px"></div>
                      </div>
                      <div style="width:90%;height:100%;margin-left:4%;display:flex;flex-direction:column;">
                        <div style="width:100%;height:40%;display:flex;">
                          <div style="width:60%;text-align:left;margin-top:22%">高度  {{item._id}}</div>
                          <div style="width:30%;display:flex;flex-direction:column;margin-top:8%">
                            <div style="font-size:20px;color:#93a3b7">{{item.transNum}}</div>
                            <div style="font-size:15px;color:#93a3b7">交易数</div>
                          </div>
                        </div>
                        <div style="width:90%;height:30;overflow: hidden;text-overflow: ellipsis;font-size:12px;margin-top:15%;color:#6f6868" onMouseOut="this.style.color='#6f6868'" onMouseOver="this.style.color='#06aaf9'">{{item.hash}}</div>
                        <div style="margin-top:10%;color:#8a8d90;font-size:12px;text-align:left;">{{item.dateTime}}</div>
                      </div>
                      </div>
                    </li>
                </div>
              </div>
          </div>
       </div>
       <div class="end">
         <div class="endTop" style="width:91.25%;height:22%;display:flex;flex-direction;row;align-items:center;margin-left:4%;margin-top:10%;justify-content:space-between;">
            <div style="display:flex;flex-direction:row;align-items:center;">
              <img src="../images/latest_trade_title.png" style="height:60px;width:50px;">
              <div class="block">最新交易</div>
            </div>
            <div class="buttom" @click="searchAll('block')" style=" width:150px;color:#c7cfd5;text-align:right;" onMouseOut="this.style.color='#c7cfd5'" onMouseOver="this.style.color='#18c9dd'">→查看更多</div>
         </div>
         <div class="endMidder" style="width:91.25%;margin-left:4%">
            <div style="width:100%;margin-top:20px;">
              <table width="100%;" style="font-size:14px;">
                <tr bgcolor=#ffffff height=40px >
                  <td width='15%' align=left style="padding-left:3%">排序</td>
                  <td width='58%'>区块哈希值</td>
                  <td width='27%' align=right style="padding-right:4%;">交易</td>
                </tr>
                <tr v-for="(item  , index) of  listnum" :key="index" bgcolor=#ffffff height=40px>
                  <td width='15%' align=left style="padding-left:4%;" :class="'classNum'+index">{{index+1}}</td>
                  <td :class="'classNum'+index" style="color:#6f6868;overflow: hidden;text-overflow: ellipsis;" onMouseOut="this.style.color='#6f6868'" onMouseOver="this.style.color='#06aaf9'">{{item.hash}}</td>
                  <td width='27%' align=right style="padding-right:4%;" :class="'classNum'+index">{{item._id}}</td>
                </tr>
              </table>
            </div>
         </div>
         <div class="endEnd" style="display:flex; align-items:center; height:80px;width:91.25%;margin-left:4%;justify-content:space-between;margin-top:5%;">
            <div style="display:flex; align-items:center; font-size:14px; color:#f4f5fe;width:60%">
            <img src="../images/logo_footer.png" style="height:30px;width:30px;">
            <div style="margin-left:10px;">井畅区块链浏览器</div>
            <div style="margin-left:10px;width:2px;height:14px;background:#eef1fe;border-radius: 1px;" ></div>
            <div style="margin-left:10px;">安徽井畅数字技术有限公司</div>
          </div>
          <div style="display:flex; align-items:center;font-size:14px;color:#6b9eff">
            <div style="margin-right:6%;width:100px; " onMouseOut="this.style.color='#6b9eff'" onMouseOver="this.style.color='#18c9dd'">井畅官网</div>
            <div style="margin-right:6%; ">|</div>
            <div style="margin-right:6%; width:100px;" onMouseOut="this.style.color='#6b9eff'" onMouseOver="this.style.color='#18c9dd'">商务合作</div>
            <div style="margin-right:6%; ">|</div>
            <div style="margin-right:6%; width:100px;" onMouseOut="this.style.color='#6b9eff'" onMouseOver="this.style.color='#18c9dd'">合作伙伴</div>
            <div style="margin-right:6%; ">|</div>
            <div style="width:100px;" onMouseOut="this.style.color='#6b9eff'" onMouseOver="this.style.color='#18c9dd'">联系我们</div>
          </div>
         </div>
       </div>
     </div>
   </div>
</template>

<script>
import { getBlocklist } from "../js/fetch";
export default {
  name: "home",
  created() {
    this.getBlocklists();
  },
  data() {
    return {
      listnum: []
    };
  },
  methods: {
    getBlocklists() {
      getBlocklist(6)
        .then(data => {
          console.log(data);
          console.log(data.data.data.length);
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
.top {
  background: url("../images/index_top.png") no-repeat;
  background-size: 100%, 25%;
  width: 100%;
  height: 25%;
}
.showTopLeftValue {
  float: left;
  color: #ffffff;
  background: linear-gradient(to right, #23dccd, #04a8f9);
  border-radius: 20px;
  text-align: left;
  display: flex;
  justify-content: center;
  align-items: center;
}
#title {
  font-size: 0.875em;
  color: #3b3434;
  margin-bottom: 9px;
  margin-top: 16%;
}
#value {
  font-size: 0.875em;
  color: #797b7e;
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
.search #in {
  outline: none;
  width: 55%;
  height: 40px;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  font-size: 14px;
  color: #a19fae;
  border: none;
  outline: none;
}
.search .btn_search {
  width: 44px;
  height: 40px;
  color: #ffffff;
  background: #18c9dd;
  border: none;
  outline: none;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
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
.classNum0,
.classNum2,
.classNum4 {
  background: #f2f8fc;
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
