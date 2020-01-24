import Vue from 'vue'
import Router from 'vue-router'
import PostsLine from '@/components/PostsLine'
import NewDescription from '@/components/NewDescription'
import Sign from '@/components/Sign'
import Registration from '@/components/Registration'

Vue.use(Router)

export default new Router({
  routes: [    
    {
      path: '/',
      name: 'PostsLine',
      component: PostsLine
    },
    {
      path: '/newdescription',
      name: 'NewDescription',
      component: NewDescription
    },
    {
      path: '/signin',
      name: 'Sign',
      component: Sign
    },
    {
      path: '/Registration',
      name: 'Registration',
      component: Registration
    }
  ]
})
