<h1>优化配置</h1>

许多`react`写中后台项目会使用`ant-design`

安装`ant-design`
```bash
npm i antd
```

修改
```jsx{3,13,16} title="App.jsx"
import React, { Suspense, lazy } from "react";
import { Link, Routes, Route } from "react-router-dom";
import { Button, ConfigProvider  } from "antd";
// import Home from "./pages/Home";
// import About from "./pages/About";

// react懒加载实现分包
const Home = lazy(() => import(/* webpackChunkName: "home" */"./pages/Home"));
const About = lazy(() => import(/* webpackChunkName: "about" */"./pages/About"));
function App() {
    return (
        // 配置anti-design主题样式
        <ConfigProvider theme={{ token: { colorPrimary: '#00b96b'} }}>
            <div>
                <h1>App</h1>
                <Button type="primary">Button</Button>
                <ul>
                    <li>
                        <Link to="/home">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                </ul>
                <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                        <Route path="/home" element={<Home />} />
                        <Route path="/about" element={<About />} />
                    </Routes>
                </Suspense>
            </div>      
        </ConfigProvider>

    )
}

export default App;
```

此时进行打包后,所有`node_modules`内容(如`react`,`react-dom`,`ant-design`)都打包到同一个`chunk`中,体积太大


