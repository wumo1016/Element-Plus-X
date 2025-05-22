<!-- home 首页-使用 Bubble 组件 -->
<script setup lang="ts">
import type { FilesCardProps, FilesType } from 'vue-element-plus-x/types/FilesCard'
// import Attachments from 'vue-element-plus-x/src/components/Attachments/index.vue'
import { colorMap1 } from '../assets/mock.ts'

type SelfFilesCardProps = FilesCardProps & {
  id?: number
}
const files = ref<SelfFilesCardProps[]>([])

const typeList = Object.keys(colorMap1)

onMounted(() => {
  for (let index = 0; index < 30; index++) {
    files.value.push({
      id: index,
      uid: index,
      name: `文件${index}`,
      fileSize: 1024 * 2,
      fileType: typeList[Math.floor(Math.random() * typeList.length)] as FilesType,
      // description: `描述 ${index}`,
      url: 'https://www.baidu.com',
      thumbUrl: 'https://www.baidu.com',
      imgFile: new File([], 'test.txt'),
      showDelIcon: true,
    })
  }
})

function handleBeforUpload(file: any) {
  if (file.size > 1024 * 1024 * 2) {
    ElMessage.error('文件大小不能超过 2MB!')
    return false
  }
}

async function handleUploadDrop(files: any, props: any) {
  console.log('drop', files, props)

  if (files && files.length > 0) {
    if (files[0].type === '') {
      ElMessage.error('禁止上传文件夹！')
      return false
    }

    for (let index = 0; index < files.length; index++) {
      const file = files[index]
      await handleHttpRequest({ file })
    }
  }
}

async function handleHttpRequest(options: any) {
  const formData = new FormData()
  formData.append('file', options.file) // 字段名必须与 multer 配置的 `upload.single('file')` 一致
  // const res = await fetch('http://localhost:8330/api/upload', {
  //   method: 'POST',
  //   body: formData,
  // }).then(res => res.json()).then((res) => {
  //   return res
  // })
  ElMessage.info('上传中...')

  setTimeout(() => {
    const res = {
      message: '文件上传成功',
      fileName: options.file.name,
      uid: options.file.uid,
      fileSize: options.file.size,
      imgFile: options.file,
    }
    files.value.push({
      id: files.value.length,
      uid: res.uid,
      name: res.fileName,
      fileSize: res.fileSize,
      imgFile: res.imgFile,
      showDelIcon: true,
      imgVariant: 'square',
    })
    ElMessage.success('上传成功')
  }, 1000)
}

function handleDeleteCard(item: SelfFilesCardProps) {
  files.value = files.value.filter((items: any) => items.id !== item.id)
  console.log('delete', item)
  ElMessage.success('删除成功')
}
</script>

<template>
  <div id="attachmentsDemo" class="component-container">
    <div class="component-title">
      附件上传组件-自定义 列表内容
    </div>
    <Attachments
      :items="files"
      overflow="scrollX"
      :list-style="{
        padding: '0 12px',
      }"
      :before-upload="handleBeforUpload"
      :hide-upload="false"
      :http-request="handleHttpRequest"
      @upload-drop="handleUploadDrop"
    >
      <!-- 自定义列表内容 -->
      <template #file-list="{ items }">
        <div class="custom-list">
          <div
            v-for="(item, index) in items"
            :key="index"
            class="custom-item"
          >
            <div class="custom-item-name">
              {{ item.name }}
            </div>
          </div>
        </div>
      </template>
    </Attachments>

    <div class="component-title">
      附件上传组件-自定义左右按钮
    </div>
    <Attachments
      :items="files"
      overflow="scrollX"
      :list-style="{
        padding: '0 12px',
      }"
      :http-request="handleHttpRequest"
      :before-upload="handleBeforUpload"
      :hide-upload="false"
      @upload-drop="handleUploadDrop"
      @delete-card="handleDeleteCard"
    >
      <!-- 自定义左侧按钮（覆盖默认插槽） -->
      <template #prev-button="{ show, onScrollLeft }">
        <button
          v-if="show"
          class="custom-prev"
          @click="onScrollLeft"
        >
          👈
        </button>
      </template>

      <!-- 自定义右侧按钮（覆盖默认插槽） -->
      <template #next-button="{ show, onScrollRight }">
        <button
          v-if="show"
          class="custom-next"
          @click="onScrollRight"
        >
          👉
        </button>
      </template>
    </Attachments>

    <div class="component-title">
      附件上传组件-默认: scrollX
    </div>
    <Attachments
      :file-list="files"
      :http-request="handleHttpRequest"
      :items="files"
      drag
      overflow="scrollX"
      :list-style="{
        padding: '0 12px',
      }"
      :before-upload="handleBeforUpload"
      :hide-upload="false"
      @upload-drop="handleUploadDrop"
      @delete-card="handleDeleteCard"
    />
    <div class="component-title">
      附件上传组件- scrollY
    </div>
    <Attachments
      :file-list="files"
      :http-request="handleHttpRequest"
      :items="files"
      drag
      overflow="scrollY"
      :list-style="{
        padding: '0 12px',
        height: '200px',
      }"
      :before-upload="handleBeforUpload"
      drag-target="attachmentsDemo"
      :hide-upload="false"
      @upload-drop="handleUploadDrop"
      @delete-card="handleDeleteCard"
    />

    <div class="component-title">
      附件上传组件- wrap
    </div>
    <Attachments
      :file-list="files"
      :http-request="handleHttpRequest"
      :items="files"
      drag
      overflow="wrap"
      :before-upload="handleBeforUpload"
      :hide-upload="false"
      @upload-drop="handleUploadDrop"
      @delete-card="handleDeleteCard"
    />
  </div>
</template>

<style scoped lang="scss">
.component-container {
  background-color: white;
  padding: 12px;
  border-radius: 15px;
  height: calc(100vh - 220px);
  overflow-y: auto;

  .component-title {
    display: flex;
    align-items: center;
    position: relative;
    padding-left: 12px;
    font-weight: 700;
    line-height: 1.5;
    margin-bottom: 12px;
    margin-top: 24px;

    &::after {
      position: absolute;
      content: '';
      display: block;
      width: 5px;
      height: 75%;
      border-radius: 15px;
      left: 0;
      background-color: #409EFF;
    }
  }
}

/* 用户自定义样式（覆盖默认外观） */
.custom-prev,
.custom-next {
  position: absolute;  /* 必须保留定位样式 */
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;

  /* 自定义外观 */
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: 2px solid  rgba(255, 255, 255, 0.5);
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  transition: all 0.3s ease;
}

.custom-prev { left: 8px; }
.custom-next { right: 8px; }

.custom-prev:hover,
.custom-next:hover {
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  border-color: rgba(255, 255, 255, 0.8);
}

.custom-list {
  display: flex;
  .custom-item {
    margin: 8px;
    width: 200px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    background-color: antiquewhite;
  }
}
</style>
