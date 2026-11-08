# 对位进行的类型

两条音乐线条之间有四种对位进行。区分这四种进行，对写出良好的声部进行（无论是严格的还是自由的）至关重要。

在**平行进行**（*parallel motion*）中，两个声部以相同的度数音程朝同一方向进行。例如，下面两个声部都上行一个级进。还要注意，两个二音组构成同一个度数音程（六度）。两个声部作平行进行时，情况总是如此。

![平行进行示例：C–A 进行到 D–B。](assets/intervals/parallel.png)

<!-- lilylet-begin: assets/intervals/parallel.png -->
```lyl.play
[staves "{-}"]

\staff "1" \omit Score.TimeSignature \key c \major \clef "treble" a'1 \\
\staff "2" \clef "alto" c1 | %1

\staff "1" b'1 \\
\staff "2" d1 \bar "||" | %2
```
<!-- lilylet-end -->

在**同向进行**（*similar motion*，又称**直接进行**，*direct motion*）中，两个声部朝同一方向进行，但音程不同。例如，下面两个声部都下行，但上方声部级进、下方声部跳进。还要注意，两个二音组是不同的度数音程。同向（直接）进行总是如此。

![同向进行示例：C–G 进行到 A–F。](assets/intervals/similar.png)

<!-- lilylet-begin: assets/intervals/similar.png -->
```lyl.play
[staves "{-}"]

\staff "1" \omit Score.TimeSignature \key c \major \clef "treble" g'1 \\
\staff "2" \clef "alto" c1 | %1

\staff "1" f1 \\
\staff "2" a1 \bar "||" | %2
```
<!-- lilylet-end -->

在**反向进行**（*contrary motion*）中，两个声部朝相反方向进行——一个上行，另一个下行。

![反向进行示例：C–E 进行到 A–F。](assets/intervals/contrary.png)

<!-- lilylet-begin: assets/intervals/contrary.png -->
```lyl.play
[staves "{-}"]

\staff "1" \omit Score.TimeSignature \key c \major \clef "treble" e1 \\
\staff "2" \clef "alto" c1 | %1

\staff "1" f1 \\
\staff "2" a1 \bar "||" | %2
```
<!-- lilylet-end -->

在**斜向进行**（*oblique motion*）中，一个声部保持不动，另一个声部进行（方向不限）。保持不动的音可以重新奏出，也可以不重新奏出。

![斜向进行示例：C–G 进行到 B–G。](assets/intervals/oblique1.png)

<!-- lilylet-begin: assets/intervals/oblique1.png -->
```lyl.play
[staves "{-}"]

\staff "1" \omit Score.TimeSignature \key c \major \clef "treble" g'1 \\
\staff "2" \clef "alto" c1 | %1

\staff "1" g'1 \\
\staff "2" b1 \bar "||" | %2
```
<!-- lilylet-end -->

或

![斜向进行示例：C–G 进行到 B–G。](assets/intervals/oblique2.png)

<!-- lilylet-begin: assets/intervals/oblique2.png -->
```lyl.play
[staves "{-}"]

\staff "1" \omit Score.TimeSignature \key c \major \clef "treble" g'1 \\
\staff "2" \clef "alto" c2 b \bar "||" | %1
```
<!-- lilylet-end -->
