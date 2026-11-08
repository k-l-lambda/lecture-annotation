# 键盘风格声部进行程式

下面是键盘风格声部进行的若干*程式*（schemata）。其中有些是足够常见、值得特别留意（并记住）的模式。另一些则需要非默认的声部进行或重复音。无论如何，这些都值得记住，既有助于写作/编配，也有助于识别标准模式。（其中一些在众赞歌风格的声部进行中也会派上用场。）

## 声部交换

当旋律线和低音线在一个简单的对位性延长过程中互换音高时，就出现了*声部交换*（voice exchange）。例如，在进行 **T1 D2 T3** 中，低音从 *do* 开始、结束于 *mi*。在声部交换中，旋律会把这一过程倒过来，从 *mi* 开始、结束于 *do*。这一常见模式可以用 **V<sup>6/4</sup>**、**V<sup>4/3</sup>** 或 **VII<sup>6/3</sup>** 和弦充当 **D2**：

![使用 V6/4 的声部交换](assets/harmony/VE64.png)

<!-- lilylet-begin: assets/harmony/VE64.png -->
```lyl.play
[staves "{-}"]

\staff "1" \omit Score.TimeSignature \key g \major \clef "treble" \stemUp b'2 a g \\
\staff "1" \stemDown <d g>2 <d fs> <d g> \\
\staff "2" \clef "bass" g,2 a b \bar "|."
^\figures { s2 <6 4> <6> }
\addlyrics { "T(1" D2p "3)" } | %1
```
<!-- lilylet-end -->

![使用 VII6/3 的声部交换](assets/harmony/VE63.png)

<!-- lilylet-begin: assets/harmony/VE63.png -->
```lyl.play
[staves "{-}"]

\staff "1" \omit Score.TimeSignature \key g \major \clef "treble" \stemUp b'2 a g \\
\staff "1" \stemDown <d g>2 <c fs> <d g> \\
\staff "2" \clef "bass" g,2 a b \bar "|."
^\figures { s2 <6> <6> }
\addlyrics { "T(1" D2p "3)" } | %1
```
<!-- lilylet-end -->

使用这种声部交换模式，可以保证整个延长过程中声部进行的平稳。

注意，第二个例子中 **D2** 经过和弦里的 *fa*（一个功能不协和音）*没有*向下解决到 *mi*。这是允许的，因为低音线需要 *mi*，而 *mi* 又不能重复；同时，平稳的外声部对位和级进的内声部运动抵消了未解决的不协和音可能带来的任何刺耳感。

声部交换也可以与 **D4** 替代和弦一起使用。注意，上方声部与用 **V<sup>6/4</sup>** 充当 **D2** 时完全相同。

![使用 D4 替代和弦的声部交换](assets/harmony/D4i.png)

<!-- lilylet-begin: assets/harmony/D4i.png -->
```lyl.play
[staves "{-}"]

\staff "1" \omit Score.TimeSignature \key g \major \clef "treble" \stemUp b'2 a g \\
\staff "1" \stemDown <d g>2 <d fs> <d g> \\
\staff "2" \clef "bass" g,2 c b \bar "|."
^\figures { s2 <4 2> <6> }
\addlyrics { T(1 D4i 3) } | %1
```
<!-- lilylet-end -->

这些模式可以用于大调或小调，可以移到任何调上，而且 **D2** 声部交换也可以反向使用——**T3 D2 T1**。它们也可以用来延长 S 和 D：例如 **S4 T5 S6** 或 **D5 S6 D7**。

## 平行十度

低音中的 *do–re–mi* 也常常伴随着旋律中的 *mi–fa–sol*，构成*平行十度*（parallel tenths）。

![平行十度](assets/harmony/ParallelTenths.png)

<!-- lilylet-begin: assets/harmony/ParallelTenths.png -->
```lyl.play
[staves "{-}"]

\staff "1" \omit Score.TimeSignature \key g \major \clef "treble" \stemUp b'2 c d \\
\staff "1" \stemDown <d g>2 <d fs> <d g> \\
\staff "2" \clef "bass" g,2 a b \bar "|."
^\figures { s2 <4 3> <6> }
\addlyrics { T(1 D2p 3) } | %1
```
<!-- lilylet-end -->

注意这里与 **D2** 声部交换中的 *fa* 一样，旋律中的 *fa* 是一个未解决的功能不协和音。在这种情况下，声部进行同样平稳到足以压倒功能不协和音必须解决的要求。

这一模式同样可以用于大调或小调，可以移到任何调上，也可以反向使用。它几乎总是用 **V<sup>4/3</sup>** 充当 **D2**。

## 香槟进行

虽然 **T(1 D2p 3)** 是为旋律中的 *mi–fa–sol* 配和声的一种完全可以接受的方式，但还有一种更有趣（也更复杂）的配和声方式，即理论家吉恩·比林格（Gene Biringer）所说的*香槟进行*（champagne progression）：**T1 S6 T3**。（他这样称呼它，是因为它是“你想给约会对象留下深刻印象时所用的进行”。）

香槟进行非常漂亮，但必须小心处理。*只能*在旋律为 *mi–fa–sol*（或 *me–fa–sol*）时使用它，并且*始终*使用下面的声部进行（注意 **S6** 和弦中对低音——*la*/*le*——的非标准重复）。

![香槟进行](assets/harmony/Champagne.png)

<!-- lilylet-begin: assets/harmony/Champagne.png -->
```lyl.play
[staves "{-}"]

\staff "1" \omit Score.TimeSignature \key g \major \clef "treble" \stemUp b'2 c d \\
\staff "1" \stemDown <d g>2 <e g> <d g> \\
\staff "2" \clef "bass" g2 e b \bar "|."
^\figures { s2 <6> <6> }
\addlyrics { T(1 S6d 3) } | %1
```
<!-- lilylet-end -->

标准的香槟进行（上例）用 **I<sup>6</sup>** 和弦充当 **T3**。下面是用 **III** 充当 **T3** 的一种变体，比林格称之为“粉红香槟”（pink champagne），因为它格外漂亮。它也应当格外*少用*，否则就会失去冲击力。

![粉红香槟进行](assets/harmony/PinkChampagne.png)

<!-- lilylet-begin: assets/harmony/PinkChampagne.png -->
```lyl.play
[staves "{-}"]

\staff "1" \omit Score.TimeSignature \key g \major \clef "treble" \stemUp b'2 c d \\
\staff "1" \stemDown <d g>2 <e g> <d fs> \\
\staff "2" \clef "bass" g2 e b \bar "|."
^\figures { s2 <6> s }
\addlyrics { T(1 S6d 3) } | %1
```
<!-- lilylet-end -->

香槟进行只应用于延长主功能。

## 阻碍解决

当一个 **D5**（**V** 或 **V<sup>7</sup>**）和弦没有像预期的那样进行到 **I** 以构成正格终止，而是进行到 **VI** 时，就出现了*阻碍解决*（deceptive resolution）。在阻碍解决中，重要的是 *ti* 要解决到 *do*——就像在正格终止中那样——而不是解决到 *la*/*le*。这既履行了它作为倾向音的角色，有助于“阻碍”效果的实现，又避免了小调中不协和的增二度 *ti*–*le*。其结果是 VI 的非标准重复（重复 *do*，而不是低音）。

![V–VI 阻碍解决](assets/harmony/deceptive.png)

<!-- lilylet-begin: assets/harmony/deceptive.png -->
```lyl.play
[staves "{-}"]

\staff "1" \omit Score.TimeSignature \key g \major \clef "treble" \stemUp a'2 g \\
\staff "1" \stemDown <d fs>2 <b g'> \\
\staff "2" \clef "bass" d,2 e \bar "|."
\addlyrics { D5 Tx6 } | %1
```
<!-- lilylet-end -->

![V7–VI 阻碍解决](assets/harmony/deceptive7.png)

<!-- lilylet-begin: assets/harmony/deceptive7.png -->
```lyl.play
[staves "{-}"]

\staff "1" \omit Score.TimeSignature \key g \major \clef "treble" \stemUp a'2 g \\
\staff "1" \stemDown <c fs>2 <b g'> \\
\staff "2" \clef "bass" d,2 e \bar "|."
^\figures { <7>2 s }
\addlyrics { D5 Tx6 } | %1
```
<!-- lilylet-end -->

## 省略五音

当 *ti*–*do* 出现在一个涉及 **V<sup>7</sup>** 的正格终止的旋律中时，不可能既让两个和弦都完整配置，*又*解决功能不协和音。

![D5 的问题](assets/harmony/D5problem.png)

<!-- lilylet-begin: assets/harmony/D5problem.png -->
```lyl.play
[staves "{-}"]

\staff "1" \omit Score.TimeSignature \key g \major \clef "treble" \stemUp fs'2 g \\
\staff "1" \stemDown <a' c>2 <b d> \\
\staff "2" \clef "bass" d,2 g, \bar "|."
^\figures { <7>2 s }
\addlyrics { D5 T1 } | %1
```
<!-- lilylet-end -->

解决这个功能不协和音是必须的，因为这一解决对于目标导向的运动、以及和声紧张度在终止到达时的释放有重要作用。为此，要么省略 **I** 和弦的五音（并三重复低音）：

![省略 I 和弦的五音](assets/harmony/T1dropFifth.png)

<!-- lilylet-begin: assets/harmony/T1dropFifth.png -->
```lyl.play
[staves "{-}"]

\staff "1" \omit Score.TimeSignature \key g \major \clef "treble" \stemUp fs'2 g \\
\staff "1" \stemDown <a' c>2 <g b> \\
\staff "2" \clef "bass" d,2 g, \bar "|."
^\figures { <7>2 s }
\addlyrics { D5 T1 } | %1
```
<!-- lilylet-end -->

要么省略 **V<sup>7</sup>** 和弦的五音，并重复低音：

![省略 V7 和弦的五音](assets/harmony/D5dropFifth.png)

<!-- lilylet-begin: assets/harmony/D5dropFifth.png -->
```lyl.play
[staves "{-}"]

\staff "1" \omit Score.TimeSignature \key g \major \clef "treble" \stemUp fs'2 g \\
\staff "1" \stemDown <c' d>2 <b d> \\
\staff "2" \clef "bass" d,2 g, \bar "|."
^\figures { <7>2 s }
\addlyrics { D5 T1 } | %1
```
<!-- lilylet-end -->

不完整的 **V<sup>7</sup>** 比不完整的 **I** 更可取，但进入 **V<sup>7</sup>** 的声部进行通常会决定你选择哪一种方案。

## 省略三音

当 **S4** 进行到 **D5**，且两者都是*七和弦*时，可能无法在完整配置两个和弦的同时，预备并解决两者的功能不协和音。

![S4 的问题](assets/harmony/S4problem.png)

<!-- lilylet-begin: assets/harmony/S4problem.png -->
```lyl.play
[staves "{-}"]

\staff "1" \omit Score.TimeSignature \key g \major \clef "treble" \stemUp a'2 a g \\
\staff "1" \stemDown <e g>2 <c fs> <b d> \\
\staff "2" \clef "bass" c,2 d g, \bar "|."
^\figures { <6 5>2 <7> s }
\addlyrics { S4 D5 T1 } | %1
```
<!-- lilylet-end -->

此时应从 **S4** 和弦中省略 *la*/*le*，并重复低音。这样既保留了触发音兼低音 *fa*，也保留了构成不协和的两个音高（*do* 和 *re*，或 *mi*/*me* 和 *fa*），并且能让上方声部中有第二个 *fa*，用来预备 **D5** 和弦的七音。

![省略 S4 和弦的三音](assets/harmony/S4dropThird.png)

<!-- lilylet-begin: assets/harmony/S4dropThird.png -->
```lyl.play
[staves "{-}"]

\staff "1" \omit Score.TimeSignature \key g \major \clef "treble" \stemUp a'2 a g \\
\staff "1" \stemDown <c g'>2 <c fs> <b d> \\
\staff "2" \clef "bass" c,2 d g, \bar "|."
^\figures { <6 5>2 <7> s }
\addlyrics { S4 D5 T1 } | %1
```
<!-- lilylet-end -->
