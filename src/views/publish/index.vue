<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">发布文章</template>
    </bread-crumb>
    <el-form ref="publishForm" :model="formData" :rules="publishRules" style="margin-left:50px" label-width="100px">
      <el-form-item prop="title" label="标题">
          <el-input v-model="formData.title" style="width:60%"></el-input>
      </el-form-item>
      <el-form-item prop="content" label="内容">
          <quill-editor style="height:400px" v-model="formData.content" type="textarea" :rows="4"></quill-editor >
      </el-form-item>
      <el-form-item prop="type" label="封面" style="margin-top:100px">
          <el-radio-group v-model="formData.cover.type">
              <el-radio :label="1">单图</el-radio>
              <el-radio :label="3">三图</el-radio>
              <el-radio :label="0">无图</el-radio>
              <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
      </el-form-item>
      <cover-image :list="formData.cover.images"></cover-image>
      <el-form-item prop="channel_id" label="频道">
          <el-select v-model="formData.channel_id">
              <el-option v-for="item in channels" :key="item.id" :value="item.id" :label="item.name"></el-option>
          </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="publishArticle()" type='primary'>发布</el-button>
        <el-button @click="publishArticle(true)">存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      channels: [],
      formData: {
        title: '',
        content: '',
        cover: {
          type: 0,
          images: []
        },
        channel_id: null
      },
      publishRules: {
        title: [{ required: true, message: '标题内容不能为空' }, {
          min: 5, max: 30, message: '标题长度需要在5到30字符之间'
        }],
        content: [{ required: true, message: '文章内容不能为空' }],
        channel_id: [{ required: true, message: '频道分类不能为空' }]
      }
    }
  },
  watch: {
    $router: function (to, from) {
      if (Object.keys(to.params).length) {
        this.getArticleById(to.params.articleId)
      } else {
        this.formData = {
          title: '',
          content: '',
          cover: {
            type: 0,
            images: []
          }
        }
      }
    },
    'formData.cover.type': function () {
      if (this.formData.cover.type === 0 || this.formData.cover.type === -1) {
        this.formData.cover.images = []
      } else if (this.formData.cover.type === 1) {
        this.formData.cover.images = ['']
      } else if (this.formData.cover.type === 3) {
        this.formData.cover.images = ['', '', '']
      }
    }
  },
  methods: {
    // changeType () {
    //   alert(this.formData.cover.type)
    // },
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels
      })
    },
    publishArticle (draft) {
      this.$refs.publishForm.validate((isOk) => {
        if (isOk) {
          let{ articleId } = this.$route.params
          this.$axios({
            method: articleId ? 'put' : 'post',
            url: articleId ? `/articles/${articleId}` : `/articles`,
            params: { draft },
            data: this.formData
          }).then(resule => {
            this.$router.push('/home/articles')
          })
          // if (articleId) {
          //   this.$axios({
          //     method: 'put',
          //     url: `/articles/${articleId}`,
          //     params: { draft },
          //     data: this.formData
          //   }).then(() => {
          //     this.$router.push('/home/articles')
          //   })
          // } else {
          //   this.$axios({
          //     url: '/articles',
          //     method: 'post',
          //     params: { draft },
          //     data: this.formData
          //   }).then(() => {
          //     this.$router.push('/home/articles')
          //   })
          // }
        }
      })
    },
    getArticleById (articleId) {
      this.$axios({
        url: `/articles/${articleId}`
      }).then(result => {
        this.formData = result.data
      })
    }

  },
  created () {
    this.getChannels()
    let{ articleId } = this.$route.params
    articleId && this.getArticleById(articleId)
  }
}
</script>

<style>
</style>
