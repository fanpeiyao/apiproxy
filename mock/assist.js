import Mock from 'mockjs'
const data = Mock.mock({
    pubkey: '@sentence(10, 20)',
    prikey: '@sentence(10, 20)'
})

export default [
    //公私钥生成
    {
        url: '/apiproxy/assist/getCipher',
        type: 'post',
        response: config => {
            return {
                retCode: 200,
                data
            }
        }
    },
    //base64编码
    {
      url: '/apiproxy/assist/base64Code',
      type: 'post',
      response: config => {
        return {
          retCode: 200,
          data:{
              reqdata: data.pubkey
          }
        }
      }
    },
    //base64解码
    {
      url: '/apiproxy/assist/base64Decode',
      type: 'post',
      response: config => {
        return {
          retCode: 200,
          data: {
            reqdata: data.pubkey
          }
        }
      }
    },
    //RSA编码
    {
      url: '/apiproxy/assist/rsaCode',
      type: 'post',
      response: config => {
        return {
          retCode: 200,
          data: {
            reqdata: data.pubkey
          }
        }
      }
    },
    //RSA解码
    {
      url: '/apiproxy/assist/rsaDecode',
      type: 'post',
      response: config => {
        return {
          retCode: 200,
          data: {
            reqdata: data.pubkey
          }
        }
      }
    }

]
