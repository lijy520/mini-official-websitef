const ENV = 'dev';
// const ENV = 'test';
// const ENV = 'prod';

let baseUrl = {
    platform: {
      // dev: 'http://192.168.2.139:8080/xcx-platform',//吴彦坤
      // dev: 'http://192.168.2.132:9083/xcx-platform',//张辉
      dev: 'http://192.168.2.135:8080/xcx-platform',//岳传涛
            
      
        // test: 'http://192.168.2.132:9081/xcx-wallet',
      test: 'http://192.168.2.143:9101/xcx-platform',
      prod: 'https://wallet.jinghanit.com/xcx-platform'
    },
    fastdfs: {
        dev: 'https://file.jinghanit.com/jinghan-fastdfs',
        test: 'https://file.jinghanit.com/jinghan-fastdfs',
        prod: 'https://file.jinghanit.com/jinghan-fastdfs'
    },
    user: {
      // dev: 'http://192.168.2.143:9099/jinghan-user',
      dev: 'http://192.168.2.139:8081/jinghan-user',//吴彦坤
      test: 'http://192.168.2.143:9099/jinghan-user',
      prod: 'https://file.jinghanit.com/jinghan-user'
    },
    payment: {
        // dev: 'http://192.168.2.6:9089/jinghan-payment/api/wx/wxUnifiedOrder',
      dev: 'http://192.168.2.143:9089/jinghan-payment/api/wx/wxUnifiedOrder',
        test: 'http://192.168.2.143:9089/jinghan-payment/api/wx/wxUnifiedOrder',
        prod: 'https://payxcx.jinghanit.com/jinghan-payment/api/wx/wxUnifiedOrder'
    },
    cacheFormId: {
        dev: 'http://192.168.2.6:9099/jinghan-user/api/access/v2/skip/cacheFormId',
        test: 'http://192.168.2.143:9099/jinghan-user/api/access/v2/skip/cacheFormId',
        prod: 'https://user.jinghanit.com/jinghan-user/api/access/v2/skip/cacheFormId'
    }
};

const b = (c = 'website', e = 'dev') => {
    if (ENV !== 'dev') {
        return baseUrl[c][ENV];
    } else {
        return baseUrl[c][e];
    }
};

export default {
    file: b('fastdfs') + '/fdfs/upload.shtml',
    user: {
      login: b('platform') + '/api/user/v1/skip/login',
      generateQrCode: b('user') + '/api/access/v2/generateQrCode',//推广码
      leaveWords: b('platform') + '/api/template/v1/leaveWords',//查询留言列表
      signWebLeaveWordToRead: b('platform') + '/api/template/v1/signWebLeaveWordToRead',//标记表单留言信息为已读
      customCategories: b('platform') + '/api/custom/v1/customCategories',//获取定制信息列表
      save: b('platform') + '/api/custom/v1/save',//保存定制信息
      code: b('user') + '/api/user/v2/skip/getSmsCode',//发送验证码
      register: b('user') + '/api/user/v2/skip/register',//注册
      personCenter: b('platform') + '/api/user/v1/personCenter',//个人中心
    },
    shop: {
      queryWithAuthenticate: b('platform') + '/api/shop/v1/queryWithAuthenticate',//查询店铺信息,附带认证信息
      queryShopWithTemplate: b('platform') + '/api/shop/v1/queryShopWithTemplate',//查询店铺信息
      saveOrUpdate: b('platform') + '/api/shop/v1/saveOrUpdate', // 创建店铺
      preparePublish: b('platform') + '/api/shop/v1/preparePublish', // 店铺预发布
      pay: b('payment') , //支付
    },
    template: {
        addGoodsCategory: b('platform') + '/api/template/v1/addGoodsCategory',
        addOrUpdateGoodsGroup: b('platform') + '/api/template/v1/addOrUpdateGoodsGroup',
        addWebLeaveWord: b('platform') + '/api/template/v1/addWebLeaveWord',
        deleteGoodsCategory: b('platform') + '/api/template/v1/deleteGoodsCategory',
        leaveWords: b('platform') + '/api/template/v1/leaveWords',
        operation: b('platform') + '/api/template/v1/operation',
        paragraph: b('platform') + '/api/template/v1/paragraph',
        picture: b('platform') + '/api/template/v1/picture',
        queryGoodsDetail: b('platform') + '/api/template/v1/queryGoodsDetail',
        signWebLeaveWordToRead: b('platform') + '/api/template/v1/signWebLeaveWordToRead'
    }
}