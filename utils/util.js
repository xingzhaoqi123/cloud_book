const baseURL = "https://m.yaojunrong.com";
const fetch = {
  http(url, method, data) {
    return new Promise((resolve, reject) => {
      let token = wx.getStorageSync("token");
      let header = {
        "content-type": "application/json"
      }
      if (token) {
        header.token = token;
      }
      wx.request({
        url: baseURL + url,
        data,
        method,
        header,
        success(res) {
          if (res.header.Token) {
            wx.setStorageSync('token', res.header.Token)
          }
          resolve(res.data);
        },
        fail(err) {
          reject(err);
        }
      })
    })
  },
  get(url, data) {
    return this.http(url, 'GET', data)
  },
  post(url, data) {
    return this.http(url, 'POST', data)
  }
}
const login = () => {
  wx.login({
    success(res) {
      fetch.post('/login', {
        code: res.code,
        appid: "wx20a179cc5b28e84a",
        secret: "d1a36e14a470536ce371597d66341cc2"
      }).then(res => {
        console.log(res);
      })
    }
  })
}
exports.login = login;
exports.fetch = fetch;