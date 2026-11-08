# 音程计算：白键法

归根结底，[音程](intervals.md)需要在听觉和视觉上都牢记于心。不过，有一些技巧能帮助你快速掌握它们。其中之一就是所谓的*白键法*（white-key method）。

### 白键法

*白键法*要求你记住钢琴白键之间的所有音程（或者干脆说，C 大调中的所有音程）。掌握这些之后，任何音程都可以看作某个白键音程的变化形式来计算。例如，如果我们知道 D4–F4 是小三度，而 D4–F#4 是把这个音程扩大了一个半音，就能推算出 D4–F#4 是大三度。

方便的是，白键音程在度数和性质上有大量重复。只需记住最常见的类型，再记住例外即可。

所有二度都是*大*二度，只有两个例外：E–F 和 B–C，它们是*小*二度。

![白键上的二度](assets/intervals/wnm-seconds.png)

<!-- lilylet-begin: assets/intervals/wnm-seconds.png -->
```lyl.play
\omit Score.TimeSignature \omit Score.BarLine \key c \major \clef "treble" <c d>1 <d e> <e f>^\markup "□" <f g> <g a> <a b> <b c>^\markup "□" | %1
```
<!-- lilylet-end -->

所有三度都是*小*三度，只有三个例外：C–E、F–A 和 G–B，它们是*大*三度。

![白键上的三度](assets/intervals/wnm-thirds.png)

<!-- lilylet-begin: assets/intervals/wnm-thirds.png -->
```lyl.play
\omit Score.TimeSignature \omit Score.BarLine \key c \major \clef "treble" <c e>1^\markup "□" <d f> <e g> <f a>^\markup "□" <g b>^\markup "□" <a c> <b d> | %1
```
<!-- lilylet-end -->

所有四度都是*纯*四度，只有一个例外：F–B，它是*增*四度。

![白键上的四度](assets/intervals/wnm-fourths.png)

<!-- lilylet-begin: assets/intervals/wnm-fourths.png -->
```lyl.play
\omit Score.TimeSignature \omit Score.BarLine \key c \major \clef "treble" <c f>1 <d g> <e a> <f b>^\markup "□" <g c> <a d> <b e> | %1
```
<!-- lilylet-end -->

信不信由你，只要你理解*音程转位*（interval inversion）的概念，现在你就已经知道*全部*白键音程了。例如，如果你知道除了 E–F 和 B–C（小二度）之外所有二度都是大二度，那么你也就知道，除了 F–E 和 C–B（大七度）之外，所有*七度*都是小七度。

![白键上的七度](assets/intervals/wnm-sevenths.png)

<!-- lilylet-begin: assets/intervals/wnm-sevenths.png -->
```lyl.play
\omit Score.TimeSignature \omit Score.BarLine \key c \major \clef "treble" <d c'>1 <e d'> <f e'>^\markup "□" <g f'> <a g'> <b a'> <c b'>^\markup "□" | %1
```
<!-- lilylet-end -->

一旦掌握了白键音程，你就可以通过相应地调整音程大小，推算出任何其他音程。
