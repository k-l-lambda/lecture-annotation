# 音高与八度标记

### 键盘 ###

键盘非常有助于你在视觉、听觉和触觉上建立对乐理的理解。在下图中，键盘上标出了*音级*（pitch-class）的字母名称。

![键盘布局及音级字母名称](assets/keyboardlayout-small.png)

### 等音 ###

请注意，有些键有两个名称。当两个音级共用键盘上的同一个键时，我们就说它们是*等音*（enharmonic equivalence）。理论上，每个键都可以有好几个名称（例如，音 C 也可以看作 D𝄫），但通常没有必要知道两种以上的等音拼写。

### 八度标记 ###

要精确地指明某个特定的音高，我们还需要知道它的*音区*（register）。事实上，如果你只有升 C 或降 B，那你拥有的并不是一个*音高*，而是一个*音级*。音级加上音区，两者合在一起才能指明一个特定的音高。

我们将采用国际标准化组织（ISO）的音区标记体系。在这一体系中，中央 C（低音谱表上方第一条加线，或高音谱表下方第一条加线）是 C4。比中央 C 高一个八度的是 C5，比中央 C 低一个八度的是 C3。

这一体系的麻烦之处在于，八度从 C 开始，到 B 结束。因此，从中央 C 开始的上行音阶包含以下音高标记：

![从 C4 到 C5 的上行音阶](assets/C4toC5.png)

<!-- lilylet-begin: assets/C4toC5.png -->
```lyl.play
\omit Score.TimeSignature \omit Score.BarLine \key c \major \clef "treble" c1 d e f g a b c \undo \omit Score.BarLine \bar "||"
\addlyrics { C4 D4 E4 F4 G4 A4 B4 C5 } | %1
```
<!-- lilylet-end -->

从中央 C 开始的下行音阶包含以下音高标记：

![从 C4 到 C3 的下行音阶](assets/C4toC3.png)

<!-- lilylet-begin: assets/C4toC3.png -->
```lyl.play
\omit Score.TimeSignature \omit Score.BarLine \key c \major \clef "bass" c1 b a g f e d c \undo \omit Score.BarLine \bar "||"
\addlyrics { C4 B3 A3 G3 F3 E3 D3 C3 } | %1
```
<!-- lilylet-end -->

中音谱表上的音高如下：

![中音谱表上的音高（F3 至 G4）](assets/F3toG4-alto.png)

<!-- lilylet-begin: assets/F3toG4-alto.png -->
```lyl.play
\omit Score.TimeSignature \omit Score.BarLine \clef "alto" f,1 g a b c d e f g \undo \omit Score.BarLine \bar "||"
\addlyrics { F3 G3 A3 B3 C4 D4 E4 F4 G4 } | %1
```
<!-- lilylet-end -->

次中音谱表上的音高如下：

![次中音谱表上的音高](assets/pitchesTenor.png)

<!-- lilylet-begin: assets/pitchesTenor.png -->
```lyl.play
\omit Score.TimeSignature \omit Score.BarLine \clef "tenor" d,1 e f g a b c d \undo \omit Score.BarLine \bar "|."
\addlyrics { D3 E3 F3 G3 A3 B3 C4 D4 } | %1
```
<!-- lilylet-end -->

任何变音记号都沿用同一基本音名的自然音的八度标记。因此，比 C4 低半音的是降 C4（尽管它听起来与 B3 相同），比 C4 高半音的是升 C4。

请注意，一个完整的标记既包含音级名称（一个字母名称，外加可选的升号或降号），也包含音区（表示该音高所在八度的 ISO 数字）。只有两者兼备，你才拥有一个特定音高的完整标记。
