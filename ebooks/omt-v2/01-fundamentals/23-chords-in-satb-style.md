---
title: "SATB 风格的和弦"
slug: "chords-in-satb-style"
source: "https://viva.pressbooks.pub/openmusictheory/chapter/chords-in-satb-style/"
authors: ["Samuel Brady", "Chelsey Hamm"]
license: "CC BY-SA 4.0"
modified: "2026-06-11"
---

# SATB 风格的和弦

> **要点**
>
> - 在 SATB 风格中构成和弦时，有六条规则需要记住：
> 	1. 符干方向
> 	2. 和弦构成
> 	3. 音域
> 	4. 音距
> 	5. 声部交错
> 	6. 重复

音乐理论家有时把作品简化为四个声部，以便让其中的和声内容更易把握。这种做法称为 SATB 风格（SATB style），其缩写来自合唱的四个常见声部——女高音（S）、女低音（A）、男高音（T）和男低音（B）。

在严格的 SATB 风格中构成和弦时，音乐家一般遵循六条规则：

1. 符干方向
2. 和弦构成
3. 音域
4. 音距
5. 声部交错
6. 重复

这六项参数构成了对位与声部写作的基础，[对位与加兰特图式](../02-counterpoint/README.md)和[自然音和声、离调与转调](../03-diatonic-harmony/README.md)两节对此有进一步的探讨。

## 符干方向

![谱例 1. 一处符干错误。](../media/2022/08/stemming.png)*谱例 1. 一处符干错误。*

<!-- lilylet-begin: media/2022/08/stemming.png -->
```lyl.play
[staves "{-}"]

\staff "1" \key c \major \time 2/4 \clef "treble" \stemDown g'2 ^\markup "Incorrect" \\
\staff "1" \stemUp d2 _\markup "stems in wrong direction!" \\
\staff "2" \clef "bass" \stemUp g2 \\
\staff "2" \stemDown b,2
\addlyrics { "C: V⁶" } | %1

\staff "1" \stemUp g'2 ^\markup "Correct" \\
\staff "1" \stemDown d2 \\
\staff "2" \stemUp g2 \\
\staff "2" \stemDown b,2
\addlyrics { "C: V⁶" } | %2
```
<!-- lilylet-end -->
在 SATB 风格的大谱表中，女高音和女低音写在（上方谱表的）高音谱号上，男高音和男低音写在（下方谱表的）低音谱号上。女高音和男高音的符干朝上，女低音和男低音的符干朝下。如果符干方向弄错了，那就是一处错误。谱例 1 先是展示了一个符干标错的和弦，随后是改正后的版本。

## 和弦构成

![谱例 2. 一处和弦构成错误。](../media/2022/08/wrong-notes.png)*谱例 2. 一处和弦构成错误。*

<!-- lilylet-begin: media/2022/08/wrong-notes.png -->
```lyl.play
[staves "{-}"]

\staff "1" \key c \major \time 2/4 \clef "treble" \stemUp b'2 ^\markup "Incorrect" \\
\staff "1" \stemDown ds2 \\
\staff "2" \clef "bass" \stemUp ff,2 \\
\staff "2" \stemDown d,2
\addlyrics { "C: vii°⁶" } | %1

\staff "1" \stemUp b'2 ^\markup "Correct" \\
\staff "1" \stemDown d2 \\
\staff "2" \stemUp f,2 \\
\staff "2" \stemDown d,2
\addlyrics { "C: vii°⁶" } | %2
```
<!-- lilylet-end -->
务必检查每个和弦的音与变音记号是否正确，并确保你的和弦没有漏掉任何音。在谱例 2 中，第一个和弦有两个音被误加了变音记号，第二个和弦去掉了这些记号，构成一个正确的第一转位 B 减三和弦。

低音声部必须始终与罗马数字的数字所指示的转位相符。不过，上方各音的顺序可以有多种安排。换言之，一个和弦并不一定只有一种正确的排列方式。

## 音域

![谱例 3. 各声部的音域。](../media/2022/08/range.png)*谱例 3. 各声部的音域。*

<!-- lilylet-begin: media/2022/08/range.png -->
```lyl.play
[staves "<s-a-t-b>"]
[instrument-s "Soprano" "S"]
[instrument-a "Alto" "A"]
[instrument-t "Tenor" "T"]
[instrument-b "Bass" "B"]

\omit Score.TimeSignature \key c \major \time 4/4 \clef "treble" \stemUp c2\glissando \stemDown g''2
\addlyrics { C₄ G₅ } \\\\
\clef "treble" \stemUp g2\glissando \stemDown d''2
\addlyrics { G₃ D₅ } \\\\
\clef "bass" \stemUp c,2\glissando \stemDown g''2
\addlyrics { C₃ G₄ } \\\\
\clef "bass" \stemUp f,,2\glissando \stemDown d''2
\addlyrics { F₂ D₄ } | %1
```
<!-- lilylet-end -->
每个声部都有公认的音域（谱例 3）：

- 女高音 – C<sub>4</sub> 到 G<sub>5</sub>
- 女低音 – G<sub>3</sub> 到 D<sub>5</sub>
- 男高音 – C<sub>3</sub> 到 G<sub>4</sub>
- 男低音 – F<sub>2</sub> 到 D<sub>4</sub>

![谱例 4. 一处音域错误。](../media/2020/05/too-high.png)*谱例 4. 一处音域错误。*

<!-- lilylet-begin: media/2020/05/too-high.png -->
```lyl.play
[staves "{-}"]

\staff "1" \omit Score.TimeSignature \key c \major \clef "treble" \stemUp d''2 ^\markup "too high!" ^\markup "Incorrect" \\
\staff "1" \stemDown f2 \\
\staff "2" \clef "bass" \stemUp a2 \\
\staff "2" \stemDown d,,2 _\markup "too low!"
\addlyrics { "C: ii" } | %1

\staff "1" \stemUp d'2 ^\markup "Correct" \\
\staff "1" \stemDown f2 \\
\staff "2" \stemUp a2 \\
\staff "2" \stemDown d,2
\addlyrics { "C: ii" } | %2
```
<!-- lilylet-end -->
在谱例 4 中，女高音和男低音的音超出了音域；改正的办法是把女高音的音下移一个八度、男低音的音上移一个八度。

## 音距

![谱例 15. 一处音距错误。](../media/2022/08/spacing.png)*谱例 15. 一处音距错误。*

<!-- lilylet-begin: media/2022/08/spacing.png -->
```lyl.play
[staves "{-}"]

\staff "1" \omit Score.TimeSignature \key c \major \clef "treble" \stemUp a''2 ^\markup "Incorrect" \\
\staff "1" \stemDown e2 _\markup ">8ve!" \\
\staff "2" \clef "bass" \stemUp c,2 ^\markup ">8ve!" \\
\staff "2" \stemDown a,2
\addlyrics { "C: vi" } | %1

\staff "1" \stemUp e'2 ^\markup "Correct" \\
\staff "1" \stemDown a'2 \\
\staff "2" \stemUp c2 \\
\staff "2" \stemDown a,2
\addlyrics { "C: vi" } | %2
```
<!-- lilylet-end -->
相邻上方声部之间（女高音与女低音、女低音与男高音）不应超过一个八度，男高音与男低音之间不应超过纯十二度。最常见的音距错误出现在女低音与男高音之间，因为这两个声部的音写在不同谱号上。谱例 15 首先展示了一个音距错误的和弦——女高音与女低音相距超过一个八度，女低音与男高音也是如此——随后是改正后的版本：

## 声部交错

![谱例 6. 一处声部交错错误。](../media/2022/08/voice-crossing.png)*谱例 6. 一处声部交错错误。*

<!-- lilylet-begin: media/2022/08/voice-crossing.png -->
```lyl.play
[staves "{-}"]

\staff "1" \key c \major \time 2/4 \clef "treble" \stemUp b'2 ^\markup "Incorrect" \\
\staff "1" \stemDown d2 _\markup "alto lower than tenor!" \\
\staff "2" \clef "bass" \stemUp f2 \\
\staff "2" \stemDown g2
\addlyrics { "C: V⁷" } | %1

\staff "1" \stemUp b'2 ^\markup "Correct" \\
\staff "1" \stemDown d2 \\
\staff "2" \stemUp d2 \\
\staff "2" \stemDown g2
\addlyrics { "C: V⁷" } | %2
```
<!-- lilylet-end -->
各声部的音域不应交叉。换句话说，女高音必须始终高于女低音，女低音必须始终高于男高音，男高音必须始终高于男低音。在谱例 6 中，女低音与男高音两个声部交错了。这种错误也最常见于女低音和男高音之间。

## 重复

![谱例 7. 一处重复错误。](../media/2022/08/doubled_lt.png)*谱例 7. 一处重复错误。*

<!-- lilylet-begin: media/2022/08/doubled_lt.png -->
```lyl.play
[staves "{-}"]

\staff "1" \key c \major \time 2/4 \clef "treble" \stemUp b'2 ^\markup "Incorrect" \\
\staff "1" \stemDown f2 _\markup "doubled leading tone!" \\
\staff "2" \clef "bass" \stemUp b2 \\
\staff "2" \stemDown d,2
\addlyrics { "C: vii°⁶" } | %1

\staff "1" \stemUp d'2 ^\markup "Correct" \\
\staff "1" \stemDown f2 \\
\staff "2" \stemUp b2 \\
\staff "2" \stemDown d,2
\addlyrics { "C: vii°⁶" } | %2
```
<!-- lilylet-end -->
在三和弦中，低音上的音通常会在某个上方声部中重复。不过有一个例外：导音绝不重复。其他倾向音，例如和弦七音，也绝不重复。七和弦没有任何音需要重复，因为它们共有四个音，每个声部各占一个。谱例 7 的第一小节展示了错误的重复方式——导音被重复，第二小节则给出了改正后的排列。

> 作业

敬请期待！

### 媒体署名

- Stemming © Megan Lavengood，采用 [CC BY-NC-SA（署名—非商业性使用—相同方式共享）](https://creativecommons.org/licenses/by-nc-sa/4.0/)许可协议
- Wrong-notes © Megan Lavengood，采用 [CC BY-NC-SA（署名—非商业性使用—相同方式共享）](https://creativecommons.org/licenses/by-nc-sa/4.0/)许可协议
- Range © Megan Lavengood，采用 [CC BY-NC-SA（署名—非商业性使用—相同方式共享）](https://creativecommons.org/licenses/by-nc-sa/4.0/)许可协议
- Too-high © Megan Lavengood，采用 [CC BY-NC-SA（署名—非商业性使用—相同方式共享）](https://creativecommons.org/licenses/by-nc-sa/4.0/)许可协议
- Spacing © Megan Lavengood，采用 [CC BY-NC-SA（署名—非商业性使用—相同方式共享）](https://creativecommons.org/licenses/by-nc-sa/4.0/)许可协议
- Voice-crossing © Megan Lavengood，采用 [CC BY-NC-SA（署名—非商业性使用—相同方式共享）](https://creativecommons.org/licenses/by-nc-sa/4.0/)许可协议
- Doubled\_lt © Megan Lavengood，采用 [CC BY-NC-SA（署名—非商业性使用—相同方式共享）](https://creativecommons.org/licenses/by-nc-sa/4.0/)许可协议
