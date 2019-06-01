<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-calendar"></i> 表单
        </el-breadcrumb-item>
        <el-breadcrumb-item>编辑器</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="quill-wrap">
        <quill-editor v-model="content" ref="myQuillEditor" :options="editorOption"></quill-editor>
      </div>
      <el-button class="editor-btn" type="primary" @click="submit">提交</el-button>
    </div>
  </div>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor, Quill } from "vue-quill-editor";
import { container, ImageExtend, QuillWatch } from "quill-image-extend-module";
Quill.register("modules/ImageExtend", ImageExtend);
export default {
  name: "VueEditor",
  data: function() {
    return {
      content: "",
      // 富文本框参数设置
      editorOption: {
        modules: {
          ImageExtend: {
            loading: true,
            name: "img",
            action: "api/common/img/upload/99",
            headers: xhr => {
              xhr.setRequestHeader("application", "manager");
            }, // 可选参数 设置请求头部
            response: res => {
              return res.Data.ImgUrl;
            }
          },
          toolbar: {
            container: container,
            handlers: {
              image: function() {
                QuillWatch.emit(this.quill.id);
              }
            }
          }
        }
      }
    };
  },
  components: {
    quillEditor
  },
  methods: {
    onEditorChange({ editor, html, text }) {
      this.content = html;
    },
    submit() {
      console.log(this.content);
      // this.$message.success('提交成功！');
    }
  }
};
</script>
<style scoped>
.editor-btn {
  margin-top: 20px;
}
</style>