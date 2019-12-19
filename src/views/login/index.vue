<template>
 <div class="login">
   <el-card class="login-card">
     <div class="title">
       <img src="../../assets/img/logo_index.png" alt="">
     </div>
     <el-form ref="myForm" style="margin-top:30px" :model="loginForm" :rules="loginRules">
       <el-form-item prop="mobile">
         <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
       </el-form-item>
       <el-form-item prop="code">
         <el-input style="width:65%" v-model="loginForm.code" placeholder="请输入验证码"></el-input>
         <el-button style="float:right" plain>发送验证码</el-button>
       </el-form-item>
       <el-form-item prop="check">
         <el-checkbox v-model="loginForm.check">我已阅读并同意用户协议和隐私条款</el-checkbox>
       </el-form-item>
       <el-form-item>
         <el-button @click="submitLogin" type="primary" style="width:100%">登录</el-button>
       </el-form-item>
     </el-form>
   </el-card>
 </div>
</template>

<script>
// import { log } from 'util'
export default {
  data () {
    return {
      loginForm: {
        mobile: '',
        code: '',
        check: false
      },
      loginRules: {
        mobile: [{ required: true, message: '请输入您的手机号' }, {
          pattern: /^1[3456789]\d{9}$/, message: '请输入正确格式的手机号'
        }],
        code: [{ required: true, message: '请输入你的验证码' }, {
          pattern: /^\d{6}$/, message: '请输入正确的验证码'
        }],
        check: [{ validator: function (rule, value, callback) {
          if (value) {
            callback()
          } else {
            callback(new Error('无条件被我们坑'))
          }
        } }]
      }
    }
  },
  methods: {
    submitLogin () {
      this.$refs.myForm.validate(function (isOk) {
        if (isOk) {
          console.log('前端校验成功，发送用户和密码到后台')
        }
      })
    }
  }

}
</script>

<style lang="less" scoped>
.login{
  background-image: url('../../assets/img/login_bg.jpg');
  // background-size: cover;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-card{
    height:350px;
    width:440px;
    .title{
      text-align: center;
      img{
        height: 44px;
      }
    }
  }
}
</style>
