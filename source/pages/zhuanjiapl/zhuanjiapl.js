// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { ActivityApi } from "../../apis/activity.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
  }
  onMyShow() {
    var that = this;
    this.getlunbo();
    this.getjinqi();
    this.getinfo();
  }
  setPageTitle(instinfo) {
    wx.setNavigationBarTitle({
      title: '专家论坛',
    })
  }
  getlunbo() {
    var api = new ActivityApi;
    api.atlunbo({}, (atlunbo) => {
      this.Base.setMyData({
        atlunbo
      })
    })
  }
  getjinqi(){
    var api = new ActivityApi;
    api.zhuanjiaac({}, (zhuanjiaac) => {
      this.Base.setMyData({
        zhuanjiaac
      })
    })
  }
  getinfo(){
    var api = new ActivityApi;
    api.zhuanjia({}, (zhuanjia) => {
      this.Base.setMyData({
        zhuanjia
      })
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.getlunbo = content.getlunbo;
body.getjinqi = content.getjinqi;
body.getinfo = content.getinfo;
Page(body)