---
title: 摇摆节奏
slug: "swing-rhythms"
source: "https://viva.pressbooks.pub/openmusictheory/chapter/swing-rhythms/"
authors: ["Megan Lavengood"]
license: "CC BY-SA 4.0"
modified: "2025-07-15"
---

# 摇摆节奏

> **要点**
>
> - 摇摆八分音符在谱面上写作普通的平直八分音符，但演奏得不均匀，近乎三连音节奏，其中第一个音的长度是第二个音的两倍。
> - 反拍重音（backbeat）是通过重读四拍子的第 2、4 拍而造成的切分，在爵士乐中很常见。
> - 当节拍的层级关系被遮蔽时，就出现了切分。

爵士乐有许多赋予其风格特征的节奏用法。这一章介绍两种特别重要的节奏——摇摆八分音符与反拍重音——并泛论切分。

## 基本的摇摆律动

### 摇摆八分音符

![谱例 1. 摇摆八分音符的奏法是使第一个八分音符的长度约为第二个的两倍。](../media/2019/08/swung-eighths.png)*谱例 1. 摇摆八分音符的奏法是使第一个八分音符的长度约为第二个的两倍。*

摇摆节奏最易辨认的特征之一，就是摇摆八分音符。摇摆八分音符按不等长的八分音符奏出，形成近乎三连音的节奏，把比例从 1:1 变成大约 2:1——也就是说，第一个八分音符的长度约为第二个的两倍。谱例 1 用记谱示意了这一点。

虽然从某种意义上说，把爵士乐曲的八分音符记成谱例 1 中的三连音节奏可能更准确，但想一想那会多么杂乱！所以爵士乐中的摇摆八分音符总是写作平直八分音符，而演奏者理应知道要把它们摇摆起来。

🎧 [Spotify：Spotify 嵌入：序曲](https://open.spotify.com/track/2NTXTzvznh6bdlEkikXOEH)

![谱例 2. 全团在《Anything Goes》序曲的 0:36 处演奏谱面上所记的节奏。](../media/2019/08/anything-goes-1.png)*谱例 2. 全团在《Anything Goes》序曲的 0:36 处演奏谱面上所记的节奏。*

<!-- lilylet-begin: media/2019/08/anything-goes-1.png -->
```lyl.play
[composer "Cole Porter"]

\key c \major \numericTimeSignature \time 4/4 \clef "treble" f4-. f8[ f8->] r8 f8 f4-> \bar "|" | %1
```
```lyl.play
[composer "Cole Porter"]

\key c \major \numericTimeSignature \time 4/4 \clef "treble" f4-. \tuplet 3/2 { f4 f8-> } \tuplet 3/2 { r4 f8 } f4-> \bar "|" | %1
```
<!-- lilylet-end -->
![谱例 3. 这个包含平直八分音符的节奏，出现在《Anything Goes》序曲第二部分的鼓声部中。](../media/2019/08/anything-goes-2.png)*谱例 3. 这个包含平直八分音符的节奏，出现在《Anything Goes》序曲第二部分的鼓声部中。*

<!-- lilylet-begin: media/2019/08/anything-goes-2.png -->
```lyl.play
[composer "Cole Porter"]

\key c \major \numericTimeSignature \time 4/4 \clef "treble" f8[ f16 f] f8[ f] r8 f r f \bar ":|." | %1
```
<!-- lilylet-end -->
音乐剧《Anything Goes》（《万事成空》）的序曲中包含平直八分音符与摇摆八分音符两种段落。开头几分钟是摇摆的；在 0:36 处全团所有乐器一起奏摇摆八分音符，最容易听出来（谱例 2）。边听边跟着摇摆八分音符打拍子——注意速度非常快，所以你会敲得相当急。

拿这个与序曲中段从 0:52 开始的平直八分音符作对比（谱例 3）。在这个平直段落中，感觉发生了戏剧性的变化。边听边跟着平直八分音符打拍子，它的速度比第一部分的摇摆八分音符慢得多。

经过小号声部的一段快速过渡，摇摆八分音符在序曲第三部分、从 1:39 开始处回到。摇摆八分音符在架子鼓的踩镲（hi-hat）声中清晰可闻。

谱例 1 中记出的三连音节奏，是解释摇摆的常用方式，但实际上，摇摆八分音符的确切比例因曲而异，也因演奏者而异。一般来说，速度越快越趋向平直，速度越慢越倾向采用更夸张的摇摆。请比较[迪兹·吉莱斯皮（Dizzy Gillespie）的《Eternal Triangle》](https://open.spotify.com/track/7mV4LigxLh80JjZlSxEd9M?si=199d5a1f8d764353)与[贝西伯爵（Count Basie）的《Duet》](https://open.spotify.com/track/0WGYVxiIee4ZbJQD7pkLgv?si=784b01e3e8a44c53)——前者的摇摆节奏比较均匀，后者的摇摆则更不均匀。

### 反拍重音

爵士乐下一个最重要的节奏特征，是反拍重音。反拍重音是在四拍子的第 2、4 拍上加重音。这与古典音乐典型的轻重结构相反，古典音乐中第 1、3 拍通常是重心所在。（第 1 拍在爵士乐中依然重要——和弦变化通常仍发生在这里，和弦的根音也在这里奏出。它只是未必是*最响*的那一拍。）

反拍重音与摇摆八分音符合在一起，构成标准摇摆鼓点的重要部分（谱例 4）。反拍重音用闭合踩镲加重，而摇摆八分音符则在叮叮镲（ride cymbal）上演奏。鼓点变化很多，而且通常是即兴的，但这两个成分是你在大多数爵士鼓型中都会见到的。

🎼 [MuseScore 曲谱](https://musescore.com/user/32728834/scores/8514608)

<!-- embed-begin: https://musescore.com/user/32728834/scores/8514608 -->
<div class="omt-embed omt-embed-musescore"><iframe src="https://musescore.com/user/32728834/scores/8514608/embed" title="MuseScore" loading="lazy" style="height: 394px" allow="autoplay; fullscreen" allowfullscreen></iframe></div>
<!-- embed-end -->

谱例 4. 带有摇摆八分音符与反拍重音的标准摇摆鼓点。

跟着爵士乐曲打拍子时，试着跟着反拍重音打，而不是跟着强拍打。

## 切分

在理解切分之前，先要更一般地理解节拍（可参阅[单拍子](../01-fundamentals/10-simple-meter-and-time-signatures.md)与[复拍子](../01-fundamentals/11-compound-meters-and-time-signatures.md)两章）。当一系列等距的脉冲暗示出某种层级关系时，就产生了节拍。例如，$\mathbf{^4_4}$ 拍——大多数爵士乐所用的节拍——是四个四分音符（等距的拍）的序列，其中第 1 拍最重要，第 3 拍次之，第 2、4 拍最不重要。这里的「重要」意味着重要的事情发生在第 1 拍上：诸如和弦变化、调的变化等等。这些重要的事情也可能发生在第 3 拍，但不太常见；和弦变化出现在第 2 拍或第 4 拍则较为罕见。

当这种层级感以某种方式被颠覆时，就出现了切分。造成这种颠覆的方式很多，反拍重音实际上就是其中一例。反拍重音在第 2、4 拍上作响而不在第 1、3 拍上作响，通过加重 $\mathbf{^4_4}$ 拍中较次要的拍来制造切分。爵士乐另一种常见的切分是加重八分音符组中的第二个弱位八分音符，如上面谱例 2 所示。

除了遮蔽拍点的重音，切分也可以通过休止符与延音线造成：例如，开始旋律线条时避开强拍。用休止符与延音线造成切分的一个例子见谱例 5。

🎼 [MuseScore 曲谱](https://musescore.com/user/32728834/scores/6842546)

<!-- embed-begin: https://musescore.com/user/32728834/scores/6842546 -->
<div class="omt-embed omt-embed-musescore"><iframe src="https://musescore.com/user/32728834/scores/6842546/embed" title="MuseScore" loading="lazy" style="height: 394px" allow="autoplay; fullscreen" allowfullscreen></iframe></div>
<!-- embed-end -->

谱例 5. 卡拉·布莱（Carla Bley）[《Donkey》](https://open.spotify.com/track/65Hyx6iNbe1aKPlTiXxcYt?si=bb195e57f36c41b7)（1976）中的切分。

> 延伸阅读

- Aebersold, Jamey. 2000. *Jazz Handbook*. New Albany, IN: Jamey Aebersold Jazz.
- Straus, Joseph N. 2012. *Elements of Music*. 3<sup>rd</sup> ed. Upper Saddle River, NJ: Pearson.

> 作业

1. 摇摆节奏视频（[C 调乐器](https://viva.pressbooks.pub/app/uploads/sites/12/2022/07/WK-swing-rhythms-C_instruments.pdf)、[B♭ 调乐器](https://viva.pressbooks.pub/app/uploads/sites/12/2022/07/WK-swing-rhythms-Bb_instruments.pdf)、[E♭ 调乐器](https://viva.pressbooks.pub/app/uploads/sites/12/2022/07/WK-swing-rhythms-Eb_Instruments.pdf)、[F 调乐器](https://viva.pressbooks.pub/app/uploads/sites/12/2022/07/WK-swing-rhythms-F_instruments.pdf)与[低音谱号乐器](https://viva.pressbooks.pub/app/uploads/sites/12/2022/07/WK-swing-rhythms-Bass_clef_instruments.pdf)的 PDF）。要求学生与搭档合作，制作一段演奏地道摇摆节奏的视频。[下载伴奏](../media/2020/10/swing-rhythms-backing-track.m4a)

    <!-- lilylet-begin: media/2022/07/WK-swing-rhythms.mscz -->
    ```lyl.play
    [staves "s1,s2,s3,<s4-s5>"]
    [instrument-s1 "C instruments" "C"]
    [instrument-s2 "Bb instruments" "Bb"]
    [instrument-s3 "Eb Instruments" "Eb"]
    [instrument-s4 "F instruments" "F"]
    [instrument-s5 "Bass clef instruments" "Bass"]

    \key bf \major \numericTimeSignature \time 4/4 \clef "treble" \stemDown bf'4 \chords "Bb7" r8 bf~-> bf2 \\\
    \clef "treble_2" \clef "treble" \stemDown c'4-> \chords "C7" r8 c~-> c2 \\\
    \clef "treble_6" \clef "treble" \stemDown g''4-> \chords "G7" r8 g~-> g2 \\\
    \clef "treble_5" \clef "treble" \stemUp f4-> \chords "F7" r8 f~-> f2 \\\
    \clef "bass" \stemDown bf4-> \chords "Bb7" r8 bf~-> bf2 | %1

    \stemDown df'8-- \chords "Eb7" c4-^ bf8-> r2 \\\
    \stemDown ef'8-- \chords "F7" d4-^ c8-> r2 \\\
    \stemDown bf''8-- \chords "C7" a4-^ g8-> r2 \\\
    \stemUp af'8-- \chords "Bb7" g4-^ f8-> r2 \\\
    \stemDown df8-- \chords "Eb7" c4-^ bf8-> r2 | %2

    \stemDown bf'4-^ \chords "Bb7" bf-^ \stemUp gs8-- a4-^ \stemDown bf8-> \\\
    \stemDown c'4-^ \chords "C7" c-^ \stemUp as8-- \stemDown b4-^ c8-> \\\
    \stemDown g''4-^ \chords "G7" g-^ es8-- fs4-^ g8-> \\\
    \stemUp f4-^ \chords "F7" f-^ ds8-- e4-^ f8-> \\\
    \stemDown bf4-^ \chords "Bb7" bf-^ gs8-- a4-^ bf8-> | %3

    r2 \chords "Bb7" r8 \stemDown df'4.---> \\\
    r2 \chords "C7" r8 \stemDown ef'4.---> \\\
    r2 \chords "G7" r8 \stemDown bf''4.---> \\\
    r2 \chords "F7" r8 \stemUp af'4.---> \\\
    r2 \chords "Bb7" r8 \stemDown df4.---> | %4

    \stemDown df'4-> \chords "Eb7" r8 bf-> r2 \\\
    \stemDown ef'4-> \chords "F7" r8 c-> r2 \\\
    \stemDown bf''4-> \chords "C7" r8 g-> r2 \\\
    \stemUp af'4-> \chords "Bb7" r8 f-> r2 \\\
    \stemDown df4-> \chords "Eb7" r8 bf-> r2 | %5

    r8 \chords "Eb7" \stemUp g'4-^ r8 \stemDown bf4-> r \\\
    r8 \chords "F7" \stemUp a'4-^ r8 \stemDown c4-> r \\\
    r8 \chords "C7" \stemDown e'4-^ r8 g4-> r \\\
    r8 \chords "Bb7" \stemUp d4-^ r8 f4-> r \\\
    r8 \chords "Eb7" \stemDown g4-^ r8 bf4-> r | %6

    r8 \chords "Bb7" \stemDown bf'4-^ r8 \stemUp af4-- a8--[ bf->] \\\
    r8 \chords "C7" \stemDown c'4-^ r8 bf4-- b8--[ c->] \\\
    r8 \chords "G7" \stemDown g''4-^ r8 f4-- fs8--[ g->] \\\
    r8 \chords "F7" \stemUp f4-^ r8 ef4-- e8--[ f->] \\\
    r8 \chords "Bb7" \stemDown bf4-^ r8 af4-- a8--[ bf->] | %7

    r2 \chords "G7(b5)" r8 \stemDown df'-> r4 \\\
    r2 \chords "A7(b5)" r8 \stemDown ef'-> r4 \\\
    r2 \chords "E7(b5)" r8 \stemDown bf''-> r4 \\\
    r2 \chords "D7(b5)" r8 \stemUp af'-> r4 \\\
    r2 \chords "G7(b5)" r8 \stemDown df-> r4 | %8

    r8 \chords "Cmi7" \stemDown c'4.---> c4-^ c-^ \\\
    r8 \chords "Dmi7" \stemDown d'4.---> d4-^ d-^ \\\
    r8 \chords "Ami7" \stemDown a''4.---> a4-^ a-^ \\\
    r8 \chords "Gmi7" \stemUp g'4.---> g4-^ g-^ \\\
    r8 \chords "Cmi7" \stemDown c4.---> c4-^ c-^ | %9

    \stemDown df'8([ \chords "F9" ef df c)->] r c4.---> \\\
    \stemDown ef'8([ \chords "G9" f ef d)->] r d4.---> \\\
    \stemDown bf''8([ \chords "D9" c bf a)->] r a4.---> \\\
    \stemUp af'8([ \chords "C9" bf af g)->] r g4.---> \\\
    \stemDown df8([ \chords "F9" ef df c)->] r c4.---> | %10

    r4 \chords "Bb7" r8 \stemDown bf'-> r2 \\\
    r4 \chords "C7" r8 \stemDown c'-> r2 \\\
    r4 \chords "G7" r8 \stemDown g''-> r2 \\\
    r4 \chords "F7" r8 \stemUp f-> r2 \\\
    r4 \chords "Bb7" r8 \stemDown bf-> r2 | %11

    \stemDown df'8-- \chords "F7" c4-^ bf8-> r \stemUp f-- af4-^ \\\
    \stemDown ef'8-- \chords "G7" d4-^ c8-> r \stemUp g-- \stemDown bf4-^ \\\
    \stemDown bf''8-- \chords "D7" a4-^ g8-> r d-- f4-^ \\\
    \stemUp af'8-- \chords "C7" g4-^ f8-> r c-- ef4-^ \\\
    \stemDown df8-- \chords "F7" c4-^ bf8-> r f-- af4-^ | %12

    \stemDown bf'4-^ \chords "Bb7" bf-^ \stemUp af4.-> g8-> \\\
    \stemDown c'4-^ \chords "C7" c-^ bf4.-> \stemUp a8-> \\\
    \stemDown g''4-^ \chords "G7" g-^ f4.-> e8-> \\\
    \stemUp f4-^ \chords "F7" f-^ ef4.-> d8-> \\\
    \stemDown bf4-^ \chords "Bb7" bf-^ af4.-> g8-> | %13

    r2 \chords "Eb7" r8 \stemUp f( af[ bf)->] \\\
    r2 \chords "F7" r8 \stemUp g'( \stemDown bf[ c)->] \\\
    r2 \chords "C7" r8 \stemDown d'( f[ g)->] \\\
    r2 \chords "Bb7" r8 \stemUp c( ef[ f)->] \\\
    r2 \chords "Eb7" r8 \stemDown f,( af[ bf)->] | %14

    r8 \chords "Bb7" \stemDown bf'4.---> bf8-- bf4.---> \\\
    r8 \chords "C7" \stemDown c'4.---> c8-- c4.---> \\\
    r8 \chords "G7" \stemDown g''4.---> g8-- g4.---> \\\
    r8 \chords "F7" \stemUp f4.---> f8-- f4.---> \\\
    r8 \chords "Bb7" \stemDown bf4.---> bf8-- bf4.---> | %15

    \stemUp f8-- \chords "Bb7" g4-^ af8~-^ af a4.---> \\\
    \stemUp g'8-- \chords "C7" a4-^ \stemDown bf8~-^ bf b4.---> \\\
    \stemDown d'8-- \chords "G7" e4-^ f8~-^ f fs4.---> \\\
    \stemUp c8-- \chords "F7" d4-^ ef8~-^ ef e4.---> \\\
    \stemDown f,8-- \chords "Bb7" g4-^ af8~-^ af a4.---> | %16

    r8 \chords "Eb7" \stemDown bf'-> r4 r2 \\\
    r8 \chords "F7" \stemDown c'-> r4 r2 \\\
    r8 \chords "C7" \stemDown g''-> r4 r2 \\\
    r8 \chords "Bb7" \stemUp f-> r4 r2 \\\
    r8 \chords "Eb7" \stemDown bf-> r4 r2 | %17

    \stemDown bf'4-^ \chords "Eb7" df8([ bf] c \stemUp g4.)---> \\\
    \stemDown c'4-^ \chords "F7" ef8([ c] d \stemUp a4.)---> \\\
    \stemDown g''4-^ \chords "C7" bf8([ g] a e4.)---> \\\
    \stemUp f4-^ \chords "Bb7" af8([ f] g d4.)---> \\\
    \stemDown bf4-^ \chords "Eb7" df8([ bf] c g4.)---> | %18

    r8 \chords "Bb7" \stemDown bf'4-^ r8 r4 \stemUp af-^ \\\
    r8 \chords "C7" \stemDown c'4-^ r8 r4 bf-^ \\\
    r8 \chords "G7" \stemDown g''4-^ r8 r4 f-^ \\\
    r8 \chords "F7" \stemUp f4-^ r8 r4 ef-^ \\\
    r8 \chords "Bb7" \stemDown bf4-^ r8 r4 af-^ | %19

    r4 \chords "G7(b9)" \stemUp af'-^ r8 \chords "G9" g-> r4 \\\
    r4 \chords "A7(b9)" \stemDown bf'-^ r8 \chords "A9" \stemUp a-> r4 \\\
    r4 \chords "E7(b9)" \stemDown f'-^ r8 \chords "E9" e-> r4 \\\
    r4 \chords "D7(b9)" \stemUp ef-^ r8 \chords "D9" d-> r4 \\\
    r4 \chords "G7(b9)" \stemDown af-^ r8 \chords "G9" g-> r4 | %20

    \stemUp g'16--[ \chords "Cmi7" g-.] r8 g4-- \stemDown bf16--[ bf-.] r8 bf4-- \\\
    \stemUp a'16--[ \chords "Dmi7" a-.] r8 a4-- \stemDown c16--[ c-.] r8 c4-- \\\
    \stemDown e'16--[ \chords "Ami7" e-.] r8 e4-- g16--[ g-.] r8 g4-- \\\
    \stemUp d16--[ \chords "Gmi7" d-.] r8 d4-- f16--[ f-.] r8 f4-- \\\
    \stemDown g16--[ \chords "Cmi7" g-.] r8 g4-- bf16--[ bf-.] r8 bf4-- | %21

    \stemDown c'8-- \chords "F7" c4.~-> c8[ ef->] r4 \\\
    \stemDown d'8-- \chords "G7" d4.~-> d8[ f->] r4 \\\
    \stemDown a''8-- \chords "D7" a4.~-> a8[ c->] r4 \\\
    \stemUp g'8-- \chords "C7" g4.~-> g8[ bf->] r4 \\\
    \stemDown c8-- \chords "F7" c4.~-> c8[ ef->] r4 | %22

    r8 \chords "Bb7" \stemDown df'4.---> bf4-- \stemUp g8--[ bf->] \\\
    r8 \chords "C7" \stemDown ef'4.---> c4-- a8--[ c->] \\\
    r8 \chords "G7" \stemDown bf''4.---> g4-- e8--[ g->] \\\
    r8 \chords "F7" \stemUp af'4.---> f4-- d8--[ f->] \\\
    r8 \chords "Bb7" \stemDown df4.---> bf4-- g8--[ bf->] | %23

    r8 \chords "F7" \stemUp f4-^ f8~(---> f[ f af bf)->] \\\
    r8 \chords "G7" \stemUp g'4-^ g8~(---> g[ g bf c)->] \\\
    r8 \chords "D7" \stemDown d'4-^ d8~(---> d[ d f g)->] \\\
    r8 \chords "C7" \stemUp c4-^ c8~(---> c[ c ef f)->] \\\
    r8 \chords "F7" \stemDown f,4-^ f8~(---> f[ f af bf)->] | %24

    \stemUp af'8([ \chords "Bb9" f g) f->] r af( g)[ f->] \\\
    \stemUp bf'8([ \chords "C9" g a) g->] r \stemDown bf( \stemUp a)[ g->] \\\
    \stemDown f'8([ \chords "G9" d e) d->] r f( e)[ d->] \\\
    \stemUp ef8([ \chords "F9" c d) c->] r ef( d)[ c->] \\\
    \stemDown af8([ \chords "Bb9" f g) f->] r af( g)[ f->] | %25

    r8 \chords "Eb9" \stemUp f-- f4-^ f8--[ f--] f4-^ \\\
    r8 \chords "F9" \stemUp g'-- g4-^ g8--[ g--] g4-^ \\\
    r8 \chords "C9" \stemDown d'-- d4-^ d8--[ d--] d4-^ \\\
    r8 \chords "Bb9" \stemUp c-- c4-^ c8--[ c--] c4-^ \\\
    r8 \chords "Eb9" \stemDown f,-- f4-^ f8--[ f--] f4-^ | %26

    r8 \chords "Bb9" \stemUp f \tuplet 3/2 { af8[ bf c] } \stemDown df4-- c8--[ bf->] \\\
    r8 \chords "C9" \stemUp g' \tuplet 3/2 { bf8[ c d] } \stemDown ef4-- d8--[ c->] \\\
    r8 \chords "G9" \stemDown d' \tuplet 3/2 { f8[ g a] } bf4-- a8--[ g->] \\\
    r8 \chords "F9" \stemUp c \tuplet 3/2 { ef8[ f g] } af4-- g8--[ f->] \\\
    r8 \chords "Bb9" \stemDown f, \tuplet 3/2 { af8[ bf c] } df4-- c8--[ bf->] | %27

    r4 \chords "Bb9" \stemUp f8--[ af~->] af4 a8--[ bf->] \\\
    r4 \chords "C9" \stemUp g'8--[ bf~->] \stemDown bf4 b8--[ c->] \\\
    r4 \chords "G9" \stemDown d'8--[ f~->] f4 fs8--[ g->] \\\
    r4 \chords "F9" \stemUp c8--[ ef~->] ef4 e8--[ f->] \\\
    r4 \chords "Bb9" \stemDown f,8--[ af~->] af4 a8--[ bf->] | %28

    r4 \chords "Eb9" \stemDown bf'-^ df8-- c4-^ bf8~-> \\\
    r4 \chords "F9" \stemDown c'-^ ef8-- d4-^ c8~-> \\\
    r4 \chords "C9" \stemDown g''-^ bf8-- a4-^ g8~-> \\\
    r4 \chords "Bb9" \stemUp f-^ af8-- g4-^ f8~-> \\\
    r4 \chords "Eb9" \stemDown bf-^ df8-- c4-^ bf8~-> | %29

    \stemDown bf'4 df8([ c] bf \stemUp g4.)---> \\\
    \stemDown c'4 ef8([ d] c \stemUp a4.)---> \\\
    \stemDown g''4 bf8([ a] g e4.)---> \\\
    \stemUp f4 af8([ g] f d4.)---> \\\
    \stemDown bf4 df8([ c] bf g4.)---> | %30

    r4 \chords "Bb9" \stemDown bf'8--[ bf--] bf--[ bf->] r df-> \\\
    r4 \chords "C9" \stemDown c'8--[ c--] c--[ c->] r ef-> \\\
    r4 \chords "G9" \stemDown g''8--[ g--] g--[ g->] r bf-> \\\
    r4 \chords "F9" \stemUp f8--[ f--] f--[ f->] r af-> \\\
    r4 \chords "Bb9" \stemDown bf8--[ bf--] bf--[ bf->] r df-> | %31

    r8 \chords "G+7" \stemDown ef'4.~-> ef2 \\\
    r8 \chords "A+7" \stemDown f'4.~-> f2 \\\
    r8 \chords "E+7" \stemDown c''4.~-> c2 \\\
    r8 \chords "D+7" \stemDown bf'4.~-> bf2 \\\
    r8 \chords "G+7" \stemDown ef4.~-> ef2 | %32

    \stemDown d'4-^ \chords "Cmi9" d-^ d8-- c4-^ c8~-^ \\\
    \stemDown e'4-^ \chords "Dmi9" e-^ e8-- d4-^ d8~-^ \\\
    \stemDown b''4-^ \chords "Ami9" b-^ b8-- a4-^ a8~-^ \\\
    \stemUp a'4-^ \chords "Gmi9" a-^ a8-- g4-^ g8~-^ \\\
    \stemDown d4-^ \chords "Cmi9" d-^ d8-- c4-^ c8~-^ | %33

    \stemDown c'8 \chords "F9" bf4-^ \stemUp a8~-^ a f4.-> \\\
    \stemDown d'8 \chords "G9" c4-^ b8~-^ b \stemUp g4.-> \\\
    \stemDown a''8 \chords "D9" g4-^ fs8~-^ fs d4.-> \\\
    \stemUp g'8 \chords "C9" f4-^ e8~-^ e c4.-> \\\
    \stemDown c8 \chords "F9" bf4-^ a8~-^ a f4.-> | %34

    r4 \chords "Bb9" \stemUp f-> r8 \chords "G+7" g-> r4 \\\
    r4 \chords "C9" \stemUp g'-> r8 \chords "A+7" a-> r4 \\\
    r4 \chords "G9" \stemDown d'-> r8 \chords "E+7" e-> r4 \\\
    r4 \chords "F9" \stemUp c-> r8 \chords "D+7" d-> r4 \\\
    r4 \chords "Bb9" \stemDown f,-> r8 \chords "G+7" g-> r4 | %35

    \stemDown bf'4.-> \chords "Cmi7" c8-> \chords "F7" r2 \\\
    \stemDown c'4.-> \chords "Dmi7" d8-> \chords "G7" r2 \\\
    \stemDown g''4.-> \chords "Ami7" a8-> \chords "D7" r2 \\\
    \stemUp f4.-> \chords "Gmi7" g8-> \chords "C7" r2 \\\
    \stemDown bf4.-> \chords "Cmi7" c8-> \chords "F7" r2 | %36

    \stemDown bf'4-> \chords "Bb7" r8 \stemUp af-> r4 \stemDown bf-^ \\\
    \stemDown c'4-> \chords "C7" r8 bf-> r4 c-^ \\\
    \stemDown g''4-> \chords "G7" r8 f-> r4 g-^ \\\
    \stemUp f4-> \chords "F7" r8 ef-> r4 f-^ \\\
    \stemDown bf4-> \chords "Bb7" r8 af-> r4 bf-^ | %37

    r8 \chords "Eb7" \stemUp g'4-^ r8 \stemDown bf([ df c bf)->] \\\
    r8 \chords "F7" \stemUp a'4-^ r8 \stemDown c([ ef d c)->] \\\
    r8 \chords "C7" \stemDown e'4-^ r8 g([ bf a g)->] \\\
    r8 \chords "Bb7" \stemUp d4-^ r8 f([ af g f)->] \\\
    r8 \chords "Eb7" \stemDown g4-^ r8 bf([ df c bf)->] | %38

    r8 \chords "Bb7" \stemDown bf'4-^ bf8( \stemUp af[ f)->] r4 \\\
    r8 \chords "C7" \stemDown c'4-^ c8( \stemUp bf[ g)->] r4 \\\
    r8 \chords "G7" \stemDown g''4-^ g8( f[ d)->] r4 \\\
    r8 \chords "F7" \stemUp f4-^ f8( ef[ c)->] r4 \\\
    r8 \chords "Bb7" \stemDown bf4-^ bf8( af[ f)->] r4 | %39

    \stemUp af'4-> \chords "Bb7" r8 f~-> f4 a8--[ bf->] \\\
    \stemDown bf'4-> \chords "C7" r8 \stemUp g~-> g4 \stemDown b8--[ c->] \\\
    \stemDown f'4-> \chords "G7" r8 d~-> d4 fs8--[ g->] \\\
    \stemUp ef4-> \chords "F7" r8 c~-> c4 e8--[ f->] \\\
    \stemDown af4-> \chords "Bb7" r8 f~-> f4 a8--[ bf->] | %40

    r4 \chords "Eb7" \stemDown df'-> r8 bf4-^ df8~(-> \\\
    r4 \chords "F7" \stemDown ef'-> r8 c4-^ ef8~(-> \\\
    r4 \chords "C7" \stemDown bf''-> r8 g4-^ bf8~(-> \\\
    r4 \chords "Bb7" \stemUp af'-> r8 f4-^ af8~(-> \\\
    r4 \chords "Eb7" \stemDown df-> r8 bf4-^ df8~(-> | %41

    \stemDown df'8[ \chords "Bb7" df c bf] df[ c] bf4)-^ \\\
    \stemDown ef'8[ \chords "C7" ef d c] ef[ d] c4)-^ \\\
    \stemDown bf''8[ \chords "G7" bf a g] bf[ a] g4)-^ \\\
    \stemUp af'8[ \chords "F7" af g f] af[ g] f4)-^ \\\
    \stemDown df8[ \chords "Bb7" df c bf] df[ c] bf4)-^ | %42

    r8 \chords "Bb7" \stemDown bf'4-^ bf8-- df4.-> bf8-> \\\
    r8 \chords "C7" \stemDown c'4-^ c8-- ef4.-> c8-> \\\
    r8 \chords "G7" \stemDown g''4-^ g8-- bf4.-> g8-> \\\
    r8 \chords "F7" \stemUp f4-^ f8-- af4.-> f8-> \\\
    r8 \chords "Bb7" \stemDown bf4-^ bf8-- df4.-> bf8-> | %43

    r8 \chords "G7(b9)" \stemDown bf'-- f'2.-> \\\
    r8 \chords "A7(b9)" \stemDown c'-- g'2.-> \\\
    r8 \chords "E7(b9)" \stemDown g''-- d'2.-> \\\
    r8 \chords "D7(b9)" \stemUp f-- \stemDown c'2.-> \\\
    r8 \chords "G7(b9)" \stemDown bf-- f'2.-> | %44

    r4 \chords "Cmi7" \stemDown ef'-^ r8 c4.---> \\\
    r4 \chords "Dmi7" \stemDown f'-^ r8 d4.---> \\\
    r4 \chords "Ami7" \stemDown c''-^ r8 a4.---> \\\
    r4 \chords "Gmi7" \stemDown bf'-^ r8 \stemUp g4.---> \\\
    r4 \chords "Cmi7" \stemDown ef-^ r8 c4.---> | %45

    \stemDown ef'4-> \chords "F9" r r2 \\\
    \stemDown f'4-> \chords "G9" r r2 \\\
    \stemDown c''4-> \chords "D9" r r2 \\\
    \stemDown bf'4-> \chords "C9" r r2 \\\
    \stemDown ef4-> \chords "F9" r r2 | %46

    r2 \chords "Bb7" \stemUp af'4-^ r \\\
    r2 \chords "C7" \stemDown bf'4-^ r \\\
    r2 \chords "G7" \stemDown f'4-^ r \\\
    r2 \chords "F7" \stemUp ef4-^ r \\\
    r2 \chords "Bb7" \stemDown af4-^ r | %47

    \stemUp a'4-^ \chords "F9" r8 \stemDown bf-> \chords "Bb" r2 \bar "|." \\\
    \stemDown b'4-^ \chords "G9" r8 c-> \chords "C" r2 \bar "|." \\\
    \stemDown fs'4-^ \chords "D9" r8 g-> \chords "G" r2 \bar "|." \\\
    \stemUp e4-^ \chords "C9" r8 f-> \chords "F" r2 \bar "|." \\\
    \stemDown a4-^ \chords "F9" r8 bf-> \chords "Bb" r2 \bar "|." | %48
    ```
    <!-- lilylet-end -->

2. Jamey Aebersold 的爵士节奏（[.pdf](https://viva.pressbooks.pub/app/uploads/sites/12/2019/08/WK-Aebersold-rhythms.pdf)，[.docx](https://viva.pressbooks.pub/app/uploads/sites/12/2023/09/WK-Aebersold-rhythms.docx)）。录制一段演奏这些节奏的音频。挑选三种以不同方式造成切分的节奏，并解释拍点是如何被遮蔽而产生切分的（通过延音线？休止符？等等）。

### 媒体署名

- Swung eighths © Megan Lavengood，依据 [CC BY-SA（署名—相同方式共享）](https://creativecommons.org/licenses/by-sa/4.0/) 许可协议授权
- Anything Goes 1 © Megan Lavengood，依据 [CC BY-SA（署名—相同方式共享）](https://creativecommons.org/licenses/by-sa/4.0/) 许可协议授权
- Anything Goes 2 © Megan Lavengood，依据 [CC BY-SA（署名—相同方式共享）](https://creativecommons.org/licenses/by-sa/4.0/) 许可协议授权
