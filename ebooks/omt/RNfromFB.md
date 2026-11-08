# 由数字低音线推导罗马数字

低音线和根音进行对于学习和掌握调性和声都很重要。我们的大部分工作将集中于低音线，而下面的内容将帮助你分析任何一条数字低音线中存在的根音进行。换言之，它将帮助你对一条数字低音线做罗马数字分析。

注意，下面的图表中给出的是通用的大写罗马数字。

## 五度和弦

在任何五度和弦（"原位"：5/3 或 7/5/3 和弦）中，低音与和弦根音是同一个音。因此，任何五度和弦所对应的罗马数字，就是其低音的音级。如果低音是 *do*，低音就是 1̂ 级，罗马数字为 **I**。如果低音是 *re*，罗马数字为 **II**。以此类推。

![5/3 和弦](assets/Inversions/5-3chords.png)

<!-- lilylet-begin: assets/Inversions/5-3chords.png -->
```lyl.play
[staves "{-}"]

\staff "1" \omit Score.TimeSignature \omit Score.BarLine \key c \major \clef "treble" <e g c>1 <f a d>1 <g b e>1 <a c f>1 <b d g>1 <c e a>1 <d f b>1 \\
\staff "2" \clef "bass" c,1 d1 e1 f1 g1 a1 b1 \undo \omit Score.BarLine \bar "||"
\addlyrics { I II III IV V VI VII } | %1
```
<!-- lilylet-end -->

![七和弦](assets/Inversions/7chords.png)

<!-- lilylet-begin: assets/Inversions/7chords.png -->
```lyl.play
[staves "{-}"]

\staff "1" \omit Score.TimeSignature \omit Score.BarLine \key c \major \clef "treble" <e g b>1 <f a c>1 <g b d>1 <a c e>1 <b d f>1 <c e g>1 <d f a>1 \\
\staff "2" \clef "bass" c,1 d1 e1 f1 g1 a1 b1 \undo \omit Score.BarLine \bar "||"
^\figures { <7>1 <7> <7> <7> <7> <7> <7> }
\addlyrics { I II III IV V VI VII } | %1
```
<!-- lilylet-end -->

## "第一转位"六度和弦

数字为 6/3 或 6/5/3 的六度和弦是*第一转位*和弦。之所以这样命名，是因为和弦的三音（根音之上的下一个和弦音）位于最低声部。不过，在做分析时去想转位可能很麻烦。通常更简单的办法是记住：如果数字是 6/3 或 6/5/3（或者其简写，如 6 或 6/5），*和弦根音就是低音之上的六度音*。如果低音是 *mi*、数字是"6"，根音就是 *do*，罗马数字为 **I**。如果低音是 *fa*、数字是"6/5"，根音就是 *re*，罗马数字为 **II**。以此类推。

![6/3 和弦](assets/Inversions/6-3chords.png)

<!-- lilylet-begin: assets/Inversions/6-3chords.png -->
```lyl.play
[staves "{-}"]

\staff "1" \omit Score.TimeSignature \omit Score.BarLine \key c \major \clef "treble" <e a c>1 <f b d>1 <g c e>1 <a d f>1 <b e g>1 <c f a>1 <d g b>1 \\
\staff "2" \clef "bass" c,1 d1 e1 f1 g1 a1 b1 \undo \omit Score.BarLine \bar "||"
^\figures { <6>1 <6> <6> <6> <6> <6> <6> }
\addlyrics { VI VII I II III IV V } | %1
```
<!-- lilylet-end -->

![6/5 和弦](assets/Inversions/6-5chords.png)

<!-- lilylet-begin: assets/Inversions/6-5chords.png -->
```lyl.play
[staves "{-}"]

\staff "1" \omit Score.TimeSignature \omit Score.BarLine \key c \major \clef "treble" <e g a>1 <f a b>1 <g b c>1 <a c d>1 <b d e>1 <c e f>1 <d f g>1 \\
\staff "2" \clef "bass" c,1 d1 e1 f1 g1 a1 b1 \undo \omit Score.BarLine \bar "||"
^\figures { <6 5>1 <6 5> <6 5> <6 5> <6 5> <6 5> <6 5> }
\addlyrics { VI VII I II III IV V } | %1
```
<!-- lilylet-end -->

## "第二转位"六度和弦

数字为 6/4 或 6/4/3（或其简写，如 4/3）的六度和弦是*第二转位*和弦。之所以这样命名，是因为和弦的五音（根音之上的第二个和弦音）位于最低声部。同样，通常更简单的办法是记住：对于 6/4、6/4/3 和 4/3 和弦，*根音就是低音之上的四度音*。如果低音是 *re*、数字是 4/3，根音就是 *sol*，罗马数字为 **V**。

![6/4 和弦](assets/Inversions/6-4chords.png)

<!-- lilylet-begin: assets/Inversions/6-4chords.png -->
```lyl.play
[staves "{-}"]

\staff "1" \omit Score.TimeSignature \omit Score.BarLine \key c \major \clef "treble" <f a c>1 <g b d>1 <a c e>1 <b d f>1 <c e g>1 <d f a>1 <e g b>1 \\
\staff "2" \clef "bass" c,1 d1 e1 f1 g1 a1 b1 \undo \omit Score.BarLine \bar "||"
^\figures { <6 4>1 <6 4> <6 4> <6 4> <6 4> <6 4> <6 4> }
\addlyrics { IV V VI VII I II III } | %1
```
<!-- lilylet-end -->

![4/3 和弦](assets/Inversions/4-3chords.png)

<!-- lilylet-begin: assets/Inversions/4-3chords.png -->
```lyl.play
[staves "{-}"]

\staff "1" \omit Score.TimeSignature \omit Score.BarLine \key c \major \clef "treble" <e f a>1 <f g b>1 <g a c>1 <a b d>1 <b c e>1 <c d f>1 <d e g>1 \\
\staff "2" \clef "bass" c,1 d1 e1 f1 g1 a1 b1 \undo \omit Score.BarLine \bar "||"
^\figures { <4 3>1 <4 3> <4 3> <4 3> <4 3> <4 3> <4 3> }
\addlyrics { IV V VI VII I II III } | %1
```
<!-- lilylet-end -->

## "第三转位"六度和弦

数字为 6/4/2（或其简写 4/2，或干脆只写 2）的六度和弦是*第三转位*和弦。其根音位于低音之上二度，即上方一个级进处。最常见的 4/2 和弦低音是 *fa*，根音是 *sol*，因此其罗马数字为 **V**。

![4/2 和弦](assets/Inversions/4-2chords.png)

<!-- lilylet-begin: assets/Inversions/4-2chords.png -->
```lyl.play
[staves "{-}"]

\staff "1" \omit Score.TimeSignature \omit Score.BarLine \key c \major \clef "treble" <d f a>1 <e g b>1 <f a c>1 <g b d>1 <a c e>1 <b d f>1 <c e g>1 \\
\staff "2" \clef "bass" c,1 d1 e1 f1 g1 a1 b1 \undo \omit Score.BarLine \bar "||"
^\figures { <4 2>1 <4 2> <4 2> <4 2> <4 2> <4 2> <4 2> }
\addlyrics { II III IV V VI VII I } | %1
```
<!-- lilylet-end -->
