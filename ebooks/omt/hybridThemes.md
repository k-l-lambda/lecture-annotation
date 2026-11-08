# 混合主题

混合主题（hybrid themes）把[乐句（句子式）](sentence.md)与[乐段](period.md)的[功能特征](themeFunctions.md)混合在一起。威廉·卡普林（William Caplin）区分出了四种主要类型：

## 混合型 1 {#hybrid-1}

混合型 1 把一个[前乐句](themeFunctions.md#antecedent)与一个[展开乐句](themeFunctions.md#continuation)结合在一起。

![混合型 1 结构示意图](assets/ClassicalThemes/hybrid1.svg)

<!--其结果是：前乐句中包含一个完整的呈示–展开–终止功能进行，其后跟着一个不完整的展开–终止功能进行。在宏观层面上，前乐句起着一个大型呈示功能区的作用（就像呈示乐句那样）。-->

![前乐句 + 展开：莫扎特（Mozart），C 大调钢琴奏鸣曲，K. 330，第二乐章，第 1–8 小节](assets/form/k330-ii.png)

前乐句 + 展开：莫扎特（Mozart），C 大调钢琴奏鸣曲，K. 330，第二乐章，第 1–8 小节

<!-- lilylet-begin: assets/form/k330-ii.png -->
```lyl.play
[composer "Wolfgang Amadeus Mozart"]
[staves "{-}"]

\staff "1" \key f \major \time 3/4 \partial 4. \tempo "Andante cantabile" \clef "treble" \ottava #0 \markup "dolce" \stemDown c'8(-.[ c-. c)-.] \\
\staff "2" \clef "bass" \ottava #0 d,8\rest d4\rest | %1

\staff "1" \stemDown c'8.[ \grace { \stemUp d16[ c b c] } \stemDown f16] \stemUp c8[ a( c e,)] \\
\staff "2" \stemDown <f, a c>2\p <c g' bf>4 | %2

\staff "1" \stemUp g'4( f8) f\f([ <e g> <f a>)] \\
\staff "1" s4 s8 \stemDown c4 b8 \\
\staff "2" \stemUp bf4 a8[ <a, a'>( <g g'> <f f'>)] \\
\staff "2" \stemDown d,4. s4. | %3

\staff "1" \stemUp bf'8.([ c32 d)] c8[ f,( e f] \\
\staff "1" \stemDown f4. b,8\rest b4 \\
\staff "2" \stemDown <d, d'>8([ <bf bf'>)] <a a'> d8\rest d4\p | %4

\staff "1" \stemUp <f a>4( <e g>8) g[ g g] \\
\staff "1" \stemDown c2 <c e>4\f \\
\staff "2" \stemUp c,2 s4 | %5

\staff "1" \ottava #0 \stemUp \grace g'16( g'8.[ d32 b)] g8[ g(-. g-. g)-.] \\
\staff "1" \ottava #0 \stemDown <b d f>2 <c e>4 | %6

\staff "1"  \stemUp \grace g'16(  \stemDown g'4)~ g16.[ a64( b c16) b-.] a-.[ g-. f-. e-.] \\
\staff "2" \stemDown <d, f b>4( <e g c>) d\rest | %7

\staff "1" \stemDown cs'16([ d f a)] c,4.( b8 \\
\staff "1" s4 s4 s8 \stemUp e'16[ d)] \\
\staff "2" s8 \stemUp d  <c e>4( <d f>) \\
\staff "2" d,8\rest \stemDown <f a>\p g2 | %8

\staff "1" \stemUp c'4 d4\rest s4 \\
\staff "1" \stemDown c'4 s4 s4 \\
\staff "2" \stemUp e4 c,8 d8\rest s4 \\
\staff "2" \stemDown c4 s4 s4 | %9
```
<!-- lilylet-end -->

🎧 [Spotify：莫扎特，C 大调钢琴奏鸣曲，K. 330，第二乐章](https://open.spotify.com/track/2l74mmkDhW5DxN7LNnkeSd)

莫扎特 C 大调钢琴奏鸣曲第二乐章的前八小节是一个典型的例子。前乐句包含一个基本动机，其特点是构成弱起的几个重复音。其后是一个由音阶式上行构成的对比动机，导向第 4 小节乐句的半终止。前乐句之后，音乐开始表现出展开功能，主要通过碎片化和表层节奏的加快来实现。在第 6 小节中间，具有特征性的旋律动机被消解（liquidated）为常规的音阶式音型，导向一个 V:PAC。

## 混合型 2 {#hybrid-2}

混合型 2 把一个前乐句与一个四小节的终止进行结合在一起。

![混合型 2 结构示意图](assets/ClassicalThemes/hybrid2.svg)

![前乐句 + 终止：海顿（Haydn），G 大调弦乐四重奏，Hob. III:66，第二乐章，第 1–8 小节](assets/form/haydn-III-66-ii.png)

前乐句 + 终止：海顿（Haydn），G 大调弦乐四重奏，Hob. III:66，第二乐章，第 1–8 小节

<!-- lilylet-begin: assets/form/haydn-III-66-ii.png -->
```lyl.play
[composer "Joseph Haydn"]
[staves "{-}"]

\staff "1" \key g \major \time 3/4 \partial 4 \clef "treble" \ottava #0 \stemDown d'8(\f[ b)] \\
\staff "2" \clef "bass" \ottava #0 d,4\rest | %1

\staff "1" \stemUp fs8([ g)] d4 \stemDown b''8([ g)] \\
\staff "2" s4 \stemUp <b d>-. <b d>-. \\
\staff "2" d,4\rest \stemDown <g b>-.\f g-. | %2

\staff "2" s4 \stemUp <a fs'>-. <a fs'>-. \\
\staff "1" \stemDown fs'8([ a)] c,4 a8([ c)] \\
\staff "2" d,4\rest \stemDown d-. d-. | %3

\staff "1" \stemUp c'16([ b] b8\rest \stemDown g s \\
\staff "1" s2 \stemUp e'16([ c] b8\rest \\
\staff "1" \stemDown g'8 s \\
\staff "1" s4 \stemUp d'16([ c] b8\rest \stemDown g s \\
\staff "2" \stemDown g8-. d\rest e-. d\rest \stemUp c-. d\rest | %4

\staff "1" \stemUp a'2 d,4\p \\
\staff "1" \stemDown fs2 s4 \\
\staff "2" \stemDown d,4-. d'-. d,\rest | %5

\staff "1" \ottava #0 \stemUp g'2( b8[ gs)] \\
\staff "2" \ottava #0 s4 \stemUp <g d'>-. <d' fs>-. \\
\staff "2" \ottava #0 d,4\rest \stemDown b-.\p b-. | %6

\staff "1" \stemUp b'8([ a)] \stemDown c4-. c8([ b)] \\
\staff "2" \stemUp e4 s4 e8([ d)] \\
\staff "2" \stemDown c,4 d\rest c | %7

\staff "1" \grace b'8( \stemUp a4) a8([ g] a[ d,)] \\
\staff "2" \stemUp <c fs>2.( \\
\staff "2" \stemDown d,4-. d-. d-. | %8

\staff "1" \stemUp g'4 r r \\
\staff "2" \stemUp <b g'>4) s2 \\
\staff "2" \stemDown g,4-. g'-. r | %9
```
<!-- lilylet-end -->

🎧 [Spotify：海顿，G 大调弦乐四重奏，Hob. III:66，第二乐章](https://open.spotify.com/track/2Dyh8LMXHEv4Hxchepyubj)

在这里，前乐句之后的四个小节支撑着单独一个终止进行：

> **I6 ii6/5 V I**  

注意，这个四小节的乐句没有表现出任何[展开功能](themeFunctions.md#continuation)的标志。

## 复合基本动机 {#the-compound-basic-idea}

正如我们有时会发现作曲家把两种主要主题类型的不同特征结合起来一样，我们也经常发现不同类型乐句的结合。"复合基本动机"（compound basic idea，CBI）把[前乐句功能](themeFunctions.md#antecedent)的旋律特征与[呈示](themeFunctions.md#presentation)功能的和声特征结合在一起。和前乐句一样，它先呈现一个基本动机，接着是一个对比动机。但和呈示一样，复合基本动机只是延长主和弦，而不以终止式结束。

## 混合型 3 {#hybrid-3}

第三种混合类型与[第一种混合类型](#hybrid-1)非常相似。不过，它的第一个乐句不是一个起始性的前乐句，而是一个 [CBI](#the-compound-basic-idea)。在 CBI 之后，混合型 3 以一个结束于终止式的展开乐句收尾。

![混合型 3 结构示意图](assets/ClassicalThemes/hybrid3.svg)

![复合基本动机 + 展开：贝多芬（Beethoven），小提琴奏鸣曲，Op. 30, No. 2，第三乐章，第 1–8 小节](assets/form/beethoven_op30.png)

复合基本动机 + 展开：贝多芬（Beethoven），小提琴奏鸣曲，Op. 30, No. 2，第三乐章，第 1–8 小节

<!-- lilylet-begin: assets/form/beethoven_op30.png -->
```lyl.play
[composer "Ludwig van Beethoven"]
[staves "{-}"]

\staff "1" \key c \major \time 3/4 \partial 4 \tempo "Allegro" \clef "treble" \ottava #0 \grace d'8( \stemDown c8.)\p-.[ b16-.] \\
\staff "2" \clef "bass" \ottava #0 d,4\rest | %1

\staff "1" \stemDown c'4-. \stemUp g-. a-. \\
\staff "2" d,4\rest \stemDown <c' e> <c f> | %2

\staff "1" \stemUp g'2 \grace d'8( \stemDown c8.)-.[ b16-.] \\
\staff "2" \ottava #0 \stemDown <c e>4 \stemUp c, d\rest | %3

\staff "1" \stemDown c'4-. c-. d-. \\
\staff "2" \clef "treble" b'4\rest \stemUp <e, g>-. <b g'>-. | %4

\staff "1" \grace { c'16[( d] } \stemDown e4)\sf( c8) b\rest \grace d8( c8.)-.[ b16-.] \\
\staff "2" \stemUp g'4. s8 \\
\staff "2" \stemDown c4( e8) b'\rest b4\rest | %5

\staff "1" \ottava #0 \stemDown c'4-. \stemUp g-.\sf a-. \\
\staff "2" \ottava #0 b'4\rest \stemUp <b, d>-. <c e>-. | %6

\staff "1" \stemUp fs4-.\sf g-. a-.\sf \\
\staff "2" \stemUp <a c>4-. <b d>-. <c e>-. | %7

\staff "1" \stemUp d2 fs4\trill \grace { e16[( fs]) } \\
\staff "2" \clef "bass" d,4\rest \stemDown <d g b>-. <d a' c>-. | %8

\staff "1" \stemUp g'4 b\rest b\rest \\
\staff "2" \stemDown <g b>4 \stemUp g, d'\rest | %9
```
<!-- lilylet-end -->

🎧 [Spotify：贝多芬，小提琴奏鸣曲，Op. 30, No. 2，第三乐章](https://open.spotify.com/track/2MeFF0iyjMts1juRwgDXAT)

在这个选自贝多芬小提琴奏鸣曲 Op. 30 的例子中，起始乐句的旋律结构包含两个对比性的动机，每个都以相同的附点音型开始。然而，与典型的前乐句不同，这个乐句只是延长主和弦：第 3 小节最后一拍上的 V6 只是通过下方辅助音的运动来装饰主和弦，而没有形成终止式的划分。因此，这个乐句最好理解为一个["复合基本动机"](#the-compound-basic-idea)。

结束乐句是一个典型的展开乐句，通过碎片化、旋律模进以及和声节奏的加快来表现。

## 混合型 4 {#hybrid-4}

混合型 4 与乐段相似，不同之处在于第一个乐句由一个"复合基本动机"而不是前乐句构成。在 [CBI](#the-compound-basic-idea) 之后，结束乐句表现出后乐句的功能，通常会改动对比动机的再现，使主题以一个强终止式结束。

![混合型 4 结构示意图](assets/ClassicalThemes/hybrid4.svg)

![复合基本动机 + 后乐句：贝多芬（Beethoven），G 大调弦乐四重奏，Op. 18/2，第四乐章，第 1–8 小节](assets/form/beethoven_18_2.png)

复合基本动机 + 后乐句：贝多芬（Beethoven），G 大调弦乐四重奏，Op. 18/2，第四乐章，第 1–8 小节

<!-- lilylet-begin: assets/form/beethoven_18_2.png -->
```lyl.play
[composer "Ludwig van Beethoven"]
[staves "<v1-v2-va-vc>"]
[instrument-v1 "Violin I" "Vn. I"]
[instrument-v2 "Violin II" "Vn. II"]
[instrument-va "Viola" "Va."]
[instrument-vc "Violoncello" "Vc."]

\key g \major \time 2/4 \tempo "Allegro molto quasi Presto" R2 \\\\
R2 \\\\
\clef "alto" R2 \\\\
\clef "bass" \ottava #0 \stemDown d,4-.\p g-. | %1

R2 \\\\
R2 \\\\
R2 \\\\
\stemDown b4.( a16[ g)] | %2

R2 \\\\
R2 \\\\
R2 \\\\
\stemDown fs,8-.[ g-. a-. b-.] | %3

R2 \\\\
R2 \\\\
R2 \\\\
\stemDown c8 d,\rest d4\rest | %4

\stemUp d4-.\p g-. \\\\
\stemUp b4\p d \\\\
\stemUp b4-.\p b-. \\\\
\stemDown g4-.\p g-. | %5

\stemDown b'4.( \stemUp a16[ g)] \\\\
\stemUp g'4.( fs16[ e)] \\\\
\stemUp g4.( a16[ b)] \\\\
\stemDown e,4.( fs16[ g)] | %6

\stemUp fs8-.[ a-. g-. e-.] \\\\
\stemUp d8-.[ d-. cs-. cs-.] \\\\
\stemUp a8-.[ fs-. e-. g-.] \\\\
\stemUp a8-.[ a,-. a-. a-.] | %7

\stemUp d8 b'\rest b4\rest \\\\
\stemUp d8 b'\rest b4\rest \\\\
\stemUp fs,8 c'\rest c4\rest \\\\
\stemDown d,8 d\rest d4\rest | %8
```
<!-- lilylet-end -->

🎧 [Spotify：贝多芬，G 大调弦乐四重奏，Op. 18/2，第四乐章](https://open.spotify.com/track/5AevVo3SRuHLJIZpz0WT6N)

大提琴对起始乐句的陈述包含两个不同的旋律动机。但这个乐句在第 4 小节 C4 上的结束，不足以形成终止式的收束。当其余弦乐器在第 5 小节进入时，它们处理的是同样的基本动机和对比动机，但能够形成一个 I:PAC 来结束后乐句。
