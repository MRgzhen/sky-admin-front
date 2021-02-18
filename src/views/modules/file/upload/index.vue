<template>
  <div>
    <el-upload
      action=""
      :http-request="uploadFile"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-progress="handleProgress"
      :on-change="handleChange"
      :on-error="handleError"
      :on-success="handleSuccess"
      :before-remove="beforeRemove"
      :before-upload="beforeUpload"
      multiple
      :limit="3"
      :on-exceed="handleExceed"
      :file-list="fileList"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
    <el-progress :percentage="percentage" :width="700" />
  </div>
</template>

<script>
export default {
    data() {
        return {
            percentage: 0,
            fileList: []
        }
    },
    methods: {
        handleRemove(file, fileList) {
            console.log('handleRemove')
            console.log(file, fileList)
        },
        handlePreview(file) {
            console.log('handlePreview')
            console.log(file)
        },
        handleExceed(files, fileList) {
            console.log('handleExceed')
            this.$message({ type: 'warning',
                message: `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件` })
        },
        handleProgress(event, file, fileList) {
            console.log('handleProgress')
        },
        handleChange(file, fileList) {
            console.log('handleChange')
        },
        handleError(response, file, fileList) {
            console.log('handleError')
        },
        handleSuccess(err, file, fileList) {
            console.log('handleSuccess')
        },
        beforeRemove(file, fileList) {
            console.log('beforeRemove')
            return this.$confirm(`确定移除 ${file.name}？`)
        },
        beforeUpload(file) {
            console.log('beforeUpload')
        },
        uploadFile(params) {
            console.log('uploadFile')
            const formData = new FormData()
            formData.append('file', params.file)
            this.$ajax.upload(this.$api.file.upload, formData, false, (progressEvent) => {
                this.percentage = Number((progressEvent.loaded / progressEvent.total * 100).toFixed(2))
            }).then(result => {
            })
        }
    }
}
</script>
