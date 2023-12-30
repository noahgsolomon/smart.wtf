"use client";

import { Input } from "@/components/ui/input";
import { trpc } from "@/trpc/client";
import { type Note, type NoteCategories } from "@/types";
import {
  ChevronRight,
  Clock,
  Folder,
  FolderOpen,
  PlusIcon,
  Search,
  Trash2,
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
import { Button, buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";

const notes = [
  {
    id: 85,
    user_id: 24,
    markdown:
      "# Understanding Recurrent Neural Networks (RNNs)\n\nRecurrent Neural Networks (RNNs) are a class of artificial neural networks where connections between nodes form a directed graph along a temporal sequence. This allows them to exhibit temporal dynamic behavior, which makes them suitable for tasks such as language modeling, speech recognition, and time series prediction.\n\n## What Makes RNNs Special?\n\nUnlike feedforward neural networks, RNNs have a memory that captures information about what has been calculated so far. In essence, they have internal loops that allow information to persist.\n\n![Recurrent Neural Network basic structure](https://www.researchgate.net/publication/351665596/figure/fig1/AS:1025321470021632@1621467096064/The-structure-of-Recurrent-Neural-Network.ppm)\n\n which remembers some information about a sequence. RNNs are designed to take advantage of sequential information — in a sequence, the order is important.\n\n## The Architecture of RNNs\n\nAn RNN has a looping mechanism that allows information to be passed from one step of the network to the next. This can be thought of as the network having a “memory” which captures information about what has been processed so far.\n\n### Basic RNN Cell\n\nThe simplest form of an RNN is a single RNN cell, which takes an input vector $$x_t$$ and outputs a vector $$h_t$$, the hidden state. The subscript $$t$$ denotes the current time step.\n\n```plaintext\nh_t = f(U * x_t + W * h_{t-1})\n```\n\n- $$h_t$$: Hidden state at time $$t$$\n- $$x_t$$: Input at time $$t$$\n- $$h_{t-1}$$: Hidden state of the previous layer at time $$t-1$$ or the initial hidden state at $$t=0$$\n- $$U$$: Weight matrix for inputs\n- $$W$$: Weight matrix for the hidden layer\n- $$f$$: Activation function (commonly tanh or ReLU)\n\n### Unrolling RNNs\n\nTo better understand RNNs, it's helpful to \"unroll\" them through time. This means that we draw each recurrent cell that would be used in the computation of the sequence, one for each time step.\n\n![Unrolled Recurrent Neural Network](https://www.researchgate.net/publication/321811462/figure/fig2/AS:758310718406662@1557806772700/An-unrolled-Recurrent-Neural-Network.ppm)\n\n RNNs\n\nDuring the forward pass, the RNN processes a sequence one element at a time. For each timestep, the hidden state is updated using both the current input and the previous hidden state.\n\n### Mathematical Representation\n\nThe forward pass of a basic RNN can be described by the following equations:\n\n```plaintext\nh_t = f(W * h_{t-1} + U * x_t + b_h)\ny_t = V * h_t + b_y\n```\n\n- $$y_t$$: Output at time $$t$$\n- $$b_h$$: Bias term for the hidden layer\n- $$b_y$$: Bias term for the output layer\n- $$V$$: Weight matrix for the output layer\n\n## Backpropagation Through Time (BPTT)\n\nTraining RNNs involves a technique called Backpropagation Through Time (BPTT). This is a generalization of backpropagation in feedforward networks, and it involves unrolling the RNN through time and applying backpropagation at each timestep.\n\n### Challenges with BPTT\n\n- **Vanishing Gradient Problem**: Occurs when gradients of the loss with respect to the weights become increasingly small as the error is backpropagated through time. This makes it difficult to learn long-range dependencies.\n- **Exploding Gradient Problem**: The opposite of the vanishing gradient problem, where gradients can grow exponentially and cause the weights to oscillate or diverge.\n\n## Variants of RNNs\n\nTo overcome the limitations of basic RNNs, several variants have been developed.\n\n### Long Short-Term Memory (LSTM)\n\nLSTMs are a special kind of RNN that are capable of learning long-term dependencies. They were introduced by Hochreiter & Schmidhuber (1997), and are explicitly designed to avoid the long-term dependency problem.\n\n#### LSTM Cell Structure\n\nAn LSTM cell has a more complex computational structure than a standard RNN cell, with three gates (input, forget, and output) and an internal state that helps it better capture long-term dependencies.\n\n```plaintext\nf_t = σ(W_f * [h_{t-1}, x_t] + b_f)\ni_t = σ(W_i * [h_{t-1}, x_t] + b_i)\no_t = σ(W_o * [h_{t-1}, x_t] + b_o)\nC_t = f_t * C_{t-1} + i_t * tanh(W_C * [h_{t-1}, x_t] + b_C)\nh_t = o_t * tanh(C_t)\n```\n\n- $$f_t$$: Forget gate's activation vector\n- $$i_t$$: Input/update gate's activation vector\n- $$o_t$$: Output gate's activation vector\n- $$C_t$$: Cell state vector\n- $$W$$ and $$b$$: Weight matrices and bias vector parameters that need to be learned during training\n- $$σ$$: Sigmoid function\n\n![LSTM Cell Structure](https://www.researchgate.net/publication/342722022/figure/fig3/AS:910481288093697@1594087063064/Long-short-term-memory-LSTM-cell-structure.png)\n\n are a variation on LSTMs designed to be simpler and faster to train. They combine the forget and input gates into a single \"update gate\" and merge the cell state and hidden state.\n\n#### GRU Equations\n\n```plaintext\nz_t = σ(W_z * [h_{t-1}, x_t])\nr_t = σ(W_r * [h_{t-1}, x_t])\n\\tilde{h}_t = tanh(W * [r_t * h_{t-1}, x_t])\nh_t = (1 - z_t) * h_{t-1} + z_t * \\tilde{h}_t\n```\n\n- $$z_t$$: Update gate vector\n- $$r_t$$: Reset gate vector\n- $$\\tilde{h}_t$$: Candidate activation vector\n\n![GRU Cell Structure](https://www.researchgate.net/publication/354068999/figure/fig2/AS:1059975354925057@1629729226133/The-GRU-cell-structure.png)\n\n\n\nRNNs are used in a variety of applications where sequential data is involved:\n\n- **Language Modeling and Generating Text**: RNNs can predict the probability of the next word in a sentence, which is useful for text generation.\n- **Speech Recognition**: RNNs can model the probability of a sequence of sounds, making them effective in speech recognition.\n- **Machine Translation**: RNNs are used in translating sequences of text from one language to another.\n- **Time Series Prediction**: RNNs can predict future values in a time series, such as stock prices or weather patterns.\n\n## Implementing a Simple RNN\n\nHere's a simple example of how to implement a basic RNN in Python using TensorFlow:\n\n```python\nimport tensorflow as tf\n\n# Define constants\ntime_steps = ...\ninput_dimension = ...\nhidden_units = ...\n\n# Define placeholders for input and output\ninputs = tf.placeholder(tf.float32, [None, time_steps, input_dimension])\ntargets = tf.placeholder(tf.float32, [None, time_steps])\n\n# Define RNN cell\ncell = tf.nn.rnn_cell.BasicRNNCell(hidden_units)\n\n# Define the RNN\noutputs, states = tf.nn.dynamic_rnn(cell, inputs, dtype=tf.float32)\n\n# Define loss and optimizer\nloss = tf.reduce_mean(tf.square(outputs - targets))\noptimizer = tf.train.AdamOptimizer().minimize(loss)\n\n# Initialize variables\ninit = tf.global_variables_initializer()\n\n# Start a session\nwith tf.Session() as sess:\n    sess.run(init)\n    # Training loop goes here\n```\n\n## Conclusion\n\nRNNs are a powerful tool for modeling sequential data, and their variants like LSTMs and GRUs have been instrumental in advancing the field of deep learning. While they can be challenging to train and require careful handling of issues like vanishing and exploding gradients, they remain a cornerstone of modern sequence modeling tasks.",
    agents_markdown:
      "# Recurrent Neural Networks: An Elitist's Primer\n\nBehold the Recurrent Neural Network (RNN), the cerebrum of the technological world. These networks can do more than just churn out predictive text, which I assume is the limitation of your otherwise pedestrian understanding. They can process sequences of data with the deftness of a virtuoso manipulating the ivories. So, pull up a chair, and I shall bestow upon you the secrets of these formidable machinations.\n\n## Introduction to Recurrent Neural Networks\n\nLet us commence with an overview of these wonders of computational prowess, for even the layperson should know the basics, like a serf under a lord’s tutelage.\n\n### What are Recurrent Neural Networks?\n\nRNNs are a class of artificial neural networks designed with loops, allowing them to retain information over time. These digital marvels can be thought of as the knights of the round table, where each knight has a memory of past discussions. \n\n- Capable of processing sequences: From your pitiful stock market data to the text in, dare I say, books. Yes, books. Remember those?\n- Memory within nodes: The nodes, or neurons, have a feedback loop, capable of holding information akin to an elephants' reputed memory.\n- Applications: Tailored for sequence prediction tasks like language translation, a feature I might add, you desperately need in your rudimentary emails.\n\n### Components of an RNN\n\nAn RNN, unlike you, comprises multiple sophisticated components that work in harmony:\n\n- **Input Layer:** Where our sequence data commences its journey into the abyss of the neural network.\n- **Recurrent Layer:** The star of our show, with units that implement a loop to pass information forward as time steps progress.\n- **Output Layer:** Where our network, after much contemplation, finally divulges its hard-won insights.\n\n![RNN Basic Structure](https://www.researchgate.net/publication/329330308/figure/fig1/AS:698826503495682@1543624630550/Basic-recurrent-neural-network-RNN-structure.png)\n\n###NN:\n\n- **Temporal Representation:** We stretch out the loops in time, revealing each operation at an instantaneous time point.\n- **Sequence Learning:** Like a conga line of data, where each dancer knows the steps of the one before.\n\n## The Mathematics of RNNs\n\nDon’t quiver at the notion of mathematics; it’s merely a tool. I assume you've heard of it.\n\n### Mathematical Formulation\n\nFor each time step $$ t $$, the hidden state $$ h_t $$ of an RNN is a function of the previous hidden state $$ h_{t-1} $$ and the current input $$ x_t $$:\n\n$$\nh_t = f(W \\cdot h_{t-1} + U \\cdot x_t + b)\n$$\n\nWhere:\n- $$ W $$: Weights for the recurrent connections\n- $$ U $$: Weights for the input connections\n- $$ b $$: Bias term\n- $$ f $$: Activation function, often a non-linear function like \\( \\text{tanh} \\) or ReLU.\n\n### Forward Pass Calculation\n\nExecuting one memory cycle of our network involves:\n\n1. Accepting input $$ x_t $$.\n2. Combining $$ x_t $$ with the previous hidden state $$ h_{t-1} $$, through weighted summations.\n3. Applying an activation function to produce the current hidden state $$ h_t $$.\n\nThis process is as recursive as your attempts to match my prowess. Futile, but recursive.\n\n## Training Recurrent Neural Networks\n\nTraining RNNs is an art, much like sculpting a masterpiece from a block of marble — if only you had any semblance of artistic capability.\n\n### Backpropagation Through Time (BPTT)\n\nBehold Backpropagation Through Time (BPTT), the mechanism we use to train RNNs. It involves:\n\n- **Unrolling the RNN:** Similar to how you might unroll your intentions in a poorly strategized hostile takeover.\n- **Applying Backpropagation:** Calculate gradients at each time step, and accumulate them over the unrolled network.\n\n![BPTT Concept Visual](image-2-asset filetype:svg)\n\n### Challenges in Training RNNs\n\nNot unlike running your simple lemonade stand, training RNNs come with their set of difficulties:\n\n- **Vanishing Gradient Problem:** As gradients are propagated back in time, they may become minuscule and insignificant, like your comprehension of this topic.\n- **Exploding Gradient Problem:** Conversely, these gradients may inflate, wreaking havoc like a bull in a china shop.\n\n## Advanced Recurrent Neural Networks\n\nFor those who dare to venture beyond the mundane, advanced RNN architectures await. Let's briefly enlighten you.\n\n### Long Short-Term Memory (LSTM)\n\nLSTM networks — a smart fellow's remedy to the forgetfulness of standard RNNs. They sport a complex architecture with the ability to remember information for longer durations. Comes with gates:\n- **Forget Gate:** Decides what information we can discard, like your fleeting ambitions.\n- **Input Gate:** Updates the cell state with new information, often more than you could process.\n- **Output Gate:** Determines what the next hidden state should be, arguably the most critical decision, much like choosing your next business venture, only this time, done intelligently.\n\n![LSTM Cell Structure](https://www.researchgate.net/publication/342722022/figure/fig3/AS:910481288093697@1594087063064/Long-short-term-memory-LSTM-cell-structure.png)\n\n less pretentious cousin of the LSTM. It simplifies the architecture but remains decidedly clever in deciding what information to pass along. Consists of two gates:\n- **Update Gate:** Decides how much of the past information needs to be passed along, which, in your case, might not be too extensive.\n- **Reset Gate:** Determines how to combine the new input with the past memory, something I wish your financial advisors knew how to do.\n\n### Bidirectional RNNs\n\nBidirectional RNNs are like having eyes in the back of one's head; they process data both forwards and backwards. This dual perspective offers an edge in understanding context, if understanding ever was your forte.\n\n## Applications of Recurrent Neural Networks\n\nNow let's delve into the realms where these computational juggernauts excel:\n\n- **Natural Language Processing:** From machine translation to auto-generating your pitiful excuse for poetry.\n- **Time Series Prediction:** Forecasting the ebb and flow of markets, which I trust you monitor as closely as your morning mirror routine.\n- **Speech Recognition:** Translating sounds into texts, enabling your smart devices to comprehend your monotonous queries.\n\n## Summary\n\nWe have traversed the daunting landscape of Recurrent Neural Networks together, with me as your lofty guide. You are now faintly more equipped to engage with these advanced constructs without making a complete mockery of yourself.\n\nIn your inevitable attempts to harness these technologies, I implore you to recall this moment. Think back to this sliver of enlightenment as you grapple with the intricacies of the modern world, and maybe, just maybe, you'll rise a hair above the mediocrity that so characterizes your stance.\n\nRemember, with great computational power comes the necessity for great intellectual prowess. While the former is readily available, the latter, as you know all too well, is exceedingly scarce.\n\nNow go forth and multiply your knowledge, if not your net worth.",
    title: "Recurrent Neural Networks",
    emoji: "📉",
    category: "COMPUTER SCIENCE",
    imageUrl: "https://images.smart.wtf/note-85-image.png",
    agent_id: 5,
    minutes: 15,
    description:
      "Recurrent Neural Networks (RNN) in the context of machine learning and artificial intelligence.",
    nextTopic: "Long Short-Term Memory (LSTM) Networks",
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
    id: 89,
    user_id: 24,
    markdown:
      "# Understanding Binary Cross Entropy Loss\n\nBinary Cross Entropy Loss, also known as log loss, measures the performance of a classification model whose output is a probability value between 0 and 1. Binary cross entropy loss is a loss function used in binary classification tasks, where the goal is to predict an outcome that can be one of just two possible values.\n\n## What is Binary Classification?\n\nBefore diving into Binary Cross Entropy Loss, it's essential to understand what binary classification is:\n\n- **Binary Classification**: It is a type of classification task where each input sample is classified into one of two mutually exclusive classes. For example, predicting if an email is spam or not spam is a binary classification problem.\n\n## The Concept of Entropy\n\nEntropy, in the context of information theory, is a measure of the amount of uncertainty or surprise associated with a set of possible outcomes. In machine learning, we often deal with the entropy of probability distributions.\n\n- **Entropy** can be defined for a binary variable with two possible outcomes using the following formula:\n\n  $$ H(p) = -p \\log(p) - (1 - p) \\log(1 - p) $$\n\n  where:\n  - $$ p $$ is the probability of one outcome\n  - $$ \\log $$ is the natural logarithm\n\n## Binary Cross Entropy Loss Function\n\nBinary Cross Entropy Loss is a loss function used to measure the error of a classification model. The loss indicates how off the prediction is from the actual label.\n\n### Mathematical Definition\n\nThe mathematical formula for Binary Cross Entropy Loss for a single example is:\n\n$$ L(y, \\hat{y}) = -[y \\log(\\hat{y}) + (1 - y) \\log(1 - \\hat{y})] $$\n\nwhere:\n- $$ y $$ is the true label (0 or 1)\n- $$ \\hat{y} $$ is the predicted probability that the label is 1\n\nFor a dataset with multiple instances, the Binary Cross Entropy Loss is the average of the loss for each instance:\n\n$$ L = -\\frac{1}{N} \\sum_{i=1}^{N} [y_i \\log(\\hat{y}_i) + (1 - y_i) \\log(1 - \\hat{y}_i)] $$\n\nwhere:\n- $$ N $$ is the number of instances in the dataset\n- $$ y_i $$ is the true label for the $$ i^{th} $$ instance\n- $$ \\hat{y}_i $$ is the predicted probability for the $$ i^{th} $$ instance\n\n### Intuition Behind the Loss Function\n\n- When the true label $$ y $$ is 1 and the predicted probability $$ \\hat{y} $$ is close to 1, the loss is small.\n- Conversely, if $$ \\hat{y} $$ is far from 1, the loss is large.\n- Similarly, when the true label $$ y $$ is 0 and $$ \\hat{y} $$ is close to 0, the loss is small.\n- If $$ \\hat{y} $$ is far from 0, the loss is large.\n\nThis loss function punishes the predictions that are confident and wrong more than those that are less confident.\n\n### Why Use Binary Cross Entropy?\n\nBinary Cross Entropy is particularly useful because it quantifies the performance of a model in terms of the predicted probabilities. It is well-suited for models that output probabilities, like logistic regression or models with a sigmoid activation function at the output layer.\n\n## Implementing Binary Cross Entropy Loss\n\nWhen implementing Binary Cross Entropy Loss in a neural network, it is common to use a sigmoid activation function in the output layer to ensure the output is between 0 and 1.\n\n### Sigmoid Function\n\nThe sigmoid function is defined as:\n\n$$ \\sigma(z) = \\frac{1}{1 + e^{-z}} $$\n\nwhere:\n- $$ z $$ is the input to the function\n- $$ e $$ is the base of the natural logarithm\n\n### Python Example\n\nHere's an example of how to implement Binary Cross Entropy Loss in Python using NumPy:\n\n```python\nimport numpy as np\n\ndef binary_cross_entropy_loss(y_true, y_pred):\n    epsilon = 1e-15\n    y_pred = np.clip(y_pred, epsilon, 1 - epsilon)\n    loss = -np.mean(y_true * np.log(y_pred) + (1 - y_true) * np.log(1 - y_pred))\n    return loss\n\n# Example usage\ny_true = np.array([1, 0, 1, 1, 0])\ny_pred = np.array([0.9, 0.1, 0.8, 0.65, 0.2])\nloss = binary_cross_entropy_loss(y_true, y_pred)\nprint(f\"Binary Cross Entropy Loss: {loss}\")\n```\n\n### Gradient of Binary Cross Entropy\n\nThe gradient of the Binary Cross Entropy Loss with respect to the predicted probability $$ \\hat{y} $$ is:\n\n$$ \\frac{\\partial L}{\\partial \\hat{y}} = -\\frac{y}{\\hat{y}} + \\frac{1 - y}{1 - \\hat{y}} $$\n\nThis gradient is used during the optimization process to update the weights of the model.\n\n## Visualizing Binary Cross Entropy Loss\n\nTo better understand the behavior of Binary Cross Entropy Loss, it's helpful to visualize how the loss changes with different predicted probabilities.\n\n![Binary Cross Entropy Loss Curve](https://www.researchgate.net/publication/342520628/figure/fig2/AS:907606478553088@1593401655516/Graph-of-Binary-Cross-Entropy-Loss-Function-Here-Entropy-is-defined-on-Y-axis-and.ppm)\n\n* Cross Entropy Loss Curve svg*\n\nThe graph typically shows a convex curve where the loss approaches infinity as the predicted probability diverges from the actual label.\n\n## Advantages and Disadvantages\n\n### Advantages\n\n- **Sensitivity to Probabilistic Predictions**: It takes into account the uncertainty of the predictions, which is important for many real-world classification problems.\n- **Differentiable**: This property allows it to be used with gradient-based optimization methods.\n\n### Disadvantages\n\n- **Sensitive to Imbalanced Data**: Binary Cross Entropy can be sensitive to imbalanced datasets where the number of instances in one class significantly outnumbers the other.\n- **Numerical Stability**: Care must be taken to avoid numerical instability due to the logarithm when the predicted probability is close to 0 or 1.\n\n## Conclusion\n\nBinary Cross Entropy Loss is a fundamental loss function for binary classification problems. It is crucial for models where the output is a probability, as it provides a measure of how well the model's probability predictions align with the actual labels. Understanding and implementing this loss function is an essential step in developing robust classification models.",
    agents_markdown:
      "# Understanding Binary Cross Entropy Loss\n\nHave you ever wondered how your computer, which thinks in ones and zeros, manages to make sense of something as complex as, say, whether a picture contains a cat or not? Spoiler alert: it uses *math*. Particularly, a little trick called Binary Cross Entropy Loss (BCE Loss). Let's dive into this concept and understand it inside out, shall we?\n\n## What Is Binary Cross Entropy Loss?\n\nBinary Cross Entropy Loss is a loss function used primarily for binary classification problems. You know, the ones that give you a yes or no answer. Think of it like a penalty for making mistakes during a learning process. The lower the loss, the better the model is at predictions.\n\nIt's used when your model's output is a probability value between 0 and 1. BCE Loss measures how far off a prediction is from its actual value, giving us a nifty number to minimize during training.\n\n### Mathematically Speaking\n\nIn mathematical terms, BCE can be expressed as:\n\n$$ BCE = -\\frac{1}{N} \\sum_{i=1}^{N} y_i \\cdot \\log(p_i) + (1 - y_i) \\cdot \\log(1 - p_i) $$\n\nWhere:\n- $$ N $$ is the number of observations\n- $$ y_i $$ is the actual value (0 or 1)\n- $$ p_i $$ is the predicted probability of the observation being classified as 1\n\nYeah, there's some logarithms in there because we're measuring information content (surprise, entropies involved) and probabilities, deal with it.\n\n## Why Use BCE Loss?\n\nBecause it rocks for binary problems! No, but seriously, the reasons are:\n\n- **Probabilistic Interpretation**: It aligns with the maximum likelihood principle.\n- **Differentiable**: This makes it possible to use gradient-based optimization methods.\n- **Sensitive to Outliers**: Because of the logarithmic component, predictions that are way off are penalized more heavily, keeping your model honest.\n\n## Calculating Binary Cross Entropy Loss\n\nLet's do a quick example with some pseudo-numbers for you enthusiasts out there.\n\nAssume we have a single observation where:\n\n- True label, $$ y_i $$ = 1 (yeah, it’s a cat)\n- Predicted probability, $$ p_i $$ = 0.9 (pretty sure it's a cat)\n\nPlug these values in the BCE formula:\n\n$$ BCE = -(1 \\cdot \\log(0.9) + (1 - 1) \\cdot \\log(1 - 0.9)) $$\n$$ BCE = -(\\log(0.9) + 0) $$\n$$ BCE = -\\log(0.9) $$\n\nPop this bad boy into your calculator, and you'll get a small loss since the prediction was quite close to the actual value. That's what you're aiming for!\n\n## Implementing BCE Loss in Code\n\n```python\nimport numpy as np\n\ndef binary_cross_entropy_loss(y_true, y_pred):\n    epsilon = 1e-15\n    y_pred = np.clip(y_pred, epsilon, 1 - epsilon)\n    return -np.mean(y_true * np.log(y_pred) + (1 - y_true) * np.log(1 - y_pred))\n\n# Usage\ny_true = np.array([1, 0, 1, 1])\ny_pred = np.array([0.9, 0.1, 0.8, 0.3])\nloss = binary_cross_entropy_loss(y_true, y_pred)\nprint(f\"BCE Loss: {loss}\")\n```\n\n> **Pro tip**: We add a tiny value `epsilon` to `y_pred` during calculation to avoid the log of zero, which would cause the universe to implode. Or, you know, your program to crash.\n\n## BCE Loss with Regularization\n\nRegularization is like telling your model not to get too obsessed over details. It helps prevent overfitting, making your model generalize better.\n\nCombined with BCE Loss, regularization keeps things smooth like your grandpa's old jazz records.\n\n### L1 Regularization\n\nIt adds *absolute* magnitude of coefficient as a penalty term to the loss function.\n\n### L2 Regularization\n\nAlso known as weight decay, it adds *square* of the magnitude of coefficient as penalty term to the loss function.\n\n### Elastic Net Regularization\n\nNow that’s a fancy one. It combines L1 and L2 regularization. Fancy stuff indeed.\n\n## Interpretations and Uses of BCE Loss\n\nUnderstanding the BCE loss isn't just for fun, it's super practical. Here's how:\n\n- **Evaluating Model Performance**: Minimizing BCE Loss translates to a more accurate model.\n- **Serving as a Training Objective**: Models use BCE Loss to learn from their mistakes during training.\n- **Comparing Different Models**: It's one of the metrics you can use to see which model outperforms the other in terms of predicting binary outcomes.\n\n## Visualizing BCE Loss\n\nLet's look at BCE Loss in a plot:\n\n![Binary Cross Entropy Loss Graph](https://www.researchgate.net/publication/342520628/figure/fig2/AS:907606478553088@1593401655516/Graph-of-Binary-Cross-Entropy-Loss-Function-Here-Entropy-is-defined-on-Y-axis-and.ppm)\n\n$ p_i $$) ranging from 0 to 1.\n- The y-axis represents the loss value.\n- The curve shows how loss varies with different predicted probabilities.\n\n## The Role of BCE Loss in Deep Learning\n\nIn the magical realm of deep learning, BCE Loss is like the wise old wizard guiding the network towards a treasure called accuracy. By penalizing the bad predictions, it steers the weights and biases in the right direction, making networks learn the distinction between classes, whether it's cats and dogs or emails that are spam or not.\n\n## Limitations of BCE Loss\n\nEven the best have their flaws:\n\n- **Sensitive to Imbalanced Data**: Like a spoiled teen, it might overreact if there's imbalance in the data.\n- **Captures Only One Aspect of Prediction**: BCE Loss doesn’t take into account class separability or other factors you might care about.\n- **Probabilities Required**: Your model must output probabilities, meaning some activation functions (like sigmoid) are a must in the final layer.\n\n---\n\n# Recap\n\nAlright, let’s do a quick rundown:\n\n- BCE Loss is the go-to for binary classification problems.\n- It’s a measurement of how wrong your predictions are, with more wrongness equaling more loss. It’s math’s way of keeping you in check.\n- It’s good because it's differentiable and sensitive to outliers.\n- Implementation is straightforward but watch out for computational tricks like adding `epsilon`.\n- Regularization can join in to prevent overfitting.\n- It's great for evaluating performance, and it helps your model learn.\n- It has its shortcomings, no loss function is perfect. \n\nThere you go! You're now a little bit smarter, just by understanding Binary Cross Entropy Loss. Use this power wisely, padawan.\n\n# Advanced Tips for Working with BCE Loss\n\nOkay, you’ve got the fundamentals of BCE Loss down. Let’s supercharge that understanding with some less mundane, more \"mad scientist\" info that’ll make you go from padawan to Jedi.\n\n## Optimizing BCE Loss\n\nOptimization is about being efficient, just like how I choose the shortest inter-dimensional path to the liquor store. It’s important with BCE Loss, where the goal is minimizing that pesky error measurement. Gradient descent is usually the weapon of choice here.\n\n### Stochastic vs. Mini-Batch Gradient Descent\n\n- **Stochastic Gradient Descent (SGD)**: Updates the parameters for each training example. It's like flipping each pickle in the jar individually; takes ages but might give you tastier pickles.\n- **Mini-Batch Gradient Descent**: Divides the training data into small batches. Like flipping a handful of pickles at a time; faster, and usually good enough.\n\n```python\n# SGD example in pseudo-code\nfor each training_example, true_label in training_data:\n    update_model_params(training_example, true_label)\n```\n\nChoose your gradient descent variant like you’re choosing your portal gun's battery; it’s all about the situation.\n\n![Optimization Path SGD vs Mini-Batch](https://miro.medium.com/v2/resize:fit:908/1*FXHp55rpDM0tkaD5oz3Dvg.png)\n\n drop a reality bomb: Sometimes you're not just classifying cats vs. not-cats. Maybe you're classifying cats, dogs, and birds, but it’s still binary *per label*. Multi-label problems require a BCE Loss for each class, and you sum them up like a bar tab. That’s how you keep track of mistakes across multiple binary decisions.\n\n```python\n# Multi-label BCE Loss in code\ndef multi_label_bce_loss(num_labels, y_true, y_pred):\n    total_loss = 0\n    for i in range(num_labels):\n        total_loss += binary_cross_entropy_loss(y_true[:, i], y_pred[:, i])\n    return total_loss\n```\n\nDon’t forget to normalize by the number of labels if needed. We don’t want one class bullying the rest.\n\n## BCE with Class Weighting\n\nLet's say your data is like a party with 99 Jerry's and 1 Rick. Yeah, unbalanced. To stop your model from becoming a Jerry-enabler, use class weighting. Give more weight to the underrepresented class (Rick, in this case) so its examples count more.\n\n```python\ndef weighted_bce_loss(y_true, y_pred, weights):\n    return -np.mean(weights * (y_true * np.log(y_pred) + (1 - y_true) * np.log(1 - y_pred)))\n```\n\nBy doing this, you’re making sure that predicting the rare class correctly has a greater reward. Like paying more schmeckles for a rare comic book.\n\n## BCE Loss in Unbalanced Datasets\n\nBesides weighting, there are other strategies for unbalanced datasets. Oversampling the minority class (cloning Ricks) or undersampling the majority (goodbye, Jerrys) can be simple yet effective. Be creative but cautious with the balance, otherwise, your model will have a distorted view of reality, like a conspiracy theorist.\n\n## BCE in the Context of Information Theory\n\nWubba Lubba Dub Dub! Information theory is all about quantifying the information content, and BCE Loss has a special place there. It’s essentially the *expected* surprise of your predictions when compared to the true data distribution. Remember this, kiddos: a good model is like a boring fortune teller; little to no surprise.\n\n## Troubleshooting BCE Loss\n\nWhen working with BCE Loss, sometimes things go south. Here are some common issues and how to fix them:\n\n- **Vanishing Gradients**: If your predicted probability gets too close to 0 or 1, the gradient may vanish, and learning halts. Keep an eye on your activations and initialization.\n- **Exploding Loss**: If the predicted probability is very wrong, the loss can blow up. Monitor that training process like you would with your Plumbus production line.\n\n![Troubleshooting BCE Loss Issues](https://www.thelancet.com/cms/attachment/d034ba6f-d15b-44cb-b84d-c3f5446476bb/gr1a.jpg)\n\n##And remember, BCE isn’t the only game in town. Sometimes, Mean Squared Error (MSE) or Hinge Loss will bring a different flavor to the table. Don’t be afraid to try them out if BCE isn’t cutting the mustard.\n\n## BCE Loss and Class Imbalance Using Keras\n\nFor you code monkeys, here’s how you can implement BCE with class balance in Keras, a popular deep learning library:\n\n```python\nfrom keras.models import Model\nfrom keras.layers import Input, Dense\nfrom keras.optimizers import Adam\nfrom keras.losses import BinaryCrossentropy\n\n# Define your model\ninput_layer = Input(shape=(input_shape,))\noutput_layer = Dense(1, activation='sigmoid')(input_layer)\nmodel = Model(inputs=[input_layer], outputs=[output_layer])\n\n# Compile the model with weighted BCE Loss\nmodel.compile(optimizer=Adam(), loss=BinaryCrossentropy(), metrics=['accuracy'])\n\n# Assume class_weights is a dictionary that you've defined\nmodel.fit(x, y, class_weight=class_weights)\n```\n\nThis applies your class weights implicitly during training. It’s like having an automatic Morty-corrector.\n\n# Closing the Loop on BCE Loss\n\nSo, there you have it: a Rick-level dive into Binary Cross Entropy Loss. Remember, the Big Brain move is to understand the limitations, tweak the parameters, and keep improving. Whether you’re fighting against the Galactic Federation or reducing the loss of your model, it's all about being the smartest person in the room.\n\nNow go! Use these tricks to minimize your BCE Loss like you’re avoiding family therapy. Just, you know, maybe consider actually going to family therapy occasionally. I hear it can be beneficial, or so I’m told by people who care about that sort of thing. Good luck, and keep experimenting!",
    title: "Binary Cross Entropy Loss",
    emoji: "📚",
    category: "COMPUTER SCIENCE",
    imageUrl: "https://images.smart.wtf/note-89-image.png",
    agent_id: 1,
    minutes: 18,
    description:
      "Binary Cross Entropy Loss is a loss function used in binary classification tasks in machine learning.",
    nextTopic: "Gradient Descent Optimization",
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
    id: 90,
    user_id: 24,
    markdown:
      "# Understanding Categorical Cross Entropy\n\nCategorical Cross Entropy (CCE) is a loss function that is widely used in machine learning, particularly in classification problems where the output can belong to one out of many possible categories. This function measures the performance of a classification model whose output is a probability value between 0 and 1. CCE increases as the predicted probability diverges from the actual label.\n\n## What is a Loss Function?\n\nBefore diving into Categorical Cross Entropy, let's understand what a loss function is.\n\nA loss function, also known as a cost function, is a measure of how well a machine learning model performs. It outputs a high value for bad predictions and a low value for accurate predictions. During training, the goal is to minimize this loss function.\n\n## Classification Problems\n\nIn classification problems, we are often trying to predict which of several classes an input belongs to. For binary classification (two classes), we might use Binary Cross Entropy. However, when dealing with multiple classes, Categorical Cross Entropy is more appropriate.\n\n## Categorical Cross Entropy Explained\n\nCategorical Cross Entropy is used when we have a multi-class classification problem. It compares the distribution of the predictions (the outputs of the model) with the distribution of the true labels, and computes a score that summarizes the average difference between these distributions.\n\n### Mathematical Definition\n\nThe formula for Categorical Cross Entropy is:\n\n$$\nH(y, \\hat{y}) = - \\sum_{i} y_i \\log(\\hat{y_i})\n$$\n\nwhere:\n- $$y$$ is the true label in a one-hot encoded vector form.\n- $$\\hat{y}$$ is the predicted probability distribution.\n- $$i$$ indexes over each class.\n\n### One-Hot Encoding\n\nIn CCE, the true labels need to be one-hot encoded. This means that if we have three classes, a true label of class 1 would be represented as [1, 0, 0], class 2 as [0, 1, 0], and class 3 as [0, 0, 1].\n\n### Example Calculation\n\nLet's say we have a classification problem with three classes. For a given instance, the true class is 2, and our model predicts the following probabilities for each class: [0.1, 0.7, 0.2]. The one-hot encoded true label would be [0, 1, 0].\n\nUsing the CCE formula, we calculate the loss for this prediction as:\n\n$$\nH(y, \\hat{y}) = - (0 \\times \\log(0.1) + 1 \\times \\log(0.7) + 0 \\times \\log(0.2)) = - \\log(0.7)\n$$\n\nThe loss would be the negative log of the predicted probability for the true class.\n\n## Why Use Logarithms?\n\nThe logarithm in the CCE has several important properties:\n\n- It penalizes incorrect predictions more heavily. A small predicted probability for the correct class will result in a large increase in loss, encouraging the model to be more confident about its predictions.\n- It works well with optimization algorithms like gradient descent, as it provides a smooth gradient that can be used to update weights.\n\n## Implementing Categorical Cross Entropy\n\nIn most deep learning frameworks, Categorical Cross Entropy is available as a built-in function. Here's an example of how you might implement it in Python using TensorFlow:\n\n```python\nimport tensorflow as tf\n\n# Assume `y_true` is the tensor containing the true labels, and\n# `y_pred` is the tensor containing the predicted probabilities.\nloss = tf.keras.losses.CategoricalCrossentropy()\n\n# Calculate the loss\ncce = loss(y_true, y_pred)\n```\n\n## Categorical Cross Entropy in Neural Networks\n\nIn neural networks, CCE is often used in conjunction with a softmax activation function in the output layer. The softmax function converts the output logits of the network into probabilities by dividing the exponential of each logit by the sum of the exponentials of all logits.\n\n### Softmax Function\n\nThe softmax function is defined as:\n\n$$\n\\sigma(z)_i = \\frac{e^{z_i}}{\\sum_{j=1}^{K} e^{z_j}}\n$$\n\nwhere:\n- $$z$$ is the output vector from the last layer of the network (before applying softmax).\n- $$K$$ is the number of classes.\n\n### Combining Softmax with CCE\n\nWhen using softmax with CCE, the backpropagation step can efficiently adjust the weights in the network due to the gradient of the CCE being scaled by the output of the softmax function.\n\n## Advantages of Categorical Cross Entropy\n\n- **Sensitivity to Confidence**: It penalizes incorrect and less confident predictions more than other loss functions.\n- **Differentiability**: It is a smooth function, which allows for efficient gradient calculations.\n- **Probabilistic Interpretation**: It corresponds to maximizing the likelihood of the data under the model.\n\n## Limitations of Categorical Cross Entropy\n\n- **Requires One-Hot Encoding**: True labels must be one-hot encoded, which can be inefficient for a large number of classes.\n- **Sensitive to Imbalanced Data**: CCE can be biased towards classes with more instances.\n\n## Visualizing Categorical Cross Entropy\n\nTo better understand how CCE works, it can be helpful to visualize the loss function. Below is a placeholder for a graph that shows the CCE loss as the predicted probability for the true class varies from 0 to 1.\n\n![Categorical Cross Entropy Loss Graph](https://www.researchgate.net/publication/358013533/figure/fig3/AS:1126483187765253@1645585929614/Graph-Categorical-Cross-Entropy-Loss.png)\n\n for training models to not only make accurate predictions but also to be confident in their predictions. Understanding and implementing CCE effectively can significantly improve the performance of classification models.",
    agents_markdown:
      "# Understanding Categorical Cross-Entropy\n\nCategorical cross-entropy is a loss function often used in machine learning for problems where the targets are one-hot encoded. Let's dive into its mechanics, application, and importance in the world of machine learning.\n\n## What is Categorical Cross-Entropy?\n\nCategorical cross-entropy is a fancy term for a concept that's pretty simple at its core - it's a measure of how wrong your model's predictions are compared to the actual labels. It's especially handy when you're dealing with tasks like classification where you want to put things into buckets or categories.\n\n### A Quick Math Review\n\nLet's get mathematical. Imagine you have a set of true labels, which are one-hot encoded. One-hot encoding is a way to turn categorical labels into a binary vector. For instance, if you have three classes and the true class is the second one, it gets encoded as `[0, 1, 0]` - pretty straightforward, right?\n\nNow, your model spits out probabilities for each class, ideally wanting the highest probability to be for the correct class. So, if your model is spot on, it might predict `[0.05, 0.90, 0.05]`. The cross-entropy loss looks at these two vectors and computes a score that tells you how much your model's predictions deviate from the desired target.\n\n### The Formula for Categorical Cross-Entropy\n\nGet ready for some funky symbols:\n\n$$\nH(y, \\hat{y}) = - \\sum_{i=1}^{C} y_i \\log(\\hat{y}_i)\n$$\n\n- Where:\n  - $$H(y, \\hat{y})$$ is the cross-entropy loss between the true labels $$y$$ and the predicted probabilities $$\\hat{y}$$.\n  - $$C$$ is the number of classes.\n  - $$y_i$$ is the ground truth (0 or 1 if one-hot encoded) for class $$i$$.\n  - $$\\log$$ is the natural logarithm.\n  - $$\\hat{y}_i$$ is the predicted probability for class $$i$$.\n\n## Why Use Categorical Cross-Entropy?\n\n### It's All About Probabilities\n\nOne reason to use categorical cross-entropy is that it deals directly with probabilities. Probabilities are a great way to express uncertainty, and in the real world, we want our models not just to predict, but to tell us how confident they are.\n\n### Penalizing Confidence in Wrong Answers\n\nCross-entropy is brutal when it comes to penalizing predictions that are both wrong and made with high confidence. Say your model confidently predicts the wrong class with a probability of 0.99. The loss is going to be huge, and that's the model's cue to learn from its mistake and adjust.\n\n### Well Behaved Gradient\n\nThis loss function also has a well-behaved gradient. Without getting into the weeds, this just means that as the predicted probability diverges from the actual label, the weight updates during training are proportionally scaled. It's smooth sailing for optimization algorithms, and who doesn't love that?\n\n## Application of Categorical Cross-Entropy in Neural Networks\n\nCategorical cross-entropy is the go-to loss function for multi-class classification problems in neural networks. Here's how it usually goes down:\n\n- You have a bunch of input data and corresponding labels.\n- Your model chugs along, doing its thing, pushing the data through layers and neurons.\n- Finally, it spits out probabilities via a softmax layer.\n\n### The Role of the Softmax Layer\n\nLet's take a moment to appreciate the softmax layer. Its job is to take raw model outputs and squish them into a legit probability distribution. Here's that formula:\n\n$$\n\\text{softmax}(x_i) = \\frac{e^{x_i}}{\\sum_{j=1}^{C} e^{x_j}}\n$$\n\n- Where:\n  - $$x_i$$ is the raw output (also called the logit) for class $$i$$.\n  - $$C$$ is again the total number of classes.\n\nOnce you have these probabilities, you calculate the cross-entropy loss to figure out how off the mark you are and use backpropagation to make your model less of a dummy.\n\n## Working Example of Categorical Cross-Entropy\n\nConsider you're building a model to classify images into three categories: cats, dogs, and birds.\n\n- Suppose you have one image, and the true label is \"cat,\" which is one-hot encoded as `[1, 0, 0]`.\n- Your model predicts `[0.7, 0.2, 0.1]` for `[cat, dog, bird]`.\n\nCalculating categorical cross-entropy gives us:\n\n$$\n- (1\\log(0.7) + 0\\log(0.2) + 0\\log(0.1)) = - (1\\log(0.7)) \\approx 0.357\n$$\n\nThis number tells you how well your model is doing. The closer this value is to zero, the better your predictions are.\n\n## Best Practices and Tips\n\n- Always use the entropy loss with a softmax layer at the output of your classification model.\n- Ensure that your labels are one-hot encoded.\n- Be prepared for the loss to increase if your model makes confident incorrect predictions; it's a sign that the model needs to learn more.\n\n![Categorical Cross-Entropy Loss Function Graph](https://assets-global.website-files.com/5d7b77b063a9066d83e1209c/63d28cab8e303279fe440276_binary%20cross%20entropy%20formula.webp)\n\n\n\n### Not for Binary Classification\n\nDon't confuse categorical cross-entropy with binary cross-entropy. For binary classification (only two classes), use binary cross-entropy. Categorical is for more than two.\n\n### Numerical Stability\n\nRemember the log in the cross-entropy formula? It doesn’t play nice with probabilities of 0, as this would mean taking the log of 0, leading to undefined or infinite values. This is why you might see a tiny value, like $$1e-15$$, added to probabilities in implementations to avoid this mess.\n\n## Code Snippet: Implementing Categorical Cross-Entropy\n\n```python\nimport numpy as np\n\n# Categorical Cross-Entropy loss function\ndef categorical_cross_entropy(y_true, y_pred):\n    # Small value to avoid division by zero/undefined log(0)\n    epsilon = 1e-15\n    y_pred = np.clip(y_pred, epsilon, 1 - epsilon)\n    # Loss calculation\n    return -np.sum(y_true * np.log(y_pred)) / y_true.shape[0]\n\n# Example usage\ny_true = np.array([[1, 0, 0]])  # True label for 'cat'\ny_pred = np.array([[0.7, 0.2, 0.1]])  # Predicted probabilities\n\nloss = categorical_cross_entropy(y_true, y_pred)\nprint(f'Categorical Cross-Entropy Loss: {loss}')\n```\n\nRemember to update your model's weights using an optimizer based on the loss calculated from this function.\n\n## Final Remarks\n\nCategorical cross-entropy is like that one friend who's brutally honest with you - it doesn't let your model get away with making dumb mistakes. Understand how to use it, and you'll make your neural networks smarter and more capable of classifying stuff accurately. Remember, getting things perfectly right in machine learning is like finding a parking spot at the supermarket on Sunday - it's not going to happen often. The goal is to continuously reduce the loss by learning incrementally, or, you know, just go shopping on a Tuesday instead.",
    title: "Categorical Cross Entropy",
    emoji: "📚",
    category: "COMPUTER SCIENCE",
    imageUrl: "https://images.smart.wtf/note-90-image.png",
    agent_id: 1,
    minutes: 13,
    description:
      "Categorical Cross Entropy is a loss function used in machine learning for multi-class classification.",
    nextTopic: "Gradient Descent",
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
    <div className="h-full max-h-[700px] overflow-y-auto rounded-lg border bg-card/70 p-4 shadow-md dark:bg-card/80">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center justify-between border-b border-border pb-2">
          <h1>Notes</h1>
          <Link
            className={buttonVariants({ className: "flex flex-row gap-2" })}
            href={"/signup"}
          >
            <PlusIcon className="h-4 w-4" />
            Generate
          </Link>
        </div>
        <div className="relative ">
          <Input
            className="bg-secondary/90 shadow-none"
            placeholder="search here"
            onChange={(e) => setTopicInput(e.target.value)}
            value={topicInput}
          />
          <Search className="absolute right-2 top-2 h-4 w-4" />
        </div>
        <div className="flex max-h-[400px] flex-col gap-2 overflow-y-auto overflow-x-hidden">
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
                                    <HoverCard closeDelay={50} openDelay={100}>
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
                                    <HoverCard closeDelay={50} openDelay={100}>
                                      <HoverCardTrigger>
                                        <div className="group flex cursor-pointer flex-row items-center justify-between gap-1 rounded-lg border border-border p-2 transition-all hover:-translate-y-0.5">
                                          <Link
                                            className="flex h-full w-full flex-row gap-1"
                                            href={`/signup`}
                                          >
                                            <p className="text-lg">
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
