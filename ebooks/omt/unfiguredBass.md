# 实现无数字低音线

要实现一条无数字低音，首先要确定低音中的音级进行所呈现的和声功能。然后为每个低音音符选择与这些功能相符的数字标记。最后，按照通常的步骤实现由此得到的数字低音。

▶️ [视频：实现无数字低音](https://vimeo.com/48673007)

下表给出了每个自然音音级最常见的功能，以及每种功能低音类型最常见的数字标记。请记住，一旦确定了功能进行，你就可以更改具体的数字标记，使最终实现中的声部进行更加平稳。

![各音级的常见功能与数字标记一览表](assets/defaultFigures.png)

<!-- lilylet-begin: assets/defaultFigures.png -->
```lyl.play
\omit Score.TimeSignature \key c \major \clef "bass" c,1
^\figures { <5 3>1 }
\addlyrics { T1 } | %1

c,1
^\figures { <4 2>1 }
\addlyrics { S1 } | %2

d,1
^\figures { <6 4>4 <4 3> <6> <6 5> }
\addlyrics { D2(p) } | %3

d,1
^\figures { <5 3>2 <7> }
\addlyrics { S2 } | %4

e,1
^\figures { <6>2 <5 3> }
\addlyrics { T3 } | %5

f,1
^\figures { <6>4 <6 5> <5 3> <7> }
\addlyrics { S4 } | %6

f,1
^\figures { <4 2>1 }
\addlyrics { D4 } | %7

g1
^\figures { <5 3>2 <7> }
\addlyrics { D5 } | %8

g1
^\figures { <6 4>1 }
\addlyrics { T5(p) } | %9

a1
^\figures { <5 3>1 }
\addlyrics { Tx6 } | %10

a1
^\figures { <6>1 }
\addlyrics { S6 } | %11

b1 \bar "|"
^\figures { <6>2 <6 5> }
\addlyrics { D7 } | %12
```
<!-- lilylet-end -->

[*查看大图。*](assets/defaultFigures.png)
