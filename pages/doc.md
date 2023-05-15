# pages 页面

1. 以 hooks 页面技术为核心
2. 所有的第三方插件的 hooks（react-i18n/流程图-服务端渲染/微服务->serverless/redux/react-dnd）
3. rtk 数据流管理

reduxTookit => rtk

## 组件传递参数

hook 函数组件

1. 父传递给子组件 props 传递
2. 子传递父组件 事件回调（ref 使用子传递父组件）访问实例
   `useImperativeHandle`
   `forwardRef`
3. 嵌套传参数（createContext）

4. 组件优化（五大核心手段）

```js
// 优化
1. 优化组件性能（发生了多次渲染）父组件 -> 子组件

优化核心就是优化子组件不相关的render => 缓存 memo useMemo useCallback

2. 优化框架性能

webpack5
```
