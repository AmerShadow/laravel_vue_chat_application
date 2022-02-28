require('./bootstrap');
import Vue from 'vue'

import VueChatScroll from 'vue-chat-scroll'
Vue.use(VueChatScroll)

window.Vue = require('vue');


Vue.component('message', require('./components/Message.vue').default);


const app = new Vue({
    el: '#app',
    data : {
        message : '',
        chat : {
            messages : []
        }
    },

    methods:{
        send(){
            if (this.message) {
                console.log(this.message);
                this.chat.messages.push(this.message);
                this.message="";
            }
        }
    }

});
