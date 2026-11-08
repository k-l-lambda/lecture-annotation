# 十二音音乐——不变性

*不变性*（invariance）指的是某种东西得以保留：音程、力度、节奏、音高，等等。在初级十二音理论中，我们主要关注*音程*不变性和*音级片段*不变性。

**音程不变性**

每当一个音列被[移位](twelveToneIntervallicStructure.md)时，音列的有序音程内容都保持不变。因此，移位总会产生音程不变性。[逆行倒影](twelveToneIntervallicStructure.md)则产生逆行的音程不变性。

**片段不变性**

当一个音列经过变换后，其中某个音级片段保持不变，我们就说这个片段“保持不变”（held invariant）。看下面这个取自韦伯恩（Webern）《弦乐四重奏》Op. 28 的例子：

![韦伯恩《弦乐四重奏》Op. 28 中的片段不变性](assets/postTonal/invariance.png)

<!-- lilylet-begin: assets/postTonal/invariance.png -->
```lyl.play
[composer "Anton Webern"]

\omit Score.TimeSignature \key c \major \clef "treble" g'!8[^\markup "P₇ —T₈→ P₃" fs_\markup "(6789)" a! gs] c![ df_\markup "[TE01]" bf b!] ef,[ d!_\markup "[2345]" f! e!] \bar "||" | %1

ef8[ d!_\markup "[2345]" f! e!] gs[ a!_\markup "[6789]" fs g!] b![ bf_\markup "[TE01]" df c!] \bar "||" | %2
```
<!-- lilylet-end -->

括号标出了音列的[离散四音集合](twelveToneMusicDerivation.md)。注意，这些四音集合在两个不同的音列之间是*相同*的。也就是说，这些四音集合是*不变片段*（invariant segments）。这些片段之所以保持不变，是因为它们彼此之间的*关系*与两个音列之间的关系相同。由于这些四音集合之间是 _T8_ 关系，当音列*作为整体*按 _T8_ 移位时，这些四音集合就“保持不变”。（可以这样理解这个过程：当第一个四音集合 [6789] 按 _T8_ 移位时，它变成了最后一个四音集合 [2345]。因此，当整个音列按 _T8_ 移位时，最后一个四音集合就*变成*了第一个四音集合。）

要确定音列中的某个音级片段是否会保持不变、以及在何时保持不变：

(1) 在音列的其他位置找到一个等价的集合类。它可以是二音集合、三音集合、四音集合等。

(2) 确定它们之间的移位关系或倒影关系。

(3) 当音列按这*同一个*关系进行移位或倒影时，就会有一个片段保持不变。
