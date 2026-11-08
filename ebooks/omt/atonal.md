# 分析无调性音乐

下面是一些提示、术语和常见结构，它们有助于分析 20 世纪早期的无调性音乐，例如第二维也纳乐派（Second Viennese School）成员（勋伯格（Schönberg）、贝尔格（Berg）、韦伯恩（Webern））所创作的音乐。

> 译注：原文各节标题为一级标题，此处降为二级，以免与页面标题同级。

## 音程

在分析和比较音高材料时，一律使用*半音音程*（chromatic intervals，即以半音数计的音程），而不要使用自然音音程。（参见[音程与二音集合](intervals.md)一节。）

## 12 音级循环——钟面

无调性作曲家常常从一组高度组织化的音级出发，再把这些音级布置在各种不同的音区中。因此，为了找出哪些动机、和弦和片段属于同一类别，排除音区这一因素是有帮助的。为此，取一个标有十二个音级的钟面（拼写无关紧要）

![十二音级钟面](assets/postTonal/clockFace.png)

并标出片段中涉及的所有音级。例如，下面是一个 C 大调音阶：

![钟面上的 C 大调音阶](assets/postTonal/clockFace-diatonic.png)

这样一来，无论一组音级在总谱上如何分布于不同的音区和乐器中，都很容易找出其中的音程模式。

## 常见音级集合

**自然音集合**（Diatonic）——常见的大调和*自然*小调集合（白键集合及其所有移位）。

![自然音集合：大调](assets/postTonal/major.png)

<!-- lilylet-begin: assets/postTonal/major.png -->
```lyl.play
\omit Score.TimeSignature \omit Score.BarLine \key c \major \clef "treble" c1 d e f g a b c \undo \omit Score.BarLine \bar "|." | %1
```
<!-- lilylet-end -->

![自然音集合：自然小调](assets/postTonal/minor.png)

<!-- lilylet-begin: assets/postTonal/minor.png -->
```lyl.play
\omit Score.TimeSignature \omit Score.BarLine \key c \major \clef "treble" a'1 b c d e f g a \undo \omit Score.BarLine \bar "|." | %1
```
<!-- lilylet-end -->

**五声集合**（Pentatonic）——黑键集合及其所有移位，原型：(02479)。

![五声集合：黑键](assets/postTonal/pentatonicBlack.png)

<!-- lilylet-begin: assets/postTonal/pentatonicBlack.png -->
```lyl.play
\omit Score.TimeSignature \omit Score.BarLine \key c \major \clef "treble" gf'1 af bf df ef gf \undo \omit Score.BarLine \bar "|." | %1
```
<!-- lilylet-end -->

![五声集合：白键](assets/postTonal/pentatonicWhite.png)

<!-- lilylet-begin: assets/postTonal/pentatonicWhite.png -->
```lyl.play
\omit Score.TimeSignature \omit Score.BarLine \key c \major \clef "treble" c1 d e g a c \undo \omit Score.BarLine \bar "|." | %1
```
<!-- lilylet-end -->

**八声音阶**（Octatonic）——一种交替使用 i1 和 i2（半音和全音）的八音级音阶。

![八声音阶](assets/postTonal/octatonic.png)

<!-- lilylet-begin: assets/postTonal/octatonic.png -->
```lyl.play
\omit Score.TimeSignature \omit Score.BarLine \key c \major \clef "treble" c1 df ef e! fs g a bf c \undo \omit Score.BarLine \bar "|." | %1
```
<!-- lilylet-end -->

**六声音阶**（Hexatonic）——一种交替使用 i1 和 i3（半音和小三度/增二度）的六音级音阶。

![六声音阶](assets/postTonal/hexatonic.png)

<!-- lilylet-begin: assets/postTonal/hexatonic.png -->
```lyl.play
\omit Score.TimeSignature \omit Score.BarLine \key c \major \clef "treble" c1 ds e g af b c \undo \omit Score.BarLine \bar "|." | %1
```
<!-- lilylet-end -->

**X 细胞**（X-cell）——半音四音集合，即一个四音级的半音音簇，原型：(0123)。

![X 细胞](assets/postTonal/xCell.png)

<!-- lilylet-begin: assets/postTonal/xCell.png -->
```lyl.play
\omit Score.TimeSignature \omit Score.BarLine \key c \major \clef "treble" c1 df d ef \undo \omit Score.BarLine \bar "|." | %1
```
<!-- lilylet-end -->

**Y 细胞**（Y-cell）——全音四音集合，即一个四音级的全音音簇，原型：(0246)。它是全音音阶的子集。

![Y 细胞](assets/postTonal/yCell.png)

<!-- lilylet-begin: assets/postTonal/yCell.png -->
```lyl.play
\omit Score.TimeSignature \omit Score.BarLine \key c \major \clef "treble" c1 d e fs \undo \omit Score.BarLine \bar "|." | %1
```
<!-- lilylet-end -->

**Z 细胞**（Z-cell）——一种交替使用 i1 和 i5（半音和纯四度）的四音级集合，原型：(0167)。相距小三度的两个 Z 细胞构成一个八声音阶。

![Z 细胞](assets/postTonal/zCell.png)

<!-- lilylet-begin: assets/postTonal/zCell.png -->
```lyl.play
\omit Score.TimeSignature \omit Score.BarLine \key c \major \clef "treble" c1 df gf g \undo \omit Score.BarLine \bar "|." | %1
```
<!-- lilylet-end -->

**法国增六**（French-sixth）——常见的法国增六和弦集合，但去除了其调性功能，原型：(0268)。它是全音集合和八声集合的子集。与 Z 细胞一样，相距小三度的两个法国增六和弦构成一个八声音阶。

![法国增六集合](assets/postTonal/frenchSixth.png)

<!-- lilylet-begin: assets/postTonal/frenchSixth.png -->
```lyl.play
\omit Score.TimeSignature \omit Score.BarLine \key c \major \clef "treble" c1 d fs gs \undo \omit Score.BarLine \bar "|." | %1
```
<!-- lilylet-end -->

**全音音阶**（Whole-tone scale）——由连续全音构成的六音级音阶，原型：(02468T)。

![全音音阶](assets/postTonal/wholeTone.png)

<!-- lilylet-begin: assets/postTonal/wholeTone.png -->
```lyl.play
\omit Score.TimeSignature \omit Score.BarLine \key c \major \clef "treble" c1 d e fs gs as c \undo \omit Score.BarLine \bar "|." | %1
```
<!-- lilylet-end -->

**声学音阶**（Acoustic scale）——一种类似大调音阶的七音级音阶，但 *fa* 升高为 *fi*，*ti* 降低为 *te*，以便与自然泛音列的第七和第十一分音相吻合。

![声学音阶](assets/postTonal/acoustic.png)

<!-- lilylet-begin: assets/postTonal/acoustic.png -->
```lyl.play
\omit Score.TimeSignature \omit Score.BarLine \key c \major \clef "treble" c1 d e fs g a bf c \undo \omit Score.BarLine \bar "|." | %1
```
<!-- lilylet-end -->

**双自然音集合**（Dual-diatonic）——由相距五度的两个自然音集合合并而成的八音级音阶，例如 C 大调与 G 大调：C – D – E – F – F# – G – A – B。它包含两个自然音音阶、两个 Z 细胞和两个 Y 细胞。主要为巴托克（Bartók）所使用。

![双自然音集合（fa/fi）](assets/postTonal/dualDiatonicFaFi.png)

<!-- lilylet-begin: assets/postTonal/dualDiatonicFaFi.png -->
```lyl.play
\omit Score.TimeSignature \omit Score.BarLine \key c \major \clef "treble" c1 d e f fs g a b c \undo \omit Score.BarLine \bar "|." | %1
```
<!-- lilylet-end -->

![双自然音集合（te/ti）](assets/postTonal/dualDiatonicTeTi.png)

<!-- lilylet-begin: assets/postTonal/dualDiatonicTeTi.png -->
```lyl.play
\omit Score.TimeSignature \omit Score.BarLine \key c \major \clef "treble" c1 d e f g a bf b! c \undo \omit Score.BarLine \bar "|." | %1
```
<!-- lilylet-end -->

## 常见*运算*

### 移位

音高移位是指把一个集合中的每个音高都按指定的音程向上或向下移动。

音级移位做的是同样的事情。不过，由于音级具有循环性，音级移位也相当于把一组音级在钟面上进行*旋转*（rotation）。

移位运算可以用大写字母“T”加上一个下标来表示，下标表示移位的半音数。对于音级移位，使用有序音级音程（数字 0–11）。把一个集合或片段向上移一个全音，标为 **T<sub>2</sub>**；向上移一个三全音，标为 **T<sub>6</sub>**；向下移一个半音，标为 **T<sub>11</sub>**（mod12(–1) = 11）。

### 倒影

*旋律倒影*（melodic inversion）是指旋律中所有上行的旋律音程都被替换为同样大小的下行音程，所有下行音程都被替换为同样大小的上行音程。下面这两条旋律互为倒影。

![上行旋律](assets/postTonal/melodyUp.png)

<!-- lilylet-begin: assets/postTonal/melodyUp.png -->
```lyl.play
\omit Score.TimeSignature \key c \major \clef "treble" g'4. a8 b4 ef \bar "|." | %1
```
<!-- lilylet-end -->

![其倒影旋律](assets/postTonal/melodyDown.png)

<!-- lilylet-begin: assets/postTonal/melodyDown.png -->
```lyl.play
\omit Score.TimeSignature \key c \major \clef "treble" g'4. f8 ef4 b \bar "|." | %1
```
<!-- lilylet-end -->

*音高倒影*（pitch inversion）是指所有音高都围绕音高空间中的一条对称轴被倒影，即翻转（换言之，对称轴是一个音高）。在上面的旋律例子中，对称轴是 G4。由于第一个音高就是 G4，它保持不变。下一个音高（A4）比 G4 高两个半音，它被替换为比 G4 低两个半音的 F4。B4（比 G4 高 i4）被替换为降 E4（比 G4 低 i4）。依此类推。

音高倒影可以作用于一条旋律，也可以作用于一个同时发声的音响（simultaneity），或者作用于某一段落所依据的集合。

一般来说，当两条旋律、两个同时音响或两个集合可以通过音高倒影相联系时，就认为它们在某种意义上是等价的（但显然并不相同）。

*音级倒影*（pitch-class inversion）是指一个集合中的所有音级都围绕音级空间中的一条对称轴被倒影，即翻转（换言之，对称轴是一个音级）。由于音级空间是循环的（向上走 12 个半音，就回到了起点），对称轴由相距三全音的*两个*音级构成。这一点在钟面上看得最清楚。

![钟面上的四音集合](assets/postTonal/clockFace-tetraChord.png)

当上面这个集合围绕 C/升 F 轴倒影时，它变成下面这个集合：

![围绕 C/升 F 轴倒影后的四音集合](assets/postTonal/clockFace-tetraChordInverted.png)

当音级用数字标记时（C = 0，升 C = 1，……，B = 11），可以先确定一个*和数*，再求出这个和数与原集合中每个音级的差，从而算出音级倒影。所得的差就是新集合中的音级。

在上例中，集合 {C, D, E, F} 即 {0, 2, 4, 5}。它的倒影 {G, 升 G, 降 B, C} 即 {7, 8, 10, 0}。围绕 C/升 F 轴倒影原集合时，C 变为 C（0 变为 0），D 对应降 B（2–10），E 对应升 G（4–8），F 对应 G（5–7）。所有这些音级对相加都等于 0 或 12，二者在模 12 下是等价的。因此倒影和数为 0，这个倒影标为 **I<sub>0</sub>**。

围绕升 C/G 轴倒影是 **I<sub>2</sub>**。围绕 D/升 G 轴倒影是 **I<sub>4</sub>**。围绕降 E/A 轴倒影是 **I<sub>6</sub>**。围绕 E/降 B 轴倒影是 **I<sub>8</sub>**。围绕 F/B 轴倒影是 **I<sub>10</sub>**。和数为奇数时，对称轴会落在音级之间（例如 **I<sub>1</sub>** 的轴位于 C/升 C 之间和升 F/G 之间）。

有些无调性作曲家喜欢使用经倒影和/或移位后映射到自身的集合。可以围绕某条对称轴倒影而不改变任何音级的集合，称为*倒影对称*（inversionally symmetrical）集合。可以按某个音程移位而不改变任何音级的集合，称为*移位对称*（transpositionally symmetrical）或*旋转对称*（rotationally symmetrical）集合。Z 细胞和法国增六集合既是旋转对称的，又是倒影对称的。
