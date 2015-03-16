### getDOMNodes()

得到该 NodeList 对象包含的原生节点数组。

#### 返回值：

Array<HTMLElement>

#### 使用例子

	var node = require('node');
	var divs = node.all('div').getDOMNodes();

### getDOMNode()

得到该 NodeList 对象包含的第一个原生节点。

#### 返回值：

HTMLElement

#### 使用例子

	var node = require('node');
	var firstdiv = node.all('div').getDOMNode(); // => node.all('div').getDOMNodes()[0]

### equals()

比较当前节点列表和 others 代表的节点列表是否完全相同。

#### 返回值：

Boolean

#### 使用例子
		
	var node = require('node');
	node.all('.a').equals(node.all('.b')) // => true or false

### add(selector[, context])

返回包含合并选择器字符串匹配的元素和当前节点列表元素的新 NodeList 对象。

#### 参数：

* slector：选择器
* context：选择器上下文

#### 返回值：

NodeList

#### 使用例子

	var node = require('node');
	var p = node.all('p');
	var list = p.add('div'); // => node.all('p') 和 node.all('div') 的集合

### item(index)

获取包含当前节点列表 index 位置处的单个原生节点的新 NodeList 对象。

#### 参数：

* index：节点索引值。

#### 返回值：

null 或者包含一个原生节点的 NodeList 对象。

#### 使用例子

	var node = require('node');
	node.all('div').item(1); // => node.all('div')[1]

### slice(start [ , end ])

获取包含当前节点列表选定范围内原生节点的新 NodeList 对象。

#### 参数：

* start (number)：范围开始位置
* end (number)：范围结束位置, 忽略的话结束坐标为当前列表末尾

#### 返回值：

NodeList

#### 使用例子

	var node = require('node');
	node.all('div').slice(1, 3)

### scrollTop()

得到当前节点列表第一个节点的滚动条的垂直位置。

#### 使用例子：

	var node = require('node');
	node.all('.a').scrollTop()

### scrollLeft()

得到当前节点列表第一个节点的滚动条的横向位置。

#### 使用例子：

	var node = require('node');
	node.all('.a').scrollLeft()

### height(value)

当无参数时，得到当前节点列表第一个节点的计算高度。
当有参数时，设置当前列表每个元素的 css height。

#### 返回值：

number

#### 使用例子

	var node = require('node');
	node.all('.a').height()
	node.all('.b').height(100)

### width(value)

当无参数时，得到当前节点列表第一个节点的计算宽度。
当有参数时，设置当前列表每个元素的 css width。

#### 返回值：

Number

#### 使用例子

	var node = require('node');
	node.all('.a').width()
	node.all('.b').width(100);

### append(content)

将参数内容插入到当前节点列表中的每个元素的末尾。

#### 参数：

* content (HTMLElement|string|NodeList)：将要插入的内容

### 返回值：

NodeList

#### 使用例子

	var node = require('node');
	node.all('.a').append('<p>test</p>');
	node.all('.a').append(node.all('.b'));

### appendTo(containers)

将当前节点列表中的每个元素插入到容器列表的每个元素的最后一个子节点后面。

#### 参数：

* containers：<HTMLElement|string|NodeList> 已有或新创建的节点，或选择器字符串

#### 返回值：

NodeList

#### 使用例子

	var node = require('node');
	node.all('.a').appendTo('.b');

### prepend(content)

将参数内容插入到当前节点列表中的每个元素的开头。

#### 参数：

* content(HTMLElement|string|NodeList)：将要插入的内容。

#### 返回值：

NodeList

#### 使用例子

	var node = require('node');
	node.all('.a').prepend('<p>test</p>');

### prependTo(containers)

将当前节点列表中的每个元素插入到容器列表的每个元素的开头。

#### 参数：

* containers：<HTMLElement|string|NodeList> 已有或新创建的节点，或选择器字符串

#### 返回值：

NodeList

#### 使用例子

	var node = require('node');
	node.all('.a').prependTo('.b');

### insertBefore(target)

将当前列表中的每个元素插入到目标元素之前。

#### 参数：

* target：<HTMLElement|string|NodeList> 已有或新创建的节点，或选择器字符串

#### 使用例子

	var node = require('node');
	node.all('<p>test</p>').insertBefore('.b');

### before

将参数内容插入到当前列表中每个元素之前。

#### 参数：

* content：<HTMLElement|string|NodeList> 已有或新创建的节点，或选择器字符串

#### 使用例子

	var node = require('node');
	node.all('.b').before('<p>test</p>');

### insertAfter(target)

将当前列表中的每个元素插入到目标元素之后。

#### 参数：

* target：<HTMLElement|string|NodeList> 已有或新创建的节点，或选择器字符串

#### 使用例子

	var node = require('node');
	node.all('<p>test</p>').insertAfter('.b');

### after

将参数内容插入到当前列表中每个元素之后。

#### 参数：

* content：<HTMLElement|string|NodeList> 已有或新创建的节点，或选择器字符串

#### 使用例子

	var node = require('node');
	node.all('.b').after('<p>test</p>');

### animate(props[, duration=1, easing=’easeNone’, callback])

在当前节点列表上开始动画。

#### 参数：

与 Anim 接口同。

#### 返回值：

NodeList

#### 使用例子

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

#### 返回值：

Boolean

### isPaused()

判断当前 NodeList 对象被暂停动画, NodeList 中只要有一个 Node 被暂停, 就会返回 truthy 值。

#### 返回值：

Boolean
