<template>
  <div id="block">
    <div class="Selectiondate">
      <div class="block">
        <span class="demonstration">{{$t("message.selectiondate")}}</span>
        <el-date-picker
          v-model="value2"
          align="right"
          type="date"
          :picker-options="pickerOptions1"
          value-format="yyyy-MM-dd"
          @change="handleUddata"
        ></el-date-picker>
      </div>
    </div>
    <div class="data">
      <ul class="datalit">
        <li id="datatitle">
          <div class="aaa">{{$t("message.hash")}}</div>
        </li>
        <li v-for="item   of   firstlist" :key="item.id">
          <span>{{item.hash}}</span>
        </li>
      </ul>
      <ul class="datalist">
        <li id="datatitle">{{$t("message.hash")}}</li>
        <li v-for="item   of   firstlist" :key="item.id">
          <span>{{item.parentHash}}</span>
        </li>
      </ul>
      <ul>
        <li id="datatitle">{{$t("message.parentHash")}}</li>
        <li v-for="item   of   firstlist" :key="item.id">
          <span>{{item.dateTime}}</span>
        </li>
      </ul>
      <ul>
        <li id="datatitle">{{$t("message.trannum")}}</li>
        <li v-for="item   of   firstlist" :key="item.id">{{item.transNum}}</li>
      </ul>
      <ul>
        <li id="datatitle">{{$t("message.time")}}</li>
        <li v-for="item   of   firstlist" :key="item.id">
          <span>{{item.time}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { getBlocklist, getDayBlocklist } from "../../js/fetch";
export default {
  name: "block",
  data() {
    return {
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前1",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      value1: "",
      value2: "",
      firstlist: [],
      lastList: [],
      timer: ""
    };
  },
  created() {
    this.handledata();
  },
  methods: {
    async handledata() {
      let res = await getBlocklist(20);
      this.firstlist = res.data.data;
    },
    async handleUddata() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      console.log(this.value2);
      let res = await getDayBlocklist({
        date: this.value2,
        from: 1,
        to: 2,
        amount: 10
      });
      console.log(res.data.data);
      this.timer = setTimeout(() => {
        this.firstlist = res.data.data;
      }, 16);
    }
  }
};
</script>
<style>
#block {
  width: 100%;
  min-height: 900px;
  min-width: 800px;
  background-color: white;
}
.demonstration {
  font-weight: bold;
  font-size: 18px;
}
.Selectiondate {
  margin-top: 30px;
  display: flex;
  min-width: 700px;
  justify-content: center;
  margin-bottom: 30px;
  overflow: hidden;
}
.data {
  height: 800px;
  background: white;
  border: #e1e1e1 solid 1px;
}
.data ul {
  height: 700px;
  background: white;
  width: 20%;
  float: left;
  text-align: left;
  border-bottom: 0;
}
#datatitle {
  font-size: 13px;
  font-weight: bold;
  height: 35px;
  line-height: 35px;
  background: #f9f9f9;
  width: 100%;
}
li {
  font-size: 10px;
  height: 35px;
  line-height: 35px;
  border-bottom: 1px solid #ccc;
}
li span {
  display: block;
  color: forestgreen;
  width: 70%;
  overflow: hidden;
  text-overflow: ellipsis;
}
li span:hover {
  text-decoration: underline;
}
.datalit li {
  padding-left: 10px;
}
</style>
