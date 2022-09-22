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
        //这是物品详情页
        path: '/it',
        component: () => import('layouts/ItemLayout.vue'),
        children: [
            {path: '/item', component: () => import('components/ItemInfo.vue')},
        ],
    },
    {   //关于页面
        path: '/ab',
        component: () => import('layouts/AboutLayout.vue'),
        children: [
            {path: '/MyCollection', component: () => import('components/MyCollection.vue')},
            {path: '/MyHistory', component: () => import('components/MyHistory.vue')},
            {path: '/MyComment', component: () => import('components/MyComment.vue')},
            {path: '/Posted', component: () => import('components/Posted.vue')},
            {path: '/Auction', component: () => import('components/Auction.vue')},
            {path: '/BuyOrder', component: () => import('components/BuyOrder.vue')},
            {path: '/SoldOrder', component: () => import('components/SoldOrder.vue')},
            {path: '/sortList', component: () => import('components/SortItem.vue')},
        ]
    }, {//聊天框
        path: '/ca',
        component: () => import('layouts/ChatLayout.vue'),
        children: [{path: '/chat', component: () => import('components/Chat.vue')}]
    }
    ,
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
