# 装饰音

## 经过音（PT）

![经过音](assets/embellishingTones/passingTone.png)

<!-- lilylet-begin: assets/embellishingTones/passingTone.png -->
```lyl.play
[staves "{-}"]

\staff "1" \omit Score.TimeSignature \key c \major \clef "treble" e'4 d^\markup "PT" c2 \\
\staff "2" \clef "bass" c,1 \bar "|." | %1
```
<!-- lilylet-end -->

经过音是一种旋律装饰（通常是和弦外音），出现在两个稳定音（通常是和弦音）之间，形成级进运动。典型的音型是*和弦音–经过音–和弦音*，填充一个三度（见例），但也可以用两个相邻的经过音来填充相距四度的两个和弦音之间的空间。经过音可以是重音的（出现在强拍或拍子的强位置上），也可以是非重音的（出现在弱拍或拍子的弱位置上）。

## 完全辅助音（NT）

![完全辅助音](assets/embellishingTones/neighborTone.png)

<!-- lilylet-begin: assets/embellishingTones/neighborTone.png -->
```lyl.play
[staves "{-}"]

\staff "1" \omit Score.TimeSignature \key c \major \clef "treble" e'4 f^\markup "NT" e2 \\
\staff "2" \clef "bass" c,1 \bar "|." | %1
```
<!-- lilylet-end -->

与经过音一样，完全辅助音也是出现在两个稳定音（通常是和弦音）之间的旋律装饰；不过，完全辅助音出现在同一个稳定音的两次出现之间。同样与经过音一样，从稳定音到辅助音再回来的运动总是级进的。完全辅助音可以是重音的，也可以是非重音的，但非重音的更常见。

## 双辅助音型（DN）

![双辅助音型](assets/embellishingTones/doubleNeighbor.png)

<!-- lilylet-begin: assets/embellishingTones/doubleNeighbor.png -->
```lyl.play
[staves "{-}"]

\staff "1" \omit Score.TimeSignature \key c \major \clef "treble" e'4 f8[^\markup "DN" d] e2 \\
\staff "2" \clef "bass" c,1 \bar "|." | %1
```
<!-- lilylet-end -->

与完全辅助音型一样，双辅助音型以*同一个*稳定音（通常是和弦音）开始和结束。在这个稳定音的两次出现之间有两个装饰音——一个比被装饰的稳定音高一级，另一个低一级。虽然单独来看，我们可以把这两个装饰音各自看作不完全辅助音（见下文），但在双辅助音型中协同作用时，它们彼此平衡，构成一个连贯的整体，具有完全辅助音那样的整体稳定性。双辅助音型通常是非重音的。

## 不完全辅助音（INT）

![不完全辅助音](assets/embellishingTones/INT.png)

<!-- lilylet-begin: assets/embellishingTones/INT.png -->
```lyl.play
[staves "{-}"]

\staff "1" \omit Score.TimeSignature \key c \major \clef "treble" g''4 d^\markup "INT" e2 \\
\staff "2" \clef "bass" c,1 \bar "|." | %1
```
<!-- lilylet-end -->

不完全辅助音是一种非重音的装饰音，以跳进进入，并以级进进行到一个重音位置上的稳定音（通常是和弦音）。广义而言，不完全辅助音是指任何与一个稳定音相距一级、位于该稳定音之前或之后（另一侧则以跳进相连）的装饰音，但另有几种不完全辅助音具有特殊的名称和作用，见下文。

## 倚音（APP）

![倚音](assets/embellishingTones/appoggiatura.png)

<!-- lilylet-begin: assets/embellishingTones/appoggiatura.png -->
```lyl.play
[staves "{-}"]

\staff "1" \omit Score.TimeSignature \key c \major \clef "treble" g'2 d'8[^\markup "APP" c] f[^\markup "APP" e] \\
\staff "2" \clef "bass" b,4( d) c2 \bar "|." | %1
```
<!-- lilylet-end -->

倚音是一种重音的不完全辅助音，以跳进进入（通常是向上），随后以级进（通常是向下，但总是与前面的跳进方向相反）进行到一个更稳定的音（通常是和弦音）。

## 逃逸音（ESC）

![逃逸音](assets/embellishingTones/escapeTone.png)

<!-- lilylet-begin: assets/embellishingTones/escapeTone.png -->
```lyl.play
[staves "{-}"]

\staff "1" \omit Score.TimeSignature \key c \major \clef "treble" e'8[ f^\markup "ESC"] d[ e^\markup "ESC"] c2 \\
\staff "2" \clef "bass" g4 f e2 \bar "|." | %1
```
<!-- lilylet-end -->

逃逸音（又称 *echappée*）是一种非重音的不完全辅助音，从一个和弦音以级进（通常是向上）进入，随后以跳进离开（通常是向下，但总是与前面的级进方向相反）。

## 先现音（ANT）

![先现音](assets/embellishingTones/anticipation.png)

<!-- lilylet-begin: assets/embellishingTones/anticipation.png -->
```lyl.play
[staves "{-}"]

\staff "1" \omit Score.TimeSignature \key c \major \clef "treble" b'4. c8^\markup "ANT" c2 \\
\staff "2" \clef "bass" g2 c,2 \bar "|." | %1
```
<!-- lilylet-end -->

先现音本质上是一个来得过早的、原本稳定的音。先现音通常是一个紧接在和声变化之前出现的和弦外音，在和声变化时它后面跟着同一个音，此时这个音已成为新和声的和弦音。它通常出现在乐句以及更大曲式单位的结尾处。

## 切分音（SYN）

![切分音](assets/embellishingTones/syncopatedNote.png)

<!-- lilylet-begin: assets/embellishingTones/syncopatedNote.png -->
```lyl.play
\omit Score.TimeSignature \key e \major \clef "treble_8" gs'4 \chords "C#m" gs8[ gs]~ gs gs4 b8~^\markup "SYN"
\addlyrics { Ba -- by, ba -- _ by, ba -- } | %1

b'8 \chords "Bsus4" b4 b8~ b \bar ""
\addlyrics { _ by, light _ } | %2
```
<!-- lilylet-end -->

当一个通常出现在强拍或拍子强位置上的节奏型转而出现在弱拍或拍子弱位置上时，就产生了[切分](syncopation.md)。与先现音一样，切分音也是一种提前到达——它往往属于下一拍上的和弦。与先现音不同的是，切分音通过连线连到该和弦中的一个音上，而不是重新奏出。切分音并不是预先奏出后面和弦中的某个音，而只是一种提前到达。

## 延留音（SUS）

![延留音](assets/embellishingTones/suspension.png)

<!-- lilylet-begin: assets/embellishingTones/suspension.png -->
```lyl.play
[staves "{-}"]

\staff "1" \omit Score.TimeSignature \key c \major \clef "treble" c'2 c4 b
_\figures { s2 <4>4 <3> } \\
\staff "2" \clef "bass" f,2 g | %1

\staff "1" c'1 \\
\staff "2" c,1 \bar "|." | %2
```
<!-- lilylet-end -->

延留音由三个关键部分构成：*预备*（重音或非重音）、*延留音*本身（重音）和*解决*（非重音）。预备音是一个和弦音（协和音）。延留音与预备音是*同一个音*，并与和声变化同时出现。随后，延留音向下级进到解决音，解决音与延留音处在同一和声之上。延留音在许多方面与切分音相反：如果说先现音是属于后一个和弦的音提前到达，那么延留音就是属于前一个和弦的和弦音的滞留，它迫使新和弦的和弦音推迟到达。不过，在写作和即兴演奏中，延留音必须比切分音处理得更加小心。上方声部中最常见的延留音（及其解决）与低音构成以下音程模式：9–8、7–6、4–3。（除 9–8 外，解决音的音级绝不应在延留音发声的同时出现在另一个声部中。）比起标记为 *SUS*，更常见的做法是在通奏低音数字中标出其音程模式。

## 上行延留音（RET）

![上行延留音](assets/embellishingTones/retardation.png)

<!-- lilylet-begin: assets/embellishingTones/retardation.png -->
```lyl.play
[staves "{-}"]

\staff "1" \omit Score.TimeSignature \key c \major \partial 4 \clef "treble" <f b>4
_\figures { <7>4 } \\
\staff "2" \clef "bass" g4 | %1

\staff "1" <f b>2 <e c'>4
_\figures { <7 4>2 <8 3>4 } \\
\staff "2" c,2. \bar "|." | %2
```
<!-- lilylet-end -->

上行延留音（retardation，又称延迟音）本质上是一种向上解决的延留音。它几乎总是留给一个大型曲式段落（或一个乐章）的最后一个和弦使用，并且经常与延留音同时出现（如例中所示）。比起标记为 *RET*，更可取的做法是在通奏低音数字中标出其音程模式。
