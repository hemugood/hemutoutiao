<template>
  <el-row class="layout-header" type="flex" align="middle" justify="space-between">
      <el-col class="left" :span="6">
          <i @click="collaspseOrOpen" :class="{'el-icon-s-unfold':collaspse,'el-icon-s-fold':!collaspse}"></i>
          <span class="title">江苏传智播客教育科技股份有限公司</span>
      </el-col>
      <el-col class="right" :span="4">
          <el-row type="flex" justify="end" align="middle">
              <img :src="userInfor.photo ? userInfor.photo:defaultImg" alt="">
              <el-dropdown @command="handle">
                  <span>{{userInfor.name}}</span>
                  <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item command="info">个人信息</el-dropdown-item>
                      <el-dropdown-item command="git">GIT地址</el-dropdown-item>
                      <el-dropdown-item command="lgout">退出</el-dropdown-item>
                  </el-dropdown-menu>
              </el-dropdown>
          </el-row>
      </el-col>
  </el-row>
</template>

<script>
import eventBus from '../../utils/eventBus'
export default {
  data () {
    return {
      collaspse: false,
      userInfor: {},
      defaultImg: require('../../assets/img/jjy.jpg')
    }
  },
  created () {
    this.getUserInfo()
    // let token = window.localStorage.getItem('user-token')
    // this.$axios({
    //   url: '/user/profile'
    //   // headers: {
    //   //   Authorization: `Bearer ${token}`
    //   // }
    // }).then(result => {
    //   this.userInfor = result.data
    // })
    // eventBus.$emit('changeCollapse')
  },
  methods: {
    collaspseOrOpen () {
      this.collaspse = !this.collaspse
      eventBus.$emit('changeCollapse')
    },
    getUserInfo () {
      this.$axios({
        url: '/user/profile'
      }).then(result => {
        this.userInfor = result.data
      })
    },
    handle (commad) {
      if (commad === 'lgout') {
        window.localStorage.removeItem('user-token')
        this.$router.push('/login')
      } else if (commad === 'git') {
        window.location.href = 'https://github.com/shuiruohanyu/89heimatoutiao'
      }
    }
  }
}
</script>

<style lang="less" scoped>
    .layout-header{
        height: 60px;
        .left{
            font-size: 18px;
            .title{
                margin-left:4px;
                color: #2c3e50;
                font-size: 14px;
            }
            i{
              font-size: 22px
            }
        }
        .right{
            img {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                margin-right:5px
            }
        }
    }
</style>
