<template>
  <el-card v-loading="loading">
    <bread-crumb slot="header">
      <template slot="title">评论列表</template>
    </bread-crumb>
    <el-table :data="list">
      <el-table-column prop="title" label="标题" width="600"></el-table-column>
      <el-table-column :formatter="formatterBool" prop="comment_status" label="评论状态"></el-table-column>
      <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
      <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="obj">
          <!-- {{obj.row.comment_status}} -->
          <el-button type="text" size="small">修改</el-button>
          <el-button type="text" size="small" @click="openOrClose(obj.row)">{{obj.row.comment_status?'关闭评论':'打开平论'}}</el-button>
        </template>
      </el-table-column>
    </el-table>
   <el-row type='flex' justify="center" align="middle" style="height:80px">
      <el-pagination background layout="prev,pager,next"
      :current-page="page.currentPage"
      :page-size="page.pageSize"
      :total='page.total'
      @current-change="changePage"
      >
      </el-pagination>
   </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      list: [],
      page: {
        total: 0,
        pageSize: 10,
        currentPage: 1
      }
    }
  },
  methods: {
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getComment()
    },
    getComment () {
      this.loading = true
      this.$axios({
        url: '/articles',
        params: { response_type: 'comment', page: this.page.currentPage, per_page: this.page.pageSize }
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count
        // setTimeout(() => { this.loading = false }, 1000)
        this.loading = false
      })
    },
    formatterBool (row, column, cellValue, index) {
      return cellValue ? '正常' : '关闭'
    },
    openOrClose (row) {
      let mess = row.comment_status ? '关闭' : '打开'
      this.$confirm(`你是否确定要${mess}评论吗`).then(() => {
        this.$axios({
          method: 'put',
          url: '/comments/status',
          params: {
            article_id: row.id.toString()
          },
          data: {
            allow_comment: !row.comment_status
          }
        }).then(result => {
          this.$message({
            type: 'success',
            message: '操作成功'
          })
          this.getComment()
        })
      })
    }
  },
  created () {
    this.getComment()
  }
}
</script>

<style>
</style>
