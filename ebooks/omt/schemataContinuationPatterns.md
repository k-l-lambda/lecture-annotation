# 加朗特程式——展开模式

下面这三种程式最早由十八世纪理论家约瑟夫·里佩尔（Joseph Riepel）描述。它们是[“展开模式”](http://www.mtosmt.org/issues/mto.05.11.2/mto.05.11.2.eckert.html)（continuation patterns），常见于小步舞曲第一个双纵线之后。“Fonte”和“Monte”都是模进式的，“Ponte”则是延伸一个和声的方式。

# Fonte

*Fonte*（意大利语，意为“泉”或“井”——可以联想为*往下走*）是开始小三部曲式*对比中段*（contrasting middle）的一种常见模式。换言之，它出现在小步舞曲、小步舞曲三声中部或回旋二部（rounded-binary）主题的双纵线之后。Fonte 是一种*模型/模进*（model/sequence）程式：一个两小节的模式紧接着在比原型低一级的位置上重复。

![Fonte 程式](assets/form/fonte.png)

在和声上，第一个两小节单位（*模型*）包含两个和弦，每小节一个：一个副属和弦，以及该副属和弦所指向的被离调的和弦。Fonte 模型最常见的和弦模式是*主调的* **D7/II T1/II**，其中 **D7** 是六和弦，**T1** 是五度和弦（chord of the fifth，即原位）。（其他“转位”也是可能的，例如 **D4/II T3/II**。）当模型展开 **D7/II II** 时，模进会把它向下移到主和弦：*主调的* **D7 T1**。

举例来说，在一个主调为 G 大调的小三部曲式中，一个典型 Fonte 的功能低音分析如下：

![Fonte 的功能低音分析（海顿）](assets/form/Haydn27fonteAnnotated.png)

<!-- lilylet-begin: assets/form/Haydn27fonteAnnotated.png -->
```lyl.play
[composer "Joseph Haydn"]
[staves "{-}"]

\staff "1" \omit Score.TimeSignature \key g \major \partial 8 \bar ".|:" \clef "treble" \stemUp d8-.\mp \\
\staff "2" \clef "bass" r8 | %1

\staff "1" \stemUp d'8([ b gs e)] \\
\staff "2" R2 | %2

\staff "1" \stemDown d4(-3 cs8)[ c!-.] \\
\staff "2" r8 gs([_\markup "Am: D7  T1" a) a,-.] | %3

\staff "1" \stemUp c'8([ a fs d)] \\
\staff "2" R2 | %4

\staff "1" \stemDown c4(-3 b8) s \bar "" \\
\staff "2" r8 fs,([_\markup "G: D7  T1" g)] s | %5
```
<!-- lilylet-end -->

注意其中的非终止进行 **D7–T1**。通常，这样的进行需要被解释为延长某一调性功能（即主功能），而在这里这样解释会很困难。程式中常常包含这样的进行。只需逐个分析这些和弦并标出程式名称即可，而不必试图把这些进行解释为延长性的。（事实上，它们也确实不是。）

包含 Fonte 的小步舞曲的一种常见模型如下：

||: 以 V:PAC 结束的呈示部 :||: Fonte - 以 I:HC 结束的乐句 – 再现部 :||

对作曲家来说，Fonte 是一种从属调（大调小步舞曲的呈示部正是在双纵线之前于属调上终止）过渡回主调的快捷而简便的方法。它之后通常会跟着一个停留在主调属和弦上、或进行到主调属和弦的乐句。该乐句结尾的半终止或*属到达*（dominant arrival）将为主调中开头材料的回归——即小步舞曲或小三部曲式的*再现部*——做好准备。

# Monte

*Monte*（意大利语，意为“山”——可以联想为*往上走*）的作用与 Fonte 类似。它通常作为小步舞曲或其他小三部曲式*对比中段*的一部分出现，它是一种模型/模进程式，并且包含一个解决到被离调和弦的副属和弦——通常是 **D7 T1** 模式。不同之处在于，Fonte 是*往下*走（**D7/II T1/II D7 T1**），而 Monte 是*往上*走（**D7/IV T1/IV D7/V T1/V**）。并且，Fonte 几乎总是四小节长（一个模型加一次移位重复），而 Monte 有时会延伸到六小节或更长（一个模型加一次*或多次*移位重复）。

![Monte 程式](assets/form/monte.png)

# Ponte

*Ponte*（意大利语，意为“桥”）是小步舞曲*对比中段*的另一种常见程式。与 Fonte 和 Monte 不同，Ponte 不一定是模型/模进程式。它造成的是*拖延*（delay）而不是*运动*（motion）。Ponte 的作用通常类似于卡普林（Caplin）所说的*停留在属上*（standing on the dominant）。大调小步舞曲的呈示部会以主调之属调上的 PAC 结束。当 Ponte 跟在这个终止式之后时，它会保持住这个 **T1/V**，在旋律上增强紧张度，并常常给该和弦加上七音（使之成为主调的 D5）。建立在 Ponte 之上的段落没有终止式，因为其中没有和声进行，而是以主调中一个被强调的属和弦结束，卡普林把这称为*属到达*，而不是半终止。这个属到达为小步舞曲再现部中主调和开头基本动机的回归做好准备。

# 参考文献

Caplin, William. *Classical Form*. Oxford University Press, 2000.

Gjerdingen, Robert O. *Music in the Galant Style*. Oxford University Press, 2007.
