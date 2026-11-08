# 调号

如果你在很长一段时间里都用同一个调写作，一遍又一遍地写出变音记号就会变得很繁琐。

下面是一条不带调号的 D 大调简单旋律。

![不带调号的 D 大调旋律](assets/melodyWithoutKS.png)

<!-- lilylet-begin: assets/melodyWithoutKS.png -->
```lyl.play
\key c \major \numericTimeSignature \time 4/4 \clef "treble" d'4. d8 a4 fs | %1

e8[ fs] a[ fs] e2 | %2

cs8[ d] e[ cs] d[ e] fs[ d] | %3

fs4 e d2 \bar "|." | %4
```
<!-- lilylet-end -->

为了避免这种情况，作曲家在每行谱表的开头使用*调号*（key signatures），提醒演奏者哪些音级应当降低或升高。

下面是同一条旋律，谱表开头带有调号，提醒演奏者 F 和 C 应当升高。

![带调号的同一旋律](assets/melodyWithKS.png)

<!-- lilylet-begin: assets/melodyWithKS.png -->
```lyl.play
\key d \major \numericTimeSignature \time 4/4 \clef "treble" d'4. d8 a4 fs | %1

e8[ fs] a[ fs] e2 | %2

cs8[ d] e[ cs] d[ e] fs[ d] | %3

fs4 e d2 \bar "|." | %4
```
<!-- lilylet-end -->

### 五度循环

五度循环（circle of fifths）是一幅在乐理教学中已经使用了数百年的图示。它简明地概括了最多带七个降号或升号的任何一个调所需的调号。

![五度循环（大调）](assets/circleOfFifths.png)

但一个调里*哪些*音是降号或升号呢？要正确地利用五度循环推算调号，你还需要记住下面这句助记口诀，它告诉你降号和升号的顺序：

**F**ather **C**harles **G**oes **D**own **A**nd **E**nds **B**attle.（查尔斯神父下去结束了战斗。）

> 译注：口诀的意义在于各词首字母 F、C、G、D、A、E、B，即升号的顺序；倒过来读 B、E、A、D、G、C、F 即降号的顺序。

对于升号调（在五度循环上按顺时针方向），正着读这句口诀。例如，五度循环告诉我们，A 大调有 3 个升号。哪三个音是升号？口诀中的前三个音：F(ather)、C(harles) 和 G(oes)。

对于降号调（在五度循环上按逆时针方向），倒着读这句口诀。例如，五度循环告诉我们，降 A 大调有四个降号。哪些降号？倒着读：B(attle)、E(nds)、A(nd)、D(own)。

### 小调调号 ###

当然，小调也可以使用调号。事实上，每一个大调调号都对应着一个共用该调号的小调。共用同一调号的大调和小调称为*关系*调（relative keys）。例如，C 大调和 a 小调都没有升号或降号。a 小调被视为 C 大调的*关系小调*（relative minor）；同样，C 大调被视为 a 小调的*关系大调*（relative major）。把下面的小调五度循环与上面的大调五度循环相比较，你就能看出其余的关系调对。

![五度循环（小调）](assets/circleOfFifths-minor.png)

### 调号的写法 ###

下面是一份参考，展示了所有调号在高音、中音、次中音和低音谱号上应当如何书写。

![升号调号（高音谱号）](assets/sharpsTreble.png)

![升号调号（中音谱号）](assets/sharpsAlto.png)

![升号调号（次中音谱号）](assets/sharpsTenor.png)

![升号调号（低音谱号）](assets/sharpsBass.png)

![降号调号（高音谱号）](assets/flatsTreble.png)

![降号调号（中音谱号）](assets/flatsAlto.png)

![降号调号（次中音谱号）](assets/flatsTenor.png)

![降号调号（低音谱号）](assets/flatsBass.png)
