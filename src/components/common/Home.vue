<template>
    <div class="page">
        <v-head></v-head>
        <v-sidebar></v-sidebar>
        <div class="content-box" :class="{'content-collapse':collapse}">
            <v-tags></v-tags>
            <div class="content">
                <transition name="move" mode="out-in">
                    <keep-alive :include="tagsList">
                        <router-view></router-view>
                    </keep-alive>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
    import vHead from './Header.vue';
    import vSidebar from './Sidebar.vue';
    import vTags from './Tags.vue';
    import bus from './bus';
    export default {
        data(){
            return {
                tagsList: [],
                collapse: false
            }
        },
        components:{
            vHead, vSidebar, vTags
        },
        created(){
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })

            // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
            bus.$on('tags', msg => {
                localStorage.setItem("tagsList",JSON.stringify(msg));
                let arr = [];
                for(let i = 0, len = msg.length; i < len; i ++){
                    arr.push(msg[i].name);
                }
                this.tagsList = arr;
            })
        }
    }
</script>
<style scoped>
    .page{
        width: 100%;
        height: 100%;

    }
    .page-container{
        background-color: #e7e8ec;
        margin-top:60px;
        margin-bottom: 110px;
    }
</style>

