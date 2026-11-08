# 乐段

乐段（period）是古典风格中常见的一种主题类型，与[乐句（句子式）](sentence.md)一样。

乐段一般长八小节，包含两个四小节的乐句，分别称为*前乐句*（antecedent）和*后乐句*（consequent）。

![乐段结构示意图](assets/ClassicalThemes/period.svg)

乐段的特点是平衡与对称。其前乐句由一个基本动机开启，这个基本动机又在后乐句的开头再次出现。句子式只有一个终止式，而乐段则不同，它包含*两个终止式*：一个较弱的终止式结束*前乐句*，一个较强的终止式结束*后乐句*。

## 前乐句（第 1–4 小节）

句子式包含一个基本动机及其重复，而乐段则不同：开启乐段前乐句的两小节基本动机之后，总是跟着一个两小节的*对比动机*（contrasting idea，CI）。这个对比动机支撑着一个终止进行，以一个弱终止式（HC 或 IAC）结束前乐句。

![前乐句：海顿（Haydn），C 大调钢琴三重奏，Hob. XV:27，第三乐章，第 1–4 小节](assets/form/antecedent.png)

前乐句：海顿（Haydn），C 大调钢琴三重奏，Hob. XV:27，第三乐章，第 1–4 小节

<!-- lilylet-begin: assets/form/antecedent.png -->
```lyl.play
[composer "Joseph Haydn"]
[staves "{-}"]

\staff "1" \key c \major \time 2/4 \partial 8 \tempo "Presto" \clef "treble" \ottava #0 \stemDown c'16(\p[ d] \\
\staff "2" \clef "bass" \ottava #0 d,8\rest | %1

\staff "1" \stemDown c'8)-.[ g'16( a] g8)-.[ c16( d] \\
\staff "2" \stemDown <c e>8-. d,\rest <b' d>-. d,\rest | %2

\staff "1" \stemDown c''8)-.[ e-.] b,\rest d'16([ c] \\
\staff "2" \stemDown <a c>8-.[ <e g>-.] d4\rest | %3

\staff "1" \stemDown b''16[ a g f] e[ d e c)] \\
\staff "2" \stemDown <f, a>8-. d\rest <fs a>-. d\rest | %4

\staff "1" \stemDown b'8-.[ d-.] b\rest c16(\p[ d] \\
\staff "2" \stemDown <g b>8-.[ <g b>-.] d\rest d\rest | %5
```
<!-- lilylet-end -->

🎧 [Spotify：海顿，C 大调钢琴三重奏，Hob. XV:27，第三乐章](https://open.spotify.com/track/1BUSIhYdu0P8LBWXLpAx4g)

注意基本动机与对比动机之间形成的对比。BI 上行，以跳进到达主三和弦的各个音，勾勒出主三和弦；CI 则级进下行，导向一个弱的 I:HC。BI 旋律对主音的强调，在和声上伴随着一个主和弦延长（[*Romanesca* 程式](schemataOpensAndCloses.md)的一种变体）：

> **I V6 VI III**  
或  
**T(1 D7p x6 3)**

支撑 CI 的是一个扩展的终止进行：

> **III IV V<sup>6/5</sup>/V V**  
或  
**T3 S(4 [+]) D5**

<!--这个例子中的曲式功能进行与前乐句完全相同（这种情况很常见）：BI 呈现呈示功能，CI 呈现展开–终止功能。注意海顿在后乐句中只用了一个下属和弦（前乐句中的副属和弦被去掉了），并提前一拍进入属和弦，使 PAC 的主和弦到达能够落在乐句最后一小节的强拍上。这种为容纳结尾处额外的主和弦而压缩终止进行的做法很常见。-->

## 后乐句（第 5–8 小节）

后乐句总是以 BI 的再次陈述开始（偶尔有所变化），并以一个 CI 结束。后乐句的 CI 往往与前乐句的 CI 相似，但会稍作改动以容纳一个更强的终止式。后乐句的 CI 完全是新材料的情况也很常见。句子式可以用多种类型的终止式结束，而乐段的后乐句总是以 PAC 结束：

![前乐句 + 后乐句：海顿（Haydn），C 大调钢琴三重奏，Hob. XV:27，第三乐章，第 1–8 小节](assets/form/xv27.png)

前乐句 + 后乐句：海顿（Haydn），C 大调钢琴三重奏，Hob. XV:27，第三乐章，第 1–8 小节

<!-- lilylet-begin: assets/form/xv27.png -->
```lyl.play
[composer "Joseph Haydn"]
[staves "{-}"]

\staff "1" \key c \major \time 2/4 \partial 8 \tempo "Presto" \clef "treble" \ottava #0 \stemDown c'16(\p[ d] \\
\staff "2" \clef "bass" \ottava #0 d,8\rest | %1

\staff "1" \stemDown c'8)-.[ g'16( a] g8)-.[ c16( d] \\
\staff "2" \stemDown <c e>8-. d,\rest <b' d>-. d,\rest | %2

\staff "1" \stemDown c''8)-.[ e-.] b,\rest d'16([ c] \\
\staff "2" \stemDown <a c>8-.[ <e g>-.] d4\rest | %3

\staff "1" \stemDown b''16[ a g f] e[ d e c)] \\
\staff "2" \stemDown <f, a>8-. d\rest <fs a>-. d\rest | %4

\staff "1" \stemDown b'8-.[ d-.] b\rest c16(\p[ d] \\
\staff "2" \stemDown <g b>8-.[ <g b>-.] d\rest d\rest | %5

\staff "1" \ottava #0 \stemDown c'8)-.[ g'16( a] g8)-.[ c16( d] \\
\staff "2" \ottava #0 \stemDown <c e>8-. d,\rest <b' d>-. d,\rest | %6

\staff "1" \stemDown c''8)-.[ e-.] b,\rest d'16([ c] \\
\staff "2" \stemDown <a c>8-.[ <e g>-.] d4\rest | %7

\staff "1" \stemDown b''16[ a g f] e[ d c b)] \\
\staff "2" \stemDown <f, a>8-. d\rest <g b>-. d\rest | %8

\staff "1" \stemDown c'8-.[ c-.] b4\rest \\
\staff "2" \stemDown <c e>8-.[ <c e>-.] d,4\rest | %9
```
<!-- lilylet-end -->

在这个例子中，BI 在后乐句开头被原样再现。作为结尾的 CI 是前乐句结尾的轻微变体，此处经过改动以构成一个 PAC。
