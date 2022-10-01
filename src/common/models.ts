import {ref} from "vue";
import {CommFail} from "src/common/common";

export interface Todo {
    id: number;
    content: string;
}

export interface Meta {
    totalCount: number;
}

export const Allmenus = [
    {name: 'Home', label: '首页', icon: 'home', link: '/Home', id: 1},
    {name: 'Sort', label: '分类', icon: 'format_list_bulleted', link: '/Sort', id: 2},
    {name: 'Upload', label: '上传', icon: 'add_circle', link: '/Upload', id: 3},
    {name: 'Message', label: '消息', icon: 'chat', link: '/Message', id: 4},
    {name: 'AboutMe', label: '我的', icon: 'account_circle', link: '/AboutMe', id: 5},
    {name: 'ItemInfo', label: '物品详情', icon: 'shopping_bag', link: '/item', id: 6},
    {name: 'MyCollection', label: '我的收藏', icon: 'star_border', link: '/MyCollection', id: 7},
    {name: 'MyHistory', label: '浏览历史', icon: 'history', link: '/MyHistory', id: 8},
    {name: 'MyComment', label: '我的评论', icon: 'comment', link: '/MyComment', id: 13},
    {name: 'Posted', label: '我发布的', icon: 'unarchive', link: '/Posted', id: 9},
    {name: 'Auction', label: '我的出价', icon: 'paid', link: '/Auction', id: 10},
    {name: 'BuyOrder', label: '买入订单', icon: 'shopping_cart', link: '/BuyOrder', id: 11},
    {name: 'SoldOrder', label: '卖出订单', icon: 'shopping_basket', link: '/SoldOrder', id: 12},
    {name: 'sortList', label: '分类', icon: 'category', link: '/sortList', id: 14},
    {name: 'chat', label: '聊天', icon: 'forum', link: '/chat', id: 15},
    {name: 'search', label: '搜索', icon: 'search', link: '/search', id: 16},
]
export const menus = [
    {name: 'Home', label: '首页', icon: 'home', link: '/Home', id: 1},
    {name: 'Sort', label: '分类', icon: 'format_list_bulleted', link: '/Sort', id: 2},
    {name: 'Upload', label: '上传', icon: 'add_circle', link: '/Upload', id: 3},
    {name: 'Message', label: '消息', icon: 'chat', link: '/Message', id: 4},
    {name: 'AboutMe', label: '我的', icon: 'account_circle', link: '/AboutMe', id: 5},
]

export class UserInfo {
    userid = ref('')
    password = ref('')
    username = ref('')
    avatar = ref('')
    useridRef = ref('')
    passwordRef = ref('')
    token = ref('')
}

export class UserChatInfo {
    username = ref('')
    infoid = ref('')
    avatar = ref('')
}


export class UploadItem {
    title = ref()
    price = ref()
    description = ref()
    sort = ref()

    clear() {
        this.title = ref('')
        this.price = ref('')
        this.description = ref('')
        this.sort = ref('')
    }
}

export function getUserInfo() {
    if (localStorage.getItem('userinfo') == null) {
        CommFail('获取用户信息失败，请重新登录')
    } else {
        //@ts-ignore
        return JSON.parse(localStorage.getItem('userinfo'))
    }
}