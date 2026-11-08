# 原记谱法

*原记谱法*（protonotation）是一种去除了复杂因素的记谱系统，只关注节拍、节奏和音级这些基本要素。（这一系统取自 Gary Karpinski 的《练耳与视唱手册》（*Manual for Ear Training and Sight Singing*）。）下面是一条示例旋律，分别以标准记谱法和原记谱法写出。

![示例旋律（原记谱法）](assets/protonotation/demoMel.png)

![示例旋律（五线谱记谱）](assets/protonotation/demoMelStaff.png)

<!-- lilylet-begin: assets/protonotation/demoMelStaff.png -->
```lyl.play
\key d \major \numericTimeSignature \time 4/4 \clef "treble" \stemUp a'2 d, | %1

\stemUp a'4 g fs2 | %2

\stemDown d'4 cs8[ b] \stemUp a2 | %3

\stemUp g'4 fs8[ e] d2 \bar "|." | %4
```
<!-- lilylet-end -->

请注意，原记谱法不包含关于*主音*的信息，也不包含*拍的时值*（进而也不包含拍号下方的数字）。它只表示没有绝对音高的人也能听到的音高与节奏要素：节拍、节奏和音级。（调式——大调或小调——可以从音级推断出来。）由于它只表示能够听到的内容，不附加任何额外的记谱因素，因此它是练习节奏听写、旋律听写和视唱的一个有用系统。

## 原记谱法的要素 ##

下面是二拍子、三拍子和四拍子的空白原记谱法网格。

*二拍子：*  
![二拍子](assets/protonotation/duple.png)

*三拍子：*  
![三拍子](assets/protonotation/triple.png)

*四拍子：*  
![四拍子](assets/protonotation/quadruple.png)

在二拍子和三拍子中，强拍用较长的竖线表示，弱拍用较短的竖线表示。在四拍子中，每小节的第三拍是中等强度的，所以用中等长度的竖线表示。

音符的记写方式是：用横线表示节奏时值，用首调唱名（moveable-*do* solfège）音节表示音级。旋律中的任何跳进都用箭头标明方向。（级进不需要箭头。）

休止用某一拍或某一拍的某部分中没有横线来表示。不过，在用原记谱法进行记录或听写时，用一个 **X** 代替空白会很有帮助，这样你就能把自己确定的休止，与因为尚未弄清该时刻发生了什么而暂时留空的部分区分开来。

## 将原记谱法转换为五线谱记谱 ##

仅凭原记谱法不足以写出五线谱。不过，如果你知道 1）谱号，2）主音音高，以及 3）拍的时值或拍号下方的数字，就可以很容易地把它转换为五线谱记谱。

首先，画出给定的谱号（或者根据你对旋律音区的感知选择一个合适的谱号），并根据给定的主音和你所听到的调式确定调号。（在旋律中查找是 *mi* 还是 *me*。）

然后，根据给定的拍值/下方数字以及你的原记谱法所反映的节拍，确定拍号。（如有需要，请复习[节拍与拍号的关系](meter.md)。）如果没有给出下方数字，就选一个方便的（单拍子最常用 **4**，复拍子最常用 **8**）。

接下来，原记谱法中的每一条长线都成为五线谱中的小节线。

最后，把音符填入各个小节。音区、唱名音节和主音共同决定音级。节奏时值则由音符以拍计的时长，以及拍号所暗示的拍的时值来决定。例如，一个两拍长的音符，在 4/4 拍中是二分音符（2 × 四分音符拍）；在 2/2 拍中是全音符（2 × 二分音符拍）；在 9/8 拍中是附点二分音符（2 × 附点四分音符拍）；在 6/4 拍中是附点全音符（2 × 附点二分音符拍）。

下面是更多的示例。

**示例 1。**  
![示例 1（原记谱法，二拍子）](assets/protonotation/dupleMel.png)

低音谱号，主音：G，下方数字：8。  
![示例 1：低音谱号，主音 G，下方数字 8](assets/protonotation/duple-G.png)

<!-- lilylet-begin: assets/protonotation/duple-G.png -->
```lyl.play
\key g \major \time 6/8 \clef "bass" \stemUp g,4. fs | %1

\stemUp g,8 d'\rest a b d\rest c | %2

\stemDown d,4. d\rest | %3

\stemUp g,2. \bar "|." | %4
```
<!-- lilylet-end -->

中音谱号，主音：降 B，下方数字：4。  
![示例 1：中音谱号，主音降 B，下方数字 4](assets/protonotation/duple-Bb.png)

<!-- lilylet-begin: assets/protonotation/duple-Bb.png -->
```lyl.play
\key bf \major \time 6/4 \clef "alto" \stemUp bf2. a | %1

\stemUp bf4 c\rest \stemDown c d c\rest ef | %2

\stemDown f2. c\rest | %3

bf1. \bar "|." | %4
```
<!-- lilylet-end -->

**示例 2。**  
![示例 2（原记谱法，四拍子）](assets/protonotation/quadrupleMel.png)

高音谱号，主音：降 E，下方数字：4。  
![示例 2：高音谱号，主音降 E，下方数字 4](assets/protonotation/quadruple-Es.png)

<!-- lilylet-begin: assets/protonotation/quadruple-Es.png -->
```lyl.play
\key ef \major \numericTimeSignature \time 4/4 \clef "treble" \stemUp ef4 bf'\rest f g | %1

\stemDown bf'2 \stemUp af8[ g f ef] | %2

\stemUp bf2 ef4 g | %3

\stemDown bf'8 bf\rest \stemUp g bf\rest ef,2 \bar "|." | %4
```
<!-- lilylet-end -->

次中音谱号，主音：升 C，下方数字：8。  
![示例 2：次中音谱号，主音升 C，下方数字 8](assets/protonotation/quadruple-Cis.png)

<!-- lilylet-begin: assets/protonotation/quadruple-Cis.png -->
```lyl.play
\key cs \major \time 4/8 \clef "tenor" \stemDown cs8 as\rest ds[ es] | %1

\stemDown gs'4 fs16[ es ds cs] | %2

\stemUp gs4 \stemDown cs8[ es] | %3

\stemDown gs'16 as,\rest es' as,\rest cs4 \bar "|." | %4
```
<!-- lilylet-end -->

低音谱号，主音：F，下方数字：1。  
![示例 2：低音谱号，主音 F，下方数字 1](assets/protonotation/quadruple-F.png)

<!-- lilylet-begin: assets/protonotation/quadruple-F.png -->
```lyl.play
\key f \major \time 4/1 \clef "bass" f,1 d\rest g a | %1

c1~ c \stemDown bf2 a g f | %2

c,1~ c f a | %3

\stemDown c2 d,\rest a' d,\rest \stemNeutral f1~ f \bar "|." | %4
```
<!-- lilylet-end -->
