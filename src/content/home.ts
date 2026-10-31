/**
 * HOMEPAGE + SECTION CONTENT
 *
 * Photography is sourced from open collections and shows the world of the
 * industry, plantations, farmers, soil, laboratories. None of it is
 * presented as PT BIN's own facilities or documentation. See `imageCredits`.
 */

export type Capability = {
  title: string;
  description: string;
  href: string;
  /** Named focus areas: intent, never measured claims. */
  focus: string[];
};

export const capabilities: Capability[] = [
  {
    title: "Organic Fertilizer",
    description:
      "Produksi pupuk organik dari pengolahan bahan organik, diarahkan untuk memperbaiki kandungan bahan organik tanah sebagai dasar kesuburan lahan jangka panjang.",
    href: "/products/category/pupuk-organik",
    focus: ["Bahan organik tanah", "Pengelolaan kesuburan"],
  },
  {
    title: "Biofertilizer",
    description:
      "Produk berbasis mikroorganisme yang diarahkan untuk mendukung ketersediaan hara di zona perakaran dan menjaga aktivitas biologis tanah.",
    href: "/products/category/pupuk-hayati",
    focus: ["Ketersediaan hara", "Aktivitas biologis"],
  },
  {
    title: "Biological Crop Protection",
    description:
      "Solusi berbasis mikroorganisme sebagai bagian dari program perlindungan tanaman secara terpadu, bukan sebagai pengganti seluruh program pengendalian.",
    href: "/products/category/pengendali-hayati",
    focus: ["Perlindungan tanaman", "Pengelolaan risiko"],
  },
  {
    title: "Research & Development",
    description:
      "Riset pupuk organik, karakterisasi mikroorganisme, pengujian laboratorium, dan uji lapangan yang menjadi dasar setiap produk yang kami kembangkan.",
    href: "/research",
    focus: ["Karakterisasi mikroorganisme", "Uji laboratorium dan lapangan"],
  },
  {
    title: "Integrated Bio-Agribusiness Solution",
    description:
      "Pendekatan terintegrasi yang menyatukan asesmen lahan, perlakuan biologis, perlindungan tanaman, pemantauan, dan evaluasi kinerja dalam satu program.",
    href: "/solutions/integrated",
    focus: ["Program terpadu", "Evaluasi kinerja berkelanjutan"],
  },
];

export type SolutionStage = {
  id: string;
  index: number;
  title: string;
  description: string;
  detail: string;
  image: { src: string; alt: string };
};

export const solutionStages: SolutionStage[] = [
  {
    id: "assessment",
    index: 1,
    title: "Land & Cultivation Assessment",
    description: "Kondisi lahan dan praktik budidaya dikaji sebelum program ditentukan.",
    detail:
      "Kami memulai dengan mengkaji kondisi lahan, riwayat penggunaan, dan praktik budidaya yang berjalan. Asesmen ini menentukan bentuk program yang benar-benar relevan, bukan paket produk yang berlaku sama untuk semua lahan.",
    image: {
      src: "/images/compost-texture.jpg",
      alt: "Tanah dan bahan organik yang dikaji sebagai dasar asesmen lahan",
    },
  },
  {
    id: "nutrition",
    index: 2,
    title: "Biological Treatment & Nutrition",
    description: "Perlakuan biologis dan program nutrisi disusun sesuai kebutuhan lahan.",
    detail:
      "Berdasarkan hasil asesmen, disusun program perlakuan biologis dan nutrisi yang menggabungkan produk pupuk organik dan hayati yang relevan. Tujuannya adalah membangun kondisi tanah yang mendukung tanaman secara berkelanjutan.",
    image: {
      src: "/images/compost-sieved.jpg",
      alt: "Kompos yang telah diayak dan siap diaplikasikan pada lahan",
    },
  },
  {
    id: "protection",
    index: 3,
    title: "Crop Protection",
    description: "Perlindungan tanaman hayati dijalankan sebagai bagian program terpadu.",
    detail:
      "Program perlindungan tanaman berbasis mikroorganisme dijalankan sebagai bagian dari program terpadu. Pendekatan ini menempatkan perlindungan hayati dalam konteks pengelolaan risiko secara utuh, bukan sebagai solusi tunggal.",
    image: {
      src: "/images/seedling-facility.jpg",
      alt: "Persemaian tanaman yang dijaga kesehatannya sebelum ditanam di lahan",
    },
  },
  {
    id: "monitoring",
    index: 4,
    title: "Field Monitoring",
    description: "Respon lahan dan tanaman dipantau secara berkala di lapangan.",
    detail:
      "Program yang baik membutuhkan umpan balik. Respon lahan dan tanaman dipantau secara berkala oleh tim lapangan, sehingga penyesuaian dapat dilakukan berdasarkan kondisi nyata di lahan.",
    image: {
      src: "/images/farmer-planting.jpg",
      alt: "Petani bekerja di lahan persawahan sebagai bagian dari kegiatan pemantauan lapangan",
    },
  },
  {
    id: "evaluation",
    index: 5,
    title: "Performance Evaluation",
    description: "Hasil dievaluasi untuk menentukan langkah program berikutnya.",
    detail:
      "Evaluasi kinerja menutup siklus dan membuka siklus berikutnya. Temuan dari lapangan menjadi dasar untuk menyempurnakan program, menyesuaikan produk, dan menjaga kontinuitas produksi dari musim ke musim.",
    image: {
      src: "/images/palm-fruit-bunch.jpg",
      alt: "Buah segar sawit matang di pohon sebagai objuk evaluasi hasil panen",
    },
  },
];

export const outcomeDimensions = [
  {
    title: "Produktivitas",
    description:
      "Program disusun untuk mendukung potensi produktivitas tanaman melalui perbaikan kondisi tanah dan nutrisi.",
  },
  {
    title: "Kualitas Hasil Panen",
    description:
      "Kondisi tanah yang sehat secara biologis mendukung kualitas hasil yang konsisten dari satu siklus ke siklus berikutnya.",
  },
  {
    title: "Efisiensi Biaya",
    description:
      "Pendekatan terpadu membantu penggunaan input secara lebih terarah sehingga biaya program dapat dikelola lebih efisien.",
  },
  {
    title: "Kontinuitas Produksi",
    description:
      "Perbaikan tanah bersifat kumulatif, mendukung keberlanjutan produksi lintas musim dan lintas tahun.",
  },
];

export const researchActivities = [
  {
    title: "Riset Pupuk Organik",
    description:
      "Pengembangan dan perbaikan formulasi pupuk organik berdasarkan karakteristik bahan baku dan kebutuhan lahan sasaran.",
  },
  {
    title: "Riset Mikroorganisme",
    description:
      "Isolasi, identifikasi, dan karakterisasi mikroorganisme yang berpotensi mendukung program pertanian berbasis hayati.",
  },
  {
    title: "Pengembangan Produk Hayati",
    description:
      "Menerjemahkan temuan laboratorium menjadi produk hayati yang dapat diproduksi dan diaplikasikan secara konsisten.",
  },
  {
    title: "Pengujian Laboratorium",
    description:
      "Pengujian mutu, viabilitas, dan karakteristik produk di dalam laboratorium sebelum tahap uji lapangan.",
  },
  {
    title: "Demonstration Plot",
    description:
      "Uji lapangan terkontrol untuk mengamati respon tanaman dan tanah terhadap program yang diusulkan.",
  },
  {
    title: "Kolaborasi Penelitian",
    description:
      "Kerja sama dengan akademisi dan lembaga penelitian untuk memperluas basis ilmiah pengembangan produk.",
  },
];

export const researchImages = [
  {
    src: "/images/lab-microscope.jpg",
    alt: "Peneliti mengamati sampel mengandung mikroorganisme di bawah mikroskop",
  },
  {
    src: "/images/petri-dish.jpg",
    alt: "Cawan petri berisi kultur mikroorganisme yang sedang ditelaah",
  },
  {
    src: "/images/lab-sem.jpg",
    alt: "Tim peneliti menggunakan mikroskop elektron untuk mengamati struktur mikroorganisme",
  },
  {
    src: "/images/seed-trays.jpg",
    alt: "Baki benih dan media tanam dalam fasilitas pembibitan",
  },
];

export const sustainabilityPillars = [
  {
    title: "Pertanian Berkelanjutan",
    description:
      "Kami mengembangkan solusi yang memandang kesuburan lahan sebagai aset jangka panjang, bukan sebagai sesuatu yang dikonsumsi dalam satu musim.",
  },
  {
    title: "Pemanfaatan Bahan Organik",
    description:
      "Lini produk organik kami diarahkan untuk mengembalikan bahan organik ke tanah, menjaga siklus alami hara di lahan budidaya.",
  },
  {
    title: "Efisiensi Sumber Daya",
    description:
      "Pendekatan terpadu membantu penggunaan input menjadi lebih terarah, sehingga sumber daya lahan dimanfaatkan secara lebih efisien.",
  },
  {
    title: "Produktivitas Perkebunan",
    description:
      "Kami bekerja bersama perkebunan untuk menjaga produktivitas yang sehat tanpa mengorbankan kondisi tanah yang menopangnya.",
  },
  {
    title: "Ekosistem Bio-Agribisnis",
    description:
      "Kami membangun jejaring petani, distributor, akademisi, dan mitra perkebunan agar teknologi hayati sampai sampai ke lahan yang membutuhkannya.",
  },
];

export const partnershipTypes = [
  {
    title: "Plantation Partnership",
    description:
      "Program nutrisi dan perlakuan biologi terpadu untuk holding dan perusahaan perkebunan, disusun berdasarkan kondisi lahan masing-masing.",
    href: "/partnership",
  },
  {
    title: "Agricultural Distribution",
    description:
      "Kemitraan distribusi bagi toko pertanian, distributor, dan reseller yang ingin memasarkan lini produk organik dan hayati.",
    href: "/partnership/distributor",
  },
  {
    title: "Research Collaboration",
    description:
      "Kerja sama penelitian dengan akademisi dan lembaga penelitian dalam pengembangan mikroorganisme dan teknologi pertanian hayati.",
    href: "/partnership",
  },
  {
    title: "Agribusiness Partnership",
    description:
      "Kolaborasi pengembangan agribisnis yang menghubungkan produksi, riset, dan pemasaran dalam satu rantai nilai.",
    href: "/partnership",
  },
];

export const testimonials = [];
