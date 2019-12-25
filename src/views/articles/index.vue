<template>
  <el-card class="articles">
    <bread-crumb slot="header">
      <template slot="title">文章列表</template>
    </bread-crumb>
    <el-row class="searchTool">
      <el-col :span="2">
        <span>文章状态</span>
      </el-col>
      <el-col :span="18">
        <el-radio-group @change="changeCondition" v-model="formData.status">
          <el-radio :label="5">全部</el-radio>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">待审核</el-radio>
          <el-radio :label="2">审核通过</el-radio>
          <el-radio :label="3">审核失败</el-radio>
        </el-radio-group>
      </el-col>
    </el-row>
    <el-row class="searchTool">
      <el-col :span="2">
        <span>频道列表</span>
      </el-col>
      <el-col :span="18">
        <el-select @change="changeCondition" v-model="formData.channel_id">
          <el-option v-for="item in channels" :key="item.data" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row class="searchTool">
      <el-col :span="2">
        <span>时间选择</span>
      </el-col>
      <el-col :span="18">
        <el-date-picker
          @change="changeCondition"
          value-format="yyyy-MM-dd"
          v-model="formData.dataRange"
          type="daterange"
          range-separator="-"
          start-placeholde="开始日期"
          end-placeholde="结束日期"
        ></el-date-picker>
      </el-col>
    </el-row>
    <el-row class="total">
      <span>共找到{{page.total}}条符合条件的数据</span>
    </el-row>
    <el-row
      v-for="item in list"
      :key="item.id.toString()"
      class="article-item"
      type="flex"
      justify="space-between"
    >
      <el-col :span="14">
        <el-row type="flex">
          <img :src="item.cover.images.length ? item.cover.images[0]:defaultImg" alt />
          <div class="info">
            <span>{{item.title}}</span>
            <el-tag :type="item.status | filterType" class="tag">{{item.status | filterStatus}}</el-tag>
            <span class="data">{{item.pubdate}}</span>
          </div>
        </el-row>
      </el-col>
      <el-col :span="6">
        <el-row class="right" type="flex" justify="end">
          <span>
            <i class="el-icon-edit"></i>修改
          </span>
          <span>
            <i class="el-icon-delete">删除</i>
          </span>
        </el-row>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center" align="middle" style="height:60px">
      <el-pagination background layout="prev, pager, next"
      :total="page.total"
      :current-page="page.currentPage"
      :page-size="page.pageSize"
      @current-change="changePage"
      ></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        status: 5,
        channel_id: null,
        dataRange: []
      },
      channels: [],
      list: [],
      defaultImg: require('../../assets/img/collect.png'),
      page: {

        currentPage: 1,
        pageSize: 10,
        total: 0
      }
    }
  },
  filters: {
    filterStatus (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'
        default:
          break
      }
    },
    filterType (value) {
      switch (value) {
        case 0:
          return 'warning'
        case 1:
          return 'info'
        case 2:
          return '已发表'
        case 3:
          return 'danger'
        default:
          break
      }
    }
  },
  methods: {
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getConditionArticle()
    },
    changeCondition () {
      this.page.currentPage = 1
      this.getConditionArticle()
    },
    getConditionArticle () {
      let params = {
        page: this.page.currentPage,
        per_page: this.page.pageSize,
        status: this.formData.status === 5 ? null : this.formData.status,
        channel_id: this.formData.channel_id,
        bgein_pubdate: this.formData.dataRange.length
          ? this.formData.dataRange[0]
          : null,
        end_pubdate:
          this.formData.dataRange.length > 1 ? this.formData.dataRange[1] : null
      }
      this.getArticles(params)
    },
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels
      })
    },
    getArticles (params) {
      this.$axios({
        url: '/articles',
        params
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count
      })
    }
  },
  created () {
    this.getChannels()
    this.getArticles({ page: 1, per_page: 10 })
  }
}
</script>

<style lang="less" scoped>
.articles {
  .searchTool {
    height: 60px;
    padding-left: 50px;
  }
  .total {
    height: 30px;
    margin: 60px 0;
    border-bottom: 1px dashed #ccc;
  }
  .article-item {
    margin: 20px 0;
    padding: 10px 0;
    border-bottom: 1px solid #f2f3f5;
    img {
      width: 180px;
      height: 100px;
      margin-right: 10px;
      border-radius: 4px;
    }
    .info {
      height: 100px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .tag {
        width: 60 px;
      }
      .data {
        color: #999;
        font-size: 12px;
      }
    }
    .right {
      span {
        margin-left: 8px;
        font-size: 14px;
        cursor: pointer;
      }
    }
  }
}
</style>
