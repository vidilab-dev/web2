/**
 * NEWS & INSIGHTS
 *
 * These are SAMPLE EDITORIAL ARTICLES written to show the layout at full
 * density. They are evergreen educational topics, not company announcements
 * nothing here claims an event, result, partnership or statistic for PT BIN.
 * Replace or clear them through the admin panel before launch.
 */

export type ArticleCategory =
  | "Berita Perusahaan"
  | "Aktivitas Perusahaan"
  | "Inovasi Produk"
  | "Edukasi Pertanian"
  | "Kegiatan Penelitian"
  | "Artikel Agribisnis";

export type Article = {
  slug: string;
  title: string;
  category: ArticleCategory;
  excerpt: string;
  body: string[];
  publishedAt: string;
  readingMinutes: number;
  image?: { src: string; alt: string };
  author: string;
  sample: boolean;
};

export const articleCategories: ArticleCategory[] = [
  "Berita Perusahaan",
  "Aktivitas Perusahaan",
  "Inovasi Produk",
  "Edukasi Pertanian",
  "Kegiatan Penelitian",
  "Artikel Agribisnis",
];

export const articles: Article[] = [
  {
    slug: "memahami-bahan-organik-tanah",
    title: "Bahan Organik dan Kesuburan Tanah",
    category: "Edukasi Pertanian",
    excerpt:
      "Bahan organik bukan sekadar bahan tambahan. Ia menentukan struktur tanah, kemampuan menyimpan air, dan aktivitas mikroorganisme yang bekerja di dalamnya.",
    body: [
      "Bahan organik adalah bagian dari tanah yang berasal dari sisa-sisa makhluk hidup dan hasil penguraiannya. Meskipun kadarnya relatif kecil dibanding mineral tanah, perannya jauh melampaui angkanya.",
      "Struktur tanah yang baik terbentuk dari agregat yang dikelilingi bahan organik. Agregat inilah yang membuat tanah memiliki pori-pori untuk menyalurkan air dan udara, sehingga perakaran dapat tumbuh dengan baik.",
      "Selain itu, bahan organik menjadi sumber energi bagi mikroorganisme tanah. Ketika populasi mikroorganisme aktif, proses penguraian dan transformasi hara berjalan lebih lancar, dan hara menjadi lebih tersedia bagi tanaman.",
      "Karena itu, perbaikan bahan organik tanah bersifat kumulatif. Ia tidak bekerja dalam semalam, tetapi hasilnya bertahan lama dan menopang produktivitas dari satu musim ke musim berikutnya.",
    ],
    publishedAt: "2026-09-12",
    readingMinutes: 5,
    image: { src: "/images/compost-texture.jpg", alt: "Tanah subur dengan kandungan bahan organik yang tinggi" },
    author: "Tim Agronomi",
    sample: true,
  },
  {
    slug: "mengenal-pupuk-hayati",
    title: "Mengenal Pupuk Hayati dan Cara Kerjanya di Zona Perakaran",
    category: "Edukasi Pertanian",
    excerpt:
      "Pupuk hayati bekerja melalui mikroorganisme. Memahami cara kerjanya membantu menempatkannya pada program yang tepat.",
    body: [
      "Pupuk hayati adalah produk yang manfaatnya ditentukan oleh mikroorganisme di dalamnya. Berbeda dengan pupuk kimia yang langsung menyuplai hara, pupuk hayati bekerja melalui aktivitas biologis.",
      "Mikroorganisme berperan dalam berbagai proses di sekitar perakaran, mulai dari penguraian bahan organik hingga membantu ketersediaan hara tertentu bagi tanaman.",
      "Karena bekerja secara biologis, efektivitasnya sangat bergantung pada kondisi lingkungan: kelembapan, pH, suhu, dan ketersediaan bahan organik sebagai sumber energi.",
      "Inilah sebabnya pupuk hayati paling tepat ditempatkan sebagai bagian dari program pemeliharaan tanah, bukan sebagai solusi tunggal untuk masalah nutrisi.",
    ],
    publishedAt: "2026-08-28",
    readingMinutes: 4,
    image: { src: "/images/lab-microscope.jpg", alt: "Peneliti mengamati mikroorganisme di bawah mikroskop" },
    author: "Tim Riset",
    sample: true,
  },
  {
    slug: "kompos-dan-siklus-hara",
    title: "Kompos dan Siklus Hara yang Berputar di Lahan",
    category: "Artikel Agribisnis",
    excerpt:
      "Mengompos berarti mengembalikan hara ke dalam siklus. Simak bagaimana proses ini bekerja dari bahan baku hingga menjadi produk.",
    body: [
      "Komposting adalah proses penguraian terkendali oleh mikroorganisme di bawah kondisi yang diatur. Bahan organik mentah diubah menjadi produk yang lebih stabil dan lebih mudah dimanfaatkan tanah.",
      "Proses ini bergantung pada rasio karbon dan nitrogen, kelembapan, dan sirkulasi udara. Ketiganya menentukan kecepatan dan hasil akhir pengomposan.",
      "Kompos yang matang memiliki karakter berbeda dari bahan bakunya: lebih stabil, lebih homogen, dan tidak lagi bersaing dengan tanaman untuk nitrogen saat diaplikasikan ke lahan.",
      "Dalam konteks perkebunan, kompos menjadi jembatan yang mengembalikan sisa-sisa biomassa ke dalam tanah, menjaga siklus hara tetap berputar.",
    ],
    publishedAt: "2026-08-05",
    readingMinutes: 5,
    image: { src: "/images/compost-sieved.jpg", alt: "Kompos matang yang telah diayak siap digunakan" },
    author: "Tim Produksi",
    sample: true,
  },
  {
    slug: "peran-mikroorganisme-dalam-tanah",
    title: "Peran Mikroorganisme dalam Tanah Pertanian",
    category: "Kegiatan Penelitian",
    excerpt:
      "Satu sendok tanah mengandung jutaan mikroorganisme. Bagian dari mereka bekerja setiap hari menopang pertumbuhan tanaman.",
    body: [
      "Tanah pertanian bukan sekadar media fisik. Ia adalah ekosistem yang dihuni berbagai jenis mikroorganisme, dari bakteri dan jamur hingga aktinomisetes.",
      "Masing-masing kelompok memiliki peran berbeda dalam rantai penguraian dan transformasi hara. Keberagaman ini menentukan ketahanan ekosistem tanah.",
      "Ketika praktik budidaya mengurangi bahan organik, sumber energi bagi mikroorganisme ikut berkurang dan aktivitas biologis tanah menurun.",
      "Riset kami berfokus pada karakterisasi mikroorganisme lokal dan bagaimana potensinya dapat diarahkan menjadi produk yang berguna bagi lahan budidaya.",
    ],
    publishedAt: "2026-07-19",
    readingMinutes: 6,
    image: { src: "/images/petri-dish.jpg", alt: "Cawan petri berisi kultur mikroorganisme" },
    author: "Tim Riset",
    sample: true,
  },
  {
    slug: "program-terpadu-bukan-solusi-tunggal",
    title: "Mengapa Program Terpadu Lebih Baik daripada Solusi Tunggal",
    category: "Artikel Agribisnis",
    excerpt:
      "Masalah kesuburan lahan jarang punya satu penyebab. Karena itu, program terpadu biasanya memberi hasil yang lebih konsisten.",
    body: [
      "Lahan adalah sistem. Kondisi fisik, kimia, dan biologi saling memengaruhi, sehingga intervensi tunggal sering kali tidak cukup.",
      "Contohnya, menambah mikroorganisme tanpa menyediakan bahan organik sebagai sumber energi akan menghasilkan respons yang terbatas.",
      "Pendekatan terpadu memulai dari asesmen lahan, lalu menyusun urutan perlakuan yang saling menopang satu sama lain.",
      "Pendekatan ini juga membuat evaluasi lebih bermakna, karena setiap komponen program dapat ditelusuri dampaknya secara terpisah.",
    ],
    publishedAt: "2026-06-30",
    readingMinutes: 4,
    image: { src: "/images/plantation-stages.jpg", alt: "Areal perkebunan kelapa sawit dengan berbagai fase pertumbuhan" },
    author: "Tim Agronomi",
    sample: true,
  },
  {
    slug: "demonstration-plot-sebagai-uji-lapangan",
    title: "Demonstration Plot: Menguji Program sebelum Diperluas",
    category: "Kegiatan Penelitian",
    excerpt:
      "Plot demonstrasi menjadi jembatan antara hasil laboratorium dan keputusan di tingkat lahan.",
    body: [
      "Uji lapangan dilakukan pada lahan nyata dengan kondisi yang tidak seragam, sehingga hasilnya lebih representatif dibandingkan uji dalam ruang terkendali.",
      "Plot demonstrasi memungkinkan pengamatan respon tanaman dan tanah secara berkala terhadap program yang diusulkan.",
      "Data yang terkumpul menjadi dasar untuk menyesuaikan komponen program, dosis aplikasi, dan jadwal pelaksanaan.",
      "Bagi mitra perkebunan, plot demonstrasi juga menjadi ruang untuk melihat dan menilai program sebelum pengambilan keputusan investasi.",
    ],
    publishedAt: "2026-06-11",
    readingMinutes: 5,
    image: { src: "/images/seed-trays.jpg", alt: "Baki benih dalam fasilitas pembibitan untuk uji lapangan" },
    author: "Tim Riset",
    sample: true,
  },
];

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}
