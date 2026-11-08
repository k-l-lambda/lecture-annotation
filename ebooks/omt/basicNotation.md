# 基本记谱法

### 音符

写在谱表上时，一个音符同时表示一个音高和一个节奏时值。音符的记写包括一个*符头*（空心或实心），还可以视需要带有*符干*、*符杠*、*附点*或*符尾*。

![音符各部分示意图](assets/noteillustration.png)

### 谱表

音符若不放在谱表上，就无法传达音高信息。谱表由五条等距的水平线构成。谱表的复数（英文 staff）是 *staves*。

### 谱号

如果谱表上没有谱号，音符*仍然*无法传达音高信息。谱号标明谱表上的各条线和各个间分别对应哪些音高。最常用的两种谱号是*高音*谱号和*低音*谱号；其他相对常见的还有*中音*谱号和*次中音*谱号。

下面是把音高 C4 分别写在高音、低音、中音和次中音谱号上的样子。

![C4 分别写在高音、低音、中音、次中音谱号上](assets/clefs.png)

<!-- lilylet-begin: assets/clefs.png -->
```lyl.play
\omit Score.TimeSignature \omit Score.BarLine \clef "treble" c1^\markup "Treble" \clef "bass" c^\markup "Bass" \clef "alto" c^\markup "Alto" \clef "tenor" c^\markup "Tenor" | %1
```
<!-- lilylet-end -->

### 大谱表

大谱表由两行谱表组成，一行用高音谱号，一行用低音谱号。两行谱表由一个花括号连接。大谱表常用于记写钢琴音乐以及其他复调乐器的音乐。

### 加线

当音乐的音域超出了谱表所能记写的范围时，就要额外画线，以便我们仍能清楚地读出音高。这些额外的线叫做*加线*。在下面的例子中——取自海顿（Haydn）G 大调钢琴奏鸣曲（Hob. XVI: 39）——右手的 Ab5 出现在高音谱表的正上方，左手的 G3 和 B3 出现在高音谱表的正下方。

![海顿 G 大调钢琴奏鸣曲（Hob. XVI: 39）中的加线](assets/ledgerLines.png)

<!-- lilylet-begin: assets/ledgerLines.png -->
```lyl.play
[staves "{-}"]

\staff "1" \omit Score.TimeSignature \key bf \major \partial 4 \clef "treble" \stemDown d'8.(\p-2[ ef32 f)] \\
\staff "2" \clef "bass" r4 \clef "treble" | %1

\staff "1" \stemDown c'8(-2[ b!] <b af'>^\markup "Ab5"[ <c g'>)-2-5] \\
\staff "2" \stemUp r4 f8(_1[ ef] \\
\staff "2" \stemDown g2_\markup "G3"( | %2

\staff "1" \stemDown <d' f>8(-1-4[ <c ef>)-2-3] ef8.(\mf-3\turn^\markup "4312"[ f32-4 g)] \bar "|." \\
\staff "2" \stemUp s4 r4 \\
\staff "2" \stemDown <g b!>8^\markup "B3"[ d')] r4 | %3
```
<!-- lilylet-end -->

### 变音记号

变音记号用来表示某个音高被升高或降低。它们写在音高的*左侧*。

- 把钢琴上的某个白键音降低一个半音时，加一个降号。
- 把钢琴上的某个白键音升高一个半音时，加一个升号。
- 把一个已经降过的音升高一个半音时，加一个还原号。
- 把一个已经降过的音再降低一个半音时，加一个重降号。
- 把一个已经升过的音再升高一个半音时，加一个重升号。

下面的例子依次展示了降号、还原号、升号、重升号和重降号的符号。

![降号、还原号、升号、重升号、重降号](assets/accidentals.png)
