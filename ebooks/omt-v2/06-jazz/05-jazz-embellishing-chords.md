---
title: "装饰和弦"
slug: "jazz-embellishing-chords"
source: "https://viva.pressbooks.pub/openmusictheory/chapter/jazz-embellishing-chords/"
authors: ["Megan Lavengood"]
license: "CC BY-SA 4.0"
modified: "2025-07-15"
---

# 装饰和弦

> **要点**
>
> 有时，爵士演奏者会在既有的和弦进行中加入新的和声。本章总结加入和声的一些常见方式。
>
> - 给和弦进行加入一个和声时，你必须改变和声节奏，以便插入一个额外的和弦。
> - 可以在一个和弦前面加上一个副 V<sup>7</sup> 和弦。
> - 副 ii<sup>7</sup> 和弦，如 ii–V–I 图式中那样，可以用来装饰一个属性质的和弦。换句话说，在一个属性质和弦前面加上它上方五度的 mi7 或 ∅7 和弦，就造成 ii–V 的效果。
> - 共同音减七和弦（CT<sup>o7</sup>）在装饰一个和弦的所有声部中造成辅助音运动。被解决和弦的根音总是作为 CT<sup>o7</sup> 的成员而被共用——「共同音」一词即由此而来。*（注：关于西方古典音乐中的 CT<sup>o7</sup> 和弦，详见[这一章](../05-chromaticism/04-common-tone-chords.md)。）*

爵士演奏者常常想给既有的爵士标准曲加上自己的花样。本章和下一章探讨演奏者即兴装饰爵士和声的一些方式。有时，和声被其他和弦*替换*；这一手法在下一章（[替换](06-substitutions.md)）中讨论。另一些时候，新的和声被*加入*，使和弦进行含有更多和弦。这些新的和声装饰进行中已有的和弦。在和弦进行中加入新的装饰和声，就是本章的重点。

本章将以 Duke Ellington（1930）的「Mood Indigo」开头几小节为背景，为它加入装饰和弦。如果你花点时间熟悉这首乐曲，接下来的讨论会更容易理解。一边聆听下文嵌入的 Louis Armstrong 对这首歌的演绎，一边跟着这里给出的前四小节的和弦。

🎼 [MuseScore 曲谱](https://musescore.com/user/32728834/scores/10006141)

谱例 1. [Duke Ellington 的「Mood Indigo」](https://open.spotify.com/track/1Fo98RNzO78WnMtkZKZXMW?si=KvjZUQyPS8ywPG1OR54UcQ)前八小节的和弦。

## 装饰副和弦

### 副 V<sup>7</sup>

进行中的任何和弦都可以通过在前面加上一个[副属和弦](../03-diatonic-harmony/15-tonicization.md)来装饰。谱例 2 把开头的 B♭ 和弦一分为二，用副 V<sup>7</sup> 和弦替换该和弦的第二个两拍，来装饰随后的 C<sup>7</sup>。原则上，这对进行中的任何和弦都可行。

🎼 [MuseScore 曲谱](https://musescore.com/user/32728834/scores/5719733)

谱例 2. 在 C<sup>7</sup> 和弦前插入一个 G<sup>7</sup> 和弦，造成 C 的副属和弦，而它在「Mood Indigo」原有的和弦进行中并不存在。

### 副 ii<sup>7</sup>

ii–V–I 一章讨论了[副 ii–V–I](04-ii-v-i.md#applied-ii-vs) 的用法，即在主调之外的调中出现的 ii–V–I 进行。许多爵士乐曲本身就含有这些副 ii–V，但演奏者也可以自己添加。属和弦常常可以通过在它前面加上它的 ii 和弦来装饰，从而转变为一个 ii–V 图式。

Duke Ellington 的「Mood Indigo」以 **B♭–C<sup>7</sup>–Cmi<sup>7</sup>–F<sup>7</sup>–B♭** 进行开始。开头的那个 C<sup>7</sup> 可以通过在它前面加一个 Gmi<sup>7</sup> 来装饰，造成一个临时的 ii–V，随后又进行到另一个 ii–V。在节奏上，这意味着把 C<sup>7</sup> 的时值切成两半，用副 ii 和弦替换前半。结果就是下文的谱例 3。

🎼 [MuseScore 曲谱](https://musescore.com/user/32728834/scores/5719690)

谱例 3. 在 C<sup>7</sup> 和弦前插入一个 Gm<sup>7</sup> 和弦，造成 F 调中的 ii–V，而它在「Mood Indigo」原有的和弦进行中并不存在。

## 共同音减七和弦（CT<sup>o7</sup>）

![谱例 4. 共同音减七和弦与被装饰和弦的根音共用一个共同音，此处用连线示出。](../media/2019/08/cto72.png)*谱例 4. 共同音减七和弦与被装饰和弦的根音共用一个共同音，此处用连线示出。*

<!-- lilylet-begin: media/2019/08/cto72.png -->
```lyl.play
\omit Score.TimeSignature \key c \major \time 4/4 \clef "treble" <e g>1 \chords "C" \\
c1~
\addlyrics { "C: I" } | %1

<ef fs a>1 \chords "C°7" \\
c1~
\addlyrics { CT°7 } | %2

<e g>1 \chords "C" \bar "||" \\
c1
\addlyrics { I } | %3

<c a'>1 \chords "F/C" \\
f1~
\addlyrics { "C: IV64" } | %4

<b d gs>1 \chords "B°7" \\
f1~
\addlyrics { CT°7 } | %5

<c a'>1 \chords "F/C" \bar "||" \\
f1
\addlyrics { IV64 } | %6
```
<!-- lilylet-end -->
共同音减七和弦（下文简称 CT<sup>o7</sup>）是一种声部进行和弦，意思是这种和弦不像大多数其他和声那样建立在某个特定的音阶级数上，而是更基本的装饰音模式的结果。在这里，装饰运动就是辅助音运动。要构成一个 CT<sup>o7</sup>，被装饰和弦的根音作为共同音保持不动（名称即由此而来），所有其他声部级进移动到包含该共同音的减七和弦的音上。这一点用记谱来说明最好，如谱例 4 所示。

CT<sup>o7</sup> 可以用来延长任何和弦。在节奏上，这个和弦被插入该和声总时值的中间某处，被延长的和声留在它两侧（如谱例 4）。另一种做法是跳过被延长和声的最初陈述，直接跳到 CT<sup>o7</sup>。谱例 5 把这两种 CT<sup>o7</sup> 都加进了「Mood Indigo」，这首曲子的旋律特别能让人想到 CT<sup>o7</sup> 装饰。在这个例子中，CT<sup>o7</sup> 和弦没有标出自己的罗马数字，以表明它们对乐句的和声进行没有实质影响——它们只是用半音辅助音装饰周围的和弦。同样，CT<sup>o7</sup> 和弦也没有标出和弦符号，因为这些和弦常常并不写进领谱，而是由演奏者即兴加上的。

🎼 [MuseScore 曲谱](https://musescore.com/user/32728834/scores/10006099/s/O6ycuv)

谱例 5. 一个 CT<sup>o7</sup> 装饰开头的 B♭ 和弦，插在占满全音符的和声的第 3 拍上。另一个 CT<sup>o7</sup> 装饰 C<sup>7</sup> 和弦，把 C<sup>7</sup> 推迟了半拍。

## 节奏与装饰和弦

要给和弦进行加入新和声，就必须改变进行的和声节奏（harmonic rhythm）。具体如何改变，取决于旋律的语境。谱例 6 标出了把每个装饰和弦塞进既有和弦进行所需的和声节奏变化。

🎼 [MuseScore 曲谱](https://musescore.com/user/32728834/scores/13782358)

谱例 6. 为容纳所增加的装饰和声而调整和声节奏的几种方式。

## 领谱中的装饰和弦 {#embellishing-chords-in-a-lead-sheet}

[与替换一样](06-substitutions.md#substitutions-in-a-lead-sheet)，装饰在领谱中并不总是以相同方式表示。

- 可能完全没有记写装饰和弦，而是由演奏者在演奏时即兴加上这一变化。
- 装饰和弦可能已经写进和弦进行，因而记在和弦符号中。
- 装饰和弦可能作为另一种配和声方式标出，在和弦符号中把装饰和弦放在括号里。

谱例 7 用几种不同方式在 Duke Ellington 的「Mood Indigo」中显示 CT<sup>o7</sup>，说明了这一点。

🎼 [MuseScore 曲谱](https://musescore.com/user/32728834/scores/6656170)

谱例 7. 装饰和弦可以（a）不写出来，由演奏者即兴；（b）写进和弦符号；（c）作为另一种配和声方式用括号标出。

> 延伸阅读

- Levine, Mark. 1995. *The Jazz Theory Book*. Petaluma, CA: Sher Music.

> 作业

1. 比波普作曲。要求学生在[摇摆节奏](01-swing-rhythms.md)、[ii–V–I](04-ii-v-i.md)、装饰和弦和[替换](06-substitutions.md)的知识基础上，创作一首比波普风格的作品。
	- [.pdf](https://viva.pressbooks.pub/app/uploads/sites/12/2019/08/COMP-bebop.pdf)：完整说明 + 模板

        <!-- lilylet-begin: media/2019/08/COMP-bebop-part-2.mscz -->
        ```lyl.play
        [composer "Megan Lavengood"]
        [staves "{-}"]

        % Worksheet instructions (text box on the page):
        % - Add a key signature on both staves, and a time signature of 4/4 on the first staff only.
        % - Copy your original (unembellished) chord symbols on your voicing example.
        % - Notate the harmonies on the staff. Write for piano, using simple whole/half notes.
        % - Incorporate extensions in almost all of your chords (9ths/13ths).
        % - Follow the three upper voices paradigm given in the Jazz Voicings chapter.

        \staff "1" \omit Score.TimeSignature \key c \major \time 4/4 \clef "treble" ^\markup "A" s1 \\
        \staff "2" \clef "bass" s1 | %1

        \staff "1" s1 \\
        \staff "2" s1 | %2

        \staff "1" s1 \\
        \staff "2" s1 | %3

        \staff "1" s1 \\
        \staff "2" s1 | %4

        \staff "1" s1 \\
        \staff "2" s1 | %5

        \staff "1" s1 \\
        \staff "2" s1 | %6

        \staff "1" s1 \\
        \staff "2" s1 | %7

        \staff "1" s1 \bar ":|." \\
        \staff "2" s1 | %8

        \staff "1" ^\markup "B" s1 \\
        \staff "2" s1 | %9

        \staff "1" s1 \\
        \staff "2" s1 | %10

        \staff "1" s1 \\
        \staff "2" s1 | %11

        \staff "1" s1 \\
        \staff "2" s1 | %12

        \staff "1" s1 \\
        \staff "2" s1 | %13

        \staff "1" s1 \\
        \staff "2" s1 | %14

        \staff "1" s1 \\
        \staff "2" s1 | %15

        \staff "1" s1 \bar "|." \\
        \staff "2" s1 | %16
        ```
        <!-- lilylet-end -->

	- [.docx](https://viva.pressbooks.pub/app/uploads/sites/12/2019/08/COMP-bebop.docx)：仅说明
2. 比波普作曲——音频选项。要求学生在[摇摆节奏](01-swing-rhythms.md)、[ii–V–I](04-ii-v-i.md)、装饰和弦和[替换](06-substitutions.md)的知识基础上，创作一首比波普风格的作品。
	- [.pdf](https://viva.pressbooks.pub/app/uploads/sites/12/2025/02/COMP-bebop-audio-option.pdf)：完整说明 + 模板
	- 和弦谱模板
	- [.docx](https://viva.pressbooks.pub/app/uploads/sites/12/2025/02/COMP-bebop-audio-option.docx)：仅说明
3. 装饰和弦（[.pdf](https://viva.pressbooks.pub/app/uploads/sites/12/2024/01/embellishing-chords.pdf)）。复习副 V<sup>7</sup>/ii<sup>7</sup> 和弦与共同音减七和弦的拼写，并要求学生在和弦进行中加入装饰和弦。

    <!-- lilylet-begin: media/2024/01/embellishing-chords.mscz -->
    ```lyl.play
    [composer "Megan Lavengood"]

    \key c \major \time 2/1 \clef "treble" \omit Score.TimeSignature <c e g bf>1 \chords "_____" \chords "C7" <f a c ef> \chords "F7" \bar "||" | %1

    s1 \chords "_____" s \chords "Bø7" \bar "||" | %2

    s1 \chords "_____" s \chords "Ebmi7" \bar "||" | %3

    s1 \chords "_____" s \chords "C#mi7" \bar "||" | %4

    s1 \chords "_____" s \chords "A7" \bar "||" | %5

    <f af c ef>1 \chords "_____" \chords "Fmi7" <bf, d f af> \chords "Bb7" \bar "||" | %6

    s1 \chords "_____" s \chords "A7" \bar "||" | %7

    s1 \chords "_____" s \chords "E7" \bar "||" | %8

    s1 \chords "_____" s \chords "C7" \bar "||" | %9

    s1 \chords "_____" s \chords "Db7" \bar "||" | %10

    <g' as cs e>1 \chords "_____" \chords "G°7" <g b d fs> \chords "Gma7" \bar "||" | %11

    s1 \chords "_____" s \chords "B7" \bar "||" | %12

    s1 \chords "_____" s \chords "Abma7" \bar "||" | %13

    s1 \chords "_____" s \chords "Fma7" \bar "||" | %14

    s1 \chords "_____" s \chords "Eb7" \bar "||" | %15

    \numericTimeSignature \time 4/4 b'4 \chords "Fma7" b b b | %16

    b'4 \chords "Fma7" b b b | %17

    b'4 \chords "Bmi7" b b \chords "E7" b | %18

    b'4 \chords "A6" b b b \bar "||" | %19

    b'4^\markup "Add an applied V7." b b b | %20

    b'4 b b b | %21

    b'4 b b b | %22

    b'4 b b b \bar "||" | %23

    b'4 \chords "Ebma7" b b b | %24

    b'4 \chords "Cmi7" b b b | %25

    b'4 \chords "Fmi7" b b \chords "Bb7" b | %26

    b'4 \chords "Ebma7" b b b \bar "||" | %27

    b'4^\markup "Add a common-tone diminished seventh." b b b | %28

    b'4 b b b | %29

    b'4 b b b | %30

    b'4 b b b \bar "||" | %31

    b'4 \chords "G7" b b b | %32

    b'4 \chords "Cmi7" b b b | %33

    b'4 \chords "F7" b b b | %34

    b'4 \chords "Bbma7" b b b \bar "||" | %35

    b'4^\markup "Add an applied ii7." b b b | %36

    b'4 b b b | %37

    b'4 b b b | %38

    b'4 b b b \bar "||" | %39

    b'4 \chords "Gma7" b b b | %40

    b'4 \chords "Bb7" b b b | %41

    b'4 \chords "Ebma7" b b b | %42

    b'4 \chords "D7" b b b \bar "||" | %43

    b'4^\markup "Add an applied ii7." b b b | %44

    b'4 b b b | %45

    b'4 b b b | %46

    b'4 b b b \bar "||" | %47

    b'4 \chords "Gma7" b b b | %48

    b'4 \chords "Gma7" b b b | %49

    b'4 \chords "Gmi7" b b b | %50

    b'4 \chords "C7" b b b \bar "||" | %51

    b'4^\markup "Add a common-tone diminished seventh." b b b | %52

    b'4 b b b | %53

    b'4 b b b | %54

    b'4 b b b \bar "||" | %55

    \stemUp a2 \chords "Dmi7" b4 \chords "G7" f' | %56

    \stemUp e8[ \chords "Cma7" f g] r r \stemDown b r \stemUp a | %57

    \stemUp gs'8[ \chords "E7" a b c] \stemDown d r e[ c~] | %58

    \stemDown c'2 \chords "Ami7" r \bar "||" | %59
    ```
    <!-- lilylet-end -->

### 媒体署名

- ctº7 © Megan Lavengood
