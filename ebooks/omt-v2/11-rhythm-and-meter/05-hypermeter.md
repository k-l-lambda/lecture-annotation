---
title: "超节拍"
slug: "hypermeter"
source: "https://viva.pressbooks.pub/openmusictheory/chapter/hypermeter/"
authors: ["Mark Gotham"]
license: "CC BY-SA 4.0"
modified: "2025-07-15"
---

# 超节拍

> **要点**
>
> - 超节拍指的是在记谱节拍之外的更高层级上，运用强／弱节拍重音的模式。
> - 西方古典音乐通常以二为单位作这种分组（进而就是四、八等），就像它在记谱节拍之内作节拍分组时一样。
> - 以三为单位的分组在西方古典音乐中较少见，部分原因是：以三为单位的分组本身在任何多于一个节拍层级上（无论在节拍之内还是之外）都很少见。

我们最早在[「其他节奏基础」](../01-fundamentals/12-other-rhythmic-essentials.md)一章中简要接触过超节拍的概念。正如那里所讨论的，我们在小节之内看到的强弱型模式，未必只在小节之内起作用、到小节长度的脉动就为止。尤其是当小节短、音乐快时（如在 $\mathbf{^3_4}$ 中的急板），在「更高」的多小节层级上，可以强烈感到这样的节拍关系。在西方调性音乐中，正如小节之内最常见的划分／分组以二为单位（因而也就有四、八等），超节拍也是如此。话虽如此，以三为单位的分组也完全可能，五和七也一样。若细加观察，你会发现有趣的作曲家常常在这些选项之间灵活游走，而这种灵活在数拍（tactus 或拍）的层级上是极不寻常的。

## 以三为组的超节拍：「ritmo de tre battute」

最著名、最明确的超节拍标记之一，是贝多芬（Ludwig van Beethoven）第九交响曲中的「ritmo de tre battute」段落。这个标记字面意思是「三小节的节奏」，所以在这里，贝多芬明确表示他有意让小节的按三成组。这样一来，这一指示也同时表明了一个前提：在此之前的按二、按四成组。谱例 1 再现了[「其他节奏基础」](../01-fundamentals/12-other-rhythmic-essentials.md)一章中所见的四小节分组：

 

🎼 [MuseScore 乐谱](https://musescore.com/user/32728834/scores/8422604)

<!-- embed-begin: https://musescore.com/user/32728834/scores/8422604 -->
<div class="omt-switch" data-omt-switch>
<div class="omt-switch-bar" role="tablist"><button type="button" role="tab" aria-selected="true" data-pane="lilylet">Lilylet 乐谱</button><button type="button" role="tab" aria-selected="false" data-pane="musescore">MuseScore</button><span class="omt-switch-note">由 MuseScore 页面自动转写（仅第一页），未逐小节核对。</span></div>
<div class="omt-switch-pane" role="tabpanel" data-pane="lilylet" markdown="1">

```lyl.play
[staves ""]

\key f \major \numericTimeSignature \time 3/4 \clef "treble" \tempo 2. = 100 a''4 r8 a,8 a4 | %1

d'4 e4 f4 | %2

e'4 f4 g4 | %3

f'4 e4 d4 | %4

\stemUp f'4 e4 d4 \\
\stemDown d'4 r8 d,8 d4 | %5

\stemUp c'4 b4 a4 \\
\stemDown a4 b4 c4 | %6

\stemUp gs'4 a4 b4 \\
\stemDown b4 c4 d4 | %7

\stemUp a'4 gs4 a4 \\
\stemDown c4 b4 a4 | %8
```

</div>
<div class="omt-switch-pane omt-embed omt-embed-musescore" role="tabpanel" data-pane="musescore" hidden><iframe data-src="https://musescore.com/user/32728834/scores/8422604/embed" title="MuseScore" loading="lazy" style="height: 450px" allow="autoplay; fullscreen" allowfullscreen></iframe></div>
</div>
<!-- embed-end -->

谱例 1. 贝多芬第九交响曲第四乐章开头四小节的超节拍，出自[「其他节奏基础」](../01-fundamentals/12-other-rhythmic-essentials.md)一章。

现在，谱例 2 显示后面那个「ritmo de tre battute」段落（从第 152 小节起），并附有可比的「超节拍计数」以及（编辑所加的）双纵线，以显示每一组三个小节。

🎼 [MuseScore 乐谱](https://musescore.com/user/32728834/scores/8891598)

<!-- embed-begin: https://musescore.com/user/32728834/scores/8891598 -->
<div class="omt-switch" data-omt-switch>
<div class="omt-switch-bar" role="tablist"><button type="button" role="tab" aria-selected="true" data-pane="lilylet">Lilylet 乐谱</button><button type="button" role="tab" aria-selected="false" data-pane="musescore">MuseScore</button><span class="omt-switch-note">由 MuseScore 页面自动转写（仅第一页），未逐小节核对。</span></div>
<div class="omt-switch-pane" role="tabpanel" data-pane="lilylet" markdown="1">

```lyl.play
[staves "{-}"]

\staff "1" \key g \major \numericTimeSignature \time 3/4 \clef "treble" R2. \\
\staff "2" \clef "bass" b4. b,8 <b b>4 \\\
s2 s4 | %1

\staff "1" R2. \\
\staff "2" \stemUp s4 fs,4 g4 \\
\staff "2" \stemDown <e, e>4 ds4 e4 \\\
s2 s4 | %2

\staff "1" R2. \\
\staff "2" \stemUp fs,4 g4 a4 \\
\staff "2" \stemDown ds,4 e4 fs4 \\\
s2 s4 | %3

\staff "1" b''4. b,8 <b b>4 \\
\staff "2" \stemUp g4 b4 b4 \\
\staff "2" \stemDown e,4 g4 g4 \\\
s2 s4 | %4

\staff "1" \stemUp s4 fs'4 g4 \\
\staff "1" \stemDown <e' e>4 ds4 e4 \\
\staff "2" \stemUp b4 a4 g4 \\
\staff "2" \stemDown g4 fs4 e4 \\\
s2 s4 | %5

\staff "1" \stemUp fs'4 g4 a4 \\
\staff "1" \stemDown ds'4 e4 fs4 \\
\staff "2" \stemUp a4 g4 fs4 \\
\staff "2" \stemDown fs,4 e4 ds4 \\\
s2 s4 | %6

\staff "1" \stemUp g''4 b4 b4 \\
\staff "1" \stemDown e'4 g4 g4 \\
\staff "2" b4. b,8 <b b>4 \\\
s2 s4 | %7

\staff "1" \stemUp b''4 a4 g4 \\
\staff "1" \stemDown g''4 fs4 e4 \\
\staff "2" \stemUp e,4 fs4 g4 \\
\staff "2" \stemDown b,4 b4 b4 \\\
s2 s4 | %8

\staff "1" \stemUp a''4 g4 fs4 \\
\staff "1" \stemDown fs'4 e4 ds4 \\
\staff "2" \stemUp fs,4 g4 a4 \\
\staff "2" \stemDown b,4 b4 b4 \\\
s2 s4 | %9

\staff "1" \stemUp e''4. e,8 e4 \\
\staff "1" \stemDown e'4. e,8 e4 \\
\staff "2" \stemUp gs4 e'4 e4 \\
\staff "2" \stemDown e,4 e4 e4 \\\
s2 s4 | %10

\staff "1" \stemUp a''4 b4 c4 \\
\staff "1" \stemDown e'4 gs4 a4 \\
\staff "2" \stemUp e4 d4 c4 \\
\staff "2" \stemDown c4 b4 a4 \\\
s2 s4 | %11

\staff "1" \stemUp b''4 c4 d4 \\
\staff "1" \stemDown gs''4 a4 b4 \\
\staff "2" \stemUp d4 c4 b4 \\
\staff "2" \stemDown b4 a4 gs4 \\\
s2 s4 | %12

\staff "1" \stemUp c''4 e4 e4 \\
\staff "1" \stemDown a''4 c4 c4 \\
\staff "2" e4. e,8 <e e>4 \\\
s2 s4 | %13

\staff "1" \stemUp e''4 d4 c4 \\
\staff "1" \stemDown c''4 b4 a4 \\
\staff "2" \stemUp a4 b4 c4 \\
\staff "2" \stemDown e,4 gs4 a4 \\\
s2 s4 | %14

\staff "1" \stemUp d''4 c4 b4 \\
\staff "1" \stemDown b''4 a4 gs4 \\
\staff "2" \stemUp b4 c4 d4 \\
\staff "2" \stemDown gs4 a4 b4 \\\
s2 s4 | %15

\staff "1" e''4. e,8 <e e>4 \\
\staff "2" \stemUp c4 e4 e4 \\
\staff "2" \stemDown a4 c4 c4 \\\
s2 s4 | %16

\staff "1" \stemUp a''4 b4 c4 \\
\staff "1" \stemDown e'4 gs4 a4 \\
\staff "2" \stemUp e4 d4 c4 \\
\staff "2" \stemDown c4 b4 a4 \\\
s2 s4 | %17

\staff "1" \stemUp b''4 c4 d4 \\
\staff "1" \stemDown gs''4 a4 b4 \\
\staff "2" \stemUp d4 c4 b4 \\
\staff "2" \stemDown b4 a4 gs4 \\\
s2 s4 | %18

\staff "1" \key f \major R2. \\
\staff "2" R2. \\\
\clef "bass" f,4. f,8 f4 | %19

\staff "1" \stemUp a''4 bf4 c4 \\
\staff "1" \stemDown f'4 g4 a4 \\
\staff "2" \stemUp c4 bf4 a4 \\
\staff "2" \stemDown a4 g4 f4 \\\
R2. | %20

\staff "1" \stemUp bf''4 c4 d4 \\
\staff "1" \stemDown g''4 a4 bf4 \\
\staff "2" \stemUp d4 c4 bf4 \\
\staff "2" \stemDown bf4 a4 g4 \\\
R2. | %21

\staff "1" R2. \\
\staff "2" R2. \\\
f,4. f,8 f4 | %22

\staff "1" \stemUp c''4 e4 f4 \\
\staff "1" \stemDown a''4 g4 a4 \\
\staff "2" \stemUp c4 bf4 a4 \\
\staff "2" \stemDown a4 g4 f4 \\\
R2. | %23

\staff "1" \stemUp e''4 f4 g4 \\
\staff "1" \stemDown g''4 a4 bf4 \\
\staff "2" \stemUp bf4 a4 g4 \\
\staff "2" \stemDown g4 f4 e4 \\\
R2. | %24
```

</div>
<div class="omt-switch-pane omt-embed omt-embed-musescore" role="tabpanel" data-pane="musescore" hidden><iframe data-src="https://musescore.com/user/32728834/scores/8891598/embed" title="MuseScore" loading="lazy" style="height: 1120px" allow="autoplay; fullscreen" allowfullscreen></iframe></div>
</div>
<!-- embed-end -->

谱例 2. 自第 152 小节起的三小节超节拍：「ritmo de tre battute」。

注意，我们这里谈的是分组的周期性：也就是以三还是以四为单位成组。关于相位（phase）还有不少可说的：即循环中的哪一小节应算作「1」。这一乐章所示的相位有很多理由支持，尽管那个音型第一小节到第二小节的属到主进行，确实会让你怀疑相位是否应当晚一小节开始。

最后，为了便于比较，谱例 3 把同一「ritmo de tre battute」段落明确改写为 $\mathbf{^9_4}$，从而把两个以三为组的节拍层级都放进记谱节拍之内。

🎼 [MuseScore 乐谱](https://musescore.com/user/32728834/scores/11018989)

<!-- embed-begin: https://musescore.com/user/32728834/scores/11018989 -->
<div class="omt-switch" data-omt-switch>
<div class="omt-switch-bar" role="tablist"><button type="button" role="tab" aria-selected="true" data-pane="lilylet">Lilylet 乐谱</button><button type="button" role="tab" aria-selected="false" data-pane="musescore">MuseScore</button><span class="omt-switch-note">由 MuseScore 页面自动转写（仅第一页），未逐小节核对；部分小节时值存疑。</span></div>
<div class="omt-switch-pane" role="tabpanel" data-pane="lilylet" markdown="1">

```lyl.play
[staves "{-}"]

\staff "1" \key g \major \numericTimeSignature \time 9/4 \clef "treble" s\breve s8 \\
\staff "2" \clef "bass" \stemUp b,8 s2 s4 fs'4 g4 fs4 g4 a4 \\
\staff "2" \stemDown b4. <b, b>4 <e e>4 ds4 e4 ds4 e4 fs4 \\\
s\breve s8 | %1

\staff "1" \stemUp b''4. b,8 s2 fs'4 g4 fs4 g4 a4 \\
\staff "1" \stemDown r2 <b' b>4 <e e>4 ds4 e4 ds4 e4 fs4 \\
\staff "2" \stemUp g4 b4 b4 b4 a4 g4 a4 g4 fs4 \\
\staff "2" \stemDown e,4 g4 g4 g4 fs4 e4 fs4 e4 ds4 \\\
s\breve s4 | %2

\staff "1" \stemUp g''4 b4 b4 b4 a4 g4 a4 g4 fs4 \\
\staff "1" \stemDown e'4 g4 g4 g4 fs4 e4 fs4 e4 ds4 \\
\staff "2" \stemUp b,8 s2 s8 e4 fs4 g4 fs4 g4 a4 \\
\staff "2" \stemDown b4. s8 <b, b>4 b4 b4 b4 b4 b4 b4 \\\
s\breve s4 | %3

\staff "1" \stemUp e''4. e,8 e4 a4 b4 c4 b4 c4 d4 \\
\staff "1" \stemDown e'4. e,8 e4 e'4 gs4 a4 gs4 a4 b4 \\
\staff "2" \stemUp gs4 e'4 e4 e4 d4 c4 d4 c4 b4 \\
\staff "2" \stemDown e,4 e4 e4 c'4 b4 a4 b4 a4 gs4 \\\
s\breve s4 | %4

\staff "1" \stemUp c''4 e4 e4 e4 d4 c4 d4 c4 b4 \\
\staff "1" \stemDown a''4 c4 c4 c4 b4 a4 b4 a4 gs4 \\
\staff "2" \stemUp s2 s4 a4 b4 c4 b4 c4 d4 \\
\staff "2" \stemDown e4. e,8 <e e>4 e4 gs4 a4 gs4 a4 b4 \\\
s\breve s4 | %5

\staff "1" \key f \major \stemUp s2 s4 a''4 b4 c4 b4 c4 d4 \\
\staff "1" \stemDown e''4. e,8 <e e>4 e4 gs4 a4 gs4 a4 b4 \\
\staff "2" \stemUp c4 e4 e4 e4 d4 c4 d4 c4 b4 \\
\staff "2" \stemDown a4 c4 c4 c4 b4 a4 b4 a4 gs4 \\\
s\breve s4 | %6

\staff "1" \stemUp r2 r4 a''4 bf4 c4 bf4 c4 d4 \\
\staff "1" \stemDown r2 r4 f'4 g4 a4 g4 a4 bf4 \\
\staff "2" \stemUp r2 r4 c4 bf4 a4 d4 c4 bf4 \\
\staff "2" \stemDown r2 r4 a4 g4 f4 bf4 a4 g4 \\\
\clef "bass" f,4. f,8 f4 r1 r2 | %7

\staff "1" \stemUp r2 r4 c''4 e4 f4 e4 f4 g4 \\
\staff "1" \stemDown r2 r4 a''4 g4 a4 g4 a4 bf4 \\
\staff "2" \stemUp r2 r4 c4 bf4 a4 bf4 a4 g4 \\
\staff "2" \stemDown r2 r4 a4 g4 f4 g4 f4 e4 \\\
f,4. f,8 f4 r1 r2 | %8
```

</div>
<div class="omt-switch-pane omt-embed omt-embed-musescore" role="tabpanel" data-pane="musescore" hidden><iframe data-src="https://musescore.com/user/32728834/scores/11018989/embed" title="MuseScore" loading="lazy" style="height: 1120px" allow="autoplay; fullscreen" allowfullscreen></iframe></div>
</div>
<!-- embed-end -->

谱例 3. 谱例 2 中的三小节超节拍，改写为 $\mathit{^9_4}$。

## 超节拍在（演奏）实践中

西方古典记谱使用小节与纵线，部分是为了在音乐家之间协调，但也为了暗示音乐的节拍。小节的第一拍——强拍——被视为小节中最强的拍。[^1] 把同样的音乐记成不同的拍号会有很大的差别：如果你移动音乐、把强拍放到循环中的不同位置，可以预料演奏出来的效果会不同。

同样的原则适用于超节拍。在上面贝多芬的例子中，超节拍分组是四，音乐家们往往会带着一种 $\mathbf{^{12}_{\:4}}$ 的模式去演奏；而当「ritmo de tre battute」把我们转向三小节超节拍的思路时，我们得到的就是谱例 3 中所示的那种 $\mathbf{^9_4}$。

话虽如此，可别指望指挥开始打起三拍子来！为什么不会？嗯，如果音乐记的是 $\mathbf{^3_4}$，而指挥又明显在按三拍子的模式打拍子，那么有些音乐家认为指挥与 $\mathbf{^3_4}$ 拍号有关，就完全可以理解了。职业管弦乐手对贝多芬第九足够熟悉，可以避开这个陷阱，但对于不那么知名的作品可不能这样假定，而且何必冒这个险呢？指挥懂得如何在不改变打拍模式的情况下指示超节拍结构，就像他们懂得如何指示分句和其他事项一样。

## 在快的一端还有更多以三为组的层级吗？

像复三拍子拍号（$\mathbf{^9_4}, \mathbf{^9_8}$ 等）一样，「ritmo de tre battute」明确地摆出了两个以三为组的层级。可以说，这里值得注意的是两个相邻的以三为组层级——至于贝多芬把其中一个层级写在超节拍里，反倒不那么重要。

那么，我们能有超过两个层级的以三为组吗？嗯，$\mathbf{^{27}_{\:x}}$ 这样的拍号是见不到的（至少在这一风格中），像「ritmo de 9 battute」这样的东西也见不到；但贝多芬在他的晚期风格中偶尔会用上三组三级，也就是在音域「短」或「快」的那一端再加上一层三连音。这总是用三连音记谱：这是把以三为组纳入节拍结构的另一种方式，而不必把它写进拍号。例子包括：

- 第 14 弦乐四重奏（Op. 131）第四乐章中，有一段 $\mathbf{^9_4}$ 拍的「Adagio ma non troppo e semplice」（从第 186 小节起），所以我们一下子就已有两个以三为组的层级（3×3 个四分音符）。后来，它短暂地使用八分音符三连音，长到或许可以称为一个节拍层级（第 223–225 小节，即最后的 Allegretto 再现之前 5–7 小节）。
- 贝多芬最后一首钢琴奏鸣曲（第 32 首，Op. 111）的第二乐章是一首复拍子的「Arietta」：起初是 $\mathbf{^{\:9}_{16}}$，但也有 $\mathbf{^{\:6}_{16}}$，有些段落则是 $\mathbf{^{12}_{16}}$。此外，其中一些段落使用十六分音符三连音，又给出一个三的层级。当这在 $\mathbf{^{\:9}_{16}}$ 中发生时，我们就有了三个以三为组的层级，本可以写成 $\mathbf{^{27}_{32}}$（谱例 4）。话虽如此，超节拍是规则的，所以眼下 3×3×3 似乎就是极限了。而 $\mathbf{^{\:6}_{16}}$ 与 $\mathbf{^{12}_{16}}$ 中的三连音又添上一个以三为组，但节拍层级中是二的分组。

🎼 [MuseScore 乐谱](https://musescore.com/user/32728834/scores/11019235)

<!-- embed-begin: https://musescore.com/user/32728834/scores/11019235 -->
<div class="omt-switch" data-omt-switch>
<div class="omt-switch-bar" role="tablist"><button type="button" role="tab" aria-selected="true" data-pane="lilylet">Lilylet 乐谱</button><button type="button" role="tab" aria-selected="false" data-pane="musescore">MuseScore</button><span class="omt-switch-note">由 MuseScore 页面自动转写（仅第一页），未逐小节核对；部分小节时值存疑。</span></div>
<div class="omt-switch-pane" role="tabpanel" data-pane="lilylet" markdown="1">

```lyl.play
[staves "{-}"]

\staff "1" \key c \major \numericTimeSignature \time 9/16 \clef "treble" r8. <c' e>8.[ <c e>8.~] \\
\staff "2" \clef "bass" c,32[ c'32 e32 e,32 c'32 e32 g,32 c32 e32] b32[ c32 e32 g,32 c32 e32 f,32 c'32 e32] e,32[ c'32 e32 d,32 c'32 e32 c,32 c'32 e32] | %1

\staff "1" <c' e>8. <e c' e>8.[ <e c' e>8.] \\
\staff "2" a,32[ c'32 e32 c,32 a'32 c32 e,32 a32 c32] gs32[ a32 c32 e,32 a32 c32 d,32 a'32 c32] c,32[ a'32 c32 b,32 a'32 c32 a,32 a'32 c32] | %2

\staff "1" <e' c' e>8.[ <f d' f>8. <d b' d>8] \clef "bass" g,,,,32[ a32 b32] \\
\staff "2" g,32[ g'32 c32 c,32 g'32 c32 e,32 g32 c32] g,32[ g'32 b32 b,32 g'32 b32 d,32 g32 b32] g,32[ d'32 g32 g,32 f'32 g32 g,32 a32 b32] | %3

\staff "1" \clef "bass" c,,32[ e32 g32 c32 e32 g32 \clef "treble" c32 e32 g32] c32[ e32 g32 e32 g32 c32 e16] s32 \\
\staff "2" s2 s16 | %4
```

</div>
<div class="omt-switch-pane omt-embed omt-embed-musescore" role="tabpanel" data-pane="musescore" hidden><iframe data-src="https://musescore.com/user/32728834/scores/11019235/embed" title="MuseScore" loading="lazy" style="height: 1120px" allow="autoplay; fullscreen" allowfullscreen></iframe></div>
</div>
<!-- embed-end -->

谱例 4. 贝多芬 Op. 111 中的三组以三为组（实际上就是 27！）。

## 合理的限度与节拍心理学

我们在哪里停止向上、向下寻找节拍层级？一些关于超节拍的说法把这一概念扩展到整个乐章，例如用巨大的弱起—强拍模式来描述它们（见 Cooper and Meyer 1963 的结尾）。心理学文献提示的范围要谦逊一些：节拍让位于曲式，未必恰好在记谱小节的限度上，但也不会远出太多。其思路是：当脉动太短（约十分之一秒）或太长（几秒，取决于内部内容）时，我们就难以感知节拍的循环与模式。所以在实践中，当小节很短时（如上面讨论的 $\mathbf{^3_4}$ 急板），考虑超节拍是有道理的，但再往上太多层级就不必了。

## 并非有限，也未必那么合理

读到这里的作曲家、理论家，尤其是作曲家兼理论家，也许会想到那些极端的例子。尽管节拍与曲式之间有着心理学上的界限，结构上的极限——*ne plus ultra*——又在哪里？换句话说，我们能把多少层以三为组叠在一起？Mark Gotham 的《谢尔宾斯基三角形》（“Sierpiński’s Triangle”，谱例 5）就是这样一部作品：从单个音一直到最高的曲式单位，每一个结构层级都以三成组。标题「谢尔宾斯基三角形」指的是一个三角形分形图案，它有着某种相同的结构。这部音乐作品是题名为《镶嵌》（*Tesselations*）的一组作品的第一乐章。

🎼 [MuseScore 乐谱](https://musescore.com/user/8641586/scores/8920656)

<!-- embed-begin: https://musescore.com/user/8641586/scores/8920656 -->
<div class="omt-switch" data-omt-switch>
<div class="omt-switch-bar" role="tablist"><button type="button" role="tab" aria-selected="true" data-pane="lilylet">Lilylet 乐谱</button><button type="button" role="tab" aria-selected="false" data-pane="musescore">MuseScore</button><span class="omt-switch-note">由 MuseScore 页面自动转写（仅第一页），未逐小节核对；部分小节时值存疑。</span></div>
<div class="omt-switch-pane" role="tabpanel" data-pane="lilylet" markdown="1">

```lyl.play
[staves "{-}"]

\staff "1" \key c \major \numericTimeSignature \time 9/8 \clef "treble" \tempo "Prestissimo" 4. = 66 s1 s8 \\
\staff "2" \clef "bass" \tuplet 9/8 { a,,16--[ as16 b16 as16-- b16 c16 b16-- c16 df16] } c16--[ cs16 d16 cs16-- d16 ef16 d16-- ds16 e16] ef16--[ d'16 cs'16 d,,16-- df'16 c'16 df,16-- c,16 b'16] | %1

\staff "1" d16[ d16 df'16 d,16 df'16 c'16] s2 s4 \\
\staff "2" as,,16--[ b16 c16 b16-- c16 df16 c16-- cs16 d16] cs16--[ d16 ef16 d16-- ds16 e16 ds16-- e16 f16] e16--[ ef'16 ef16] | %2

\staff "1" b'16--[ c,16 e16 f'16-- fs,16] as16[ b'16-- c,16 e16] f'16--[ e,16 ef,16 d'16 df,16] s4 \\
\staff "2" cs,16[ d,16-- ds'16 g16] gs,16--[ a'16 cs16 d,16-- ds'16] c,16[ b'16 bf,16 a,16] s4 s16 | %3

\staff "1" r8 <cs' d>8 r8 <d' ef ff>8 r8 cs,,8 s4 s8 \\
\staff "2" \stemUp b,8 r8 c'8 cs,,16--[ d16 ef16 d16-- ds16 e16 ds16-- e16 f16] e16--[ ef'16 d'16 ef,,16 d'16 cs'16 d,16 df,16 c'16] \\
\staff "2" \stemDown as,,16--[ b16 c16 b16-- c16 df16 c16-- cs16 d16] s2 s16 | %4

\staff "1" \stemUp r8 r8 r8 s2 s4 \\
\staff "1" \stemDown <ds' e f>8 <ds' e f>8->[ ef,8] ef,16[ d'16 ef,16 d'16 df'16] s4 s8 s16 \\
\staff "2" \stemUp <b, c df>8 r8 <cs' d ef>8 d,,16--[ ds16 e16 ds16-- e16 f16 e16-- f16 gf16] f16--[ e'16 ef'16 e,16] \\
\staff "2" \stemDown b,,16--[ c16 df16 c16-- df16 d16 cs16-- d16 ef16] s2 s16 | %5
```

</div>
<div class="omt-switch-pane omt-embed omt-embed-musescore" role="tabpanel" data-pane="musescore" hidden><iframe data-src="https://musescore.com/user/8641586/scores/8920656/embed" title="MuseScore" loading="lazy" style="height: 1120px" allow="autoplay; fullscreen" allowfullscreen></iframe></div>
</div>
<!-- embed-end -->

谱例 5. 以三为组、层层到底（节拍与曲式皆然），作为 Mark Gotham《谢尔宾斯基三角形》的作曲方案（[下载总谱](https://imslp.org/wiki/Tessellations_(Gotham%2C_Mark))）。

> 延伸阅读

- Cohn, Richard. 1992. “The Dramatization of Hypermetric Conflicts in the Scherzo of Beethoven’s Ninth Symphony.” *19th-Century Music* 15, no. 3: 188–206. <https://doi.org/10.2307/746424>.
- Cooper, Grosvenor and Leonard B. Meyer. 1963. The Rhythmic Structure of Music, University of Chicago Press, 1963.
- Gotham, Mark. *Tessellations.* 2014.
- Rosen, Charles. 1992. “Ritmi de tre battute in Schubert’s Sonata in C minor”, *Convention in Eighteenth- and Nineteenth-Century Music: Essays in Honor of Leonard G. Ratner*, edited by Wye J. Allanbrook, Janet M. Levy, and William P. Mahrt.

> 作业

1. 敬请期待！

---

[^1]: 有些有趣的特例，如萨拉班德（sarabande）——一种巴洛克舞曲，熟悉这一风格的音乐家知道要把第 2 拍强调得比第 1 拍更强。但这只是一种特殊的风格例外；除此之外，我们总是把强拍与节拍重音紧密联系在一起。
