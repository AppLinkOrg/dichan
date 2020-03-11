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
    this.getinfo();
    var api = new ActivityApi;
    api.typedetail({ id: this.Base.options.id }, (typedetail) => {
      var atlunbo = typedetail.lunbo;
      var zhuanjiaac = typedetail.recentac;
      this.Base.setMyData({
        atlunbo, zhuanjiaac
      })
    })
  }
  setPageTitle(instinfo) {
    wx.setNavigationBarTitle({
      title: '线下看房',
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
        atlunbo:arr
      })
    })
  }
  getjinqi() {
    var api = new ActivityApi;
    api.zhuanjiaac({ type: 'B'}, (zhuanjiaac) => {
      this.Base.setMyData({
        zhuanjiaac
      })
    })
  }
  getinfo() {
    var api = new ActivityApi;
    api.zhuanjia({ type: 'B'}, (zhuanjia) => {
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