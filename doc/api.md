### getDOMNodes()

得到该 NodeList 对象包含的原生节点数组。

#### Returns:

Array<HTMLElement>

#### Examples:

	var node = require('node');
	var divs = node.all('div').getDOMNodes();

### getDOMNode()

得到该 NodeList 对象包含的第一个原生节点。

#### Returns:

HTMLElement

#### Examples:

	var node = require('node');
	var firstdiv = node.all('div').getDOMNode(); // => node.all('div').getDOMNodes()[0]

### equals()

比较当前节点列表和 others 代表的节点列表是否完全相同。

#### Returns:

Boolean

#### Examples:
		
	var node = require('node');
	node.all('.a').equals(node.all('.b')) // => true or false

### add(selector[, context])

返回包含合并选择器字符串匹配的元素和当前节点列表元素的新 NodeList 对象。

#### Parameters:

* slector：选择器
* context：选择器上下文

#### Returns:

NodeList

#### Examples:

	var node = require('node');
	var p = node.all('p');
	var list = p.add('div'); // => node.all('p') 和 node.all('div') 的集合

### item(index)

获取包含当前节点列表 index 位置处的单个原生节点的新 NodeList 对象。

#### Parameters:

* index：节点索引值。

#### Returns:

null 或者包含一个原生节点的 NodeList 对象。

#### Examples:

	var node = require('node');
	node.all('div').item(1); // => node.all('div')[1]

### slice(start [ , end ])

获取包含当前节点列表选定范围内原生节点的新 NodeList 对象。

#### Parameters:

* start {number}：范围开始位置
* end {number}：范围结束位置, 忽略的话结束坐标为当前列表末尾

#### Returns:

NodeList

#### Examples:

	var node = require('node');
	node.all('div').slice(1, 3)

### scrollTop()

得到当前节点列表第一个节点的滚动条的垂直位置。

#### Examples:：

	var node = require('node');
	node.all('.a').scrollTop()

### scrollLeft()

得到当前节点列表第一个节点的滚动条的横向位置。

#### Examples:：

	var node = require('node');
	node.all('.a').scrollLeft()

### height(value)

当无参数时，得到当前节点列表第一个节点的计算高度。
当有参数时，设置当前列表每个元素的 css height。

#### Returns:

number

#### Examples:

	var node = require('node');
	node.all('.a').height()
	node.all('.b').height(100)

### width(value)

当无参数时，得到当前节点列表第一个节点的计算宽度。
当有参数时，设置当前列表每个元素的 css width。

#### Returns:

Number

#### Examples:

	var node = require('node');
	node.all('.a').width()
	node.all('.b').width(100);

### append(content)

将参数内容插入到当前节点列表中的每个元素的末尾。

#### Parameters:

* content {HTMLElement|string|NodeList}：将要插入的内容

### Returns:

NodeList

#### Examples:

	var node = require('node');
	node.all('.a').append('<p>test</p>');
	node.all('.a').append(node.all('.b'));

### appendTo(containers)

将当前节点列表中的每个元素插入到容器列表的每个元素的最后一个子节点后面。

#### Parameters:

* containers {HTMLElement|string|NodeList}：已有或新创建的节点，或选择器字符串

#### Returns:

NodeList

#### Examples:

	var node = require('node');
	node.all('.a').appendTo('.b');

### prepend(content)

将参数内容插入到当前节点列表中的每个元素的开头。

#### Parameters:

* content {HTMLElement|string|NodeList}：将要插入的内容。

#### Returns:

NodeList

#### Examples:

	var node = require('node');
	node.all('.a').prepend('<p>test</p>');

### prependTo(containers)

将当前节点列表中的每个元素插入到容器列表的每个元素的开头。

#### Parameters:

* containers {HTMLElement|string|NodeList}：已有或新创建的节点，或选择器字符串

#### Returns:

NodeList

#### Examples:

	var node = require('node');
	node.all('.a').prependTo('.b');

### insertBefore(target)

将当前列表中的每个元素插入到目标元素之前。

#### Parameters:

* target {HTMLElement|string|NodeList}：已有或新创建的节点，或选择器字符串

#### Examples:

	var node = require('node');
	node.all('<p>test</p>').insertBefore('.b');

### before

将参数内容插入到当前列表中每个元素之前。

#### Parameters:

* content {HTMLElement|string|NodeList}：已有或新创建的节点，或选择器字符串

#### Examples:

	var node = require('node');
	node.all('.b').before('<p>test</p>');

### insertAfter(target)

将当前列表中的每个元素插入到目标元素之后。

#### Parameters:

* target {HTMLElement|string|NodeList}：已有或新创建的节点，或选择器字符串

#### Examples:

	var node = require('node');
	node.all('<p>test</p>').insertAfter('.b');

### after

将参数内容插入到当前列表中每个元素之后。

#### Parameters:

* content {HTMLElement|string|NodeList}：已有或新创建的节点，或选择器字符串

#### Examples:

	var node = require('node');
	node.all('.b').after('<p>test</p>');

### animate(props[, duration=1, easing=’easeNone’, callback])

在当前节点列表上开始动画。

#### Parameters:

与 Anim 接口同。

#### Returns:

NodeList

#### Examples:

	var node = require('node');
	node.all('div').animate({
		left: {
			value: "100px",
			easing: function () {
				return 0.5;
			}
		},
		top: {
			value: "100px",
			easing: function () {
				return 0.2;
			}
		}
	}, {
		duration: 0.3
	});

### stop([ end, clearQueue, queueName ])

停止当前节点列表的动画, end, clearQueue, queueName。

### pause([ queueName ])

暂停当前节点列表的动画, queueName。

### resume([ queueName ])

继续当前节点列表的动画, queueName。

### isRunning()

判断当前 NodeList 对象是否在动画中, NodeList 中只要有一个 Node 在动画, 就会返回 truthy 值。

#### Returns:

Boolean

### isPaused()

判断当前 NodeList 对象被暂停动画, NodeList 中只要有一个 Node 被暂停, 就会返回 truthy 值。

#### Returns:

Boolean

### show([ speed, callback ])

当前节点列表元素以动画效果显示。

#### 参数

* speed (number)：单位秒, 动画持续时间, 不设置无动画
* callback (function)：每个动画结束后回调函数

#### Returns:

NodeList

### hide([ speed, callback ])

当前节点列表元素以动画效果隐藏。

#### 参数

* speed (number)：单位秒, 动画持续时间, 不设置无动画
* callback (function)：每个动画结束后回调函数

#### Returns:

NodeList

### toggle([ speed, callback ])

当前节点列表元素为显示时动画效果隐藏, 否则动画效果显示。

#### 参数

* speed (number)：单位秒, 动画持续时间, 不设置无动画
* callback (function)：每个动画结束后回调函数

#### Returns:

NodeList

### fadeIn([ speed = 1, callback, easing ])

当前节点列表元素以渐隐效果显示。

#### Parameters:

* speed {Number}：单位秒, 动画持续时间, 不设置无动画
* callback {Function}：每个动画结束后回调函数
* easing {String}：动画平滑函数, 同 Anim

#### Returns:

NodeList

#### Note：

注意回调 callback 在每个元素动画结束后都会回调, this 值指向当前单个元素所属的动画对象.

### fadeOut([ speed = 1, callback, easing ])

当前节点列表元素以渐隐效果隐藏。

#### Parameters:

* speed {Number}：单位秒, 动画持续时间, 不设置无动画
* callback {Function}：每个动画结束后回调函数
* easing {String}：动画平滑函数, 同 Anim

#### Returns:

NodeList

#### Note：

注意回调 callback 在每个元素动画结束后都会回调, this 值指向当前单个元素所属的动画对象.

### fadeToggle([ speed = 1, callback, easing ])

当前节点列表元素为显示时, 切换显示或隐藏, 且动画效果为渐隐。

#### Parameters:

* speed {Number}：单位秒, 动画持续时间, 不设置无动画
* callback {Function}：每个动画结束后回调函数
* easing {String}：动画平滑函数, 同 Anim

#### Returns:

NodeList

### slideDown([ speed = 1, callback, easing ])

当前节点列表元素从上到下滑动显示。

#### Parameters:

* speed {Number}：单位秒, 动画持续时间, 不设置无动画
* callback {Function}：每个动画结束后回调函数
* easing {String}：动画平滑函数, 同 Anim

#### Returns:

NodeList

#### Note：

注意回调 callback 在每个元素动画结束后都会回调, this 值指向当前单个元素所属的动画对象.

### slideUp([ speed = 1, callback, easing ])

当前节点列表元素从下到上隐藏。

#### Parameters:

* speed {Number}：单位秒, 动画持续时间, 不设置无动画
* callback {Function}：每个动画结束后回调函数
* easing {String}：动画平滑函数, 同 Anim

#### Returns:

NodeList

#### Note：

注意回调 callback 在每个元素动画结束后都会回调, this 值指向当前单个元素所属的动画对象.

### slideToggle([ speed = 1, callback, easing ])

当前节点列表元素为显示时, 切换显示或隐藏, 且动画效果为滑动展开折叠。

### 其它方法

filter() , test() , clone() , empty() , replaceWith() , hasClass(), addClass(), removeClass(), replaceClass(), toggleClass(), removeAttr(), attr(), hasAttr(), prop(), hasProp(), val(), text(), css(), toggle(), offset(), scrollIntoView(), parent(), index(), next(), prev(), first(), last(), siblings(), children(), contains(), html(), remove(), data(), removeData(), hasData(), unselectable(), contains(), innerWidth(), innerHeight(), outerWidth(), outerHeight(), on(), detach(), fire()

这些方法的调用都会被转发给 dom , event , 原 DOM , Event 对应方法的第一个参数传入一个原生 DOM 节点数组, 而这个原生 DOM 节点数组则是由当前的 NodeList 对象得到的。

Node 模块会对返回值进行处理:

* 如果返回值为单个节点或节点数组, 则包装为 NodeList
* 如果返回值为 undefined , 则返回调用者 NodeList 对象
* 其他, 直接返回

#### Note

Node 模块的 on 方法中的 this 关键字指向当前绑定事件的单个原生节点, 事件对象的 target 和 relatedTarget 也指向对应的原生节点。
