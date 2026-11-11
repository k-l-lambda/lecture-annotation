---
title: "调式图式"
slug: "modal-schemas"
source: "https://viva.pressbooks.pub/openmusictheory/chapter/modal-schemas/"
authors: ["Megan Lavengood"]
license: "CC BY-SA 4.0"
modified: "2025-07-15"
---

# 调式图式

> **要点**
>
> - 许多流行歌曲使用的和声进行暗示大调 / 小调之外的调式。
> - 某首歌曲不必整首都严格处于某一调式之内，也可以使用调式图式。
> - 可以把各调式与大调、自然小调相比较，以理解它们的音响由什么决定（即它们的色彩音）。
> - 混合利底亚图式：
> 	- [**双变格**](09-blues-based-schemas.md#plagal-schemas) ♭VII–IV–I
> 	- **下主音交替** I–♭VII
> - 爱奥利亚图式：
> 	- **下主音交替** i–♭VII（与混合利底亚相同，但主和弦为小三和弦）
> 	- **爱奥利亚交替** i–♭VII–♭VI–♭VII
> 	- **爱奥利亚终止** ♭VI–♭VII–i（或 I）
> 	- [**哀悼**](11-classical-schemas.md#lament) i–♭VII–♭VI–v
> - 多利亚图式：
> 	- **多利亚交替** i–IV
> - 利底亚图式：
> 	- **利底亚交替** I–II♯
> 	- **利底亚终止** II♯–IV–I
>
>  *本书从许多不同角度讨论调式。关于调式的更多内容，可参阅[自然音调式导论（基础篇）](../01-fundamentals/15-intro-to-diatonic-modes-and-the-chromatic-scale.md)、[和弦—音阶理论（爵士篇）](../06-jazz/07-chord-scale-theory.md)、[自然音调式（20/21 世纪技法）](../08-20th-and-21st-century-techniques/08-diatonic-modes.md)和[用调式、音阶和音集进行分析（20/21 世纪技法）](../08-20th-and-21st-century-techniques/10-analyzing-with-collections-scales-and-modes.md)。*

[章节播放列表](https://open.spotify.com/playlist/18p8IBLUfyqwrKjGFVhVzv?si=rpdNNqcVSdGbMSgFWvw9mg)

“调式”（mode）是一个极其复杂的术语。《格罗夫音乐在线》（*Grove Music Online*，Powers 等，2001）——音乐学界标准的学术百科——中关于调式的条目长达 238 页，由九位作者撰写。这意味着，即使你自认为已经了解调式，在学习流行音乐中调式的用法之前，也许应先暂时抛开那些知识。

本章讨论调式在流行与摇滚音乐某些程式化和弦进行中的面貌。本章大部分内容基于 Nicole Biamonte（2010）和 Philip Tagg（2011）的研究。我们先把调式和声与自然音和声相比较，说明其功能，然后按所借用的调式分组介绍常见的调式图式。

按主音是大三和弦还是小三和弦对调式分组，有助于用耳朵辨认调式段落。谱例 1 即体现了这种分组。上一行是 $\hat3$ 为主音上方大三度（*mi*）的调式：大调、混合利底亚和利底亚。下一行是 $\hat3$ 为主音上方小三度（*me*）的调式：爱奥利亚、多利亚和弗里吉亚。谱例 1 还说明了某些调式与大调或小调的差别所在。每个调式恰好有一个音以较浅的颜色标出，这个音在相对于大调 / 小调发生变化。这些特殊的音称为各调式的色彩音（color note）。[^1] 这些关系用虚线连音线（slur）标出。

🎼 [MuseScore 曲谱](https://musescore.com/user/32728834/scores/5973262)

谱例 1. 按主音的大调性或小调性分组的调式，虚线连音线把每个调式特有的色彩音与其大调 / 小调对应者连接起来。

## 调式和声的功能

你可能已经学过自然音和声中的主功能、下属功能和属功能。调式和声在功能上基本与它们的自然音对应者一致，不过额外的调式变化音使这些功能之间的重叠更多。谱例 2 对此作了总结。

![谱例 2. 调式和声使同一个和弦可以有许多种“风味”，而不改变和弦的功能。](../media/2019/05/modal_harmonic_function.png)*谱例 2. 调式和声使同一个和弦可以有许多种“风味”，而不改变和弦的功能。*

<!-- lilylet-begin: media/2019/05/modal_harmonic_function.png -->
```lyl.play
[staves "d-m"]
[instrument-d "Diatonic harmony"]
[instrument-m "Modal harmony"]

\omit Score.TimeSignature \time 2/1 \clef "treble" <c e g>1 s1
\addlyrics { "C: I" } \\\\
\clef "treble" <c e g>1 <c ef g>
\addlyrics { "C: I" i } | %1

<e g b>1 s1
\addlyrics { iii } \\\\
<e g b>1 <ef g bf>
\addlyrics { iii ♭III } | %2

<a c e>1 s1
\addlyrics { vi } \\\\
<a c e>1 <af c ef> \bar "||"
\addlyrics { vi ♭VI } | %3
```
```lyl.play
[staves "d-m"]
[instrument-d "Diatonic harmony"]
[instrument-m "Modal harmony"]

\omit Score.TimeSignature \time 2/1 \clef "treble" <f a c>1 s1
\addlyrics { "C: IV" } \\\\
\clef "treble" <f a c>1 <f af c>
\addlyrics { "C: IV" iv } | %1

\time 4/1 <d f a>1 s1 s1 s1
\addlyrics { ii } \\\\
<d f a>1 <d f af> <df f af> <d fs a>
\addlyrics { ii ii° ♭II II♯ } | %2

\time 2/1 <a' c e>1 s1
\addlyrics { vi } \\\\
<a' c e>1 <af c ef>
\addlyrics { vi ♭VI } | %3

<b d f>1 s1
\addlyrics { vii° } \\\\
<bf d f>1 <bf df f> \bar "||"
\addlyrics { ♭VII ♭vii } | %4
```
```lyl.play
[staves "d-m"]
[instrument-d "Diatonic harmony"]
[instrument-m "Modal harmony"]

\omit Score.TimeSignature \time 2/1 \clef "treble" <g' b d>1 s1
\addlyrics { "C: V" } \\\\
\clef "treble" <g' b d>1 <g bf d>
\addlyrics { "C: V" v } | %1

\time 3/1 <b' d f>1 s1 s1
\addlyrics { vii° } \\\\
<b' d f>1 <bf d f> <bf df f>
\addlyrics { vii° ♭VII ♭vii } | %2

\time 2/1 <e g b>1 s1
\addlyrics { iii } \\\\
<e g b>1 <ef g bf>
\addlyrics { iii ♭III } | %3

<d f a>1 s1
\addlyrics { ii } \\\\
<d fs a>1 <df f af> \bar "||"
\addlyrics { II♯ ♭II } | %4
```
<!-- lilylet-end -->
这幅和声功能的图示也许能帮助你理解，为什么某些调式进行看起来和自然音进行一样有目标指向。

## 混合利底亚：♭VII

混合利底亚的色彩音是 *te*（$\downarrow\hat{7}$），如谱例 3 所示。在大调式流行歌曲中，♭VII 和弦借自混合利底亚调式。♭VII 通常具有属功能，你可以把它看作双变格图式和混合利底亚终止图式中传统大调式 V 和弦的替代（谱例 4）。

![记谱示意图。](../media/2019/05/mixolydian-1.png)

<!-- lilylet-begin: media/2019/05/mixolydian-1.png -->
```lyl.play
[staves "-"]

\omit Score.TimeSignature \time 8/1 \clef "treble" c1^\markup "C major"^\markup "1̂" d^\markup "2̂" e^\markup "3̂" f^\markup "4̂" g^\markup "5̂" a^\markup "6̂" b^\markup "7̂" c^\markup "1̂" \\\\
\clef "treble" <c e g>1 <d f a> <e g b> <f a c> <g b d> <a c e> <b d f> <c e g> \bar "||"
\addlyrics { I ii iii IV V vi vii° I } | %1

c1^\markup "C mixolydian"^\markup "1̂" d^\markup "2̂" e^\markup "3̂" f^\markup "4̂" g^\markup "5̂" a^\markup "6̂" bf^\markup "↓7̂" c^\markup "1̂" \\\\
<c e g>1 <d f a> <e g bf> <f a c> <g bf d> <a c e> <bf d f> <c e g> \bar "||"
\addlyrics { I ii iii° IV v vi ♭VII I } | %2
```
<!-- lilylet-end -->
谱例 3. $\downarrow\hat{7}$（te）是混合利底亚调式的色彩音。重要的混合利底亚和声都含有这个色彩音：v 和 ♭VII。（iii<sup>o</sup> 不使用。）

🎼 [MuseScore 曲谱](https://musescore.com/user/32728834/scores/8521067)

谱例 4. 双变格图式和混合利底亚终止图式是两个特别常见的混合利底亚和弦进行。

### 双变格 {#double-plagal}

双变格图式 ♭VII–IV–I 在[布鲁斯图式一章](09-blues-based-schemas.md#double-plagal)中还有进一步讨论；由于它使用大三和弦主和弦和 $\downarrow\hat{7}$（*te*），它也是混合利底亚图式。

### 下主音交替

![谱例 5. 奇想乐队（the Kinks）的《Tired of Waiting for You》在前奏和主歌中使用下主音交替。记谱从 0:07 开始。](../media/2019/05/tired_of_waiting.png)*谱例 5. 奇想乐队（the Kinks）的《Tired of Waiting for You》在前奏和主歌中使用下主音交替。记谱从 0:07 开始。*

<!-- lilylet-begin: media/2019/05/tired_of_waiting.png -->
```lyl.play
[composer "The Kinks (Ray Davies)"]
[staves "voice,bass"]
[instrument-voice "Voice"]
[instrument-bass "Bass"]

\key g \major \numericTimeSignature \time 4/4 \clef "treble_8" g'4.^\markup "Melody could be major..." \chords "G" a8~ a4 \chords "F" r4
\addlyrics { So tired, __ _ } \\\\
\key g \major \clef "bass" g,4. g8 f4. f8
\addlyrics { "G: I" _ ♭VII _ } | %1

g'4 \chords "G" a8[ b]~ b[ \chords "F" b] r4
\addlyrics { tired of wai -- _ ting, } \\\\
g,4. g8 f4. f8 | %2

b'4. \chords "G" c8 d \chords "F" d4 e8
\addlyrics { tired of wai -- ting for } \\\\
g,4. g8 f4. f8 | %3

e'4( \chords "G" f8^\markup "...but F♮ here confirms mixolydian"[ e] d4) \chords "F" r4 \bar "||"
\addlyrics { you __ _ _ _ } \\\\
g,4. g8 f4. f8 \bar "||" | %4
```
<!-- lilylet-end -->
混合利底亚中最具特色的和弦进行是下主音交替进行（subtonic shuttle）♭VII–I，在 C 大调中即 B♭–C（见上文谱例 4）。[奇想乐队的《Tired of Waiting for You》](https://open.spotify.com/track/3sFnC76vUu0dtHUM5Z5bLL?si=unEDnpmXTh-ZpwRBESRQQg)（1965）在整个前奏和第一段主歌中连续使用下主音交替：器乐声部自始至终在 I 与 ♭VII 之间往返，而旋律则把 $\downarrow\hat{7}$（*te*）作为装饰音和旋律目标加以强调（谱例 5）。

## 爱奥利亚：♭VII 与 ♭VI

你也许会把爱奥利亚调式等同于[自然小调音阶](https://viva.pressbooks.pub/openmusictheory/chapter/scales-and-scale-degrees-open-music-theory#natural-minor)。但作为一种调或音集，爱奥利亚与小调是不同的，因为爱奥利亚（在流行音乐中的用法）会突出使用 *le* 和 *te* $(\downarrow\hat6, \downarrow\hat7)$。这些色彩音级带来 ♭VI 和 ♭VII 和弦，它们是爱奥利亚调式的标志性和弦。（注意 ♭VI 和 ♭VII 的标记中使用降号，尽管它们在小调 / 爱奥利亚中是自然音——这是为了避免与 vii<sup>o</sup> 混淆。）爱奥利亚图式使用这两个和声中的一个或两个（谱例 6）。♭VI 和弦具有下属功能，♭VII 和弦具有属功能。

🎼 [MuseScore 曲谱](https://musescore.com/user/32728834/scores/8520971)

谱例 6. 下主音交替、爱奥利亚交替、爱奥利亚终止和哀悼图式是四种常见的爱奥利亚和弦进行。

![谱例 7. Gotye 的《Somebody That I Used to Know》在前奏 / 主歌中使用下主音交替，在副歌中使用爱奥利亚交替。前奏记谱从 0:04 开始，副歌记谱从 1:32 开始。](../media/2019/05/somebody_that_I_used_to_know-2.png)*谱例 7. Gotye 的《Somebody That I Used to Know》在前奏 / 主歌中使用下主音交替，在副歌中使用爱奥利亚交替。前奏记谱从 0:04 开始，副歌记谱从 1:32 开始。*

<!-- lilylet-begin: media/2019/05/somebody_that_I_used_to_know-2.png -->
```lyl.play
[composer "Gotye"]
[staves "x-b"]
[instrument-x "Xylophone"]
[instrument-b "Bass"]

\key f \major \numericTimeSignature \time 4/4 \clef "treble" c4 \chords "Dmi" c g' \chords "C" g \\\\
\key f \major \clef "bass" d4._\markup "subtonic shuttle" d8 c4. c8
\addlyrics { "D mi.: i" _ ♭VII _ } | %1

a'8[ \chords "Dmi" bf c a] g4 \chords "C" g \\\\
d4. d8 c4. c8
\addlyrics { i _ ♭VII _ } | %2

f4 \chords "Dmi" f e \chords "C" e \\\\
d4. d8 c4. c8
\addlyrics { i _ ♭VII _ } | %3

d4 \chords "Dmi" d c \chords "C" r \bar "||" \\\\
d4. d8 c4. c8 \bar "||"
\addlyrics { i _ ♭VII _ } | %4
```
```lyl.play
[composer "Gotye"]
[staves "v-b"]
[instrument-v "Voice"]
[instrument-b "Bass"]

\key f \major \numericTimeSignature \time 4/4 \clef "treble" r4 \chords "Dmi" a8[ a] d[ \chords "C" f f d]
\addlyrics { But you did -- n't have to } \\\\
\key f \major \clef "bass" d,4._\markup "aeolian shuttle" d8 c4. c8
\addlyrics { "Dm: i" _ ♭VII _ } | %1

bf'4. \chords "Bb" a8 a2 \chords "C"
\addlyrics { cut me off, } \\\\
bf,4. bf8 c4. c8
\addlyrics { ♭VI _ ♭VII _ } | %2

r4 \chords "Dmi" g'8[ a] g[ \chords "C" g g g]
\addlyrics { make out like it ne -- ver } \\\\
d,4. d8 c4. c8
\addlyrics { i _ ♭VII _ } | %3

c'8[ \chords "Bb" c c c] bf[ \chords "C" a( g) g]
\addlyrics { hap -- pened and that we were _ no -- } \\\\
bf,4. bf8 c4. c8
\addlyrics { ♭VI _ ♭VII _ } | %4

\partial 4. f4. \chords "Dmi" \bar "|."
\addlyrics { thing. } \\\\
\partial 4. d,4. \bar "|." | %5
```
<!-- lilylet-end -->
### 下主音交替

前面介绍下主音交替时，它是作为[混合利底亚](#mixolydian)进行引入的，但同一个进行也可以用于爱奥利亚。区别只在于主和弦的性质：如果是大三和弦，下主音交替就暗示混合利底亚；如果是小三和弦，就暗示爱奥利亚。换言之，♭VII–i，在 c 小调中即 B♭–Cmi，是下主音交替的小调版本。这一下主音交替用于 [Gotye 的《Somebody That I Used to Know》](https://open.spotify.com/track/4wCmqSrbyCgxEXROQE6vtV?si=Iov4ilv6SF-z11GwVjDyIA)（2011，谱例 7）的前奏和主歌。

### 爱奥利亚交替

爱奥利亚中另一种常见的交替进行是 i–♭VII–♭VI–♭VII。这一进行可以理解为 i 与 ♭VI 之间的交替，中途经过一个 ♭VII 和弦。这一进行在 [Gotye 的《Somebody That I Used to Know》](https://open.spotify.com/track/4wCmqSrbyCgxEXROQE6vtV?si=Iov4ilv6SF-z11GwVjDyIA)（2011，谱例 7）的副歌中表现得十分清楚。

![谱例 8. 霍华德·肖（Howard Shore）为《指环王》电影原声所作的“护戒同盟主题”以爱奥利亚终止结束各乐句。记谱从 0:27 开始。](../media/2019/05/lotr.png)*谱例 8. 霍华德·肖（Howard Shore）为《指环王》电影原声所作的“护戒同盟主题”以爱奥利亚终止结束各乐句。记谱从 0:27 开始。*

<!-- lilylet-begin: media/2019/05/lotr.png -->
```lyl.play
[composer "Howard Shore"]
[staves "{-}"]

\staff "1" \time 6/8 \clef "treble" <cs e a>4. \chords "A" <c e g>4 \chords "C" <c e g>16[ <c e g>] \\
\staff "2" \clef "bass" a,4. c
\addlyrics { "Am: I" ♭III } | %1

\staff "1" <cs e a>4.~ \chords "A" <cs e a>4 d'16[ e] \\
\staff "2" a,2.
\addlyrics { I } | %2

\staff "1" <a' c f>4 \chords "F" e'16[ d] <e, g c>4 \chords "C/G" d'16[ e] \\
\staff "2" f,,4. g
\addlyrics { ♭VI ♭III⁶₄ } | %3

\staff "1" <e a d>4. \chords "Asus" <f a c>4^\markup "aeolian cadence" \chords "F" <d g b>8 \chords "G" \\
\staff "2" a,4. f4 g8
\addlyrics { Isus ♭VI ♭VII } | %4

\staff "1" <cs e a>2. \chords "A" \bar "||" \\
\staff "2" a,2. \bar "||"
\addlyrics { I } | %5
```
<!-- lilylet-end -->
### 爱奥利亚终止

在爱奥利亚交替图式中，I 与 ♭VI 之间持续不断的往返使真正的终止难以形成——终止意味着到达了一个目标，而像爱奥利亚交替这样的循环性进行似乎并没有目标。爱奥利亚终止 ♭VI–♭VII–i，在 c 小调中即 A♭–B♭–Cmi，与爱奥利亚交替相似，但具有目标指向：它终止于主和弦，而且通常不被用作循环。爱奥利亚终止经常使用皮卡第三度，此时所有和弦都是大三和弦：♭VI–♭VII–I，在 C 大调中即 A♭–B♭–C。

爱奥利亚终止对许多人来说有丰富的文化联想，通常与胜利和英雄气概联系在一起。这一终止式结束[《指环王》的“护戒同盟主题”](https://open.spotify.com/track/40JHx9UKFZTPKrA9a3ScaG?si=jce6ss3qT_2XV1zKGI9_NQ)的各乐句（谱例 8，从 0:27 开始）。爱奥利亚终止也被称为[马里奥终止](http://gamemusictheory.blogspot.com/2011/04/mario-cadence.html)，因为《超级马里奥兄弟》每一关结束时那段著名的号角经过句用的就是这个进行；在其他电子游戏（如[《最终幻想》](https://open.spotify.com/track/0PLHIAoHiaUq1EpcDvPQ2Q?si=SpKykdm9S5-UDmgaQU3prA)）中，这一进行也常被用作号角经过句。在所有这些例子中，终止都以皮卡第三度结束。

![谱例 9. 伊娃·西蒙斯（Eva Simons）的《I Don't Like You》使用带 ♭VII 和小三和弦 v 的哀悼图式。](../media/2019/05/I-dont-like-you.png)*谱例 9. 伊娃·西蒙斯（Eva Simons）的《I Don't Like You》使用带 ♭VII 和小三和弦 v 的哀悼图式。*

<!-- lilylet-begin: media/2019/05/I-dont-like-you.png -->
```lyl.play
[composer "Eva Simons"]
[staves "{-}"]

\staff "1" \key g \minor \numericTimeSignature \time 4/4 \clef "treble" d4 \chords "Eb" r r8 bf[ \chords "Dmi" bf f'(^\markup "Use of F instead of F♯ creates an aeolian sound"]
\addlyrics { Fade to the dark -- } \\
\staff "2" \key g \minor \clef "bass" ef,8.[ ef ef8] r8 d[ d d]
\addlyrics { "Gmi: ♭VI" _ _ v _ _ } | %1

\staff "1" f4) \chords "Gmi" ef d \chords "F" c8[ c](
\addlyrics { ness all the way, __ } \\
\staff "2" g8.[_\markup "lament schema" g g8] r8 f[ f f]
\addlyrics { i _ _ ♭VII _ _ } | %2

\staff "1" d4) \chords "Eb" r r8 bf[ \chords "Dmi" bf f']~
\addlyrics { _ at the start, __ } \\
\staff "2" ef,8.[ ef ef8] r8 d[ d d]
\addlyrics { ♭VI _ _ v _ _ } | %3

\staff "1" f4 \chords "Gmi" g d2 \chords "F" \bar "||"
\addlyrics { _ guess I… } \\
\staff "2" g8.[ g g8] r8 f[ f f] \bar "||"
\addlyrics { i _ _ VII _ _ } | %4
```
<!-- lilylet-end -->
### 哀悼 {#lament}

哀悼图式有许多变体，参见[讨论该图式的章节](11-classical-schemas.md#lament)。其中一种特别的样式 i–♭VII–♭VI–v 强烈暗示爱奥利亚调式，因为它没有导音（导音会暗示小调性），而是使用 *te* $(\downarrow\hat7)$——爱奥利亚的色彩音。哀悼图式的这一变体可见于[伊娃·西蒙斯的《I Don't Like You》](https://open.spotify.com/track/7AmYqCQrdV7czyiMvYKrGs?si=jL89NuYfSECCZaElW8PVAQ)（2012，谱例 9）。

## 多利亚：小调主音配大三和弦 IV

多利亚听起来像小调，但用 *la* 代替 *le* $(\hat6 \text{ instead of} \downarrow\hat6)$，由此产生变异的和声，其中包括大三和弦 IV（相对于小调中的小三和弦 iv），如谱例 10 所示。在小调主音的歌曲中使用大三和弦 IV，是多利亚歌曲的首要标志——否则这类歌曲听起来就像小调 / 爱奥利亚。多利亚中的大三和弦 IV 通常具有下属功能。

![自然小调与多利亚的记谱对比，突出显示第 6 级的变化](../media/2019/05/dorian-1.png)

<!-- lilylet-begin: media/2019/05/dorian-1.png -->
```lyl.play
[staves "-"]

\omit Score.TimeSignature \time 8/1 \key c \minor \clef "treble" c1^\markup "natural minor"^\markup "1̂" d^\markup "2̂" ef^\markup "3̂" f^\markup "4̂" g^\markup "5̂" af^\markup "6̂" bf^\markup "7̂" c^\markup "1̂" \\\\
\key c \minor \clef "treble" <c ef g>1 <d f af> <ef g bf> <f af c> <g bf d> <af c ef> <bf d f> <c ef g> \bar "||"
\addlyrics { i ii° III iv v VI VII i } | %1

c1^\markup "dorian"^\markup "1̂" d^\markup "2̂" ef^\markup "3̂" f^\markup "4̂" g^\markup "5̂" a^\markup "↑6̂" bf^\markup "7̂" c^\markup "1̂" \\\\
<c ef g>1 <d f a> <ef g bf> <f a! c> <g bf d> <a! c ef> <bf d f> <c ef g> \bar "||"
\addlyrics { i ii III IV v vi° VII i } | %2
```
<!-- lilylet-end -->
谱例 10. 多利亚与自然小调音阶的区别在于它的 $\uparrow\hat{6}$（la），这一变化改变了 IV 和 ii 和弦的性质。（vi° 不使用。）

![谱例 11. 《Get Lucky》处于 B 多利亚调式，每四小节出现一次特征的 IV–i 进行（此处以箭头标出），以强调 Bmi 是主音。](../media/2019/05/get_lucky.png)*谱例 11. 《Get Lucky》处于 B 多利亚调式，每四小节出现一次特征的 IV–i 进行（此处以箭头标出），以强调 Bmi 是主音。*

<!-- lilylet-begin: media/2019/05/get_lucky.png -->
```lyl.play
[composer "Daft Punk"]
[staves "<voice-bass>"]
[instrument-voice "Voice"]
[instrument-bass "Bass"]

\key b \minor \numericTimeSignature \time 4/4 \clef "treble" d2 \chords "Bmi" r8 cs8[ d fs]~
\addlyrics { We've come too far __ }
\addlyrics { Let's raise the bar __ } \\\\
\key b \minor \clef "bass" b,4^\markup "ad lib." b8.[ b'16]~ b8 b,4 cs8
\addlyrics { "Bm: i" _ _ _ _ _ } | %1

fs2 \chords "D" r8 fs8[ gs a]~
\addlyrics { _ to give up __ }
\addlyrics { _ and our cups __ } \\\\
d,4 d8.[ d'16]~ d8 d,4 e8
\addlyrics { III _ _ _ _ _ } | %2

a'2 \chords "F#mi" r8 a8[ b gs]~
\addlyrics { _ who we are __ }
\addlyrics { _ to the stars __ } \\\\
fs,4 fs8.[ fs'16]~ fs8 fs,4 fs8
\addlyrics { v _ _ _ _ _ } | %3

gs'2 \chords "E" r2 \bar ":|."
\addlyrics { _ }
\addlyrics { _ } \\\\
e,4 e8.[ e16]~ e8[ fs] a16[ b b,8] \bar ":|."
\addlyrics { IV _ _ _ _ _ _ _ } | %4
```
<!-- lilylet-end -->
多利亚调式尤其与放克、迪斯科及其衍生风格联系在一起，在这些风格中多利亚交替格外普遍。众多例子之一是 [CHIC 的《Dance, Dance, Dance》](https://open.spotify.com/track/0YnjpvsQGmPMgwMutsIT40?si=ZQRdlLrDTAqSrgqM0bF3UQ)（1979）。一些不常听这类音乐的人很难用耳朵辨认多利亚交替，会把它听成 ii–V。多听放克和迪斯科，应该能帮助你学会把那个“ii 和弦”听成 i 和弦，即使在像[蠢朋克（Daft Punk）的《Get Lucky》](https://open.spotify.com/track/69kOkLUCkxIZYexIgSG8rq?si=f2GJK3fpQIedPN34o_TtYg)（2013，谱例 11）这样多利亚意味较模糊的歌曲中也是如此。

### 多利亚交替

多利亚交替在大三和弦 IV 与小三和弦 i 之间往返（谱例 12）。这一进行的总体效果是主和弦的延长。IV 和声的上方音往往构成一种辅助进行，强调 *la* $(\uparrow\hat6)$。多利亚交替有一种常见的变体，扩展为 i–IV–i<sup>7</sup>–IV。这进一步扩展了上方声部中的辅助效果。

🎼 [MuseScore 曲谱](https://musescore.com/user/32728834/scores/8521022)

谱例 12. 多利亚交替使用小三和弦 i 和大三和弦 IV，可以扩展为上行至 i<sup>7</sup> 的拱形。

## 利底亚：II♯

*Fi* $(\uparrow\hat4)$ 是利底亚调式的色彩音，它导致出现大三和弦 II，而不是大调中的小三和弦 ii（谱例 13）。为清楚起见，本书称这一和弦为 II♯，升号表示和弦升高的三音。

![谱例 13：利底亚类似升高的第 4 级的大调，这会产生大三和弦 II。（ivº 和 vii 不使用。）](../media/2019/05/lydian-1.png)*谱例 13：利底亚类似升高的第 4 级的大调，这会产生大三和弦 II。（ivº 和 vii 不使用。）*

<!-- lilylet-begin: media/2019/05/lydian-1.png -->
```lyl.play
[staves "-"]

\omit Score.TimeSignature \time 8/1 \clef "treble" c1^\markup "major"^\markup "1̂" d^\markup "2̂" e^\markup "3̂" f^\markup "4̂" g^\markup "5̂" a^\markup "6̂" b^\markup "7̂" c^\markup "1̂" \\\\
\clef "treble" <c e g>1 <d f a> <e g b> <f a c> <g b d> <a c e> <b d f> <c e g> \bar "||"
\addlyrics { I ii iii IV V vi vii° I } | %1

c1^\markup "lydian"^\markup "1̂" d^\markup "2̂" e^\markup "3̂" fs^\markup "↑4̂" g^\markup "5̂" a^\markup "6̂" b^\markup "7̂" c^\markup "1̂" \\\\
<c e g>1 <d fs a> <e g b> <fs a c> <g b d> <a c e> <b d fs> <c e g> \bar "||"
\addlyrics { I II♯ iii ♯iv° V vi vii I } | %2
```
<!-- lilylet-end -->
谱例 13. 利底亚类似升高 $\uparrow\hat{4}$（fi）的大调，这会产生大三和弦 II。（iv° 和 vii 不使用。）

如果 II♯ 进行到 V——古典音乐中通常如此——那么这个和弦应当理解为副属和弦 V/V。但在流行歌曲中，II♯ 常常引向别处，因此需要 II♯ 这一标记。

很少有流行歌曲整首都真正处于利底亚调式，但许多大调式流行歌曲会用大三和弦 II♯ 代替通常的小三和弦 ii，带来短暂的利底亚风味，而整体仍保持大调式。

II♯ 可以具有下属功能或属功能，下面两个图式各用到其中一种（谱例 14）。

🎼 [MuseScore 曲谱](https://musescore.com/user/32728834/scores/8521043)

谱例 14. II♯ 和弦是利底亚的特征和弦，下面两个图式都用到它。

### 利底亚交替

最基本的利底亚和弦进行是 II♯ 与 I 之间的简单交替。要正确辨认这一和弦进行可能有些棘手：由于很少有流行歌曲整首都真正处于利底亚，这个 II♯ 和弦常常在后面被 IV 和弦或 ii 和弦消解，这意味着整首歌曲是大调，只是短暂出现了一个 II♯ 和弦。略作变化的这一进行可见于[佛利伍麦克乐队（Fleetwood Mac）《Sara》](https://open.spotify.com/track/0YuCATlVwxG5Mq8lN2Omro?si=2U73jNWVRU2JrL0Ajn6qWA)（1979）的开头。《Sara》把利底亚交替扩展为包含一个 Ima<sup>7</sup> 和弦，为一条拱形的旋律配置和声，并在 II♯ 和弦下方使用主持续音。歌曲后段，II♯ 被嘟·沃普图式的使用所消解。[Mark Spicer 对此有图示说明。](http://mtosmt.org/issues/mto.17.23.2/mto.17.23.2.spicer.html)

如果 II♯ 和弦从未被消解，那么这一和弦进行可能根本不是 I–II♯，而是另一种以级进关系连接根音的交替。例如，[泰勒·斯威夫特（Taylor Swift）的《Starlight》](https://open.spotify.com/track/0vqI4ZIMuifeKeItGiWbPj?si=OK9l2l5bQbCUrXhamUXITQ)（2012）的主歌在 A 与 B 两个大三和弦之间交替（从 0:26 开始），但它们是 E 大调的 IV–V，*并非*利底亚交替。这一点在副歌（0:56）中变得清楚，副歌的和声是嘟·沃普图式的一种轮转。本章前面讨论的下主音交替，是另一种以级进关系连接两个大三和弦的和弦进行。记住利底亚在流行音乐中很罕见，辨认这一进行时要小心！

在这一进行中，II♯ 起属和弦的作用，借助 *fi* 与 *sol* 之间的半音 $(\uparrow\hat4-\hat5)$ 回到主音。

![谱例 15：《Forget You》全曲循环使用利底亚终止。背景人声始终带有那条特征性的半音线。](../media/2019/05/forget-you.png)*谱例 15：《Forget You》全曲循环使用利底亚终止。背景人声始终带有那条特征性的半音线。*

<!-- lilylet-begin: media/2019/05/forget-you.png -->
```lyl.play
[composer "CeeLo Green"]
[staves "<voice-bass>"]
[instrument-voice "Voice"]
[instrument-bass "Bass"]

\numericTimeSignature \time 4/4 \partial 2 \clef "treble" \stemUp r2 \\
\partial 2 \stemDown r8 c8[ e g]
\addlyrics { I see you } \\\\
\partial 2 \clef "bass" r8 g,8[ a c]~
\addlyrics { _ _ "C:" } | %1

\stemUp <e' g>1^\markup "the characteristic chromaticism of the lydian cadence."^\markup "Background vocals (written up one octave for clarity) clearly outline"( \\
\stemDown a'8[ \chords "C" a] g4 e d8[ c]
\addlyrics { dri -- vin' 'round town with the } \\\\
c,2 r8 g8[ a d]~
\addlyrics { I _ _ _ } | %2

\stemUp <fs' a>1 \\
\stemDown c8 \chords "D" d4 a8~ a[ g a c]
\addlyrics { girl I love, _ and I'm like, } \\\\
d,2 r8 d8[ e f]~
\addlyrics { II♯ _ _ _ } | %3

\stemUp <f' a>1 \\
\stemDown r8 \chords "F" c8 g'4 e d8[ c]
\addlyrics { for -- get you. __ _ } \\\\
f,2 r8 f8[ g c,]~
\addlyrics { IV _ _ _ } | %4

\partial 2 \stemUp <e' g>2) \\
\partial 2 \stemDown r2 \chords "C" \bar "||" \\\\
\partial 2 c,2 \bar "||"
\addlyrics { I } | %5
```
<!-- lilylet-end -->
### 利底亚终止

使用 II♯ 的最流行的进行是利底亚终止 II♯–IV–I，在 C 大调中即 D–F–C。注意利底亚的 *fi* $(\uparrow\hat{4})$ 随即被常规的 IV 和弦消解，代之以 *fa* $(\hat4)$。这一图式还具有平滑的半音声部进行，这也许部分解释了这一进行的吸引力。这一图式最清楚的例子也许是[Cee Lo Green 的《Forget You》](https://open.spotify.com/track/7AqISujIaWcY3h5zrOqt5v?si=NY08Kp-mQIqSYogdx37Gmw)（2010，谱例 15）。[^2]

## 用耳朵辨认调式

如果你不习惯演奏和聆听调式，用耳朵辨认并区分各种调式可能会令人望而却步。下面是一个逐步辨别此处讨论的所有调式的流程，谱例 16 以流程图的形式呈现。

### 1. 辨认主音和弦的性质。

![谱例 16. 说明如何用耳朵辨认调式的流程图。](../media/2019/05/mode_flow_chart-3.jpg)*谱例 16. 说明如何用耳朵辨认调式的流程图。*

先听主音音高，再听整个主和弦。这个和弦的三音是大三度还是小三度？由此可把大调类调式（大调、混合利底亚、利底亚）与小调类调式（小调、爱奥利亚、多利亚）区分开来。

### 2. 听 $\hat{7}$（*ti* 或 *te*）。

把 $\hat{7}$ 与我们通常在大调和小调歌曲中听到的、位于主音下方半音的导音（*ti*）相比较。如果 $\hat{7}$ 是主音下方一个*全音*（*te*），那么它是降低的，这意味着歌曲（至少暂时）处于某个调式中。

如果你听到的是大调主和弦，而 $\hat{7}$ 是降低的（*te*），那么你处于**混合利底亚**。

如果你听到的是小调主和弦，而 $\hat{7}$ 是升高的（*ti*），那么你处于**小调**。

如果此时调式仍未能确定，请进入第 3 步。

### 3. 听其他升高的色彩音——大调中的 *fi* $(\uparrow\hat4)$，小调中的 *la* $(\uparrow\hat6)$。

如果 $\hat7$ 没能帮你确定调式，就再听其他升高的色彩音。

如果大调主音调式中 $\hat{4}$ 是升高的（*fi*），你处于**利底亚**。如果不是，你处于**大调**。

如果小调主音调式中 $\hat{6}$ 是升高的（*la*），你处于**多利亚**。如果不是，你处于**爱奥利亚**。

> 延伸阅读

- Biamonte, Nicole. 2010. "Triadic Modal and Pentatonic Patterns in Rock Music." *Music Theory Spectrum*32 (2): 95–110. <https://doi.org/10.1525/mts.2010.32.2.95>.
- Everett, Walter. 2009. *The Foundations of Rock: From Blue Suede Shoes to Suite: Judy Blue Eyes*. Oxford: Oxford University Press.
- Persichetti, Vincent. 1961. *Twentieth-Century Harmony*. New York: W. W. Norton.
- Powers, Harold S. et al. "Mode." In *Grove Music Online*. New York: Oxford University Press. <https://www.oxfordmusiconline.com/view/10.1093/gmo/9781561592630.001.0001/omo-9781561592630-e-0000043718>.
- Spicer, Mark. 2017. "Fragile, Emergent, and Absent Tonics in Pop and Rock Songs." *Music Theory Online*23 (2). <http://mtosmt.org/issues/mto.17.23.2/mto.17.23.2.spicer.html>.
- Tagg, Philip. 2011. *Everyday Tonality: Towards a Tonal Theory of What Most People Hear*. 1.3. New York: The Mass Media Music Scholars' Press.

> 作业

1. 辨认调式图式（[.pdf](https://viva.pressbooks.pub/app/uploads/sites/12/2019/05/WK-Modal-Schemas.pdf)，[.docx](https://viva.pressbooks.pub/app/uploads/sites/12/2019/05/WK-Modal-Schemas.docx)）。要求学生用耳朵辨认各种调式图式。[练习表播放列表](https://open.spotify.com/playlist/1DJhIuYkyY8NLNM768YIKS?si=4feixxxZSUWDe7OD8aoH2Q)
2. 调式重配和声写作练习（[.pdf](https://viva.pressbooks.pub/app/uploads/sites/12/2019/05/COMP-Modal_Reharmonization_print.pdf)）。要求学生用调式图式为[蕾哈娜（Rihanna）的《Desperado》](https://open.spotify.com/track/4mCf3vQf7z0Yseo0RxAi3V?si=G-Iw-MhjSVGQMOSNw-SLvw)（2016）重新配置和声。

    <!-- lilylet-begin: media/2023/06/WK-modal-schemas_Reharmonization.mscz -->
    ```lyl.play
    \key af \major \time 3/4 \clef "treble_8" \tempo 4=188 r4^\markup "Verse" \stemDown c'8[ bf] \stemUp c[ f,] | %1

    R1 | %2

    R1 | %3

    \stemDown c'8[ bf] \stemUp c[ f,~] f4 | %4

    \stemDown c'4. c8 bf[ c] | %5

    \stemUp f8 r r4 r8 f | %6

    \stemDown c'8[ bf] c[ bf] \stemUp c[ f,] | %7

    r4 \stemUp f( af) | %8

    \stemDown c'8[ bf] c4( \stemUp bf8\glissando[ f~] | %9

    \stemUp f4) r2 | %10

    r4 \stemDown c'8[ bf] c[ bf] | %11

    \stemDown c'8[ bf] \stemUp af[ f] r4 | %12

    r4 \stemDown c'8[ bf] c[ bf] | %13

    \stemDown c'8[ bf] \stemUp af[ f] r4 | %14

    r4 \stemDown bf'8[ bf] c[ bf] | %15

    \stemDown c'8[ bf] c([ bf)] c[ bf] | %16

    \stemDown c'4( \stemUp bf8\glissando[ f~] f4~ | %17

    \stemUp f4) f8[ f~] f[ af] | %18

    \stemDown bf'8 r r4 c | %19

    \stemDown c'4 c bf | %20

    \stemUp af'4 \stemDown c c | %21

    \stemDown c'8[ c] bf4 \stemUp af | %22

    \stemUp f4 \stemDown c' c | %23

    \stemDown c'4 c c | %24

    \stemDown c'4( \stemUp bf8[ af~] af4~ | %25

    \stemUp af'4) af8[ af~] af[ af] | %26

    \stemDown bf'8 r r2 | %27

    \stemDown c'8[ c] bf4 \stemUp af | %28

    r4 \stemDown c' c | %29

    \stemDown c'8[ c] bf4 \stemUp af | %30

    \stemUp f4 \stemDown c' c | %31

    \stemDown c'4 bf \stemUp af | %32

    \stemUp f4^\markup "Chorus" \stemDown ef'8[ f] f4 | %33

    R1 | %34

    \stemDown ef'8[ f] f4 r8 c( | %35

    \stemDown ef'8)[ f] f4 r8 c( | %36

    \stemDown ef'8)[ f] f4 r8 r | %37

    r2 \stemDown c'8[ c] | %38

    \stemDown ef'8[ f] f4 r | %39

    r4 \stemDown c' c | %40

    \stemDown ef'8[ f] f4 ef | %41

    R1 | %42

    \stemDown ef'8[ f] f4 ef | %43

    \stemDown c'4 bf \stemUp af | %44

    \stemDown ef'8[ f] f4 ef | %45

    \stemDown c'4 bf \stemUp af | %46

    \stemDown bf'8[ c] bf4 r8 \stemUp af | %47

    \stemDown bf'8[ c] bf[ bf] \stemUp bf[ af] | %48

    \tuplet 3/2 { bf'8([ af f~] } \stemUp f2)\fermata \bar "|." | %49
    ```
    <!-- lilylet-end -->

### 媒体署名

- modal\_harmonic\_function © Megan Lavengood，采用 [CC BY-SA（署名—相同方式共享）](https://creativecommons.org/licenses/by-sa/4.0/) 许可
- mixolydian © Megan Lavengood，采用 [CC BY-SA（署名—相同方式共享）](https://creativecommons.org/licenses/by-sa/4.0/) 许可
- tired\_of\_waiting
- somebody\_that\_I\_used\_to\_know 2 © Megan Lavengood，采用 [CC BY-SA（署名—相同方式共享）](https://creativecommons.org/licenses/by-sa/4.0/) 许可
- LOTR © Megan Lavengood，采用 [CC BY-SA（署名—相同方式共享）](https://creativecommons.org/licenses/by-sa/4.0/) 许可
- I don't like you © Megan Lavengood，采用 [CC BY-SA（署名—相同方式共享）](https://creativecommons.org/licenses/by-sa/4.0/) 许可
- dorian
- get\_lucky © Megan Lavengood，采用 [CC BY-SA（署名—相同方式共享）](https://creativecommons.org/licenses/by-sa/4.0/) 许可
- lydian © Megan Lavengood，采用 [CC BY-SA（署名—相同方式共享）](https://creativecommons.org/licenses/by-sa/4.0/) 许可
- forget you © Megan Lavengood，采用 [CC BY-SA（署名—相同方式共享）](https://creativecommons.org/licenses/by-sa/4.0/) 许可
- mode\_flow\_chart-3 © [Sarah Louden](http://www.sarahlouden.com)，采用 [CC BY-SA（署名—相同方式共享）](https://creativecommons.org/licenses/by-sa/4.0/) 许可

---

[^1]: Vincent Persichetti（1961）把这些音称为“特征音”（characteristic notes）。
[^2]: 《Forget You》是原版中歌词更露骨的歌曲的课堂友好版本。
