import {ref} from "vue";

export interface Todo {
    id: number;
    content: string;
}

export interface Meta {
    totalCount: number;
}

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


}