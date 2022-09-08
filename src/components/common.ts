import {Notify, QSpinnerGears} from 'quasar'

//底部提示
//一般类型操作成功
export function BottomSeccess(icon: any, message: any) {
    Notify.create({
        icon: icon,
        color: 'positive',
        message: message,
        position: 'bottom',
        group: false,
        timeout: 100
    })
}

export function BottomWarn(icon: any, message: any) {
    Notify.create({
        icon: icon,
        color: 'warning',
        message: message,
        position: 'bottom',
        group: false,
        timeout: 200
    })
}

//一般类型操作成功
export function CommSeccess(message: any) {
    Notify.create({
        icon: 'done',
        color: 'positive',
        message: message,
        position: 'top',
        group: false,
        timeout: 100,
    })
}

export function CommFail(message: any) {
    Notify.create({
        icon: 'error',
        color: 'negative',
        message: message,
        position: 'top',
        group: false,
        timeout: 500,
    })
}

export function CommWarn(message: any) {
    Notify.create({
        icon: 'error',
        type: 'warning',
        message: message,
        position: 'top',
        group: false,
        timeout: 500,
    })
}

export function ButtonLoading(message: any) {
    Notify.create({
        spinner: QSpinnerGears,
        color: 'positive',
        message: message,
        timeout: 500,
    })
}

export function LoadingNotify() {
    return Notify.create({
        type: 'ongoing',
        message: "正在加载",
        position: 'top',
        timeout: 100,
    });
}

export function LoadingSucceed(not: any) {
    not({
        icon: 'done',
        color: 'positive',
        type: 'positive',
        message: "加载成功",
        timeout: 100,
    })
}

export function LoadingFail(not: any) {
    not({
        icon: 'error',
        color: 'negative',
        type: 'positive',
        message: "加载失败",
        timeout: 100,
    })
}