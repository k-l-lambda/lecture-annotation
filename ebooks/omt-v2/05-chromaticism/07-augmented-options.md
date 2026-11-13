---
title: "增三和弦的各种可能"
slug: "augmented-options"
source: "https://viva.pressbooks.pub/openmusictheory/chapter/augmented-options/"
authors: ["Mark Gotham"]
license: "CC BY-SA 4.0"
modified: "2025-07-15"
---

# 增三和弦的各种可能

> **要点**
>
> 增三和弦是：

我们是不是忘了什么？我们现在已经深入到半音和声，却几乎没提到那些表面上属于自然音三和弦的四种类型之一：我们对增六和弦已经了如指掌，却对增三和弦不置一词。那么，这个增三和弦究竟是怎么回事？作曲家如何使用它？我们为什么这么久以来一直忽视它（为什么那么多教科书干脆一带而过）？

回想一下，仅用大三度和小三度就可以构成四种类型的三和弦：

- 减三和弦（小三度 + 小三度）
- 小三和弦（小三度 + 大三度）
- 大三和弦（大三度 + 小三度）
- 增三和弦（大三度 + 大三度）

因此增三和弦是这组可能性中的一员，但显然并不是同等的一员，至少在共性实践（common practice）时期作曲家的眼中不是。显然，大三和弦与小三和弦对调性音乐至关重要，减三和弦同样如此，尤其是在其属功能角色中（作为 vii<sup>o</sup>，以及作为 V<sup>7</sup> 的一部分）。与这些主角相比，增三和弦是一个略处边缘的角色。

## 总是半音化的吗？

这种罕见性部分与大小调体系本身的结构有关：和声小调中的 III+ 是增三和弦在大小调体系中不经半音变化而出现的唯一场合。这个 III+ 三和弦与属和弦（V）和小调主和弦（i）都密切相关：在两种情况下，都有两个音级保持不动，只有一个半音区分着发生变化的和弦音：

- III+ 与 V：$\hat5$ 与 $\hat7$ 不动，半音位于 $\hat2$ 与 $\hat3$ 之间；
- III+ 与 i：$\hat3$ 与 $\hat5$ 不动，半音位于 $\hat1$ 与 $\hat7$ 之间。

总体而言，我认为 III+ 的音响与用法通常暗示属功能。请看下面这个舒伯特（Schubert）"Der Atlas"开头的例子（谱例 1），想想你的看法：

- B♭ 与 D 始终不变（$\hat3$ 与 $\hat5$）。
- G 进行到 F♯ 再返回（$\hat1$ 与 $\hat7$）。
- 这可以说给人一种主与属交替的印象，只是变化极其细微。

![谱例 1. 舒伯特"Der Atlas"（出自《天鹅之歌》，*Schwanengesang*，D.957）开头的片段，显示增三和弦 III+（视分析视角而定，或许如此），以及这个和弦与 V 和 i 的关系有多么密切。](../media/2020/01/Atlas.png)*谱例 1. 舒伯特"Der Atlas"（出自《天鹅之歌》，*Schwanengesang*，D.957）开头的片段，显示增三和弦 III+（视分析视角而定，或许如此），以及这个和弦与 V 和 i 的关系有多么密切。*

<!-- lilylet-begin: media/2020/01/Atlas.png -->
```lyl.play
[composer "Franz Schubert"]
[staves "<voice> {pr-pl}"]
[instrument-voice "Voice"]
[instrument-pr-pl "Piano"]

\key g \minor \time 3/4 \tempo "Etwas geschwind" \clef "treble" R2. \\\\
\staff "1" \clef "bass" <g bf>32[ d' <g, bf> d' <g, bf> d' <g, bf> d'] <g, bf>[ d' <g, bf> d' <g, bf> d' <g, bf> d'] <g, bf>[ d' <g, bf> d' <g, bf> d' <g, bf> d'] \\
\staff "2" \clef "bass" <g,, g'>4\f <g g'> r8. <bf bf'>16 | %1

R2. \\\\
\staff "1" <fs, bf>32[\> d' <fs, bf> d' <fs, bf> d' <fs, bf> d'\!] \repeat tremolo 8 { <g, bf>32 d' } \\
\staff "2" <fs,,, fs'>4( <g g'>) r8. <bf bf'>16 | %2

R2. \\\\
\staff "1" <fs, bf>32[\> d' <fs, bf> d' <fs, bf> d' <fs, bf> d'\!] \repeat tremolo 8 { <g, bf>32 d' } \\
\staff "2" <fs,,, fs'>4( <g g'>) r8. d'16 | %3
```
<!-- lilylet-end -->
以下是整首歌曲：

🎼 [MuseScore 乐谱](https://musescore.com/user/27638568/scores/4985985)

<!-- embed-begin: https://musescore.com/user/27638568/scores/4985985 -->
<div class="omt-embed omt-embed-musescore"><iframe src="https://musescore.com/user/27638568/scores/4985985/embed" title="MuseScore" loading="lazy" style="height: 394px" allow="autoplay; fullscreen" allowfullscreen></iframe></div>
<!-- embed-end -->

[《天鹅之歌》D.957](https://musescore.com/user/27638568/scores/4985985)，[OpenScore Lieder](https://musescore.com/openscore-lieder-corpus) 提供

这些和弦之间的小步移动，与"新黎曼"（Neo-Riemannian）和声方法中至关重要的"简约声部进行"（parsimonious voice leading）的一个关键部分有关，该方法试图解释19世纪后期变得更为常见的扩展调性关系。关于这一点，详见[新黎曼三和弦进行](https://viva.pressbooks.pub/openmusictheory/chapter/post-tonal-triadic-progressions/)。现在，让我们继续看一些增三和弦在实践中的例子。

## 很少成为焦点

增三和弦相对边缘的角色和罕见性，也许会被认为降低了它的重要性，不过正如黄金、钻石和其他稀有商品的价格所证明的，这种稀有本身就可以是有价值的。对勋伯格（Schoenberg）来说，这使增三和弦比减三和弦与减七和弦"更能抵御平庸"（1911，英译修订版 1983，第 239 页）。

"稀有"这一说法也需要拆解：当我们谈到和声中的"稀有"时，通常是指该和弦很少出现在焦点性的角色中。这与 Richard Cohn 的观察相呼应："1830年以前的音乐中出现的增三和弦，其行为通常是规整而不张扬的，被安放在乐句的中段而非暴露在其边界处，迅速掠过且不带节拍重音"（2012，第 43 页）。

这在一般情况下也许属实，但这并不是说没有光辉的反例。谱例 2 列出了这样一个例子，出自巴赫（Bach）《尊主颂》（Magnificat，1723、1733）中"Fecit Potentiam"结尾处的"mente cordis"段落。这是一个非凡的瞬间：不仅竟然出现了增三和弦，而且它由几乎全体的力量引入，横跨整个音域，出现在一个戏剧性的全体休止之后，而那个休止之前又是一个减七和弦。在任何曲目中，你都别指望找到比这更清楚、更富于戏剧性地被推到前景的增三和弦。

 

![谱例 2. 巴赫《尊主颂》"Fecit Potentiam"中一个突出的增和弦，以及对这个段落的一种可能的和声解读：增三和弦在 v 小调段落的中途设置了一个阻碍终止，而该段落被两个副属和弦 vii o7 /v 所包围。](../media/2020/01/Bach.png)*谱例 2. 巴赫《尊主颂》"Fecit Potentiam"中一个突出的增和弦，以及对这个段落的一种可能的和声解读：增三和弦在 v 小调段落的中途设置了一个阻碍终止，而该段落被两个副属和弦 vii<sup>o7</sup>/v 所包围。*

<!-- lilylet-begin: media/2020/01/Bach.png -->
```lyl.play
[composer "Johann Sebastian Bach"]
[staves "<s1-s2-a-t-b> {pr-pl}"]
[instrument-s1 "Soprano I" "S I"]
[instrument-s2 "Soprano II" "S II"]
[instrument-a "Alto" "A"]
[instrument-t "Tenor" "T"]
[instrument-b "Bass" "B"]
[instrument-pr-pl "Reduction"]

\omit Score.TimeSignature \key d \major \time 4/4 \clef "treble" r4 r8 r16 cs'16 gs'8[ gs] r4
\addlyrics { su -- per -- bos } \\\\
\clef "treble" r4 r8 r16 a'16 d8[ d] r4
\addlyrics { su -- per -- bos } \\\\
\clef "treble" e8[ cs] r r16 e b'8[ b] r4
\addlyrics { sper -- sit su -- per -- bos } \\\\
\clef "treble_8" r8 e' cs[ a16 cs] b8[ gs] r4
\addlyrics { di -- sper -- sit su -- per -- bos } \\\\
\clef "bass" r4 r8 r16 a16 es8[ es] r4
\addlyrics { su -- per -- bos } \\\\
\staff "1" \clef "treble" <a' cs>16[ <e a> <cs e a> <e a cs>] <a cs e>[ <e a> <e a cs> <a cs e>] <gs b d gs>8[ <gs b d gs>] r4
\addlyrics { "[D: V]" _ _ _ _ _ _ _ "b: viio7/v" _ } \\
\staff "2" \clef "bass" r4 r16 e,[ cs a] es8[ es'] r4 | %1

r4 fs'2 d4
\addlyrics { men -- te } \\\\
r4 d'2 as4
\addlyrics { men -- te } \\\\
r4 fs2 fs4
\addlyrics { men -- te } \\\\
r4 as'2 fs4
\addlyrics { men -- te } \\\\
r4 fs,2 fs4
\addlyrics { men -- te } \\\\
\staff "1" \stemUp r4 <fs as d fs>2 <fs as d fs>4
\addlyrics { III+6 _ } \\
\staff "1" \stemDown s4 d'4. e8[ fs d] \\
\staff "2" r4 fs,,2 fs4 | %2

b'2 b
\addlyrics { cor -- dis } \\\\
b'2 d,
\addlyrics { cor -- dis } \\\\
fs2 es
\addlyrics { cor -- dis } \\\\
d'2 b
\addlyrics { cor -- dis } \\\\
g2 gs
\addlyrics { cor -- dis } \\\\
\staff "1" <fs b d fs>2 <gs b d es>
\addlyrics { VI7 viio65/v } \\
\staff "2" g,2 gs | %3
```
<!-- lilylet-end -->
## 半音经过和弦

虽然增三和弦只有一种自然音形式（小调中的 III+），但当我们把适用范围扩大到包括半音变化时，显然就有多得多的可能性。不过在这里，有些也比另一些更为常见。一种特别受青睐的用法，是把增和弦当作大调中从 V 到 I 的半音经过运动的一部分，用半音级的声部进行"填补"从 $\hat2$ 到 $\hat3$ 的全音步进，产生一种飞掠而过的效果。这可以有几种表现形式：

- 作为直接的 V–V+–I
- 在起始的 $\hat2$ 上换用另一种和声：例如 ii–V+–I
- 带或不带七音：例如 ii<sup>7</sup>–V+<sup>7</sup>–I

谱例 3 出自范妮·门德尔松·亨泽尔（Fanny Mendelssohn Hensel）的《贡多拉之歌》（*Gondellied*，6 首艺术歌曲 Op. 1 第 6 首），说明了这一点。第 19–20 小节可以看作 A 大调中的一个 V<sup>6</sup>/V–V+–I 终止（或者带七音的话，V$\mathrm{^6_5}$/V–V+<sup>7</sup>–I），其中：

- 增和弦以属功能出现；
- 那个增和弦的关键音（B♯）是升高的上主音，由 $\hat2$ 到 $\hat3$ 的半音运动产生（既出现在声乐声部，也在钢琴中重复）。

![谱例 3. 范妮·门德尔松·亨泽尔《贡多拉之歌》（6 首艺术歌曲 Op. 1 第 6 首）片段](../media/2020/01/Hensel-Extract.png)*谱例 3. 范妮·门德尔松·亨泽尔《贡多拉之歌》（6 首艺术歌曲 Op. 1 第 6 首）片段*

<!-- lilylet-begin: media/2020/01/Hensel-Extract.png -->
```lyl.play
[composer "Fanny Mendelssohn Hensel"]
[staves "<voice> {pr-pl}"]
[instrument-voice "Voice"]
[instrument-pr-pl "Piano"]

\omit Score.TimeSignature \key a \major \time 6/8 \clef "treble" as'8 b as e'4 as,8
\addlyrics { mit in die Lust hin -- }
\addlyrics { zu -- rück die See -- le } \\\\
\staff "1" \clef "treble" <e as>8[ <e as> <e as>] <e e'>4 <e as>8 \\
\staff "2" \clef "bass" <e, g cs>8[ <e g cs> <e g cs>] <e g cs>4 <e g cs>8 | %18

b'4.^\<( bs4.)\!
\addlyrics { ein, }
\addlyrics { nicht, } \\\\
\staff "1" <fs b>4. <e bs'>4 d8\p \\
\staff "2" <ds, fs b>4 a'8 <e gs>4. | %19

cs'8^\p e, a cs4.
\addlyrics { o komm zu mir }
\addlyrics { o komm zu mir } \\\\
\staff "1" <cs cs'>16[ e' a b cs b] a[ e cs a e a] \\
\staff "2" <a, e' a>8[ e' a] <cs e>4. | %20

e8 a cs^\markup "cresc." e4.
\addlyrics { wenn durch die Nacht, }
\addlyrics { wenn durch die Nacht, } \\\\
\staff "1" cs'16[ e a b cs b] a[ e cs a e a] \\
\staff "2" g,8[ e' a] <cs e>4. | %21
```
<!-- lilylet-end -->
以下是整首歌曲：

🎼 [MuseScore 乐谱](https://musescore.com/user/27638568/scores/5101361)

<!-- embed-begin: https://musescore.com/user/27638568/scores/5101361 -->
<div class="omt-embed omt-embed-musescore"><iframe src="https://musescore.com/user/27638568/scores/5101361/embed" title="MuseScore" loading="lazy" style="height: 394px" allow="autoplay; fullscreen" allowfullscreen></iframe></div>
<!-- embed-end -->

Hensel, Fanny (Mendelssohn) – 6 Lieder, Op.1, No.6 – Gondellied，[OpenScore LiederCorpus](https://musescore.com/openscore-lieder-corpus) 提供

## 李斯特《R. W. 威尼斯》中作为图形与底色的增三和弦

[IMSLP 上的乐谱](https://imslp.org/wiki/R.W._-_Venezia,_S.201_(Liszt,_Franz))

迄今为止，我们已经看到了增三和弦的自然音形式（III+）的例子，以及作为半音变化但功能明确的例子（V+）。现在让我们进一步深入半音化的领域，看看那些把增三和弦用作突出的焦点性素材的作品。李斯特（Liszt）的晚期音乐包含一些迷人的小品，其中许多都大量强调增三和弦。[^1] 《R. W. 威尼斯》就是这样的作品之一，它突出了增和弦这一总体，尤其是 C♯ 增和弦 [C♯、F、A]。这个和弦被赋予了如此的分量，以至于它惊人地提出了某种整体首要性或主和弦地位的主张，这至少挑战、甚至可能压倒了调性中心（B♭）的相应主张。

Cohn（2012，47），继 Harrison（1994，75 页及以下）之后，讨论了舒伯特"Die Stadt"中对减和弦的类似强调，正确地指出，这一曲目动用"通常只为协和音保留的修辞外衣"，赋予不协和和弦某种替代性的主和弦地位（另见 Morgan 1976）。这些修辞策略可以用"最先、最后、最响、最长"这一精炼的说法很好地概括。

《R. W. 威尼斯》以 C♯ 增和弦开始，通过简约声部进行解决到 b 小调，作为一个上行半音模进的起点，这个模进最终变成一长串上行（起初为平行增）三和弦，并在一个炽烈的 *forte* B♭ 大调中达到高潮。那个强奏段落随后经过更多简约声部进行的循环，又回到 C♯ 增和弦，此时为 *fortissimo*。最后，这个 C♯ 增和弦开启一段下行，巧妙地结合了 b 小调与 C♯ 增和弦的音高 [B♭、C♯、F、A]，并在一个 C♯ 的同音上含混地收束。最后一个 C♯ 被重复，把这种含混一直带到最后一个音。假如第二个、最后的 C♯ 是 B♭，那么这首作品就会更坚定地倒向 b 小调。而实际上，李斯特保持着这种微妙的平衡，让我们思索哪个是图形、哪个是底色。

简言之，C♯ 在"最先"和"最后"两方面都胜出，而 B♭ 大概赢得"最响"，于是"最长"成为含混性的主要载体。增和弦的使用远多于当时的平均水准，即便是对李斯特（一个远高于平均水准的使用者）而言也是如此，尽管仍不及大三和弦或小三和弦。话说回来，单就 C♯ 增三和弦而言，其使用程度与 B♭ 大调和小调之和大致相当，这使它更有理由被称为"主和弦"。这是否足够，仍有争论；最终，我听到的是一种极为有效的平衡，两者都没有完全胜出。

## 选集示例

本章考察了一些关于某些特定进行相对常见程度（或罕见程度）的主张。但到目前为止，我们只看了一些例子。要理解这类主张，我们应当考虑整体的情况。这里没有篇幅详细展开，但最后这一节为你指明了通往大量进一步例子的方向。

首先，[这里](https://github.com/MarkGotham/Moments/blob/master/Anthology_Lists/Augmented/Newly_Prepared.csv)有一份初步清单，从文献中收集了约 200 个例子。这份清单可以看作增三和弦的"正典"——即那些足以被理论文献或历史文献提及的实例。这些曲目中的出现情形在功能与格调上多种多样。许多确实"只不过"是附带的倚音与装饰，另一些则是根本性的、具有参照意义的音响；有些是孤立的情形，另一些则是更广泛、反复出现的和声过程的核心部分；有些角色含混，另一些则有明确的音乐意义、甚至音乐之外的意义，包括通常集中于死亡、矛盾或神秘的主题联想。[^2]

其次，前往[和声选集](../12-anthology/01-anthology-harmony.md)一章，那里有一份清单，列出分析者曾从增和弦角度理解的 [OpenScore Lieder](https://musescore.com/openscore-lieder-corpus) 集中的片段。这份清单可按作曲家、曲集、歌曲、小节、罗马数字（数字）和调排序。每个条目都包含乐谱链接。

> 作业

1. 前往[和声选集](../12-anthology/01-anthology-harmony.md)一章中关于增和弦的部分，从所列曲目例子中挑选一个（或多个）分析者已确认其中使用了增和弦的例子。
	- 针对那一段落，对所涉小节及其前后各一两小节（足以确立一个和弦进行和一定语境）作罗马数字分析。
	- 按表中给出的数字和调，写出一份包含该增三和弦的和声分析。
	- 如果你不同意那种解读（你很可能不同意），就提供一份不含该增三和弦的替代性分析。
2. 对若干例子重复第 1 步，找出彼此相似、并与上述例子相似的任何情形。例如，对于选集中标为 V+ 的情形，其中许多是否类似于上面亨泽尔作品中的半音经过运动？你能找到像巴赫那样戏剧性的例子吗？你是否看到本章未描述的其他反复出现的做法？

## 媒体署名

- Atlas
- Bach
- Hensel Extract

---

[^1]: 见 Cohn 2000；Forte 1987；Gut 1975；Hantz 1982；McKinney 1993；Satyendra 1992，1997；Todd 1981，1996。

[^2]: 关于许多表面上的音乐之外用法，见 Moomaw《增五度的表现性运用》（"The Expressive Use of the Augmented Fifth"，1985，第 354 页及以下），其中也许最引人注目的是他最后一个例子，第 213e 号，描绘 Mondonville 的《达夫尼斯与阿尔西玛杜尔》（*Daphnis et Alcimadure*，1754）中的炮击。