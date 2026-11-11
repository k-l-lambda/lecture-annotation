---
title: "混合性乐句级曲式"
slug: "hybrid-phrase-level-forms"
source: "https://viva.pressbooks.pub/openmusictheory/chapter/hybrid-phrase-level-forms/"
authors: ["John Peterson"]
license: "CC BY-SA 4.0"
modified: "2025-01-13"
---

# 混合性乐句级曲式

> **要点**
>
> - 混合曲式（hybrid form）把某一种原型的开头与另一种原型的结尾组合在一起。
> 	- 可能的开头有前乐句、呈示和复合基本乐思。
> 	- 可能的结尾有后乐句、展开部分和终止式结尾。
> - 虽然任何开头都可以与任何结尾组合，但某些组合比其他组合更为常见（见谱例 7）。

[章节播放列表](https://open.spotify.com/playlist/3sig09wZzjmq32smpgnPZ4?si=8fe60af15d4a4980)

## 什么是混合曲式？

在[乐句、原型与独特曲式](02-phrase-archetypes-unique-forms.md)一章中，我们考察了两种乐句级的曲式原型：乐句体（sentence）与乐段（period）。

我们发现，这两种曲式都分为两部分。乐句体分为两个分乐句：一个呈示（presentation）和一个展开部分（continuation）。乐段则分为两个乐句：一个前乐句（antecedent）和一个后乐句（consequent）。

![谱例 1. 贝多芬钢琴奏鸣曲 Op. 13 第二乐章第 1–8 小节中的前乐句 + 展开部分（0:00–0:32）。](../media/2019/07/Example_001_AntCont-e1623950650588.png)*谱例 1. 贝多芬钢琴奏鸣曲 Op. 13 第二乐章第 1–8 小节中的前乐句 + 展开部分（[0:00–0:32](https://open.spotify.com/track/2zSiV8Ze0yyrFtbVzX2Ytg?si=-Zj8tWQQSYSAf1mSPCv-xw)）。*

<!-- lilylet-begin: media/2019/07/Example_001_AntCont-e1623950650588.png -->
```lyl.play
[composer "Ludwig van Beethoven"]
[staves "{-}"]

\staff "1" \key af \major \time 2/4 \clef "treble" \tempo "Adagio cantabile" \stemUp c4(\p^\markup "b.i."^\markup "antecedent" bf \\
\staff "2" \clef "bass" \stemUp af16[ ef af ef] g[ ef g ef] \\
\staff "2" \stemDown af,4( df | %1

\staff "1" \stemUp ef4. df8) \\
\staff "2" \stemUp af16[ ef af ef] bf'[ ef, bf' ef,] \\
\staff "2" \stemDown c,4 g) | %2

\staff "1" \stemUp c8([^\markup "c.i." ef af bf)] \\
\staff "2" \stemUp af16[ ef bf' ef,] c'[ af d af] \\
\staff "2" \stemDown af,8([ g f f')] | %3

\staff "1" \stemUp ef4.( e8^\markup "HC" \\
\staff "2" \stemUp g16[ bf g bf] g[ bf g bf] \\
\staff "2" \stemDown ef,4( ef, | %4

\staff "1" \stemUp f4)^\markup "f."^\markup "continuation" bf,8.([ c32 df)] \\
\staff "2" \stemUp g16[ bf g bf] g[ ef g ef] \\
\staff "2" \stemDown df,,4 df') | %5

\staff "1" \stemUp ef4(^\markup "f."^\markup "(continuation)" a, \\
\staff "2" \stemUp af16[ ef af ef] ef[ c ef c] \\
\staff "2" \stemDown c,4( f, | %6

\staff "1" \stemUp df4)^\markup "cad." c16([-. bf-. af-. g-.)] \\
\staff "2" \stemUp f,16[ df f df] df[ df df df] \\
\staff "2" \stemDown bf,,4 ef) | %7

\staff "1" \stemUp <g bf>4(^\markup "PAC" \tuplet 3/2 { <c, af'>16)[-. ef-. af-.] } \tuplet 3/2 { c16[-. ef-. af-.] } \bar "|." \\
\staff "2" \stemUp df,16([ ef df ef)] c8 df\rest \\
\staff "2" \stemDown af,,8[ af'] af, s | %8
```
<!-- lilylet-end -->
当某一种原型的开头与另一种原型的结尾配对时，就形成了混合曲式。在谱例 1 中，前乐句之后接着一个展开部分。

- 我们怎么知道第一部分是前乐句而不是呈示？
	- 它以较弱的终止式结束，而呈示不以终止式结束。
	- 它是一个基本乐思之后接一个对比乐思，而呈示则是基本乐思之后接基本乐思的重复。
- 我们怎么知道第二部分是展开部分而不是后乐句？
	- 它不像后乐句那样以基本乐思开始，而是以碎片化开始，这是展开部分的特征。
	- 它开头的不稳定感来自半终止之后仍在延续的属和声，而后乐句的开头则以稳定为典型。

至此，我们已经知道了两种开头（呈示与前乐句）和两种结尾（展开部分与后乐句），但实际上还有一种可能的开头（复合基本乐思）和一种可能的结尾（终止式）。下面我们将介绍这些新的开头与结尾，并提供区分它们的方法。

## 开头

### 新类型：复合基本乐思（c.b.i.）

![谱例 2. 海顿 C 大调钢琴奏鸣曲 Hob. XVI:35 第一乐章第 1–8 小节中的复合基本乐思（0:00–0:05）。](../media/2019/07/Example_002a_compound_basic_idea-e1623951301511.png)*谱例 2. 海顿 C 大调钢琴奏鸣曲 Hob. XVI:35 第一乐章第 1–8 小节中的复合基本乐思（[0:00–0:05](https://open.spotify.com/track/2MX7ZGLIM4lTBP8rIEbnXU?si=00V9I8XNTGC-7urHU2ovLQ)）。*

<!-- lilylet-begin: media/2019/07/Example_002a_compound_basic_idea-e1623951301511.png -->
```lyl.play
[composer "Joseph Haydn"]
[staves "{-}"]

\staff "1" \key c \major \time 2/2 \partial 4 \clef "treble" \tempo "Allegro con brio" \stemDown c'8.[^\markup "b.i."^\markup "compound basic idea" e16] \\
\staff "2" \clef "bass" \partial 4 e,4\rest | %0

\staff "1" \stemDown g''4-! g-! g-! \grace b8 c4(\fz \\
\staff "2" \stemDown <c e>4 d,\rest d2\rest | %1

\staff "1" \stemDown g''4)-! g-! g-! e8.[^\markup "c.i." c16] \\
\staff "2" \stemDown <c e>4 e,\rest d2\rest | %2

\staff "1" \stemDown b'4-! b-! c-! c-! \\
\staff "2" \stemDown <g d' f>4 <g d' f> <g c e> <g c e> | %3

\staff "1" \stemDown d'4-! c\rest b\rest s4 \\
\staff "2" \stemDown <g b d>4 d\rest d2\rest | %4
```
<!-- lilylet-end -->
复合基本乐思（compound basic idea，c.b.i.）是一个不带终止式的前乐句，如谱例 2 所示。[^1]

- 谱例 2 在哪些方面像前乐句？
	- 它包含一个基本乐思，其后接一个对比乐思。
- 谱例 2 在哪些方面不同于前乐句？
	- 它不以终止式结束。注意第 3–4 小节低音一直停留在 G 上：尽管旋律到达了一个静止点，但低音缺乏和声进行，从而避开了本可以出现在该处的半终止（HC）。

### 小结：三种开头

混合性乐句级曲式中出现的三种开头是前乐句、复合基本乐思和呈示。谱例 3 概述了区分这三种开头的特征。

| 开头 | 以终止式结束？ | 第一个乐思 | 第二个乐思 |
| --- | --- | --- | --- |
| 前乐句 | 是 | b.i. | c.i. |
| 复合基本乐思 | 否 | b.i. | c.i. |
| 呈示 | 否 | b.i. | b.i. |

谱例 3. 区分各种开头的特征。

## 结尾

### 新类型：终止式（cad.）

![谱例 4. 海顿弦乐四重奏 Op. 64 第 4 首第二乐章第 1–8 小节中的终止式结尾（0:05–0:10）。](../media/2019/07/Example_004a_cadential-e1623951336715.png)*谱例 4. 海顿弦乐四重奏 Op. 64 第 4 首第二乐章第 1–8 小节中的终止式结尾（[0:05–0:10](https://open.spotify.com/track/2Dyh8LMXHEv4Hxchepyubj?si=1IMP3wmEQ_ut75jSngeJsA)）。*

<!-- lilylet-begin: media/2019/07/Example_004a_cadential-e1623951336715.png -->
```lyl.play
[composer "Joseph Haydn"]
[staves "<v1-v2-va-vc>"]
[instrument-v1 "Violin I" "Vn. I"]
[instrument-v2 "Violin II" "Vn. II"]
[instrument-va "Viola" "Va."]
[instrument-vc "Violoncello" "Vc."]

\key g \major \time 3/4 \partial 4 \tempo "Allegretto" d'8(\f[ b)] \\\\
\partial 4 r4 \\\\
\clef "alto" \partial 4 r4 \\\\
\clef "bass" \partial 4 r4 | %0

fs8([ g)] d4-. b''8([ g)] \\\\
r4 d4-.\f d-. \\\\
r4 b-.\f b-. \\\\
r4 g-.\f g-. | %1

fs'8([ a)] c,4-. a8([ c)] \\\\
r4 fs-. fs-. \\\\
r4 a-. a-. \\\\
r4 d,-. d-. | %2

c'16([ b)] r8 d16([ c)] r8 e16([ c)] r8 \\\\
g'8-. r g-. r g-. r \\\\
g8-. r e-. r c-. r \\\\
g8-. r e-. r c-. r | %3

a'2 d,4\p^\markup "cadential" \\\\
fs2 r4 \\\\
d,4-. r r \\\\
d,4-. d'-._\markup "Bass:" r | %4

g'2( b8[ gs)] \\\\
r4 d-.\p d-. \\\\
r4 g-.\p f'-. \\\\
r4 b,-.\p b-.
\addlyrics { 3̂ _ } | %5

b'8([ a)] c4-. c8([ b)] \\\\
e4 r e8([ d)] \\\\
e4 r r \\\\
c,4 r r
\addlyrics { 4̂ } | %6

\grace b'8( a4) a8([ g a d,)] \\\\
c2.( \\\\
fs2.( \\\\
d,4-. d-. d-.
\addlyrics { 5̂ _ _ } | %7

\partial 2 g'4^\markup "PAC" r \bar "|." \\\\
\partial 2 b4) r \bar "|." \\\\
\partial 2 g4) r \bar "|." \\\\
\partial 2 g,4-. g'-. \bar "|."
\addlyrics { 1̂ _ } | %8
```
<!-- lilylet-end -->
终止式结尾（cadential ending，cad.）为一种特定的低音模式配和声（如谱例 4 所示）。[^2]

核心的低音模式是 *mi–fa–sol–do* $(\hat3-\hat4-\hat5-\hat1)$。其中每个音常见的和声配置是：

- *mi*$(\hat3)$：I<sup>6</sup>
- *fa*$(\hat4)$：ii<sup>6</sup> 或 IV
- *sol*$(\hat5)$：V<sup>(7)</sup>（常用终止四六和弦加以装饰）
- *do*$(\hat1)$：I

这条核心的 *mi–fa–sol–do*$(\hat3-\hat4-\hat5-\hat1)$ 低音线可以加以装饰。一种常见的装饰是在 *sol* 之前加入 *fi*，从而使属和弦离调（$(\uparrow\hat4-\hat5)$），把低音线变成 *mi–fa–fi–sol–do*$(\hat3-\hat4-\uparrow\hat4-\hat5-\hat1)$。

最清楚的终止式结尾长四小节，每小节一个低音。

### 小结：三种结尾

混合性乐句级曲式中出现的三种结尾是后乐句、展开部分和终止式。谱例 5 概述了区分这三种结尾的特征。

| 结尾 | 终止式 | 低音 | 乐思 |
| --- | --- | --- | --- |
| 后乐句 | PAC/IAC。不是 HC。 | 不定 | b.i. + c.i. |
| 展开部分 | HC、IAC 或 PAC。 | 不定 | 多样，但常划分为 1+1+2 或 2+2 |
| 终止式 | PAC/IAC。不是 HC。 | Mi−fa−sol−do $(\hat3−\hat4−\hat5−\hat1)$ 或这一低音线的扩展形式。 | 2+2，或不可分割。从不使用碎片化。 |

谱例 5. 区分各种结尾的特征。

## 混合曲式的各种可能与谱例

三种可能的开头与三种可能的结尾见谱例 6。虽然左侧的任何一种开头都可以与右侧的任何一种结尾配对，但谱例 7 显示，有些配对比其他配对更为常见。

下面，我们为"略不常见"和"偶见"两类中的所有混合曲式提供谱例（**谱例 8–12**）。乐段与乐句体的谱例已在[乐句、原型与独特曲式](02-phrase-archetypes-unique-forms.md)一章中给出。

本章提供的谱例都是八小节的典型形态，但正如我们在下一章将要说明的，这些曲式的长度*可以*任意。[^3]

| 开头 | 结尾 |
| --- | --- |
| 前乐句 复合基本乐思（c.b.i.） 呈示 | 后乐句 展开部分 终止式 |

谱例 6. 可能的开头与结尾。从理论上说，左侧任何一种开头都可以与右侧任何一种结尾配对。

| 曲式 | 常见程度 |
| --- | --- |
| 呈示+展开部分（乐句体）前乐句+后乐句（乐段） | 非常常见 |
| c.b.i.+后乐句 c.b.i.+展开部分 前乐句+展开部分 | 略不常见 |
| c.b.i.+终止式 前乐句+终止式 | 偶见 |
| 呈示+终止式 呈示+后乐句 | 罕见或不存在 |

谱例 7. 按常见程度排列的开头与结尾配对。

![贝多芬钢琴奏鸣曲 Op. 13 第二乐章第 1–8 小节中的前乐句 + 展开部分。](../media/2019/07/Example_008_antcont-e1623950775418.png)

<!-- lilylet-begin: media/2019/07/Example_008_antcont-e1623950775418.png -->
```lyl.play
[composer "Ludwig van Beethoven"]
[staves "{-}"]

\staff "1" \key af \major \time 2/4 \clef "treble" \tempo "Adagio cantabile" \stemUp c4(\p^\markup "b.i."^\markup "antecedent" bf \\
\staff "2" \clef "bass" \stemUp af16[ ef af ef] g[ ef g ef] \\
\staff "2" \stemDown af,4( df | %1

\staff "1" \stemUp ef4. df8) \\
\staff "2" \stemUp af16[ ef af ef] bf'[ ef, bf' ef,] \\
\staff "2" \stemDown c,4 g) | %2

\staff "1" \stemUp c8([^\markup "c.i." ef af bf)] \\
\staff "2" \stemUp af16[ ef bf' ef,] c'[ af d af] \\
\staff "2" \stemDown af,8([ g f f')] | %3

\staff "1" \stemUp ef4.( e8^\markup "HC" \\
\staff "2" \stemUp g16[ bf g bf] g[ bf g bf] \\
\staff "2" \stemDown ef,4( ef, | %4

\staff "1" \stemUp f4)^\markup "f."^\markup "continuation" bf,8.([ c32 df)] \\
\staff "2" \stemUp g16[ bf g bf] g[ ef g ef] \\
\staff "2" \stemDown df,,4 df') | %5

\staff "1" \stemUp ef4(^\markup "f."^\markup "(continuation)" a, \\
\staff "2" \stemUp af16[ ef af ef] ef[ c ef c] \\
\staff "2" \stemDown c,4( f, | %6

\staff "1" \stemUp df4)^\markup "cad." c16([-. bf-. af-. g-.)] \\
\staff "2" \stemUp f,16[ df f df] df[ df df df] \\
\staff "2" \stemDown bf,,4 ef) | %7

\staff "1" \stemUp <g bf>4(^\markup "PAC" \tuplet 3/2 { <c, af'>16)[-. ef-. af-.] } \tuplet 3/2 { c16[-. ef-. af-.] } \bar "|." \\
\staff "2" \stemUp df,16([ ef df ef)] c8 df\rest \\
\staff "2" \stemDown af,,8[ af'] af, s | %8
```
<!-- lilylet-end -->
谱例 8. 贝多芬钢琴奏鸣曲 Op. 13 第二乐章第 1–8 小节中的前乐句 + 展开部分（[0:00–0:31](https://open.spotify.com/track/2zSiV8Ze0yyrFtbVzX2Ytg?si=-Zj8tWQQSYSAf1mSPCv-xw)）。

![海顿钢琴奏鸣曲 Hob. XVI:35 第一乐章第 1–8 小节中的复合基本乐思 + 展开部分。](../media/2019/07/Example_009a_CBIcont-e1623951374474.png)

<!-- lilylet-begin: media/2019/07/Example_009a_CBIcont-e1623951374474.png -->
```lyl.play
[composer "Joseph Haydn"]
[staves "{-}"]

\staff "1" \key c \major \time 2/2 \partial 4 \clef "treble" \tempo "Allegro con brio" \stemDown c'8.[^\markup "b.i."^\markup "compound basic idea" e16] \\
\staff "2" \clef "bass" \partial 4 e,4\rest | %0

\staff "1" \stemDown g''4-! g-! g-! \grace b8 c4(\fz \\
\staff "2" \stemDown <c e>4 d,\rest d2\rest | %1

\staff "1" \stemDown g''4)-! g-! g-! e8.[^\markup "c.i." c16] \\
\staff "2" \stemDown <c e>4 e,\rest d2\rest | %2

\staff "1" \stemDown b'4-! b-! c-! c-! \\
\staff "2" \stemDown <g d' f>4 <g d' f> <g c e> <g c e> | %3

\staff "1" \stemDown d'4-! c\rest b\rest g8.[^\markup "u."^\markup "continuation" d'16] \\
\staff "2" \stemDown <g b d>4 d\rest d2\rest \clef "treble" | %4

\staff "1" \stemDown f'4-! f8.([ g16)] e4-! e8.([ f16)] \\
\staff "2" \stemUp <b g'>4 b'\rest <c, g'> c'\rest | %5

\staff "1" \stemDown d'4-! d8.([ e16)] c4-!^\markup "cad." c-! \\
\staff "2" \stemUp <f g>4 b\rest <e, g> b'\rest | %6

\staff "1" \stemDown d'4-! d-! b-! b-! \\
\staff "2" \stemUp <f, f'>4 <f f'> <g d'> <g d'> | %7

\staff "1" \partial 4 \stemDown c'4-!^\markup "PAC" \bar "|." \\
\staff "2" \partial 4 \tuplet 3/2 { c8([ e g)] } | %8
```
<!-- lilylet-end -->
谱例 9. 海顿钢琴奏鸣曲 Hob. XVI:35 第一乐章第 1–8 小节中的复合基本乐思 + 展开部分（[0:00–0:10](https://open.spotify.com/track/2MX7ZGLIM4lTBP8rIEbnXU?si=00V9I8XNTGC-7urHU2ovLQ)）。

![海顿弦乐四重奏 Op. 64 第 4 首第二乐章第 1–8 小节中的前乐句 + 扩展的终止式结尾](../media/2019/07/Example_010_antece-e1623951152615.png)

<!-- lilylet-begin: media/2019/07/Example_010_antece-e1623951152615.png -->
```lyl.play
[composer "Joseph Haydn"]
[staves "<v1-v2-va-vc>"]
[instrument-v1 "Violin I" "Vn. I"]
[instrument-v2 "Violin II" "Vn. II"]
[instrument-va "Viola" "Va."]
[instrument-vc "Violoncello" "Vc."]

\key g \major \time 3/4 \partial 4 \tempo "Allegretto" d'8(\f[^\markup "b.i."^\markup "antecedent" b)] \\\\
\partial 4 r4 \\\\
\clef "alto" \partial 4 r4 \\\\
\clef "bass" \partial 4 r4 | %0

fs8([ g)] d4-. b''8([ g)] \\\\
r4 d4-.\f d-. \\\\
r4 b-.\f b-. \\\\
r4 g-.\f g-. | %1

fs'8([ a)] c,4-. a8([^\markup "c.i." c)] \\\\
r4 fs-. fs-. \\\\
r4 a-. a-. \\\\
r4 d,-. d-. | %2

c'16([ b)] r8 d16([ c)] r8 e16([ c)] r8 \\\\
g'8-. r g-. r g-. r \\\\
g8-. r e-. r c-. r \\\\
g8-. r e-. r c-. r | %3

a'2^\markup "HC" d,4\p^\markup "cadential" \\\\
fs2 r4 \\\\
d,4-. r r \\\\
d,4-. d'-. r | %4

g'2( b8[ gs)] \\\\
r4 d-.\p d-. \\\\
r4 g-.\p f'-. \\\\
r4 b,-.\p b-. | %5

b'8([ a)] c4-. c8([ b)] \\\\
e4 r e8([ d)] \\\\
e4 r r \\\\
c,4 r r | %6

\grace b'8( a4) a8([ g a d,)] \\\\
c2.( \\\\
fs2.( \\\\
d,4-. d-. d-. | %7

\partial 2 g'4^\markup "PAC" r \bar "|." \\\\
\partial 2 b4) r \bar "|." \\\\
\partial 2 g4) r \bar "|." \\\\
\partial 2 g,4-. g'-. \bar "|." | %8
```
<!-- lilylet-end -->
谱例 10. 海顿弦乐四重奏 Op. 64 第 4 首第二乐章第 1–8 小节中的前乐句 + 终止式（[0:00–0:10](https://open.spotify.com/track/2Dyh8LMXHEv4Hxchepyubj?si=1IMP3wmEQ_ut75jSngeJsA)）。

![海顿第 95 交响曲第三乐章第 1–8 小节中的对比性开头 + 扩展的终止式结尾](../media/2019/07/Example_011_cbece-e1623951115962.png)

<!-- lilylet-begin: media/2019/07/Example_011_cbece-e1623951115962.png -->
```lyl.play
[composer "Joseph Haydn"]
[staves "{-}"]

\staff "1" \key ef \major \time 3/4 \partial 4 \tempo "Menuetto" \clef "treble" g'4-.\p^\markup "b.i."^\markup "compound basic idea" \\
\staff "2" \key ef \major \time 3/4 \partial 4 \clef "bass" r4 | %0

\staff "1" g'4-. r c-. \\
\staff "2" r4 \clef "treble" <c ef>4-. <c ef>-. | %1

\staff "1" c'4-. r ef-.^\markup "c.i." \\
\staff "2" r4 <c ef g>-. <c ef g>-. | %2

\staff "1" \grace ef'8 d4 d8([ c d b] \\
\staff "2" <c f g>4-. <c f g>-. <c f g>-. | %3

\staff "1" c'4) r g'-.\f^\markup "cadential" \\
\staff "2" <c ef g>4-. <c ef g>-. r4 \clef "bass" | %4

\staff "1" <c' c'>4-. \grace d'8 <c, c'>8([ b'] <c, c'>4)-. \\
\staff "2" <ef, g c>4 <ef g c> <ef g c> | %5

\staff "1" <af' af'>4( f' d \\
\staff "2" \stemUp c2( f4 \\
\staff "2" \stemDown <f, af>2. | %6

\staff "1" b'4)-. g'8([ af) g-. f-.] \\
\staff "2" <g d'>4) <g b d> <g b d> | %7

\staff "1" \partial 2 ef'4( c)^\markup "IAC" \bar "|." \\
\staff "2" \partial 2 <c ef>4 r \bar "|." | %8
```
<!-- lilylet-end -->
谱例 11. 海顿第 95 交响曲第三乐章第 1–8 小节中的复合基本乐思 + 终止式（[0:00–0:10](https://open.spotify.com/track/4bfPvsHQMsPOtVbWNukvwd?si=oMQdq9afRB6mqtVlefA36g)）。

![海顿第 87 交响曲第三乐章第 1–8 小节中的对比性开头 + 后乐句](../media/2019/07/Example_012_cbcons-e1623951073372.png)

<!-- lilylet-begin: media/2019/07/Example_012_cbcons-e1623951073372.png -->
```lyl.play
[composer "Joseph Haydn"]
[staves "{-}"]

\staff "1" \key a \major \time 3/4 \tempo "Menuet" \clef "treble" cs'32[(^\markup "b.i."^\markup "compound basic idea" d e8.] cs4 a) \\
\staff "1" e4 s2 \\
\staff "2" \key a \major \time 3/4 \clef "bass" <a, e' cs'>4\f r r | %1

\staff "1" <e a>2( <fs as>4) \\
\staff "1" s2. \\
\staff "2" <a cs>32([ <b d> <cs e>8.] <a cs>4 <fs cs' e>) | %2

\staff "1" \grace cs'8 b8([^\markup "c.i." as b cs d e]) \\
\staff "1" fs2 e4 \\
\staff "2" <d, b' d>2 <cs cs'>4 | %3

\staff "1" d'4-. r r \\
\staff "1" d4-. s2 \\
\staff "2" <b, b'>4 <d d'> <fs fs'> | %4

\staff "1" d'32[(^\markup "b.i."^\markup "consequent" e fs8.] d4 b) \\
\staff "1" fs2( d4) \\
\staff "2" <b d>4 r r | %5

\staff "1" a'2( gs4) \\
\staff "1" b32[ cs d8.] d4 d \\
\staff "2" e,,4 <e' b'> <e b'> | %6

\staff "1" \grace b'8 <cs, e a>8[(^\markup "c.i." gs' a cs <d, e b'>) gs] \\
\staff "1" s2. \\
\staff "2" <a, a'>4 r <e e'> | %7

\staff "1" <cs a'>4^\markup "PAC" r r \bar "|." \\
\staff "1" s2. \bar "|." \\
\staff "2" <a, a'>4 cs e \bar "|." | %8
```
<!-- lilylet-end -->
谱例 12. 海顿第 97 交响曲第三乐章第 1–8 小节中的复合基本乐思 + 后乐句（[0:00–0:11](https://open.spotify.com/track/07diyTjKL8pcqCnc2kf0om?si=Li_2iG_xShe3eJ9F7Il8ig)）。

## 聆听乐句级的曲式

可能性如此之多，要梳理各种可能，或许会显得令人不知所措。谱例 13 提供了一种聆听策略，可以帮助你判断自己听到的是哪种开头和结尾。

![谱例 13. 聆听乐句级曲式的建议步骤：(a) 在开头要听什么，(b) 在结尾要听什么。](../media/2019/07/Example_013a_Listening_Diagram_Caplin.png)*谱例 13. 聆听乐句级曲式的建议步骤：(a) 在开头要听什么，(b) 在结尾要听什么。*

> 延伸阅读

- Caplin, William Earl. 2013. *Analyzing Classical Form: An Approach for the Classroom*. New York: Oxford University Press.

> 作业

1. 分析混合曲式（[.pdf](https://viva.pressbooks.pub/app/uploads/sites/12/2021/07/WK-Hybrid-Phrase-level-Forms-–-Analyzing-Hybrid-Forms.pdf)，[.docx](https://viva.pressbooks.pub/app/uploads/sites/12/2021/07/WK-Hybrid-Phrase-level-Forms-–-Analyzing-Hybrid-Forms.docx)）。提供若干片段，要求学生指出哪个术语最恰当地描述了每一段的前半部分和后半部分。包含可选的和声分析。[练习表播放列表](https://open.spotify.com/playlist/0ut3FwqkrR19KLnXuyNTnB)
2. 分析具有多种可能性的曲式（[.pdf](https://viva.pressbooks.pub/app/uploads/sites/12/2021/07/WK-Hybrid-Phrase-level-Forms-–-Analyzing-Forms-with-Multiple-Interpretive-Possibilities.pdf)，[.docx](https://viva.pressbooks.pub/app/uploads/sites/12/2021/07/WK-Hybrid-Phrase-level-Forms-–-Analyzing-Forms-with-Multiple-Interpretive-Possibilities.docx)）。要求学生为若干片段确定首选的解释和合理的替代解释。也包含管乐队音乐。[练习表播放列表](https://open.spotify.com/playlist/4Wpo3oxXETkCWnGJitaenv)
3. 创作乐句级曲式（[.pdf](https://viva.pressbooks.pub/app/uploads/sites/12/2021/07/WK-Hybrid-Phrase-level-Forms-–-Composing-Phrase-level-Forms.pdf)，[.docx](https://viva.pressbooks.pub/app/uploads/sites/12/2021/07/WK-Hybrid-Phrase-level-Forms-–-Composing-Phrase-level-Forms.docx)）。要求学生按照给定的描述创作一种乐句级曲式。提供基本乐思库，供学生起步。

### 媒体署名

- Example\_001\_Ant+Cont © John Peterson and Megan Lavengood，依 [CC BY-SA（署名—相同方式共享）](https://creativecommons.org/licenses/by-sa/4.0/)许可使用
- Example\_002a\_compound\_basic\_idea © John Peterson and Megan Lavengood，依 [CC BY-SA（署名—相同方式共享）](https://creativecommons.org/licenses/by-sa/4.0/)许可使用
- Example\_004a\_cadential © John Peterson and Megan Lavengood，依 [CC BY-SA（署名—相同方式共享）](https://creativecommons.org/licenses/by-sa/4.0/)许可使用
- Example\_013a\_Listening\_Diagram\_Caplin © John Peterson and Megan Lavengood，依 [CC BY-SA（署名—相同方式共享）](https://creativecommons.org/licenses/by-sa/4.0/)许可使用

---

[^1]: 复合基本乐思的"复合"体现在哪里？它常常充当大型乐句体的基本乐思，这种乐句体长十六小节，其中的呈示为八小节长，由两个 c.b.i. 单位构成。说它"复合"，是因为这些大型的基本乐思本身由两个单位组成：一个 b.i. 和一个 c.i.。
[^2]: 终止式*乐思*与终止式*结尾*有什么区别？终止式乐思出现在展开部分的末尾；而从根本上说，终止式结尾就像是被扩展到四小节、并取代了展开部分的终止式乐思。这意味着"终止式"可以出现在两个曲式层级上：乐思层级与分乐句层级。
[^3]: 当然，这一模式也可以出现在小调中，即 *me–fa–sol–do* $(\downarrow\hat3-\hat4-\hat5-\hat1)$。
