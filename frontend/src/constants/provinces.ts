import type { Region } from "./regions";

export interface Province {
  code: string;
  name: string;
  regionCode: Region["code"];
}

export const provinces: Province[] = [
  // NCR
  { code: "NCR", name: "National Capital Region (Metro Manila)", regionCode: "NCR" },

  // Cordillera Administrative Region (CAR)
  { code: "ABR", name: "Abra", regionCode: "CAR" },
  { code: "APA", name: "Apayao", regionCode: "CAR" },
  { code: "BEN", name: "Benguet", regionCode: "CAR" },
  { code: "IFU", name: "Ifugao", regionCode: "CAR" },
  { code: "KAL", name: "Kalinga", regionCode: "CAR" },
  { code: "MOU", name: "Mountain Province", regionCode: "CAR" },

  // Region I - Ilocos Region
  { code: "ILN", name: "Ilocos Norte", regionCode: "I" },
  { code: "ILS", name: "Ilocos Sur", regionCode: "I" },
  { code: "LUN", name: "La Union", regionCode: "I" },
  { code: "PAN", name: "Pangasinan", regionCode: "I" },

  // Region II - Cagayan Valley
  { code: "BTN", name: "Batanes", regionCode: "II" },
  { code: "CAG", name: "Cagayan", regionCode: "II" },
  { code: "ISA", name: "Isabela", regionCode: "II" },
  { code: "NUV", name: "Nueva Vizcaya", regionCode: "II" },
  { code: "QUI", name: "Quirino", regionCode: "II" },

  // Region III - Central Luzon
  { code: "AUR", name: "Aurora", regionCode: "III" },
  { code: "BAN", name: "Bataan", regionCode: "III" },
  { code: "BUL", name: "Bulacan", regionCode: "III" },
  { code: "NUE", name: "Nueva Ecija", regionCode: "III" },
  { code: "PAM", name: "Pampanga", regionCode: "III" },
  { code: "TAR", name: "Tarlac", regionCode: "III" },
  { code: "ZMB", name: "Zambales", regionCode: "III" },

  // Region IV-A - CALABARZON
  { code: "BTG", name: "Batangas", regionCode: "IV-A" },
  { code: "CAV", name: "Cavite", regionCode: "IV-A" },
  { code: "LAG", name: "Laguna", regionCode: "IV-A" },
  { code: "QUE", name: "Quezon", regionCode: "IV-A" },
  { code: "RIZ", name: "Rizal", regionCode: "IV-A" },

  // Region IV-B - MIMAROPA
  { code: "MAD", name: "Marinduque", regionCode: "IV-B" },
  { code: "MDR", name: "Occidental Mindoro", regionCode: "IV-B" },
  { code: "MDO", name: "Oriental Mindoro", regionCode: "IV-B" },
  { code: "PLW", name: "Palawan", regionCode: "IV-B" },
  { code: "ROM", name: "Romblon", regionCode: "IV-B" },

  // Region V - Bicol Region
  { code: "ALB", name: "Albay", regionCode: "V" },
  { code: "CAN", name: "Camarines Norte", regionCode: "V" },
  { code: "CAS", name: "Camarines Sur", regionCode: "V" },
  { code: "CAT", name: "Catanduanes", regionCode: "V" },
  { code: "MAS", name: "Masbate", regionCode: "V" },
  { code: "SOR", name: "Sorsogon", regionCode: "V" },

  // Region VI - Western Visayas
  { code: "AKL", name: "Aklan", regionCode: "VI" },
  { code: "ANT", name: "Antique", regionCode: "VI" },
  { code: "CAP", name: "Capiz", regionCode: "VI" },
  { code: "GUI", name: "Guimaras", regionCode: "VI" },
  { code: "ILI", name: "Iloilo", regionCode: "VI" },

  // Negros Island Region (NIR)
  { code: "NEC", name: "Negros Occidental", regionCode: "NIR" },
  { code: "NER", name: "Negros Oriental", regionCode: "NIR" },
  { code: "SIQ", name: "Siquijor", regionCode: "NIR" },

  // Region VII - Central Visayas
  { code: "BOH", name: "Bohol", regionCode: "VII" },
  { code: "CEB", name: "Cebu", regionCode: "VII" },

  // Region VIII - Eastern Visayas
  { code: "BIL", name: "Biliran", regionCode: "VIII" },
  { code: "EAS", name: "Eastern Samar", regionCode: "VIII" },
  { code: "LEY", name: "Leyte", regionCode: "VIII" },
  { code: "NSA", name: "Northern Samar", regionCode: "VIII" },
  { code: "WSA", name: "Samar", regionCode: "VIII" },
  { code: "SLE", name: "Southern Leyte", regionCode: "VIII" },

  // Region IX - Zamboanga Peninsula
  { code: "ZAN", name: "Zamboanga del Norte", regionCode: "IX" },
  { code: "ZAS", name: "Zamboanga del Sur", regionCode: "IX" },
  { code: "ZSI", name: "Zamboanga Sibugay", regionCode: "IX" },

  // Region X - Northern Mindanao
  { code: "BUK", name: "Bukidnon", regionCode: "X" },
  { code: "CAM", name: "Camiguin", regionCode: "X" },
  { code: "LAN", name: "Lanao del Norte", regionCode: "X" },
  { code: "MSC", name: "Misamis Occidental", regionCode: "X" },
  { code: "MSR", name: "Misamis Oriental", regionCode: "X" },

  // Region XI - Davao Region
  { code: "DAO", name: "Davao de Oro", regionCode: "XI" },
  { code: "DAV", name: "Davao del Norte", regionCode: "XI" },
  { code: "DAS", name: "Davao del Sur", regionCode: "XI" },
  { code: "DAC", name: "Davao Occidental", regionCode: "XI" },
  { code: "DOR", name: "Davao Oriental", regionCode: "XI" },

  // Region XII - SOCCSKSARGEN
  { code: "NCO", name: "Cotabato", regionCode: "XII" },
  { code: "SAR", name: "Sarangani", regionCode: "XII" },
  { code: "SCO", name: "South Cotabato", regionCode: "XII" },
  { code: "SUK", name: "Sultan Kudarat", regionCode: "XII" },

  // Region XIII - Caraga
  { code: "AGN", name: "Agusan del Norte", regionCode: "XIII" },
  { code: "AGS", name: "Agusan del Sur", regionCode: "XIII" },
  { code: "DIN", name: "Dinagat Islands", regionCode: "XIII" },
  { code: "SUN", name: "Surigao del Norte", regionCode: "XIII" },
  { code: "SUR", name: "Surigao del Sur", regionCode: "XIII" },

  // Bangsamoro Autonomous Region in Muslim Mindanao (BARMM)
  { code: "BAS", name: "Basilan", regionCode: "BARMM" },
  { code: "LAS", name: "Lanao del Sur", regionCode: "BARMM" },
  { code: "MDN", name: "Maguindanao del Norte", regionCode: "BARMM" },
  { code: "MDS", name: "Maguindanao del Sur", regionCode: "BARMM" },
  { code: "SLU", name: "Sulu", regionCode: "BARMM" },
  { code: "TAW", name: "Tawi-Tawi", regionCode: "BARMM" },
];