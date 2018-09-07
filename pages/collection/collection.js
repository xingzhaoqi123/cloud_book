import {
  fetch
} from "../../utils/util.js"
const app = getApp();
Page({
  data: {
    bookData: [],
    pn: 1,
    hasmore: false,
    size: 10,
    moreData: [],
    collectionNum: "",
    num: ""
  },
  getNumCollect() {
    fetch.get('/collection/total').then(res => {
      this.setData({
        collectionNum: res.data,
        num: res.data
      })
    })
  },

  getCollect() {
    return new Promise((resolve, reject) => {
      fetch.get('/collection', {
        pn: this.data.pn,
        size: this.data.size
      }).then(res => {
        resolve(res)
        this.setData({
          bookData: res.data,
          num: this.data.collectionNum - this.data.size
        })
      })
    })
  },
  getmoreCollect() {
    return new Promise((resolve, reject) => {
      fetch.get('/collection', {
        pn: this.data.pn,
        size: this.data.size
      }).then(res => {
        resolve(res)
        this.setData({
          bookData: res.data
        })

      })
    })
  },
  getRead() {
    fetch.get('/readList').then(res => {
      console.log(res);
    })
  },

  onShow() {
    this.getRead();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getNumCollect();
    this.getCollect();

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.getCollect().then(res => {
      wx.stopPullDownRefresh()
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    console.log(this.data.hasmore);
    if (this.data.hasmore) {
      this.setData({
        pn: this.data.pn + 1,
        num: this.data.num - this.data.size
      })
      this.getmoreCollect().then(res => {
        let newArr = [...this.data.bookData, ...res.data]
        this.setData({
          bookData: newArr
        })
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})