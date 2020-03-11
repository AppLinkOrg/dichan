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
    this.gettypes();
    this.getlist();
    this.getjb();
  }
  getlunbo(){
    var api = new ActivityApi;
    var arr = [];
    api.atlunbo({ }, (atlunbo)=>{
      this.Base.setMyData({
        atlunbo
      })
    })
  }
  gettypes(){
    var api = new ActivityApi;
    api.types({}, (types) => {
      this.Base.setMyData({
        types
      })
    })
  }
  getlist(){
    var api = new ActivityApi;
    var that = this;
    api.activitylist({}, (activitylist) => {
      for (var i = 0; i < activitylist.length;i++){
        activitylist[i].shijian = that.changtime(activitylist[i].shijian);
      }
      that.Base.setMyData({
        activitylist
      })
    })
  }
  changtime(date){
    var date = date.replace(/-/g,'.')
    return date
  }
  getjb(){
    var api = new ActivityApi;
    var that = this;
    api.jianbao({}, (jianbao) => {
      for (var i = 0; i < jianbao.length; i++) {
        jianbao[i].shijian = that.changtime(jianbao[i].shijian);
      }
      that.Base.setMyData({
        jianbao
      })
    })
  }
  qubind(e){
    console.log(e)
    var lujing = e.currentTarget.dataset.lujing;
    var id = e.currentTarget.dataset.currentid;
    wx.navigateTo({
      url: lujing+'?id='+id,
    })
  }
  todetail(e){
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/activitydetail/activitydetail?id='+id,
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.getlunbo = content.getlunbo;
body.gettypes = content.gettypes;
body.getlist = content.getlist;
body.changtime = content.changtime;
body.getjb = content.getjb;
body.qubind = content.qubind;
body.todetail = content.todetail;
Page(body)