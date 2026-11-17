---
title: "装饰音"
slug: "embellishing-tones"
source: "https://viva.pressbooks.pub/openmusictheory/chapter/embellishing-tones/"
authors: ["John Peterson"]
license: "CC BY-SA 4.0"
modified: "2025-08-01"
---

# 装饰音

> **要点**
>
> - 装饰音可以分为三类（总结见谱例 13）：
> 	- 只涉及级进的：经过音、辅助音
> 	- 涉及跳进的：倚音、逃逸音
> 	- 涉及静止音的：延留音、倚留音、踏板音、先现音

[本章播放列表](https://open.spotify.com/playlist/3EmB4b8iSoA2O9uHxlffru?si=b4c1b91b2d454171)

## 概述

谱例 1 复现了玛丽亚·希曼诺夫斯卡的第六进行曲，我们在[关于强前属和弦的讨论](03-strong-predominants.md)中同样见过它。你也许注意到，第 8–10 小节低音中的一些音不符合我们的和声分析。这些音在谱例 1 中用蓝色并加圈标出，它们统称为“装饰音”（embellishing tones），因为它们装饰了属于和弦的音。装饰音可以分为三类，下面分别说明。

🎼 [MuseScore 乐谱](https://musescore.com/user/32728834/scores/6233992)

<!-- embed-begin: https://musescore.com/user/32728834/scores/6233992 -->
<div class="omt-switch" data-omt-switch>
<div class="omt-switch-bar" role="tablist"><button type="button" role="tab" aria-selected="true" data-pane="lilylet">Lilylet 乐谱</button><button type="button" role="tab" aria-selected="false" data-pane="musescore">MuseScore</button><span class="omt-switch-note">由 MuseScore 页面自动转写（仅第一页），未逐小节核对；部分小节时值存疑。</span></div>
<div class="omt-switch-pane" role="tabpanel" data-pane="lilylet" markdown="1">

```lyl.play
[staves "{-}"]

\staff "1" \key d \major \numericTimeSignature \time 2/4 \partial 8 \clef "treble" s8 \\
\staff "2" \clef "bass" \stemUp a16.[ a32] \\
\staff "2" \stemDown a,16.[ a32] | %1

\staff "1" s2 \\
\staff "2" \stemUp <fs, d'>8[ a16. a32] <fs d'>8[ <a fs'>8] \\
\staff "2" \stemDown <d,, d'>8[ a'16. a32] <d, d'>8 r8 | %2

\staff "1" s4 s8 <d fs>16[ <e g>16] \\
\staff "2" \stemUp <fs, d'>8[ a16. a32] <fs d'>8 r8 \\
\staff "2" \stemDown <d,, d'>8[ a'16. a32] <d, d'>8 r8 | %3

\staff "1" <fs a>8-![ <d fs>16 <e g>16] <fs a>8[ <d a' d>8] \\
\staff "2" d,8[ d,8] d'8[ fs8->] | %4

\staff "1" <g' b>8-![ <e g>16 <fs a>16] <g b>8[ <e b' e>8] \\
\staff "2" g8[ g,8] g'8[ gs8->] | %5

\staff "1" <a' cs>8[ <a cs>16 <b d>16] <cs e>8[ <a e' a>8] \\
\staff "2" a8[ a,8] a'8[ cs8->] | %6

\staff "1" <d' fs>8[ <a e'>8] <fs d'>8 <d fs>16[ <e g>16] \\
\staff "2" d8-.[ a8-.] d,8 r8 | %7

\staff "1" <fs a>8 <d fs>4 <d a' d>8 \\
\staff "2" d,8[ \grace { d,8 } d'16 cs16] d16[ e16 fs16 d16] | %8

\staff "1" <g' b>8 <e g>4 <e g e'>8~ \\
\staff "2" <g g>8[ \grace { g,8 } g'16 fs16] g16[ a16 b16 g16] | %9

\staff "1" <e a cs>8 <e' g a>4 <g a e'>8 \\
\staff "2" <a a>8[ a16 gs16] a16[ b16 cs16 a16] | %10

\staff "1" <fs' d'>8[ <fs d'>16 <fs d'>16] <fs d'>8 s8 \\
\staff "2" <d, d d'>8[ <d d'>16 <d d'>16] <d d'>8 s8 | %11
```

</div>
<div class="omt-switch-pane omt-embed omt-embed-musescore" role="tabpanel" data-pane="musescore" hidden><iframe data-src="https://musescore.com/user/32728834/scores/6233992/embed" title="MuseScore" loading="lazy" style="height: 700px" allow="autoplay; fullscreen" allowfullscreen></iframe></div>
</div>
<!-- embed-end -->

谱例 1. 玛丽亚·希曼诺夫斯卡《六首进行曲》第六进行曲中的装饰音（[0:00-0:16](https://open.spotify.com/track/1TUAHxfFiza4bVjpOFBOrM?si=5f616a08580b4d3d)）。

![谱例 2. 大多数装饰音常见的三音布局。](../media/2020/07/Generic_Embellishing_Tone_Layout.png)*谱例 2. 大多数装饰音常见的三音布局。*

<!-- lilylet-begin: media/2020/07/Generic_Embellishing_Tone_Layout.png -->
```lyl.play
\numericTimeSignature \time 3/4 \key c \major \clef "treble" \stemUp b'4_\markup "consonant with bass" b^\markup "embellishing tone (consonant or dissonant)" b_\markup "consonant with bass" \bar "||" | %1
```
<!-- lilylet-end -->
在几乎所有情况下，装饰音都是一个三音音型的中间音，而这个音型的第一个音与最后一个音都与低音协和（谱例 2）。装饰音本身与低音可能协和，也可能不协和。但在几乎所有情况下，装饰音都是一个不属于底层和弦的音。

## 经过音与辅助音：级进移动的装饰音

谱例 1 展示了两种级进移动的装饰音：经过音（PT）和辅助音（NT）。经过音以级进进入，再以级进向*同一方向*离开，可以上行也可以下行（谱例 3）。辅助音以级进进入，再以级进向*相反方向*离开，形成上辅助音或下辅助音（谱例 4）。

🎼 [MuseScore 乐谱](https://musescore.com/user/32728834/scores/6234000)

<!-- embed-begin: https://musescore.com/user/32728834/scores/6234000 -->
<div class="omt-switch" data-omt-switch>
<div class="omt-switch-bar" role="tablist"><button type="button" role="tab" aria-selected="true" data-pane="lilylet">Lilylet 乐谱</button><button type="button" role="tab" aria-selected="false" data-pane="musescore">MuseScore</button><span class="omt-switch-note">由 MuseScore 页面自动转写（仅第一页），未逐小节核对。</span></div>
<div class="omt-switch-pane" role="tabpanel" data-pane="lilylet" markdown="1">

```lyl.play
[staves "{-}"]

\staff "1" \key c \major \numericTimeSignature \time 4/4 \clef "treble" e'4 d4 c2 \\
\staff "2" \clef "bass" c,1 | %1

\staff "1" s1 \\
\staff "2" s1 | %2

\staff "1" c'4 d4 e2 \\
\staff "2" c,1 | %3
```

</div>
<div class="omt-switch-pane omt-embed omt-embed-musescore" role="tabpanel" data-pane="musescore" hidden><iframe data-src="https://musescore.com/user/32728834/scores/6234000/embed" title="MuseScore" loading="lazy" style="height: 394px" allow="autoplay; fullscreen" allowfullscreen></iframe></div>
</div>
<!-- embed-end -->

谱例 3. 二声部织体中的经过音：(a) 上行；(b) 下行。

🎼 [MuseScore 乐谱](https://musescore.com/user/32728834/scores/6234003)

<!-- embed-begin: https://musescore.com/user/32728834/scores/6234003 -->
<div class="omt-switch" data-omt-switch>
<div class="omt-switch-bar" role="tablist"><button type="button" role="tab" aria-selected="true" data-pane="lilylet">Lilylet 乐谱</button><button type="button" role="tab" aria-selected="false" data-pane="musescore">MuseScore</button><span class="omt-switch-note">由 MuseScore 页面自动转写（仅第一页），未逐小节核对。</span></div>
<div class="omt-switch-pane" role="tabpanel" data-pane="lilylet" markdown="1">

```lyl.play
[staves "{-}"]

\staff "1" \key c \major \numericTimeSignature \time 4/4 \clef "treble" e4 f4 e2 \\
\staff "2" \clef "bass" c,1 | %1

\staff "1" s1 \\
\staff "2" s1 | %2

\staff "1" c4 b4 c2 \\
\staff "2" c,1 | %3
```

</div>
<div class="omt-switch-pane omt-embed omt-embed-musescore" role="tabpanel" data-pane="musescore" hidden><iframe data-src="https://musescore.com/user/32728834/scores/6234003/embed" title="MuseScore" loading="lazy" style="height: 394px" allow="autoplay; fullscreen" allowfullscreen></iframe></div>
</div>
<!-- embed-end -->

谱例 4. 二声部织体中的 (a) 上辅助音与 (b) 下辅助音。

## 倚音与逃逸音：涉及跳进的装饰音

**谱例 5** 和 **6** 展示了两种涉及跳进的装饰音：倚音（APP）和逃逸音（ET）。倚音以*跳进进入、级进离开*，离开的方向与进入相反（谱例 7）。倚音通常出现在比它前后音更强的拍子位置上。逃逸音以*级进进入、跳进离开*，离开的方向与进入相反（谱例 8）。逃逸音通常出现在比它前后音更弱的拍子位置上。倚音和逃逸音向下离开（谱例 7a 和 8a）比向上离开（7b 和 8b）更常见。

🎼 [MuseScore 乐谱](https://musescore.com/user/32728834/scores/6234074)

<!-- embed-begin: https://musescore.com/user/32728834/scores/6234074 -->
<div class="omt-switch" data-omt-switch>
<div class="omt-switch-bar" role="tablist"><button type="button" role="tab" aria-selected="true" data-pane="lilylet">Lilylet 乐谱</button><button type="button" role="tab" aria-selected="false" data-pane="musescore">MuseScore</button><span class="omt-switch-note">由 MuseScore 页面自动转写（仅第一页），未逐小节核对。</span></div>
<div class="omt-switch-pane" role="tabpanel" data-pane="lilylet" markdown="1">

```lyl.play
[staves ",,,"]

\key ef \major \numericTimeSignature \time 4/4 \clef "treble" c2. ef4 \\\
\clef "treble" g8[ ef'8 c8 ef8] g,8[ ef'8 c8 ef8] \\\
\clef "alto" ef,1 \\\
\clef "bass" r4 c4 c,4 c4 | %1

d2. f4 \\\
g8[ d'8 b8 d8] g,8[ d'8 b8 d8] \\\
f,1 \\\
r4 g4 b4 g4 | %2

ef4 ef16[ d16 ef16 f16] g4 c,4 \\\
g8[ ef'8 c8 ef8] g,8[ ef'8 c8 ef8] \\\
g1 \\\
c2 r4 ef,4 | %3

ef8[ d8] c2 b4 \\\
af8[ c8 af8 c8] g8[ c8 g8 ef'8] \\\
af2 g4 g4 \\\
f,4 f4 g4 g,4 | %4

c2 r2 \\\
ef8[ f8 g8 af8] g8[ ef8 f8 d8] \\\
c8[ d8 ef8 f8] ef8[ c8 d8 b8] \\\
c,2. g'4 | %5
```

</div>
<div class="omt-switch-pane omt-embed omt-embed-musescore" role="tabpanel" data-pane="musescore" hidden><iframe data-src="https://musescore.com/user/32728834/scores/6234074/embed" title="MuseScore" loading="lazy" style="height: 600px" allow="autoplay; fullscreen" allowfullscreen></iframe></div>
</div>
<!-- embed-end -->

谱例 5. 约瑟夫·布洛涅第四弦乐四重奏第一乐章第 5–9 小节中的一个倚音（[0:09-0:19](https://open.spotify.com/track/1ULeiOZtuBKhTKiWYZtghD?si=103ca4ed79484673)）。

🎼 [MuseScore 乐谱](https://musescore.com/user/32728834/scores/6234078)

<!-- embed-begin: https://musescore.com/user/32728834/scores/6234078 -->
<div class="omt-switch" data-omt-switch>
<div class="omt-switch-bar" role="tablist"><button type="button" role="tab" aria-selected="true" data-pane="lilylet">Lilylet 乐谱</button><button type="button" role="tab" aria-selected="false" data-pane="musescore">MuseScore</button><span class="omt-switch-note">由 MuseScore 页面自动转写（仅第一页），未逐小节核对。</span></div>
<div class="omt-switch-pane" role="tabpanel" data-pane="lilylet" markdown="1">

```lyl.play
[staves ",{-}"]

\key ef \major \numericTimeSignature \time 4/4 \clef "treble" ef4. f8 g4 ef4 \\\
\staff "1" \clef "treble" g8[ bf8 ef8 bf8] g8[ bf8 ef8 bf8] \\
\staff "2" \clef "bass" ef,,2 ef'2 | %1

af'4 c4 bf2 \\\
\staff "1" af8[ c8 ef8 c8] g8[ bf8 ef8 bf8] \\
\staff "2" ef,,2 ef'2 | %2

ef'4. c8 bf4. g8 \\\
\staff "1" af8[ c8 ef8 c8] g8[ bf8 ef8 bf8] \\
\staff "2" af,2 bf2 | %3

f8[ ef8 f8 g8] ef2 \\\
\staff "1" f,8[ af8 d8 af8] g8[ bf8 ef8 bf8] \\
\staff "2" bf,,4 bf'4 ef,4 ef'4 | %4
```

</div>
<div class="omt-switch-pane omt-embed omt-embed-musescore" role="tabpanel" data-pane="musescore" hidden><iframe data-src="https://musescore.com/user/32728834/scores/6234078/embed" title="MuseScore" loading="lazy" style="height: 600px" allow="autoplay; fullscreen" allowfullscreen></iframe></div>
</div>
<!-- embed-end -->

谱例 6. 玛格丽特·卡森《布谷鸟》中的一个逃逸音。

🎼 [MuseScore 乐谱](https://musescore.com/user/32728834/scores/6234081)

<!-- embed-begin: https://musescore.com/user/32728834/scores/6234081 -->
<div class="omt-switch" data-omt-switch>
<div class="omt-switch-bar" role="tablist"><button type="button" role="tab" aria-selected="true" data-pane="lilylet">Lilylet 乐谱</button><button type="button" role="tab" aria-selected="false" data-pane="musescore">MuseScore</button><span class="omt-switch-note">由 MuseScore 页面自动转写（仅第一页），未逐小节核对。</span></div>
<div class="omt-switch-pane" role="tabpanel" data-pane="lilylet" markdown="1">

```lyl.play
[staves "{-}"]

\staff "1" \key c \major \numericTimeSignature \time 2/4 \clef "treble" g'2 \\
\staff "2" \clef "bass" c,2 | %1

\staff "1" c'4 b4 \\
\staff "2" g,2 | %2

\staff "1" s2 \\
\staff "2" s2 | %3

\staff "1" d'2 \\
\staff "2" g2 | %4

\staff "1" b'4 c4 \\
\staff "2" c,2 | %5
```

</div>
<div class="omt-switch-pane omt-embed omt-embed-musescore" role="tabpanel" data-pane="musescore" hidden><iframe data-src="https://musescore.com/user/32728834/scores/6234081/embed" title="MuseScore" loading="lazy" style="height: 394px" allow="autoplay; fullscreen" allowfullscreen></iframe></div>
</div>
<!-- embed-end -->

谱例 7. 二声部织体中的倚音。

🎼 [MuseScore 乐谱](https://musescore.com/user/32728834/scores/6234083)

<!-- embed-begin: https://musescore.com/user/32728834/scores/6234083 -->
<div class="omt-switch" data-omt-switch>
<div class="omt-switch-bar" role="tablist"><button type="button" role="tab" aria-selected="true" data-pane="lilylet">Lilylet 乐谱</button><button type="button" role="tab" aria-selected="false" data-pane="musescore">MuseScore</button><span class="omt-switch-note">由 MuseScore 页面自动转写（仅第一页），未逐小节核对。</span></div>
<div class="omt-switch-pane" role="tabpanel" data-pane="lilylet" markdown="1">

```lyl.play
[staves "{-}"]

\staff "1" \key c \major \numericTimeSignature \time 2/4 \clef "treble" c'4. d8 \\
\staff "2" \clef "bass" c,2 | %1

\staff "1" b'2 \\
\staff "2" g2 | %2

\staff "1" s2 \\
\staff "2" s2 | %3

\staff "1" c'4. b8 \\
\staff "2" c,2 | %4

\staff "1" d'2 \\
\staff "2" g2 | %5
```

</div>
<div class="omt-switch-pane omt-embed omt-embed-musescore" role="tabpanel" data-pane="musescore" hidden><iframe data-src="https://musescore.com/user/32728834/scores/6234083/embed" title="MuseScore" loading="lazy" style="height: 394px" allow="autoplay; fullscreen" allowfullscreen></iframe></div>
</div>
<!-- embed-end -->

谱例 8. 二声部织体中的逃逸音。

## 延留音、先现音与踏板音：涉及静止音的装饰音

**谱例 9–****11** 展示了涉及静止音（即不移动的音）的四类装饰音中的三类：延留音（SUS）、倚留音（RET）和踏板音（PED）。第四类装饰音——先现音——值得在下面专门说明。

延留音由一个静止音进入、级进下行离开；倚留音则由一个静止音进入、级进上行离开（谱例 9 和 10）。延留音和倚留音总是位于比前后音更强的拍子位置上。（延留音在[第四类对位一章](../02-counterpoint/05-fourth-species-counterpoint.md)中有更详细的讨论。）

踏板音常见于低音。它由一系列静止音构成，位于不包括低音在内的和弦变化之下。我们通常用踏板音所在的音阶级数来标记它，如谱例 11 所示。

🎼 [MuseScore 乐谱](https://musescore.com/user/32728834/scores/6234088)

<!-- embed-begin: https://musescore.com/user/32728834/scores/6234088 -->
<div class="omt-switch" data-omt-switch>
<div class="omt-switch-bar" role="tablist"><button type="button" role="tab" aria-selected="true" data-pane="lilylet">Lilylet 乐谱</button><button type="button" role="tab" aria-selected="false" data-pane="musescore">MuseScore</button><span class="omt-switch-note">由 MuseScore 页面自动转写（仅第一页），未逐小节核对。</span></div>
<div class="omt-switch-pane" role="tabpanel" data-pane="lilylet" markdown="1">

```lyl.play
[staves ",,,"]

\key ef \major \numericTimeSignature \time 4/4 \clef "treble" ef8-.[ g8 af8 c8] bf4. d,8 \\\
\clef "treble" ef'4 r4 r8 af,,4 af8 \\\
\clef "alto" g4 r4 r8 f4 f8 \\\
\clef "bass" ef,4 r4 bf4 bf'4 | %1

ef8-.[ g8 af8 c8] bf4. d,8 \\\
g4 r4 r8 af4 af8 \\\
ef,4 r4 r8 f4 f8 \\\
ef,4 r4 bf4 bf'4 | %2

d2 ef4 r4 \\\
af2 g4 r4 \\\
f,2 ef4 r4 \\\
ef,4 bf4 ef,4 r4 | %3
```

</div>
<div class="omt-switch-pane omt-embed omt-embed-musescore" role="tabpanel" data-pane="musescore" hidden><iframe data-src="https://musescore.com/user/32728834/scores/6234088/embed" title="MuseScore" loading="lazy" style="height: 600px" allow="autoplay; fullscreen" allowfullscreen></iframe></div>
</div>
<!-- embed-end -->

谱例 9. 约瑟夫·布洛涅第四弦乐四重奏第一乐章第 47–49 小节中的延留音与一个倚留音（[1:30–1:36](https://open.spotify.com/track/1ULeiOZtuBKhTKiWYZtghD?si=224f011bf61f4cdd)）。

🎼 [MuseScore 乐谱](https://musescore.com/user/32728834/scores/6234093)

<!-- embed-begin: https://musescore.com/user/32728834/scores/6234093 -->
<div class="omt-switch" data-omt-switch>
<div class="omt-switch-bar" role="tablist"><button type="button" role="tab" aria-selected="true" data-pane="lilylet">Lilylet 乐谱</button><button type="button" role="tab" aria-selected="false" data-pane="musescore">MuseScore</button><span class="omt-switch-note">由 MuseScore 页面自动转写（仅第一页），未逐小节核对。</span></div>
<div class="omt-switch-pane" role="tabpanel" data-pane="lilylet" markdown="1">

```lyl.play
[staves "{-}"]

\staff "1" \key c \major \numericTimeSignature \time 2/4 \clef "treble" c'2~ \\
\staff "2" \clef "bass" c,2 | %1

\staff "1" c'4 b4 \\
\staff "2" g2 | %2

\staff "1" s2 \\
\staff "2" s2 | %3

\staff "1" b'2~ \\
\staff "2" g2 | %4

\staff "1" b'4 c4 \\
\staff "2" c,2 | %5
```

</div>
<div class="omt-switch-pane omt-embed omt-embed-musescore" role="tabpanel" data-pane="musescore" hidden><iframe data-src="https://musescore.com/user/32728834/scores/6234093/embed" title="MuseScore" loading="lazy" style="height: 394px" allow="autoplay; fullscreen" allowfullscreen></iframe></div>
</div>
<!-- embed-end -->

谱例 10. 二声部织体中的 (a) 延留音与 (b) 倚留音。

🎼 [MuseScore 乐谱](https://musescore.com/user/32728834/scores/6234090)

<!-- embed-begin: https://musescore.com/user/32728834/scores/6234090 -->
<div class="omt-switch" data-omt-switch>
<div class="omt-switch-bar" role="tablist"><button type="button" role="tab" aria-selected="true" data-pane="lilylet">Lilylet 乐谱</button><button type="button" role="tab" aria-selected="false" data-pane="musescore">MuseScore</button><span class="omt-switch-note">由 MuseScore 页面自动转写（仅第一页），未逐小节核对；部分小节时值存疑。</span></div>
<div class="omt-switch-pane" role="tabpanel" data-pane="lilylet" markdown="1">

```lyl.play
[staves ",{-}"]

\key c \major \defaultTimeSignature \time 4/4 \clef "treble" r2 r8 g'8 f'8. e16 \\\
\staff "1" \clef "treble" <b d g>4 <g' g'>8.[ <g g'>16] <g g'>8 g8[ f'8. e16] \\
\staff "2" \clef "bass" g4 <g,, g'>8.[ <g g'>16] <g g'>4 r8. g''16~ | %1

d'4 c4 b4 a4 \\\
\staff "1" <g' d'>4 <g c>4 <f b>4 <f a>4 \\
\staff "2" <g f'>4 <g e'>4 <g d'>4 <g c>4 | %2

g'2. s4 \\\
\staff "1" g'4. f2 \grace { b8 } a8 <f g>4 \\
\staff "2" \stemUp b4. c8 s2 \\
\staff "2" \stemDown g2 <g b>8[ <g, g'>16 <g g'>16] <g g'>8[ <g g'>8] | %3
```

</div>
<div class="omt-switch-pane omt-embed omt-embed-musescore" role="tabpanel" data-pane="musescore" hidden><iframe data-src="https://musescore.com/user/32728834/scores/6234090/embed" title="MuseScore" loading="lazy" style="height: 600px" allow="autoplay; fullscreen" allowfullscreen></iframe></div>
</div>
<!-- embed-end -->

谱例 11. 约瑟芬·朗（Josephine Lang）《致国王之子》（“Dem Königs-Sohn”）第 16–18 小节中的踏板音。

与延留音、倚留音和踏板音一样，先现音也涉及静止音。但先现音是两音（而非三音）音型，其中一个和弦音提前以和弦外音的形式出现（谱例 12）。换言之，它“预先呈现”了自己随后将加入的和弦。

🎼 [MuseScore 乐谱](https://musescore.com/user/32728834/scores/23270794)

<!-- embed-begin: https://musescore.com/user/32728834/scores/23270794 -->
<div class="omt-switch" data-omt-switch>
<div class="omt-switch-bar" role="tablist"><button type="button" role="tab" aria-selected="true" data-pane="lilylet">Lilylet 乐谱</button><button type="button" role="tab" aria-selected="false" data-pane="musescore">MuseScore</button><span class="omt-switch-note">由 MuseScore 页面自动转写（仅第一页），未逐小节核对；部分小节时值存疑。</span></div>
<div class="omt-switch-pane" role="tabpanel" data-pane="lilylet" markdown="1">

```lyl.play
[staves ",{-}"]

\key gf \major \defaultTimeSignature \time 4/4 \clef "treble" \tempo 4 = 80 f2.. ef8 \\\
\staff "1" \clef "treble" <cf ef af cf>2 <bf d af' bf>4. <bf bf'>8 \\
\staff "2" \clef "bass" \grace { bf,,8 } <bf' f' af>2 <bf, bf' f' af>2 | %1

ef2 r2 \\\
\staff "1" <ef g>2 <c c'>8[ <bf bf'>8 <af af'>8 <g g'>8] <bf d>2 <f f'>4 <f f'>8[ <bf bf'>8] \\
\staff "2" ef,,8[ bf'8 ef8 bf8] af8[ bf8 a8 bf8] | %2
```

</div>
<div class="omt-switch-pane omt-embed omt-embed-musescore" role="tabpanel" data-pane="musescore" hidden><iframe data-src="https://musescore.com/user/32728834/scores/23270794/embed" title="MuseScore" loading="lazy" style="height: 600px" allow="autoplay; fullscreen" allowfullscreen></iframe></div>
</div>
<!-- embed-end -->

谱例 12. 约瑟芬·朗《回忆》（“Erinnerung”）第 29–30 小节中的一个先现音（[1:54–1:59](https://open.spotify.com/track/7KZZNqiUr7Uc3JlSH9rMyU?si=77cfde3110a343b6)）。

## 总结 {#summary}

谱例 13 的表格总结了本章所讨论的装饰音。

| 类别 | 装饰音 | 进入方式 | 离开方式 | 方向 | 补充说明 |
| --- | --- | --- | --- | --- | --- |
| 涉及级进 | 经过音（PT） | 级进 | 级进 | 同向 | 可上行或下行 |
| 辅助音（NT） | 级进 | 级进 | 反向 | 上、下辅助音都有 |
| 涉及跳进 | 倚音（APP） | 跳进 | 级进 | 反向 | 倚音通常位于较强的拍子位置 |
| 逃逸音（ET） | 级进 | 跳进 | 反向 | 逃逸音通常位于较弱的拍子位置 |
| 涉及静止音 | 延留音（SUS） | 静止音 | 级进 | 下行 | 延留音总是位于较强的拍子位置 |
| 倚留音 | 静止音 | 级进 | 上行 | 倚留音总是位于较强的拍子位置 |
| 踏板音（*x̂* Ped） | 静止音 | 静止音 | 无 |  |
| 先现音（ANT） | 无 | 静止音 | 无 | 先现音通常位于较弱的拍子位置 |

谱例 13. 装饰音总结。

> 作业

1. 装饰音（.[pdf](https://viva.pressbooks.pub/app/uploads/sites/12/2021/07/WK-Embellishing-Tones.pdf)）。要求学生在二声部织体中写作装饰音，并为选段标出装饰音。[练习表录音](../media/2025/01/johnson-cotillions-william.mp3)

    <!-- lilylet-begin: media/2025/01/WK-embellishing-tones.mscz -->
    ```lyl.play
    [composer "John Peterson"]
    [staves "{s1-s2}"]
    [measures "2*[1..25], 2*[26..34]"]

    \staff "1" \key d \major \time 2/4 \clef "treble" s2 \\
    \staff "2" \clef "bass" \stemDown d,2^\markup "1" | %1

    \staff "1" s2 \bar "||" \\
    \staff "2" \stemDown fs,2 | %2

    \staff "1" \key e \major s2 \\
    \staff "2" \stemDown gs2^\markup "2" | %3

    \staff "1" s2 \bar "||" \\
    \staff "2" \stemUp cs,2 | %4

    \staff "1" \key bf \major s2 \\
    \staff "2" \stemDown ef,2^\markup "3" | %5

    \staff "1" s2 \bar "||" \\
    \staff "2" \stemDown f,2 | %6

    \staff "1" \key f \major s2 \\
    \staff "2" \stemDown bf2^\markup "4" | %7

    \staff "1" s2 \bar "||" \\
    \staff "2" \stemDown g2 | %8

    \staff "1" \key df \major s2 \\
    \staff "2" \stemDown df,2^\markup "5" | %9

    \staff "1" s2 \bar "||" \\
    \staff "2" \stemDown af2 | %10

    \staff "1" \key a \major s2 \\
    \staff "2" \stemDown a2^\markup "6" | %11

    \staff "1" s2 \bar "||" \\
    \staff "2" \stemDown fs,2 | %12

    \staff "1" \key g \major s2 \\
    \staff "2" \stemDown a2^\markup "7" | %13

    \staff "1" s2 \bar "||" \\
    \staff "2" \stemDown b2 | %14

    \staff "1" \key ef \major s2 \\
    \staff "2" \stemDown f,2^\markup "8" | %15

    \staff "1" s2 \bar "||" \\
    \staff "2" \stemDown ef,2 | %16

    \staff "1" \key c \major \time 6/8 \stemUp g'16[ f^\markup "◯"^\markup "1. ____"] \\
    \staff "2" r8 | %17

    \staff "1" \stemUp e8\ff[ g c] \stemDown c[ b^\markup "2. ____" a^\markup "◯"] \\
    \staff "2" \stemDown c,8[ e g] c,[ e g] | %18

    \staff "1" \stemDown b'8[ d f] f[ g a^\markup "3. ____"] \\
    \staff "2" \stemUp g,8[ d' g] g,[ d' g] | %19

    \staff "1" \stemDown g''8^\markup "◯"[ e c] a[ d c] \\
    \staff "2" \stemUp c,4. \stemDown f | %20

    \staff "1" \stemDown b'8[ c a] \stemUp g[ a^\markup "◯" f^\markup "Scan for audio"] \\
    \staff "2" \stemDown g4. \stemUp g, | %21

    \staff "1" \stemUp e8[ g c] \stemDown c[ b^\markup "◯"^\markup "4. ____" a] \\
    \staff "2" \stemDown c,8[ e g] c,[ e g] | %22

    \staff "1" \stemDown b'8[ d f] f[ g a^\markup "◯"^\markup "5. ____"] \\
    \staff "2" \stemUp g,8[ d' g] g,[ d' g] | %23

    \staff "1" \stemDown g''8[ e c] a[ d b] \\
    \staff "2" \stemUp c,4. \stemDown f4 g8 | %24

    \staff "1" \stemUp <f d'>4.^\markup "◯"^\markup "6. ____" <e c'>4 \bar ":|." \bar ".|:" \\
    \staff "2" \stemUp c,8[ g e] c4 | %25

    \staff "1" \stemUp g'8 \\
    \staff "2" r8 | %26

    \staff "1" \stemDown f'8[ d16 c b a] g8[ d' f] \\
    \staff "2" \stemUp <g, b d g>4. <g b d g> | %27

    \staff "1" \stemUp e'8[ g,16 f e d] c8[ g' c] \\
    \staff "2" \stemUp <c,, e g c>4. <c e g c> | %28

    \staff "1" \stemUp \grace { c'8^\markup "◯"^\markup "7. ____" \stemDown } b[ a cs] d[ fs a] \\
    \staff "2" \stemUp <f,, f'>4. <fs fs'> | %29

    \staff "1" \stemUp <e c'>4. <d b'>4 g8 \\
    \staff "2" \stemDown g4. \stemUp g, | %30

    \staff "1" \stemDown f'8[ e f] d[ e f] \\
    \staff "2" \stemUp <g, b d g>4. <g b d g> | %31

    \staff "1" \stemDown e'16[ g fs^\markup "◯"^\markup "8. ____" g a^\markup "◯"^\markup "9. ____" g] c8[ g e] \\
    \staff "2" \stemUp <c,, e g c>4. <c e g c> | %32

    \staff "1" \stemDown d'8[ a' g] f[ e d] \\
    \staff "2" \stemDown f,4. g4 \stemUp g,8 | %33

    \staff "1" \stemUp <f d'>4.^\markup "◯"^\markup "10. ____" <e c'>4 \bar ":|." \\
    \staff "2" \stemDown g4. \stemUp c,4 | %34
    ```
    <!-- lilylet-end -->

### 媒体署名

- Generic\_Embellishing\_Tone\_Layout © John Peterson，依 [CC BY-SA（署名—相同方式共享）](https://creativecommons.org/licenses/by-sa/4.0/) 许可协议授权
