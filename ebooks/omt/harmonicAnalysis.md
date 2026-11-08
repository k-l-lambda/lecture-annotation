# 进行和声分析

分析一首乐曲或一个段落中的和声，不只是给和弦贴标签。即使是最基本的分析，也包含对特定和弦与和弦进行在更广阔语境中如何发挥功能的*诠释*。归根结底，只有当各个音乐要素都结合整部作品以及作品所处的历史背景得到诠释时，分析才算完整。不过，本资源只是逐步讲解如何进行基本的和声分析，即结合每个和弦与和弦进行所在的音乐乐句来诠释它们。

和声分析的第一步是*识别乐句*。在大多数情况下，这意味着从识别[*终止式*](cadenceTypes.md)入手。然而，并非每种乐句都以终止式结束，因此对主题类型保持敏感很重要。在古典器乐中，这意味着要留心聆听[类似乐段和乐句（句子式）的结构](classicalThemes.md)。在带歌词的古典或浪漫派音乐中，这意味着要特别留意诗行与旋律乐句的结尾。

识别出音乐乐句之后，为每个乐句做一个和声缩谱（例如通奏低音缩谱）会很有帮助。在乐谱/通奏低音声部下方，为每个和弦写上相应的罗马数字、**T/S/D** 标记，和/或一个未经诠释的功能低音符号（**T1 T3 S4** 等）。[这份讲义](assets/Handouts/HarmoniesByBassScaleDegree.pdf)可以帮助你确定通奏低音缩谱中各和弦的功能。

接下来，确定每个乐句的总体和声结构。古典音乐中的典型乐句会是以下几种之一：

- 不带终止式地延长主功能（例如古典风格的*呈示*乐句）
- 朝向正格终止进行（以 **V<sup>(7)</sup> I** 结束，功能低音中为 **D5 T1**）
- 朝向半终止进行（以 **V** 结束，功能低音中为 **D5**）

如果乐句延长主功能（没有终止式），就把*整个*乐句标为 **T–––**。

如果乐句以终止式结束，就要识别出*终止进行*（cadential progression）。它包括主功能区的最后一个和弦，后面可以接一个下属和弦或下属功能区（最常见的是单个和弦），以及一个必不可少的属功能区（最常见的是单个和弦或复合终止式公式）。半终止乐句到此结束。正格终止乐句则继续进行到最后的主功能区（通常是单个和弦）。

终止进行中的 **(S) D T** 应如此标注。识别出终止进行之后，它之前的一切都标为主功能延长。无论那是对位性延长、从属进行，还是两者的结合，都标为 **T–––**。（如果你不熟悉这些术语，请参阅[和声语法——延长](harmonicSyntax2.md)。）

因此，一个以半终止结束的乐句，其功能分析看起来是这样的：

> T—————— (S) D

一个以正格终止结束的乐句，其功能分析看起来是这样的：

> T—————— (S) D T

下面是海顿（Haydn）C 大调钢琴奏鸣曲 Hob. XVI:21 第一乐章开头的一段节选。每个和弦都标有罗马数字和 **T/S/D** 功能标记。其下方显示主功能延长：一个 T 后面接一条线，表示主功能区的时长。终止进行由最后一个主和弦（第 4 小节）开始，经过 **S D T**，到第 6 小节的 **PAC**。

![海顿 Hob. XVI:21 第一乐章开头：主功能延长与终止进行](assets/harmony/XVI-21-prolongation.png)

<!-- lilylet-begin: assets/harmony/XVI-21-prolongation.png -->
```lyl.play
[composer "Joseph Haydn"]
[staves "{-}"]

\staff "1" \key c \major \time 2/4 \partial 8 \clef "treble" \stemDown c'16.(-1\mf[ e32] \\
\staff "2" \clef "bass" r8 | %1

\staff "1" \stemDown g''16.)-4[ e32-1( c'8~] c16.[ b32 a16. g32)] \\
\staff "2" r8 c,8([ c')-1 e-.-2]
\addlyrics { _ I }
\addlyrics { _ T }
\addlyrics { _ T } | %2

\staff "1" \stemDown g''4(-3 f16.)-4\prall[ e32( d16.\prall c32)] \\
\staff "2" \stemDown d8(-1[ d, d') f-.-2]
\addlyrics { ii }
\addlyrics { S }
\addlyrics { — } | %3

\staff "1" \stemDown c'4(-1 b16.)-3\prall[ a'32(-5 g16. f32] \\
\staff "2" \stemDown g'8([ g,)] r8 b-2
\addlyrics { V }
\addlyrics { D }
\addlyrics { — } | %4

\staff "1" \stemDown f'4)-3\turn e16.[ g32(-5 c,16. e32-4] \\
\staff "2" \stemDown c8([ c,)] r8 e-.-2
\addlyrics { I }
\addlyrics { T }
\addlyrics { — } | %5

\staff "1" \stemDown a'16.)[ cs32-2 d16.-2\mordent f32] e16.([ g32-5 b,16.-1 d32] \\
\staff "2" \stemUp f,8([ f,)] r8 \stemDown <g' f'>8
\addlyrics { ii _ V }
\addlyrics { S _ D } | %6

\staff "1" \partial 4. \stemDown c'!4)-1-! r8 \\
\staff "2" r16. c,32([ e16. g32] c8)-! \bar ""
\addlyrics { _ _ I }
\addlyrics { _ _ T } | %7
```
<!-- lilylet-end -->

🎧 [Spotify：海顿 C 大调钢琴奏鸣曲 Hob. XVI:21 第一乐章](https://open.spotify.com/track/6k7Sa5GrujYsn7Ul85gjWQ)
