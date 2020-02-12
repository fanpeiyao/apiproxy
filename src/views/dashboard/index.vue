<template>
  <div class="dashboard-container">
      <h1>Apiproxy</h1>
      <p><code>apiproxy</code> 包含api接口调试、透传、重定向、编码及一些配置等功能，主要是方便开发人员及企业对接接口。</p>




      <section class="markdown">
            <h2><span>✨ 菜单</span></h2>
            <ul>
              <li><p>🌈 工银聚API接口</p></li>
              <li><p>📦 请求转发</p></li>
              <li><p>⚙️ 功能配置</p></li>
              <li><p>🍀<!-- 🎨 --> 辅助功能</p></li>
            </ul>
            <h2><span>工银聚API接口</span></h2>
            <ul>
                <li><p>可进行通知接口、页面跳转接口、查询接口的功能调试</p></li>
            </ul>
            <h2><span>请求转发</span></h2>
            <ul>
                <li><p>可选择请求地址重定向和请求透传</p></li>
            </ul>
            <h2><span>功能配置</span></h2>
            <ul>
                <li><p>包含接口管理（通知、查询、跳转）、接口附加参数管理、重定向地址配置、透传配置、项目管理菜单</p></li>
                <li><p>接口管理可根据需要选择通知、查询或跳转，在其页面可实现对接口的查询、新增、修改及删除</p></li>
                <li><p>接口附加参数管理通过表格展示接口附加参数信息，可新增、修改、删除</p></li>
            </ul>
            <h2><span>辅助功能</span></h2>
            <ul>
                <li><p>可进行公私钥生成、RSA编码/解码、Base64编码/解码等功能</p></li>
            </ul>
            <h2><span>支持环境</span></h2>
            <ul>
                <li><p>现代浏览器</p></li>
            </ul>

      </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style scoped>
.dashboard-container {
    margin: 30px;
}
code {
    margin: 0 1px;
    padding: 0.2em 0.4em;
    font-size: 0.9em;
    background: #f2f4f5;
    border: 1px solid #eee;
    border-radius: 3px;
    font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
}
.dashboard-container p{
    color: #314659;
    font-size: 14px;
}
.markdown ul > li {
    margin-left: 20px;
    padding-left: 4px;
    list-style-type: circle;
}
.markdown >h2{
    margin-top: 40px;
}
.mt-10{
    margin-top: 10px;
}
.mt-20{
    margin-top: 20px;
}
.mt-40{
    margin-top: 40px;
}
</style>
