# 十二音音乐——派生音列

*派生音列*（derived rows）是指其互不重叠的片段（*离散*片段，discrete segments）都属于同一集合类的音列。由于这些片段不能重叠，离散子集会把音列分成六个 2 音片段、四个 3 音片段、三个 4 音片段，或两个 6 音片段。（一般来说，我们主要关注由三音集合或四音集合派生的音列。）

下面给出一个例子。这个音列（取自韦伯恩（Webern）的《弦乐四重奏》（String Quartet）Op. 28）被分成了离散的四音集合和离散的二音集合。所有四音集合都属于集合类 (0123)。因此，我们说这个音列是由四音集合派生的，并且是由 (0123) *生成*的。此外，离散的二音集合还显示出一种有意思的二音派生，即由 (01) 派生。

![韦伯恩《弦乐四重奏》Op. 28 的派生音列](assets/postTonal/derivedRow.png)

<!-- lilylet-begin: assets/postTonal/derivedRow.png -->
```lyl.play
[composer "Anton Webern"]

\omit Score.TimeSignature \omit Score.BarLine \key c \major \clef "treble" \stemUp g'!8[^\markup "P₇" fs^\markup "(01)"] a![ gs^\markup "(01)"] c![ df^\markup "(01)"] bf[ b!^\markup "(01)"] ef,[ d!^\markup "(01)"] f![ e!^\markup "(01)"] \\
\stemDown g'!8[ fs_\markup "(0123)" a! gs] c![ df_\markup "(0123)" bf b!] ef,[ d!_\markup "(0123)" f! e!] | %1
```
<!-- lilylet-end -->

从作曲以及聆听的角度来看，派生音列非常富有启发性。由于音列的集合类内容在移位、倒影等运算下不会改变，这些集合类会在整部作品中不断循环出现，即使使用的是不同的音列形式。因此，派生音列保证了极少数几个集合类的规律性再现，从而确保了贯穿整部作品的某种特定的统一性。
