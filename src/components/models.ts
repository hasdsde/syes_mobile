import {ref} from "vue";
import {CommFail} from "components/common";

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

export class UploadItem {
    title = ref()
    price = ref()
    description = ref()
}

export function getUserInfo() {
    if (localStorage.getItem('userinfo') == null) {
        CommFail('获取用户信息失败，请重新登录')
    } else {
        //@ts-ignore
        return JSON.parse(localStorage.getItem('userinfo'))
    }
}