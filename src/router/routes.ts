import {RouteRecordRaw} from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
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
        path: '/Login',
        component: () => import('layouts/Login.vue'),
    },

    // Always leave this as last one,
    // but you can also remove it
    {
        path: '/:catchAll(.*)*',
        component: () => import('pages/ErrorNotFound.vue'),
    },
];

export default routes;
