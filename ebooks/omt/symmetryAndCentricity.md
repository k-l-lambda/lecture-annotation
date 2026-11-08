# 对称与中心性

后调性音乐中的中心性（centricity）可以通过多种方式确立，往往仅仅是通过强调。当某个音级在一个段落中经常是最低、最高、最响或最长的音时，这个音级就成了某种类似主音的东西。

除了这些手段之外，音高和/或音级的对称（symmetry）是后调性作曲家在其音乐中创造中心性的一种新方法。而一般意义上对对称的研究，会把我们带到远离通常与共性写作时期调性音乐相联系的作曲技法的地方。

## 音高对称

可以把音高对称想象成一面音乐的“镜子”。在下面这段选自巴托克（Bartók）《为弦乐、打击乐与钢片琴而作的音乐》（*Music for Strings, Percussion, and Celesta*）的段落中，第三小提琴（3. Vl.）演奏一个由两个下行音高音程组成的姿态：先 –5，再 –1。第四小提琴（4. Vl）则对它作了*镜像*（mirrored），演奏同样的音高音程，只是方向向上：先 +5，再 +1。在谱例下方，我把这些姿态在音高空间中图示了出来。你可以看到，两个姿态合起来形成了一个对称的拱形。

**巴托克，《为弦乐、打击乐与钢片琴而作的音乐》**

![巴托克《为弦乐、打击乐与钢片琴而作的音乐》，高声部弦乐的镜像姿态](assets/postTonal/upper.png)

<!-- lilylet-begin: assets/postTonal/upper.png -->
```lyl.play
[composer "Béla Bartók"]
[staves "<v3-v4>"]
[instrument-v3 "3. Vl."]
[instrument-v4 "4. Vl."]

\omit Score.TimeSignature \key c \major \clef "treble" r4 r8 gf''8-.[ \\\\
\clef "treble" R2 | %1

df'8( c)] r4 \\\\
r8 e8-.[ a( bf)] | %2
```
<!-- lilylet-end -->

![高声部弦乐姿态在音高空间中的对称](assets/postTonal/upperSymmetry.png)

音高对称总是意味着有一个*对称轴*（axis of symmetry）。沿用我们的镜子比喻，这就是音高空间中镜子所在的位置。在上面的例子中，镜子位于 B4。下面你会在低声部弦乐中看到同样的姿态。音高空间的线条表明，它有一个不同的*对称轴*——围绕 E2。

![巴托克《为弦乐、打击乐与钢片琴而作的音乐》，低声部弦乐的镜像姿态](assets/postTonal/lower.png)

<!-- lilylet-begin: assets/postTonal/lower.png -->
```lyl.play
[composer "Béla Bartók"]
[staves "<va2-vc2>"]
[instrument-va2 "2. Vle."]
[instrument-vc2 "2. Vlc."]

\omit Score.TimeSignature \key c \major \time 2/4 \clef "alto" R2 \\\\
\clef "bass" R2 | %1

r4 b8-.[ fs( \\\\
a,8-.[ d( ef)] r8 | %2

\partial 4 f,!8)] s8 \\\\
r4 | %3
```
<!-- lilylet-end -->

![低声部弦乐姿态在音高空间中的对称](assets/postTonal/lowerSymmetry.png)

## 音级对称

音级对称与音高对称非常相似，只是在[音级空间](pitchClass.md)中来理解。下面你会看到巴托克同一首作品中的另一个段落。和上面一样，低声部弦乐有一个上行姿态，镜像了高声部弦乐中的下行姿态。

![巴托克同一作品中的另一段落：高、低声部弦乐的镜像姿态](assets/postTonal/bartok.png)

<!-- lilylet-begin: assets/postTonal/bartok.png -->
```lyl.play
[composer "Béla Bartók"]
[staves "<v1-v2-va-vc-cb>"]
[instrument-v1 "1. Vl."]
[instrument-v2 "2. Vl."]
[instrument-va "1. Vle."]
[instrument-vc "1. Vlc."]
[instrument-cb "1. Cb."]

\omit Score.TimeSignature \key c \major \time 2/4 \clef "treble" r4 r8 e''8-.\f \\\\
\clef "treble" R2 \\\\
\clef "alto" R2 \\\\
\clef "bass" R2 \\\\
\clef "bass" R2 | %1

b''2~( \\\\
r4 r8 gs''8-.\f \\\\
R2 \\\\
r8 c,8-.\f f4~( \\\\
r8 c,8-.\f f4~( | %2

b''4. as8) \\\\
ds'2~( \\\\
r8 gs8-.\f cs4~( \\\\
f,2 \\\\
f,2 | %3

^\markup "[50]" R2 \\\\
ds'8[ d!8)] r4 \\\\
cs8[ d8)] r4 \\\\
fs,4) r4 \\\\
fs,4) r4 | %4
```
<!-- lilylet-end -->

把它映射到音级圆上，就显示出这个段落的音级对称。请非常仔细地观察这个圆形图。你会注意到，这个段落同时围绕 *2 和 8* 呈音级对称。与音高空间不同，音级的对称轴总是位于音级圆上*两个不同的点*。

![音级圆上的两个对称轴（2 与 8）](assets/postTonal/pitchClassAxes.png)
