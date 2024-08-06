<template><div><h1>处理js资源</h1>
<p><code v-pre>Webpack</code>对js的处理是有限的,只能编译<code v-pre>js</code>中的<code v-pre>ES模块化</code>语法,不能编译其他语法,可能导致js无法在旧的浏览器中运行,需要进行兼容性处理</p>
<p>其次, 团队开发需要代码规范</p>
<ul>
<li>针对js兼容性处理,可以使用<code v-pre>babel</code>完成</li>
<li>针对代码格式,可以使用Eslint完成</li>
</ul>
<h3 id="eslint" tabindex="-1"><a class="header-anchor" href="#eslint"><span>Eslint</span></a></h3>
<p>可组装的<code v-pre>javascript</code>和<code v-pre>jsx</code>检测工具
可以用来检测js和jsx的语法,可以配置各项功能</p>
<h4 id="配置文件" tabindex="-1"><a class="header-anchor" href="#配置文件"><span>配置文件</span></a></h4>
<p>配置文件有多种写法:</p>
<ul>
<li>可以单独创建一个eslint配置文件</li>
<li>可以在<code v-pre>package.json</code>中的<code v-pre>eslintConfig</code>属性中配置
<code v-pre>Eslint</code>会自动查找和自动读取它们</li>
</ul>
<h4 id="配置-旧版配置" tabindex="-1"><a class="header-anchor" href="#配置-旧版配置"><span>配置(旧版配置)</span></a></h4>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="eslint.config.js"><pre v-pre class="language-javascript"><code><span class="line">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// 解析选项</span></span>
<span class="line">    <span class="token literal-property property">parserOptions</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token literal-property property">ecmaVersion</span><span class="token operator">:</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token comment">// ES语法版本</span></span>
<span class="line">        <span class="token literal-property property">sourceType</span><span class="token operator">:</span> <span class="token string">"module"</span><span class="token punctuation">,</span> <span class="token comment">// ES模块化</span></span>
<span class="line">        <span class="token literal-property property">ecmaFeatures</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token comment">// ES 其他特性</span></span>
<span class="line">            <span class="token literal-property property">jsx</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token comment">// 如果使用react项目,需要开启jsx语法</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token comment">// 检测规则</span></span>
<span class="line">    <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token comment">// 继承规则</span></span>
<span class="line">    <span class="token keyword">extends</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="新版扁平化配置" tabindex="-1"><a class="header-anchor" href="#新版扁平化配置"><span>新版扁平化配置</span></a></h4>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="eslint.config.js"><pre v-pre class="language-javascript"><code><span class="line"><span class="token keyword">import</span> js <span class="token keyword">from</span> <span class="token string">"@eslint/js"</span><span class="token punctuation">;</span></span>
<span class="line">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">[</span></span>
<span class="line">    js<span class="token punctuation">.</span>config<span class="token punctuation">.</span>recommended<span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">        <span class="token comment">// 解析选项</span></span>
<span class="line">        <span class="token literal-property property">languageOptions</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token literal-property property">ecmaVersion</span><span class="token operator">:</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token comment">// ES语法版本</span></span>
<span class="line">            <span class="token literal-property property">sourceType</span><span class="token operator">:</span> <span class="token string">"module"</span><span class="token punctuation">,</span> <span class="token comment">// ES模块化</span></span>
<span class="line">            <span class="token literal-property property">parserOptions</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">                <span class="token literal-property property">ecmaFeatures</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token comment">// ES 其他特性</span></span>
<span class="line">                    <span class="token literal-property property">jsx</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token comment">// 如果使用react项目,需要开启jsx语法</span></span>
<span class="line">                <span class="token punctuation">}</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token comment">// 检测规则</span></span>
<span class="line">        <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">]</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="新旧版本配置文件区别" tabindex="-1"><a class="header-anchor" href="#新旧版本配置文件区别"><span>新旧版本配置文件区别</span></a></h4>
<ul>
<li>
<p>新版:
新版使用扁平风格配置,导出为一个数组;</p>
<p>使用推荐规则,它需要下载<code v-pre>@eslint/js</code>包并且在配置文件中使用<code v-pre>import js from &quot;@eslint/js&quot;</code>,</p>
<p>并且在配置文件中第一个元素使用<code v-pre>js.config.recommended</code>或者<code v-pre>js.config.all</code></p>
<p><code v-pre>js.config.recommended</code>或<code v-pre>js.config.all</code>包含了eslint:recommended,<s>同时包含了其他配置(gpt的回答)</s>,实际查看源码仅仅导出了rules</p>
<p><s>也就是说,数组中可以仅包含<code v-pre>js.config.recommended</code>或<code v-pre>js.config.all</code>即可直接使用</s></p>
<p>同时,使用新的推荐配置,废弃了<code v-pre>extends</code>选项, 想要覆盖推荐配置,在数组的第二个元素中使用一个对象,并在该对象中写入覆盖规则</p>
<p>许多规则的名称和位置也发生了改变</p>
</li>
<li>
<p>旧版:
旧版通常导出为一个对象,使用<code v-pre>eslint:recommended</code>作为属性<code v-pre>extends</code>的值</p>
</li>
</ul>
<h5 id="rules规则" tabindex="-1"><a class="header-anchor" href="#rules规则"><span>rules规则</span></a></h5>
<ul>
<li><code v-pre>off</code>或<code v-pre>0</code> - 关闭规则</li>
<li><code v-pre>warn</code>或<code v-pre>1</code> - 开启规则,使用警告级别的错误: <code v-pre>warn</code>,不会导致程序退出</li>
<li><code v-pre>error</code>或<code v-pre>2</code> - 开启规则,使用错误级别的错误: <code v-pre>error</code>,会导致程序退出</li>
</ul>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="eslint.config.js"><pre v-pre class="language-javascript"><code><span class="line"><span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token literal-property property">semi</span><span class="token operator">:</span> <span class="token string">"error"</span><span class="token punctuation">,</span> <span class="token comment">// 必须使用分号</span></span>
<span class="line">    <span class="token string-property property">"array-callback-return"</span><span class="token operator">:</span> <span class="token string">"warn"</span><span class="token punctuation">,</span> <span class="token comment">// 数组方法的回调函数中必须有return语句</span></span>
<span class="line">    <span class="token string-property property">"default-case"</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">        <span class="token string">"warn"</span><span class="token punctuation">,</span> <span class="token comment">// 要求switch语句中有default分支,否则警告</span></span>
<span class="line">        <span class="token punctuation">{</span> <span class="token literal-property property">commentPattern</span><span class="token operator">:</span> <span class="token string">"^no default$"</span> <span class="token punctuation">}</span> <span class="token comment">// 允许在最后注释no default,这样就不会产生警告</span></span>
<span class="line">    <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">eqeqeq</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">        <span class="token string">'warn'</span><span class="token punctuation">,</span> <span class="token comment">// 要求使用===和!==,否则警告</span></span>
<span class="line">        <span class="token string">'smart'</span> <span class="token comment">// 在特点情况下不会警告</span></span>
<span class="line">    <span class="token punctuation">]</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="extends继承" tabindex="-1"><a class="header-anchor" href="#extends继承"><span>extends继承</span></a></h5>
<p>一条条写<code v-pre>rules</code>太繁琐,所以可以继承现有规则</p>
<ul>
<li><a href="https://eslint.org/docs/latest/rules/" target="_blank" rel="noopener noreferrer">Eslint官方推荐规则</a>: <code v-pre>Eslint:recommended</code>(旧版) <code v-pre>js.configs.recommended</code>(新版)</li>
<li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/@vue/cli-plugin-eslint" target="_blank" rel="noopener noreferrer">Vue-cli官方规则</a>: <code v-pre>plugin:vue/essential</code></li>
<li><a href="https://github.com/facebook/create-react-app/tree/main/packages/eslint-config-react-app" target="_blank" rel="noopener noreferrer">React Cli官方规则</a>: <code v-pre>react-app</code></li>
</ul>
<p><code v-pre>react</code>中可以这么写配置</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="eslint.config.js"><pre v-pre class="language-javascript"><code><span class="line">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">[</span></span>
<span class="line">    <span class="token keyword">extends</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"react-app"</span><span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token comment">// 覆盖react规则</span></span>
<span class="line">        <span class="token literal-property property">eqeqeq</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"warn"</span><span class="token punctuation">,</span> <span class="token string">"smart"</span><span class="token punctuation">]</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">]</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="在webpack中使用新版eslint-扁平化" tabindex="-1"><a class="header-anchor" href="#在webpack中使用新版eslint-扁平化"><span>在Webpack中使用新版Eslint(扁平化)</span></a></h4>
<ol>
<li>安装依赖</li>
</ol>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="line"><span class="token function">npm</span> i <span class="token parameter variable">-D</span> eslint eslint-webpack-plugin @eslint/js globals @eslint/compat</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><ul>
<li><code v-pre>eslint</code>: <code v-pre>eslint</code>核心,必须安装</li>
<li><code v-pre>@eslint/js</code>: 包含了<code v-pre>eslint</code>推荐规则和全部规则,推荐安装</li>
<li><code v-pre>globals</code>: 替代旧版的<code v-pre>env</code>,包含<code v-pre>globals.node</code>和<code v-pre>globals.browser</code>等,推荐安装</li>
<li><code v-pre>@eslint/compat</code>: <code v-pre>compat</code>中的<code v-pre>includeIgnoreFile</code>函数可以使用<code v-pre>.gitignore</code>文件来忽略检查文件,选择性安装</li>
<li><code v-pre>eslint-webpack-plugin</code>: <code v-pre>webpack</code>调用<code v-pre>eslint</code>插件,必须安装</li>
</ul>
<ol start="2">
<li>创建并配置eslint文件</li>
</ol>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="eslint.config.js"><pre v-pre class="language-javascript"><code><span class="line"><span class="token comment">// eslint预设,包含recommended和all,recommended中包含了eslint:recommended,该包需要单独下载</span></span>
<span class="line"><span class="token keyword">const</span> js <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'@eslint/js'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> </span>
<span class="line"><span class="token comment">// globals取代了env配置,不使用globals.node,会导致配置文件中由于commonjs而引发eslint警告,该包需要单独下载</span></span>
<span class="line"><span class="token keyword">const</span> globals <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"globals"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token comment">// compat中的includeIgnoreFile将.gitignore中的文件忽略校验,需要单独安装</span></span>
<span class="line"><span class="token keyword">const</span> compat <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"@eslint/compat"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> </span>
<span class="line"><span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"node:path"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">[</span></span>
<span class="line">    js<span class="token punctuation">.</span>configs<span class="token punctuation">.</span>recommended<span class="token punctuation">,</span></span>
<span class="line">    compat<span class="token punctuation">.</span><span class="token function">includeIgnoreFile</span><span class="token punctuation">(</span>path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">".gitignore"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">        <span class="token literal-property property">languageOptions</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token literal-property property">ecmaVersion</span><span class="token operator">:</span> <span class="token string">"latest"</span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token literal-property property">sourceType</span><span class="token operator">:</span> <span class="token string">"module"</span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token literal-property property">globals</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">                <span class="token operator">...</span>globals<span class="token punctuation">.</span>node<span class="token punctuation">,</span></span>
<span class="line">                <span class="token operator">...</span>globals<span class="token punctuation">.</span>browser</span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">]</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3">
<li>配置webpack文件</li>
</ol>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="webpack.config.js"><pre v-pre class="language-javascript"><code><span class="line"><span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"node:path"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">const</span> EslintWebpackPlugin <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"eslint-webpack-plugin"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// 入口</span></span>
<span class="line">    <span class="token literal-property property">entry</span><span class="token operator">:</span> <span class="token string">"./src/main.js"</span><span class="token punctuation">,</span> <span class="token comment">// 相对路径</span></span>
<span class="line">    <span class="token comment">// 输出</span></span>
<span class="line">    <span class="token literal-property property">output</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token comment">// 输出路径,所有文件的输出目录</span></span>
<span class="line">        <span class="token literal-property property">path</span><span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">"dist"</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token comment">// 绝对路径</span></span>
<span class="line">        <span class="token comment">// js打包输出文件名</span></span>
<span class="line">        <span class="token literal-property property">filename</span><span class="token operator">:</span> <span class="token string">"static/js/bundle.js"</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token comment">// 自定清空上次打包的内容,在打包前将path整个目录清空再进行打包</span></span>
<span class="line">        <span class="token literal-property property">clean</span><span class="token operator">:</span> <span class="token boolean">true</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token comment">// 插件</span></span>
<span class="line">    <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line highlighted">        <span class="token keyword">new</span> <span class="token class-name">EslintWebpackPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line highlighted">            <span class="token comment">// 默认值为eslintrc,需要修改为flat扁平化配置,否则会报错无法找到配置文件</span></span>
<span class="line highlighted">            <span class="token literal-property property">configType</span><span class="token operator">:</span> <span class="token string">"flat"</span><span class="token punctuation">,</span> </span>
<span class="line highlighted">            <span class="token comment">// 只检查src目录</span></span>
<span class="line highlighted">            <span class="token literal-property property">context</span><span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">"src"</span><span class="token punctuation">)</span><span class="token punctuation">,</span> </span>
<span class="line highlighted">        <span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token comment">// loader加载器</span></span>
<span class="line">    <span class="token literal-property property">module</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token comment">// loader的配置</span></span>
<span class="line">        <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">            <span class="token comment">/// ... 省略</span></span>
<span class="line">        <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token comment">// 模式</span></span>
<span class="line">    <span class="token literal-property property">mode</span><span class="token operator">:</span> <span class="token string">"development"</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="在webpack中使用旧版eslint" tabindex="-1"><a class="header-anchor" href="#在webpack中使用旧版eslint"><span>在Webpack中使用旧版Eslint</span></a></h4>
<ol>
<li>安装依赖</li>
</ol>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="line"><span class="token function">npm</span> i <span class="token parameter variable">-D</span> eslint eslint-webpack-plugin</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><ol start="2">
<li>创建并配置eslint文件</li>
</ol>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="eslint.config.js"><pre v-pre class="language-javascript"><code><span class="line">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// 继承 Eslint 规则</span></span>
<span class="line">    <span class="token keyword">extends</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"eslint:recommended"</span><span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">env</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token literal-property property">node</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// 启用node中全局变量</span></span>
<span class="line">      <span class="token literal-property property">browser</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// 启用浏览器中全局变量</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">parserOptions</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token literal-property property">ecmaVersion</span><span class="token operator">:</span> <span class="token number">6</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token literal-property property">sourceType</span><span class="token operator">:</span> <span class="token string">"module"</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token string-property property">"no-var"</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token comment">// 不能使用 var 定义变量</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3">
<li>配置webpack文件</li>
</ol>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="webpack.config.js"><pre v-pre class="language-javascript"><code><span class="line"><span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"node:path"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">const</span> EslintWebpackPlugin <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"eslint-webpack-plugin"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// 入口</span></span>
<span class="line">    <span class="token literal-property property">entry</span><span class="token operator">:</span> <span class="token string">"./src/main.js"</span><span class="token punctuation">,</span> <span class="token comment">// 相对路径</span></span>
<span class="line">    <span class="token comment">// 输出</span></span>
<span class="line">    <span class="token literal-property property">output</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token comment">// 输出路径,所有文件的输出目录</span></span>
<span class="line">        <span class="token literal-property property">path</span><span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">"dist"</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token comment">// 绝对路径</span></span>
<span class="line">        <span class="token comment">// js打包输出文件名</span></span>
<span class="line">        <span class="token literal-property property">filename</span><span class="token operator">:</span> <span class="token string">"static/js/bundle.js"</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token comment">// 自定清空上次打包的内容,在打包前将path整个目录清空再进行打包</span></span>
<span class="line">        <span class="token literal-property property">clean</span><span class="token operator">:</span> <span class="token boolean">true</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token comment">// 插件</span></span>
<span class="line">    <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line highlighted">        <span class="token keyword">new</span> <span class="token class-name">EslintWebpackPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line highlighted">            <span class="token comment">// 只检查src目录</span></span>
<span class="line highlighted">            <span class="token literal-property property">context</span><span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">"src"</span><span class="token punctuation">)</span><span class="token punctuation">,</span> </span>
<span class="line highlighted">        <span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token comment">// loader加载器</span></span>
<span class="line">    <span class="token literal-property property">module</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token comment">// loader的配置</span></span>
<span class="line">        <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">            <span class="token comment">/// ... 省略</span></span>
<span class="line">        <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token comment">// 模式</span></span>
<span class="line">    <span class="token literal-property property">mode</span><span class="token operator">:</span> <span class="token string">"development"</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="vscode中的eslint插件" tabindex="-1"><a class="header-anchor" href="#vscode中的eslint插件"><span>vscode中的eslint插件</span></a></h4>
<p><code v-pre>vscode</code>扩展中安装<code v-pre>eslint</code>扩展,它能读取项目中的<code v-pre>eslint</code>配置文件,并且能实时的校验代码</p>
<h3 id="babel" tabindex="-1"><a class="header-anchor" href="#babel"><span>Babel</span></a></h3>
</div></template>


