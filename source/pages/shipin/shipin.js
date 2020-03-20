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
    options.id = 1;
    options.type='kan';
    super.onLoad(options);
    this.Base.setMyData({
      focus:false
    })
  }
  onMyShow() {
    var that = this;
    var api = new ActivityApi;
    api.zhibodetail({ id:1,type_id: this.Base.options.id, type: this.Base.options.type }, (zhibodetail) => {
      var ship = zhibodetail.ship[0];
      this.Base.setMyData({
        zhibodetail, ship
      })
      this.getliuyan();
    })
    
  }
  getliuyan() {
    var api = new ActivityApi;
    var ship = this.Base.getMyData().ship;
    api.msglist({ loupan_id: ship.loupan_id}, (msglist) => {
      this.Base.setMyData({
        msglist
      })
    })
  }
  setPageTitle(instinfo) {
    wx.setNavigationBarTitle({
      title: '视频详情',
    })
  }
  liuyan() {
    this.Base.setMyData({
      focus: true
    })
  }
  sendmsg(e) {
    console.log(e)
    var content = e.detail.value;
    var ship = this.Base.getMyData().ship;
    var api = new ActivityApi;
    var that = this;
    api.addmsg({
      content: content,
      member_id: this.Base.getMyData().memberinfo.id,
      loupan_id: ship.loupan_id
    }, (addmsg) => {
      if (addmsg.code == '0') {
        that.Base.setMyData({ focus: false })
        // that.onMyShow();
        wx.showToast({
          title: '留言成功',
        })
      }
    })
  }
  todetail(e){
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/lpdetail/lpdetail?id='+id,
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.getliuyan = content.getliuyan;
body.liuyan = content.liuyan;
body.sendmsg = content.sendmsg;
body.todetail = content.todetail;
Page(body)