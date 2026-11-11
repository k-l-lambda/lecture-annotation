---
title: "整数记法中的音程"
slug: "intervals-in-integer-notation"
source: "https://viva.pressbooks.pub/openmusictheory/chapter/intervals-in-integer-notation/"
authors: ["Megan Lavengood", "Brian Moseley"]
license: "CC BY-SA 4.0"
modified: "2025-07-15"
---

# 整数记法中的音程

> **要点**
>
> - 分析无调性音乐时，把音程理解为若干半音，可能比使用调性音程名称更清楚。
> - 共有四种音程类型：
> 	- 有序音高音程以半音数计量音高之间的距离，并用正号或负号（+/−）表示方向。
> 	- 无序音高音程计量音高之间的半音数，但不表示方向（不带 +/−）。
> 	- 有序音级音程计量音级空间（钟面）中两个音级的距离，总是沿顺时针（上行）方向。这与以十二小时制计量时间相似：9 点到 5 点是 8 小时，永远不是 4 小时。
> 	- 音程级（无序音级音程）表示两个音级之间可能的最小半音距离；因此，音程级始终 ≤6。
> - 有序音高音程尽可能具体：它们计量具体的音高（处于具体八度），并体现音程的方向性。
> - 音程级是最抽象的音程类型：它们表示两个音级之间可能的最小距离。

在调性音乐中，由于音程取决于构成它们的音高，音程的协和与不协和是由*调性本身*决定的。设想由 G 和 B♭ 构成的音程，即一个小三度。在 G 小调的语境中，这是一个协和音程。若重新拼写为 G 和 A♯，也许是在 B 小调的语境中，它就成为一个不协和的增二度。因此，从调性的角度看，这两个音程在不同的调性语境中是不同的，尽管它们在钢琴键盘上是同一个键（谱例 1）。

🎼 [MuseScore 曲谱](https://musescore.com/user/32728834/scores/5706820)

谱例 1. 尽管 B♭ 和 A♯ 在键盘上是同一个键，小三度与增二度这两个音程在调性理论中是不同的。

与之对照的是无调性音乐。由于无调性音乐没有调性，B♭ 与 A♯ 之间的区别不再重要。在这个语境中，音程 G–B♭ 与 G–A♯ *是*相同的。因此，我们将不使用“小三度”之类的调性音程名称，而是按音高或音级之间的半音数来计量音程。

我们可以依据两类信息来描述音程：**音高与音级**、以及**有序音程与无序音程**。两者结合，就得到四种音程类型，汇总于谱例 2。下面逐一解释这几种音程类型。

|  | 音高音程 | 音级音程 |
| --- | --- | --- |
| 有序音程 | 有序音高音程 | 有序音级音程 |
| 无序音程 | 无序音高音程 | 无序音级音程／音程级（IC） |

谱例 2. 无调性理论中的四种音程类型。

## 音高音程（有序与无序）

![谱例 3. 上排的例子展示有序音高音程：音高之间的半音数，并用正号或负号表示方向。下排展示无序音程，它们不考虑方向，因而省略正负号。](../media/2019/05/ordered-vs-unordered-pitch-interval.png)*谱例 3. 上排的例子展示有序音高音程：音高之间的半音数，并用正号或负号表示方向。下排展示无序音程，它们不考虑方向，因而省略正负号。*

<!-- lilylet-begin: media/2019/05/ordered-vs-unordered-pitch-interval.png -->
```lyl.play
\omit Score.TimeSignature \key c \major \time 2/2 \clef "treble" cs2_\markup "ordered pitch interval: +19" af'' \bar "||" | %1
a''2_\markup "ordered pitch interval: -6" ds, \bar "||" | %2
cs2_\markup "unordered pitch interval: 19" af'' \bar "||" | %3
a''2_\markup "unordered pitch interval: 6" ds, \bar "||" | %4
```
<!-- lilylet-end -->
音高音程是以半音为单位计量的音高之间的距离，也就是说，八度被考虑在内。因此，音程 C<sub>4</sub>–E<sub>4</sub> 是 4：这两个音之间有四个半音。但如果把那个 E 移高一个八度（C<sub>4</sub>–E<sub>5</sub>），音程就变成 16：C 与 E 之间有四个半音，再加上低处那个 E 与高处那个 E 之间的一个八度（十二个半音）。

音高音程有有序和无序两种变体。要得到有序音高音程，只需加上正号或负号，以表示音程是上行还是下行。相比之下，无序音高音程不表示音高移动的方向——因而更适合用于和声音程。有序音高音程与无序音高音程的区别汇总于谱例 3。

## 有序音级音程

音级音程是以半音为单位、在音级空间（即围绕钟面）中计量的音级之间的距离。回到我们的 C<sub>4</sub>–E<sub>5</sub> 音程，现在我们只关心音级 C 和 E，而不涉及具体的八度。

有序音级音程计量音级之间的距离，总是上行。把这十二个音摆在钟面上，然后沿顺时针方向绕圈计量音程，是想象它的最容易的方式。因此，从 C 到 E = 4，但从 E 到 C = 8（谱例 4）。在日常生活中，这类似于以十二小时制计时，或计算一次上班的时长：如果你上午 9:00 到岗，一直工作到下午 5:00，那是 8 小时；从 A（音级 9）到 F（音级 5）的有序音级音程同样也是 8。

![谱例 4. 有序音级音程总是沿钟面顺时针行进。](../media/2019/05/Screen-Shot-2019-09-10-at-12.27.55-PM.png)*谱例 4. 有序音级音程总是沿钟面顺时针行进。*

<!-- lilylet-begin: media/2019/05/Screen-Shot-2019-09-10-at-12.27.55-PM.png -->
```lyl.play
\omit Score.TimeSignature \key c \major \time 2/2 \clef "treble" cs2_\markup "ordered pitch-class interval: 7" af'' \bar "||" | %1
a''2_\markup "ordered pitch-class interval: 6" ds, \bar "||" | %2
```
<!-- lilylet-end -->
## 音程级（IC）

无序音级音程通常被称为音程级。音程级是两个音级之间可能的最小距离。在钟面上，这意味着沿顺时针或逆时针行进，哪边短就走哪边。音程级是一个有用的概念，因为它把音程、音程的转位以及这些音程的任何复加版本联系在一起。你应当能够把这个概念与音高和音级的概念联系起来：音级是一个音高、它的等音异拼（可能不止一种）、以及这些拼写的任何八度移位。

这意味着音程级只有六个：1、2、3、4、5 和 6。如果你得到的是 7 这个音级音程，那么逆时针走会更短，7 就变成 5。同理，8 变成 4，9 变成 3，依此类推。C–E 和 E–C 都是音程级 4（谱例 5）。

![谱例 5. 无序音级音程也称为音程级。音程级计量音级之间可能的最小距离。](../media/2019/05/Screen-Shot-2019-09-10-at-12.36.47-PM.png)*谱例 5. 无序音级音程也称为音程级。音程级计量音级之间可能的最小距离。*

<!-- lilylet-begin: media/2019/05/Screen-Shot-2019-09-10-at-12.36.47-PM.png -->
```lyl.play
\omit Score.TimeSignature \key c \major \time 2/2 \clef "treble" cs2_\markup "unordered pitch-class interval: 5" af'' \bar "||" | %1
a''2_\markup "unordered pitch-class interval: 6" ds, \bar "||" | %2
```
<!-- lilylet-end -->
## 小结 {#summary}

把音高音程、音级音程、有序、无序进行不同的组合，我们就得到四种不同的音程概念。要理解其中每一种，并开始了解它们在分析中的各种用途，可以把它们想象成一个从最具体（有序音高音程）到最抽象（无序音级音程）的连续尺度。你可以在[集合理论速查表](https://viva.pressbooks.pub/app/uploads/sites/12/2019/05/INFO-set-theory-quick-reference-sheet.pdf)中找到这一概念与其他概念的联系。

在调性音乐中，有些情况下区分十三度与六度是有用的，另一些情况下则不然。同样，在你分析无调性音乐时，会发现不同类型的音程适合描述不同类型的现象。

> 延伸阅读

- Straus, Joseph N. 2016. *Introduction to Post-Tonal Theory*. 4<sup>th</sup> ed. Upper Saddle River, NJ: Prentice Hall.

> 资源

- [空白钟面（整数记法）](https://viva.pressbooks.pub/app/uploads/sites/12/2019/05/Clock-Faces-integers.pdf)
- [空白钟面（字母音名）](https://viva.pressbooks.pub/app/uploads/sites/12/2019/05/Clock-Faces-letters.pdf)
- [集合理论速查表](https://viva.pressbooks.pub/app/uploads/sites/12/2019/05/INFO-set-theory-quick-reference-sheet.pdf)：概述音高与音级、音程与音程级、集合与集合类这几对定义的区分。

> 作业

1. 音程（.[pdf](https://viva.pressbooks.pub/app/uploads/sites/12/2019/05/WK-intervals.pdf)、.[docx](https://viva.pressbooks.pub/app/uploads/sites/12/2019/05/WK-intervals.docx)）。要求学生在音乐作品中辨认音程类型（整数记法）。[练习表播放列表](https://open.spotify.com/playlist/0eyE798Pe63OxdxKpgBVAr?si=GDUMiZP5Toaa_kA9_2AttQ)

### 媒体署名

- Ordered vs unordered pitch interval © Bryn Hughes adapted by Megan Lavengood is licensed under a [CC BY-SA (Attribution ShareAlike)](https://creativecommons.org/licenses/by-sa/4.0/) license
- Ordered pitch class intervals © Bryn Hughes adapted by Megan Lavengood is licensed under a [CC BY-SA (Attribution ShareAlike)](https://creativecommons.org/licenses/by-sa/4.0/) license
- Pitch classes © Bryn Hughes adapted by Megan Lavengood is licensed under a [CC BY-SA (Attribution ShareAlike)](https://creativecommons.org/licenses/by-sa/4.0/) license
