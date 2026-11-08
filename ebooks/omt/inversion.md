# 倒影

倒影（inversion）与移位一样，常常与连接相似对象的运动联系在一起。你需要能够：(1) 将一组音高倒影；(2) 确定两组音高之间的倒影关系。

![德彪西《沉没的教堂》中的倒影](assets/postTonal/inversion.png)

<!-- lilylet-begin: assets/postTonal/inversion.png -->
```lyl.play
[composer "Claude Debussy"]
[staves "{-}"]

\staff "1" \omit Score.TimeSignature \key c \major \time 6/4 \clef "treble" ^\markup "[28]" r2 <c e g c>2\ff^\markup "C, D, G = {0, 2, 7}"( <d f a d>2 \\
\staff "2" \clef "bass" r2 <g, c e g>2( <a d f a>2 \\
\staff "2" c,,1.~_\markup "coll'8" | %1

\staff "1" <g' b d g>2.^\markup "T₄I →" <f a c f>4 <e g b e>4 <d f a d>4 \\
\staff "2" <d, g b d>2. <c f a c>4 <b e g b>4 <a d f a>4 \\
\staff "2" c,,1.~ | %2

\staff "1" <d f a d>2^\markup "A, D, E = {9, 2, 4}" <a c e a>2 <e' g b e>2) \\
\staff "2" <a, d f a>2 <e a c e>2 <b' e g b>2) \\
\staff "2" c,,1. \bar "|" | %3
```
<!-- lilylet-end -->

上面这段取自德彪西（Debussy）《沉没的教堂》（"Sunken Cathedral"）的片段就是一个例子。正如[以移位相联系的片段](transposition.md)那样，这两个音乐姿态具有相同的音程内容，因此我们的耳朵会认出它们非常相似。（德彪西为两个姿态配上了相同的节奏，从而强调了这种相似性。）但与移位不同的是，这两个姿态的音程内容并不是以相同的方式*排列*的。

![以倒影相联系的两个集合](assets/postTonal/inversionallyRelated.png)

两者具有相同的音程，但 {A,D,E} 这个集合的 +5 位于下方而不是上方。

倒影一个对象分两步进行，并且要*按这个顺序*：(1) 将对象中的音级以 0–6 对称轴为中心作镜像反射，然后 (2) 将其移位。我先在钟面上演示，然后再告诉你一个更简便的方法：

![用钟面进行倒影](assets/postTonal/invertingWithAClock.png)

幸运的是，倒影一个音高或一组音高有一个快得多的方法！给定任意一组音级和一个 _TnI_，只需用 _n_ 减去这些音级：

![用 n 减去音级](assets/postTonal/differences.png)

反过来，要确定联系两组音级的 _TnI_，就找出它们两两相加都得到的那个共同值。这个值就是 _TnI_ 中的 _n_：

![求和以确定 TnI](assets/postTonal/sums.png)
