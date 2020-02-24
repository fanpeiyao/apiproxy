import Mock from 'mockjs'

export default [
    {
        url: '/req/redirect',
        type: 'post',
        response: config => {
            return {
            retCode: '00',
            data: {
                requrl: 'http://mockjs.com/examples.html'
            }
            }
        }
    },
    {
        url: '/req/passthrough',
        type: 'post',
        response: config => {
            return {
            retCode: '00',
            data: {
                requrl: 'http://mockjs.com'
            }
            }
        }
    }
]
