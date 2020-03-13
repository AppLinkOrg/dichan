// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { LoupanApi } from "../../apis/loupan.api.js";
import { MemberApi } from "../../apis/member.api.js";
import { PostApi } from "../../apis/post.api.js";
var WxParse = require('../../wxParse/wxParse');
import { ApiUtil } from "../../apis/apiutil.js";
import QQMapWX from '../../libs/qqmap/qqmap-wx-jssdk.js';

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    // options.id=1;
    super.onLoad(options);
    this.Base.setMyData({
      all:false
    })
  }
  onMyShow() {
    var that = this;
    var api = new LoupanApi;
    api.loupandetail({ id: this.Base.options.id }, (loupandetail)=>{
      loupandetail.cepinbaogao = ApiUtil.HtmlDecode(loupandetail.cepinbaogao);
      loupandetail.zhuanjia = ApiUtil.HtmlDecode(loupandetail.zhuanjia);
  
      WxParse.wxParse('content', 'html', loupandetail.cepinbaogao, that, 10);
      WxParse.wxParse('content2', 'html', loupandetail.zhuanjia, that, 10);
      this.Base.setMyData({ loupandetail})
    })
    this.shoucan();
    var postapi = new PostApi();
    postapi.poster({ id: this.Base.options.id });
  }
  shoucan(){
    console.log(11111)
    console.log(this.Base.getMyData().memberinfo);
    var api = new MemberApi;
    api.shoucanlist({ 
      member_id: this.Base.getMyData().memberinfo.id,
      type:'A',
      lou_id:this.Base.options.id
      }, (shoucanlist)=>{
      console.log(shoucanlist);
        if (shoucanlist.length>0){
          this.Base.setMyData({
            shou:true
          })
        }else {
          this.Base.setMyData({
            shou: false
          })
        }
    })
  }

  tiwen(e){
    console.log(e);
    var phone = e.currentTarget.dataset.phone;
    console.log(phone);
    wx.showActionSheet({
      itemList: ["拨打电话"],
      success(e) {
        if (e.tapIndex == 0) {
          wx.makePhoneCall({
            phoneNumber: phone
          })
        }
      }
    })
  }
  addshou(){
    var json = {
      lou_id:this.Base.options.id,
      member_id:this.Base.getMyData().memberinfo.id,
      type:'A'
    }
    var api = new MemberApi;
    var shou = this.Base.getMyData().shou;
    if(shou==true){
      api.deleteshoucan(json, (deleteshoucan)=>{
        console.log(deleteshoucan);
        this.Base.setMyData({
          shou:false
        });
      })
    }else {
      api.addshoucan(json, (addshoucan) => {
        console.log(addshoucan);
        this.Base.setMyData({
          shou: true
        });
      })
    }
  }
  hua(e){
    console.log(e);
    var cur = e.currentTarget.dataset.id;
    var query = wx.createSelectorQuery().in(this);
    var that = this;
    console.log(query);
    query.select("#" + cur).boundingClientRect();
    query.selectViewport().scrollOffset()
    query.exec((res) => {
      console.log(res)
      for (var i = 0; i < res.length; i++) {
        if (res[i] != null) {
          if (cur == res[i].id) {
            wx.pageScrollTo({
              scrollTop: res[i].top,
              duration: 300,
            })
          }
        }

      }

    }); 
  }
  douyou(){
    var all = this.Base.getMyData().all;
    all = !all;
    this.Base.setMyData({
      all
    })
  }
  haibao(){
    // wx.navigateTo({
    //   url: '/pages/haibao/haibao?id='+this.options.id,
    // })
    var all = this.Base.getMyData().all;

    this.Base.setMyData({
      all:false
    })

    var that = this;
    var url = 'https://cmsdev.app-link.org/Users/alucard263096/aolin/upload/loupan/' + this.Base.options.id + '__loupan.png'; 
   

    that.Base.viewPhoto({ currentTarget: { id: url } });
    // wx.previewImage({
    //   urls: [url],
    // })

    return;
  }

  tuangou(){
    wx.navigateTo({
      url: '/pages/tuangou/tuangou?id='+this.Base.options.id,
    })
  }
  huidao(e) {
    var cur = e.currentTarget.id;
    if(cur=='D'){
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 300,
      })
    } else if (cur == 'H'){
      wx.switchTab({
        url: '/pages/home/home',
      })
    }
   
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.tiwen = content.tiwen;
body.shoucan = content.shoucan;
body.addshou = content.addshou;
body.hua = content.hua;
body.douyou = content.douyou;
body.haibao = content.haibao;
body.tuangou = content.tuangou;
body.huidao = content.huidao;
Page(body)