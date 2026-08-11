import type { Province } from "./provinces";

export interface City {
    code: string;
    name: string;
    provinceCode: Province["code"];
}

export const cities: City[] = [
  // ============================================================
  // NCR - National Capital Region
  // ============================================================
  { code: "CAL", name: "Caloocan City", provinceCode: "NCR" },
  { code: "LPI", name: "Las Piñas City", provinceCode: "NCR" },
  { code: "MAK", name: "Makati City", provinceCode: "NCR" },
  { code: "MAL", name: "Malabon City", provinceCode: "NCR" },
  { code: "MAN", name: "Mandaluyong City", provinceCode: "NCR" },
  { code: "MNL", name: "Manila City", provinceCode: "NCR" },
  { code: "MAR", name: "Marikina City", provinceCode: "NCR" },
  { code: "MUN", name: "Muntinlupa City", provinceCode: "NCR" },
  { code: "NAV", name: "Navotas City", provinceCode: "NCR" },
  { code: "PAR", name: "Parañaque City", provinceCode: "NCR" },
  { code: "PAS", name: "Pasay City", provinceCode: "NCR" },
  { code: "PSG", name: "Pasig City", provinceCode: "NCR" },
  { code: "QZN", name: "Quezon City", provinceCode: "NCR" },
  { code: "SJN", name: "San Juan City", provinceCode: "NCR" },
  { code: "TAG", name: "Taguig City", provinceCode: "NCR" },
  { code: "VAL", name: "Valenzuela City", provinceCode: "NCR" },

  // ============================================================
  // CAR - Cordillera Administrative Region
  // ============================================================
  { code: "BAG", name: "Baguio City", provinceCode: "BEN" },
  { code: "TAB", name: "Tabuk City", provinceCode: "KAL" },

  // ============================================================
  // Region I - Ilocos Region
  // ============================================================
  { code: "BAT", name: "Batac City", provinceCode: "ILN" },
  { code: "LAO", name: "Laoag City", provinceCode: "ILN" },
  { code: "CAN", name: "Candon City", provinceCode: "ILS" },
  { code: "VIG", name: "Vigan City", provinceCode: "ILS" },
  { code: "SFE", name: "San Fernando City", provinceCode: "LUN" },
  { code: "ALA", name: "Alaminos City", provinceCode: "PAN" },
  { code: "DAG", name: "Dagupan City", provinceCode: "PAN" },
  { code: "SCA", name: "San Carlos City", provinceCode: "PAN" },
  { code: "URD", name: "Urdaneta City", provinceCode: "PAN" },

  // ============================================================
  // Region II - Cagayan Valley
  // ============================================================
  { code: "TUG", name: "Tuguegarao City", provinceCode: "CAG" },
  { code: "CAU", name: "Cauayan City", provinceCode: "ISA" },
  { code: "ILA", name: "Ilagan City", provinceCode: "ISA" },
  { code: "SAN", name: "Santiago City", provinceCode: "ISA" },

  // ============================================================
  // Region III - Central Luzon
  // ============================================================
  { code: "BAL", name: "Balanga City", provinceCode: "BAN" },
  { code: "BWL", name: "Baliwag City", provinceCode: "BUL" },
  { code: "MLO", name: "Malolos City", provinceCode: "BUL" },
  { code: "MEY", name: "Meycauayan City", provinceCode: "BUL" },
  { code: "SJM", name: "San Jose del Monte City", provinceCode: "BUL" },
  { code: "CAB", name: "Cabanatuan City", provinceCode: "NUE" },
  { code: "GAP", name: "Gapan City", provinceCode: "NUE" },
  { code: "SCI", name: "Science City of Muñoz", provinceCode: "NUE" },
  { code: "PAL", name: "Palayan City", provinceCode: "NUE" },
  { code: "SJC", name: "San Jose City", provinceCode: "NUE" },
  { code: "MAB", name: "Mabalacat City", provinceCode: "PAM" },
  { code: "SFP", name: "San Fernando City", provinceCode: "PAM" },
  { code: "TAR", name: "Tarlac City", provinceCode: "TAR" },
  { code: "ANG", name: "Angeles City", provinceCode: "PAM" },
  { code: "OLG", name: "Olongapo City", provinceCode: "ZMB" },

  // ============================================================
  // Region IV-A - CALABARZON
  // ============================================================
  // Batangas
  { code: "BTG", name: "Batangas City", provinceCode: "BTG" },
  { code: "CLC", name: "Calaca City", provinceCode: "BTG" },
  { code: "LIP", name: "Lipa City", provinceCode: "BTG" },
  { code: "STM", name: "Sto. Tomas City", provinceCode: "BTG" },
  { code: "TAN", name: "Tanauan City", provinceCode: "BTG" },

  // Cavite
  { code: "BAC", name: "Bacoor City", provinceCode: "CAV" },
  { code: "CAR", name: "Carmona City", provinceCode: "CAV" },
  { code: "CAV", name: "Cavite City", provinceCode: "CAV" },
  { code: "DSM", name: "Dasmariñas City", provinceCode: "CAV" },
  { code: "GTR", name: "General Trias City", provinceCode: "CAV" },
  { code: "IMU", name: "Imus City", provinceCode: "CAV" },
  { code: "TAG", name: "Tagaytay City", provinceCode: "CAV" },
  { code: "TRE", name: "Trece Martires City", provinceCode: "CAV" },

  // Laguna
  { code: "BIN", name: "Biñan City", provinceCode: "LAG" },
  { code: "CAB", name: "Cabuyao City", provinceCode: "LAG" },
  { code: "CAL", name: "Calamba City", provinceCode: "LAG" },
  { code: "SPB", name: "San Pablo City", provinceCode: "LAG" },
  { code: "SPD", name: "San Pedro City", provinceCode: "LAG" },
  { code: "SRO", name: "Santa Rosa City", provinceCode: "LAG" },

  // Quezon
  { code: "TAY", name: "Tayabas City", provinceCode: "QUE" },

  // Rizal
  { code: "ANT", name: "Antipolo City", provinceCode: "RIZ" },

  // Lucena is an independent component city geographically in Quezon
  { code: "LUC", name: "Lucena City", provinceCode: "QUE" },

  // ============================================================
  // Region IV-B - MIMAROPA
  // ============================================================
  { code: "CAL", name: "Calapan City", provinceCode: "ORI" },
  { code: "PPC", name: "Puerto Princesa City", provinceCode: "PLW" },

  // ============================================================
  // Region V - Bicol Region
  // ============================================================
  { code: "LEG", name: "Legazpi City", provinceCode: "ALB" },
  { code: "LIG", name: "Ligao City", provinceCode: "ALB" },
  { code: "TAB", name: "Tabaco City", provinceCode: "ALB" },
  { code: "IRI", name: "Iriga City", provinceCode: "CAS" },
  { code: "NAG", name: "Naga City", provinceCode: "CAS" },
  { code: "MAS", name: "Masbate City", provinceCode: "MAS" },
  { code: "SOS", name: "Sorsogon City", provinceCode: "SOR" },

  // ============================================================
  // Region VI - Western Visayas
  // ============================================================
  { code: "ROX", name: "Roxas City", provinceCode: "CAP" },
  { code: "PAS", name: "Passi City", provinceCode: "ILI" },
  { code: "ILO", name: "Iloilo City", provinceCode: "ILI" },

  // ============================================================
  // Negros Island Region (NIR)
  // ============================================================
  // Negros Occidental
  { code: "BAG", name: "Bago City", provinceCode: "NEC" },
  { code: "CAD", name: "Cadiz City", provinceCode: "NEC" },
  { code: "ESC", name: "Escalante City", provinceCode: "NEC" },
  { code: "HIM", name: "Himamaylan City", provinceCode: "NEC" },
  { code: "KAB", name: "Kabankalan City", provinceCode: "NEC" },
  { code: "LCA", name: "La Carlota City", provinceCode: "NEC" },
  { code: "SAG", name: "Sagay City", provinceCode: "NEC" },
  { code: "SCA", name: "San Carlos City", provinceCode: "NEC" },
  { code: "SIL", name: "Silay City", provinceCode: "NEC" },
  { code: "SIP", name: "Sipalay City", provinceCode: "NEC" },
  { code: "TAL", name: "Talisay City", provinceCode: "NEC" },
  { code: "VIC", name: "Victorias City", provinceCode: "NEC" },

  // Negros Oriental
  { code: "BAI", name: "Bais City", provinceCode: "NER" },
  { code: "BAY", name: "Bayawan City", provinceCode: "NER" },
  { code: "CAN", name: "Canlaon City", provinceCode: "NER" },
  { code: "DUM", name: "Dumaguete City", provinceCode: "NER" },
  { code: "GUI", name: "Guihulngan City", provinceCode: "NER" },
  { code: "TAN", name: "Tanjay City", provinceCode: "NER" },

  // Highly urbanized city
  { code: "BCD", name: "Bacolod City", provinceCode: "NEC" },

  // ============================================================
  // Region VII - Central Visayas
  // ============================================================
  // Bohol
  { code: "TAG", name: "Tagbilaran City", provinceCode: "BOH" },

  // Cebu
  { code: "BOG", name: "Bogo City", provinceCode: "CEB" },
  { code: "CAR", name: "Carcar City", provinceCode: "CEB" },
  { code: "DAN", name: "Danao City", provinceCode: "CEB" },
  { code: "NAG", name: "Naga City", provinceCode: "CEB" },
  { code: "TAL", name: "Talisay City", provinceCode: "CEB" },
  { code: "TOL", name: "Toledo City", provinceCode: "CEB" },

  { code: "CEB", name: "Cebu City", provinceCode: "CEB" },
  { code: "LAP", name: "Lapu-Lapu City", provinceCode: "CEB" },
  { code: "MAN", name: "Mandaue City", provinceCode: "CEB" },

  // Region VIII - Eastern Visayas
  { code: "BOR", name: "Borongan City", provinceCode: "EAS" },
  { code: "BAY", name: "Baybay City", provinceCode: "LEY" },
  { code: "ORM", name: "Ormoc City", provinceCode: "LEY" },
  { code: "CAL", name: "Calbayog City", provinceCode: "SAM" },
  { code: "CAT", name: "Catbalogan City", provinceCode: "SAM" },
  { code: "MAA", name: "Maasin City", provinceCode: "SLE" },
  { code: "TAC", name: "Tacloban City", provinceCode: "LEY" },

  // Region IX - Zamboanga Peninsula
  { code: "DAP", name: "Dapitan City", provinceCode: "ZAN" },
  { code: "DIP", name: "Dipolog City", provinceCode: "ZAN" },
  { code: "PAG", name: "Pagadian City", provinceCode: "ZAS" },
  { code: "ZAM", name: "Zamboanga City", provinceCode: "ZAS" },
  { code: "ISA", name: "Isabela City", provinceCode: "BAS" },

  // Region X - Northern Mindanao
  { code: "MAL", name: "Malaybalay City", provinceCode: "BUK" },
  { code: "VAL", name: "Valencia City", provinceCode: "BUK" },
  { code: "ORO", name: "Oroquieta City", provinceCode: "MSC" },
  { code: "OZA", name: "Ozamiz City", provinceCode: "MSC" },
  { code: "TAN", name: "Tangub City", provinceCode: "MSC" },
  { code: "ELS", name: "El Salvador City", provinceCode: "MSR" },
  { code: "GIN", name: "Gingoog City", provinceCode: "MSR" },
  { code: "CDO", name: "Cagayan de Oro City", provinceCode: "MSR" },
  { code: "ILI", name: "Iligan City", provinceCode: "LAN" },

  // Region XI - Davao Region
  { code: "PAN", name: "Panabo City", provinceCode: "DAV" },
  { code: "SAM", name: "Island Garden City of Samal", provinceCode: "DAV" },
  { code: "TAG", name: "Tagum City", provinceCode: "DAV" },
  { code: "DIG", name: "Digos City", provinceCode: "DAS" },
  { code: "MAT", name: "Mati City", provinceCode: "DOR" },
  { code: "DVO", name: "Davao City", provinceCode: "DAS" },

  // Region XII - SOCCSKSARGEN
  { code: "KID", name: "Kidapawan City", provinceCode: "NCO" },
  { code: "KOR", name: "Koronadal City", provinceCode: "SCO" },
  { code: "TAC", name: "Tacurong City", provinceCode: "SUK" },
  { code: "GEN", name: "General Santos City", provinceCode: "SCO" },

  // Region XIII - Caraga
  { code: "CAB", name: "Cabadbaran City", provinceCode: "AGN" },
  { code: "BAY", name: "Bayugan City", provinceCode: "AGS" },
  { code: "SUR", name: "Surigao City", provinceCode: "SUN" },
  { code: "BIS", name: "Bislig City", provinceCode: "SUR" },
  { code: "TAN", name: "Tandag City", provinceCode: "SUR" },
  { code: "BUT", name: "Butuan City", provinceCode: "AGN" },

  // BARMM
  { code: "LAM", name: "Lamitan City", provinceCode: "BAS" },
  { code: "MAR", name: "Marawi City", provinceCode: "LAS" },
  { code: "COT", name: "Cotabato City", provinceCode: "MDN" },
];