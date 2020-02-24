import { AppBase } from "../../appbase";
require("./extraFun")();
const fixListConfig = function(item, index) {
  const result = {}; // 使用新对象，类似浅拷贝
  result.pagePath = "/" + item.pagePath.replace(/.html$/g, "");
  result.iconPath = item.iconData ?
    "data:image/png;base64," + item.iconData :
    "/" + item.img1;
  result.selectedIconPath = item.selectedIconData ?
    "data:image/png;base64," + item.selectedIconData :
    "/" + item.img2;
  result.idx = index;
  result.redDot = false;

  result.text = item.text;

  return result;
};
const _tabBar = __wxConfig.tabBar;
console.log(_tabBar);
console.log("哈哈");
wx.hideTabBar();

Component({
  properties: {},
  data: {
    activeIdx: -1,
    config: _tabBar,
    list: _tabBar.list.map(fixListConfig),
    customOrder: Math.floor(_tabBar.list.length / 2) - 1,
    tanchu: false,
    weixin: "http://applinkupload.oss-cn-shenzhen.aliyuncs.com/alucard263096/bontop/resource/cf42e52882ee9733cf44b14c165e7230_19111418012_1742114592.png",
    licashi: "http://applinkupload.oss-cn-shenzhen.aliyuncs.com/alucard263096/bontop/resource/f6a7e83fdd65a435d13bf8fc81711698_19111418045_1105894309.png",
    lurukehu: "http://applinkupload.oss-cn-shenzhen.aliyuncs.com/alucard263096/bontop/resource/b813f0b13981f525e3f5fbf3be707ec7_19111418032_1024431678.png",
    guanbi: 'http://applinkupload.oss-cn-shenzhen.aliyuncs.com/alucard263096/bontop/resource/5c51c2b0c73d39d81d2e80a1b0c298e0_19111418042_2029879415.png'
  },
  methods: {

    switchTab(evt) {
      console.log(this.data);

      const {
        pagePath
      } = evt.currentTarget.dataset;
  console.log(123131322123);
      console.log(pagePath);
      wx.switchTab({
        url: pagePath
      });
    },
    updateRedDot() {
      if (Array.isArray(global.redDotList)) {
        this.setData({
          list: this.data.list.map(item => {
            item.redDot = global.redDotList[item.idx];
            return item;
          })
        });
      }
    },
    handleError(e) {
      console.log(e);
    }
  },

  ready() {
    this.updateRedDot();
    global.redDotBus.push(this.updateRedDot.bind(this));
  },
  pageLifetimes: {
    show() {
      const pages = getCurrentPages();
      const page = pages[pages.length - 1];
      const route = page.route;
      const idx = this.data.list.find(item => item.pagePath === `/${route}`)
        .idx;
      if (this.data.activeIdx !== idx) {
        this.setData({
          activeIdx: idx
        });
      }
    }
  }
});