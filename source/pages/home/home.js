// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { CityApi } from "../../apis/city.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({
      StatusBar: getApp().globalData.StatusBar,
      CustomBar: getApp().globalData.CustomBar,
      Custom: getApp().globalData.Custom,
      seq: 2,
      showcity:false,
      currentcity: {
        id: 1,
        name: "深圳"
      },
    })
  }
  onMyShow() {
    var that = this;
    this.getcity();
  }
  getcity(){
    var cityapi = new CityApi;
    cityapi.citylist({ }, (citylist)=>{
      console.log(citylist);
      this.Base.setMyData({ citylist})
    })
  }
  qiehuan(){
    var showcity = this.Base.getMyData().showcity;
    showcity = !showcity;
    this.Base.setMyData({
      showcity
    })
  }
  switchcity(e){
    console.log(e);
    var cur = e.currentTarget.dataset.current;
    var idx = e.currentTarget.id;
    var seq = this.Base.getMyData().seq;
    this.Base.setMyData({
      currentcity:cur,
      showcity:false,
      seq: idx
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.getcity = content.getcity;
body.qiehuan = content.qiehuan;
body.switchcity = content.switchcity;
Page(body)