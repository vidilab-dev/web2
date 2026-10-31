/**
 * SOLUTIONS CONTENT
 *
 * Describes how PT BIN's five-stage approach applies to three audiences.
 * No figures, no yield claims: the value is in the method, described honestly.
 */

export type SolutionAudience = {
  slug: "integrated" | "plantation" | "agricultural";
  title: string;
  headline: string;
  lede: string;
  photo: { src: string; alt: string };
  forWhom: string;
  approach: { title: string; body: string }[];
  considerations: string[];
  cta: { label: string; href: string };
};

export const solutionAudiences: SolutionAudience[] = [
  {
    slug: "integrated",
    title: "Bio-Agribisnis Terintegrasi",
    headline: "Satu program dari asesmen lahan sampai evaluasi kinerja.",
    lede: "Pendekatan lima tahap yang menyatukan asesmen lahan, perlakuan biologis, perlindungan tanaman, pemantauan lapangan, dan evaluasi kinerja dalam satu siklus yang saling menopang.",
    photo: {
      src: "/images/plantation-aerial.jpg",
      alt: "Pandangan udara atas areal perkebunan yang membentang luas",
    },
    forWhom:
      "Untuk perkebunan, perusahaan agribisnis, dan lembaga yang membutuhkan program pemeliharaan lahan yang utuh, bukan sekadar daftar produk.",
    approach: [
      {
        title: "Asesmen sebagai titik awal",
        body: "Program dimulai dari mengkaji kondisi lahan, riwayat penggunaan, dan praktik budidaya yang berjalan, bukan dari katalog produk.",
      },
      {
        title: "Komponen yang saling menopang",
        body: "Pembenahan bahan organik, nutrisi hayati, dan perlindungan tanaman disusun sebagai satu rangkaian, karena masing-masing membutuhkan yang lain untuk bekerja optimal.",
      },
      {
        title: "Umpan balik dari lapangan",
        body: "Respon lahan dan tanaman dipantau secara berkala, sehingga penyesuaian dapat dilakukan berdasarkan kondisi nyata, bukan rencana semula.",
      },
      {
        title: "Evaluasi yang membuka siklus berikutnya",
        body: "Hasil dievaluasi untuk menyempurnakan program pada siklus berikutnya, menjaga kontinuitas produksi dari musim ke musim.",
      },
    ],
    considerations: [
      "Ketersediaan data lahan dan riwayat budidaya mempercepat penyusunan program.",
      "Keterlibatan tim lapangan menentukan kualitas umpan balik yang diterima.",
      "Evaluasi membutuhkan kesamaan cara pengukuran antar-periode agar perbandingannya bermakna.",
    ],
    cta: { label: "Diskusikan Program Anda", href: "/contact" },
  },
  {
    slug: "plantation",
    title: "Solusi Perkebunan",
    headline: "Program nutrisi dan perlakuan biologi untuk skala perkebunan.",
    lede: "Untuk holding dan perusahaan perkebunan yang membutuhkan program pemeliharaan lahan konsisten di areal luas, dengan pendekatan yang menyesuaikan kondisi tiap blok.",
    photo: {
      src: "/images/plantation-stages.jpg",
      alt: "Areal perkebunan kelapa sawit dengan berbagai fase pertumbuhan tanaman",
    },
    forWhom:
      "Untuk pengelola perkebunan sawit, karet, kelapa, dan komoditas perkebunan lain yang mengelola lahan dalam skala besar.",
    approach: [
      {
        title: "Klasifikasi blok lahan",
        body: "Areal dibedakan berdasarkan kondisi tanah dan riwayat pengelolaan, sehingga program dapat bervariasi antar blok.",
      },
      {
        title: "Program nutrisi berkelanjutan",
        body: "Lini produk organik dan hayati disusun untuk mendukung ketersediaan hara dan aktivitas biologis tanah secara berkesinambungan.",
      },
      {
        title: "Pendampingan tim lapangan",
        body: "Tim agronomi mendampingi pelaksanaan program dan memantau respon di lapangan secara berkala.",
      },
      {
        title: "Pelaporan yang dapat ditindaklanjuti",
        body: "Temuan lapangan dirangkum menjadi rekomendasi yang dapat ditindaklanjuti oleh pengelola perkebunan.",
      },
    ],
    considerations: [
      "Areal yang beragam kondisinya membutuhkan pembagian blok sebelum program disusun.",
      "Jadwal pelaksanaan menyesuaikan siklus tanam dan ketersediaan tenaga kerja.",
      "Kontinuitas pasokan produk perlu dikoordinasikan sejak awal program.",
    ],
    cta: { label: "Ajukan Penawaran Perkebunan", href: "/rfq" },
  },
  {
    slug: "agricultural",
    title: "Solusi Pertanian",
    headline: "Pendekatan yang terjangkau dan dapat dijalankan petani.",
    lede: "Untuk lahan budidaya dan kelompok tani yang membutuhkan solusi pemeliharaan tanah dan nutrisi tanaman yang dapat dijalankan dengan keterbatasan sarana.",
    photo: {
      src: "/images/farmer-planting.jpg",
      alt: "Petani menanam benih padi di lahan persawahan Bali",
    },
    forWhom:
      "Untuk kelompok tani, koperasi, dan petani binaan yang membutuhkan pendekatan sederhana namun berbasis pengujian.",
    approach: [
      {
        title: "Fokus pada perbaikan tanah",
        body: "Program dimulai dari perbaikan kandungan bahan organik tanah sebagai fondasi kesuburan yang berkelanjutan.",
      },
      {
        title: "Produk yang mudah diaplikasikan",
        body: "Lini produk dipilih berdasarkan kemudahan penggunaan dan ketersediaan di wilayah masing-masing.",
      },
      {
        title: "Pendampingan langsung",
        body: "Tim lapangan mendampingi petani dalam pelaksanaan program dan pengamatan respon tanaman.",
      },
      {
        title: "Evaluasi bersama",
        body: "Hasil dievaluasi bersama petani sebagai dasar perbaikan program pada siklus berikutnya.",
      },
    ],
    considerations: [
      "Ketersediaan air dan musim tanam menentukan jadwal pelaksanaan.",
      "Pelatihan sederhana diperlukan agar produk digunakan sesuai petunjuk.",
      "Evaluasi perlu memperhatikan variasi kondisi antar-plot.",
    ],
    cta: { label: "Hubungi Tim Kami", href: "/contact" },
  },
];
