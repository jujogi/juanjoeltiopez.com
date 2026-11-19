// Armonía Acuática en inglés: lo que cambia de cada especie de speciesData.js cuando la
// persona elige "English". Los números (agua, tamaño, litros) y las reglas son los mismos.
//
// Por id: name, intro y, solo si la especie lo tiene, speciesOnly y scientific (cuando el
// "nombre científico" es una descripción en español, como en los híbridos).
// Al agregar una especie en speciesData.js, agrégala también aquí; si falta, se muestra en español.

export const groupsEn = {
  "Betta y otros populares": "Betta and other favorites",
  Tetras: "Tetras",
  "Rasboras y danios": "Rasboras and danios",
  Vivíparos: "Livebearers",
  Cíclidos: "Cichlids",
  Guramis: "Gouramis",
  "Barbos y arcoíris": "Barbs and rainbowfish",
  "Peces de fondo": "Bottom dwellers",
  Gambitas: "Shrimp",
};

export const speciesEn = {
  betta: {
    name: "Male betta",
    intro:
      "A fascinating fish, but territorial: only one male per tank, and never with long-tailed or very colorful fish. Give him a heater, a gentle filter and live plants. Remember: living is not the same as surviving!",
  },
  "betta-hembra": {
    name: "Female betta",
    intro:
      "She's calmer than the male, but each one has her own temperament. Keep her alone or in a group of 5 or more, in a large, well-planted tank. She only meets the male to breed.",
  },
  goldfish: {
    name: "Goldfish (fancy)",
    intro:
      "Not a fish for a round bowl: it grows a lot, makes a big mess and is a cold-water fish. It needs a large tank, and we don't recommend keeping it with tropical fish.",
    speciesOnly:
      "It's a cold-water fish, makes a big mess and grows too large to share a tank with tropical fish.",
  },
  "globo-enano": {
    name: "Pea puffer",
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
    intro:
      "You'll know it by its red nose. It swims in a very tight school, so give it room to swim and keep the water parameters stable.",
  },
  "tetra-monjita": {
    name: "Black skirt tetra",
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
    intro:
      "It's small and a bit shy. It prefers cooler water and a tank with lots of plants where it can hide.",
  },
  "rasbora-chili": {
    name: "Chili rasbora",
    intro:
      "One of the smallest fish you can keep, in a deep red. Keep it in a group, in a soft-water planted tank.",
  },
  "danio-cebra": {
    name: "Zebra danio",
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
    intro:
      "Colorful, active and it breeds very easily, so get ready for fry. It does better in hard, alkaline water than in soft water.",
  },
  molly: {
    name: "Molly",
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
    intro:
      "It's sold small, but it grows quite a bit and needs a tall tank. Keep in mind that as an adult it eats small fish.",
  },
  ramirezi: {
    name: "German blue ram",
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
      "Big and calm, it's one of the most peaceful gouramis. It does need a roomy tank with plants.",
  },
  "gurami-miel": {
    name: "Honey gourami",
    intro:
      "The smallest and most peaceful gourami. It's shy: it likes floating plants and calm tank mates.",
  },
  "gurami-enano": {
    name: "Dwarf gourami",
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
    intro:
      "The small pleco: it eats algae, it's hardy and peaceful. Give it a piece of driftwood to rasp on and hide in.",
  },
  plecostomus: {
    name: "Common pleco",
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
    intro:
      "Cherry Red, Bloody Mary, Blue Velvet, Yellow Fire… They're the hardiest shrimp and the ones we recommend to start with.",
  },
  caridina: {
    name: "Caridina shrimp",
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
};
