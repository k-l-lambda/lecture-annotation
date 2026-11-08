# 三和弦与七和弦

和弦是指同时发声的三个或更多音级的任意组合。

一个三音和弦，如果其音级可以按三度排列，就称为*三和弦*（triad）。

要快速判断一个三音和弦是否为三和弦，可以把这三个音排列在下面的“三度圈”上。三和弦的各个音级总是彼此相邻。

![自然音三度圈上的一个三和弦（A、C、E）。](assets/triadsSeventhChords/circleOfThirds-triad.svg)

<!-- lilylet-begin: assets/triadsSeventhChords/circleOfThirds-triad.svg -->
```lyl.play
[composer "Ludwig van Beethoven"]
[staves "{-}"]

\staff "1" \key af \major \time 4/4 \partial 2 \tempo "Adagio cantabile" \clef "treble" \stemUp c'4(-. c-.) \\
\staff "1" \stemDown ef2\p \\
\staff "2" \clef "bass" <af, af'>2( | %1

\staff "1" \stemUp c'4( bf8.[ af16)] af8-5[( g f g)] \\
\staff "1" \stemDown df2 bf4 bf \\
\staff "2" <bf, f'>2) ef4 <df ef> | %2

\staff "1" \partial 4. \stemUp af'4( ef8) \\
\staff "1" \stemDown c4. \\
\staff "2" <c, ef>4. | %3
```
<!-- lilylet-end -->

## 三和弦的识别与标记

三和弦依据其*根音*（root）和*性质*（quality）来识别。

### 三和弦的根音

要找出三和弦的根音，就把各音级排列在三度圈上（在脑中或纸上均可）。根音是这三个相邻音级中*最低*的那个。换一种说法：如果三度圈按顺时针方向以三度*上行*，那么根音就是“最早”的那个音（按字面意义上的钟表来想），其余音级则排在“后面”。

![自然音三度圈上的一个三和弦（A、C、E）。](assets/triadsSeventhChords/circleOfThirds-triadRTF.svg)

知道了根音，就可以把其余的音分别认定为和弦的*三音*（third，根音上方三度）和和弦的*五音*（fifth，根音上方五度）。

### 三和弦的性质

要确定三和弦的性质，就要辨认根音与和弦其他成员之间的音程。大调和小调音阶中出现的三和弦有四种性质，每种都有各自特征性的音程。

-   大三和弦：根音上方为 M3 和 P5（如 *do–mi–sol*）
-   小三和弦：根音上方为 m3 和 P5（如 *do–me–sol* 或 *la–do–mi*）
-   减三和弦：根音上方为 m3 和 d5（如 *ti–re–fa*）
-   增三和弦：根音上方为 M3 和 A5（如 *me–sol–ti*）

![四种性质的三和弦。](assets/triadsSeventhChords/triads.png)

<!-- lilylet-begin: assets/triadsSeventhChords/triads.png -->
```lyl.play
\omit Score.TimeSignature \omit Score.BarLine \key c \major \clef "treble" <c e g>1 <c ef g> <c ef gf> <c e! gs>
\addlyrics { major minor diminished augmented } | %1
```
<!-- lilylet-end -->

### 和弦符号

一个三和弦可以用单个符号来概括，例如和弦符号（lead-sheet chord symbol）。和弦符号既包含根音和性质的信息，也包含哪个音级位于最低声部（无论由谁演唱或演奏这个音，最低声部都称为*低音* bass）。

和弦符号以一个大写字母（必要时加上变音记号）开头，表示和弦的根音。字母之后是关于和弦性质的信息：

-   大三和弦：不加性质符号
-   小三和弦：小写“m”
-   减三和弦：小写“dim”或度数符号“°”
-   增三和弦：小写“aug”或加号“+”

最后，如果和弦中的最低音不是根音而是其他音级，就加一条斜线，后面跟一个大写字母，表示低音（最低）声部中的音级。

C 大三和弦的和弦符号就是 **C**。C 小三和弦是 **Cm**。以升 F 为低音的升 D 减三和弦是 **D\#dim/F\#**。以此类推。

![四种性质的三和弦及其和弦符号。](assets/triadsSeventhChords/triads-LS.png)

<!-- lilylet-begin: assets/triadsSeventhChords/triads-LS.png -->
```lyl.play
\omit Score.TimeSignature \omit Score.BarLine \key c \major \clef "treble" <c e g>1 <ef g c> <gf c ef> <c, gs' e'!>
\addlyrics { C Cm/E♭ Cdim/G♭ Caug } | %1
```
<!-- lilylet-end -->

## 罗马数字

和弦常常根据其在调中的功能来标记。其中一种标记体系用罗马数字来表示和弦根音所在的音级。有些音乐家也用罗马数字来描述和弦的性质。大写罗马数字（I、II、III 等）用于大三和弦。小写罗马数字（i、ii、iii 等）用于小三和弦。小写罗马数字后加 º 符号（iiº、viiº 等）用于减三和弦。大写罗马数字后加 <sup>+</sup> 符号（例如 V<sup>+</sup>）用于增三和弦。一般来说，罗马数字通常标在乐谱*下方*。

（有些音乐家倾向于*只*用罗马数字来反映和弦根音的音级。在这种情况下，所有罗马数字都是大写的。在本教材中，当性质无关紧要、只是泛指和弦时，我们使用全大写的罗马数字。而在标记具有特定性质的具体和弦时，我们会在罗马数字中区分这些性质。）

在大调中，罗马数字相同的和弦由相同的音级构成（使用相同的唱名音节），并且性质也相同。换句话说，在任何大调中标为“I”的三和弦，都是包含 *do*、*mi* 和 *sol* 的大三和弦；iii 三和弦都是包含 *mi*、*sol* 和 *ti* 的小三和弦，等等。小调也是如此（不过小调中的 I 与大调中的 I 不同）。

以下是每个大调中各三和弦的性质与音级：

-   I：大三和弦 – *do*、*mi*、*sol*
-   ii：小三和弦 – *re*、*fa*、*la*
-   iii：小三和弦 – *mi*、*sol*、*ti*
-   IV：大三和弦 – *fa*、*la*、*do*
-   V：大三和弦 – *sol*、*ti*、*re*
-   vi：小三和弦 – *la*、*do*、*mi*
-   vii°：减三和弦 – *ti*、*re*、*fa*

以下是每个小调中各三和弦的性质与音级：

-   i：小三和弦 – *do*、*me*、*sol*
-   ii°：减三和弦 – *re*、*fa*、*le*
-   III：大三和弦 – *me*、*sol*、*te*
-   iv：小三和弦 – *fa*、*le*、*do*
-   V：大三和弦 – *sol*、*ti*、*re*
-   VI：大三和弦 – *le*、*do*、*me*
-   VII：大三和弦 – *te*、*re*、*fa*
-   vii°：减三和弦 – *ti*、*re*、*fa*

## 构建三和弦

要在五线谱上构建一个三和弦，先从和弦符号中辨认出根音、性质和低音。根音和性质会告诉你这个三和弦包含哪三个音级。例如，**C<sup>+</sup>** 告诉你根音是 C，性质是增。由于性质是增，根音上方有一个大三度（E）和一个增五度（升 G）。由于和弦符号后面没有附加低音，低音就与根音相同：C。在五线谱上写一个 C（任何顺手的音区都可以），然后在 C 的*上方*写出其他和弦音（E 和升 G）（见上图中的 Caug 三和弦）。

对于 **Cm/E&#9837;**，根音是 C，性质是小。由于性质是小，根音上方有一个小三度（降 E）和一个纯五度（G）。斜线表明降 E 是低音。在五线谱上写出降 E，然后在它上方写出 C 和 G，完成这个和弦（同样见上图）。

当三和弦的所有成员都尽可能靠近低音时，这个和弦处于所谓的*密集排列*（close position）（如上图中的 C、Cm/E&#9837; 和 Cdim/G&#9837;）。当和弦音之间留有空位时，和弦处于*开放排列*（open position）（如上图中的 Caug）。（在某些音乐情境中，只有其中一种排列是有用或可取的。）

## 聆听三和弦

每种性质的三和弦都有其独特的音响，而且在和弦*转位*（即音级的排列使得最低声部不是根音而是其他音级）时，这种音响在一定程度上依然得以保留。在练习识别和书写三和弦时，一定要把三和弦弹出来，既用来检查你的分析/写作，也用来培养快速凭听觉辨认和弦性质的能力。

## 七和弦

一个四音和弦，如果其音级可以按三度排列，就称为*七和弦*（seventh chord）。

与三和弦一样，七和弦的各音级在三度圈上占据相邻的位置（四个相邻的音级）。七和弦的四个成员是*根音*、*三音*、*五音*和*七音*。

![自然音三度圈上的一个七和弦（A、C、E、G）。](assets/triadsSeventhChords/circleOfThirds-seventhRTFS.svg)

自然音音乐中出现的七和弦有五种性质：大七和弦、属七和弦、小七和弦、减七和弦（也称完全减七和弦）以及半减七和弦。它们由根音上方的以下音程构成：

-   大七和弦：根音上方为 M3、P5 和 M7（即大三和弦加大七度）
-   属七和弦：根音上方为 M3、P5 和 m7（即大三和弦加小七度）
-   小七和弦：根音上方为 m3、P5 和 m7（即小三和弦加小七度）
-   减七和弦：根音上方为 m3、d5 和 d7（即减三和弦加减七度）
-   半减七和弦：根音上方为 m3、d5 和 m7（即减三和弦加小七度）

以下是七和弦各性质的和弦符号缩写：

-   大七和弦：maj7 或 △7（G<sup>maj7</sup> 或 G<sup>△7</sup>）
-   属七和弦：7（B<sup>7</sup>）
-   小七和弦：m7（F&#9839;<sup>m7</sup>）
-   减七和弦：dim7 或 °7（D<sup>dim7</sup> 或 D<sup>°7</sup>）
-   半减七和弦：⦰7（A<sup>⦰7</sup>）

### 罗马数字

以下是每个大调中各七和弦的性质与音级，以及反映这些性质的相应罗马数字：

-   I<sup>7</sup>：大七和弦 – *do*、*mi*、*sol*、*ti*
-   ii<sup>7</sup>：小七和弦 – *re*、*fa*、*la*、*do*
-   iii<sup>7</sup>：小七和弦 – *mi*、*sol*、*ti*、*re*
-   IV<sup>7</sup>：大七和弦 – *fa*、*la*、*do*、*mi*
-   V<sup>7</sup>：属七和弦 – *sol*、*ti*、*re*、*fa*
-   vi<sup>7</sup>：小七和弦 – *la*、*do*、*mi*、*sol*
-   vii<sup>⦰7</sup>：半减七和弦 – *ti*、*re*、*fa*、*la*

以下是每个小调中各七和弦的性质与音级，以及反映这些性质的相应罗马数字：

-   i<sup>7</sup>：小七和弦 – *do*、*me*、*sol*、*te*
-   ii<sup>7</sup>：半减七和弦 – *re*、*fa*、*le*、*do*
-   III<sup>7</sup>：大七和弦 – *me*、*sol*、*te*、*re*
-   iv<sup>7</sup>：小七和弦 – *fa*、*le*、*do*、*me*
-   V<sup>7</sup>：属七和弦 – *sol*、*ti*、*re*、*fa*
-   VI<sup>7</sup>：大七和弦 – *le*、*do*、*me*、*sol*
-   VII<sup>7</sup>：属七和弦 – *te*、*re*、*fa*、*le*
-   vii°<sup>7</sup>：减七和弦 – *ti*、*re*、*fa*、*le*

注意，大七和弦与属七和弦在罗马数字的命名上是相同的。二者的区别要从调的语境中辨别。
