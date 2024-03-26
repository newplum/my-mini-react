在实现 React 的过程中，发现要使用 jsx，需要先实现 React.createElement 这个方法

最开始直接在 App.jsx 文件中写

```jsx
const App = <div>hello world</div>;

export default App;
```

发现报错提示：`Uncaught ReferenceError: React is not defined`

然后我随意创建了个 React 空对象并在 App.jsx 中导入

报错信息变成了：`React.createElement is not a function`

从这里得知了 jsx 文件是依赖于 React.createElement 这个方法的

jsx 文件中导出的 dom 会经过 React.createElement 方法处理, React.createElement 方法的返回值就是虚拟 dom 对象
