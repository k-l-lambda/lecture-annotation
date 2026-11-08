# 小二部曲式

小二部曲式（small binary）所承担的结构角色常常与小三部曲式相似。它可以充当任何一种完整乐章曲式的主部主题，但最常见于主题与变奏、[回旋曲](thematicFunctionInRondo.md)或[小步舞曲与三声中部](minuet.md)的主题。

小二部曲式有两个部分，通常每个部分都会反复。与["再现二部曲式"](smallTernary.md#binary-characteristics)不同，小二部曲式*不*包含对*第一部分*中所听到材料的再现。

![小二部曲式](assets/ClassicalThemes/smallBinary.png)

小二部曲式

### 第一部分 {#first-part}
*第一部分*通常构造成一个紧凑的[乐段](period.md)、[句子式](sentence.md)或[混合主题](hybridThemes.md)，以主调或某个近关系调上的终止式划分作结。由于小二部曲式常常比*小三部曲式*规模更小，在第一部分结尾处出现 I:HC 的情况并不少见。

### 第二部分 {#second-part}
小二部曲式的*第二部分*往往像一个对比中段那样开始。然而，*紧随*在*对比中段*之后的材料并不是*再现*。如果它是再现，这个主题就会是一个[小三部曲式](smallTernary.md)。相反，这部分材料会以多种面貌出现。它常常类似于某种常见的"后置乐句"（after-phrases）：*展开*、*后乐句*或*终止*。在古典风格中，小二部曲式的第二部分总是以 I:PAC 收束。

### 一个例子 {#an-example}

![莫扎特（Mozart），A 大调小提琴奏鸣曲，K. 305](assets/form/k305.png)

莫扎特（Mozart），A 大调小提琴奏鸣曲，K. 305

<!-- lilylet-begin: assets/form/k305.png -->
```lyl.play
[composer "Wolfgang Amadeus Mozart"]
[staves "<vn> {pr-pl}"]
[instrument-vn "Violin"]
[instrument-pr-pl "Piano"]

\key a \major \time 2/4 \partial 8 \tempo "Andante grazioso" \clef "treble" r8 \\\\
\staff "1" \clef "treble" \stemDown cs'16.(\trill\p[ d32] \\
\staff "2" \clef "bass" r8 | %1

<cs e>2\p \\\\
\staff "1" \stemDown e'8[_\markup "dolce" a,) a-.( a-.)] \\
\staff "2" \stemDown a,4-- <cs' e> | %2

<b e>4~ <cs e>8 r \\\\
\staff "1" \stemUp b'8.([ gs16] a8) r \\
\staff "2" \stemDown <d e>4~ <cs e>8 r | %3

\grace { fs16[ b] } d4--\mf cs16.([ a32 cs16. a32)] \\\\
\staff "1" \grace { a'16[ d] } \stemDown fs4--\f e16.([ cs32 a'16. cs,32)] \\
\staff "2" \stemDown <d, d'>4-- <a a'>-- | %4

\grace cs'8 b8(-.[ a)-.] r4 \\\\
\staff "1" \grace e'8 \stemDown d8(-.[ cs)-.] r \stemUp a-.\p \\
\staff "2" \stemDown <e, gs>8(-.[ <a, a'>)-.] r4 | %5

b4(_\markup "mfp" cs8) r \\\\
\staff "1" \stemUp b'8(\fp[ a32 gs fs e] e'8)-.[ a,-.] \\
\staff "2" \stemDown <d, e gs>4(~ <cs e a>8)\< r\! | %6

b4(_\markup "mfp" cs8) r \\\\
\staff "1" \stemUp b'8(\fp[ a32 gs fs e] e'8)-.[ <a, cs>--\f] \\
\staff "2" \stemDown <d, e gs>4(~ <cs e a>8)[ <ds fs>] | %7

r4 b8(--[ b)--] \\\\
\staff "1" \stemUp b'16.([ gs32 fs16. a32] e8[ \grace gs8 fs-.] \\
\staff "1" \stemDown gs'16.[ e32 cs8] b[ ds] \\
\staff "2" \clef "bass" \stemDown <e, gs>8(--[ <a, a'>--] <b gs'>--[ <b a'>)--] | %8

\partial 4. b4 r8 \bar ":..:" \\\\
\staff "1" \stemUp e4--) r8 \\
\staff "2" \stemUp <e, gs>4 s8 \\
\staff "2" \stemDown e,8(-.[ b] e,)-. | %9

\partial 8 r8 \\\\
\staff "1" \grace e8( \stemUp b'16.)\p[ a32-.] \\
\staff "2" r8 | %10

r4 r8 \grace e8( b'16.)\p\<[ a32-.] \\\\
\staff "1" \stemUp a'16([ gs) gs8-.] r \grace b8( \stemDown d!16.)\<[ cs32-.] \\
\staff "2" r8 \stemUp e,(-.\p[ e,)-.] r | %11

a'16(\!\>[ gs) gs8-.]\! r \grace b8( d16.)[ cs32-.] \\\\
\staff "1" \stemDown cs'16([ b) b8-.] r \grace d8( fs16.)[ e32-.]\! \\
\staff "2" r8 \stemUp e,(\!-.[ e,)-.] r | %12

b'8[_\markup "cresc." \grace e,8( d'16.) cs32-.] b8[ \grace b8( gs'16.) a32-.] \\\\
\staff "1" \stemDown d'8[_\markup "cresc." \grace b8( d'16.) b32-.] b8[ \grace b8( d16.) cs32-.] \\
\staff "2" \stemDown e,8 r e r | %13

b''4.\f gs,16(\p[ b)] \\\\
\staff "1" \stemDown <e' gs b d>4.\f b'16(\p[ gs)] \\
\staff "2" \tuplet 3/2 { e,,16([ gs b] } \tuplet 3/2 { e16[ gs b] } \stemDown d4) | %14

e4 e'16([ d cs\< b)] \\\\
\staff "1" \clef "treble" \stemDown a''16([ gs fs e] gs[ fs\> e d)] \\
\staff "2" \clef "bass" \stemDown <cs, cs'>4( <d d'> | %15

a'8([ gs)\!] r cs,16.(->\f[ b32)] \\\\
\staff "1" \stemDown cs'8([ b)\!] r \stemUp <a cs>16.(->\f[ <gs b>32)] \\
\staff "2" \stemDown <e, e'>4 r16. \stemUp a32(\mf[ b16. cs32] | %16

b16([ a)] a4 d16.(->[ cs32)] \\\\
\staff "1" \stemUp <gs' b>16([ <fs a>)] <fs a>4 \stemDown <b d>16.(->[ <a cs>32)] \\
\staff "2" \stemUp d,16.[ cs32 d16. cs32)] d16.[ b32\< cs16.( d32] | %17

cs16([ b)] b4 e16.(\>[ d32)\!] \\\\
\staff "1" \stemUp <a' cs>16([ <gs b>)] <gs b>4 \stemDown <cs e>16.(->[ <b d>32)] \\
\staff "2" \stemDown e,16.[ ds32 e16. ds32] e16.)\![ cs32(\f d16. e32] | %18

d16(\p[ cs fs) d-.] cs8-.[ b-.] \\\\
\staff "1" \stemDown <b' d>16([ <a cs> <d fs> <b d>)\>] \stemUp <a cs>8-.\p\![ <d, e gs b>-.] \\
\staff "2" \stemDown fs,8[ d)-.] e(-.[ e-.] | %19

\partial 4. b8([ a)] r \bar ":|." \\\\
\staff "1" \stemUp <d e gs b>8([ <cs a'>)] r \\
\staff "2" \stemDown a8-.[ e-.] a,--) | %20
```
<!-- lilylet-end -->

在这个小二部曲式中，*第一部分*由一个简单乐段构成，它转调到属调，并以 V:PAC 在属调上收束。随后是一个*对比中段*，我们在其中看到一个典型的["属持续"](externalExpansions.md#suffix)（standing on the dominant），支撑着 V7 的延长。注意，*对比中段*中的动机材料与我们在*第一部分*中听到的动机材料相当相似。这是小二部曲式的典型特征：其*第二部分*与*第一部分*之间的对比程度，不像*小三部曲式*中那么高。在*对比中段*之后，这个例子的最后四小节类似于一个展开：我们在*对比材料*中听到的旋律动机被碎片化并加以模进，并从进入倒数第二小节的弱起开始，形成一个终止式。
