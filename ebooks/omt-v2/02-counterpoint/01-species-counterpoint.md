---
title: "类别对位导论"
slug: "species-counterpoint"
source: "https://viva.pressbooks.pub/openmusictheory/chapter/species-counterpoint/"
authors: ["Mark Gotham", "Kris Shaffer"]
license: "CC BY-SA 4.0"
modified: "2026-07-24"
---

# 类别对位导论

> **要点**
>
> - 类别对位是一种循序渐进的方法，用来学习写作旋律以及把旋律组合起来。
> - 尽管其中的“规则”与 16<sup>th</sup> 世纪的音乐有一定联系，但其主旨其实是训练基本技能，与特定曲目或风格无关。
> - 本章回顾我们在[基础乐理](../01-fundamentals/README.md)部分遇到的几个关键概念，并介绍若干对后续各章都适用的基本“规则”，包括以下术语：
> 	- 协和与不协和：
> 		- 完全协和音程：纯一度、纯五度、纯八度
> 		- 不完全协和音程：大、小三度与大、小六度
> 		- 不协和音程：所有二度、七度，以及减音程和增音程
> 	- 二声部进行的类型：
> 		- 反向：两个声部朝相反方向运动（一个上行，另一个下行）
> 		- 同向：两个声部朝同一方向运动（都上行或都下行）
> 		- 平行：两个声部朝同一方向（都上行或都下行）移动相同的距离，使起始与结束的音程属于同一类型（例如平行三度）
> 		- 斜向：一个声部运动，另一个声部停留在同一音高上

我们从一种特定的方法——类别对位——开始。“类别”（species）一词最常见的用法大概是给动物分类，但它也有更宽泛的含义，指任何把相似要素归为一类的体系。在这里，“类别”指按特定顺序进行的不同类型的练习，每一阶段引入一两个新的音乐“问题”。（所以，不会有大象或猴子来唱复调，抱歉！）

这种方法有许多变体，但这里的各章紧密依据约翰·约瑟夫·富克斯（Johann Joseph Fux）的[*Gradus ad Parnassum*（《通往帕纳斯山之阶梯》，1725）](https://imslp.org/wiki/Gradus_ad_Parnassum_(Fux,_Johann_Joseph))。18 至 21 世纪的许多作曲家都使用过这种方法或它的某种变体。在《Gradus ad Parnassum》的第一部分中，富克斯依次处理了组合两个声部的五种类别，这也将是我们接下来五章的主题。[“Gradus ad Parnassum”练习](07-gradus-ad-parnassum-exercises.md)一章以可编辑的格式提供了《Gradus ad Parnassum》中的全部练习，你可以自己动手试一试。

在进入这五种类别之前，本章先介绍适用于任何类别中线条写作的原则。这些原则建立在[基础乐理](../01-fundamentals/README.md)部分的概念之上，例如[音程](../01-fundamentals/17-intervals.md)和音阶级数。

## 协和与不协和 {#consonance-and-dissonance}

[协和与不协和已在前面的一章中介绍过，](../01-fundamentals/17-intervals.md#consonance-and-dissonance)但在对位中，我们进一步区分：

- 完全协和音程（纯一度、纯五度、纯八度）
- 不完全协和音程（大、小三度与大、小六度）
- 不协和音程（所有二度、七度，以及减音程和增音程）

这些类别总结于下面的谱例 1。

![谱例 1. 完全协和音程、不完全协和音程与不协和音程。](../media/2019/05/Consonance.png)*谱例 1. 完全协和音程、不完全协和音程与不协和音程。*

<!-- lilylet-begin: media/2019/05/Consonance.png -->
```lyl.play
\omit Score.TimeSignature \key c \major \clef "treble" <d d>1^\markup "'Perfect' consonances"
\addlyrics { P1 } | %1
<d a'>1
\addlyrics { P5 } | %2
<d d'>1 \bar "|."
\addlyrics { P8 } | %3
<d f>1^\markup "'Imperfect' consonances"
\addlyrics { m3 } | %4
<f a>1 \bar "||"
\addlyrics { M3 } | %5
<f d'>1
\addlyrics { M6 } | %6
<a' f'>1 \bar "|."
\addlyrics { m6 } | %7
<e f>1^\markup "Dissonances"
\addlyrics { m2 } | %8
<f g>1 \bar "||"
\addlyrics { M2 } | %9
<f e'>1
\addlyrics { M7 } | %10
<g' f'>1 \bar "||"
\addlyrics { m7 } | %11
<f b>1
\addlyrics { A4 } | %12
<b' f'>1 \bar "|."
\addlyrics { d5 } | %13
```
<!-- lilylet-end -->
### 难以界定的纯四度

如同许多调性音乐理论一样，纯四度在类别对位中具有特殊地位，其性质取决于它出现在织体的哪个位置。基本上，当纯四度涉及织体中最低的声部时，它是不协和音程；而当它出现在两个上方声部之间时，则是协和音程。

由于本组类别对位导论只涉及二声部织体，所有四度都会涉及最低的声部，因而都被归为不协和音程。本部分后面的各章将讨论这种不协和的解决，[自然音和声部分](../03-diatonic-harmony/README.md)中的[用终止四六和弦加强终止](../03-diatonic-harmony/05-cadential-64.md)和[作为延长形式的 $^6_4$ 和弦](../03-diatonic-harmony/09-64-chords-as-prolongations.md)两章会进一步讨论这一主题。

## 进行的类型

类别对位也关注旋律线条之间的进行方式（见谱例 2）：

- 反向：两个声部朝相反方向运动（一个上行，另一个下行）
- 同向：两个声部朝同一方向运动（都上行或都下行）
- 平行：两个声部朝同一方向（都上行或都下行）移动相同的距离，使起始与结束的音程属于同一类型（例如平行三度）
- 斜向：一个声部运动，另一个声部停留在同一音高上

🎼 [MuseScore 乐谱](https://musescore.com/user/32728834/scores/26285815)

谱例 2. 不同类型进行的示例。

## 写作定旋律

严格声部进行（即类别对位）的练习，从一条称为定旋律（cantus firmus，意为“固定的声部”或“固定的旋律”；复数作“cantus firmi”）的、写得规范的单线条开始。写作定旋律，让我们有机会锻炼以下基本音乐特性：

- 平稳
- 旋律线条的独立性与完整性
- 多样性
- 运动（朝向一个目标）

谱例 3 收录了富克斯在《Gradus at Parnassum》中使用的全部定旋律：每种调式一条，在此分别置于两个声部的上方和下方。除了借此回顾富克斯所写定旋律的类型，你还可以用它来练习任何类别、任何调式，并把定旋律放在上方或下方声部。

🎼 [MuseScore 乐谱](https://musescore.com/user/30425053/scores/26285584)

谱例 3. 出自《Gradus ad Parnassum》的定旋律。

请注意，在每一条定旋律中，平稳、旋律完整性、多样性和朝向目标的运动这些总体音乐特性，都是通过具体特征体现出来的。以下特征是一切写得规范的定旋律所共有的：

- 长度约为 8–16 个音
- 无节奏（全部是全音符；没有长短之分）
- 以 *do* $(\hat1)$ 开始和结束
- 以级进进入最后的主动音：通常是 *re*–*do* $(\hat2-\hat1)$，有时是 *ti*–*do* $(\hat7-\hat1)$
- 所有音与音之间的进行都是旋律协和音程
- 音域（最低音与最高音之间的音程）不超过十度，通常小于一个八度
- 只有一个高潮（最高点），且通常只在旋律中出现一次
- 从开始到高潮再到结尾，逻辑联系清晰，轮廓平滑
- 以级进为主，但也包含一些跳进（多为小跳）
- 不重复“动机”或“乐汇”
- 任何大跳（四度或更大）之后，都朝相反方向级进
- 不连续跳进超过两次，也不在同一方向上连续跳进（F 调式定旋律除外，其中连续的向下跳进勾勒出一个协和三和弦）
- 导音进行到主音
- 在上述所有情况下都使用导音，包括那些需要升高第七级的“小调”类调式

### 旋律倾向

上面列出的一些特征是严格类别对位所特有的；不过，合在一起看，它们体现了各种风格中旋律的某些一般倾向。

David Huron（2006）指出了西方音乐旋律的五种一般属性，它们与上文列出的感知与认知基本原理相关联，但在具体音乐风格中表现方式略有不同。它们是：

- **音高邻近**（Pitch proximity）：旋律倾向于以级进而非跳进进行，小跳多于大跳。这是平稳与旋律完整性的体现。
- **级进下行**（Step declination）：旋律倾向于以向下级进而非向上级进进行。这可能是目标导向运动的一种体现，因为我们通常把下行感知为能量的下降（朝静止状态运动）。
- **级进惯性**（Step inertia）：旋律改变方向的频率低于沿同一方向继续的频率。（也就是说，大多数旋律进行与前一进行方向相同。）这是平稳、有时也是目标导向运动的体现。
- **旋律回归**（Melodic regression）：处于极端音区的旋律音倾向于向中间回归。这是朝静止位置运动的体现（非极端音代表“静止”）。同时它也体现了旋律中音的统计分布：一个音越高，它下方可供作曲家选择的音就越多，上方的音就越少。
- **旋律拱形**（Melodic arch）：旋律倾向于在乐句前半段上行、达到高潮，然后在后半段下行。这是目标导向以及“静止—运动—静止”模式的体现，也是上述各规则在音乐乐句语境中的组合。

## 旋律写作与和声写作的规则

在类别对位中，我们既写作这样的旋律线条，也把它们组合起来。以下规则适用于所有类别，先讨论已经谈过的旋律问题，然后提出一些我们将在后面各章中重点讨论的和声考量。

### 旋律写作（横向音程）

- 以级进进入每个练习最后的八度/同度（这形成*克劳苏拉·维拉* clausula vera，即“真终止式”）。
- 限制下列情况的数量：
	- 连续重复音：同一个音高连续出现不止一次
	- 非连续重复音：同一个音高在整个练习中出现不止一次
	- 连续跳进：连续出现多个三度或更大的音程（用级进把它们隔开）
	- 非连续跳进：短时间段内跳进的总数，即使它们并不相邻
	- 连续重复的普通音程：即使具体的音程不同（如小二度），音程的大小（如二度）也相同
- 控制旋律高潮（最高音）：
- 力求每个旋律声部恰有一个独一无二的高潮
- 避免结束在那个高潮上
- 最好跳进到达该高潮
- 避免两个声部同时到达各自的高潮音
- 避免下列旋律跳进：
	- 增音程
	- 减音程
	- 任何七度
	- 任何六度，也许上行小六度除外
	- 任何大于八度的音程
- 同时避免勾勒出（谱例 4）：
	- 增音程
	- 减音程
	- 任何七度

![谱例 4. 旋律的勾勒。](../media/2019/05/Outlining-1.png)*谱例 4. 旋律的勾勒。*

<!-- lilylet-begin: media/2019/05/Outlining-1.png -->
```lyl.play
\omit Score.TimeSignature \time 4/4 \key c \major \clef "treble" f4^\markup "Avoid changing direction at the tritone:"_\markup "[" g a b_\markup "] X" | %1
a'4 g a2 \bar "|." | %2
f4^\markup "Continue instead to the 5th:"_\markup "[" g a b | %3
c'4_\markup "]" a b c \bar "|." | %4
d4^\markup "Avoid changing direction at the 7th:"_\markup "[" e f g | %5
a'4 b c_\markup "] X" b \bar "|." | %6
d4^\markup "Continue instead to the 8ve:"_\markup "[" e f g | %7
a'4 b c d_\markup "]" \bar "|." | %8
```
<!-- lilylet-end -->
### 和声写作（纵向音程与声部的组合）

- 第一个音程应为纯一度、纯五度或纯八度，最后一个音程应为纯一度或纯八度（不能是五度）。
- 声部之间的间距最大限于十二度（复五度），大部分情况下限于一个八度。
- 避免声部“重叠”（即名义上的“上方”声部低于“下方”声部）。
- 务必避免：
	- 平行八度：两个声部开始时相距一个八度，朝同一方向移动相同的音程，结束时也相距一个八度
	- 平行五度：两个声部开始时相距一个纯五度，朝同一方向移动相同的音程，结束时也相距一个纯五度
- 也应尽量避免：
	- 直接五度与直接八度：两个声部以任何音程开始，朝同一方向进行到纯五度或纯八度
	- 练习中除第一个和最后一个音程之外任何位置出现同度

## 对位的心理学

关于类别对位的各章不会涉及特定风格（古典、巴洛克、浪漫、流行/摇滚等）。相反，这些练习会搁置配器、旋律动机、曲式结构，乃至许多和声与节奏要素，以便非常集中地处理一小组基本音乐问题。这些基本问题，与听觉感知和认知（即大脑如何感知并理解声音）的某些基本原理在西方音乐结构中如何体现密切相关。

例如，我们的大脑倾向于认为音高或音色相近的声音来自同一音源。我们的大脑还会寻找模式，当一个新的声音延续或完成了先前听到的模式时，我们通常会认为这个新声音与那些声音同属一体。这与人类经验乃至进化中最深植、最基本的某些部分有关。听到规律的模式，通常意味着一个可预测的（因而安全的）环境；而任何变化都可能预示危险，并往往会提高我们对声源的注意。这套把注意力（和肾上腺素）引向最可能需要之处的机制，对人类物种的存续至关重要。在 21 世纪听音乐时，（通常！）并不需要我们留意扑食的动物，但这种进化经验的一部分已经“硬接”在人类聆听心理之中，并在赋予音乐情感效果方面发挥作用——即便是在安全的环境中。

对西方听众来说，仅仅让大脑轻松解析和处理声音的音乐是乏味的——它不要求提高注意，不会加快我们的心跳，不会让我们后颈的汗毛竖起来，也不会给我们一小阵多巴胺的刺激。另一方面，不断激发我们与生俱来的危险感的音乐，对大多数听众来说也算不上悦耳。因此，紧张与松弛、运动与静止之间的平衡，是我们将要学习的大多数音乐的根本所在。

对位的学习帮助我们在严格限定的语境中处理几个重要的音乐“问题”，从而培养可以广泛应用的作曲与分析技能。当我们试图把以下特性结合在一起时，这些问题便出现了：

- 平稳、独立的旋律线条
- 音调融合（偏好同时发响的音构成协和的统一体）
- 多样性
- 运动（朝向一个目标）

这些特性根植于人类的感知与认知，但它们在具体的音乐瞬间常常相互冲突，需要在更长的段落和完整作品的进程中加以平衡。对位将帮助我们开始练习处理这种平衡。

最后，尽管有这些抽象之处，仍最好把对位练习当作微型作品，并把它们演奏出来——用嗓音和乐器，尽可能与同伴一起——这样，耳朵、手指、喉咙，最终还有头脑，才能把音乐线条如何运作、如何结合的声音、样子和手感内化。

> 延伸阅读

- Huron, David. 2006. *Sweet Anticipation: Music and the Psychology of Expectation*. Cambridge, MA: MIT Press.

> 作业

1. 定旋律 A（[.pdf](https://viva.pressbooks.pub/app/uploads/sites/12/2026/07/WK-Cantus-Firmus-A.pdf)）。要求学生为一条定旋律做错误检测，并自己写作一条定旋律。

    <!-- lilylet-begin: media/2026/07/WK-Cantus-Firmus-A.mscz -->
    ```lyl.play
    [composer "Kyle Gullings"]
    [staves "{s1-s2}"]

    \staff "1" \key bf \major \numericTimeSignature \time 2/2 \clef "bass" bf1_\markup "List at least 5 errors in the excerpt above:"_\markup "1. ____________________________________      4. ____________________________________ 2. ____________________________________      5. ____________________________________ 3. ____________________________________" \\
    \staff "2" \clef "bass" f,1_\markup "List at least 10 errors in the excerpt above: (Continue on another page if needed.)"^\markup "Cantus firmus:"^\markup "Intervals:" | %1

    \staff "1" d1 \\
    \staff "2" g1 | %2

    \staff "1" ef1 \\
    \staff "2" a1 | %3

    \staff "1" c1 \\
    \staff "2" a1 | %4

    \staff "1" a1 \\
    \staff "2" bf1 | %5

    \staff "1" ef,1 \\
    \staff "2" f,1 | %6

    \staff "1" c,1 \\
    \staff "2" g1 | %7

    \staff "1" d,1 \\
    \staff "2" a1 | %8

    \staff "1" f,,1 \\
    \staff "2" bf1 | %9

    \staff "1" g,1 \\
    \staff "2" g1 | %10

    \staff "1" ef,1 \\
    \staff "2" c1 | %11

    \staff "1" d,1 \bar "|." \\
    \staff "2" f,1 | %12

    \staff "1" \key a \major \clef "treble" s1 \\
    \staff "2" \clef "treble" b,1^\markup "Cantus firmus:"^\markup "Intervals:"_\markup "(Key: B Minor)"_\markup "(Key: A Major)" | %13

    \staff "1" s1 \\
    \staff "2" as,1 | %14

    \staff "1" s1 \\
    \staff "2" b,1 | %15

    \staff "1" s1 \\
    \staff "2" d,1 | %16

    \staff "1" s1 \\
    \staff "2" cs,1 | %17

    \staff "1" s1 \\
    \staff "2" fs,1 | %18

    \staff "1" s1 \\
    \staff "2" e,1 | %19

    \staff "1" s1 \\
    \staff "2" b,1 | %20

    \staff "1" s1 \\
    \staff "2" cs,1 | %21

    \staff "1" s1 \\
    \staff "2" R1 | %22

    \staff "1" s1 \\
    \staff "2" R1 | %23

    \staff "1" s1 \bar "|." \\
    \staff "2" b,1 | %24
    ```
    <!-- lilylet-end -->

2. 定旋律 B（[.pdf](https://viva.pressbooks.pub/app/uploads/sites/12/2026/07/WK-Cantus-Firmus-B.pdf)）。要求学生为一条定旋律做错误检测，并自己写作一条定旋律。

    <!-- lilylet-begin: media/2026/07/WK-Cantus-Firmus-B.mscz -->
    ```lyl.play
    [composer "Kyle Gullings"]
    [staves "{s1-s2}"]

    \staff "1" \key g \major \numericTimeSignature \time 2/2 \clef "treble" b'1_\markup "List at least 5 errors in the excerpt above:"_\markup "1. ____________________________________      4. ____________________________________ 2. ____________________________________      5. ____________________________________ 3. ____________________________________" \\
    \staff "2" \clef "bass" f,1_\markup "List at least 10 errors in the excerpt above: (Continue on another page if needed.)"^\markup "Cantus firmus:"^\markup "Intervals:" | %1

    \staff "1" g''1 \\
    \staff "2" g1 | %2

    \staff "1" d'1 \\
    \staff "2" a1 | %3

    \staff "1" g''1 \\
    \staff "2" a1 | %4

    \staff "1" fs'1 \\
    \staff "2" bf1 | %5

    \staff "1" e'1 \\
    \staff "2" f,1 | %6

    \staff "1" fs'1 \\
    \staff "2" g1 | %7

    \staff "1" e'1 \\
    \staff "2" a1 | %8

    \staff "1" g''1 \\
    \staff "2" bf1 | %9

    \staff "1" fs'1 \\
    \staff "2" g1 | %10

    \staff "1" g''1 \bar "|." \\
    \staff "2" f,1 | %11

    \staff "1" \key d \major \clef "bass" s1 \\
    \staff "2" \clef "treble" b,1^\markup "Cantus firmus:"^\markup "Intervals:"_\markup "(Key: B Minor)"_\markup "(Key: D Major)" | %12

    \staff "1" s1 \\
    \staff "2" as,1 | %13

    \staff "1" s1 \\
    \staff "2" b,1 | %14

    \staff "1" s1 \\
    \staff "2" d,1 | %15

    \staff "1" s1 \\
    \staff "2" cs,1 | %16

    \staff "1" s1 \\
    \staff "2" fs,1 | %17

    \staff "1" s1 \\
    \staff "2" e,1 | %18

    \staff "1" s1 \\
    \staff "2" b,1 | %19

    \staff "1" s1 \\
    \staff "2" cs,1 | %20

    \staff "1" s1 \\
    \staff "2" R1 | %21

    \staff "1" s1 \\
    \staff "2" R1 | %22

    \staff "1" s1 \bar "|." \\
    \staff "2" b,1 | %23
    ```
    <!-- lilylet-end -->

3. 关于富克斯练习的完整合集，参见 [Gradus ad Parnassum 一章](07-gradus-ad-parnassum-exercises.md)。

### 媒体署名

- Consonance
- Outlining © Mark Gotham，采用 [CC0（知识共享零）](https://creativecommons.org/publicdomain/zero/1.0/)许可协议
