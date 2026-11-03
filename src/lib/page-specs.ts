/**
 * PAGE SPECS — the registry behind the admin "Halaman" editor.
 *
 * Every public page that the admin panel can edit declares its fields here:
 * which keys exist, how each is edited (text, paragraph block, list, item
 * table, image), and the default values the site falls back to when nothing
 * has been saved yet.
 *
 * HONESTY RULE: defaults are imported from the typed local content layer in
 * src/content wherever possible. Editing a page never invents facts — it only
 * replaces the copy that is already written there.
 */

import {
  capabilities as baseCapabilities,
  outcomeDimensions,
  partnershipTypes,
  researchActivities,
  researchImages,
  solutionStages,
  sustainabilityPillars,
} from "@/content/home";
import {
  demonstrationStages,
  innovationSteps,
  laboratoryAspects,
  researchFields,
  researchPhotos,
} from "@/content/research";
import { solutionAudiences } from "@/content/solutions";
import { contact } from "@/content/site";

export type PageValue =
  | string
  | string[]
  | { src: string; alt: string }
  | Record<string, string>[];

export type FieldColumn = { key: string; label: string };

export type FieldKind = "text" | "textarea" | "paragraphs" | "list" | "items" | "image";

export type FieldSpec = {
  key: string;
  label: string;
  kind: FieldKind;
  /** For "items": the columns of each row. */
  columns?: FieldColumn[];
  hint?: string;
  /** Optional grouping heading inside the admin form (long pages). */
  section?: string;
};

export type PageSpec<
  T extends Record<string, PageValue> = Record<string, PageValue>,
> = {
  /** Public route path, e.g. "/" or "/about/vision-mission". */
  path: string;
  /** Display label in the admin list. */
  label: string;
  /** Group heading in the admin list. */
  group: string;
  fields: FieldSpec[];
  /** Live values until an admin saves an override for this page. */
  defaults: T;
};

/** The shared page-header fields (title / lede / photo band). */
function header(withPhoto: boolean): FieldSpec[] {
  const fields: FieldSpec[] = [
    {
      key: "headerTitle",
      label: "Judul halaman",
      // textarea: a single-line <input> strips the "\n" line breaks the
      // PageHeader renders via whitespace-pre-line.
      kind: "textarea",
      hint: "Baris baru pada teks diartikan sebagai pemecah baris pada tampilan.",
    },
    {
      key: "headerLede",
      label: "Kalimat pengantar (lede)",
      kind: "text",
    },
  ];
  if (withPhoto) fields.push({ key: "headerPhoto", label: "Foto header", kind: "image" });
  return fields;
}

// ---------------------------------------------------------------------------
// Tentang Kami
// ---------------------------------------------------------------------------

export const aboutSpec = {
  path: "/about",
  label: "Profil Perusahaan",
  group: "Tentang Kami",
  fields: [
    ...header(true),
    { key: "profileIntro", label: "Kalimat pembuka profil", kind: "textarea" },
    {
      key: "profileBody",
      label: "Paragraf isi profil",
      kind: "paragraphs",
      hint: "Pisahkan tiap paragraf dengan satu baris kosong.",
    },
    { key: "developmentHeading", label: "Judul bagian “Arah Pengembangan”", kind: "text" },
    {
      key: "timeline",
      label: "Tahap pengembangan",
      kind: "items",
      columns: [
        { key: "period", label: "Periode" },
        { key: "title", label: "Judul" },
        { key: "description", label: "Deskripsi" },
      ],
    },
    { key: "valuesHeading", label: "Judul bagian nilai", kind: "text" },
    { key: "valuesPhoto", label: "Foto bagian nilai", kind: "image" },
  ],
  defaults: {
    headerTitle: "Profil\nPerusahaan",
    headerLede:
      "PT Bio Industri Nusantara membangun industri pupuk organik dan hayati di atas satu keyakinan: tanah yang sehat adalah fondasi produktivitas.",
    headerPhoto: {
      src: "/images/plantation-stages.jpg",
      alt: "Areal perkebunan kelapa sawit dengan berbagai fase pertumbuhan",
    },
    profileIntro:
      "PT Bio Industri Nusantara adalah perusahaan yang bergerak di industri pupuk organik, produksi pupuk hayati, dan pengembangan solusi pertanian berbasis mikroorganisme.",
    profileBody: [
      "Perusahaan menjawab satu kebutuhan yang terus tumbuh: menjaga produktivitas lahan tanpa mengorbankan kondisi tanah yang menopangnya. Pendekatan itu dimulai dari memahami mikroorganisme, bahan organik, dan cara keduanya bekerja pada zona perakaran.",
      "Kami mengembangkan lini produk pupuk organik dan hayati, lalu menempatkannya dalam program yang lebih luas, mulai dari asesmen lahan, perlakuan biologis, perlindungan tanaman, pemantauan, sampai evaluasi kinerja.",
      "Di setiap tahap, keputusan teknis diambil berdasarkan pengujian, bukan kebiasaan. Riset laboratorium dan demonstration plot menjadi jembatan antara temuan ilmiah dan kebutuhan nyata di lapangan.",
      "Perusahaan bekerja bersama holding perkebunan, perusahaan agribisnis, petani, distributor, akademisi, dan lembaga penelitian untuk memastikan teknologi hayati benar-benar sampai ke lahan yang membutuhkannya.",
    ],
    developmentHeading: "Arah Pengembangan",
    timeline: [
      {
        period: "Fondasi",
        title: "Industri pupuk organik",
        description:
          "Perusahaan membangun kapasitas produksi pupuk organik dari pengolahan bahan organik.",
      },
      {
        period: "Pengembangan",
        title: "Lini pupuk hayati",
        description:
          "Riset mikroorganisme berkembang menjadi lini produk hayati dan pengendali hayati.",
      },
      {
        period: "Terintegrasi",
        title: "Integrated bio-agribusiness",
        description:
          "Perusahaan menyusun pendekatan lima tahap yang menggabungkan produk, pemantauan, dan evaluasi.",
      },
    ],
    valuesHeading: "Nilai yang Memandu Keputusan",
    valuesPhoto: {
      src: "/images/farmer-planting.jpg",
      alt: "Petani menanam benih padi di sawah Bali",
    },
  },
} satisfies PageSpec;

export const visionMissionSpec = {
  path: "/about/vision-mission",
  label: "Visi & Misi",
  group: "Tentang Kami",
  fields: [
    ...header(true),
    { key: "visionHeading", label: "Judul bagian visi", kind: "text" },
    { key: "visionStatement", label: "Pernyataan visi", kind: "textarea" },
    { key: "visionNote", label: "Catatan visi", kind: "textarea" },
    { key: "missionHeading", label: "Judul bagian misi", kind: "text" },
    { key: "missionLede", label: "Pengantar daftar misi", kind: "text" },
    {
      key: "mission",
      label: "Butir misi",
      kind: "list",
      hint: "Satu butir per baris; urutan menentukan nomor.",
    },
    { key: "closingStatement", label: "Kalimat penutup", kind: "text" },
  ],
  defaults: {
    headerTitle: "Visi\n& Misi",
    headerLede:
      "Dua kalimat yang menentukan arah perusahaan, dan lima komitmen yang menerjemahkannya menjadi pekerjaan sehari-hari.",
    headerPhoto: {
      src: "/images/rice-terraces.jpg",
      alt: "Terras sawah yang membentang mengikuti kontur lahan",
    },
    visionHeading: "Visi",
    visionStatement:
      "Menjadi perusahaan bio-agribisnis nasional yang dipercaya sebagai mitra pertanian berkelanjutan.",
    visionNote: "Formulasi visi bersifat contoh dan menunggu konfirmasi resmi perusahaan.",
    missionHeading: "Misi",
    missionLede:
      "Lima komitmen yang mengubah arah perusahaan menjadi tindakan yang dapat dinilai.",
    mission: [
      "Mengembangkan dan memproduksi pupuk organik serta pupuk hayati yang dapat diandalkan oleh perkebunan dan petani.",
      "Menerapkan riset mikroorganisme sebagai dasar pengembangan setiap produk dan program.",
      "Menyelenggarakan program solusi terintegrasi yang menyatukan asesmen lahan, perlakuan biologis, perlindungan tanaman, pemantauan, dan evaluasi.",
      "Membangun kemitraan dengan perkebunan, distributor, akademisi, dan lembaga penelitian untuk memperluas pemanfaatan teknologi pertanian hayati.",
      "Menjaga kualitas produksi dan pengetahuan teknis sebagai fondasi kepercayaan jangka panjang.",
    ],
    closingStatement: "Lihat nilai-nilai yang memandu keputusan teknis kami.",
  },
} satisfies PageSpec;

export const valuesSpec = {
  path: "/about/values",
  label: "Nilai Perusahaan",
  group: "Tentang Kami",
  fields: [
    ...header(true),
    {
      key: "values",
      label: "Daftar nilai",
      kind: "items",
      columns: [
        { key: "title", label: "Nama nilai" },
        { key: "description", label: "Deskripsi" },
      ],
      hint: "Nilai pertama tampil sebagai sorotan utama halaman.",
    },
    { key: "closingStatement", label: "Kalimat penutup", kind: "text" },
  ],
  defaults: {
    headerTitle: "Nilai\nPerusahaan",
    headerLede:
      "Nilai hanya berguna ketika menentukan apa yang kami kerjakan, apa yang kami uji, dan apa yang kami tunda sampai terbukti.",
    headerPhoto: {
      src: "/images/farmer-harvest.jpg",
      alt: "Petani memanen padi di lahan persawahan Indonesia",
    },
    values: [
      {
        title: "Berbasis Bukti",
        description:
          "Keputusan teknis diambil dari pengujian laboratorium dan pengamatan lapangan, bukan dari asumsi yang diulang tanpa diperiksa.",
      },
      {
        title: "Menjaga Lahan",
        description:
          "Kesuburan tanah diperlakukan sebagai aset jangka panjang. Setiap program dinilai dari dampaknya terhadap kondisi lahan, bukan hanya hasil satu musim.",
      },
      {
        title: "Konsisten di Lapangan",
        description:
          "Produk dan program harus dapat dijalankan secara konsisten oleh tim lapangan maupun oleh pengguna akhir di kondisi yang berbeda-beda.",
      },
      {
        title: "Terbuka pada Kolaborasi",
        description:
          "Permasalahan pertanian tidak selesai oleh satu pihak. Kami bekerja bersama petani, perkebunan, akademisi, dan lembaga penelitian.",
      },
      {
        title: "Jujur pada Keterbatasan",
        description:
          "Kami menyatakan apa yang telah terverifikasi dan mengakui apa yang belum. Data dan spesifikasi hanya dipublikasikan setelah dikonfirmasi.",
      },
    ],
    closingStatement: "Nilai ini dijalankan oleh fungsi-fungsi di seluruh perusahaan.",
  },
} satisfies PageSpec;

export const organizationSpec = {
  path: "/about/organization",
  label: "Struktur Organisasi",
  group: "Tentang Kami",
  fields: [
    ...header(true),
    {
      key: "functions",
      label: "Fungsi operasional",
      kind: "items",
      columns: [
        { key: "function", label: "Fungsi" },
        { key: "scope", label: "Cakupan" },
      ],
    },
    { key: "noteHeading", label: "Judul catatan penyusunan", kind: "text" },
    { key: "note", label: "Catatan penyusunan", kind: "textarea" },
    { key: "figurePhoto", label: "Foto pendukung", kind: "image" },
    { key: "figureCaption", label: "Keterangan foto", kind: "text" },
  ],
  defaults: {
    headerTitle: "Struktur\nOrganisasi",
    headerLede:
      "Tujuh fungsi yang menjalankan riset, produksi, mutu, dan pendampingan lapangan sebagai satu kesatuan operasional.",
    headerPhoto: {
      src: "/images/lab-sem.jpg",
      alt: "Tim peneliti bekerja menggunakan mikroskop elektron",
    },
    functions: [
      {
        function: "Direksi",
        scope: "Penetapan arah strategis perusahaan, pengembangan usaha, dan hubungan dengan mitra korporasi.",
      },
      {
        function: "Penelitian & Pengembangan",
        scope: "Isolasi dan karakterisasi mikroorganisme, pengembangan formulasi, serta koordinasi kolaborasi penelitian.",
      },
      {
        function: "Produksi",
        scope: "Pengolahan bahan baku, pengendalian proses produksi, dan penjaminan konsistensi mutu produk.",
      },
      {
        function: "Kualitas & Laboratorium",
        scope: "Pengujian mutu, viabilitas, dan karakteristik produk sebelum dan sesudah produksi.",
      },
      {
        function: "Agronomi & Layanan Lapangan",
        scope: "Asesmen lahan, pendampingan program di lapangan, pemantauan, dan pelaporan evaluasi.",
      },
      {
        function: "Pemasaran & Pengembangan Bisnis",
        scope: "Pemasaran produk, pengelolaan kemitraan perkebunan, distribusi, dan permintaan penawaran.",
      },
      {
        function: "Operasi & Administrasi",
        scope: "Pengadaan, logistik, keuangan, dan administrasi perusahaan.",
      },
    ],
    noteHeading: "Catatan penyusunan",
    note: "Struktur organisasi berikut disusun berdasarkan fungsi operasional umum dan menunggu konfirmasi susunan resmi perusahaan.",
    figurePhoto: {
      src: "/images/seed-trays.jpg",
      alt: "Baki benih dan media tanam dalam fasilitas pembibitan",
    },
    figureCaption:
      "Fungsi lapangan dan fungsi laboratorium bekerja pada satu program yang sama.",
  },
} satisfies PageSpec;

// ---------------------------------------------------------------------------
// Riset & Inovasi
// ---------------------------------------------------------------------------

export const researchSpec = {
  path: "/research",
  label: "Riset & Inovasi",
  group: "Riset & Inovasi",
  fields: [
    ...header(true),
    { key: "fieldsHeading", label: "Judul bagian bidang riset", kind: "text" },
    { key: "fieldsLede", label: "Pengantar bidang riset", kind: "text" },
    {
      key: "researchFields",
      label: "Bidang riset",
      kind: "items",
      columns: [
        { key: "title", label: "Nama bidang" },
        { key: "body", label: "Uraian" },
      ],
    },
    { key: "narrativePhoto", label: "Foto narasi", kind: "image" },
    { key: "narrativeHeading", label: "Judul narasi", kind: "text" },
    { key: "narrativeStatement", label: "Kalimat sorotan narasi", kind: "textarea" },
    {
      key: "narrativeBody",
      label: "Paragraf narasi",
      kind: "paragraphs",
      hint: "Pisahkan tiap paragraf dengan satu baris kosong.",
    },
    { key: "exploreHeading", label: "Judul bagian jelajah", kind: "text" },
    { key: "closingStatement", label: "Kalimat penutup", kind: "text" },
  ],
  defaults: {
    headerTitle: "Riset\n& Inovasi",
    headerLede: "Setiap produk dimulai dari pertanyaan yang diuji, bukan dari asumsi yang diulang.",
    headerPhoto: researchPhotos.laboratory,
    fieldsHeading: "Bidang Riset",
    fieldsLede: "Empat bidang yang menjadi dasar pengembangan produk dan program kami.",
    researchFields,
    narrativePhoto: researchPhotos.culture,
    narrativeHeading: "Dari Laboratorium ke Lapangan",
    narrativeStatement: "Temuan ilmiah hanya berguna ketika sampai ke lahan yang membutuhkannya.",
    narrativeBody: [
      "Riset laboratorium menjadi fondasi, tetapi tidak berhenti di sana. Setiap temuan diuji ulang pada kondisi lapangan yang sesungguhnya melalui plot demonstrasi.",
      "Proses ini memastikan bahwa produk yang akhirnya dipasarkan sudah melewati kedua tahap pengujian: ketepatan ilmiah dan kecocokan lapangan.",
    ],
    exploreHeading: "Jelajahi Lebih Dalam",
    closingStatement: "Tertarik berkolaborasi dalam penelitian atau pengujian lapangan?",
  },
} satisfies PageSpec;

export const laboratorySpec = {
  path: "/research/laboratory",
  label: "Laboratorium",
  group: "Riset & Inovasi",
  fields: [
    ...header(true),
    { key: "culturePhoto", label: "Foto kultur", kind: "image" },
    { key: "cultureCaption", label: "Keterangan foto kultur", kind: "text" },
    { key: "statement", label: "Kalimat sorotan", kind: "textarea" },
    { key: "introBody", label: "Paragraf pengantar", kind: "textarea" },
    {
      key: "aspects",
      label: "Aspek pengujian",
      kind: "items",
      columns: [
        { key: "title", label: "Aspek" },
        { key: "body", label: "Uraian" },
      ],
    },
    { key: "closingStatement", label: "Kalimat penutup", kind: "text" },
  ],
  defaults: {
    headerTitle: "Laboratorium",
    headerLede: "Tempat setiap klaim teknis diuji sebelum sampai ke tangan pengguna.",
    headerPhoto: researchPhotos.laboratory,
    culturePhoto: researchPhotos.culture,
    cultureCaption:
      "Kultur mikroorganisme ditelaah sebagai dasar pengembangan produk hayati.",
    statement: "Laboratorium memastikan kualitas sebelum produk meninggalkan pintu produksi.",
    introBody:
      "Pengujian laboratorium menjadi titik kontrol mutu di setiap tahap: dari karakterisasi isolat awal, pengujian viabilitas produksi, sampai pemeriksaan produk jadi.",
    aspects: laboratoryAspects,
    closingStatement: "Ingin melihat hasil pengujian untuk produk tertentu?",
  },
} satisfies PageSpec;

export const demonstrationPlotSpec = {
  path: "/research/demonstration-plot",
  label: "Demonstration Plot",
  group: "Riset & Inovasi",
  fields: [
    ...header(true),
    { key: "statement", label: "Kalimat sorotan", kind: "textarea" },
    { key: "introBody", label: "Paragraf pengantar", kind: "textarea" },
    { key: "soilPhoto", label: "Foto kondisi lahan", kind: "image" },
    { key: "soilCaption", label: "Keterangan foto lahan", kind: "text" },
    { key: "stagesHeading", label: "Judul bagian tahapan", kind: "text" },
    {
      key: "stages",
      label: "Tahapan plot",
      kind: "items",
      columns: [
        { key: "stage", label: "Tahap" },
        { key: "body", label: "Uraian" },
      ],
    },
    { key: "closingStatement", label: "Kalimat penutup", kind: "text" },
  ],
  defaults: {
    headerTitle: "Demonstration\nPlot",
    headerLede:
      "Uji lapangan terkontrol yang menjembatani hasil laboratorium dan keputusan di tingkat lahan.",
    headerPhoto: researchPhotos.field,
    statement: "Hasil laboratorium baru bermakna setelah diuji pada lahan nyata.",
    introBody:
      "Plot demonstrasi memungkinkan pengamatan respon tanaman dan tanah pada kondisi yang tidak seragam, sehingga hasilnya lebih representatif dibandingkan uji dalam ruang terkendali.",
    soilPhoto: researchPhotos.compost,
    soilCaption: "Kondisi tanah dan bahan organik dicatat sebagai pembanding awal.",
    stagesHeading: "Tahapan Plot Demonstrasi",
    stages: demonstrationStages,
    closingStatement: "Ingin menjadi lokasi plot demonstrasi untuk wilayah Anda?",
  },
} satisfies PageSpec;

export const innovationSpec = {
  path: "/research/innovation",
  label: "Inovasi",
  group: "Riset & Inovasi",
  fields: [
    ...header(true),
    { key: "stepsHeading", label: "Judul bagian tahap inovasi", kind: "text" },
    { key: "stepsLede", label: "Pengantar tahap inovasi", kind: "text" },
    {
      key: "steps",
      label: "Tahap inovasi",
      kind: "items",
      columns: [
        { key: "title", label: "Tahap" },
        { key: "body", label: "Uraian" },
      ],
    },
    { key: "figurePhoto", label: "Foto pendukung", kind: "image" },
    { key: "figureCaption", label: "Keterangan foto", kind: "text" },
    { key: "closingStatement", label: "Kalimat penutup", kind: "text" },
  ],
  defaults: {
    headerTitle: "Inovasi",
    headerLede: "Cara kami mengubah pertanyaan dari lapangan menjadi produk yang siap dipasarkan.",
    headerPhoto: {
      src: "/images/lab-sem.jpg",
      alt: "Sampel penelitian di bawah mikroskop elektron",
    },
    stepsHeading: "Lima Tahap Inovasi",
    stepsLede:
      "Sebuah proses yang dimulai dari kebutuhan nyata dan berakhir dengan produk yang dapat diproduksi secara konsisten.",
    steps: innovationSteps,
    figurePhoto: {
      src: "/images/lab-microscope.jpg",
      alt: "Peneliti mengamati sampel mikroorganisme di bawah mikroskop",
    },
    figureCaption: "Setiap konsep diuji di laboratorium sebelum menjadi produk.",
    closingStatement: "Ingin berkolaborasi dalam pengembangan produk hayati?",
  },
} satisfies PageSpec;

// ---------------------------------------------------------------------------
// Keberlanjutan
// ---------------------------------------------------------------------------

export const sustainabilitySpec = {
  path: "/sustainability",
  label: "Keberlanjutan",
  group: "Keberlanjutan",
  fields: [
    ...header(true),
    {
      key: "pillars",
      label: "Pilar keberlanjutan",
      kind: "items",
      columns: [
        { key: "title", label: "Nama pilar" },
        { key: "description", label: "Uraian" },
      ],
      hint: "Tampil sebagai pita bergantian; juga dipakai di beranda.",
    },
    { key: "commitmentsHeading", label: "Judul bagian komitmen", kind: "text" },
    { key: "commitmentsLede", label: "Pengantar komitmen", kind: "text" },
    { key: "commitmentsPhoto", label: "Foto komitmen", kind: "image" },
    { key: "commitmentsCaption", label: "Keterangan foto komitmen", kind: "text" },
    {
      key: "commitments",
      label: "Komitmen konkret",
      kind: "items",
      columns: [
        { key: "title", label: "Komitmen" },
        { key: "body", label: "Uraian" },
      ],
    },
    { key: "closingStatement", label: "Kalimat penutup", kind: "text" },
  ],
  defaults: {
    headerTitle: "Keberlanjutan\nyang Dikerjakan",
    headerLede:
      "Bagi kami, keberlanjutan bukan pernyataan. Ia adalah keputusan teknis yang diambil di setiap tahap program.",
    headerPhoto: {
      src: "/images/rice-terraces.jpg",
      alt: "Terras sawah di Tabanan, Bali, membentang mengikuti kontur lahan",
    },
    pillars: sustainabilityPillars,
    commitmentsHeading: "Komitmen Konkret",
    commitmentsLede:
      "Empat area di mana keberlanjutan diterjemahkan menjadi tindakan yang dapat dipantau.",
    commitmentsPhoto: {
      src: "/images/compost-sieved.jpg",
      alt: "Kompos yang telah diayak dan siap diaplikasikan",
    },
    commitmentsCaption: "Bahan organik diolah menjadi produk yang kembali ke tanah.",
    commitments: [
      {
        title: "Pengurangan limbah organik",
        body: "Lini produk kami diarahkan untuk mengolah bahan organik menjadi produk yang bermanfaat bagi lahan, bukan menjadi beban lingkungan.",
      },
      {
        title: "Penggunaan sumber daya secara efisien",
        body: "Pendekatan terpadu membantu penggunaan input menjadi lebih terarah sehingga sumber daya lahan dimanfaatkan lebih efisien.",
      },
      {
        title: "Pengembangan kapasitas petani",
        body: "Kami berbagi pengetahuan teknis kepada petani dan kelompok tani agar program pemeliharaan lahan dapat dijalankan secara mandiri.",
      },
      {
        title: "Rantai nilai agribisnis yang berkelanjutan",
        body: "Kami membangun jejaring mitra yang menghubungkan produksi, riset, dan pemasaran dalam satu rantai nilai yang saling mendukung.",
      },
    ],
    closingStatement:
      "Keberlanjutan adalah program jangka panjang yang kami jalankan bersama mitra.",
  },
} satisfies PageSpec;

// ---------------------------------------------------------------------------
// Kemitraan
// ---------------------------------------------------------------------------

export const partnershipSpec = {
  path: "/partnership",
  label: "Kemitraan & Kolaborasi",
  group: "Kemitraan",
  fields: [
    ...header(true),
    {
      key: "types",
      label: "Jalur kerja sama",
      kind: "items",
      columns: [
        { key: "title", label: "Nama jalur" },
        { key: "description", label: "Uraian" },
        { key: "href", label: "Tautan (path, mis. /partnership/distributor)" },
      ],
      hint: "Baris dengan tautan /partnership/distributor memakai tombol registrasi.",
    },
    { key: "photo1", label: "Foto jalur 1", kind: "image" },
    { key: "photo2", label: "Foto jalur 2", kind: "image" },
    { key: "photo3", label: "Foto jalur 3", kind: "image" },
    { key: "photo4", label: "Foto jalur 4", kind: "image" },
    { key: "closingStatement", label: "Kalimat penutup", kind: "text" },
  ],
  defaults: {
    headerTitle: "Kemitraan\n& Kolaborasi",
    headerLede:
      "Kami membuka empat jalur kerja sama yang berbeda. Pilih yang paling dekat dengan posisi Anda.",
    headerPhoto: {
      src: "/images/farmer-harvest.jpg",
      alt: "Petani memanen padi di lahan persawahan Indonesia",
    },
    types: partnershipTypes,
    photo1: {
      src: "/images/plantation-stages.jpg",
      alt: "Areal perkebunan kelapa sawit dengan berbagai fase pertumbuhan",
    },
    photo2: {
      src: "/images/rice-terraces.jpg",
      alt: "Terras sawah di Bali yang membentang mengikuti kontur lahan",
    },
    photo3: {
      src: "/images/lab-microscope.jpg",
      alt: "Peneliti mengamati sampel mikroorganisme di bawah mikroskop",
    },
    photo4: {
      src: "/images/palm-fruit-bunch.jpg",
      alt: "Buah segar sawit matang di pohon",
    },
    closingStatement: "Tidak yakin jalur mana yang paling sesuai? Bicarakan dengan tim kami.",
  },
} satisfies PageSpec;

export const distributorSpec = {
  path: "/partnership/distributor",
  label: "Registrasi Distributor",
  group: "Kemitraan",
  fields: [
    ...header(true),
    { key: "benefitsHeading", label: "Judul bagian keuntungan", kind: "text" },
    { key: "benefitsPhoto", label: "Foto keuntungan", kind: "image" },
    { key: "benefitsCaption", label: "Keterangan foto keuntungan", kind: "text" },
    {
      key: "benefits",
      label: "Keuntungan menjadi distributor",
      kind: "items",
      columns: [
        { key: "title", label: "Judul" },
        { key: "description", label: "Uraian" },
      ],
    },
    { key: "formHeading", label: "Judul bagian formulir", kind: "text" },
    { key: "formLede", label: "Pengantar formulir", kind: "text" },
    { key: "formNote", label: "Catatan privasi formulir", kind: "text" },
    { key: "closingStatement", label: "Kalimat penutup", kind: "text" },
  ],
  defaults: {
    headerTitle: "Registrasi\nDistributor",
    headerLede:
      "Bergabunglah sebagai distributor resmi produk PT Bio Industri Nusantara dan kembangkan jaringan Anda di sektor agribisnis.",
    headerPhoto: {
      src: "/images/palm-harvest.jpg",
      alt: "Panen tandan buah segar di perkebunan kelapa sawit",
    },
    benefitsHeading: "Keuntungan Menjadi Distributor",
    benefitsPhoto: {
      src: "/images/seedling-facility.jpg",
      alt: "Bibit tanaman muda dalam fasilitas persemaian",
    },
    benefitsCaption: "Produk yang Anda distribusikan berawal dari fasilitas seperti ini.",
    benefits: [
      {
        title: "Akses lini produk lengkap",
        description:
          "Distributor resmi mendapat akses ke seluruh lini produk organik dan hayati.",
      },
      {
        title: "Dukungan distribusi",
        description:
          "Koordinasi pengiriman dan ketersediaan stok untuk wilayah jangkauan Anda.",
      },
      {
        title: "Pendampingan teknis",
        description:
          "Materi teknis produk dan pendampingan untuk menjawab pertanyaan pelanggan.",
      },
    ],
    formHeading: "Formulir Registrasi",
    formLede:
      "Isi data usaha Anda. Tim kami akan meninjau dan menghubungi Anda untuk langkah selanjutnya.",
    formNote: "Data Anda hanya digunakan untuk proses kemitraan ini.",
    closingStatement: "Ingin mendiskusikan produk terlebih dahulu sebelum mendaftar?",
  },
} satisfies PageSpec;

// ---------------------------------------------------------------------------
// Solusi
// ---------------------------------------------------------------------------

export const solutionsSpec = {
  path: "/solutions",
  label: "Solusi Terintegrasi",
  group: "Solusi",
  fields: [
    ...header(true),
    { key: "stagesHeading", label: "Judul bagian tahap program", kind: "text" },
    { key: "stagesLede", label: "Pengantar tahap program", kind: "text" },
    {
      key: "stages",
      label: "Lima tahap program",
      kind: "items",
      columns: [
        { key: "title", label: "Nama tahap" },
        { key: "detail", label: "Uraian panjang" },
      ],
      hint: "Urutan dan jumlah mengikuti lima tahap bawaan; ubah teksnya saja.",
    },
    { key: "audiencesHeading", label: "Judul bagian audiens", kind: "text" },
    { key: "closingStatement", label: "Kalimat penutup", kind: "text" },
  ],
  defaults: {
    headerTitle: "Solusi\nTerintegrasi",
    headerLede:
      "Kami tidak memulai dari produk. Kami memulai dari lahan, lalu menyusun lima tahap yang saling menopang sampai hasil dievaluasi.",
    headerPhoto: {
      src: "/images/plantation-aerial.jpg",
      alt: "Pandangan udara atas areal perkebunan yang membentang luas",
    },
    stagesHeading: "Lima Tahap Program",
    stagesLede:
      "Urutan ini bukan template. Ia adalah kerangka kerja yang menyesuaikan kondisi setiap lahan.",
    stages: solutionStages.map((s) => ({ title: s.title, detail: s.detail })),
    audiencesHeading: "Solusi untuk Setiap Skala",
    closingStatement:
      "Setiap program dimulai dari satu percakapan tentang kondisi lahan Anda.",
  },
} satisfies PageSpec;

// ---------------------------------------------------------------------------
// Kontak & Penawaran
// ---------------------------------------------------------------------------

export const contactSpec = {
  path: "/contact",
  label: "Hubungi Kami",
  group: "Kontak & Penawaran",
  fields: [
    ...header(true),
    { key: "channelsHeading", label: "Judul kolom kontak", kind: "text" },
    { key: "address", label: "Alamat", kind: "textarea" },
    { key: "city", label: "Kota / negara", kind: "text" },
    { key: "email", label: "Email", kind: "text" },
    { key: "phone", label: "Telepon", kind: "text" },
    { key: "hours", label: "Jam operasional", kind: "text" },
    {
      key: "social",
      label: "Tautan media sosial (juga tampil di footer)",
      kind: "items",
      columns: [
        { key: "label", label: "Nama" },
        { key: "href", label: "URL" },
      ],
    },
    { key: "rfqBoxHeading", label: "Judul kotak penawaran", kind: "text" },
    { key: "rfqBoxBody", label: "Isi kotak penawaran", kind: "textarea" },
    { key: "formHeading", label: "Judul bagian formulir", kind: "text" },
  ],
  defaults: {
    headerTitle: "Hubungi\nKami",
    headerLede:
      "Ada pertanyaan tentang produk, kebutuhan lahan, atau peluang kerja sama? Sampaikan melalui formulir ini atau saluran kontak di samping.",
    headerPhoto: {
      src: "/images/farmer-planting.jpg",
      alt: "Petani menanam benih padi di lahan persawahan",
    },
    channelsHeading: "Kontak Perusahaan",
    address: contact.address,
    city: contact.city,
    email: contact.email,
    phone: contact.phone,
    hours: contact.hours,
    social: contact.social.map((s) => ({ label: s.label, href: s.href })),
    rfqBoxHeading: "Untuk permintaan penawaran",
    rfqBoxBody:
      "Jika Anda membutuhkan penawaran harga atau datasheet produk, gunakan formulir PT BIN khusus agar tim kami dapat menyiapkan tanggapan yang tepat.",
    formHeading: "Kirim Pesan",
  },
} satisfies PageSpec;

/** The contact details the site chrome (footer) renders, same source as /contact. */
export type ContactDetails = typeof contactSpec.defaults;

export const rfqSpec = {
  path: "/rfq",
  label: "Permintaan Penawaran",
  group: "Kontak & Penawaran",
  fields: [
    ...header(true),
    {
      key: "steps",
      label: "Langkah alur",
      kind: "items",
      columns: [
        { key: "title", label: "Langkah" },
        { key: "description", label: "Uraian" },
      ],
    },
    { key: "formHeading", label: "Judul bagian formulir", kind: "text" },
    { key: "formLede", label: "Pengantar formulir", kind: "text" },
    { key: "formNote", label: "Catatan privasi formulir", kind: "text" },
  ],
  defaults: {
    headerTitle: "Permintaan\nPenawaran",
    headerLede:
      "Butuh penawaran harga atau datasheet teknis produk? Isi formulir berikut dan tim kami akan menyiapkan tanggapan yang sesuai dengan kebutuhan lahan Anda.",
    headerPhoto: {
      src: "/images/compost-pile.jpg",
      alt: "Tumpukan kompos organik yang sedang dimatangkan",
    },
    steps: [
      {
        title: "Isi formulir",
        description:
          "Sampaikan jenis lahan, produk yang diminati, dan perkiraan kebutuhan Anda.",
      },
      {
        title: "Kami susun penawaran",
        description:
          "Tim kami menyiapkan penawaran beserta datasheet resmi produk yang relevan.",
      },
      {
        title: "Tindak lanjut",
        description: "Kami menghubungi Anda melalui email atau telepon dalam 1–2 hari kerja.",
      },
    ],
    formHeading: "Formulir Penawaran",
    formLede:
      "Semakin rinci informasi yang Anda berikan, semakin akurat penawaran yang dapat kami siapkan.",
    formNote:
      "Data Anda hanya digunakan untuk keperluan penawaran dan tidak dibagikan kepada pihak ketiga.",
  },
} satisfies PageSpec;

// ---------------------------------------------------------------------------
// Produk & Wawasan
// ---------------------------------------------------------------------------

export const productsSpec = {
  path: "/products",
  label: "Katalog Produk",
  group: "Produk",
  fields: [
    ...header(true),
    { key: "catalogueHeading", label: "Judul bagian katalog", kind: "text" },
    { key: "catalogueLede", label: "Pengantar katalog", kind: "text" },
    { key: "datasheetHeading", label: "Judul bagian datasheet", kind: "text" },
    {
      key: "datasheetBody",
      label: "Paragraf datasheet",
      kind: "paragraphs",
      hint: "Pisahkan tiap paragraf dengan satu baris kosong.",
    },
  ],
  defaults: {
    headerTitle: "Lini\nProduk",
    headerLede:
      "Sembilan produk dalam tiga lini yang dirancang untuk saling melengkapi dalam satu program pemeliharaan lahan.",
    headerPhoto: {
      src: "/images/compost-sieved.jpg",
      alt: "Kompos yang telah diayak dan siap diaplikasikan ke lahan",
    },
    catalogueHeading: "Katalog Lengkap",
    catalogueLede:
      "Nama produk pada tiap pelat adalah identitas resmi produk. Rincian teknis menyusul dari dokumen datasheet perusahaan.",
    datasheetHeading: "Spesifikasi resmi tersedia atas permintaan",
    datasheetBody: [
      "Komposisi, dosis, cara pakai, dan ketentuan registrasi hanya kami publikasikan setelah diverifikasi dari dokumen resmi produk.",
    ],
  },
} satisfies PageSpec;

export const newsSpec = {
  path: "/news",
  label: "Wawasan & Berita",
  group: "Berita & Wawasan",
  fields: [...header(true)],
  defaults: {
    headerTitle: "Wawasan\n& Berita",
    headerLede: "Catatan lapangan, edukasi pertanian, dan tulisan seputar agribisnis hayati.",
    headerPhoto: {
      src: "/images/seed-trays.jpg",
      alt: "Bibit tanaman muda dalam baki persemaian sebelum dipindahkan ke lahan",
    },
  },
} satisfies PageSpec;

// ---------------------------------------------------------------------------
// Detail Solusi (one spec per audience, generated from the content layer)
// ---------------------------------------------------------------------------

export const audienceSpecs = solutionAudiences.map((a) => ({
  path: `/solutions/${a.slug}`,
  label: a.title,
  group: "Solusi",
  fields: [
    ...header(true),
    { key: "headline", label: "Kalimat sorotan", kind: "textarea" },
    { key: "forWhom", label: "Untuk siapa solusi ini", kind: "textarea" },
    { key: "approachHeading", label: "Judul bagian pendekatan", kind: "text" },
    {
      key: "approach",
      label: "Poin pendekatan",
      kind: "items",
      columns: [
        { key: "title", label: "Poin" },
        { key: "body", label: "Uraian" },
      ],
    },
    { key: "considerationsHeading", label: "Judul bagian pertimbangan", kind: "text" },
    { key: "considerationsLede", label: "Pengantar pertimbangan", kind: "text" },
    {
      key: "considerations",
      label: "Hal yang perlu diperhatikan",
      kind: "list",
      hint: "Satu poin per baris.",
    },
    { key: "ctaLabel", label: "Label ajakan (CTA)", kind: "text" },
    { key: "othersHeading", label: "Judul bagian solusi lain", kind: "text" },
  ],
  defaults: {
    headerTitle: a.title,
    headerLede: a.lede,
    headerPhoto: a.photo,
    headline: a.headline,
    forWhom: a.forWhom,
    approachHeading: "Bagaimana Kami Bekerja",
    approach: a.approach,
    considerationsHeading: "Yang Perlu Diperhatikan",
    considerationsLede:
      "Program ini bekerja paling baik ketika hal-hal berikut sudah dipersiapkan sejak awal.",
    considerations: a.considerations,
    ctaLabel: a.cta.label,
    othersHeading: "Solusi Lainnya",
  },
})) satisfies PageSpec[];

// ---------------------------------------------------------------------------
// Beranda (homepage)
// ---------------------------------------------------------------------------

export const homeSpec = {
  path: "/",
  label: "Beranda",
  group: "Beranda",
  fields: [
    { key: "heroTitle", label: "Judul utama", kind: "textarea", section: "Hero", hint: "Baris baru diartikan sebagai pemecah baris." },
    { key: "heroLede", label: "Kalimat pengantar", kind: "textarea", section: "Hero" },
    { key: "heroPhoto", label: "Foto latar hero", kind: "image", section: "Hero" },
    { key: "heroIdentityTitle", label: "Judul identitas (kanan bawah)", kind: "text", section: "Hero" },
    { key: "heroIdentityNote", label: "Catatan identitas", kind: "textarea", section: "Hero" },

    { key: "introHeading", label: "Judul bagian pengantar", kind: "textarea", section: "Pengantar", hint: "Baris baru diartikan sebagai pemecah baris." },
    { key: "introLinkLabel", label: "Label tautan pengantar", kind: "text", section: "Pengantar" },
    { key: "introStatement", label: "Kalimat sorotan", kind: "textarea", section: "Pengantar" },
    { key: "introBody", label: "Paragraf pengantar", kind: "paragraphs", section: "Pengantar", hint: "Pisahkan tiap paragraf dengan satu baris kosong." },
    { key: "introPhoto", label: "Foto pengantar", kind: "image", section: "Pengantar" },
    { key: "introCaption", label: "Keterangan foto pengantar", kind: "text", section: "Pengantar" },

    { key: "capabilitiesHeading", label: "Judul bagian bidang", kind: "text", section: "Bidang Kompetensi" },
    { key: "capabilitiesLede", label: "Pengantar bidang", kind: "textarea", section: "Bidang Kompetensi" },
    {
      key: "capabilities",
      label: "Bidang kompetensi",
      kind: "items",
      section: "Bidang Kompetensi",
      columns: [
        { key: "title", label: "Nama bidang" },
        { key: "description", label: "Uraian" },
        { key: "href", label: "Tautan (path)" },
        { key: "focus", label: "Fokus (pisahkan dengan koma)" },
      ],
      hint: "Baris terakhir tampil sebagai blok sorotan lebar penuh.",
    },
    { key: "featuredPhoto", label: "Foto blok sorotan", kind: "image", section: "Bidang Kompetensi" },
    { key: "featuredCtaLabel", label: "Label tombol blok sorotan", kind: "text", section: "Bidang Kompetensi" },

    { key: "productsHeading", label: "Judul bagian produk", kind: "text", section: "Lini Produk" },
    { key: "productsLede", label: "Pengantar produk", kind: "textarea", section: "Lini Produk" },
    { key: "productsStatement", label: "Kalimat sorotan datasheet", kind: "textarea", section: "Lini Produk" },
    { key: "productsBody", label: "Paragraf datasheet", kind: "paragraphs", section: "Lini Produk", hint: "Pisahkan tiap paragraf dengan satu baris kosong." },
    { key: "productsNote", label: "Catatan datasheet", kind: "textarea", section: "Lini Produk" },

    { key: "cycleHeading", label: "Judul siklus solusi", kind: "textarea", section: "Siklus Solusi", hint: "Baris baru diartikan sebagai pemecah baris." },
    { key: "cycleLede", label: "Pengantar siklus solusi", kind: "textarea", section: "Siklus Solusi" },
    { key: "outcomesHeading", label: "Judul dimensi hasil", kind: "text", section: "Siklus Solusi" },
    {
      key: "outcomeDimensions",
      label: "Dimensi hasil",
      kind: "items",
      section: "Siklus Solusi",
      columns: [
        { key: "title", label: "Dimensi" },
        { key: "description", label: "Uraian" },
      ],
    },
    { key: "outcomesNote", label: "Catatan dampak", kind: "text", section: "Siklus Solusi" },

    { key: "researchHeading", label: "Judul bagian riset", kind: "text", section: "Riset & Inovasi" },
    { key: "researchStatement", label: "Kalimat sorotan riset", kind: "textarea", section: "Riset & Inovasi" },
    { key: "researchBody", label: "Paragraf riset", kind: "textarea", section: "Riset & Inovasi" },
    {
      key: "researchActivities",
      label: "Kegiatan riset",
      kind: "items",
      section: "Riset & Inovasi",
      columns: [
        { key: "title", label: "Kegiatan" },
        { key: "description", label: "Uraian" },
      ],
    },
    { key: "researchPhoto1", label: "Foto riset utama", kind: "image", section: "Riset & Inovasi" },
    { key: "researchPhoto2", label: "Foto riset kedua", kind: "image", section: "Riset & Inovasi" },
    { key: "researchCaption", label: "Keterangan foto riset", kind: "text", section: "Riset & Inovasi" },

    { key: "sustainabilityHeading", label: "Judul keberlanjutan", kind: "textarea", section: "Keberlanjutan", hint: "Baris baru diartikan sebagai pemecah baris." },
    { key: "sustainabilityLede", label: "Pengantar keberlanjutan", kind: "textarea", section: "Keberlanjutan" },
    { key: "sustainabilityPhoto", label: "Foto keberlanjutan", kind: "image", section: "Keberlanjutan" },

    { key: "partnershipHeading", label: "Judul kemitraan", kind: "textarea", section: "Kemitraan", hint: "Baris baru diartikan sebagai pemecah baris." },
    { key: "partnershipLede", label: "Pengantar kemitraan", kind: "textarea", section: "Kemitraan" },
    { key: "partnershipPhoto", label: "Foto kemitraan", kind: "image", section: "Kemitraan" },

    { key: "newsHeading", label: "Judul bagian wawasan", kind: "text", section: "Wawasan" },
    { key: "newsLede", label: "Pengantar wawasan", kind: "textarea", section: "Wawasan" },
  ],
  defaults: {
    heroTitle: "Healthier Soil,\nStronger Harvests",
    heroLede:
      "Pupuk organik dan pupuk hayati dari PT Bio Industri Nusantara untuk pertanian dan perkebunan yang produktif, berkelanjutan, dan bernilai tambah.",
    heroPhoto: {
      src: "/images/plantation-aerial.jpg",
      alt: "Pandangan udara atas areal perkebunan kelapa sawit yang membentang hingga batas cakrawala",
    },
    heroIdentityTitle: "Integrated Bio-Agribusiness Solution",
    heroIdentityNote: "Dari asesmen lahan hingga evaluasi kinerja, dalam satu program.",

    introHeading: "Nature-Inspired\nInnovation",
    introLinkLabel: "Profil Perusahaan",
    introStatement: "Pertanian yang produktif dimulai dari tanah yang hidup.",
    introBody: [
      "PT Bio Industri Nusantara mengembangkan pupuk organik dan pupuk hayati berbasis mikroorganisme. Kami bekerja dengan prinsip yang sudah ada di alam: siklus penguraian, aktivitas biologis tanah, dan ketersediaan hara di sekitar perakaran. Prinsip-prinsip itu kami terjemahkan menjadi produk yang dapat diandalkan di lapangan.",
      "Pendekatan kami bukan menjual satu produk untuk setiap masalah. Kami mengkaji kondisi lahan terlebih dahulu, lalu menyusun program yang menggabungkan pembenahan bahan organik, nutrisi hayati, dan perlindungan tanaman dalam satu rangkaian yang saling menopang.",
    ],
    introPhoto: {
      src: "/images/compost-sieved.jpg",
      alt: "Kompos yang telah diayak dan siap diaplikasikan sebagai bahan perbaikan tanah",
    },
    introCaption:
      "Pengolahan bahan organik menjadi produk yang stabil dan siap diaplikasikan ke lahan.",

    capabilitiesHeading: "Yang Kami Kerjakan",
    capabilitiesLede:
      "Lima bidang kompetensi yang saling terhubung, dari produksi sampai penerapan di lapangan.",
    capabilities: baseCapabilities.map((c) => ({
      title: c.title,
      description: c.description,
      href: c.href,
      focus: c.focus.join(", "),
    })),
    featuredPhoto: {
      src: "/images/plantation-stages.jpg",
      alt: "Areal perkebunan kelapa sawit dengan berbagai fase pertumbuhan tanaman",
    },
    featuredCtaLabel: "Lihat Pendekatannya",

    productsHeading: "Lini Produk",
    productsLede:
      "Sembilan produk dalam tiga lini: pupuk organik, pupuk hayati, dan pengendali hayati. Semuanya dirancang untuk bekerja dalam satu program.",
    productsStatement: "Spesifikasi teknis setiap produk tersedia pada datasheet resmi.",
    productsBody: [
      "Komposisi, dosis, cara pakai, dan ketentuan registrasi produk hanya kami publikasikan setelah diverifikasi dari dokumen resmi. Kami tidak menampilkan angka yang belum dikonfirmasi.",
    ],
    productsNote:
      "Minta datasheet lengkap untuk produk yang Anda butuhkan melalui halaman permintaan penawaran.",

    cycleHeading: "Integrated Bio-Agribusiness\nSolution",
    cycleLede:
      "Kami tidak memulai dari produk. Kami memulai dari lahan, lalu menyusun lima tahap yang saling menopang sampai hasil dievaluasi dan siklus berikutnya disiapkan.",
    outcomesHeading: "Dimensi hasil yang kami tuju",
    outcomeDimensions,
    outcomesNote:
      "Angka dampak spesifik hanya kami publikasikan setelah tersedia data lapangan yang terverifikasi.",

    researchHeading: "Riset & Inovasi",
    researchStatement:
      "Setiap produk dimulai dari pertanyaan yang diuji, bukan dari asumsi yang diulang.",
    researchBody:
      "Riset menjadi dasar pengembangan produk kami, mulai dari isolasi dan karakterisasi mikroorganisme, pengujian laboratorium, sampai uji lapangan pada plot demonstrasi.",
    researchActivities,
    researchPhoto1: researchImages[0],
    researchPhoto2: researchImages[1],
    researchCaption: "Kultur mikroorganisme ditelaah sebelum tahap pengembangan produk.",

    sustainabilityHeading: "Keberlanjutan\nyang Dikerjakan",
    sustainabilityLede:
      "Bagi kami, keberlanjutan bukan pernyataan. Ia adalah keputusan teknis yang diambil di setiap tahap program, dari bahan baku sampai cara lahan dikelola.",
    sustainabilityPhoto: {
      src: "/images/rice-terraces.jpg",
      alt: "Terras sawah di Tabanan, Bali, membentang mengikuti kontur lahan",
    },

    partnershipHeading: "Let's Grow\nTogether",
    partnershipLede:
      "Kami membuka empat jalur kerja sama. Pilih yang paling dekat dengan posisi Anda, dan kami akan menyusun langkah berikutnya bersama.",
    partnershipPhoto: {
      src: "/images/farmer-harvest.jpg",
      alt: "Petani memanen padi di lahan persawahan Indonesia",
    },

    newsHeading: "Wawasan",
    newsLede: "Catatan lapangan, edukasi pertanian, dan tulisan seputar agribisnis hayati.",
  },
} satisfies PageSpec;

export type HomeContent = typeof homeSpec.defaults;

// ---------------------------------------------------------------------------
// Registry
// ---------------------------------------------------------------------------

export const pageSpecs = [
  homeSpec,
  aboutSpec,
  visionMissionSpec,
  valuesSpec,
  organizationSpec,
  researchSpec,
  laboratorySpec,
  demonstrationPlotSpec,
  innovationSpec,
  sustainabilitySpec,
  partnershipSpec,
  distributorSpec,
  solutionsSpec,
  ...audienceSpecs,
  productsSpec,
  newsSpec,
  contactSpec,
  rfqSpec,
] satisfies PageSpec[];

export function getPageSpec(path: string): PageSpec | undefined {
  return pageSpecs.find((s) => s.path === path);
}

/** Grouped specs for the admin list, in registry order. */
export function groupPageSpecs(): { group: string; specs: PageSpec[] }[] {
  const groups: { group: string; specs: PageSpec[] }[] = [];
  for (const spec of pageSpecs) {
    const found = groups.find((g) => g.group === spec.group);
    if (found) found.specs.push(spec);
    else groups.push({ group: spec.group, specs: [spec] });
  }
  return groups;
}

/** Admin editor URL for a public path ("/" needs a stand-in segment). */
export function pageEditorHref(path: string): string {
  return path === "/" ? "/admin/pages/home" : `/admin/pages${path}`;
}
