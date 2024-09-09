<h1>项目代码</h1>

* `main.js`
```javascript title="main.js"
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
)
```

* `App.jsx`
```jsx title="App.jsx"
import React, { Suspense, lazy } from "react";
import { Link, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import About from "./pages/About";

// react懒加载实现分包
const Home = lazy(() => import(/* webpackChunkName: "home" */"./pages/Home"));
const About = lazy(() => import(/* webpackChunkName: "about" */"./pages/About"));
function App() {
    return (
        <div>
            <h1>App</h1>
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
    )
}

export default App;
```

* `pages/Home/index.jsx`
```jsx title="index.jsx"
import React from "react";
import "./index.less";

function Home() {
    return <h2 className="title">Home</h2>
}

export default Home;
```

* `pages/Home/index.less`
```less title="index.less"
.title {
    color: #ac810f;
}
```
* `pages/About/index.jsx`
```jsx title="index.jsx"
import React from "react";

export default function About() {
    return (
        <h2>About</h2>
    )
}
```