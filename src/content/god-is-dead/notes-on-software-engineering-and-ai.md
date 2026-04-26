---
title: "Building Micrograd with Andrej Karpathy"
pubDate: "2026-04-15"
category: "Software"
description: "A dive into neural networks with Andrej Karpathy following his video on building Micrgrad."
---

## Preface
As AI is rapidly taking over the world, there is no way for a software engineer to stay relevant without a deep 
understanding of how it works.

I want to understand things deeply—not just how they work, but why—while keeping a hand on practical applications. So I 
decided that the fastest way for me to dive into the subject would be to look at how AI works under the hood, 
backfilling my understanding with theory where necessary.

While looking for a good starting point, I came across Andrej Karpathy’s series of videos, “Neural Networks: Zero to 
Hero”, and it seemed to be exactly what I was looking for: a great mix of intuition, theory, and practical examples.

This post contains my notes on the first episode of the series, where Micrograd is built. It follows the video and adds 
context in places where I needed a deeper understanding.

A few words on Andrej Karpathy. He is one of the founders of OpenAI, ex-Tesla director of AI in Tesla, and  currently 
(April, 2026) busy with his own project Eureka Labs focused on 



**1. What is a gradient?** The gradient tells you how to change something to improve it (for example, reduce a loss). *Intuition:* like standing on a hill, it points downhill (steepest descent) and its size is how steep it is.

*Example:* take **y = x²**. For this curve, the derivative (slope) as a function of *x* is **dy/dx = 2x**. That is the rule: “how fast *y* changes per tiny change in *x*” depends on where you sit on the parabola (section 3 sketches why the factor is **2x**).

Now fix a point, **x = 3**. There **y = 3² = 9**. Substitute **x = 3** into the rule **dy/dx = 2x**: you get **2·3 = 6**. So **only at that point**, *y* rises about **6 units for each 1 unit** you move *x* to the right: a tiny step **+0.01** in *x* bumps *y* by roughly **+0.06**. The slope is **positive**, so larger *x* means larger *y*. To **reduce** *y*, move *x* the other way (decrease *x*)—that is the “step opposite to the gradient” idea when *y* plays the role of something you want to minimize.

**2. What is a derivative?** It measures how much one quantity changes when another nudges a tiny amount. **dy/dx** means: “If *x* moves a little, how much does *y* respond?”

For **y = x²**, **dy/dx = 2x**: the slope is different at every *x* (above you already plugged in **x = 3** to get **6**).

**3. Why is the derivative of x² equal to 2x?** You are at some *x*, with **y = x²**. Nudge *x* by a small **ε**; the new *y* is **(x + ε)²**. Expand:

**(x + ε)² = x² + 2xε + ε²**.

Before the nudge, **y = x²**. After, **y = x² + 2xε + ε²**. The **change** in *y* (“after minus before”) is

**Δy = (x² + 2xε + ε²) − x² = 2xε + ε²**.

So **x² does not disappear from the world**—it appears in both the old and the new *y* and **cancels** when you only care about **how much *y* moved**. What remains is the part that came from the bump: mainly **2xε**, plus the tiny **ε²**.

For very small ε, **ε²** is negligible compared to **2xε** (try ε = 0.01: **ε² = 0.0001** while **2xε** is on the order of **0.02x**). So **Δy ≈ 2xε**.

The derivative **dy/dx** is “change in *y* **per unit** change in *x*” in the limit of a tiny bump: **Δy/ε ≈ 2x**. That is why the answer is **2x** and not something involving **x²**: **x²** fixes the **height** of the curve at *x*, but the **slope** is about how *y* responds to a **small move**—and after subtracting the old height, only the **linear-in-ε** piece **2xε** survives at leading order; divide by **ε** and you get **2x**.

**4. Chain rule (very important).** If **x → a → y**, then **dy/dx = (dy/da) · (da/dx)**. Example: **a = x²**, **y = a + 3** gives **dy/da = 1**, **da/dx = 2x**, so **dy/dx = 2x**. At **x = 3**, **dy/dx = 6**.

**5. What is backpropagation?** Walking **backward** through the computation graph to see how each piece affected the final loss—“who is responsible for the error?” Forward pass: compute outputs and loss. Backward pass: apply the chain rule to get gradients for weights and activations.

**6. What is autograd?** It **automatically** computes gradients via backprop: it records operations, builds a computation graph, and runs the backward pass when you call something like `.backward()`.

**7. Tiny neural network example.** Setup: **x = 2**, **w = 1**, **target = 4**; minimize **error = (pred − target)²** with **pred = x · w**.

Forward: **pred = 2 · 1 = 2**. Error: **(2 − 4)² = 4**.

Backprop: **d(error)/d(pred) = 2(pred − 4) = −4**; **d(pred)/dw = x = 2**; chain gives **d(error)/dw = (−4) · 2 = −8**.

Update (learning rate **0.1**): **w = 1 − 0.1·(−8) = 1.8** (the loss derivative w.r.t. *w* is negative, so *w* increases). New **pred = 2 · 1.8 = 3.6**, closer to **4**.

**8. Why this matters.** Training repeats: predict → measure loss → backprop → take a small step on weights in the direction that lowers the loss.

**Summary.** **Gradient** — direction to improve the objective. **Derivative** — local rate of change. **Chain rule** — compose derivatives through the graph. **Backprop** — apply that backward. **Autograd** — automates backprop.

**In one sentence:** neural networks learn by using backpropagation to compute gradients, which say how to adjust weights so the prediction moves toward lower error.
