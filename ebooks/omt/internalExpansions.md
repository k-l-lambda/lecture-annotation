# 内部扩展

出于许多不同的原因，大量写于 18 世纪晚期和 19 世纪的音乐，在许多不同层级的[超节拍](http://courses.music.indiana.edu/rhythm/illustrations/hypermeter.html)（hypermeter）上表现出二拍子结构的节拍模式。这种倾向在 19 世纪如此明显，以至于威廉·罗思坦（William Rothstein）在 [*Phrase Rhythm in Tonal Music*](https://openlibrary.org/works/OL4649619W/Phrase_rhythm_in_tonal_music)（《调性音乐中的乐句节奏》）中，令人难忘地把它称为"19 世纪的大节奏问题"（the Great Nineteenth-Century Rhythm Problem）。罗思坦说，这是一种"危险"，

> 它在 19 世纪音乐中普遍存在：超节拍模式过于单调地保持二拍子，乐句结构过于一贯、缺乏变化——简言之，就是过于自满地屈从于"四小节乐句的暴政"的危险。

古典传统中的音乐往往不那么受制于两小节和四小节的单元。虽然这一话题一直是大量音乐理论探索的对象，但在这里我们将集中讨论一种简单而常见的*次乐句扩展*（sub-phrase expansion）与*乐句扩展*（phrase expansion）。

## 次乐句扩展 {#sub-phrase-expansion}

当一个两小节的基本动机或对比动机被扩展时，这种扩展常常是通过基本动机内部的动机重复来实现的：一个动机或其他小的旋律音型被重复（或原样重复，或加以简单装饰），使得次乐句的总长度超过预期。

![次乐句扩展：莫扎特（Mozart），回旋曲，K. 494，第 1–12 小节](assets/form/k494.png)

次乐句扩展：莫扎特（Mozart），回旋曲，K. 494，第 1–12 小节

<!-- lilylet-begin: assets/form/k494.png -->
```lyl.play
[composer "Wolfgang Amadeus Mozart"]
[staves "{-}"]

\staff "1" \key f \major \time 2/2 \tempo "Allegretto" \clef "treble" \ottava #0 \stemDown f'2\p a \\
\staff "2" \clef "treble" \ottava #0 \stemUp a'4( \stemDown c \stemUp f, \stemDown c') | %1

\staff "1" \stemDown a''8([ g) g( e)] f4.( a8) \\
\staff "2" \stemDown bf'4( c \stemUp a \stemDown c) | %2

\staff "1" \stemDown a''8([ g) g( e)] f4.( a8) \\
\staff "2" \stemDown bf'4( c \stemUp a \stemDown c) | %3

\staff "1" \stemDown c''8([ bf) bf( g)] bf([ a) a( f)] \\
\staff "2" c'1 \\
\staff "2" \stemDown g'4 e f a | %4

\staff "1" \stemDown d'4. e8 f4 g4 \\
\staff "2" \stemDown bf'4 \stemUp bf, d f~ \\
\staff "2" s2. \stemDown b4 | %5

\staff "1" \stemDown c'2(~ c8[ cs d e)] \\
\staff "2" \stemUp f4 e8[ d] e4 bf'\rest \\
\staff "2" \stemDown c2. s4 | %6

\staff "1" \ottava #0 \stemDown f'2 a \\
\staff "2" \ottava #0 \stemUp a'4( \stemDown c \stemUp f, \stemDown c' | %7

\staff "1" \stemDown a''8([ g) g( e)] f4.( a8) \\
\staff "2" \stemDown bf'4 c \stemUp a \stemDown c | %8

\staff "1" \stemDown a''8([ g) g( e)] f4.( a8) \\
\staff "2" \stemDown bf'4 c \stemUp a \stemDown c) | %9

\staff "1" \stemDown c''8([ bf) bf( g)] bf([ a) a( f)] \\
\staff "2" c'1 \\
\staff "2" \stemDown g'4 e f d | %10

\staff "1" \stemDown d'4.( g8) f4-. e-. \\
\staff "2" d'4\rest \stemUp bf a g \\
\staff "2" \stemDown bf2 c | %11

\staff "1" \stemDown <bf' e>2(( <a f'>4)) bf\rest \\
\staff "2" \stemUp f4 c f, bf'\rest | %12
```
<!-- lilylet-end -->
	
🎧 [Spotify：莫扎特，F 大调回旋曲，K. 494](https://open.spotify.com/track/78LK9tbF0jwOd4PYtk42WD)
	
莫扎特的 F 大调回旋曲以一个[乐段](period.md)开始。第 6 小节的半终止之后，是一个在第 12 小节以 PAC 结束的后乐句。这个主题之所以格外长，部分原因在于起始基本动机的*扩展*：在第 3 小节，钢琴重复了第 2 小节。我们可以设想对这个段落作一个简单的改写，省去第 3 小节，从而使这个次乐句恢复为正常的 2 小节长度。

*对比动机*也是三小节长。但在这种情况下，较长的长度是否源于*扩展*就*不那么清楚*了。这里*没有重复*，而且很难设想一个两小节的*对比动机*改写版本，能够不破坏其旋律或和声结构的某些方面。

换言之，[*不规则的长度*](#non-standard-lengths)并不总是意味着发生了扩展。

## 乐句扩展 {#phrase-expansion}

乐句也常常通过重复来扩展，最常见于主题的结束部分，作为推迟终止式到达的一种手段。
		
![乐句扩展：贝多芬（Beethoven），钢琴奏鸣曲，Op. 2, No. 3](assets/form/op2no3.png)

乐句扩展：贝多芬（Beethoven），钢琴奏鸣曲，Op. 2, No. 3

<!-- lilylet-begin: assets/form/op2no3.png -->
```lyl.play
[composer "Ludwig van Beethoven"]
[staves "{-}"]

\staff "1" \key c \major \time 4/4 \tempo "Allegro con brio" \clef "treble" \ottava #0 \stemUp <c e>2\p <b d>16([ <c e> <b d> <c e>)] <d f>8-.[ <c e>-.] \\
\staff "2" \clef "bass" \ottava #0 <c, g'>1 | %1

\staff "1" \stemUp <b d>4-. <b g'>-. b'2\rest \\
\staff "2" \stemUp <g, g'>4-. <g g'>-. d'2\rest | %2

\staff "1" \stemUp <d f>2 <cs e>16([ <d f> <cs e> <d f>)] <e g>8-.[ <d f>] \\
\staff "2" <g, b'>1 | %3

\staff "1" \stemUp <c e>4-. <g' c>-. b2\rest \\
\staff "2" \stemDown <c, g'>4-. <c g'>-. d2\rest | %4

\staff "1" \stemDown e2\p f \\
\staff "1" \stemUp c'2 b16([ c b c)] d8-.[ b-.] \\
\staff "2" g1~ \\
\staff "2" g,4\rest \stemDown c d g, | %5

\staff "1" a4\rest \stemDown e' f2 \\
\staff "1" \stemUp g'4 c b16([ c b c)] d8-.[ b-.] \\
\staff "2" \stemUp g4 g2.~ \\
\staff "2" g,4\rest \stemDown c d g, | %6

\staff "1" s4 \stemDown c' <c, d>2 \\
\staff "1" \stemUp g'4( s d a') \\
\staff "2" \stemUp g2 a \\
\staff "2" \stemDown e,4 c f d | %7

\staff "1" \stemUp d4( g e) r \\
\staff "1" \stemDown b2 c4 s \\
\staff "2" \stemDown g4 g, \tuplet 3/2 { c8([ g' fs)] } \tuplet 3/2 { f!-.[ e-. d-.] } | %8

\staff "1" b'4\rest \stemDown e,\sf d d \\
\staff "1" s4 \stemUp g'2( f4) \\
\staff "2" \stemDown c,2\sf b16([ c b c)] d8-.[ b-.] | %9

\staff "1" \stemDown c4 e\sf d d \\
\staff "1" \stemUp e4 g2( f4) \\
\staff "2" \stemDown g,4 c\sf b16([ c b c)] d8-.[ b-.] | %10

\staff "1" \stemUp <c e>4 r <c e a> r \\
\staff "2" \stemUp g4 s a s \\
\staff "2" \stemDown g,4 c2\sf fs,4~ | %11

\staff "1" \stemUp <c e g>4 r s r \\
\staff "2" \stemUp g4 s <d f! g b> s \\
\staff "2" \stemDown fs,,4 g2\sf \stemUp <g, g'>4 | %12

\staff "1" \stemUp c16\ff s16 s8 s2. \\
\staff "2" \stemUp <c,, e g c>4 s2. \bar "|" | %13
```
<!-- lilylet-end -->
	
🎧 [Spotify：贝多芬，钢琴奏鸣曲，Op. 2, No. 3](https://open.spotify.com/track/5wi0p2gHWFYSwnjgHSYEP3)
	
主部主题的前八小节构成一个简单的句子式。但在第 8 小节本应出现 PAC 的时刻，旋律落在音级 3̂ 上，形成一个 IAC。与此同时，低音奏出一个下行的连接，进入展开部分的重复，并导向第 13 小节的 PAC。因此，这个乐句扩展为基本乐句增加了五个小节的长度。

---

在上面的例子中，第 8 小节的终止式之所以引出一个扩展，是因为它比预期的要弱。（[第一主题](sonataThematicModules.md)很少以 IAC 结束。）这是乐句扩展最常见的音乐动因之一。除了 IAC 之外，阻碍终止也可以导致乐句扩展；而且，预期的终止式根本没有出现的情况也并不少见——这种情况通常称为"规避终止"（evaded cadence）。

![乐句扩展：莫扎特（Mozart），C 大调钢琴奏鸣曲，K. 309，第三乐章](assets/form/k309.png)

乐句扩展：莫扎特（Mozart），C 大调钢琴奏鸣曲，K. 309，第三乐章

<!-- lilylet-begin: assets/form/k309.png -->
```lyl.play
[composer "Wolfgang Amadeus Mozart"]
[staves "{-}"]

\staff "1" \key c \major \time 2/4 \partial 8 \tempo "Allegretto grazioso" \clef "treble" \ottava #0 \stemDown g''8 \\
\staff "2" \clef "bass" \ottava #0 d,8\rest | %1

\staff "1" \grace f'16( \stemDown e8)[ d16 c] c8[ c] \\
\staff "2" \clef "treble" \stemUp c16\p[ e g e] c[ e g e] | %2

\staff "1" \stemDown c'4. c'8 \\
\staff "2" \stemUp c16[ e g e] c[ e g e] | %3

\staff "1" \grace b''16( \stemDown a8)[ g16 f] f8[ f] \\
\staff "2" \stemUp c16[ f a f] c[ f a f] | %4

\staff "1" \stemDown f'4. a8 \\
\staff "2" \stemUp c16[ f a f] c[ f a f] | %5

\staff "1" \grace a''16( \stemDown g8)[ f16 e] e8([ g)] \\
\staff "2" \stemUp c16[ e g e] c[ e g e] | %6

\staff "1" \grace g''16( \stemDown f8)[ e16 d] d8[ f] \\
\staff "2" \stemUp b16[ d g d] b[ d g d] | %7

\staff "1" \ottava #0 \grace f'16( \stemDown e8)[ d16 c-.] b8[ c-.] \\
\staff "2" \ottava #0 \stemUp c8 <e g>[ <d f> <c e>] | %8

\staff "1" \stemDown e'4( d8)[ g-.] \\
\staff "2" \stemUp <g c>4~ <g b>8 b'\rest | %9

\staff "1" \grace f'16( \stemDown e8)[ d16 c] c8[ c] \\
\staff "2" \stemUp c16[ e g e] c[ e g e] | %10

\staff "1" \grace { b'16[( c d] } \stemDown c4.) c'8 \\
\staff "2" \stemUp c16[ e g e] c[ e g e] | %11

\staff "1" \grace b''16( \stemDown a8)[ g16 f] f8[ f] \\
\staff "2" \stemUp c16[ f a f] c[ f a f] | %12

\staff "1" \grace { e'16[( f g] } \stemDown f4.) a8 \\
\staff "2" \stemUp c16[ f a f] c[ f a f] | %13

\staff "1" \grace a''16( \stemDown g8)[ f16 e] e8([ g)] \\
\staff "2" \stemUp c16[ e g e] cs[ e a e] | %14

\staff "1" \ottava #0 \grace g''16( \stemDown f8)[ e16 d] d8[ f] \\
\staff "2" \ottava #0 \stemUp d16[ f a f] b,[ d g d] | %15

\staff "1" \grace f'16( \stemDown e8)[ f16 d] c8[ b\trill] \\
\staff "2" \stemUp <c g'>8 \clef "bass" d[ e d] \\
\staff "2" s8 \stemDown f, g4 | %16

\staff "1" \grace a''16( \stemDown g8)[ f16 e] e'[ cs a g] \\
\staff "2" \clef "treble" \stemUp c16[ e g e] cs[ e a e] | %17

\staff "1" \grace g''16( \stemDown f8)[ e16 d] d'[ b g f] \\
\staff "2" \stemUp d16[ f a f] b,[ d g d] | %18

\staff "1" \grace f'16( \stemDown e8)[ a16 f] e[ g f d] \\
\staff "2" \stemUp <c g'>8 \clef "bass" d[ e d] \\
\staff "2" s8 \stemDown f, g4 | %19

\staff "1" \partial 8 \stemDown c'8 \\
\staff "2" \stemDown c8 | %20
```
<!-- lilylet-end -->

🎧 [Spotify：莫扎特，C 大调钢琴奏鸣曲，K. 309，第三乐章](https://open.spotify.com/track/7DsGTbl7EABrY5GK6Dza9P)

这首奏鸣曲的第一主题是一个由两个句子式构成的[复乐段](compoundPeriod.md#a-compound-period-comprised-of-two-sentences)。在第 8 小节的半终止之后，人们预期*大后乐句*会在第 16 小节以 PAC 结束。但 PAC 始终没有出现：第 15 小节的导音没有得到解决，钢琴家的右手反而向上跳到了 A5。换言之，这个终止式被*规避*了。接下来的四个小节（第 16–19 小节）是对第 13–15 小节的变化重复，"再来一次"（one more time），最终在第 19 小节达到 PAC。

## 非标准长度 {#non-standard-lengths}
我们常常在次乐句或乐句的规模有所增大的地方发现扩展。例如，上面描述的乐句扩展形成了一个 11 小节的展开。但不规则的乐句长度并不一定意味着存在乐句扩展。

例如，请把下面这个选自莫扎特 C 大调弦乐五重奏 K. 515 的段落的前 30 秒听上几遍。它的主部主题是一个[复合乐句](compoundSentence.md)。这个主题的[呈示](themeFunctions.md#presentation)有三个基本动机（分别在 0:00、0:09 和 0:16），每一个都构造成一个[复合基本动机](hybridThemes.md#the-compound-basic-idea)，包含一个基本动机及其后的一个对比动机：

🎧 [Spotify：莫扎特，C 大调弦乐五重奏，K. 515，第一乐章](https://open.spotify.com/track/0Mkcj2eA2EMqMGfzwCnd0u)
   
我们在这个段落中听到，这些复合基本动机长五小节，其中每个基本动机本身就持续三小节！但这里*并没有发生乐句扩展*。基本动机只是比正常的长，也许因此而感觉稍微松散一些。拿不准时，核心问题在于：一个段落能否被改写、"二拍子化"，*而不*破坏其旋律、和声与动机结构。如果可以，那就有理由认为其中存在*扩展*。
