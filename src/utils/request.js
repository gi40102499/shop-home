import axios from 'axios';
import qs from 'qs';
// 用于获取vuex中存储的session.我还是采取的通过本地读取
import store from '../store';
// 获取vue实例
import vue from 'vue';
const vm = new vue;
// 获取路由
import router from "../router";
// 响应拦截
axios.interceptors.response.use(res => {
    console.log('oo响应拦截oo');
    console.log('响应来自:' + res.config.url);
    console.log(res);
    if (res.data.msg == "请设置请求头,并携带验证字符串" || res.data.code == 403) {
        vm.$message.error(res.data.msg)
        router.push('/login')
    }
    console.log('xx拦截结束xx');
    console.log('');
    return res
});
// 请求拦截
axios.interceptors.request.use(config => {
    console.log('==请求拦截==');
    console.log('请求目标:' + config.url);
    if (config.url != "/api/api/userlogin") {
        if (!sessionStorage.getItem('user')) {
            return config
        }
        config.headers.authorization = JSON.parse(sessionStorage.getItem('user')).token;
    }
    return config
});

const BASE_URL = '/api';
// const BASE_URL = '';
// 菜单列表添加请求
export const addMenu = (data) => {
    return axios({
        method: 'post',
        url: BASE_URL + '/api/menuadd',
        data: qs.stringify(data)
    })
};
/**
 * @menuList
 * 请求菜单列表.树形结构
 */
export const menuList = () => {
    return axios({
        method: 'get',
        url: BASE_URL + '/api/menulist',
        params: { istree: true }
    })
};
// 表单弹窗菜单获取（一条）
export const editMenu = (params) => {
    return axios({
        method: 'get',
        url: BASE_URL + '/api/menuinfo',
        params
    })
};
// 表单弹窗菜单修改
export const modifyMenu = (data) => {
    return axios({
        method: 'post',
        url: BASE_URL + '/api/menuedit',
        data
    })
};
// 菜单列表删除请求
export const delMenu = (data) => {
    return axios({
        method: 'post',
        url: BASE_URL + '/api/menudelete',
        data
    })
};
// ======================角色=========================
/**
 * @addRole
 * 添加角色
 */
export const addRole = (data) => {
    return axios({
        method: 'post',
        url: BASE_URL + '/api/roleadd',
        data
    })
};
/**
 * @getRoleList
 * 获取角色列表,传入{size,page}
 */
export const getRoleList = () => {
    return axios({
        method: 'get',
        url: BASE_URL + '/api/rolelist'
    })
};
/**
 * @edieRole
 * 获取一条角色信息,用于编辑
 */
export const editRole = (params) => {
    return axios({
        method: 'get',
        url: BASE_URL + '/api/roleinfo',
        params
    })
};
/**
 * @modifyRole
 * 提交修改.post:/api/roleedit
 * id编号，必填项
 * rolename角色名称
 * menus角色权限
 * status状态1正常2禁用
 */
export const modifyRole = (data) => {
    return axios({
        method: 'post',
        url: BASE_URL + '/api/roleedit',
        data
    })
}
/**
 * @delRole
 * 提交修改.post:/api/roledelete
 * id编号，必填项
 */
export const delRole = (data) => {
    return axios({
        method: 'post',
        url: BASE_URL + '/api/roledelete',
        data
    })
}

// ======================管理员=========================
/**
 * @addManager
 * 添加管理员
 * PSOT:/api/useradd
 * roleid角色编号number
 * username管理员名称string
 * password密码string
 * status状态  1正常2禁用number
 */
export const addManager = (data) => {
    return axios({
        method: 'post',
        url: BASE_URL + '/api/useradd',
        data
    })
};
/**
 * @managerCount
 * 管理员总数（用于计算分页）
 * GET:/api/usercount
 */
export const managerCount = () => {
    return axios({
        method: 'get',
        url: BASE_URL + '/api/usercount'
    })
}
/**
 * @managerList
 * 管理员列表（分页）
 * GET:/api/userlist
 * size查询条数 page页码数
 */
export const managerList = (params) => {
    return axios({
        method: 'get',
        url: BASE_URL + '/api/userlist',
        params
    })
};
/**
 * @edieManager
 * 管理员获取（一条）
 * GET:/api/userinfo
 * uid用户编号【唯一编号，不是主键】
 */
export const edieManager = (params) => {
    return axios({
        method: 'get',
        url: BASE_URL + '/api/userinfo',
        params
    })
};
/**
 * @modifyManager
 * POST:/api/useredit
 * uid用户编号，必填项
 * roleid角色编号
 * username管理员名称
 * password密码
 * status状态1正常2禁用
 */
export const modifyManager = (data) => {
    return axios({
        method: 'post',
        url: BASE_URL + '/api/useredit',
        data
    })
};
/**
 * @delManager
 * POST:/api/userdelete
 * uid用户编号
 */
export const delManager = (data) => {
    return axios({
        method: 'post',
        url: BASE_URL + '/api/userdelete',
        data
    })
};
/**
 * @managerLogin
 * POST:/api/userlogin
 * username用户名
 * password密码
 */
export const managerLogin = (data) => {
    return axios({
        method: 'post',
        url: BASE_URL + '/api/userlogin',
        data
    })
};

// ======================商品分类管理=========================
/**
 * @addCate
 * 商品分类添加
 * POST:/api/cateadd
 * pid上级分类编号
 * catename商品分类名称
 * img图片(文件，一般用于二级分类)
 * status状态1正常2禁用
 */
export const addCate = (data) => {
    let form = new FormData();
    for (const i in data) {
        form.append(i, data[i])
    };
    return axios({
        method: 'post',
        url: BASE_URL + '/api/cateadd',
        data: form
    })
};
/**
 * @cateList
 * 商品分类列表
 * GET:/api/catelist
 * istree是否需要返回树形结构是-true,  否：不传
 */
export const cateList = () => {
    return axios({
        method: 'get',
        url: BASE_URL + '/api/catelist',
        params: { istree: true }
    })
};
/**
 * @editCate
 * 商品分类获取（一条）
 * GET:/api/cateinfo
 * id分类编号
 */
export const editCate = (params) => {
    return axios({
        method: 'get',
        url: BASE_URL + '/api/cateinfo',
        params
    })
};
/**
 * @modifyCate
 * 商品分类修改
 * POST:/api/cateedit
 * id分类编号
 */
export const modifyCate = (data) => {
    let form = new FormData();
    for (const i in data) {
        form.append(i, data[i])
    };
    return axios({
        method: 'post',
        url: BASE_URL + '/api/cateedit',
        data: form
    })
};
/**
 * @delCate
 * 商品分类删除
 * POST:/api/catedelete
 * id分类编号
 */
export const delCate = (data) => {
    return axios({
        method: 'post',
        url: BASE_URL + '/api/catedelete',
        data
    })
};

// ======================商品规格管理=========================
/**
 * @addspecs
 * 商品分类添加
 * POST:/api/specsadd
 * specsname商品规格名称string’颜色‘
 * attrs商品规格属性值string"['白色','红色‘，’黄色‘]"
 * status状态1正常2禁用string1
 */
export const addSpecs = (data) => {
    return axios({
        method: 'post',
        url: BASE_URL + '/api/specsadd',
        data
    })
};
/**
 * @specsCount
 * 商品规格总数（用于计算分页）
 * get:/api/specscount
 */
export const specsCount = (data) => {
    return axios({
        method: 'get',
        url: BASE_URL + '/api/specscount',
        data
    })
};
/**
 * @specsList
 * 商品规格列表(分页)
 * get:/api/specslist
 * size查询条数
 * page页码数
 */
export const specsList = (params) => {
    return axios({
        method: 'get',
        url: BASE_URL + '/api/specslist',
        params
    })
};
/**
 * @editSpecs
 * 商品规格获取（一条）
 * get:/api/specsinfo
 * id规格编号
 */
export const editSpecs = (params) => {
    return axios({
        method: 'get',
        url: BASE_URL + '/api/specsinfo',
        params
    })
};
/**
 * @modifySpecs
 * 商品规格修改
 * id分类编号，必填项
 * specsname商品规格名称
 * attrs商品规格属性值
 * status状态1正常2禁用
 */
export const modifySpecs = (data) => {
    return axios({
        method: 'post',
        url: BASE_URL + '/api/specsedit',
        data
    })
};
/**
 * @delSpecs
 * 商品规格删除
 * post:/api/specsdelete
 * id规格编号
 */
export const delSpecs = (data) => {
    return axios({
        method: 'post',
        url: BASE_URL + '/api/specsdelete',
        data
    })
};




// ======================商品管理=========================
/**
 * @addGoods
 * 商品添加
 * POST:/api/goodsadd
 * first_cateid一级分类编号
 * second_cateid二级分类编号
 * goodsname商品名称
 * price商品价格
 * market_price市场价格
 * img商品图片（文件）
 * description商品描述
 * specsid商品规格编号
 * specsattr商品规格属性
 * isnew是否新品     1-是 2-否
 * ishot是否热卖推荐 1-是 2-否
 * status状态1正常2禁用
 */
export const addGoods = (data) => {
    let form = new FormData()
    for (const i in data) {
        form.append(i, data[i])
    };
    return axios({
        method: 'post',
        url: BASE_URL + '/api/goodsadd',
        data: form
    })
};

/**
 * @goodsCount
 * 商品总数（用于计算分页）
 * get:/api/goodscount
 */
export const goodsCount = (data) => {
    return axios({
        method: 'get',
        url: BASE_URL + '/api/goodscount',
        data
    })
};
/**
 * @goodsList
 * 商品列表(分页)
 * get:/api/goodslist
 * size查询条数 page页码数
 * fid一级分类id sid二级分类id
 */
export const goodsList = (params) => {
    return axios({
        method: 'get',
        url: BASE_URL + '/api/goodslist',
        params
    })
};
/**
 * @editGoods
 * 商品获取（一条）
 * get:/api/goodsinfo
 * id规格编号
 */
export const editGoods = (params) => {
    return axios({
        method: 'get',
        url: BASE_URL + '/api/goodsinfo',
        params
    })
};
/**
 * @modifyGoods
 * 商品规格修改
 * post:/api/goodsedit
 * id分类编号，必填项
 * first_cateid一级分类编号
 * second_cateid二级分类编号
 * goodsname商品名称
 * price商品价格
 * market_price市场价格
 * img商品图片（文件）
 * description商品描述
 * sepcsid商品规格编号
 * sepcsattr商品规格属性
 * isnew是否新品
 * ishot是否热卖推荐
 * status状态1正常2禁用
 */
export const modifyGoods = (data) => {
    let form = new FormData()
    for (const i in data) {
        form.append(i, data[i])
    };
    return axios({
        method: 'post',
        url: BASE_URL + '/api/goodsedit',
        data:form
    })
};
/**
 * @delGoods
 * 商品删除
 * post:/api/goodsdelete
 * id规格编号
 */
export const delGoods = (data) => {
    return axios({
        method: 'post',
        url: BASE_URL + '/api/goodsdelete',
        data
    })
};

// ======================会员管理=========================
/**
 * @register
 * 商品分类添加
 * POST:/api/register
 * phone手机号
 * nickname昵称
 * password密码
 */
 export const register = (data) => {
    return axios({
        method: 'post',
        url: BASE_URL + '/api/register',
        data
    })
};
/**
 * @memberList
 * 会员列表
 * get:/api/memberlist
 * size查询条数
 * page页码数
 */
export const memberList = (params) => {
    return axios({
        method: 'get',
        url: BASE_URL + '/api/memberlist',
        params
    })
};
/**
 * @editMember
 * 会员获取（一条）
 * get:/api/memberinfo
 * uid用户编号，必填项
 */
export const editMember = (params) => {
    return axios({
        method: 'get',
        url: BASE_URL + '/api/memberinfo',
        params
    })
};
/**
 * @modifyMember
 * 会员修改
 * uid会员编号，必填项
 * nickname昵称
 * phone手机号
 * password密码
 * status状态1正常2禁用
 */
export const modifyMember = (data) => {
    return axios({
        method: 'post',
        url: BASE_URL + '/api/memberedit',
        data
    })
};
// ======================轮播图管理=========================
/**
 * @addBanner
 * 轮播图添加
 * POST:/api/banneradd
 * title轮播图名称
 * img图片(文件)
 * status状态  1正常2禁用
 */
 export const addBanner = (data) => {
    let form = new FormData();
    for (const i in data) {
        form.append(i, data[i])
    };
    return axios({
        method: 'post',
        url: BASE_URL + '/api/banneradd',
        data: form
    })
};
/**
 * @bannerList
 * 商品分类列表
 * GET:/api/bannerlist
 */
export const bannerList = () => {
    return axios({
        method: 'get',
        url: BASE_URL + '/api/bannerlist',
    })
};
/**
 * @editBanner
 * 商品分类获取（一条）
 * GET:/api/bannerinfo
 * id轮播图编号
 */
export const editBanner = (params) => {
    return axios({
        method: 'get',
        url: BASE_URL + '/api/bannerinfo',
        params
    })
};
/**
 * @modifyBanner
 * 商品分类修改
 * POST:/api/banneredit
 * id分类编号，必填项
 * title轮播图名称
 * img图片(文件)
 * status状态1正常2禁用
 */
export const modifyBanner = (data) => {
    let form = new FormData();
    for (const i in data) {
        form.append(i, data[i])
    };
    return axios({
        method: 'post',
        url: BASE_URL + '/api/banneredit',
        data: form
    })
};
/**
 * @delBanner
 * 商品分类删除
 * POST:/api/bannerdelete
 * id分类编号
 */
export const delBanner = (data) => {
    return axios({
        method: 'post',
        url: BASE_URL + '/api/bannerdelete',
        data
    })
};
// ======================秒杀活动管理=========================
/**
 * @addSeckill
 * 限时秒杀添加
 * POST:/api/seckadd
 * title限时秒杀名称
 * begintime开始时间
 * endtime结束时间
 * first_cateid商品一级分类编号
 * second_cateid商品二级分类编号
 * goodsid商品编号
 * status状态   1正常2禁用
 */
 export const addSeckill = (data) => {
    return axios({
        method: 'post',
        url: BASE_URL + '/api/seckadd',
        data
    })
};
/**
 * @seckillList
 * 限时秒杀列表
 * GET:/api/secklist
 */
export const seckillList = () => {
    return axios({
        method: 'get',
        url: BASE_URL + '/api/secklist',
    })
};
/**
 * @editSeckill
 * 限时秒杀获取（一条）
 * GET:/api/seckinfo
 * id秒杀活动编号
 */
export const editSeckill = (params) => {
    return axios({
        method: 'get',
        url: BASE_URL + '/api/seckinfo',
        params
    })
};
/**
 * @modifySeckill
 * 限时秒杀修改
 * POST:/api/seckedit
 * id编号，必填项
 * title限时秒杀名称
 * begintime开始时间
 * endtime结束时间
 * first_cateid商品一级分类编号
 * second_cateid商品二级分类编号
 * goodsid商品编号
 * status状态1正常2禁用
 */
export const modifySeckill = (data) => {
    return axios({
        method: 'post',
        url: BASE_URL + '/api/seckedit',
        data
    })
};
/**
 * @delSeckill
 * 限时秒杀删除
 * POST:/api/seckdelete
 * id编号，必填项
 */
export const delSeckill = (data) => {
    return axios({
        method: 'post',
        url: BASE_URL + '/api/seckdelete',
        data
    })
};
