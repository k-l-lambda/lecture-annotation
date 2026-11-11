---
title: "音级集合、常规形式与变换"
slug: "pc-sets-normal-order-and-transformations"
source: "https://viva.pressbooks.pub/openmusictheory/chapter/pc-sets-normal-order-and-transformations/"
authors: ["Megan Lavengood", "Brian Moseley"]
license: "CC BY-SA 4.0"
modified: "2026-09-24"
---

# 音级集合、常规形式与变换

> **要点**
>
> - 音级集合（pc set）是一组音级。
> - 命名音级集合的标准方式是用它的常规形式（normal order）：把各音级按上行排列时最紧凑的一种排列。
> - 要移位一个集合（T<sub>n</sub>），给集合中的每个整数加上 *n*。
> - 要倒影一个集合（I<sub>n</sub>），先倒影该集合（取每个整数模 12 的补数），再移位 *n*。另一种做法是，用 *n* 减去集合中的每个整数（*n–x=y*）。
> - 钟面可以帮助你完成上述任何一项任务。

## 音级集合

当我们把一组音级当作一个单位来谈论时，就称这一组为音级集合，常缩写为“pc set”。任何一组音级都可以成为一个音级集合。

## 常规形式

常规形式是把给定的一组音级按上行顺序写出来时最紧凑的方式。常规形式与“原位”这一概念有很多共同之处。原位是为三和弦与七和弦的音级排序的标准方式，为的是便于对它们进行分类和比较。常规形式的作用相同，但更为一般化，因而适用于包含各种音与音程的和弦。

以下是确定常规形式的数学方法与直观方法。

### 数学方法

| 步骤 | 示例集合：G♯<sub>4</sub>、A<sub>2</sub>、D♯<sub>3</sub>、A<sub>4</sub> |
| --- | --- |
| 1. 写成一个音级的集合（去掉重复者），使它们若按上行弹奏可容纳在同一个八度之内。可能有多种写法。 | 8,9,3 |
| 2. 在末尾复制第一个音级。 | 8,9,3,8 |
| 3. 找出相邻音级之间最大的有序音级音程。 | 8 到 9：1 9 到 3：6 3 到 8：5 **9 到 3 是最大的音程。** |
| 4. 从最大音程右侧的那个音级开始重写这一集合，把答案写在方括号内。 | [3,8,9] |

偶尔，第 3 步中会出现最大音程并列的情况。这时，向某一侧（或另一侧）最紧密地靠拢的那种排列就是常规形式。如果仍然并列，就选择向下方最紧密靠拢的集合。

### 直观方法（钟面法）

如果你不喜欢上面描述的步骤，谱例 1 中的视频清楚地讲解了如何用钟面快速找出常规形式。

[https://cdnapisec.kaltura.com/p/1601031/embedPlaykitJs/uiconf\_id/54158772?iframeembed=true&entry\_id=1\_wuclkc6h&config[provider]={"widgetId":"1\_b0hsun7h"}](https://cdnapisec.kaltura.com/p/1601031/embedPlaykitJs/uiconf_id/54158772?iframeembed=true&entry_id=1_wuclkc6h&config%5Bprovider%5D=widgetId:1_b0hsun7h)

🔗 [嵌入内容：用钟面找出常规形式](https://coursemedia.gmu.edu/embed/secure/iframe/entryId/1_axkf6ow8/uiConfId/+44431031/st/0)

谱例 1. 用钟面找出常规形式。[在 GMU CourseMedia 上打开](https://coursemedia.gmu.edu/media/Using+the+Clock+Face+to+Find+Normal+Form/1_axkf6ow8)

## 移位

在后调性音乐中，移位常常与运动相联系：取一个和弦、动机或旋律，当它被移位时，听觉上的效果就是把这个和弦、动机或旋律*移动*到某个方向。在德彪西（Debussy）《沉没的大教堂》（*La cathédrale engloutie*）两处互不衔接的段落中，开头的动机 <D, E, B> 或 <2, 4, 11> 在第 18 小节被移高四个半音，成为 <F♯, G♯, D♯> 或 <6, 8, 3>（在谱例 2 中两者都用蓝色标出），象征着大教堂从水下缓缓升起。当我们听到第 18 小节的段落时，能认出它与第 1 小节段落的关系，因为同一组有序音程又出现了，只是从另一个音高开始。移位保持音程内容；不仅如此，它连各音程的具体排列方式也一并保持。

🎼 [MuseScore 曲谱](https://musescore.com/user/32728834/scores/8391225/s/-79eyZ)

谱例 2. 一个动机的移位，有序与无序。

从第 18 小节进入第 19 小节时，同一个动机以一种更隐蔽的方式得到保持（在谱例 2 中用红色标出）。这里被移位的是无序音级集合，而不是前面那个有序集合。这看起来也许不像前两组动机那样是移位，但如果把这些音高排成常规形式，被移位的音程关系就变得清楚了。

移位常缩写为 T<sub>n</sub>，其中 *n* 是变换的指数（index number），表示两个集合之间的有序音级音程。移位是一种运算——是对音高、音级或这些东西的集合所*做*的事情。另一方面，移位也可以是一种*测量*——表示事物之间的距离。

### 移位一个集合

要用 T<sub>n</sub> 移位一个集合，就给该集合中的每个整数加上 *n*（模 12，即数字到 12 后从头开始，如同钟面上一样）。

以第 1 小节中那组音级为例，用 T<sub>4</sub> 移位：

$\begin{alignat*}{2}&& [11, 2, 4]  \\ {}+ && 4\ 4\ 4\ \\ \hline && [3, 6, 8] \\ \end{alignat*}$

结果就是第 18 小节中的那些音级。

**T<sub>4</sub> [11, 2, 4] = [3, 6, 8]**

### 辨认移位并计算指数

要确定*两个集合之间*的移位关系，用第二个集合减去第一个集合。如果得到的数字全都相同，这两个集合就以那个 T<sub>n</sub> 相关联。例如，要给谱例 1 中的箭头加标注，分析者会用第 18 小节的音级整数“减去”第 1 小节的音级整数。注意两个集合都应先写成常规形式。

$\begin{alignat*}{2} && [3, 6, 8] \\ {}- && [11, 2, 4] \\ \hline && 4\ 4\ 4\ \\ \end{alignat*}$

**[3, 6, 8] 与 [11, 2, 4] 通过 T<sub>4</sub> 相关联。**

## 倒影

与移位一样，倒影也常与联系相似对象的运动相关。谱例 3 中陈怡《多耶》（*Duo Ye*，2000）的段落就是一例：正如那些有移位关系的段落一样，这两个乐思具有相同的音程内容，所以我们的耳朵会把它们听成非常相似的东西。然而与移位不同，这两个乐思的音程内容排列方式并不相同：两者有相同的音程，但 [1, 4, 6] 这个集合把音程 3 放在下方而不是上方（谱例 4）。

🎼 [MuseScore 曲谱](https://musescore.com/user/32728834/scores/8391513)

谱例 3. [2, 4, 7] 经倒影成为 [1, 4, 6]。

![谱例 4. 这两个集合有相同的音程（一个 2、一个 3、一个 5），但音程的排列方式不同。](../media/2019/05/inversion-2-1.png)*谱例 4. 这两个集合有相同的音程（一个 2、一个 3、一个 5），但音程的排列方式不同。*

### 一般倒影

如果有人要你倒影一个集合，而没有给出指数，就假定你是在模 12 的意义下倒影该集合。这意味着取每个数模 12 的补数。整数 *x* 模 12 的补数，就是与 *x* 相差为 12 的那个数 *y*。例如，4 的补数是 8：4+8=12。6 的补数是 6：6+6=12。0 的补数是 0：0+0=0，而 0 就是 12 模 12。

用这种方式倒影 [2, 4, 7]，得到 [5, 8, 10]。

### I<sub>n</sub>：先倒影再移位法

有时，集合先被倒影，然后再移位，如谱例 3 所示。其缩写为 I<sub>n</sub>。

在谱例 3 中，第一个集合 [2, 4, 7] 由 I<sub>8</sub> 倒影。要用 I<sub>8</sub> 倒影一个集合，按下列顺序进行：

1. **倒影：**[2, 4, 7] 变为 [5, 8, 10]。
2. **移位：**给 [5, 8, 10] 中的每个数加上 8，得到 [1, 4, 6]。

### I<sub>n</sub>：相减法

你可以用 *n* 减去第一个集合的所有音级，来计算 I<sub>n</sub> 所产生的新集合。

**[2, 4, 7] 的 I<sub>8</sub> 是什么？**

$\begin{alignat*}{2} && 8\ 8\ 8\ \\ {}- && [2, 4, 7] \\ \hline && [6, 4, 1] \\ \end{alignat*}$

**I<sub>8</sub> [2, 4, 7] = [1, 4, 6]。**

### 辨认倒影及其指数

任何两个有倒影关系的音高相加，就构成指数。这作为上述相减法的合理延伸是说得通的：如果倒影后的音高 *y* 是 *n–x* 的结果，那么 *n = x + y* 同样成立。

另一种想象方式是在钟面上。如果你有两个集合，它们 1）都写成常规形式，2）有倒影关系，那么每个集合内的音会以相反的顺序彼此对应，如下面的谱例 5 所示。把两个集合上下叠放，然后如谱例 6 所示，把两个集合中相对位置的整数相加，就得到该倒影关系的指数。如果每一对数字之和为 12 或更大，就减去 12，使你的 *n* 落在模 12 的范围内。

| 谱例 5. 两个有倒影关系的集合，其整数以相反顺序两两配对，形成镜像般的关系。这些配对的音程之和总是同一个数，即该倒影的指数。*谱例 5. 两个有倒影关系的集合，其整数以相反顺序两两配对，形成镜像般的关系。这些配对的音程之和总是同一个数，即该倒影的指数。* | 谱例 6. 对于两个三音集合，把第一个集合最左边的整数与第二个集合最右边的整数相加，中间的数相加，再把第一个集合最右边的元素与第二个集合最左边的元素相加。这就是求倒影指数的交叉相加法。*谱例 6. 对于两个三音集合，把第一个集合最左边的整数与第二个集合最右边的整数相加，中间的数相加，再把第一个集合最右边的元素与第二个集合最左边的元素相加。这就是求倒影指数的交叉相加法。* |
| --- | --- |

## 用钟面进行移位与倒影

如果你更喜欢直观的方法来移位和倒影，可以观看谱例 7 中的视频课。

🔗 [嵌入内容：变换](https://coursemedia.gmu.edu/embed/secure/iframe/entryId/1_wuclkc6h/uiConfId/+44431031/st/0)

谱例 7. 用钟面对音级集合进行移位与倒影。[在 GMU CourseMedia 上打开](https://coursemedia.gmu.edu/media/Transformations/1_wuclkc6h)

> 延伸阅读

- Straus, Joseph N. 2016. *Introduction to Post-Tonal Theory*. 4th ed. Upper Saddle River, NJ: Prentice Hall.

> 资源

- [空白钟面（整数记法）](https://viva.pressbooks.pub/app/uploads/sites/12/2019/05/Clock-Faces-integers.pdf)
- [空白钟面（字母音名）](https://viva.pressbooks.pub/app/uploads/sites/12/2019/05/Clock-Faces-letters.pdf)
- [集合理论速查表](https://viva.pressbooks.pub/app/uploads/sites/12/2019/05/INFO-set-theory-quick-reference-sheet.pdf)：概述音高与音级、音程与音程级、集合与集合类这几对定义的区分。
- [Clock Master](https://brianedwardjarvis.com/MusicTheoryWebApps/clock_master/clock_master_container.html?cm_bej=true&bej_cm_subject=Clock_Types&bej_cm_exercise_name=Integers_Chromatic)：把集合映射到钟面上的可视化工具。可将移位与倒影可视化。

> 作业

1. 常规形式与变换（.[pdf](https://viva.pressbooks.pub/app/uploads/sites/12/2019/05/WK-normal-form.pdf)、.[docx](https://viva.pressbooks.pub/app/uploads/sites/12/2019/05/WK-normal-form.docx)）。要求学生求出各集合的常规形式、计算集合的变换，并在勋伯格（Arnold Schoenberg）的《夜》（“Nacht”）中辨认 T<sub>n</sub>/I<sub>n</sub> 关系。
2. 作曲准备练习表（.[pdf](https://viva.pressbooks.pub/app/uploads/sites/12/2019/05/COMP-Worksheet-for-prep.pdf)、.[docx](https://viva.pressbooks.pub/app/uploads/sites/12/2019/05/COMP-Worksheet-for-prep.docx)）。通过让学生找出集合与变换，为[集合类作曲](05-set-class-and-prime-form.md#assignments)作准备。

### 媒体署名

- inversion-2 © Megan Lavengood is licensed under a [CC BY-SA (Attribution ShareAlike)](https://creativecommons.org/licenses/by-sa/4.0/) license
- Inversional pairs © Megan Lavengood
- Cross-addition for inversion © Megan Lavengood is licensed under a [CC BY-SA (Attribution ShareAlike)](https://creativecommons.org/licenses/by-sa/4.0/) license
