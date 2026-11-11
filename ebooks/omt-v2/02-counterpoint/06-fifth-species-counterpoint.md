---
title: "第五类对位"
slug: "fifth-species-counterpoint"
source: "https://viva.pressbooks.pub/openmusictheory/chapter/fifth-species-counterpoint/"
authors: ["Mark Gotham", "Kris Shaffer"]
license: "CC BY-SA 4.0"
modified: "2026-07-24"
---

# 第五类对位

> **要点**
>
> 第五类对位主要是把到目前为止学到的各种手法，再加上少许装饰，组合成某种开始接近真实音乐的东西！具体来说：
>
> - 此前各类对位的要素被组合起来，对位声部中可以包含全音符（第一类）、二分音符（第二类）、四分音符（第三类）的运动以及延留音（第四类），组合方式与顺序几乎不受限制。
> - 第五类对位的新内容是：
> 	- 某些装饰手法，例如先现音，它……
> 	- 首次可能出现八分音符运动（第一至第四类中没有出现过）。

在第五类对位中，我们把第一至第四类中发展出的各种手法组合起来，只加进少数新内容。因此，第五类对位开始以先前任何一类都不曾有的方式接近真实音乐；这里的挑战在于，不仅要平衡协和音的类型，还要平衡对位类型的搭配。

## 开始与结束

第五类对位同样遵循如今已熟悉的做法：在第一小节和最后一小节处理完满协和音程并减少运动。以完满协和音程开始，以克劳苏拉·维拉（clausula vera）结束。

## 装饰延留音

延留音本是[第四类](05-fourth-species-counterpoint.md)的内容，但在第五类对位中，我们增加了一种可能：用一些常见的装饰手法来装饰延留音。谱例 1 展示了主要类型，它们被安排在一串 7–6 延留音上。

🎼 [MuseScore 乐谱](https://musescore.com/user/32728834/scores/26283736)

谱例 1. 带有常见装饰的一串延留音。

请注意，如果把旋律线简化，把小节的第一个音延长为二分音符，你就正好回到了不加装饰的第四类延留音。

### 八分音符

也请注意，谱例 1 中最后一个延留音装饰首次引入了八分音符运动。Fux 把装饰性的延留音和八分音符运动安排在第四类与第五类“之间”。除了这种对延留音作“带回音的先现音”装饰之外，Fux 还引入了使用一对经过性八分音符的可能。所有这些情况下，八分音符都成对出现，并且位于弱拍上（填满小节的第二个或第四个四分音符）。

## 《帕纳索斯阶梯》示例

谱例 2 给出了《帕纳索斯阶梯》（*Gradus ad Parnassum*）第一部分中第五类对位的完整示例，并（一如前文）标注了对位声部与定旋律所构成的音程。若要查看《帕纳索斯阶梯》全部示例的练习、解答与标注，请见[《帕纳索斯阶梯》练习](07-gradus-ad-parnassum-exercises.md)。

🎼 [MuseScore 乐谱](https://musescore.com/user/32728834/scores/8488244)

谱例 2. 《帕纳索斯阶梯》中全部第五类对位练习。

> 作业

1. 第五类对位 A（[.pdf](https://viva.pressbooks.pub/app/uploads/sites/12/2026/07/WK-Fifth-species-Counterpoint-A.pdf)）。要求学生对一个第五类对位示例做错误检测，并自己写作一条。

    <!-- lilylet-begin: media/2026/07/WK-Fifth-species-Counterpoint-A.mscz -->
    ```lyl.play
    [composer "Kyle Gullings"]
    [staves "s1,s2"]
    [instrument-s1 "Ctpt." "Ctpt."]
    [instrument-s2 "C.F." "C.F."]

    \key bf \major \numericTimeSignature \time 2/2 \clef "treble" \stemUp f2_\markup "___  ___" g~ \\\
    \clef "bass" bf,1^\markup "Intervals:"_\markup "List at least 10 errors in the excerpt above:"_\markup "1. ____________________________________      6. ____________________________________ 2. ____________________________________      7. ____________________________________ 3. ____________________________________      8. ____________________________________ 4. ____________________________________      9. ____________________________________ 5. ____________________________________      10. ___________________________________" | %1

    \stemUp g'4_\markup "__ __ __ __" f g a \\\
    f,1 | %2

    \stemDown bf'4_\markup "__ __ __ __" \stemUp a g \stemDown bf \\\
    ef,1 | %3

    \stemUp a'2_\markup "___  ___" f~ \\\
    d,1 | %4

    \stemUp f2_\markup "___  __ __" a4 \stemDown c \\\
    c,1 | %5

    \stemDown d'2_\markup "___  ___" bf~ \\\
    f,1 | %6

    \stemDown bf'4_\markup "__  __ __ __" \stemUp a8[ g] a2 \\\
    ef,1 | %7

    \stemDown bf'4_\markup "__ __ __ __" \stemUp f d bf \\\
    d,1 | %8

    \stemUp c2_\markup "___  __ __" d4 c \\\
    c,1 | %9

    bf1_\markup "___" \bar "|." \\\
    bf,1 \bar "|." | %10

    \key d \major s1_\markup "__ __ __ __" \\\
    d,1^\markup "Intervals:" | %11

    s1_\markup "__ __ __ __" \\\
    a1 | %12

    s1_\markup "__ __ __ __" \\\
    g1 | %13

    s1_\markup "__ __ __ __" \\\
    g1 | %14

    s1_\markup "__ __ __ __" \\\
    b1 | %15

    s1_\markup "__ __ __ __" \\\
    a1 | %16

    s1_\markup "__ __ __ __" \\\
    e,1 | %17

    s1_\markup "__ __ __ __" \\\
    fs,1 | %18

    s1_\markup "__ __ __ __" \\\
    e,1 | %19

    s1_\markup "___" \bar "|." \\\
    d,1 \bar "|." | %20
    ```
    <!-- lilylet-end -->

2. 第五类对位 B（[.pdf](https://viva.pressbooks.pub/app/uploads/sites/12/2026/07/WK-Fifth-species-Counterpoint-B.pdf)）。要求学生对一个第五类对位示例做错误检测，并自己写作一条。

    <!-- lilylet-begin: media/2026/07/WK-Fifth-species-Counterpoint-B.mscz -->
    ```lyl.play
    [composer "Kyle Gullings"]
    [staves "s1,s2"]
    [instrument-s1 "Ctpt." "Ctpt."]
    [instrument-s2 "C.F." "C.F."]

    \key g \major \numericTimeSignature \time 2/2 \clef "treble" \stemDown b'2_\markup "___  ___" e~ \\\
    \clef "treble" e1^\markup "Intervals:"_\markup "(Key: E minor)"_\markup "List at least 10 errors in the excerpt above:"_\markup "1. ____________________________________      6. ____________________________________ 2. ____________________________________      7. ____________________________________ 3. ____________________________________      8. ____________________________________ 4. ____________________________________      9. ____________________________________ 5. ____________________________________      10. ___________________________________" | %1

    \stemDown e'2_\markup "___  ___" c \\\
    g'1 | %2

    \stemDown c'4_\markup "__ __ __ __" d c e \\\
    c'1 | %3

    \stemDown d'4_\markup "__ __ __ __" c b d \\\
    b'1 | %4

    \stemDown c'4_\markup "__ ___ __" e2 g4 \\\
    c'1 | %5

    \stemDown fs'2_\markup "___  ___" d~ \\\
    fs1 | %6

    \stemDown d'4_\markup "__ __ __ __" c b \stemUp a \\\
    a'1 | %7

    \stemDown b'2_\markup "___ __ __" \stemUp g4 e \\\
    g'1 | %8

    \stemUp e2_\markup "___  ___" d \\\
    fs1 | %9

    e1_\markup "___" \bar "|." \\\
    e1 \bar "|." | %10

    \key c \major s1_\markup "__ __ __ __" \\\
    c1^\markup "Intervals:" | %11

    s1_\markup "__ __ __ __" \\\
    d1 | %12

    s1_\markup "__ __ __ __" \\\
    g'1 | %13

    s1_\markup "__ __ __ __" \\\
    f1 | %14

    s1_\markup "__ __ __ __" \\\
    a'1 | %15

    s1_\markup "__ __ __ __" \\\
    g'1 | %16

    s1_\markup "__ __ __ __" \\\
    d1 | %17

    s1_\markup "__ __ __ __" \\\
    e1 | %18

    s1_\markup "__ __ __ __" \\\
    d1 | %19

    s1_\markup "___" \bar "|." \\\
    c1 \bar "|." | %20
    ```
    <!-- lilylet-end -->

3. 全套 Fux 练习见[《帕纳索斯阶梯》](07-gradus-ad-parnassum-exercises.md)一章。
