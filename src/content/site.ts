/**
 * Centralised site configuration.
 * Every string that appears in the chrome, metadata or structured data
 * lives here so it can be swapped in one place.
 */

export const site = {
  name: "PT Bio Industri Nusantara",
  shortName: "PT BIN",
  legalName: "PT Bio Industri Nusantara",
  tagline: "Integrated Bio-Agribusiness Solution",
  description:
    "PT Bio Industri Nusantara memproduksi pupuk organik, pupuk hayati, dan solusi pengendali hayati berbasis mikroorganisme untuk perkebunan dan pertanian yang produktif, berkelanjutan, dan bernilai tambah.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "id_ID",
  localeAlt: "en_US",
  keywords: [
    "PT Bio Industri Nusantara",
    "pupuk organik",
    "pupuk hayati",
    "pupuk organik perkebunan",
    "biofertilizer Indonesia",
    "solusi pertanian berkelanjutan",
    "teknologi pertanian hayati",
    "pupuk berbasis mikroorganisme",
    "integrated bio-agribusiness solution",
  ],
} as const;

export const contact = {
  /**
   * PLACEHOLDER, replace with PT BIN's verified corporate details before launch.
   * These values are intentionally neutral so nothing unverified is published.
   */
  address: "Alamat kantor PT BIN akan ditampilkan di sini",
  city: "Indonesia",
  email: "corporate@ptbin.example",
  phone: "+62 000 0000 0000",
  hours: "Senin – Jumat, 08.00 – 17.00 WIB",
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "YouTube", href: "https://www.youtube.com/" },
  ],
} as const;

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string; description?: string }[];
};

export const navigation: NavItem[] = [
  {
    label: "Tentang Kami",
    href: "/about",
    children: [
      { label: "Profil Perusahaan", href: "/about", description: "Siapa PT BIN dan bagaimana kami bekerja." },
      { label: "Visi & Misi", href: "/about/vision-mission", description: "Arah dan komitmen jangka panjang perusahaan." },
      { label: "Nilai Perusahaan", href: "/about/values", description: "Prinsip yang memandu setiap keputusan kami." },
      { label: "Struktur Organisasi", href: "/about/organization", description: "Tim yang menjalankan operasi harian." },
    ],
  },
  {
    label: "Produk",
    href: "/products",
    children: [
      { label: "Katalog Produk", href: "/products", description: "Seluruh produk pupuk organik dan hayati." },
      { label: "Pupuk Organik", href: "/products/category/pupuk-organik", description: "Produk berbasis bahan organik." },
      { label: "Pupuk Hayati", href: "/products/category/pupuk-hayati", description: "Produk berbasis mikroorganisme." },
      { label: "Pengendali Hayati", href: "/products/category/pengendali-hayati", description: "Solusi hayati untuk perlindungan tanaman." },
    ],
  },
  {
    label: "Solusi",
    href: "/solutions",
    children: [
      { label: "Bio-Agribisnis Terintegrasi", href: "/solutions/integrated", description: "Pendekatan lima tahap dari lahapan ke hasil." },
      { label: "Solusi Perkebunan", href: "/solutions/plantation", description: "Untuk holding dan perusahaan perkebunan." },
      { label: "Solusi Pertanian", href: "/solutions/agricultural", description: "Untuk lahan budidaya dan kelompok tani." },
    ],
  },
  {
    label: "Riset & Inovasi",
    href: "/research",
    children: [
      { label: "Kegiatan Riset", href: "/research", description: "Bidang yang sedang kami kembangkan." },
      { label: "Laboratorium", href: "/research/laboratory", description: "Pengujian dan karakterisasi mikroorganisme." },
      { label: "Demonstration Plot", href: "/research/demonstration-plot", description: "Uji lapangan dan validasi hasil." },
      { label: "Inovasi", href: "/research/innovation", description: "Cara kami mengubah temuan menjadi produk." },
    ],
  },
  { label: "Keberlanjutan", href: "/sustainability" },
  { label: "Wawasan", href: "/news" },
  { label: "Kemitraan", href: "/partnership" },
];

export const footerNavigation = {
  company: [
    { label: "Profil Perusahaan", href: "/about" },
    { label: "Visi & Misi", href: "/about/vision-mission" },
    { label: "Nilai Perusahaan", href: "/about/values" },
    { label: "Struktur Organisasi", href: "/about/organization" },
  ],
  explore: [
    { label: "Solusi Terintegrasi", href: "/solutions/integrated" },
    { label: "Solusi Perkebunan", href: "/solutions/plantation" },
    { label: "Solusi Pertanian", href: "/solutions/agricultural" },
    { label: "Keberlanjutan", href: "/sustainability" },
  ],
  research: [
    { label: "Kegiatan Riset", href: "/research" },
    { label: "Laboratorium", href: "/research/laboratory" },
    { label: "Demonstration Plot", href: "/research/demonstration-plot" },
    { label: "Wawasan", href: "/news" },
  ],
  connect: [
    { label: "Hubungi Kami", href: "/contact" },
    { label: "Jadi Mitra", href: "/partnership" },
    { label: "Registrasi Distributor", href: "/partnership/distributor" },
    { label: "Permintaan Penawaran", href: "/rfq" },
  ],
} as const;
