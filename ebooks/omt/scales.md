# 音阶与音级

音阶（scale）是按级进上行或下行的一串音高。级进有两种：*半音*（half steps）和*全音*（whole steps）。一个半音（H）由键盘上两个相邻的音高构成。一个全音（W）由两个半音构成。通常，音阶中的各个音高都用不同的字母名称记写，不过这并非总是可能或可取的。

### 半音阶 ###

半音阶（chromatic scale）完全由半音构成，使用一个八度之内键盘上的每一个音高。下面是从 C4 到 C5 的半音阶。

![半音阶](assets/chromaticscale.png)

<!-- lilylet-begin: assets/chromaticscale.png -->
```lyl.play
\omit Score.TimeSignature \omit Score.BarLine \key c \major \clef "treble" c1 cs d ds e f fs g gs a as b c \undo \omit Score.BarLine \bar "|" | %1
```
<!-- lilylet-end -->

### 大调音阶 ###

大调音阶（major scale）的声音你无疑很熟悉，它由七个全音（W）和半音（H）按以下顺序构成：W-W-H-W-W-W-H。音阶的第一个音高称为*主音*（tonic），音阶的其余部分都以它为基础。音阶上行时，主音会在末尾高八度重复出现。

下面是 D 大调音阶。它之所以叫"D 大调音阶"，是因为音高 D 是*主音*，并在音阶的两端都出现。

![大调音阶](assets/majorscale.png)

<!-- lilylet-begin: assets/majorscale.png -->
```lyl.play
\omit Score.TimeSignature \omit Score.BarLine \clef "treble" d1 e fs g a b cs d \undo \omit Score.BarLine \bar "|" | %1
```
<!-- lilylet-end -->

### 音级与唱名 ###

ISO 记法让我们能标出一个音高所在的具体音区，但了解这个音高在某个给定音阶中的位置，往往也很有用。例如，音级 D 是 D 大调音阶的第一个（也是最后一个）音。音级 A 是 D 大调音阶的第五个音。以这种方式描述时，我们把这些音称为*音级*（scale degrees），因为它们被放在一个特定音阶的语境之中。唱名音节——[一种有数百年历史的音高与视唱教学方法](http://en.wikipedia.org/wiki/Solfège)——也可以用来表示音级（以这种方式使用时，这一体系专门称为首调唱名法，movable-*do* solfège）。

音级用阿拉伯数字加脱字符（^）来标记，例如 1̂、5̂。下图给出了一个 D 大调音阶及相应的 ISO 记法、音级和唱名音节。

![D 大调音阶的 ISO 记法、音级与唱名](assets/sdsf.png)

<!-- lilylet-begin: assets/sdsf.png -->
```lyl.play
\omit Score.TimeSignature \omit Score.BarLine \key c \major \clef "treble" d1 e fs g a b cs d \undo \omit Score.BarLine \bar "|."
\addlyrics { D4 E4 F♯4 G4 A4 B4 C♯5 D5 }
\addlyrics { 1̂ 2̂ 3̂ 4̂ 5̂ 6̂ 7̂ 8̂/1̂ }
\addlyrics { do re mi fa sol la ti do } | %1
```
<!-- lilylet-end -->

### 小调音阶 ###

另一种你很可能非常熟悉的音阶是小调音阶（minor scale）。有好几种音阶都可以被称为*小调*音阶，它们都有一个特征性的第三音级，比大调音阶中的第三音级低。共性写作时期（Common Practice period）调性音乐中最常用的小调音阶，以*爱奥利亚调式*（aeolian mode）为基础（稍后你将读到更多关于调式的内容），有时也称为*自然小调*（natural minor）音阶。

自然小调音阶由七个全音（W）和半音（H）按以下顺序构成：W-H-W-W-H-W-W。请注意唱名音节的变化。

![自然小调音阶的音级与唱名](assets/sdsf-naturalMinor.png)

<!-- lilylet-begin: assets/sdsf-naturalMinor.png -->
```lyl.play
\omit Score.TimeSignature \omit Score.BarLine \key c \major \clef "treble" d1 e f g a bf c d \undo \omit Score.BarLine \bar "|."
\addlyrics { D4 E4 F4 G4 A4 B♭4 C5 D5 }
\addlyrics { 1̂ 2̂ 3̂ 4̂ 5̂ 6̂ 7̂ 8̂/1̂ }
\addlyrics { do re me fa sol le te do } | %1
```
<!-- lilylet-end -->

如果你把上面的例子唱一遍，就会注意到它的结尾缺少大调音阶中那种结束感。在大调音阶中，这种结束感部分来自 *ti* 与 *do* 之间上行的半音。作曲家在使用小调式时，往往也希望有这种结束感。他们的做法是给第七音级加上变音记号，使其升高一个半音。如果在自然小调音阶的语境中这样做，就得到所谓的*和声小调*（harmonic minor）音阶。

![和声小调音阶的音级与唱名](assets/sdsf-harmonicMinor.png)

<!-- lilylet-begin: assets/sdsf-harmonicMinor.png -->
```lyl.play
\omit Score.TimeSignature \omit Score.BarLine \key c \major \clef "treble" d1 e f g a bf cs d \undo \omit Score.BarLine \bar "|."
\addlyrics { D4 E4 F4 G4 A4 B♭4 C5 D5 }
\addlyrics { 1̂ 2̂ 3̂ 4̂ 5̂ 6̂ ↑7̂ 8̂/1̂ }
\addlyrics { do re me fa sol le ti do } | %1
```
<!-- lilylet-end -->

现在音阶的最后两个音听起来要有终结感得多，但你可能会觉得从 *le* 唱到 *ti* 有些困难。在用小调写旋律时，作曲家常常"纠正"这一点：在趋向 *ti* 时，把 *le* 升高一个半音，变成 *la*。当旋律从 *do* 下行时，就不需要从 *ti* 到 *do* 的结束感了；同样，也不再需要"纠正" *le*，于是又重新使用小调音阶的自然形式。这些上行和下行的不同形式合在一起，称为*旋律小调*（melodic minor）音阶。

*旋律小调*音阶上行时使用 *la* 和 *ti*。

![旋律小调音阶（上行）的音级与唱名](assets/sdsf-melodicMinorAsc.png)

<!-- lilylet-begin: assets/sdsf-melodicMinorAsc.png -->
```lyl.play
\omit Score.TimeSignature \omit Score.BarLine \key c \major \clef "treble" d1 e f g a b! cs d \undo \omit Score.BarLine \bar "|"
\addlyrics { D4 E4 F4 G4 A4 B4 C5 D5 }
\addlyrics { 1̂ 2̂ 3̂ 4̂ 5̂ ↑6̂ ↑7̂ 8̂/1̂ }
\addlyrics { do re me fa sol la ti do } | %1
```
<!-- lilylet-end -->

*旋律小调*音阶下行时使用"自然的" *te* 和 *le*。

![旋律小调音阶（下行）的音级与唱名](assets/sdsf-melodicMinorDesc.png)

<!-- lilylet-begin: assets/sdsf-melodicMinorDesc.png -->
```lyl.play
\omit Score.TimeSignature \omit Score.BarLine \key c \major \clef "treble" d'1 c bf a g f e d \undo \omit Score.BarLine \bar "|"
\addlyrics { D5 C5 B♭4 A4 G4 F4 E4 D4 }
\addlyrics { 8̂/1̂ 7̂ 6̂ 5̂ 4̂ 3̂ 2̂ 1̂ }
\addlyrics { do te le sol fa me re do } | %1
```
<!-- lilylet-end -->

说实话，大多数作曲家并不会真的去考虑小调音阶的三种不同"形式"。*和声小调*音阶只是反映了作曲家在小调式中构建包含第七音级的和声时使用 *ti* 的倾向。同样，*旋律小调*音阶源于作曲家希望避免 *le* 与 *ti* 之间旋律上的增二度音程（详见[音程](intervals.md)一节）（也有些作曲家选择不回避这一点！）。实际上，小调音阶只有一种"版本"。在用小调写作时，作曲家何时使用 *la* 和 *ti*，由语境决定。
