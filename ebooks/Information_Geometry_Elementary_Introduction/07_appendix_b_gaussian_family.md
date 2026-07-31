<!-- page 46 -->

## B 多元高斯族：一个指数族

我们报告多元高斯 [136] 族 $\{N(\mu,\Sigma) \text{ 满足 } \mu \in \mathbb{R}^d, \Sigma \succ 0\}$ 的典范分解，依据 [78]。多元高斯族亦称 MultiVariate Normal 族，或简称 MVN 族。

令 $\lambda := (\lambda_v, \lambda_M) = (\mu, \Sigma)$ 表示 MVN 的复合（向量,矩阵）参数。$d$ 维 MVN 密度由下式给出：

$$p_\lambda(x;\lambda) \quad:=\quad \frac{1}{(2\pi)^{\frac{d}{2}}\sqrt{|\lambda_M|}} \exp\left(-\frac{1}{2}(x-\lambda_v)^\top \lambda_M^{-1} (x-\lambda_v)\right), \tag{221}$$

其中 $|\cdot|$ 表示矩阵行列式。自然参数 $\theta$ 亦使用向量参数 $\theta_v$ 与矩阵参数 $\theta_M$ 共同表示，构成复合对象 $\theta = (\theta_v, \theta_M)$。通过如下定义复合（向量,矩阵）对象上的复合内积：

$$\langle \theta, \theta' \rangle := \theta_v^\top \theta_v' + \operatorname{tr}\left({\theta_M'}^\top \theta_M\right), \tag{222}$$

其中 $\operatorname{tr}(\cdot)$ 表示矩阵迹，我们将式 (221) 的 MVN 密度重写为指数族 [84] 的典范形式：

$$p_\theta(x;\theta) \quad:=\quad \exp\left(\langle t(x), \theta \rangle - F_\theta(\theta)\right) = p_\lambda(x;\lambda(\theta)), \tag{223}$$

其中
$$\theta = (\theta_v, \theta_M) = \left(\Sigma^{-1}\mu, -\frac{1}{2}\Sigma^{-1}\right) = \theta(\lambda) = \left(\lambda_M^{-1}\lambda_v, -\frac{1}{2}\lambda_M^{-1}\right), \tag{224}$$
为复合自然参数，且
$$t(x) = (x, -xx^\top) \tag{225}$$
为复合充分统计量。函数 $F_\theta$ 是严格凸且连续可微的对数归一化函数，定义为：

$$F_\theta(\theta) = \frac{1}{2}\left(d\log\pi - \log|\theta_M| + \frac{1}{2}\theta_v^\top \theta_M^{-1} \theta_v\right), \tag{226}$$

该对数归一化函数可用普通参数 $\lambda = (\mu, \Sigma)$ 表示为：

$$F_\lambda(\lambda) \quad=\quad \frac{1}{2}\left(\lambda_v^\top \lambda_M^{-1} \lambda_v + \log|\lambda_M| + d\log 2\pi\right), \tag{227}$$
$$\qquad\quad =\quad \frac{1}{2}\left(\mu^\top \Sigma^{-1}\mu + \log|\Sigma| + d\log 2\pi\right). \tag{228}$$

矩/期望参数 [8] 为：

$$\eta = (\eta_v, \eta_M) = E[t(x)] = \nabla F(\theta). \tag{229}$$

我们报告三类坐标系（即普通参数 $\lambda$、自然参数 $\theta$ 与矩参数 $\eta$）之间的转换公式如下：

$$\left\{ \begin{array}{l} \theta_v(\lambda) = \lambda_M^{-1}\lambda_v = \Sigma^{-1}\mu \\ \theta_M(\lambda) = \frac{1}{2}\lambda_M^{-1} = \frac{1}{2}\Sigma^{-1} \end{array} \right. \quad\Leftrightarrow\quad \left\{ \begin{array}{l} \lambda_v(\theta) = \frac{1}{2}\theta_M^{-1}\theta_v = \mu \\ \lambda_M(\theta) = \frac{1}{2}\theta_M^{-1} = \Sigma \end{array} \right. \tag{230}$$

$$\left\{ \begin{array}{l} \eta_v(\theta) = \frac{1}{2}\theta_M^{-1}\theta_v \\ \eta_M(\theta) = -\frac{1}{2}\theta_M^{-1} - \frac{1}{4}(\theta_M^{-1}\theta_v)(\theta_M^{-1}\theta_v)^\top \end{array} \right. \quad\Leftrightarrow\quad \left\{ \begin{array}{l} \theta_v(\eta) = -(\eta_M + \eta_v\eta_v^\top)^{-1}\eta_v \\ \theta_M(\eta) = -\frac{1}{2}(\eta_M + \eta_v\eta_v^\top)^{-1} \end{array} \right. \tag{231}$$

$$\left\{ \begin{array}{l} \lambda_v(\eta) = \eta_v = \mu \\ \lambda_M(\eta) = -\eta_M - \eta_v\eta_v^\top = \Sigma \end{array} \right. \quad\Leftrightarrow\quad \left\{ \begin{array}{l} \eta_v(\lambda) = \lambda_v = \mu \\ \eta_M(\lambda) = -\lambda_M - \lambda_v\lambda_v^\top = -\Sigma - \mu\mu^\top \end{array} \right. \tag{232}$$


<!-- page 47 -->

对偶 Legendre 凸共轭 [8] 为
$$F_\eta^*(\eta) = -\frac{1}{2}\left(\log(1+\eta_v^\top\eta_M^{-1}\eta_v) + \log|-\eta_M| + d(1+\log 2\pi)\right), \tag{233}$$

且 $\theta = \nabla_\eta F_\eta^*(\eta)$。

我们在 $\eta=\nabla F(\theta)$ 且 $\theta=\nabla F^*(\eta)$ 时检验 Fenchel-Young 等式：
$$F_\theta(\theta)+F_\eta^*(\eta)-\langle\theta,\eta\rangle=0. \tag{234}$$

两个 $d$ 维 Gaussian 分布 $p_{(\mu_1,\Sigma_1)}$ 与 $p_{(\mu_2,\Sigma_2)}$ 之间的 KullbackLeibler 散度（其中 $\Delta_\mu=\mu_2-\mu_1$）为
$$\mathrm{KL}(p_{(\mu_1,\Sigma_1)}:p_{(\mu_2,\Sigma_2)}) \quad = \quad \frac{1}{2}\left\{\mathrm{tr}(\Sigma_2^{-1}\Sigma_1)+\Delta_\mu^\top\Sigma_2^{-1}\Delta_\mu+\log\frac{|\Sigma_2|}{|\Sigma_1|}-d\right\} = \mathrm{KL}(p_{\lambda_1}:p_{\lambda_2}). \tag{235}$$

我们验证 $\mathrm{KL}(p_{(\mu,\Sigma)}:p_{(\mu,\Sigma)})=0$，因为 $\Delta_\mu=0$ 且 $\mathrm{tr}(\Sigma^{-1}\Sigma)=\mathrm{tr}(I)=d$。注意到当 $\Sigma_1=\Sigma_2=\Sigma$ 时，有
$$\mathrm{KL}(p_{(\mu_1,\Sigma)}:p_{(\mu_2,\Sigma)}) = \frac{1}{2}\Delta_\mu^\top\Sigma^{-1}\Delta_\mu = \frac{1}{2}D_{\Sigma^{-1}}^2(\mu_1,\mu_2), \tag{236}$$

这即是关于精度矩阵 $\Sigma^{-1}$（一个正定矩阵：$\Sigma^{-1}\succ 0$）的 Mahalanobis 距离平方的一半，其中 Mahalanobis 距离对任意正定矩阵 $Q\succ 0$ 定义如下：
$$D_Q(p_1:p_2) = \sqrt{(p_1-p_2)^\top Q(p_1-p_2)}. \tag{237}$$

相同指数族的两个概率密度之间的 KullbackLeibler 散度等价于一个 Bregman 散度 [8]：
$$\mathrm{KL}(p_{(\mu_1,\Sigma_1)}:p_{(\mu_2,\Sigma_2)}) = \mathrm{KL}(p_{\lambda_1}:p_{\lambda_2}) = B_F(\theta_2:\theta_1) = B_{F^*}(\eta_1:\eta_2), \tag{238}$$

其中 Bregman 散度定义为
$$B_F(\theta:\theta') := F(\theta)-F(\theta')-\langle\theta-\theta',\nabla F(\theta')\rangle, \tag{239}$$

其中 $\eta'=\nabla F(\theta')$。定义典范散度 [8]
$$A_F(\theta_1:\eta_2) = F(\theta_1)+F^*(\eta_2)-\langle\theta_1,\eta_2\rangle = A_{F^*}(\eta_2:\theta_1), \tag{240}$$

因为 $F^{**}=F$。我们有 $B_F(\theta_1:\theta_2)=A_F(\theta_1:\eta_2)$。

## 符号说明

以下是我们本文档中使用的符号列表：

| 符号 | 说明 |
|:---|:---|
| $[D]$ | $[D]:=\{1,\ldots,D\}$ |
| $\langle\cdot,\cdot\rangle$ | 内积 |
| $M_Q(u,v)=\|u-v\|_Q$ | Mahalanobis 距离 $M_Q(u,v)=\sqrt{\sum_{i,j}(u^i-v^i)(u^j-v^j)Q_{ij}}$, $Q\succ 0$ |
| $D(\theta:\theta')$ | 参数散度 |
| $D[p(x):p'(x)]$ | 统计散度 |
| $D$, $D^*$ | 散度与对偶（反向）散度 |


<!-- page 48 -->

|  |  |
|:---|:---|
| Csiszár 散度 $I_f$ | $I_f(\theta:\theta') := \sum_{i=1}^D \theta_i f\left(\frac{\theta'_i}{\theta_i}\right)$ with $f(1)=0$ |
| Bregman 散度 $B_F$ | $B_F(\theta:\theta') := F(\theta)-F(\theta')-(\theta-\theta')^\top \nabla F(\theta')$ |
| 典范散度 $A_{F,F^*}$ | $A_{F,F^*}(\theta:\eta') = F(\theta)+F^*(\eta')-\theta^\top \eta'$ |
| Bhattacharyya 距离 | $B_\alpha[p_1:p_2] = -\log \int_{x\in\mathcal{X}} p_1^\alpha(x) p_2^{1-\alpha}(x) \mathrm{d}\mu(x)$ |
| Jensen/Burbea-Rao 散度 | $J_F^{(\alpha)}(\theta_1:\theta_2) = \alpha F(\theta_1) + (1-\alpha)F(\theta_2) - F(\alpha\theta_1+(1-\alpha)\theta_2)$ |
| Chernoff 信息 | $C[P_1,P_2] = -\log \min_{\alpha\in(0,1)} \int_{x\in\mathcal{X}} p_1^\alpha(x) p_2^{1-\alpha}(x) \mathrm{d}\mu(x)$ |
| $F$, $F^*$ | 由 Legendre-Fenchel 变换关联的势函数 |
| $D_\rho(p,q)$ | Riemannian 距离 $D_\rho(p,q) := \int_0^1 \|\gamma'(t)\|_{\gamma(t)} \mathrm{d}t$ |
| $B$, $B^*$ | 基, 互反基 |
| $B=\{e_1=\partial_1,\ldots,e_D=\partial_D\}$ | 自然基 |
| $\{\mathrm{d}x_i\}_i$ | 余向量基（1-形式） |
| $(v)_B := (v^i)$ | 向量 $v$ 的反变分量 |
| $(v)_{B^*} := (v_i)$ | 向量 $v$ 的协变分量 |
| $u \perp v$ | 向量 $u$ 垂直于向量 $v$（$\langle u,v\rangle = 0$） |
| $\|v\| = \sqrt{\langle v,v\rangle}$ | 诱导范数, 向量 $v$ 的长度 |
| $M$, $S$ | 流形, 子流形 |
| $T_p$ | $p$ 处的切平面 |
| $TM$ | 切丛 $TM = \cup_p T_p = \{(p,v), p\in M, v\in T_p\}$ |
| $\mathfrak{F}(M)$ | $M$ 上的光滑函数空间 |
| $\mathfrak{X}(M) = \Gamma(TM)$ | $M$ 上的光滑向量场空间 |
| $vf$ | 函数 $f$ 关于向量 $v$ 的方向导数 |
| $X,Y,Z \in \mathfrak{X}(M)$ | 向量场 |
| $g \stackrel{\Sigma}{=} g_{ij} \mathrm{d}x_i \otimes \mathrm{d}x_j$ | 度量张量（场） |
| $(\mathcal{U},x)$ | 坐标卡 $\mathcal{U}$ 中的局部坐标 $x$ |
| $\partial_i =: \frac{\partial}{\partial x_i}$ | 自然基向量 |
| $\partial^i =: \frac{\partial}{\partial x^i}$ | 自然互反基向量 |
| $\nabla$ | 仿射联络 |
| $\nabla_X Y$ | 协变导数 |
| $\prod_c^\nabla$ | 沿光滑曲线 $c$ 的向量平行移动 |
| $\prod_c v$ | 沿光滑曲线 $c$ 平行移动 $v \in T_{c(0)}$ |
| $\gamma$, $\gamma_\nabla$ | 测地线, 关于联络 $\nabla$ 的测地线 |
| $\Gamma_{ij,l}$ | 第一类 Christoffel 符号（函数） |
| $\Gamma_{ij}^k$ | 第二类 Christoffel 符号（函数） |
| $R$ | Riemann-Christoffel 曲率张量 |
| $[X,Y]$ | Lie 括号 $[X,Y](f) = X(Y(f)) - Y(X(f)), \forall f \in \mathfrak{F}(M)$ |
| $\nabla$-投影 | $P_S = \arg\min_{Q\in S} D(\theta(P):\theta(Q))$ |
| $\nabla^*$-投影 | $P_S^* = \arg\min_{Q\in S} D(\theta(Q):\theta(P))$ |
| $C$ | Amari-Chentsov 全对称三次 3-协变张量 |
| $\mathcal{P}=\{p_\theta(x)\}_{\theta\in\Theta}$ | 概率分布的参数族 |
| $\mathcal{E}, \mathcal{M}, \Delta_D$ | 指数族, 混合族, 概率单纯形 |
| $_\mathcal{P}I(\theta)$ | Fisher 信息矩阵 |
| $_\mathcal{P}I(\theta)$ | 参数族 $\mathcal{P}$ 的 Fisher 信息矩阵（FIM） |

48
