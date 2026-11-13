---
title: "爵士排列"
slug: "jazz-voicings"
source: "https://viva.pressbooks.pub/openmusictheory/chapter/jazz-voicings/"
authors: ["Megan Lavengood"]
license: "CC BY-SA 4.0"
modified: "2025-07-15"
---

# 爵士排列

> **要点**
>
> - 和弦的音域间距要模仿泛音列的疏密：低音区用大而宽的音程，高音区用较小、较近的音程。
> - 延伸音应安排在高声部。
> - 如果要重复某个音，通常重复低音或和弦的根音。
> - 省略和弦的五音几乎总是完全可以接受的。
> - 使用平滑的（「懒散的」）声部进行：让每个声部在和弦之间尽量少移动，以获得平滑、易于演奏的声音。爵士中常见的一种平滑声部进行图式，是从一个和弦的三音进行到下一个和弦的七音，另一条线则连接第一个和弦的九音与第二个和弦的十三音。
> - 这些准则可以被打破，但这应当是一个自觉而刻意的决定，目的是达到想要的效果。

在本单元至今的内容中，你写的和弦都是「未排列」（unvoiced）的形式。未排列的和弦对构思和声很有用，但你大概不会想演奏这些高高叠起的三度堆。本章将讨论如何以爵士乐惯用的方式排列（voice）这些和声。我们将专注于一种始终在左手弹奏根音的排列方式，好让和声总是清楚——尽管在实际演奏中，根音常常被省略（因为贝斯手会覆盖它）。

## 间距

和弦成员在音乐织体中的常见间距与声学有很大关系。我们把音高当作具体的频率来讨论——例如，A 440，大多数管弦乐团用来调音的那个音，指的是频率为 440 赫兹（Hz）的音高 A。但实际上，当一件声学乐器奏出 A 440 时，440 Hz 只是在那一刻被激活的频率之一。乐器还会激活该音高之上的泛音，因为振动的体会同时引起其他更短的振动。这些泛音正是塑造乐器独特音色的因素之一。

泛音列（harmonic series）在谱例 1 中近似地表示出来。[^1]

![谱例 1. 用记谱近似表示的泛音列。](../media/2019/08/harmonic-series_0001.png)*谱例 1. 用记谱近似表示的泛音列。*

<!-- lilylet-begin: media/2019/08/harmonic-series_0001.png -->
```lyl.play
[staves "{-}"]

\staff "1" \omit Score.TimeSignature \key c \major \time 16/4 \clef "treble" \staff "2" \clef "bass" f,,4 f' c' \staff "1" f a c ef f g a b c d ef e! f \undo \omit Score.BarLine \bar "||"
\addlyrics { 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 } | %1
```
<!-- lilylet-end -->
注意，在较低的泛音中，各音高之间相隔很远，而在较高的泛音中则越来越近：第 1 和第 2 泛音之间相距一个八度，但从第 13 泛音开始，相邻泛音之间只相隔半音。

总的来说，音乐中的间距都近似于泛音列：音在低音区相隔较远，在高音区靠得较近。把音靠得很近地放在低音区，听起来往往浑浊而不协和，即使和弦本身是协和的。而当音在高音区相隔很远时，上面那个音在织体中会显得相当突出、孤立（不过有时这正是好事）。

记住，低音部很可能是由低音提琴（upright bass）演奏的——这件乐器听起来比记谱低一个八度，所以它的最低音是 E<sub>1</sub>，比中央 C 低三个 E。低音处在与乐团其余部分相距很远的音区，这是正常的。

和弦的[延伸音](https://viva.pressbooks.pub/openmusictheory/chapter/lead-sheet-symbols#extensions)应留在织体的高音区。回想一下，这一点就体现在它们的名称里——在爵士和声中，十三音不同于六音。要把十三音安排在和弦七音之上的某处，否则它听起来就只是一个六音。

## 重复

一般来说，一个安全的重复对象是低音。低音往往是比较稳定的和弦成员。由于它是织体的基础，重复低音听起来效果很好。

另一个好选择是重复和弦的根音，即使它不在低音。根音和低音一样，通常是稳定的音，重复它会加强和弦。

## 省略音

爵士和声往往含有许多音，这要归功于延伸和声的常见做法。让所有这些音在排列中获得同等分量往往并不可取，因此排列这些延伸和声时常会省略一些音。

最常省略的音是和弦的五音。由于五音在泛音列中位置靠前（第 3 泛音），它往往只加强和弦的根音，本身并不增添多少色彩。聆听并比较谱例 2 中的各个和弦，注意去掉五音对和弦的整体音响几乎没有什么改变，而省略七音或根音则会显著改变音响！

🎼 [MuseScore 曲谱](https://musescore.com/user/32728834/scores/5689622)

<!-- embed-begin: https://musescore.com/user/32728834/scores/5689622 -->
<div class="omt-embed omt-embed-musescore"><iframe src="https://musescore.com/user/32728834/scores/5689622/embed" title="MuseScore" loading="lazy" style="height: 394px" allow="autoplay; fullscreen" allowfullscreen></iframe></div>
<!-- embed-end -->

谱例 2. 省略五音很常见，因为它不会显著改变音响。七音和根音则几乎从不省略。

省略根音有可能动摇整个和弦。不过，如果演出团体中有贝斯手，你就可以在其他声部中有意省略根音。贝斯手通常会提供和声的根音，确保和弦听起来稳定。所以，谱例 2 中最后一个和弦，如果有贝斯手在这个排列下方弹一个 G，听起来就完全没有问题。

处理延伸和弦时，除五音之外省略其他成员也变得可行或可取，但这里很难一概而论。通常，省略音是为了避免与其他重要的和弦成员产生过度的不协和。

## 平滑的声部进行

到目前为止，我们一直把和声当作纵向的实体来讨论：当作一叠在纸面上自下而上排列的音。纵向思维在音乐理论中、在钢琴家和吉他手中用得很多，但对几乎其他所有人来说，音乐是以横向方式体验的：作为时间中的一串音。音乐家必须能通过声部进行，同时以纵向*和*横向的方式思考音乐。

爵士乐及许多其他风格中的声部进行总体上应当平滑——也就是说，进行到新和弦时，各声部理想上应尽量少移动（低音除外，它常常跳进）。平滑的声部进行使不同的和弦听起来连接得更合乎逻辑（谱例 3）。写自己的和弦进行时，把各声部想象成懒散的，可能会有帮助：它们想尽量少动！最小可能的移动是共同音：完全不动，而是停留在一个为两个和弦共有的音上。其次可取的是全音或半音的移动。小跳（三度移动）也容易演奏、容易唱，而且有很多情况会迫使你在声部进行时使用小跳。

大跳主要用于在声部进行中制造对比和兴奋感。它们应当节制地使用，而且要有充分理由。当大跳发生在一个和弦之内时，听起来最自然：因为支撑横向运动的和弦保持不变，声部在该和弦内大跳很容易。不过，当和弦正在变化时，加上大跳往往会使这些和弦听起来彼此脱节，并可能让作品难以演奏。跨和弦变化大跳当然可行，但可能需要额外练习，而且别忘了：你的声部是懒散的！

🎼 [MuseScore 曲谱](https://musescore.com/user/32728834/scores/8514797/s/3GztpI)

<!-- embed-begin: https://musescore.com/user/32728834/scores/8514797/s/3GztpI -->
<div class="omt-embed omt-embed-musescore"><iframe src="https://musescore.com/user/32728834/scores/8514797/s/3GztpI/embed" title="MuseScore" loading="lazy" style="height: 540px" allow="autoplay; fullscreen" allowfullscreen></iframe></div>
<!-- embed-end -->

谱例 3. 平滑的声部进行使和弦听起来彼此相连。

## 爵士声部进行的范式

在本教材的爵士部分，我们将假定低音始终在弹奏和弦的根音。因此讨论爵士声部进行时，我们只关注上方的声部。

### 两个上方声部：3–7 声部进行范式

如果你只为低音上方的两个声部写作，通常应使用和弦的三音和七音（省略五音）。这会在任何两个根音相隔五度或二度的和弦之间产生平滑的声部进行，如谱例 4 所示。如果两个和弦的根音相隔五度（例如 C<sup>7</sup>–F<sup>7</sup> 或 G<sup>7</sup>–Cma<sup>7</sup>），那么一个声部会在和弦的三音与七音之间交替，另一个声部则做同样的事，但顺序相反。如果两个和弦的根音相隔二度，两个声部就做平行运动，一个声部弹各和弦的三音，另一个弹各和弦的七音。注意，这在右手只产生两种音程：四度和五度。

🎼 [MuseScore 曲谱](https://musescore.com/user/32728834/scores/11095687/s/HZz7a0)

<!-- embed-begin: https://musescore.com/user/32728834/scores/11095687/s/HZz7a0 -->
<div class="omt-embed omt-embed-musescore"><iframe src="https://musescore.com/user/32728834/scores/11095687/s/HZz7a0/embed" title="MuseScore" loading="lazy" style="height: 394px" allow="autoplay; fullscreen" allowfullscreen></iframe></div>
<!-- embed-end -->

谱例 4. 3–7 声部进行范式应用于 ii–V–I 进行（左）和 V–IV–I 进行（右）。

### 三个上方声部：加入延伸音

初学者在加入第三个上方声部时，可能想加上和弦的五音，但往往更具风格的选择是给和弦加入延伸音，继续省略和弦五音。具体来说，我们可以在两个声部的 3–7 范式上叠加第三条线，在九音与十三音之间交替。谱例 5 沿用了谱例 4 的声部进行，但加上了这第三个声部。

🎼 [MuseScore 曲谱](https://musescore.com/user/32728834/scores/11096065)

<!-- embed-begin: https://musescore.com/user/32728834/scores/11096065 -->
<div class="omt-embed omt-embed-musescore"><iframe src="https://musescore.com/user/32728834/scores/11096065/embed" title="MuseScore" loading="lazy" style="height: 394px" allow="autoplay; fullscreen" allowfullscreen></iframe></div>
<!-- embed-end -->

谱例 5. 三个上方声部的爵士排列范式。下面两个声部使用 3–7 范式；再加上一条连接九音与十三音的顶声部（蓝色标出），就形成了又一条平滑的线。

延伸音常常从默认的大音程性质被变化。初学者很难知道何时该变化延伸音。作为起点，可以先用符合整体调性的延伸音，如谱例 5 那样——注意顶声部没有加任何变音记号。如果自然音阶版本的延伸音听起来不自然，就试着升高或降低该延伸音，让耳朵来引导你选择哪种变化听起来最好。谱例 6（[也可下载讲义](https://viva.pressbooks.pub/app/uploads/sites/12/2019/08/Common-chord-ext.pdf)）展示了某些性质的和弦最常用的延伸音，按从简单到复杂排列。但你不应从中随机挑选——听起来最合适的往往取决于周围的和弦，而不只取决于该和弦本身的性质。尝试这些延伸音，能帮助初学者培养对什么最有风格感的判断。

🎼 [MuseScore 曲谱](https://musescore.com/user/32728834/scores/8514740)

<!-- embed-begin: https://musescore.com/user/32728834/scores/8514740 -->
<div class="omt-embed omt-embed-musescore"><iframe src="https://musescore.com/user/32728834/scores/8514740/embed" title="MuseScore" loading="lazy" style="height: 1115px" allow="autoplay; fullscreen" allowfullscreen></iframe></div>
<!-- embed-end -->

谱例 6. 每种和弦性质常用的可加延伸音。

## 准则与规则

上述原则大多并不是你必须遵守的规则，而是写作风格上的准则。这里的准则代表的是爵士乐中最常见的做法。

准则并不总是被遵守，但了解了它们，你就有能力*选择*不遵守，并完整理解由此产生的音响。换句话说，尽管打破规则，但要确保你知道自己为什么这么做！

> 延伸阅读

- Coker, Jerry. 1984. *Jazz Keyboard for Pianists and Non-Pianists: Class or Individual Study*. Miami: Alfred Music.

> 资源

- [常用带延伸音的和弦符号讲义](https://viva.pressbooks.pub/app/uploads/sites/12/2019/08/Common-chord-ext.pdf)，Brendan Schnabel 编。

> 作业

1. 排列练习表（[.pdf](https://viva.pressbooks.pub/app/uploads/sites/12/2019/08/WK-voicing.pdf)）。要求学生在已排列的爵士织体中识别常见的声部进行模式，并写出声部进行良好的排列和弦进行。

    <!-- lilylet-begin: media/2019/08/WK-voicing.mscz -->
    ```lyl.play
    [composer "Megan Lavengood and Kyle Gullings"]
    [staves "s1,{s2-s3}"]

    \key c \major \numericTimeSignature \time 4/4 \clef "treble" r8 \chords "_____" \stemUp d e4 fs d \\\
    \staff "1" \clef "treble" <c e fs a>1 \\
    \staff "2" \clef "bass" d,1 | %1

    \staff "1" \stemUp a'4 fs \stemDown b \stemUp a \\\
    \staff "1" r8 \stemUp <c e fs a>4. r2 \\
    \staff "2" r8 \stemDown d,4. r2 | %2

    \staff "1" \stemDown d'2 \stemUp a8 fs4 d8~ \\\
    \staff "1" <c e fs a>1~~~~ \\
    \staff "2" d,1~ | %3

    \staff "1" d1 \\\
    \staff "1" \stemUp <c e fs a>2. <c e fs a>4 \\
    \staff "2" \stemDown d,2. d4 | %4

    \staff "1" \stemUp d4 \chords "_____" e f d \\\
    \staff "1" <b e f a>1 \\
    \staff "2" g,1 | %5

    \staff "1" \stemUp a'8[ a] f4 \stemDown b8 \stemUp a4 \stemDown d8~ \\\
    \staff "1" \stemUp <b e f a>2. r8 <b e f a>~~~~ \\
    \staff "2" \stemUp g,2. r8 g~ | %6

    \staff "1" \stemDown d'2 \stemUp \grace { as8( \stemDown } b4) \stemUp a8[ g~] \\\
    \staff "1" <b e f a>1~~~~ \\
    \staff "2" g,1~ | %7

    \staff "1" \stemUp g'2. r4 \\\
    \staff "1" \stemUp <b e f a>2. <b e f a>4 \\
    \staff "2" \stemUp g,2. g4 | %8

    \staff "1" r8 \chords "_____" \stemUp c[ d c] \grace { ds( } e4) c8[ g'] \\\
    \staff "1" <bf d e a>1 \\
    \staff "2" c,,1 | %9

    \staff "1" r8 \stemUp e4 e8 a4 g \\\
    \staff "1" \stemUp <bf d e a>2 r \\
    \staff "2" \stemUp c,,2 r | %10

    \staff "1" \stemDown c'2 \stemUp g8 e4 c8~ \\\
    \staff "1" <bf d e a>1 \\
    \staff "2" c,,1 | %11

    \staff "1" \stemUp c4. c8 d[ c d c] \\\
    \staff "1" <bf d e a>1 \\
    \staff "2" c,,1 | %12

    \staff "1" \stemUp a'4 \chords "_____" a8[ a~] a2 \\\
    \staff "1" \stemUp <a c e g>2. <a c e g>4 \\
    \staff "2" \stemUp f,,2. f4 | %13

    \staff "1" r4 \chords "_____" r8 \stemUp c d[ c d c] \\\
    \staff "1" <a c d f>1 \\
    \staff "2" f,,1 | %14

    \staff "1" \stemUp a'2. \chords "_____" \tuplet 3/2 { f8[ e d] } \\\
    \staff "1" <bf d g a>1 \\
    \staff "2" e,,1 | %15

    \staff "1" \tuplet 3/2 { cs8[ e g] } \chords "_____" \stemDown bf4 \stemUp a2 \\\
    \staff "1" \stemUp <bf cs e g>2 <cs e g bf> \\
    \staff "2" \stemUp a,2 a | %16

    \staff "1" \stemUp d8[ \chords "_____" d] e4 fs d \\\
    \staff "1" <c e fs b>1 \\
    \staff "2" d,,1 | %17

    \staff "1" \stemUp a'8 fs4 \stemDown b \stemUp a \stemDown d8~ \\\
    \staff "1" \stemUp <c e fs b>8 r r4 r2 \\
    \staff "2" \stemUp d,,8 r r4 r2 | %18

    \staff "1" \stemDown d'2 \stemUp a4 fs8[ d~] \\\
    \staff "1" <c e fs b>1~~~~ \\
    \staff "2" d,,1~ | %19

    \staff "1" d1 \\\
    \staff "1" \stemUp <c e fs b>2. <c e fs b>4 \\
    \staff "2" \stemUp d,,2. d4 | %20

    \staff "1" \stemUp d4 \chords "_____" e f8 d4 a'8~ \\\
    \staff "1" <b e f a>1 \\
    \staff "2" g,1 | %21

    \staff "1" \stemUp a'8 f4 \stemDown b8~ b \stemUp a4. \\\
    \staff "1" \stemUp <b e f a>2. r8 <b e f a>~~~~ \\
    \staff "2" \stemUp g,2. r8 g~ | %22

    \staff "1" \stemDown d'2 b4 \stemUp a8[ g~] \\\
    \staff "1" <b e f a>1~~~~ \\
    \staff "2" g,1~ | %23

    \staff "1" g'1 \\\
    \staff "1" \stemUp <b e f a>2. <b e f a>4 \\
    \staff "2" \stemUp g,2. g4 | %24

    \staff "1" \stemUp gs'8[ \chords "_____" a a f] a4. a8 \\\
    \staff "1" <c e f a>1 \\
    \staff "2" d,,1 | %25

    \staff "1" \tuplet 3/2 { a'8[ g e] } \chords "_____" \stemUp bf'8[ a~] a2 \chords "_____" \\\
    \staff "1" \stemUp <bf d e a>2 <b cs e g> \\
    \staff "2" \stemUp e,,2 a | %26

    \staff "1" r8 \chords "_____" \stemUp a'4. a4 a \\\
    \staff "1" \stemUp <c e f a>2 \stemDown <c' e f a> \\
    \staff "2" d,,1 | %27

    \staff "1" \stemUp g'8 \chords "_____" e4 a8~ a2 \chords "_____" \\\
    \staff "1" \stemDown <bf' d e a>2 <b cs e g> \\
    \staff "2" \stemUp e,,2 a | %28

    \staff "1" \stemUp c4 \chords "_____" d f \chords "_____" g8[ a] \\\
    \staff "1" \stemDown <a' d ef g>2 <gs cs d fs> \\
    \staff "2" \stemUp f,,2 e | %29

    \staff "1" \stemDown c'8[ \chords "_____" b c cs] d \chords "_____" \stemUp a4. \\\
    \staff "1" \stemDown <g' c df f>2 <fs b c e> \\
    \staff "2" \stemUp ef,,2 d | %30

    \staff "1" r4 \chords "_____" \stemUp g' \stemDown c8 \chords "_____" \stemUp a4 f8~ \\\
    \staff "1" \stemUp <f a b e>2 <e a bf d> \\
    \staff "2" \stemUp g,2 c | %31

    \staff "1" f1 \chords "_____" \bar "|." \\\
    \staff "1" \stemUp <e f a c>2 r \bar "|." \\
    \staff "2" \stemDown f,2 r | %32

    \staff "1" \key d \major <g' b d fs>1^\markup "Did you remember to do both parts of the analysis? (refer to the instructions!)"^\markup "unvoiced" \\\
    \staff "1" <fs b e>1_\markup "voiced" \chords "Gma7" \\
    \staff "2" g,1 | %33

    \staff "1" s1 \\\
    \staff "1" s1 \chords "C#ø7" \\
    \staff "2" s1 | %34

    \staff "1" s1 \\\
    \staff "1" s1 \chords "F#7" \\
    \staff "2" s1 | %35

    \staff "1" s1 \bar "||" \\\
    \staff "1" s1 \chords "Bmi(ma7)" \bar "||" \\
    \staff "2" s1 | %36

    \staff "1" \key f \major <g' bf d f>1^\markup "unvoiced" \\\
    \staff "1" <bf' f' a>1 \chords "Gmi7" \\
    \staff "2" g,1^\markup "voiced" | %37

    \staff "1" s1 \\\
    \staff "1" s1 \chords "Db7" \\
    \staff "2" s1 | %38

    \staff "1" s1 \\\
    \staff "1" s1 \chords "C7" \\
    \staff "2" s1 | %39

    \staff "1" s1 \bar "||" \\\
    \staff "1" s1 \chords "F6" \bar "||" \\
    \staff "2" s1 | %40
    ```
    <!-- lilylet-end -->

### 媒体署名

- Harmonic series © Megan Lavengood，[CC BY-SA（署名—相同方式共享）](https://creativecommons.org/licenses/by-sa/4.0/)许可

---

[^1]: 泛音列中的各音并不符合十二平均律，但为方便起见，它们被记写在最接近的音高上。
