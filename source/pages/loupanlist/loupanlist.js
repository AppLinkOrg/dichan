// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { LoupanApi } from "../../apis/loupan.api.js";
import { CityApi } from "../../apis/city.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    // options.id=1;
    // options.city_id=1;
    super.onLoad(options);
    this.Base.setMyData({ 
      showcity:false,
    showprice:false,
      seq:0,
      seq1:0,
      city_id:this.Base.options.city_id,
      pricerange_id:0,
    })
  }
  onMyShow() {
    var that = this;
    var api = new LoupanApi;
    var arr=[];
    var pricerange_id = Number(this.Base.getMyData().pricerange_id) ;
    var city_id = this.Base.getMyData().city_id;
    console.log(city_id, pricerange_id, Number(pricerange_id))
    api.loupanlist({ city_id: city_id, }, (loupanlist)=>{
      console.log(loupanlist)
      for (var i = 0; i < loupanlist.length;i++){
        if (pricerange_id!=0){
          if (loupanlist[i].pricerange_id == pricerange_id) {
            for (var j = 0; j < loupanlist[i].types.length; j++) {
              console.log(loupanlist[i].types[j].id, that.Base.options.id)
              if (loupanlist[i].types[j].id == that.Base.options.id) {
                arr.push(loupanlist[i]);
              }
            }
          }
        }else {
          for (var j = 0; j < loupanlist[i].types.length; j++) {
            console.log(loupanlist[i].types[j].id, that.Base.options.id)
            if (loupanlist[i].types[j].id == that.Base.options.id) {
              arr.push(loupanlist[i]);
            }
          }
        }
       
        
      }
      this.Base.setMyData({ loupanlist:arr})
      
    })
    this.getprice();
    this.getcity();
  }
  getcity() {
    var city_id = this.Base.options.city_id;
    var cityapi = new CityApi;
    cityapi.citydetail({ id: city_id }, (citydetail) => {
      console.log(citydetail);

      this.Base.setMyData({ citydetail,  })
    })
  }
  getprice() {
    var loupanapi = new LoupanApi;
    loupanapi.pricerange({ orderby: 'r_main.seq' }, (pricerange) => {
      pricerange.unshift({
        seq:0,
        id:0,
        name:'不限'
      })
      this.Base.setMyData({
        shax: pricerange
      })
    })
  }
  diqu(e){
    console.log(e);
    var cur = e.currentTarget.id;
    var showcity = this.Base.getMyData().showcity;
    var showprice = this.Base.getMyData().showprice;
    showcity = !showcity;
    showprice = !showprice;
    if(cur=='A'){
      this.Base.setMyData({
        showcity,
        showprice:false
      })
    }else if(cur=='B'){
      this.Base.setMyData({
        showprice,
        showcity:false
      })
    }
  }
  switchcity(e) {
    console.log(e);
    var that = this;
    var idx = e.currentTarget.id;
    var curid=e.currentTarget.dataset.current;
    var seq = this.Base.getMyData().seq;

    this.Base.setMyData({
      // showcity: false,
      seq: idx,
      city_id: curid
    })
    // that.onMyShow();
  }

  switchprice(e) {
    console.log(e);
    var that = this;
    var idx = e.currentTarget.id;
    var curid = e.currentTarget.dataset.current;
    var seq1 = this.Base.getMyData().seq1;

    this.Base.setMyData({
      // showprice: false,
      seq1: idx,
      pricerange_id: curid
    })
    // that.onMyShow();
  }
  todetail(e){
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/lpdetail/lpdetail?id='+id,
    })
  }
  xiaoshi(){
    this.Base.setMyData({
      showcity:false,
      showprice:false
    })
  }
  queren(){
    var city_id = this.Base.getMyData().city_id;
    this.Base.setMyData({
      showcity: false,
    })
    this.onMyShow();
  }
  reset(){
    this.Base.setMyData({
      showcity: false,
      showprice: false,
      seq:0,
      city_id:0
    })
    this.onMyShow();
  }

  queren2() {
    var pricerange_id = this.Base.getMyData().pricerange_id;
    this.onMyShow();
    this.Base.setMyData({
      showprice: false,
    })
  }
  reset2() {
    this.Base.setMyData({
      showcity: false,
      showprice: false,
      seq1: 0,
      pricerange_id: 0
    })
    this.onMyShow();
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.getcity = content.getcity;
body.getprice = content.getprice;
body.diqu = content.diqu;
body.switchcity = content.switchcity;
body.switchprice = content.switchprice;
body.xiaoshi = content.xiaoshi;
body.todetail = content.todetail;
body.queren = content.queren;
body.queren2 = content.queren2;
body.reset2 = content.reset2;
body.reset = content.reset;
Page(body)