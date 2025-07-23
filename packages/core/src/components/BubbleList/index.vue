<script setup lang="ts" generic="T extends BubbleProps">
import type { BubbleProps } from '../Bubble/types';
import type { TypewriterInstance } from '../Typewriter/types.d.ts';
import type { BubbleListEmits, BubbleListProps } from './types.d.ts';
import { ArrowDownBold } from '@element-plus/icons-vue';
import { debounce } from 'radash';
import useScrollDetector from '../../utils/useScrollDetector.ts';
import Bubble from '../Bubble/index.vue';
import loadingBg from './loading.vue';

const props = withDefaults(defineProps<BubbleListProps<T>>(), {
  list: () => [] as T[],
  maxHeight: '500px',
  triggerIndices: 'only-last',
  alwaysShowScrollbar: false,
  backButtonThreshold: 80,
  showBackButton: true,
  backButtonPosition: () => {
    return { bottom: '20px', left: 'calc(50% - 19px)' };
  },
  btnLoading: true,
  btnColor: '#409EFF',
  btnIconSize: 24
});

const emits = defineEmits<BubbleListEmits>();

// 包装list (反转一下, 使渲染顺序与真实顺序一致)
const wrapList = computed(() => Array.from(props.list).reverse());

function initStyle() {
  document.documentElement.style.setProperty(
    '--el-bubble-list-max-height',
    props.maxHeight
  );
  document.documentElement.style.setProperty(
    '--el-bubble-list-btn-size',
    `${props.btnIconSize}px`
  );
}

// 获取真实的索引
function getTrueIndex(index: number) {
  return wrapList.value.length - 1 - index;
}

onMounted(() => {
  initStyle();
});

/* 在底部时候自动滚动 开始 */
// 滚动容器的引用
const scrollContainer = ref<HTMLElement | null>(null);
const { hasVertical } = useScrollDetector(scrollContainer);

const showBackToBottom = ref(false); // 控制按钮显示

// 设置容器滚动距离
function setContainerScrollTop(num: number) {
  const container = scrollContainer.value;
  if (!container) return;
  container.scrollTop = num;
}

// 父组件的触发方法，直接让滚动容器滚动到顶部
function scrollToTop() {
  nextTick(() => {
    // 自动滚动到最顶部
    if (scrollContainer.value && scrollContainer.value.scrollHeight) {
      nextTick(() => {
        setContainerScrollTop(-scrollContainer.value!.scrollHeight);
      });
    }
  });
}
// 父组件的触发方法，不跟随打字器滚动，滚动底部
function scrollToBottom() {
  try {
    setContainerScrollTop(0);
  } catch (error) {
    console.warn('[BubbleList error]: ', error);
  }
}
// 父组件触发滚动到指定气泡框
function scrollToBubble(index: number) {
  const container = scrollContainer.value;
  if (!container) return;

  const bubbles = container.querySelectorAll('.el-bubble');

  const bubbleLength = bubbles.length;

  if (index >= bubbleLength) return;

  const targetBubble = bubbles[getTrueIndex(index)] as HTMLElement;

  // 计算相对位置
  const containerRect = container.getBoundingClientRect();
  const bubbleRect = targetBubble.getBoundingClientRect();

  setContainerScrollTop(
    container.scrollTop - (containerRect.top - bubbleRect.top)
  );
}

const completeMap = ref<Record<number, TypewriterInstance>>({});
const typingList = computed(() =>
  props.list
    .map((item, _index_) => ({ ...item, _index_ }))
    .filter(item => item.typing)
);
// 打字机播放完成回调
function handleBubbleComplete(index: number, instance: TypewriterInstance) {
  index = getTrueIndex(index);
  switch (props.triggerIndices) {
    case 'only-last':
      if (index === typingList.value[typingList.value.length - 1]?._index_) {
        emits('complete', instance, index);
      }
      break;
    case 'all':
      completeMap.value[index] = instance;
      if (Object.keys(completeMap.value).length === typingList.value.length) {
        emits('complete', instance, index);
      }
      break;
    default:
      props.triggerIndices.includes(index) &&
        emits('complete', instance, index);
      break;
  }
}

const loadMoreLoading = ref(false);
// 加载更多数据
function loadMoreData() {
  if (!props.loadMore) return;
  loadMoreLoading.value = true;
  props.loadMore().finally(() => {
    loadMoreLoading.value = false;
  });
}

// 监听用户滚动事件
const handleScroll = debounce({ delay: 50 }, () => {
  if (scrollContainer.value) {
    const { scrollTop, scrollHeight, clientHeight } = scrollContainer.value;
    showBackToBottom.value =
      props.showBackButton && -scrollTop > props.backButtonThreshold;

    // 最大滚动距离
    const maxScrollDis = scrollHeight - clientHeight;
    // 加载更多触发的距离阈值
    const loadMoreThreshold = 20;
    if (-scrollTop > maxScrollDis - loadMoreThreshold) {
      loadMoreData();
    }
  }
});

defineExpose({
  scrollToTop,
  scrollToBottom,
  scrollToBubble
});
</script>

<template>
  <div
    ref="scrollContainer"
    class="el-bubble-list"
    :class="{ 'always-scrollbar': props.alwaysShowScrollbar }"
    @scroll="handleScroll"
  >
    <!-- 自定义按钮插槽 默认返回按钮 -->
    <div
      v-if="showBackToBottom && hasVertical"
      class="el-bubble-list-default-back-button"
      :class="{
        'el-bubble-list-back-to-bottom-solt': $slots.backToBottom
      }"
      :style="{
        bottom: backButtonPosition.bottom,
        left: backButtonPosition.left
      }"
      @click="scrollToBottom"
    >
      <!-- 返回到底部 -->
      <slot name="backToBottom">
        <el-icon
          class="el-bubble-list-back-to-bottom-icon"
          :style="{ color: props.btnColor }"
        >
          <ArrowDownBold />
          <loadingBg
            v-if="props.btnLoading"
            class="back-to-bottom-loading-svg-bg"
          />
        </el-icon>
      </slot>
    </div>
    <!-- 如果给 BubbleList 的 item 传入 md 配置，则按照 item 的 md 配置渲染 -->
    <!-- 否则，则按照 BubbleList 的 md 配置渲染 -->
    <Bubble
      v-for="(item, index) in wrapList"
      :key="index"
      :content="item.content"
      :placement="item.placement"
      :loading="item.loading"
      :shape="item.shape"
      :variant="item.variant"
      :is-markdown="item.isMarkdown"
      :is-fog="item.isFog"
      :typing="item.typing"
      :max-width="item.maxWidth"
      :avatar="item.avatar"
      :avatar-size="item.avatarSize"
      :avatar-gap="item.avatarGap"
      :avatar-shape="item.avatarShape"
      :avatar-src-set="item.avatarSrcSet"
      :avatar-alt="item.avatarAlt"
      :avatar-fit="item.avatarFit"
      :no-style="item.noStyle"
      @finish="instance => handleBubbleComplete(index, instance)"
    >
      <template v-if="$slots.avatar" #avatar>
        <slot name="avatar" :item="item" />
      </template>
      <template v-if="$slots.header" #header>
        <slot name="header" :item="item" />
      </template>
      <template v-if="$slots.content" #content>
        <slot name="content" :item="item" />
      </template>
      <template v-if="$slots.footer" #footer>
        <slot name="footer" :item="item" />
      </template>
      <template v-if="$slots.loading" #loading>
        <slot name="loading" :item="item" />
      </template>
    </Bubble>
    <!-- 加载更多 -->
    <div v-if="loadMoreLoading" class="el-bubble-list-load-more">
      <slot name="load-more">
        <el-icon class="el-bubble-list-load-more-is-loading">
          <Loading />
        </el-icon>
        <span>加载更多...</span>
      </slot>
    </div>
  </div>
</template>

<style scoped lang="scss" src="./style.scss"></style>
