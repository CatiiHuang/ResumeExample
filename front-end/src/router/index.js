import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            name: "detail",
            component: resolve => require(['../components/page/resumeEdit.vue'], resolve),
        }
    ]
})
