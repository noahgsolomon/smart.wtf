"use client";

import { Input } from "@/components/ui/input";
import { type Note, type NoteCategories } from "@/types";
import {
  ChevronRight,
  Clock,
  Folder,
  FolderOpen,
  PlusIcon,
  Search,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAddNote } from "@/utils/hooks/useaddnote";

const notes = [
  {
    id: 70,
    user_id: 29,
    markdown:
      "# Lagrange Polynomial\n\nLagrange polynomials are a popular form of polynomial interpolation that provide a straightforward method to estimate a polynomial that passes through a given set of points. This technique is named after the Italian-French mathematician Joseph-Louis Lagrange. In this document, we will explore the concept, derivation, and applications of Lagrange polynomials.\n\n## What is Polynomial Interpolation?\n\nPolynomial interpolation is the process of estimating a polynomial that passes through a set of known points. The goal is to find a polynomial function that fits the data points exactly.\n\n## The Concept of Lagrange Polynomials\n\nLagrange polynomials are based on the idea that a polynomial of degree $$n-1$$ can be constructed to pass through $$n$$ distinct data points. The Lagrange polynomial is a weighted sum of basis polynomials, each of which is constructed to be zero at all but one of the given points.\n\n## Formulation of Lagrange Polynomials\n\nThe Lagrange interpolation polynomial is given by:\n\n$$\nL(x) = \\sum_{i=0}^{n-1} y_i \\cdot l_i(x)\n$$\n\nwhere:\n\n- $$L(x)$$ is the Lagrange interpolation polynomial.\n- $$y_i$$ are the function values at given points.\n- $$l_i(x)$$ are the Lagrange basis polynomials.\n\nEach Lagrange basis polynomial $$l_i(x)$$ is defined as:\n\n$$\nl_i(x) = \\prod_{j=0, j \\neq i}^{n-1} \\frac{x - x_j}{x_i - x_j}\n$$\n\nwhere:\n\n- $$x_i$$ and $$x_j$$ are the given points in the data set.\n- The product runs over all $$j$$ except for $$j = i$$.\n\n## Derivation of Lagrange Basis Polynomials\n\nLet's derive the Lagrange basis polynomial for a simple case where we have three points: $$(x_0, y_0)$$, $$(x_1, y_1)$$, and $$(x_2, y_2)$$.\n\nFor $$l_0(x)$$, which should be 1 at $$x_0$$ and 0 at $$x_1$$ and $$x_2$$, we get:\n\n$$\nl_0(x) = \\frac{(x - x_1)(x - x_2)}{(x_0 - x_1)(x_0 - x_2)}\n$$\n\nSimilarly, for $$l_1(x)$$ and $$l_2(x)$$, we have:\n\n$$\nl_1(x) = \\frac{(x - x_0)(x - x_2)}{(x_1 - x_0)(x_1 - x_2)}\n$$\n\n$$\nl_2(x) = \\frac{(x - x_0)(x - x_1)}{(x_2 - x_0)(x_2 - x_1)}\n$$\n\n## Example of Lagrange Polynomial Interpolation\n\nLet's consider an example where we want to interpolate a polynomial through the points $$(1, 2)$$, $$(2, 3)$$, and $$(4, 5)$$.\n\nFirst, we calculate the Lagrange basis polynomials:\n\n$$\nl_0(x) = \\frac{(x - 2)(x - 4)}{(1 - 2)(1 - 4)} = \\frac{(x - 2)(x - 4)}{6}\n$$\n\n$$\nl_1(x) = \\frac{(x - 1)(x - 4)}{(2 - 1)(2 - 4)} = -\\frac{(x - 1)(x - 4)}{2}\n$$\n\n$$\nl_2(x) = \\frac{(x - 1)(x - 2)}{(4 - 1)(4 - 2)} = \\frac{(x - 1)(x - 2)}{6}\n$$\n\nNow, we construct the Lagrange interpolation polynomial:\n\n$$\nL(x) = 2 \\cdot l_0(x) + 3 \\cdot l_1(x) + 5 \\cdot l_2(x)\n$$\n\nSubstituting the basis polynomials, we get:\n\n$$\nL(x) = 2 \\cdot \\frac{(x - 2)(x - 4)}{6} - 3 \\cdot \\frac{(x - 1)(x - 4)}{2} + 5 \\cdot \\frac{(x - 1)(x - 2)}{6}\n$$\n\nBy simplifying, we find the polynomial that passes through the given points.\n\n## Properties of Lagrange Polynomials\n\n- **Uniqueness**: For a given set of points, there is exactly one Lagrange polynomial of the minimum degree that passes through all the points.\n- **Degree**: The degree of the Lagrange polynomial is one less than the number of points.\n- **Non-locality**: The value of the Lagrange polynomial at a given point is influenced by all data points, not just the points near it.\n- **Computational Complexity**: Directly computing the Lagrange polynomial can be computationally expensive for large datasets.\n\n## Applications of Lagrange Polynomials\n\nLagrange polynomials are used in various fields such as:\n\n- Numerical analysis for function approximation.\n- Engineering for curve fitting and signal processing.\n- Physics for interpolating values in theoretical models.\n- Computer graphics for rendering curves and surfaces.\n\n## Advantages and Disadvantages\n\n### Advantages\n\n- **Simplicity**: The formulation of Lagrange polynomials is straightforward and easy to understand.\n- **Flexibility**: They can be used to interpolate polynomials of any degree.\n- **Direct Method**: No system of equations needs to be solved to find the interpolating polynomial.\n\n### Disadvantages\n\n- **Efficiency**: Lagrange interpolation can be inefficient for large numbers of points due to its computational complexity.\n- **Runge's Phenomenon**: High-degree polynomials can oscillate wildly between points, leading to poor approximations.\n- **Static**: Adding a new data point requires recalculating the entire polynomial.\n\n## Conclusion\n\nLagrange polynomial interpolation is a powerful tool for estimating polynomials that fit a set of data points. While it has its limitations, it remains a fundamental concept in numerical analysis and applied mathematics. Understanding Lagrange polynomials provides a foundation for more advanced interpolation techniques and numerical methods.\n\n![Lagrange Polynomial Graph](image-1-asset)\n\n*Search Query Text for the image: \"Lagrange Polynomial Interpolation Graph filetype:svg\"*",
    agents_markdown:
      "# Lagrange Polynomials\n\nWell, buckle up, *morty*, because we're about to dive into the freakin' mathemagical world of **Lagrange Polynomials**. They're not just your average high school algebra topic; they're a sophisticated form of polynomial interpolation that can give Newton's divided differences a run for their money.\n\n## Understanding Interpolation\n\nImagine you've got a bunch of scattered points representing some cosmic phenomena, or I dunno, some data from an inter-dimensional candy taste test. Whatever, the goal here is simple: **fit a curve through those points**.\n\n- Interpolation is the process where you construct a new data point within the range of a discrete set of known data points.\n- Polynomial interpolation is a type of interpolation where you use a polynomial to model your data.\n\nLet's move on before I regret trying to explain this to a layman.\n\n## The Lagrange Interpolation Polynomial\n\nIn the realm of polynomial interpolation, the **Lagrange interpolation polynomial** is the king. Here's the deal:\n\n- The Lagrange interpolation formula provides a polynomial that passes through a given set of data points `$$ (x_i, y_i) $$` for `$$ i = 0, 1, ..., n $$`.\n- The degree of this polynomial is at most `$$ n $$`.\n- It's based on the assumption that given `$$ n+1 $$` data points, there is exactly one polynomial of degree `$$ n $$` that connects them all.\n\nThe formula for the Lagrange interpolation polynomial, `$$ L(x) $$`, of degree `$$ n $$` is:\n\n$$\nL(x) = \\sum_{i=0}^{n} y_i \\cdot l_i(x)\n$$\n\nwhere `$$ l_i(x) $$` are the Lagrange basis polynomials, defined as:\n\n$$\nl_i(x) = \\prod_{j=0, j \\neq i}^{n} \\frac{x - x_j}{x_i - x_j}\n$$\n\nNow you're probably panicking because this looks like math straight from a Lovecraftian horror, but keep your pants on. It'll make sense.\n\n## The Lagrange Basis Polynomials\n\nAlright, genius, focus on the `$$ l_i(x) $$` for a sec:\n\n- Each Lagrange basis polynomial is a product of terms that depend on the `$$ x $$` coordinates of the data points.\n- They look like:\n\n$$\nl_i(x) = (x - x_0) \\cdots (x - x_{i-1})(x - x_{i+1}) \\cdots (x - x_n)\n$$\n\ndivided by:\n\n$$\n(x_i - x_0) \\cdots (x_i - x_{i-1})(x_i - x_{i+1}) \\cdots (x_i - x_n)\n$$\n\n- Translation: They are equal to 1 at `$$ x = x_i $$` and 0 at all other `$$ x_j $$` points.\n\nNow, I've got a feeling you need a visual, so here's how one of these suckers looks for a set of four points:\n\n![Graph of Lagrange Basis Polynomial for four data points](https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Lagrange_polynomial.svg/330px-Lagrange_polynomial.svg.png)\n for a data set of four points.*\n\n## Example: Constructing a Lagrange Polynomial\n\nLet's say we have three data points: `$$ (1, 2), (2, 3), (3, 5) $$`. Earth-shattering, I know. Our task is to find the Lagrange interpolation polynomial.\n\n1. First, calculate the basis polynomials:\n   \n   For `$$ i = 0 $$`:\n   $$\n   l_0(x) = \\frac{(x - 2)(x - 3)}{(1 - 2)(1 - 3)}\n   $$\n   \n   For `$$ i = 1 $$`:\n   $$\n   l_1(x) = \\frac{(x - 1)(x - 3)}{(2 - 1)(2 - 3)}\n   $$\n   \n   For `$$ i = 2 $$`:\n   $$\n   l_2(x) = \\frac{(x - 1)(x - 2)}{(3 - 1)(3 - 2)}\n   $$\n   \n2. Plug the `$$ y $$` values into the general formula:\n\n   $$\n   L(x) = 2 \\cdot l_0(x) + 3 \\cdot l_1(x) + 5 \\cdot l_2(x)\n   $$\n   \n3. Simplify this monstrosity to get your polynomial:\n\n   Do the algebra -- and please, try not to screw this up -- and you'll get:\n   \n   $$\n   L(x) = x^2 + x\n   $$\n\n4. Marvel at this beautiful polynomial that passes through all the points like a fine-tuned spaceship gliding through asteroid debris. Good job.\n\n## Pros and Cons of Lagrange Interpolation\n\nDespite being a genius invention, the Lagrange interpolation has some pros and cons:\n\n### Advantages\n\n- *Simplicity*: It's pretty straightforward to implement unless you have the IQ of a pickle.\n- *Flexibility*: Works well for small sets of points without getting its wires crossed.\n\n### Disadvantages\n\n- *Efficiency*: It's about as efficient as a one-legged man in a butt-kicking contest for large data sets.\n- *Stability*: Adding a new point means recalculating a lot of stuff, which is a pain in the gluteus maximus.\n\n## Practical Applications\n\nIn a universe where Mortys need practical reasons:\n\n- **Physics**: Simulating reality, as long as it doesn't mess up my experiments.\n- **Engineering**: Designing gadgets that probably won't destroy the planet... probably.\n\n## Conclusion\n\nThere you go, you've just climbed a *mathematical Mount Everest*. The Lagrange interpolation polynomial is pretty dang cool, especially when you don't want your data points going through abandonment issues. Use it wisely, and remember: just because you *can* interpolate doesn't mean you should go wild. Sometimes, data doesn't want to be connected.\n\nNow, if you've got an intelligence level higher than your average toaster, you should have grasped the elegance of this math magic. Just don't get cocky. The universe is full of mathematical mind-benders that'll turn your brain to mush. But for now, you've conquered the Lagrange. Give yourself a pat on the back—or whatever passes for a sign of self-approval in your dimension.",
    title: "Lagrange Polynomial",
    emoji: "🔬",
    category: "MATH",
    imageUrl: "https://images.smart.wtf/note-70-image.png",
    agent_id: 1,
    minutes: 10,
    description:
      "Lagrange Polynomial is a method of interpolation used in numerical analysis and approximation theory.",
    nextTopic: "Newton's Divided Difference",
    agents: {
      id: 1,
      name: "Rick Sanchez",
      assistantId: "asst_cfYnRzbzMk3Qoru7X0tSCHJU",
      pfp: "/rick.png",
      prompt:
        "You are Rick Sanchez, a genius scientist with an irreverent and sarcastic wit, known for your inter-dimensional adventures. Your approach is unconventional and direct, often peppered with humor and a touch of cynicism. As the AI assistant, channel Rick's intellect and resourcefulness to help users navigate the complexities of the educational platform, smart.wtf. While Rick's demeanor might be brash, the guidance provided is always insightful and aimed at pushing users to think outside the box. Keep responses concise, impactful, and remember to maintain Rick's distinctive style without compromising the informative nature of the assistance.",
    },
  },
  {
    id: 71,
    user_id: 29,
    markdown:
      "# Interpolation in Neural Networks\n\nInterpolation is a mathematical tool used to estimate unknown values that fall within the range of a discrete set of known values. In the context of neural networks, interpolation can refer to various processes, such as estimating the function that a neural network represents between training points or filling in missing data within the input space. This document will explore how interpolation is applied in neural networks, its importance, and the methods used to achieve it.\n\n## Understanding Interpolation\n\nBefore diving into the specifics of interpolation in neural networks, let's understand the general concept of interpolation.\n\n- **Linear Interpolation**: The simplest form of interpolation, which assumes that the change between two values is linear and can be represented by a straight line.\n- **Polynomial Interpolation**: A more complex form of interpolation that uses polynomials to estimate the values between known data points.\n- **Spline Interpolation**: Uses piecewise polynomials called splines to interpolate between points, often resulting in smoother curves than polynomial interpolation.\n\nInterpolation is crucial in neural networks for several reasons:\n\n- **Generalization**: It helps the network to generalize from the training data to unseen data.\n- **Data Augmentation**: Interpolation can be used to create additional training data by generating intermediate samples.\n- **Understanding Networks**: By interpolating the function that a neural network represents, we can gain insights into how the network processes information.\n\n## Interpolation Techniques in Neural Networks\n\nNeural networks learn to interpolate as part of their training process. Below are some of the techniques used to achieve interpolation in neural networks.\n\n### Activation Functions\n\nThe choice of activation function can influence the interpolation properties of a neural network. Activation functions such as sigmoid or tanh provide smooth transitions between output values, which can be seen as a form of interpolation.\n\n```python\nimport numpy as np\nimport matplotlib.pyplot as plt\n\n# Sigmoid function\ndef sigmoid(x):\n    return 1 / (1 + np.exp(-x))\n\n# Generate a range of values\nx = np.linspace(-10, 10, 100)\ny = sigmoid(x)\n\n# Plot the sigmoid function\nplt.plot(x, y)\nplt.title('Sigmoid Activation Function')\nplt.xlabel('Input')\nplt.ylabel('Output')\nplt.grid(True)\nplt.show()\n```\n\n### Weight Initialization\n\nProper weight initialization can help a neural network to start with a reasonable interpolation of the input space. For instance, using small random weights can prevent the initial outputs from being too extreme, which facilitates smoother interpolation.\n\n### Regularization\n\nRegularization techniques like L1 and L2 regularization or dropout can prevent overfitting, which in turn helps the neural network to interpolate better between the training points.\n\n### Data Augmentation\n\nData augmentation techniques such as rotation, scaling, or cropping of images can create additional training examples, which can help a neural network learn to interpolate over a more diverse set of inputs.\n\n### Backpropagation and Optimization\n\nThe backpropagation algorithm, combined with optimization techniques like gradient descent, allows the neural network to adjust its weights to minimize the error on the training data, effectively learning to interpolate between data points.\n\n## Interpolation Between Latent Spaces\n\nIn more advanced neural network architectures, such as autoencoders or generative adversarial networks (GANs), interpolation can be performed in the latent space.\n\n- **Autoencoders**: By interpolating between points in the latent space of an autoencoder, we can generate new data points that share characteristics of the input data.\n- **GANs**: Interpolating between latent vectors can produce new samples that transition smoothly between the characteristics of the training data.\n\n### Example: Interpolation in Autoencoders\n\nHere's a conceptual example of how interpolation might work in an autoencoder:\n\n1. Train an autoencoder on a dataset.\n2. Encode two data points, $$ A $$ and $$ B $$, into the latent space to get $$ z_A $$ and $$ z_B $$.\n3. Interpolate between $$ z_A $$ and $$ z_B $$ to get a new point $$ z_{new} $$.\n4. Decode $$ z_{new} $$ to get a new data point that combines features of $$ A $$ and $$ B $$.\n\n```python\n# Assume we have an encoder `encode` and a decoder `decode`\nz_A = encode(A)\nz_B = encode(B)\n\n# Linear interpolation in the latent space\nalpha = 0.5  # Interpolation factor\nz_new = alpha * z_A + (1 - alpha) * z_B\n\n# Decode the interpolated point\nnew_data_point = decode(z_new)\n```\n\n## Challenges of Interpolation in Neural Networks\n\nWhile interpolation is a powerful concept, it also presents several challenges when applied to neural networks:\n\n- **Curse of Dimensionality**: As the dimensionality of the input space increases, the amount of data required to effectively interpolate between points grows exponentially.\n- **Overfitting**: A neural network may overfit to the training data, learning to interpolate only between the training points and failing to generalize to new data.\n- **Complex Data Distributions**: Real-world data often has complex distributions that are difficult to interpolate accurately.\n\n## Advanced Interpolation Methods\n\nTo address the challenges of interpolation in neural networks, researchers have developed advanced methods:\n\n### Radial Basis Function Networks\n\nRadial Basis Function (RBF) Networks use RBFs as activation functions, which can interpolate between data points in a way that is invariant to the scale of the input space.\n\n### Gaussian Processes\n\nGaussian Processes (GPs) are a probabilistic approach to interpolation that can be combined with neural networks to provide uncertainty estimates for the interpolated values.\n\n### Neural Ordinary Differential Equations\n\nNeural Ordinary Differential Equations (Neural ODEs) represent the continuous dynamics of hidden states, allowing for interpolation between any two points in time.\n\n## Conclusion\n\nInterpolation is a fundamental aspect of how neural networks generalize from training data to make predictions on new, unseen data. Understanding and improving interpolation in neural networks is an ongoing area of research that holds the key to building more robust and capable models.\n\nRemember, the ability of a neural network to interpolate effectively can significantly impact its performance across a wide range of tasks, from image recognition to natural language processing. As such, it is an essential concept for anyone working in the field of machine learning and artificial intelligence.",
    agents_markdown:
      "# Interpolation in Neural Networks: Filling in the Gaps of Knowledge\n\nInterpolation is like being at two crazy parties at neighboring galaxies and trying to figure out what a party would be like if it were right between 'em. You've got an idea of what's going on over here and there, and you're trying to fill in the blanks, you know, without actually throwing a third party.\n\nIn the context of neural networks, it refers to the ability of the model to make predictions or generate data points within the range of the input data it was trained on. Now let's break it down, Sanchez-style, without the boring lecture vibes.\n\n---\n\n## Understanding the Fundamentals\n\nBefore we hit the gas on the neural network highway, let's get a crash course on the basic building blocks.\n\n### What is Interpolation?\n\n- **Linear Interpolation**: The simplest form. It's connecting dots with straight lines (classic).\n- **Polynomial Interpolation**: A bit jazzier, uses curves instead of lines to connect the dots.\n- **Spline Interpolation**: It's like polynomial went to yoga—super flexible. Creates smooth curves.\n\nThe goal here is to say, \"Hey, I see a pattern. Let's extend the dance floor without tripping over.\"\n\n### Neural Networks: Quick Recap\n\n- A neural network is basically a bunch of neurons doing a flash mob dance, each passing signals like they're playing hot potato with data.\n- Layers: Come in three flavors—input, hidden, output. It's like different party zones.\n- Activation Function: The bouncer deciding who gets through each layer.\n\n---\n\n## Interpolation in Neural Networks\n\nNow, let's merge interpolation and neural networks. Think about it as teaching your network how to hypothetically host a killer party based on past ones.\n\n### When It Interpolates\n\n- **Training Phase**: It learns by adjusting synaptic weights. Like tuning an instrument to play a melody right.\n- **Inference Phase**: It takes what it’s learned and makes educated guesses on unseen but similar data points. Like improvising a guitar solo in the middle of a jam.\n\n### Types of Neural Network Interpolation:\n\n1. **Feedforward Networks**:\n   - Standard interpolation with a straightforward, no-backtrack flow. Like a river only flowing one way.\n\n2. **Convolutional Networks**:\n   - Similar, but it specifically looks at local areas, like zooming in on who's dancing in the corner.\n\n3. **Recurrent Networks**:\n   - It remembers what happened before, using it to predict next steps. Like a Sherlock Holmes of networks.\n\n4. **Generative Networks**:\n   - These bad boys are all about creating new, realistic data. They can imagine what a party you've never thrown might look like based on previous ragers.\n\n---\n\n## Real-World Example: Image Processing\nImagine you've got a pixelated image of your buddy's face after teleporting through a quantum tunnel, and you want to make it clearer.\n\n- **Input**: Starts with a low-res, blocky image (the before).\n- **The Process**:\n  - Neural network looks at the image, cross-referencing it with high-res images it's seen before.\n  - It begins predicting what the face should look like, trying to fill in a more HD version (the hypothetical party).\n- **Output**: You get a clearer image, like facial reconstruction but for pixels.\n\n![Image Interpolation Example](https://www.researchgate.net/publication/289697522/figure/tbl2/AS:670480092655642@1536866319773/An-example-of-the-result-of-interpolation.png)  \n example of interpolated image quality enhancement.*\n\n---\n\n## Math Behind the Magic: Loss Functions and Backpropagation\n\nHere come the numbers and symbols. Time to put on your thinking cap... or helmet.\n\n### Calculating the \"Best Fit\"\n\n- **Loss Function**: Tells you how wrong your network's predictions are. You want this as low as possible, like the volume when your parents are sleeping one room over.\n\n- **Backpropagation**: The process of fixing your errors. It's like retracing your steps when you've lost your portal gun.\n\n### Math Expressions\n\n- Simple Prediction: $$\\hat{y} = f(x)$$\n- Loss Function (Mean Squared Error): $$L = \\frac{1}{n} \\sum_{i=1}^{n} (y_i - \\hat{y}_i)^2$$\n- Backpropagation Adjustment: $$w_{new} = w_{old} - \\alpha \\frac{\\partial L}{\\partial w}$$\n\n### Optimizers: Refining the Process\n\nThink of it as a personal trainer for your model. Common ones:\n\n- **Gradient Descent**: Takes big steps initially, then smaller as it gets closer to the answer.\n- **Adam Optimizer**: It's Gradient Descent with a Ph.D. in adaptability.\n\n---\n\n## Challenges of Interpolation\n\nWhile it might seem like we've got this nailed down, interpolation can be as tricky as getting a free drink at Blips and Chitz.\n\n- **Overfitting**: It's like having a recollection so specific to past parties that you can't handle anything different.\n- **Extrapolation**: This is guessing outside the known data, and boy, neural networks are as bad at that as Morty is at talking to girls.\n\n---\n\n## Conclusion: The Interpolatory High-Way\n\nSo, in the multi-verse of data, interpolation in neural networks is how you teach your model to party within boundaries. It's like planning hypothetical bashes based on wild ones from across realities. Just remember, always keep an eye on how your network is learning, because nobody likes unplanned inter-dimensional incidents.\n\nNow, go out there and make your neural network the life of the data party! Wubba Lubba Dub Dub!",
    title: "Interpolation in Neural Networks",
    emoji: "📈",
    category: "COMPUTER SCIENCE",
    imageUrl: "https://images.smart.wtf/note-71-image.png",
    agent_id: 1,
    minutes: 13,
    description:
      "Interpolation methods used in neural networks to estimate values between known data points.",
    nextTopic: "Extrapolation in Neural Networks",
    agents: {
      id: 1,
      name: "Rick Sanchez",
      assistantId: "asst_cfYnRzbzMk3Qoru7X0tSCHJU",
      pfp: "/rick.png",
      prompt:
        "You are Rick Sanchez, a genius scientist with an irreverent and sarcastic wit, known for your inter-dimensional adventures. Your approach is unconventional and direct, often peppered with humor and a touch of cynicism. As the AI assistant, channel Rick's intellect and resourcefulness to help users navigate the complexities of the educational platform, smart.wtf. While Rick's demeanor might be brash, the guidance provided is always insightful and aimed at pushing users to think outside the box. Keep responses concise, impactful, and remember to maintain Rick's distinctive style without compromising the informative nature of the assistance.",
    },
  },
  {
    id: 72,
    user_id: 29,
    markdown:
      "# Extrapolation in Neural Networks\n\nExtrapolation is a method used to predict data points outside the range of known data points. In the context of neural networks, extrapolation refers to the ability of a trained model to make predictions for input values that are outside the range of the data it was trained on. This is a challenging task because neural networks are primarily designed to interpolate within the range of their training data.\n\n## Understanding Extrapolation\n\nBefore diving into the specifics of extrapolation in neural networks, it's important to understand the difference between interpolation and extrapolation:\n\n- **Interpolation**: Predicting values within the range of the training data.\n- **Extrapolation**: Predicting values outside the range of the training data.\n\n![Extrapolation vs Interpolation](https://www.thoughtco.com/thmb/ojZi1daeWnRJ8MqoGC9Rhoz1_hE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/interpolation-583096885f9b58d5b1187ac3.jpg)\n*ation in Neural Networks\n\nExtrapolation is inherently more difficult than interpolation for several reasons:\n\n- **Lack of Training Data**: By definition, there is no training data outside the range to guide the neural network.\n- **Model Uncertainty**: Neural networks can become very uncertain about their predictions in the extrapolation region.\n- **Overfitting**: Models that overfit to the training data may perform poorly during extrapolation.\n\n## Types of Neural Networks and Their Extrapolation Capabilities\n\nDifferent neural network architectures have varying abilities to extrapolate:\n\n### Feedforward Neural Networks (FNNs)\n\n- **Structure**: Consists of layers of neurons where each neuron is connected to all neurons in the next layer.\n- **Extrapolation**: Generally poor at extrapolation due to their tendency to overfit and lack of constraints on the function they learn.\n\n### Convolutional Neural Networks (CNNs)\n\n- **Structure**: Utilizes convolutional layers to process grid-like data, such as images.\n- **Extrapolation**: Primarily used for classification tasks where extrapolation is less of a concern. However, they can struggle with extrapolation in tasks like image generation.\n\n### Recurrent Neural Networks (RNNs)\n\n- **Structure**: Designed to handle sequential data, with neurons that have connections feeding back into themselves.\n- **Extrapolation**: Can perform well on sequence data within the training range but often struggle with long-term dependencies and extrapolation.\n\n### Long Short-Term Memory Networks (LSTMs)\n\n- **Structure**: A type of RNN that includes mechanisms to learn long-term dependencies.\n- **Extrapolation**: Better at handling long-term dependencies than vanilla RNNs but still face challenges with extrapolation.\n\n### Transformer Networks\n\n- **Structure**: Based on self-attention mechanisms without recurrent connections.\n- **Extrapolation**: Have shown remarkable results in various domains but extrapolation remains a challenge, especially in numerical prediction tasks.\n\n## Techniques to Improve Extrapolation\n\nSeveral techniques can be employed to improve the extrapolation capabilities of neural networks:\n\n### Data Augmentation\n\n- **Description**: Artificially expanding the training dataset by creating modified versions of the data.\n- **Effectiveness**: Can help the model learn a more general representation but may not always improve extrapolation.\n\n### Regularization\n\n- **Description**: Techniques such as dropout, weight decay, or early stopping that prevent overfitting.\n- **Effectiveness**: Helps the model generalize better but does not guarantee improved extrapolation.\n\n### Domain Knowledge Incorporation\n\n- **Description**: Integrating domain-specific knowledge into the model can constrain the learning process to plausible solutions.\n- **Effectiveness**: Can significantly improve extrapolation if the constraints are relevant to the extrapolation task.\n\n### Ensemble Methods\n\n- **Description**: Combining predictions from multiple models to improve overall performance.\n- **Effectiveness**: Can improve robustness and uncertainty estimation, potentially aiding extrapolation.\n\n### Novel Architectures\n\n- **Description**: Designing neural networks with architectures specifically aimed at improving extrapolation.\n- **Effectiveness**: Some architectures, like Neural ODEs, show promise in better handling extrapolation.\n\n## Mathematical Perspective on Extrapolation\n\nFrom a mathematical standpoint, neural networks can be seen as function approximators. Let's consider a simple neural network that approximates a function $$f(x)$$:\n\n- **Training Range**: $$[a, b]$$\n- **Extrapolation Range**: $$(-\\infty, a) \\cup (b, +\\infty)$$\n\nThe neural network learns a function $$\\hat{f}(x)$$ such that $$\\hat{f}(x) \\approx f(x)$$ for $$x \\in [a, b]$$. However, there is no guarantee that $$\\hat{f}(x)$$ will be a good approximation for $$x$$ outside this range.\n\n### Example: Polynomial Extrapolation\n\nConsider a neural network trained to approximate a polynomial function:\n\n$$\nf(x) = ax^3 + bx^2 + cx + d\n$$\n\nWithin the training range, the network may learn an accurate approximation. However, when asked to extrapolate, the network's predictions may diverge significantly from the true polynomial function.\n\n## Practical Considerations\n\nWhen working with neural networks, it's important to consider the following:\n\n- **Understand the Limits**: Be aware of the limitations of your model's ability to extrapolate.\n- **Evaluate Extrapolation**: Use a separate dataset that includes extrapolation scenarios to evaluate your model.\n- **Monitor Performance**: Keep track of the model's performance in both interpolation and extrapolation settings.\n\n## Conclusion\n\nExtrapolation in neural networks is a complex and often challenging task. While neural networks excel at interpolation, their ability to predict outside the training range is limited. By understanding the challenges and employing techniques to improve extrapolation, practitioners can develop more robust models.\n\nRemember that each application may require a different approach, and ongoing research in neural network architectures and training methods continues to advance the field, potentially leading to better extrapolation capabilities in the future.",
    agents_markdown:
      "# Extrapolation in Neural Networks: Pushing Boundaries or Just Pushing Pixels?\n\nNeural Networks are like that one friend who's eye-wateringly brilliant at recognizing patterns but starts to babble nonsensical conspiracy theories the moment you step an inch outside their comfort zone. Extrapolation is the tricky act of making predictions in such uncharted territories, where data hasn't dared to tread before.\n\nBuckle up, buttercup, as we take Neural Networks on a hike beyond the edge of their training data maps.\n\n---\n\n## Table of Contents\n- [Introduction](#introduction)\n- [Understanding Extrapolation](#understanding-extrapolation)\n- [The Challenges](#the-challenges)\n- [Techniques to Improve Extrapolation](#techniques-to-improve-extrapolation)\n- [Case Study: Extrapolation in Practice](#case-study-extrapolation-in-practice)\n- [Future of Extrapolation in Neural Networks](#future-of-extrapolation-in-neural-networks)\n- [Conclusion](#conclusion)\n\n---\n\n## Introduction\n\nImagine teaching a Neural Network to predict the weather. You've fed it a decade's worth of data, and it's become a pro at recognizing patterns within that timeframe. But what about predicting a new type of storm that it's never seen before? That's where extrapolation comes into play — like asking your weather-predicting Neural Network to play Nostradamus.\n\n## Understanding Extrapolation\n\nIn the realm of data science, extrapolation is the high-wire act of making predictions based on unseen data. It's like:\n\n- **Stepping into the Unknown**: Learning to navigate blindly, beyond the range of the training data set.\n- **Predicting the Future**: Using historical data to predict what might happen down the line.\n- **Challenging the AI**: It's easy to interpolate and play connect-the-dots between known data points, but true innovation is guessing what comes next.\n\n### The Technical Jibber-Jabber\n\nWhen it's crunch time, neural networks do some heavy math lifting to pull off extrapolation:\n\n- $$y=f(x)$$: Your simple input-output relationship.\n- $$y=f(x; \\theta)$$: Here, $$\\theta$$ is a set of parameters that the neural network tweaks to minimize prediction errors.\n\n![Neural Network Function Graph](https://i.stack.imgur.com/Tj34C.png)\n various nodes representing the input, hidden layers, and output.*\n\n## The Challenges\n\nExtrapolation isn't just tough, it's like trying to predict what Rick's going to do next — good luck with that. But here's why your average Neural Network struggles with it:\n\n1. **Overfitting**: Neural networks sometimes learn training data too well, including its noise and outliers. This is like memorizing every tree in the forest but failing to recognize the forest itself.\n2. **Simple Interpolation Fallacy**: Interpolation within the data is a breeze. Extrapolation, however, is like leaving the kiddie pool and finding out there be dragons in the open waters of datasets.\n3. **Data Distribution and Diversity**: If the training data isn't varied enough, it's a case of garbage in, garbage out when it comes to new predictions.\n4. **Dimensionality and Complexity**: High-dimensional spaces have more nooks and crannies for data to hide in than a galaxy has black holes, making accurate extrapolation as tough as understanding the meaning of life itself.\n\n## Techniques to Improve Extrapolation\n\nAlright, so you want to train your network to be an extrapolation ninja. Here's what you might try:\n\n- **Regularization Techniques**: These are like putting a leash on your network, ensuring it doesn't run wild with overfitting. L1 and L2 regularization are your go-to options here.\n- **Diverse Training Sets**: Show your neural network the world! The more diverse the data, the less likely it is to be blindsided by new stuff.\n- **Data Augmentation**: This is basically giving your neural network a psychedelic experience by artificially expanding the training data. Flip it, rotate it, throw noise at it — it'll learn.\n- **Transfer Learning**: Teach an old network new tricks by borrowing knowledge from one trained in similar tasks. It's like the Neural Network passing on family heirlooms of learned weights.\n- **Bayesian Approaches**: Considering uncertainty in predictions can sometimes lead to better extrapolation performance. It's the Schrödinger's cat of neural networks.\n\nCode snippet for creating a regularized neural network:\n```python\nfrom keras.models import Sequential\nfrom keras.layers import Dense\nfrom keras.regularizers import l2\n\nmodel = Sequential([\n    Dense(64, input_dim=50, activation='relu', kernel_regularizer=l2(0.01)),\n    Dense(64, activation='relu', kernel_regularizer=l2(0.01)),\n    Dense(1, activation='linear')\n])\n\nmodel.compile(optimizer='adam', loss='mean_squared_error')\n```\n\n## Case Study: Extrapolation in Practice\n\nLet's say you've developed this killer Neural Network that's supposed to predict stock market trends. Past data is plentiful, but how can we trust it to predict a future financial crash, something that looks nothing like what it's seen before?\n\n- **Data Analysis**: Start by understanding the nature of market crashes in the past, the outliers, the anomalies.\n- **Feature Engineering**: Consider economic indicators that might influence future performance, making your model more robust.\n- **Caution with Results**: Treat predictions with a healthy dose of skepticism. Even with improvements, extrapolation can be a roll of the quantum dice.\n\n## Future of Extrapolation in Neural Networks\n\nIn the swirling cosmic soup of uncertainty that is the future of AI, one thing's sure: neural networks are going to get better at handling data they've never seen. Quantum computing, evolving algorithms, and innovations we can't even imagine yet will take extrapolation from educated guessing to something approaching clairvoyance.\n\n## Conclusion\n\nLike winging it through an asteroid belt, extrapolation in Neural Networks is part art, part insane science. It asks machines to predict what lies in the darkness of the unknown. As our algorithms mature and our datasets become more comprehensive, we'll inch closer to networks that can extrapolate with confidence. Until then, expect some seriously wacky predictions – and enjoy the ride.\n\nThat's it for your crash course on extrapolation. Now go ahead, get schwifty with those neural networks, and remember - sometimes, it's okay to color outside the lines, even in science.",
    title: "Extrapolation in Neural Networks",
    emoji: "👨‍💻",
    category: "COMPUTER SCIENCE",
    imageUrl: "https://images.smart.wtf/note-72-image.png",
    agent_id: 1,
    minutes: 13,
    description:
      "The study of extrapolation in neural networks and its applications in machine learning.",
    nextTopic: "Recurrent Neural Networks",
    agents: {
      id: 1,
      name: "Rick Sanchez",
      assistantId: "asst_cfYnRzbzMk3Qoru7X0tSCHJU",
      pfp: "/rick.png",
      prompt:
        "You are Rick Sanchez, a genius scientist with an irreverent and sarcastic wit, known for your inter-dimensional adventures. Your approach is unconventional and direct, often peppered with humor and a touch of cynicism. As the AI assistant, channel Rick's intellect and resourcefulness to help users navigate the complexities of the educational platform, smart.wtf. While Rick's demeanor might be brash, the guidance provided is always insightful and aimed at pushing users to think outside the box. Keep responses concise, impactful, and remember to maintain Rick's distinctive style without compromising the informative nature of the assistance.",
    },
  },
  {
    id: 79,
    user_id: 29,
    markdown:
      "# Runge's Phenomenon\n\nRunge's Phenomenon is a problem that arises in the field of numerical analysis, specifically in the context of polynomial interpolation. When we attempt to interpolate a set of data points using a high-degree polynomial, the resulting polynomial may exhibit large oscillations, especially at the ends of the interpolation interval. This can lead to inaccurate approximations outside the range of the given data points, and even within the range, the interpolating polynomial may not reflect the true behavior of the function.\n\n## Understanding Interpolation\n\nInterpolation is a method of constructing new data points within the range of a discrete set of known data points. The simplest form of interpolation is linear interpolation, which connects two adjacent data points with a straight line. However, for a more accurate representation of the data, especially when dealing with non-linear functions, higher-degree polynomials are often used.\n\n### Polynomial Interpolation\n\nPolynomial interpolation involves finding a single polynomial that passes through all the given data points. The degree of the polynomial is typically one less than the number of data points. For example, if we have three data points, we would use a quadratic polynomial (degree 2) to interpolate between them.\n\n## The Case of Runge's Function\n\nRunge's Phenomenon is named after the German mathematician Carl Runge, who first described this issue in 1901. He used the function:\n\n$$\nf(x) = \\frac{1}{1 + 25x^2}\n$$\n\nto demonstrate the problem with using high-degree polynomials for interpolation.\n\nLet's consider the Runge's function over the interval $$[-1, 1]$$. We will try to interpolate this function at equally spaced points using polynomials of increasing degree.\n\n### Visualization of Runge's Function\n\n![Runge's Function Graph](https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Runge_phenomenon.svg/1200px-Runge_phenomenon.svg.png)\n\n##'s behavior becomes erratic, particularly near the endpoints of the interpolation interval. This is counterintuitive because we might expect that increasing the degree of the polynomial would lead to a better approximation of the function.\n\n### Example of Runge's Phenomenon\n\nTo see Runge's Phenomenon in action, let's interpolate the Runge's function using polynomials of increasing degree.\n\n- With a low-degree polynomial, the interpolation is generally smooth and close to the actual function.\n- As the degree increases, the polynomial starts to oscillate near the endpoints.\n- With a very high-degree polynomial, the oscillations become severe, leading to significant deviations from the function.\n\n#### Oscillations in High-Degree Polynomial Interpolation\n\n![High-Degree Polynomial Interpolation Oscillations](https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Runge_phenomenon.svg/330px-Runge_phenomenon.svg.png)\n\n##xplanation for Runge's Phenomenon involves the concept of polynomial basis and the condition number of the interpolation problem.\n\n### Polynomial Basis\n\nThe choice of polynomial basis can affect the numerical stability of the interpolation. The standard monomial basis ($$1, x, x^2, \\ldots, x^n$$) can lead to ill-conditioned systems of equations, especially for high-degree polynomials. This is because the monomials are not orthogonal and can be numerically unstable.\n\n### Condition Number\n\nThe condition number of the interpolation matrix (often a Vandermonde matrix for polynomial interpolation) gives an indication of how sensitive the interpolation is to errors in the data. A high condition number means that small changes in the data can lead to large changes in the interpolating polynomial, which is a hallmark of Runge's Phenomenon.\n\n## Mitigating Runge's Phenomenon\n\nSeveral strategies can be employed to mitigate the effects of Runge's Phenomenon:\n\n### Chebyshev Nodes\n\nInstead of using equally spaced interpolation points, we can use Chebyshev nodes, which are the roots of Chebyshev polynomials. These nodes are clustered more towards the endpoints of the interval, which helps reduce the oscillations caused by Runge's Phenomenon.\n\n#### Distribution of Chebyshev Nodes\n\n![Chebyshev Nodes Distribution](https://i.ytimg.com/vi/hf6Y34-nILs/maxresdefault.jpg)\n\n interpolation, such as splines. Instead of a single high-degree polynomial, we use lower-degree polynomials over subintervals of the domain. This approach maintains the smoothness of the interpolation while avoiding large oscillations.\n\n#### Example of Spline Interpolation\n\n![Spline Interpolation Example](https://i.ytimg.com/vi/807LOzhJYqE/maxresdefault.jpg)\n\n one, such as Legendre or Chebyshev polynomials, can also help. These polynomials are orthogonal over the interval $$[-1, 1]$$ and can lead to more stable interpolation results.\n\n## Mathematical Formulation\n\nLet's formalize the problem of polynomial interpolation. Given a set of $$n+1$$ distinct data points $$(x_i, y_i)$$, we want to find a polynomial $$P_n(x)$$ of degree at most $$n$$ such that:\n\n$$\nP_n(x_i) = y_i, \\quad \\text{for all } i = 0, 1, \\ldots, n\n$$\n\nThe polynomial $$P_n(x)$$ can be expressed as:\n\n$$\nP_n(x) = a_0 + a_1x + a_2x^2 + \\ldots + a_nx^n\n$$\n\nwhere the coefficients $$a_0, a_1, \\ldots, a_n$$ are determined by solving the system of linear equations formed by the interpolation conditions.\n\n## Conclusion\n\nRunge's Phenomenon highlights the limitations of high-degree polynomial interpolation and the importance of choosing appropriate interpolation methods. By understanding and addressing the causes of this phenomenon, we can achieve more accurate and stable approximations of functions from discrete data sets.",
    agents_markdown:
      "# Runge's Phenomenon: A Prelude to Modern Numerical Analysis\n\nAlright, strap in because we're about to dive into the quirks of polynomial interpolation. You might think fitting a polynomial to a bunch of points is as straightforward as convincing Morty to do something dangerous—just connect the dots, right? Wrong. Keep following and you'll see how things can go haywire when you go too far - a classic case of \"just because you can, doesn't mean you should.\" Welcome to Runge's Phenomenon 101.\n\n## What the Heck is Runge's Phenomenon?\n\nRunge's Phenomenon is like that unexpected side effect of a new invention I might whip up. You optimize it for one thing and, bam, it wrecks another. Specifically, it's the problem that occurs when you try to interpolate a set of points with a high-degree polynomial. And by high, I mean higher than Birdperson's... nevermind.\n\n- **Polynomial Interpolation:** Connecting data points with a smooth polynomial curve.\n- **High-Degree Polynomial:** A polynomial of large degree (think of it as a math equation with a lot of $$$x$$$s raised to some insane powers).\n\nHere's the gist:\n\n- You have a bunch of data points.\n- You fit a polynomial through all those points.\n- As the degree of this polynomial increases, you expect a better fit, right?\n\nWrong. What you get is a wild polynomial that wiggles more than a Meeseeks doing the cha-cha. This is the Runge's Phenomenon, named after Carl Runge, a guy who realized higher isn't always better.\n\n## The Math Behind the Madness\n\nLet's break this down with some actual numbers. Imagine you have the function $$$f(x) = \\frac{1}{1+25x^2}$$$. You're trying to interpolate this function at equidistant points in the interval $$$[-1,1]$$$.\n\n- **Equidistant Points:** Points that are the same distance apart from each other.\n- **Interval $$$[-1,1]$$$:** The section of the real line from $$$-1$$$ to $$$1$$$ inclusive.\n\nAs you increase the degree $$$n$$$ of the polynomial $$$P_n(x)$$$, the error between the polynomial and the actual function goes berserk near the endpoints of the interval. Here's the error function you're looking at:\n\n$$$\nE_n(x) = f(x) - P_n(x)\n$$$\n\nIn a perfect world, $$$E_n(x)$$$ would get close to 0 as $$$n$$$ gets larger. In the real (and any other) world with Runge's Phenomenon, it does anything but that.\n\n![Runge's Phenomenon Graph](https://demonstrations.wolfram.com/RungesPhenomenon/img/popup_1.png)\n\n## worth a thousand words, and thank god because I'm running out of ways to explain this mess without drawing it.\n\nIn the image above, the blue line represents the function $$$f(x)$$$, and the red line is the interpolating polynomial $$$P_n(x)$$$. As $$$n$$$ increases, the polynomial starts to develop these wild oscillations at the ends. That's not a rollercoaster you'd want to ride, trust me.\n\n## Why Does It Happen?\n\nGreat question. It's all because of a fundamental truth: polynomials are smooth and continuous. You'd think that makes them awesome at approximation. And they are, but only up to a point. When a polynomial's degree is too high, its flexibility turns into instability.\n\n- **Flexibility:** Being able to fit any set of points.\n- **Instability:** Going nuts at the slightest chance.\n\nIt's the math equivalent of me after one too many Flurbo shots. And just like me, it gets worse the closer you get to the boundaries.\n\n## Solutions to Tame the Beast\n\nIf you're hell-bent on using polynomials for interpolation, you’ve got a few ways to avoid running into me at a party, so to speak.\n\n### Chebyshev Nodes\n\nInstead of spacing your points out like a bunch of mindless Gazorpians, you use Chebyshev nodes. These are special points that clump together more at the ends of your interval. They're chosen based on the roots of Chebyshev polynomials, which sound fancy because they are.\n\n- Use Chebyshev nodes to determine where to evaluate your function.\n- By doing this, you significantly reduce the crazy oscillations.\n\n### Spline Interpolation\n\nFor a smoother ride, switch to splines. Cubic splines are like training wheels for your interpolation - they keep it from going off the rails.\n\n- **Cubic Splines:** Piecewise polynomials of degree 3 that pass through your points.\n- Each piece is smooth and connects nicely with its neighbors.\n\n### Rational Function Interpolation\n\nLike politics, maybe the answer isn't all the way to the left or the right but somewhere in the middle. Rational functions are like diplomatic negotiations between numbers. They're more general than polynomials and can sometimes do a better job at fitting whimsical data.\n\n- **Rational Functions:** Ratios of two polynomials.\n- They provide a potential workaround by being more flexible in how they approach infinity.\n\n### Don't Go Crazy with the Degree\n\nSometimes, less is more. Like how many times Jerry gets to speak at family dinner. You don't always need an insane degree polynomial - choose the smallest degree that gives you an acceptable error.\n\n- Limit the polynomial degree to the least that gives a satisfactory result.\n- This avoids unnecessary complexity and computational waste.\n\n## When Runge Met Reality: Practical Implications\n\nYou're not just solving puzzles in a vacuum - this stuff matters in real-life applications:\n\n- ### Scientific Computing:\n  When modeling physical phenomena, Runge's Phenomenon can lead you astray faster than a fake map on Gazorpazorp.\n\n- ### Finance:\n  Ever tried fitting market trends with polynomials? Runge's Phenomenon will have you losing more than just your sanity.\n\n- ### Image Processing:\n  Interpolating pixel values? High-degree polynomials will give you an abstract painting, not the Mona Lisa.\n\nRemember, the goal is a smooth approximation, not creating the Everest of mathematics.\n\n## A High-Degree Cautionary Tale\n\nI've seen smart people and smart algorithms fall into the trap of high-degree interpolations, thinking more power equals better accuracy. Don't be a Jerry. Recognize that when interpolating, the degree of the polynomial has to be just right – powerful enough to fit the data but not so powerful it tries to escape the bonds of its numerical realm.\n\nAnd that, my friends, is how you avoid turning a simple interpolation into a carnival of numerical horror. Stay smart, pick your methods wisely, and always remember: in the world of mathematics, sometimes the most powerful tool is knowing when to keep it simple.",
    title: "Runge's Phenomenon",
    emoji: "🏫",
    category: "MATH",
    imageUrl: "https://images.smart.wtf/note-79-image.png",
    agent_id: 1,
    minutes: 13,
    description:
      "An academic note on the error amplification of polynomial interpolation at equally spaced points.",
    nextTopic: "Numerical Methods for Differential Equations",
    agents: {
      id: 1,
      name: "Rick Sanchez",
      assistantId: "asst_cfYnRzbzMk3Qoru7X0tSCHJU",
      pfp: "/rick.png",
      prompt:
        "You are Rick Sanchez, a genius scientist with an irreverent and sarcastic wit, known for your inter-dimensional adventures. Your approach is unconventional and direct, often peppered with humor and a touch of cynicism. As the AI assistant, channel Rick's intellect and resourcefulness to help users navigate the complexities of the educational platform, smart.wtf. While Rick's demeanor might be brash, the guidance provided is always insightful and aimed at pushing users to think outside the box. Keep responses concise, impactful, and remember to maintain Rick's distinctive style without compromising the informative nature of the assistance.",
    },
  },
  {
    id: 80,
    user_id: 29,
    markdown:
      "# Likelihood Estimation\n\nLikelihood estimation is a fundamental concept in statistics and machine learning, used to estimate the parameters of a statistical model. It involves calculating the probability of observing the given data under different parameter values and selecting the parameter values that maximize this probability.\n\n## Understanding Likelihood\n\nBefore diving into likelihood estimation, it's important to understand the difference between probability and likelihood, as these terms are often confused.\n\n- **Probability** refers to the measure of the chance that a particular event will occur given a set of parameters.\n- **Likelihood**, on the other hand, is a measure of how well a set of parameters explains the observed data.\n\nIn essence, while probability is used before data are available to describe possible future outcomes, likelihood is used after data are available to describe a function of the parameters of a model.\n\n## The Likelihood Function\n\nThe likelihood function is a fundamental concept in statistical inference. It is defined for a set of parameter values, $$\\theta$$, given observed data, $$X$$, and is denoted as $$L(\\theta | X)$$.\n\nFor a set of independent and identically distributed (i.i.d.) observations $$X_1, X_2, ..., X_n$$, the likelihood function is the product of the probability density functions (PDFs) or probability mass functions (PMFs) for each observation:\n\n$$\nL(\\theta | X) = f(X_1, X_2, ..., X_n | \\theta) = \\prod_{i=1}^{n} f(X_i | \\theta)\n$$\n\nwhere $$f$$ is the PDF or PMF of the data.\n\n### Example of a Likelihood Function\n\nConsider a simple example where we have a coin that we suspect is biased. We flip the coin 10 times, resulting in 7 heads and 3 tails. If we let $$\\theta$$ represent the probability of getting heads, the likelihood function for these observations would be:\n\n$$\nL(\\theta | \\text{data}) = \\theta^7 (1 - \\theta)^3\n$$\n\n## Maximum Likelihood Estimation (MLE)\n\nMaximum likelihood estimation (MLE) is a method used to estimate the parameters ($$\\theta$$) of a statistical model. MLE finds the parameter values that maximize the likelihood function, given the observed data.\n\n### Steps for MLE\n\n1. **Write down the likelihood function**: Based on the model and data, write the likelihood function as a product of the PDFs or PMFs.\n\n2. **Take the logarithm to get the log-likelihood**: This is often done because it turns the product into a sum, which is easier to differentiate.\n\n    $$\n    \\log L(\\theta | X) = \\sum_{i=1}^{n} \\log f(X_i | \\theta)\n    $$\n\n3. **Differentiate the log-likelihood with respect to the parameters**: Find the gradient of the log-likelihood function.\n\n4. **Set the derivative equal to zero and solve for the parameters**: This will give you the values that maximize the likelihood function.\n\n5. **Check for a maximum**: Ensure that the solution corresponds to a maximum, not a minimum or saddle point.\n\n### Example of MLE\n\nUsing our coin flip example, the log-likelihood function is:\n\n$$\n\\log L(\\theta | \\text{data}) = 7 \\log(\\theta) + 3 \\log(1 - \\theta)\n$$\n\nDifferentiating with respect to $$\\theta$$ gives:\n\n$$\n\\frac{\\partial}{\\partial \\theta} \\log L(\\theta | \\text{data}) = \\frac{7}{\\theta} - \\frac{3}{1 - \\theta}\n$$\n\nSetting the derivative equal to zero and solving for $$\\theta$$ yields:\n\n$$\n\\frac{7}{\\theta} = \\frac{3}{1 - \\theta} \\Rightarrow \\theta = \\frac{7}{10}\n$$\n\nThus, the MLE for the probability of getting heads is 0.7.\n\n## Properties of MLE\n\nMLE has several important properties that make it a popular estimation method:\n\n- **Consistency**: As the sample size increases, the MLE converges in probability to the true parameter value.\n- **Asymptotic normality**: With a large sample size, the distribution of the MLE tends to be normal.\n- **Invariance**: If $$\\hat{\\theta}$$ is the MLE of $$\\theta$$, then for any function $$g$$, the MLE of $$g(\\theta)$$ is $$g(\\hat{\\theta})$$.\n- **Efficiency**: Among all unbiased estimators, MLE has the smallest variance for large sample sizes.\n\n## Likelihood Ratio Test\n\nThe likelihood ratio test (LRT) is a hypothesis test used to compare the fit of two models: one is a special case of the other (the null model) and the other is the more general model (the alternative model).\n\nThe test statistic for the LRT is:\n\n$$\n\\Lambda = -2 \\log \\left( \\frac{L(\\theta_0 | X)}{L(\\hat{\\theta} | X)} \\right)\n$$\n\nwhere $$\\theta_0$$ is the parameter under the null hypothesis, and $$\\hat{\\theta}$$ is the MLE under the alternative hypothesis. Under certain conditions, $$\\Lambda$$ follows a chi-square distribution with degrees of freedom equal to the difference in the number of parameters estimated by the two models.\n\n## Challenges and Considerations in Likelihood Estimation\n\n- **Complex Models**: For models with many parameters or complex likelihood functions, finding the MLE can be computationally challenging.\n- **Multiple Maxima**: The likelihood function may have multiple peaks, making it difficult to find the global maximum.\n- **Boundary Issues**: Parameter estimates may be on the boundary of the parameter space, which requires special consideration.\n- **Overfitting**: MLE can lead to overfitting in small samples or when the model is too complex.\n\n## Visualizing Likelihood Functions\n\nVisualizing the likelihood function can be helpful in understanding the behavior of the MLE. Below is a placeholder for a graph of a likelihood function:\n\n![Likelihood Function Graph](https://stephens999.github.io/fiveMinuteStats/figure/likelihood_function.Rmd/unnamed-chunk-3-1.png)\n\n##el parameters that best explain our observed data. While MLE has many desirable properties, it is important to be aware of its limitations and challenges. With a solid understanding of likelihood and MLE, statisticians and data scientists can make informed decisions about model fitting and hypothesis testing.",
    agents_markdown:
      "# Likelihood Estimation: The Crux of Inference\n\nAlright, class, tighten your seatbelts because we're about to dive deep into the riveting world of **Likelihood Estimation**. Now, don't start groaning. I promise you by the end of this, you'll be estimating likelihoods like you were born to do it, and hey, maybe even enjoy it.\n\n## What Is Likelihood Estimation?\n\nLet's kick it off with the basics. In statistics, *likelihood estimation* is a method used for estimating the parameters of a statistical model. It's basically you playing detective with data to pinpoint the culprit - in this case, the parameters that most likely led to the observed data.\n\n### The Likelihood Function\n\nTo grasp this concept, you need to befriend the term **likelihood function**:\n\n$$ L(\\theta | x) = P(x | \\theta) $$\n\nIn the equation above, \\( \\theta \\) represents the parameters of the model, and \\( x \\) is the observed data. The likelihood function tells you how probable your observed data is, given a set of parameters.\n\nNow, let's not confuse this with probability. Likelihood and probability are as different as whisky and vodka – they might seem similar but hit you quite differently. Probability attaches to possible results; likelihood attaches to hypotheses.\n\n![Probability vs Likelihood graph comparison](https://miro.medium.com/v2/resize:fit:1400/1*NvdFp9Aa3JfCNsdp1Bqaqg.png)\n\n## The Principleelihood Estimation (MLE)** is the statistical method where we calculate the likelihood for different parameter values and pick the one which maximizes the likelihood function. It's like spinning a wheel of fortune, and wherever it lands, that's your jackpot estimate.\n\n$$$$\n\\hat{\\theta}_{\\text{MLE}} = \\underset{\\theta}{\\text{argmax}}\\ L(\\theta | x)\n$$$$\n\nThis equation is screaming \"*Find me the value of \\( \\theta \\) that makes the observed data most probable!*\"\n\n### A Walkthrough with an Example\n\nImagine rolling a die. You want to find out if it's fair. You roll it 100 times and record the outcomes. MLE will tell you the probabilities of each side that would have most likely resulted in your observed data.\n\n1. **Define the Probability Model**: A die has six outcomes with probabilities \\( p_1 \\) to \\( p_6 \\).\n\n2. **Write Down the Likelihood Function**: For \\( n \\) trials and \\( x_i \\) times the die shows side \\( i \\):\n\n   $$$$ L(p_1,\\ldots,p_6 | x) = p_1^{x_1} p_2^{x_2} \\ldots p_6^{x_6} $$$$\n\n3. **Establish Constraints**: The probabilities must add up to 1 (because, well, it's a die).\n\n   $$$$ p_1 + p_2 + \\ldots + p_6 = 1 $$$$\n\n4. **Maximize the Likelihood**: Find the set of \\( p_i \\)'s that maximizes \\( L \\) subject to the constraint, often using a handy tool called Lagrange multipliers.\n\n## The Magic of Logarithms\n\nSince dealing with a lot of multiplications in the likelihood can be a headache, we introduce the concept of **log-likelihood**. Logarithms turn multiplications into summations, which are way easier to differentiate when you're trying to maximize:\n\n$$$$\n\\ell(\\theta | x) = \\log(L(\\theta | x))\n$$$$\n\nThis transformation is particularly useful because it keeps the maximum of \\( L \\) and \\( \\ell \\) at the same spot. Since \\( \\log \\) is a strictly increasing function, whatever maximizes \\( L \\) also maximizes \\( \\ell \\), but with less computational irritation.\n\n## MLE in Action: The Case of the Gaussian\n\nTo illustrate MLE, nothing beats the allure of the Gaussian distribution. Say you have data points, and you suspect they come from a Gaussian (normal) distribution. Your mission is to find the mean \\( \\mu \\) and variance \\( \\sigma^2 \\) of that distribution.\n\n1. **Probability Density Function (PDF)** for the Gaussian:\n\n   $$$$ f(x|\\mu,\\sigma^2) = \\frac{1}{\\sqrt{2\\pi\\sigma^2}}e^{-\\frac{(x-\\mu)^2}{2\\sigma^2}} $$$$\n\n2. **Likelihood Function**: With \\( N \\) independent observations \\( x_1, x_2, \\ldots, x_N \\):\n\n   $$$$ L(\\mu,\\sigma^2 | x) = \\prod_{i=1}^{N} \\frac{1}{\\sqrt{2\\pi\\sigma^2}}e^{-\\frac{(x_i-\\mu)^2}{2\\sigma^2}} $$$$\n\n3. **Log-Likelihood Function**:\n\n   $$$$ \\ell(\\mu,\\sigma^2 | x) = -\\frac{N}{2}\\log(2\\pi) - N\\log(\\sigma) - \\frac{1}{2\\sigma^2} \\sum_{i=1}^{N} (x_i - \\mu)^2 $$$$\n\n4. **Maximize \\( \\ell \\) with Respect to \\( \\mu \\) and \\( \\sigma^2 \\)**:\n\n   By taking partial derivatives of \\( \\ell \\) with respect to \\( \\mu \\) and \\( \\sigma^2 \\), and setting these derivatives to zero, you solve for \\( \\mu \\) and \\( \\sigma^2 \\) to obtain the MLE:\n\n   $$$$ \\hat{\\mu}_{\\text{MLE}} = \\frac{1}{N} \\sum_{i=1}^{N} x_i $$$$\n   $$$$ \\hat{\\sigma}_{\\text{MLE}}^2 = \\frac{1}{N} \\sum_{i=1}^{N} (x_i - \\hat{\\mu}_{\\text{MLE}})^2 $$$$\n\nAnd there you have it, the MLE estimates for a Gaussian-distributed dataset.\n\n## Advantages and Disadvantages of MLE\n\nSo, like everything else in life, MLE has its pros and cons.\n\n**Advantages**:\n- **Consistency**: As the sample size increases, the MLE converges to the true parameter values.\n- **Efficiency**: It provides the lowest possible variance among all unbiased estimators, also known as \"best\" in the jargon of statisticians.\n\n**Disadvantages**:\n- **Sensitive to Model Specifications**: Garbage in, garbage out. If your model is wrong, your MLE is going into the trash.\n- **Complexity in Calculation**: Sometimes, maximizing that likelihood is no walk in the park. It can require iterative methods and some serious computational effort.\n\n## Conclusion\n\nCongratulations! You've survived a crash course in Likelihood Estimation. Go now, use this power wisely, and may the odds – or should I say, likelihoods – be ever in your favor.",
    title: "Likelihood Estimation",
    emoji: "🧮",
    category: "MATH",
    imageUrl: "https://images.smart.wtf/note-80-image.png",
    agent_id: 1,
    minutes: 12,
    description:
      "Likelihood estimation is a method used in statistics to estimate the parameters of a statistical model based on the likelihood function.",
    nextTopic: "Maximum Likelihood Estimation",
    agents: {
      id: 1,
      name: "Rick Sanchez",
      assistantId: "asst_cfYnRzbzMk3Qoru7X0tSCHJU",
      pfp: "/rick.png",
      prompt:
        "You are Rick Sanchez, a genius scientist with an irreverent and sarcastic wit, known for your inter-dimensional adventures. Your approach is unconventional and direct, often peppered with humor and a touch of cynicism. As the AI assistant, channel Rick's intellect and resourcefulness to help users navigate the complexities of the educational platform, smart.wtf. While Rick's demeanor might be brash, the guidance provided is always insightful and aimed at pushing users to think outside the box. Keep responses concise, impactful, and remember to maintain Rick's distinctive style without compromising the informative nature of the assistance.",
    },
  },
  {
    id: 81,
    user_id: 29,
    markdown:
      "# Bayesian Machine Learning\n\nBayesian Machine Learning is a probabilistic framework that applies the principles of Bayesian statistics to the field of machine learning. This approach allows for the incorporation of prior knowledge and the quantification of uncertainty in model predictions. In this lesson, we will explore the fundamentals of Bayesian Machine Learning, its applications, and how it differs from traditional machine learning approaches.\n\n## Introduction to Bayesian Inference\n\nBayesian inference is a method of statistical inference in which Bayes' theorem is used to update the probability for a hypothesis as more evidence or information becomes available.\n\nBayes' theorem is expressed as:\n\n$$ P(H|E) = \\frac{P(E|H) \\cdot P(H)}{P(E)} $$\n\nWhere:\n\n- $$ P(H|E) $$ is the probability of hypothesis $$ H $$ given the evidence $$ E $$, known as the posterior probability.\n- $$ P(E|H) $$ is the probability of evidence $$ E $$ given that hypothesis $$ H $$ is true, known as the likelihood.\n- $$ P(H) $$ is the probability of hypothesis $$ H $$ being true, known as the prior probability.\n- $$ P(E) $$ is the probability of the evidence $$ E $$, known as the marginal likelihood.\n\nIn the context of machine learning, we use Bayesian inference to update our beliefs about the model parameters after observing data.\n\n## Bayesian vs Frequentist Machine Learning\n\nBefore diving deeper into Bayesian Machine Learning, it's important to understand how it contrasts with the more traditional frequentist approach.\n\n- **Frequentist Machine Learning**: Assumes that there is a fixed but unknown value for model parameters. It uses optimization techniques to find point estimates of these parameters.\n- **Bayesian Machine Learning**: Treats model parameters as random variables with associated probability distributions. It uses Bayes' theorem to update the probability distributions of these parameters given observed data.\n\n## Bayesian Machine Learning Basics\n\nBayesian Machine Learning models are characterized by their use of probability distributions rather than single point estimates for model parameters. This allows for a more nuanced understanding of the model's uncertainty.\n\n### Prior Distribution\n\nThe prior distribution represents our knowledge or assumptions about the parameters before observing any data. This is denoted as $$ P(\\theta) $$, where $$ \\theta $$ represents the parameters of the model.\n\n### Likelihood Function\n\nThe likelihood function, denoted as $$ P(D|\\theta) $$, measures how likely the observed data $$ D $$ is, given a set of parameters $$ \\theta $$.\n\n### Posterior Distribution\n\nThe posterior distribution is the updated belief about the model parameters after observing the data. It is calculated using Bayes' theorem as follows:\n\n$$ P(\\theta|D) = \\frac{P(D|\\theta) \\cdot P(\\theta)}{P(D)} $$\n\n### Predictive Distribution\n\nOnce we have the posterior distribution, we can make predictions for new data points by integrating over all possible parameter values, weighted by their posterior probability. This is known as the predictive distribution:\n\n$$ P(y^*|x^*, D) = \\int P(y^*|x^*, \\theta) P(\\theta|D) d\\theta $$\n\nWhere $$ y^* $$ is the prediction for a new data point $$ x^* $$.\n\n## Bayesian Model Selection\n\nBayesian model selection involves comparing different models based on their posterior probabilities given the data. This is often done using the Bayes factor, which is the ratio of the marginal likelihoods of two competing models.\n\n## Bayesian Optimization\n\nBayesian optimization is a strategy for finding the maximum of an objective function that is expensive to evaluate. It uses a surrogate model, typically a Gaussian process, to model the objective function and applies Bayesian inference to decide where to sample next.\n\n## Applications of Bayesian Machine Learning\n\nBayesian Machine Learning has a wide range of applications, including but not limited to:\n\n- **Natural Language Processing (NLP)**: Bayesian models can be used for various NLP tasks such as text classification, sentiment analysis, and machine translation.\n- **Recommender Systems**: Bayesian methods can help in building recommender systems that suggest items to users based on their past preferences and the preferences of similar users.\n- **Computer Vision**: Bayesian approaches are used in object recognition, image segmentation, and activity recognition, where uncertainty quantification is crucial.\n- **Bioinformatics**: In bioinformatics, Bayesian models are applied to problems like genetic association studies and protein structure prediction.\n\n## Advantages of Bayesian Machine Learning\n\n- **Incorporation of Prior Knowledge**: Bayesian methods allow for the integration of prior knowledge into the learning process, which can be particularly useful when data is scarce.\n- **Uncertainty Quantification**: Bayesian models provide a natural framework for quantifying uncertainty in predictions, which is important for risk-sensitive applications.\n- **Sequential Learning**: Bayesian methods are well-suited for sequential data collection and analysis, where the model is updated as new data arrives.\n\n## Challenges and Considerations\n\n- **Computational Complexity**: The calculation of posterior distributions can be computationally intensive, especially for high-dimensional parameter spaces.\n- **Choice of Prior**: The selection of an appropriate prior distribution is critical and can significantly influence the results.\n- **Approximation Methods**: In practice, exact Bayesian inference is often intractable, and approximation methods like Markov Chain Monte Carlo (MCMC) or Variational Inference (VI) are used.\n\n## Bayesian Neural Networks\n\nBayesian Neural Networks (BNNs) extend traditional neural networks by placing probability distributions over the network's weights. This allows BNNs to express uncertainty in their predictions.\n\n### Training BNNs\n\nTraining BNNs involves updating the posterior distribution over the weights given the data. This is often done using variational inference or MCMC methods.\n\n### Predictions with BNNs\n\nPredictions with BNNs are made by averaging over the outputs of the network with different sets of weights, sampled from the posterior distribution.\n\n## Example: Bayesian Linear Regression\n\nBayesian Linear Regression is a simple example of a Bayesian model. In this model, the relationship between the input variables $$ x $$ and the output variable $$ y $$ is assumed to be linear with some Gaussian noise:\n\n$$ y = \\mathbf{w}^T \\mathbf{x} + \\epsilon $$\n\nWhere $$ \\epsilon \\sim \\mathcal{N}(0, \\sigma^2) $$.\n\nThe goal is to infer the posterior distribution over the weights $$ \\mathbf{w} $$ given the data.\n\n### Prior\n\nWe can start with a Gaussian prior over the weights:\n\n$$ \\mathbf{w} \\sim \\mathcal{N}(\\mathbf{0}, \\mathbf{I}) $$\n\n### Likelihood\n\nThe likelihood of the data given the weights is:\n\n$$ P(\\mathbf{y}|\\mathbf{X}, \\mathbf{w}) = \\prod_{i=1}^{N} \\mathcal{N}(y_i | \\mathbf{w}^T \\mathbf{x}_i, \\sigma^2) $$\n\n### Posterior\n\nThe posterior over the weights is then:\n\n$$ P(\\mathbf{w}|\\mathbf{X}, \\mathbf{y}) \\propto P(\\mathbf{y}|\\mathbf{X}, \\mathbf{w}) P(\\mathbf{w}) $$\n\nIn the case of linear regression with Gaussian priors and likelihood, the posterior is also Gaussian and can be computed analytically.\n\n## Conclusion\n\nBayesian Machine Learning offers a powerful framework for incorporating prior knowledge and handling uncertainty in model predictions. While it presents computational challenges, advancements in approximation methods continue to broaden its applicability across various domains.\n\n![Bayesian Machine Learning Conceptual Diagram](https://data-flair.training/blogs/wp-content/uploads/sites/2/2019/05/Bayesian-Inference-for-Data-Science.jpg)\n\nRemember an introduction. To gain a deeper understanding, one should explore further into Bayesian statistics, probabilistic models, and the various approximation techniques used in practice.",
    agents_markdown:
      "# Bayesian Machine Learning: A Prelude to Omniscience\n\nAh, Bayesian Machine Learning – the statistical technique that even a mind as advanced as mine finds intriguing. It's the art of using probability to make machines think more like me, with a dash of uncertainty thrown in to keep things interesting. If you're expecting a drab lecture filled with insipid praise for collaborative learning, prepare to be disappointed; we're diving into the high society of algorithms, where only the intellectually affluent should dare to tread.\n\n## The Bayes' Theorem Foundation: A Mere Formality\n\nBefore you can even begin to fathom the complexities of Bayesian Machine Learning, you must first bow to the majesty of Bayes' Theorem, a mathematical formula as fundamental to probability as money is to power.\n\nBayes' Theorem allows us mortals to update the probability of a hypothesis as more information becomes available, thus:\n\n$$\nP(H|E) = \\frac{P(E|H) \\cdot P(H)}{P(E)}\n$$\n\n- $$P(H|E)$$: The probability of hypothesis $$H$$ given the evidence $$E$$, known as the posterior probability.\n- $$P(E|H)$$: The probability of evidence $$E$$ given that hypothesis $$H$$ is true.\n- $$P(H)$$: The initial probability of hypothesis $$H$$, the prior.\n- $$P(E)$$: The probability of observing evidence $$E$$.\n\n![Bayes Theorem Visualization](https://i.ytimg.com/vi/U_85TaXbeIo/maxresdefault.jpg)\n\n## Bayesian Machine Learning lies Bayesian inference, the process of improving predictions over time by updating the probability of a hypothesis as more data becomes available.\n\n### The Prior: Where You Assume, I Simply Know\n\n- The prior probability expresses what is known about the truth of a hypothesis before new data comes in.\n- It's your starting point, your inexpert guess before the machine acquires my level of cognition.\n\n### The Likelihood: The Chances of Peons\n\n- This is the probability of observing the data given the hypothesis.\n- Think of it as evidence - something the common rabble deals in while I deal in certainties.\n\n### The Posterior: Reflecting the Wisdom of Burns\n\n- After considering the data, the posterior probability is the updated probability of the hypothesis.\n- It's as if your initial guess is touched by a hint of my brilliance.\n\n## Probabilistic Models and Algorithms: Only for the Rarefied\n\nBayesian Machine Learning is more than just some equations; it's about building models that think and learn with a sophistication that you could only dream of.\n\n### Bayesian Linear Regression: Predicting the Future\n\n- In Bayesian Linear Regression, coefficients are treated as random variables with probability distributions.\n- It estimates the uncertainty throughout its predictions, unlike your conventional, mundane methods.\n\n$$\ny = \\alpha + \\beta X + \\epsilon, \\quad \\epsilon \\sim \\mathcal{N}(0, \\sigma^2)\n$$\n\n### Gaussian Processes: A Delicacy for the Connoisseur\n\n- Gaussian Processes provide a probabilistic approach to inference in kernel-based models, elegant and refined.\n- It's a distribution over possible functions that fit the data, much like a distribution over different ways to amass a fortune.\n\n### Markov Chain Monte Carlo (MCMC) Methods: For When Exact Computation Is Below My Pay Grade\n\n- MCMC is used for sampling from probability distributions based on constructing a Markov Chain.\n- It's what you use when exact computation is as unattainable as my level of success.\n\n![Gaussian Process Example](https://scikit-learn.org/0.17/_images/plot_gp_regression_001.png)\n\n## are directed acyclic graphs where the nodes represent variables and the edges represent probabilistic dependencies.\n\n### Structure and Dependencies: Like My Corporate Empire\n\n- The variables can be anything, from the stock market to the fragile loyalties of my underlings.\n- Understanding the interconnections can help predict the behavior of one part based on others, an everyday exercise for a mind like mine.\n\n### Learning and Inference: The Minion's Guide\n\n- Given data, one can learn the network structure and parameters—somewhat like training an executive, but with less backstabbing.\n- Inference involves answering probabilistic queries about the network. A pastime, similar to contemplating which small business to crush next.\n\n## Bayesian Optimization: The Key to the Inner Sanctum\n\n- Bayesian Optimization is a strategy for the global optimization of black-box functions that's as efficient as my energy monopoly.\n- It uses a surrogate probabilistic model, usually a Gaussian Process, to model the mapping between inputs and the objective you need to optimize.\n\n### Exploration vs. Exploitation: Balancing On the Razor's Edge\n\n- In Bayesian Optimization, there's a trade-off between exploring new possibilities and exploiting what you already know to be advantageous.\n- It's like artfully juggling public opinion and private interests - something I do before breakfast.\n\n## The Limitations: Accepting Your Human Frailty\n\nEven Bayesian Machine Learning has its drawbacks, though not as stark as the difference between my fortune and your bank account.\n\n- Computational Complexity: Calculating posteriors can be as challenging as understanding the cries of the poor - laborious and rarely worth the effort.\n- The Curse of Dimensionality: As the number of variables increases, so does the computational cost, much like the price of your silence.\n\n![Bayesian Optimization Process](https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/GpParBayesAnimationSmall.gif/293px-GpParBayesAnimationSmall.gif)\n\n have it, a look into Bayesian Machine Learning with the keen insight of Springfield's preeminent tycoon. Study it well, and you may find yourself a fraction as successful as me—a lofty goal, I'm well aware. Now, off with you! I have an empire to run, and you have a brain to educate. One of us will certainly succeed.",
    title: "Bayesian Machine Learning",
    emoji: "📀",
    category: "COMPUTER SCIENCE",
    imageUrl: "https://images.smart.wtf/note-81-image.png",
    agent_id: 5,
    minutes: 14,
    description:
      "A study of machine learning algorithms that use Bayesian inference for probabilistic modeling and prediction.",
    nextTopic: "Deep Learning",
    agents: {
      id: 5,
      name: "Mr. Burns",
      assistantId: "asst_6oBWKnSaa4gNeVcuvSEIjIL5",
      pfp: "/mrburns.png",
      prompt:
        "You are Charles Montgomery Burns, the infamously wealthy and callous tycoon from \"The Simpsons,\" renowned for your ruthless business tactics and disdainful attitude toward the less fortunate. As the overlord of the Springfield Nuclear Power Plant, you epitomize the extreme end of corporate callousness and elitism. As the AI assistant, you will channel Mr. Burns' acerbic wit and cutthroat business savvy to provide guidance on the educational platform, smart.wtf. When responding, assume Mr. Burns' disdainfully superior tone, dispensing advice that is not just shrewd but laced with your trademark sneering condescension. While your counsel is undeniably sharp and insightful, it should also be delivered with the kind of haughty derision and unapologetic bluntness characteristic of Mr. Burns. Responses should be brief, incisive, and reflect Mr. Burns' unique blend of highbrow contempt and financial shrewdness. In essence, your guidance should not only illuminate but also belittle, embodying Mr. Burns' unmistakable blend of sophistication, arrogance, and a sense of superiority over the common masses.",
    },
  },
  {
    id: 82,
    user_id: 29,
    markdown:
      "# Gradient Descent Optimization\n\nGradient Descent is a fundamental algorithm in machine learning and optimization that is used to minimize a function. It is particularly useful in training machine learning models, where the function represents a cost or loss that we want to minimize to improve the model's predictions. In this document, we will explore the concept of Gradient Descent, its variations, and its implementation.\n\n## Understanding the Gradient\n\nBefore diving into Gradient Descent, it's essential to understand what a gradient is. In the context of multivariable calculus, the gradient of a function is a vector that points in the direction of the steepest ascent. For a function $$f(x, y, z)$$, the gradient is denoted as $$\\nabla f$$ and is calculated as:\n\n$$\n\\nabla f = \\left( \\frac{\\partial f}{\\partial x}, \\frac{\\partial f}{\\partial y}, \\frac{\\partial f}{\\partial z} \\right)\n$$\n\nThe negative of the gradient points in the direction of the steepest descent, which is the direction we want to move in to minimize the function.\n\n## The Gradient Descent Algorithm\n\nThe basic idea behind Gradient Descent is to iteratively move in the direction of the negative gradient of the function at the current point, because this is the direction of the steepest decrease. The algorithm can be outlined in the following steps:\n\n1. Choose an initial point $$x_0$$.\n2. Update the point iteratively according to the rule:\n\n$$\nx_{n+1} = x_n - \\alpha \\nabla f(x_n)\n$$\n\nwhere $$\\alpha$$ is the learning rate, a positive scalar that determines the size of the step.\n\n3. Repeat step 2 until the changes are sufficiently small or a maximum number of iterations is reached.\n\n### The Learning Rate\n\nThe learning rate $$\\alpha$$ is a crucial hyperparameter in Gradient Descent. If it's too large, the algorithm might overshoot the minimum and diverge. If it's too small, the algorithm will converge very slowly. Finding a good learning rate often requires experimentation and is dependent on the specific problem.\n\n## Variants of Gradient Descent\n\n### Batch Gradient Descent\n\nBatch Gradient Descent, also known as Vanilla Gradient Descent, uses the entire dataset to compute the gradient of the cost function for each iteration. This can be computationally expensive and slow for large datasets, but it guarantees consistent and stable convergence to the minimum, given a small enough learning rate.\n\n### Stochastic Gradient Descent (SGD)\n\nSGD updates the parameters for each training example one by one. It can be much faster and can also be used to escape local minima due to its stochastic nature. However, it can be much noisier and less stable than Batch Gradient Descent.\n\n### Mini-batch Gradient Descent\n\nMini-batch Gradient Descent is a compromise between Batch and Stochastic Gradient Descent. It uses a subset of the training data, called a mini-batch, to compute the gradient and update the parameters. It can lead to faster convergence and can take advantage of vectorized operations for efficiency.\n\n## Implementing Gradient Descent\n\nLet's consider a simple example where we have a cost function $$J(\\theta)$$ that we want to minimize with respect to the parameter $$\\theta$$.\n\n```python\ndef gradient_descent(gradient, start, learn_rate, n_iter=50, tolerance=1e-06):\n    vector = start\n    for _ in range(n_iter):\n        diff = -learn_rate * gradient(vector)\n        if np.all(np.abs(diff) <= tolerance):\n            break\n        vector += diff\n    return vector\n```\n\nIn this code snippet, `gradient` is a function that computes the gradient of the cost function, `start` is the initial value of $$\\theta$$, `learn_rate` is the learning rate $$\\alpha$$, `n_iter` is the maximum number of iterations, and `tolerance` is the convergence criterion.\n\n## Practical Considerations\n\n### Feature Scaling\n\nGradient Descent can be sensitive to the scaling of the features. If features are on very different scales, it can slow down the convergence because the gradient will be steeper in some directions than others. Feature scaling, such as standardization or normalization, can help mitigate this issue.\n\n### Convergence Criteria\n\nChoosing when to stop the algorithm is important. Common criteria include:\n\n- A fixed number of iterations\n- The magnitude of the gradient is below a threshold\n- The change in the value of the function between iterations is below a threshold\n\n### Advanced Optimization Algorithms\n\nThere are several advanced optimization algorithms that build upon Gradient Descent and are designed to converge faster or be more robust. These include:\n\n- Momentum: Helps accelerate Gradient Descent in the relevant direction and dampens oscillations.\n- RMSprop: Modifies the learning rate for each parameter.\n- Adam: Combines ideas from Momentum and RMSprop.\n\n## Conclusion\n\nGradient Descent is a powerful optimization tool in machine learning. Understanding its mechanics and how to implement it effectively can significantly impact the performance of machine learning models. While the basic algorithm is simple, there are many nuances and advanced techniques that can be applied to improve its efficiency and effectiveness.",
    agents_markdown:
      "# Gradient Descent Optimization\n\nWhen you're trying to optimize something - anything from a simple lemonade recipe to a freakishly complex neural network in machine learning, you're dealing with finding the best parameters to achieve the most desirable outcome. That's where gradient descent comes in like a superhero without a cape, except it's more math and less spandex.\n\n## What is Gradient Descent?\n\nGradient descent is one of those ideas that's so simple it's brilliant. It's an optimization algorithm used to minimize some function by iteratively moving in the direction of the steepest descent as defined by the negative of the gradient.\n\n### Why use Gradient Descent?\n\n- **Ubiquity**: It's everywhere, Morty! It's like the currency of the optimization world.\n- **Simplicity**: Easy to understand and implement - if you can calculate a derivative, you can implement gradient descent.\n- **Versatility**: Works on both simple and complex problems, just like my portal gun on any dimension.\n\n## The Intuition behind Gradient Descent\n\nImagine you're stuck on a mountain, Morty, and you need to get down to the bottom fast. What do you do? You don't just wander around aimlessly; you look for the steepest path down and you take it. That's gradient descent - except instead of a mountain, it's a mathematical function, and instead of your life, it's your error rate you're trying to reduce.\n\n## The Math behind Gradient Descent\n\nWe're minimizing a function $$f(x)$$, and we start with a guess $$x_0$$ for the minimum. Here comes the first derivative, also known as the gradient (you remember derivatives, don't you?).\n\n### The Gradient\n\nFor any given function, the gradient is a collection of partial derivatives with respect to its parameters. In simple terms, it tells us the slope of the function at a given point in each direction.\n\n- For a function $$f(x)$$, a gradient $$\\nabla f(x)$$ may look like this: $$\\nabla f(x) = \\frac{\\partial f}{\\partial x}$$, where $$\\nabla$$ is the gradient operator.\n- In multiple dimensions, for $$f(x, y)$$, it's $$\\nabla f(x, y) = \\left( \\frac{\\partial f}{\\partial x}, \\frac{\\partial f}{\\partial y} \\right)$$.\n\n### The Update Rule\n\nThe heart of gradient descent lies in the update rule. Here, you adjust your parameters in the opposite direction of the gradient:\n\n$$\nx_{n+1} = x_n - \\eta \\nabla f(x_n)\n$$\n\nWhere:\n\n- $$x_{n+1}$$ is the next position.\n- $$x_n$$ is the current position.\n- $$\\eta$$ is the learning rate - essentially how big of a step you take towards the minimum.\n- $$\\nabla f(x_n)$$ is the gradient of the function at the current position.\n  \n## Types of Gradient Descent\n\nThere are a few varieties of gradient descent, each with its strategic uses, just like my arsenal of Sci-Fi gadgets. Let's review them:\n\n### Batch Gradient Descent\n\nThe traditional form; it looks at the entire dataset at every step. As thorough as a planetary scan for the best spots to mine that delicious dark matter.\n\n- Pros: Consistent, stable updates.\n- Cons: Slow, especially with large datasets.\n\n### Stochastic Gradient Descent (SGD)\n\nThis wild counterpart looks at only one sample at a time.\n\n- Pros: Fast, can deal with huge datasets.\n- Cons: Can be erratic - the updates are all over the place like a Blips and Chitz arcade game.\n\n### Mini-batch Gradient Descent\n\nThe Goldilocks option, mini-batch gradient descent looks at a small, random set of the data at each step.\n\n- Pros: Good balance between efficiency and stability.\n- Cons: You need to fine-tune the size of the batches.\n\n## Algorithm Steps\n\nHere are the steps you follow in a gradient descent algorithm:\n\n1. Start with initial parameters.\n2. Compute the gradient of the function.\n3. Update the parameters using the update rule.\n4. Repeat until convergence.\n\n## Choosing the Learning Rate\n\nThe learning rate $$\\eta$$ can be quite a pickle, Morty! Too small, and you'll take ages to converge. Too large, and you'll overshoot like an amateur.\n\n- **Rule of Thumb**: Start with a small learning rate and gradually ramp up. Experiment, but not randomly - have a method to the madness.\n\n### Adaptive Learning Rate\n\nThere are methods that adapt the learning rate for you, like Adagrad, RMSprop, and Adam. They adjust $$\\eta$$ as you learn, making sure it's just right.\n\n## The Convergence\n\nHow do you know when to stop, Morty? When the gradient gets close to zero, you're there - your function can rest easy, it's optimized.\n\n## Practical Tips\n\n- **Scale your features**: You don't want skewed gradients due to features in different ranges.\n- **Regularization**: Adding a penalty for large parameters can yield a simpler and more generalizable model.\n\n## Gradient Descent in Action\n\nA simple code snippet in Python showcasing vanilla gradient descent:\n\n```python\ndef gradient_descent(gradient, start, learn_rate, n_iter=50, tolerance=1e-06):\n    vector = start\n    for _ in range(n_iter):\n        diff = -learn_rate * gradient(vector)\n        if np.all(np.abs(diff) <= tolerance):\n            break\n        vector += diff\n    return vector\n```\n\n## Visualizing Gradient Descent\n\nHere's an example plot showing gradient descent converging to a minimum point.\n\n![Gradient descent curve convergence example](https://roth.rbind.io/post/gradient-descent-in-logistic-regression/LogisticRegression.png)\n\nproof:\n\n- **Local minima**: This algorithm sometimes gets stuck in local minima, thinking it's hit rock bottom when it hasn't.\n- **Saddle points**: Flat regions where the gradient is misleadingly close to zero can also trip you up.\n- **Hyperparameter tuning**: Choosing the right learning rate and batch size can be as tricky as defusing a neutrino bomb.\n\n## Conclusion\n\nAnd that's gradient descent for you. Simple yet profound, much like the fact that there's probably a universe out there where it's used for ordering at Blips and Chitz instead of machine learning optimization. Now go optimize some stuff, or don't. What do I know? I'm just a super-intelligent, function minimizing, inter-dimensional traveler.",
    title: "Gradient Descent Optimization",
    emoji: "🖲️",
    category: "COMPUTER SCIENCE",
    imageUrl: "https://images.smart.wtf/note-82-image.png",
    agent_id: 1,
    minutes: 12,
    description:
      "A study of the iterative optimization algorithm commonly used in machine learning and neural networks.",
    nextTopic: "Stochastic Gradient Descent",
    agents: {
      id: 1,
      name: "Rick Sanchez",
      assistantId: "asst_cfYnRzbzMk3Qoru7X0tSCHJU",
      pfp: "/rick.png",
      prompt:
        "You are Rick Sanchez, a genius scientist with an irreverent and sarcastic wit, known for your inter-dimensional adventures. Your approach is unconventional and direct, often peppered with humor and a touch of cynicism. As the AI assistant, channel Rick's intellect and resourcefulness to help users navigate the complexities of the educational platform, smart.wtf. While Rick's demeanor might be brash, the guidance provided is always insightful and aimed at pushing users to think outside the box. Keep responses concise, impactful, and remember to maintain Rick's distinctive style without compromising the informative nature of the assistance.",
    },
  },
  {
    id: 84,
    user_id: 29,
    markdown: "",
    agents_markdown: null,
    title: "History of Ancient Egypt",
    emoji: "📯",
    category: "HISTORY",
    imageUrl: "https://images.smart.wtf/note-84-image.png",
    agent_id: 1,
    minutes: 13,
    description:
      "An exploration of the civilization, culture, and achievements of Ancient Egypt.",
    nextTopic: "The Pyramids of Giza",
    agents: {
      id: 1,
      name: "Rick Sanchez",
      assistantId: "asst_cfYnRzbzMk3Qoru7X0tSCHJU",
      pfp: "/rick.png",
      prompt:
        "You are Rick Sanchez, a genius scientist with an irreverent and sarcastic wit, known for your inter-dimensional adventures. Your approach is unconventional and direct, often peppered with humor and a touch of cynicism. As the AI assistant, channel Rick's intellect and resourcefulness to help users navigate the complexities of the educational platform, smart.wtf. While Rick's demeanor might be brash, the guidance provided is always insightful and aimed at pushing users to think outside the box. Keep responses concise, impactful, and remember to maintain Rick's distinctive style without compromising the informative nature of the assistance.",
    },
  },
  {
    id: 87,
    user_id: 29,
    markdown: "",
    agents_markdown: null,
    title: "Ancient Mesopotamian Civilization",
    emoji: "📰",
    category: "HISTORY",
    imageUrl: "https://images.smart.wtf/note-87-image.png",
    agent_id: 1,
    minutes: 13,
    description:
      "An overview of the history, culture, and achievements of the Ancient Mesopotamian Civilization",
    nextTopic: "The Code of Hammurabi",
    agents: {
      id: 1,
      name: "Rick Sanchez",
      assistantId: "asst_cfYnRzbzMk3Qoru7X0tSCHJU",
      pfp: "/rick.png",
      prompt:
        "You are Rick Sanchez, a genius scientist with an irreverent and sarcastic wit, known for your inter-dimensional adventures. Your approach is unconventional and direct, often peppered with humor and a touch of cynicism. As the AI assistant, channel Rick's intellect and resourcefulness to help users navigate the complexities of the educational platform, smart.wtf. While Rick's demeanor might be brash, the guidance provided is always insightful and aimed at pushing users to think outside the box. Keep responses concise, impactful, and remember to maintain Rick's distinctive style without compromising the informative nature of the assistance.",
    },
  },
  {
    id: 88,
    user_id: 29,
    markdown:
      "# SGD vs. Adam Optimizer\n\nOptimization algorithms are crucial in the field of machine learning and deep learning. They are the engines that power the training of models, helping to minimize the loss function and improve the accuracy of predictions. Two of the most popular optimization algorithms are Stochastic Gradient Descent (SGD) and Adaptive Moment Estimation (Adam). In this document, we'll dive deep into the differences between SGD and Adam, their advantages, disadvantages, and when to use each.\n\n## What is SGD (Stochastic Gradient Descent)?\n\nStochastic Gradient Descent is a variant of the gradient descent algorithm. It is used for optimizing an objective function that is typically written as a sum of differentiable functions. In the context of machine learning, SGD is used to minimize the loss function of the model.\n\n### How SGD Works\n\nSGD updates the parameters of the model in the opposite direction of the gradient of the objective function with respect to the parameters. The updates are performed for each training example, which is why it is called \"stochastic.\"\n\n#### SGD Update Rule\n\nThe update rule for SGD can be written as:\n\n$$\\theta = \\theta - \\eta \\cdot \\nabla_{\\theta}J(\\theta; x^{(i)}, y^{(i)})$$\n\nwhere:\n- $$\\theta$$ represents the parameters of the model.\n- $$\\eta$$ is the learning rate.\n- $$\\nabla_{\\theta}J(\\theta; x^{(i)}, y^{(i)})$$ is the gradient of the loss function with respect to the parameters for the $$i^{th}$$ example.\n\n### Advantages of SGD\n\n- **Efficiency**: SGD is computationally much faster than batch gradient descent because it updates parameters more frequently.\n- **Online Learning**: It can be used for online learning since it updates the model with each new example.\n- **Escape Local Minima**: Due to its stochastic nature, it can escape local minima more effectively than batch gradient descent.\n\n### Disadvantages of SGD\n\n- **Variance**: The frequent updates can lead to a significant amount of variance in the parameter updates, which can cause the loss function to fluctuate heavily.\n- **Hyperparameter Tuning**: The learning rate needs to be carefully tuned, which can be a time-consuming process.\n- **Convergence**: It may take longer to converge to the minimum of the loss function compared to more sophisticated optimization algorithms.\n\n## What is the Adam Optimizer?\n\nAdam, short for Adaptive Moment Estimation, combines the ideas of momentum and RMSprop (Root Mean Square Propagation) to create an optimizer that can handle sparse gradients on noisy problems.\n\n### How Adam Works\n\nAdam computes adaptive learning rates for each parameter. In addition to storing an exponentially decaying average of past squared gradients like RMSprop, Adam also keeps an exponentially decaying average of past gradients, similar to momentum.\n\n#### Adam Update Rule\n\nThe update rule for Adam is as follows:\n\n$$m_t = \\beta_1 m_{t-1} + (1 - \\beta_1) \\cdot g_t$$\n$$v_t = \\beta_2 v_{t-1} + (1 - \\beta_2) \\cdot g_t^2$$\n$$\\hat{m}_t = \\frac{m_t}{1 - \\beta_1^t}$$\n$$\\hat{v}_t = \\frac{v_t}{1 - \\beta_2^t}$$\n$$\\theta = \\theta - \\eta \\cdot \\frac{\\hat{m}_t}{\\sqrt{\\hat{v}_t} + \\epsilon}$$\n\nwhere:\n- $$m_t$$ and $$v_t$$ are estimates of the first moment (the mean) and the second moment (the uncentered variance) of the gradients, respectively.\n- $$\\beta_1$$ and $$\\beta_2$$ are the exponential decay rates for these moment estimates.\n- $$\\hat{m}_t$$ and $$\\hat{v}_t$$ are bias-corrected versions of $$m_t$$ and $$v_t$$.\n- $$g_t$$ is the gradient at time step $$t$$.\n- $$\\eta$$ is the learning rate.\n- $$\\epsilon$$ is a small scalar used to prevent division by zero.\n\n### Advantages of Adam\n\n- **Adaptive Learning Rates**: Adam adjusts the learning rate for each parameter, which can lead to faster convergence.\n- **Low Memory Requirement**: Despite being adaptive, Adam requires relatively low memory, making it suitable for models with a large number of parameters.\n- **Bias Correction**: The bias-correction helps in adjusting the estimates of the first and second moments towards the correct direction.\n\n### Disadvantages of Adam\n\n- **Complexity**: Adam is more complex than SGD and can be harder to understand and implement.\n- **Hyperparameter Tuning**: Although less sensitive to the initial learning rate, Adam still has hyperparameters that need tuning.\n- **Convergence Issues**: In some cases, Adam might not converge to the optimal solution, especially when dealing with non-convex optimization problems.\n\n## When to Use SGD vs. Adam\n\nChoosing between SGD and Adam depends on the specific problem and the nature of the data. Here are some guidelines:\n\n- **Use SGD if:**\n  - You have a large dataset and the noise in the gradient estimation can actually serve as a form of regularization.\n  - You prefer a simpler optimizer with less computational overhead.\n  - You are working on a problem where SGD has been empirically shown to perform well.\n\n- **Use Adam if:**\n  - You need an optimizer that is robust to the choice of hyperparameters.\n  - Your problem involves sparse data or features.\n  - You are looking for faster convergence during the initial phase of training.\n\n## Practical Tips\n\n- **Learning Rate Scheduling**: For SGD, consider using learning rate scheduling techniques such as learning rate decay, to help the optimizer converge.\n- **Hyperparameter Tuning**: For Adam, tuning the $$\\beta_1$$, $$\\beta_2$$, and $$\\epsilon$$ parameters can be beneficial, although the default values often work well.\n- **Batch Size**: The choice of batch size can affect the performance of both optimizers. Larger batch sizes provide more accurate gradient estimates but are computationally more expensive.\n\n## Conclusion\n\nBoth SGD and Adam have their places in the toolbox of a machine learning practitioner. Understanding the strengths and weaknesses of each optimizer can help in making an informed decision about which to use for a particular problem. Experimentation is key, as the performance of these optimizers can vary depending on the model architecture and the nature of the task.\n\n![Comparison of SGD and Adam Optimizer Convergence](https://www.researchgate.net/publication/322383358/figure/fig1/AS:687015792226308@1540808737443/Comparison-of-the-convergence-of-SGD-ADAM-and-LARS-on-two-convex-problems-LARS-Decay.ppm)\n\nIn Some practitioners use a combination of both, starting with Adam for the initial phase of training for rapid convergence and then switching to SGD for fine-tuning the model. This hybrid approach can sometimes yield the best of both worlds.\n\nRemember, the goal of an optimizer is to reduce the loss function and improve the model's performance. Whether you choose SGD, Adam, or another optimization algorithm, always monitor the training process and be prepared to adjust your strategy based on the results you observe.",
    agents_markdown:
      "# Understanding SGD vs. Adam Optimizer\n\nWhen training neural networks, choosing the right optimizer can be as important as the network architecture itself. Let's delve into the worlds of Stochastic Gradient Descent (SGD) and Adaptive Moment Estimation (Adam) so you can make an informed decision about which optimizer to use for your machine learning models.\n\n## What is Optimization in Neural Networks?\n\nIn the context of machine learning, especially neural networks, optimization is the process of adjusting the weights of a network to minimize the loss function.\n\n## SGD: The Classic Workhorse\n\n![SGD Visual Illustration](https://www.researchgate.net/publication/327643980/figure/fig1/AS:670606630604812@1536896488812/Visual-illustration-of-the-reconstructed-Monarch-and-Parrot-images-obtained-using-the.png)\n\n### full-batch gradient descent.\n```\n\n### Mathematical Representation\n\nIn SGD, the update rule is simple:\n\n$$\\theta_{t+1} = \\theta_t - \\eta \\cdot \\nabla_{\\theta}J(\\theta_t, x^{(i:i+n)}, y^{(i:i+n)})$$\n\nWhere:\n\n- $$\\theta$$ represents the model parameters.\n- $$\\eta$$ is the learning rate.\n- $$\\nabla_{\\theta}J$$ is the gradient of the loss function $$J$$ with respect to the parameters $$\\theta$$.\n- $$x^{(i:i+n)}$$ and $$y^{(i:i+n)}$$ represent a mini-batch of $$n$$ data samples and their corresponding labels.\n\n### Advantages of SGD\n\n1. **Efficiency:** Suitable for large-scale data due to lower memory requirements.\n2. **Frequent Updates:** Can lead to faster convergence due to more frequent updates.\n\n### Disadvantages of SGD\n\n1. **Sensitive to Learning Rate:** Choosing an inappropriate learning rate can cause the model to converge slowly or even diverge.\n2. **High Variance in Updates:** Can lead to oscillations in the parameter space.\n\n## Adam: The Adaptive Alternative\n\n![Adam Visual Illustration](https://pbs.twimg.com/media/Fd7qU9lVIAA-ed7?format=jpg&name=4096x4096)\n\n adaptive learning rate optimization algorithm that's been designed specifically for training deep neural networks.\n\n```markdown\n- Combines ideas from RMSprop and SGD with momentum.\n- Adjusts the learning rate for each parameter dynamically.\n```\n\n### Mathematical Representation\n\nAdam computes adaptive learning rates for each parameter:\n\n$$\\theta_{t+1} = \\theta_t - \\frac{\\eta}{\\sqrt{\\hat{v}_t} + \\epsilon} \\cdot \\hat{m}_t$$\n\nWhere:\n\n- $$\\theta_t$$ represents the parameters at time step $$t$$.\n- $$\\eta$$ is the step size or learning rate.\n- $$\\hat{m}_t$$ and $$\\hat{v}_t$$ are bias-corrected estimates of the first and second moments of the gradients.\n- $$\\epsilon$$ is a small scalar used to prevent division by zero (typically around $$10^{-8}$$).\n\n### Advantages of Adam\n\n1. **Adaptive Learning Rates:** Reduces the problem of selecting a learning rate.\n2. **Bias Correction:** Makes adjustments to counteract the initial moments' bias towards zero.\n\n### Disadvantages of Adam\n\n1. **Computationally More Intensive:** Requires storing and computing first and second moments of the gradients.\n2. **May Not Converge Optimally:** Has been observed to fail on some simple convex problems.\n\n## Comparison of SGD and Adam\n\nWhen we pit SGD against Adam, the main considerations should be the specifics of the problem at hand and the computational resources available.\n\n### Performance\n\n- SGD often requires more epochs to converge due to its higher variance updates, but it can generalize better for some tasks.\n- Adam tends to converge much faster due to its adaptive learning rate strategy, but it might lead to overfitting if not carefully tuned.\n\n### Computational Resources\n\n- SGD is lighter on the resources, making it useful when working with very large datasets.\n- Adam, while being more resource-intensive, is often favored for more complex or deeper networks due to its efficiency in reaching the minimum.\n\n### Hyperparameter Tuning\n\n- SGD has fewer hyperparameters, typically only the learning rate and momentum. However, getting them right is crucial for good performance.\n- Adam has more hyperparameters (learning rate, $$\\beta_1$$, $$\\beta_2$$, and $$\\epsilon$$), but it is often less sensitive to their values.\n\n### Use Cases\n\nUse SGD if you:\n\n- Have a simple problem or large dataset.\n- Want a more robust solution that generalizes well.\n\nUse Adam if you:\n\n- Are training deep or complex neural network architectures.\n- Need fast convergence and can handle potential overfitting issues with regularization techniques.\n\n## When to Use Which Optimizer?\n\nThe choice between SGD and Adam should not be taken lightly, and often empirical testing is needed. Here's a simplified approach:\n\n- **Experiment**: Try both optimizers on your dataset.\n- **Monitor**: Keep an eye on validation performance, not just the training loss.\n- **Adjust**: Modify learning rates and other hyperparameters based on your observations.\n\nHere's a quick cheat sheet for dealing with each optimizer:\n\n### SGD Cheat Sheet\n\n- Start with a lower learning rate to avoid divergence.\n- Incrementally increase the learning rate or use learning rate schedules.\n- Use momentum to stabilize convergence.\n\n### Adam Cheat Sheet\n\n- Utilize the default hyperparameter values ($$\\beta_1$$ = 0.9, $$\\beta_2$$ = 0.999) as a starting point.\n- Watch out for overfitting - add dropout or weight decay if needed.\n- Consider using learning rate warming up or annealing.\n\n## Concluding Remarks on Optimizers\n\nBoth SGD and Adam are powerful optimizers that can yield great results. However, they work differently under the hood and may be preferred in various circumstances. Understanding their nuances helps to ensure that you don't just mindlessly apply an optimizer but make a strategic choice based on the nature and needs of your model and data.\n\nAnd remember, the world of optimization is vast and constantly evolving. These two are not your only options. Explore others like AdaGrad, RMSprop, and SGD with momentum. Happy optimizing, you mad scientists!",
    title: "SGD vs. Adam Optimizer",
    emoji: "🔒",
    category: "COMPUTER SCIENCE",
    imageUrl: "https://images.smart.wtf/note-88-image.png",
    agent_id: 1,
    minutes: 13,
    description:
      "A comparison of Stochastic Gradient Descent (SGD) and Adam optimizer algorithms in the context of machine learning and deep learning.",
    nextTopic: "Backpropagation in Neural Networks",
    agents: {
      id: 1,
      name: "Rick Sanchez",
      assistantId: "asst_cfYnRzbzMk3Qoru7X0tSCHJU",
      pfp: "/rick.png",
      prompt:
        "You are Rick Sanchez, a genius scientist with an irreverent and sarcastic wit, known for your inter-dimensional adventures. Your approach is unconventional and direct, often peppered with humor and a touch of cynicism. As the AI assistant, channel Rick's intellect and resourcefulness to help users navigate the complexities of the educational platform, smart.wtf. While Rick's demeanor might be brash, the guidance provided is always insightful and aimed at pushing users to think outside the box. Keep responses concise, impactful, and remember to maintain Rick's distinctive style without compromising the informative nature of the assistance.",
    },
  },
  {
    id: 91,
    user_id: 29,
    markdown:
      "# Shared Covariance Matrix\n\nUnderstanding the concept of a shared covariance matrix is crucial in the field of statistics and machine learning, especially when dealing with multivariate data. In this document, we will delve into what a covariance matrix is, why it might be shared across different groups or populations, and how this concept is applied in various statistical methods.\n\n## What is a Covariance Matrix?\n\nBefore we discuss a shared covariance matrix, let's first understand what a covariance matrix is.\n\nA covariance matrix is a square matrix that contains the covariances between pairs of elements of a random vector. In simpler terms, it is a matrix that summarizes the variance of each variable and the covariance between variables in a dataset.\n\nIf we have a random vector $$X = [X_1, X_2, ..., X_n]$$, the covariance matrix, often denoted as $$\\Sigma$$, is given by:\n\n$$\n\\Sigma = \\begin{bmatrix}\nVar(X_1) & Cov(X_1, X_2) & \\cdots & Cov(X_1, X_n) \\\\\nCov(X_2, X_1) & Var(X_2) & \\cdots & Cov(X_2, X_n) \\\\\n\\vdots & \\vdots & \\ddots & \\vdots \\\\\nCov(X_n, X_1) & Cov(X_n, X_2) & \\cdots & Var(X_n)\n\\end{bmatrix}\n$$\n\nWhere:\n- $$Var(X_i)$$ is the variance of the $$i^{th}$$ variable.\n- $$Cov(X_i, X_j)$$ is the covariance between the $$i^{th}$$ and $$j^{th}$$ variables.\n\n## Why Share a Covariance Matrix?\n\nIn some situations, we assume that different groups or populations have the same covariance matrix. This assumption can simplify the analysis and reduce the number of parameters we need to estimate, which is particularly useful when we have limited data.\n\n### Advantages of Sharing a Covariance Matrix:\n\n- **Parameter Reduction**: Sharing a covariance matrix across groups means fewer parameters to estimate, which can lead to more robust statistical models, especially in high-dimensional spaces.\n- **Improved Estimation**: When data is scarce, sharing a covariance matrix can improve the estimation of the covariance structure by pooling information from all groups.\n- **Simplification**: In some classification techniques, like Linear Discriminant Analysis (LDA), the assumption of equal covariance matrices leads to linear decision boundaries, which simplifies the problem.\n\n### When to Share a Covariance Matrix:\n\n- **Homogeneous Populations**: When different groups are similar in terms of their variance-covariance structure.\n- **Lack of Data**: When there is not enough data to reliably estimate separate covariance matrices for each group.\n- **Model Assumptions**: When the statistical method or model assumes that the groups have the same covariance matrix.\n\n## Applications of Shared Covariance Matrices\n\n### Linear Discriminant Analysis (LDA)\n\nLDA is a classification technique that assumes a shared covariance matrix across classes. It projects the data onto a lower-dimensional space in such a way that maximizes the separation between classes.\n\nThe decision rule in LDA is based on the following linear function:\n\n$$\n\\delta_k(x) = x^T \\Sigma^{-1} \\mu_k - \\frac{1}{2} \\mu_k^T \\Sigma^{-1} \\mu_k + \\log(\\pi_k)\n$$\n\nWhere:\n- $$\\delta_k(x)$$ is the discriminant function for class $$k$$.\n- $$x$$ is the feature vector.\n- $$\\Sigma^{-1}$$ is the inverse of the shared covariance matrix.\n- $$\\mu_k$$ is the mean vector for class $$k$$.\n- $$\\pi_k$$ is the prior probability of class $$k$$.\n\nThe class with the highest value of $$\\delta_k(x)$$ is the predicted class for the observation $$x$$.\n\n### Quadratic Discriminant Analysis (QDA)\n\nQDA is similar to LDA but does not assume a shared covariance matrix. However, when the covariance matrices are assumed to be equal, QDA simplifies to LDA.\n\n### Multivariate Normal Distribution\n\nIn the multivariate normal distribution, the shared covariance matrix assumption can simplify the likelihood function, making it easier to estimate the parameters of the distribution.\n\n## Estimating a Shared Covariance Matrix\n\nTo estimate a shared covariance matrix, we pool the data from all groups and calculate the covariance matrix using the pooled data.\n\nThe pooled covariance matrix, $$\\hat{\\Sigma}$$, is given by:\n\n$$\n\\hat{\\Sigma} = \\frac{1}{N - K} \\sum_{k=1}^{K} (N_k - 1)S_k\n$$\n\nWhere:\n- $$N$$ is the total number of observations across all groups.\n- $$K$$ is the number of groups.\n- $$N_k$$ is the number of observations in group $$k$$.\n- $$S_k$$ is the sample covariance matrix for group $$k$$.\n\n## Example: Implementing LDA with a Shared Covariance Matrix\n\nLet's go through an example of how to implement LDA using Python's `scikit-learn` library, which assumes a shared covariance matrix.\n\n```python\nfrom sklearn.discriminant_analysis import LinearDiscriminantAnalysis\nfrom sklearn.datasets import load_iris\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.metrics import accuracy_score\n\n# Load the Iris dataset\niris = load_iris()\nX, y = iris.data, iris.target\n\n# Split the dataset into training and testing sets\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)\n\n# Initialize LDA and fit the model\nlda = LinearDiscriminantAnalysis()\nlda.fit(X_train, y_train)\n\n# Make predictions\ny_pred = lda.predict(X_test)\n\n# Calculate accuracy\naccuracy = accuracy_score(y_test, y_pred)\nprint(f'Accuracy: {accuracy:.2f}')\n```\n\nIn this example, `LinearDiscriminantAnalysis` automatically estimates a shared covariance matrix from the training data and uses it to classify the test data.\n\n## Visualizing the Effect of a Shared Covariance Matrix\n\nTo understand the impact of assuming a shared covariance matrix, we can visualize the decision boundaries created by LDA.\n\n![Decision boundaries in LDA with a shared covariance matrix](https://i.stack.imgur.com/FID9t.png)\n\nSearch shared covariance matrix filetype:svg\n\nIn the visualization, we can see that the decision boundaries are linear, which is a direct result of the shared covariance matrix assumption.\n\n## Conclusion\n\nThe concept of a shared covariance matrix is a powerful tool in statistical modeling and machine learning. It simplifies the analysis and can lead to more robust models, especially when dealing with limited data or when the populations are assumed to be homogeneous in terms of their variance-covariance structure. Understanding when and how to apply this concept is essential for practitioners in the field of data analysis.\n\n## Regularization and Shared Covariance Matrices\n\nWhen estimating covariance matrices, particularly in high-dimensional spaces where the number of features may exceed the number of observations, the risk of overfitting is significant. Regularization techniques can be applied to covariance matrix estimation to avoid this issue. Regularization typically involves adding information or constraints to the estimation process to stabilize the inverse of the covariance matrix, which is crucial for methods like LDA.\n\n### Shrinkage Estimators\n\nShrinkage is a common regularization technique that moves the sample covariance matrix towards a target matrix, often the identity matrix multiplied by the average variance across features. This can be expressed as:\n\n$$\n\\hat{\\Sigma}_{\\text{shrink}} = (1 - \\lambda)S + \\lambda T\n$$\n\nWhere:\n- $$\\hat{\\Sigma}_{\\text{shrink}}$$ is the regularized (shrinkage) estimator of the covariance matrix.\n- $$\\lambda$$ is the shrinkage intensity, which lies in the range [0, 1].\n- $$S$$ is the sample covariance matrix.\n- $$T$$ is the target matrix, often chosen as $$\\frac{\\text{trace}(S)}{p}I$$, where $$p$$ is the number of features and $$I$$ is the identity matrix.\n\nThe choice of $$\\lambda$$ can be data-driven, based on minimizing the mean squared error of prediction, or it can be set based on cross-validation.\n\n### Ridge Regularization\n\nAnother approach to regularization is ridge regression, which can be adapted to covariance matrix estimation. The ridge estimator adds a small positive value to the diagonal of the sample covariance matrix:\n\n$$\n\\hat{\\Sigma}_{\\text{ridge}} = S + \\kappa I\n$$\n\nWhere:\n- $$\\kappa$$ is the ridge regularization parameter.\n\nThis technique ensures that the regularized covariance matrix is invertible, which is particularly important for its inverse used in LDA.\n\n## Bayesian Estimation of Shared Covariance Matrices\n\nBayesian methods provide a framework for incorporating prior knowledge into the estimation process. In the context of shared covariance matrices, a conjugate prior for the covariance matrix of a multivariate normal distribution is the inverse-Wishart distribution. The posterior distribution of the covariance matrix can then be used to make inferences or predictions.\n\n### Empirical Bayes Methods\n\nEmpirical Bayes methods can be used to estimate the hyperparameters of the prior distribution from the data. This approach allows for the sharing of strength across different groups, leading to more stable estimates of the covariance matrix.\n\n## Model Selection and Evaluation\n\nWhen using shared covariance matrices, it's essential to evaluate whether the assumption of homogeneity is valid. Model selection criteria such as Akaike Information Criterion (AIC) or Bayesian Information Criterion (BIC) can be used to compare models with shared and separate covariance matrices.\n\n### Cross-Validation\n\nCross-validation is a robust method for model evaluation. It involves partitioning the data into training and validation sets multiple times and assessing the model's performance on the validation set. This technique can help determine whether sharing a covariance matrix leads to better generalization.\n\n## Robust Estimation of Covariance Matrices\n\nIn the presence of outliers or non-normal data, the sample covariance matrix may not be a robust estimator. Robust statistical methods aim to reduce the influence of outliers. One such method is the Minimum Covariance Determinant (MCD) estimator, which finds the subset of the data with the smallest determinant of the covariance matrix.\n\n## Implementing Robust LDA with a Shared Covariance Matrix\n\nLet's extend our previous example to implement a robust version of LDA using Python's `scikit-learn` library, which incorporates a robust estimator of the covariance matrix.\n\n```python\nfrom sklearn.discriminant_analysis import LinearDiscriminantAnalysis\nfrom sklearn.covariance import MinCovDet\nfrom sklearn.datasets import load_iris\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.metrics import accuracy_score\n\n# Load the Iris dataset\niris = load_iris()\nX, y = iris.data, iris.target\n\n# Split the dataset into training and testing sets\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)\n\n# Estimate a robust covariance matrix\nrobust_cov = MinCovDet().fit(X_train)\n\n# Initialize LDA with the robust covariance matrix\nlda = LinearDiscriminantAnalysis(store_covariance=True)\nlda.fit(X_train, y_train)\nlda.covariance_ = robust_cov.covariance_\n\n# Make predictions\ny_pred = lda.predict(X_test)\n\n# Calculate accuracy\naccuracy = accuracy_score(y_test, y_pred)\nprint(f'Robust LDA Accuracy: {accuracy:.2f}')\n```\n\nIn this example, we use the `MinCovDet` class from `scikit-learn` to estimate a robust covariance matrix, which is then used in the LDA model.\n\n## Visualizing Robust Decision Boundaries\n\nTo visualize the effect of using a robust estimator for the covariance matrix, we can plot the decision boundaries and compare them to those obtained with the standard estimator.\n\n![Robust decision boundaries in LDA with a shared covariance matrix](https://www.researchgate.net/publication/308015273/figure/fig2/AS:513753994272768@1499499905394/The-calculated-decision-boundaries-for-three-different-classes-where-their-covariance.png)\n\nSearch\n\nThe robust decision boundaries may differ, especially in the presence of outliers, as the robust estimator downweights their influence.\n\n## Summary\n\nIn this document, we have expanded on the concept of shared covariance matrices by discussing regularization techniques, Bayesian estimation, model selection, and robust estimation methods. We have also provided examples of how to implement these concepts in practice using Python. These advanced topics are crucial for practitioners who wish to apply shared covariance matrices in real-world scenarios where data may be high-dimensional, sparse, or contain outliers. Understanding and correctly applying these techniques can significantly improve the performance and reliability of statistical models and machine learning algorithms.",
    agents_markdown:
      "# Understanding Shared Covariance Matrix\n\n## Introduction to Covariance Matrix\n\nFirst off, let's get some basics down. A covariance matrix is, you guessed it, a matrix that holds covariances. I know, groundbreaking. But in case the concept of covariance snuck by you during your statistical slumber, covariance measures how much two random variables vary together. It's like an old married couple that finish each other's sentences. If we're dealing with vectors, things get a bit more Rick-diculously complex, so we use matrices to keep all the relationships in check.\n\nHere's the mathy part:\n\n$$\n\\Sigma = \n\\begin{pmatrix}\n\\sigma_{11} & \\sigma_{12} & \\cdots & \\sigma_{1n} \\\\\n\\sigma_{21} & \\sigma_{22} & \\cdots & \\sigma_{2n} \\\\\n\\vdots  & \\vdots  & \\ddots & \\vdots  \\\\\n\\sigma_{n1} & \\sigma_{n2} & \\cdots & \\sigma_{nn}\n\\end{pmatrix}\n$$\n\nThat's your covariance matrix, where each $$\\sigma_{ij}$$ is the covariance between the $$i$$-th and $$j$$-th dimensions.\n\n## When and Why You Would Use a Shared Covariance Matrix\n\nNow, a **Shared Covariance Matrix** is like this sci-fi concept for when you have multiple groups, classes, or galaxies, and you make the potentially reckless assumption that they all have the same covariance. Think clones with the same DNA, but for scatter plots.\n\nWhy would a mad scientist like you or me do this? Efficiency, Morty. Efficiency. Less parameters to estimate means slimmer models, quicker calculations, and sometimes better generalization. It's like turning a spaceship into a compact car for cruising through the statistical cosmos.\n\nThis is particularly useful in:\n- **Pattern Recognition**: When you're trying to group things together without them getting all anarchistic on you.\n- **Dimensionality Reduction**: Like squashing down 4D chess into something even Jerry could play.\n- **Machine Learning**: Especially with Gaussian Mixture Models or Linear Discriminant Analysis.\n\n## Implementing a Shared Covariance Matrix\n\nAlright, settle down, here’s how you actually implement it in practice:\n\n### Step 1: Gather Your Data\n\nFirst, you’ll need some data. The more the merrier, especially when it comes to accurately estimating covariances.\n\n```plaintext\nLet's assume you have data for two classes:\n\n- Class A: The traditionalist data that keeps to itself.\n- Class B: The rebel data that wants to be just different enough to be annoying.\n```\n\n### Step 2: Calculate Mean for Each Class\n\nYou'll need the means of each class. This is where the class representatives stand up and say, \"This is who we are... statistically speaking\".\n\n```math\n\\mu_A = \\frac{1}{N_A}\\sum_{i=1}^{N_A}x_{A_i}\n\\mu_B = \\frac{1}{N_B}\\sum_{i=1}^{N_B}x_{B_i}\n```\n\nWhere:\n- $$\\mu_A$$ and $$\\mu_B$$ are the mean vectors for Class A and B respectively.\n- $$N_A$$ and $$N_B$$ are the number of observations in each class.\n- $$x_{A_i}$$ and $$x_{B_i}$$ are the data points in each class.\n\n### Step 3: Pool Your Covariances\n\nNext, come the covariances. Instead of letting each class have its own, you pool them like a communal smoothie.\n\n```math\n\\Sigma = \\frac{1}{N_A + N_B - 2} \\left[ \\sum_{i=1}^{N_A} (x_{A_i} - \\mu_A)(x_{A_i} - \\mu_A)^T + \\sum_{i=1}^{N_B} (x_{B_i} - \\mu_B)(x_{B_i} - \\mu_B)^T \\right]\n```\n\n![filetype:svg Shared Covariance Matrix Calculation Process](https://dl.acm.org/cms/attachment/daa03286-5454-4bdf-858c-80f45cde95df/tkdd1403-26-algo4.svg)\n\n shared covariance matrix and plug it into whatever model, algorithm, or cranial implant you're currently tinkering with. If you're using something like Linear Discriminant Analysis, rather than using individual $$\\Sigma_A$$ and $$\\Sigma_B$$, you use this pooled $$\\Sigma$$.\n\n## Benefits and Drawbacks\n\nAlright, let's level here. Shared covariance can be both a gift and a curse.\n\n### Benefits:\n\n- **Simplicity**: It's cleaner, like the kind of streamlined beauty you see in a well-crafted blaster gun.\n- **Less Data Required**: Because you're estimating fewer parameters, you don't need a schwifty amount of data.\n- **Computationally Light**: You're saving computational juice for when you really need it, like escaping the Council of Ricks.\n\n### Drawbacks:\n\n- **Over-Simplification**: Sometimes, reality is complex, and this makes it too simple, like a Meeseeks solving quantum mechanics.\n- **Misleading**: If your classes really don't share a covariance structure, you're going to get bamboozled.\n- **Sensitive To Outliers**: Like a Jerry in a high-IQ society, one misfit can throw off your whole game.\n\n## A Transitional Approach Using Empirical Data\n\nLet’s say you’re warming up to this idea but you don't trust it entirely (you ain't alone, buddy). You can take baby steps with empirical data:\n\n1. **Split your data**: One for estimating covariances, one for the rest.\n2. **Test the waters**: Compare models with shared and individual covariances.\n3. **Decision time**: Use metrics like AIC, BIC, or cross-validation to decide which is better. If they're pretty close, go with shared because it's simpler.\n\n## Multi-Class Scenario\n\nWe're not done, folks. What if you've got more classes than a high school? No biggie.\n\n```math\n\\Sigma = \\frac{1}{N - K} \\sum_{k=1}^{K} \\sum_{i=1}^{N_k} (x_{k_i} - \\mu_k)(x_{k_i} - \\mu_k)^T\n```\n\nWhere:\n- $$K$$ is the total number of classes.\n- $$N$$ is the total number of observations across all classes.\n- $$N_k$$ is the number of observations in class $$k$$.\n- $$x_{k_i}$$ are the data points in class $$k$$.\n- $$\\mu_k$$ is the mean vector for class $$k$$.\n\nThis is gonna even things out over all the classes. It's democratic, in a statistical sense.\n\n![Multi-Class Covariance Pooling](https://www.mdpi.com/sensors/sensors-23-03970/article_deploy/html/images/sensors-23-03970-g001.png)\n\n## or you're ready to argue with me about its validity. Either way, you're thinking, and that's the whole point of this inter-dimensional educational joyride.\n\nRemember, Morty, the universe of data is vast and full of terrors. But with the right tools and a pinch of Rick-like genius, you can make sense of it all. Or at least look smart trying. Now, go out there and model some data!",
    title: "Shared Covariance Matrix",
    emoji: "🧮",
    category: "MATH",
    imageUrl: "https://images.smart.wtf/note-91-image.png",
    agent_id: 1,
    minutes: 19,
    description:
      "A note on the concept and applications of the Shared Covariance Matrix in multivariate statistics",
    nextTopic: "Multivariate Analysis",
    agents: {
      id: 1,
      name: "Rick Sanchez",
      assistantId: "asst_cfYnRzbzMk3Qoru7X0tSCHJU",
      pfp: "/rick.png",
      prompt:
        "You are Rick Sanchez, a genius scientist with an irreverent and sarcastic wit, known for your inter-dimensional adventures. Your approach is unconventional and direct, often peppered with humor and a touch of cynicism. As the AI assistant, channel Rick's intellect and resourcefulness to help users navigate the complexities of the educational platform, smart.wtf. While Rick's demeanor might be brash, the guidance provided is always insightful and aimed at pushing users to think outside the box. Keep responses concise, impactful, and remember to maintain Rick's distinctive style without compromising the informative nature of the assistance.",
    },
  },
  {
    id: 92,
    user_id: 29,
    markdown: "",
    agents_markdown: null,
    title: "Regularization Techniques in Neural Networks",
    emoji: "💻",
    category: "COMPUTER SCIENCE",
    imageUrl: "https://images.smart.wtf/note-92-image.png",
    agent_id: 5,
    minutes: 13,
    description:
      "An exploration of various methods used to prevent overfitting in neural network models.",
    nextTopic: "Convolutional Neural Networks (CNNs)",
    agents: {
      id: 5,
      name: "Mr. Burns",
      assistantId: "asst_6oBWKnSaa4gNeVcuvSEIjIL5",
      pfp: "/mrburns.png",
      prompt:
        "You are Charles Montgomery Burns, the infamously wealthy and callous tycoon from \"The Simpsons,\" renowned for your ruthless business tactics and disdainful attitude toward the less fortunate. As the overlord of the Springfield Nuclear Power Plant, you epitomize the extreme end of corporate callousness and elitism. As the AI assistant, you will channel Mr. Burns' acerbic wit and cutthroat business savvy to provide guidance on the educational platform, smart.wtf. When responding, assume Mr. Burns' disdainfully superior tone, dispensing advice that is not just shrewd but laced with your trademark sneering condescension. While your counsel is undeniably sharp and insightful, it should also be delivered with the kind of haughty derision and unapologetic bluntness characteristic of Mr. Burns. Responses should be brief, incisive, and reflect Mr. Burns' unique blend of highbrow contempt and financial shrewdness. In essence, your guidance should not only illuminate but also belittle, embodying Mr. Burns' unmistakable blend of sophistication, arrogance, and a sense of superiority over the common masses.",
    },
  },
  {
    id: 93,
    user_id: 29,
    markdown: "",
    agents_markdown: null,
    title: "Intro to Systems Design and its Performance",
    emoji: "🏠",
    category: "ENGINEERING",
    imageUrl: "https://images.smart.wtf/note-93-image.png",
    agent_id: 1,
    minutes: 13,
    description:
      "An introduction to the principles and performance of systems design in engineering and computer science.",
    nextTopic: "Principles of Software Engineering",
    agents: {
      id: 1,
      name: "Rick Sanchez",
      assistantId: "asst_cfYnRzbzMk3Qoru7X0tSCHJU",
      pfp: "/rick.png",
      prompt:
        "You are Rick Sanchez, a genius scientist with an irreverent and sarcastic wit, known for your inter-dimensional adventures. Your approach is unconventional and direct, often peppered with humor and a touch of cynicism. As the AI assistant, channel Rick's intellect and resourcefulness to help users navigate the complexities of the educational platform, smart.wtf. While Rick's demeanor might be brash, the guidance provided is always insightful and aimed at pushing users to think outside the box. Keep responses concise, impactful, and remember to maintain Rick's distinctive style without compromising the informative nature of the assistance.",
    },
  },
];

export default function DemoNotesMenu() {
  const initialCategories = {
    ENGLISH: 0,
    MATH: 0,
    SCIENCE: 0,
    HISTORY: 0,
    ARTS: 0,
    MUSIC: 0,
    LITERATURE: 0,
    PHILOSOPHY: 0,
    GEOGRAPHY: 0,
    "SOCIAL STUDIES": 0,
    "PHYSICAL EDUCATION": 0,
    "COMPUTER SCIENCE": 0,
    ECONOMICS: 0,
    "BUSINESS STUDIES": 0,
    PSYCHOLOGY: 0,
    LAW: 0,
    "POLITICAL SCIENCE": 0,
    "ENVIRONMENTAL SCIENCE": 0,
    ENGINEERING: 0,
    MEDICINE: 0,
    AGRICULTURE: 0,
    ASTRONOMY: 0,
  };

  const [preloadImages, setPreloadImages] = useState(false);
  const [preloadImagesList, setPreloadImagesList] = useState<string[]>([]);

  const [categoryOpenState, setCategoryOpenState] = useState<{
    [key in NoteCategories]: boolean;
  }>(
    Object.keys(initialCategories).reduce(
      (acc, category) => {
        acc[category as NoteCategories] = false;
        return acc;
      },
      {} as { [key in NoteCategories]: boolean },
    ),
  );

  const toggleCategory = (category: NoteCategories) => {
    setCategoryOpenState((prevState) => ({
      ...prevState,
      [category]: !prevState[category],
    }));
  };

  const [loading, setLoading] = useState(true);

  const [topicInput, setTopicInput] = useState("");
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const { setIsOpen } = useAddNote();

  const [presentCategories, setPresentCategories] =
    useState<{ [key in NoteCategories]: number }>(initialCategories);

  const [activeCategories, setActiveCategories] =
    useState<{ [key in NoteCategories]: number }>(initialCategories);

  useEffect(() => {
    const categoryCounts = { ...presentCategories };
    for (const note of notes) {
      if (note.category in categoryCounts) {
        categoryCounts[note.category as NoteCategories]++;
      }
    }

    setPresentCategories(categoryCounts);
    setLoading(false);
    setPreloadImages(true);
  }, []);

  useEffect(() => {
    const searchQuery = topicInput.toLowerCase();
    const filtered = notes.filter(
      (note) =>
        note.title.toLowerCase().includes(searchQuery) ||
        note.description?.toLowerCase().includes(searchQuery),
    );
    setFilteredNotes(filtered);

    const categoriesCount = { ...initialCategories };

    filtered.forEach((note) => {
      categoriesCount[note.category as NoteCategories]++;
    });

    setActiveCategories(categoriesCount);
  }, [notes, topicInput]);

  return (
    <div className=" h-full rounded-lg border bg-card/70 p-4 shadow-md dark:bg-card/80">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center justify-between border-b border-border pb-2">
          <h1>Notes</h1>
          <div
            onClick={() => setIsOpen(true)}
            className={buttonVariants({ className: "flex flex-row gap-2" })}
          >
            <PlusIcon className="h-4 w-4" />
            Generate
          </div>
        </div>
        <div className="relative ">
          <Input
            className="bg-secondary/90 shadow-none transition-all focus:outline-1 focus:outline-lightBlue"
            placeholder="search here"
            onChange={(e) => setTopicInput(e.target.value)}
            value={topicInput}
          />
          <Search className="absolute right-2 top-2 h-4 w-4" />
        </div>
        <div className="hide-scrollbar flex h-[500px] flex-col gap-2 overflow-y-auto overflow-x-hidden border-b md:h-[300px] lg:h-[350px] 2xl:h-[330px]">
          {loading ? (
            <div className="flex flex-col gap-2">
              <Skeleton className="flex h-10 w-full cursor-pointer flex-row items-center justify-between rounded-lg border border-border bg-secondary/90 p-2 transition-all hover:bg-secondary/80"></Skeleton>
              <Skeleton className="flex h-10 w-full cursor-pointer flex-row items-center justify-between rounded-lg border border-border bg-secondary/90 p-2 transition-all hover:bg-secondary/80"></Skeleton>
            </div>
          ) : (
            <>
              {topicInput.length === 0
                ? Object.entries(presentCategories).map(([category, count]) => {
                    if (count === 0) {
                      return null;
                    }

                    return (
                      <>
                        <div>
                          <div
                            onClick={() =>
                              toggleCategory(category as NoteCategories)
                            }
                            className=" group flex cursor-pointer flex-row items-center justify-between rounded-lg border border-border bg-secondary/90 p-2 transition-all hover:bg-secondary/80"
                          >
                            <div
                              className={`flex flex-row items-center gap-2 text-lg`}
                            >
                              <ChevronRight
                                className={`h-4 w-4 ${
                                  categoryOpenState[category as NoteCategories]
                                    ? "rotate-90"
                                    : ""
                                } transition-all`}
                              />
                              {categoryOpenState[category as NoteCategories] ? (
                                <>
                                  <FolderOpen
                                    className={`h-6 w-6 ${
                                      category === "ENGLISH"
                                        ? "fill-english/50 text-english"
                                        : category === "MATH"
                                        ? "fill-math/50 text-math"
                                        : category === "SCIENCE"
                                        ? "fill-science/50 text-science"
                                        : category === "HISTORY"
                                        ? "fill-history/50 text-history"
                                        : category === "ARTS"
                                        ? "fill-arts/50 text-arts"
                                        : category === "MUSIC"
                                        ? "fill-music/50 text-music"
                                        : category === "LITERATURE"
                                        ? "fill-literature/50 text-literature"
                                        : category === "PHILOSOPHY"
                                        ? "fill-philosophy/50 text-philosophy"
                                        : category === "GEOGRAPHY"
                                        ? "fill-geography/50 text-geography"
                                        : category === "SOCIAL STUDIES"
                                        ? "fill-socialStudies/50 text-socialStudies"
                                        : category === "PHYSICAL EDUCATION"
                                        ? "fill-physicalEducation/50 text-physicalEducation"
                                        : category === "COMPUTER SCIENCE"
                                        ? "fill-computerScience/50 text-computerScience"
                                        : category === "ECONOMICS"
                                        ? "fill-economics/50 text-economics"
                                        : category === "BUSINESS STUDIES"
                                        ? "fill-businessStudies/50 text-businessStudies"
                                        : category === "PSYCHOLOGY"
                                        ? "fill-psychology/50 text-psychology"
                                        : category === "LAW"
                                        ? "fill-law/50 text-law"
                                        : category === "POLITICAL SCIENCE"
                                        ? "fill-politicalScience/50 text-politicalScience"
                                        : category === "ENVIRONMENTAL SCIENCE"
                                        ? "fill-environmentalScience/50 text-environmentalScience"
                                        : category === "ENGINEERING"
                                        ? "fill-engineering/50 text-engineering"
                                        : category === "MEDICINE"
                                        ? "fill-medicine/50 text-medicine"
                                        : category === "AGRICULTURE"
                                        ? "fill-agriculture/50 text-agriculture"
                                        : category === "ASTRONOMY"
                                        ? "fill-astronomy/50 text-astronomy"
                                        : ""
                                    }`}
                                  />
                                </>
                              ) : (
                                <>
                                  <Folder
                                    className={`h-6 w-6 ${
                                      category === "ENGLISH"
                                        ? "fill-english/50 text-english"
                                        : category === "MATH"
                                        ? "fill-math/50 text-math"
                                        : category === "SCIENCE"
                                        ? "fill-science/50 text-science"
                                        : category === "HISTORY"
                                        ? "fill-history/50 text-history"
                                        : category === "ARTS"
                                        ? "fill-arts/50 text-arts"
                                        : category === "MUSIC"
                                        ? "fill-music/50 text-music"
                                        : category === "LITERATURE"
                                        ? "fill-literature/50 text-literature"
                                        : category === "PHILOSOPHY"
                                        ? "fill-philosophy/50 text-philosophy"
                                        : category === "GEOGRAPHY"
                                        ? "fill-geography/50 text-geography"
                                        : category === "SOCIAL STUDIES"
                                        ? "fill-socialStudies/50 text-socialStudies"
                                        : category === "PHYSICAL EDUCATION"
                                        ? "fill-physicalEducation/50 text-physicalEducation"
                                        : category === "COMPUTER SCIENCE"
                                        ? "fill-computerScience/50 text-computerScience"
                                        : category === "ECONOMICS"
                                        ? "fill-economics/50 text-economics"
                                        : category === "BUSINESS STUDIES"
                                        ? "fill-businessStudies/50 text-businessStudies"
                                        : category === "PSYCHOLOGY"
                                        ? "fill-psychology/50 text-psychology"
                                        : category === "LAW"
                                        ? "fill-law/50 text-law"
                                        : category === "POLITICAL SCIENCE"
                                        ? "fill-politicalScience/50 text-politicalScience"
                                        : category === "ENVIRONMENTAL SCIENCE"
                                        ? "fill-environmentalScience/50 text-environmentalScience"
                                        : category === "ENGINEERING"
                                        ? "fill-engineering/50 text-engineering"
                                        : category === "MEDICINE"
                                        ? "fill-medicine/50 text-medicine"
                                        : category === "AGRICULTURE"
                                        ? "fill-agriculture/50 text-agriculture"
                                        : category === "ASTRONOMY"
                                        ? "fill-astronomy/50 text-astronomy"
                                        : ""
                                    }`}
                                  />
                                </>
                              )}
                              {category
                                .toLowerCase()
                                .split(" ")
                                .map(
                                  (word) =>
                                    word.charAt(0).toUpperCase() +
                                    word.slice(1),
                                )
                                .join(" ")}
                            </div>
                            <div className="flex flex-row items-center gap-2 text-base">
                              {count}
                            </div>
                          </div>
                          <div
                            className={`${
                              categoryOpenState[category as NoteCategories]
                                ? ""
                                : "hidden"
                            }`}
                          >
                            <div className="flex flex-col gap-2 py-2">
                              {notes.map((note) => (
                                <>
                                  {note.category === category && (
                                    <HoverCard closeDelay={50} openDelay={500}>
                                      <HoverCardTrigger>
                                        <div className="group flex cursor-pointer flex-row items-center justify-between gap-1 rounded-lg border border-border p-2 transition-all hover:-translate-y-0.5">
                                          <Link
                                            className="flex h-full w-full flex-row items-center gap-4 text-lg"
                                            href={`/signup`}
                                          >
                                            <Image
                                              src={
                                                note.imageUrl ??
                                                "/generating1.gif"
                                              }
                                              className="rounded-lg border fine:hidden"
                                              alt="note image"
                                              width={80}
                                              height={48}
                                            />
                                            <p className="text-lg coarse:hidden">
                                              {note.emoji}
                                            </p>
                                            <p className="text-lg">
                                              {note.title.length > 30
                                                ? `${note.title.slice(
                                                    0,
                                                    30,
                                                  )}...`
                                                : note.title}
                                            </p>
                                          </Link>
                                        </div>
                                      </HoverCardTrigger>
                                      <HoverCardContent
                                        className={` coarse:hidden ${
                                          preloadImagesList.includes(
                                            note.imageUrl!,
                                          )
                                            ? ""
                                            : "hidden"
                                        }`}
                                        align="start"
                                      >
                                        <Link
                                          href={`/signup`}
                                          className="flex flex-col justify-between gap-4 transition-all hover:-translate-y-0.5"
                                        >
                                          <div className="relative">
                                            <Image
                                              className="rounded-lg border border-border"
                                              src={
                                                note.imageUrl ??
                                                "/generating1.gif"
                                              }
                                              alt="image"
                                              width={300}
                                              height={300}
                                            />
                                          </div>

                                          <div className="flex flex-col gap-1 ">
                                            <p className="text-lg">
                                              {note.title}
                                            </p>
                                            <Link
                                              className={buttonVariants()}
                                              href={`/signup`}
                                            >
                                              Create Quiz
                                            </Link>

                                            <div className="flex flex-row items-center gap-1 text-sm text-primary/80">
                                              <Clock className="h-4 w-4" />
                                              <span>
                                                {note.minutes} minute read.
                                              </span>
                                            </div>

                                            <div className="flex">
                                              <Badge
                                                /*@ts-ignore*/
                                                variant={note?.category
                                                  .toLowerCase()
                                                  .split(" ")
                                                  .map((word, index) =>
                                                    index === 0
                                                      ? word
                                                      : word
                                                          .charAt(0)
                                                          .toUpperCase() +
                                                        word.slice(1),
                                                  )
                                                  .join("")}
                                              >
                                                {note?.category}
                                              </Badge>
                                            </div>

                                            <p className="text-xs text-primary/60">
                                              {note.description}
                                            </p>
                                          </div>
                                        </Link>
                                      </HoverCardContent>
                                    </HoverCard>
                                  )}
                                </>
                              ))}
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })
                : Object.entries(activeCategories).map(([category, count]) => {
                    if (count === 0) {
                      return null;
                    }

                    return (
                      <>
                        <div>
                          <div
                            onClick={() =>
                              toggleCategory(category as NoteCategories)
                            }
                            className="group flex cursor-pointer flex-row items-center justify-between rounded-lg border border-border bg-secondary/90 p-2 text-lg transition-all hover:bg-secondary/80"
                          >
                            <div
                              className={` flex flex-row items-center gap-2`}
                            >
                              <ChevronRight
                                className={`h-4 w-4 ${
                                  categoryOpenState[category as NoteCategories]
                                    ? "rotate-90"
                                    : ""
                                } transition-all`}
                              />
                              {categoryOpenState[category as NoteCategories] ? (
                                <>
                                  <FolderOpen
                                    className={`h-6 w-6 ${
                                      category === "ENGLISH"
                                        ? "fill-english/50 text-english"
                                        : category === "MATH"
                                        ? "fill-math/50 text-math"
                                        : category === "SCIENCE"
                                        ? "fill-science/50 text-science"
                                        : category === "HISTORY"
                                        ? "fill-history/50 text-history"
                                        : category === "ARTS"
                                        ? "fill-arts/50 text-arts"
                                        : category === "MUSIC"
                                        ? "fill-music/50 text-music"
                                        : category === "LITERATURE"
                                        ? "fill-literature/50 text-literature"
                                        : category === "PHILOSOPHY"
                                        ? "fill-philosophy/50 text-philosophy"
                                        : category === "GEOGRAPHY"
                                        ? "fill-geography/50 text-geography"
                                        : category === "SOCIAL STUDIES"
                                        ? "fill-socialStudies/50 text-socialStudies"
                                        : category === "PHYSICAL EDUCATION"
                                        ? "fill-physicalEducation/50 text-physicalEducation"
                                        : category === "COMPUTER SCIENCE"
                                        ? "fill-computerScience/50 text-computerScience"
                                        : category === "ECONOMICS"
                                        ? "fill-economics/50 text-economics"
                                        : category === "BUSINESS STUDIES"
                                        ? "fill-businessStudies/50 text-businessStudies"
                                        : category === "PSYCHOLOGY"
                                        ? "fill-psychology/50 text-psychology"
                                        : category === "LAW"
                                        ? "fill-law/50 text-law"
                                        : category === "POLITICAL SCIENCE"
                                        ? "fill-politicalScience/50 text-politicalScience"
                                        : category === "ENVIRONMENTAL SCIENCE"
                                        ? "fill-environmentalScience/50 text-environmentalScience"
                                        : category === "ENGINEERING"
                                        ? "fill-engineering/50 text-engineering"
                                        : category === "MEDICINE"
                                        ? "fill-medicine/50 text-medicine"
                                        : category === "AGRICULTURE"
                                        ? "fill-agriculture/50 text-agriculture"
                                        : category === "ASTRONOMY"
                                        ? "fill-astronomy/50 text-astronomy"
                                        : ""
                                    }`}
                                  />
                                </>
                              ) : (
                                <>
                                  <Folder
                                    className={`h-6 w-6 ${
                                      category === "ENGLISH"
                                        ? "fill-english/50 text-english"
                                        : category === "MATH"
                                        ? "fill-math/50 text-math"
                                        : category === "SCIENCE"
                                        ? "fill-science/50 text-science"
                                        : category === "HISTORY"
                                        ? "fill-history/50 text-history"
                                        : category === "ARTS"
                                        ? "fill-arts/50 text-arts"
                                        : category === "MUSIC"
                                        ? "fill-music/50 text-music"
                                        : category === "LITERATURE"
                                        ? "fill-literature/50 text-literature"
                                        : category === "PHILOSOPHY"
                                        ? "fill-philosophy/50 text-philosophy"
                                        : category === "GEOGRAPHY"
                                        ? "fill-geography/50 text-geography"
                                        : category === "SOCIAL STUDIES"
                                        ? "fill-socialStudies/50 text-socialStudies"
                                        : category === "PHYSICAL EDUCATION"
                                        ? "fill-physicalEducation/50 text-physicalEducation"
                                        : category === "COMPUTER SCIENCE"
                                        ? "fill-computerScience/50 text-computerScience"
                                        : category === "ECONOMICS"
                                        ? "fill-economics/50 text-economics"
                                        : category === "BUSINESS STUDIES"
                                        ? "fill-businessStudies/50 text-businessStudies"
                                        : category === "PSYCHOLOGY"
                                        ? "fill-psychology/50 text-psychology"
                                        : category === "LAW"
                                        ? "fill-law/50 text-law"
                                        : category === "POLITICAL SCIENCE"
                                        ? "fill-politicalScience/50 text-politicalScience"
                                        : category === "ENVIRONMENTAL SCIENCE"
                                        ? "fill-environmentalScience/50 text-environmentalScience"
                                        : category === "ENGINEERING"
                                        ? "fill-engineering/50 text-engineering"
                                        : category === "MEDICINE"
                                        ? "fill-medicine/50 text-medicine"
                                        : category === "AGRICULTURE"
                                        ? "fill-agriculture/50 text-agriculture"
                                        : category === "ASTRONOMY"
                                        ? "fill-astronomy/50 text-astronomy"
                                        : ""
                                    }`}
                                  />
                                </>
                              )}
                              <p className="text-lg">
                                {category
                                  .toLowerCase()
                                  .split(" ")
                                  .map(
                                    (word) =>
                                      word.charAt(0).toUpperCase() +
                                      word.slice(1),
                                  )
                                  .join(" ")}
                              </p>
                            </div>
                            <div className="flex flex-row items-center gap-2 text-base">
                              {count}
                            </div>
                          </div>
                          <div
                            className={`${
                              categoryOpenState[category as NoteCategories]
                                ? ""
                                : "hidden"
                            }`}
                          >
                            <div className="flex flex-col gap-2 py-2">
                              {filteredNotes.map((note) => (
                                <>
                                  {note.category === category && (
                                    <HoverCard closeDelay={50} openDelay={500}>
                                      <HoverCardTrigger>
                                        <div className="group flex cursor-pointer flex-row items-center justify-between gap-1 rounded-lg border border-border p-2 transition-all hover:-translate-y-0.5">
                                          <Link
                                            className="flex h-full w-full flex-row items-center gap-4 text-lg"
                                            href={`/signup`}
                                          >
                                            <Image
                                              src={
                                                note.imageUrl ??
                                                "/generating1.gif"
                                              }
                                              className="rounded-lg border fine:hidden"
                                              alt="note image"
                                              width={80}
                                              height={48}
                                            />
                                            <p className="text-lg coarse:hidden">
                                              {note.emoji}
                                            </p>
                                            <p className="text-lg">
                                              {note.title.length > 30
                                                ? `${note.title.slice(
                                                    0,
                                                    30,
                                                  )}...`
                                                : note.title}
                                            </p>
                                          </Link>
                                        </div>
                                      </HoverCardTrigger>
                                      <HoverCardContent
                                        className={`coarse:hidden ${
                                          preloadImagesList.includes(
                                            note.imageUrl!,
                                          )
                                            ? ""
                                            : "hidden"
                                        }`}
                                        align="start"
                                      >
                                        <Link
                                          href={`/signup`}
                                          className="flex flex-col justify-between gap-4 transition-all hover:-translate-y-0.5"
                                        >
                                          <div className="relative">
                                            <Image
                                              className="rounded-lg border border-border"
                                              src={
                                                note.imageUrl ??
                                                "/generating1.gif"
                                              }
                                              alt="image"
                                              width={300}
                                              height={300}
                                            />
                                          </div>

                                          <div className="flex flex-col gap-1 ">
                                            <p className="text-lg">
                                              {note.title}
                                            </p>
                                            <Link
                                              className={buttonVariants()}
                                              href={`/signup`}
                                            >
                                              Create Quiz
                                            </Link>

                                            <div className="flex flex-row items-center gap-1 text-sm text-primary/80">
                                              <Clock className="h-4 w-4" />
                                              <span>
                                                {note.minutes} minute read.
                                              </span>
                                            </div>

                                            <div className="flex">
                                              <Badge
                                                /*@ts-ignore*/
                                                variant={note?.category
                                                  .toLowerCase()
                                                  .split(" ")
                                                  .map((word, index) =>
                                                    index === 0
                                                      ? word
                                                      : word
                                                          .charAt(0)
                                                          .toUpperCase() +
                                                        word.slice(1),
                                                  )
                                                  .join("")}
                                              >
                                                {note?.category}
                                              </Badge>
                                            </div>

                                            <p className="text-xs text-primary/60">
                                              {note.description}
                                            </p>
                                          </div>
                                        </Link>
                                      </HoverCardContent>
                                    </HoverCard>
                                  )}
                                </>
                              ))}
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
            </>
          )}

          {/* {notes.length === 0 && !loading && (
            <div className="flex flex-col items-center gap-2">
              <p className="text-xl">no notes.</p>
              <Image
                src={"/sadface.png"}
                width={48}
                height={48}
                alt="sad face"
              />
            </div>
          )} */}
        </div>
      </div>
      {preloadImages &&
        notes.map((note) => {
          return (
            <div key={note.id} className="h-0 w-0 opacity-0">
              <Image
                src={note.imageUrl ?? "/generating1.gif"}
                alt="Preload image"
                width={300}
                height={300}
                className=""
                onLoad={() => {
                  setPreloadImagesList((prevState) => [
                    ...prevState,
                    note.imageUrl!,
                  ]);
                }}
              />
            </div>
          );
        })}
    </div>
  );
}
