<template>
    <div>
        <li class="list-group-item" :class="className">
        <slot></slot>
        </li>
        <div :class="floatPositionMethod">
        <small class="badge" :class="userNameFillColor">{{user}} at {{time}}</small>
        </div>
    </div>

</template>

<script>
    export default {
        props : [
            'color',
            'user',
            'position',
            'time'
        ],
        computed:{
            className(){
                return 'list-group-item-'+this.color;
            },
            userNameFillColor(){
                return 'list-group-item-'+this.color;
            },
            floatPositionMethod(){
                return 'float-'+this.position;
            }
        },
        mounted() {
            console.log('Component mounted.');

        }
    }
</script>
