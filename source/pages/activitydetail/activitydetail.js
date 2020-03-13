// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { ActivityApi } from "../../apis/activity.api.js";
var WxParse = require('../../wxParse/wxParse');
import { ApiUtil } from "../../apis/apiutil.js";
class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    options.id=2;
    super.onLoad(options);
  }
  onMyShow() {
    var that = this;
    var api = new ActivityApi();
    api.activitydetail({id:this.Base.options.id}, (activitydetail)=>{
      activitydetail.content = ApiUtil.HtmlDecode(activitydetail.content);

      WxParse.wxParse('content', 'html', activitydetail.content, that, 10);
      this.Base.setMyData({ activitydetail})
    })
  }
  setPageTitle(instinfo) {
    wx.setNavigationBarTitle({
      title: '活动详情',
    })
  }
  baomin(){
    wx.navigateTo({
      url: '/pages/actbaomin/actbaomin?id='+this.Base.options.id,
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.baomin = content.baomin;
Page(body)