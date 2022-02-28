<template>
    <div>
        <li class="list-group-item" :class="className">
        <slot></slot>
        </li>
        <small class="badge float-right" :class="userNameFillColor">you</small>
    </div>

</template>

<script>
    export default {
        props : [
            'color'
        ],
        computed:{
            className(){
                return 'list-group-item-'+this.color;
            },
            userNameFillColor(){
                return 'list-group-item-'+this.color;
            }
        },
        mounted() {
            console.log('Component mounted.');

        }
    }
</script>
