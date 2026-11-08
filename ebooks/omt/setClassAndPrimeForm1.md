# 集合类与原型（一）

音级集合理论中的许多概念，最好放在一个“具体”与“抽象”的连续尺度上来看。例如，_音高_（pitch）这样的概念非常具体，而 _音级_（pitch class）则更抽象一些。我们可以演奏一个音高，却无法真正演奏一个音级。在音程领域我们也见过类似的例子。有序音高音程对应着一种非常具体的声音（例如 +15）；无序音级音程（例如音程级 1）则不那么鲜明、真切。音级集合理论的一个基本观念是：这些具体与抽象的层级不仅涵盖音高和音程，也涵盖成组的音级。这些成组的音级称为 _音级集合_（pitch-class sets）。

我们其实已经见过音级集合，只是还没有这样称呼它们。当我们从一段音乐中抽出一组音，并把它们排成[正常序](normalOrder.md)时，这组音就是一个音级集合。正如我们在课上看到的，观察许多后调性音乐的一个很有意思的方式，就是研究音级集合之间的[移位](transposition.md)关系和[倒影](inversion.md)关系。在下面这个简短的例子中（取自巴托克（Bartók）的《主题与倒影》（"Subject and Reflection"）），你会注意到两个片段的右手是 _T5_ 关系，左手也是如此。而在每个片段内部，右手与左手分别是 _T8I_ 和 _T6I_ 关系。

![巴托克《主题与倒影》中的移位与倒影关系](assets/postTonal/subjecdtAndReflection.png)

<!-- lilylet-begin: assets/postTonal/subjecdtAndReflection.png -->
```lyl.play
[composer "Béla Bartók"]
[staves "{-}"]

\staff "1" \key c \major \time 2/4 \clef "treble" \stemUp bf'8[(\f_\markup "ben ritmato" c ef d] \\
\staff "1" \stemDown bf'2 \\
\staff "2" \clef "bass" \stemUp bf2( \\
\staff "2" \stemDown bf8[( af f gf)] | %1

\staff "1" \time 5/8 \partial 4 \stemUp f'4) \\
\staff "1" \stemDown bf'4 \\
\staff "2" \stemUp bf4) \\
\staff "2" \stemDown ef,4 | %2
```
```lyl.play
[composer "Béla Bartók"]
[staves "{-}"]

\staff "1" \key c \major \time 2/4 \tempo "Vivacissimo" \clef "treble" \stemUp f8[( bf-> af g)] \\
\staff "1" \stemDown ef2\p \\
\staff "2" \clef "bass" \stemUp ef,2^\markup "legato" \\
\staff "2" \stemDown df,8[( af-> bf cf)] | %1
```
<!-- lilylet-end -->

_一个音级集合要与另一个音级集合构成移位或倒影关系，二者必须具有相同的音程组合_。要理解这一点，最简单的办法是记住：所有大三和弦和小三和弦都具有相同的音程内容（M3、m3 和 P5）。大三和弦彼此之间是移位关系，而大三和弦与小三和弦之间是倒影关系。这一观察同样适用于巴托克的《主题与倒影》。那两个片段中的四个音级集合都具有相同的音程内容，因此我们才能标出它们之间的移位关系和倒影关系。

所有以移位和倒影相联系的音级集合都属于同一个 _集合类_（set class），并由同一个 _原型_（prime form）来代表。把一个音级集合化为原型，只需遵循一个简单的步骤：

1. 把音级集合排成正常序。
2. 将其移位，使第一个音级为 0。
3. 将第 2 步的结果倒影（任何一种倒影都可以），并把结果排成正常序。
4. 将其移位，使第一个音级为 0。
5. 比较第 (2) 步和第 (4) 步的结果。原型就是其中最紧凑的那个版本。

下例用巴托克《主题与倒影》中的动机演示了这一过程。

![求原型的步骤演示](assets/postTonal/primeForm.png)

<!-- lilylet-begin: assets/postTonal/primeForm.png -->
```lyl.play
[composer "Béla Bartók"]

\key c \major \time 2/4 \clef "treble" \stemUp bf'8[( c ef d] \\
\stemDown bf'2 | %1

\time 5/8 \partial 4 \stemUp f'4) \\
\stemDown bf'4 | %2
```
<!-- lilylet-end -->
