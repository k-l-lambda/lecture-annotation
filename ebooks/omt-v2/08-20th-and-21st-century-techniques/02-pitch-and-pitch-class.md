---
title: "音高与音级"
slug: "pitch-and-pitch-class"
source: "https://viva.pressbooks.pub/openmusictheory/chapter/pitch-and-pitch-class/"
authors: ["Megan Lavengood"]
license: "CC BY-SA 4.0"
modified: "2025-07-15"
---

# 音高与音级

> **要点**
>
> - 集合理论（set theory）常常依赖于音高（pitch）与音级（pitch class）之间的区分。
> - 音级最好用整数记法（integer notation）来表示，其中 C=0。

## 音高

音高是具有各自频率的离散音。

因此，音高的概念并不包含八度等同（octave equivalence）。C<sub>4</sub> 是一个音高，它与 C<sub>3</sub> 不是同一个音高。

## 音级

在整个集合理论中，“级”（class）一词的意思都是“组”。所以，音级就是一组音高——所有因八度等同与等音等同（enharmonic equivalence）而相互关联的音高。你很可能已经遇到过这两个概念，即使没有听过它们的名称。

我们的字母音名体系本身就已隐含了八度等同：拼写相同、但相隔任意八度的音高彼此等同。C<sub>4</sub> 与 C<sub>3</sub> 相同，也与 C<sub>9</sub> 相同，依此类推，因为它们都是 C（谱例 1）。

当有人说“一共有十二个音”时，他隐含了等音等同。如果两个音需要在钢琴上按同一个键来弹奏，它们就是等音等同的——即使拼写不同。等音等同就是 A♭ 与 G♯ 在“相同”这个意义上的相同。调性音乐几乎总是区分等音拼写——A♭ 作为 *le* $(\downarrow\hat{6})$ 进行到 G，而 G♯ 作为 *si* $(\uparrow\hat{5})$ 进行到 A——后调性音乐则往往不同。[^1]由于许多作曲家不再觉得自己受调性中心的约束，音阶级数之间的关系以及拼写就不再重要了。

总之，音级是因八度等同和等音等同而相互关联的一组组音高。A♭<sub>4</sub>、A♭<sub>3</sub>、G♯<sub>2</sub> 等等，都属于同一个音级。

![谱表上的音名；一个箭头连接不同八度的两个音，并标注“same pitch class, different pitch”（同一音级，不同音高）](../media/2019/05/Pitch-Space.jpg)

谱例 1. 音高与音级。

## 整数记法

![谱例 2. 十二个音级被表示为钟面。](../media/2019/05/Pitch-class-Space.jpg)*谱例 2. 十二个音级被表示为钟面。*

如果各音之间是等音等同的，那么七个字母音名的体系就不太适合描述这十二个音级。因此，在集合理论中我们使用整数记法，即为每个音级指定 0 到 11 之间的一个数字（谱例 2）。所有的 C，以及任何与 C 等音等同的音（例如 B♯），都是音级 0。所有的 C♯，以及任何与 C♯ 等音等同的音（例如 D♭），都是音级 1，依此类推。下面用几个最常见的音名作一小结：

0. C（B♯ 等）
1. C♯、D♭
2. D（C𝄪 等）
3. D♯、E♭
4. E（F♭ 等）
5. F（E♯ 等）
6. F♯、G♭
7. G（F𝄪 等）
8. G♯、A♭
9. A（G𝄪 等）
10. A♯、B♭
11. B（C♭ 等）

> **练习**
>
> 用填空来检验你对整数音名的记忆。
>
> 🧩 互动练习（H5P）：音名与整数，见[在线版](02-pitch-and-pitch-class.md)。

> 延伸阅读

- Straus, Joseph N. 2016. *Introduction to Post-Tonal Theory*. 4th ed. Upper Saddle River, NJ: Prentice Hall.

> 资源

- [空白钟面（整数记法）](https://viva.pressbooks.pub/app/uploads/sites/12/2019/05/Clock-Faces-integers.pdf)
- [空白钟面（字母音名）](https://viva.pressbooks.pub/app/uploads/sites/12/2019/05/Clock-Faces-letters.pdf)
- [集合理论速查表](https://viva.pressbooks.pub/app/uploads/sites/12/2019/05/INFO-set-theory-quick-reference-sheet.pdf)：概述音高与音级、音程与音程级、集合与集合类这几对定义的区分。

> 作业

1. 音高与音级（.[pdf](https://viva.pressbooks.pub/app/uploads/sites/12/2021/08/WK-Pitch-and-Pitch-Class.pdf)）。要求学生在音级整数、音名和五线谱之间互相转换。

    <!-- lilylet-begin: media/2021/08/WK-Pitch-and-Pitch-Class.mscz -->
    ```lyl.play
    [staves "{s1-s2}"]

    \staff "1" \key c \major \clef "treble" s1 \bar "||" \\
    \staff "2" \clef "bass" ef,1^\markup "____"^\markup "PART 1: Converting Note Names to Integers\nFor each note name given below, write the correct pitch class integer (0 through 11).\n\n 1. D =    ____      2. B♭=  ____      3. E♭=  ____       4. F♯ =   ____      5. A =    ____      6. C♯ = ____\n\n 7. B =    ____      8. G =     ____   9. E♯ =   ____     10. D♭= ____     11. A♯ = ____     12. F =   ____\n\n13. D♯ = ____     14. G♭= ____     15. F♭= ____      16. B♯ =  ____     17. C =  ____      18. E =  ____\n\n19. G♯ = ____     20. C♭= ____      21. A♭= ____\n\nPART 2: Converting Notated Pitches to Integers\nFor each pitch notated below, write the correct pitch class integer (0 through 11) in the blank between\nthe staves."^\markup "1" | %1

    \staff "1" a'1^\markup "2"^\markup "____" \bar "||" \\
    \staff "2" s1 | %2

    \staff "1" s1 \bar "||" \\
    \staff "2" d,1^\markup "____"^\markup "3" | %3

    \staff "1" ff'1^\markup "4"^\markup "____" \bar "||" \\
    \staff "2" s1 | %4

    \staff "1" cs'1^\markup "5"^\markup "____" \bar "||" \\
    \staff "2" s1 | %5

    \staff "1" s1 \bar "||" \\
    \staff "2" af,1^\markup "____"^\markup "6" | %6

    \staff "1" s1 \bar "||" \\
    \staff "2" b,1^\markup "____"^\markup "7" | %7

    \staff "1" df1^\markup "8"^\markup "____" \bar "||" \\
    \staff "2" s1 | %8

    \staff "1" es'1^\markup "9"^\markup "____" \bar "||" \\
    \staff "2" s1 | %9

    \staff "1" b'1^\markup "10"^\markup "____" \bar "||" \\
    \staff "2" s1 | %10

    \staff "1" s1 \bar "||" \\
    \staff "2" cf,1^\markup "____"^\markup "11" | %11

    \staff "1" s1 \bar "||" \\
    \staff "2" gf1^\markup "____"^\markup "12" | %12

    \staff "1" s1 \bar "||" \\
    \staff "2" e,1^\markup "____"^\markup "13" | %13

    \staff "1" bf'1^\markup "14"^\markup "____" \bar "||" \\
    \staff "2" s1 | %14

    \staff "1" ff1^\markup "15"^\markup "____" \bar "||" \\
    \staff "2" s1 | %15

    \staff "1" s1 \bar "||" \\
    \staff "2" gs,1^\markup "____"^\markup "16" | %16

    \staff "1" bf'1^\markup "17"^\markup "____" \bar "||" \\
    \staff "2" s1 | %17

    \staff "1" f1^\markup "18"^\markup "____" \bar "||" \\
    \staff "2" s1 | %18

    \staff "1" s1 \bar "||" \\
    \staff "2" as,1^\markup "____"^\markup "19" | %19

    \staff "1" ds'1^\markup "20"^\markup "____" \bar "||" \\
    \staff "2" s1 | %20

    \staff "1" s1 \bar "||" \\
    \staff "2" c,1^\markup "____"^\markup "21" | %21

    \staff "1" \time 5/4 \omit Score.TimeSignature s4 s2 \stemDown ef''4 ef, \bar "||" \\
    \staff "2" \stemDown ef,4_\markup "pc 3" ds ds' s s | %22

    \staff "1" s1 s4 \bar "||" \\
    \staff "2" s1 s4 | %23

    \staff "1" s1 s4 \bar "||" \\
    \staff "2" s1 s4 | %24

    \staff "1" s1 s4 \bar "||" \\
    \staff "2" s1 s4 | %25

    \staff "1" s1 s4 \bar "||" \\
    \staff "2" s1 s4 | %26

    \staff "1" s1 s4 \bar "||" \\
    \staff "2" s1 s4 | %27
    ```
    <!-- lilylet-end -->

### 媒体署名

- Pitch Space © Bryn Hughes is licensed under a [CC BY-SA (Attribution ShareAlike)](https://creativecommons.org/licenses/by-sa/4.0/) license
- Pitch-class-Space © Bryn Hughes is licensed under a [CC BY-SA (Attribution ShareAlike)](https://creativecommons.org/licenses/by-sa/4.0/) license

---

[^1]: 后调性音乐极其多样。作曲家各有其个人化的作曲风格、审美目标和独特的音高观念。这一切都说明，你必须以灵活的态度对待一部作品。例如：德彪西（Debussy）的音乐带有准调性，因此从“不假定等音等同”的角度出发往往更有所得；但有时它又确实需要等音等同。分析这类音乐时，你必须依靠自己的音乐直觉，也应当愿意从多个角度去审视这些作品中的音高，直到找到一个看来最合适的角度。
