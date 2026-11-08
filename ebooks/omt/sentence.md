# 乐句（句子式）

典型的乐句（句子式）长八小节，包含两个四小节的分句。第一个称为*呈示分句*（presentation phrase），第二个称为*展开分句*（continuation phrase）。

![乐句（句子式）结构示意图](assets/ClassicalThemes/sentence.svg)

## 呈示分句（第 1–4 小节）

呈示分句是乐句（句子式）的开头，有两个主要组成部分，一个是旋律上的，另一个是和声上的。在旋律上，它包含两次重复的*基本动机*（basic idea，BI）。在和声上，它延长主功能，手段是[从属和声进行](harmonicSyntax2.md)或[对位和弦](harmonicSyntax2.md)。

![呈示：莫扎特（Mozart），K. 283，第一乐章，第 1–4 小节](assets/form/k283-presentation.png)

<!-- lilylet-begin: assets/form/k283-presentation.png -->
```lyl.play
[composer "Wolfgang Amadeus Mozart"]
[staves "{-}"]

\staff "1" \key g \major \time 3/4 \partial 4 \tempo "Allegro" \clef "treble" \ottava #0 \stemDown d'8.(\p[ b16)] \\
\staff "2" \clef "bass" \ottava #0 d,4\rest | %1

\staff "1" \stemDown d'4 b\rest \stemUp g( \\
\staff "2" \stemDown g8(\p[ b d b d b)] | %2

\staff "1" \stemUp fs4) b\rest \stemDown a'8.([ fs16)] \\
\staff "2" \stemDown a8([ c d c d c)] | %3

\staff "1" \stemDown a''4 b,\rest c( \\
\staff "2" \stemDown fs,8([ a d a d a)] | %4

\staff "1" \stemDown b'4) b\rest g'8.([ fs16)] \\
\staff "2" \stemDown g8([ b d b)] g4 \clef "treble" | %5
```
<!-- lilylet-end -->

这里，基本动机从第 1 小节的弱起开始，结束于第 2 小节强拍上的升 F。然后它被重复。尽管基本动机常常是原样重复的，但这个例子表明并非必须如此。基本动机是由其节奏和旋律轮廓更抽象地界定的，因此像这样的变化重复是可能的。

在和声上，这四个小节延长主功能。第二和第三小节是被主和弦包围的对位和弦：

> **I V4/3 V6/5 I**
或
> **T(1 D(2 7)n 1)**

总之，这个分句中基本动机的两次陈述和主功能延长体现了[*呈示功能*](themeFunctions.md)（presentation function）。“呈示分句”之名即由此而来。

## 展开分句（第 5–10 小节）

展开分句积聚动力，并导向结束乐句（句子式）的终止式。结束乐句（句子式）的终止式通常有三种：PAC、IAC 或 HC。

展开分句以[*展开功能*](themeFunctions.md)（continuation function）开始，展开功能具有以下五个特征中的一个或多个（但不一定全部具备）。

- 碎片化（fragmentation）：旋律单元的尺寸缩小
- 消解（liquidation）：去除“特征性”的旋律音型
- 模进重复
- 表层节奏加快
- 和声节奏加快

![呈示 + 展开：莫扎特，K. 283，第一乐章，第 1–10 小节](assets/form/k283.png)

<!-- lilylet-begin: assets/form/k283.png -->
```lyl.play
[composer "Wolfgang Amadeus Mozart"]
[staves "{-}"]

\staff "1" \key g \major \time 3/4 \partial 4 \tempo "Allegro" \clef "treble" \ottava #0 \stemDown d'8.(\p[ b16)] \\
\staff "2" \clef "bass" \ottava #0 d,4\rest | %1

\staff "1" \stemDown d'4 b\rest \stemUp g( \\
\staff "2" \stemDown g8(\p[ b d b d b)] | %2

\staff "1" \stemUp fs4) b\rest \stemDown a'8.([ fs16)] \\
\staff "2" \stemDown a8([ c d c d c)] | %3

\staff "1" \stemDown a''4 b,\rest c( \\
\staff "2" \stemDown fs,8([ a d a d a)] | %4

\staff "1" \stemDown b'4) b\rest g'8.([ fs16)] \\
\staff "2" \stemDown g8([ b d b)] g4 | %5

\staff "1" \stemDown fs'8(\fp[ e)] e4 g8.([ e16)] \\
\staff "2" \clef "treble" \stemUp <c g'>2 _\fp b'4\rest | %6

\staff "1" \ottava #0 \stemDown e'8([_\fp d)] d4 g8.(\f[ d16)] \\
\staff "2" \ottava #0 \stemUp <b g'>2_\fp b'4\rest | %7

\staff "1" \stemDown d'4-! d-! d-! \\
\staff "2" \clef "bass" \stemDown <a c>4(\f <g b> <fs a>) | %8

\staff "1" \stemDown d'16[ e fs g] a[ b c d] c[ b a g] \\
\staff "2" \stemDown <g b>4 d\rest <e g> | %9

\staff "1" \stemDown fs'16[ e d c] b[ d b g] \stemUp a[ c a fs] \\
\staff "2" d,4\rest \stemUp g( c) \\
\staff "2" s4 \stemDown d,2 | %10

\staff "1" g'4 b\rest b\rest \\
\staff "2" \stemUp b4 g, d'\rest \\
\staff "2" \stemDown g4 | %11
```
<!-- lilylet-end -->

🎧 [Spotify：莫扎特钢琴奏鸣曲 K. 283 第一乐章](https://open.spotify.com/track/1sknTFvB6zFOtSoyDcqM23)

这个例子体现了全部五个特征。基本动机建立了一个两小节长的常规单元。从第 5 小节的弱起开始，这一常规尺寸被*碎片化*为一小节的单元，其后半部分低一级*模进*。在第 7 小节，*表层节奏加快*与*和声节奏加快*相配合：钢琴家的十六分音符出现在其左手的赫米奥拉之上。

乐句（句子式）总是以支持[*终止功能*](themeFunctions.md)（cadential function）的终止进行结束。在这一段中，第 5–8 小节通过对位和弦延长主功能，而第 8–10 小节则采用了一个典型的终止进行：

> **I IV6 Cad.6/4 V7 I**
或
**T1 S6 D5 — T1**

而且，第 5–8 小节使用的是基本动机的片段（旋律中的“特征性”要素），第 8–10 小节则把它们*消解*为与基本动机无关的要素（“常规性”要素——音阶和琶音，以下行轮廓结束）。

## 分句长度 ##

注意这个例子中分句的长度：一个四小节的呈示分句之后，是一个*六小节*的展开分句。典型的分句是四小节，但作曲家常常对其进行[扩展](internalExpansions.md)，甚至压缩。在乐句（句子式）中，展开分句比呈示分句更可能经历扩展或收缩。
