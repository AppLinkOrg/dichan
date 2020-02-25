// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { CityApi } from "../../apis/city.api.js";
import { MemberApi } from "../../apis/member.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    var shax = [
      {
        id:1,
        name:'300W以下'
      },
      {
        id: 2,
        name: '300w-500w'
      },
      {
        id: 3,
        name: '500w-800w'
      },
      {
        id: 4,
        name: '800W以上'
      },
    ]
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
      shax
    })
  }
  onMyShow() {
    var that = this;
    this.getcity();
    this.gettypelist();
    this.getbanner();
    this.getlunbo();
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
  qiehuan(){
    var showcity = this.Base.getMyData().showcity;
    showcity = !showcity;
    this.Base.setMyData({
      showcity
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
      seq: idx
    })
  }
  qubind(e){
    console.log(e)
    var cur = e.currentTarget.id;
    this.Base.setMyData({
      shi:cur
    })
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
Page(body)