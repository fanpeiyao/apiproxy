import Mock from 'mockjs'

export default [
    {
        url: '/apiproxy/req/redirect',
        type: 'post',
        response: config => {
            return {
            code: 200,
            data: {
                requrl: 'http://mockjs.com/examples.html'
            }
            }
        }
    },
    {
        url: '/apiproxy/req/passthrough',
        type: 'post',
        response: config => {
            return {
            code: 200,
            data: {
                requrl: 'http://mockjs.com'
            }
            }
        }
    }
]
