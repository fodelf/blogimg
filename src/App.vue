<template>
  <div id='app'>
    <el-container>
      <el-header>博客大图与签名生成器</el-header>
      <el-container>
        <el-aside width='400px'>
          <div id='banner'
               v-show="activeName=='banner'">
            <el-row>
              <label>背景:</label>
              <input type='file'
                     @change="changeImg('bannerFile')"
                     ref='bannerFile' />
            </el-row>
            <el-row>
              <label>标题:</label>
              <el-input v-model="bannerWord"
                        placeholder="请输入标题"></el-input>
            </el-row>
          </div>

          <div id='headerfileContent'
               v-show="activeName=='header'">
            <el-row>
              <label>头像:</label>
              <input type='file'
                     @change="changeImg('headerFile')"
                     ref='headerFile' />
            </el-row>
            <el-row>
              <label>名字:</label>
              <el-input v-model="headerImgName"
                        placeholder="请输入名字"></el-input>
            </el-row>
            <el-row>
              <label>岗位:</label>
              <el-input v-model="headerImgJob"
                        placeholder="请输入岗位"></el-input>
            </el-row>
            <el-row>
              <label>个性签名:</label>
              <el-input type="textarea"
                        v-model="headerImgDes"
                        placeholder="请输入个性签名"></el-input>
            </el-row>
          </div>
        </el-aside>
        <el-container>
          <el-main>
            <el-tabs v-model="activeName"
                     @tab-click="handleClick">
              <el-tab-pane label="标题大图"
                           name="banner">
                <el-card>
                  <div ref='banner'
                       class='banner'>
                    <div :style="{backgroundImage: 'url('+ src +')'}"
                         class='bannerWord'>
                      {{bannerWord}}
                    </div>
                  </div>
                  <el-button type='primary'
                             @click="toImage('banner')">下载Banner</el-button>
                </el-card>
              </el-tab-pane>
              <el-tab-pane label="个性签名"
                           name="header">
                <el-card>
                  <div ref='headerImg'
                       class='headerImg'>
                    <div class="contentDiv">
                      <img :src='headerImgUrl' />
                    </div>
                    <div class="contentDec">
                      <div class='name'>{{headerImgName}}</div>
                      <div><span>{{headerImgJob}}</span><span> / </span><span>{{headerImgDes}}</span></div>
                    </div>
                    <img src="./assets/ylogo.png"
                         class='logo' />
                  </div>
                  <el-button type='primary'
                             @click="toImage('headerImg')">下载签名</el-button>
                </el-card>
              </el-tab-pane>
            </el-tabs>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import html2canvas from 'html2canvas'
export default {
  name: 'App',
  data () {
    return {
      activeName: 'banner',
      isHeader: false,
      fileList: [],
      src: require('./assets/bg.jpg'),
      headerImgUrl: require('./assets/header.jpg'),
      headerImgName: '吴文周',
      headerImgJob: '前端工程师',
      headerImgDes: '做对的事永远不会迟',
      bannerWord: 'ES6入门'
    }
  },
  watch: {
    fileList () {
      // console.log(this.fileList)
    }
  },
  methods: {
    handleClick (tab, event) {
    },
    changeImg (type) {
      var file = this.$refs[type].files[0]
      if (type === 'headerFile') {
        this.headerImgUrl = URL.createObjectURL(file)
      } else {
        this.src = URL.createObjectURL(file)
      }
    },
    // 页面元素转图片
    toImage (img) {
      // 第一个参数是需要生成截图的元素,第二个是自己需要配置的参数,宽高等
      html2canvas(this.$refs[img], {
        useCORS: true,
        backgroundColor: 'white'
      }).then((canvas) => {
        const url = canvas.toDataURL('image/png')
        this.htmlUrl = url
        // 把生成的base64位图片上传到服务器,生成在线图片地址
        // this.sendUrl()
        const link = document.createElement('a')
        link.href = canvas.toDataURL() // 下载链接
        link.setAttribute('download', img + '.png')
        link.style.display = 'none'// a标签隐藏
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      })
    }
  }
}
</script>

<style lang='less'>
@baseColor: #60c7d0;
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  .banner {
    height: 425px;
    width: 1000px;
    .bannerImg {
      display: inline-block;
      height: 100%;
      width: 100%;
    }
    .bannerWord {
      height: 100%;
      width: 100%;
      background-size: cover;
      color: white;
      font-size: 40px;
      font-weight: bold;
      line-height: 425px;
      letter-spacing: 2px;
      word-break: break-all;
    }
  }
  .headerImg {
    height: 200px;
    width: 1000px;
    border: 2px solid @baseColor;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    .contentDiv {
      display: inline-block;
      width: 100px;
      height: 100px;
      border-radius: 100px;
      -webkit-border-radius: 100px;
      -moz-border-radius: 100px;
      border: 2px solid #fff;
      box-shadow: 0 0 4px #ccc;
      overflow: hidden;
      margin-left: 20px;
      img {
        width: 100%;
        min-height: 100%;
      }
    }
    .contentDec {
      margin-left: 10px;
      text-align: left;
      color: #909090;
      .name {
        margin-bottom: 20px;
        font-size: 24px;
        letter-spacing: 5px;
        font-weight: bold;
        color: @baseColor;
      }
    }
    .logo {
      margin-left: auto;
      margin-right: 20px;
    }

    // border-top-colors:#f80 #2ed;
    // border-image: -webkit-linear-gradient(#f80, #2ed) 20 20;
    // border-image: -moz-linear-gradient(#f80, #2ed) 20 20;
    // border-image: -o-linear-gradient(#f80, #2ed) 20 20;
    // border-image: linear-gradient(#f80, #2ed) 20 20;
    // border-left: 2px solid  red;
    // border-top: 2px solid  red;
    // border-bottom: 2px solid  red;
    // border-image: linear-gradient(#ddd,red);
    // .headerImg1{
    //   border: 2px solid #60c7d0;
    //   border-image:linear-gradient(#f80, #2ed) 20 20;
    // }
  }
}
</style>
