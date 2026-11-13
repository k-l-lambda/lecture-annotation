---
title: 其他节奏要点
slug: "other-rhythmic-essentials"
source: "https://viva.pressbooks.pub/openmusictheory/chapter/other-rhythmic-essentials/"
authors: ["Mark Gotham", "Chelsey Hamm", "Bryn Hughes"]
license: "CC BY-SA 4.0"
modified: "2026-06-17"
---

# 其他节奏要点

> **要点**
>
> - 三连音（triplet）是连音符（tuplet）的一种，它把单拍子中的一拍（或一个划分，或数拍）分成三部分。记写三连音的方法是在三连音节奏上方写一个 3。
> - 二连音（duplet）是连音符的一种，它把复拍子中的一拍（或一个划分）分成两部分。记写二连音的方法是在二连音节奏上方写一个 2。
> - 超节拍（hypermeter）指节拍层级上的重音模式。
> - 切分（syncopation）发生在出现非拍点节奏重音时；这些重音可以由延音线、附点、休止符和/或力度造成。

## 借用的划分

通常，一种节拍由一贯的拍的划分方式定义：单拍子中分成两份，复拍子中分成三份。有时作曲家会在单拍子中使用一拍的三等分，或在复拍子中使用一拍的二等分；这类节奏叫做连音符（tuplet）。三连音是连音符的一种，它把单拍子中的一拍（或一个划分，或数拍）分成三部分。三连音有时被看成是从复拍子「借来」的，因为复拍子中的一拍通常分成三部分。记写三连音的方法是在三连音节奏上方写数字 3。

三连音可以出现在任何节拍层级上，如谱例 1 所示。在谱例 1a 中，三连音出现在拍的层级上——这是三连音最常见的用法。谱例 1b 展示了一个十六分音符三连音，它相当于一个八分音符（这一拍号中的划分）。三连音也可以跨越数拍，如谱例 1c 所示。这个三连音（用三个四分音符记写）占据一个二分音符的位置。

🎼 [MuseScore 曲谱](https://musescore.com/user/32728834/scores/8422541)

<!-- embed-begin: https://musescore.com/user/32728834/scores/8422541 -->
<div class="omt-embed omt-embed-musescore"><iframe src="https://musescore.com/user/32728834/scores/8422541/embed" title="MuseScore" loading="lazy" style="height: 600px" allow="autoplay; fullscreen" allowfullscreen></iframe></div>
<!-- embed-end -->

谱例 1. 位于 (a) 拍层级、(b) 细分层级和 (c) 跨拍层级的三连音。

三连音在许多不同体裁的音乐中都极为常见。LMFAO 的《Shots》（2009）就是一个例子。谱例 2 展示了这首歌副歌中反复出现的节奏，其中含有一个跨拍三连音：

![谱例 2. LMFAO 的《Shots》（2009）副歌片段。](../media/2025/07/Shots-Rhythm-LMFAO.png)*谱例 2. LMFAO 的《Shots》（2009）副歌片段。*

<!-- lilylet-begin: media/2025/07/Shots-Rhythm-LMFAO.png -->
```lyl.play
[composer "LMFAO"]

\key c \major \numericTimeSignature \time 4/4 \clef "treble" \stemUp b'4 b \tuplet 3/2 { b4 b b }
\addlyrics { Shots, shots, shots, shots, shots, } | %1

\partial 4 \stemUp b'4
\addlyrics { shots! } | %2
```
<!-- lilylet-end -->
你可以在谱例 3 中从 1:18 处开始听《Shots》的副歌：

▶️ [视频：LMFAO - Shots ft. Lil Jon](https://www.youtube.com/watch?v=XNtTEibFvlQ)

<!-- video-begin: https://www.youtube.com/watch?v=XNtTEibFvlQ -->
<div class="omt-video"><iframe src="https://www.youtube-nocookie.com/embed/XNtTEibFvlQ" title="video" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen></iframe></div>
<!-- video-end -->

谱例 3. LMFAO 的《Shots》；从 1:18 处开始听。

二连音是连音符的一种，它把复拍子中的一拍（或一个划分）分成两部分。记写二连音的方法是在二连音节奏上方写数字 2，如谱例 4 所示。

🎼 [MuseScore 曲谱](https://musescore.com/user/32728834/scores/8422571)

<!-- embed-begin: https://musescore.com/user/32728834/scores/8422571 -->
<div class="omt-embed omt-embed-musescore"><iframe src="https://musescore.com/user/32728834/scores/8422571/embed" title="MuseScore" loading="lazy" style="height: 394px" allow="autoplay; fullscreen" allowfullscreen></iframe></div>
<!-- embed-end -->

谱例 4. 在二连音节奏上方写一个 2 来记写二连音。

二连音也相当常见，虽然也许不如三连音常见。谱例 5 展示了安德鲁·劳埃德·韦伯（Andrew Lloyd Webber）的《猫》（*Cats*，1980）中「Memory」的再现段（reprise）片段，其中含有拍层级的二连音：

![谱例 5. 安德鲁·劳埃德·韦伯的《猫》（1980）中「Memory」再现段的片段。](../media/2025/07/Memory-Cats-Webber.png)*谱例 5. 安德鲁·劳埃德·韦伯的《猫》（1980）中「Memory」再现段的片段。*

<!-- lilylet-begin: media/2025/07/Memory-Cats-Webber.png -->
```lyl.play
[composer "Andrew Lloyd Webber"]

\key bf \major \time 12/8 \clef "treble" bf'4. bf~ bf8[ a bf] c8.[ bf16 g8]
\addlyrics { Mem -- ory, _ turn your face to the } | %1

bf'4. bf~ bf8[ a bf] c8.[ bf16 f8]
\addlyrics { moon light, _ let your mem -- o -- ry } | %2

g'4. g~ g8[ ef f] g8.[ f16 ef8]
\addlyrics { lead you, _ op -- en up en -- ter } | %3

d4.~ d4 r8 r4. r8 d[ f]
\addlyrics { in. _ If you } | %4

f4. c4 d8 \tuplet 2/3 { ef8[ f] } \tuplet 2/3 { g8[ a] }
\addlyrics { find there the mean -- ing of what } | %5

bf'8[ a g] f4. r4. r4. \bar "|."
\addlyrics { hap -- pi ness is... } | %6
```
<!-- lilylet-end -->
你可以在谱例 6 的开头听到这段含有二连音的片段：

▶️ [视频：Memory (Reprise) | Cats the Musical](https://www.youtube.com/watch?v=8gd_ohoPzYc)

<!-- video-begin: https://www.youtube.com/watch?v=8gd_ohoPzYc -->
<div class="omt-video"><iframe src="https://www.youtube-nocookie.com/embed/8gd_ohoPzYc" title="video" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen></iframe></div>
<!-- video-end -->

谱例 6. 安德鲁·劳埃德·韦伯的「Memory」，由伊莲·佩姬（Elaine Page）饰演葛丽兹贝拉（Grizabella）演唱。

连音符节奏的数法通常也是「借用」来的。例如，三连音通常数作 1-la-li，而二连音通常数作 1-and、2-and，等等。

## 超节拍简说

我们已经看到，拍要么是重读的，要么是非重读的，这在前面两章关于指挥图式的讨论中已经谈到（见[单拍子与拍号](https://viva.pressbooks.pub/openmusictheory/chapter/meter/)和[复拍子与拍号](11-compound-meters-and-time-signatures.md)）。超节拍指形成重音模式的小节组，在较快的速度下尤其明显。为了标明跨越多个小节的重音模式，在乐谱上标注超节拍数会很有帮助，如谱例 7 所示——这是贝多芬（Ludwig van Beethoven）《第九交响曲》（1824）中「谐谑曲」的缩编片段。在听谱例 7 时，试着按四拍子的模式跟着超节拍数字打指挥。这样做，你就能感到（并听到）哪些小节更重读（1 和 3），哪些小节较轻读（2 和 4）。

🎼 [MuseScore 曲谱](https://musescore.com/user/32728834/scores/8422604)

<!-- embed-begin: https://musescore.com/user/32728834/scores/8422604 -->
<div class="omt-embed omt-embed-musescore"><iframe src="https://musescore.com/user/32728834/scores/8422604/embed" title="MuseScore" loading="lazy" style="height: 450px" allow="autoplay; fullscreen" allowfullscreen></iframe></div>
<!-- embed-end -->

谱例 7. 贝多芬《第九交响曲》（1824）中「谐谑曲」的八个小节，附超节拍数。

这段对超节拍的介绍极为简短。欲了解更多，你可以阅读《Open Music Theory》的作者之一 Brian Jarvis 所写的[超节拍](https://brianedwardjarvis.com/TheoryTopics/hypermeter.html)。

## 切分

切分发生在出现非拍点节奏重音时（更多信息见[流行音乐中的节奏与节拍](../07-popular-music/01-rhythm-and-meter-in-pop-music.md)），如谱例 8 所示，它可以由延音线、附点、休止符和/或力度造成。第 1 小节中，延音线造成切分；第 2 小节中，节奏之所以切分，是因为同时有附点和延音线。第 3 小节的切分感由每拍开头的休止符造成。第 4 小节中，虽然每个划分上都有八分音符，非拍点的重音（力度）仍产生了切分。

🎼 [MuseScore 曲谱](https://musescore.com/user/32728834/scores/6296167)

<!-- embed-begin: https://musescore.com/user/32728834/scores/6296167 -->
<div class="omt-embed omt-embed-musescore"><iframe src="https://musescore.com/user/32728834/scores/6296167/embed" title="MuseScore" loading="lazy" style="height: 394px" allow="autoplay; fullscreen" allowfullscreen></iframe></div>
<!-- embed-end -->

谱例 8. 切分节奏的不同例子。

你可以在下面的练习中练习识别二连音、三连音和切分：

> **练习**
>
> 🧩 互动练习（H5P）：二连音、三连音、切分术语识别，见[在线版](12-other-rhythmic-essentials.md)。

你可以在下面的练习中进一步练习二连音、三连音和切分节奏：

> **练习**
>
> 🧩 互动练习（H5P）：填满小节：二连音、三连音与切分，见[在线版](12-other-rhythmic-essentials.md)。

> 延伸阅读

- Bent, Ian D. et al. 2001. “Notation.” *Grove Music Online*.  <https://doi.org/10.1093/gmo/9781561592630.article.20114>.
- Cone, Edward T. 1968. *Musical Form and Musical Performance*. New York: W.W. Norton & Company.
- Gerou, Tom and Linda Lusk. 1996. *Essential Dictionary of Music Notation*. Los Angeles: Alfred.
- Krebs, Harold. 1999. *Fantasy Pieces.*New York: Oxford University Press.
- Lerdahl, Fred and Ray Jackendoff. 1983. *A Generative Theory of Tonal Music*. Cambridge, MA: MIT Press.
- London, Justin. 2001. “Metre.” *Grove Music Online*. <https://doi.org/10.1093/gmo/9781561592630.article.18519>.
- McGrain, Mark. 1986. *Music Notation*. Boston: Berklee Press.
- Roemer, Clinton. 1985. *The Art of Music Copying: The Preparation of Music for Performance*, 2nd edition. Sherman Oaks: Roerick Music Company.
- Rothstein, William. 1989. *Phrase Rhythm in Tonal Music*. New York: Schirmer.

> 在线资源

- [三连音与二连音（YouTube）](https://www.youtube.com/watch?v=il4us6273pU)

    <!-- video-begin: https://www.youtube.com/watch?v=il4us6273pU -->
    <div class="omt-video"><iframe src="https://www.youtube-nocookie.com/embed/il4us6273pU" title="video" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen></iframe></div>
    <!-- video-end -->

- [三连音（Hello Music Theory）](https://hellomusictheory.com/learn/triplets/)
- [二连音（Hello Music Theory）](https://hellomusictheory.com/learn/duplets/)
- [切分（Music Theory Academy）](https://www.musictheoryacademy.com/understanding-music/syncopation/)
- [切分节奏练习（YouTube）](https://www.youtube.com/watch?v=eMS2E1cl990)

    <!-- video-begin: https://www.youtube.com/watch?v=eMS2E1cl990 -->
    <div class="omt-video"><iframe src="https://www.youtube-nocookie.com/embed/eMS2E1cl990" title="video" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen></iframe></div>
    <!-- video-end -->

> 网络作业

1. 三连音的数拍（[.pdf](https://thedockforlearning.org/document/worksheet-1-7-counting-triplets-and-duple-meter/)，[.pdf](https://guitaration.com/wp-content/uploads/Sixteenth-Notes-And-Triplets-semiquaver-Advanced-printable-Rhythm-Worksheets-7.pdf)，[.pdf](https://eadn-wc02-334071.nxedge.io/wp-content/uploads/2009/03/Triplets.pdf)，[.pdf](https://eadn-wc02-334071.nxedge.io/wp-content/uploads/2009/03/triplet-and-eighths.pdf)）
2. 二连音的数拍，第 13 页（[.pdf](http://docshare02.docshare.tips/files/28962/289627797.pdf)）
3. 超节拍数字（[.pdf](https://cpb-us-e1.wpmucdn.com/blogs.uoregon.edu/dist/c/13088/files/2016/03/Week-1-Thursday-Worksheet-2bahvqe.pdf)）
4. 切分的数拍（[.pdf](https://shedthemusic.com/syncopated-eighth-note-rhythm-worksheet)，[.pdf](https://shedthemusic.com/progressive-compound-meter-3)）

> 作业

1. 三连音与二连音、超节拍与切分（[.pdf](https://viva.pressbooks.pub/app/uploads/sites/12/2024/06/WK-Other-Rhythmic-Essentials-–-Triplets-and-Duplets-Hypermeter-and-Syncopation.pdf)，[.docx](https://viva.pressbooks.pub/app/uploads/sites/12/2024/06/WK-Other-Rhythmic-Essentials-–-Triplets-and-Duplets-Hypermeter-and-Syncopation.docx)）[练习表播放列表](https://open.spotify.com/playlist/6UZKSTdeu39AAjyjBSLUFE?si=0ee2d428938145a2)

### 媒体署名

- Shots Rhythm LMFAO © Chelsey Hamm，依据 [CC BY-SA（署名—相同方式共享）](https://creativecommons.org/licenses/by-sa/4.0/) 许可协议授权
- Memory Cats Webber © Chelsey Hamm，依据 [CC BY-SA（署名—相同方式共享）](https://creativecommons.org/licenses/by-sa/4.0/) 许可协议授权
