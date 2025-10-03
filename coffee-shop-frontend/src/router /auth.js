export const authRouter = [
    { path: '/register', name: 'Register', component: () => import('@/views/Register.vue') },
    { path: '/reset-password', name: 'ResetPassword', component: () => import('@/views/ResetPassword.vue'), props: (route) => ({ token: route.query.token }) },
    { path: '/login', name: 'Login', component: () => import('@/views/Login.vue') },
    { path: '/forgot-password', name: 'ForgotPassword', component: () => import('@/views/FogotPassword.vue') }
]