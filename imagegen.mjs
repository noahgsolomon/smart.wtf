import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const response = async () => {
  const detailed8BitPreface =
    "Create an image in a detailed retro 8-bit style. The artwork should have a pixelated texture and should have vibrant coloring and scenery.";

  const prompt = `
  Create a playful image featuring two robots with a polished, silver sheen, sitting at a transparent holographic table. They are joined by two simple yet charming aliens, one a bright shade of green, the other a deep purple, with friendly oversized eyes and smiling mouths. They're on a cloud-like platform that floats gently in a clear blue sky above a landscape dotted with futuristic domes and spires. The robots and aliens, sipping from levitating cups, share a moment of camaraderie against the backdrop of a serene and advanced utopia, their casual gathering a symbol of AI's integration into daily life.
  `;

  const fullPrompt = `${detailed8BitPreface} ${prompt} Remember, this is in detailed retro 8-bit style

`;

  const responseFetch = await openai.images.generate({
    model: "dall-e-3",
    prompt: fullPrompt,
    n: 1,
    size: "1792x1024",
    quality: "hd",
    style: "vivid",
    response_format: "url",
    user: "user-1234",
  });

  return responseFetch.data[0]?.url;
};

const imageGen = await response();

console.log(imageGen);

/*

Partial Derivatives

Create an imaginative scenario set in an Antarctic landscape shaped like a 3D graph. Colorful penguins slide down icy slopes, each path representing a different partial derivative. The varying steepness illustrates gradient changes. In the background, a vivid aurora adds to the scene, while penguins at the bottom analyze mathematical charts. This playful and vibrant depiction captures the essence of partial derivatives in mathematics.



Introduction to Rust

Create an image of a whimsical scene in outer space where giant crabs made of shiny, rust-resistant alloy float among stars. These crabs carry shields and locks, navigating through a cosmic environment. Below them, Earth is visible, showcasing a futuristic cityscape with metallic and rust-proof structures. The scene captures a blend of fantasy and technology, with the crabs symbolizing resilience and innovation in a universe of endless possibilities.



Database Caching

Visualize a Martian desert scene with a central oasis, symbolizing a database cache. The red sands of Mars surround a blue, clear pool, where animals with space helmets, representing data queries, gather for refreshment. The desert's starkness contrasts the oasis's vitality, emphasizing the cache's crucial role in data access. Above, two moons softly illuminate this whimsical yet symbolic tableau of technological efficiency on Mars.



Cuban Missile Crisis

Create an image of a colorful Cuban market bustling with activity, where the stalls are humorously shaped like missiles, symbolizing the Cuban Missile Crisis. Each stall is adorned with tropical fruits, vividly displayed in an array of colors and sizes. The market scene is lively, with fruit vendors animatedly gesturing and customers engaging in lively discussions, creating a vibrant and dynamic atmosphere. The background features a bright, sunny sky and the picturesque streets of Havana, adding to the lively and whimsical essence of the scene. The image captures a playful interpretation of a historic event, blending tropical charm with a hint of political satire.



Neural Networks

Visualize an epic scene where a brave knight in shining armor confronts a magnificent neural network beast. This creature is a grand dragon, its body composed of intertwining, glowing fibers that represent the complex layers and connections of a neural network. Its scales shimmer with a spectrum of colors, each scale a miniaturized network node. The dragon's eyes, bright and pulsating, symbolize the processing of data and learning. The knight, armed with a sword and shield, stands ready in a heroic stance, representing the challenge of mastering and implementing neural network technology. The backdrop is a dramatic landscape, where the light of knowledge clashes with the shadows of the unknown, symbolizing the ongoing quest to explore and harness the power of neural networks.



Integrals

Create an image of a magnificent, curved rainbow arching across a starry space backdrop. This rainbow, with its vibrant spectrum of colors, gracefully bends in a smooth, continuous curve, reminiscent of a mathematical graph. Beneath the rainbow, the cosmic void transforms into a serene shade of blue, highlighting the area under the curve. This striking contrast between the colorful arc and the tranquil blue space below vividly symbolizes the concept of integration in mathematics, where the area under a curve is calculated and represented. The scene merges the beauty of outer space with the elegance of mathematical concepts, creating a visually stunning and metaphorical representation of integrals.




Great Depression

Imagine a bustling alien marketplace on a distant, colorful planet, depicted in vibrant 8-bit style. Once a hub of intergalactic trade, the marketplace is now eerily quiet and deserted. Alien vendors, with expressions of confusion and dismay, gaze at their empty barrels and baskets, while tumbleweeds of cosmic dust lazily drift past the stalls. Grounded spaceships, once the lifeblood of commerce, sit idle, their once-gleaming surfaces now dulled and coated in a layer of space dust. The entire scene, set against a backdrop of a barren alien world, poignantly captures a moment of economic standstill.



Gene Methylation

Envision a twilight forest with DNA-shaped trees, their twisting branches glowing softly. Tiny, shimmering insects flit around, alighting on the branches and causing them to change colors, representing methylation's impact on DNA. This serene yet dynamic scene symbolizes the transformative power of methylation in the genetic world.



Serverless Computing

Visualize a colossal robot, its torso resembling Earth in intricate detail, wandering the luminous paths of the Milky Way galaxy. Its limbs and head, crafted from sleek, futuristic robotic components, reflect the cosmos' brilliance as it strides across a backdrop of twinkling stars and nebulous clouds. This striking scene combines the natural wonder of our galaxy with the imaginative possibilities of advanced technology, creating a mesmerizing spectacle of cosmic exploration.



Cryptography

Picture a lush valley dominated by a towering lock, crafted from a blend of stone and shimmering metal, perched precariously on a rugged pedestal. The lock, ready to burst with vibrant light seeping from its edges, stands as a silent sentinel amidst the valley. Surrounding cliffs cast long shadows over the verdant floor, dotted with ancient trees whose leaves rustle with the secrets of the ages. The imminent burst of the lock promises to reveal the concealed wonders of this hidden enclave.



Cryptocurrency

Envision a moonlit savanna where a motley crew of bird and deer and fox thieves in black hoods stealthily prowls through the tall, whispering grasses. Each creature, from sly foxes to nimble raccoons, holds a flashlight, casting beams that dance across the landscape as they search for hidden treasures. Their shadows flit across the terrain, while the stars twinkle like distant coins in the night sky, mirroring the elusive nature of cryptocurrency. They are holding a dufflebag of cash.



Blockchain Technology

Mystical beehive in the heart of an enchanted forest. The hive is a towering structure of hexagonal chambers, each glowing with an inner light and connected by sparkling, honey-like streams of energy. Playful sprites dart between the chambers, carrying golden hexagonal keys that buzz with magical potential. The forest around is alive with vibrant flora, each leaf and petal etched with delicate circuit-like patterns. Above this whimsical ecosystem, a network of iridescent threads weaves through the treetops, linking the hive to the surrounding nature in a dance of harmony and balance.



Artificial Intelligence



*/
