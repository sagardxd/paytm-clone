import { atom } from "recoil";

export const signinFormdataAtom = atom({
    key: 'signFormdataAtom',
    default: {
        username: '',
        password: ''
    }
})

export const signupFormdataAtom = atom({
    key: 'signupFormdataAtom',
    default: {
        firstname: '',
        lastname: '',
        username: '',
        password: ''
    }
})