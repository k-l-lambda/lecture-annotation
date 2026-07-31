<!-- page 1 -->

arXiv:1412.5633v1 [physics.data-an] 17 Dec 2014

# 信息几何基础\*

Ariel Caticha

物理系，University at Albany-SUNY，Albany，NY 12222，USA。

**摘要**

我们在多大程度上可以将一个概率分布与另一个区分开来？是否存在可区分性的定量度量？本教程的目标是，通过引入两个概率分布之间“距离”的概念，并探索这种“信息几何”的一些基本思想，来探讨此类问题。

> **Einstein, 1949:** “[The basic ideas of General Relativity were in place] … \*1908年。为什么构建 the general theory of relativity 还需要另外七年？主要原因在于，要使自己摆脱坐标必须具有直接度量意义这一观念，并非易事。\*(cite)” [1]

## 1 引言

任何推断理论的主要关注点之一，是当新信息可用时如何更新概率的问题。我们想从一组候选分布中选出一个概率分布，而这立即引发了许多问题。如果我们选择了邻近的分布会怎样？这会有什么不同？是什么让两个分布相似？我们在多大程度上可以区分一个分布与另一个分布？是否存在可区分性的定量度量？本教程的目标是通过引入几何方法来探讨这些问题。更具体地说，目标将是引入两个概率分布之间“距离”的概念。

一个参数化的概率分布族是一组由参数 $\theta = (\theta^1 \dots \theta^n)$ 标记的分布 $p_\theta(x)$。这样一个族构成一个*统计流形*，即一个空间，其中每个由坐标 $\theta$ 标记的点代表一个概率分布 $p_\theta(x)$。一般的流形不带有内在的距离概念；这种额外的结构必须以度量张量的形式单独提供。然而，统计流形是一个例外。本章的主要目标之一是证明统计流形具有

---

\*受邀教程，发表于 MaxEnt 2014，the 34th International Workshop on Bayesian Inference and Maximum Entropy Methods in Science and Engineering（September 21–26, 2014，Amboise，France）。


<!-- page 2 -->

唯一自然的距离概念——即所谓的信息度量。这一度量并非可选特征；它是不可避免的。几何是统计流形结构的内在属性。

两个邻近点 $\theta$ 与 $\theta + d\theta$ 之间的距离 $d\ell$ 由毕达哥拉斯定理给出，若用度量张量 $g_{ab}$ 表示，则¹
$$d\ell^2 = g_{ab}d\theta^a d\theta^b \ . \tag{1}$$

度量张量 $g_{ab}$ 的极其重要性源于 N. Čencov 的一个定理，该定理指出：概率分布流形上的度量 $g_{ab}$ 本质上是唯一的——在整体比例因子意义下，只存在一种度量能够反映这一事实：这些距离并非简单无结构的点之间的距离，而是概率分布之间的距离。[2]

我们不会穷尽该主题的所有可能性²，但确实希望强调一个具体结果。具有距离概念意味着我们具有体积概念，而这进而意味着：在参数空间上存在唯一且客观的均匀分布概念——相等的体积被赋予相等的概率。此类均匀分布是否最大非信息性，是否定义了无知，或是否反映任何理性主体的实际先验信念，都是重要的问题，但它们与我们想要阐明的特定要点毫不相干，即：它们是均匀的——而这并非主观判断的问题，而是客观数学证明的问题。

## 2 统计流形的例子

一个 $n$ 维流形 $\mathcal{M}$ 是一个光滑的、可能弯曲的空间，它在局部上类似于 $\mathcal{R}^n$。这意味着可以建立一个坐标架（即从 $\mathcal{M}$ 到 $\mathcal{R}^n$ 的映射），使得每个点 $\theta \in \mathcal{M}$ 都能由其坐标识别或标记，$\theta = (\theta^1 \dots \theta^n)$。统计流形是一种流形，其中每个点 $\theta$ 代表一个概率分布 $p_\theta(x)$。正如我们稍后将要看到的，一种非常方便的记法是 $p_\theta(x) = p(x|\theta)$。以下是一些例子：

**多项分布**由下式给出
$$p(\{n_i\}|\theta) = \frac{N!}{n_1! n_2! \dots n_m!}(\theta^1)^{n_1}(\theta^2)^{n_2} \dots (\theta^m)^{n_m} \ , \tag{2}$$

其中 $\theta = (\theta^1, \theta^2 \dots \theta^m)$，$N = \sum_{i=1}^m n_i$ 且 $\sum_{i=1}^m \theta^i = 1$。它们构成一个维数为 $(m-1)$ 的统计流形，称为单纯形 $S_{m-1}$。参数 $\theta = (\theta^1, \theta^2 \dots \theta^m)$ 是一种方便的坐标选择。

具有均值 $\mu^a$（$a = 1 \dots n$）和方差 $\sigma^2$ 的**多元高斯分布**，
$$p(x|\mu,\sigma) = \frac{1}{(2\pi\sigma^2)^{n/2}} \exp -\frac{1}{2\sigma^2}\sum_{a=1}^n (x^a - \mu^a)^2 \ , \tag{3}$$

---

¹在微分几何中，用上标而非下标来标记坐标指标是一种标准且非常方便的记法约定。我们采用对重复指标求和的标准约定，例如，$g_{ab}f^{ab} = \sum_a \sum_b g_{ab}f^{ab}$。

²更详尽的论述请见 [3][4]。此处我们紧密遵循 [5] 中的表述。

2


<!-- page 3 -->

构成一个 $(n{+}1)$ 维统计流形，其坐标为 $\theta=(\mu^1, \dots, \mu^n, \sigma^2)$。

**正则分布**（canonical distributions），
$$p(i|F) = \frac{1}{Z} e^{-\lambda_k f_i^k} \ , \qquad (4)$$
由对Shannon熵 $S[p]$ 在约束条件下求极大值得出，这些约束作用于 $n$ 个函数 $f_i^k = f^k(x_i)$ 的期望值，函数用上标 $k = 1,2,\dots n$ 标记，
$$\left<f^k\right> = \sum_i p_i f_i^k = F^k \ . \qquad (5)$$
它们构成一个 $n$ 维统计流形。作为坐标，我们可以使用期望值 $F=(F^1 \dots F^n)$，或者等价地使用Lagrange乘子 $\lambda=(\lambda_1 \dots \lambda_n)$。

## 3 弯曲空间中的距离与体积

微分几何背后的基本直觉源于如下观察：弯曲空间在局部是平坦的——只要停留在足够小的区域内，曲率效应就可以忽略不计。于是这一想法相当简单：在任意点 $x$ 的邻近区域内，我们总可以从原始坐标 $x^a$ 变换到新的坐标 $\hat{x}^\alpha = \hat{x}^\alpha(x^1 \dots x^n)$，我们将其*声明*为局部Cartesian坐标（这里用帽子符号和希腊字母上标表示，$\hat{x}^\alpha$）。无穷小位移由下式给出
$$d\hat{x}^\alpha = X^\alpha_a \, dx^a \quad \text{其中} \quad X^\alpha_a = \frac{\partial \hat{x}^\alpha}{\partial x^a} \qquad (6)$$
而相应的无穷小距离可以利用Pythagoras定理计算，
$$d\ell^2 = \delta_{\alpha\beta} d\hat{x}^\alpha d\hat{x}^\beta \ . \qquad (7)$$
变换回原参考系
$$d\ell^2 = \delta_{\alpha\beta} d\hat{x}^\alpha d\hat{x}^\beta = \delta_{\alpha\beta} X^\alpha_a X^\beta_b \, dx^a dx^b \ . \qquad (8)$$
定义量
$$g_{ab} \equiv \delta_{\alpha\beta} X^\alpha_a X^\beta_b \ , \qquad (9)$$
我们可以在一般坐标 $x^a$ 下将无穷小Pythagoras定理写为
$$d\ell^2 = g_{ab} dx^a dx^b \ . \qquad (10)$$
量 $g_{ab}$ 是度量张量的分量。容易验证，在坐标变换下，$g_{ab}$ 按下式变换：
$$g_{ab} = X^{a'}_a X^{b'}_b g_{a'b'} \quad \text{其中} \quad X^{a'}_a = \frac{\partial x^{a'}}{\partial x^a} \, , \qquad (11)$$
从而无穷小距离 $d\ell$ 与坐标的选择无关。


<!-- page 4 -->

要求出沿曲线 $x(\lambda)$ 上两点之间的有限长度，可沿曲线积分：

$$\ell = \int_{\lambda_1}^{\lambda_2} d\ell = \int_{\lambda_1}^{\lambda_2} \left( g_{ab}\frac{dx^a}{d\lambda}\frac{dx^b}{d\lambda} \right)^{1/2} d\lambda \ . \tag{12}$$

一旦有了距离的度量，我们就可以测量角度、面积、体积以及各种其他几何量。为求 $n$ 维体积元 $dV_n$ 的表达式，我们使用和之前一样的技巧：变换到局部笛卡尔坐标，使得体积元简单地由乘积给出

$$dV_n = d\hat{x}^1 d\hat{x}^2 \ldots d\hat{x}^n \ , \tag{13}$$

然后再利用 eq.(6) 变换回原始坐标 $x^a$，

$$dV_n = \left|\frac{\partial \hat{x}}{\partial x}\right| dx^1 dx^2 \ldots dx^n = \left|\det X_a^\alpha\right| d^n x \ . \tag{14}$$

这就是用坐标 $x^a$ 表示的我们所求的体积，但我们仍需计算该变换的雅可比行列式 $|\partial \hat{x}/\partial x| = |\det X_a^\alpha|$。度规从其欧几里得形式 $\delta_{\alpha\beta}$ 到 $g_{ab}$ 的变换，eq.(9)，是三个矩阵的乘积。取行列式后得到

$$g \equiv \det(g_{ab}) = [\det X_a^\alpha]^2 \ , \tag{15}$$

因此

$$\left|\det\left(X_a^\alpha\right)\right| = g^{1/2} \ . \tag{16}$$

我们已成功地在原始坐标 $x^a$ 中用度规 $g_{ab}(x)$ 表示出了体积元。答案是

$$dV_n = g^{1/2}(x) d^n x \ . \tag{17}$$

流形上任意扩展区域的体积为

$$V_n = \int dV_n = \int g^{1/2}(x) d^n x \ . \tag{18}$$

**例：** 在这样一个弯曲流形上的均匀分布，是指对相等的体积赋予相等概率的分布，

$$p(x) d^n x \propto g^{1/2}(x) d^n x \ . \tag{19}$$

**例：** 对于球坐标 $(r, \theta, \phi)$ 下的欧几里得空间，

$$d\ell^2 = dr^2 + r^2 d\theta^2 + r^2 \sin^2\theta d\phi^2 \ , \tag{20}$$

而体积元则是我们熟悉的表达式

$$dV = g^{1/2} dr d\theta d\phi = r^2 \sin\theta \, dr d\theta d\phi \ . \tag{21}$$


<!-- page 5 -->

## 4 信息度量的两种推导

两个邻近分布 $p(x|\theta)$ 与 $p(x|\theta + d\theta)$ 之间，或者等价地说，两点 $\theta$ 与 $\theta + d\theta$ 之间的距离 $d\ell$，由度量 $g_{ab}$ 给出。我们的目标是计算对应于 $p(x|\theta)$ 的张量 $g_{ab}$。我们将给出两种推导，以阐明信息度量的含义、其解释，以及最终如何使用它。基于渐近推断的其他推导见 [6] 和 [7]。

在此有必要提醒一句（并加以鼓励）。当然，我们有可能遇到充分奇异的分布族，它们并非光滑流形，研究其几何似乎是一项无望的事业。我们该放弃几何吗？不。统计流形可以具有复杂几何这一事实，并不会减损信息几何方法的价值，正如存在崎岖几何的曲面并不会减损几何学本身的一般价值一样。

### 从可区分性出发的推导

我们寻求一种定量度量，以衡量两个分布 $p(x|\theta)$ 与 $p(x|\theta+d\theta)$ 能够被区分的程度。以下论证在直觉上很吸引人。[8][9] 这一方法的优点在于它澄清了解释——*该度量衡量的是可区分性*。考虑相对差，

$$
\Delta = \frac{p(x|\theta + d\theta) - p(x|\theta)}{p(x|\theta)} = \frac{\partial \log p(x|\theta)}{\partial \theta^a} d\theta^a. \qquad (22)
$$

相对差的期望值 $\langle\Delta\rangle$ 似乎是一个不错的候选，但它行不通，因为它恒等于零，

$$
\langle\Delta\rangle = \int dx\, p(x|\theta)\, \frac{\partial \log p(x|\theta)}{\partial \theta^a}\, d\theta^a = d\theta^a\, \frac{\partial}{\partial\theta^a} \int dx\, p(x|\theta) = 0. \qquad (23)
$$

（取决于具体问题，符号 $\int\!dx$ 既可表示离散求和，也可表示对一个或多个维度的积分；其含义应从上下文中明确。）然而，方差并不为零，

$$
d\ell^2 = \langle\Delta^2\rangle = \int dx\, p(x|\theta)\, \frac{\partial \log p(x|\theta)}{\partial \theta^a}\, \frac{\partial \log p(x|\theta)}{\partial \theta^b}\, d\theta^a d\theta^b\ . \qquad (24)
$$

这正是我们所寻求的可区分性度量；$d\ell^2$ 的值很小意味着相对差 $\Delta$ 很小，且点 $\theta$ 与 $\theta + d\theta$ 难以区分。这提示我们引入矩阵 $g_{ab}$

$$
g_{ab}(\theta) \stackrel{\text{def}}{=} \int dx\, p(x|\theta)\, \frac{\partial \log p(x|\theta)}{\partial \theta^a}\, \frac{\partial \log p(x|\theta)}{\partial \theta^b} \qquad (25)
$$

称为 Fisher 信息*矩阵* [10]，于是

$$
d\ell^2 = g_{ab}\, d\theta^a d\theta^b\ . \qquad (26)
$$

5


<!-- page 6 -->

迄今为止，我们尚未引入距离的概念。通常人们会说，在例如我们所居住的三维空间中，难以区分两个点的原因是它们恰好靠得太近。我们很容易反其道而行之，断言两个点 $\theta$ 和 $\theta + d\theta$ 只要难以区分就是*靠近*的。此外，作为一个方差，量 $d\ell^2 = \langle\Delta^2\rangle$ 是正的，并且仅当 $d\theta$ 为零时才消失。因此，很自然地可以通过将 $g_{ab}$ 解释为黎曼空间的度规张量来引入距离。[8] 这就是*信息度规*。Rao 认识到 $g_{ab}$ 是概率分布空间中的一个度规，从而催生了信息几何学这一学科 [3]，也就是将几何方法应用于推断和信息论中的问题。

坐标 $\theta$ 是相当任意的；我们可以随意地给流形中的点重新标记。于是很容易验证，$g_{ab}$ 是一个张量的分量，并且距离 $d\ell^2$ 是一个不变量，即在坐标变换下是一个标量。确实，变换

$$\theta^{a'} = f^{a'}(\theta^1 \ldots \theta^n) \qquad (27)$$

导致

$$d\theta^a = \frac{\partial \theta^a}{\partial \theta^{a'}} d\theta^{a'} \quad \text{and} \quad \frac{\partial}{\partial \theta^a} = \frac{\partial \theta^{a'}}{\partial \theta^a} \frac{\partial}{\partial \theta^{a'}} \qquad (28)$$

因此，将其代入 eq.(25)，

$$g_{ab} = \frac{\partial \theta^{a'}}{\partial \theta^a} \frac{\partial \theta^{b'}}{\partial \theta^b} g_{a'b'} \qquad (29)$$

### 由相对熵推导

我们在别处论证过相对熵 $S[p, q]$ 的概念，它是一种工具，用于在有新信息以约束形式出现时，将概率从先验 $q$ 更新到后验 $p$。（关于最大熵方法的详细发展，请参见 [5] 及其中的参考文献。）其思路是用 $S[p, q]$ 对那些相对于 $q$ 的分布 $p$ 进行排序，使得首选的后验是在约束条件下使 $S[p, q]$ 最大化的那个。$S[p, q]$ 的函数形式是从非常保守的设计准则中推导出来的，这些准则承认信息的价值：过去学到的东西是宝贵的，除非被新信息证明已经过时，否则不应被忽视。这被表述为*最小更新原理*：信念只应在新的证据所要求的程度上进行修正。根据这种解释，那些具有更高熵 $S[p, q]$ 的分布 $p$ 在某种意义上更*接近* $q$，因为它们反映出对我们信念的修正不那么剧烈。

“更接近”这个词非常具有启发性，但也可能极具误导性。一方面，它暗示了熵与几何之间存在某种联系。如下所示，这种联系确实存在。另一方面，它可能诱使我们把 $S[p, q]$ *等同于*距离，而这显然是错误的：$S[p, q]$ 不是对称的，$S[p, q] \neq S[q, p]$，因此它不可能是一种距离。


<!-- page 7 -->

熵与距离之间存在某种关系，但这种关系并非同一关系。

在弯曲空间中，两点 $p$ 与 $q$ 之间的距离是连接它们的最短曲线的长度，而曲线的长度 $\ell$（见式(12)）则是介于 $p$ 与 $q$ 之间的*局域*无穷小长度 $d\ell$ 之和。另一方面，熵 $S[p,q]$ 是一个*非局域*概念。除了 $p$ 与 $q$ 之外，它不涉及任何其他点。因此，熵与距离之间的关系——如果确实存在的话——必须是两个无穷接近分布 $q$ 与 $p = q + dq$ 之间的关系。只有这样，我们才能在不涉及 $p$ 与 $q$ 之间各点的情况下定义距离。（另见 [11]。）

考虑一个分布 $p(x|\theta')$ 相对于另一个分布 $p(x|\theta)$ 的熵，

$$S(\theta', \theta) = -\int dx\, p(x|\theta') \log \frac{p(x|\theta')}{p(x|\theta)} \ . \qquad (30)$$

我们研究当 $\theta' = \theta + d\theta$ 位于给定 $\theta$ 的邻近区域时，该熵如何变化。很容易验证——回顾吉布斯不等式，$S(\theta',\theta) \leq 0$，且等号成立当且仅当 $\theta' = \theta$——熵 $S(\theta',\theta)$ 在 $\theta' = \theta$ 处取得绝对极大值。因此，围绕 $\theta$ 作泰勒展开时，首个非零项是 $d\theta$ 的二阶项：

$$S(\theta + d\theta, \theta) = \frac{1}{2} \frac{\partial^2 S(\theta',\theta)}{\partial\theta'^a \partial\theta'^b}\bigg|_{\theta'=\theta} d\theta^a d\theta^b + \ldots \leq 0 \ , \qquad (31)$$

这提示我们可通过下式定义距离 $d\ell$：

$$S(\theta + d\theta, \theta) = -\frac{1}{2} d\ell^2 \ . \qquad (32)$$

对二阶导数进行直接计算，即可得到信息度规：

$$-\frac{\partial S(\theta',\theta)}{\partial\theta'^a \partial\theta'^b}\bigg|_{\theta'=\theta} = \int dx\, p(x|\theta) \frac{\partial \log p(x|\theta)}{\partial\theta^a} \frac{\partial \log p(x|\theta)}{\partial\theta^b} = g_{ab} \ . \qquad (33)$$

## 5 信息度规的唯一性

关于信息度规，一个非常引人注目的事实是：它在本质上是唯一的。除了一个常数比例因子之外，它是唯一能够充分考虑统计流形上各点性质的黎曼度规；也就是说，这些点代表概率分布，它们并非“无结构”。这一定理最初由 N. Čencov 在范畴论框架下证明 [2]；后来 Campbell 给出了另一种依赖于马尔可夫映射概念的替代证明。[12] 在此，我将通过一个简单例子来描述 Campbell 的基本思想。

我们可以用二项分布来分析抛硬币（其中概率为 $p(\text{heads}) = \theta$ 和 $p(\text{tails}) = 1-\theta$）。我们也可以用二项分布来描述掷一枚特殊骰子的情形。例如，假设这枚骰子


<!-- page 8 -->

三个面具有相等的概率 $p_1 = p_2 = p_3 = \theta/3$，另外三个面也具有相等的概率 $p_4 = p_5 = p_6 = (1-\theta)/3$。然后我们用二项分布来描述粗粒化结果低 = {1,2,3} 或高 = {4,5,6}，其概率分别为 $\theta$ 和 $1-\theta$。这相当于将硬币分布的空间映射到骰子分布空间的一个子空间。

将 $n=2$ 的二项式统计流形（即一维单形 $\mathcal{S}_1$）嵌入到 $n=6$ 的多项式统计流形（即五维单形 $\mathcal{S}_5$）的一个子空间中，这种嵌入称为 Markov 映射。

在引入了 Markov 映射的概念之后，我们现在可以阐述 Campbell 论证背后的基本思想：无论我们讨论的是硬币的正面/反面结果，还是骰子的低/高结果，二项式都是二项式。无论赋予 $\mathcal{S}_1$ 中分布何种几何关系，都应该将完全相同的几何关系赋予 $\mathcal{S}_5$ 相应子空间中的分布。因此，这些 Markov 映射不仅仅是嵌入，它们是全等嵌入——$\mathcal{S}_1$ 中分布之间的距离应当与 $\mathcal{S}_5$ 中对应像之间的距离相匹配。

现在到了关键之处：目标是寻找在 Markov 映射下保持不变的 Riemannian 度量。很容易理解为什么施加这样的不变性是极其受限的：在 $\mathcal{S}_1$ 中计算的距离必须与在 $\mathcal{S}_5$ 子空间中计算的距离一致，这一事实对允许的度量张量引入了一个约束；但我们总可以将 $\mathcal{S}_1$ 和 $\mathcal{S}_5$ 嵌入到维数越来越大的空间中，从而导致越来越多的约束。很可能没有任何 Riemannian 度量能够在如此严苛的条件下存活下来；相当令人惊讶的是，确实有一些度量存活了下来，而更令人惊讶的是（在不重要的比例因子意义下）存活的 Riemannian 度量是唯一的。证明的细节见 [5]。

## 6 一些常见分布的度量

**多项式分布**的统计流形，

$$P_N\left(n|\theta\right) = \frac{N!}{n_1! \dots n_m!}\theta_1^{n_1} \dots \theta_m^{n_m} \ , \tag{34}$$

其中

$$n = (n_1 \dots n_m) \quad \text{其中} \quad \sum_{i=1}^m n_i = N \quad \text{且} \quad \sum_{i=1}^m \theta_i = 1 \ , \tag{35}$$

即为单形 $\mathcal{S}_{m-1}$。该度量由式(25)给出，

$$g_{ij} = \sum_n P_N \frac{\partial \log P_N}{\partial \theta_i} \frac{\partial \log P_N}{\partial \theta_j} \quad \text{其中} \quad 1 \le i,j \le m-1 \ . \tag{36}$$

结果为

$$g_{ij} = \left\langle \left(\frac{n_i}{\theta_i} - \frac{n_m}{\theta_m}\right)\left(\frac{n_j}{\theta_j} - \frac{n_m}{\theta_m}\right) \right\rangle = \frac{N}{\theta_i}\delta_{ij} + \frac{N}{\theta_m} \ , \tag{37}$$


<!-- page 9 -->

其中 $1 \leq i, j \leq m-1$。通过令 $d\theta_m = -\sum_{i=1}^{m-1} d\theta_i$ 并将指标范围扩展至包含 $i, j = m$，可得到一个更为简洁的表达式。结果为
$$
d\ell^2 = \sum_{i,j=1}^m g_{ij} d\theta_i d\theta_j \quad \text{其中} \quad g_{ij} = \frac{N}{\theta_i}\delta_{ij} \ .
\tag{38}
$$

单纯形 $\mathcal{S}_{m-1}$ 上的均匀分布赋予相等体积以相等的概率，
$$
P(\theta) d^{m-1}\theta \propto g^{1/2} d^{m-1}\theta \quad \text{其中} \quad g = \frac{N^{m-1}}{\theta_1 \theta_2 \dots \theta_m}
\tag{39}
$$

在二项分布的特殊情形中，$m=2$，且 $\theta_1 = \theta$、$\theta_2 = 1-\theta$，我们得到
$$
g = g_{11} = \frac{N}{\theta(1-\theta)}
\tag{40}
$$
因此 $\theta$（其中 $0 < \theta < 1$）上的均匀分布为
$$
P(\theta)d\theta \propto [\frac{N}{\theta(1-\theta)}]^{1/2} d\theta \ .
\tag{41}
$$

**正则分布：** 设 $z$ 表示系统的微观状态（例如，相空间中的点），$m(z)$ 表示其底层测度（例如，相空间上的均匀密度）。宏观状态空间是一个统计流形：每个宏观状态都是在 $n$ 个约束条件 $\langle f^a \rangle = F^a$（$a = 1 \dots n$）以及归一化条件下，通过最大化熵 $S[p,m]$ 而得到的正则分布，
$$
p(z|F) = \frac{1}{Z(\lambda)} m(z) e^{-\lambda_a f^a(z)} \quad \text{其中} \quad Z(\lambda) = \int dz \, m(z) e^{-\lambda_a f^a(z)} \ .
\tag{42}
$$

数组 $F = (F^1 \dots F^n)$ 确定了统计流形上的一个点 $p(z|F)$，因此我们可以将 $F^a$ 用作坐标。

首先，以下是关于正则分布的一些有用事实。拉格朗日乘子 $\lambda_a$ 由以下关系隐式确定：
$$
\langle f^a \rangle = F^a = -\frac{\partial \log Z}{\partial \lambda_a} \ ,
\tag{43}
$$
并且容易证明，对 $\lambda_b$ 进一步求导即可得到协方差矩阵，
$$
C^{ab} \equiv \langle (f^a - F^a)(f^b - F^b) \rangle = -\frac{\partial F^a}{\partial \lambda_b} \ .
\tag{44}
$$

此外，根据链式法则
$$
\delta_a^c = \frac{\partial \lambda_a}{\partial \lambda_c} = \frac{\partial \lambda_a}{\partial F^b} \frac{\partial F^b}{\partial \lambda_c} \ ,
\tag{45}
$$
可知矩阵
$$
C_{ab} = -\frac{\partial \lambda_a}{\partial F^b}
\tag{46}
$$

9


<!-- page 10 -->

它是协方差矩阵的逆，$C_{ab}C^{bc} = \delta_a^c$。

信息度量为
$$\begin{aligned} g_{ab} &= \int dz\, p(z|F)\, \frac{\partial \log p(z|F)}{\partial F^a}\, \frac{\partial \log p(z|F)}{\partial F^b} \\ &= \frac{\partial \lambda_c}{\partial F^a} \frac{\partial \lambda_d}{\partial F^b} \int dz\, p\, \frac{\partial \log p}{\partial \lambda_c}\, \frac{\partial \log p}{\partial \lambda_d}\ . \end{aligned} \qquad (47)$$

利用式 (42) 和 (43)，
$$\frac{\partial \log p(z|F)}{\partial \lambda_c} = F^c - f^c(z) \qquad (48)$$

因此，
$$g_{ab} = C_{ca}C_{db}C^{cd} \implies g_{ab} = C_{ab}\ , \qquad (49)$$

从而度量张量 $g_{ab}$ 是协方差矩阵 $C^{ab}$ 的逆。

我们可以用拉格朗日乘子 $\lambda_a$ 作为坐标，而不是期望值 $F^a$。此时信息度量即为协方差矩阵，
$$g^{ab} = \int dz\, p(z|\lambda)\, \frac{\partial \log p(z|\lambda)}{\partial \lambda_a}\, \frac{\partial \log p(z|\lambda)}{\partial \lambda_b} = C^{ab}\ . \qquad (50)$$

因此，相邻分布之间的距离 $d\ell$ 可以写成两种等价形式之一，
$$d\ell^2 = g_{ab} dF^a dF^b = g^{ab} d\lambda_a d\lambda_b\ . \qquad (51)$$

宏观状态空间上的均匀分布对相等的体积赋予相等的概率，
$$P(F)d^n F \propto C^{-1/2} d^n F \quad\text{或}\quad P'(\lambda)d^n\lambda \propto C^{1/2} d^n\lambda\ , \qquad (52)$$

其中 $C = \det C^{ab}$。

**高斯分布**是正则分布的一个特例——它们在均值和相关性受约束的条件下使熵最大化。考虑 $D$ 维高斯分布，
$$p(x|\mu,C) = \frac{c^{1/2}}{(2\pi)^{D/2}} \exp\left[-\frac{1}{2}C_{ij}(x^i-\mu^i)(x^j-\mu^j)\right]\ , \qquad (53)$$

其中 $1 \leq i \leq D$，$C_{ij}$ 是相关矩阵的逆，且 $c = \det C_{ij}$。均值 $\mu^i$ 是 $D$ 个参数 $\mu^i$，而对称矩阵 $C_{ij}$ 另外有 $\frac{1}{2}D(D+1)$ 个参数。因此，统计流形的维数为 $\frac{1}{2}D(D+3)$。

计算 $p(x|\mu,C)$ 与 $p(x|\mu+d\mu, C+dC)$ 之间的信息距离，需要仔细跟踪所有涉及的指标。略去所有细节，结果为
$$d\ell^2 = g_{ij}d\mu^i d\mu^j + g_k^{ij} dC_{ij}d\mu^k + g^{ij\,kl} dC_{ij}dC_{kl}\ , \qquad (54)$$


<!-- page 11 -->

其中
$$g_{ij} = C_{ij}\ ,\quad g_k^{ij} = 0\ ,\quad\text{and}\quad g^{ij\,kl} = \frac{1}{4}(C^{ik}C^{jl}+C^{il}C^{jk})\ , \qquad(55)$$
其中 $C^{ik}$ 是相关矩阵，即 $C^{ik}C_{kj}=\delta^i_j$。因此，
$$d\ell^2 = C_{ij}dx^i dx^j + \frac{1}{2}C^{ik}C^{jl}dC_{ij}dC_{kl}\ . \qquad(56)$$

最后我们考虑几个特例。对于仅在均值上有所不同的高斯分布，$p(x|\mu,C)$ 与 $p(x|\mu+d\mu,C)$ 之间的信息距离可通过令 $dC_{ij}=0$ 得到，即
$$d\ell^2 = C_{ij}dx^i dx^j\ , \qquad(57)$$
这是式(49)的一个实例。最后，对于球对称高斯分布，
$$p(x|\mu,\sigma) = \frac{1}{(2\pi\sigma^2)^{D/2}}\exp\left[-\frac{1}{2\sigma^2}\delta_{ij}(x^i-\mu^i)(x^j-\mu^j)\right]\ . \qquad(58)$$
协方差矩阵及其逆均为对角矩阵，且与单位矩阵成正比，
$$C_{ij} = \frac{1}{\sigma^2}\delta_{ij}\ ,\quad C^{ij} = \sigma^2\delta^{ij}\ ,\quad\text{and}\quad c = \sigma^{-2D}\ . \qquad(59)$$

将
$$dC_{ij} = d\frac{1}{\sigma^2}\delta_{ij} = -\frac{2\delta_{ij}}{\sigma^3}d\sigma \qquad(60)$$
代入式(56)，诱导的信息度量为
$$d\ell^2 = \frac{1}{\sigma^2}\delta_{ij}d\mu^i d\mu^j + \frac{1}{2}\sigma^4\delta^{ik}\delta^{jl}\frac{2\delta_{ij}}{\sigma^3}d\sigma\frac{2\delta_{kl}}{\sigma^3}d\sigma \qquad(61)$$
利用
$$\delta^{ik}\delta^{jl}\delta_{ij}\delta_{kl} = \delta^k_j\delta^j_k = \delta^k_k = D\ , \qquad(62)$$
可简化为
$$d\ell^2 = \frac{\delta_{ij}}{\sigma^2}d\mu^i d\mu^j + \frac{2D}{\sigma^2}(d\sigma)^2\ . \qquad(63)$$

## 7 结论

信息度量的定义只不过是浅尝辄止。我们不仅可以引入长度和体积，还可以利用各种其他几何概念，如测地线、法向投影、平行移动的概念、协变导数、联络和曲率。信息几何方法的威力通过大量的应用得到了证明。作为进入浩如烟海的文献的一个非常不完整的入口

11


<!-- page 12 -->

在数理统计学中，见 [4][13][14][15]；在模型选择中，见 [16][17]；在热力学中，见 [18]；关于其向量子信息几何的推广，见 [19][20]。

这些方法最终的适用范围仍有待探索。在本教程中，我们论证了信息几何是一种自然且必然的工具，用于在不完全信息下进行推理。人们或许可以猜想，既然科学在很大程度上就是在不完全信息下进行推理，那么我们理应预期在科学的方方面面都能发现概率、熵以及几何。事实上，我甚至敢预测，一旦我们更好地理解了时空物理学，我们就会发现，就连那古老而熟悉的最初几何——即欧几里得关于物理空间的几何——也将被证明是信息几何的一种体现。但那是未来的工作。

## 参考文献

[1] A. Einstein，第67页，载于 "Albert Einstein: Philosopher-Scientist"，P. A. Schilpp 编（Open Court，1969）。

[2] N. N. Čencov：*Statistical Decision Rules and Optimal Inference*，Transl. Math. Monographs，第53卷，Am. Math. Soc.（Providence，1981）。

[3] S. Amari，*Differential-Geometrical Methods in Statistics*（Springer-Verlag，1985）。

[4] S. Amari 与 H. Nagaoka，*Methods of Information Geometry*（Am. Math. Soc./Oxford U. Press，2000）。

[5] A. Caticha，*Entropic Inference and the Foundations of Physics*（USP Press，São Paulo，Brazil 2012）；在线获取：http://www.albany.edu/physics/ACaticha-EIFP-book.pdf。

[6] W. K. Wootters，"Statistical distance and Hilbert space"，Phys. Rev. **D**，357（1981）。

[7] V. Balasubramanian，"Statistical inference, Occam's razor, and statistical mechanics on the space of probability distributions"，Neural Computation **9**，349（1997）。

[8] C. R. Rao，"Information and the accuracy attainable in the estimation of statistical parameters"，Bull. Calcutta Math. Soc. **37**，81（1945）。

[9] C. Atkinson 与 A. F. S. Mitchell，"Rao's distance measure"，Sankhyā **43A**，345（1981）。

[10] R. A. Fisher，"Theory of statistical estimation"，Proc. Cambridge Philos. Soc. **122**，700（1925）。


<!-- page 13 -->

[11] C. C. Rodríguez, “The metrics generated by the Kullback number”, *Maximum Entropy and Bayesian Methods*, J. Skilling (编) (Kluwer, Dordrecht 1989).

[12] L. L. Campbell, “An extended Čencov characterization of the information metric”, Proc. Am. Math. Soc. **98**, 135 (1986).

[13] B. Efron, Ann. Stat. **3**, 1189 (1975).

[14] C. C. Rodríguez, “Entropic priors”, *Maximum Entropy and Bayesian Methods*, 由 W. T. Grandy Jr. 和 L. H. Schick 编辑 (Kluwer, Dordrecht 1991).

[15] R. A. Kass 和 P. W. Vos, *Geometric Foundations of Asymptotic Inference* (Wiley, 1997).

[16] J. Myung, V. Balasubramanian, 和 M.A. Pitt, Proc. Nat. Acad. Sci. **97**, 11170 (2000).

[17] C. C. Rodríguez, “The ABC of model selection: AIC, BIC and the new CIC”, *Bayesian Inference and Maximum Entropy Methods in Science and Engineering*, 由 K. Knuth *et al.* 编辑, AIP Conf. Proc. Vol. **803**, 80 (2006) (omega.albany.edu:8008/CIC/me05.pdf).

[18] G. Ruppeiner, Rev. Mod. Phys. **67**, 605 (1995).

[19] R. Balian, Y. Alhassid 和 H. Reinhardt, Phys Rep., **131**, 2 (1986).

[20] R. F. Streater, Rep. Math. Phys., **38**, 419-436 (1996).

13
