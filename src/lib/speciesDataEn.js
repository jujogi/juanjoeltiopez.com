// Armonía Acuática en inglés: lo que cambia de cada especie de speciesData.js cuando la
// persona elige "English". Los números (agua, tamaño, litros) y las reglas son los mismos.
//
// Por id: name, intro y, solo si la especie lo tiene, aliases (otros nombres en inglés),
// speciesOnly y scientific (cuando el "nombre científico" es una descripción en español,
// como en los híbridos). Los aliases en español también se buscan en inglés, pero la ficha en
// inglés solo muestra los de aquí.
// Al agregar una especie en speciesData.js, agrégala también aquí; si falta, se muestra en español.

export const groupsEn = {
  "Betta y otros populares": "Betta and other favorites",
  Tetras: "Tetras",
  "Rasboras y danios": "Rasboras and danios",
  Vivíparos: "Livebearers",
  Cíclidos: "Cichlids",
  Guramis: "Gouramis",
  "Barbos y arcoíris": "Barbs and rainbowfish",
  "Tiburones de agua dulce": "Freshwater sharks",
  "Peces de fondo": "Bottom dwellers",
  Gambitas: "Shrimp",
  Caracoles: "Snails",
};

export const speciesEn = {
  betta: {
    name: "Male betta",
    aliases: ["siamese fighting fish", "fighting fish"],
    intro:
      "A fascinating fish, but territorial: only one male per tank, and never with long-tailed or very colorful fish. Give him a heater, a gentle filter and live plants. Remember: living is not the same as surviving!",
  },
  "betta-hembra": {
    name: "Female betta",
    aliases: ["female fighting fish"],
    intro:
      "She's calmer than the male, but each one has her own temperament. Keep her alone or in a group of 5 or more, in a large, well-planted tank. She only meets the male to breed.",
  },
  goldfish: {
    name: "Goldfish (fancy)",
    aliases: ["fancy goldfish", "oranda", "ryukin", "comet"],
    intro:
      "Not a fish for a round bowl: it grows a lot, makes a big mess and is a cold-water fish. It needs a large tank, and we don't recommend keeping it with tropical fish.",
    speciesOnly:
      "It's a cold-water fish, makes a big mess and grows too large to share a tank with tropical fish.",
  },
  "globo-enano": {
    name: "Pea puffer",
    aliases: ["dwarf puffer", "malabar puffer"],
    intro:
      "It's tiny, but don't let that fool you: it nips fins and eats shrimp and snails. We recommend a tank just for them.",
    speciesOnly: "It's small but aggressive: it nips fins and harasses other fish.",
  },
  "killi-payaso": {
    name: "Clown killifish",
    intro:
      "A tiny striped killifish with a tail full of bright colors. It lives near the surface, so give it floating plants, soft water and a gentle flow. Oh, and keep a lid on: they love to jump.",
  },
  channa: {
    name: "Snakehead (Channa)",
    aliases: ["dwarf snakehead"],
    intro:
      "A predator with a lot of character. We mean the dwarf Channa here: the big ones need huge tanks. We recommend a tank just for them, with a tight lid because they jump.",
    speciesOnly: "It's a territorial predator: it eats small fish and fights with big ones.",
  },
  "tetra-neon": {
    name: "Neon tetra",
    intro:
      "The tetra everyone knows. It's peaceful and lives in schools, so keep it in a group: the more of them, the calmer they are and the better they look.",
  },
  "tetra-cardenal": {
    name: "Cardinal tetra",
    intro:
      "It looks like the neon, but its red stripe runs all the way to the head. It likes warmer, soft and acidic water, and always in a school.",
  },
  "tetra-neon-verde": {
    name: "Green neon tetra",
    intro:
      "The smallest of the neons. If you have a soft-water planted tank, a good school of them looks spectacular.",
  },
  "tetra-neon-negro": {
    name: "Black neon tetra",
    intro:
      "If you're just starting with schooling fish, this tetra is one of the hardiest and most peaceful you can choose.",
  },
  "tetra-borrachito": {
    name: "Rummy-nose tetra",
    aliases: ["rummy nose", "rummynose"],
    intro:
      "You'll know it by its red nose. It swims in a very tight school, so give it room to swim and keep the water parameters stable.",
  },
  "tetra-monjita": {
    name: "Black skirt tetra",
    aliases: ["black widow tetra"],
    intro:
      "It can handle almost anything, but it nips fins. Keep it in a group and don't put it with long-finned fish.",
  },
  "tetra-emperador": {
    name: "Emperor tetra",
    intro:
      "A very hardy Colombian tetra. The males challenge each other, but they're calm with other fish.",
  },
  "tetra-rubi": {
    name: "Ruby tetra",
    intro:
      "A tiny, deep red tetra from the Colombian plains. It's shy, so give it soft water, lots of plants and a good group so it feels safe.",
  },
  "tetra-ambar": {
    name: "Ember tetra",
    intro:
      "A tiny tetra in a glowing orange. Keep it in a school: the more of them, the better they look. It does great in soft-water planted tanks.",
  },
  "rasbora-arlequin": {
    name: "Harlequin rasbora",
    intro:
      "One of the best choices for a community tank: it's peaceful, hardy and lives in a school.",
  },
  "rasbora-galaxy": {
    name: "Galaxy rasbora",
    aliases: ["celestial pearl danio", "cpd"],
    intro:
      "It's small and a bit shy. It prefers cooler water and a tank with lots of plants where it can hide.",
  },
  "rasbora-chili": {
    name: "Chili rasbora",
    aliases: ["mosquito rasbora"],
    intro:
      "One of the smallest fish you can keep, in a deep red. Keep it in a group, in a soft-water planted tank.",
  },
  "danio-cebra": {
    name: "Zebra danio",
    aliases: ["zebrafish", "glofish"],
    intro:
      "It never stops moving. It's very hardy and handles cooler water, but it needs a long tank to swim in.",
  },
  "rasbora-espei": {
    name: "Lambchop rasbora",
    intro:
      "A cousin of the harlequin, smaller and copper-colored. It's peaceful and lives in a school, and it looks great in planted tanks.",
  },
  guppy: {
    name: "Guppy",
    aliases: ["fancy guppy"],
    intro:
      "Colorful, active and it breeds very easily, so get ready for fry. It does better in hard, alkaline water than in soft water.",
  },
  molly: {
    name: "Molly",
    aliases: ["mollie", "dalmatian molly", "balloon molly", "black molly"],
    intro:
      "It's hardy and breeds easily, but many people don't know it needs hard, alkaline water and more room than it seems.",
  },
  platy: {
    name: "Platy",
    intro:
      "If you're just starting, it's one of the best fish to begin with: peaceful, colorful and hardy. Like all livebearers, it prefers hard water.",
  },
  espada: {
    name: "Swordtail",
    intro:
      "A large and very active livebearer. The males fight each other, so we recommend one male with several females.",
  },
  endler: {
    name: "Endler's livebearer",
    intro:
      "The guppy's little cousin. It's very active, breeds a lot and does great in small hard-water tanks.",
  },
  escalar: {
    name: "Angelfish",
    aliases: ["freshwater angelfish", "angel"],
    intro:
      "It's sold small, but it grows quite a bit and needs a tall tank. It's a social fish: keep a group of 4 to 6, in a big, tall tank so they don't fight. Keep in mind that as an adult it eats small fish.",
  },
  ramirezi: {
    name: "German blue ram",
    aliases: ["ram", "ram cichlid", "butterfly cichlid"],
    intro:
      "A dwarf cichlid from the Colombian and Venezuelan plains, beautiful but delicate. It needs warm, soft and very clean water.",
  },
  "apistogramma-cacatuoides": {
    name: "Cockatoo dwarf cichlid",
    intro:
      "If you want to start with dwarf cichlids, this is the hardiest one. Keep in mind that the male defends his territory on the bottom.",
  },
  "apistogramma-agassizii": {
    name: "Agassiz's dwarf cichlid",
    intro:
      "A dwarf cichlid from the Amazon with amazing colors. It needs soft, acidic water, caves and lots of plants.",
  },
  kribensis: {
    name: "Kribensis",
    aliases: ["krib"],
    intro:
      "A hardy African dwarf cichlid that breeds easily. When a pair has fry they defend their cave with everything they've got, so give them space.",
  },
  disco: {
    name: "Discus",
    intro:
      "They call it the king of the aquarium. It needs very warm, soft water, a large tank and a group. We don't recommend it if you're just starting.",
  },
  "polar-blue": {
    name: "Polar Blue parrot",
    scientific: "Convict × parrot cichlid hybrid",
    intro:
      "A hybrid between the convict cichlid and the parrot cichlid: small for a cichlid, but with the convict's strong temper. Keep it with sturdy fish its size, not with small or calm fish.",
  },
  "acara-azul": {
    name: "Blue acara",
    intro:
      "If you want to start with bigger cichlids, this is one of the calmest of its size. Keep in mind that as an adult it will see small fish as food.",
  },
  "falso-disco": {
    name: "Severum",
    aliases: ["banded cichlid"],
    intro:
      "It looks like a discus, but it's much hardier. It's calm for a large cichlid, but it grows up to 20 cm, so it needs a large tank.",
  },
  oscar: {
    name: "Oscar",
    intro:
      "It's sold small, but it reaches 30 cm, eats a lot and makes a big mess. It eats anything that fits in its mouth. Not a fish to start the hobby with: it needs a very large tank and strong filtration.",
  },
  "flower-horn": {
    name: "Flowerhorn",
    scientific: "Central American cichlid hybrid",
    intro:
      "A hybrid famous for its hump and its bad temper: it won't tolerate tank mates. We recommend just one, in a large tank of its own.",
    speciesOnly: "It's very aggressive and territorial: it attacks almost any tank mate.",
  },
  "gurami-perla": {
    name: "Pearl gourami",
    intro:
      "Big and calm, it's one of the most peaceful gouramis. Keep it in a pair or a group, in a roomy tank with plants.",
  },
  "gurami-miel": {
    name: "Honey gourami",
    intro:
      "The smallest and most peaceful gourami. It's shy: keep it in a pair or a group, with floating plants and calm tank mates.",
  },
  "gurami-enano": {
    name: "Dwarf gourami",
    aliases: ["flame gourami", "powder blue gourami"],
    intro:
      "Very colorful and a bit territorial: only one male per tank. Give it plants and a gentle flow.",
  },
  "barbo-cereza": {
    name: "Cherry barb",
    intro:
      "The most peaceful of the barbs, and hardy too. The males turn a deep red. A good choice if you're just starting.",
  },
  "barbo-sumatrano": {
    name: "Tiger barb",
    intro:
      "Very active and a fin nipper. In a big group they keep each other busy, but don't put it with long-finned fish.",
  },
  "barbo-denisonii": {
    name: "Denison barb",
    intro:
      "A 15 cm torpedo that never stops swimming. It needs a long tank, good current and a group.",
  },
  "arcoiris-boesemani": {
    name: "Boesemani rainbowfish",
    intro:
      "Half blue, half orange. It's peaceful and very active, but it grows: it needs a large tank and hard water.",
  },
  "arcoiris-praecox": {
    name: "Dwarf neon rainbowfish",
    intro:
      "The rainbowfish for medium tanks: neon blue with red fins. It's active, peaceful and lives in a school.",
  },
  corydoras: {
    name: "Corydoras",
    aliases: ["cory", "cory catfish", "panda cory", "bronze cory", "albino cory"],
    scientific: "Corydoras sp. (panda, bronze)",
    intro:
      "A peaceful bottom dweller that lives in groups. Use sand or a soft substrate so it doesn't hurt its barbels.",
  },
  "corydoras-pigmea": {
    name: "Pygmy corydoras",
    intro:
      "A tiny cory that swims in groups in the middle of the water. One of the safest fish if you want to keep shrimp.",
  },
  otocinclus: {
    name: "Otocinclus",
    aliases: ["oto"],
    intro:
      "A small, very peaceful algae eater. Don't add it to a brand-new tank: it needs a mature one, with biofilm and algae to eat.",
  },
  "corydoras-sterbai": {
    name: "Sterbai corydoras",
    intro:
      "The cory that handles warm water best, which is why it's the classic tank mate for rams and discus.",
  },
  ancistrus: {
    name: "Bristlenose pleco",
    aliases: ["bushynose", "pleco"],
    intro:
      "The small pleco: it eats algae, it's hardy and peaceful. Give it a piece of driftwood to rasp on and hide in.",
  },
  plecostomus: {
    name: "Common pleco",
    aliases: ["pleco", "suckermouth catfish"],
    intro:
      "The big pleco. It's sold at 5 cm, but it grows past 30 cm and makes a huge mess, so it's only for very large tanks. For a regular tank we recommend a bristlenose pleco.",
  },
  kuhli: {
    name: "Kuhli loach",
    intro:
      "It looks like a little eel. It's shy and comes out at night: it needs sand, hiding places and a group.",
  },
  "botia-payaso": {
    name: "Clown loach",
    intro: "It's sold small, but it reaches 30 cm and lives in groups. Only for very large tanks.",
  },
  "zorro-volador": {
    name: "Flying fox",
    intro:
      "A very active algae eater that grows to about 14 cm. As an adult it becomes territorial with its own kind, so we recommend keeping just one.",
  },
  neocaridina: {
    name: "Neocaridina shrimp",
    aliases: ["cherry shrimp", "red cherry", "blue dream"],
    intro:
      "Cherry Red, Bloody Mary, Blue Velvet, Yellow Fire… They're the hardiest shrimp and the ones we recommend to start with.",
  },
  caridina: {
    name: "Caridina shrimp",
    aliases: ["crystal red shrimp", "crs", "bee shrimp", "taiwan bee"],
    scientific: "Caridina sp. (Crystal Red, Taiwan Bee)",
    intro:
      "More delicate than their sisters, the Neocaridinas: they need RO water with shrimp salts, active substrate and a mature shrimp tank.",
  },
  sulawesi: {
    name: "Sulawesi shrimp",
    intro:
      "They come from the lakes of Sulawesi and need very warm, alkaline water. We recommend a shrimp tank just for them.",
  },
  amano: {
    name: "Amano shrimp",
    intro:
      "Bigger than other shrimp and great at eating algae. It doesn't breed in fresh water, so don't expect babies unless you first understand how it reproduces.",
  },
  planorbis: {
    name: "Ramshorn snail (Planorbis)",
    aliases: ["ramshorn"],
    intro:
      "It almost always arrives in our tank stuck to plants that weren't cleaned properly, and the more leftover food there is, the more it breeds: overfeed your tank and in a few weeks it becomes a pest. It eats algae and leftovers, and it prefers hard water: in soft, acidic water its shell gets weak.",
  },
  physa: {
    name: "Bladder snail (Physa)",
    aliases: ["pond snail"],
    intro:
      "The snail that shows up out of nowhere: it almost always arrives stuck to plants that weren't cleaned properly, and if you overfeed, in a few weeks it becomes a pest. It doesn't harm healthy plants, but if you see lots of them, it's because you're feeding more than needed. It prefers hard water: in soft, acidic water its shell gets weak.",
  },
  "caracol-manzano": {
    name: "Mystery snail",
    aliases: ["apple snail"],
    intro:
      "The big, colorful snail you see in shops: gold, blue, purple… It grows to about 5 cm and makes more mess than other snails, so give it a tank of 40 L or more. It lays its eggs above the water and loves to climb out of the tank, so you should keep a lid on. It needs hard water so its shell doesn't get weak. Some bettas are drawn to its big antennae, so watch them closely for the first few days.",
  },
  "caracol-helena": {
    name: "Assassin snail (Helena)",
    aliases: ["snail-eating snail"],
    intro:
      "The famous assassin snail: it eats other snails, which is why many people use it as a plan B to control a ramshorn or bladder snail plague. Careful, it can also attack nerites, mystery snails and baby shrimp. It breeds slowly, so it never becomes a pest, and it loves to bury itself in sand. Like every snail, it prefers hard water so its shell doesn't get weak.",
  },
  neritina: {
    name: "Nerite snail",
    aliases: ["zebra nerite", "tiger nerite"],
    intro:
      "One of the best algae eaters you can have in your tank, and the best part is it can't become a pest: its eggs don't hatch in fresh water, although you'll see them as small white dots on rocks and driftwood. Keep the tank well covered because they're great escape artists. They prefer hard water: in soft water with a very acidic pH, their shell wears away.",
  },
  "pez-cuchillo-negro": {
    name: "Black ghost knifefish",
    aliases: ["black ghost"],
    intro:
      "It's nocturnal and shy: during the day it hides in caves or tubes, so give it somewhere to take shelter. It grows to about 40 cm and at night it eats small fish and shrimp, which is why it needs a big tank and good-sized tank mates.",
  },
  arawana: {
    name: "Silver arowana",
    aliases: ["arowana"],
    intro:
      "A fish from our rivers that grows to almost a meter. It's sold very small, but as an adult it needs a huge, well-covered tank, because it jumps, and it eats any fish that fits in its mouth.",
  },
  "gato-cristal": {
    name: "Glass catfish",
    aliases: ["ghost catfish"],
    intro:
      "Its body is so transparent you can see its bones. It's very shy: keep it in a group of 6 or more, with a gentle flow and calm tank mates, or it hides and stops eating.",
  },
  "tetra-serpae": {
    name: "Serpae tetra",
    aliases: ["red minor tetra"],
    intro:
      "It's an intense red and very active, but it's known for nipping fins, especially when there are only a few. Keep it in a group of 8 or more and never with long-tailed fish.",
  },
  "tetra-limon": {
    name: "Lemon tetra",
    intro:
      "A calm, yellow tetra that shines in a group, in a planted tank with a dark background. The more of them, the better they look.",
  },
  "tetra-fantasma-negro": {
    name: "Black phantom tetra",
    intro:
      "It's calm and hardy, a good tetra if you're just starting. The males spread their fins to show off to each other, but without hurting each other. Keep it in a group of 6 or more.",
  },
  "tetra-congo": {
    name: "Congo tetra",
    intro:
      "A large, calm African tetra whose scales shine in the light. It swims a lot and lives in a group, so it needs a long tank with open space to swim.",
  },
  "pez-hacha": {
    name: "Marbled hatchetfish",
    aliases: ["hatchetfish"],
    intro:
      "It lives right at the surface and is a great jumper, so keep the tank well covered. It's shy: keep it in a group of 6 or more, with floating plants and calm tank mates.",
  },
  "neon-chino": {
    name: "White cloud minnow",
    aliases: ["white cloud mountain minnow"],
    intro:
      "One of the few schooling fish that does well in cool water, without a heater. Keep it in a group of 6 or more: the more of them, the more color the males show.",
  },
  convicto: {
    name: "Convict cichlid",
    aliases: ["convict"],
    intro:
      "Hardy and easy to breed, but tough: when it has fry it defends its territory to the death. Give it a roomy tank with caves and tank mates that can stand up for themselves.",
  },
  "loro-sangre": {
    name: "Blood parrot",
    scientific: "Central American cichlid hybrid",
    aliases: ["parrot cichlid", "blood parrot cichlid"],
    intro:
      "One of the most famous fish in stores, but it's a man-made hybrid: its mouth doesn't close well, so give it food it can swallow easily. It's calmer than other cichlids, although it grows quite big and needs a roomy tank.",
  },
  "ciclido-amarillo": {
    name: "Electric yellow cichlid",
    aliases: ["yellow lab", "african cichlid"],
    intro:
      "An African cichlid from Lake Malawi, an intense yellow. It needs hard, alkaline water, very different from Amazon fish, so it does best with other Malawi cichlids and in a group, so the aggression gets spread out.",
    speciesOnly:
      "It's a Lake Malawi cichlid: aggressive with fish that aren't from its lake, and it needs hard, alkaline water.",
  },
  "gurami-azul": {
    name: "Blue gourami",
    aliases: ["three spot gourami", "gold gourami", "opaline gourami"],
    intro:
      "Hardy and easy to keep, a good gourami if you're just starting. The males can be tough with each other: keep them as a pair, in a planted tank. You'll also find it in gold or silver.",
  },
  "gurami-besador": {
    name: "Kissing gourami",
    intro:
      "Famous for the “kisses” they give each other, which are really fights over territory. It grows to about 20 cm and eats soft plants, so it needs a big tank.",
  },
  "tiburon-cola-roja": {
    name: "Red-tailed black shark",
    aliases: ["red tail shark"],
    intro:
      "Black with a red tail, very eye-catching, but territorial: it won't tolerate others of its kind or fish that look like it. Only one per tank, with caves and plants so it has its own space.",
  },
  "tiburon-bala": {
    name: "Bala shark",
    aliases: ["silver shark"],
    intro:
      "It's sold small, but it grows past 30 cm and lives in a group: it needs a huge tank. If you don't have that space, better choose another species.",
  },
  "comedor-algas-siames": {
    name: "Siamese algae eater",
    aliases: ["sae"],
    intro:
      "One of the few fish that eat black brush algae, especially when young. It's active and grows to about 14 cm, so give it room to swim and cover the tank because it jumps. Don't confuse it with the Chinese algae eater, which turns aggressive as an adult.",
  },
  koi: {
    name: "Koi",
    aliases: ["koi carp"],
    intro:
      "It's a pond fish, not an aquarium fish: it grows past 60 cm and lives many years. If you really want koi, think of a large outdoor pond with a good filter.",
  },
  bichir: {
    name: "Senegal bichir",
    aliases: ["dinosaur bichir"],
    intro:
      "People call it the dinosaur fish for its prehistoric look. It's calm with fish its own size, but at night it eats small ones, and it's a great escape artist: keep the tank well covered.",
  },
  "tetra-pristella": {
    name: "X-ray tetra",
    aliases: ["pristella tetra"],
    intro:
      "A hardy, calm tetra, almost transparent, with black and yellow spots on its fins. It's a great choice if you're just starting: keep it in a group of 8 or more.",
  },
  "pez-lapiz": {
    name: "Brown pencilfish",
    aliases: ["pencilfish", "hockey stick pencilfish"],
    intro:
      "Slim as a pencil and fun to watch: it swims tilted, head up, near the surface. It's calm and a bit shy, so keep it in a group of 6 or more, with floating plants and small, peaceful tank mates.",
  },
  "dolar-plateado": {
    name: "Silver dollar",
    intro:
      "A calm schooling fish, but a vegetarian one: it eats the plants in the tank. It lives in groups of 5 or more and grows to about 15 cm, so it needs a big tank with tough or artificial plants.",
  },
  "rasbora-maculata": {
    name: "Dwarf rasbora",
    aliases: ["spotted rasbora"],
    intro:
      "One of the smallest rasboras: it never grows past 2.5 cm. It's perfect for a planted nano with soft water and tiny tank mates. Keep it in a group of 10 or more.",
  },
  pangasio: {
    name: "Iridescent shark",
    aliases: ["pangasius"],
    intro:
      "It's sold as a little shark for aquariums, but it grows past a meter long and it's very skittish: it crashes into the glass. It's not a fish for a home aquarium, not even a big one.",
  },
  "garra-panda": {
    name: "Panda garra",
    aliases: ["garra"],
    intro:
      "A small algae eater with tiger-like stripes that enjoys water with good flow and oxygen. It can defend its rock from others of its kind, so give it caves and space.",
  },
};
