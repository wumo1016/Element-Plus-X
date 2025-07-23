import type { BubbleProps } from '@components/Bubble/types';
import type { BubbleListProps } from '@components/BubbleList/types';
import type { FilesType } from '@components/FilesCard/types';

import type { ThinkingStatus } from '@components/Thinking/types';

// 头像1
export const avatar1: string =
  'https://avatars.githubusercontent.com/u/76239030?v=4';

// 头像2
export const avatar2: string =
  'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png';

// md 普通内容
export const mdContent = `
### 行内公式
1. 欧拉公式：$e^{i\\pi} + 1 = 0$
2. 二次方程求根公式：$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$
3. 向量点积：$\\vec{a} \\cdot \\vec{b} = a_x b_x + a_y b_y + a_z b_z$

### 块级公式
1. 傅里叶变换：
$$
F(\\omega) = \\int_{-\\infty}^{\\infty} f(t) e^{-i\\omega t} dt
$$

2. 矩阵乘法：
$$
\\begin{bmatrix}
a & b \\\\
c & d
\\end{bmatrix}
\\begin{bmatrix}
x \\\\
y
\\end{bmatrix}
=
\\begin{bmatrix}
ax + by \\\\
cx + dy
\\end{bmatrix}
$$

3. 泰勒级数展开：
$$
f(x) = \\sum_{n=0}^{\\infty} \\frac{f^{(n)}(a)}{n!} (x - a)^n
$$

4. 拉普拉斯方程：
$$
\\nabla^2 u = \\frac{\\partial^2 u}{\\partial x^2} + \\frac{\\partial^2 u}{\\partial y^2} + \\frac{\\partial^2 u}{\\partial z^2} = 0
$$

5. 概率密度函数（正态分布）：
$$
f(x) = \\frac{1}{\\sqrt{2\\pi\\sigma^2}} e^{-\\frac{(x-\\mu)^2}{2\\sigma^2}}
$$

# 标题
这是一个 Markdown 示例。
- 列表项 1
- 列表项 2
**粗体文本** 和 *斜体文本*

- [x] Add some task
- [ ] Do some task
`.trim();

// md 代码块高亮
export const highlightMdContent = `
#### 切换右侧的secureViewCode进行安全预览或者不启用安全预览模式下 会呈现不同的网页预览效果
\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>炫酷文字动效</title>
    <style>
        body { margin: 0; overflow: hidden; }
        canvas { display: block; }
        .text-container {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            pointer-events: none;
        }
        h1 {
            font-family: Arial, sans-serif;
            font-size: clamp(2rem, 8vw, 5rem);
            margin: 0;
            color: white;
            text-shadow: 0 0 10px rgba(0,0,0,0.3);
            opacity: 0;
            animation: fadeIn 3s forwards 0.5s;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    </style>
</head>
<body>
    <canvas id="canvas"></canvas>
    <div class="text-container">
        <h1 id="main-text">AWESOME TEXT</h1>
    </div>
    <script>
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const text = document.getElementById('main-text');

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 3 + 1;
                this.speedX = Math.random() * 3 - 1.5;
                this.speedY = Math.random() * 3 - 1.5;
                this.color = \`hsl(\${Math.random() * 360}, 70%, 60%)\`;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.size > 0.2) this.size -= 0.01;
            }
            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        let particles = [];
        function init() {
            particles = [];
            for (let i = 0; i < 200; i++) {
                particles.push(new Particle());
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
                for (let j = i; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.strokeStyle = \`rgba(255,255,255,\${0.1 - distance/1000})\`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(animate);
        }

        init();
        animate();

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });

        // 自定义文字功能
        text.addEventListener('click', () => {
            const newText = prompt('输入新文字:', text.textContent);
            if (newText) {
                text.textContent = newText;
                text.style.opacity = 0;
                setTimeout(() => {
                    text.style.opacity = 1;
                }, 50);
            }
        });
    </script>
</body>
</html>
\`\`\`
\`\`\`html
<div class="product-card">
  <div class="badge">新品</div>
  <img src="https://picsum.photos/300/200?product" alt="产品图片">

  <div class="content">
    <h3>无线蓝牙耳机 Pro</h3>
    <p class="description">主动降噪技术，30小时续航，IPX5防水等级</p>

    <div class="rating">
      <span>★★★★☆</span>
      <span class="reviews">(124条评价)</span>
    </div>

    <div class="price-container">
      <span class="price">¥499</span>
      <span class="original-price">¥699</span>
      <span class="discount">7折</span>
    </div>

    <div class="actions">
      <button class="cart-btn">加入购物车</button>
      <button class="fav-btn">❤️</button>
    </div>

    <div class="meta">
      <span>✓ 次日达</span>
      <span>✓ 7天无理由</span>
    </div>
  </div>
</div>

<style>
  .product-card {
    width: 280px;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    position: relative;
    background: white;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  .badge {
    position: absolute;
    top: 12px;
    left: 12px;
    background: #ff6b6b;
    color: white;
    padding: 4px 10px;
    border-radius: 4px;
    font-weight: bold;
    font-size: 12px;
    z-index: 2;
  }

  img {
    width: 100%;
    height: 180px;
    object-fit: cover;
    display: block;
  }

  .content {
    padding: 16px;
  }

  h3 {
    margin: 8px 0;
    font-size: 18px;
    color: #333;
  }

  .description {
    color: #666;
    font-size: 14px;
    margin: 8px 0 12px;
    line-height: 1.4;
  }

  .rating {
    display: flex;
    align-items: center;
    margin: 10px 0;
    color: #ffb300;
  }

  .reviews {
    font-size: 13px;
    color: #888;
    margin-left: 8px;
  }

  .price-container {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 12px 0;
  }

  .price {
    font-size: 22px;
    font-weight: bold;
    color: #ff4757;
  }

  .original-price {
    font-size: 14px;
    color: #999;
    text-decoration: line-through;
  }

  .discount {
    background: #fff200;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 12px;
  }

  .actions {
    display: flex;
    gap: 8px;
    margin: 16px 0 12px;
  }

  .cart-btn {
    flex: 1;
    background: #5352ed;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 6px;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.2s;
  }

  .cart-btn:hover {
    background: #3742fa;
  }

  .fav-btn {
    width: 42px;
    background: white;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 18px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .fav-btn:hover {
    border-color: #ff6b6b;
    color: #ff6b6b;
  }

  .meta {
    display: flex;
    gap: 15px;
    font-size: 13px;
    color: #2ed573;
    margin-top: 8px;
  }
</style>
\`\`\`
###### 非\`commonMark\`语法，dom多个
<pre>
<code class="language-java">
public class HelloWorld {
  public static void main(String[] args) {
      System.out.println("Hello, world!");
  }
}
</code>
</pre>
\`\`\`echarts
use codeXRender for echarts render
\`\`\`
### javascript
\`\`\`javascript
console.log('Hello, world!');
\`\`\`
### java
\`\`\`java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, world!");
    }
}
\`\`\`
\`\`\`typescript
import {
  ArrowDownBold,
  CopyDocument,
  Moon,
  Sunny
} from '@element-plus/icons-vue';
import { ElButton, ElSpace } from 'element-plus';
import { h } from 'vue';

/* ----------------------------------- 按钮组 ---------------------------------- */

/**
 * @description 描述 language标签
 * @date 2025-06-25 17:48:15
 * @author tingfeng
 *
 * @export
 * @param language
 */
export function languageEle(language: string) {
  return h(
    ElSpace,
    {},
    {}
  );
}
\`\`\`
`.trim();

// md 美人鱼图表
export const mermaidMdContent = `

### mermaid 饼状图
\`\`\`mermaid
pie
    "传媒及文化相关" : 35
    "广告与市场营销" : 8
    "游戏开发" : 15
    "影视动画与特效" : 12
    "互联网产品设计" : 10
    "VR/AR开发" : 5
    "其他" : 15
\`\`\`

`;

// md 数学公式
export const mathMdContent = `
### mermaid 流程图
\`\`\`mermaid
graph LR
    1 --> 2
    2 --> 3
    3 --> 4
    2 --> 1
    2-3 --> 1-3
\`\`\`
\`\`\`mermaid
flowchart TD
    Start[开始] --> Check[是否通过？]
    Check -- 是 --> Pass[流程继续]
    Check -- 否 --> Reject[流程结束]
\`\`\`
\`\`\`mermaid
flowchart TD
    %% 前端专项四层结构
    A["战略层
    【提升用户体验】"]
    --> B["架构层
    【微前端方案选型】"]
    --> C["框架层
    【React+TS技术栈】"]
    --> D["实现层
    【组件库开发】"]
    style A fill:#FFD700,stroke:#FFA500
    style B fill:#87CEFA,stroke:#1E90FF
    style C fill:#9370DB,stroke:#663399
    style D fill:#FF6347,stroke:#CD5C5C

\`\`\`
### mermaid 数学公式
\`\`\`mermaid
sequenceDiagram
    autonumber
    participant 1 as $$alpha$$
    participant 2 as $$beta$$
    1->>2: Solve: $$\sqrt{2+2}$$
    2-->>1: Answer: $$2$$
\`\`\`

`;
export const customAttrContent = `
<a href="https://element-plus-x.com/">element-plus-x</a>
<h1>标题1</h1>
<h2>标题2</h2>
`;
export type MessageItem = BubbleProps & {
  key: number;
  role: 'ai' | 'user' | 'system';
  avatar: string;
  thinkingStatus?: ThinkingStatus;
  expanded?: boolean;
};

// md 复杂图表
export const mermaidComplexMdContent = `
### Mermaid 渲染复杂图表案例
\`\`\`mermaid
graph LR
    A[用户] -->|请求交互| B[前端应用]
    B -->|API调用| C[API网关]
    C -->|认证请求| D[认证服务]
    C -->|业务请求| E[业务服务]
    E -->|数据读写| F[数据库]
    E -->|缓存操作| G[缓存服务]
    E -->|消息发布| H[消息队列]
    H -->|触发任务| I[后台任务]

    subgraph "微服务集群"
        D[认证服务]
        E[业务服务]
        I[后台任务]
    end

    subgraph "数据持久层"
        F[数据库]
        G[缓存服务]
    end

`;

export const messageArr: BubbleListProps<MessageItem>['list'] = [
  {
    key: 1,
    role: 'ai',
    placement: 'start',
    content: '1欢迎使用 Element Plus X .'.repeat(100),
    shape: 'corner',
    variant: 'filled',
    isMarkdown: false,
    avatar: avatar2,
    avatarSize: '32px'
  },
  {
    key: 2,
    role: 'user',
    placement: 'end',
    content: '2这是用户的消息',
    shape: 'corner',
    variant: 'outlined',
    isMarkdown: false,
    avatar: avatar1,
    avatarSize: '32px'
  },
  {
    key: 3,
    role: 'ai',
    placement: 'start',
    content: '3欢迎使用 Element Plus X .'.repeat(100),
    loading: false,
    shape: 'corner',
    variant: 'filled',
    isMarkdown: false,
    avatar: avatar2,
    avatarSize: '32px'
  },
  {
    key: 4,
    role: 'user',
    placement: 'end',
    content: '4这是用户的消息',
    shape: 'corner',
    variant: 'outlined',
    isMarkdown: false,
    avatar: avatar1,
    avatarSize: '32px'
  },
  {
    key: 5,
    role: 'ai',
    placement: 'start',
    content: '5欢迎使用 Element Plus X .'.repeat(100),
    shape: 'corner',
    variant: 'filled',
    isMarkdown: true,
    avatar: avatar2,
    avatarSize: '32px'
  },
  {
    key: 6,
    role: 'user',
    placement: 'end',
    content: '6这是用户的消息',
    loading: false,
    shape: 'corner',
    variant: 'outlined',
    isMarkdown: true,
    avatar: avatar1,
    avatarSize: '32px'
  },
  {
    key: 7,
    role: 'ai',
    placement: 'start',
    content: '7欢迎使用 Element Plus X .'.repeat(100),
    shape: 'corner',
    variant: 'filled',
    isMarkdown: true,
    avatar: avatar2,
    avatarSize: '32px'
  }
  // {
  //   key: 8,
  //   role: 'user',
  //   placement: 'end',
  //   content: '这是用户的消息',
  //   loading: false,
  //   shape: 'corner',
  //   variant: 'outlined',
  //   isMarkdown: false,
  //   avatar: avatar1,
  //   avatarSize: '32px'
  // }
];

// 模拟自定义文件卡片数据
// 内置样式
export const colorMap: Record<FilesType, string> = {
  word: '#0078D4',
  excel: '#00C851',
  ppt: '#FF5722',
  pdf: '#E53935',
  txt: '#424242',
  mark: '#6C6C6C',
  image: '#FF80AB',
  audio: '#FF7878',
  video: '#8B72F7',
  three: '#29B6F6',
  code: '#00008B',
  database: '#FF9800',
  link: '#2962FF',
  zip: '#673AB7',
  file: '#FFC757',
  unknown: '#6E9DA4'
};

// 自己定义文件颜色
export const colorMap1: Record<FilesType, string> = {
  word: '#5E74A8',
  excel: '#4A6B4A',
  ppt: '#C27C40',
  pdf: '#5A6976',
  txt: '#D4C58C',
  mark: '#FFA500',
  image: '#8E7CC3',
  audio: '#A67B5B',
  video: '#4A5568',
  three: '#5F9E86',
  code: '#4B636E',
  database: '#4A5A6B',
  link: '#5D7CBA',
  zip: '#8B5E3C',
  file: '#AAB2BF',
  unknown: '#888888'
};

// 自己定义文件颜色1
export const colorMap2: Record<FilesType, string> = {
  word: '#0078D4',
  excel: '#4CB050',
  ppt: '#FF9933',
  pdf: '#E81123',
  txt: '#666666',
  mark: '#FFA500',
  image: '#B490F3',
  audio: '#00B2EE',
  video: '#2EC4B6',
  three: '#00C8FF',
  code: '#00589F',
  database: '#F5A623',
  link: '#007BFF',
  zip: '#888888',
  file: '#F0D9B5',
  unknown: '#D8D8D8'
};
