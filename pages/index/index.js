import {
  fetch,login
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
    pn: 1,
    hasmore: true,
    loadBottom: false
  },
  onLoad() {
    this.getAllData();
  },
  getAllData() {
    return new Promise((resolve, reject) => {
      this.setData({
        isloading: true,
        pn: 1,
        hasmore: true,

      })
      Promise.all([this.getData(), this.getContent()]).then(res => {
        this.setData({
          isloading: false
        })
      }).catch(err => {
        this.setData({
          isloading: false
        })
      })
    })
  },
  getData() {
    return new Promise((resolve, reject) => {
     
      this.setData({
        isloading: true
      })
      fetch.get("/swiper").then(res => {
        this.setData({
          swiperData: res.data,
          isloading: false
        })
      }).catch(err => {
        this.setData({
          isloading: false
        })
      })
    })
  },
  getmorecontent() {
    return new Promise((resolve, reject) => {
      fetch.get('/category/books', {
        pn: this.data.pn
      }).then(res => {
        resolve(res)
      })
    })
  },
  getContent() {
    return new Promise((resolve, reject) => {
      fetch.get("/category/books").then(res => {
        resolve(res)
        this.setData({
          mainContent: res.data
        })
      }).catch(err => {
        reject(err);
      })
    })

  },
  jumpPage(event) {
    const id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/details/details?id=${id}`,
    })
  },

  onPullDownRefresh() {
    this.getAllData().then(() => {
      wx.stopPullDownRefresh()
    })
  },
  onReachBottom() {
    if (this.data.hasmore) {
      this.setData({
        pn: this.data.pn + 1,
        loadBottom:true
      })
      this.getmorecontent().then(res => {
        let newArr = [...this.data.mainContent,...res.data]
        this.setData({
          mainContent: newArr
        })
        if (res.data.length < 2) {
          this.setData({
            hasmore: false
          })
        }
      })
    }
  },
})