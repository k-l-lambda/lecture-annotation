---
title: "半音转调"
slug: "reinterpreting-augmented-sixth-chords"
source: "https://viva.pressbooks.pub/openmusictheory/chapter/reinterpreting-augmented-sixth-chords/"
authors: ["Bryn Hughes"]
license: "CC BY-SA 4.0"
modified: "2024-10-16"
---

# 半音转调

> **要点**
>
> - 调式混合为枢轴和弦提供了多得多的选择，从而提供了一种转调到远关系调的简便方法。
> - 有时作曲家会干脆用一个"枢轴音"而不是枢轴和弦来转调。这样可以有更多选择进入远关系调。
> - 属七和弦与德国（以及意大利）增六和弦在等音上等同。这使你可以把它们当作枢轴和弦，转入比主调高半音或低半音的调。
> - 副属和弦在等音重新解释之后，同样可以用作枢轴和弦，使转调的可能性几乎无穷无尽。
> - 减七和弦同样可以作等音重新解释，这意味着它们可以按四种不同的方式解决到四个不同的调。

## 半音转调

转调到近关系调是相对容易的事；我们可以在两个调号几乎相同的调所共享的那组和弦中找到一个枢轴和弦。这样的和弦有很多。见谱例 1：![](../media/2020/01/chromatic-modulation-closely-related-keys.png)

<!-- lilylet-begin: media/2020/01/chromatic-modulation-closely-related-keys.png -->
```lyl.play
\omit Score.TimeSignature \omit Score.BarLine \time 7/4 \key c \major \clef "treble" <c e g>4_\markup "*" \chords "C" <d f a> \chords "Dm" <e g b>_\markup "*" \chords "Em" <f a c> \chords "F" <g b d>_\markup "*" \chords "G" <a c e>_\markup "*" \chords "Am" <b d f> \chords "Bdim"
\addlyrics { I ii iii IV V vi vii° } | %1

\key g \major <g' b d>4_\markup "*" \chords "G" <a c e>_\markup "*" \chords "Am" <b d fs> \chords "Bm" <c e g>_\markup "*" \chords "C" <d fs a> \chords "D" <e g b>_\markup "*" \chords "Em" <fs a c> \chords "F♯dim"
\addlyrics { I ii iii IV V vi vii° } | %2
```
<!-- lilylet-end -->
谱例 1. C 大调与 G 大调共有的和弦。

然而，当两个调在五度圈上相差一个以上的变音记号时，要找到一个能使两调之间平滑转调的枢轴和弦就变得更为困难。

要转调到远关系调，即在五度圈上相差一个以上变音记号的调，就需要运用我们对半音和弦（例如通过调式混合得到的那些和弦）的知识。调式混合使我们能够扩大可用于转调的枢轴和弦的数量。例如，在 C 大调中，通过调式混合成为可能的那些和弦（即在它的同主音调 c 小调中出现的和弦），使我们如今可以轻易地转调到 E♭ 大调（7 个共有和弦）、A♭ 大调（4 个共有和弦）、B♭ 大调（3 个共有和弦），以及它们的近关系小调 f 小调和 g 小调。谱例 2 展示的是 C 大调与 E♭ 大调共有的和弦，它们由于在 C 大调中使用调式混合和弦而成为可能。

 

![](../media/2020/01/distantly-related-keys-mixture-to-diatonic.png)谱例 2. C 大调与 E♭ 大调共有的和弦，它们通过调式混合而成为可能。 

<!-- lilylet-begin: media/2020/01/distantly-related-keys-mixture-to-diatonic.png -->
```lyl.play
[staves ",,"]

\omit Score.TimeSignature \omit Score.BarLine \time 1/4 \key c \major \clef "treble" <ef g bf>4 \chords "E♭"
\addlyrics { I } \\\\
\clef "treble" <c ef g>4^\markup "7 chords in common with row 1" \chords "Cm"
\addlyrics { i } \\\\
\clef "treble" <c e g>4^\markup "0 chords in common with row 1" \chords "C"
\addlyrics { I } | %1

<f af c>4 \chords "Fm"
\addlyrics { ii } \\\\
<d f af>4 \chords "Ddim"
\addlyrics { ii° } \\\\
<d f a>4 \chords "Dm"
\addlyrics { ii } | %2

<g' bf d>4 \chords "Gm"
\addlyrics { iii } \\\\
<ef g bf>4 \chords "E♭"
\addlyrics { ♭III } \\\\
<e g b>4 \chords "Em"
\addlyrics { iii } | %3

<af' c ef>4 \chords "A♭"
\addlyrics { IV } \\\\
<f af c>4 \chords "Fm"
\addlyrics { iv } \\\\
<f a c>4 \chords "F"
\addlyrics { IV } | %4

<bf' d f>4 \chords "B♭"
\addlyrics { V } \\\\
<g' bf d>4 \chords "Gm"
\addlyrics { v } \\\\
<g' b d>4 \chords "G"
\addlyrics { V } | %5

<c' ef g>4 \chords "Cm"
\addlyrics { vi } \\\\
<af' c ef>4 \chords "A♭"
\addlyrics { ♭VI } \\\\
<a' c e>4 \chords "Am"
\addlyrics { vi } | %6

<d' f af>4 \chords "Ddim"
\addlyrics { vii° } \\\\
<bf' d f>4 \chords "B♭"
\addlyrics { ♭VII } \\\\
<b' d f>4 \chords "Bdim"
\addlyrics { vii° } | %7
```
<!-- lilylet-end -->
谱例 3 展示了从 A 大调转调到 F 大调，用 A 大调的 iv 作为枢轴和弦。谱例 4 展示了威尔第（Verdi）在其歌剧《弄臣》（*Rigoletto*）中运用这一手法。

🎼 [MuseScore 乐谱](https://musescore.com/user/32728834/scores/8935623)

<!-- embed-begin: https://musescore.com/user/32728834/scores/8935623 -->
<div class="omt-switch" data-omt-switch>
<div class="omt-switch-bar" role="tablist"><button type="button" role="tab" aria-selected="true" data-pane="lilylet">Lilylet 乐谱</button><button type="button" role="tab" aria-selected="false" data-pane="musescore">MuseScore</button></div>
<div class="omt-switch-pane" role="tabpanel" data-pane="lilylet" markdown="1">

```lyl.play
[staves "{-}"]

\staff "1" \key a \major \numericTimeSignature \time 4/4 \clef "treble" \stemUp cs'2 d2 \\
\staff "1" \stemDown <e a>2 <e gs>2 \\
\staff "2" \clef "bass" a,2 b2 | %1

\staff "1" \stemUp e'2 d2 \\
\staff "1" \stemDown <e a>2 <f a>2 \\
\staff "2" cs,2 d2 | %2

\staff "1" \stemUp g''2 e2 \\
\staff "1" \stemDown <g' d'>2 <g bf>2 \\
\staff "2" bf,2 c2 | %3

\staff "1" <f a f'>1 \\
\staff "2" f,,1 | %4
```

</div>
<div class="omt-switch-pane omt-embed omt-embed-musescore" role="tabpanel" data-pane="musescore" hidden><iframe data-src="https://musescore.com/user/32728834/scores/8935623/embed" title="MuseScore" loading="lazy" style="height: 330px" allow="autoplay; fullscreen" allowfullscreen></iframe></div>
</div>
<!-- embed-end -->

谱例 3. 用 A 大调中的调式混合和弦（iv）作为枢轴和弦，从 A 大调转调到 F 大调。 

🎼 [MuseScore 乐谱](https://musescore.com/user/32728834/scores/8935767)

<!-- embed-begin: https://musescore.com/user/32728834/scores/8935767 -->
<div class="omt-switch" data-omt-switch>
<div class="omt-switch-bar" role="tablist"><button type="button" role="tab" aria-selected="true" data-pane="lilylet">Lilylet 乐谱</button><button type="button" role="tab" aria-selected="false" data-pane="musescore">MuseScore</button></div>
<div class="omt-switch-pane" role="tabpanel" data-pane="lilylet" markdown="1">

```lyl.play
[staves "{-}"]

\staff "1" \key df \major \defaultTimeSignature \time 4/4 \clef "treble" \stemUp e16[ f16] s8 r4 r8 df'8[ ef8 ff8] \\
\staff "1" \stemDown s8 r8 s4 bff'2 \\
\staff "2" \clef "bass" <df,, df'>8[ <f' af df>8 <f af df>8 <f af df>8] <df, df'>8[ <ff' bff df>8 <ff bff df>8 <ff bff df>8] | %1

\staff "1" \stemUp ff'2 ff8[ ef8 df8 cf8] \\
\staff "1" \stemDown <af' cf>2 <gf bff>2 \\
\staff "2" <cf,, cf'>8[ <ff' af cf>8 <ff af cf>8 <ff af cf>8] <cf, cf'>8[ <ef' bff' cf>8 <ef bff' cf>8 <ef bff' cf>8] | %2

\staff "1" \stemUp cf'4 af4 s2 \\
\staff "1" \stemDown ff2 s2 \\
\staff "2" <ff,, ff'>8[ <ff' af cf>8 <ff af cf>8 <ff af cf>8] s2 | %3
```

</div>
<div class="omt-switch-pane omt-embed omt-embed-musescore" role="tabpanel" data-pane="musescore" hidden><iframe data-src="https://musescore.com/user/32728834/scores/8935767/embed" title="MuseScore" loading="lazy" style="height: 365px" allow="autoplay; fullscreen" allowfullscreen></iframe></div>
</div>
<!-- embed-end -->

谱例 4. 用 D♭ 大调中的调式混合和弦（♭VI<sup>6</sup>）作为枢轴和弦，从 D♭ 大调转调到 F♭ 大调。 

反过来，我们也可以把旧调中的自然音和弦当作新调中的调式混合和弦，从而在五度圈上"升号方向"转调到远关系调。谱例 5 展示了从 C 大调转调到 A 大调时，把 C 大调中的自然音和弦当作新调 A 大调中的调式混合和弦时可能使用的枢轴和弦。

![](../media/2020/01/distantly-related-keys-diatonic-to-mixture.png)

<!-- lilylet-begin: media/2020/01/distantly-related-keys-diatonic-to-mixture.png -->
```lyl.play
[staves ",,"]

\omit Score.TimeSignature \omit Score.BarLine \time 1/4 \key a \major \clef "treble" <a' cs e>4 \chords "A"
\addlyrics { I } \\\\
\clef "treble" <a' c e>4 \chords "Am"
\addlyrics { i } \\\\
\clef "treble" <c e g>4^\markup "7 chords in common with row 2, 0 with row 1" \chords "C"
\addlyrics { I } | %1

<b' d fs>4 \chords "Bm"
\addlyrics { ii } \\\\
<b' d f>4 \chords "Bdim"
\addlyrics { ii° } \\\\
<d f a>4 \chords "Dm"
\addlyrics { ii } | %2

<cs' e gs>4 \chords "C♯m"
\addlyrics { iii } \\\\
<c' e g>4 \chords "C"
\addlyrics { ♭III } \\\\
<e g b>4 \chords "Em"
\addlyrics { iii } | %3

<d' fs a>4 \chords "D"
\addlyrics { IV } \\\\
<d' f a>4 \chords "Dm"
\addlyrics { iv } \\\\
<f a c>4 \chords "F"
\addlyrics { IV } | %4

<e' gs b>4 \chords "E"
\addlyrics { V } \\\\
<e' g b>4 \chords "Em"
\addlyrics { v } \\\\
<g' b d>4 \chords "G"
\addlyrics { V } | %5

<fs' a cs>4 \chords "F♯m"
\addlyrics { vi } \\\\
<f' a c>4 \chords "F"
\addlyrics { ♭VI } \\\\
<a' c e>4 \chords "Am"
\addlyrics { vi } | %6

<gs'' b d>4 \chords "G♯dim"
\addlyrics { vii° } \\\\
<g'' b d>4 \chords "G"
\addlyrics { ♭VII } \\\\
<b' d f>4 \chords "Bdim"
\addlyrics { vii° } | %7
```
<!-- lilylet-end -->
谱例 5. 从 C 大调转调到 A 大调时可能的枢轴和弦。 

谱例 6 展示了在众赞歌语境中运用这一手法的一次转调。

🎼 [MuseScore 乐谱](https://musescore.com/user/32728834/scores/8935728)

<!-- embed-begin: https://musescore.com/user/32728834/scores/8935728 -->
<div class="omt-switch" data-omt-switch>
<div class="omt-switch-bar" role="tablist"><button type="button" role="tab" aria-selected="true" data-pane="lilylet">Lilylet 乐谱</button><button type="button" role="tab" aria-selected="false" data-pane="musescore">MuseScore</button></div>
<div class="omt-switch-pane" role="tabpanel" data-pane="lilylet" markdown="1">

```lyl.play
[staves "{-}"]

\staff "1" \key af \major \numericTimeSignature \time 4/4 \clef "treble" \stemUp c'2 df2 \\
\staff "1" \stemDown <ef af>2 <ef bf'>2 \\
\staff "2" \clef "bass" af2 g2 | %1

\staff "1" \stemUp c'2 c2 \\
\staff "1" \stemDown <ef af>2 <f af>2 \\
\staff "2" af2 f2 | %2

\staff "1" \stemUp c'2 b2 \\
\staff "1" \stemDown <f af>2 <f g>2 \\
\staff "2" d,2 g2 | %3

\staff "1" <e g c>1 \\
\staff "2" c,1 | %4
```

</div>
<div class="omt-switch-pane omt-embed omt-embed-musescore" role="tabpanel" data-pane="musescore" hidden><iframe data-src="https://musescore.com/user/32728834/scores/8935728/embed" title="MuseScore" loading="lazy" style="height: 330px" allow="autoplay; fullscreen" allowfullscreen></iframe></div>
</div>
<!-- embed-end -->

谱例 6. 用 A♭ 大调中的自然音和弦（vi）作为枢轴和弦，把它解释为 C 大调中的调式混合和弦（iv），从而从 A♭ 大调转调到 C 大调。 

谱例 7 展示了勃拉姆斯（Brahms）《圆舞曲》Op. 39 第 14 首中一次有趣的半音转调。在这里，勃拉姆斯用局部调性 G 大调中自然音的 vii<sup>o6</sup> 和弦作为枢轴，转入 E 大调，把这个和弦重新解释为新调 E 大调中的调式混合和弦 ii<sup>o6</sup>。

🎼 [MuseScore 乐谱](https://musescore.com/user/32728834/scores/9010358)

<!-- embed-begin: https://musescore.com/user/32728834/scores/9010358 -->
<div class="omt-switch" data-omt-switch>
<div class="omt-switch-bar" role="tablist"><button type="button" role="tab" aria-selected="true" data-pane="lilylet">Lilylet 乐谱</button><button type="button" role="tab" aria-selected="false" data-pane="musescore">MuseScore</button></div>
<div class="omt-switch-pane" role="tabpanel" data-pane="lilylet" markdown="1">

```lyl.play
[staves "{-}"]

\staff "1" \key b \major \numericTimeSignature \time 3/4 \clef "treble" <g' d' g>8-.[ <c d a'>8-.] <d b'>4.-> <a fs'>8 \\
\staff "2" \clef "bass" g,8[ d'8 d'8 d,8 d,8 <d' d'>8] | %1

\staff "1" <b' g'>4 r8 <b g'>8 <c fs>4 \\
\staff "2" g,8[ d'8 d'8 d,8 a8 <c c'>8] | %2

\staff "1" <a' ds>4 r8 <a ds>8 <fs b>4 \\
\staff "2" b,8[ fs'8 b8 fs8 ds8 b'8] | %3

\staff "1" <b' e gs>4 r4 r4 \\
\staff "2" e,,8[ b'8 b'8 b,8] r4 | %4
```

</div>
<div class="omt-switch-pane omt-embed omt-embed-musescore" role="tabpanel" data-pane="musescore" hidden><iframe data-src="https://musescore.com/user/32728834/scores/9010358/embed" title="MuseScore" loading="lazy" style="height: 440px" allow="autoplay; fullscreen" allowfullscreen></iframe></div>
</div>
<!-- embed-end -->

谱例 7. 用 G 大调中的自然音和弦（viio6）作为枢轴和弦，把它解释为 E 大调中的调式混合和弦（iio6），从而从 G 大调转调到 E 大调。 

#### 共同音转调

有时我们可以用一个共同音而不是枢轴和弦，转调到远关系调。特别是，与主调相距三度的调性区域用这一手法最容易转调。这些调——与主调相距三度的、经过半音变化的各主音——被称为"半音三度"（chromatic third）或"半音中音"（chromatic mediant）关系。例如：C 大调与 A♭ 大调（共享共同音 C）、C 大调与 E♭ 大调（共享共同音 G）、C 大调与 A 大调（共享共同音 E）、C 大调与 E 大调（共享共同音 E）。这些关系见谱例 8。

🎼 [MuseScore 乐谱](https://musescore.com/user/32728834/scores/9014891)

<!-- embed-begin: https://musescore.com/user/32728834/scores/9014891 -->
<div class="omt-switch" data-omt-switch>
<div class="omt-switch-bar" role="tablist"><button type="button" role="tab" aria-selected="true" data-pane="lilylet">Lilylet 乐谱</button><button type="button" role="tab" aria-selected="false" data-pane="musescore">MuseScore</button></div>
<div class="omt-switch-pane" role="tabpanel" data-pane="lilylet" markdown="1">

```lyl.play
[staves ""]

\key c \major \omit Score.TimeSignature \numericTimeSignature \time 2/4 \clef "treble" <c e g>4~ <c ef af>4 | %1

<c e g>4~ <bf ef g>4 | %2

<c e g>4~ <cs e a>4 | %3

<c e g>4~ <b e gs>4 | %4
```

</div>
<div class="omt-switch-pane omt-embed omt-embed-musescore" role="tabpanel" data-pane="musescore" hidden><iframe data-src="https://musescore.com/user/32728834/scores/9014891/embed" title="MuseScore" loading="lazy" style="height: 225px" allow="autoplay; fullscreen" allowfullscreen></iframe></div>
</div>
<!-- embed-end -->

谱例 8. 半音中音之间共享的共同音。 

在歌曲"Widmung"中，罗伯特·舒曼（Robert Schumann）正是用这一手法从 A♭ 大调转调到与之有半音中音关系的 F♭ 大调（为清楚起见写作 E 大调）。在谱例 9 中，我们可以看到 A♭ 调通过第 13 小节的 PAC 得到了明确的确认。我们的耳朵紧抓住 A♭ 的到达，而它随后被重新解释为 G♯，即 E 大调主和弦的三音，并在几小节之后得到确认。

🎼 [MuseScore 乐谱](https://musescore.com/user/32728834/scores/12664156)

<!-- embed-begin: https://musescore.com/user/32728834/scores/12664156 -->
<div class="omt-switch" data-omt-switch>
<div class="omt-switch-bar" role="tablist"><button type="button" role="tab" aria-selected="true" data-pane="lilylet">Lilylet 乐谱</button><button type="button" role="tab" aria-selected="false" data-pane="musescore">MuseScore</button></div>
<div class="omt-switch-pane" role="tabpanel" data-pane="lilylet" markdown="1">

```lyl.play
[staves ",{-}"]

\key af \major \numericTimeSignature \time 3/2 \clef "treble" bf'2 r4 bf4 c4 df4 \\\
\staff "1" \clef "treble" \stemUp bf'2~ s2 ef4 df4 \\
\staff "1" \stemDown ff8[ g8] s4 <g bf>4 ff8 bf4 s8 ff8[ g8] \\
\staff "2" \clef "bass" \stemUp bf8[ df8] s2 df8[ bf8] g8[ bf8] s4 \\
\staff "2" \stemDown df,1 df2 | %1

ef'4 af,4 af2. df4 \\\
\staff "1" ef'2 gf,8.[ af16] af2 af8[ gf8] <af af>8[ f8 <df' df>8 ff,8] \\
\staff "2" \stemUp af8[ ef'8] ef8[ af,8] af8[ df8] s2 s4 \\
\staff "2" \stemDown c,1 <df df>4 <bf bf>4 | %2

c'4 c4 \grace { c8 } bf2~ bf4 c4 \\\
\staff "1" c'2 ef,8[ af8] bf2~ df,8.[ ef16] <ef bf'>4 df8 c'4 \\
\staff "2" \stemUp af8[ c8] s4 af8[ bf8] s2 g8[ ef8] \\
\staff "2" \stemDown ef,2 ef1 | %3

af'2 r2 r2 \\\
\staff "1" af'1. c,8.[ ef16] ef8[ c8] \\
\staff "2" \stemUp ef,8[ af8] af8[ ef8] s2 ef8[ af8 c8 ef8] \\
\staff "2" \stemDown af,1 af2 | %4

\key e \major gs'1 fs4 gs4 \\\
\staff "1" \tuplet 3/2 { <b e gs>4 <b e gs>4 <b e gs>4 } \tuplet 3/2 { <b e gs>4 <b e gs>4 <b e gs>4 } \tuplet 3/2 { <b e gs>4 <b e gs>4 <b e gs>4 } \\
\staff "2" <e,, e'>1. d'2 | %5

a'1 gs2 \\\
\staff "1" <a e' a>4 <a e' a>4 <a e' a>4 <a e' a>4 <a e' a>4 <a e' a>4 <a e' gs>4 <a e' gs>4 <a e' gs>4 \\
\staff "2" <e,, cs'>1. b'2 | %6

fs1 fs4 gs4 \\\
\staff "1" <cs e fs>4 <cs e fs>4 <cs e fs>4 <cs e fs>4 <cs e fs>4 <cs e fs>4 <a b ds fs>4 <a b ds fs>4 <a b ds fs>4 \\
\staff "2" <e,, a>1. b'2 | %7

e2 b2 r2 \\\
\staff "1" <gs b e>4 <gs b e>4 <gs b e>4 <gs b>4 <gs b>4 <gs b>4 <gs b>4 <gs b>4 <gs b>4 \\
\staff "2" <e,, e'>2 r2 <b b'>2 | %8
```

</div>
<div class="omt-switch-pane omt-embed omt-embed-musescore" role="tabpanel" data-pane="musescore" hidden><iframe data-src="https://musescore.com/user/32728834/scores/12664156/embed" title="MuseScore" loading="lazy" style="height: 950px" allow="autoplay; fullscreen" allowfullscreen></iframe></div>
</div>
<!-- embed-end -->

谱例 9. [舒曼（Robert Schumann），Op. 25 第 1 首，"Widmung"，第 10–17 小节](https://musescore.com/user/32728834/scores/12664156/s/4Jjygb)

## 等音重新解释

在上一例中，A♭ 这个音被重新解释为 G♯，成为 E 大调主和弦的三音。等音等同（以及由此成为可能的重新解释）使我们能够开辟出大量转调到远关系调的可能性。你也许已经注意到的一个这样的等同关系，是属七和弦与德国增六和弦之间的等同。

🎼 [MuseScore 乐谱](https://musescore.com/user/32728834/scores/12667216)

<!-- embed-begin: https://musescore.com/user/32728834/scores/12667216 -->
<div class="omt-switch" data-omt-switch>
<div class="omt-switch-bar" role="tablist"><button type="button" role="tab" aria-selected="true" data-pane="lilylet">Lilylet 乐谱</button><button type="button" role="tab" aria-selected="false" data-pane="musescore">MuseScore</button></div>
<div class="omt-switch-pane" role="tabpanel" data-pane="lilylet" markdown="1">

```lyl.play
[staves "{-}"]

\staff "1" \key f \major \numericTimeSignature \time 4/4 \clef "treble" <c f a>1 \\
\staff "2" \clef "bass" f,,1 | %1

\staff "1" <bf e g>1 \\
\staff "2" c,1 | %2

\staff "1" <a c f>1 \\
\staff "2" f,,1 | %3

\staff "1" <c f a>1 \\
\staff "2" f,,1 | %4

\staff "1" <as e' g>1 \\
\staff "2" c,1 | %5

\staff "1" <b e gs>2 <a ds fs>2 \\
\staff "2" b,1 | %6

\staff "1" <gs b e>1 \\
\staff "2" e,1 | %7

\staff "1" <c f a>1 \\
\staff "2" f,,1 | %8

\staff "1" <b f' af>2 <c f a>4 <bf e g>4 \\
\staff "2" df,2 c2 | %9

\staff "1" <a c f>1 \\
\staff "2" f,,1 | %10

\staff "1" <c f a>1 \\
\staff "2" f,,1 | %11

\staff "1" <cf f af>4 <df f af>4 <df gf>4 <cf ef gf>4 \\
\staff "2" df,4 cf4 bf4 cf4 | %12

\staff "1" <bf df gf>2 <af cf f>2 \\
\staff "2" df,2 df,2 | %13

\staff "1" <gf bf gf'>1 \\
\staff "2" gf,1 | %14
```

</div>
<div class="omt-switch-pane omt-embed omt-embed-musescore" role="tabpanel" data-pane="musescore" hidden><iframe data-src="https://musescore.com/user/32728834/scores/12667216/embed" title="MuseScore" loading="lazy" style="height: 625px" allow="autoplay; fullscreen" allowfullscreen></iframe></div>
</div>
<!-- embed-end -->

谱例 10. [把德国增六和弦改写为属七和弦，以及反过来](https://musescore.com/user/32728834/scores/12667216/s/Rqg7N8)

谱例 10 提供了两个例子，说明属七和弦如何可以被重新解释为德国增六和弦，以及反过来。在谱例 10 的 a) 中，七音级进下行解决到主和弦的三音，而低音则跳进到主和弦的根音。此后，B♭ 被重新解释为 A♯，并级进上行解决。随着低音级进下行，这两个音都解决到 $\hat{5}$，由 E 大调中的终止四六和弦支撑。这种声部进行上的差异（七音级进下行解决，增六度向外解决到 $\hat{5}$）就是属七和弦与其等音等同的德国增六和弦之间的根本区别。

谱例 11 展示了这种等音重新解释的实际运用。小提琴独奏在 C 大调的一个属七和弦之上演奏了一段长长的华彩。当乐队再次加入时，它们确认了属和声，但当这个和弦解决时，独奏小提琴的 F 自然音向上半音进行到 F♯，而大提琴与低音的 G 向下半音解决到 F♯。在这一瞬间，G–F 的小七度被重新解释为 G–E♯ 的增六度，解决到 b 小调的属和弦。这一和声在接下来的几小节中得到充实，在第 304 小节确认了属和弦 F♯ 大调。

🎼 [MuseScore 乐谱](https://musescore.com/user/32728834/scores/12667603)

<!-- embed-begin: https://musescore.com/user/32728834/scores/12667603 -->
<div class="omt-switch" data-omt-switch>
<div class="omt-switch-bar" role="tablist"><button type="button" role="tab" aria-selected="true" data-pane="lilylet">Lilylet 乐谱</button><button type="button" role="tab" aria-selected="false" data-pane="musescore">MuseScore</button></div>
<div class="omt-switch-pane" role="tabpanel" data-pane="lilylet" markdown="1">

```lyl.play
[staves ",,,,,,,,,"]

\key c \major \defaultTimeSignature \time 4/4 \clef "treble" c''4 r4 b4 r4 \\\
\clef "treble" <c' e>4 r4 <b d>4 r4 \\\
\clef "bass" <c e>4 r4 <b d>4 r4 \\\
\clef "treble" f'4 r4 f4 r4 \\\
\clef "treble" R1 \\\
\clef "treble" <c g' e' c'>4 r4 <g' d' b'>4 r4 \\\
\clef "treble" c2 b2 \\\
\clef "alto" \stemUp e,2 f2 \\
\stemDown c,2 d2 \\\
\clef "bass" c,4 e4 g4 f8[ d8] \\\
\clef "bass" c,4 e4 g4 f8[ d8] | %1

c''4 r4 b4 r4 \\\
<c' e>4 r4 <b d>4 r4 \\\
<c e>4 r4 <b d>4 r4 \\\
f'4 r4 f4 r4 \\\
R1 \\\
<c g' e' c'>4 r4 <g' d' b'>4 r4 \\\
c2 b2 \\\
\stemUp e,2 f2 \\
\stemDown c,2 d2 \\\
c,4 e4 g2~ \\\
c,4 e4 g2~ | %2

R1 \\\
R1 \\\
R1 \\\
R1 \\\
R1 \\\
R1 \\\
R1 \\\
R1 \\\
g4 f4 d4 b4 \\\
g4 f4 d4 b4 | %3

R1 \\\
R1 \\\
R1 \\\
R1 \\\
R1 \\\
r4 f'4 d4 b4 \\\
r4 f4 d4 b4 \\\
r4 d4 b4 f4 \\\
g,1 \\\
g,1 | %4

R1 \\\
R1 \\\
R1 \\\
R1 \\\
r4 \grace { g16 } g'4 \grace { b,16 } b'4 \grace { d,16 } d'4 \\\
f1 \\\
b1 \\\
d,1 \\\
g,1 \\\
g,1 | %5

R1 \\\
R1 \\\
R1 \\\
R1 \\\
\grace { f16 } f'4 \grace { g,16 } g'4 \grace { b,16 } b'4 \grace { d,16 } d'4 \\\
f1 \\\
b1 \\\
d,1 \\\
g,1 \\\
g,1 | %6

R1 \\\
<f b>4 r4 r2 \\\
R1 \\\
R1 \\\
\grace { f'16 } f'2~ \tuplet 3/2 { f8[ e8 d8] } \tuplet 3/2 { c8[ d8 b8] } \\\
f4 r4 r2 \\\
b4 r4 r2 \\\
d,4 r4 r2 \\\
g,4 r4 r2 \\\
g,4 r4 r2 | %7

R1 \\\
<f b>4 r4 r2 \\\
R1 \\\
R1 \\\
\grace { f'16 } f'2~ \tuplet 3/2 { f8[ e8 d8] } \tuplet 3/2 { c8[ d8 b8] } \\\
f4 r4 r2 \\\
b4 r4 r2 \\\
d,4 r4 r2 \\\
g,4 r4 r2 \\\
g,4 r4 r2 | %8

R1 \\\
<f b>4 r4 r2 \\\
R1 \\\
R1 \\\
f''8[ e8 d8] c8[ d8 b8] c8[ a8 b8] g8[ a8 f8] \\\
f4 r4 r2 \\\
b4 r4 r2 \\\
d,4 r4 r2 \\\
g,4 r4 r2 \\\
g,4 r4 r2 | %9

R1 \\\
R1 \\\
R1 \\\
R1 \\\
g''8[ e8 f8] d8[ e8 c8] d8[ b8 c8] a8[ b8 g8] \\\
R1 \\\
R1 \\\
R1 \\\
R1 \\\
R1 | %10

a'8[ f8 g8] e8[ f8 d8] e8[ c8 d8] b8[ c8 a8] \\\
s1 \\\
s1 \\\
s1 \\\
s1 \\\
s1 \\\
s1 \\\
s1 \\\
s1 \\\
s1 | %11

b8[ g8 a8] g8[ b8 a8] g8[ b8 a8] g8[ b8 a8] \\\
s1 \\\
s1 \\\
s1 \\\
s1 \\\
s1 \\\
s1 \\\
s1 \\\
s1 \\\
s1 | %12

g16[ b16 a16 c16] b16[ d16 g,16 b16] a16[ c16 b16 d16] c16[ e16 d16 f16] \\\
s1 \\\
s1 \\\
s1 \\\
s1 \\\
s1 \\\
s1 \\\
s1 \\\
s1 \\\
s1 | %13

e16[ g16 f16 a16] g16[ b16 b,16 d16] c16[ e16 d16 f16] e16[ g16 f16 a16] \\\
s1 \\\
s1 \\\
s1 \\\
s1 \\\
s1 \\\
s1 \\\
s1 \\\
s1 \\\
s1 | %14

g'16[ b16 a16 c16] b16[ d16 g,16 b16] a16[ c16 b16 d16] c16[ e16 d16 f16] \\\
s1 \\\
s1 \\\
s1 \\\
s1 \\\
s1 \\\
s1 \\\
s1 \\\
s1 \\\
s1 | %15

e'16[ g16 f16 a16] g16[ b16 b,16 d16] c16[ e16 d16 f16] e16[ g16 f16 a16] \\\
s1 \\\
s1 \\\
s1 \\\
s1 \\\
s1 \\\
s1 \\\
s1 \\\
s1 \\\
s1 | %16

R1 \\\
g''16[ b16 a16 c16] b16[ d16 d,16 fs16] g16[ fs16 g16 a16] b16[ c16 d16 e16] \\\
\clef "treble" R1 \\\
R1 \\\
\clef "bass" R1 \\\
\clef "bass" R1 \\\
s1 \\\
s1 \\\
s1 \\\
s1 | %17

R1 \\\
f''16[ cs16 d16 e16] f16[ cs16 d16 e16] f16[ cs16 d16 e16] f16[ cs16 d16 e16] \\\
R1 \\\
R1 \\\
R1 \\\
R1 \\\
s1 \\\
s1 \\\
s1 \\\
s1 | %18

R1 \\\
f''1~ \\\
R1 \\\
R1 \\\
R1 \\\
R1 \\\
s1 \\\
s1 \\\
s1 \\\
s1 | %19

R1 \\\
f''1 \\\
R1 \\\
R1 \\\
g,1 \\\
g,1 \\\
s1 \\\
s1 \\\
s1 \\\
s1 | %20

R1 \\\
fs''2~ fs8[ es8 fs8 es8] \\\
R1 \\\
R1 \\\
fs,,8 r8 fs8 r8 fs8 r8 fs8 r8 \\\
fs,,8 r8 fs8 r8 fs8 r8 fs8 r8 \\\
s1 \\\
s1 \\\
s1 \\\
s1 | %21

R1 \\\
fs''2 g2 \\\
fs2 g2 \\\
d2 e2 \\\
fs,,1 \\\
fs,,1 \\\
s1 \\\
s1 \\\
s1 \\\
s1 | %22

R1 \\\
fs''4 e2 d4 \\\
e2. d4 \\\
cs2. b4 \\\
f,,1 \\\
f,,1 \\\
s1 \\\
s1 \\\
s1 \\\
s1 | %23

R1 \\\
cs''4 b4 as4 b4 \\\
g'4 fs4 e4 d4 \\\
e4 d4 cs4 b4 \\\
f,,1 \\\
f,,1 \\\
s1 \\\
s1 \\\
s1 \\\
s1 | %24

<e' e>8 r8 <e e>8 r8 <e e>8 r8 <e e>8 r8 \\\
cs''2~ \tuplet 3/2 { cs8[ fs8 es8] } \tuplet 3/2 { fs8[ e8 cs8] } \\\
cs4 r4 r2 \\\
as4 r4 r2 \\\
f,,4 r4 r2 \\\
f,,4 r4 r2 \\\
s1 \\\
s1 \\\
s1 \\\
s1 | %25
```

</div>
<div class="omt-switch-pane omt-embed omt-embed-musescore" role="tabpanel" data-pane="musescore" hidden><iframe data-src="https://musescore.com/user/32728834/scores/12667603/embed" title="MuseScore" loading="lazy" style="height: 950px" allow="autoplay; fullscreen" allowfullscreen></iframe></div>
</div>
<!-- embed-end -->

[谱例 11. 贝多芬（Beethoven），D 大调小提琴协奏曲 Op. 61，第一乐章，第 280–304 小节](https://musescore.com/user/32728834/scores/12667603/s/agtET0)

因此，如果你把一个属七和弦重新解释为增六和弦，并用它作为枢轴进入新调，所得的转调将向下半音。反过来，如果你把一个增六和弦重新解释为属七和弦，所得的转调将向上半音。谱例 12 展示的正是这种情况。在这里，海顿（Haydn）在 D 大调的德国增六和弦（B♭–D–F–G♯）上停留了三小节，通过使用延长记号，让听众在这和声上沉思玩味。这个和弦没有在 D 大调中解决，而是把 G♯ 重新解释为 A♭，向下半音解决到新主调 E♭ 大调主和弦的三音。

🎼 [MuseScore 乐谱](https://musescore.com/user/32728834/scores/12743104)

<!-- embed-begin: https://musescore.com/user/32728834/scores/12743104 -->
<div class="omt-switch" data-omt-switch>
<div class="omt-switch-bar" role="tablist"><button type="button" role="tab" aria-selected="true" data-pane="lilylet">Lilylet 乐谱</button><button type="button" role="tab" aria-selected="false" data-pane="musescore">MuseScore</button></div>
<div class="omt-switch-pane" role="tabpanel" data-pane="lilylet" markdown="1">

```lyl.play
[staves ",,{-}"]

\key d \major \defaultTimeSignature \time 4/4 \clef "treble" R1 \\\
\clef "bass" d,2 r2 \\\
\staff "1" \clef "treble" d4 r4 e'4 \grace { fs32 e32 d32 } e8.[ g16] \\
\staff "2" \clef "bass" <d, fs>4 r4 \clef "treble" a''4-. a4-. | %1

R1 \\\
R1 \\\
\staff "1" fs'4 \grace { g32 fs32 e32 } fs8.[ a16] g4 \grace { a32 g32 fs32 } g8.[ b16] \\
\staff "2" \clef "treble" d'4-. d4-. e4-. e4-. | %2

R1 \\\
r2 fs,,2 \\\
\staff "1" a''4 r4 d4. \tuplet 5/4 { cs32[ b32 a32 g32 fs32] } \\
\staff "2" fs'4 r4 \clef "bass" <fs,,, fs'>2 | %3

R1 \\\
g,2 a2 \\\
\staff "1" b''4. a32[ g32 fs32 e32] a4 cs,4 \\
\staff "2" \clef "bass" <g, g'>2 <a a'>2 | %4

d8-.[ f8-. d8-. f8-.] d8-.[ f8-. d8-. f8-.] \\\
bf,1 \\\
\staff "1" d'2 f'4.~ f32[ e32 d32 cs32] \\
\staff "2" <bf, d f gs>1~ | %5

d8-.[ f8-. d8-. f8-.] d8-.[ f8-. d8-. f8-.] \\\
b,1 \\\
\staff "1" d''4. f,32[ e32 d32 cs32] d4. f,32[ e32 d32 cs32] \\
\staff "2" <b, d fs g>1~ | %6

d4 r4 r2 \\\
b,4 r4 r2 \\\
\staff "1" d4 r4 r2 \\
\staff "2" <b, d fs g>4 r4 r2 | %7

R1 \\\
R1 \\\
\staff "1" <bf' g'>4-. <bf g'>4-. <bf af'>4-. <bf af'>4-. \\
\staff "2" \clef "treble" ef8[ bf8 ef8 bf8] f'8[ bf,8 f'8 bf,8] | %8

r2 d16[ ef16 f16 g16] af16[ g16 f16 ef16] \\\
R1 \\\
\staff "1" f'4. \tuplet 3/2 { ef16[ d16 c16] } bf4 r4 \\
\staff "2" af'8[ bf,8 af'8 bf,8] af'8[ bf,8 af'8 bf,8] | %9

d4 r4 r2 \\\
bf,4 r4 r2 \\\
\staff "1" <bf' af'>4-. <bf af'>4-. <bf bf'>4-. <bf bf'>4-. \\
\staff "2" f8[ bf,8 f'8 bf,8] d8[ bf8 d8 bf8] | %10

r2 ef8[ g8 bf8 ef8] \\\
ef,4 r4 r2 \\\
\staff "1" g''4. \tuplet 3/2 { af16[ g16 f16] } ef4 g4 \\
\staff "2" ef8[ bf8 ef8 bf8] ef8[ bf8 ef8 bf8] | %11
```

</div>
<div class="omt-switch-pane omt-embed omt-embed-musescore" role="tabpanel" data-pane="musescore" hidden><iframe data-src="https://musescore.com/user/32728834/scores/12743104/embed" title="MuseScore" loading="lazy" style="height: 1000px" allow="autoplay; fullscreen" allowfullscreen></iframe></div>
</div>
<!-- embed-end -->

[谱例 12. 海顿 D 大调钢琴三重奏 Hob. XV: 16，第一乐章，第 163–73 小节](https://musescore.com/user/32728834/scores/12743104/s/I9Jyzs)

当然，你可以把这一窍门用于任何属七和弦（比如某个副属和弦），从而开辟出大量转调的可能性。谱例 13 展示了舒伯特（Schubert）把一个德国增六和弦重新解释为 V<sup>7</sup>/IV 和弦，从而从 C♯ 大调转调到 A 大调（这又是一次转调到有半音中音关系的调！）。

🎼 [MuseScore 乐谱](https://musescore.com/user/32728834/scores/12680431)

<!-- embed-begin: https://musescore.com/user/32728834/scores/12680431 -->
<div class="omt-switch" data-omt-switch>
<div class="omt-switch-bar" role="tablist"><button type="button" role="tab" aria-selected="true" data-pane="lilylet">Lilylet 乐谱</button><button type="button" role="tab" aria-selected="false" data-pane="musescore">MuseScore</button></div>
<div class="omt-switch-pane" role="tabpanel" data-pane="lilylet" markdown="1">

```lyl.play
[staves "{-}"]

\staff "1" \key c \major \numericTimeSignature \time 3/4 \clef "treble" cs'2-> cs4-> \\
\staff "2" \clef "bass" cs,4 <gs' cs es>4 <gs cs es>4 | %1

\staff "1" \stemUp s4 gs''2 \\
\staff "1" \stemDown c'4 cs8[ es8 ds8 cs8] \\
\staff "2" cs,4 <gs' cs es>4 <gs cs es>4 | %2

\staff "1" gs''2 <cs, fs>2 gs'4->~ <bs, fs'>4~ \\
\staff "2" gs,4 <gs' ds' fs>4 <gs ds' fs>4 | %3

\staff "1" \stemUp g''4 as4-! bs4-! \\
\staff "1" \stemDown <b' f'>4 <cs fs>4 <ds fs>4 \\
\staff "2" gs,4 <gs' ds' fs>4 <gs ds' fs>4 | %4

\staff "1" \stemUp cs''2 gs4->~ \\
\staff "1" \stemDown <cs' es>2 <cs es>4~ \\
\staff "2" cs,4 <gs' cs es>4 <gs cs es>4 | %5

\staff "1" \stemUp g''4 gs2 \\
\staff "1" \stemDown <c' e>4 cs8[ es8 ds8 cs8] \\
\staff "2" cs,4 <gs' cs es>4 <gs cs es>4 | %6

\staff "1" gs''2 <cs, fs>2 gs'4->~ <bs, fs'>4~ \\
\staff "2" gs,4 <gs' ds' fs>4 <gs ds' fs>4 | %7

\staff "1" \stemUp g''4 as4-! bs4-! \\
\staff "1" \stemDown <b' f'>4 <cs fs>4 <ds fs>4 \\
\staff "2" gs,4 <gs' ds' fs>4 <gs ds' fs>4 | %8

\staff "1" \stemUp cs''2 gs4~ \\
\staff "1" \stemDown <cs' es>2 <cs es>4~ \\
\staff "2" cs,4 <gs' cs es>4 <gs cs es>4 | %9

\staff "1" \stemUp g''4 s2 \\
\staff "1" \stemDown <c' e>4 <cs gs' cs>4 <cs gs' cs>4 \\
\staff "2" cs,4 <gs' cs es>4 <gs cs es>4 | %10

\staff "1" <cs' g' cs>2 <cs g' cs>4~ \\
\staff "2" a,4 <a' e'>4 <a e'>4 | %11

\staff "1" \stemUp s4 cs''2 \\
\staff "1" \stemDown <c' g' c>4 g'8[ b8 a8 g8] \\
\staff "2" a,4 <a' e'>4 <a e'>4 | %12

\staff "1" <fs' cs' fs>2 <fs b fs'>4~ \\
\staff "2" d,4 <d' fs>4 <d fs>4 | %13

\staff "1" \stemUp s4 fs''8[ a8 gs8 fs8] \\
\staff "1" \stemDown <f' b f'>4 b2 \\
\staff "2" d,4 <d' fs>4 <d fs>4 | %14

\staff "1" \stemUp e''2 e4~ \\
\staff "1" \stemDown b''2 a4~ \\
\staff "2" e,4 <cs' e>4 <cs e>4 | %15

\staff "1" \stemUp e''4 e,2 \\
\staff "1" \stemDown a''4 a,8[ cs8 b8 a8] \\
\staff "2" e,4 <cs' e>4 <cs e>4 | %16

\staff "1" \stemUp fs'2 e4~ \\
\staff "1" \stemDown a'2 gs4~ \\
\staff "2" e,4 <d' e>4 <d e>4 | %17

\staff "1" \stemUp e'4 fs4-! gs4-! \\
\staff "1" \stemDown g'4 a4 b4 \\
\staff "2" e,4 <d' e>4 <d e>4 | %18

\staff "1" \stemUp a''2 e4~ \\
\staff "1" \stemDown <a' cs>2 <a cs>4~ \\
\staff "2" a,4 <a' cs e>4 <a cs e>4 | %19

\staff "1" \stemUp e'4 s2 \\
\staff "1" \stemDown <a' c>4 cs8[ e8 ds8 cs8] \\
\staff "2" a,4 <a' cs e>4 <a cs e>4 | %20

\staff "1" <a' cs a'>2.~ \\
\staff "2" a,4 <cs' e>4 <cs e>4 | %21

\staff "1" <a' c a'>4 r4 s4 \\
\staff "2" <a cs>4 r4 s4 | %22
```

</div>
<div class="omt-switch-pane omt-embed omt-embed-musescore" role="tabpanel" data-pane="musescore" hidden><iframe data-src="https://musescore.com/user/32728834/scores/12680431/embed" title="MuseScore" loading="lazy" style="height: 825px" allow="autoplay; fullscreen" allowfullscreen></iframe></div>
</div>
<!-- embed-end -->

[谱例 13. 舒伯特，《感伤的圆舞曲》Op. 50 第 13 首（D. 779），第 18–38 小节](https://musescore.com/user/32728834/scores/12680431/s/JlMShl)

## 重新解释减七和弦

与属七和弦/德国增六和弦一样，减七和弦可以作等音改写，充当枢轴和弦进入远关系调。这是因为它具有对称的性质：减七和弦把八度等分成四个相等的部分（彼此相距小三度），因此在可能的移调上受到限制。实际来说，这意味着减七和弦中的任何一个音都可以被解释为该和弦的根音。在谱例 14 中，你可以看到把一个 B 减七和弦的每个和弦音分别当作根音来解释。虽然你在钢琴上会在同一位置弹出同样的四个键，这却给人一种枢轴和弦在"改变转位"的印象；这是因为新的解释改变了我们听到实际发响的低音的方式。

🎼 [MuseScore 乐谱](https://musescore.com/user/32728834/scores/12743365)

<!-- embed-begin: https://musescore.com/user/32728834/scores/12743365 -->
<div class="omt-switch" data-omt-switch>
<div class="omt-switch-bar" role="tablist"><button type="button" role="tab" aria-selected="true" data-pane="lilylet">Lilylet 乐谱</button><button type="button" role="tab" aria-selected="false" data-pane="musescore">MuseScore</button></div>
<div class="omt-switch-pane" role="tabpanel" data-pane="lilylet" markdown="1">

```lyl.play
[staves "{-}"]

\staff "1" \key ef \major \numericTimeSignature \time 4/4 \clef "treble" <ef g c>2 <f af d>2 \\
\staff "2" \clef "bass" c,2 b4 s4 | %1

\staff "1" <ef g c>1 \\
\staff "2" c,1 | %2

\staff "1" <ef g c>2 <f gs d'>2 \\
\staff "2" c,2 b2 | %3

\staff "1" <e a c>1 \\
\staff "2" a,1 | %4

\staff "1" <ef g c>2 <es gs d'>2 \\
\staff "2" c,2 b2 | %5

\staff "1" <fs cs'>1 \\
\staff "2" a,1 | %6

\staff "1" <ef g c>2 <f af d>2 \\
\staff "2" c,2 cf2 | %7

\staff "1" <g' bf ef>2 <f af d>2 \\
\staff "2" bf,1 | %8

\staff "1" <ef g ef'>1 \\
\staff "2" ef,1 | %9
```

</div>
<div class="omt-switch-pane omt-embed omt-embed-musescore" role="tabpanel" data-pane="musescore" hidden><iframe data-src="https://musescore.com/user/32728834/scores/12743365/embed" title="MuseScore" loading="lazy" style="height: 325px" allow="autoplay; fullscreen" allowfullscreen></iframe></div>
</div>
<!-- embed-end -->

[谱例 14. 减七和弦的拼写改写](https://musescore.com/user/32728834/scores/12743365/s/yX9YAj)

这一手法的经典例子见于贝多芬 c 小调钢琴奏鸣曲 Op. 13，即谱例 15。在这一段中，贝多芬用了几个减七和弦。我们听到的第一个减七和弦表现正常，起对属和弦离调的作用。第二次听到减七和弦时，我们听到的是 g 小调的局部减七和弦：F♯–A–C–E♭。这个和弦的表现同样符合预期，解决到第一转位的主和弦。下一小节我们又听到同一个和弦，但这一次贝多芬把它拼写为 F♯–A–C–D♯。新的拼写反映了和弦的新功能，其中 D♯ 充当新调 e 小调的导音。

🎼 [MuseScore 乐谱](https://musescore.com/user/32728834/scores/21147820)

<!-- embed-begin: https://musescore.com/user/32728834/scores/21147820 -->
<div class="omt-switch" data-omt-switch>
<div class="omt-switch-bar" role="tablist"><button type="button" role="tab" aria-selected="true" data-pane="lilylet">Lilylet 乐谱</button><button type="button" role="tab" aria-selected="false" data-pane="musescore">MuseScore</button></div>
<div class="omt-switch-pane" role="tabpanel" data-pane="lilylet" markdown="1">

```lyl.play
[staves "{-}"]

\staff "1" \key ef \major \defaultTimeSignature \time 4/4 \clef "treble" \tempo "Grave" <g bf d g>4~ <g bf d g>16.[ <d' g>32 <d fs a>16. <d g bf>32] <e g bf>4 <fs a>8 r8 \\
\staff "2" \clef "bass" <g,, bf d g>4~ <g bf d g>16.[ bf''32 a16. g32] cs4 d8 r16 ef,32 s32 | %1

\staff "1" <fs a c>4~ <fs a c>16.[ <fs a c>32 <fs a d>16. <fs a ef'>32] <fs a ef'>4 <g bf d>8 r8 \\
\staff "2" ef4~ ef16.[ ef32 d16. c32] bf4. r16 ef,32 s32 | %2

\staff "1" <fs a c>4~ <fs a c>16.[ <fs a c>32 <fs a d>16. <fs a ds>32] <fs a ds>4 <e g e'>4 \\
\staff "2" ef4~ ef16.[ ef32 d16. c32] c8 b4 b8~ | %3

\staff "1" <ds fs a>4 <b e g>4 <a c ds fs>4 <fs a ds>4\fermata \\
\staff "2" bf8 b,4 b4 b,4 b8\fermata | %4

\staff "1" \key c \major \defaultTimeSignature \time 2/2 \tempo "Allegro molto e con brio" e4-! a4-! g4-! <a ds>4-! \\
\staff "2" e,,8[ e'8 e,8 e'8] e,8[ e'8 e,8 e'8] | %5

\staff "1" <g' e'>4-! <ds' a'>4-! <e g>4-! <a ds>4-! \\
\staff "2" e,,8[ e'8 e,8 e'8] e,8[ e'8 e,8 e'8] | %6

\staff "1" <g'' e'>4 r4 <e, e'>4 r4 \\
\staff "2" <e,, e'>4 <g' b>4 <g b>4 <g b>4 | %7
```

</div>
<div class="omt-switch-pane omt-embed omt-embed-musescore" role="tabpanel" data-pane="musescore" hidden><iframe data-src="https://musescore.com/user/32728834/scores/21147820/embed" title="MuseScore" loading="lazy" style="height: 600px" allow="autoplay; fullscreen" allowfullscreen></iframe></div>
</div>
<!-- embed-end -->

谱例 15. [贝多芬 c 小调钢琴奏鸣曲 Op. 13，第一乐章，第 133–39 小节](https://musescore.com/user/32728834/scores/21147820/s/LtJAg5)。

当然，这一手法可以用于任何减七和弦，而不只是局部调中自然音的那个。在谱例 16 中，勃拉姆斯制造了一种期待：第 5 小节的减七和弦将对属和弦离调。这种期待是通过前一小节听到的扩展离调建立起来的，正是在那里我们第一次听到这个减七和弦。在第 4 小节，这个和弦拼写为 A–C–E♭–G♭，起 E♭ 大调中属和弦的 viio7 的作用。在第 5 小节，我们又听到这个和弦。然而我们的期待落空了，因为该和弦反而解决到第一转位的 g 小三和弦。勃拉姆斯通过用不同的方式拼写这个和弦（尽管它等音等同）给了我们一个线索，暗示这可能会发生：A–C–E–F♯。它的拼写是考虑到预期中向 g 小调的解决，因为 F♯ 是新调中的导音。g 小调果然成为新的主调，并在几小节之后由终止式加以确认。

🎼 [MuseScore 乐谱](https://musescore.com/user/32728834/scores/21148363)

<!-- embed-begin: https://musescore.com/user/32728834/scores/21148363 -->
<div class="omt-switch" data-omt-switch>
<div class="omt-switch-bar" role="tablist"><button type="button" role="tab" aria-selected="true" data-pane="lilylet">Lilylet 乐谱</button><button type="button" role="tab" aria-selected="false" data-pane="musescore">MuseScore</button></div>
<div class="omt-switch-pane" role="tabpanel" data-pane="lilylet" markdown="1">

```lyl.play
[staves ",{-}"]

\key ef \major \numericTimeSignature \time 9/8 \clef "treble" \tempo "Poco Andante" g'4 bf8 af4. r4 f'8 \\\
\staff "1" \clef "treble" <g ef' g>4 bf'8 <af, d af'>4. f'4 <bf d f>8 \\
\staff "2" \clef "bass" ef,,8.[ ef'8 bf8] f8.[ f'8 bf,8] af8.[ af'8 bf,8] | %1

ef'4 c8 bf4. af4 r8 \\\
\staff "1" <ef ef'>4 c'8 <ef, ef'>4 bf'8 <d, d'>4 af'8 \\
\staff "2" g,8.[ g'8 bf,8] f8.[ f'8 c8] bf,8.[ bf'8 f8] | %2

r4 r8 c'8[ bf8] g'8 f8[ ef8] c8 \\\
\staff "1" <g ef' g>8[ <bf bf'>8] <af d af'>8[ <c c'>8] <bf ef bf'>8[ <g' g'>8] <f c' f>8[ ef'8 c8] \\
\staff "2" <ef,, bf'>8[ ef'8 <f, bf>8 f'8 <g, ef'>8 g'8] af,8.[ af'8 ef8] | %3

bf'4 c8 bf4. a4 r8 \\\
\staff "1" <ef ef'>4 c'8 <ef, ef'>4 bf'8 <gf gf'>4 a8 \\
\staff "2" bf,8.[ g'8 ef8] c8.[ gf'8 ef8] ef8.[ c'8 gf8] | %4

c'4 bf8 ef4 d8 g8[ d8] bf8 \\\
\staff "1" <f f'>4 bf8 <fs fs'>4 a8 <g g'>4 bf8 \\
\staff "2" d,8.[ bf'8 f8] c8.[ a'8 fs8] bf,8.[ g'8 d8] | %5

a'4 r8 ef'4 d8 g8[ d8] bf8 \\\
\staff "1" <fs fs'>4 a8 <fs fs'>4 a8 <g g'>4 bf8 \\
\staff "2" d,8.[ a'8 fs8] c8.[ a'8 fs8] bf,8.[ g'8 d8] | %6

bf'4.~ bf4 a8 g4. \\\
\staff "1" <d bf'>4. <d bf'>4 <c a'>8 <bf g'>4. \\
\staff "2" d,,8[ g'8 d8] d,8[ fs'8 d8] g,4. | %7
```

</div>
<div class="omt-switch-pane omt-embed omt-embed-musescore" role="tabpanel" data-pane="musescore" hidden><iframe data-src="https://musescore.com/user/32728834/scores/21148363/embed" title="MuseScore" loading="lazy" style="height: 950px" allow="autoplay; fullscreen" allowfullscreen></iframe></div>
</div>
<!-- embed-end -->

谱例 16.   [勃拉姆斯 Op. 57 第 2 首](https://musescore.com/user/32728834/scores/21148363/s/zt0WjR)

#### 结语

总而言之，上述例子表明，减七和弦以及属七和弦/增六和弦在调性上远比你初学它们时所想象的要灵活得多。这些和弦可以成为通往远关系调的大门，使作曲家能够迅速而优雅地在调性中自由穿行。

> 作业

1. 拼写改写、声部写作与分析（[PDF](https://viva.pressbooks.pub/app/uploads/sites/12/2024/10/OMT-Chromatic-Modulation.pdf)），（[Word](https://viva.pressbooks.pub/app/uploads/sites/12/2024/10/OMT-Chromatic-Modulation.docx)），

    <!-- lilylet-begin: media/2024/10/1-assignment6-enharmonic-reinterpretation.mscz -->
    ```lyl.play
    [staves "s1,{s2-s3}"]

    \key c \major \numericTimeSignature \time 4/4 \clef "treble" <cs e g bf>1^\markup "1. Write the pairs of enharmonically equivalent chords and complete the chord analysis below the staff by writing\nin the key that corresponds to the given analysis."_\markup "___:" \chords "vii°7" \\\
    \staff "1" \clef "treble" R1 \\
    \staff "2" \clef "bass" R1 | %1

    \staff "1" s1_\markup "___:" \chords "vii°43" \bar "||" \\\
    \staff "1" R1 \bar "||" \\
    \staff "2" R1 | %2

    \staff "1" <fs a c ef>1_\markup "___:" \chords "vii°7" \\\
    \staff "1" R1 \\
    \staff "2" R1 | %3

    \staff "1" s1_\markup "___:" \chords "vii°65" \bar "||" \\\
    \staff "1" R1 \bar "||" \\
    \staff "2" R1 | %4

    \staff "1" <f af cf d>1_\markup "___:" \chords "vii°65" \\\
    \staff "1" R1 \\
    \staff "2" R1 | %5

    \staff "1" s1_\markup "___:" \chords "vii°7" \bar "||" \\\
    \staff "1" R1 \bar "||" \\
    \staff "2" R1 | %6

    \staff "1" <g' b d f>1^\markup "2. Write the pairs of enharmonicially equivalent chords and complete the chord analysis below the staff by writing\nin the key that corresponds to the given analysis."_\markup "___:" \chords "V7" \\\
    \staff "1" R1 \\
    \staff "2" R1 | %7

    \staff "1" s1_\markup "___:" \chords "Gr.653" \bar "||" \\\
    \staff "1" R1 \bar "||" \\
    \staff "2" R1 | %8

    \staff "1" <df f af cf>1_\markup "___:" \chords "V7" \\\
    \staff "1" R1 \\
    \staff "2" R1 | %9

    \staff "1" s1_\markup "___:" \chords "Gr.653" \bar "||" \\\
    \staff "1" R1 \bar "||" \\
    \staff "2" R1 | %10

    \staff "1" s1_\markup "___:" \chords "V7" \\\
    \staff "1" R1 \\
    \staff "2" R1 | %11

    \staff "1" <bf' d f gs>1_\markup "___:" \chords "Gr.653" \bar "||" \\\
    \staff "1" R1 \bar "||" \\
    \staff "2" R1 | %12

    \staff "1" \key ef \major R1^\markup "3. Harmonize the unfigured bass line (you can use any chord that will fit with the given bass note). This bass line \nwill modulate to a new key via enharmonic respelling. Analyze your work with Roman numerals and figures." \\\
    \staff "1" s4 s s s \\
    \staff "1" s4 s s s \\
    \staff "2" \stemDown d,4 e f d \\
    \staff "2" s4 s s s | %13

    \staff "1" R1 \\\
    \staff "1" s2. s4 \\
    \staff "1" s2 s4 s \\
    \staff "2" \stemDown bf,2 a \\
    \staff "2" s2. s4 | %14

    \staff "1" R1 \\\
    \staff "1" s2 s \\
    \staff "1" s2 s \\
    \staff "2" gs,1 \\
    \staff "2" s2 s | %15

    \staff "1" R1 \bar "||" \\\
    \staff "1" s1 \bar "||" \\
    \staff "1" s1 \\
    \staff "2" cs,1 \\
    \staff "2" s1 | %16

    \staff "1" R1^\markup "4. Realize the progression below in four voices. Use SATB chorale style (2 voices on each staff). Identify the key\nchanges where they're indicated below." \\\
    \staff "1" s4 s s s \\
    \staff "1" s4 s s s \\
    \staff "2" s4_\markup "___:" \chords "I" s \chords "vii°7/ii" s \chords "ii" s \chords "vii°7" \\
    \staff "2" s4 s s s | %17

    \staff "1" R1 \\\
    \staff "1" s4 s s s \\
    \staff "1" s4 s s s \\
    \staff "2" s4 \chords "I" s_\markup "___:" \chords "vii°7" \chords "vii°42" s \chords "V64---------53" s \\
    \staff "2" s4 s s s | %18

    \staff "1" R1 \\\
    \staff "1" s4 s s s \\
    \staff "1" s4 s s s \\
    \staff "2" s4 \chords "i" s_\markup "___:" \chords "Gr.653" \chords "V7" s \chords "I" s \chords "IV" \\
    \staff "2" s4 s s s | %19

    \staff "1" R1 \\\
    \staff "1" s2 s \\
    \staff "1" s2 s \\
    \staff "2" s2 \chords "V64---------------53" s \\
    \staff "2" s2 s | %20

    \staff "1" R1 \bar "||" \\\
    \staff "1" s1 \bar "||" \\
    \staff "1" s1 \\
    \staff "2" s1 \chords "I" \\
    \staff "2" s1 | %21
    ```
    <!-- lilylet-end -->

### 媒体署名

- chromatic modulation – closely related keys
- distantly related keys – mixture to diatonic
- distantly related keys – diatonic to mixture