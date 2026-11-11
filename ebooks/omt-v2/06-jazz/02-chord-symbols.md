---
title: "和弦符号"
slug: "chord-symbols"
source: "https://viva.pressbooks.pub/openmusictheory/chapter/chord-symbols/"
authors: ["Megan Lavengood"]
license: "CC BY-SA 4.0"
modified: "2026-06-17"
---

# 和弦符号

> **要点**
>
> - 和弦符号告诉你三和弦的根音、三和弦的性质、三和弦之上附加的延伸音，以及任何非根音的低音。
> - 和弦符号不指向某个具体的调。相反，除非另有说明，符号总被假定为某种默认性质：
> 	- 三和弦默认是大三和弦。
> 	- 加在三和弦上的七音默认是小七度。
> 	- 其他所有延伸音和附加音默认是大音程/纯音程。
> - 变化音用升、降号表示，或用加号、减号表示。两套体系在现实中都很常见；写自己的谱表时，选一套并始终如一地坚持。本教材采用升/降号体系来表示变化音。

![谱例 1. 一个和弦符号有四个组成部分：1）三和弦的根音，2）三和弦的性质，3）三和弦之外是否还有延伸音，4）低音。](../media/2019/08/lead-sheet-components.png)*谱例 1. 一个和弦符号有四个组成部分：1）三和弦的根音，2）三和弦的性质，3）三和弦之外是否还有延伸音，4）低音。*

本教材讨论和声时使用两套速记体系：和弦符号（chord symbol）与[罗马数字](../01-fundamentals/21-roman-numerals.md)。和弦符号有时也叫「领谱符号」（lead sheet symbol），因为它出现在领谱上——领谱是爵士乐谱，通常只记写旋律和这些和弦符号。

和弦符号能用几个字母装进大量信息。谱例 1 给出了一个复杂的符号，并用标注展示了和弦符号可能包含的各个组成部分。

## 和弦符号的基础

### 三和弦

和弦符号以大三和弦为常态。如果你看到的和弦符号只有一个音名，那就意味着演奏大三和弦。表示其他三和弦性质时，要加上别的符号，谱例 2 对此作了总结。

| 三和弦性质 | 和弦符号（以 C 为根音的和弦为例） |
| --- | --- |
| 大三和弦 | C |
| 小三和弦 | Cmi, Cm, C- |
| 减三和弦 | C<sup>o</sup>, Cdim, Cm<sup>(♭5)</sup>, Cm<sup>(-5)</sup> |
| 增三和弦 | C+, Caug |

谱例 2. 三和弦的和弦符号。

注意，每一种非大三和弦的性质都有好几种表示方法。这是因为和弦符号是随着爵士乐的发展逐步形成的，从未完全标准化。谱例 2 和谱例 3 中的符号并不全面，但根据这里的例子，你大概能解读出其他变体。了解表示这些不同三和弦性质的所有可能方式是有好处的，但你自己只需坚持一种写法。在谱例 2 和谱例 3 中，本教材所用的符号列在最前面。

### 七和弦

加在三和弦上最常见的音是七度音程。附加的七音用阿拉伯数字 7 写在根音之后、右上方来表示。

与三和弦一样，单写一个数字 7 表示默认的性质：小七度。对符号加以变化则表示其他可能，于是得到谱例 3 所总结的七和弦符号：

> *注意：*因为三和弦默认是大三和弦、七音默认是小七度，所以符号 C<sup>7</sup> 表示属性质的七和弦（大三和弦 + 小七度）。

| 七和弦性质 | 和弦符号（以 C 为根音的和弦为例） |
| --- | --- |
| 属七和弦 | C<sup>7</sup> |
| 大七和弦 | C<sup>ma7</sup>, C<sup>maj7</sup>, C<sup>∆7</sup> |
| 小七和弦 | Cmi<sup>7</sup>, Cm<sup>7</sup>, C-<sup>7</sup> |
| 半减七和弦 | C<sup>ø7</sup>, Cm<sup>7♭5</sup>, C-<sup>7♭5</sup> |
| 减七和弦 | C<sup>o7</sup> |

### 谱例 3. 七和弦的和弦符号。

这张表只列出了五种传统的七和弦性质，但其他性质也是可能的，比如 m<sup>(maj7)</sup>、aug<sup>7</sup> 等等。同样，这些表并不全面，不过当你遇到不熟悉的符号时，应当能用基本符号的知识推断出它的意思。

### 低音

在大部分爵士和流行音乐中，低音就是和弦的根音。（贝斯手可能会围绕其他音即兴，而不严格停在和弦根音上，但这不会影响和声的记写方式。）因此，除非另有说明，和弦符号都被假定为原位和弦。

如果低音应当不是根音，就用一条斜线加低音的音名来表示。例如，C/E 表示演奏一个低音为 E 的 C 大三和弦。

值得注意的是，低音不必是和弦的成员！C/F♯ 表示在 F♯ 之上演奏一个 C 大三和弦。

## 延伸音 {#extensions}

![谱例 4. 在七音之上继续叠加三度，就产生了九音、十一音和十三音。](../media/2019/08/extensions.png)*谱例 4. 在七音之上继续叠加三度，就产生了九音、十一音和十三音。*

<!-- lilylet-begin: media/2019/08/extensions.png -->
```lyl.play
\omit Score.TimeSignature \omit Score.BarLine \key c \major \clef "treble" <c e g bf d f a>1
\addlyrics { 13th }
\addlyrics { 11th }
\addlyrics { 9th }
\addlyrics { 7th }
\addlyrics { 5th }
\addlyrics { 3rd }
\addlyrics { root } | %1
```
<!-- lilylet-end -->
爵士和声往往不只演奏和弦符号明确指出的音，还会加上层的延伸音（extension）。这个术语来自*延伸*那堆构成和声的三度的想法。七音是最常见的三和弦延伸音，但爵士乐常常用到更高的延伸音——把越来越多的三度叠到基本三和弦上，就得到九音、十一音和十三音（谱例 4）。

### 音程的大小

你也许注意到，九度、十一度和十三度分别只是二度、四度和六度的复音程版本，那为什么要用更难概念化的复音程，而不直接把这些音程叫做二度/四度/六度呢？原因有两个：

1. 和弦符号中出现某个延伸音，意味着它下方所有其他延伸音也都存在。所以，一个十一和弦不只是三和弦加十一音——它是三和弦加十一音、九音和七音。[^1]
2. 延伸音常常被[排列](03-jazz-voicings.md)（演奏）在其他和弦成员之上。换句话说，在实际演奏的音乐中，延伸音听起来确实在根音之上一个十三度处，而不是（比方说）六度。

### 音程性质与延伸音的变化

七音的默认性质是小七度，而延伸音和附加音默认是大音程（九音和十三音）或纯音程（十一音），除非另有说明。因此谱例 4 中的和弦就是简单的 C<sup>13</sup> 和弦：除小七度的七音（B♭）之外，所有延伸音都是 C 上方的大音程/纯音程。

其他音程性质用升号和降号表示，把默认的音高升高或降低半音。所以，C<sup>7(♯11)</sup> 和弦会在根音之上包含 F♯——一个增十一音——而不是通常的 F♮。

![谱例 5. 和弦符号中的变音记号与相应的记谱——注意在和弦符号中，升/降号表示音程变大/变小，并不一定是实际的升/降音。](../media/2019/08/altered_exts.png)*谱例 5. 和弦符号中的变音记号与相应的记谱——注意在和弦符号中，升/降号表示音程变大/变小，并不一定是实际的升/降音。*

<!-- lilylet-begin: media/2019/08/altered_exts.png -->
```lyl.play
\omit Score.TimeSignature \key c \major \clef "treble" <f a c ef gf b>1 \chords "F7(♭9/♯11)" ^\markup "♯11 (B♮!), ♭9" \bar "||" | %1
<b ds fs a c es>1 \chords "B7(♭9/♯11)" ^\markup "♯11, ♭9 (C♮!)" \bar "||" | %2
```
<!-- lilylet-end -->
注意，在这个语境中，这些符号应当相对地理解。所以，♯11 实际上意味着「把十一音升高」，♭9 实际上意味着「把九音降低」——如谱例 5 所示，被变化的音不一定是升音或降音。下文「[和弦符号与罗马数字](#chord-symbols-vs-roman-numerals)」一节会进一步讨论这一点。

为清楚起见，总要先写出「7」，再列出变化的延伸音。此外，变化的延伸音常常放在括号里，这样演奏者就能一眼看出变音记号作用于延伸音，而不是和弦的根音。如果用到多个变化的延伸音，也可以用斜线把它们清楚地分隔开，如谱例 5 所示。

## 附加音（add）与挂留（sus）

### add

![谱例 6. 带附加音的和弦的例子。](../media/2019/08/adds.png)*谱例 6. 带附加音的和弦的例子。*

<!-- lilylet-begin: media/2019/08/adds.png -->
```lyl.play
\omit Score.TimeSignature \key c \major \clef "treble" <c d e g>1 \chords "Cadd2" \bar "||" | %1
<c e g d'>1 \chords "Cadd9" \bar "||" | %2
<c e g a>1 \chords "C6" ^\markup "added note, but add is not in the symbol" \bar "||" | %3
<c e g a d>1 \chords "C6/9" ^\markup "(same)" \bar "||" | %4
```
<!-- lilylet-end -->
要表示给和弦加一个音、而*不*暗示其下有七音，就把「add」写进符号。例如，C<sup>add9</sup> 是在三和弦之上演奏一个 D 的 C 大三和弦，但不含任何七音：**C–E–G–D**。（回想一下，C<sup>9</sup> 否则还意味着给 C 三和弦加上小七度：**C–E–G–B♭–D**。）你也可以在三和弦内部加音：C<sup>add2</sup> 表示一个 C 大三和弦，另有一个 D 排列在三和弦*内部*：**C–D–E–G**。

至于附加六音，我们直接写数字 6 而不写「add」——例如，带附加六音的 C 大三和弦写作 C<sup>6</sup>。这种（正常的）简写之所以可以接受，原因有二：其一，附加六音特别常见；其二，不存在会与之混淆的可能解读。三和弦上另一种常见的附加是六音与九音同时使用，同样不加「add」：例如 C$^6_9$。

### sus

![谱例 7. 带挂留的和弦（挂留和弦，sus chord）。](../media/2019/08/sus.png)*谱例 7. 带挂留的和弦（挂留和弦，sus chord）。*

<!-- lilylet-begin: media/2019/08/sus.png -->
```lyl.play
\omit Score.TimeSignature \key c \major \clef "treble" <c f g>1 \chords "Csus" \bar "||" | %1
<c d g>1 \chords "Csus2" \bar "||" | %2
<c f g bf>1 \chords "C7sus" \bar "||" | %3
```
<!-- lilylet-end -->
另一种变化是挂留和弦，缩写为「sus」，表示和弦的三音应由根音上方的另一个音程取代（谱例 6）。这个术语来自一种常见的延留：低音上方的四度解决到低音上方的三度。的确，挂留和弦后面常常跟着一个同根音的非挂留和弦（不过这绝非必须）。

默认的假定是：和弦的三音由根音上方的纯四度取代。那么 Csus 的音就是 **C–F–G**——C 三和弦的 E 被 F 取代。

偶尔你会看到 sus<sup>2</sup> 和弦，它用根音上方的大二度取代三音（Csus<sup>2</sup> = **C–D–G**）。

要写带挂留的七和弦/延伸和弦的符号，「sus」缩写放在延伸音*之后*，如 C<sup>7</sup>sus。这是为了清楚，因为 Csus<sup>7</sup> 可能看起来太像 Csus<sup>2</sup>。

 

> **试一试！**
>
> 拿出一张草稿纸，把下面这些和弦符号所指的和声记写出来，看看自己是否理解了和弦符号。每完成一个和弦，就可以把滑块向右拉，揭晓正确答案。
>
> 🧩 互动练习（H5P）：领谱练习，见[在线版](02-chord-symbols.md)。
>
> 你也可以[在 Musescore.com 上](https://musescore.com/user/32728834/scores/5686168)查看并试听答案。

## 和弦符号与罗马数字 {#chord-symbols-vs-roman-numerals}

重要的是要明白，和弦符号是*绝对*的标记，而罗马数字是*相对*的标记。罗马数字更具理论性和抽象性，因为它告诉你一个和弦相对于乐曲之调的位置。另一方面，和弦符号告诉你这个和弦中具体（*绝对*）在演奏哪些音，而不参照任何调。解读和弦符号时，重要的是暂时把相对思维放在一边。和弦符号不指向调。

在许多语境中，较简单的符号 C/A♭ 比 A♭<sup>ma7(#5)</sup> 这样更具分析描述性的写法更受青睐。和弦符号*不是*分析性的——它们是记写乐谱的一种速记方式。换句话说，和弦符号的目的是让演奏者的手指在正确的时间到达正确的音。如果符号因此更容易解读，和弦符号可能以功能性较弱的方式来表示事物。谱例 8 就是这样一个例子：虽然第二个和弦在功能上确实是一个 A♭<sup>ma7(#5)</sup> 和弦，与常规的 A♭ 三和弦相邻，但符号 C/A♭ 可能更容易处理，因而更受青睐。（不过，两个符号本身都不总是对或错——它们都会导致正确的音被演奏出来，更好的选择取决于语境。）

🎼 [MuseScore 曲谱](https://musescore.com/user/32728834/scores/23335099)

谱例 8. 可以用多个被接受的和弦符号来表达同样的音。哪一个更好取决于语境。

记住这些问题，有助于理解和弦符号体系中的逻辑。尽管和弦符号变化很多，学几条规则就能帮你解读任何符号。

> 作业

1. 和弦符号基础练习表（[.pdf](https://viva.pressbooks.pub/app/uploads/sites/12/2021/07/WK-Chord-Symbols.pdf)）。要求学生用和弦符号识别并写出三和弦和七和弦。

    <!-- lilylet-begin: media/2021/07/WK-Chord-Symbols.mscz -->
    ```lyl.play
    [staves "{s1-s2}"]

    \staff "1" \key c \major \clef "treble" <e g b>1^\markup "1"^\markup "________" \bar "||" \\
    \staff "2" \clef "treble" R1 | %1

    \staff "1" <gs' b d>1^\markup "2"^\markup "________" \bar "||" \\
    \staff "2" R1 | %2

    \staff "1" <c' e g>1^\markup "3"^\markup "________" \bar "||" \\
    \staff "2" R1 | %3

    \staff "1" <d fs as>1^\markup "4"^\markup "________" \bar "||" \\
    \staff "2" R1 | %4

    \staff "1" <g' bf d>1^\markup "5"^\markup "________" \bar "||" \\
    \staff "2" R1 | %5

    \staff "1" <af' c e>1^\markup "6"_\markup "PART 2\nSpell the triad indicated by each chord symbol."^\markup "________" \bar "||" \\
    \staff "2" R1 | %6

    \staff "1" <fs as cs>1^\markup "7"^\markup "________" \bar "||" \\
    \staff "2" R1 | %7

    \staff "1" <e g bf>1^\markup "8"^\markup "________" \bar "||" \\
    \staff "2" R1 | %8

    \staff "1" <d f a>1^\markup "9"^\markup "________" \bar "||" \\
    \staff "2" R1 | %9

    \staff "1" <bf' d fs>1^\markup "10"^\markup "________" \bar "|." \\
    \staff "2" R1 | %10

    \staff "1" s1 \chords "Bb" \bar "||" \\
    \staff "2" R1 | %11

    \staff "1" s1 \chords "F#mi" \bar "||" \\
    \staff "2" R1 | %12

    \staff "1" s1 \chords "Db+" \bar "||" \\
    \staff "2" R1 | %13

    \staff "1" s1 \chords "A" \bar "||" \\
    \staff "2" R1 | %14

    \staff "1" s1 \chords "Cmi" \bar "||" \\
    \staff "2" R1 | %15

    \staff "1" s1 \chords "F#°" \bar "||" \\
    \staff "2" R1 | %16

    \staff "1" s1 \chords "E+" \bar "||" \\
    \staff "2" R1 | %17

    \staff "1" s1 \chords "B" \bar "||" \\
    \staff "2" R1 | %18

    \staff "1" s1 \chords "F" \bar "||" \\
    \staff "2" R1 | %19

    \staff "1" s1 \chords "Eb°" \bar "|." \\
    \staff "2" R1 | %20

    \staff "1" <f a c e>1^\markup "21"^\markup "PART 3\nWrite the chord symbol for each seventh chord."^\markup "________" \bar "||" \\
    \staff "2" R1 | %21

    \staff "1" <ds fs a c>1^\markup "22"^\markup "________" \bar "||" \\
    \staff "2" R1 | %22

    \staff "1" <b d fs a>1^\markup "23"^\markup "________" \bar "||" \\
    \staff "2" R1 | %23

    \staff "1" <ef g bf df>1^\markup "24"^\markup "________" \bar "||" \\
    \staff "2" R1 | %24

    \staff "1" <g' b d fs>1^\markup "25"^\markup "________" \bar "||" \\
    \staff "2" R1 | %25

    \staff "1" <c ef gf bf>1^\markup "26"^\markup "________" \bar "||" \\
    \staff "2" R1 | %26

    \staff "1" <a' cs e g>1^\markup "27"^\markup "________" \bar "||" \\
    \staff "2" R1 | %27

    \staff "1" <e g b d>1^\markup "28"^\markup "________" \bar "||" \\
    \staff "2" R1 | %28

    \staff "1" <b d f a>1^\markup "29"^\markup "________" \bar "||" \\
    \staff "2" R1 | %29

    \staff "1" <f af cf ef>1^\markup "30"^\markup "________" \bar "|." \\
    \staff "2" R1 | %30

    \staff "1" s1 \chords "Dø7" \bar "||" \\
    \staff "2" R1 | %31

    \staff "1" s1 \chords "B7" \bar "||" \\
    \staff "2" R1 | %32

    \staff "1" s1 \chords "Emi7" \bar "||" \\
    \staff "2" R1 | %33

    \staff "1" s1 \chords "G°7" \bar "||" \\
    \staff "2" R1 | %34

    \staff "1" s1 \chords "Ama7" \bar "||" \\
    \staff "2" R1 | %35

    \staff "1" s1 \chords "G#mi7" \bar "||" \\
    \staff "2" R1 | %36

    \staff "1" s1 \chords "C#ø7" \bar "||" \\
    \staff "2" R1 | %37

    \staff "1" s1 \chords "B°7" \bar "||" \\
    \staff "2" R1 | %38

    \staff "1" s1 \chords "Fma7" \bar "||" \\
    \staff "2" R1 | %39

    \staff "1" s1 \chords "Eb7" \bar "|." \\
    \staff "2" R1 | %40

    \staff "1" <d gs>1^\markup "41"^\markup "________" \bar "||" \\
    \staff "2" \clef "bass" <e, b'>1 | %41

    \staff "1" <c e>1^\markup "42"^\markup "________" \bar "||" \\
    \staff "2" <a, g'>1 | %42

    \staff "1" <e g>1^\markup "43"^\markup "________" \bar "||" \\
    \staff "2" <c, b'>1 | %43

    \staff "1" <g' b>1^\markup "44"^\markup "________" \bar "||" \\
    \staff "2" <g d'>1 | %44

    \staff "1" <d f>1^\markup "45"^\markup "________" \bar "||" \\
    \staff "2" <d, af'>1 | %45

    \staff "1" <a' c>1^\markup "46"^\markup "________" \bar "||" \\
    \staff "2" <fs, ef'>1 | %46

    \staff "1" <b d>1^\markup "47"^\markup "________" \bar "||" \\
    \staff "2" <b, fs'>1 | %47

    \staff "1" <c f>1^\markup "48"^\markup "________" \bar "||" \\
    \staff "2" <d, a'>1 | %48

    \staff "1" <c ef>1^\markup "49"^\markup "________" \bar "||" \\
    \staff "2" <a, g'>1 | %49

    \staff "1" <c e>1^\markup "50"^\markup "________" \bar "|." \\
    \staff "2" <c, gs'>1 | %50
    ```
    <!-- lilylet-end -->

2. 带延伸音的和弦符号（[.pdf](https://viva.pressbooks.pub/app/uploads/sites/12/2021/07/WK-Chord-Symbols-with-Extensions.pdf)）。要求学生用和弦符号识别并写出延伸和弦。

    <!-- lilylet-begin: media/2021/07/WK-Chord-Symbols-with-Extensions.mscz -->
    ```lyl.play
    [staves "{s1-s2}"]

    \staff "1" \key c \major \clef "treble" <b d fs a cs>1^\markup "1"^\markup "________" \chords "Bmi7" \bar "||" \\
    \staff "2" \clef "treble" R1 | %1

    \staff "1" <d f af cf e>1^\markup "2"^\markup "________" \bar "||" \\
    \staff "2" R1 | %2

    \staff "1" <e fs g b>1^\markup "3"^\markup "________" \bar "||" \\
    \staff "2" R1 | %3

    \staff "1" <e gs b ds fs as>1^\markup "4"^\markup "________" \bar "||" \\
    \staff "2" R1 | %4

    \staff "1" <bf f' af d>1^\markup "5"^\markup "________" \bar "||" \\
    \staff "2" R1 | %5

    \staff "1" <d fs c' b'>1^\markup "6"^\markup "________" \bar "||" \\
    \staff "2" R1 | %6

    \staff "1" <fs as cs gs'>1^\markup "7"^\markup "________" \bar "||" \\
    \staff "2" R1 | %7

    \staff "1" <b ds fs a c>1^\markup "8"^\markup "________" \bar "||" \\
    \staff "2" R1 | %8

    \staff "1" <e g bf d fs a>1^\markup "9"^\markup "________" \bar "||" \\
    \staff "2" R1 | %9

    \staff "1" <a cs g' b f'>1^\markup "10"^\markup "________" \bar "|." \\
    \staff "2" R1 | %10

    \staff "1" <f bf>1^\markup "11"^\markup "________" \bar "||" \\
    \staff "2" \clef "bass" <d, af' c>1 | %11

    \staff "1" <f a c>1^\markup "12"^\markup "________" \bar "||" \\
    \staff "2" <g b d>1 | %12

    \staff "1" <bf df>1^\markup "13"^\markup "________" \bar "||" \\
    \staff "2" <c, e g>1 | %13

    \staff "1" ds1^\markup "14"^\markup "________" \bar "||" \\
    \staff "2" <fs, a cs>1 | %14

    \staff "1" <g' b fs'>1^\markup "15"^\markup "________" \bar "||" \\
    \staff "2" <a cs e>1 | %15

    \staff "1" <df fs>1^\markup "16"^\markup "________" \bar "||" \\
    \staff "2" <ef, g bf>1 | %16

    \staff "1" cs'1^\markup "17"^\markup "________" \bar "||" \\
    \staff "2" <b ds fs>1 | %17

    \staff "1" <c e g>1^\markup "18"^\markup "________" \bar "||" \\
    \staff "2" <d, f a>1 | %18

    \staff "1" <e g>1^\markup "19"^\markup "________" \bar "||" \\
    \staff "2" <fs, as cs>1 | %19

    \staff "1" <c gf' bf>1^\markup "20"^\markup "________" \bar "|." \\
    \staff "2" <af, gf'>1 | %20

    \staff "1" <ef g>1^\markup "21"^\markup "________"^\markup "________" \chords "F7" \chords "F9" \bar "||" \\
    \staff "2" <f, a c>1 | %21

    \staff "1" <cs e gs>1^\markup "22"^\markup "________"^\markup "________" \bar "||" \\
    \staff "2" <d, fs a>1 | %22

    \staff "1" <a c>1^\markup "23"^\markup "________"^\markup "________" \bar "||" \\
    \staff "2" <c, e g>1 | %23

    \staff "1" <e g>1^\markup "24"^\markup "________"^\markup "________" \bar "||" \\
    \staff "2" <fs, a c>1 | %24

    \staff "1" <cs e gs>1^\markup "25"^\markup "________"^\markup "________" \bar "||" \\
    \staff "2" <b, ds a'>1 | %25

    \staff "1" bf1^\markup "26"^\markup "________"^\markup "________" \bar "||" \\
    \staff "2" <a, cs g'>1 | %26

    \staff "1" a'1^\markup "27"^\markup "________"^\markup "________" \bar "||" \\
    \staff "2" <ef, g bf d>1 | %27

    \staff "1" <a' ef' g>1^\markup "28"^\markup "________"^\markup "________" \bar "||" \\
    \staff "2" <f, c'>1 | %28

    \staff "1" <e bf'>1^\markup "29"^\markup "________"^\markup "________" \bar "||" \\
    \staff "2" <d, fs c'>1 | %29

    \staff "1" <e g d'>1^\markup "30"^\markup "________"^\markup "________" \bar "||" \\
    \staff "2" <c, b'>1 | %30

    \staff "1" <d fs a c e g b>1^\markup "31" \chords "D13" \bar "||" \\
    \staff "2" \clef "treble" R1 | %31

    \staff "1" s1 \chords "Eb(add6)" \bar "||" \\
    \staff "2" R1 | %32

    \staff "1" s1 \chords "Bb+7" \bar "||" \\
    \staff "2" R1 | %33

    \staff "1" s1 \chords "F11" \bar "||" \\
    \staff "2" R1 | %34

    \staff "1" s1 \chords "Bma9" \bar "||" \\
    \staff "2" R1 | %35

    \staff "1" s1 \chords "C7(b13)" \bar "||" \\
    \staff "2" R1 | %36

    \staff "1" s1 \chords "Ab7(#11)" \bar "||" \\
    \staff "2" R1 | %37

    \staff "1" s1 \chords "C#ø9" \bar "||" \\
    \staff "2" R1 | %38

    \staff "1" s1 \chords "E13sus4" \bar "||" \\
    \staff "2" R1 | %39

    \staff "1" s1 \chords "A9" \bar "|." \\
    \staff "2" R1 | %40
    ```
    <!-- lilylet-end -->

### 媒体署名

- Lead sheet components © Megan Lavengood，[CC BY-SA（署名—相同方式共享）](https://creativecommons.org/licenses/by-sa/4.0/)许可
- Extensions © Megan Lavengood，[CC BY-SA（署名—相同方式共享）](https://creativecommons.org/licenses/by-sa/4.0/)许可
- Altered extensions © Megan Lavengood，[CC BY-SA（署名—相同方式共享）](https://creativecommons.org/licenses/by-sa/4.0/)许可
- Added notes © Megan Lavengood，[CC BY-SA（署名—相同方式共享）](https://creativecommons.org/licenses/by-sa/4.0/)许可
- Sus chords © Megan Lavengood，[CC BY-SA（署名—相同方式共享）](https://creativecommons.org/licenses/by-sa/4.0/)许可

---

[^1]: 虽然最高延伸音下方的所有延伸音都被*暗示*存在，它们并不一定被演奏。事实上，通常所有可能的音*不会*被演奏，最高延伸音与七音之间的一些延伸音会被省略。记写的内容、理解的内容与实际演奏的内容之间的差异，在[爵士排列](03-jazz-voicings.md)一章中有更多讨论。
