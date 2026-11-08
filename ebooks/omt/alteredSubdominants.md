# 半音变化的下属和弦

最常见的半音变化下属和弦（除了 V 的副属和弦之外）是*那不勒斯和弦*（Neapolitan chord）和各种*增六和弦*（augmented-sixth chords）。

![那不勒斯和弦与各种增六和弦（见下文说明），以通奏低音风格记写在五线谱上，g 小调或 G 大调。](assets/N-AugSixths.png)

<!-- lilylet-begin: assets/N-AugSixths.png -->
```lyl.play
[staves "{-}"]

\staff "1" \omit Score.TimeSignature \key g \minor \clef "treble" <ef af c>2
_\figures { <6->2 } \\
\staff "2" \clef "bass" c,2 \bar "||"
\addlyrics { N. }
\addlyrics { [S4] } | %1

\staff "1" <g' cs>2
_\figures { <6+>2 } \\
\staff "2" ef,2 \bar "||"
\addlyrics { It. }
\addlyrics { [S6] } | %2

\staff "1" <g' a cs>2
_\figures { <6+ 4 3>2 } \\
\staff "2" ef,2 \bar "||"
\addlyrics { Fr. }
\addlyrics { [S6] } | %3

\staff "1" <g' bf cs>2
_\figures { <6+ 5>2 } \\
\staff "2" ef,2 \bar "||"
\addlyrics { Ger. }
\addlyrics { [S6] } | %4

\staff "1" \key g \major <g' as cs>2
_\figures { <6+ 4+ 3>2 } \\
\staff "2" ef,2 \bar "||"
\addlyrics { Sw. }
\addlyrics { [S6] } | %5
```
<!-- lilylet-end -->

## 那不勒斯和弦

那不勒斯和弦包含降低的 2̂、4̂ 和降低的 6̂：*ra*、*fa* 和 *le*。它是一个大三和弦，通常以 *fa* 为低音出现（第一转位），在四声部织体中这个音也被重复。

在罗马数字分析中，用 **N.**（或 **N.<sup>6</sup>**）代替罗马数字（也就是说，在古典音乐中它不标作降 II 和弦）。作为一个半音变化的下属和弦，它总是表达下属功能（**S**）。

在功能低音分析中，**N.** 写在功能标记 **[S4]** 的下方。

舒伯特（Schubert）声乐套曲《美丽的磨坊女》（*Die schöne Müllerin*）中的《磨坊工与小溪》（"Der Müller und der Bach"，第 19 首）里出现了几个显著的那不勒斯和弦。在下面的乐谱中（该曲第 7–10 小节），主三和弦（g 小调）之后接一个那不勒斯和弦，然后是属七和弦，再回到主和弦：T – S – D – T。

![舒伯特《磨坊工与小溪》第 7–10 小节中的那不勒斯和弦。](assets/DMUDB.png)

<!-- lilylet-begin: assets/DMUDB.png -->
```lyl.play
[composer "Franz Schubert"]
[staves "<voice> {pr-pl}"]
[instrument-voice "Voice"]
[instrument-pr-pl "Piano"]

\staff "1" \key bf \major \time 3/8 \clef "treble" \stemDown d'4 c16 bf
\addlyrics { wel -- ken die } \\\\
\staff "1" \clef "treble" bf'8\rest \stemUp <bf, g'>4 \\
\staff "2" \clef "bass" \stemUp <g, d'>4. | %1

\staff "1" \stemDown af'16[ ef'] \stemUp af,8. g16
\addlyrics { Li -- _ lien auf } \\\\
\staff "1" bf'8\rest \stemUp <af, ef' af>4 \\
\staff "2" \stemUp <c,, c'>4. | %2

\staff "1" fs16[ a! d c] bf[ a]
\addlyrics { je -- _ _ _ dem _ } \\\\
\staff "1" bf'8\rest \stemUp <a, fs'>4 \\
\staff "2" \stemUp <d,, d'>4. | %3

\staff "1" g'4 b8\rest
\addlyrics { Beet; } \\\\
\staff "1" bf'8\rest \stemUp <bf, g'>4 \\
\staff "2" \stemUp <g, d'>4. \bar "|." | %4
```
<!-- lilylet-end -->

🎧 [Spotify：舒伯特《磨坊工与小溪》](https://open.spotify.com/track/4vKJZfXIU7c3qPKMegSDBW)

## 增六和弦

增六和弦之所以得名，是因为 *le* 与 *fi* 之间构成增六度，这两个音级存在于每一个增六和弦中。和弦中的其他音决定了它是哪一种增六和弦。

### 意大利增六和弦

*意大利增六和弦*（Italian augmented-sixth chord）是最简单的增六和弦，只有三个音：*le*、*do* 和 *fi*。*Le* 通常是低音，在四声部织体中，通常重复的音是 *do*。（请记住，在六和弦中不重复低音，也不重复像 *fi* 这样的半音变化音。因此，在严格风格中，*do* 是唯一可以重复的音，而这种重复方式通常也延续到较自由的风格中。）

在罗马数字分析中，用 **It.** 代替罗马数字。数字低音是一个简单的带斜杠的“6”。它表达下属功能（**S**）。

当 *le* 位于低音时，功能低音标记为 **[S6]**。在这个功能低音符号下方，我们还把该和弦标为 **It.**。

下面的例子选自贝多芬（Beethoven）《小品》（Bagatelle）Op. 119 No. 1 第 1–4 小节。在第 3 小节，意大利增六和弦落在第 3 拍，紧接在属和弦之前。

![贝多芬 Op. 119 No. 1 第 1–4 小节中的意大利增六和弦。](assets/Op119-1.png)

<!-- lilylet-begin: assets/Op119-1.png -->
```lyl.play
[composer "Ludwig van Beethoven"]
[staves "{-}"]

\staff "1" \key bf \major \time 3/4 \partial 4 \clef "treble" \ottava #0 \stemDown d'8.(\p[ ef16)] \\
\staff "2" \clef "bass" \ottava #0 ef,4\rest | %1

\staff "1" \stemDown d'4-. c-. bf-. \\
\staff "2" \stemDown <bf ef>4-. <a d>-. <g d'>-. | %2

\staff "1" \stemUp a'4 c\rest a8.[ c16] \\
\staff "2" \stemDown <fs, d'>4 ef\rest ef\rest | %3

\staff "1" \stemUp bf'4 a g \\
\staff "2" \stemDown <g d'>4 <f! d'> <ef cs'> | %4

\staff "1" \partial 2 \stemUp fs4 r4 \\
\staff "2" \stemDown <d, d'>4 r4 | %5
```
<!-- lilylet-end -->

🎧 [Spotify：贝多芬《小品》Op. 119 No. 1](https://open.spotify.com/track/79GyMHrNnQuFaov2JL7Tih)

### 法国增六和弦

*法国增六和弦*（French augmented-sixth chord）有四个音：*le*、*do*、*re* 和 *fi*。与意大利增六和弦一样，*le* 通常是低音。

在罗马数字分析中，用 **Fr.** 代替罗马数字。数字低音是带斜杠的“6”加上“4”和“3”。它表达下属功能（**S**）。

当 *le* 位于低音时，功能低音标记为 **[S6]**。在这个功能低音符号下方，我们还把该和弦标为 **Fr.**。

下面的例子选自莫扎特（Mozart）弦乐四重奏《不协和音》（"Dissonance"）K. 465 第四乐章第 10–16 小节。法国增六和弦出现在第 14 小节第 2 拍。在这一段中，一个较“温和”的下属和弦（**IV<sup>6</sup>**）进行到更为紧张的法国增六和弦，后者再进行到终止四六和弦，然后是最后的 **V–I**。

![莫扎特弦乐四重奏 K. 465 第四乐章第 10–16 小节中的法国增六和弦。](assets/K465-iv.png)

<!-- lilylet-begin: assets/K465-iv.png -->
```lyl.play
[composer "Wolfgang Amadeus Mozart"]
[staves "<v1-v2-va-vc>"]
[instrument-v1 "Violin I" "Vn. I"]
[instrument-v2 "Violin II" "Vn. II"]
[instrument-va "Viola" "Va."]
[instrument-vc "Violoncello" "Vc."]

\key c \major \time 2/4 \clef "treble" \ottava #0 \stemDown c''4.( f,8) \\\\
\clef "treble" \ottava #0 \stemUp f16([ d f d] f8) b\rest \\\\
\clef "alto" \ottava #0 \stemDown d16([ b d b] d8) c\rest \\\\
\clef "bass" \ottava #0 \stemDown g8[ g] g d\rest | %1

\stemDown e'8([ c a d)] \\\\
b'8\rest \stemUp g([ c, a')] \\\\
R2 \\\\
\stemDown c8[ e,( f fs)] | %2

\stemDown c'8([ b)] c-.[ c-.] \\\\
\stemUp e8([ d)] c-.[ c-.] \\\\
c4\rest \stemUp g8-.[ g-.] \\\\
\stemDown g8([ f)] e-.[ e-.] | %3

\stemDown d'8-.[ d-. e-. e-.] \\\\
\stemUp c8-.[ c-. c-. c-.] \\\\
\stemUp a8-.[ a-. bf-. bf-.] \\\\
\stemDown f,8-.[ f-. g-. g-.] | %4

\stemDown f'8-.[ f-. fs-. fs-.] \\\\
\stemDown c'8-.[ c-. c-. c-.] \\\\
\stemDown c8-.[ c-. d-. d-.] \\\\
\stemDown a8-.[ a-. af-. af-.] | %5

\stemDown g''8([ e)] \grace g16 f!8[ e16 d] \\\\
\stemDown c'4 \grace e16 d8[ c16 b] \\\\
\stemDown e8([ c)] g'[ g] \\\\
\stemDown g8[ g g g] | %6

\partial 8 \stemDown c'8 \bar "" \\\\
\stemDown c'8 \\\\
\stemDown e8 \\\\
\stemUp c,8 | %7
```
<!-- lilylet-end -->

🎧 [Spotify：莫扎特弦乐四重奏《不协和音》K. 465 第四乐章](https://open.spotify.com/track/36zKxZUavyuStSq0R4T4IH)

### 德国增六和弦

*德国增六和弦*（German augmented-sixth chord）有四个音：*le*、*do*、*me* 和 *fi*。与其他增六和弦一样，*le* 通常是低音。

在罗马数字分析中，用 **Ger.** 代替罗马数字。数字低音是带斜杠的“6”加上“5”。它表达下属功能（**S**）。

当 *le* 位于低音时，功能低音标记为 **[S6]**。在这个功能低音符号下方，我们还把该和弦标为 **Ger.**。

德国增六和弦几乎总是用在小调中，并且后接终止四六和弦，*me* 和 *do* 保持到终止四六和弦中。

在贝多芬 E 大调钢琴奏鸣曲 Op. 109 第三乐章中，一个德国增六和弦出现在第 7 小节的最后一拍，并延续到第 8 小节，然后在第 8 小节末的半终止中释放紧张。

![贝多芬钢琴奏鸣曲 Op. 109 第三乐章第 1–8 小节中的德国增六和弦。](assets/Op109-iii.png)

<!-- lilylet-begin: assets/Op109-iii.png -->
```lyl.play
[composer "Ludwig van Beethoven"]
[staves "{-}"]

\staff "1" \key e \major \time 3/4 \tempo "Andante molto cantabile ed espressivo" \clef "treble" \ottava #0 ^\markup "mezza voce" \stemUp gs'4( e4. fs8) \\
\staff "1" \ottava #0 \stemDown b4 b cs \\
\staff "2" \clef "bass" \ottava #0 \stemUp e,,4( gs a | %1

\staff "1" \stemUp <fs, ds'>4 <fs a b>2 \\
\staff "2" \stemUp b,4 cs ds) | %2

\staff "1" \stemUp <gs b gs'>4( e'4. fs8) \\
\staff "1" s4 \stemDown b cs \\
\staff "2" \stemDown e,4( gs as | %3

\staff "1" \stemUp fs4( a b) \\
\staff "1" \stemDown ds4\< <cs e> <ds fs>\! \\
\staff "2" \stemDown b4 fs \stemUp b,8[ a!)] | %4

\staff "1" \grace { b16[( e gs] } \stemUp b4 e,4. gs16[ fs)] \\
\staff "1" b4\rest \stemDown b\> cs\! \\
\staff "2" \stemDown gs,2( s4 \\
\staff "2" \stemUp gs,4( gs') a, | %5

\staff "1" \stemUp ds4( b \grace { a!16[ b a gs] } a4) \\
\staff "2" \stemDown <b, fs'>4 <cs e> <ds fs>) | %6

\staff "1" \markup "crescendo" \stemUp gs4( e'4. as,8) \clef "bass" \\
\staff "2" s4 \stemDown <cs,, cs'> <c c'> \\
\staff "2" \stemDown e,4 \stemUp e2 | %7

\staff "1" \stemUp as2( b4) \\
\staff "1" \stemDown g!4(\p e ds) \\
\staff "2" \stemDown c,,2 b4 \\
\staff "2" \stemUp e,,4( g! b) \bar ":|." | %8
```
<!-- lilylet-end -->

🎧 [Spotify：贝多芬 E 大调钢琴奏鸣曲 Op. 109 第三乐章](https://open.spotify.com/track/00Vxoqv6oGhrcmugk7TAXB)

### 瑞士增六和弦

*瑞士增六和弦*（Swiss augmented-sixth chord）有四个音：*le*、*do*、*ri* 和 *fi*。这个和弦之所以叫“瑞士”，是因为它听起来像德国增六和弦，拼写却像法国增六和弦。（用 *ri* 代替 *me*）（瑞士通行德语、法语、意大利语和罗曼什语等多种语言，其中德语和法语使用最广。）*Le* 通常是低音。

在罗马数字分析中，用 **Sw.** 代替罗马数字。数字低音是带斜杠的“6”加上带斜杠的“4”和“3”。它表达下属功能（**S**）。

当 *le* 位于低音时，功能低音标记为 **[S6]**。在这个功能低音符号下方，我们还把该和弦标为 **Sw.**。

与德国增六和弦一样，瑞士增六和弦几乎总是后接终止四六和弦。不过，瑞士增六和弦往往出现在大调中，*ri* 进行到 *mi*，*do* 保持到终止四六和弦中。

## 选集示例

[When-in-Rome 语料库](https://github.com/MarkGotham/When-in-Rome)提供了来自 OpenScore 艺术歌曲语料库（OpenScore Lieder Corpus）的那不勒斯和弦与增六和弦示例。

### 那不勒斯六和弦

| 资源 | 示例数 | 说明 |
|----------|----------|-------------|
| [索引（CSV）](assets/harmony/anthology/Neapolitan_Sixths/index.csv) | 73 | bII 与 bII6 和弦示例 |

### 增六和弦

| 资源 | 示例数 | 说明 |
|----------|----------|-------------|
| [索引（CSV）](assets/harmony/anthology/Augmented_Sixths/index.csv) | 184 | 意大利、法国、德国 +6 示例 |

| [乐谱文件](https://github.com/openmusictheory/openmusictheory.github.io/tree/master/Graphics/harmony/anthology/scores) | 供记谱软件使用的 MusicXML 文件 |

来源：[MarkGotham/When-in-Rome](https://github.com/MarkGotham/When-in-Rome)（CC BY-SA 4.0）
