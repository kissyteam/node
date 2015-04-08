Node 模块提供了对DOM节点的最高层的封装，可以创建、操作、遍历、查找Dom节点。封装后的Node节点在各个浏览器端均具有一致的API，这些API甚至在NodeList类型上也是可以用的。同时，Node还提供了对CSS、动画、事件的基本的封装。可以让你方便的操作DOM节点。

### 载入Node模块

```javascript
	// 载入 Node 模块
	var node = require('node');
```

### 使用Node

Node API 是基于DOM Api 实现的，定义了一系列的语法糖，让用户更舒服的使用Node api，写的代码更加优雅。如果你对标准jQuery DOM API很了解，那么你对Node API也会非常熟悉。

### 查找节点

```javascript
	var el = node.one('#main');

	// 或者传入一个HtmlElement元素
	var bodyNode = node.one(document.body);
```

one()方法类似于jquery的$，通过传入选择器或者Dom实例来获取目标（包装后）的Node节点。如果传入一个css选择器，one()函数将返回第一个匹配的节点。如果要获得节点列表，需要使用all()方法。

注意：KISSY 在选择器上的实现是渐进增强的，在高级浏览器中优先使用querySelector和getElementsByClassName等原生函数，在低版本的IE中降级使用selector/ie的js实现。对于异类的CSS3特有的选择器，在低版本IE中用sizzle实现。这样做主要是为了精简选择器的实现代码，降低 KISSY 核心代码体积。

KISSY 会根据浏览器平台加载正确的代码，用户不用关心平台，KISSY 一定会调用最合适、性能最优的选择器实现。在1.4.1中，不需要用户手动引用sizzle模块了，KISSY 会自行判断加载。

### 操作内容

KISSY Node 节点支持链式调用:

```javascript
	node.one('#test')
		.parent('.fathor')
		.next()
		.html('<p></p>')
		.on('click', function() { /* ... */ });
```

这种风格和jQuery保持一致。创建节点：

```javascript
	node.all('<div>hello kissy</div>').appendTo('body');
```

这里的例子涉及查找子节点、父节点，找兄弟节点，修改内容，绑定事件，创建节点。

### 访问 Node 节点的属性

```javascript
	var imgNode = node.one('#preview');
	var bigSrc = imgNode.attr('src');//得到imgNode的src属性

	imgNode.attr('src', 'new.png');// 设置src属性为一个新的值
	imgNode.next().html('hello world');// 设置imgNode下一个兄弟节点的innerHTML
```

Node 实例通过attr方法来读写常见的属性。一些className和innerHTML相关的常用操作，被封装为addClass、replaceClass或者html方法。更多用法请参照下文API部分。
Node 事件操作

```javascript
	node.one('#demo').on('click', function(e) {
		e.halt();
		alert('event: ' + e.type + ' target: ' + e.target.tagName); 
	});
```

回调传回一个门面对象e，注意 e 不是原生事件对象，是封装后的，这时e.target是裸的节点。除了preventDefault()和stopPropagation()之外，e还包含halt()方法，停止事件加阻止默认行为。

### Node 方法

Node 实例实现了一些快捷方法，用来方便用户更快捷的操作DOM节点。比如append、next、appendTo、addClass等等。

### 无障碍支持

KISSY 支持标准的ARIA。即 KISSY 可以完整的支持无障碍特性。比如对roles和state的支持。这些特性可以和读屏软件很好的兼容，在增强html标签语义化的同时，让盲人用户使用页面更加顺畅。

```javascript
	// 写一个属性
	var el = node.one('#toolbar').attr('role', 'toolbar');
	// 同时写多个属性
	el.attr({
		role: 'menu', 'aria-hidden': true 
	});
```

