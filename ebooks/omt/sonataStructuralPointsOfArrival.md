# 奏鸣曲式——结构性到达点

奏鸣曲呈示部有两个结构性到达点，它们都与终止式的到达相关联，但并不等同于终止式。

## 中间停顿（MC）

James Hepokoski 和 Warren Darcy（本参考资料即以他们的理论为基础）建议，在分析奏鸣曲呈示部时，"首要任务是找出并确认 _MC_ 的处理方式"（第 24 页）。在二部式呈示部中，这一时刻标志着呈示部第一部分的结束，因而预示着第二主题即将到来，第二主题开始呈示部的第二部分。MC 由连接部区域（TR）中积累起来的能量所准备，是一种修辞上的中断——常常是一个休止或一段静默——它使连接部的能量消散，为 S 的开始打开"空间"。找出 MC 的第一步，就是寻找这种中断；这往往很简单，只需找到紧接在副调音乐之前的休止即可。

中间停顿总是与某个终止式相关联——最常见的是半终止。但重要的是，*MC 本身并不是终止式*。通常，连接部模块引向一个 HC，然后用一个"[属上停留](internalExpansions.md)"来积累能量，最终在 MC 处达到顶点。（H/D 称之为"属锁定"。）偶尔——尤其是在慢乐章或较短的乐章中——MC 与结构性的 HC 会同时出现，不过从严格意义上说，它们并不是同一回事！

在下面的例子中（选自莫扎特（Mozart）D 大调钢琴奏鸣曲，K. 284），连接部的展开在第二行开头（标有 legato 处）到达 HC。属和弦通过"属上停留"得到延长，5 小节之后到达 MC，其标志是左手的"三次锤击"和一拍的静默。

**莫扎特 D 大调钢琴奏鸣曲，K. 284，第一乐章**

![莫扎特 K. 284 第一乐章：中间停顿](assets/form/medialCaesura.png)

<!-- lilylet-begin: assets/form/medialCaesura.png -->
```lyl.play
[staves "{-}"]

\staff "1" \key d \major \time 4/4 \clef "treble" \stemDown fs'16([ d' fs, d'] fs,[ d' fs, d'] fs,[ d' fs, d'] fs,[ d' fs, d'] \\
\staff "2" \clef "bass" \stemDown <a, a'>4 <d d'> <c c'> <a a'> | %1

\staff "1" \stemDown g''16[ d' g, d'] g,[ d' g, d'] g,[ d' g, d'] g,[ d' g, d')] \\
\staff "2" \stemDown <b, b'>4 <g' g'> <d d'> <b b'> | %2

\staff "1" \stemDown <d' gs>16([ d' <d, gs> d'] <d, gs>[ d' <d, gs> d'] <d, gs>[ d' <d, gs> d'] <d, gs>[ d' <d, gs> d')] \\
\staff "2" \stemDown <bf, bf'>4 <f' f'> <d d'> <bf bf'> \clef "treble" | %3

\staff "1" \stemDown <e' a cs>4 b8\rest a'-. g!-.[ fs-. e-. d-.] \\
\staff "2" \stemUp a16_\markup "legato"[ a' gs a] b[ a fs a] e[ a d, a'] cs,[ a' b, a'] | %4

\staff "1" \stemDown cs'8-.[ d-. e-. fs-.] a16([ g fs e] g[ fs e d] \\
\staff "2" \stemUp a16[ a' b, a'] cs,[ a' d, a'] e[ a cs, a'] d,[ a' b, a'] | %5

\staff "1" \stemDown <cs' e a>4) b8\rest a'-. g-.[ fs-. e-. d-.] \\
\staff "2" \stemUp a16[ a' gs a] b[ a fs a] e[ a d, a'] cs,[ a' b, a'] | %6

\staff "1" \stemDown cs'8-.[ d-. e-. fs-.] a16([ g fs e] g[ fs e d] \\
\staff "2" \stemUp a16[ a' b, a'] cs,[ a' d, a'] e[ a cs, a'] d,[ a' b, a'] | %7

\staff "1" \stemDown <cs' e a>4) e16([ cs e cs] \stemUp a4) b\rest \\
\staff "2" \stemUp a4 <a cs e> <a cs e> b'\rest | %8

\staff "1" \stemDown e'4\p a8([ gs] cs[ a gs fs)] \\
\staff "2" R1 | %9

\staff "1" \stemDown fs'8(\prall[ e)] e4. e16(\prall[ ds] e8)-.[ fs-.] \\
\staff "2" \stemUp <gs' b>8[ <gs b> <gs b> <gs b>] <gs b>[ <gs b> <gs b> <gs b>] | %10

\staff "1" \stemDown e'8( d!4 fs8) d( cs4 e8) \\
\staff "2" \stemUp <fs a>8[ <fs a> <fs a> <fs a>] <e gs>[ <e gs> <e gs> <e gs>] | %11
```
<!-- lilylet-end -->

🎧 [Spotify：莫扎特 D 大调钢琴奏鸣曲 K. 284，第一乐章](https://open.spotify.com/track/2DuicS9kJJcP1sIyIGxGpE)

如前所述，与 MC 相关联的最常见终止式是半终止。通常，这个 HC 要么出现在主调中，我们称之为 I:HC MC；要么出现在副调中，即 V:HC MC 或 III:HC MC。

下面这些音乐特征常常引向 MC，并与连接部模块相关联（见下文）：

* 引向 HC 的*能量积累*；
* 在 HC 与 MC 之间持续保持能量；
* 在 MC 处音乐织体出现停顿或中断（有时由单一声部或其他大幅缩减的织体来*填充*——H/D 称之为"停顿填充"）。

其他常见但绝非必需的特征有：

* 低音中引向 HC 的 *fa–fi–sol*（有时为 *le–sol*）；
* 紧接在中断之前的、重复三次的到达和弦（H/D 称之为"锤击"）。

*一个 MC 要成为真正的 MC，其后必须跟随一个令人满意的第二主题（S）*（见下文）。一个原本可以充当 MC、但其后没有跟随令人满意的 S 主题的终止式，被视为"被拒绝的中间停顿"的情形，或者可能表明这是一个连续型呈示部。

## 呈示部结构性终止（EEC）

在奏鸣曲乐章的呈示部中，EEC 是"在[副]调中第一个令人满意的、并引向不同材料的 PAC"（Hepokoski/Darcy，第 18 页）。它*不是*可有可无的，而且它_总是_出现在副调中。在大调中，它几乎总是 V:PAC；在小调中，它最常见的是 III:PAC。结束区（C）紧接在 EEC 之后。

EEC 有两个特征极为重要：（1）它与_第一个_令人满意的 PAC 重合；（2）其后跟随的是_不同的_材料。_在属调中修辞上最强的 PAC 往往并不是 EEC_。

一旦到达了这个 PAC，任何新的材料都属于_结束区（C）_，因为它已不再属于 _S_ 的范围。
