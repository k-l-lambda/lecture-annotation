---
title: "音程级向量"
slug: "interval-class-vectors"
source: "https://viva.pressbooks.pub/openmusictheory/chapter/interval-class-vectors/"
authors: ["Bryn Hughes", "Megan Lavengood"]
license: "CC BY-SA 4.0"
modified: "2022-09-15"
---

# 音程级向量

> **要点**
>
> - 集合类的总体音响，部分地由各音级之间的音程所决定。
> - 音程级向量是对集合内每一音程级的清点，写成一个括在尖括号内的六位数字（<xxxxxx>）。
> - 音程级向量中的每一位数字对应某一音程级的数量：第一位是音程级 1 的个数，第二位是音程级 2 的个数，依此类推。例如，在 C 大三和弦中，音程级 1 有 0 个，音程级 2 有 0 个，音程级 3 有 1 个，音程级 4 有 1 个，音程级 5 有 1 个，音程级 6 有 0 个；因此，它的音程级向量是 <001110>。
> - 音程级向量有助于在音乐作品中辨认集合类：如果你知道某个集合类内部可能有哪些音程级，就可以在作品中寻找那些音程级。
> - 含更多音级的集合，其音程级向量中的数字自然也会更多和／或更大。每个三音集合（trichord）有 3 个可用的音程级（因此向量之和总应为 3），每个四音集合（tetrachord）有 6 个（因此之和应为 6），每个五音集合（pentachord）有 10 个，依此类推。

任何音响的性质，都可以通过概括它所包含的全部音程而粗略地量化。由于一个音响中包含的所有音程都对其总体音响有所贡献，我们必须找出集合中每一个音级所形成的音程级（IC），而不只是相邻音级之间的音程级。

先试一个简单的例子：C 大三和弦。用这个三和弦的音级可以构成三种音程级：根音与三音之间、三音与五音之间，以及根音与五音之间。C–E 是大三度（音程级 4），E–G 是小三度（音程级 3），C–G 是纯五度（音程级 5）。

音程级向量把它概括为一个括在尖括号里的六位数字；每一位数字对应某一音程级的数量，如谱例 1 所示。C 大三和弦的音程级向量是 <001110>，它表明 C 大三和弦含有：

[![谱例 1. 音程级向量中的每一位数字对应一个音程级：第一位对应音程级 1，第二位对应音程级 2，依此类推。向量中的数字表示该集合中存在多少个该音程级。](../media/2020/01/tallying.002-e1662408328441.png)](../media/2020/01/tallying.002.png)*谱例 1. 音程级向量中的每一位数字对应一个音程级：第一位对应音程级 1，第二位对应音程级 2，依此类推。向量中的数字表示该集合中存在多少个该音程级。*

- 音程级 1 有 0 个
- 音程级 2 有 0 个
- 音程级 3 有 1 个
- 音程级 4 有 1 个
- 音程级 5 有 1 个
- 音程级 6 有 0 个

## 方法

要算出音程级向量，我们只需算出音响中每一对音的组合所形成的音程级。制作音程级向量有以下三个步骤：

1. 把集合写成常规形式。
2. 找出每两个音级的每一种组合所形成的音程级。把结果记录在一张计数表上。
3. 把每一栏（包括空栏）中的计数标记换算成数字，再把这些总数括在尖括号 < > 内。

我们用尖括号把向量括起来，是为了把它与分析中可能出现的其他整数字串区分开，例如常规形式（用方括号）或原型（用圆括号）。

谱例 2 以 E<sub>4</sub>、F♯<sub>4</sub>、C<sub>5</sub>、A<sub>5</sub> 这组音为例，演示这一过程：

1. 该集合的常规形式是 [4, 6, 9, 0]。
2. 数出每一对音级之间的音程级，并用一张计数标记表记录下来：
	1. 从最左边的音级（这里是 4）开始，算出它与右边每一个音级之间的音程级。这些音程级在谱例 2 中用蓝色弧线表示。
	2. 向右移动一个音级（这里是 6），算出它与*右边*每一个音级之间的音程级（不要往左边数，因为那个音程级在第 2a 步中已经数过了）。这些音程级用橙色弧线表示。
	3. 向右移动一个音级（这里是 9），算出它与右边每一个音级之间的音程级。由于这是一个四音级集合，这就是最后一组音程级，用红色弧线表示。
3. 把第 2 步的计数标记换算成数字，得到音程级向量 <012111>。

![谱例 2. 演示如何在一个音级集合中数出各音程级，以制作音程级向量。](../media/2020/01/tallying.001-e1662403759208.png)*谱例 2. 演示如何在一个音级集合中数出各音程级，以制作音程级向量。*

<!-- lilylet-begin: media/2020/01/tallying.001-e1662403759208.png -->
```lyl.play
\omit Score.TimeSignature \omit Score.BarLine \key c \major \time 4/4 \clef "treble" <e fs c' a'>1^\markup "[4, 6, 9, 0]" | %1
```
<!-- lilylet-end -->
含更多音级的集合，其音程级向量自然会有更多和／或更大的数字，因为涉及的音程多得多。每个三音集合有三个可用的音程级（因此向量之和总应为三），每个四音集合有六个（因此之和应为六），每个五音集合有十个，依此类推。

计算完音程级向量之后，检验工作的一种方法就是把各音程级的数目相加，确认总数是正确的。如果你知道集合的原型，还可以跟集合类清单核对，[例如维基百科上的这份清单](https://en.wikipedia.org/wiki/List_of_pitch-class_sets)，因为这些清单通常都会给出每个集合类的音程级向量。

谱例 3 是关于上述内容的视频课。

▶️ [视频：音程级向量](https://www.youtube.com/watch?v=UiSqq-edlKA)

<!-- video-begin: https://www.youtube.com/watch?v=UiSqq-edlKA -->
<div class="omt-video"><iframe src="https://www.youtube-nocookie.com/embed/UiSqq-edlKA" title="video" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen></iframe></div>
<!-- video-end -->

谱例 3. 关于音程级向量的视频课。

## 分析中的音程级向量

音程级向量告诉我们，作曲家可以从某一集合中发掘出哪些音程，而正是这些音程赋予该集合独特的音响和／或联想。有些集合中各音程级的分布较为均匀，正因这一特性而格外受无调性作曲家青睐；另一些集合则特别偏重某一音程级，或者完全不含某种音程级。

音程级向量还帮助我们在两个或多个看似并无直接关联的集合之间建立听觉—分析上的联系。如果它们有着相似的音程级分布，那么在自由无调性语境中，它们听起来也会相似。

> 作业

1. 音程级向量练习表（.[pdf](https://viva.pressbooks.pub/app/uploads/sites/12/2021/08/WK-Interval-Class-Vectors.pdf)、.[docx](https://viva.pressbooks.pub/app/uploads/sites/12/2021/08/WK-Interval-Class-Vectors.docx)）。要求学生计算若干集合的音程级向量。

### 媒体署名

- IC vectors © Megan Lavengood is licensed under a [CC BY-SA (Attribution ShareAlike)](https://creativecommons.org/licenses/by-sa/4.0/) license
- tallying ICs © Megan Lavengood is licensed under a [CC BY-SA (Attribution ShareAlike)](https://creativecommons.org/licenses/by-sa/4.0/) license
