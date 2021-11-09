// import { notification } from 'antd';
// import { apiReport } from 'utils/errReport';
// import { NEWYUMING } from 'constant/menuData';
//notification配置
/*notification.config({
    duration: 300,
});*/
//后端抛出提示不显示
const thowErrorUrl = [
    // '/api/dbaas/mysql/validatePrivilegeIp.do'
];
// axios.defaults.withCredentials = true;
//拦截请求
axios.interceptors.request.use(
    config => {
        //添加固定参数如用户信息
        //config.params._r = Math.random();
        //增加接口时间戳
        config.params = {
            _t: new Date().getTime(),
            ...config.params
        };
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
//拦截响应
axios.interceptors.response.use(
    response => {
        if (
            response.status === 200 ||
            response.status === 202 ||
            response.status === 304
        ) {
            //返回结构一
            // {
            //     "success":true,
            //     "status":200,
            //     "data":xxx
            // }
            if (response.data.success) {
                return response.data;
            }
            // 返回结构二：无包装的响应,无status属性
            if (!response.data.data || !response.data.status) {
                return response.data;
            }
        } else {
            let msg = response.data.message;
            if (msg) openNotificationWithIcon('error', msg);
            return {
                code: response.data.code || 1,
                success: false,
                msg
            };
        }
    },
    error => {
        // apiReport(error);
        // if (!error.response)
        //     return {
        //         success: false
        //     };
        // if (
        //     error.response.status === 401 ||
        //     (error.response.status === 400 &&
        //         error.response.data.message &&
        //         (error.response.data.message.trim() === '已退出，请重新登录' ||
        //             error.response.data.message.trim() === '无URL访问权限'))
        // ) {
        //     openNotificationWithIcon('error', '登录超时，请重新登录');
        //     setTimeout(() => {
        //         window.open(`${NEWYUMING}/user/#/login?type=overtime`, '_self');
        //     }, 50);
        //     return { success: false };
        // }
        if (
            error.response.status === 403
        ) {
            //接口安全防护拦截
            openNotificationWithIcon(
                'error',
                error.response.data.message? error.response.data.message: error.response.data.msg
            );
            let code = error.response.data.code || 1;
            return {
                code,
                success: false,
                innerCode: error.response.data.innerCode,
                msg: error.response.data.message
            };
        }
        // let flag = thowErrorUrl.find(item => {
        //     return item === error.response.config.url;
        // });
        // if (!flag) {
        //     openNotificationWithIcon(
        //         'error',
        //         error.response.data.message
        //             ? error.response.data.message
        //             : error.response.data.msg
        //     );
        // }
        // let code = error.response.data.code || 1;
        // return {
        //     code,
        //     success: false,
        //     innerCode: error.response.data.innerCode,
        //     msg: error.response.data.message
        // };
    }
);
//提示框
function openNotificationWithIcon (type, description) {
    console.log('403',type, description)
    // notification[type]({
    //     message: description
    // });
}
