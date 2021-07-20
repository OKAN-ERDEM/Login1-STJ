import { extendObservable } from 'mobx';

class UserS{
    constructor(){
        extendObservable(this, {

            loading: true,
            isLoggedIn: false,
            username:''
        })
    }
}

export default new UserS();