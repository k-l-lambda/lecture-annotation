# 古典终止式类型

*终止式*（cadence）是一个到达点，它为一个音乐单元的结尾加上标点；这个单元可以是乐句、主题、大型曲式段落或乐章。终止式同时是一个和声、旋律、节奏和曲式事件，但终止式通常是按照和声与旋律表达这一到达点的不同方式来分类的。

## 正格终止与半终止

这些结束单元的到达点首先被分为*正格终止*（authentic cadence）和*半终止*（half cadence）。当一个曲式单元以进行 **D5–T1**（**V<sup>(7)</sup>–I**，低音声部从 *sol* 到 *do*）结束时，就形成正格终止。如果伴随这一和声进行的旋律到达 *do*，就称为*完全正格终止*（perfect authentic cadence）；如果旋律结束于 *mi* 或 *me*（或者较少见地结束于 *sol*），就称为*不完全正格终止*（imperfect authentic cadence）。

结束于 **V** 而不进行到 **I** 的乐句称为*半终止*。这类终止式的旋律中通常含有 *re*，不过 *ti* 和 *sol* 也可以是旋律的到达点。这个 **V** 几乎总是三和弦而不是七和弦，并且总是原位（**D5**）。

无论是凭听觉还是看乐谱，能够区分*完全正格终止*（PAC）、*不完全正格终止*（IAC）和*半终止*（HC），对曲式分析和模仿写作都至关重要。

## 简单终止、复合终止与双重终止

意大利键盘论著的作者，如[富尔诺（Furno）](http://faculty-web.at.northwestern.edu/music/gjerdingen/partimenti/collections/Furno/regoleP5.htm)和[费纳罗利（Fenaroli）](http://faculty-web.at.northwestern.edu/music/gjerdingen/partimenti/collections/Fenaroli/Regole/regoleP3.htm)（以及较近期的美国历史理论家，如[罗伯特·O. 耶尔丁恩（Robert O. Gjerdingen）](http://faculty-web.at.northwestern.edu/music/gjerdingen/index.htm)），依据属和声上方的声部进行来区分终止式。这些区分并不取代上述 PAC/IAC/HC 的区分；而是增加了另一个层次的细节，这在模仿写作中特别有用。这些声部进行上的区分提供了另外三种终止式类别，与 PAC、IAC 和 HC 互为补充：*简单终止*（simple cadence）、*复合终止*（compound cadence）和*双重终止*（double cadence）。

当属和声功能由单个和弦（三和弦或七和弦）来表达时，就形成*简单终止*。简单终止可以用于 PAC、IAC 或 HC 的构造中，不过七和弦形式通常只出现在正格终止中。

当终止属和弦的低音 *sol* 重复出现、且第二个 *sol* 往往比第一个低一个八度时，就形成*复合终止*。复合终止有三种具体形式。

第一种复合终止包含一个在属和声低音 *sol* 上方的 4–3 延留音——从 *do* 到 *ti*。在四声部织体中，另外两个声部保持低音上方的五度和八度。*通奏低音*数字通常是简写的 4–3，在四声部中代表 8/5/4–8/5/3。4–3 延留音可以出现在 PAC、IAC 或 HC 的终止属和弦上方。

![4–3 复合终止。](assets/cadences/Compound43.png)

<!-- lilylet-begin: assets/cadences/Compound43.png -->
```lyl.play
[staves "{-}"]

\staff "1" \omit Score.TimeSignature \key c \major \clef "treble" \stemUp <g' d'>1 \\
\staff "1" \stemDown c'2 b \\
\staff "2" \clef "bass" g2 g,
^\figures { <4>2 <3> } | %1

\staff "1" <e g c>1 \\
\staff "2" c,1 \bar "|." | %2
```
<!-- lilylet-end -->

![4–3 复合终止，标出完整的通奏低音数字。](assets/cadences/Compound43-full.png)

<!-- lilylet-begin: assets/cadences/Compound43-full.png -->
```lyl.play
[staves "{-}"]

\staff "1" \omit Score.TimeSignature \key c \major \clef "treble" \stemUp e'2 d \\
\staff "1" \stemDown <g' c>2~ <g b> \\
\staff "2" \clef "bass" g2 g,
^\figures { <8 5 4>2 <8 5 3> } | %1

\staff "1" <e g c>1 \\
\staff "2" c,1 \bar "|." | %2
```
<!-- lilylet-end -->

第二种复合终止在上述 4–3 延留音的基础上，再加上一个从 *mi/me* 到 *re* 的声部（6–5）。在四声部织体中，低音被重复。典型的通奏低音数字是 6/4–5/3，这一进行的常用名称*终止四六和弦*（cadential six-four）即由此而来。完整的数字是 8/6/4–8/5/3。终止四六和弦可以出现在 PAC、IAC 或 HC 的终止属和弦上方。

![终止四六和弦。](assets/cadences/Cadential64.png)

<!-- lilylet-begin: assets/cadences/Cadential64.png -->
```lyl.play
[staves "{-}"]

\staff "1" \omit Score.TimeSignature \key c \major \clef "treble" \stemUp e'2 d \\
\staff "1" \stemDown <g' c>2~ <g b> \\
\staff "2" \clef "bass" g2 g,
^\figures { <6 4>2 <5 3> } | %1

\staff "1" <e g c>1 \\
\staff "2" c,1 \bar "|." | %2
```
<!-- lilylet-end -->

![终止四六和弦，标出完整的通奏低音数字。](assets/cadences/Cadential64-full.png)

<!-- lilylet-begin: assets/cadences/Cadential64-full.png -->
```lyl.play
[staves "{-}"]

\staff "1" \omit Score.TimeSignature \key c \major \clef "treble" \stemUp e'2 d \\
\staff "1" \stemDown <g' c>2 <g b> \\
\staff "2" \clef "bass" g2 g,
^\figures { <8 6 4>2 <8 5 3> } | %1

\staff "1" <e g c>1 \\
\staff "2" c,1 \bar "|." | %2
```
<!-- lilylet-end -->

最后一种复合终止是终止四六和弦的一种特殊情况：第四个声部在第二个属和弦上方引入七音，而不是在两个和弦上都只重复低音。这种复合终止需要四个声部，完整的通奏低音数字为 8/6/4–7/5/3。这一数字很少出现在半终止的属和弦上方，而主要用于正格终止。

![带七音的终止四六和弦。](assets/cadences/Cadential64-7th.png)

<!-- lilylet-begin: assets/cadences/Cadential64-7th.png -->
```lyl.play
[staves "{-}"]

\staff "1" \omit Score.TimeSignature \key c \major \clef "treble" \stemUp e'2 d \\
\staff "1" \stemDown <g' c>2 <f b> \\
\staff "2" \clef "bass" g2 g,
^\figures { <8 6 4>2 <7 5 3> } | %1

\staff "1" <e g c>1 \\
\staff "2" c,1 \bar "|." | %2
```
<!-- lilylet-end -->

*双重终止*是在终止属和弦上方的一种四阶段模式，几乎只用于完全正格终止。尽管到莫扎特（Mozart）和海顿（Haydn）的时代它已不再常用，但它是较早的*加朗特*（galant）作曲家以及*古典*作曲与伴奏论著中的常规手法。属和弦上方的四阶段模式为 5/3–6/4–5/4–5/3。在四声部中，低音同样被重复，或者也可以在任何*五度和弦*（chord of the fifth，即不是 6/4 的和弦）上加七音。

![双重终止。](assets/cadences/Double.png)

<!-- lilylet-begin: assets/cadences/Double.png -->
```lyl.play
[staves "{-}"]

\staff "1" \omit Score.TimeSignature \key c \major \clef "treble" \stemUp d'2 e \\
\staff "1" \stemDown <g' b>2 <g c> \\
\staff "2" \clef "bass" g1~
^\figures { <5 3>2 <6 4> } | %1

\staff "1" \stemUp <g' d'>1 \\
\staff "1" \stemDown c'2 b \\
\staff "2" g1
^\figures { <5 4>2 <5 3> } | %2

\staff "1" <e g c>1 \\
\staff "2" c,1 \bar "|." | %3
```
<!-- lilylet-end -->

## 严格键盘风格中的声部进行

在严格的旋律性键盘风格中，理想化乐句总要以完全正格终止（PAC）结束。只要可能，旋律的最后一个 *do* 都应以级进进入，从 *re* 或 *ti* 进入，最好从 *re* 进入。使用复合终止或双重终止时，上方声部采用上图所示的排列方式（当然要移到相应的调上）。

在*通奏低音*风格中，最高声部可以结束于主三和弦的任何一个音。尽可能使用上图中给出的声部，但要将它们转换排列（例如把次中音声部移到最上方，使原来的旋律声部和中音声部变为中音声部和次中音声部）。只需确保：如果 *ti* 在最后的主和弦之前出现在最高声部，它要按其倾向向上解决到 *do*。

无论哪种情况，都要特别注意复合终止中的终止四六和弦形式。尽管第一个和弦与低音构成协和的三和弦，但其六度音和四度音都像延留音一样起作用，因此*必须级进下行解决*，并且要平稳地预备（通过共同音或级进）。无论这些音位于旋律声部、中音声部还是次中音声部，都是如此。
