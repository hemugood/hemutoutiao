<template>
  <div class="cover-image">
    <div @click="openDialog(index)" v-for="(item,index) in list" :key="index" class="cover-item">
      <img :src="item ? item:defaultImg" alt="" />
    </div>
    <el-dialog :visible="dialogVisible" @close="closeDialog">
      <select-image @selectOneImg="receiveImg"></select-image>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['list'],
  data () {
    return {
      dialogVisible: false,
      defaultImg: require('../../assets/img/pic_bg.png'),
      selectIndex: -1
    }
  },
  methods: {
    receiveImg (img) {
      this.$emit('clickOneImg', img, this.selectIndex)
      this.closeDialog()
    },
    openDialog (index) {
      this.selectIndex = index
      this.dialogVisible = true
    },
    closeDialog () {
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="less" scped>
.cover-image {
  display: flex;
  margin: 20px 0;
  margin-left: 100px;
  .cover-item {
    border: 1px solid #ccc;
    width: 250px;
    height: 250px;
    padding: 10px;
    img{
        width: 100%;
        height: 100%;
    }
  }
}
</style>
