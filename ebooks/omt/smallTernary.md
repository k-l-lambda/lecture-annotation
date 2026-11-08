# 小三部曲式

和较小的[句子式](sentence.md)、[乐段](period.md)以及[混合](hybridThemes.md)主题一样，小三部曲式（small ternary）可以单独充当一个完整乐章曲式的主题。不过，小三部曲式的规模更大：它由主题构成，正如那些较小的主题类型由乐句和次乐句构成一样。作为一个稍大一些的结构，这种主题类型涉及一些关于曲式组织与感知的有趣问题（这些问题部分源于它的历史渊源），我们在完整乐章的曲式中也会遇到这些问题。

这种主题类型通常通过三种[主题功能](themeFunctions.md)来表现："呈示（A）"、"对比中段（B）"和"再现（A）"。

![小三部曲式](assets/ClassicalThemes/smallTernary.png)

小三部曲式

### 三种主题功能 {#three-thematic-functions}
*呈示*（exposition）和*再现*（recapitulation）是"紧凑"（tight-knit）的功能，通常由较小的主题类型之一来表现。两者都以终止式结束。最常见的情况是，小三部曲式的*呈示*以 I:PAC 结束，但呈示也可以转调到一个近关系调。在大调作品中，典型的转调会使呈示以 V:PAC 结束；而在小调中，中音调（III:PAC）调区更为常见。

*再现*跟在*对比中段*之后，以*呈示*中主题材料的回归为标志。在最简单的例子中，*再现*可能只是照搬*呈示*。但更常见的是会作出一些改动，包括[扩展与压缩](internalExpansions.md)。当*呈示*在非主调上终止时，改动尤为常见（事实上是必需的）：*再现*总是以 I:PAC 收束，因此，如果呈示已经转调，再现就必须加以改动，以便结束在主调上。

*对比中段*（contrasting middle）位于*呈示*与*再现*之间，是一个"松散"（loose）的曲式区域，提供旋律与和声上的对比。由于它是一个较松散的区域，它通常不由某种主题类型来表现。如果说有什么典型特征的话，那就是不可预测性。尽管如此，我们常常可以用碎片化、模进和转调之类的"松散化手法"（loosening devices）来描述这类段落。并且，作为提供和声对比的手段，*对比中段*往往强调属和声。为了标示其结束、提供对比，并为*再现*中主和弦的回归制造期待，这些段落在结尾处总是落在属和声上。这可以表现为 I:HC、V:PAC，或者在较简单的情况下，整个*对比中段*通过一个"[属持续](externalExpansions.md#suffix)"（standing on the dominant）来延长属和声。

### 一个例子 {#an-example}
![莫扎特（Mozart），D 大调钢琴奏鸣曲，K. 284，"Tema con variazione"（主题与变奏）](assets/form/k284.png)

莫扎特（Mozart），D 大调钢琴奏鸣曲，K. 284，"Tema con variazione"（主题与变奏）

<!-- lilylet-begin: assets/form/k284.png -->
```lyl.play
[composer "Wolfgang Amadeus Mozart"]
[staves "{-}"]

\staff "1" \key d \major \time 4/4 \partial 2 \tempo "Andante" \clef "treble" a'4-.(\p a-.) \\
\staff "2" \clef "bass" r2 \clef "treble" | %1

\staff "1" d'2( cs8[\< d e fs]\! \\
\staff "2" \stemUp d8([ a' fs a] b,[ fs' d fs)] \\
\staff "2" \stemDown d4 s b s | %2

\staff "1" g''8[ e g e] d[ cs b a)] \\
\staff "2" \stemUp g8([ e' b e] a,[ g' e g)] \\
\staff "2" \stemDown g4 s a s | %3

\staff "1" a''8([ fs a fs] b\>[ g b g] \\
\staff "2" \stemUp d8([ a' fs a] g,[ e' b e)] \\
\staff "2" \stemDown d4 s g, s | %4

\staff "1" fs'4 e)-.\! a,-.(\f a-.) \\
\staff "2" \stemUp d4( cs) r2 \clef "bass" \\
\staff "2" \stemDown a2 s2 | %5

\staff "1" d'2( fs8[ e d cs)] \\
\staff "2" \stemDown fs,8([ d' a d] d,[ b' fs b)] \\
\staff "2" \stemUp fs,4 s d s | %6

\staff "1" b'8([ d b d)] b'->([ a gs fs)] \\
\staff "2" e,8([ b' gs b] gs[ d' b d)] | %7

\staff "1" e'8([ a fs)-. d-.] cs([ e d)-.] <d, b'>-.( \\
\staff "2" <a cs>4(-. <d, b'>-. <e a>-. <e gs>)-. | %8

\staff "1" \partial 2 <d b'>4\> <cs a'>)-.\! \bar ":..:" \\
\staff "2" <a, e' a>2 | %9

\staff "1" \partial 2 a''8(\p[ gs a gs] \\
\staff "2" r2 | %10

\staff "1" a''8[ b gs e)-.] g([ a fs d)-.] \\
\staff "2" <b ds>4(-> <e, e'>)-. <a cs>(-> <d, d'>)-. \clef "treble" | %11

\staff "1" d''8(\f->[ cs b as] b->[ a g fs)] \\
\staff "2" b'8(->[ a g fs] g->[ fs e d)] | %12

\staff "1" <e' g>4(\p\< <d fs> e)-. d-.\! \\
\staff "2" \stemUp a'2~ a4 gs \\
\staff "2" \stemDown cs4( d cs)-. b-. | %13

\staff "1" fs'2(\fp e8) r r4 \\
\staff "2" \stemUp a'2( a8) r r4 \\
\staff "2" \stemDown <a d>2( <a cs>8) s s4 | %14

\staff "1" r2 a'4-.(\f a-.) \\
\staff "2" R1 | %15

\staff "1" d'2( cs8[ d e fs] \\
\staff "2" \stemUp d8([ a' fs a] b,[ fs' d fs)] \\
\staff "2" \stemDown d4 s b s | %16

\staff "1" g''8->[ e g e] d\>[ cs b a)\!] \\
\staff "2" \stemUp g8([ e' b e] a,[ g' e g)] \\
\staff "2" \stemDown g4 s a s | %17

\staff "1" a''8(\f[ d b)-. g-.] fs([ a g)-.] <g, e'>-.( \\
\staff "2" <d fs>4(-. \clef "bass" <g, e'>-. <a d>-. <a cs>)-. | %18

\staff "1" \partial 2 <g' e'>4\> <fs d'>)-.\! \bar ":|." \\
\staff "2" <d, a' d>2 | %19
```
<!-- lilylet-end -->
 
上面给出的是一个典型的例子：莫扎特 D 大调钢琴奏鸣曲 K. 284 末乐章（变奏乐章）的"主题"。莫扎特的*呈示*是一个简单乐段，其后半部分转调到属调，以 V:PAC 结束。反复之后，*对比中段*以一个 [*fonte*](schemataContinuationPatterns.md) 模进开始，导向一个碎片化的、下行音阶式的段落，以 I:HC 结束该段。（注意与*呈示*之间的动机关联：第 10 小节的下行音阶令人想起进入第 7 小节的弱起，而 *fonte* 所配置的旋律动机则与第 7 小节的前两拍相似。）最后，再现回顾了呈示。不过，它只呈现了*对比乐句*，并对其加以改动，使主题以 I:PAC 结束。

### 二部特征 {#binary-characteristics}
莫扎特的主题为我们展示了小三部曲式最常见的特征之一：反复记号。这些反复记号把曲式分成*两个部分*，而这正是这种主题类型最受讨论（也许也是最有争议、最令人困惑）的特征之一。由于在最大的层面上，这一主题的三个部分嵌套在*两个反复段*（reprises）之中，许多音乐理论家更愿意把这类段落标为*二部曲式*。由于我们选择强调古典曲式的功能特征，而这个段落中有三种功能，因此在这里采用三部曲式的理解更为合适。在整个音乐史上，我们也能找到没有反复（或者也许只有一个反复）的例子，这些例子表明反复记号并不是一个必备的特征。

不过，与其去裁定这个问题，成熟的分析者往往会理解这里存在的模糊性。作为一种常见的折中办法，许多音乐理论家把像莫扎特这样的段落（具有*呈示*、*对比中段*、*再现*，*并且*带有反复记号的段落）标为"再现二部曲式"（rounded binary）。"再现"（rounded）这一说法指的是呈示材料在曲式结尾处的回归，其效果是使结构得以"圆满收束"。
