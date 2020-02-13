import Mock from 'mockjs'
const data = Mock.mock({
    pubkey: '@sentence(10, 20)',
    prikey: '@sentence(10, 20)'
})

export default [
    //公私钥生成
    {
        url: '/apiproxy/encryption/getKeyPair',
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
      url: '/apiproxy/encryption/BASE64Encrypt',
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
      url: '/apiproxy/encryption/BASE64Decrypt',
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
      url: '/apiproxy/encryption/RSAEncrypt',
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
      url: '/apiproxy/encryption/RSADecrypt',
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
