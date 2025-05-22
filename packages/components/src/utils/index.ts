import type { FilesType } from '../components/FilesCard/types.d.ts'
import { prefix } from '../components/Typewriter/config/index.ts'

/* 公共 相关 开始 */
/* 公共 相关 结束 */

/* FileCard 组件相关 开始 */
// 更据文件后缀名获取文件类型
export function getFileType(fileExtension: string): { lowerCase: FilesType, upperCase: string } {
  // 去除后缀名开头的点，并转换为小写
  const cleanExtension = fileExtension.replace('.', '').toLowerCase()
  if (!cleanExtension) {
    return { lowerCase: 'unknown', upperCase: 'Unknown' }
  }
  const imageExtensions = ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'svg', 'webp']
  const wordExtensions = ['doc', 'docx']
  const excelExtensions = ['xls', 'xlsx']
  const pptExtensions = ['ppt', 'pptx']
  const audioExtensions = ['mp3', 'wav', 'ogg', 'flac']
  const videoExtensions = ['mp4', 'avi', 'mov', 'mkv']
  const codeExtensions = ['js', 'ts', 'html', 'css', 'py', 'java', 'c', 'cpp', 'json', 'php']
  const databaseExtensions = ['sql', 'db', 'sqlite']
  const zipExtensions = ['zip', 'rar', '7z']
  const markExtensions = ['md', 'mdx']

  if (imageExtensions.includes(cleanExtension)) {
    return { lowerCase: 'image', upperCase: 'Image' }
  }
  if (wordExtensions.includes(cleanExtension)) {
    return { lowerCase: 'word', upperCase: 'Word' }
  }
  if (excelExtensions.includes(cleanExtension)) {
    return { lowerCase: 'excel', upperCase: 'Excel' }
  }
  if (pptExtensions.includes(cleanExtension)) {
    return { lowerCase: 'ppt', upperCase: 'Ppt' }
  }
  if (cleanExtension === 'pdf') {
    return { lowerCase: 'pdf', upperCase: 'Pdf' }
  }
  if (cleanExtension === 'txt') {
    return { lowerCase: 'txt', upperCase: 'Txt' }
  }
  if (markExtensions.includes(cleanExtension)) {
    return { lowerCase: 'mark', upperCase: 'Markdown' }
  }
  if (audioExtensions.includes(cleanExtension)) {
    return { lowerCase: 'audio', upperCase: 'Audio' }
  }
  if (videoExtensions.includes(cleanExtension)) {
    return { lowerCase: 'video', upperCase: 'Video' }
  }
  if (codeExtensions.includes(cleanExtension)) {
    return { lowerCase: 'code', upperCase: 'Code' }
  }
  if (databaseExtensions.includes(cleanExtension)) {
    return { lowerCase: 'database', upperCase: 'Database' }
  }
  if (cleanExtension === 'lnk') {
    return { lowerCase: 'link', upperCase: 'Link' }
  }
  if (zipExtensions.includes(cleanExtension)) {
    return { lowerCase: 'zip', upperCase: 'Zip' }
  }
  if (cleanExtension === 'obj' || cleanExtension === 'fbx' || cleanExtension === 'glb') {
    return { lowerCase: 'three', upperCase: '3D' }
  }
  return { lowerCase: 'file', upperCase: 'File' }
}

// 获取文件大小
export function getSize(size: number) {
  let retSize = size
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB']
  let unitIndex = 0

  while (retSize >= 1024 && unitIndex < units.length - 1) {
    retSize /= 1024
    unitIndex++
  }

  return `${retSize.toFixed(0)} ${units[unitIndex]}`
}

// 通过文件流，生成图片预览
// Follow code is copy from `antd/components/upload/utils.ts`:
export const isImageFileType = (type: string): boolean => type.indexOf('image/') === 0
const MEASURE_SIZE = 200
export function previewImage(file: File | Blob): Promise<string> {
  return new Promise<string>((resolve) => {
    if (!file || !file.type || !isImageFileType(file.type)) {
      resolve('')
      return
    }

    const img = new Image()
    img.onload = () => {
      const { width, height } = img

      const ratio = width / height
      const MEASURE_SIZE_WIDTH = ratio > 1 ? MEASURE_SIZE : MEASURE_SIZE * ratio
      const MEASURE_SIZE_HEIGHT = ratio > 1 ? MEASURE_SIZE / ratio : MEASURE_SIZE

      const canvas = document.createElement('canvas')
      canvas.width = MEASURE_SIZE_WIDTH
      canvas.height = MEASURE_SIZE_HEIGHT
      canvas.style.cssText = `position: fixed; left: 0; top: 0; width: ${MEASURE_SIZE_WIDTH}px; height: ${MEASURE_SIZE_HEIGHT}px; z-index: 9999; display: none;`
      document.body.appendChild<HTMLCanvasElement>(canvas)
      const ctx = canvas.getContext('2d')

      ctx!.drawImage(img, 0, 0, MEASURE_SIZE_WIDTH, MEASURE_SIZE_HEIGHT)
      const dataURL = canvas.toDataURL()
      document.body.removeChild(canvas)
      window.URL.revokeObjectURL(img.src)
      resolve(dataURL)
    }
    img.crossOrigin = 'anonymous'
    if (file.type.startsWith('image/svg+xml')) {
      const reader = new FileReader()
      reader.onload = () => {
        if (reader.result && typeof reader.result === 'string') {
          img.src = reader.result
        }
      }
      reader.readAsDataURL(file)
    }
    else if (file.type.startsWith('image/gif')) {
      const reader = new FileReader()
      reader.onload = () => {
        if (reader.result) {
          resolve(reader.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
    else {
      img.src = window.URL.createObjectURL(file)
    }
  })
}

/* FileCard 组件相关 结束 */

/* Typewrite 组件相关 开始 */
/**
 * 对代码块添加行号
 *
 * @param code 代码html内容
 * @returns string
 */
export function generateCodeRowNumber(code: string, source: string) {
  if (!code) {
    return code
  }

  const list = source.split('\n')
  // 行号html代码拼接列表
  const rowNumberList = ['<span rn-wrapper aria-hidden="true">']
  list.forEach(() => {
    rowNumberList.push('<span></span>')
  })
  rowNumberList.push('</span>')
  return `<span class="${prefix}-code-block">${code}</span>${rowNumberList.join('')}`
}

/**
 * 缩放、拖拽mermaid模块
 */
export const zoomMermaid = (() => {
  const addEvent = (container: HTMLElement | null) => {
    if (!container) {
      return () => {}
    }
    const content = container.firstChild as HTMLElement

    let scale = 1
    let posX = 0
    let posY = 0
    let isDragging = false
    let startX: number, startY: number
    let initialDistance: number
    let initialScale = 1

    const updateTransform = () => {
      content.style.transform = `translate(${posX}px, ${posY}px) scale(${scale})`
    }

    // 处理拖拽和单指移动
    const onTouchStart = (event: TouchEvent) => {
      if (event.touches.length === 1) {
        isDragging = true
        startX = event.touches[0].clientX - posX
        startY = event.touches[0].clientY - posY
      }
      else if (event.touches.length === 2) {
        initialDistance = Math.hypot(
          event.touches[0].clientX - event.touches[1].clientX,
          event.touches[0].clientY - event.touches[1].clientY,
        )
        initialScale = scale
      }
    }

    const onTouchMove = (event: TouchEvent) => {
      event.preventDefault()

      if (isDragging && event.touches.length === 1) {
        posX = event.touches[0].clientX - startX
        posY = event.touches[0].clientY - startY
        updateTransform()
      }
      else if (event.touches.length === 2) {
        const newDistance = Math.hypot(
          event.touches[0].clientX - event.touches[1].clientX,
          event.touches[0].clientY - event.touches[1].clientY,
        )
        const scaleChange = newDistance / initialDistance
        const previousScale = scale
        scale = initialScale * (1 + (scaleChange - 1)) // 调整缩放速度

        // 计算双指中心点
        const centerX = (event.touches[0].clientX + event.touches[1].clientX) / 2
        const centerY = (event.touches[0].clientY + event.touches[1].clientY) / 2

        // 获取内容区域的边界
        const rect = content.getBoundingClientRect()
        // 计算相对位置
        const relativeX = (centerX - rect.left) / previousScale
        const relativeY = (centerY - rect.top) / previousScale

        // 调整 posX 和 posY 使得缩放发生在双指中心
        posX -= relativeX * (scale - previousScale)
        posY -= relativeY * (scale - previousScale)

        updateTransform()
      }
    }

    const onTouchEnd = () => {
      isDragging = false
    }

    // PC 端缩放功能
    const onWheel = (event: WheelEvent) => {
      event.preventDefault()
      const scaleAmount = 0.02 // 缩放速度
      const previousScale = scale

      if (event.deltaY < 0) {
        scale += scaleAmount
      }
      else {
        scale = Math.max(0.1, scale - scaleAmount)
      }

      // 计算鼠标相对于内容的位置
      const rect = content.getBoundingClientRect()
      const mouseX = event.clientX - rect.left
      const mouseY = event.clientY - rect.top

      // 调整 posX 和 posY，以使缩放中心为鼠标位置
      posX -= (mouseX / previousScale) * (scale - previousScale)
      posY -= (mouseY / previousScale) * (scale - previousScale)

      updateTransform()
    }

    // PC 端拖拽功能
    const onMouseDown = (event: MouseEvent) => {
      isDragging = true
      startX = event.clientX - posX
      startY = event.clientY - posY
    }

    const onMouseMove = (event: MouseEvent) => {
      if (isDragging) {
        posX = event.clientX - startX
        posY = event.clientY - startY
        updateTransform()
      }
    }

    const onMouseUp = () => {
      isDragging = false
    }

    const onMouseLeave = () => {
      isDragging = false
    }

    container.addEventListener('touchstart', onTouchStart, { passive: false })
    container.addEventListener('touchmove', onTouchMove, { passive: false })
    container.addEventListener('touchend', onTouchEnd)
    container.addEventListener('wheel', onWheel, { passive: false })
    container.addEventListener('mousedown', onMouseDown)
    container.addEventListener('mousemove', onMouseMove)
    container.addEventListener('mouseup', onMouseUp)
    container.addEventListener('mouseleave', onMouseLeave)

    // 返回一个函数用于注销所有事件
    return () => {
      container.removeEventListener('touchstart', onTouchStart)
      container.removeEventListener('touchmove', onTouchMove)
      container.removeEventListener('touchend', onTouchEnd)
      container.removeEventListener('wheel', onWheel)
      container.removeEventListener('mousedown', onMouseDown)
      container.removeEventListener('mousemove', onMouseMove)
      container.removeEventListener('mouseup', onMouseUp)
      container.removeEventListener('mouseleave', onMouseLeave)
    }
  }

  const handler = (
    containers: NodeListOf<HTMLElement>,
    options: {
      // customIcon: CustomIconCustomIcon
      customIcon: any
    },
  ) => {
    console.log('handler', containers)
    console.log('options', options)
    console.log('addEvent', addEvent)

    // const removeEventsMap = new Map<
    //   HTMLElement,
    //   { removeEvent?: () => void, removeClick?: () => void }
    // >()

    // console.log('containers', containers)

    // containers?.forEach((mm) => {
    //   let actionDiv = mm.querySelector(`.${prefix}-mermaid-action`)

    //   if (!actionDiv) {
    //     mm.insertAdjacentHTML(
    //       'beforeend',
    //       `<div class="${prefix}-mermaid-action">${StrIcon('pin-off', options.customIcon)}</div>`,
    //     )

    //     actionDiv = mm.querySelector(`.${prefix}-mermaid-action`)!
    //   }

    //   const onClick = () => {
    //     const current = removeEventsMap.get(mm)

    //     if (current?.removeEvent) {
    //       // 如果有事件，则注销并移除
    //       current.removeEvent()
    //       mm.removeAttribute('data-grab')
    //       removeEventsMap.set(mm, { removeClick: current.removeClick })
    //       actionDiv.innerHTML = StrIcon('pin-off', options.customIcon) // 取消固定
    //     }
    //     else {
    //       // 添加事件并记录
    //       const removeEvent = addEvent(mm)
    //       mm.setAttribute('data-grab', '')
    //       removeEventsMap.set(mm, { removeEvent, removeClick: current?.removeClick })
    //       actionDiv.innerHTML = StrIcon('pin', options.customIcon) // 固定
    //     }
    //   }

    //   // 绑定点击事件
    //   actionDiv.addEventListener('click', onClick)

    //   // 将 `click` 事件也放入 Map 中，以便未来注销
    //   removeEventsMap.set(mm, {
    //     removeClick: () => actionDiv.removeEventListener('click', onClick),
    //   })
    // })
    

    // // 返回一个函数，用于注销所有事件（包括 click 和 addEvent）
    // return () => {
    //   removeEventsMap.forEach(({ removeEvent, removeClick }) => {
    //     removeEvent?.()
    //     removeClick?.()
    //   })
    //   removeEventsMap.clear()
    // }
  }

  return handler
})()
/* Typewrite 组件相关 结束 */
