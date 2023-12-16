const google = async (searchQuery: string) => {
  let markdownContent = `# ${searchQuery}

  ![${searchQuery}](image-1-asset)
  `;

  const images = [{ asset: "image-1-asset", searchQuery }];

  for (const image of images) {
    const imageFetch = await fetch(
      `https://www.googleapis.com/customsearch/v1?q=${encodeURI(
        image.searchQuery,
      )}&cx=${process.env.GOOGLE_CX}&searchType=image&key=${
        process.env.GOOGLE_API_KEY
      }&num=1`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      },
    );

    const imageResponse = await imageFetch.json();

    if (!imageResponse.items || imageResponse.items.length === 0) {
      throw new Error("Image not found");
    }

    markdownContent = markdownContent.replace(
      image.asset,
      imageResponse.items[0].link,
    );

    console.log(imageResponse.items);
  }

  return { markdown: markdownContent };
};

google("Partial Derivatives Chain Rule filetype:svg");

export {};
