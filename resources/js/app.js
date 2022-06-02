require('./bootstrap');
import Vue from 'vue';
import VueChatScroll from 'vue-chat-scroll';
import Toaster from 'v-toaster'

// You need a specific loader for CSS files like https://github.com/webpack/css-loader
import 'v-toaster/dist/v-toaster.css'

Vue.use(VueChatScroll);
Vue.use(Toaster, {timeout: 5000})

window.Vue = require('vue');


Vue.component('message', require('./components/Message.vue').default);


const app = new Vue({
    el: '#app',
    data : {
        message : '',
        chat : {
            messages : [],
            users : [],
            colors : [],
            floatPositions : [],
            times : [],
        },
        isTyping: '',
        users : '',
        usersCount : 0,
    },

    methods:{
        send(){
            if (this.message) {

                this.chat.messages.push(this.message);
                this.chat.users.push("you");
                this.chat.colors.push("success");
                this.chat.floatPositions.push("right");
                this.chat.times.push(this.getTime());

                axios.post('/send', {
                    message: this.message,
                  })
                  .then(function (response) {
                    console.log(response);
                  })
                  .catch(function (error) {
                    console.log(error);
                  });

                this.message="";
            }
        },
        getTime(){
            let time=new Date();
            return time.getHours()+":"+time.getMinutes();
        },
        deleteUser(user) {
            for(var i = 0; i < this.users.length; i++) {
               if(this.users[i].id === user['id']) {
                 this.users.splice(i, 1)
                 return;
               }
            }
        }
    },
    watch:{
       message(){
            Echo.private('chat')
            .whisper('typing', {
                message : this.message
            });
       }
    },
    mounted(){
        Echo.private('chat')
            .listen('ChatEvent', (e) => {
                console.log(e);
                this.chat.messages.push(e.message);
                this.chat.users.push(e.user.name);
                this.chat.colors.push("warning");
                this.chat.floatPositions.push("left");
                this.chat.times.push(this.getTime());
            })
            .listenForWhisper('typing', (e)=>{

                if (e.message) {
                    this.isTyping = "typing";
                }else{
                    this.isTyping= "";
                }

                console.log(this.isTyping);
            });


            Echo.join(`chat`)
            .here((users) => {
                this.users=users;
                this.usersCount=users.length;
            })
            .joining((user) => {
                //this.users.push(user);
                this.usersCount+=1;
                this.$toaster.info(user.name+' Joined the chat room')

                //console.log("new user added : "+this.usersCount);
            })
            .leaving((user) => {
                //this.deleteUser(user);
                console.log(this.users);
                this.usersCount-=1;
                this.$toaster.warning(user.name+' Leaved')

            })
            .error((error) => {
                console.error(error);

            });
    }

});
