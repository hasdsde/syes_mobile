import {RouteRecordRaw} from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        //这是主页
        path: '/',
        component: () => import('layouts/MainLayout.vue'),
        children: [

            {path: '', redirect: '/Home'},
            {path: '/Home', component: () => import('pages/Home.vue')},
            {path: '/Sort', component: () => import('pages/Sort.vue')},
            {path: '/Upload', component: () => import('pages/Upload.vue')},
            {path: '/Message', component: () => import('pages/Message.vue')},
            {path: '/AboutMe', component: () => import('pages/AboutMe.vue')},
        ],
    },
    {
        //这是其他信息页
        path: '/it',
        component: () => import('layouts/ItemLayout.vue'),
        children: [
            {path: '/item', component: () => import('components/ItemInfo.vue')},
        ],
    },
    {
        //登录页
        path: '/Login',
        component: () => import('layouts/Login.vue'),
    },

    // Always leave this as last one,
    // but you can also remove it
    {
        //404页面
        path: '/:catchAll(.*)*',
        component: () => import('pages/ErrorNotFound.vue'),
    },
];

export default routes;
