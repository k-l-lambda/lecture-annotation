# 音集与音阶

民间音乐、流行音乐、古典音乐以及现代音乐的作曲家们，常常用大小调以外的音阶来组织音高材料。其中有些音阶，比如各种自然音*调式*（modes）和五声音集，对大多数听者来说相对熟悉。另一些——例如八声音集/音阶、全音音集/音阶和声学音集/音阶——则更为新颖，通常（但并非总是）出现在二十世纪和二十一世纪的作品中。

在描述许多这类新的音乐资源时，“音集”（collection）一词往往比“音阶”（scale）更合适。*音集*是一组音——通常是五个或更多。可以把音集想象成作曲家从中汲取音乐材料的源头——一种音级在其中自由漂浮的“汤”。音集本身并不意味着有一个调性中心。但在一部作品中，作曲家可能会通过突出音集中的某一个音来确立一个调性中心，这时我们就称之为*音阶*。

## 自然音音集（调式）

*自然音音集*（diatonic collection）是钢琴上 7 个白键的任意移位。我们按照它们所含升号和降号的数目来称呼这些音集：“0 升号”音集、“1 升号”音集，以此类推。例如，“2 降号”音集包含音级 {F, G, A, 降 B, C, D, 降 E}。

当这些音集获得一个主音时，它们就变成了音阶，按照传统，我们根据几个世纪前确立的“调式”体系来为它们命名。（注意，虽然这些调式与中世纪基督教会调式同名，但它们的作用方式大不相同。两者的相似之处主要在于名称。）

看待这些“调式”的一种方式，是想一想钢琴上的七个白键 {C, D, E, F, A, B}。这些音从不同的音高开始，就形成了不同的调式音阶。把七个白键音集中的每一个音分别当作主音，就可以弹出全部七种调式音阶。伊奥尼亚调式把 C 当作主音，多利亚调式把 D 当作主音，弗里吉亚调式把 E 当作主音，利底亚调式把 F 当作主音，混合利底亚调式把 G 当作主音，爱奥利亚调式把 A 当作主音，洛克里亚调式把 B 当作主音：

伊奥尼亚调式（Ionian，即大调音阶）：*do re mi fa sol la ti do*

![高音谱表上的伊奥尼亚调式](assets/postTonal/modes/ionian.png)

<!-- lilylet-begin: assets/postTonal/modes/ionian.png -->
```lyl.play
\omit Score.TimeSignature \omit Score.BarLine \key c \major \clef "treble" c1 d e f g a b c \undo \omit Score.BarLine \bar "|." | %1
```
<!-- lilylet-end -->

多利亚调式（Dorian）：*do re me fa sol la te do*

![高音谱表上的多利亚调式](assets/postTonal/modes/dorian.png)

<!-- lilylet-begin: assets/postTonal/modes/dorian.png -->
```lyl.play
\omit Score.TimeSignature \omit Score.BarLine \key c \major \clef "treble" d1 e f g a b c d \undo \omit Score.BarLine \bar "|." | %1
```
<!-- lilylet-end -->

弗里吉亚调式（Phrygian）：*do ra me fa sol le te do*

![高音谱表上的弗里吉亚调式](assets/postTonal/modes/phrygian.png)

<!-- lilylet-begin: assets/postTonal/modes/phrygian.png -->
```lyl.play
\omit Score.TimeSignature \omit Score.BarLine \key c \major \clef "treble" e1 f g a b c d e \undo \omit Score.BarLine \bar "|." | %1
```
<!-- lilylet-end -->

利底亚调式（Lydian）：*do re mi fi sol la ti do*

![高音谱表上的利底亚调式](assets/postTonal/modes/lydian.png)

<!-- lilylet-begin: assets/postTonal/modes/lydian.png -->
```lyl.play
\omit Score.TimeSignature \omit Score.BarLine \key c \major \clef "treble" f1 g a b c d e f \undo \omit Score.BarLine \bar "|." | %1
```
<!-- lilylet-end -->

混合利底亚调式（Mixolydian）：*do re mi fa sol la te do*

![高音谱表上的混合利底亚调式](assets/postTonal/modes/mixolydian.png)

<!-- lilylet-begin: assets/postTonal/modes/mixolydian.png -->
```lyl.play
\omit Score.TimeSignature \omit Score.BarLine \key c \major \clef "treble" g'1 a b c d e f g \undo \omit Score.BarLine \bar "|." | %1
```
<!-- lilylet-end -->

爱奥利亚调式（Aeolian，即自然小调音阶）：*do re me fa sol le te do*

![高音谱表上的爱奥利亚调式](assets/postTonal/modes/aeolian.png)

<!-- lilylet-begin: assets/postTonal/modes/aeolian.png -->
```lyl.play
\omit Score.TimeSignature \omit Score.BarLine \key c \major \clef "treble" a'1 b c d e f g a \undo \omit Score.BarLine \bar "|." | %1
```
<!-- lilylet-end -->

洛克里亚调式（Locrian，在爵士乐之外不常见）：*do ra me fa se le te do*

![高音谱表上的洛克里亚调式](assets/postTonal/modes/locrian.png)

<!-- lilylet-begin: assets/postTonal/modes/locrian.png -->
```lyl.play
\omit Score.TimeSignature \omit Score.BarLine \key c \major \clef "treble" b'1 c d e f g a b \undo \omit Score.BarLine \bar "|." | %1
```
<!-- lilylet-end -->

和大调音阶、小调音阶一样，这些音程关系可以移到任何一个主音上。

## 五声音集

*五声音集*（pentatonic collections）是自然音音集的五音*子集*（subsets）。下面是构建五声音集的一种快捷方法：（1）列出一个大调音阶的各个音。（2）去掉第 4 级和第 7 级。（例如，五声音集 {C,D,E,G,A} 对应 C 大调音阶的第 1、2、3、5、6 级。）

![高音谱表上的白键五声音阶](assets/postTonal/pentatonicWhite.png)

<!-- lilylet-begin: assets/postTonal/pentatonicWhite.png -->
```lyl.play
\omit Score.TimeSignature \omit Score.BarLine \key c \major \clef "treble" c1 d e g a c \undo \omit Score.BarLine \bar "|." | %1
```
<!-- lilylet-end -->

去掉第 4 级和第 7 级，就得到一个没有半音的音集。由于这种“无半音性”，音集中的任何一个成员都很容易充当调性中心。例如，就 0 升号五声音集而言，把音集中的每个音级分别当作主音，就形成五种不同的音阶：C 五声音阶（C,D,E,G,A）、D 五声音阶（D,E,G,A,C）、E 五声音阶（E,G,A,C,D），以此类推。

钢琴上的黑键也构成一个五声音集：

![高音谱表上的黑键五声音阶](assets/postTonal/pentatonicBlack.png)

<!-- lilylet-begin: assets/postTonal/pentatonicBlack.png -->
```lyl.play
\omit Score.TimeSignature \omit Score.BarLine \key c \major \clef "treble" gf'1 af bf df ef gf \undo \omit Score.BarLine \bar "|." | %1
```
<!-- lilylet-end -->

## 全音音集

这是一组完全由全音生成的音，例如 {0,2,4,6,8,10}。

![高音谱表上的 C 全音音阶](assets/postTonal/wholeTone.png)

<!-- lilylet-begin: assets/postTonal/wholeTone.png -->
```lyl.play
\omit Score.TimeSignature \omit Score.BarLine \key c \major \clef "treble" c1 d e fs gs as c \undo \omit Score.BarLine \bar "|." | %1
```
<!-- lilylet-end -->

不同的*全音*（whole-tone）音集只有两个。WT0 包含音级 {0,2,4,6,8,10}，而 WT1 包含音级 {1,3,5,7,9,11}。换言之，WT0 包含音级 {C, D, E, 升 F, 升 G, 降 B}，而 WT1 包含音级 {升 C, 升 D, F, G, A, B}。

## 八声音集

*八声音集*（octatonic collection）因含有八个音级而得名，它充满作曲上的潜力，许多作曲家都曾把它用于各种目的。八声音集很容易通过半音与全音交替来生成。用音级数字表示，一个例子是 {0,1,3,4,6,7,9,10}。

![高音谱表上的 C 半–全八声音阶](assets/postTonal/octatonic.png)

<!-- lilylet-begin: assets/postTonal/octatonic.png -->
```lyl.play
\omit Score.TimeSignature \omit Score.BarLine \key c \major \clef "treble" c1 df ef e! fs g a bf c \undo \omit Score.BarLine \bar "|." | %1
```
<!-- lilylet-end -->

这个音集的音程内容非常均匀，而这种音程上的一致性导致了它最有趣的性质之一。当我们把上面的音集移位 3——即给音集中每个整数都加上 3——{0,1,3,4,6,7,9,10} 就变成 {3,4,6,7,9,10,0,1}。比较两者就会发现，这两个音集完全相同！事实上，把它移位 6 或 9，你也会得到同一个音集。

奥利维埃·梅西安（Olivier Messiaen）把这样的音集称为“有限移位调式”（modes of limited transposition）。（全音音阶也是一种有限移位调式。）由于这一性质，不同的八声音集只有三个。我们任意地把它们命名为 OCT(0,1)、OCT(1,2) 和 OCT(2,3)。“OCT”右边的数字是该音阶中的音级。（例如，我上面讨论的 {0,1,3,4,6,7,9,10} 音集就是 OCT(1,2)。）我们也可以称之为 C–C♯ 八声音集、C♯–D 八声音集和 D–E♭ 八声音集。

## 其他音集与音阶

二十世纪和二十一世纪的作曲家和音乐家还使用了非常多其他的音集和音阶。例如，梅西安还描述了另外五种[有限移位调式](http://en.wikipedia.org/wiki/Modes_of_limited_transposition)，而且还有其他一些具有相同性质的较小音集。[声学音阶](http://en.wikipedia.org/wiki/Acoustic_scale)（acoustic scales）由泛音列中前七个不同的分音构成，常见于德彪西（Debussy）、巴托克（Bartók）和克拉姆（Crumb）的音乐中——有时用来表现自然。爵士音乐家有一整套用于即兴的音阶。非西方音乐往往有其独特的音阶和音集体系，例如印度古典音乐中使用的拉格（rāga）。

更一般地说，任何作为某一段落基础的较大的音级集合，即使没有熟知的名称，也都可以起到音集的作用。音乐理论家最常用音级集合记法来指称这些音集。

---

*本资源由布莱恩·莫斯利（Brian Moseley）创作，梅雷迪斯·卡希尔（Meredith Cahill）、埃莉丝·坎贝尔（Elise Campbell）和克里斯·谢弗（Kris Shaffer）亦有贡献。*
