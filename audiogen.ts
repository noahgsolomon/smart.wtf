import OpenAI from "openai";
import path from "path";
import fs from "fs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const markdown = `# Principal Component Analysis (PCA)

Principal Component Analysis, or PCA, is a statistical technique used to emphasize variation and bring out strong patterns in a dataset. It's often used to make data easy to explore and visualize. PCA also serves as a tool to reduce the dimensionality of large datasets, increasing interpretability while minimizing information loss.

## What is PCA?

PCA is a method that rotates the dataset in a way such that the rotated features are statistically uncorrelated. This rotation is often followed by selecting only a subset of the new features according to how important they are for explaining the variation in the data.

### Goals of PCA

- **Dimensionality Reduction**: Reducing the number of variables while preserving as much information as possible.
- **Feature Extraction**: Creating new uncorrelated variables that successively maximize variance.
- **Data Visualization**: Simplifying the complexity of high-dimensional data to enhance intuitive interpretation.

## How PCA Works

To understand PCA, let's break down the process into steps:

### Step 1: Standardize the Data

PCA is affected by scale, so you need to scale the features in your data before applying PCA. Standardization involves rescaling the features so that they’ll have the properties of a standard normal distribution with $$\\mu = 0$$ and $$\\sigma = 1$$.

\`\`\`python
from sklearn.preprocessing import StandardScaler
scaler = StandardScaler()
scaled_data = scaler.fit_transform(data)
\`\`\`

### Step 2: Calculate the Covariance Matrix

The covariance matrix expresses the relationship between the different variables in the data set. It is a square matrix that shows the covariance between many different pairs of variables.

\`\`\`python
import numpy as np
covariance_matrix = np.cov(scaled_data.T)
\`\`\`

### Step 3: Compute the Eigenvalues and Eigenvectors

Eigenvalues and eigenvectors are the mathematical constructs that must be computed from the covariance matrix to determine the principal components of the data set. Eigenvectors (principal components) determine the directions of the new feature space, and eigenvalues determine their magnitude.

\`\`\`python
eigenvalues, eigenvectors = np.linalg.eig(covariance_matrix)
\`\`\`

### Step 4: Sort Eigenvalues and Eigenvectors

Sort the eigenvalues and their corresponding eigenvectors in order of decreasing eigenvalues. This order is important because it will decide which components we will retain in our reduced dataset.

### Step 5: Choose the Number of Components

Decide how many principal components to keep. This decision is often made by looking at the cumulative explained variance ratio, which adds up the variance explained by each component.

\`\`\`python
explained_variances = []
for i in range(len(eigenvalues)):
    explained_variances.append(eigenvalues[i] / np.sum(eigenvalues))
\`\`\`

### Step 6: Project Data Onto Lower-Dimensional Linear Space

This step involves the actual projection of the data onto the principal components. The eigenvectors are arranged in the order of their eigenvalues, highest to lowest, and multiplied by the original data to get the projections.

\`\`\`python
projection_matrix = eigenvectors[:, :num_components]
X_pca = scaled_data.dot(projection_matrix)
\`\`\`

## Understanding the Results

After performing PCA, the principal components are the new features. Each component is a linear combination of the original features, and they are orthogonal (uncorrelated).

### Explained Variance

The explained variance tells us how much information (variance) each principal component holds. After fitting PCA, you can use the \`explained_variance_ratio_\` attribute in scikit-learn to obtain this information.

### Scree Plot

A scree plot is a simple line segment plot that shows the fraction of total variance in the data as explained or represented by each principal component. It is used to determine how many principal components should be kept.

![Scree Plot](https://upload.wikimedia.org/wikipedia/commons/a/ac/Screeplotr.png)

## simple example of how to perform PCA using scikit-learn:

\`\`\`python
from sklearn.decomposition import PCA

# Instantiate the PCA model
pca = PCA(n_components=2)

# Fit PCA on the standardized data
principalComponents = pca.fit_transform(scaled_data)

# The explained variance tells us how much information is compressed into the first few components
print(pca.explained_variance_ratio_)
\`\`\`

## Applications of PCA

PCA has a wide range of applications in the field of machine learning and statistics:

- **Data Visualization**: When working with high-dimensional data, PCA can be used to project the data into two or three dimensions for visualization purposes.
- **Noise Filtering**: PCA can be used to separate signal from noise by retaining only the components with higher variance and ignoring the components with lower variance.
- **Feature Extraction and Engineering**: In machine learning, PCA can be used to derive new features that have better properties (e.g., uncorrelated) than the original features.

## Limitations of PCA

While PCA is a powerful technique, it has certain limitations:

- **Linear Assumptions**: PCA assumes that the principal components are a linear combination of the original features. If the relationship is non-linear, PCA may not capture the underlying structure effectively.
- **Sensitive to Scaling**: PCA is sensitive to the relative scaling of the original variables. Hence, proper standardization is crucial before applying PCA.
- **Interpretability**: The principal components themselves do not have any inherent meaning in terms of the original features.

## Conclusion

PCA is a versatile tool that can simplify complexity in high-dimensional data, summarize features, and allow for visualizations in lower-dimensional spaces. However, it's important to understand its assumptions and limitations when applying it to your data. With the right use, PCA can be an invaluable method in your data analysis and machine learning toolkit.`;

function cleanMarkdown(markdown: string) {
  return markdown
    .replace(/```[\s\S]*?```/g, "") // Remove ```code blocks```
    .replace(/\$\$(.*?)\$\$/g, "$1") // Remove $$...$$
    .replace(/\$(.*?)\$/g, "$1") // Remove $...$
    .replace(/\\\((.*?)\\\)/g, "$1") // Remove \(...\)
    .replace(/\\\[(.*?)\\\]/g, "$1") // Remove \[...\]
    .replace(/\\begin\{.*?\}(.*?)\\end\{.*?\}/gs, "$1") // Remove \begin{}...\end{}
    .replace(/##+/g, "") // Remove Markdown headers
    .replaceAll("#", "")
    .replace(/!\[.*?\]\(.*?\)/g, ""); // Remove image links
}

function splitIntoChunks(text: string, maxLength: number) {
  let chunks = [];
  while (text.length > 0) {
    let chunk = text.substring(0, maxLength);
    let nextIndex = chunk.lastIndexOf(" ");
    chunk = text.substring(0, nextIndex);
    chunks.push(chunk);
    text = text.substring(nextIndex).trim();
  }
  return chunks;
}

const speechFile = path.resolve("./speech.mp3");

async function main(chunk: string) {
  const mp3 = await openai.audio.speech.create({
    model: "tts-1-hd",
    voice: "alloy",
    input: chunk,
  });
  console.log(speechFile);
  const buffer = Buffer.from(await mp3.arrayBuffer());
  await fs.promises.writeFile(speechFile, buffer);
}

const chunks = splitIntoChunks(markdown, 4096);
chunks.forEach(async (chunk) => {
  await main(chunk);
});
