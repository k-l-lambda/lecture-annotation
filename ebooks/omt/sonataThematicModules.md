# 奏鸣曲式——主题模块

构成典型二部式奏鸣曲呈示部的四个主题模块（P、TR、S 和 C）形成一个主题轮转，这一轮转在再现部中会再次出现，并常常在展开部中被引用。

## 第一主题模块（P）

P 主题有几项功能：（1）确立主调；（2）呈示主要的旋律材料，以开启主题循环；（3）开始朝向 MC 和 EEC 的运动。

P 主题大多在和声上是封闭的，以 I:PAC 结束，较少见的是以 I:HC 结束。（在较小型的奏鸣曲中，P 可能只是一个不以终止式结束的单独乐句（前乐句或呈示）。）当一个 P 主题以 PAC 结束，而其后又跟随另一个同样以 PAC 结束的主题时，P 模块就包含一个"第一主题群"。第一主题群中的各个主题以下标来区分：P1 和 P2。

P 主题可以呈现任何一种[标准主题类型](classicalThemes.md)（乐句、乐段、混合主题、复合主题），不过乐句（句子式）更为常见。通常，与其他主题模块相比，P 主题相对"紧凑"，包含对主和弦更直接的呈示，乐句偏离也较少。

## 连接部模块（TR）

TR 模块的主要功能作用是推向标志其结束的 MC。这既是一种和声运动，也是一种修辞运动，其特征是_能量积累_。对 TR 模块的分析应当围绕 MC 以及作曲家如何接近它来展开。

### 和声运动

在奏鸣曲中，连接部可以是"转调的"，也可以是"不转调的"。不转调的 TR 将引向 I:HC MC，而转调的 TR 引向 V（或 III）:HC MC。

### 旋律／动机特征

我们将遵循 Hepokoski 和 Darcy 的做法，把 TR 的开始定位在某个乐句的开头。一般来说，一旦你清楚地听到 TR 功能的呈现，就往回追溯到那个乐句的开头，并将其标为 TR 的开始。与第一主题不同，连接部在主题上要"松散"得多。奏鸣曲的这一模块常常与乐句[扩展](internalExpansions.md)和压缩相关联。更一般地说，任何可以与[*展开功能*](sentence.md)相关联的东西也都符合连接部功能：碎片化、清算（liquidation）、旋律节奏或和声节奏的加速等等。

在旋律上，我们把连接部分为（1）_独立型_和（2）_消解型_两类。

_独立型 TR_ 以新的主题材料开始。换言之，它不是以 P 为基础的。

_消解型 TR_ 模块都会取用 P 主题的某一部分，并在该模块积累能量、向 MC 推进的过程中将其消解、瓦解或清算。

* 在_消解型_重述中，P 结束后似乎又重新开始。P 的这次重述消解为 TR 功能，于是我们可以随后把整个主题重新解释为一个消解型重述类型的 TR。
* 在_消解型_后乐句、展开或混合主题中，P 模块由一个主题的开头乐句构成，而该主题的结束乐句会像通常那样开始，但随后瓦解为 TR。
* _消解型_ P 小尾声会引入终止后材料，以巩固 P 结尾处的终止式，而这一终止后材料会消解为 TR 的修辞。

在下面这个选自贝多芬（Beethoven）g 小调钢琴奏鸣曲 Op. 49 No. 1 的例子中，第 15 小节清楚地出现了一个 III:HC MC，并与结构性 HC 重合。往回追溯，注意第 12 小节的展开特征，它表明连接部必然开始于第 9 小节。（记住，我们总是把连接部定在一个乐句的_开头_。）第一主题和连接部都以相同的呈示开始，因此这是一个_转调的_、_消解型的_连接部。作为听者，我们很可能直到第 12 小节——展开开始呈现出与 TR 相关联的特征之处——才会意识到这个连接部是连接部。

**贝多芬 g 小调钢琴奏鸣曲，Op. 49, No. 1，第一乐章**

![贝多芬 Op. 49 No. 1 第一乐章：连接部](assets/form/TR.png)

<!-- lilylet-begin: assets/form/TR.png -->
```lyl.play
[staves "{-}"]

\staff "1" \key bf \major \time 2/4 \partial 8 s8 \\
\staff "1" \clef "treble" \stemUp d8\p \\
\staff "2" \clef "bass" c,8\rest | %1

\staff "1" \stemUp bf'8([ g fs g)] \\
\staff "2" c,8\rest \stemDown <bf' ef>([ <a c> <g bf>)] | %2

\staff "1" \stemUp <d c'>2\mfp \\
\staff "2" \stemDown <fs, a>8[ <d fs> <e g> <fs a>] | %3

\staff "1" \stemUp bf'8([ g fs g)] \\
\staff "2" \stemDown <g bf>8([ <bf d> <a c> <g bf>)] | %4

\staff "1" \stemDown <g' ef'>2\mfp \\
\staff "2" \stemDown c,8[ ef g c] | %5

\staff "1" \stemDown d'8[ fs( g) d(] \\
\staff "2" \stemDown bf4 d,8\rest <bf' d> | %6

\staff "1" \stemDown c'8)[ gs'( a) c,(] \\
\staff "2" \stemDown <fs, d'>4 c8\rest <fs d'> | %7

\staff "1" \clef "treble" \stemDown bf'8)([ g' a, ef')] \\
\staff "2" \clef "bass" \stemDown <g d'>4 <c, c'> | %8

\staff "1" \stemUp g'8.([ a32 g] fs8) d \\
\staff "2" \stemDown <d, bf'>4(~ <d a'>8 d\rest | %9

\staff "1" \stemUp bf'8([ g fs g)] \\
\staff "2" d,8\rest \stemDown <bf' ef>([ <a c> <g bf>)] | %10

\staff "1" \stemUp <d c'>2\mfp \\
\staff "2" \stemDown <fs, a>8([ <d fs> <e g> <fs a>] | %11

\staff "1" \stemUp bf'8([ g fs g)] \\
\staff "2" \stemDown <g bf>8([ <bf ef> <a c> <g bf>)] | %12

\staff "1" \stemDown ef'4.\fp ef8( \\
\staff "2" \stemUp c,8[ ef g a] \\
\staff "2" \stemDown c,4. c8 | %13

\staff "1" \stemDown ef'16[_\markup "cresc." d f e] g[ f ef d)] \\
\staff "2" s4 r8 \stemUp f, \\
\staff "2" \stemDown <d, bf'>4 s8 d | %14

\staff "1" \grace { c'16[( d e] } \stemDown d8\p[ c)] \grace { b16[( c d] } c8[ bf)] \\
\staff "2" \stemUp g8[ c] g[ c] \\
\staff "2" \stemDown ef,4 e | %15

\staff "1" \grace { a'16[( bf c] } \stemUp bf16[ a g f] e[ f g f)] \\
\staff "2" \stemDown f,4 r \\
\staff "2" \stemUp c4 s | %16

\staff "1" \stemUp ef'8(_\markup "dolce"[ a, a-. a)-.] \\
\staff "2" \stemDown a16[ f' c f] ef[ f c f] | %17

\staff "1" \stemDown bf'8.\turn([ d16] f8) f \\
\staff "2" \stemDown d16[ f bf, f'] d[ f bf, f'] | %18

\staff "1" \stemDown ef''8([ a,) a-.( a)-.] \\
\staff "2" \stemDown a16[ f' c f] ef[ f c f] | %19
```
<!-- lilylet-end -->

🎧 [Spotify：贝多芬 g 小调钢琴奏鸣曲 Op. 49 No. 1，第一乐章](https://open.spotify.com/track/5NSEaoEaSNdD3XQM54e0C6)

## 第二主题模块（S）

_S_ 位于奏鸣曲的副调中，其首要功能是引向该调中的 PAC——即_呈示部结构性终止（EEC）_。由于它与这一核心和声事件（以及它在再现部中的对应终止式 ESC）的关系，S 模块在奏鸣曲式乐章中极为重要，也极具研究价值。Hepokoski 和 Darcy 甚至说，"S 中发生的事情使奏鸣曲成为奏鸣曲"（第 117 页）。由于 EEC 在结构上如此重要，它的到来常常被大大推迟并加以戏剧化。

在主题上，S 主题比 P 主题松散得多。常见的是延长的展开和扩充的终止段落，所有这些都是为了将最终到达 EEC 的过程戏剧化。

需要注意的是，新的旋律材料_并不是_ S 的必要条件。事实上，许多奏鸣曲——尤其是海顿（Haydn）所作的那些——其 S 主题与 P 主题相似。（这类奏鸣曲称为单主题奏鸣曲。）

## 结束模块（C）

C 的决定性特征是：它跟随在 EEC 之后，并且它不是 S。C 模块可以呈示全新的主题材料，也可以借用 P 或 TR 的材料。按照定义，它们不能以 S 为基础，因为那将是 S 的延续。（请记住，EEC 必须引向新的材料，否则 S 模块仍在继续，EEC 也就尚未到达。）

C 模块总是位于副调中。它是终止后的，呈示部的和声目标已经达成。如果 C 去往别处，它就不是 C。

## 再现连接（RT）

再现连接就像流行／摇滚或布鲁斯音乐中的_回转（turnaround）_。它是主调中的一个属和弦或属到达，为在呈示部反复开头回到主调做准备。RT 与回转的区别在于，RT 跟随在一次转调之后。当 RT 跟随在 V 这一副调之后时，它通过重复、旋律装饰或加入和弦七音，把 V 调中的 I 转变为 I 调中的 V。
