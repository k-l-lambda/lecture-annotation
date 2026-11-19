---
title: 变化和弦与扩展和弦
slug: "altered-and-extended-dominant-chords"
source: "https://viva.pressbooks.pub/openmusictheory/chapter/altered-and-extended-dominant-chords/"
authors: ["Bryn Hughes"]
license: "CC BY-SA 4.0"
modified: "2025-01-13"
---

# 变化和弦与扩展和弦

> **要点**
>
> - 属和弦的五音可以升高或降低，成为增五度或减五度，在分析中分别用罗马数字旁的「+」和「o」表示。
> - 增五度的属和弦，增五度通常上行解决到下一个和弦的三音。这类和弦最常见的是解决到大三和弦。
> - 减五度通常下行半音解决到下一个和弦的根音
> - 九音取代重复的根音，并下行级进解决
> - 十一音取代三音，并作为共同音解决
> - 十三音取代五音，并下行三度解决
> - 扩展和弦几乎只出现在原位

## 变化和弦

至此，我们探讨过的许多半音和声，都是用[副属功能](../03-diatonic-harmony/15-tonicization.md)或[调式借用](01-modal-mixture.md)来解释的。这些和声都没有涉及和弦纯五音的改变；而这一做法我们接下来要较详细地讨论。把三和弦的五音升高或降低，它就变成增五度或减五度。虽然我们已经见过带减五度的减三和弦和七和弦，却还没有讨论过既含大三度、又含增五度或减五度的和弦的可能。这类和弦通常被称为「变化和弦」（altered chords）。虽然没有统一的分析记法，增五度在分析中常以罗马数字旁的「+」表示，减五度则以罗马数字旁的「o」表示。本书采用这一做法。

### 增五度的属和弦

把大三和弦的五音升高，它就变成增三和弦。升高的五音通常上行级进解决到目标和弦的三音。在谱例 1 中，弗兰克（Franck）通过一个增五度的属七和弦，从升 f 小调突然转入 D 大调。请注意，这个变化音向上解决到目标和弦的三音（在此即 D 大调的主音）。这是这个半音最常见的解决方式。

🎼 [MuseScore 曲谱](https://musescore.com/user/32728834/scores/12259201)

<!-- embed-begin: https://musescore.com/user/32728834/scores/12259201 -->
<div class="omt-switch" data-omt-switch>
<div class="omt-switch-bar" role="tablist"><button type="button" role="tab" aria-selected="true" data-pane="lilylet">Lilylet 乐谱</button><button type="button" role="tab" aria-selected="false" data-pane="musescore">MuseScore</button></div>
<div class="omt-switch-pane" role="tabpanel" data-pane="lilylet" markdown="1">

```lyl.play
[staves "{-},{-}"]

\staff "1" \key a \major \numericTimeSignature \time 3/4 \clef "treble" cs'16[ cs'16 fs,16 fs'16] gs16[ cs,16 a16 cs,16] gs''16[ b,16 gs16 b,16] \\
\staff "2" \clef "bass" <cs a'>8[ <a fs'>8] <cs, fs ds'>4 <cs gs' es'>4 \\\
\staff "1" \clef "treble" <cs cs'>8[ <fs fs'>8] <a cs a'>8 r8 <gs b gs'>8 r8 \\
\staff "2" \clef "bass" r8 a8 <cs, fs ds'>8 r8 <cs gs' es'>8 r8 | %1

\staff "1" fs''16[ a,16 fs16 a,16] r4 r4 \\
\staff "2" <fs,, cs' a'>4 <a' fs'>4 r4 \\\
\staff "1" <fs a fs'>8 r8 <fs, fs'>8 r16 <g' a cs es>16 <g a cs es>8.[ <fs d' fs>16] \\
\staff "2" <fs,, cs' a'>8 r8 <fs, fs'>8 r16 <a a'>16 <a a'>8.[ <d d'>16] | %2

\staff "1" \tuplet 3/2 { <d d'>8[ <fs fs'>8 <a a'>8] } <d d'>4 r4 \\
\staff "2" \clef "treble" \tuplet 3/2 { d8[ fs8 a8] } d4 r4 \\\
\staff "1" <fs d' fs>4 r4 r4 \\
\staff "2" <d,, d'>4 r4 r4 | %3
```

</div>
<div class="omt-switch-pane omt-embed omt-embed-musescore" role="tabpanel" data-pane="musescore" hidden><iframe data-src="https://musescore.com/user/32728834/scores/12259201/embed" title="MuseScore" loading="lazy" style="height: 525px" allow="autoplay; fullscreen" allowfullscreen></iframe></div>
</div>
<!-- embed-end -->

谱例 1. [塞萨尔·弗兰克《交响变奏曲》（双钢琴改编版）第 170–172 小节](https://musescore.com/user/32728834)

增五度的属和弦也可以用作副属和弦，你可以在谱例 2 中施特劳斯（Strauss）《蒂尔·艾伦施皮格尔的恶作剧》的片段中听到。

🎼 [MuseScore 曲谱](https://musescore.com/user/32728834/scores/12259252)

<!-- embed-begin: https://musescore.com/user/32728834/scores/12259252 -->
<div class="omt-switch" data-omt-switch>
<div class="omt-switch-bar" role="tablist"><button type="button" role="tab" aria-selected="true" data-pane="lilylet">Lilylet 乐谱</button><button type="button" role="tab" aria-selected="false" data-pane="musescore">MuseScore</button></div>
<div class="omt-switch-pane" role="tabpanel" data-pane="lilylet" markdown="1">

```lyl.play
[staves "{-}"]

\staff "1" \key f \major \numericTimeSignature \time 4/8 \partial 8 \clef "treble" \stemUp a''8 \\
\staff "1" \stemDown r8 \\
\staff "2" \clef "bass" r8 | %1

\staff "1" \stemUp f'8-.[ b,8] c8-.[ cs8] \\
\staff "1" \stemDown r4 r8 <ef f>8 \\
\staff "2" r4 r8 <f, a>8 | %2

\staff "1" \stemUp <d' f>4. <c e>16[ <bf d>16] \\
\staff "1" \stemDown <d f>4. <c e>8 \\
\staff "2" \stemUp <f, d'>8.[ <bf f'>16] <d bf'>8 s8 \\
\staff "2" \stemDown bf,2 | %3

\staff "1" <bf' d>16[ <a c>16 <a, f'>16 <c g'>16] <f a>4 \\
\staff "2" bf,8[ c8] f,4 | %4
```

</div>
<div class="omt-switch-pane omt-embed omt-embed-musescore" role="tabpanel" data-pane="musescore" hidden><iframe data-src="https://musescore.com/user/32728834/scores/12259252/embed" title="MuseScore" loading="lazy" style="height: 394px" allow="autoplay; fullscreen" allowfullscreen></iframe></div>
</div>
<!-- embed-end -->

谱例 2. [理查德·施特劳斯《蒂尔·艾伦施皮格尔的恶作剧》（钢琴改编谱）](https://musescore.com/user/32728834/scores/12259252/s/e2hCwA)

重要的是，这类和弦不容易解决到小三和弦，因为增五度无法上行级进。在谱例 3 中，增五度的属和弦用于第一转位，半音化的五音同样向上解决。

🎼 [MuseScore 曲谱](https://musescore.com/user/32728834/scores/12259285)

<!-- embed-begin: https://musescore.com/user/32728834/scores/12259285 -->
<div class="omt-switch" data-omt-switch>
<div class="omt-switch-bar" role="tablist"><button type="button" role="tab" aria-selected="true" data-pane="lilylet">Lilylet 乐谱</button><button type="button" role="tab" aria-selected="false" data-pane="musescore">MuseScore</button></div>
<div class="omt-switch-pane" role="tabpanel" data-pane="lilylet" markdown="1">

```lyl.play
[staves "{-}"]

\staff "1" \key bf \major \numericTimeSignature \time 2/4 \partial 4. \clef "treble" \tempo "Allegretto grazioso" bf'16-.[ d16-.] <f, cs' f>8-. r16 <f f'>16 \\
\staff "2" \clef "bass" bf16-.[ d16-.] a,16[ f'16 cs'16 f,16] | %1

\staff "1" <f d'>4 <f cs' f>8-. r16 <f f'>16 \\
\staff "2" bf,16[ f'16 d'16 f,16] a,16[ f'16 cs'16 f,16] | %2

\staff "1" <f d'>4 s4 \\
\staff "2" bf,16[ f'16 d'16 f,16] s4 | %3
```

</div>
<div class="omt-switch-pane omt-embed omt-embed-musescore" role="tabpanel" data-pane="musescore" hidden><iframe data-src="https://musescore.com/user/32728834/scores/12259285/embed" title="MuseScore" loading="lazy" style="height: 394px" allow="autoplay; fullscreen" allowfullscreen></iframe></div>
</div>
<!-- embed-end -->

谱例 3. [勃拉姆斯《第二钢琴协奏曲》第四乐章](https://musescore.com/user/32728834/scores/12259285/s/A7cwBr)

请注意，增三和弦是对称和弦，可以有多种解释，因此没有适当的上下文就很难确定它的根音。谱例 3 中，勃拉姆斯清楚表明这个和弦的功能是降 B 的属和弦，但人们也很容易把低音重新解释为 A 增三和弦的根音。与减七和弦一样，增三和弦可以是通往远关系半音转调的途径。谱例 4 展示了 C 增三和弦的三种可能的等音解释与解决。

🎼 [MuseScore 曲谱](https://musescore.com/user/32728834/scores/9088466)

<!-- embed-begin: https://musescore.com/user/32728834/scores/9088466 -->
<div class="omt-switch" data-omt-switch>
<div class="omt-switch-bar" role="tablist"><button type="button" role="tab" aria-selected="true" data-pane="lilylet">Lilylet 乐谱</button><button type="button" role="tab" aria-selected="false" data-pane="musescore">MuseScore</button></div>
<div class="omt-switch-pane" role="tabpanel" data-pane="lilylet" markdown="1">

```lyl.play
[staves "{-}"]

\staff "1" \key c \major \numericTimeSignature \time 4/4 \clef "treble" <b' ds>2 <g e'>2 \\
\staff "2" \clef "bass" g2 c,2 | %1

\staff "1" <fss ds'>2 <gs e'>2 \\
\staff "2" b,2 e2 | %2

\staff "1" <g' b>2 <af c>2 \\
\staff "2" ef,2 af,2 | %3
```

</div>
<div class="omt-switch-pane omt-embed omt-embed-musescore" role="tabpanel" data-pane="musescore" hidden><iframe data-src="https://musescore.com/user/32728834/scores/9088466/embed" title="MuseScore" loading="lazy" style="height: 300px" allow="autoplay; fullscreen" allowfullscreen></iframe></div>
</div>
<!-- embed-end -->

谱例 4. [增三和弦属和弦的等音改写](https://musescore.com/user/32728834/scores/9088466/s/iFMvbd)

### 减五度的属和弦

把大三和弦的五音降低，会得到一种我们此前还没遇到过的奇特和弦性质。这一变化造成根音上方的减五度，而这个音倾向于下行级进解决到目标和弦的根音。虽然这个三和弦是可以用的，但在属七和弦中使用减五度要常见得多。在谱例 5 中，即理查德·施特劳斯歌剧《莎乐美》（*Salome*）的片段，终止处的属和弦含有减五度，带来一种美妙的不协和音，引向主和弦。在这个例子里，施特劳斯对降五音的解决处理得比较自由，并不费力把这个音解决到主和弦的根音。

🎼 [MuseScore 曲谱](https://musescore.com/user/32728834/scores/12272548)

<!-- embed-begin: https://musescore.com/user/32728834/scores/12272548 -->
<div class="omt-switch" data-omt-switch>
<div class="omt-switch-bar" role="tablist"><button type="button" role="tab" aria-selected="true" data-pane="lilylet">Lilylet 乐谱</button><button type="button" role="tab" aria-selected="false" data-pane="musescore">MuseScore</button></div>
<div class="omt-switch-pane" role="tabpanel" data-pane="lilylet" markdown="1">

```lyl.play
[staves ",{-}"]

\key e \major \numericTimeSignature \time 4/4 \clef "treble" gs''4 gs8 gs8 gs2 \\\
\staff "1" \clef "treble" <fs gs d' gs>1 gs,16[ bs16 d16 fs16] r4 gs16[ bs16 d16 fs16] \\
\staff "2" \clef "bass" \stemUp r16 bs,16[ d16 fs16] r4 gs16[ bs16 d16 fs16] s4 \\
\staff "2" \stemDown gs,1 | %1

gs''8 gs8 fs4 e4 d4 \\\
\staff "1" gs''8 r8 <gs, fs' gs>4-. <gs e' gs>4-. <gs d' gs>4-. \\
\staff "2" \stemUp \tuplet 3/2 { cs8[ d8 e8] } fs8 r8 r2 \\
\staff "2" \stemDown gs,1 | %2

e'2 r4 gs,4 \\\
\staff "1" <cs' e gs cs>4. <gs gs'>8 <e' e'>2~ \\
\staff "2" <cs,, cs'>8 <cs'' e>16-.[ <cs e>16-.] <cs e>8-.[ <gs cs>8-.] <cs e>8-.[ <e gs>8-.] \clef "treble" <gs cs>8-. r8 | %3

e'4 d8 cs8 bs8~ bs8 cs8 d8 \\\
\staff "1" <e' e'>4 <d d'>8[ <e e'>8] <fs fs'>4 <e e'>8[ <d d'>8] \\
\staff "2" \clef "bass" <cs, e gs cs>8-. r8 r4 <gs d' bs'>8-. r8 r4 | %4

cs'2 gs4 r8 r8 \\\
\staff "1" \stemUp <e' e'>1 \\
\staff "1" \stemDown r8 <gs' cs>16-.[ <gs cs>16-.] <gs cs>8-.[ <e gs>8-.] <gs cs>8-.[ <cs e>8-.] <e gs>8-. r8 \\
\staff "2" <cs, e gs cs>8-. e'16-.[ e16-.] e8-.[ cs8-.] e8-.[ \clef "treble" gs8-.] cs8-. r8 | %5
```

</div>
<div class="omt-switch-pane omt-embed omt-embed-musescore" role="tabpanel" data-pane="musescore" hidden><iframe data-src="https://musescore.com/user/32728834/scores/12272548/embed" title="MuseScore" loading="lazy" style="height: 720px" allow="autoplay; fullscreen" allowfullscreen></iframe></div>
</div>
<!-- embed-end -->

谱例 5. [理查德·施特劳斯《莎乐美》排练号 117](https://musescore.com/user/32728834/scores/12272548/s/ImVHJR)

与增三和弦、减七和弦一样，带减五度的属七和弦也是对称的。而且，这个和弦等同于法国增六和弦。当你把 V°7 和弦用在第二转位、让降五音留在低音声部下行级进解决时，这种等价关系就更清楚了。例如在 C 大调中，V°4/3 和弦与 F 大调的法国增六和弦完全相同。同样，V°4/3/V 等同于主调 C 大调中的法国增六和弦。从技术上说，原位、带减五度的属七和弦*也*等同于法国增六和弦，只是需要一些等音改写的处理才看得清楚。谱例 6 展示了所有这些等价关系。

🎼 [MuseScore 曲谱](https://musescore.com/user/32728834/scores/9101633)

<!-- embed-begin: https://musescore.com/user/32728834/scores/9101633 -->
<div class="omt-switch" data-omt-switch>
<div class="omt-switch-bar" role="tablist"><button type="button" role="tab" aria-selected="true" data-pane="lilylet">Lilylet 乐谱</button><button type="button" role="tab" aria-selected="false" data-pane="musescore">MuseScore</button></div>
<div class="omt-switch-pane" role="tabpanel" data-pane="lilylet" markdown="1">

```lyl.play
[staves "{-}"]

\staff "1" \key c \major \numericTimeSignature \time 4/4 \clef "treble" <f g b>2 <e g c>2 \\
\staff "2" \clef "bass" df,2 c2 | %1

\staff "1" <d fs c'>2 <d g b>2 \\
\staff "2" af,2 g2 | %2

\staff "1" <f b df>2 <e g c>2 \\
\staff "2" g2 c,2 | %3

\staff "1" \key b \major <es b' cs>2 <fs as cs>2 \\
\staff "2" g2 fs2 | %4
```

</div>
<div class="omt-switch-pane omt-embed omt-embed-musescore" role="tabpanel" data-pane="musescore" hidden><iframe data-src="https://musescore.com/user/32728834/scores/9101633/embed" title="MuseScore" loading="lazy" style="height: 394px" allow="autoplay; fullscreen" allowfullscreen></iframe></div>
</div>
<!-- embed-end -->

谱例 6. [带减五度的属七和弦及其等音对应和弦](https://musescore.com/user/32728834/scores/9101633/s/y0H5Bs)

关于变化属和弦的讨论，最后请看谱例 7，出自柴可夫斯基（Tchaikovsky）《第五交响曲》第二乐章。在这一片段中，从半减七和弦与全减七和弦构成的半音泥潭中浮现出来的，是一个相当出人意料的自然音 ii7 和弦。这个和弦经级进运动，穿过另一个半减七和弦，解决到这一段的终止属和弦：一个 V°4/3 和弦。通常，终止属和弦只有在原位时才有效，但这个和弦恰恰是19世纪半音化与模糊性的象征。降五音像增六和弦那样下行级进，解决到 D 大调主音。

🎼 [MuseScore 曲谱](https://musescore.com/user/32728834/scores/12273394)

<!-- embed-begin: https://musescore.com/user/32728834/scores/12273394 -->
<div class="omt-switch" data-omt-switch>
<div class="omt-switch-bar" role="tablist"><button type="button" role="tab" aria-selected="true" data-pane="lilylet">Lilylet 乐谱</button><button type="button" role="tab" aria-selected="false" data-pane="musescore">MuseScore</button></div>
<div class="omt-switch-pane" role="tabpanel" data-pane="lilylet" markdown="1">

```lyl.play
[staves "{-}"]

\staff "1" \key d \major \numericTimeSignature \time 21/8 \clef "treble" \tempo "Poco più animato." gs'4. <gs, b fs'>4. gs'4 <gs, cs fs>4. gs'8 gs4. <gs, d' fs>4. d'8--[ e8-- fs8--] \\
\staff "2" \clef "bass" <d,, d'>4. s4 s8 <cs cs'>4. s4 s8 <b b'>4. s4 s8 r4. | %1

\staff "1" gs'4. <gs, b fs'>4. gs'4 <gs, cs fs>4. gs'8 gs4. <gs, d' fs>4. gs'8--[ a8-- b8--] \\
\staff "2" <d,, d'>4. s4 s8 <cs cs'>4. s4 s8 <b b'>4. s4 s8 r4. | %2

\staff "1" \stemUp b'4. b4 b8 b4. gs8--[ a8-- b8--] s1 s8 \\
\staff "1" \stemDown <b d es>4. <b d fs>4. <b d gs>4. s1 s2 \\
\staff "2" <gs, gs'>4. <fs fs'>4. <es es'>4. r4. s1 s8 | %3

\staff "1" \stemUp b'4. b4 b8 b4. b4 b8 s1 s8 \\
\staff "1" \stemDown <b d es>4. <b d fs>4. <b d gs>4. r4. s1 s8 \\
\staff "2" <gs, gs'>4. <fs fs'>4. <es es'>4. r4. s1 s8 | %4

\staff "1" \stemUp b'4 b8 b8 b4 b4 b8 b4 a8 s1 s8 \\
\staff "1" \stemDown <b d g>2. <cs g'>2. s1 s8 \\
\staff "2" <e,, e'>2. <e e'>4. <ef ef'>4. s1 s8 | %5

\staff "1" \tempo "Tempo primo" r4. <g a cs g' a>2. <g a cs g' a>4. s1 s8 \\
\staff "2" r4. <ef,, a ef'>2. <ef a ef'>4. s1 s8 | %6

\staff "1" \stemUp <d d'>4. fs4 <b, b'>8 <a a'>4. <a a'>4 <a a'>8 s1 s8 \\
\staff "1" \stemDown fs8[ fs8 fs8] fs4. g4. fs4 e8 s1 s8 \\
\staff "2" \stemUp <d,, a' d>8 a''8[ a8 a8] e8[ e8 e8] fs8[ fs8 g8] s1 s4 s8 \\
\staff "2" \stemDown <fs, a>8[ <fs a>8] d4. cs2. s1 s4 | %7
```

</div>
<div class="omt-switch-pane omt-embed omt-embed-musescore" role="tabpanel" data-pane="musescore" hidden><iframe data-src="https://musescore.com/user/32728834/scores/12273394/embed" title="MuseScore" loading="lazy" style="height: 550px" allow="autoplay; fullscreen" allowfullscreen></iframe></div>
</div>
<!-- embed-end -->

谱例 7. [柴可夫斯基《第五交响曲》第二乐章第 40–46 小节](https://musescore.com/user/32728834/scores/12273394/s/iQ4L8D)

## 扩展和弦

至此，我们只使用了构成三和弦或七和弦的和声。在根音七音之上继续叠置三度，既是可能的，而且许多浪漫主义时期及以后的作曲家确实这样做。不过，你只能叠到一定程度，之后就回到和弦的根音，如谱例 8a 所示。在爵士理论中，七音以上的和弦音称作*扩展音*（extensions），本书采用这一说法。重要的是，扩展音的意义取决于它的排列。谱例 8b 与 8c 给出了同样的四个音高的两种不同排列。在谱例 8b 中，和弦显然可以置于 C 大调 V13/7 的上下文中来理解。谱例 8c 则远没有那么清楚；它可以是 8b 中和弦的某种转位，我们也可以把它看作扩展的 iii 和弦。无论哪种情况，上下文都因和弦的排列而变得不清晰。正因如此，我们往往只在原位使用扩展和弦（因为扩展音真正是由和弦根音来定义的）。

🎼 [MuseScore 曲谱](https://musescore.com/user/32728834/scores/12280573)

<!-- embed-begin: https://musescore.com/user/32728834/scores/12280573 -->
<div class="omt-switch" data-omt-switch>
<div class="omt-switch-bar" role="tablist"><button type="button" role="tab" aria-selected="true" data-pane="lilylet">Lilylet 乐谱</button><button type="button" role="tab" aria-selected="false" data-pane="musescore">MuseScore</button></div>
<div class="omt-switch-pane" role="tabpanel" data-pane="lilylet" markdown="1">

```lyl.play
[staves ""]

\key c \major \omit Score.TimeSignature \numericTimeSignature \time 12/4 \clef "treble" <g b d f a c e g>1 <g f' b e>1 <e' g b f'>1 | %1
```

</div>
<div class="omt-switch-pane omt-embed omt-embed-musescore" role="tabpanel" data-pane="musescore" hidden><iframe data-src="https://musescore.com/user/32728834/scores/12280573/embed" title="MuseScore" loading="lazy" style="height: 394px" allow="autoplay; fullscreen" allowfullscreen></iframe></div>
</div>
<!-- embed-end -->

谱例 8. [扩展音的类型](https://musescore.com/user/32728834/scores/12280573/s/u-zJBF)

在用五个、六个或七个声部写作时，你固然可以把所有和弦音与扩展音都写进织体，但使用如此密集的和弦往往并不可取。在四声部织体中写作这类和弦时，你需要决定省去哪些音。把这些和弦看作线性生成的结果会很有帮助，即扩展音替换了某个常规和弦音。重要的是，写作这些和弦时，我们总是要保留根音和和弦七音，因为它们对确定和弦性质是必不可少的。

谱例 9 展示了这些扩展音加在属七和弦上的各种生成方式。

在谱例 9a 中，九音替换了在低音上方八度处重复的根音。九音可以与根音（位于低音）同时出现，但要确保它听上去在根音的八度之上；这是九度，不是二度。这里省去了五音，但在五声部织体中完全可以保留。九音应下行级进解决。

谱例 9b 显示十一音替换了十度（三音）。由于三音（导音）通常不重复，十一音与三音不应同时出现。说来矛盾，十一音是「作为共同音」解决的。既然导音通常会解决到主音，十一音也应当如此。这个和弦有时同时包含九音与十一音，听起来像是一个低音为音阶级数 5 的 IV 和弦。

谱例 9c 显示十三音替换了十二度（五音）。在属七和弦中重复五音并不常见，所以十三音与五音通常不会同时出现。既然五音（音阶级数 2）常下行级进解决到主音，十三音有时就「下行三度跳进到音阶级数 1」来解决。十三音也可以作为共同音保持，成为主和弦的三音。

最后，谱例 9d 表明，你可以把扩展音与变化音结合起来，造出真正有意思的属音响。

🎼 [MuseScore 曲谱](https://musescore.com/user/32728834/scores/12500938)

<!-- embed-begin: https://musescore.com/user/32728834/scores/12500938 -->
<div class="omt-switch" data-omt-switch>
<div class="omt-switch-bar" role="tablist"><button type="button" role="tab" aria-selected="true" data-pane="lilylet">Lilylet 乐谱</button><button type="button" role="tab" aria-selected="false" data-pane="musescore">MuseScore</button></div>
<div class="omt-switch-pane" role="tabpanel" data-pane="lilylet" markdown="1">

```lyl.play
[staves "{-}"]

\staff "1" \key e \major \numericTimeSignature \time 4/4 \clef "treble" \stemUp cs'2 b2 \\
\staff "1" \stemDown <ds a'>1 \\
\staff "2" \clef "bass" b,1 | %1

\staff "1" <e gs b>1 \\
\staff "2" e,1 | %2

\staff "1" <ds a' cs>1 \\
\staff "2" b,1 | %3

\staff "1" <e gs b>1 \\
\staff "2" e,1 | %4

\staff "1" \stemUp e'2 ds2 \\
\staff "1" \stemDown <fs cs'>1 \\
\staff "2" b,1 | %5

\staff "1" <gs' b e>1 \\
\staff "2" e,1 | %6

\staff "1" <fs cs' e>1 \\
\staff "2" b,1 | %7

\staff "1" <gs' b e>1 \\
\staff "2" e,1 | %8

\staff "1" \stemUp gs''2 fs2 \\
\staff "1" \stemDown <a' ds>1 \\
\staff "2" b,1 | %9

\staff "1" <gs' b e>1 \\
\staff "2" e,1 | %10

\staff "1" <a' ds gs>1 \\
\staff "2" b,1 | %11

\staff "1" <gs' b e>1 \\
\staff "2" e,1 | %12

\staff "1" <ds g a c>1 \\
\staff "2" b,1 | %13

\staff "1" <e gs b>1 \\
\staff "2" e,1 | %14
```

</div>
<div class="omt-switch-pane omt-embed omt-embed-musescore" role="tabpanel" data-pane="musescore" hidden><iframe data-src="https://musescore.com/user/32728834/scores/12500938/embed" title="MuseScore" loading="lazy" style="height: 900px" allow="autoplay; fullscreen" allowfullscreen></iframe></div>
</div>
<!-- embed-end -->

谱例 9. [扩展音的生成方式](https://musescore.com/user/32728834/scores/12500938/s/okGwec)

## 「假」扩展音与「真」扩展音

需要注意的是，在上述每一个谱例的前半部分，扩展音在和弦变化之前就解决到某个常规和弦音。这就使它更宜解释为一种强拍不协和音，而非扩展音。只有当扩展音持续整个和弦的时值、并*随*和弦变化而解决时，我们才认为它是「真」扩展音。

🎼 [MuseScore 曲谱](https://musescore.com/user/32728834/scores/12501856)

<!-- embed-begin: https://musescore.com/user/32728834/scores/12501856 -->
<div class="omt-switch" data-omt-switch>
<div class="omt-switch-bar" role="tablist"><button type="button" role="tab" aria-selected="true" data-pane="lilylet">Lilylet 乐谱</button><button type="button" role="tab" aria-selected="false" data-pane="musescore">MuseScore</button></div>
<div class="omt-switch-pane" role="tabpanel" data-pane="lilylet" markdown="1">

```lyl.play
[staves "{-}"]

\staff "1" \key e \major \numericTimeSignature \time 3/4 \clef "treble" \tempo "Ziemlich rasch" r4 <gs e'>8[ <b fs'>8 <e gs>8 <fs a>8] \\
\staff "2" \clef "bass" \stemUp r4 b,2~ \\
\staff "2" \stemDown e,,2. \\\
s2 s4 | %1

\staff "1" <e gs>4 <ds fs>8[ <a cs>8 <ds fs>8. <a' cs>16] \\
\staff "2" \stemUp b,4 b2~ \\
\staff "2" \stemDown b,,2. \\\
s2 s4 | %2

\staff "1" <a' cs>4 <gs b>8[ <e gs>8 <gs, e'>8 <e' gs>8] \\
\staff "2" \stemUp b,4 b2~ \\
\staff "2" \stemDown e,,2. \\\
s2 s4 | %3

\staff "1" <e gs>4 <ds fs>8[ <a cs>8 <ds fs>8. <a cs>16] \\
\staff "2" \stemUp b,4 b2~ \\
\staff "2" \stemDown b,,2. \\\
s2 s4 | %4

\staff "1" r4 r8 e8 fs8.[ gs16] \\
\staff "2" \clef "treble" <a cs>4 <gs b>8[ <gs e'>8 <b fs'>8 <e gs>8] \\\
\clef "bass" \stemUp b,4 b2~ \\
\stemDown e,,2. | %5

\staff "1" gs'4 fs4 r4 \\
\staff "2" <e gs>4 <ds fs>8[ <a cs>8 <ds fs>8. <a' cs>16] \\\
\stemUp b,4 b2~ \\
\stemDown b,,2. | %6

\staff "1" r4 r8 gs'8 e8.[ gs16] \\
\staff "2" <a' cs>4 <gs b>8[ <e gs>8 <gs, e'>8 <e' gs>8] \\\
\stemUp b,4 b2~ \\
\stemDown e,,2. | %7

\staff "1" gs'4 fs4 r8 fs8 \\
\staff "2" <e gs>4 <ds fs>8[ <a cs>8 <ds fs>8 <a cs>8] \\\
\stemUp b,4 b2 \\
\stemDown b,,2. | %8
```

</div>
<div class="omt-switch-pane omt-embed omt-embed-musescore" role="tabpanel" data-pane="musescore" hidden><iframe data-src="https://musescore.com/user/32728834/scores/12501856/embed" title="MuseScore" loading="lazy" style="height: 600px" allow="autoplay; fullscreen" allowfullscreen></iframe></div>
</div>
<!-- embed-end -->

谱例 10. [罗伯特·舒曼《林中对话》，选自《歌曲集》Op. 39 No. 3，第 1–8 小节](https://musescore.com/user/32728834/scores/12501856/s/CyuCrc)

在谱例 10 中，我们可以看到舒曼在这首歌的开头使用了属九和弦。九音被当作和弦音来对待，而不是装饰；请注意它是和弦内部的跳进引入的，直到和弦变化才解决。与此相比，谱例 11 中舒伯特用 F♭ 在第 5 小节制造了属音上方的一个九度。这个九度在和弦变化之前就下行级进解决。这是一个「假」九音的例子，更宜解释为强拍不协和音，而非「真」的和弦扩展音。

🎼 [MuseScore 曲谱](https://musescore.com/user/32728834/scores/12522556)

<!-- embed-begin: https://musescore.com/user/32728834/scores/12522556 -->
<div class="omt-switch" data-omt-switch>
<div class="omt-switch-bar" role="tablist"><button type="button" role="tab" aria-selected="true" data-pane="lilylet">Lilylet 乐谱</button><button type="button" role="tab" aria-selected="false" data-pane="musescore">MuseScore</button></div>
<div class="omt-switch-pane" role="tabpanel" data-pane="lilylet" markdown="1">

```lyl.play
[staves "{-}"]

\staff "1" \key af \major \numericTimeSignature \time 3/4 \clef "treble" \tempo "Allegretto" cf''16[ ef16 cf16 af16] af16[ cf16 af16 ef16] ef16[ af16 ef16 cf16] \\
\staff "2" \clef "bass" af,4-. <af' cf ef>2~ | %1

\staff "1" cf'16[ ef16 cf16 af16] af16[ cf16 af16 ef16] <g bf>8-! r8 \\
\staff "2" <af c ef>2 <ef bf' ef>8 r8 | %2

\staff "1" cf''16[ ef16 cf16 af16] af16[ cf16 af16 ef16] ef16[ af16 ef16 cf16] \\
\staff "2" af,4 <af' cf ef>2~ | %3

\staff "1" cf'16[ ef16 cf16 af16] af16[ cf16 af16 ef16] <g bf>8-! r8 \\
\staff "2" <af c ef>2 <ef bf' ef>8 r8 | %4

\staff "1" <af' cf>4-. <g bf ff'>4-. <g bf ff'>4-. \\
\staff "2" <af cf ef>4-. <ef bf' ff'>4-. <ef bf' ff'>4-. | %5

\staff "1" <g' bf ff'>4-. <g bf ef>4-. <g bf df>4-. \\
\staff "2" <ef, bf' ff'>4-. <ef bf' ef>4-. <ef bf' df>4-. | %6

\staff "1" cf''16[ ef16 cf16 af16] af16[ cf16 af16 ef16] ef16[ af16 ef16 cf16] \\
\staff "2" af,4-. <af' cf ef>2~ | %7

\staff "1" cf'16[ ef16 cf16 af16] af16[ cf16 af16 ef16] <g bf>8-! r8 \\
\staff "2" <af c ef>2 <ef bf' ef>8 r8 | %8
```

</div>
<div class="omt-switch-pane omt-embed omt-embed-musescore" role="tabpanel" data-pane="musescore" hidden><iframe data-src="https://musescore.com/user/32728834/scores/12522556/embed" title="MuseScore" loading="lazy" style="height: 600px" allow="autoplay; fullscreen" allowfullscreen></iframe></div>
</div>
<!-- embed-end -->

谱例 11. [舒伯特《即兴曲》Op. 90 No. 4，第 1–8 小节](https://musescore.com/user/32728834/scores/12522556/s/9pAfHu)

同样，请听下面谱例 12 中舒伯特的《高贵圆舞曲》（*Valse noble*）。请注意，十三音虽然在旋律中很突出，却总是在和弦变化之前下行级进解决。这个十三音最好解释为倚音，而不是和弦的「真」成员。与此相比，请看谱例 13 中舒伯特的《感伤圆舞曲》（*Valse sentimentale*）。除贯穿全段使用的若干「真」九音之外，第 7 小节的终止属和弦还含有低音上方的一个十三音，它由跳进引入、也由跳进离开——这是真正的和弦扩展音。

🎼 [MuseScore 曲谱](https://musescore.com/user/32728834/scores/12523291)

<!-- embed-begin: https://musescore.com/user/32728834/scores/12523291 -->
<div class="omt-switch" data-omt-switch>
<div class="omt-switch-bar" role="tablist"><button type="button" role="tab" aria-selected="true" data-pane="lilylet">Lilylet 乐谱</button><button type="button" role="tab" aria-selected="false" data-pane="musescore">MuseScore</button></div>
<div class="omt-switch-pane" role="tabpanel" data-pane="lilylet" markdown="1">

```lyl.play
[staves "{-}"]

\staff "1" \key g \major \numericTimeSignature \time 3/4 \clef "treble" <e' e'>4.-> <d d'>8 <d d'>4 \\
\staff "2" \clef "bass" fs,4 <c' d a'>4 <c d a'>4 | %1

\staff "1" <b' b'>2 <as as'>8[ <b b'>8] \\
\staff "2" g4 <b d g>4 <b d g>4 | %2

\staff "1" <e' e'>4.-> <d d'>8 <d d'>4 \\
\staff "2" fs,4 <c' d a'>4 <c d a'>4 | %3

\staff "1" <b' b'>2 <cs cs'>8[ <d d'>8] \\
\staff "2" g4 <b d g>4 <b d g>4 | %4

\staff "1" <b'' b'>4. <a a'>8 <a a'>4 \\
\staff "2" d,4 <c' d fs>4 <c d fs>4 | %5

\staff "1" <fs' fs'>4. <a a'>8 <g g'>4 \\
\staff "2" g4 <b d g>4 <b d g>4 | %6

\staff "1" <e' e'>4. <d d'>8 <d d'>4 \\
\staff "2" d,4 <c' d fs>4 <c d fs>4 | %7

\staff "1" <b'' b'>2 s4 \\
\staff "2" g4 <b d g>4 s4 | %8
```

</div>
<div class="omt-switch-pane omt-embed omt-embed-musescore" role="tabpanel" data-pane="musescore" hidden><iframe data-src="https://musescore.com/user/32728834/scores/12523291/embed" title="MuseScore" loading="lazy" style="height: 400px" allow="autoplay; fullscreen" allowfullscreen></iframe></div>
</div>
<!-- embed-end -->

谱例 12. [舒伯特《高贵圆舞曲》D. 969 No. 4，第 1–8 小节](https://musescore.com/user/32728834/scores/12523291/s/20DEyp)

🎼 [MuseScore 曲谱](https://musescore.com/user/32728834/scores/12523381)

<!-- embed-begin: https://musescore.com/user/32728834/scores/12523381 -->
<div class="omt-switch" data-omt-switch>
<div class="omt-switch-bar" role="tablist"><button type="button" role="tab" aria-selected="true" data-pane="lilylet">Lilylet 乐谱</button><button type="button" role="tab" aria-selected="false" data-pane="musescore">MuseScore</button></div>
<div class="omt-switch-pane" role="tabpanel" data-pane="lilylet" markdown="1">

```lyl.play
[staves "{-}"]

\staff "1" \key c \major \numericTimeSignature \time 3/4 \partial 4 \clef "treble" e'4 \\
\staff "2" \clef "bass" r4 | %1

\staff "1" cs'4 d8 r8 <b d a'>4 \\
\staff "2" g,4 <g' b f'>4 <g d' f>4 | %2

\staff "1" \stemUp a''2 g4 \\
\staff "1" \stemDown <c' e>2. \\
\staff "2" c,4 <g' c e>4 <g c e>4 | %3

\staff "1" f'8[ e8 f8 g,8 b8 f'8] \\
\staff "2" g,4 <g' d' f>4 <g d' f>4 | %4

\staff "1" g'8[ e'8 c8 g8 c8 e8] \\
\staff "2" c,4 <g' c e>4 <g c e>4 | %5

\staff "1" cs'4 d8 r8 <b d a'>4 \\
\staff "2" g,4 <g' b f'>4 <g d' f>4 | %6

\staff "1" \stemUp a''2 g4 \\
\staff "1" \stemDown <c' e>2. \\
\staff "2" c,4 <g' c e>4 <g c e>4 | %7

\staff "1" f'8[ e8 f8 g,8 b8 e8] \\
\staff "2" g,4 <g' b f'>4 <g d' f>4 | %8

\staff "1" c'2 s4 \\
\staff "2" c,4 <g' c e>4 s4 | %9
```

</div>
<div class="omt-switch-pane omt-embed omt-embed-musescore" role="tabpanel" data-pane="musescore" hidden><iframe data-src="https://musescore.com/user/32728834/scores/12523381/embed" title="MuseScore" loading="lazy" style="height: 394px" allow="autoplay; fullscreen" allowfullscreen></iframe></div>
</div>
<!-- embed-end -->

谱例 13. [舒伯特《感伤圆舞曲》D. 779 No. 17，第 1–8 小节](https://musescore.com/user/32728834/scores/12523381/s/iPar8M)

### 为十一音辩护

与九音和十三音不同，十一音在西欧艺术音乐曲目中要罕见得多。这大概是因为十一音替换的是和弦的三音，而三音正是标示和弦性质的和弦音（对属和弦来说，还标示其功能）。请看下面谱例 14 中福雷（Fauré）的例子。整个段落中，属和弦都没有三音，多数情况下以四音（即十一音）代之。从属到主的整体功能感特别弱，而贯穿全段的主音持续音更削弱了这种感觉。

🎼 [MuseScore 曲谱](https://musescore.com/user/32728834/scores/12523876)

<!-- embed-begin: https://musescore.com/user/32728834/scores/12523876 -->
<div class="omt-switch" data-omt-switch>
<div class="omt-switch-bar" role="tablist"><button type="button" role="tab" aria-selected="true" data-pane="lilylet">Lilylet 乐谱</button><button type="button" role="tab" aria-selected="false" data-pane="musescore">MuseScore</button></div>
<div class="omt-switch-pane" role="tabpanel" data-pane="lilylet" markdown="1">

```lyl.play
[staves ",{-}"]

\key d \major \numericTimeSignature \time 2/4 \clef "treble" \tempo "Andantino" R2 \\\
\staff "1" \clef "treble" \stemUp fs2 \\
\staff "1" \stemDown d4-> e8[ d8] \\
\staff "2" \clef "bass" \stemUp fs,2 \\
\staff "2" \stemDown d,,8 a'4 a'8 | %1

R2 \\\
\staff "1" \stemUp fs2 \\
\staff "1" \stemDown cs4-> d8[ cs8] \\
\staff "2" \stemUp fs,2 \\
\staff "2" \stemDown d,,8 a'4 a'8 | %2

R2 \\\
\staff "1" \stemUp <d e g>2 \\
\staff "1" \stemDown b4-> cs8[ b8] \\
\staff "2" d,,8 a'4 a'8 | %3

R2 \\\
\staff "1" \stemUp <d fs a>4 <d e g>4 \\
\staff "1" \stemDown a8.->[ b16] a8.->[ b16] \\
\staff "2" d,,8 a'4 a'8 | %4

R2 \\\
\staff "1" \stemUp <d fs a>4 <d e g>4 \\
\staff "1" \stemDown a8.->[ b16] a8.->[ b16] \\
\staff "2" d,,8 a'4 a'8 | %5

R2 \\\
\staff "1" <a d fs a>2->~ \\
\staff "2" d,,8 a'4 a'8 | %6

r4 r8 fs8 \\\
\staff "1" <a d fs a>2~ \\
\staff "2" d,,8 a'4 a'8 | %7

a'4 d,8 e16 g16 \\\
\staff "1" <a d fs a>4 <b d e g>4 \\
\staff "2" d,,8 a'4 a'8 | %8

a'8 a16 d,16 d8 e16 g16 \\\
\staff "1" <a d fs a>4 <b d fs g>4 \\
\staff "2" d,,8 a'4 a'8 | %9

a'4 a8 a16 b16 \\\
\staff "1" \stemUp <fs a>2 \\
\staff "1" \stemDown d4-> e8[ d8] \\
\staff "2" d,,8 a'4 a'8 | %10

cs'8 b16 a16 fs8. fs16 \\\
\staff "1" \stemUp <fs a>2 \\
\staff "1" \stemDown cs4-> d8[ cs8] \\
\staff "2" d,,8 a'4 a'8 | %11

a'4~ a16 e16 fs16 g16 \\\
\staff "1" \stemUp <d fs>4 <e g>4 \\
\staff "1" \stemDown b4-> cs8[ b8] \\
\staff "2" d,,8 a'4 a'8 | %12

fs2 \\\
\staff "1" \stemUp <d fs a>4 <a fs' a>4 \\
\staff "1" \stemDown a8.->[ b16] a8.->[ b16] \\
\staff "2" d,,8 a'4 a'8 | %13

R2 \\\
\staff "1" \stemUp <d fs a>4 s4 \\
\staff "1" \stemDown a8.->[ b16] s4 \\
\staff "2" d,,8 a'4 a'8 | %14
```

</div>
<div class="omt-switch-pane omt-embed omt-embed-musescore" role="tabpanel" data-pane="musescore" hidden><iframe data-src="https://musescore.com/user/32728834/scores/12523876/embed" title="MuseScore" loading="lazy" style="height: 1000px" allow="autoplay; fullscreen" allowfullscreen></iframe></div>
</div>
<!-- embed-end -->

谱例 14. [福雷《伊斯法罕的玫瑰》Op. 39 No. 4，第 1–14 小节](https://musescore.com/user/32728834/scores/12523876/s/5uKnDa)

有时，和弦扩展音也可以用非属和弦上，如谱例 15 的情况。这里，ii 和弦带有七音，同时还有九音和十一音。十一音是作为「真正的」十一音呈现的，排列在七音与九音之上，这与上面福雷的例子不同——那里十一音写作四音（听起来更像未解决的延留音）。这样的排列在流行音乐中要常见得多，比如谱例 16 中 The Emotions 的歌曲。这里，属和弦呈现为「真正的」十一和弦，或者按许多流行乐手习惯的说法，是一个「IV 叠在 V 上」的和弦，即 F 大三和弦在 G 低音之上作响。

 

🎼 [MuseScore 曲谱](https://musescore.com/user/32728834/scores/12524053)

<!-- embed-begin: https://musescore.com/user/32728834/scores/12524053 -->
<div class="omt-switch" data-omt-switch>
<div class="omt-switch-bar" role="tablist"><button type="button" role="tab" aria-selected="true" data-pane="lilylet">Lilylet 乐谱</button><button type="button" role="tab" aria-selected="false" data-pane="musescore">MuseScore</button></div>
<div class="omt-switch-pane" role="tabpanel" data-pane="lilylet" markdown="1">

```lyl.play
[staves "{-}"]

\staff "1" \key e \major \defaultTimeSignature \time 2/2 \clef "treble" \stemUp gs''2 fs2 \\
\staff "1" \stemDown <b' e>1~ \\
\staff "2" \clef "bass" <e e>2~ ds2 | %1

\staff "1" \stemUp a''2 gs2 \\
\staff "1" \stemDown <e' e>2~ ds2 \\
\staff "2" \stemUp e1~ \\
\staff "2" \stemDown cs2 b2 | %2

\staff "1" \stemUp cs''2 b2 \\
\staff "1" \stemDown <cs' e>2 <b e gs>2 \\
\staff "2" \stemUp e2 s2 \\
\staff "2" \stemDown a2 gs2 | %3

\staff "1" \stemUp <gs'' b>2. <fs a>4 \\
\staff "1" \stemDown <cs' e>2 <b ds>2 \\
\staff "2" fs,2 b2 | %4

\staff "1" \stemUp gs''2 fs2 \\
\staff "1" \stemDown <b' e>1~ \\
\staff "2" <e gs>2 e1~ <ds fs>2 | %5

\staff "1" \stemUp a''2 gs2 \\
\staff "1" \stemDown a'2~ e'1 gs,2 \\
\staff "2" <cs e e>2~ <b ds>2 | %6

\staff "1" \stemUp cs''2 b2 \\
\staff "1" \stemDown cs'2 e1 b2 \\
\staff "2" \stemUp e1 \\
\staff "2" \stemDown a2 <gs b>2 | %7

\staff "1" \stemUp b''2. a4 \\
\staff "1" \stemDown <e' gs>2 <ds fs>2 \\
\staff "2" \stemUp <a cs e>2 ds2 \\
\staff "2" \stemDown fs,2 b2 | %8

\staff "1" \stemUp gs''2 s2 \\
\staff "1" \stemDown e'2 s2 \\
\staff "2" \stemUp e2 s2 \\
\staff "2" \stemDown e,2 s2 | %9
```

</div>
<div class="omt-switch-pane omt-embed omt-embed-musescore" role="tabpanel" data-pane="musescore" hidden><iframe data-src="https://musescore.com/user/32728834/scores/12524053/embed" title="MuseScore" loading="lazy" style="height: 394px" allow="autoplay; fullscreen" allowfullscreen></iframe></div>
</div>
<!-- embed-end -->

谱例 15. [门德尔松《仲夏夜之梦》Op. 21 序曲，第 450–458 小节](https://musescore.com/user/32728834/scores/12524053/s/SVxjDI)

🎼 [MuseScore 曲谱](https://musescore.com/user/32728834/scores/12524245)

<!-- embed-begin: https://musescore.com/user/32728834/scores/12524245 -->
<div class="omt-switch" data-omt-switch>
<div class="omt-switch-bar" role="tablist"><button type="button" role="tab" aria-selected="true" data-pane="lilylet">Lilylet 乐谱</button><button type="button" role="tab" aria-selected="false" data-pane="musescore">MuseScore</button></div>
<div class="omt-switch-pane" role="tabpanel" data-pane="lilylet" markdown="1">

```lyl.play
[staves "{-}"]

\staff "1" \key c \major \numericTimeSignature \time 4/4 \clef "treble" <a' c f g>16[ <a c f g>16] r8 r8 <a c f g>16[ <a c f g>16] r4 <a c f g>16[ <a c f g>16] r8 \\
\staff "2" \clef "bass" g8[ g,8 g8 g'8] g,8[ g8 g'8] r8 | %1

\staff "1" r4 r8 <a' c f g>16[ <a c f g>16] <a c f g>16[ <a c f g>16] r8 r4 \\
\staff "2" g,,4 g4 g4 g'4 | %2
```

</div>
<div class="omt-switch-pane omt-embed omt-embed-musescore" role="tabpanel" data-pane="musescore" hidden><iframe data-src="https://musescore.com/user/32728834/scores/12524245/embed" title="MuseScore" loading="lazy" style="height: 394px" allow="autoplay; fullscreen" allowfullscreen></iframe></div>
</div>
<!-- embed-end -->

谱例 16. [The Emotions《Best of My Love》第 1–2 小节](https://musescore.com/user/32728834/scores/12524245/s/9En1Zn)

像最后两个这样的例子进一步说明：扩展音是由排列与线性上下文来定义的，而且事实上，它们开始动摇三度和声里整个功能概念——究竟是由低音决定功能，还是由和弦的内容决定？最后一个例子，我们来看塞萨尔·弗兰克《A 大调小提琴奏鸣曲》优美的开头，见谱例 17。这个乐章在调性模糊中开始，在两个功能似乎被完全压制的和弦之间交替。开头的 V9 和弦「倒退」进行到一个看起来像是 ii13、并且还含十一音的和弦时，就失去了属功能的感觉。另一方面，人们也可以把这个和弦解释为第 1 小节所听到的同一个 V9 和弦的「转位」。当小提琴进入时，人们更有理由把第 2 小节的和弦听成 ii，这次还有小提琴上琶音的 b 小调三和弦作为支撑。最终，调性在 A 大调中稳定下来，到达主和弦。当然，主和弦因升 F 的存在而有所削弱——升 F 下行级进解决，却在提琴旋律中被悬置着。

🎼 [MuseScore 曲谱](https://musescore.com/user/32728834/scores/12524392)

<!-- embed-begin: https://musescore.com/user/32728834/scores/12524392 -->
<div class="omt-switch" data-omt-switch>
<div class="omt-switch-bar" role="tablist"><button type="button" role="tab" aria-selected="true" data-pane="lilylet">Lilylet 乐谱</button><button type="button" role="tab" aria-selected="false" data-pane="musescore">MuseScore</button></div>
<div class="omt-switch-pane" role="tabpanel" data-pane="lilylet" markdown="1">

```lyl.play
[staves ",{-}"]

\key a \major \numericTimeSignature \time 9/8 \clef "treble" \tempo "Allegretto ben moderato" R1 \\\
\staff "1" \clef "treble" \stemUp r4 b'8 d2. \\
\staff "1" \stemDown <d fs>2. <d fs>4. \\
\staff "2" \clef "bass" <e, gs>2. <e gs>4. | %1

R1 \\\
\staff "1" \stemUp r4 fs8 b2. \\
\staff "1" \stemDown <gs d'>2. <gs d'>4. \\
\staff "2" <b, e>2.~ <b e>4. | %2

R1 \\\
\staff "1" \stemUp r4 b'8 fs'2. \\
\staff "1" \stemDown <d fs>2. <d fs>4. \\
\staff "2" <e, gs>2. <e gs>4. | %3

R1 \\\
\staff "1" \stemUp r4 fs8 d'2. \\
\staff "1" \stemDown <gs d'>2. <gs d'>4. \\
\staff "2" <b, e>2.~ <b e>4. | %4

r4 d'8 fs4 d8 b4 gs8 \\\
\staff "1" <gs d' fs>2. <gs d' fs>4. \\
\staff "2" <e,,, e'>2. <e e'>4. | %5

fs4 b8 d2. \\\
\staff "1" <fs, d' fs>2.~ <fs d' fs>4. \\
\staff "2" <b,, b'>2. <b b'>4. | %6

r4 d'8 fs4 d8 b4 fs8 \\\
\staff "1" <gs d' fs>2. <gs d' fs>4. \\
\staff "2" <e,,, e'>2. <e e'>4. | %7

fs4 a8 cs2. \\\
\staff "1" fs4. e2. \\
\staff "2" \stemUp <a,, a'>2.~ <a a'>4. \\
\staff "2" \stemDown <gs' b>2 s4 <gs b>4 s8 | %8
```

</div>
<div class="omt-switch-pane omt-embed omt-embed-musescore" role="tabpanel" data-pane="musescore" hidden><iframe data-src="https://musescore.com/user/32728834/scores/12524392/embed" title="MuseScore" loading="lazy" style="height: 600px" allow="autoplay; fullscreen" allowfullscreen></iframe></div>
</div>
<!-- embed-end -->

谱例 17. [弗兰克《A 大调小提琴奏鸣曲》第一乐章第 1–8 小节](https://musescore.com/user/32728834/scores/12524392/s/RHEZXU)

> 作业

1. 声部写作与分析（[.docx](https://viva.pressbooks.pub/app/uploads/sites/12/2020/01/OMT-Altered-and-Extended-Dominants.docx)，[.pdf](https://viva.pressbooks.pub/app/uploads/sites/12/2020/01/OMT-Altered-and-Extended-Dominants.pdf)）
