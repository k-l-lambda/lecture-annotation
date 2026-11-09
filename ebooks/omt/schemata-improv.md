# 用加朗特程式即兴一个乐句（句子式）

[古典乐句（句子式）](sentence.md)很适合使用*加朗特*程式。事实上，我们在[总结页](schemataSummary.md)中已把许多程式标为“呈示”程式或“展开”程式。许多四阶段程式往往与呈示乐句常见的旋律配置一同出现：一个基本动机及其变化重复。

以海顿（Haydn）G 大调钢琴奏鸣曲 Hob. XVI:27 第三乐章的开头主题为例。

![海顿 G 大调钢琴奏鸣曲 Hob. XVI:27 第三乐章开头主题](assets/HaydnXVI27.png)

<!-- lilylet-begin: assets/HaydnXVI27.png -->
```lyl.play
[composer "Joseph Haydn"]
[staves "{-}"]

\staff "1" \key g \major \time 2/4 \partial 8 \tempo "Presto" \clef "treble" \stemUp d8-.\mf \\
\staff "2" \clef "bass" r8 | %1

\staff "1" \stemDown g'8(-2[ b-4 d) g,-1-.] \\
\staff "2" \stemDown <g b>4-5 r8 <b d>-. | %2

\staff "1" \stemUp g'4(-3 fs8)[ d-.] \\
\staff "2" \stemDown <a c>4 r | %3

\staff "1" \stemDown a'8(-2[ c e) <a, c>-3-.] \\
\staff "2" r4 r8 \stemDown fs,-. | %4

\staff "1" \stemDown <a' c>4(-4 \stemUp <g b>8)-. \stemDown b-1-. \\
\staff "2" \stemDown g4( \stemUp g,8) r8 \clef "treble" | %5

\staff "1" \stemDown b''8([ g)-4 ds( e)-1] \\
\staff "2" \stemUp g'4-2 r8 g-. | %6

\staff "1" \stemDown a''8([ fs)-4 cs( d!)-1] \\
\staff "2" \stemUp fs4 r8 fs-.-4 | %7

\staff "1" \stemDown e'8-3 g4( cs,8)-2 \\
\staff "2" \stemUp g'4 a \clef "bass" | %8

\staff "1" \partial 4. \stemDown d'4-3\mordent r8 \bar ":|." \\
\staff "2" \stemDown d4(-1 d,8) \bar ":|." | %9
```
<!-- lilylet-end -->
*公有领域乐谱，摘自 [IMSLP](http://www.imslp.org)。点击图片可放大。*

第 1–4 小节（呈示乐句）是 Meyer 程式的一个加花形式。注意两小节的基本动机在第 3–4 小节中重复，并（大体上）向上移高了一级。

第 5–6 小节（展开乐句的开始）是转调的 Passo Indietro 程式的一个加花形式。其后是属调上的一个 **II<sup>6</sup> V<sup>7</sup> I** 终止式。（当然，它过得非常快，很容易听起来像是主调中的一个半终止。）

🎧 [Spotify：海顿 G 大调钢琴奏鸣曲 Hob. XVI:27 第三乐章](https://open.spotify.com/track/5kTdWFxPcUOt9Y45UgGotD)

我们最初的即兴远不会像海顿的这首作品那样精致，但请注意其中几个值得模仿的特点：

- Meyer 的典型旋律音出现在每个强拍上（阶段 1 – 第 1 小节，以此类推）。
- Meyer 阶段 1 和阶段 3 的典型旋律音还出现在小节末尾，紧接在第 2 和第 4 小节中与之对应的音之前。
- 虽然和声节奏保持不变，但从呈示程式转到展开程式时，旋律“块”也相应地从两小节变为一小节。（这就是展开乐句中常见的*碎片化*。）
- 展开乐句在节奏和和声上都很自然地承接了呈示乐句，但两个乐句之间没有明显的动机联系。
- 终止式相对比较程式化。

在这些方面，这个主题都是我们简单即兴练习的范例：在强拍上、和/或在第 1 与第 2 小节、第 3 与第 4 小节之间跨小节线的位置上，突出程式的典型旋律音；在开头使用较有新意的旋律构思，越接近最后的终止式就越程式化；等等。

下面这段视频更详细地讨论了用这些程式即兴一个乐句（句子式）时可能遇到的棘手情况和具体技巧。这段视频着重于呈示乐句，使用的是 Meyer 或 Jupiter 之类的程式。

▶️ [视频：即兴一个呈示乐句](https://vimeo.com/109188050)

# 组合起来

构建一个完整乐句（句子式）的最简单方法，是先用上述四阶段呈示程式之一开头，然后接一个五阶段的 Prinner（以 IAC 结束），或者接某种展开–终止的组合。下面是几个例子。你可以把它们当作骨架，在此基础上即兴；也可以给这些交互式例子加花，尝试写作一个简单的乐句（句子式）。（详见[使用 Trinket](trinket.md)一页。）

## 呈示 – 五阶段 Prinner

下面的框架以一个 Meyer 开头，后接一个五阶段 Prinner。注意 Prinner 的阶段 3 和阶段 4 被压缩进同一个小节，以便与常见的 8 小节乐句（句子式）长度对齐。还要注意，任何呈示程式都可以替换这里的 Meyer。

<!-- trinket: https://trinket.io/embed/music/4ea073d8f1 -->
<div class="omt-trinket" data-trinket="4ea073d8f1"><iframe src="../../../static/trinket/#4ea073d8f1" title="Meyer - 5-phase Prinner" loading="lazy" allow="clipboard-write; fullscreen" allowfullscreen></iframe><a class="omt-trinket-open" href="../../../static/trinket/#4ea073d8f1" target="_blank" rel="noopener">全屏打开 ↗</a></div>
## 呈示 – Passo Indietro – 终止式

古典作曲家常常会开始一个 Prinner，然后将其截短，为最后的终止式腾出空间。下面的例子就是这样做的：以一个 Jupiter 开头，经过一个 Passo Indietro（半个 Prinner），进行到一个复合半终止（Compound HC）。

<!-- trinket: https://trinket.io/embed/music/ee80a49382 -->
<div class="omt-trinket" data-trinket="ee80a49382"><iframe src="../../../static/trinket/#ee80a49382" title="Jupiter – Passo Indietro – Compound HC" loading="lazy" allow="clipboard-write; fullscreen" allowfullscreen></iframe><a class="omt-trinket-open" href="../../../static/trinket/#ee80a49382" target="_blank" rel="noopener">全屏打开 ↗</a></div>
把最后两个小节压缩成一个小节，就可以把它转换成一个以 PAC 结束的乐句（句子式）。（把这两个版本组合起来，还可以构成一个 16 小节的复合主题。）

<!-- trinket: https://trinket.io/embed/music/bcc2fe55de -->
<div class="omt-trinket" data-trinket="bcc2fe55de"><iframe src="../../../static/trinket/#bcc2fe55de" title="Jupiter – Passo Indietro – Compound PAC" loading="lazy" allow="clipboard-write; fullscreen" allowfullscreen></iframe><a class="omt-trinket-open" href="../../../static/trinket/#bcc2fe55de" target="_blank" rel="noopener">全屏打开 ↗</a></div>
## 呈示 – 快速 Prinner – 终止式

我们也可以不用 Passo Indietro（半个 Prinner），而用一个完整的、但速度快一倍的 Prinner。这使旋律在乐句（句子式）的后半部分能有更多运动，从而实现展开乐句中常见的碎片化，以及旋律节奏与和声节奏的加速。

下面是一个由 Sol-Fa-Mi – Prinner – Fa-Fi-Sol HC 构成的乐句（句子式）。

<!-- trinket: https://trinket.io/embed/music/dcdfbf0994 -->
<div class="omt-trinket" data-trinket="dcdfbf0994"><iframe src="../../../static/trinket/#dcdfbf0994" title="Sol-Fa-Mi – Prinner – Fa-Fi-Sol HC" loading="lazy" allow="clipboard-write; fullscreen" allowfullscreen></iframe><span class="omt-trinket-note">原 trinket 未存档，此曲谱据上下文与录音重建</span><a class="omt-trinket-open" href="../../../static/trinket/#dcdfbf0994" target="_blank" rel="noopener">全屏打开 ↗</a></div>
下面是同样的例子，但以一个简单的 PAC 结束。

<!-- trinket: https://trinket.io/embed/music/a63f2a06bc -->
<div class="omt-trinket" data-trinket="a63f2a06bc"><iframe src="../../../static/trinket/#a63f2a06bc" title="Sol-Fa-Mi – Prinner – Simple PAC" loading="lazy" allow="clipboard-write; fullscreen" allowfullscreen></iframe><a class="omt-trinket-open" href="../../../static/trinket/#a63f2a06bc" target="_blank" rel="noopener">全屏打开 ↗</a></div>
# 练习

要练习用这些程式即兴，你可以跟着下面由马克·阿内特（Mark Arnett）制作的 mp3 音频文件一起演奏。每段录音都在 C 大调、单四拍子，左手为阿尔贝蒂低音（Alberti bass），右手为旋律骨架。

## 单个程式

- [Aprile](assets/media/schemata/aprile.mp3)
- [Do–Re–Mi](assets/media/schemata/do-re-mi.mp3)
- [Fonte](assets/media/schemata/fonte.mp3)
- [Jupiter – 原位属和弦](assets/media/schemata/jupiterB.mp3)
- [Jupiter – 转位属和弦](assets/media/schemata/jupiterA.mp3)
- [Meyer](assets/media/schemata/meyer.mp3)
- [Monte](assets/media/schemata/monte.mp3)
- [Pastorella](assets/media/schemata/pastorella.mp3)
- [Prinner（四阶段）](assets/media/schemata/prinner4.mp3)
- [Prinner（五阶段）](assets/media/schemata/prinner5.mp3)
- [转调 Prinner（四阶段）](assets/media/schemata/modulatingPrinner4.mp3)
- [转调 Prinner（五阶段）](assets/media/schemata/modulatingPrinner5.mp3)
- [Sol–Fa–Mi – 阶段二为 II 和弦](assets/media/schemata/sol-fa-miA.mp3)
- [Sol–Fa–Mi – 阶段二为 VII 和弦](assets/media/schemata/sol-fa-miB.mp3)

## 乐句（句子式）程式链

- [Jupiter – Passo Indietro – 复合 HC](assets/media/schemata/Jup-PI-ComHC.mp3)
- [Jupiter – Passo Indietro – 复合 PAC](assets/media/schemata/Jup-PI-ComPAC.mp3)
- [Meyer – 五阶段 Prinner](assets/media/schemata/Meyer-PrinnerB.mp3)
- [Sol–Fa–Mi – Prinner（两小节）– Fa–Fi–Sol HC](assets/media/schemata/SFM-Prinner-FFSHC.mp3)
