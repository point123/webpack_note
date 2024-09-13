<h1>项目代码</h1>

```html title="public/index.html"
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>vue cli</title>
</head>
<body>
    <div id="app"> </div>
</body>
</html>
```

### vue2

* `main.js`
```javascript title="main.js"
import Vue from "Vue";
import VueRouter from "vue-router";
import App from "./App";
import router from "./router";

Vue.use(VueRouter);

new Vue({
    render: h => h(App),
    router,
}).$mount("#app");
```

* `router/index.js`
```javascript title="router/index.js"
import VueRouter from "vue-router";

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: "/home",
            component: () => import("../views/Home/index.vue"),
        },
        {
            path: "/about",
            component: () => import("../views/About/index.vue"),
        }
    ]
})
```

* `App.vue`
```vue title="App.vue"
<template>
    <div>
        <h1>Hello World</h1>
        <ul>
            <li>
                <router-link to="/home">Home</router-link>
            </li>
            <li>
                <router-link to="/about">About</router-link>
            </li>
        </ul>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: "App"
}
</script>

<style scoped>
h1 {
    color: #a790cf;
}
</style>
```

* `views/Home/index.vue`
```vue title="Home/index.vue"
<template>
    <div class="home">home</div>    
</template>

<script>
export default {
    name: "home"
}
</script>

<style scoped>
.home {
    color: #a8190f;
}
</style>
```

* `views/About/index.vue`
```vue title="About/index.vue"
<template>
    <div class="about">about</div>    
</template>

<script>
export default {
    name: "about",
    methods: {
        hanleFunction() {
            var a;
            console.log();
        }
    }
}
</script>

<style scoped>
.about {
    color: #fa912c;
}
</style>
```

### vue3

* `main.js`
```javascript title="main.js"
import { createApp } from "vue";
import App from "./App";

import router from "./router";

createApp(App).use(router).mount(document.getElementById("app"));
```

* `router/index.js`
```javascript title="router/index.js"
import { createRouter, createWebHistory } from "vue-router";

export default createRouter {
    history: createWebHistory(),
    routes: [
        {
            path: "/home",
            component: () => import("../views/Home/index.vue"),
        },
        {
            path: "/about",
            component: () => import("../views/About/index.vue")
        }
    ]
}
```

* `App.vue`
```vue title="App.vue"
<template>
    <h1 class="title">hello app</h1>
    <ul>
        <li>
            <router-link to="/home">Home</router-link>
        </li>
        <li>
            <router-link to="/about">About</router-link>
        </li>
    </ul>

    <router-view></router-view>
</template>
<script>
export default {
    name: "App"
}
</script>
<style>
.title {
    color: pink;
}
</style>
```

* `view/Home/index.vue`
```vue title="Home/index.vue"
<template>
    <h1 class="home-title">Home</h1>
</template>
<script>
export default {
    name: "Home"
}
</script>
<style>
.home-title {
    color: blue;
}
</style>
```

* `view/About/index.vue`
```vue title="About/index.vue"
<template>
    <h1>About</h1>
</template>
<script>
export default {
    name: "About"
}
</script>
```