import {Notify} from 'quasar'

//一般类型操作成功
export function CommSeccess(message: any) {
    Notify.create({
        icon: 'done',
        color: 'positive',
        message: message,
        position: 'top',
        group: false,
    })
}

export function CommFail(message: any) {
    Notify.create({
        icon: 'error',
        color: 'negative',
        message: message,
        position: 'top',
        group: false,
    })
}

export function CommWarn(message: any) {
    Notify.create({
        icon: 'error',
        type: 'warning',
        message: message,
        position: 'top',
        group: false,
    })
}
