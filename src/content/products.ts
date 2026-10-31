/**
 * PRODUCT CATALOGUE
 *
 * HONESTY RULE (non-negotiable): PT BIN's official product datasheets have not
 * been supplied. Nothing here states composition, dosage, certification,
 * registration numbers or efficacy claims. Each record carries a `dataStatus`
 * so the admin panel can filter what still needs verification, and the public
 * UI shows an explicit "specification pending" state instead of inventing data.
 *
 * Every field below is editable through the admin panel once verified.
 */

export type ProductCategorySlug = "pupuk-organik" | "pupuk-hayati" | "pengendali-hayati";

export type ProductCategory = {
  slug: ProductCategorySlug;
  label: string;
  description: string;
  /** Honest editorial photo for the category: a picture of the subject's world, never presented as the product itself. */
  photo: { src: string; alt: string };
};

export const productCategories: ProductCategory[] = [
  {
    slug: "pupuk-organik",
    label: "Pupuk Organik",
    description:
      "Produk yang dibangun dari bahan organik untuk memperbaiki kandungan bahan organik tanah dan mendukung kesuburan lahan secara bertahap.",
    photo: {
      src: "/images/compost-pile.jpg",
      alt: "Tumpukan bahan organik yang diolah menjadi kompos",
    },
  },
  {
    slug: "pupuk-hayati",
    label: "Pupuk Hayati",
    description:
      "Produk berbasis mikroorganisme yang diarahkan untuk mendukung ketersediaan hara dan aktivitas biologis di zona perakaran.",
    photo: {
      src: "/images/petri-dish.jpg",
      alt: "Cawan petri berisi kultur mikroorganisme yang sedang ditelaah",
    },
  },
  {
    slug: "pengendali-hayati",
    label: "Pengendali Hayati",
    description:
      "Produk berbasis mikroorganisme yang diarahkan sebagai bagian dari program perlindungan tanaman secara terpadu.",
    photo: {
      src: "/images/farmer-planting.jpg",
      alt: "Petani menanam benih padi di lahan persawahan",
    },
  },
];

export type ProductDataStatus = "placeholder" | "verified";

export type Product = {
  slug: string;
  name: string;
  category: ProductCategorySlug;
  /** One line, set large next to the plate. */
  summary: string;
  /** Supporting paragraph for detail views. */
  description: string;
  /** Areas the product is intended to address: stated as intent, not as measured effect. */
  focus: string[];
  /** Editorial layout hints so the catalogue never becomes a uniform card grid. */
  plate: "ground" | "ground-2" | "deep" | "earth";
  span: 2 | 3 | 4;
  offset?: boolean;
  dataStatus: ProductDataStatus;
};

export const products: Product[] = [
  {
    slug: "marfu-p",
    name: "MARFU-P",
    category: "pupuk-organik",
    summary: "Lini pupuk organik untuk program pemupukan lahan terpadu.",
    description:
      "MARFU-P merupakan bagian dari lini pupuk organik PT Bio Industri Nusantara. Produk ini ditujukan untuk mendukung program pemupukan lahan secara terpadu bersama produk lain dalam portofolio perusahaan.",
    focus: ["Program pemupukan terpadu", "Pengelolaan kesuburan lahan"],
    plate: "deep",
    span: 4,
    dataStatus: "placeholder",
  },
  {
    slug: "phe",
    name: "PHE",
    category: "pupuk-hayati",
    summary: "Produk hayati untuk mendukung nutrisi tanaman.",
    description:
      "PHE merupakan bagian dari lini pupuk hayati PT Bio Industri Nusantara, yaitu produk yang bekerja berbasis mikroorganisme untuk mendukung program nutrisi tanaman di lahan budidaya.",
    focus: ["Program nutrisi tanaman", "Dukungan aktivitas biologis tanah"],
    plate: "ground-2",
    span: 3,
    dataStatus: "placeholder",
  },
  {
    slug: "kompota",
    name: "KOMPOTA",
    category: "pupuk-organik",
    summary: "Produk kompos untuk pembenahan bahan organik tanah.",
    description:
      "KOMPOTA merupakan produk kompos dalam portofolio PT Bio Industri Nusantara. Produk ini ditujukan untuk membantu memperbaiki kandungan bahan organik tanah sebagai dasar program pemupukan organik.",
    focus: ["Kandungan bahan organik tanah", "Pembenahan lahan"],
    plate: "ground",
    span: 3,
    dataStatus: "placeholder",
  },
  {
    slug: "kompota-glio",
    name: "KOMPOTA GLIO",
    category: "pengendali-hayati",
    summary: "KOMPOTA dengan dimensi pengendalian hayati.",
    description:
      "KOMPOTA GLIO merupakan pengembangan dari lini KOMPOTA yang menggabungkan basis kompos dengan dimensi pengendalian hayati. Rincian mikroorganisme dan spesifikasi teknis menunggu dokumen resmi produk.",
    focus: ["Program perlindungan tanaman terpadu", "Pengelolaan bahan organik lahan"],
    plate: "earth",
    span: 4,
    offset: true,
    dataStatus: "placeholder",
  },
  {
    slug: "biocomp",
    name: "BIOCOMP",
    category: "pupuk-organik",
    summary: "Produk kompos hayati untuk lahan budidaya.",
    description:
      "BIOCOMP merupakan produk kompos hayati dalam portofolio PT Bio Industri Nusantara, diarahkan untuk mendukung pengelolaan kesuburan lahan budidaya secara organik.",
    focus: ["Kesuburan lahan budidaya", "Program pemupukan organik"],
    plate: "ground-2",
    span: 3,
    dataStatus: "placeholder",
  },
  {
    slug: "biobus",
    name: "BIOBUS",
    category: "pupuk-organik",
    summary: "Produk organik untuk pemeliharaan tanah.",
    description:
      "BIOBUS merupakan bagian dari lini pupuk organik PT Bio Industri Nusantara. Kategori teknis dan rincian bahan baku menunggu konfirmasi dari dokumen resmi produk.",
    focus: ["Pemeliharaan tanah", "Program pemupukan organik"],
    plate: "ground",
    span: 3,
    dataStatus: "placeholder",
  },
  {
    slug: "bioriz",
    name: "BIORIZ",
    category: "pupuk-hayati",
    summary: "Produk hayati berbasis mikroorganisme untuk zona perakaran.",
    description:
      "BIORIZ merupakan bagian dari lini pupuk hayati PT Bio Industri Nusantara, diarahkan untuk mendukung ketersediaan hara di zona perakaran melalui pendekatan berbasis mikroorganisme.",
    focus: ["Ketersediaan hara zona perakaran", "Aktivitas biologis tanah"],
    plate: "deep",
    span: 4,
    dataStatus: "placeholder",
  },
  {
    slug: "bioagrodeco",
    name: "BIOAGRODECO",
    category: "pengendali-hayati",
    summary: "Produk pengendali hayati untuk perlindungan tanaman.",
    description:
      "BIOAGRODECO merupakan bagian dari lini pengendali hayati PT Bio Industri Nusantara, diarahkan sebagai bagian dari program perlindungan tanaman secara terpadu.",
    focus: ["Program perlindungan tanaman", "Pengelolaan risiko hama dan penyakit"],
    plate: "ground-2",
    span: 3,
    dataStatus: "placeholder",
  },
  {
    slug: "astemic",
    name: "ASTEMIC",
    category: "pupuk-hayati",
    summary: "Produk hayati untuk program nutrisi tanaman terpadu.",
    description:
      "ASTEMIC merupakan bagian dari portofolio produk PT Bio Industri Nusantara. Kategori teknis, komposisi, dan petunjuk penggunaan menunggu dokumen resmi produk.",
    focus: ["Program nutrisi tanaman", "Dukungan pertumbuhan tanaman"],
    plate: "ground",
    span: 3,
    dataStatus: "placeholder",
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(slug: ProductCategorySlug) {
  return products.filter((p) => p.category === slug);
}

export function getCategory(slug: ProductCategorySlug) {
  return productCategories.find((c) => c.slug === slug);
}
