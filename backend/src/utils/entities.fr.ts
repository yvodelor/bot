

export interface ProductSynonym {
    nom: string;
    synonymes: string[];
}

export interface ProductCategory {
    categorie: string;
    produits: ProductSynonym[];
}

export interface ProductDictionary {
    version: string;
    categories: ProductCategory[];
}



export const entitiesData = {
  "version": "1.1.0",
  "categories": [
    {
      "categorie": "mode_femme",
      "produits": [
        { "nom": "robe", "synonymes": ["robe", "tenue", "dress", "habit femme"] },
        { "nom": "robe de soirée", "synonymes": ["robe soirée", "robe de fête", "longue robe"] },
        { "nom": "robe wax", "synonymes": ["wax", "robe africaine", "robe pagne"] },
        { "nom": "robe courte", "synonymes": ["mini robe", "robe mini"] },
        { "nom": "robe chemise", "synonymes": ["robe chemise"] },
        { "nom": "jupe", "synonymes": ["jupe", "jupette", "jupe longue"] },
        { "nom": "jupe en jean", "synonymes": ["jupe jean", "denim"] },
        { "nom": "jupe plissée", "synonymes": ["jupe plissée"] },
        { "nom": "chemise femme", "synonymes": ["chemise", "haut", "blouse"] },
        { "nom": "top", "synonymes": ["top", "debardeur", "crop top"] },
        { "nom": "corset", "synonymes": ["corset", "bustier"] },
        { "nom": "pantalon femme", "synonymes": ["pantalon", "pant", "legging"] },
        { "nom": "jean femme", "synonymes": ["jean", "denim"] },
        { "nom": "tailleur femme", "synonymes": ["tailleur", "costume femme"] },
        { "nom": "combi", "synonymes": ["combi", "combinaison"] },
        { "nom": "chaussure femme", "synonymes": ["chaussure", "godasse", "soulier"] },
        { "nom": "talon", "synonymes": ["talon", "escarpin", "chaussure à talon"] },
        { "nom": "basket femme", "synonymes": ["basket", "sneaker"] },
        { "nom": "sandale", "synonymes": ["sandale", "nu pied"] },
        { "nom": "botte", "synonymes": ["botte", "bottine"] },
        { "nom": "sac à main", "synonymes": ["sac", "sacoche", "pochette"] },
        { "nom": "sac à dos", "synonymes": ["sac à dos", "backpack"] },
        { "nom": "bijou", "synonymes": ["bijou", "accessoire"] },
        { "nom": "bague", "synonymes": ["bague", "alliance"] },
        { "nom": "collier", "synonymes": ["collier", "pendentif"] },
        { "nom": "boucle d'oreille", "synonymes": ["boucle", "oreille"] },
        { "nom": "bracelet", "synonymes": ["bracelet", "manille"] },
        { "nom": "lunette", "synonymes": ["lunette", "lunette de soleil"] },
        { "nom": "écharpe", "synonymes": ["echarpe", "foulard"] },
        { "nom": "ceinture femme", "synonymes": ["ceinture"] }
      ]
    },
    {
      "categorie": "mode_homme",
      "produits": [
        { "nom": "chemise homme", "synonymes": ["chemise", "chemisette", "chemise manches longues"] },
        { "nom": "polo", "synonymes": ["polo", "t-shirt col"] },
        { "nom": "t-shirt homme", "synonymes": ["tshirt", "tee shirt"] },
        { "nom": "pantalon homme", "synonymes": ["pantalon", "pant"] },
        { "nom": "jean homme", "synonymes": ["jean", "denim"] },
        { "nom": "costume", "synonymes": ["costume", "complet", "costard"] },
        { "nom": "veste", "synonymes": ["veste", "blazer"] },
        { "nom": "chaussure homme", "synonymes": ["chaussure", "godasse"] },
        { "nom": "basket homme", "synonymes": ["basket", "sneaker"] },
        { "nom": "mocassin", "synonymes": ["mocassin"] },
        { "nom": "sandale homme", "synonymes": ["sandale homme"] },
        { "nom": "ceinture homme", "synonymes": ["ceinture"] },
        { "nom": "montre homme", "synonymes": ["montre", "bracelet montre"] },
        { "nom": "portefeuille", "synonymes": ["portefeuille", "porte feuille"] },
        { "nom": "chapeau", "synonymes": ["chapeau", "casquette"] }
      ]
    },
    {
      "categorie": "mode_enfant_bebe",
      "produits": [
        { "nom": "robe enfant", "synonymes": ["robe fille", "robe enfant"] },
        { "nom": "vetement bébé", "synonymes": ["bebe", "grenouillere", "body"] },
        { "nom": "chaussure enfant", "synonymes": ["chaussure enfant", "basket enfant"] },
        { "nom": "couche", "synonymes": ["couche", "couche bébé"] },
        { "nom": "poussette", "synonymes": ["poussette"] }
      ]
    },
    {
      "categorie": "high_tech",
      "produits": [
        { "nom": "iphone", "synonymes": ["iphone", "ip", "apple"] },
        { "nom": "iphone 15", "synonymes": ["iphone 15", "ip15"] },
        { "nom": "iphone 14", "synonymes": ["iphone 14", "ip14"] },
        { "nom": "samsung", "synonymes": ["samsung", "galaxy", "sams"] },
        { "nom": "telephone", "synonymes": ["telephone", "tel", "portable", "gsm"] },
        { "nom": "telephone android", "synonymes": ["android"] },
        { "nom": "ordinateur", "synonymes": ["ordinateur", "pc", "laptop"] },
        { "nom": "ordinateur portable", "synonymes": ["pc portable"] },
        { "nom": "ecran", "synonymes": ["ecran", "moniteur"] },
        { "nom": "ecouteur", "synonymes": ["ecouteur", "airpod", "casque", "earpod"] },
        { "nom": "chargeur", "synonymes": ["chargeur", "cable"] },
        { "nom": "power bank", "synonymes": ["powerbank", "batterie externe"] },
        { "nom": "tablette", "synonymes": ["tablette", "ipad"] },
        { "nom": "imprimante", "synonymes": ["imprimante"] },
        { "nom": "clavier", "synonymes": ["clavier"] },
        { "nom": "souris", "synonymes": ["souris"] },
        { "nom": "camera", "synonymes": ["camera", "appareil photo"] }
      ]
    },
    {
      "categorie": "beaute_soin",
      "produits": [
        { "nom": "parfum", "synonymes": ["parfum", "fragrance", "eau de parfum"] },
        { "nom": "cosmétique", "synonymes": ["cosmetique", "maquillage", "makeup"] },
        { "nom": "rouge à lèvre", "synonymes": ["rouge a levre", "lipstick"] },
        { "nom": "fond de teint", "synonymes": ["fond de teint"] },
        { "nom": "poudre", "synonymes": ["poudre"] },
        { "nom": "crème", "synonymes": ["creme", "lait", "soin", "lotion"] },
        { "nom": "huile", "synonymes": ["huile", "huile corporelle"] },
        { "nom": "savon", "synonymes": ["savon"] },
        { "nom": "shampoing", "synonymes": ["shampoing"] },
        { "nom": "gel douche", "synonymes": ["gel douche"] },
        { "nom": "parfum homme", "synonymes": ["parfum homme"] }
      ]
    },
    {
      "categorie": "maison_deco_electro",
      "produits": [
        { "nom": "meuble", "synonymes": ["meuble"] },
        { "nom": "lit", "synonymes": ["lit"] },
        { "nom": "canapé", "synonymes": ["canape", "sofa"] },
        { "nom": "table", "synonymes": ["table"] },
        { "nom": "chaise", "synonymes": ["chaise"] },
        { "nom": "armoire", "synonymes": ["armoire"] },
        { "nom": "rideau", "synonymes": ["rideau"] },
        { "nom": "drap", "synonymes": ["drap", "linge de lit"] },
        { "nom": "ustensile de cuisine", "synonymes": ["ustensile", "casserole"] },
        { "nom": "réfrigérateur", "synonymes": ["frigo", "refrigerateur"] },
        { "nom": "ventilateur", "synonymes": ["ventilateur"] },
        { "nom": "climatiseur", "synonymes": ["clim", "climatiseur"] },
        { "nom": "television", "synonymes": ["tv", "television"] }
      ]
    },
    {
      "categorie": "alimentation_supermarche",
      "produits": [
        { "nom": "riz", "synonymes": ["riz"] },
        { "nom": "huile", "synonymes": ["huile alimentaire"] },
        { "nom": "pate", "synonymes": ["pate"] },
        { "nom": "boisson", "synonymes": ["boisson", "jus"] },
        { "nom": "eau", "synonymes": ["eau"] },
        { "nom": "gateau", "synonymes": ["gateau"] },
        { "nom": "biscuit", "synonymes": ["biscuit"] }
      ]
    },
    {
      "categorie": "service",
      "produits": [
        { "nom": "consultation", "synonymes": ["consultation", "rdv", "rendez-vous", "conseil"] },
        { "nom": "coiffure", "synonymes": ["coiffure", "tresse", "pose", "mèche"] },
        { "nom": "manucure", "synonymes": ["manucure", "ongle"] },
        { "nom": "pedicure", "synonymes": ["pedicure"] },
        { "nom": "formation", "synonymes": ["formation", "cours", "apprendre"] },
        { "nom": "livraison", "synonymes": ["livraison", "expédition", "envoi"] },
        { "nom": "publicité", "synonymes": ["pub", "publicité", "marketing"] },
        { "nom": "creation site", "synonymes": ["site web", "site internet"] }
      ]
    },
    {
      "categorie": "divers",
      "produits": [
        { "nom": "jouet", "synonymes": ["jouet"] },
        { "nom": "livre", "synonymes": ["livre"] },
        { "nom": "vélo", "synonymes": ["velo"] },
        { "nom": "valise", "synonymes": ["valise"] },
        { "nom": "outil", "synonymes": ["outil"] }
      ]
    }
  ]
} as const;
