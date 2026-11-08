# 移位

在后调性音乐中，移位（transposition）常常与运动联系在一起：取一个和弦、动机或旋律，当它被移位时，听觉上的效果就是把这个和弦、动机或旋律朝某个方向*移动*。下面这两段取自德彪西（Debussy）《沉没的教堂》（*La cathédrale engloutie*）的不相连的片段，产生的正是这种效果：

![德彪西《沉没的教堂》中的移位](assets/postTonal/transposition.png)

<!-- lilylet-begin: assets/postTonal/transposition.png -->
```lyl.play
[composer "Claude Debussy"]
[staves "{-}"]

\staff "1" \key c \major \time 6/4 \clef "treble" \stemUp <d' g d'>1.^\markup "8va"^\markup "B, D, E = {11, 2, 4}" \\
\staff "1" \stemDown r4 <d g d'>4(\pp <e a e'> <b' e b'> <d g> <e a>) \\
\staff "2" \clef "bass" \stemUp d4\rest <d, g>( <e a> <b' e> <d g> <e a>) \\
\staff "2" \stemDown <g,, d' g>1. \bar "||" | %1
```
```lyl.play
[composer "Claude Debussy"]
[staves "{-}"]

\staff "1" \key c \major \time 6/4 \clef "treble" ^\markup "[18]" \stemUp <fs' gs ds' gs>1._\markup "p marqué"^\markup "D♯, F♯, G♯ = {3, 6, 8}" \\
\staff "1" \stemDown s4 \clef "bass" <ds, b' ds fs>4(\pp <fs cs' ds gs>4 \clef "treble" <ds' fs b ds>4) s2 \\
\staff "2" \clef "bass" \stemUp <fs, gs ds' gs>1. \\
\staff "2" \stemDown r8 b,,,8([ b' fs' b, fs' b, fs'] \stemUp <gs' b>8[ fs)] s4 | %1
```
<!-- lilylet-end -->

开头的动机由 B、D、E 三个音构成，即 {11, 2, 4}；它在第 18 小节被移高四个半音，表现教堂从水面缓缓升起。移位一个对象会保留它的音程内容；不仅如此，它还保留该对象音程的具体排列方式。当我们听到上例第 18 小节的片段时，我们能认出它与第 1 小节片段之间的关系，因为同样的音程再次出现了，只是从另一个音高开始。

移位是一种运算（operation），即对一个音高、一个音级或这些东西的集合所*施加*的某种操作；它也可以是一种*度量*（measurement），表示事物之间的距离。我们把它记作 *Tn*，其中 *n* 表示两个事物之间的有序音级音程。要按 *Tn* 移位某个对象，就把 *n* 加到该对象的每个元素上（模 12）。以上例第 1 小节中的音级集合按 *T4* 移位为例：

![按 T4 移位 {11, 2, 4}](assets/postTonal/t4.png)

结果就是第 18 小节中的音级。*T4* {11, 2, 4} = {3, 6, 8}。

反过来，要确定两个事物*之间*的移位关系，就用第二个减去第一个。如果所得的数全都相同，那么这两个事物就由该 *Tn* 相联系。

![用减法度量 T4 关系](assets/postTonal/t4Measurement.png)

上面谱例中 *T4* 箭头标记就是这样得出的：用第 18 小节的音级整数“减去”第 1 小节的音级整数。
