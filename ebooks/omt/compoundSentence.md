# 复合乐句

复合乐句（compound sentence，或称 16 小节句子式）把普通[乐句（句子式）](sentence.md)的呈示乐句和展开乐句都扩展到各八小节的长度。

在扩展后的呈示中，每个 2 小节的基本动机都被一个 4 小节的[复合基本动机](hybridThemes.md#the-compound-basic-idea)所取代。

一个"典型的"展开大约包含四小节的展开功能，接着是四小节的终止功能，但在复合乐句中，这一点变化很大。展开部分常常被缩短或[扩展](internalExpansions.md)。

![复合乐句结构示意图](assets/ClassicalThemes/16sentence.svg)

下面这个主部主题中构成展开的八个小节，由两个复合基本动机构成：第一个从主和弦开始并进行到属和弦（第 1–4 小节），第二个从属和声开始并回到主和弦（第 5–8 小节）。

> 译注：按上下文，第 1–8 小节应是该主题的呈示部分，原文此处写作 continuation（展开），疑为笔误；译文照原文译出。

起初，展开似乎在仅仅 4 小节之后、在第 12 小节就要结束了。但单簧管在第 12 小节的强拍上缺席，转而开始了一个通向[四小节重复](internalExpansions.md#phrase-expansion)的连接。在这次重复中（第 13–16 小节），第 9–12 小节的单簧管旋律由钢琴演奏，钢琴在第 16 小节的强拍上以一个 PAC 清晰地完成终止。

![复合乐句：莫扎特（Mozart），为单簧管、中提琴和钢琴而作的降 E 大调三重奏，K. 498，第一乐章，第 1–16 小节](assets/form/k498.png)

复合乐句：莫扎特（Mozart），为单簧管、中提琴和钢琴而作的降 E 大调三重奏，K. 498，第一乐章，第 1–16 小节

<!-- lilylet-begin: assets/form/k498.png -->
```lyl.play
[title "Trio in E-flat major, K. 498 (\"Kegelstatt\"), I, mm. 1-13"]
[composer "Wolfgang Amadeus Mozart"]
[staves "<cl-va> {pr-pl}"]
[instrument-cl "Clarinet"]
[instrument-va "Viola"]
[instrument-pr-pl "Piano"]

\key ef \major \time 6/8 \tempo "Andante" \clef "treble" R2. \\\\
\clef "alto" \stemDown <af ef'>4\f~ ef'16\p[ f64( ef d ef] g8[ ef bf)] \\\\
\staff "1" \clef "treble" \stemUp ef4\f~ ef16\p[ f64( ef d ef] g8[ ef bf)] \\
\staff "2" \clef "bass" \stemUp <ef,, ef'>4. \stemDown g'8\p([ ef bf)] | %1

R2. \\\\
\stemUp g8 r r r4. \\\\
\staff "1" \stemUp g8 r r r r \stemDown bf' \\
\staff "2" \stemUp g,8 r r r4. | %2

R2. \\\\
R2. \\\\
\staff "1" \stemUp bf'8([ ef,) ef] \grace f16( ef8)-.[ d-. ef-.] \\
\staff "2" \stemDown <g bf ef>8 r r <g bf ef> r r | %3

R2. \\\\
R2. \\\\
\staff "1" \grace { d16[( ef] } \stemUp f8) r r r4. \\
\staff "2" \stemDown <d, af' bf>8 r r r4. | %4

R2. \\\\
\stemDown f4\f~ f16\p[ g64( f e f] af8[ f d)] \\\\
\staff "1" \stemUp f4\f~ f16\p[ g64( f e f] af8[ f d)] \\
\staff "2" \stemUp <f,, f'>4. \stemDown af'8\p([ f d)] | %5

R2. \\\\
\stemUp bf8 r r r4. \\\\
\staff "1" \stemUp bf8 r r r r \stemDown bf' \\
\staff "2" \stemUp bf,,8 r r r4. | %6

R2. \\\\
R2. \\\\
\staff "1" \stemUp bf'8([ f) f] \grace g16( f8)-.[ ef!-.( f)-.] \\
\staff "2" \stemDown <d, af' bf>8 r r <bf d af' bf> r r | %7

R2. \\\\
R2. \\\\
\staff "1" \grace { ef16[( f] } \stemUp g8) r r r4. \\
\staff "2" \stemDown <ef, g bf>8 r r r4. | %8

\stemDown ef'4\p~ ef16[ f64( ef d ef] g8[ ef bf)] \\\\
R2. \\\\
\staff "1" s2. \\
\staff "2" \clef "bass" \stemUp r16 ef,[( g bf ef bf)] r g[( bf ef g ef)] \\
\staff "2" \stemDown g,8 r r ef r r | %9

\stemDown c'4~ c16[ d64( c b c] ef8[ c af)] \\\\
R2. \\\\
\staff "1" s2. \\
\staff "2" \stemUp r16 f,[( af c ef c)] r af[( c ef f ef)] \\
\staff "2" \stemDown af,8 r r f r r | %10

\stemUp g'4~ g16[ af64( g f g] bf8[ af f)] \\\\
R2. \\\\
\staff "1" \clef "treble" s2. \\
\staff "2" \stemUp r16 ef,[( g bf ef c)] r f,[( af bf d bf)] \\
\staff "2" \stemDown bf,8 r r bf, r r | %11

r16 \stemUp ef[( f gf g! af] \stemDown a![ bf b! c df d!)] \\\\
r4. r \\\\
\staff "1" r4. r \\
\staff "2" \stemUp <g ef'>8 r r r4. \\
\staff "2" \stemDown c,8 s s s4. | %12

\stemDown ef'2.(\p \\\\
r16 \stemUp ef,(\p[ g bf ef bf)] r \stemDown g([ bf ef g ef)] \\\\
\staff "1" \stemDown ef'4~ ef16[ f64( ef d ef] g8[ ef b!)] \\
\staff "2" \stemUp <g, g'>8 r r <ef ef'> r r | %13
```
<!-- lilylet-end -->

🎧 [Spotify：莫扎特，降 E 大调三重奏，K. 498，第一乐章](https://open.spotify.com/track/2i04xcBOAjx413oclWSzxx)

<!--注意，在判断一个主题是普通句子式还是复合乐句时，*小节长度并不是关键问题*。有时一个普通句子式以快速的二拍子记写，占据 16 小节。另一些时候，一个复合主题被设定在非常慢的速度上，只占 8 小节（就像上面莫扎特 K. 332 中的复乐段那样）。普通句子式与复合乐句的关键区别在于：普通句子式以两个基本动机开始，而复合乐句以两个*复合基本动机*开始。即便是这一区分，有时也会显得过于吹毛求疵，尽管在另一些时候它会相当明显。请根据你认为最突出的音乐特征，作出你最好的判断。-->
