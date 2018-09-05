import {
  fetch
} from "../../utils/util.js"
const app = getApp()

Page({
  data: {
    swiperData: [],
    mainContent: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    isloading: false,
  },
  onLoad() {
    this.getData();
    this.getContent();

  },
  getData() {
    this.setData({
      isloading: true
    })
    fetch.get("/swiper").then(res => {
      this.setData({
        swiperData: res.data.data,
        isloading: false
      })
    }).catch(err => {
      this.setData({
        isloading: false
      })
    })
  },

  getContent() {
    fetch.get("/category/books").then(res => {
      this.setData({
        mainContent: res.data.data
      })
    })
  },
  jumpPage(event) {
    const id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/details/details?id=${id}`,
    })
  }
})