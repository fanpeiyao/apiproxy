import Mock from 'mockjs'
const data = Mock.mock({
    pubkey: '@sentence(10, 20)',
    prikey: '@sentence(10, 20)'
})

export default [
    //公私钥生成
    {
        url: '/encryption/getKeyPair',
        type: 'post',
        response: config => {
            return {
                retCode: '00',
                privateKey: data.prikey,
                publicKey: data.pubkey,
            }
        }
    },
    //base64编码
    {
      url: '/encryption/BASE64Encrypt',
      type: 'post',
      response: config => {
        return {
          retCode: '00',
          encrypt: data.pubkey
        }
      }
    },
    //base64解码
    {
      url: '/encryption/BASE64Decrypt',
      type: 'post',
      response: config => {
        return {
          retCode: '00',
          decrypt: data.pubkey
        }
      }
    },
    //RSA编码
    {
      url: '/encryption/RSAEncrypt',
      type: 'post',
      response: config => {
        return {
          retCode: '00',
          encrypt: data.pubkey
        }
      }
    },
    //RSA解码
    {
      url: '/encryption/RSADecrypt',
      type: 'post',
      response: config => {
        return {
          retCode: '00',
          decrypt: data.pubkey
        }
      }
    }

]
