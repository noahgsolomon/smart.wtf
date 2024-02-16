"use client";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useMemo, useState } from "react";
import { trpc } from "@/trpc/client";
import { Button } from "@/components/ui/button";
import { CornerDownRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useGenerationType } from "@/utils/hooks/usegenerationtype";
import { useAddingNote } from "@/utils/hooks/useaddingnote";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const intriguingTopics = [
  "🔭 Kepler's Cosmic Laws",
  "🧬 Bee DNA Secrets",
  "📜 Voynich Mystery",
  "🌌 Fermi's Alien Paradox",
  "🏺 Egyptian Healing Arts",
  "🌍 Pangea's Puzzle",
  "🔬 Quantum Spookiness",
  "📏 Banach-Tarski Magic",
  "🎶 Bach's Mathematical Music",
  "💻 The Halting Dilemma",
  "🎨 Impressionist Light & Shadow",
  "🧮 Gödel's Logic Riddle",
  "🕰️ The Ancient Greek Computer",
  "🌿 Plant-Pollinator Dance",
  "💾 Turing's Enigma",
  "🖥️ Quantum Computing 101",
  "🔒 Cryptography Cracked",
  "📡 SETI and the Search for ET",
  "🦠 Viral Evolution Tactics",
  "🧪 CRISPR's Gene Editing",
  "🌐 The Birth of the Internet",
  "🚀 SpaceX's Mars Mission",
  "🔥 The Science of Wildfires",
  "🕸️ The World Wide Web's Weaving",
  "🐦 Dinosaur to Bird Evolution",
  "🧠 Neural Networks Unveiled",
  "📱 Smartphone Revolution",
  "📖 Codebreaking in WW2",
  "⚛️ Higgs Boson Discovery",
  "🎮 The AI in Gaming",
  "🚗 Autonomous Vehicles Drive",
  "🌳 Amazon Rainforest Secrets",
  "👽 UFOs: Myth or Reality?",
  "🖼️ Digital Art Algorithms",
  "🏰 Medieval Castle Engineering",
  "👓 Augmented Reality Explored",
  "🎵 Synthesizing Electronic Music",
  "🛰️ Satellite Swarms in Orbit",
  "🌋 Supervolcano Eruptions",
  "🔊 The Science of Acoustics",
  "🧲 Superconductivity Unlocked",
  "⚔️ Cryptocurrency Battles",
  "🏞️ National Parks Conservation",
  "🎬 CGI's Movie Magic",
  "🌬️ Climate Change Models",
  "🕹️ Retro Gaming Revival",
  "🦾 Robotics in Surgery",
  "🚀 Antimatter Propulsion Dreams",
  "🌉 The Golden Gate's Story",
  "🗳️ Blockchain Voting Systems",
  "🧵 Quantum Threads",
  "🔎 Nanotechnology Wonders",
  "🌦️ Weather Prediction Evolution",
  "🍄 Fungi's Ecological Role",
  "📊 Big Data's Big Questions",
  "👟 The Physics of Running",
  "🔬 Stem Cells Miracle",
  "🏈 Physics in Sports",
  "📝 The Math of Origami",
  "🛸 The Roswell Incident",
  "🌞 Solar Power Breakthroughs",
  "📼 The VHS vs. Betamax War",
  "🛍️ Online Shopping Evolution",
  "🍫 The Chemistry of Chocolate",
  "👁️ Bionic Eye Innovations",
  "🏔️ Everest's Geology",
  "🗺️ Ancient Cartography Techniques",
  "💊 Antibiotics Resistance Fight",
  "📈 Stock Market Algorithms",
  "🔦 The Laser's Invention",
  "🌜 Moon Landing Technologies",
  "🧪 The Periodic Table's History",
  "🔑 The RSA Algorithm Explained",
  "🎲 Game Theory's Puzzles",
  "🌵 Desert Survival Strategies",
  "🕒 Timekeeping Through Ages",
  "📚 The Gutenberg Press Impact",
  "👽 The Drake Equation Refined",
  "🔥 Thermodynamics in Cooking",
  "🖋️ The History of Writing Tools",
  "🏛️ Roman Architectural Marvels",
  "🎈 The Montgolfier Brothers' Flight",
  "💡 Edison vs. Tesla: The Current War",
  "🚇 The London Underground Creation",
  "🖨️ 3D Printing Evolution",
  "🚿 The Science of Soap",
  "🛩️ Wright Brothers' Flight Dynamics",
  "🔬 Microscopes' Revolutionary Designs",
  "🕵️‍♂️ Forensic Science Breakthroughs",
  "📻 Radio Waves Discovery",
  "🏥 The Invention of Vaccines",
  "📸 The First Photograph",
  "🎥 Film Animation Techniques",
  "🏺 The Dead Sea Scrolls' Secrets",
  "🔒 Lock Picking Physics",
  "🚢 Titanic's Engineering Lessons",
  "🏜️ Petra's Hydraulic Engineering",
  "🗽 The Statue of Liberty's Construction",
  "🔪 The Science of Cooking",
  "🚂 Steam Engine Revolution",
  "🧪 Penicillin's Accidental Discovery",
  "🌲 The Great Oxygenation Event",
  "🐚 The Cambrian Explosion Mysteries",
  "🌍 Earth's Magnetic Field Reversals",
  "💻 The First Computer Bug",
  "🔊 The Phonograph's Invention",
  "🛰️ Voyager's Golden Record",
  "🌕 Lunar Eclipses Explained",
  "🧲 Magnetism's Mysterious Forces",
  "🔵 Blue LEDs and Nobel Prizes",
  "🕊️ The Peace Symbol's Origins",
  "📡 RADAR's Role in WW2",
  "🎨 The Color Wheel's Science",
  "🧱 The Chemistry of Cement",
  "🚀 Rocket Fuel Innovations",
  "🌐 Geolocation Technology Advances",
  "🧴 Hand Sanitizer Science",
  "🧩 Sudoku's Mathematical Patterns",
  "🔐 The Enigma Machine Decoded",
  "🛒 The Barcode's Evolution",
  "🎤 The Microphone's Development",
  "🎡 Ferris Wheel Engineering",
  "📖 Braille System Creation",
  "🔪 Forensic DNA Analysis",
  "🚦 Traffic Light System Origins",
  "🎮 Video Game Graphics Progression",
  "🛁 The History of Hygiene Practices",
  "🍺 Brewing Science",
  "🕰️ The Antikythera Mechanism",
  "🧼 Soap's Chemical Reaction",
  "🔬 Discovering the Cell",
  "🎈 Hot Air Balloons Physics",
  "🧬 Cloning's Ethical Debate",
  "📱 The Evolution of Mobile Phones",
  "🔎 The Hubble Space Telescope's Impact",
  "🌳 The Oldest Living Organisms",
  "🎸 The Electric Guitar's Invention",
  "🧪 Chemistry of Love",
  "📡 The Development of GPS",
  "🌋 Predicting Volcanic Eruptions",
  "🛤️ Transcontinental Railroad Challenges",
  "🌌 Dark Matter Detection Techniques",
  "🧟‍♂️ The Science Behind Zombies",
  "🌬️ Wind Turbine Innovations",
  "🔨 The Lever's Ancient Origins",
  "🧲 Exploring Electromagnetism",
  "🎢 Roller Coaster Physics",
  "🔊 Sound Wave Manipulation",
  "📚 The Codex's Revolution",
  "🌡️ Thermometer's Evolution",
  "🏗️ Skyscraper Engineering",
  "🔧 The Screw's History",
  "🔩 The Nut and Bolt Evolution",
  "🛠️ The Hammer's Impact",
  "🎨 Pigment Discovery and Use",
  "🚗 The Automobile's Evolution",
  "🔦 Flashlight Technology Advances",
  "📼 The Impact of Cassette Tapes",
  "🎙️ The History of Podcasting",
  "📺 Television's Technological Advances",
  "🧠 Brain Imaging Breakthroughs",
  "🛩️ The Development of Drones",
  "🌐 The Origins of Social Media",
  "💊 The Discovery of Insulin",
  "🔬 Microbiology's Key Discoveries",
  "🕰️ The Accuracy of Atomic Clocks",
  "🛤️ The Impact of the Silk Road",
  "🏰 Castle Defense Mechanisms",
  "🔑 Cryptanalysis Techniques",
  "📸 The Evolution of Cameras",
  "📚 The Library of Alexandria's Mysteries",
  "🎭 The Origins of Theater",
  "🎮 The History of Esports",
  "📻 The Golden Age of Radio",
  "🎬 The Evolution of Special Effects",
  "🔍 The Invention of the Microscope",
  "🌿 Botany's Rare Discoveries",
  "🦠 Understanding Viruses",
  "📡 Advancements in Satellite Technology",
  "🎥 The Birth of Cinema",
  "🚀 Space Shuttle Design Innovations",
  "🔌 The Evolution of Electrical Grids",
  "🌉 Building the Brooklyn Bridge",
  "📖 Decoding Ancient Scripts",
  "🗝️ The History of Locksmithing",
  "🎲 Probability Theory in Games",
  "🧲 Magnetic Levitation Wonders",
  "🌳 Conservation Biology Breakthroughs",
  "📊 The Rise of Data Science",
  "💡 Light Bulb Invention Chronicles",
  "🔭 The Giant Telescopes of the Future",
  "🌊 Tsunami Prediction Technologies",
  "🏞️ The Geology of National Parks",
  "🚴‍♂️ The Physics of Cycling",
  "🌬️ Hurricanes and Climate Change",
  "🧬 Genetic Engineering Milestones",
  "📱 The Smartphone Revolution",
  "🔋 Battery Technology Breakthroughs",
  "🌐 The Evolution of the Internet",
  "💻 The History of Computer Programming",
  "🔬 The Discovery of Penicillin",
  "🎨 The Science of Art Restoration",
  "🛰️ Exploring Satellite Orbits",
  "🧪 The Chemistry of Everyday Life",
  "🔍 The Role of Forensic Science",
  "🚂 The History of Rail Transport",
  "🔧 The Mechanics of Flight",
  "🌳 The Secrets of Ancient Forests",
  "🧱 The History of Masonry",
  "📖 The Impact of the Printing Press",
  "🎮 The Evolution of Video Games",
  "🌌 Exploring the Cosmos",
  "🔒 The Science of Security Systems",
  "💡 Innovations in Lighting",
  "🌍 The Age of Exploration",
  "📈 The Development of Economics",
  "🎵 The Physics of Sound",
  "🔬 Breakthroughs in Medicine",
  "🌊 Oceanography's Latest Discoveries",
  "🌋 Volcanology and Earth's Dynamics",
  "🛤️ The Engineering of Ancient Roads",
  "📚 The Manuscripts of Timbuktu",
  "🔎 The Microscopic World Unveiled",
  "🚀 The Pioneers of Rocketry",
  "💾 The Digital Revolution",
  "🎥 The Art of Film Editing",
  "🏺 Archaeological Finds That Changed History",
  "🧬 The Human Genome Project",
  "🌐 The Creation of the World Wide Web",
  "🔭 Discovering Exoplanets",
  "🎨 Masterpieces Lost & Found",
  "🏙️ The Urbanization Phenomenon",
  "🚆 The Invention of the Steam Engine",
  "📱 Evolution of Mobile Communication",
  "🖥️ The Rise of Personal Computing",
  "🎮 Gaming Technology Advances",
  "🧪 Nanomaterials and Their Applications",
  "🌿 Ethnobotany and Plant Wisdom",
  "📸 Photography's Quantum Leap",
  "🛩️ The Aerodynamics of Flight",
  "🔊 The Science of Sound Engineering",
  "🌍 Geopolitical Borders Evolution",
  "🔬 The Revolution of the Electron Microscope",
  "🛰️ Space Exploration Milestones",
  "🌱 The Green Revolution in Agriculture",
  "📡 The Development of Telecommunications",
  "🔌 Renewable Energy Innovations",
  "💡 Optical Fiber and the Internet",
  "🎨 The Golden Ratio in Art and Nature",
  "🚗 The Evolution of Electric Cars",
  "🔎 The Discovery of DNA's Structure",
  "🌌 The Mystery of Dark Energy",
  "🎵 The Science Behind Music Theory",
  "💻 The Development of Artificial Intelligence",
  "🌳 Biodiversity Hotspots and Conservation",
  "🔧 The Mechanics Behind Bridges",
  "🔬 The Role of Vaccines in Public Health",
  "🌊 The Science of Surfing Waves",
  "🏛️ The Engineering of Ancient Monuments",
  "📚 The Invention of Paper and Its Impact",
  "🔒 Cybersecurity and Encryption",
  "📱 The Impact of Social Media on Society",
  "🛠️ The Industrial Revolution's Innovations",
  "🌍 Climate Change and Its Effects",
  "🧬 Gene Editing and CRISPR Technology",
  "🌌 The Search for Multiverses",
  "🎮 The Psychology of Video Games",
  "🛰️ Satellite Imaging and Earth Observation",
  "🚀 Mars Colonization Plans",
  "💡 The Future of Nuclear Fusion",
  "🧠 Advances in Neuroscience",
  "🔍 The Basics of Quantum Computing",
  "📡 The Evolution of Radio Astronomy",
  "🌐 The Internet of Things and Smart Cities",
  "🔬 Microplastics and Ocean Pollution",
  "🌳 Deforestation and Its Global Impact",
  "🚂 The History of High-Speed Rail",
  "🔌 The Smart Grid and Future Energy",
  "🎨 The Psychology of Color in Design",
  "🚀 Space Travel's New Horizons",
  "🌍 Earth's Precarious Future",
  "🔭 The Expansion of the Universe",
  "💡 Light Pollution and Dark Skies",
  "🎵 The Mathematical Patterns in Music",
  "🧠 Brain-Computer Interfaces",
  "📸 The Evolution of Digital Photography",
  "🌌 Nebulae: Star Nurseries",
  "🔬 The Science of Antimatter",
  "📱 From Telegraphs to Smartphones",
  "🎮 The Impact of Augmented Reality",
  "🧬 The Mysteries of Human Evolution",
  "🔍 Microscopy: Beyond the Visible",
  "🌍 Plate Tectonics and Continental Drift",
  "🚀 The Legacy of the Space Race",
  "💡 Innovations in Solar Energy",
  "🌐 Cyber-Physical Systems",
  "🔬 The Pathogens Among Us",
  "🌳 Urban Ecology and Green Spaces",
  "📚 The Lost Libraries of History",
  "🎨 Art Conservation Techniques",
  "🌊 The Power of Tidal Energy",
  "🔧 The Engineering of Dams",
  "🔍 The Enigmas of Particle Physics",
  "📡 Advances in Communication Satellites",
  "🚀 Exploring the Outer Planets",
  "💡 The Invention of the LED",
  "🧪 The Chemistry of Cooking",
  "🎮 The Evolution of Game Design",
  "📱 Wearable Technology Trends",
  "🔬 The Discovery of New Elements",
  "📸 High-Speed Photography",
  "🌍 Sustainable Urban Planning",
  "🔌 The Transition to Electric Transportation",
  "🎵 The Role of Music in Human Culture",
  "🌌 Understanding Black Holes",
  "🔭 The James Webb Space Telescope",
  "📡 The Future of Wireless Technology",
  "🌳 Conservation Genetics",
  "🔬 Nanotechnology in Medicine",
  "🚀 Commercial Spaceflight",
  "🌍 Geoengineering the Climate",
  "💡 The Science of Bioluminescence",
  "🎮 Virtual Reality Immersion",
  "📚 The History of Cryptography",
  "🌌 The Mystery of Dark Matter",
  "🔬 The Human Microbiome",
  "📱 The Evolution of the Internet",
  "🔌 Superconductors and Quantum Levitation",
  "🌍 The Anthropocene Epoch",
  "🔭 Exoplanet Discoveries",
  "💡 Photovoltaic Solar Power Advances",
  "🌳 The Oldest Trees on Earth",
  "🔬 Synthetic Biology's Frontiers",
  "🌌 The Structure of Galaxies",
  "🚀 The Voyager Missions",
  "🧬 The CRISPR Revolution",
  "🌍 Earth's Magnetic Field Mysteries",
  "🔬 Materials Science Breakthroughs",
  "🌳 Forest Regeneration Techniques",
  "🚀 Reusable Rocket Technology",
  "🌍 Ocean Currents and Climate",
  "🧬 Stem Cell Therapies",
  "🔌 Quantum Encryption",
  "🌌 Cosmic Microwave Background Radiation",
  "🔬 The Science of Vaccination",
  "🌍 The Great Barrier Reef's Ecosystem",
  "🧬 Genetic Ancestry Testing",
  "🔌 Wireless Energy Transfer",
  "🚀 Asteroid Mining",
  "🌍 Desertification Challenges",
  "🔬 The Biomechanics of Movement",
  "🌌 Neutron Stars and Pulsars",
  "🚀 Space Elevator Concepts",
  "🌍 Sustainable Agriculture Practices",
  "🔬 The Physics of Fluid Dynamics",
  "🌌 The Formation of Solar Systems",
  "🔬 Tissue Engineering and Regenerative Medicine",
  "🚀 The Ethics of Space Exploration",
  "🌍 Climate Modeling and Prediction",
  "🧬 The Evolution of Viruses",
  "🔌 Smart Grid Technologies",
  "🚀 The New Space Race",
  "🌍 Glacial Melting and Sea Level Rise",
  "🔬 Rare Earth Elements and Tech",
  "🌌 The Event Horizon Telescope",
  "🚀 Mars Rovers and Their Discoveries",
  "🌍 Geoarchaeology: Unearthing Ancient Civilizations",
  "🔬 The Alchemy of Chemistry",
  "🌳 The Secret Life of Trees",
  "🚀 The Physics of Space Travel",
  "🌍 The Dynamics of Earthquakes",
  "🧬 DNA Sequencing and Personal Genomics",
  "🔌 The Future of Nuclear Energy",
  "🌌 Exploring the Multiverse Theory",
  "🚀 The Challenges of Deep Space Communication",
  "🌍 Coral Reefs in the Anthropocene",
  "🔬 Advances in Bionic Limbs",
  "🌌 The Search for Cosmic Strings",
  "🚀 Space Habitats and Living in Zero Gravity",
  "🌍 The Science Behind Avalanches",
  "🧬 The Genetics of Aging",
  "🔌 Breakthroughs in Battery Technology",
  "🌌 Mapping the Universe with Radio Telescopes",
  "🚀 The Science of Orbital Mechanics",
  "🌍 Volcanic Activity and Earth's Atmosphere",
  "🧬 The Future of Gene Therapy",
  "🔌 Electric Vehicle Revolution",
  "🌌 Dark Energy and the Fate of the Universe",
  "🚀 Space Debris and Satellite Safety",
  "🌍 The Impact of Deforestation",
  "🔬 Nanorobotics in Medicine",
  "🌌 The Mystery of Fast Radio Bursts",
  "🚀 Interstellar Travel Theories",
  "🌍 The Water Crisis and Solutions",
  "🧬 Cloning: Ethics and Possibilities",
  "🔌 The Internet of Things and Privacy",
  "🌌 Quantum Gravity Challenges",
  "🚀 The Commercialization of Space",
  "🌍 Arctic Ice Melt and Global Warming",
  "🔬 The Rise of Synthetic Organisms",
  "🌌 The Cosmic Web and Large-Scale Structure",
  "🚀 The Legacy of Apollo Missions",
  "🌍 Biodiversity Loss and Its Impact",
  "🧬 Personalized Medicine and Pharmacogenomics",
  "🔌 Renewable Energy Sources and Storage",
  "🌌 The Physics of Wormholes",
  "🚀 Developing Life Support Systems for Mars",
  "🌍 The Science of Tsunamis",
  "🔬 The Role of AI in Scientific Discovery",
  "🌌 Probing the Early Universe",
  "🚀 The Future of Lunar Colonization",
  "🌍 Protecting Endangered Species",
  "🔬 The Engineering of Artificial Organs",
  "🌌 Observing Black Hole Collisions",
  "🚀 The Technology Behind Space Telescopes",
  "🌍 Climate Change Mitigation Strategies",
  "🧬 The Human Brain Mapping Project",
  "🔌 Advances in Solar Cell Efficiency",
  "🌌 The Mystery of Quasars",
  "🚀 Asteroid Deflection Strategies",
  "🌍 The Restoration of Ecosystems",
  "🔬 The Nanotechnology Revolution",
  "🌌 The Study of Exotic Matter",
  "🚀 Spacecraft Propulsion Innovations",
  "🌍 Urban Heat Islands and Climate",
  "🧬 The Crispr Gene Editing Tool",
  "🔌 Smart Cities and Sustainable Urban Living",
  "🌌 The Search for Life in the Universe",
  "🚀 The Role of Private Companies in Space Exploration",
  "🌍 Environmental DNA and Biodiversity Monitoring",
  "🔬 The Development of Lab-grown Meat",
  "🌌 The Exploration of Neptune and Uranus",
  "🚀 The Challenges of Space Suit Design",
  "🌍 The Science of Soil Health",
  "🧬 The Ethics of Human Enhancement",
  "🔌 The Evolution of the Electric Grid",
  "🌌 Understanding Gamma-Ray Bursts",
  "🚀 The Design of Interplanetary Spacecraft",
  "🌍 Sustainable Fishing Practices",
  "🔬 The Future of Quantum Computing",
  "🌌 The Nature of Dark Matter",
  "🚀 The Potential of Space Tourism",
  "🌍 The Threat of Invasive Species",
  "🧬 Advances in Stem Cell Research",
  "🔌 The Impact of Electric Vehicles on the Environment",
  "🌌 The Hubble Constant and the Expansion of the Universe",
  "🚀 The Engineering Challenges of Building on Mars",
  "🌍 The Importance of Pollinators in Agriculture",
  "🔬 The Discovery of New Antibiotics",
];

export default function DashboardNew() {
  const [inputTopic, setInputTopic] = useState("");
  const [generating, setGenerating] = useState(false);

  const { setAgent: setAddingNoteAgent, setNoteId, setTopic } = useAddingNote();

  const createNoteMutation = trpc.notes.createNote.useMutation({
    onSuccess: (data) => {
      if (data) {
        if (data.valid) {
          setNoteId(parseInt(data.noteId!));
          setTopic(inputTopic);
          setAgent(agent);
          setIsOpen(true);
          setGenerating(false);
          setInputTopic("");
        } else {
          toast.error("Invalid topic");
          setInputTopic("");
          setGenerating(false);
        }
      }
    },
    onError: () => {
      setGenerating(false);
    },
  });

  const [isChangeAgentOpen, setIsChangeAgentOpen] = useState(false);

  const { isOpen, setIsOpen } = useGenerationType();

  const [agent, setAgent] = useState<{
    name: "rick" | "mrburns" | "bender" | "patrick";
    id: number;
  }>({ name: "rick", id: 1 });

  const recommendedTopics = useMemo(() => {
    let randomTopics = [];
    for (let i = 0; i < 3; i++) {
      let randomIndex = Math.floor(Math.random() * intriguingTopics.length);
      randomTopics.push(intriguingTopics[randomIndex]);
      intriguingTopics.splice(randomIndex, 1);
    }

    return randomTopics;
  }, []);

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="relative w-full">
        <Input
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (inputTopic === "") return;
              setGenerating(true);
              createNoteMutation.mutate({
                agentId: agent.id,
                title: inputTopic,
              });
            }
          }}
          onChange={(e) => setInputTopic(e.target.value)}
          value={inputTopic}
          maxLength={50}
          placeholder="Let's learn something new..."
          className="relative w-full rounded-lg bg-card/80 py-8 pl-16 pr-[3.5rem] text-xl font-bold text-primary shadow-lg transition-all placeholder:text-primary/80 focus:border-lightBlue md:py-10 md:pl-24 md:pr-20 md:text-2xl "
        />
        <HoverCard
          openDelay={100}
          onOpenChange={setIsChangeAgentOpen}
          open={isChangeAgentOpen}
        >
          <HoverCardTrigger>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="absolute left-2 top-1/2 h-[50px] w-[50px] -translate-y-1/2 transform overflow-hidden rounded-lg md:h-[65px] md:w-[65px]">
                  <Image
                    src={`https://images.smart.wtf/${agent.name}.png`}
                    alt="agent"
                    width={65}
                    height={65}
                    onClick={() => {
                      setAgent((prev) => {
                        if (prev.name === "rick") {
                          return { name: "mrburns", id: 5 };
                        } else if (prev.name === "mrburns") {
                          return { name: "bender", id: 6 };
                        } else if (prev.name === "patrick") {
                          return { name: "rick", id: 1 };
                        } else {
                          return { name: "patrick", id: 4 };
                        }
                      });
                    }}
                    className={`absolute z-10 cursor-pointer rounded-lg border border-border/80 transition-all hover:scale-[101%] active:scale-[99%] md:h-[65px] md:w-[65px]`}
                  />
                  <Image
                    className={`absolute z-0 overflow-hidden transition-all`}
                    height={75}
                    width={75}
                    src={"/fireball.gif"}
                    alt="fire"
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent className="coarse:hidden">
                Change your agent
              </TooltipContent>
            </Tooltip>
          </HoverCardTrigger>
          <HoverCardContent
            className="absolute -left-2 -top-[0.5rem] w-[100px] transform border-none bg-transparent shadow-none coarse:hidden"
            asChild
          >
            <div className="flex flex-col gap-1">
              <Image
                src={`https://images.smart.wtf/bender.png`}
                onClick={() => {
                  setAgent({ name: "bender", id: 6 });
                  setIsChangeAgentOpen(false);
                }}
                alt="agent"
                width={65}
                height={65}
                className={`${
                  agent.name === "bender" ? "hidden" : ""
                } h-[50px] w-[50px] transform cursor-pointer rounded-lg border bg-secondary/80 transition-all hover:scale-[101%] active:scale-[99%] md:h-[65px] md:w-[65px]`}
              />

              <Image
                onClick={() => {
                  setAgent({ name: "mrburns", id: 5 });
                  setIsChangeAgentOpen(false);
                }}
                src={`https://images.smart.wtf/mrburns.png`}
                alt="agent"
                width={65}
                height={65}
                className={`${
                  agent.name === "mrburns" ? "hidden" : ""
                } h-[50px] w-[50px] transform cursor-pointer rounded-lg border bg-secondary/80 transition-all hover:scale-[101%] active:scale-[99%] md:h-[65px] md:w-[65px]`}
              />
              <Image
                src={`https://images.smart.wtf/patrick.png`}
                onClick={() => {
                  setAgent({ name: "patrick", id: 4 });
                  setIsChangeAgentOpen(false);
                }}
                alt="agent"
                width={65}
                height={65}
                className={`${
                  agent.name === "patrick" ? "hidden" : ""
                } h-[50px] w-[50px] transform cursor-pointer rounded-lg border bg-secondary/80 transition-all hover:scale-[101%] active:scale-[99%] md:h-[65px] md:w-[65px]`}
              />
              <Image
                src={`https://images.smart.wtf/rick.png`}
                onClick={() => {
                  setAgent({ name: "rick", id: 1 });
                  setIsChangeAgentOpen(false);
                }}
                alt="agent"
                width={65}
                height={65}
                className={`${
                  agent.name === "rick" ? "hidden" : ""
                } h-[50px] w-[50px] transform cursor-pointer rounded-lg border bg-secondary/80 transition-all hover:scale-[101%] active:scale-[99%] md:h-[65px] md:w-[65px]`}
              />
            </div>
          </HoverCardContent>
        </HoverCard>

        <Button
          disabled={generating}
          onClick={() => {
            if (inputTopic === "") return;
            setGenerating(true);
            createNoteMutation.mutate({
              agentId: agent.id,
              title: inputTopic,
            });
          }}
          className={`${
            inputTopic === "" ? "opacity-0" : ""
          }  absolute right-2 top-1/2 -translate-y-1/2 transform rounded-lg px-[1rem] py-[1.5rem] transition-all md:px-[1.5rem] md:py-[2rem]`}
        >
          {generating ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <CornerDownRight className="h-4 w-4 " />
          )}
        </Button>
      </div>
      <div className="flex flex-wrap justify-center gap-1 opacity-80">
        {recommendedTopics.map((topic, index) => (
          <Button
            key={topic}
            size={"sm"}
            className="rounded-lg border bg-card/80 text-xs text-primary hover:bg-card hover:text-primary md:text-sm"
            onClick={() => {
              setGenerating(true);
              createNoteMutation.mutate({
                agentId: agent.id,
                title: recommendedTopics[index]!,
              });
            }}
          >
            {topic}
          </Button>
        ))}
      </div>
    </div>
  );
}
