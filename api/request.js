const defaultUrl = 'http://localhost:8080/violin-retail'

function Request(options) {
    uni.showLoading({
        title:"玩命加载中"
    })
    return new Promise((resolve, reject) => {
        uni.request({
            url: defaultUrl + options.url,
            method: options.method || "get",
            data: options.data || {},
            header: options.header || {},
            success: res=>{
                resolve(res)
            },
            fail: err=>{
                reject(err)
            },
            complete:()=>{
                uni.hideLoading()
            }

        })
    })
}

module.exports.Request = Request