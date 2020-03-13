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
    // this.getlunbo();
    // this.getjinqi();
    // this.getinfo();
    var api = new ActivityApi;
    api.typedetail({ id: this.Base.options.id }, (typedetail) => {
      var atlunbo = typedetail.lunbo;
      var zhuanjiaac = typedetail.recentac;
      var zhuanjia = typedetail.huigu;
      var zhibo = typedetail.zhibo
      this.Base.setMyData({
        atlunbo, zhuanjiaac, zhuanjia, zhibo
      })
    })
  }
  setPageTitle(instinfo) {
    wx.setNavigationBarTitle({
      title: '沙龙点评',
    })
  }
  getlunbo() {
    var api = new ActivityApi;
    var arr = [];
    var that = this;
    api.atlunbo({}, (atlunbo) => {
      for (var i = 0; i < atlunbo.length; i++) {
        for (var j = 0; j < atlunbo[i].lunbo.length; j++) {
          if (atlunbo[i].lunbo[j].id == that.Base.options.id) {
            arr.push(atlunbo[i]);
          }
        }

      }
      this.Base.setMyData({
        atlunbo: arr
      })
    })
  }
  getjinqi() {
    var api = new ActivityApi();
    api.shalongac({ type: 'A' }, (shalongac) => {
      this.Base.setMyData({
        shalongac
      })
    })
  }
  getinfo() {
    var api = new ActivityApi();
    api.shalong({ type: 'A' }, (shalong) => {
      this.Base.setMyData({
        shalong
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