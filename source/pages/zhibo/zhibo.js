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
    options.id=1;
    super.onLoad(options);
    this.Base.setMyData({
      focus:false,
      content:''
    })
  }
  onMyShow() {
    var that = this;
    // this.getlunbo();
    this.getinfo();
    this.getliuyan();
    console.log(AppBase.UserInfo,'iiii')
    var api = new ActivityApi;
    api.typedetail({id:this.Base.options.id}, (typedetail)=>{
      var atlunbo = typedetail.lunbo;
      this.Base.setMyData({
        atlunbo
      })
    })
  }
  setPageTitle(instinfo) {
    wx.setNavigationBarTitle({
      title: '直播看房',
    })
  }
  getlunbo() {
    var api = new ActivityApi;
    var arr =[];
    var that = this;
    api.atlunbo({}, (atlunbo) => {
      for (var i = 0; i < atlunbo.length; i++) {
        for (var j = 0; j < atlunbo[i].lunbo.length;j++){
          if (atlunbo[i].lunbo[j].id==that.Base.options.id) {
            arr.push(atlunbo[i]);
          }
        }
       
      }
      this.Base.setMyData({
        atlunbo:arr
      })
    })
  }
  getinfo(){
    var api = new ActivityApi;
    api.zhibo({}, (zhibo) => {
      this.Base.setMyData({
        zhibo
      })
    })
    api.zhibotype({}, (zhibotype)=>{
      this.Base.setMyData({ zhibotype})
    })
  }
  getliuyan(){
    var api = new ActivityApi;
    api.msglist({}, (msglist) => {
      this.Base.setMyData({
        msglist
      })
    })
  }
  liuyan(){
    this.Base.setMyData({
      focus:true
    })
  }
  contFn(e){
    this.Base.setMyData({
      content: e.detail.value
    })
  }
  sendmsg(e){
    console.log(e)
    var content = e.detail.value;
    var api = new ActivityApi;
    var that = this;
    api.addmsg({
      content:content,
      member_id: this.Base.getMyData().memberinfo.id
    }, (addmsg)=>{
      if (addmsg.code=='0'){
        that.Base.setMyData({ focus:false})
        // that.onMyShow();
        wx.showToast({
          title: '留言成功',
        })
      }
    })
  }
  xiaoshi(){
    this.Base.setMyData({
      focus:false
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.getlunbo = content.getlunbo;
body.getinfo = content.getinfo;
body.getliuyan = content.getliuyan;
body.liuyan = content.liuyan;
body.sendmsg = content.sendmsg;
body.contFn = content.contFn;
body.xiaoshi = content.xiaoshi;
Page(body)