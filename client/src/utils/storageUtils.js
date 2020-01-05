import store from 'store'
const USER_KEY = 'user_key'
export default{
    // 存入localStorage
    saveUser(user){
        // localStorage.setItem(USER_KEY,JSON.stringify(user));
        store.set(USER_KEY,user);
    },
    // 读取localStorage
    getUser(){
        // return JSON.parse(localStorage.getItem(USER_KEY) || '{}');
        return store.get(USER_KEY || {});
    },
    // 删除localStorage
    delUser(){
        store.remove(USER_KEY);
    }
}