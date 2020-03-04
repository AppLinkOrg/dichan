// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { LoupanApi } from "../../apis/loupan.api.js";
import { OrderApi } from "../../apis/order.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    // options.id=5;
    super.onLoad(options);
    this.Base.setMyData({
      shenfen1:'',
      shenfen2:''
    })
  }
  onMyShow() {
    var that = this;
    var api = new LoupanApi;
    api.loupandetail({ id: this.Base.options.id }, (loupandetail) => {
      this.Base.setMyData({
        loupandetail
      })
    })
  }
  nameFn(e){
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
  dizhiFn(e) {
    console.log(e);
    this.Base.setMyData({
      dizhi: e.detail.value
    })
  }
  shenfenFn(e) {
    console.log(e);
    this.Base.setMyData({
      shenfen: e.detail.value
    })
  }
  fanmian(){
    var that = this;
    this.Base.uploadImage("tuangou", (ret) => {
      console.log(ret);
      that.Base.setMyData({
        shenfen2: ret
      });
    }, undefined);
  }
  zhenmian(){
    var that = this;
    this.Base.uploadImage("tuangou", (ret) => {
      console.log(ret);
      that.Base.setMyData({
        shenfen1: ret
      });
    }, undefined);
  }
  queren(e){
    console.log(e);
    var name = this.Base.getMyData().name;
    var mobile = this.Base.getMyData().mobile;
    var dizhi = this.Base.getMyData().dizhi;
    var shenfen = this.Base.getMyData().shenfen;
    var dingjin = e.currentTarget.id;
    var img1 = this.Base.getMyData().shenfen1;
    var img2 = this.Base.getMyData().shenfen2;
    var that = this;
    var api = new OrderApi;

    if (name == '' || name==undefined) {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none'
      })
      return
    }
    if (mobile == '' || mobile == undefined) {
      wx.showToast({
        title: '请输入电话',
        icon: 'none'
      })
      return
    }
    if (dizhi == '' || dizhi == undefined) {
      wx.showToast({
        title: '请输入地址',
        icon: 'none'
      })
      return
    }
    if (shenfen == '' || shenfen == undefined) {
      wx.showToast({
        title: '请输入证件号码',
        icon: 'none'
      })
      return
    }
    if (img1 == '') {
      wx.showToast({
        title: '请上传证件的正面',
        icon: 'none'
      })
      return
    }
    if (img2 == '') {
      wx.showToast({
        title: '请上传证件的背面',
        icon: 'none'
      })
      return
    }
    

    api.addtuangou({
      member_id:this.Base.getMyData().memberinfo.id,
      lou_id:this.Base.options.id,
      name:name,
      mobile:mobile,
      dizhi:dizhi,
      shenfenhaoma:shenfen,
      img1: img1,
      img2: img2,
      money: dingjin,
    }, (addtuangou)=>{
      if (addtuangou.code=='0'){
        wx.navigateTo({
          url: '/pages/order/order',
        })
      }
    })


  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.nameFn = content.nameFn;
body.shenfenFn = content.shenfenFn;
body.dizhiFn = content.dizhiFn;
body.mobileFn = content.mobileFn;
body.fanmian = content.fanmian;
body.zhenmian = content.zhenmian;
body.queren = content.queren;
Page(body)