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
    // options.id = 2;
    super.onLoad(options);
  }
  onMyShow() {
    var that = this;
    var api = new ActivityApi();
    api.activitydetail({ id: this.Base.options.id }, (activitydetail) => {
      this.Base.setMyData({ activitydetail })
    })
  }
  setPageTitle(instinfo) {
    wx.setNavigationBarTitle({
      title: '详情',
    })
  }
  nameFn(e) {
    console.log(e);
    this.Base.setMyData({
      name: e.detail.value
    })
  }
  mobileFn(e) {
    console.log(e);
    this.Base.setMyData({
      mobile: e.detail.value
    })
  }
  queren(e){
    var name = this.Base.getMyData().name;
    var mobile = this.Base.getMyData().mobile;
    console.log(e)
    var money = e.currentTarget.id;
    var api = new ActivityApi;
    api.actbaomin({
      member_id:this.Base.getMyData().memberinfo.id,
      money,
      name,
      mobile,
      activity_id:this.Base.options.id
    }, (actbaomin)=>{
      if (actbaomin){
        wx.showToast({
          title: '报名成功',
        })
      }
      
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.mobileFn = content.mobileFn;
body.nameFn = content.nameFn;
body.queren = content.queren;
Page(body)