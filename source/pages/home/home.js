// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { CityApi } from "../../apis/city.api.js";
import { MemberApi } from "../../apis/member.api.js";
import { LoupanApi } from "../../apis/loupan.api.js";

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
      shi:0,
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
    this.gettypelist();
    this.getbanner();
    this.getlunbo();
    this.getprice();
    this.getloupan();
  }
  getcity(){
    var currentcity = this.Base.getMyData().currentcity;
    var cityapi = new CityApi;
    cityapi.citylist({ }, (citylist)=>{
      console.log(citylist);
      
      this.Base.setMyData({ citylist, currentcity:citylist[2]})
    })
  }
  getbanner(){
    var instapi = new InstApi;
    instapi.indexbanner({ orderby: 'r_main.seq'}, (indexbanner)=>{
      this.Base.setMyData({ indexbanner})
    })
  }
  getlunbo(){
    var instapi = new InstApi;
    instapi.lunbo({ orderby: 'r_main.seq' }, (lunbo) => {
      this.Base.setMyData({ lunbo })
    })
  }
  gettypelist(){
    var memberapi = new MemberApi;
    memberapi.typeslist({ orderby: 'r_main.seq'}, (typeslist)=>{
      this.Base.setMyData({ typeslist})
    })
  }
  getprice(){
    var loupanapi = new LoupanApi;
    loupanapi.pricerange({orderby:'r_main.seq'}, (pricerange)=>{
      this.Base.setMyData({
        shax:pricerange
      })
    })
  }
  getloupan(){
    var currentcity = this.Base.getMyData().currentcity;
    var loupanapi = new LoupanApi;
    var pqlist=[];
    var rmlist=[];
    var whlist=[];
    loupanapi.loupanlist({}, (loupanlist)=>{
      console.log(loupanlist,'lou')
      for(var i=0;i<loupanlist.length;i++){
        if (loupanlist[i].city_id == currentcity.id){
          if (loupanlist[i].type == 'A') {
            pqlist.push(loupanlist[i]);
          } else if (loupanlist[i].type == 'B') {
            rmlist.push(loupanlist[i]);
          } else {
            whlist.push(loupanlist[i]);
          }
        }
      }
      this.Base.setMyData({
        pqlist, rmlist, whlist,
        temppqlist:pqlist,
        temprmlist:rmlist,
        tempwhlist:whlist
      })
    })
  }
  qiehuan(){
    var showcity = this.Base.getMyData().showcity;
    showcity = !showcity;
    this.Base.setMyData({
      showcity,
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
      seq: idx,
      shi: 0
    })
    this.getloupan();
  }
  qubind(e){
    console.log(e);
    var id = e.currentTarget.dataset.currentid;
    var cur = e.currentTarget.id;
    var pqlist = this.Base.getMyData().temppqlist;
    var arr = [];
    for(var i=0;i<pqlist.length;i++){
      if (pqlist[i].qu_id==id){
        arr.push(pqlist[i]);
      }
    }
    this.Base.setMyData({
      shi:cur,
      pqlist:arr
    })
  }
  todetails(e){
    var rmlist = this.Base.getMyData().rmlist;
    var pqlist = this.Base.getMyData().pqlist;
    var lujing = e.currentTarget.dataset.diwei;

    if (pqlist.length>3){
      var blen = 1391;
    }else {
      var blen = 1141;
    }
    if (rmlist.length > 3) {
      var clen = 1750;
    } else {
      var clen = 1141+(118*rmlist.length);
    }
    console.log(clen,'pp')
    console.log(e);
    
    if(lujing=='a'){
     wx.pageScrollTo({
       scrollTop: 661,
       duration: 300
     })
    } else if (lujing == 'b') {
      wx.pageScrollTo({
        scrollTop: blen,
        duration: 300,
      })
    } else if (lujing == 'c') {
      wx.pageScrollTo({
        scrollTop: clen,
        duration: 300,
      })
    }
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.getcity = content.getcity;
body.qiehuan = content.qiehuan;
body.switchcity = content.switchcity;
body.gettypelist = content.gettypelist;
body.getbanner = content.getbanner;
body.getlunbo = content.getlunbo;
body.qubind = content.qubind;
body.getloupan = content.getloupan;
body.getprice = content.getprice;
body.todetails = content.todetails;
Page(body)