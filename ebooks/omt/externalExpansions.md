# 外部扩展

一个主题之前或之后常常会有一些材料，它们位于主题通常的边界之外，但又明显依附于该主题。这些材料处在主题本身的*外部*，正如威廉·卡普林（William Caplin）所称，是"开始之前"（before-the-beginning）或"结束之后"（after-the-end）。

## 前置段 {#prefix}

*前置段*（prefix）是*先于*一个主题出现的段落，可短可[长](sonataFramingModules.md)。短的前置段缺乏鲜明的动机材料和/或和声进行。前置段虽然与其后的主题相连，但去掉之后并不会扰乱乐句本身的逻辑。

![前置段：海顿（Haydn），第 101 交响曲，"时钟"](assets/form/sym101.png)

前置段：海顿（Haydn），第 101 交响曲，"时钟"

<!-- lilylet-begin: assets/form/sym101.png -->
```lyl.play
[composer "Joseph Haydn"]
[staves "{-}"]

\staff "1" \key g \major \time 2/4 \tempo "Andante" R2 \\
\staff "2" \clef "bass" \ottava #0 \stemDown <g b>8-.\p[ <b d>-. <g b>-. <b d>-.] | %1

\staff "1" \markup "dolce" \stemDown d'8..([ b32)] g'8~[ g] \\
\staff "2" \stemDown <g b>8-.[ <b d>-. <g b>-. <b d>-.] | %2

\staff "1" \grace g''8( \stemDown b8)([ a32 g fs e] d8..)[ e32(] \\
\staff "2" \stemDown <g b>8-.[ <b d>-. <g b>-. <b d>-.] | %3

\staff "1" \stemDown c'16.[ d32 b16. c32] \stemUp <e, a>16.[ b'32 <e, g>16. a32] \\
\staff "2" \stemDown <fs, a d>8-.[ <g b d>-.] <c, c'>-.[ <cs cs'>-.] | %4

\staff "1" \stemUp fs8.[ g16)] b4\rest \\
\staff "2" \stemDown <d, d'>8-.[ d,-.] d'4\rest | %5
```
<!-- lilylet-end -->

🎧 [Spotify：海顿，第 101 交响曲"时钟"](https://open.spotify.com/track/3JlbelZisTTwEh6e13uRyQ)

在这里，一个一小节的伴奏性前置段为从第 2 小节开始的四小节前乐句作了准备。这个前置段既缺乏有特征的旋律，也缺乏和声进行。

## 后置段 {#suffix}

后置段（suffix）延长结束主题的那个和声。根据其所附属的主题以何种终止式（PAC 或 HC）结束，后置段会得到不同的描述和名称。

### 结束段 {#closing-sections}

*结束段*（closing sections）有时也称为*小尾声*（codettas），跟在以 PAC 结束的主题之后。

![结束段：莫扎特（Mozart），C 大调钢琴奏鸣曲，K. 330](assets/form/k330.png)

结束段：莫扎特（Mozart），C 大调钢琴奏鸣曲，K. 330

<!-- lilylet-begin: assets/form/k330.png -->
```lyl.play
[composer "Wolfgang Amadeus Mozart"]
[staves "{-}"]

\staff "1" \key c \major \time 2/4 \tempo "Allegretto" \clef "treble" \ottava #0 \stemDown e'8.([ f32 g)] c,8[ <b d>-.] \\
\staff "2" \clef "bass" \ottava #0 d,8\rest \stemDown c[ e g] | %1

\staff "1" \stemDown b'8[ c] b4 \\
\staff "1" \stemUp d'8([ f16 e] d4 \\
\staff "2" \stemDown c8[ c,] \stemUp g'[ g,] | %2

\staff "1" \stemDown e'8.([ f32 g)] c,8[ <b d>-.] \\
\staff "2" d,8\rest \stemDown c[ e g] | %3

\staff "1" \stemDown <d' f>8([ <c e>)]\trill \stemUp <b d>4 \\
\staff "2" \stemDown c8[ c,] \stemUp g'[ g,] | %4

\staff "1" \stemDown f'8.([ g32 f] e8)[ e-.] \\
\staff "2" \stemDown a8([ c g c] | %5

\staff "1" \stemDown a''8.([ b32 c] g8)[ g-.] \\
\staff "2" \stemDown f,8[ c' e, c')] | %6

\staff "1" \stemDown g''16([ f) f( d)] f([ e) e( c)] \\
\staff "2" \clef "treble" b'8\rest \stemUp <b, g'> b'\rest <c, g'> \clef "bass" | %7

\staff "1" \ottava #0 \stemDown cs'16([ d e d] \stemUp c[ b a g)] \\
\staff "2" \ottava #0 \stemDown <g b>4 d\rest | %8

\staff "1" \stemDown e'8.([ f32 g)] c,8[ <b d>-.] \\
\staff "2" \stemUp c,,16([ e g c] e,[ e' g, g'] | %9

\staff "1" \stemUp d'8([ f16 e)] d4 \\
\staff "1" \stemDown b'8[ c] b4 \\
\staff "2" \stemDown c,16[ e g c] \stemUp g,[ b d g)] | %10

\staff "1" \stemDown e'8.([ f32 g)] c,8[ <b d>-.] \\
\staff "2" \stemUp c,,16([ e g c] e,[ e' g, g'] | %11

\staff "1" \stemDown <d' f>8([ <c e>)]\trill \stemUp <b d>4 \\
\staff "2" \stemDown c,16[ e g c] \stemUp g,[ b d g)] | %12

\staff "1" \stemDown f'8.([ g32 f)] e8[ e-.] \\
\staff "2" \stemDown a16([ c a c] g[ c g c)] | %13

\staff "1" \ottava #0 \stemDown a''8.([ b32 c] g8)[ g-.] \\
\staff "2" \ottava #0 \stemDown f,16[ c' f, c'] e,[ c' e, c')] | %14

\staff "1" \stemDown gs''16([ a f d] c8[ b)] \\
\staff "2" s8 \stemUp d e[ d] \\
\staff "2" d,8\rest \stemDown f g4 | %15

\staff "1" ^\markup "legato" \tuplet 3/2 { c'16[ g e'] } \tuplet 3/2 { c[ g' e] } \tuplet 3/2 { c'[ b a] } \tuplet 3/2 { g[ f e] } \\
\staff "2" \stemDown <c e>4 d,\rest | %16

\staff "1" \tuplet 3/2 { cs'16[ d f] } \tuplet 3/2 { a[ f d] } \tuplet 3/2 { g[ e c] } \tuplet 3/2 { f[ d b] } \\
\staff "2" s8 \stemUp d <c e>[( <d f>)] \\
\staff "2" d,8\rest \stemDown <f a> g4 | %17

\staff "1" \ottava #0 \tuplet 3/2 { c'16[ g e'] } \tuplet 3/2 { c[ g' e] } \tuplet 3/2 { c'[ b a] } \tuplet 3/2 { g[ f e] } \\
\staff "2" \ottava #0 \stemDown <c e>4 d,\rest | %18

\staff "1" \tuplet 3/2 { cs'16[ d f] } \tuplet 3/2 { a[ f d] } \tuplet 3/2 { g[ e c] } \tuplet 3/2 { f[ d b] } \\
\staff "2" s8 \stemUp d <c e>[( <d f>)] \\
\staff "2" d,8\rest \stemDown <f a> g4 | %19

\staff "1" \stemUp c'8[ g-.] c,4 \\
\staff "2" \stemDown <c e>8[ g-.] \stemUp <c,, c'>4 | %20
```
<!-- lilylet-end -->

🎧 [Spotify：莫扎特，C 大调钢琴奏鸣曲，K. 330](https://open.spotify.com/track/3ZlIXdp94i6qpfox8Su6Ll)

这里的[复乐段](compoundPeriod.md)在第 16 小节以 PAC 结束。在这个终止式之后，一个五小节的*结束段*起着确认它的作用。注意，旋律以音级 1̂ 为中心（这是此类段落的常见特征），并且在和声上，结束主题的 ii–V–I 终止进行（见第 15 和 16 小节）只是被简单地重复。

### 属持续 {#standing-on-the-dominant}

当*后置段*跟在一个半终止之后时，我们称之为*属持续*（standing on the dominant）。这些段落常常是主题进入（例如奏鸣曲式乐章的[第二主题](sonataThematicModules.md)）或主题回归（例如[小三部曲式](smallTernary.md#three-thematic-functions)中的再现）的信号。

![属持续：莫扎特（Mozart），第 40 交响曲，K. 550，第一乐章](assets/form/sym40.png)

属持续：莫扎特（Mozart），第 40 交响曲，K. 550，第一乐章

<!-- lilylet-begin: assets/form/sym40.png -->
```lyl.play
[composer "Wolfgang Amadeus Mozart"]
[staves "{-}"]

\staff "1" \key bf \major \time 4/4 \tempo "Allegro molto" \clef "treble" \ottava #0 bf'2\rest bf4\rest \stemDown ef8(\p[ d] \\
\staff "2" \clef "bass" \ottava #0 \stemDown g4 g,\rest g2\rest \\
\staff "2" \ottava #0 \stemUp bf8[ d bf d] bf[ d bf d] | %1

\staff "1" \stemDown d'4)-. ef8([ d] d4)-. ef8([ d] \\
\staff "2" \stemDown g4 g,\rest g2\rest \\
\staff "2" \stemUp bf8[ d bf d] bf[ d bf d] | %2

\staff "1" \stemDown d'4() bf') bf,\rest bf'8([ a] \\
\staff "2" \stemDown g4 g,\rest g2\rest \\
\staff "2" \stemUp bf8[ d bf d] bf[ d bf d] | %3

\staff "1" \stemDown g''4)-. g8([ f] ef4)-. ef8([ d] \\
\staff "2" \stemDown g4 g,\rest g2\rest \\
\staff "2" \stemUp bf8[ d bf d] bf[ d bf d] | %4

\staff "1" \ottava #0 \stemDown c'4)-. c-. bf\rest d8([ c \\
\staff "2" \ottava #0 \stemDown g4 g,\rest g2\rest \\
\staff "2" \ottava #0 \stemUp a8[ ef' c ef] a,[ ef' c ef] | %5

\staff "1" \stemDown c'4)-. d8([ c)-.] c4 d8([ c \\
\staff "2" \stemDown g4 g,\rest g2\rest \\
\staff "2" \stemUp a8[ ef' c ef] a,[ ef' c ef] | %6

\staff "1" \stemDown c'4() a') bf,\rest a'8([ g] \\
\staff "2" \stemDown fs,4 g,\rest g2\rest \\
\staff "2" \stemUp a8[ d c d] a[ d c d] | %7

\staff "1" \stemDown fs'4)-. fs8([ ef] d4)-. d8([ c] \\
\staff "2" \stemDown d,4 g,\rest g2\rest \\
\staff "2" \stemUp a8[ d c d] fs,[ d' a d] | %8

\staff "1" \stemDown bf'4)-. bf-. bf\rest bf'8([ a] \\
\staff "2" \stemDown g2 \stemUp g8[ d' bf d] \\
\staff "2" \stemUp g8[ d' bf d] \stemDown g,2 | %9

\staff "1" \stemDown a''4() c fs, a \\
\staff "2" c,1 \\
\staff "2" \stemUp ef,8[ a fs a] ef[ a fs a] | %10

\staff "1" \ottava #0 \stemDown g''4 d) bf\rest bf'8([ a] \\
\staff "2" \ottava #0 bf,1 \\
\staff "2" \ottava #0 \stemUp d,8([ bf' g bf] d,[ bf' g bf)] | %11

\staff "1" \stemDown a''4() c fs, a \\
\staff "2" c,1 \\
\staff "2" \stemUp ef,8([ a fs a] ef[ a fs a] | %12

\staff "1" \stemDown g''4) s2. \\
\staff "1" s4 \stemDown bf''4( a8[ g f! ef\p] \\
\staff "2" s1 \\
\staff "2" <bf, d g>1) | %13

\staff "1" r4 \stemDown <fs fs'>4(\< <g g'> <a a'>\! \\
\staff "1" d'1) \\
\staff "2" <e, d'>1( \\
\staff "2" \stemDown bf2. a4 | %14

\staff "1" \stemDown <bf' cs bf'>4 c'!8\>[ bf] cs,2\! \\
\staff "1" \stemUp s2 a''4 g \\
\staff "2" \stemDown <ef, cs'>1 \\
\staff "2" \stemDown g2 \stemUp fs4 g | %15

\staff "1" \stemUp fs'4) r4 \stemDown <e g bf cs>2(\sf\> \\
\staff "1" \stemDown d'4 s2. \\
\staff "2" \stemUp <a d>4) s4 <g bf>2( \\
\staff "2" \stemDown d,4 r r d8[ d] | %16

\staff "1" \stemDown <fs' a d>4)-.\! bf,\rest <cs cs'>2(\sf\> \\
\staff "2" \stemUp <fs, a d>4)-. s4 <g bf>2( \\
\staff "2" \stemDown d,4 r r d8[ d] | %17

\staff "1" \ottava #0 \stemDown <fs' a d>4)-.\! bf,\rest <cs cs'>2(\sf\> \\
\staff "2" \stemUp <fs, a d>4)-. s4 <g bf>2( \\
\staff "2" \stemDown d,4 r r d8[ d] | %18

\staff "1" \stemDown <d' d'>4)-.\! <cs cs'>( <d d'>)-. <cs cs'>( \\
\staff "2" \stemUp <fs, a d>4) <g bf>( <fs a d>) <g bf>( \\
\staff "2" \stemDown d,4 d d d | %19

\staff "1" \partial 2 \stemDown <d' d'>2) \\
\staff "2" \stemUp <fs, a d>2) \\
\staff "2" \stemDown d,2 | %20
```
<!-- lilylet-end -->

🎧 [Spotify：莫扎特，第 40 交响曲，K. 550，第一乐章](https://open.spotify.com/track/04zau0E0VspgiqNvTqCO7u)

这个著名的例子以一个一小节的[前置段](#prefix)开始，其后是一个[复合乐句](compoundSentence.md)。复合乐句在第 16 小节以半终止结束。（注意它之前的[增六和弦](alteredSubdominants.md)。）随后的几个小节*停留在属和声上*（stand on the dominant），通过强调属和声来延长这个终止式，同时在旋律上对音级 5̂ 加以装饰。
