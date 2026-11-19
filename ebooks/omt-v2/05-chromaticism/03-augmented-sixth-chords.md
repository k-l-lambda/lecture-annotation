---
title: "增六和弦"
slug: "augmented-sixth-chords"
source: "https://viva.pressbooks.pub/openmusictheory/chapter/augmented-sixth-chords/"
authors: ["Brian Jarvis"]
license: "CC BY-SA 4.0"
modified: "2025-07-15"
---

# 增六和弦

> **要点**
>
> - 增六和弦是一类半音前属和弦，其共同特征是包含 *le* 与 *fi* $(\downarrow\hat6-\uparrow\hat4)$ 之间的增六度音程。
> - 增六和弦有意大利增六和弦（It<sup>+6</sup>）、法国增六和弦（Fr<sup>+6</sup>）和德国增六和弦（Ger<sup>+6</sup>）。
> - 增六和弦没有根音，它们解决到原位的属和弦。

[章节播放列表](https://open.spotify.com/playlist/5Io5TCN3k3QeFkAPGdUxsw?si=b266f0f52c724cdc)

## 简要概述

增六和弦是一类半音前属和声，其名称来源于它们包含一个非常特殊的音程：*le* 与 *fi* $(\downarrow\hat6–\uparrow\hat4)$ 之间的增六度。每一种增六和弦（意大利、法国和德国）在这一音程之外还含有一个或两个其他音级，如下表所概括，并在谱例 1 中加以说明。增六和弦在大调和小调中都能出现，但在小调中更为常见。

| +6 类型 | 音级 | 唱名 |
| --- | --- | --- |
| 意大利 | $\hat{1}$ | *do* |
| 法国 | $\mathrm{\hat1\ and\ \hat2}$ | *do* 与 *re* |
| 德国 | $\mathrm{\hat1\ and\ \downarrow\hat3\ (or\ \hat1\ and\ \uparrow\hat2)}$ | *do* 与 *me*（或 *do* 与 *ri*） |

🎼 [MuseScore 乐谱](https://musescore.com/user/32728834/scores/6221729)

<!-- embed-begin: https://musescore.com/user/32728834/scores/6221729 -->
<div class="omt-switch" data-omt-switch>
<div class="omt-switch-bar" role="tablist"><button type="button" role="tab" aria-selected="true" data-pane="lilylet">Lilylet 乐谱</button><button type="button" role="tab" aria-selected="false" data-pane="musescore">MuseScore</button></div>
<div class="omt-switch-pane" role="tabpanel" data-pane="lilylet" markdown="1">

```lyl.play
[staves "{-}"]

\staff "1" \key c \major \omit Score.TimeSignature \numericTimeSignature \time 4/4 \clef "treble" ds'1 \\
\staff "2" \clef "bass" f,,1 | %1

\staff "1" <a' ds>1 \\
\staff "2" <f,, a'>1 | %2

\staff "1" <a' ds>1 \\
\staff "2" <f,, b'>1 | %3

\staff "1" <a' ds>1 \\
\staff "2" <f,, c''>1 | %4
```

</div>
<div class="omt-switch-pane omt-embed omt-embed-musescore" role="tabpanel" data-pane="musescore" hidden><iframe data-src="https://musescore.com/user/32728834/scores/6221729/embed" title="MuseScore" loading="lazy" style="height: 625px" allow="autoplay; fullscreen" allowfullscreen></iframe></div>
</div>
<!-- embed-end -->

谱例 1. 各种增六和弦概览。

## 语境

你现在已经熟悉了为罗马数字分析寻找和弦根音的过程，但增六和弦通常不按根音分类。相反，它们被认定为含有 *le* 与 *fi* $(\downarrow\hat6–\uparrow\hat4)$ 之间增六度的和弦，并进一步根据和弦中的其他音分类，如上所示。"意大利""法国""德国"这些名称更多是色彩性的，而非历史性的，但每一种和弦都以这一特征音程为基础。

谱例 2 展示了增六度音程的具体音级及其解决。注意这一音程中的两个音都是活跃的音：每个音都从相距小二度的位置解决到 *sol* $(\hat5)$。

🎼 [MuseScore 乐谱](https://musescore.com/user/32728834/scores/6221834)

<!-- embed-begin: https://musescore.com/user/32728834/scores/6221834 -->
<div class="omt-switch" data-omt-switch>
<div class="omt-switch-bar" role="tablist"><button type="button" role="tab" aria-selected="true" data-pane="lilylet">Lilylet 乐谱</button><button type="button" role="tab" aria-selected="false" data-pane="musescore">MuseScore</button></div>
<div class="omt-switch-pane" role="tabpanel" data-pane="lilylet" markdown="1">

```lyl.play
[staves "{-}"]

\staff "1" \key c \major \omit Score.TimeSignature \numericTimeSignature \time 4/4 \clef "treble" ds'1 \\
\staff "2" \clef "bass" f,,1 | %1

\staff "1" e'1 \\
\staff "2" e,,1 | %2
```

</div>
<div class="omt-switch-pane omt-embed omt-embed-musescore" role="tabpanel" data-pane="musescore" hidden><iframe data-src="https://musescore.com/user/32728834/scores/6221834/embed" title="MuseScore" loading="lazy" style="height: 465px" allow="autoplay; fullscreen" allowfullscreen></iframe></div>
</div>
<!-- embed-end -->

谱例 2. 增六度音程的标准声部进行。

增六和弦是用半音化制造和声紧张的另一种策略。它们大多用作前属和声（不过也可以起装饰作用——见[共同音和弦](04-common-tone-chords.md)），并在终止点上直接引向原位 V。它们可以加强向半终止和正格终止推进的力度，V 和弦可以带七音和/或包含 $\mathrm{cad.^6_4}$。谱例 3 展示了三种类型在简单终止语境中的用法（正格终止版本）。注意，可以预期 *le* $(\downarrow\hat6)$ 会是该和弦的低音，但 *fi* $(\uparrow\hat4)$ 可以出现在任何其他声部。Ger<sup>+6</sup> 之后通常接 $\mathrm{cad.^6_4}$，用以抵消 G–D 与 F♯–C♯ 之间本会出现的平行纯五度；$\mathrm{cad.^6_4}$ 也可以跟在其他类型之后。在四声部织体中，Fr<sup>+6</sup> 和 Ger<sup>+6</sup> 不需要重复任何一个音；在只有三个不同音高的 It<sup>+6</sup> 中，通常会重复主音，因为它不是活跃的音。

🎼 [MuseScore 乐谱](https://musescore.com/user/32728834/scores/6221757)

<!-- embed-begin: https://musescore.com/user/32728834/scores/6221757 -->
<div class="omt-switch" data-omt-switch>
<div class="omt-switch-bar" role="tablist"><button type="button" role="tab" aria-selected="true" data-pane="lilylet">Lilylet 乐谱</button><button type="button" role="tab" aria-selected="false" data-pane="musescore">MuseScore</button></div>
<div class="omt-switch-pane" role="tabpanel" data-pane="lilylet" markdown="1">

```lyl.play
[staves "{-}"]

\staff "1" \key d \major \omit Score.TimeSignature \numericTimeSignature \time 4/4 \clef "treble" <d fs b>1 \\
\staff "2" \clef "bass" b,1 | %1

\staff "1" <b es b'>1 \\
\staff "2" g,1 | %2

\staff "1" <cs fs as>1 \\
\staff "2" fs,,1 | %3

\staff "1" <d fs b>1 \\
\staff "2" b,1 | %4

\staff "1" <d fs b>1 \\
\staff "2" b,1 | %5

\staff "1" <cs es b'>1 \\
\staff "2" g,1 | %6

\staff "1" <cs fs as>1 \\
\staff "2" fs,,1 | %7

\staff "1" <d fs b>1 \\
\staff "2" b,1 | %8

\staff "1" <d fs b>1 \\
\staff "2" b,1 | %9

\staff "1" <d es b'>1 \\
\staff "2" g,1 | %10

\staff "1" <d fs b>2 <cs fs as>2 \\
\staff "2" fs,,1 | %11

\staff "1" <d fs b>1 \\
\staff "2" b,1 | %12
```

</div>
<div class="omt-switch-pane omt-embed omt-embed-musescore" role="tabpanel" data-pane="musescore" hidden><iframe data-src="https://musescore.com/user/32728834/scores/6221757/embed" title="MuseScore" loading="lazy" style="height: 1150px" allow="autoplay; fullscreen" allowfullscreen></iframe></div>
</div>
<!-- embed-end -->

谱例 3. 三种类型的增六和弦在终止语境中的用法。

 

> **试一试！**
>
>  根据所给和弦符号构成和弦。
>
>  🖥 [互动记谱（Brian Jarvis）](https://brianedwardjarvis.com/MusicTheoryWebApps/staff_master/sm_iframe_container.html?sm_1=brian_jarvis___OMT_augmented_sixths___french_A_major&sm_2=brian_jarvis___OMT_augmented_sixths___german_G_minor&sm_3=brian_jarvis___OMT_augmented_sixths___italian_B_minor)
>
> <!-- embed-begin: https://brianedwardjarvis.com/MusicTheoryWebApps/staff_master/sm_iframe_container.html?sm_1=brian_jarvis___OMT_augmented_sixths___french_A_major&sm_2=brian_jarvis___OMT_augmented_sixths___german_G_minor&sm_3=brian_jarvis___OMT_augmented_sixths___italian_B_minor -->
> <div class="omt-embed omt-embed-interactive"><iframe src="https://brianedwardjarvis.com/MusicTheoryWebApps/staff_master/sm_iframe_container.html?sm_1=brian_jarvis___OMT_augmented_sixths___french_A_major&amp;sm_2=brian_jarvis___OMT_augmented_sixths___german_G_minor&amp;sm_3=brian_jarvis___OMT_augmented_sixths___italian_B_minor" title="Brian Jarvis" loading="lazy" style="height: 600px" allow="autoplay; fullscreen" allowfullscreen></iframe></div>
> <!-- embed-end -->
>

## 与哀歌低音进行的联系

当增六和弦位于半终止之前时，它们类似于弗里几亚半终止和/或哀歌低音（lament bass）进行，其中 iv<sup>6</sup> 和弦通过把 *fa* 替换为 *fi*（$\hat4$ 替换为 $\uparrow\hat4$）而被增六和弦取代。下面的例子展示了哀歌低音的几种版本，说明只需对标准的哀歌低音进行作一处小小的改动，就能引入增六和弦。

🎼 [MuseScore 乐谱](https://musescore.com/user/32728834/scores/6221776)

<!-- embed-begin: https://musescore.com/user/32728834/scores/6221776 -->
<div class="omt-switch" data-omt-switch>
<div class="omt-switch-bar" role="tablist"><button type="button" role="tab" aria-selected="true" data-pane="lilylet">Lilylet 乐谱</button><button type="button" role="tab" aria-selected="false" data-pane="musescore">MuseScore</button></div>
<div class="omt-switch-pane" role="tabpanel" data-pane="lilylet" markdown="1">

```lyl.play
[staves "{-}"]

\staff "1" \key ef \major \omit Score.TimeSignature \numericTimeSignature \time 4/4 \clef "treble" <c' ef>1 \\
\staff "2" \clef "bass" c,1 | %1

\staff "1" <d' g>1 \\
\staff "2" bf,1 | %2

\staff "1" <c' f>1 \\
\staff "2" af,1 | %3

\staff "1" <b' g'>1 \\
\staff "2" g,1 | %4

\staff "1" s1 \\
\staff "2" s1 | %5

\staff "1" <c' ef>1 \\
\staff "2" c,1 | %6

\staff "1" <d' g>1 \\
\staff "2" bf,1 | %7

\staff "1" <c' fs>1 \\
\staff "2" af,1 | %8

\staff "1" <b' g'>1 \\
\staff "2" g,1 | %9

\staff "1" <c' ef>1 \\
\staff "2" c,1 | %10

\staff "1" <d' g>1 \\
\staff "2" bf,1 | %11

\staff "1" <c' f>2 <c fs>2 \\
\staff "2" af,1 | %12

\staff "1" <b' g'>1 \\
\staff "2" g,1 | %13

\staff "1" s1 \\
\staff "2" s1 | %14

\staff "1" <g' c ef>1 \\
\staff "2" c,1 | %15

\staff "1" <g' d' g>1 \\
\staff "2" bf,1 | %16

\staff "1" <c' d fs>1 \\
\staff "2" af,1 | %17

\staff "1" <b' d g>1 \\
\staff "2" g,1 | %18
```

</div>
<div class="omt-switch-pane omt-embed omt-embed-musescore" role="tabpanel" data-pane="musescore" hidden><iframe data-src="https://musescore.com/user/32728834/scores/6221776/embed" title="MuseScore" loading="lazy" style="height: 678px" allow="autoplay; fullscreen" allowfullscreen></iframe></div>
</div>
<!-- embed-end -->

谱例 4. 在哀歌低音进行中用增六和弦取代 iv<sup>6</sup> 的例子。

## 分析时如何辨认增六和弦

由于增六和弦并不像你习惯了的那样以根音为基础，你需要另一种策略来找到它们。若试图按三度叠置来确定其性质，会变得令人困惑，因为其中会包含一个减三度。最简单的方法就是记住：低音 *le–sol* $(\downarrow\hat6-\hat5)$ 的进行可以支撑这种进行；如果这些音级上方有和弦，并且含 *le* $(\downarrow\hat6)$ 的那个和弦还含有 *fi* $(\uparrow\hat4)$，那么你很可能就找到了一个增六和弦。接下来，只需查看其余和弦音，确定具体类型（意大利、法国或德国）。

### 大调中的 Ger<sup>+6</sup>：*me* 还是 *ri* $(\downarrow\hat3$ 还是 $\uparrow\hat2)$

当 Ger<sup>+6</sup> 用于大调时，常把 *me* $(\downarrow\hat3)$ 改写为另一种拼写，以避免连续两次写出同一个音名却带不同的变音记号，因为 Ger<sup>+6</sup> 通常解决到 $\mathrm{cad.^6_4}$，而后者已经含有 *mi* $(\hat3)$。用 *ri* $(\uparrow\hat2)$ 代替 *me* $(\downarrow\hat3)$ 也能更清楚地表明该线条的上行运动。谱例 5 展示了 Ger<sup>+6</sup> 的这种变体拼写。

🎼 [MuseScore 乐谱](https://musescore.com/user/32728834/scores/6221772)

<!-- embed-begin: https://musescore.com/user/32728834/scores/6221772 -->
<div class="omt-switch" data-omt-switch>
<div class="omt-switch-bar" role="tablist"><button type="button" role="tab" aria-selected="true" data-pane="lilylet">Lilylet 乐谱</button><button type="button" role="tab" aria-selected="false" data-pane="musescore">MuseScore</button></div>
<div class="omt-switch-pane" role="tabpanel" data-pane="lilylet" markdown="1">

```lyl.play
[staves "{-}"]

\staff "1" \key g \major \omit Score.TimeSignature \numericTimeSignature \time 4/4 \clef "treble" <b' d g>1 \\
\staff "2" \clef "bass" g1 | %1

\staff "1" <as' cs g'>1 \\
\staff "2" ef,1 | %2

\staff "1" <b' d g>2 <a d fs>2 \\
\staff "2" d,1 | %3

\staff "1" <b' d g>1 \\
\staff "2" g1 | %4
```

</div>
<div class="omt-switch-pane omt-embed omt-embed-musescore" role="tabpanel" data-pane="musescore" hidden><iframe data-src="https://musescore.com/user/32728834/scores/6221772/embed" title="MuseScore" loading="lazy" style="height: 400px" allow="autoplay; fullscreen" allowfullscreen></iframe></div>
</div>
<!-- embed-end -->

谱例 5. 大调中 Ger<sup>+6</sup> 和弦的另一种拼写。

## 德国减三和弦

19世纪，作曲家们引入了 Ger<sup>+6</sup> 的一种变体，把 *fi* $(\uparrow\hat4)$ 而非 *le* $(\downarrow\hat6)$ 放在低音（谱例 6）。这使增六度音程转位，从而变成减三度。Ger<sup>o3</sup> 与 vii<sup>o7</sup>/V 非常相似——唯一的区别是 Ger<sup>o3</sup> 含有 *le* $(\downarrow\hat6)$，而 vii<sup>o7</sup>/V 含有 *la* $(\hat6)$——并且两者都解决到原位 V。

🎼 [MuseScore 乐谱](https://musescore.com/user/32728834/scores/6221766)

<!-- embed-begin: https://musescore.com/user/32728834/scores/6221766 -->
<div class="omt-switch" data-omt-switch>
<div class="omt-switch-bar" role="tablist"><button type="button" role="tab" aria-selected="true" data-pane="lilylet">Lilylet 乐谱</button><button type="button" role="tab" aria-selected="false" data-pane="musescore">MuseScore</button></div>
<div class="omt-switch-pane" role="tabpanel" data-pane="lilylet" markdown="1">

```lyl.play
[staves "{-}"]

\staff "1" \key bf \major \omit Score.TimeSignature \numericTimeSignature \time 4/4 \clef "treble" <bf' d g>1 \\
\staff "2" \clef "bass" g1 | %1

\staff "1" <bf' ef g>1 \\
\staff "2" cs,1 | %2

\staff "1" <a' d fs>1 \\
\staff "2" d,1 | %3

\staff "1" <bf' d g>1 \\
\staff "2" g1 | %4
```

</div>
<div class="omt-switch-pane omt-embed omt-embed-musescore" role="tabpanel" data-pane="musescore" hidden><iframe data-src="https://musescore.com/user/32728834/scores/6221766/embed" title="MuseScore" loading="lazy" style="height: 420px" allow="autoplay; fullscreen" allowfullscreen></iframe></div>
</div>
<!-- embed-end -->

谱例 6. $\mathit{Ger^{o3}}$ 的使用。

 

> **试一试！**
>
>  把所给增六和弦解决到指定的罗马数字。
>
>  🖥 [互动记谱（Brian Jarvis）](https://brianedwardjarvis.com/MusicTheoryWebApps/staff_master/sm_iframe_container.html?sm_1=brian_jarvis___OMT_augmented_sixths___resolution_french_Bb_major&sm_2=brian_jarvis___OMT_augmented_sixths___resolution_german_cad_64_D_minor&sm_3=brian_jarvis___OMT_augmented_sixths___resolution_german_cad_64_C_major)
>
> <!-- embed-begin: https://brianedwardjarvis.com/MusicTheoryWebApps/staff_master/sm_iframe_container.html?sm_1=brian_jarvis___OMT_augmented_sixths___resolution_french_Bb_major&sm_2=brian_jarvis___OMT_augmented_sixths___resolution_german_cad_64_D_minor&sm_3=brian_jarvis___OMT_augmented_sixths___resolution_german_cad_64_C_major -->
> <div class="omt-embed omt-embed-interactive"><iframe src="https://brianedwardjarvis.com/MusicTheoryWebApps/staff_master/sm_iframe_container.html?sm_1=brian_jarvis___OMT_augmented_sixths___resolution_french_Bb_major&amp;sm_2=brian_jarvis___OMT_augmented_sixths___resolution_german_cad_64_D_minor&amp;sm_3=brian_jarvis___OMT_augmented_sixths___resolution_german_cad_64_C_major" title="Brian Jarvis" loading="lazy" style="height: 620px" allow="autoplay; fullscreen" allowfullscreen></iframe></div>
> <!-- embed-end -->
>

## 音乐实例

Ernesto Nazareth 的探戈"Remando"（谱例 7）在第 60 小节把 Ger<sup>+6</sup> 用作终止进行的一部分。注意从该小节开始级进下行的低音进行 *la–le–sol* $(\hat6-\downarrow\hat6-\hat5)$，这是一种在低音中以级进接近增六和弦的手法。这支舞曲的旋律有许多重音经过音，因此在这一语境下，Ger<sup>+6</sup> 期间的 C♯ 应视为装饰音。正如 Ger<sup>+6</sup> 的典型情况，其后的属和弦以 $\mathrm{cad.^6_4}$ 加以装饰。

🎼 [MuseScore 乐谱](https://musescore.com/user/32728834/scores/26284273)

<!-- embed-begin: https://musescore.com/user/32728834/scores/26284273 -->
<div class="omt-switch" data-omt-switch>
<div class="omt-switch-bar" role="tablist"><button type="button" role="tab" aria-selected="true" data-pane="lilylet">Lilylet 乐谱</button><button type="button" role="tab" aria-selected="false" data-pane="musescore">MuseScore</button></div>
<div class="omt-switch-pane" role="tabpanel" data-pane="lilylet" markdown="1">

```lyl.play
[staves "{-}"]

\staff "1" \key d \major \numericTimeSignature \time 2/4 \clef "treble" r16 <g' a>16[ <g a>16 <g a>16] r16 <g cs>16[ fs'16-> <g, cs>16] \\
\staff "2" \clef "bass" <a, a'>8.[ <g' a cs>16] cs,8[ <g' a cs>8] | %1

\staff "1" e'16->[ fs,16 a16 <fs a d>16-.] r16 <d gs>16[ cs'16-> <d, gs>16] \\
\staff "2" d,8.[ <fs a d>16] <f, f'>8[ <f f'>8] | %2

\staff "1" b'16->[ cs,16 g'16 <cs, g' a>16-.] r16 <cs g'>16[ cs'16-> <cs, g'>16] \\
\staff "2" <e,, e'>8.[ <e e'>16] <a, a'>8[ <a a'>8] | %3

\staff "1" b'16->[ d,16 fs16 <d fs a>16-.] r16 fs16[ d16 b16] \\
\staff "2" <d,, d'>8.[ <d d'>16] <fs fs'>8[ <fs fs'>8] | %4

\staff "1" r16 <g' a>16[ <g a>16 <g a>16] r16 <fs cs'>16[ fs'16-> <fs, cs'>16] \\
\staff "2" <a, a'>8.[ <g' a cs>16] <as, as'>8[ <fs' as e'>8] | %5

\staff "1" e'16->[ fs,16 b16 <fs b d>16] r16 cs'16[ e16 d16] \\
\staff "2" <b, b'>8.[ <fs' b d>16] <fs b d>8[ <fs b d>8] | %6

\staff "1" cs'16->[ cs,16 fs16 <cs fs a cs>16] r16 <b es gs>16[ b'16 a16] \\
\staff "2" cs,,8.[ cs'16] cs,8.[ cs'16] | %7

\staff "1" fs16->[ a,16 cs16 <a cs fs>16] r16 fs'16[ g16 gs16] \\
\staff "2" fs,,,8.[ fs'16] fs,4 | %8

\staff "1" r16 <g' a>16[ <g a>16 <g a>16] r16 <g cs>16[ fs'16-> <g, cs>16] \\
\staff "2" <a, a'>8.[ <g' a cs>16] cs,8[ <g' a cs>8] | %9

\staff "1" e'16->[ fs,16 a16 <fs a d>16-.] r16 <d gs>16[ cs'16-> <d, gs>16] \\
\staff "2" d,8.[ <fs a d>16] <f, f'>8[ <f f'>8] | %10

\staff "1" b'16->[ cs,16 g'16 <cs, g' a>16-.] r16 <cs g'>16[ cs'16-> <cs, g'>16] \\
\staff "2" <e,, e'>8.[ <e e'>16] <a, a'>8[ <a a'>8] | %11

\staff "1" b'16[ d,16 fs16 <d fs a>16-.] r16 fs16[ d16 b16] \\
\staff "2" <d,, d'>8.[ <d d'>16] <fs fs'>8[ <fs fs'>8] | %12

\staff "1" r16 <g' a>16[ <g a>16 <g a>16] r16 <fs cs'>16[ fs'16-> <fs, cs'>16] \\
\staff "2" <a, a'>8.[ <g' a cs>16] <as, as'>8[ <fs' as e'>8] | %13

\staff "1" e'16->[ fs,16 b16 <fs b d>16] r16 <d f gs>16[ cs'16 <d, f gs>16] \\
\staff "2" <b, b'>8.[ <fs' b d>16] <bf, f' gs>8[ <bf f' gs>8] | %14

\staff "1" b'16->[ d,16 fs16 <d fs a>16] r16 <g, cs>16[ fs'16-> e16] \\
\staff "2" <a, fs' a>8.[ <a fs' a>16] a,8[ a'8] | %15

\staff "1" d16->[ fs,16 a16 <fs a d>16] r16 fs'16[ g16 gs16] \\
\staff "2" d,,8.[ a16] d4 | %16
```

</div>
<div class="omt-switch-pane omt-embed omt-embed-musescore" role="tabpanel" data-pane="musescore" hidden><iframe data-src="https://musescore.com/user/32728834/scores/26284273/embed" title="MuseScore" loading="lazy" style="height: 990px" allow="autoplay; fullscreen" allowfullscreen></iframe></div>
</div>
<!-- embed-end -->

谱例 7. Ernesto Nazareth，"Remando"（[1:48](https://open.spotify.com/track/2VTfAb62fnkbxgiM9a57sN?si=EC26Yy8oSrKpm5nYHV0IpQ)）。作为终止进行组成部分的德国增六和弦。

> 作业

1. 增六和弦（[.pdf](https://viva.pressbooks.pub/app/uploads/sites/12/2020/07/jarvis_augmented_sixths_assignment_1-06-29-2020.pdf)，[.docx](https://viva.pressbooks.pub/app/uploads/sites/12/2020/07/jarvis_augmented_sixths_assignment_1-06-29-2020.docx)）。要求学生拼写增六和弦、实现通奏低音、写作带罗马数字的四声部声部进行，并分析一个音乐片段。[音频 1——肖邦](https://open.spotify.com/track/2MSgFefjK0T7Iwjvr3OKqV?si=tkUUOzaLRIqFCONxyFp3ZA)，[音频 2——Scott Joplin（片段从 0:56 开始）](https://open.spotify.com/track/59Ee9mo7UNkt9xzt3xEJRA?si=0HMnLPcbR3WmNo8NWN4YHQ)。