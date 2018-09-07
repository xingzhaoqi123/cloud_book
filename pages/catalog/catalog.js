import {
  fetch
} from "../../utils/util.js"
var app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookId: "",
    catalogData: [],
    isloading: false,
    length:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      bookId: options.id
    })
    this.getCatalog()
  },
  getCatalog() {
    this.setData({
      isloading: true
    })
    fetch.get(`/titles/${this.data.bookId}`).then(res => {
      this.setData({
        catalogData: res.data,
        isloading: false,
        length:res.data.length
      })
    

    }).catch(err => {
      this.setData({
        isloading: false
      })
    })

  },


})