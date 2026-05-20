export const iconCategories = [
  { name: "Araçlar", slug: "araclar", sortOrder: 0 },
  { name: "Takımlar", slug: "takimlar", sortOrder: 1 },
  { name: "Anime", slug: "anime", sortOrder: 2 },
  { name: "Bayraklar", slug: "bayraklar", sortOrder: 3 },
  { name: "Genel", slug: "genel", sortOrder: 4 }
];

/** Mevcut figures_gorsel dosyaları — seed sonrası admin panelden yönetilebilir */
export const seedIcons = [
  { name: "Siyah", filePath: "figures_gorsel/siyah.svg", categorySlug: "genel" },
  { name: "Kalp", filePath: "figures_gorsel/heart_36.svg", categorySlug: "genel" },
  { name: "Bayrak 1", filePath: "figures_gorsel/flag_1.svg", categorySlug: "bayraklar" },
  { name: "Bayrak 2", filePath: "figures_gorsel/flag_2.svg", categorySlug: "bayraklar" },
  { name: "Mercedes", filePath: "figures_gorsel/vehicle_mercedes.svg", categorySlug: "araclar" },
  { name: "Konya", filePath: "figures_gorsel/city_konya2.svg", categorySlug: "genel" },
  { name: "Kral", filePath: "figures_gorsel/king_1.svg", categorySlug: "genel" },
  { name: "Veteriner", filePath: "figures_gorsel/jobs_vet.svg", categorySlug: "genel" }
];
