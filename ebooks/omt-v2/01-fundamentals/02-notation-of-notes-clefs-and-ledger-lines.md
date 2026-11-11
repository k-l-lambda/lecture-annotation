---
title: "音符、谱号与加线的记写"
slug: "notation-of-notes-clefs-and-ledger-lines"
source: "https://viva.pressbooks.pub/openmusictheory/chapter/notation-of-notes-clefs-and-ledger-lines/"
authors: ["Chelsey Hamm"]
license: "CC BY-SA 4.0"
modified: "2026-06-17"
---

# 音符、谱号与加线的记写

> **要点**
>
> - 一个音符同时表示音高和节奏。
> - 音符写在谱表上。频率较高（波长较短）的音符写在谱表上比频率较低（波长较长）的音符更高的位置。也就是说，较高的音写在较低的音之上。
> - 符头必须仔细地写在谱表上。符头是椭圆形（不是圆形）；此外，它不应太大也不应太小，并且略向右上方倾斜。
> - 音符的符干可以朝上（位于音符右侧），也可以朝下（位于音符左侧）。对于中线以上的音符，符干朝下；中线以下的音符，符干朝上。中线上的音符符干可朝任一方向，取决于相邻的音符。
> - 写二度时总要把其中一个音符挪到符干的左侧或右侧。无论符干朝上还是朝下，较低的音总是在左侧。
> - 谱号标明谱表上的各条线和各个间分别对应哪些音高。
> - 叫做加线的小短线可以把谱表向更高或更低处延伸。

西方音乐记谱法特别看重两个音乐要素：音高与节奏。音高在纵向上记写（沿 *y* 轴），节奏则在横向上记写（沿 *x* 轴）。西方音乐记谱法从左到右、从上到下阅读，就像阅读英文书页一样。

## 音符的记写

一个音符同时表示音高和节奏。每个写出的音符都包含一个符头（空心或实心），还可以带有符干以及符杠或符尾（见[记写节奏](https://viva.pressbooks.pub/openmusictheory/chapter/rhythmic-rest-values/)）。谱例 1 展示了符头、符干、符杠和符尾：

![谱例 1. 符头、符干、符杠与符尾。](../media/2019/05/noteillustration-1.png)*谱例 1. 符头、符干、符杠与符尾。*

## 谱表记谱

谱表（复数作“staves”）对传达音高必不可少。谱表由五条等距的水平线构成，每个音符都放在与其音高相对应的线或间上（见下文[谱号](#clefs)一节）。谱例 2 描绘了谱表：

![谱例 2. 谱表。](../media/2019/05/Staff.png)*谱例 2. 谱表。*

## 把音符放到谱表上

写在线上的符头应当分别填满上方和下方空间的一半。写在间内的符头应当恰好触及上方和下方的线。谱例 3 展示了正确符头的例子，既有空心的也有实心的，既有在线上也有在间内的：

![谱例 3. 正确的符头：空心（白色）与实心（黑色），在线上与在间内。](../media/2022/07/Correct-Noteheads.jpg)*谱例 3. 正确的符头：空心（白色）与实心（黑色），在线上与在间内。*

<!-- lilylet-begin: media/2022/07/Correct-Noteheads.jpg -->
```lyl.play
\omit Score.TimeSignature \clef "treble" e1 g b d f | %1

e'1 c a f | %2

e4 g b d f | %3

e'4 c a f \bar "||" | %4
```
<!-- lilylet-end -->
符头应当是椭圆形（不是圆形），并略向右上方倾斜。谱例 4 展示了错误的符头。[^1] 如你所见，符头可能画得太小、太大，或者形状不对。

![谱例 4. 错误符头的例子。](../media/2019/05/Incorrect-Noteheads.jpeg)*谱例 4. 错误符头的例子。*

## 符干与符杠

音符的符干可以朝上（位于音符右侧），也可以朝下（位于音符左侧）。对于中线以上的音符，符干朝下；中线以下的音符，符干朝上。中线上的音符符干可朝任一方向，取决于相邻的音符。谱例 5 展示了这一点：

![谱例 5. 正确的符干方向。](../media/2022/07/Stemming-Directions.jpg)*谱例 5. 正确的符干方向。*

<!-- lilylet-begin: media/2022/07/Stemming-Directions.jpg -->
```lyl.play
\omit Score.TimeSignature \omit Score.BarLine \clef "treble" f'4 e d c b a g f | %1
```
<!-- lilylet-end -->
符干方向与符杠惯例在[单拍子与拍号](10-simple-meter-and-time-signatures.md)和[复拍子与拍号](11-compound-meters-and-time-signatures.md)中有更多讨论。手绘符干时，其长度相当于谱表的四线间距。符杠的厚度约为符干的四倍。

你可以通过下面的练习拖动操作，练习符干方向：

> **练习**
>
> 🧩 互动练习（H5P）：符干方向配对，可在[在线版](02-notation-of-notes-clefs-and-ledger-lines.md)中使用。

## 书写二度

当构成二度音程的音符（见[键盘与大谱表](04-the-keyboard-and-grand-staff.md)一章的[一般音程](04-the-keyboard-and-grand-staff.md#generic-intervals)一节）以和声方式出现时，它们位于谱表相邻的线与间上，因此需要把其中一个音符挪到符干的左侧或右侧。无论符干朝上还是朝下，较低的音总是在左侧。谱例 6 展示了书写二度的正确方式：

![谱例 6. 三个正确的二度。](../media/2022/07/Correct-Seconds-1-e1657554954232.jpg)*谱例 6. 三个正确的二度。*

<!-- lilylet-begin: media/2022/07/Correct-Seconds-1-e1657554954232.jpg -->
```lyl.play
\omit Score.TimeSignature \omit Score.BarLine \clef "treble" <a' b>1 <d e>2 <e, f>2 | %1
```
<!-- lilylet-end -->
二度不应上下叠在一起，较低的音也不应放在右侧，如谱例 7 所示：

![谱例 7. 三个错误的二度。](../media/2022/07/Incorrect-Seconds-1-e1657554935562.jpg)*谱例 7. 三个错误的二度。*

在七和弦中书写二度的问题在[七和弦](19-seventh-chords.md)中讨论。

## 谱号 {#clefs}

画在谱表线与间上的音符代表音高。音乐家用空间隐喻来描述谱表上的音符：位于谱表上方的音符被说成比下方那些音“更高”，下方的则说成“更低”。波长较短（因而频率较高）的声波产生较高的音高；波长较长（频率较低）的声波产生较低的音高。

要让音符传达出“更高”“更低”之外的音高信息，音符所在的谱表必须包含谱号。谱号标明谱表上的各条线和各个间分别对应哪些音高（另见[阅读谱号](03-clefs.md)）。今天最常用的两种谱号是高音谱号和低音谱号。你可能还会遇到另外两种：中音谱号和次中音谱号。谱例 8 展示了同一个音高分别放在高音、低音、中音和次中音谱号之后的样子：

![谱例 8. 同一个音高分别放在高音、低音、中音和次中音谱号之后。](../media/2019/05/clefs.png)*谱例 8. 同一个音高分别放在高音、低音、中音和次中音谱号之后。*

较高的音，例如长笛吹奏的或女高音演唱的音，通常用高音谱号记写；较低的音，例如长号吹奏的或男低音演唱的音，通常用低音谱号记写。与高音、低音谱号相比，中音谱号和次中音谱号相对少见。但在某些情况下，中音谱号用于中高音区，次中音谱号用于中低音区。

## 画谱号

只需三个简单步骤就能画好高音谱号，如谱例 9 所示：[^2]

![谱例 9. 三步画出高音谱号。](../media/2019/11/DrawTrebleClef.png)*谱例 9. 三步画出高音谱号。*

1. 画一条略高于和低于谱表的倾斜竖线。
2. 画一个半圆，在与谱表自上而下第二条线的位置与斜线相交。
3. 围绕谱表自下而上第二条线画一个圈。尽量让圈保持在下方的两个间内。

同样，也可以用三个步骤画出低音谱号，如谱例 10 所示：

![谱例 10. 三步画出低音谱号。](../media/2019/11/DrawBassClef.png)*谱例 10. 三步画出低音谱号。*

1. 在谱表自上而下第二条线上画一个点。
2. 画一个反向的 C，收笔于谱表最下方的间内，注意 C 的上部不要越出谱表。
3. 在反向 C 的右侧画两个点，分别居中于谱表上方的两个间内。

可以用四个步骤画出中音谱号，如谱例 11 所示：

![谱例 11. 四步画出中音谱号。](../media/2019/11/DrawAltoClef.png)*谱例 11. 四步画出中音谱号。*

1. 画一条贯穿谱表的粗竖线。
2. 在它旁边再画一条较细的竖线。
3. 画两个反向的 C，第一个略小于谱表的上半部分，第二个略小于谱表的下半部分。
4. 用一个落在谱表中线上的尖角把这两个反向 C 连接起来。

如谱例 12 所示，次中音谱号的画法与中音谱号相同，只是整体上移一线。第 1、2 步中的竖线从谱表自下而上第二条线开始，略微延伸到谱表上方。第一个反向 C 略微超出谱表上半部分，第二个占据略小于中间两个间的位置。连接二者的尖角落在谱表自上而下第二条线上。

![谱例 12. 四步画出次中音谱号。](../media/2019/11/DrawTenorClef.png)*谱例 12. 四步画出次中音谱号。*

有时音乐家画中音或次中音谱号时，会写一个字母“K”作为速记形式。谱例 13 展示了这种做法：

![谱例 13. 用字母“K”画中音和次中音谱号。](../media/2022/07/K-Clefs.jpg)*谱例 13. 用字母“K”画中音和次中音谱号。*

## 写加线

当音符太高或太低而无法写在谱表上时，就画出叫做加线的小短线来延伸谱表。谱例 14 展示了画在谱表上方和下方的加线：

![谱例 14. 加线，位于带低音谱号的谱表上方和下方。](../media/2019/05/ledger-lines-for-chelsey_0006.png)*谱例 14. 加线，位于带低音谱号的谱表上方和下方。*

谱例 15 展示了画在加线上的音符（带符干和符杠），位于谱表的上方和下方。

![谱例 15. 加线上的音符（带符干和符杠），位于带高音谱号的谱表上方和下方。](../media/2019/05/LedgerLineswithNotes.png)*谱例 15. 加线上的音符（带符干和符杠），位于带高音谱号的谱表上方和下方。*

<!-- lilylet-begin: media/2019/05/LedgerLineswithNotes.png -->
```lyl.play
\omit Score.TimeSignature \time 4/4 \clef "treble" f'8[ g a b] c[ d e f] | %1

e8[ d c b] a[ g f e] \bar "|." | %2
```
<!-- lilylet-end -->
写加线时，务必不要在所写音符的上方或下方多加一条加线。谱例 16 先展示在加线上写音符的正确方式，再展示错误方式，即在音符上下多加加线：[^3]

![谱例 16. 加线的正确与错误记写。](../media/2019/12/ch2-ex13-ledger_lines.jpg)*谱例 16. 加线的正确与错误记写。*

<!-- lilylet-begin: media/2019/12/ch2-ex13-ledger_lines.jpg -->
```lyl.play
\omit Score.TimeSignature \omit Score.BarLine \clef "treble" b''4^\markup "Correct" e d,, b \undo \omit Score.BarLine \bar "||" | %1
```
<!-- lilylet-end -->
> 延伸阅读

- 2001。“Ledger line.”*Grove Music Online*。<https://doi.org/10.1093/gmo/9781561592630.article.16296>。
- Gerou, Tom 与 Linda Lusk。1996.*Essential Dictionary of Music Notation*。Los Angeles: Alfred。
- Gould, Elaine。2011.*Behind Bars: the Definitive Guide to Music Notation*。London: Faber Music。
- Hiley, David。2001。“Clef (i).”*Grove Music Online*。<https://doi.org/10.1093/gmo/9781561592630.article.05927>。
- ——。2001。“Staff.”*Grove Music Online*。<https://doi.org/10.1093/gmo/9781561592630.article.26519>。
- McGrain, Mark。1986.*Music Notation*。Boston: Berklee Press。
- Roemer, Clinton。1985.*The Art of Music Copying: The Preparation of Music for Performance*，第 2 版。Sherman Oaks: Roerick Music Company。
- Straus, Joseph。2022.*Elements of Music*。New York: Oxford。

> 在线资源

- [音高与频率（声音的物理学）(physicsclassroom.com)](https://www.physicsclassroom.com/Class/sound/u11l2a.cfm)
- [音乐谱表 (essential-music-theory.com)](https://www.essential-music-theory.com/music-staff.html)
- [画音符（YouTube）](https://www.youtube.com/watch?v=zMwcJ6fPG-g)

    <!-- video-begin: https://www.youtube.com/watch?v=zMwcJ6fPG-g -->
    <div class="omt-video"><iframe src="https://www.youtube-nocookie.com/embed/zMwcJ6fPG-g" title="video" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen></iframe></div>
    <!-- video-end -->

- [谱号（Music Notes Now）](https://www.musicnotes.com/now/tips/a-complete-guide-to-musical-clefs-what-are-they-and-how-to-use-them/)
- [画高音谱号与低音谱号（YouTube）](https://www.youtube.com/watch?v=ZDGhR6EeKw4&feature=related)

    <!-- video-begin: https://www.youtube.com/watch?v=ZDGhR6EeKw4&feature=related -->
    <div class="omt-video"><iframe src="https://www.youtube-nocookie.com/embed/ZDGhR6EeKw4" title="video" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen></iframe></div>
    <!-- video-end -->

- [画 C 谱号（Ultimate Music Theory）](https://ultimatemusictheory.com/draw-c-clef-signs/)
- [谱表、谱号与加线 (musictheory.net)](https://www.musictheory.net/lessons/10)
- [音乐记谱风格指南（印第安纳大学）](https://blogs.iu.edu/jsomcomposition/music-notation-style-guide/)

> 网络作业

1. 谱表（[.pdf](https://viva.pressbooks.pub/app/uploads/sites/12/2019/11/0001_The_Staff.pdf)）
2. 在线上和间内、高处和低处画符头（[.pdf](https://viva.pressbooks.pub/app/uploads/sites/12/2019/11/0002_The_Staff_High_Low.pdf)）

> 作业

1. 写符头、谱号与加线（含 C 谱号）（[.pdf](https://viva.pressbooks.pub/app/uploads/sites/12/2024/06/WK-Notation-of-Notes-Clefs-and-Ledger-Lines.pdf)、[.docx](https://viva.pressbooks.pub/app/uploads/sites/12/2024/06/WK-Notation-of-Notes-Clefs-and-Ledger-Lines.docx)）。要求学生练习手写音乐记谱的各项要素。
2. 写符头、谱号与加线（仅高音与低音谱号）（[.pdf](https://viva.pressbooks.pub/app/uploads/sites/12/2024/08/WK-Notation-of-Notes-Clefs-and-Ledger-Lines-treble-bass.pdf)、[.docx](https://viva.pressbooks.pub/app/uploads/sites/12/2024/08/WK-Notation-of-Notes-Clefs-and-Ledger-Lines-treble-bass.docx)）。要求学生练习手写音乐记谱的各项要素。

### 媒体署名

- Noteheads, Stem, Beam, Flag © Bryn Hughes，采用 [CC BY-SA（署名—相同方式共享）](https://creativecommons.org/licenses/by-sa/4.0/)许可协议
- Staff © Chelsey Hamm，采用 [CC BY-SA（署名—相同方式共享）](https://creativecommons.org/licenses/by-sa/4.0/)许可协议
- Correct Noteheads © Megan Lavengood（采自 Straus），采用 [CC BY-SA（署名—相同方式共享）](https://creativecommons.org/licenses/by-sa/4.0/)许可协议
- Incorrect Noteheads © Megan Lavengood（采自 Straus），采用 [CC BY-SA（署名—相同方式共享）](https://creativecommons.org/licenses/by-sa/4.0/)许可协议
- Stemming Directions © Chelsey Hamm，采用 [CC BY-SA（署名—相同方式共享）](https://creativecommons.org/licenses/by-sa/4.0/)许可协议
- Correct Seconds © Megan Lavengood（采自 Straus），采用 [CC BY-SA（署名—相同方式共享）](https://creativecommons.org/licenses/by-sa/4.0/)许可协议
- Incorrect Seconds © Megan Lavengood（采自 Straus），采用 [CC BY-SA（署名—相同方式共享）](https://creativecommons.org/licenses/by-sa/4.0/)许可协议
- Four Clefs and Notes © Kris Shaffer (OMT)，采用 [CC BY-SA（署名—相同方式共享）](https://creativecommons.org/licenses/by-sa/4.0/)许可协议
- Draw Treble Clef © Chelsey Hamm，采用 [CC BY-SA（署名—相同方式共享）](https://creativecommons.org/licenses/by-sa/4.0/)许可协议
- Draw Bass Clef © Chelsey Hamm，采用 [CC BY-SA（署名—相同方式共享）](https://creativecommons.org/licenses/by-sa/4.0/)许可协议
- Draw Alto Clef © Chelsey Hamm，采用 [CC BY-SA（署名—相同方式共享）](https://creativecommons.org/licenses/by-sa/4.0/)许可协议
- Draw Tenor Clef © Chelsey Hamm，采用 [CC BY-SA（署名—相同方式共享）](https://creativecommons.org/licenses/by-sa/4.0/)许可协议
- K Clefs © Chelsey Hamm，采用 [CC BY-SA（署名—相同方式共享）](https://creativecommons.org/licenses/by-sa/4.0/)许可协议
- Ledger Lines without Notes © Megan Lavengood，采用 [CC BY-SA（署名—相同方式共享）](https://creativecommons.org/licenses/by-sa/4.0/)许可协议
- Ledger Lines with Notes © Chelsey Hamm，采用 [CC BY-SA（署名—相同方式共享）](https://creativecommons.org/licenses/by-sa/4.0/)许可协议
- Correct Incorrect Ledger Lines © Sarah Louden，采用 [CC BY-SA（署名—相同方式共享）](https://creativecommons.org/licenses/by-sa/4.0/)许可协议

---

[^1]: 参照 Joseph Straus，*Elements of Music*（New York: Oxford University Press, 2022），2。
[^2]: 关于画谱号的另一种视角，见 Mark McGrain，*Music Notation*（Boston: Berklee Press, 1986），13–15。
[^3]: 参照 Straus，*Elements*，3。
