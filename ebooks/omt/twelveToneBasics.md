# 十二音理论——基础

十二音音乐最常与一种称为*序列主义*（serialism）的作曲技法或风格联系在一起。不过，这两个术语并不等同。*序列主义*是一个宽泛的称谓，指的是对事物的*排序*，无论这些事物是音高、时值、力度还是其他。十二音作曲则更具体地指基于*十二个音级*之排序的音乐。

这种作曲风格最常与以阿诺德·勋伯格（Arnold Schoenberg）为领袖的一群作曲家联系在一起，其中还包括颇具影响力的作曲家安东·韦伯恩（Anton Webern）和阿尔班·贝尔格（Alban Berg）。但十二音作曲技法以及与之相关的观念对许多伟大的作曲家都影响深远，序列音乐和十二音音乐直到今天仍有人在写。这类音乐大多共享下面概述的一些相似公理，但作曲家们以这些基本观念为基础，发展出了完全独创的方法。

十二音音乐建立在一个*序列*（series，有时也称*音列* row）之上，它以特定顺序包含全部十二个音级。并没有一个适用于所有十二音音乐的序列；大多数作曲家为每部作品写一个独特的音列。（十二音序列共有 12! 个，即 12 的阶乘，等于 479,001,600 种不同的音列形式。可能性相当多！）下面是一个例子，韦伯恩《钢琴变奏曲》（Piano Variations）Op. 27 的音列：

![韦伯恩《钢琴变奏曲》Op. 27 的音列](assets/postTonal/basicRow.png)

<!-- lilylet-begin: assets/postTonal/basicRow.png -->
```lyl.play
\omit Score.TimeSignature \omit Score.BarLine \key c \major \clef "treble" b'4^\markup "P₁₁" g fs bf a gs d' c ef cs f e | %1
```
<!-- lilylet-end -->

使用十二音音列有一些一般规则，不过如我所说，各人的具体做法总是不同的：

1. 音级按顺序演奏；
2. 一个音级奏过之后，在下一个音列开始之前不再重复。

十二音音列可以用作主题，或用作动机的来源。和弦可以从音列中派生出来，音列也可以同时用于主题和和声两方面。我们把上面 Op. 27 所示的基本排序称为*原形*（prime form，P）。又因为它从 B（音级 11）开始，我们把它标为 **P11**。

音列可以被移位、倒影、逆行，或者对这些运算进行任意组合。将原形倒影，得到的是“I 形”（I-form）。与 P 形一样，I 形也以其第一个音级来标记。因此，下面这个音列是上面那个音列的倒影，称为 **I0**。注意它从 C（0）开始。

![音列的倒影形式 I0](assets/postTonal/inversion.png)

<!-- lilylet-begin: assets/postTonal/inversion.png -->
```lyl.play
[composer "Claude Debussy"]
[staves "{-}"]

\staff "1" \omit Score.TimeSignature \key c \major \time 6/4 \clef "treble" ^\markup "[28]" r2 <c e g c>2\ff^\markup "C, D, G = {0, 2, 7}"( <d f a d>2 \\
\staff "2" \clef "bass" r2 <g, c e g>2( <a d f a>2 \\
\staff "2" c,,1.~_\markup "coll'8" | %1

\staff "1" <g' b d g>2.^\markup "T₄I →" <f a c f>4 <e g b e>4 <d f a d>4 \\
\staff "2" <d, g b d>2. <c f a c>4 <b e g b>4 <a d f a>4 \\
\staff "2" c,,1.~ | %2

\staff "1" <d f a d>2^\markup "A, D, E = {9, 2, 4}" <a c e a>2 <e' g b e>2) \\
\staff "2" <a, d f a>2 <e a c e>2 <b' e g b>2) \\
\staff "2" c,,1. \bar "|" | %3
```
<!-- lilylet-end -->

原形和倒影形式也可以倒过来演奏，这称为逆行（retrograde）。在下例中，请注意这与上面的 P11 和 I0 音列之间是什么关系。P 形被逆行时，我们称之为“R 形”（R-form）。I 形被逆行时，称为“RI 形”（RI-form）。如例所示，R 形和 RI 形是按其*最后一个音级*来标记的。

![P、I、R、RI 四种音列形式](assets/postTonal/family.png)

<!-- lilylet-begin: assets/postTonal/family.png -->
```lyl.play
\omit Score.TimeSignature \omit Score.BarLine \key c \major \clef "treble" b'4^\markup "P₁₁ →" g fs bf a gs d' c ef cs f e^\markup "← R₁₁" | %1
```
```lyl.play
\omit Score.TimeSignature \omit Score.BarLine \key c \major \clef "treble" c'4^\markup "I₀ →" e f cs d ef a, b gs bf fs g^\markup "← RI₀" | %1
```
<!-- lilylet-end -->

这张图只显示了四种音列形式，但每一种形式都有十二个移位。因此，一个音列总共可以衍生出 48 个音列：12 × 4。这一组音列称为*音列类*（row class），作曲家写作时所取用的正是这个*音列类*。
