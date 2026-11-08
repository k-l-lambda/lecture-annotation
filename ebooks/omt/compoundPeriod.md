# 复乐段

复乐段（compound period，也称 *16 小节乐段*，因为其典型形式长 16 小节）由*两个主题*而不是*两个乐句*构成。和 [8 小节乐段](period.md)一样，复乐段的前后两半分别表现出[前乐句](themeFunctions.md#antecedent)功能和[后乐句](themeFunctions.md#consequent)功能。为了加以区分，我们把它们称为"大前乐句"（large antecedent）和"大后乐句"（large consequent）。

复乐段前后两半可以采用的主题类型，必须有利于实现前乐句和后乐句的功能。因此：

- *大前乐句*的起始乐句通常长四小节，它起着基本动机的作用，可以是呈示、前乐句或复合基本动机；  
- 结束的一半通常也长四小节，它起着对比动机的作用，并且总是一个展开乐句；  
- *大后乐句*应当再现第一个主题中的 BI（往往有所变化），其结尾的 CI 将以强终止式结束。    

这些功能上的要求往往产生三种类型的复乐段。

## 由两个句子式构成的复乐段 {#a-compound-period-comprised-of-two-sentences}

复乐段中的两个句子式拥有相同的基本动机，各自都表现出呈示功能。在第一个句子式中，呈示之后跟着一个以弱终止式结束的展开。在第二个句子式中，展开最终达到一个强终止式，最常见的是 PAC。

![复乐段（句子式 + 句子式）结构示意图](assets/ClassicalThemes/16period-sent.svg)

![复乐段（句子式 + 句子式）：莫扎特（Mozart），D 大调钢琴奏鸣曲，K. 284，第二乐章，第 1–8 小节](assets/form/k284-ii.png)

复乐段（句子式 + 句子式）：莫扎特（Mozart），D 大调钢琴奏鸣曲，K. 284，第二乐章，第 1–8 小节

<!-- lilylet-begin: assets/form/k284-ii.png -->
```lyl.play
[composer "Wolfgang Amadeus Mozart"]
[staves "{-}"]

\staff "1" \key a \major \time 3/4 \tempo "Andante" \clef "treble" a'2\f b8.(\sf[ gs16)] \\
\staff "2" \clef "bass" <a cs>2 <e d'>4\sf | %1

\staff "1" a'8[ e(\p ds e d! cs)] \\
\staff "2" <a cs>8[ cs bs cs b! a] | %2

\staff "1" b'2\f cs8.\sf[ a16] \\
\staff "2" <e, gs>2 <a e'>4\sf | %3

\staff "1" d'8[ d,(\p cs d cs b)] \\
\staff "2" <gs e'>8[ b as b a gs] \clef "treble" | %4

\staff "1" e'4. fs32(_\markup "sfp"^\markup "f" [ e d cs)] d8-.[ d-.] \\
\staff "2" r4 <cs e a>4 <b e gs>4\f \clef "bass" | %5

\staff "1" cs'4.\p d32(_\markup "sfp"^\markup "f" [ cs b a)] gs8-.[ gs-.] \\
\staff "2" r4 <a cs e>4\p <d, e b'>4\f | %6

\staff "1" a'4.\p <gs b>8_\markup "cresc."([ <a cs> <b d>)] \\
\staff "2" r8 a,8\p cs'[ <d e> <cs e> <b e>] | %7

\staff "1" \stemUp ds'16[ e fs d!] cs4( b) \\
\staff "1" \stemDown cs'8[ d16\p b] a4( gs) \\
\staff "2" <a e'>8[ d] e4 e, | %8

\staff "1" a'4\f~ \tuplet 3/2 { a8([ e cs')] } \tuplet 3/2 { d8([ b gs)] } \\
\staff "2" \stemUp s4 cs b8[ d] \\
\staff "2" \stemDown r4 a\f e | %9

\staff "1" a'8[ e(\p ds e d! cs)] \\
\staff "2" <a cs>8[ cs( bs cs b! a)] | %10

\staff "1" b'4~ \tuplet 3/2 { b8([ e, d')] } \tuplet 3/2 { cs8([ a fs')] } \\
\staff "2" r4 <e, gs>4\f <a e'> | %11

\staff "1" \grace e'8 d8\p[ d,( cs d cs b)] \\
\staff "2" r8 b([ as b a gs)] \clef "treble" | %12

\staff "1" e'4~ e16[ es(\sf fs cs)] \grace e8( d8)-.\p[ d-.] \\
\staff "2" r4 <cs a'>4\f <b gs'>4\p \clef "bass" | %13

\staff "1" cs'4~ cs16[ ds(\sf e a,)] \grace a8( gs8)-.\p[ gs-.] \\
\staff "2" r4 <a e'>4\f <d e>4\p | %14

\staff "1" a'16(_\markup "crescendo"[ b cs d!] e[ fs gs a)] gs([ fs e d)] \\
\staff "2" \stemUp <cs e>4 a2~ \\
\staff "2" \stemDown s4 cs,4 d | %15

\staff "1" cs'16(\f[ e d b)] <d, b'>4( <cs a'>) \bar "||" \\
\staff "2" \stemUp a8[ gs] a[ e] a,4 \\
\staff "2" \stemDown e,2 r4 | %16
```
<!-- lilylet-end -->

🎧 [Spotify：莫扎特，D 大调钢琴奏鸣曲，K. 284，第二乐章](https://open.spotify.com/track/5nBf5P09DwNUA9XbwKueVI)

大前乐句被构造成一个句子式，其基本动机是一个呈示，其对比动机是一个展开。在第 8 小节的 HC 之后，下一个乐句以变化的形式再次陈述这个呈示性的基本动机。最后四个小节最终达到一个 PAC。

## 由两个混合主题构成的复乐段 {#a-compound-period-comprised-of-two-hybrids}

如果起始乐句由一个前乐句而不是呈示构成，那么这个 8 小节的前乐句就会是["前乐句 + 展开"](hybridThemes.md#hybrid-1)这一类的混合主题。

![复乐段（混合型 1 + 混合型 1）结构示意图](assets/ClassicalThemes/16period-hybrid1.svg)

![复乐段（混合型 1 + 混合型 1）：莫扎特（Mozart），F 大调钢琴奏鸣曲，K. 332，第一乐章，第 41–56 小节](assets/form/k332.png)

复乐段（混合型 1 + 混合型 1）：莫扎特（Mozart），F 大调钢琴奏鸣曲，K. 332，第一乐章，第 41–56 小节

<!-- lilylet-begin: assets/form/k332.png -->
```lyl.play
[composer "Wolfgang Amadeus Mozart"]
[staves "{-}"]

\staff "1" \key c \major \time 3/4 \clef "treble" \grace g'8( \stemDown e'8)-.\p b\rest e-. b\rest e-. b\rest \\
\staff "2" \clef "bass" \grace { c,16[ g'] } \stemDown c4 d,\rest d\rest | %1

\staff "1" \grace b'8( \stemDown g'4.)( f8 d4) \\
\staff "2" \grace { g16[ d'] } \stemDown f4 d,\rest d\rest | %2

\staff "1" \stemUp d'8[ c] s2 \\
\staff "1" \stemDown e4 \stemUp <g c>4.( \stemDown <b d>8) \\
\staff "2" \stemUp c,4 \stemDown e g | %3

\staff "1" \stemDown <b' d>2( <c e>4) \\
\staff "2" \stemDown c4 \stemUp c, d\rest \clef "treble" | %4

\staff "1" \stemDown f'4. \grace { g16[( f e] } f8)([ g a] \\
\staff "2" \stemUp a4( <c f>) b'\rest | %5

\staff "1" \stemDown a''8[ g fs g fs d)] \\
\staff "2" \stemUp b4( <d g>) b\rest \clef "bass" | %6

\staff "1" \stemDown ds'8([ e f! e g f)] \\
\staff "2" \stemDown c4 <a c>( <f d'>) | %7

\staff "1" \stemDown e'8([ d! c b a g)] \\
\staff "2" \stemDown <g b>4 d\rest d\rest \clef "treble" | %8

\staff "1" \stemDown ds'8([ e)] ds([ e)] ds([ e)]_\markup "cresc." \\
\staff "2" \tuplet 3/2 { c8[ e g] } \tuplet 3/2 { c,8[ e g] } \tuplet 3/2 { c,8[ e g] } | %9

\staff "1" \stemDown fs'8([ g)] fs([ g)] f!([ d)] \\
\staff "2" \tuplet 3/2 { b8[ d g] } \tuplet 3/2 { b,8[ d g] } \tuplet 3/2 { b,8[ d g] } | %10

\staff "1" s4 \stemUp d'8([ c)] e([ d)] \\
\staff "1" \stemDown d'8(\p[ c)] g4 b \\
\staff "2" \stemUp <c e>4 \clef "bass" \stemDown e, g | %11

\staff "1" \stemUp d'4.( ds8) e4 \\
\staff "1" \stemDown b'2 c4 \\
\staff "2" \stemDown c4 g \stemUp c, \clef "treble" | %12

\staff "1" \stemDown f'4. \grace { g16[( f e] } f8)([ g a] \\
\staff "2" \stemUp a8([ c f c a c)]_\markup "cresc." | %13

\staff "1" \stemDown a''8[ g fs g f! d)] \\
\staff "2" \stemUp b8([ d g d b d)] \clef "bass" | %14

\staff "1" \stemDown ds'8(\f[ e g f d! b)] \\
\staff "2" \stemDown c4 <f, d'> <g f'> | %15

\staff "1" \partial 4 \stemDown c'8 s \\
\staff "2" \stemDown <c e>4 \clef "treble" | %16
```
<!-- lilylet-end -->

在这个例子中，大前乐句以一个小前乐句开始（第 41–44 小节），它起着基本动机的作用。在大后乐句中，这个基本动机以变化的形式再现（第 49–52 小节）。

🎧 [Spotify：莫扎特，F 大调钢琴奏鸣曲，K. 332，第一乐章](https://open.spotify.com/track/0z0t5ihTRm0XSZSw8iRZ0T)

与此相对，如果起始乐句由一个["复合基本动机"](hybridThemes.md#the-compound-basic-idea)构成，那么大前乐句就会是第 3 种混合型：复合基本动机 + 展开。这种类型的复乐段与上一种*非常相似*。唯一的区别在于，起始乐句不会达到终止式，从而使主题的开端具有一种较松散的性质。

![复乐段（混合型 3 + 混合型 3）结构示意图](assets/ClassicalThemes/16period-hybrid3.svg)
