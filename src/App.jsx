import { Fragment, useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  Archive,
  ArrowLeft,
  ArrowRight,
  Banknote,
  BarChart3,
  Bell,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  ClipboardList,
  Clock3,
  Download,
  Eye,
  FileText,
  Filter,
  HandCoins,
  History,
  Home,
  KeyRound,
  Landmark,
  LockKeyhole,
  Mail,
  MapPin,
  MoreHorizontal,
  Pencil,
  Phone,
  Plus,
  Printer,
  ReceiptText,
  RefreshCw,
  Search,
  Send,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Upload,
  UserCog,
  UserRound,
  UsersRound,
  Wallet,
  WalletCards,
  Wrench,
  XCircle,
} from "lucide-react";

const navItems = [
  { page: "Dashboard", label: "Dashboard" },
  { page: "Biens", label: "Biens" },
  { page: "Clients", label: "Clients" },
  { page: "Contrats", label: "Docs" },
  { page: "Finance", label: "Finance" },
  { page: "Rapports", label: "Rapports" },
  { page: "Plus", label: "Plus" },
];

const demoSteps = [
  {
    page: "Dashboard",
    target: "demo-button",
    title: "Bienvenue dans le mode DEMO",
    body: "Ce parcours accompagne le client pas à pas. Il met en lumière chaque zone importante sans bloquer l'interface, et peut être arrêté à tout moment.",
  },
  {
    page: "Dashboard",
    target: "main-nav",
    title: "Navigation métier complète",
    body: "Les onglets donnent accès aux modules clés : biens, clients, contrats, finance, rapports et administration.",
  },
  {
    page: "Dashboard",
    target: "dashboard-kpis",
    title: "Vue de pilotage",
    body: "Le dashboard synthétise les biens en gestion locative, les biens suivis en entretien seul, les flux loyers, les flux non-loyer et les alertes financières.",
  },
  {
    page: "Dashboard",
    target: "dashboard-charts",
    title: "Suivi visuel de l'activité",
    body: "Les graphiques montrent les loyers attendus et le pipeline commercial pour comprendre rapidement l'état du portefeuille.",
  },
  {
    page: "Dashboard",
    target: "dashboard-alerts",
    title: "Actions prioritaires",
    body: "Les alertes orientent l'équipe vers les retards, visites, contrats à échéance, maintenances et documents manquants.",
  },
  {
    page: "Biens",
    propertyView: "list",
    target: "property-filters",
    title: "Recherche et filtres des biens",
    body: "Le portefeuille peut être recherché par référence, quartier, statut, type, propriétaire, occupant ou critères avancés.",
  },
  {
    page: "Biens",
    propertyView: "list",
    target: "property-grid",
    title: "Cartes du portefeuille immobilier",
    body: "Chaque bien présente son statut, son adresse à Bamako, son loyer, son propriétaire et un accès direct à la fiche.",
  },
  {
    page: "Biens",
    propertyView: "detail",
    propertyTab: "Résumé",
    target: "property-hero",
    title: "Fiche bien détaillée",
    body: "La fiche centralise le bien, son propriétaire, son occupant, son statut, ses conditions financières et ses documents.",
  },
  {
    page: "Biens",
    propertyView: "detail",
    propertyTab: "Résumé",
    target: "property-actions",
    title: "Actions depuis la fiche",
    body: "Depuis une fiche, E.K immo peut modifier le bien, planifier une visite, créer un contrat, enregistrer un paiement ou générer des documents.",
  },
  {
    page: "Biens",
    propertyView: "detail",
    propertyTab: "Documents",
    target: "property-detail-tabs",
    title: "Toutes les rubriques du bien",
    body: "Les sous-onglets donnent accès au propriétaire, locataire, contrats, paiements, charges, documents et historique du bien.",
  },
  {
    page: "Clients",
    clientTab: "Propriétaires",
    target: "client-tabs",
    title: "Gestion clients structurée",
    body: "Les clients sont séparés en propriétaires, locataires, prospects et visites pour clarifier les responsabilités de l'agence.",
  },
  {
    page: "Clients",
    clientTab: "Propriétaires",
    target: "owner-workspace",
    title: "Fiches propriétaires",
    body: "La fiche propriétaire affiche les biens confiés, loyers encaissés, commissions, charges et soldes à reverser.",
  },
  {
    page: "Clients",
    clientTab: "Prospects",
    target: "prospect-workspace",
    title: "Pipeline prospects",
    body: "Les prospects avancent de nouveau contact jusqu'à conclusion, avec besoins, budget, visites et prochaine action commerciale.",
  },
  {
    page: "Clients",
    clientTab: "Visites",
    target: "visits-workspace",
    title: "Suivi des visites",
    body: "Les visites indiquent la date, le bien, l'agent, le retour client et l'action suivante pour convertir les dossiers.",
  },
  {
    page: "Contrats",
    contractTab: "Contrats",
    target: "contracts-workspace",
    title: "Contrats et échéances",
    body: "La liste et la fiche contrat donnent une vue complète des baux, mandats, dates, documents signés et actions de renouvellement.",
  },
  {
    page: "Contrats",
    contractTab: "Génération de document",
    target: "document-generation",
    title: "Génération documentaire",
    body: "Les modèles permettent de produire contrats, quittances, mandats et documents propriétaires avec aperçu avant export.",
  },
  {
    page: "Finance",
    financeTab: "Loyers",
    target: "finance-tabs",
    title: "Finance métier E.K immo",
    body: "Le module finance regroupe loyers, paiements, impayés, factures, commissions, charges, entretiens et reversements.",
  },
  {
    page: "Finance",
    financeTab: "Paiements",
    target: "payment-workspace",
    title: "Encaissement et reçus",
    body: "La fiche paiement rapproche locataire, bien, propriétaire, montant payé, solde, mode de paiement et reçu généré.",
  },
  {
    page: "Finance",
    financeTab: "Charges",
    target: "charges-workspace",
    title: "Charges et justificatifs",
    body: "Les charges sont affectées à un bien ou propriétaire, avec prise en charge, justificatif, validation et intégration aux situations.",
  },
  {
    page: "Finance",
    financeTab: "Reversements",
    target: "reversals-workspace",
    title: "Reversements propriétaires",
    body: "E.K immo suit les loyers encaissés, commissions, charges, montants déjà reversés et soldes nets à payer.",
  },
  {
    page: "Rapports",
    target: "reports-layout",
    title: "Rapports et exports",
    body: "Les rapports filtrables couvrent portefeuille, loyers, impayés, commissions, charges, visites, échéances et états propriétaires.",
  },
  {
    page: "Plus",
    adminTab: "Utilisateurs",
    target: "admin-workspace",
    title: "Administration",
    body: "Le module Plus regroupe utilisateurs, rôles, droits, paramètres, modèles de documents et historique des opérations.",
  },
  {
    page: "Dashboard",
    target: "demo-button",
    title: "Fin du parcours",
    body: "La démonstration a parcouru les écrans et fonctionnalités principales. Le client peut maintenant naviguer librement ou relancer le mode DEMO.",
  },
];

const searchToneByType = {
  Bien: "purple",
  Nom: "success",
  Contact: "success",
  Montant: "warning",
  Contrat: "muted",
  Document: "default",
  Besoin: "purple",
};

const assets = {
  villa: "/assets/bamako-villa.jpg",
  residence: "/assets/bamako-residence.jpg",
  office: "/assets/bamako-office.jpg",
  duplex: "/assets/bamako-duplex.jpg",
  agentA: "/assets/agent-rakib.jpg",
  agentB: "/assets/agent-megan.jpg",
  agentC: "/assets/agent-william.jpg",
};

const ekimmoAssets = {
  logo: "/assets/ekimmo/ekimmo-logo.png",
  facturePdf: "/assets/ekimmo/exemple-facture.pdf",
  recuPdf: "/assets/ekimmo/exemple-recu-encaissement.pdf",
  bordereauPdf: "/assets/ekimmo/bordereau-commissions-lafia-t1-2026.pdf",
  bailDocx: "/assets/ekimmo/exemple-contrat-de-bail.docx",
  factureDocx: "/assets/ekimmo/facture-lafia-t1-2026.docx",
  courrierCommissionDocx: "/assets/ekimmo/courrier-commission-lafia-t1-2026.docx",
};

const documentTemplates = [
  {
    key: "facture",
    label: "Facture",
    source: "EXEMPLE_FACTURE.pdf",
    file: ekimmoAssets.facturePdf,
    format: "PDF",
  },
  {
    key: "recu",
    label: "Reçu d'encaissement",
    source: "Exemple Reçu d'encaissement.pdf",
    file: ekimmoAssets.recuPdf,
    format: "PDF",
  },
  {
    key: "bordereau",
    label: "Bordereau commissions",
    source: "BORDEREAU COMMISSIONS LAFIA T1 2026.pdf",
    file: ekimmoAssets.bordereauPdf,
    format: "PDF",
  },
  {
    key: "bail",
    label: "Contrat de bail",
    source: "EXEMPLE_CONTRAT_DE_BAIL.docx",
    file: ekimmoAssets.bailDocx,
    format: "DOCX",
  },
];

function makeDocumentNumber(prefix, sequence, year = 2026) {
  return `${prefix}-${year}-${String(sequence).padStart(3, "0")}`;
}

function getDocumentPrefix(type) {
  if (type === "Reçu") return "REC";
  if (type === "Quittance") return "QUI";
  if (type === "Bordereau") return "BOR";
  if (type === "Contrat") return "CON";
  return "FAC";
}

const properties = [
  {
    code: "EKM-VIL-042",
    name: "Villa Koulouba",
    type: "Villa duplex",
    district: "Koulouba, Bamako",
    address: "Rue 142, Koulouba, Bamako",
    owner: "Mamadou Keita",
    tenant: "Awa Traoré",
    status: "Loué",
    price: "2 750 000 FCFA",
    period: "/mois",
    image: assets.duplex,
    surface: "320 m²",
    rooms: 7,
    bedrooms: 5,
    baths: 4,
    deposit: "5 500 000 FCFA",
    commission: "5%",
    financialMode: "Encaissement par l'agence",
    lastAction: "Révision prévue le 15/07/2026",
    focalPoint: {
      name: "Abdoulaye Keita",
      role: "Point focal famille",
      phone: "+223 75 18 20 44",
      email: "a.keita@keita-family.ml",
    },
    tags: ["Piscine", "Groupe électrogène", "Garage double", "Jardin"],
  },
  {
    code: "EKM-IMM-210",
    name: "Immeuble Korofina Terrasses",
    type: "Immeuble collectif",
    district: "Korofina Nord, Bamako",
    address: "Avenue Martin Luther King, Korofina Nord, Bamako",
    owner: "Foncière Mandé",
    tenant: "Multi-occupants",
    status: "Gestion multi-lots",
    price: "4 650 000 FCFA",
    period: "/mois total",
    image: assets.residence,
    surface: "1 180 m²",
    rooms: 24,
    bedrooms: 18,
    baths: 15,
    deposit: "Par appartement",
    commission: "8% gestion immeuble",
    financialMode: "Encaissement par l'agence",
    lastAction: "Bloc B · 2 appartements à relouer",
    focalPoint: {
      name: "Ousmane Traoré",
      role: "Gestionnaire du syndic",
      phone: "+223 76 55 21 04",
      email: "syndic.korofina@foncieremande.ml",
    },
    structure: {
      kind: "building",
      blocks: [
        { name: "Bloc A", floors: 3, units: 6, available: 1 },
        { name: "Bloc B", floors: 3, units: 6, available: 2 },
      ],
      childCodes: ["EKM-APT-A101", "EKM-APT-A203", "EKM-APT-B102"],
    },
    tags: ["2 blocs", "12 appartements", "Cour intérieure", "Groupe électrogène"],
  },
  {
    code: "EKM-APT-A101",
    name: "Appartement A-101 Korofina",
    type: "Appartement T3",
    district: "Korofina Nord, Bamako",
    address: "Bloc A, 1er étage, Immeuble Korofina Terrasses, Bamako",
    owner: "Foncière Mandé",
    tenant: "Mariam Sissoko",
    status: "Loué",
    price: "375 000 FCFA",
    period: "/mois",
    image: assets.residence,
    surface: "84 m²",
    rooms: 3,
    bedrooms: 2,
    baths: 2,
    deposit: "750 000 FCFA",
    commission: "8%",
    financialMode: "Encaissement par l'agence",
    lastAction: "Loyer juin attendu le 05/06/2026",
    parentCode: "EKM-IMM-210",
    block: "Bloc A",
    floor: "1er étage",
    unitNumber: "A-101",
    tags: ["Balcon", "Cuisine équipée", "Parking"],
  },
  {
    code: "EKM-APT-A203",
    name: "Appartement A-203 Korofina",
    type: "Appartement T2",
    district: "Korofina Nord, Bamako",
    address: "Bloc A, 2e étage, Immeuble Korofina Terrasses, Bamako",
    owner: "Foncière Mandé",
    tenant: "Libre",
    status: "Disponible",
    price: "320 000 FCFA",
    period: "/mois",
    image: assets.residence,
    surface: "68 m²",
    rooms: 2,
    bedrooms: 1,
    baths: 1,
    deposit: "640 000 FCFA",
    commission: "8%",
    financialMode: "Encaissement par l'agence",
    lastAction: "Photos ajoutées · visite à programmer",
    parentCode: "EKM-IMM-210",
    block: "Bloc A",
    floor: "2e étage",
    unitNumber: "A-203",
    tags: ["Balcon", "Vue cour", "Gardien"],
  },
  {
    code: "EKM-APT-B102",
    name: "Appartement B-102 Korofina",
    type: "Appartement T4",
    district: "Korofina Nord, Bamako",
    address: "Bloc B, 1er étage, Immeuble Korofina Terrasses, Bamako",
    owner: "Foncière Mandé",
    tenant: "Ibrahima Maïga",
    status: "Entretien seul",
    price: "65 000 FCFA",
    period: "/intervention",
    image: assets.residence,
    surface: "96 m²",
    rooms: 4,
    bedrooms: 3,
    baths: 2,
    deposit: "N/A",
    commission: "Forfait entretien",
    financialMode: "Contrat entretien seul",
    lastAction: "Contrôle climatisation du séjour",
    parentCode: "EKM-IMM-210",
    block: "Bloc B",
    floor: "1er étage",
    unitNumber: "B-102",
    serviceProvider: {
      company: "ClimaFix Mali SARL",
      contact: "Seydou Cissé",
      role: "Technicien référent climatisation",
      phone: "+223 76 40 18 22",
      email: "intervention@climafix-mali.ml",
      specialties: ["Climatisation", "Électricité légère", "Contrôle préventif"],
      zone: "Korofina, Hamdallaye, ACI",
      responseTime: "Intervention sous 24h ouvrées",
      contract: "Convention entretien B-102 · Forfait par intervention",
      lastVisit: "12/06/2026 · contrôle split séjour",
    },
    tags: ["Entretien climatisation", "Gardien", "Parking"],
  },
  {
    code: "EKM-APP-118",
    name: "Résidence ACI Baobab",
    type: "Appartement T4",
    district: "ACI 2000, Bamako",
    address: "Avenue de l'OUA, ACI 2000, Bamako",
    owner: "Sira Coulibaly",
    tenant: "Oumar Sidibé",
    status: "Disponible",
    price: "850 000 FCFA",
    period: "/mois",
    image: assets.residence,
    surface: "145 m²",
    rooms: 4,
    bedrooms: 3,
    baths: 2,
    deposit: "1 700 000 FCFA",
    commission: "50% du loyer",
    financialMode: "Encaissement par l'agence",
    lastAction: "Annonce actualisée hier",
    tags: ["Balcon", "Sécurité 24h", "Climatisation"],
  },
  {
    code: "EKM-BUR-031",
    name: "Plateau Office Center",
    type: "Bureau open space",
    district: "Hamdallaye ACI, Bamako",
    address: "Immeuble 6, Hamdallaye ACI, Bamako",
    owner: "Foncière Mandé",
    tenant: "Cabinet Diarra & Associés",
    status: "Entretien seul",
    price: "420 000 FCFA",
    period: "/intervention",
    image: assets.office,
    surface: "210 m²",
    rooms: 5,
    bedrooms: 0,
    baths: 3,
    deposit: "3 800 000 FCFA",
    commission: "7%",
    financialMode: "Contrat entretien seul",
    lastAction: "Peinture à valider · flux non-loyer",
    serviceProvider: {
      company: "Bamako Pro Maintenance",
      contact: "Mahamadou Samaké",
      role: "Chef d'équipe travaux",
      phone: "+223 74 22 90 18",
      email: "contact@bamakopromaintenance.ml",
      specialties: ["Peinture", "Petits travaux", "Électricité", "Plomberie"],
      zone: "Hamdallaye ACI, Badalabougou, Centre-ville",
      responseTime: "Diagnostic sous 12h · intervention sous 48h",
      contract: "Contrat cadre entretien bureaux · 2026",
      lastVisit: "14/06/2026 · retouches peinture bureaux",
    },
    tags: ["Ascenseur", "Parking", "Fibre optique"],
  },
  {
    code: "EKM-VIL-077",
    name: "Villa Sotuba Jardin",
    type: "Maison de ville",
    district: "Sotuba ACI, Bamako",
    address: "Route de Sotuba, Bamako",
    owner: "Fatoumata Diallo",
    tenant: "Libre",
    status: "Réservé",
    price: "1 250 000 FCFA",
    period: "/mois",
    image: assets.villa,
    surface: "230 m²",
    rooms: 6,
    bedrooms: 4,
    baths: 3,
    deposit: "2 500 000 FCFA",
    commission: "5%",
    financialMode: "Encaissement par l'agence",
    lastAction: "Visite confirmée vendredi",
    tags: ["Terrasse", "Cuisine équipée", "Cour pavée"],
  },
  {
    code: "EKM-TER-006",
    name: "Parcelle Titibougou",
    type: "Terrain",
    district: "Titibougou, Bamako",
    address: "Zone Titibougou Extension, Bamako",
    owner: "Youssouf Konaté",
    tenant: "N/A",
    status: "Vendu",
    price: "38 000 000 FCFA",
    period: "(vente)",
    image: assets.villa,
    surface: "600 m²",
    rooms: 0,
    bedrooms: 0,
    baths: 0,
    deposit: "N/A",
    commission: "3%",
    financialMode: "Encaissement direct par le propriétaire",
    lastAction: "Acte archivé",
    tags: ["Titre foncier", "Angle de rue", "Viabilisé"],
  },
  {
    code: "EKM-STD-024",
    name: "Studio Badalabougou",
    type: "Studio meublé",
    district: "Badalabougou, Bamako",
    address: "Rue 326, Badalabougou, Bamako",
    owner: "Moussa Touré",
    tenant: "Adama Sangaré",
    status: "Indisponible",
    price: "350 000 FCFA",
    period: "/mois",
    image: assets.residence,
    surface: "52 m²",
    rooms: 1,
    bedrooms: 1,
    baths: 1,
    deposit: "700 000 FCFA",
    commission: "Montant fixe",
    financialMode: "Encaissement par l'agence",
    lastAction: "Sinistre plomberie ouvert",
    tags: ["Meublé", "Gardien", "Eau incluse"],
  },
];

const owners = [
  {
    id: "PRO-2026-001",
    name: "Mamadou Keita",
    phone: "+223 76 12 45 89",
    email: "m.keita@ekimmo.ml",
    properties: 4,
    rent: "8 450 000 FCFA",
    charges: "680 000 FCFA",
    commission: "422 500 FCFA",
    balance: "4 180 000 FCFA",
    lastPayment: "22/05/2026",
    status: "Actif",
    avatar: assets.agentA,
  },
  {
    id: "PRO-2026-042",
    name: "Sira Coulibaly",
    phone: "+223 70 44 31 22",
    email: "sira.coulibaly@gmail.com",
    properties: 7,
    rent: "12 900 000 FCFA",
    charges: "1 100 000 FCFA",
    commission: "645 000 FCFA",
    balance: "6 760 000 FCFA",
    lastPayment: "18/05/2026",
    status: "Actif",
    initials: "SC",
  },
  {
    id: "PRO-2025-118",
    name: "Foncière Mandé",
    phone: "+223 20 29 44 10",
    email: "contact@foncieremande.ml",
    properties: 12,
    rent: "24 100 000 FCFA",
    charges: "2 850 000 FCFA",
    commission: "1 205 000 FCFA",
    balance: "9 420 000 FCFA",
    lastPayment: "10/05/2026",
    status: "Actif",
    initials: "FM",
  },
  {
    id: "PRO-2024-071",
    name: "Youssouf Konaté",
    phone: "+223 66 01 02 44",
    email: "ykonate@mande-invest.ml",
    properties: 2,
    rent: "0 FCFA",
    charges: "0 FCFA",
    commission: "1 140 000 FCFA",
    balance: "0 FCFA",
    lastPayment: "N/A",
    status: "Inactif",
    initials: "YK",
  },
];

const tenants = [
  {
    id: "LOC-2026-011",
    name: "Awa Traoré",
    phone: "+223 76 32 10 18",
    email: "awa.traore@mail.ml",
    property: "Villa Koulouba",
    rent: "2 750 000 FCFA",
    contract: "CON-2026-014",
    deposit: "5 500 000 FCFA",
    paymentStatus: "À jour",
  },
  {
    id: "LOC-2026-018",
    name: "Oumar Sidibé",
    phone: "+223 70 60 88 21",
    email: "o.sidibe@email.ml",
    property: "Résidence ACI Baobab",
    rent: "850 000 FCFA",
    contract: "CON-2026-023",
    deposit: "1 700 000 FCFA",
    paymentStatus: "Partiel",
  },
  {
    id: "LOC-2026-041",
    name: "Mariam Sissoko",
    phone: "+223 73 45 12 61",
    email: "m.sissoko@mail.ml",
    property: "Appartement A-101 Korofina",
    rent: "375 000 FCFA",
    contract: "CON-2026-041",
    deposit: "750 000 FCFA",
    paymentStatus: "À jour",
  },
  {
    id: "LOC-2026-044",
    name: "Ibrahima Maïga",
    phone: "+223 66 18 72 05",
    email: "i.maiga@courrier.ml",
    property: "Appartement B-102 Korofina",
    rent: "65 000 FCFA",
    contract: "CON-2026-044",
    deposit: "N/A",
    paymentStatus: "Suivi entretien",
  },
  {
    id: "LOC-2025-052",
    name: "Adama Sangaré",
    phone: "+223 79 11 08 08",
    email: "adama.sangare@mail.ml",
    property: "Studio Badalabougou",
    rent: "350 000 FCFA",
    contract: "CON-2025-088",
    deposit: "700 000 FCFA",
    paymentStatus: "Impayé",
  },
];

const prospects = [
  {
    name: "Bintou Dembélé",
    phone: "+223 74 15 33 90",
    need: "Villa 4 chambres",
    district: "Sotuba / Titibougou",
    budget: "1 500 000 FCFA",
    agent: "Mariam Traoré",
    status: "Nouveau",
    next: "Appel de qualification",
  },
  {
    name: "Cabinet Yelen",
    phone: "+223 20 24 91 81",
    need: "Bureau 200 m²",
    district: "ACI 2000",
    budget: "2 000 000 FCFA",
    agent: "Issa Maïga",
    status: "Contacté",
    next: "Envoi de 3 propositions",
  },
  {
    name: "Amadou Cissé",
    phone: "+223 66 44 17 21",
    need: "Appartement T3",
    district: "Hamdallaye",
    budget: "700 000 FCFA",
    agent: "Mariam Traoré",
    status: "Visite prévue",
    next: "Visite jeudi 10h",
  },
  {
    name: "Salimata Bagayoko",
    phone: "+223 75 09 45 22",
    need: "Maison familiale",
    district: "Badalabougou",
    budget: "950 000 FCFA",
    agent: "Cheick Camara",
    status: "Intéressé",
    next: "Négociation caution",
  },
  {
    name: "ONG Sahel Santé",
    phone: "+223 20 70 12 09",
    need: "Bureau sécurisé",
    district: "ACI 2000",
    budget: "2 400 000 FCFA",
    agent: "Issa Maïga",
    status: "Conclu",
    next: "Préparer contrat",
  },
  {
    name: "Moussa Dabo",
    phone: "+223 78 00 54 23",
    need: "Studio meublé",
    district: "Badalabougou",
    budget: "300 000 FCFA",
    agent: "Cheick Camara",
    status: "Perdu",
    next: "Budget insuffisant",
  },
];

const visits = [
  {
    client: "Amadou Cissé",
    property: "Résidence ACI Baobab",
    date: "28/05/2026",
    time: "10:00",
    agent: "Mariam Traoré",
    status: "Prévue",
    feedback: "Souhaite voir parking",
    next: "Confirmer la présence",
  },
  {
    client: "Cabinet Yelen",
    property: "Plateau Office Center",
    date: "29/05/2026",
    time: "15:30",
    agent: "Issa Maïga",
    status: "Reportée",
    feedback: "DG indisponible",
    next: "Proposer mardi",
  },
  {
    client: "Salimata Bagayoko",
    property: "Villa Sotuba Jardin",
    date: "27/05/2026",
    time: "17:00",
    agent: "Cheick Camara",
    status: "Client intéressé",
    feedback: "Accord de principe",
    next: "Envoyer fiche caution",
  },
];

const contracts = [
  {
    number: "CON-2026-014",
    type: "Contrat de location",
    property: "Villa Koulouba",
    owner: "Mamadou Keita",
    client: "Awa Traoré",
    start: "01/01/2026",
    end: "31/12/2026",
    status: "Actif",
  },
  {
    number: "CON-2026-023",
    type: "Mandat de gestion",
    property: "Résidence ACI Baobab",
    owner: "Sira Coulibaly",
    client: "E.K immo",
    start: "15/03/2026",
    end: "14/03/2027",
    status: "Actif",
  },
  {
    number: "CON-2026-041",
    type: "Contrat de location",
    property: "Appartement A-101 Korofina",
    owner: "Foncière Mandé",
    client: "Mariam Sissoko",
    start: "01/04/2026",
    end: "31/03/2027",
    status: "Actif",
  },
  {
    number: "CON-2026-044",
    type: "Convention entretien",
    property: "Appartement B-102 Korofina",
    owner: "Foncière Mandé",
    client: "Ibrahima Maïga",
    start: "01/05/2026",
    end: "30/04/2027",
    status: "Suivi",
  },
  {
    number: "CON-2025-088",
    type: "Contrat de location",
    property: "Studio Badalabougou",
    owner: "Moussa Touré",
    client: "Adama Sangaré",
    start: "01/07/2025",
    end: "30/06/2026",
    status: "À échéance",
  },
  {
    number: "CON-2024-112",
    type: "Mandat de vente",
    property: "Parcelle Titibougou",
    owner: "Youssouf Konaté",
    client: "Boubacar Samaké",
    start: "02/11/2024",
    end: "Vendu",
    status: "Archivé",
  },
];

const rentRows = [
  {
    period: "Mai 2026",
    tenant: "Awa Traoré",
    property: "Villa Koulouba",
    owner: "Mamadou Keita",
    expected: "2 750 000 FCFA",
    paid: "2 750 000 FCFA",
    balance: "0 FCFA",
    status: "Payé",
  },
  {
    period: "Mai 2026",
    tenant: "Oumar Sidibé",
    property: "Résidence ACI Baobab",
    owner: "Sira Coulibaly",
    expected: "850 000 FCFA",
    paid: "450 000 FCFA",
    balance: "400 000 FCFA",
    status: "Partiel",
  },
  {
    period: "Mai 2026",
    tenant: "Mariam Sissoko",
    property: "Appartement A-101 Korofina",
    owner: "Foncière Mandé",
    expected: "375 000 FCFA",
    paid: "375 000 FCFA",
    balance: "0 FCFA",
    status: "Payé",
  },
  {
    period: "Mai 2026",
    tenant: "Adama Sangaré",
    property: "Studio Badalabougou",
    owner: "Moussa Touré",
    expected: "350 000 FCFA",
    paid: "0 FCFA",
    balance: "350 000 FCFA",
    status: "Impayé",
  },
  {
    period: "Juin 2026",
    tenant: "Cabinet Diarra",
    property: "Plateau Office Center",
    owner: "Foncière Mandé",
    expected: "1 900 000 FCFA",
    paid: "0 FCFA",
    balance: "1 900 000 FCFA",
    status: "À payer",
  },
];

const paymentModes = ["Espèces", "Chèque", "Virement", "Orange Money", "Moov Money", "Autre"];

const paymentRecords = [
  {
    reference: "PAY-2026-051",
    period: "Mai 2026",
    tenant: "Awa Traoré",
    property: "Villa Koulouba",
    owner: "Mamadou Keita",
    due: "2 750 000 FCFA",
    paid: "2 750 000 FCFA",
    balance: "0 FCFA",
    mode: "Virement",
    paymentRef: "VIR-BDM-250505",
    date: "05/05/2026",
    receipt: "REC-2026-081",
    status: "Payé",
    note: "Paiement complet rapproché avec le reçu archivé.",
  },
  {
    reference: "PAY-2026-088",
    period: "Mai 2026",
    tenant: "Oumar Sidibé",
    property: "Résidence ACI Baobab",
    owner: "Sira Coulibaly",
    due: "850 000 FCFA",
    paid: "450 000 FCFA",
    balance: "400 000 FCFA",
    mode: "Orange Money",
    paymentRef: "OM-250528-118",
    date: "28/05/2026",
    receipt: "REC-2026-088",
    status: "Partiel",
    note: "Paiement partiel reçu, relance prévue pour le solde.",
  },
  {
    reference: "PAY-2026-091",
    period: "Mai 2026",
    tenant: "Mariam Sissoko",
    property: "Appartement A-101 Korofina",
    owner: "Foncière Mandé",
    due: "375 000 FCFA",
    paid: "375 000 FCFA",
    balance: "0 FCFA",
    mode: "Moov Money",
    paymentRef: "MM-250510-A101",
    date: "10/05/2026",
    receipt: "REC-2026-091",
    status: "Payé",
    note: "Appartement rattaché à l'immeuble Korofina Terrasses.",
  },
  {
    reference: "PAY-2026-096",
    period: "Avril 2026",
    tenant: "Adama Sangaré",
    property: "Studio Badalabougou",
    owner: "Moussa Touré",
    due: "350 000 FCFA",
    paid: "0 FCFA",
    balance: "350 000 FCFA",
    mode: "Aucun",
    paymentRef: "N/A",
    date: "En attente",
    receipt: "Non généré",
    status: "Impayé",
    note: "Relance ouverte depuis le 24/05/2026.",
  },
];

const invoices = [
  {
    number: "FAC-2026-055",
    type: "Facture",
    client: "Awa Traoré",
    property: "Villa Koulouba",
    amount: "2 750 000 FCFA",
    date: "05/05/2026",
    status: "Archivé",
  },
  {
    number: "REC-2026-088",
    type: "Reçu",
    client: "Oumar Sidibé",
    property: "Résidence ACI Baobab",
    amount: "450 000 FCFA",
    date: "12/05/2026",
    status: "Généré",
  },
  {
    number: "QUI-2026-031",
    type: "Quittance",
    client: "Cabinet Diarra",
    property: "Plateau Office Center",
    amount: "1 900 000 FCFA",
    date: "01/06/2026",
    status: "Imprimé",
  },
];

const commissions = [
  {
    operation: "Location Villa Koulouba",
    property: "Villa Koulouba",
    owner: "Mamadou Keita",
    collected: "2 750 000 FCFA",
    mode: "Pourcentage",
    commission: "137 500 FCFA",
    ownerNet: "2 612 500 FCFA",
  },
  {
    operation: "Vente parcelle Titibougou",
    property: "Parcelle Titibougou",
    owner: "Youssouf Konaté",
    collected: "38 000 000 FCFA",
    mode: "3%",
    commission: "1 140 000 FCFA",
    ownerNet: "36 860 000 FCFA",
  },
  {
    operation: "Mandat résidence ACI",
    property: "Résidence ACI Baobab",
    owner: "Sira Coulibaly",
    collected: "850 000 FCFA",
    mode: "50% du loyer",
    commission: "425 000 FCFA",
    ownerNet: "425 000 FCFA",
  },
];

const charges = [
  {
    id: "CHG-2026-051",
    date: "17/05/2026",
    type: "Plomberie",
    category: "Réparation",
    description: "Réparation fuite salle d'eau et remplacement flexible",
    property: "Studio Badalabougou",
    owner: "Moussa Touré",
    tenant: "Adama Sangaré",
    amount: "95 000 FCFA",
    payer: "Propriétaire",
    status: "À valider",
    proof: "Reçu artisan plomberie",
    proofStatus: "Présent",
    period: "Mai 2026",
    agent: "Cheick Camara",
    paymentMode: "Espèces",
    paymentRef: "ESP-CHG-051",
    linkedMaintenance: "Réparation fuite",
    impact: "À déduire du reversement propriétaire",
    ownerCollection: false,
    createdBy: "Mariam Traoré",
    modifiedBy: "Cheick Camara",
    validatedBy: "À confirmer",
    validationDate: "À valider",
    history: ["Créée le 17/05/2026", "Justificatif ajouté le 18/05/2026", "En attente validation responsable"],
  },
  {
    id: "CHG-2026-052",
    date: "20/05/2026",
    type: "Gardiennage",
    category: "Gardiennage",
    description: "Gardiennage mensuel résidence et contrôle accès",
    property: "Résidence ACI Baobab",
    owner: "Sira Coulibaly",
    tenant: "Oumar Sidibé",
    amount: "180 000 FCFA",
    payer: "Agence",
    proof: "Facture mensuelle",
    proofStatus: "Présent",
    status: "Payée",
    period: "Mai 2026",
    agent: "Aïssata Diarra",
    paymentMode: "Mobile money",
    paymentRef: "OM-2026-052",
    linkedMaintenance: "Non lié",
    impact: "Supportée par l'agence",
    ownerCollection: false,
    createdBy: "Aïssata Diarra",
    modifiedBy: "Aïssata Diarra",
    validatedBy: "Admin E.K immo",
    validationDate: "21/05/2026",
    history: ["Créée le 20/05/2026", "Validée le 21/05/2026", "Payée par agence"],
  },
  {
    id: "CHG-2026-053",
    date: "25/05/2026",
    type: "Climatisation",
    category: "Entretien",
    description: "Recharge gaz et nettoyage split salon principal",
    property: "Villa Koulouba",
    owner: "Mamadou Keita",
    tenant: "Awa Traoré",
    amount: "240 000 FCFA",
    payer: "Locataire / refacturable",
    proof: "Devis signé",
    proofStatus: "Présent",
    status: "Refacturable",
    period: "Mai 2026",
    agent: "Mariam Traoré",
    paymentMode: "Virement",
    paymentRef: "VIR-CHG-053",
    linkedMaintenance: "Maintenance climatisation",
    impact: "À refacturer au locataire",
    ownerCollection: false,
    createdBy: "Mariam Traoré",
    modifiedBy: "Mariam Traoré",
    validatedBy: "Admin E.K immo",
    validationDate: "26/05/2026",
    history: ["Créée le 25/05/2026", "Rattachée au locataire", "À intégrer dans la prochaine facture"],
  },
  {
    id: "CHG-2026-054",
    date: "12/06/2026",
    type: "Nettoyage",
    category: "Nettoyage",
    description: "Nettoyage complet avant nouvelle visite locative",
    property: "Villa Sotuba Jardin",
    owner: "Fatoumata Diallo",
    tenant: "Libre",
    amount: "25 000 FCFA",
    payer: "Propriétaire",
    proof: "Reçu prestataire",
    proofStatus: "Manquant",
    status: "À déduire",
    period: "Juin 2026",
    agent: "Cheick Camara",
    paymentMode: "Espèces",
    paymentRef: "À compléter",
    linkedMaintenance: "Non lié",
    impact: "À déduire du reversement propriétaire",
    ownerCollection: false,
    createdBy: "Cheick Camara",
    modifiedBy: "Cheick Camara",
    validatedBy: "À confirmer",
    validationDate: "À valider",
    history: ["Créée le 12/06/2026", "Justificatif demandé au prestataire"],
  },
  {
    id: "CHG-2026-055",
    date: "13/06/2026",
    type: "Publicité",
    category: "Publicité",
    description: "Annonce sponsorisée et visuels pour appartement ACI",
    property: "Résidence ACI Baobab",
    owner: "Sira Coulibaly",
    tenant: "Libre",
    amount: "15 000 FCFA",
    payer: "Agence",
    proof: "Capture campagne",
    proofStatus: "Présent",
    status: "Validée",
    period: "Juin 2026",
    agent: "Aïssata Diarra",
    paymentMode: "Carte agence",
    paymentRef: "PUB-ACI-055",
    linkedMaintenance: "Non lié",
    impact: "Supportée par l'agence",
    ownerCollection: false,
    createdBy: "Aïssata Diarra",
    modifiedBy: "Aïssata Diarra",
    validatedBy: "Admin E.K immo",
    validationDate: "13/06/2026",
    history: ["Créée le 13/06/2026", "Validée le 13/06/2026"],
  },
  {
    id: "CHG-2026-056",
    date: "14/06/2026",
    type: "Peinture",
    category: "Travaux",
    description: "Retouches peinture bureaux avant remise en exploitation",
    property: "Plateau Office Center",
    owner: "Foncière Mandé",
    tenant: "Cabinet Diarra & Associés",
    amount: "420 000 FCFA",
    payer: "Suivi interne uniquement",
    proof: "Facture entrepreneur",
    proofStatus: "Présent",
    status: "Brouillon",
    period: "Juin 2026",
    agent: "Issa Maïga",
    paymentMode: "Virement propriétaire",
    paymentRef: "MANDÉ-TRV-056",
    linkedMaintenance: "Peinture intérieure",
    impact: "Suivi interne sans impact sur encaissement agence",
    ownerCollection: true,
    createdBy: "Issa Maïga",
    modifiedBy: "Issa Maïga",
    validatedBy: "Non validée",
    validationDate: "À confirmer",
    history: ["Créée le 14/06/2026", "Bien en encaissement propriétaire", "À confirmer avec Foncière Mandé"],
  },
  {
    id: "CHG-2026-057",
    date: "15/06/2026",
    type: "Frais administratif",
    category: "Frais administratif",
    description: "Copies légalisées, dossier bail et déplacement mairie",
    property: "Villa Koulouba",
    owner: "Mamadou Keita",
    tenant: "Awa Traoré",
    amount: "35 000 FCFA",
    payer: "Locataire / refacturable",
    proof: "Reçu mairie",
    proofStatus: "Présent",
    status: "En attente",
    period: "Juin 2026",
    agent: "Mariam Traoré",
    paymentMode: "Espèces",
    paymentRef: "ADM-057",
    linkedMaintenance: "Non lié",
    impact: "À refacturer au locataire",
    ownerCollection: false,
    createdBy: "Mariam Traoré",
    modifiedBy: "Mariam Traoré",
    validatedBy: "À confirmer",
    validationDate: "À valider",
    history: ["Créée le 15/06/2026", "Attente validation avant facturation locataire"],
  },
];

const chargeTypes = ["Nettoyage", "Réparation", "Plomberie", "Électricité", "Peinture", "Travaux", "Gardiennage", "Publicité", "Déplacement", "Frais administratif", "Entretien", "Autre"];
const chargePayers = ["Agence", "Propriétaire", "Locataire / refacturable", "Suivi interne uniquement"];
const chargeStatuses = ["Brouillon", "À valider", "Validée", "Payée", "À déduire", "Refacturable", "Déduite", "En attente", "Annulée"];
const chargeQuickFilters = ["Toutes les charges", "Charges agence", "Charges propriétaire", "Refacturable locataire", "À valider", "Avec justificatif manquant"];

const maintenances = [
  {
    property: "Studio Badalabougou",
    type: "Réparation fuite",
    date: "30/05/2026",
    manager: "Cheick Camara",
    cost: "95 000 FCFA",
    payer: "Propriétaire",
    status: "Planifié",
    note: "Intervention plomberie salle d'eau",
  },
  {
    property: "Plateau Office Center",
    type: "Peinture intérieure",
    date: "03/06/2026",
    manager: "Issa Maïga",
    cost: "420 000 FCFA",
    payer: "Propriétaire",
    status: "En cours",
    note: "À finaliser avant nouvelle visite",
  },
  {
    property: "Villa Koulouba",
    type: "Entretien jardin",
    date: "05/06/2026",
    manager: "Mariam Traoré",
    cost: "65 000 FCFA",
    payer: "Agence",
    status: "À prévoir",
    note: "Contrat périodique à créer",
  },
];

const reversals = [
  {
    owner: "Mamadou Keita",
    collected: "8 450 000 FCFA",
    commission: "422 500 FCFA",
    charges: "680 000 FCFA",
    paid: "3 167 500 FCFA",
    balance: "4 180 000 FCFA",
    status: "À reverser",
  },
  {
    owner: "Sira Coulibaly",
    collected: "12 900 000 FCFA",
    commission: "645 000 FCFA",
    charges: "1 100 000 FCFA",
    paid: "4 395 000 FCFA",
    balance: "6 760 000 FCFA",
    status: "Partiel",
  },
  {
    owner: "Foncière Mandé",
    collected: "24 100 000 FCFA",
    commission: "1 205 000 FCFA",
    charges: "2 850 000 FCFA",
    paid: "10 625 000 FCFA",
    balance: "9 420 000 FCFA",
    status: "À valider",
  },
];

const reports = [
  ["Rapport des biens", "Portefeuille, statuts, quartiers et disponibilités", Building2],
  ["Rapport des propriétaires", "Soldes, reversements et mandats actifs", UsersRound],
  ["Rapport des locataires", "Occupation, cautions et contrats actifs", UserRound],
  ["Rapport des loyers", "Attendus, encaissés et soldes par période", Banknote],
  ["Rapport des impayés", "Retards, ancienneté et actions de relance", AlertTriangle],
  ["Rapport des commissions", "Calculs agence et montants nets propriétaires", CircleDollarSign],
  ["Rapport des charges", "Dépenses, prises en charge et justificatifs", ReceiptText],
  ["Rapport des entretiens", "Planning, coûts et responsables", Wrench],
  ["Rapport des visites", "Prospects, agents et résultats commerciaux", CalendarDays],
  ["Situation propriétaire", "État PDF par propriétaire et période", FileText],
  ["Contrats à échéance", "Baux à renouveler ou archiver", Clock3],
  ["Reversements propriétaires", "Préparation des états de reversement", RefreshCw],
];

const users = [
  {
    name: "Aïssata Diarra",
    email: "admin@ekimmo.ml",
    role: "Administrateur",
    status: "Actif",
    lastLogin: "28/05/2026 07:42",
  },
  {
    name: "Mariam Traoré",
    email: "mariam.traore@ekimmo.ml",
    role: "Agent immobilier",
    status: "Actif",
    lastLogin: "27/05/2026 18:20",
  },
  {
    name: "Issa Maïga",
    email: "issa.maiga@ekimmo.ml",
    role: "Manager",
    status: "Actif",
    lastLogin: "27/05/2026 16:01",
  },
  {
    name: "Néné Coulibaly",
    email: "caisse@ekimmo.ml",
    role: "Caisse / Encaissement",
    status: "Suspendu",
    lastLogin: "18/05/2026 11:44",
  },
];

const templates = [
  "Contrat de location",
  "Mandat de gestion",
  "Mandat de vente",
  "Promesse de vente",
  "Facture",
  "Reçu",
  "Quittance",
  "État de reversement",
  "Fiche bien",
  "Fiche propriétaire",
  "Fiche locataire",
];

const roleProfiles = [
  "Administrateur",
  "Directeur / Manager",
  "Agent immobilier",
  "Caisse / Encaissement",
  "Assistant administratif",
];

const periodOptions = ["Jour", "Semaine", "Mois", "Année", "Période personnalisée"];

const dashboardKpisByPeriod = {
  Jour: ["18", "6", "12", "3.8M FCFA", "420K FCFA", "610K FCFA", "280K FCFA", "2.4M FCFA"],
  Semaine: ["54", "11", "43", "18.6M FCFA", "1.1M FCFA", "2.3M FCFA", "860K FCFA", "9.8M FCFA"],
  Mois: ["142", "18", "124", "85.4M FCFA", "3.2M FCFA", "12.4M FCFA", "4.1M FCFA", "45.2M FCFA"],
  "Année": ["1 284", "96", "1 188", "906.8M FCFA", "38.6M FCFA", "126.7M FCFA", "49.2M FCFA", "372.4M FCFA"],
  "Période personnalisée": ["76", "14", "62", "42.9M FCFA", "1.9M FCFA", "6.8M FCFA", "2.2M FCFA", "24.7M FCFA"],
};

const dashboardKpiDetailsByPeriod = {
  Jour: [
    [["Gestion locative", "14"], ["Entretien seul", "4"]],
    [["Location", "5"], ["Vente", "1"]],
    [["Loués", "11"], ["Réservés", "1"]],
    [["Loyers", "3.4M"], ["Entretien", "420K"]],
    [["Loyers", "360K"], ["Forfaits", "60K"]],
    [["Commissions", "520K"], ["Forfaits", "90K"]],
    [["Entretiens", "140K"], ["Refacturations", "35K"]],
    [["Propriétaires", "2.4M"], ["Déductions", "95K"]],
  ],
  Semaine: [
    [["Gestion locative", "45"], ["Entretien seul", "9"]],
    [["Location", "8"], ["Vente", "3"]],
    [["Loués", "39"], ["Réservés", "4"]],
    [["Loyers", "16.9M"], ["Entretien", "1.7M"]],
    [["Loyers", "940K"], ["Forfaits", "160K"]],
    [["Commissions", "1.9M"], ["Forfaits", "420K"]],
    [["Entretiens", "360K"], ["Refacturations", "120K"]],
    [["Propriétaires", "9.8M"], ["Déductions", "180K"]],
  ],
  Mois: [
    [["Gestion locative", "126"], ["Entretien seul", "16"]],
    [["Location", "14"], ["Vente", "4"]],
    [["Loués", "118"], ["Réservés", "6"]],
    [["Loyers", "81.2M"], ["Entretien", "4.2M"]],
    [["Loyers", "3.2M"], ["Forfaits", "0.3M"]],
    [["Commissions", "10.6M"], ["Forfaits", "1.8M"]],
    [["Entretiens", "1.2M"], ["Refacturations", "275K"]],
    [["Propriétaires", "45.2M"], ["Déductions", "120K"]],
  ],
  "Année": [
    [["Gestion locative", "1 096"], ["Entretien seul", "188"]],
    [["Location", "72"], ["Vente", "24"]],
    [["Loués", "1 126"], ["Réservés", "62"]],
    [["Loyers", "862.1M"], ["Entretien", "44.7M"]],
    [["Loyers", "38.6M"], ["Forfaits", "3.8M"]],
    [["Commissions", "111.2M"], ["Forfaits", "15.5M"]],
    [["Entretiens", "13.8M"], ["Refacturations", "4.9M"]],
    [["Propriétaires", "372.4M"], ["Déductions", "8.2M"]],
  ],
  "Période personnalisée": [
    [["Gestion locative", "64"], ["Entretien seul", "12"]],
    [["Location", "11"], ["Vente", "3"]],
    [["Loués", "58"], ["Réservés", "4"]],
    [["Loyers", "40.6M"], ["Entretien", "2.3M"]],
    [["Loyers", "1.9M"], ["Forfaits", "210K"]],
    [["Commissions", "5.8M"], ["Forfaits", "1.0M"]],
    [["Entretiens", "780K"], ["Refacturations", "180K"]],
    [["Propriétaires", "24.7M"], ["Déductions", "95K"]],
  ],
};

const rentBarsByIndicator = {
  "Loyers attendus": {
    Jour: [["Lun", 48], ["Mar", 72], ["Mer", 58], ["Jeu", 66], ["Ven", 82], ["Sam", 42]],
    Semaine: [["S1", 54], ["S2", 68], ["S3", 61], ["S4", 79], ["S5", 72], ["S6", 84]],
    Mois: [["Jan", 52], ["Fév", 66], ["Mar", 72], ["Avr", 56], ["Mai", 80], ["Juin", 75]],
    "Année": [["2021", 45], ["2022", 57], ["2023", 64], ["2024", 73], ["2025", 81], ["2026", 88]],
    "Période personnalisée": [["J1", 38], ["J2", 56], ["J3", 64], ["J4", 51], ["J5", 77], ["J6", 69]],
  },
  "Paiements reçus": {
    Jour: [["Lun", 42], ["Mar", 63], ["Mer", 52], ["Jeu", 61], ["Ven", 72], ["Sam", 34]],
    Semaine: [["S1", 49], ["S2", 61], ["S3", 57], ["S4", 70], ["S5", 66], ["S6", 76]],
    Mois: [["Jan", 48], ["Fév", 58], ["Mar", 63], ["Avr", 52], ["Mai", 72], ["Juin", 68]],
    "Année": [["2021", 38], ["2022", 49], ["2023", 58], ["2024", 69], ["2025", 74], ["2026", 82]],
    "Période personnalisée": [["J1", 35], ["J2", 49], ["J3", 58], ["J4", 45], ["J5", 70], ["J6", 62]],
  },
  "Soldes impayés": {
    Jour: [["Lun", 18], ["Mar", 25], ["Mer", 21], ["Jeu", 30], ["Ven", 24], ["Sam", 16]],
    Semaine: [["S1", 26], ["S2", 22], ["S3", 31], ["S4", 28], ["S5", 19], ["S6", 16]],
    Mois: [["Jan", 20], ["Fév", 24], ["Mar", 18], ["Avr", 32], ["Mai", 26], ["Juin", 21]],
    "Année": [["2021", 34], ["2022", 29], ["2023", 25], ["2024", 22], ["2025", 19], ["2026", 16]],
    "Période personnalisée": [["J1", 22], ["J2", 17], ["J3", 28], ["J4", 24], ["J5", 18], ["J6", 15]],
  },
};

const pipelineData = {
  "Commercial & visites": {
    title: "Pipeline commercial & visites",
    total: 58,
    items: [["Nouveau", 8, "pale"], ["Contacté", 12, "soft"], ["Visite prévue", 18, "purple"], ["Intéressé", 6, "silver"], ["Conclu", 10, "dark"], ["Perdu", 4, "red"]],
  },
  Loyers: {
    title: "Pipeline des loyers",
    total: 124,
    items: [["À encaisser", 28, "pale"], ["Partiels", 12, "soft"], ["Payés", 76, "purple"], ["En retard", 5, "silver"], ["Litige", 2, "dark"], ["Perdus", 1, "red"]],
  },
  Commissions: {
    title: "Pipeline des commissions",
    total: 42,
    items: [["À calculer", 9, "pale"], ["Validées", 13, "soft"], ["Facturées", 11, "purple"], ["En attente", 4, "silver"], ["Réglées", 4, "dark"], ["Bloquées", 1, "red"]],
  },
  Clients: {
    title: "Pipeline clients",
    total: 86,
    items: [["Prospects", 28, "pale"], ["Contactés", 18, "soft"], ["Qualifiés", 17, "purple"], ["Négociation", 9, "silver"], ["Actifs", 12, "dark"], ["Perdus", 2, "red"]],
  },
  Biens: {
    title: "Pipeline des biens",
    total: 142,
    items: [["Nouveaux", 14, "pale"], ["À publier", 18, "soft"], ["Disponibles", 32, "purple"], ["Réservés", 10, "silver"], ["Loués", 62, "dark"], ["Indisponibles", 6, "red"]],
  },
};

const financeSummaryByPeriod = {
  Jour: ["8.6M FCFA", "6.9M FCFA", "1.7M FCFA", "620K FCFA", "4.1M FCFA"],
  Semaine: ["31.8M FCFA", "25.6M FCFA", "6.2M FCFA", "2.1M FCFA", "13.5M FCFA"],
  Mois: ["112.5M FCFA", "89.3M FCFA", "23.2M FCFA", "15.4M FCFA", "45.2M FCFA"],
  "Année": ["1.28B FCFA", "1.05B FCFA", "230.4M FCFA", "112.6M FCFA", "372.4M FCFA"],
  "Période personnalisée": ["54.2M FCFA", "43.8M FCFA", "10.4M FCFA", "6.3M FCFA", "18.9M FCFA"],
};

const periodWeight = {
  Jour: 0.22,
  Semaine: 0.48,
  Mois: 1,
  "Année": 7.6,
  "Période personnalisée": 0.72,
};

const rentTargetByPeriod = {
  Jour: 3800000,
  Semaine: 18600000,
  Mois: 85400000,
  "Ann\u00e9e": 906800000,
  "P\u00e9riode personnalis\u00e9e": 42900000,
};

const rentMonthlyEvolution = [
  { month: "Jan", expected: 13800000, collected: 12450000 },
  { month: "Fév", expected: 14600000, collected: 13280000 },
  { month: "Mar", expected: 15300000, collected: 14100000 },
  { month: "Avr", expected: 13200000, collected: 11650000 },
  { month: "Mai", expected: 16800000, collected: 15100000 },
  { month: "Juin", expected: 16000000, collected: 14300000 },
];

const pipelineToneColors = {
  pale: "#eef4f9",
  soft: "#dce8f3",
  purple: "#c8a21a",
  silver: "#bfc1c6",
  dark: "#052f5f",
  red: "#d51419",
};

function formatCompactFCFA(value) {
  if (value >= 1000000000) return `${(value / 1000000000).toFixed(1)}B FCFA`;
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M FCFA`;
  if (value >= 1000) return `${Math.round(value / 1000)}K FCFA`;
  return `${Math.round(value)} FCFA`;
}

function buildPipelineGradient(items, total) {
  let cursor = 0;
  const parts = items.map(([, value, tone]) => {
    const start = cursor;
    const end = cursor + (value / total) * 100;
    cursor = end;
    return `${pipelineToneColors[tone] ?? pipelineToneColors.purple} ${start.toFixed(2)}% ${end.toFixed(2)}%`;
  });
  return `radial-gradient(circle, var(--surface) 0 47%, transparent 48%), conic-gradient(${parts.join(", ")})`;
}

function getPipelineData(type, period) {
  const source = pipelineData[type] ?? pipelineData["Commercial & visites"];
  const weight = periodWeight[period] ?? 1;
  const items = source.items.map(([label, value, tone]) => [label, Math.max(1, Math.round(value * weight)), tone]);
  return {
    ...source,
    items,
    total: items.reduce((sum, [, value]) => sum + value, 0),
  };
}

function normalizeSearch(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function parseNumber(value) {
  const parsed = Number(String(value ?? "").replace(/[^\d]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

function uniqueValues(values) {
  return [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b));
}

function getPropertyByName(name) {
  return properties.find((property) => property.name === name);
}

function getPropertyByCode(code) {
  return properties.find((property) => property.code === code);
}

function isBuildingProperty(property) {
  return property?.structure?.kind === "building";
}

function getPropertyChildren(property) {
  if (!property) return [];
  return properties.filter((item) => item.parentCode === property.code);
}

function getPropertyParent(property) {
  return property?.parentCode ? getPropertyByCode(property.parentCode) : null;
}

function getPropertyRelationLabel(property) {
  const parent = getPropertyParent(property);
  if (parent) return `Rattaché à ${parent.name}`;
  const children = getPropertyChildren(property);
  if (children.length > 0) return `${children.length} lots rattachés`;
  return "";
}

function getPropertyStructureSummary(property) {
  if (isBuildingProperty(property)) {
    const units = property.structure.blocks.reduce((sum, block) => sum + block.units, 0);
    const available = property.structure.blocks.reduce((sum, block) => sum + block.available, 0);
    return `${property.structure.blocks.length} blocs · ${units} lots · ${available} libres`;
  }

  if (property?.parentCode) {
    return `${property.block} · ${property.floor} · lot ${property.unitNumber}`;
  }

  return "Bien individuel";
}

function isMaintenanceOnlyProperty(property) {
  return property?.status === "Entretien seul" || property?.financialMode?.includes("entretien seul");
}

function isAgencyCollectedProperty(name) {
  const property = getPropertyByName(name);
  return !property || (!property.financialMode.includes("direct par le propriétaire") && !property.financialMode.includes("entretien seul"));
}

function getAgencyRentRows() {
  return rentRows.filter((row) => isAgencyCollectedProperty(row.property));
}

function getPaymentKey(item) {
  return `${item.period}|${item.tenant}|${item.property}`;
}

function getPaymentStatus(expected, paid) {
  const expectedAmount = parseFCFA(expected);
  const paidAmount = parseFCFA(paid);
  if (paidAmount >= expectedAmount && expectedAmount > 0) return "Payé";
  if (paidAmount > 0) return "Partiel";
  return "En retard";
}

function mergeRentRowsWithPayments(baseRows, extraPayments = []) {
  const rows = [...baseRows];

  extraPayments.forEach((payment) => {
    const key = getPaymentKey(payment);
    const existingIndex = rows.findIndex((row) => getPaymentKey(row) === key);
    const expected = payment.due ?? payment.expected;
    const paid = payment.paid;
    const balance = payment.balance ?? formatFCFA(Math.max(parseFCFA(expected) - parseFCFA(paid), 0));
    const status = payment.status ?? getPaymentStatus(expected, paid);
    const nextRow = {
      period: payment.period,
      tenant: payment.tenant,
      property: payment.property,
      owner: payment.owner,
      expected,
      paid,
      balance,
      status,
    };

    if (existingIndex >= 0) {
      rows[existingIndex] = { ...rows[existingIndex], ...nextRow };
    } else {
      rows.unshift(nextRow);
    }
  });

  return rows;
}

function mergePaymentRecords(baseRecords, extraPayments = []) {
  const records = [...baseRecords];

  extraPayments.forEach((payment) => {
    const key = getPaymentKey(payment);
    const existingIndex = records.findIndex((item) => getPaymentKey(item) === key);
    if (existingIndex >= 0) {
      records[existingIndex] = { ...records[existingIndex], ...payment };
    } else {
      records.unshift(payment);
    }
  });

  return records;
}

function shouldOpenPaymentModal(label) {
  const text = normalizeSearch(label);
  if (text.includes("reversement") || text.includes("commission") || text.includes("rattacher") || text.includes("fiche paiement")) return false;
  return ["enregistrer paiement", "enregistrer un paiement", "paiement enregistre"].includes(text) || text.startsWith("paiement ");
}

function shouldOpenMaintenanceModal(label) {
  const text = normalizeSearch(label);
  if (text.includes("visite") || text.includes("charge") || text.includes("justificatif") || text.includes("photos")) return false;
  return ["ajouter entretien", "ajouter un entretien", "planifier entretien"].includes(text) || text.startsWith("planifier ");
}

function makeMaintenanceCharge(maintenance, sequence = 1) {
  const property = getPropertyByName(maintenance.property) ?? properties[0];
  const payer = maintenance.payer === "À déterminer" ? "À valider" : maintenance.payer;

  return {
    id: makeDocumentNumber("CHG", 200 + sequence),
    date: maintenance.date,
    type: maintenance.type,
    category: "Entretien",
    description: maintenance.note,
    property: maintenance.property,
    owner: property.owner,
    tenant: property.tenant,
    amount: maintenance.realCost && maintenance.realCost !== "0 FCFA" ? maintenance.realCost : maintenance.cost,
    payer,
    status: "À valider",
    proof: maintenance.proof || "Justificatif à joindre",
    proofStatus: maintenance.proof ? "Présent" : "Manquant",
    period: "Juin 2026",
    agent: maintenance.manager,
    paymentMode: "À déterminer",
    paymentRef: "À compléter",
    linkedMaintenance: maintenance.type,
    impact: payer === "Agence" ? "Supportée par l'agence" : payer === "Propriétaire" ? "À déduire du reversement propriétaire" : payer === "Locataire" ? "À refacturer au locataire" : "À déterminer après validation",
    ownerCollection: false,
    createdBy: maintenance.manager,
    modifiedBy: maintenance.manager,
    validatedBy: "À confirmer",
    validationDate: "À valider",
    history: [`Créée automatiquement depuis l'entretien ${maintenance.reference}`],
  };
}

function getPaymentReceiptValues(payment) {
  const isMobileMoney = ["Orange Money", "Moov Money"].includes(payment.mode);

  return {
    numero: payment.receipt,
    date: payment.date,
    nom: payment.tenant,
    structure: payment.property,
    telephone: tenants.find((tenant) => tenant.name === payment.tenant)?.phone ?? "+223 72 77 71 77",
    montantChiffres: payment.amountNow ?? payment.paid,
    montantLettres: "Montant encaissé pour loyer en francs CFA",
    espece: payment.mode === "Espèces",
    cheque: payment.mode === "Chèque",
    virement: payment.mode === "Virement",
    mobileMoney: isMobileMoney,
    objet: `Encaissement ${payment.period} - ${payment.property}`,
    lieu: "Bamako",
    agent: "Aïssata Diarra",
  };
}

function getDocumentDataForProperty(property, paymentsList = paymentRecords) {
  const owner = owners.find((item) => item.name === property.owner) ?? owners[0];
  const tenant = tenants.find((item) => item.name === property.tenant) ?? tenants[0];
  const payment = paymentsList.find((item) => item.property === property.name) ?? paymentRecords.find((item) => item.property === property.name) ?? paymentRecords[0];
  const invoice = invoices.find((item) => item.property === property.name) ?? {
    number: makeDocumentNumber("FAC", 90),
    type: "Facture",
    client: tenant.name,
    property: property.name,
    amount: property.price,
    date: "18/06/2026",
    status: "Brouillon",
  };
  const commission = commissions.find((item) => item.property === property.name || item.owner === owner.name) ?? commissions[0];

  return {
    invoice,
    payment: payment ?? paymentRecords[0],
    commission,
    property,
    owner,
    tenant,
  };
}

function makePropertyPdfArchive(property) {
  return {
    id: `property-pdf-${property.code}`,
    category: "Biens et clients",
    reference: `FBI-${property.code}`,
    title: `Fiche PDF - ${property.name}`,
    linked: `${property.type} · ${property.district}`,
    date: "18/06/2026",
    status: "Archivé",
    module: "Biens",
    owner: property.owner,
    property: property.name,
  };
}

function isSensitiveAction(title) {
  const text = normalizeSearch(title);
  return [
    "annuler",
    "modifier",
    "supprimer",
    "resilier",
    "montant",
    "commission",
    "reversement",
    "archiver",
    "desactiver",
  ].some((keyword) => text.includes(keyword));
}

function getSearchEntries() {
  const propertyEntries = properties.flatMap((property) => [
    {
      type: "Bien",
      match: property.name,
      detail: `${property.code} · ${property.type} · ${property.district}`,
      page: "Biens",
    },
    {
      type: "Montant",
      match: property.price,
      detail: `${property.name} · ${property.period}`,
      page: "Biens",
    },
    {
      type: "Nom",
      match: property.owner,
      detail: `Propriétaire · ${property.name}`,
      page: "Clients",
    },
    {
      type: "Nom",
      match: property.tenant,
      detail: `Locataire · ${property.name}`,
      page: "Clients",
    },
  ]);

  const ownerEntries = owners.flatMap((owner) => [
    {
      type: "Nom",
      match: owner.name,
      detail: `${owner.id} · Propriétaire · ${owner.properties} biens`,
      page: "Clients",
    },
    {
      type: "Contact",
      match: owner.phone,
      detail: `${owner.name} · ${owner.email}`,
      page: "Clients",
    },
    {
      type: "Montant",
      match: owner.balance,
      detail: `Solde à reverser · ${owner.name}`,
      page: "Finance",
    },
  ]);

  const tenantEntries = tenants.flatMap((tenant) => [
    {
      type: "Nom",
      match: tenant.name,
      detail: `${tenant.id} · ${tenant.property}`,
      page: "Clients",
    },
    {
      type: "Montant",
      match: tenant.rent,
      detail: `Loyer · ${tenant.name}`,
      page: "Finance",
    },
    {
      type: "Contrat",
      match: tenant.contract,
      detail: `${tenant.name} · ${tenant.property}`,
      page: "Contrats",
    },
  ]);

  const prospectEntries = prospects.flatMap((prospect) => [
    {
      type: "Nom",
      match: prospect.name,
      detail: `${prospect.status} · ${prospect.district}`,
      page: "Clients",
    },
    {
      type: "Besoin",
      match: prospect.need,
      detail: `${prospect.name} · ${prospect.budget}`,
      page: "Clients",
    },
    {
      type: "Montant",
      match: prospect.budget,
      detail: `Budget · ${prospect.name}`,
      page: "Clients",
    },
  ]);

  const financeEntries = rentRows.flatMap((row) => [
    {
      type: "Montant",
      match: row.expected,
      detail: `Loyer attendu · ${row.tenant} · ${row.property}`,
      page: "Finance",
    },
    {
      type: "Montant",
      match: row.balance,
      detail: `Solde · ${row.tenant} · ${row.status}`,
      page: "Finance",
    },
  ]);

  const documentEntries = invoices.flatMap((invoice) => [
    {
      type: "Document",
      match: invoice.number,
      detail: `${invoice.type} · ${invoice.client} · ${invoice.amount}`,
      page: "Contrats",
    },
    {
      type: "Montant",
      match: invoice.amount,
      detail: `${invoice.type} · ${invoice.client}`,
      page: "Finance",
    },
  ]);

  return [...propertyEntries, ...ownerEntries, ...tenantEntries, ...prospectEntries, ...financeEntries, ...documentEntries]
    .filter((entry) => entry.match)
    .map((entry) => ({
      ...entry,
      tone: searchToneByType[entry.type] ?? "default",
      haystack: normalizeSearch(`${entry.type} ${entry.match} ${entry.detail}`),
    }));
}

const searchEntries = getSearchEntries();

const notificationAlerts = [
  {
    id: "rent-late",
    title: "Loyers en retard",
    detail: "3 locataires a relancer aujourd'hui",
    meta: "3.2M FCFA",
    tone: "danger",
    page: "Finance",
  },
  {
    id: "visit-day",
    title: "Visites du jour",
    detail: "4 visites programmees entre ACI 2000 et Sotuba",
    meta: "Agenda",
    tone: "info",
    page: "Clients",
  },
  {
    id: "maintenance",
    title: "Entretien urgent",
    detail: "Fuite signalee au Studio Badalabougou",
    meta: "A traiter",
    tone: "warning",
    page: "Finance",
  },
  {
    id: "contract-end",
    title: "Contrats a echeance",
    detail: "2 baux se terminent ce mois-ci",
    meta: "Docs",
    tone: "muted",
    page: "Contrats",
  },
];

function getSearchResults(query) {
  const normalizedQuery = normalizeSearch(query).trim();
  if (!normalizedQuery) return [];

  return searchEntries
    .filter((entry) => entry.haystack.includes(normalizedQuery))
    .slice(0, 8);
}

function getProspectKey(prospect) {
  return prospect?.id ?? normalizeSearch(prospect?.name ?? "prospect");
}

function getVisitKey(visit) {
  return visit?.id ?? normalizeSearch(`${visit?.client ?? "client"}-${visit?.property ?? "bien"}`);
}

function getContractKey(contract) {
  return contract?.number ?? normalizeSearch(`${contract?.property ?? "bien"}-${contract?.client ?? "client"}`);
}

function getProspectObjective(prospect) {
  return prospect?.objective ?? (prospect?.need?.includes("Bureau") ? "Location pro" : "Location");
}

function getProspectDelay(prospect) {
  return prospect?.delay ?? "30 jours";
}

function getCompatibleProperties(prospect, filters = {}) {
  const prospectNeed = normalizeSearch(prospect?.propertyType ?? prospect?.need ?? "");
  const prospectDistrict = normalizeSearch(prospect?.district ?? "");
  const firstNeedWord = prospectNeed.split(" ")[0] ?? "";
  const firstDistrictWord = prospectDistrict.split(/[ /]+/)[0] ?? "";
  const filterDistrict = normalizeSearch(filters.district ?? "");
  const filterType = normalizeSearch(filters.type ?? "");
  const filterStatus = filters.status ?? "";
  const budgetLimit = parseFCFA(filters.budget ?? "");

  return Array.from(
    new Map(
      properties
        .filter((property) => {
          const haystack = normalizeSearch(`${property.type} ${property.name} ${property.district} ${property.address}`);
          const matchesProspect =
            (firstNeedWord && haystack.includes(firstNeedWord)) ||
            (firstDistrictWord && haystack.includes(firstDistrictWord)) ||
            property.status === "Disponible";
          const matchesDistrict = !filterDistrict || haystack.includes(filterDistrict);
          const matchesType = !filterType || haystack.includes(filterType);
          const matchesStatus = !filterStatus || filterStatus === "Tous" || property.status === filterStatus;
          const matchesBudget = !budgetLimit || parseFCFA(property.price) <= budgetLimit;
          return matchesProspect && matchesDistrict && matchesType && matchesStatus && matchesBudget;
        })
        .concat(properties.filter((property) => property.status === "Disponible"))
        .map((property) => [property.code, property])
    ).values()
  ).slice(0, 8);
}

function getDefaultProspectProposals(prospect) {
  return getCompatibleProperties(prospect)
    .slice(0, 2)
    .map((property) => ({
      code: property.code,
      name: property.name,
      status: property.status,
      return: property.status === "Disponible" ? "À présenter" : "À confirmer",
      proposedAt: "Historique initial",
    }));
}

function getDefaultProspectTimeline(prospect) {
  return [
    { title: "Appel de qualification", text: prospect?.next ?? "Besoin qualifié", date: "28/05/2026" },
    { title: "Commentaire", text: prospect?.comment ?? `Besoin suivi par ${prospect?.agent ?? "l'agence"}`, date: "28/05/2026" },
    { title: "Proposition envoyée", text: "Première sélection de biens préparée", date: "29/05/2026" },
    { title: "Changement de statut", text: prospect?.status ?? "Nouveau", date: "29/05/2026" },
  ];
}

function nodeToText(node) {
  if (node === null || node === undefined || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(nodeToText).join(" ");
  return nodeToText(node.props?.children);
}

function rowToSearchText(row) {
  return normalizeSearch(row.map(nodeToText).join(" "));
}

function parseVisitDate(date) {
  if (!date) return null;
  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    const [year, month, day] = date.split("-").map(Number);
    return new Date(year, month - 1, day);
  }
  const parts = date.split("/");
  if (parts.length === 3) {
    const [day, month, year] = parts.map(Number);
    return new Date(year, month - 1, day);
  }
  return null;
}

function toInputDate(value) {
  const date = parseVisitDate(value);
  if (!date) return "2026-06-20";
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function visitMatchesPeriod(visit, period) {
  if (period === "Toutes périodes") return true;
  const date = parseVisitDate(visit.date);
  if (!date) return false;
  const reference = new Date(2026, 5, 20);
  const startOfWeek = new Date(reference);
  startOfWeek.setDate(reference.getDate() - reference.getDay() + 1);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  if (period === "Aujourd'hui") return date.toDateString() === reference.toDateString();
  if (period === "Cette semaine") return date >= startOfWeek && date <= endOfWeek;
  if (period === "Ce mois") return date.getMonth() === reference.getMonth() && date.getFullYear() === reference.getFullYear();
  if (period === "Mois prochain") return date.getMonth() === reference.getMonth() + 1 && date.getFullYear() === reference.getFullYear();
  return true;
}

function visitMatchesQuickFilter(visit, quickFilter) {
  if (quickFilter === "Toutes visites") return true;
  if (quickFilter === "Visites du jour") return visitMatchesPeriod(visit, "Aujourd'hui");
  if (quickFilter === "Visites reportées") return normalizeSearch(visit.status).includes("report");
  if (quickFilter === "Visites annulées") return normalizeSearch(visit.status).includes("annul");
  if (quickFilter === "Visites conclues") return ["client interesse", "conclu", "realisee"].some((status) => normalizeSearch(visit.status).includes(status));
  return true;
}

function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [showLogin, setShowLogin] = useState(false);
  const [modal, setModal] = useState(null);
  const [demoActive, setDemoActive] = useState(false);
  const [demoIndex, setDemoIndex] = useState(0);
  const [demoRect, setDemoRect] = useState(null);
  const [globalQuery, setGlobalQuery] = useState("");
  const [selectedProperty, setSelectedProperty] = useState(properties[0]);
  const [propertyView, setPropertyView] = useState("list");
  const [propertyDisplay, setPropertyDisplay] = useState("cartes");
  const [propertyTab, setPropertyTab] = useState("Résumé");
  const [propertyOverrides, setPropertyOverrides] = useState({});
  const [clientTab, setClientTab] = useState("Propriétaires");
  const [selectedOwner, setSelectedOwner] = useState(owners[0]);
  const [createdOwners, setCreatedOwners] = useState([]);
  const [ownerOverrides, setOwnerOverrides] = useState({});
  const [ownerActionContext, setOwnerActionContext] = useState(null);
  const [ownerReversements, setOwnerReversements] = useState([]);
  const [selectedTenant, setSelectedTenant] = useState(tenants[0]);
  const [tenantOverrides, setTenantOverrides] = useState({});
  const [tenantActionContext, setTenantActionContext] = useState(null);
  const [tenantRelances, setTenantRelances] = useState([]);
  const [tenantReceiptArchives, setTenantReceiptArchives] = useState([]);
  const [createdProspects, setCreatedProspects] = useState([]);
  const [prospectOverrides, setProspectOverrides] = useState({});
  const [prospectProposals, setProspectProposals] = useState({});
  const [prospectActivities, setProspectActivities] = useState({});
  const [scheduledProspectVisits, setScheduledProspectVisits] = useState([]);
  const [prospectConversions, setProspectConversions] = useState({});
  const [prospectActionContext, setProspectActionContext] = useState(null);
  const [prospectProposalContext, setProspectProposalContext] = useState(null);
  const [visitOverrides, setVisitOverrides] = useState({});
  const [visitHistories, setVisitHistories] = useState({});
  const [visitActionContext, setVisitActionContext] = useState(null);
  const [contractTab, setContractTab] = useState("Contrats");
  const [generatedContracts, setGeneratedContracts] = useState([]);
  const [contractOverrides, setContractOverrides] = useState({});
  const [contractTimelines, setContractTimelines] = useState({});
  const [contractDeadlines, setContractDeadlines] = useState({});
  const [contractActionContext, setContractActionContext] = useState(null);
  const [clientDetailRequest, setClientDetailRequest] = useState(null);
  const [recordedPayments, setRecordedPayments] = useState([]);
  const [paymentContext, setPaymentContext] = useState(null);
  const [receiptPreviewValues, setReceiptPreviewValues] = useState(null);
  const [scheduledMaintenances, setScheduledMaintenances] = useState([]);
  const [maintenanceCharges, setMaintenanceCharges] = useState([]);
  const [maintenanceContext, setMaintenanceContext] = useState(null);
  const [propertyHistoryOverrides, setPropertyHistoryOverrides] = useState({});
  const [documentContext, setDocumentContext] = useState(null);
  const [documentDraft, setDocumentDraft] = useState(null);
  const [propertyOwnerPrefill, setPropertyOwnerPrefill] = useState("");
  const [propertyPdfContext, setPropertyPdfContext] = useState(null);
  const [propertyPdfArchives, setPropertyPdfArchives] = useState([]);
  const [archiveContext, setArchiveContext] = useState(null);
  const [archivedProperties, setArchivedProperties] = useState({});
  const [financeTab, setFinanceTab] = useState("Loyers");
  const [adminTab, setAdminTab] = useState("Utilisateurs");
  const [reportType, setReportType] = useState(reports[0][0]);
  const demoStep = demoSteps[demoIndex];
  const allContracts = useMemo(() => {
    const applyOverride = (contract) => ({ ...contract, ...(contractOverrides[getContractKey(contract)] ?? {}) });
    return [...generatedContracts.map(applyOverride), ...contracts.map(applyOverride)];
  }, [generatedContracts, contractOverrides]);
  const allPayments = useMemo(() => mergePaymentRecords(paymentRecords, recordedPayments), [recordedPayments]);
  const allRentRows = useMemo(() => mergeRentRowsWithPayments(rentRows, recordedPayments), [recordedPayments]);
  const allMaintenances = useMemo(() => [...scheduledMaintenances, ...maintenances], [scheduledMaintenances]);
  const allCharges = useMemo(() => [...maintenanceCharges, ...charges], [maintenanceCharges]);
  const allOwners = useMemo(() => {
    const applyOverride = (owner) => ({ ...owner, ...(ownerOverrides[owner.id] ?? {}) });
    return [...createdOwners.map(applyOverride), ...owners.map(applyOverride)];
  }, [createdOwners, ownerOverrides]);
  const allTenants = useMemo(
    () => tenants.map((tenant) => ({ ...tenant, ...(tenantOverrides[tenant.id] ?? {}) })),
    [tenantOverrides]
  );
  const allProspects = useMemo(() => {
    const applyOverride = (prospect) => ({ ...prospect, ...(prospectOverrides[getProspectKey(prospect)] ?? {}) });
    return [...createdProspects.map(applyOverride), ...prospects.map(applyOverride)];
  }, [createdProspects, prospectOverrides]);
  const allVisits = useMemo(() => {
    const applyOverride = (visit) => ({ ...visit, ...(visitOverrides[getVisitKey(visit)] ?? {}) });
    return [...scheduledProspectVisits.map(applyOverride), ...visits.map(applyOverride)];
  }, [scheduledProspectVisits, visitOverrides]);
  const topbarNotifications = useMemo(() => {
    const visitNotifications = allVisits
      .filter((visit) => visit.notifyReminder && visitMatchesPeriod(visit, "Aujourd'hui"))
      .map((visit, index) => ({
        id: `scheduled-visit-${visit.id ?? index}`,
        title: "Visite du jour",
        detail: `${visit.client} - ${visit.property} a ${visit.time}`,
        meta: visit.agent,
        tone: "info",
        page: "Clients",
      }));

    return [...notificationAlerts, ...visitNotifications];
  }, [allVisits]);
  const allReversals = useMemo(() => [...ownerReversements, ...reversals], [ownerReversements]);
  const propertiesWithArchiveState = useMemo(() => properties.map((property) => {
    const propertyWithOverride = { ...property, ...(propertyOverrides[property.code] ?? {}) };
    const archive = archivedProperties[property.code];
    if (!archive) return propertyWithOverride;
    return {
      ...propertyWithOverride,
      status: "Archivé",
      archived: true,
      archiveReason: archive.reason,
      archiveDate: archive.date,
      lastAction: `Archivé : ${archive.reason}`,
    };
  }), [archivedProperties, propertyOverrides]);
  const activeProperties = useMemo(
    () => propertiesWithArchiveState.filter((property) => !property.archived),
    [propertiesWithArchiveState]
  );

  const openAction = (label, context = {}) => {
    const normalizedAction = normalizeSearch(label);

    if (normalizedAction === "nouveau proprietaire") {
      setClientTab("Propriétaires");
      setModal("Nouveau propriétaire");
      return;
    }

    if (normalizedAction === "nouveau prospect") {
      setClientTab("Prospects");
      setActivePage("Clients");
      setModal("Nouveau prospect");
      return;
    }

    if (normalizedAction === "proposer un bien") {
      setProspectProposalContext(context.prospect ?? prospectProposalContext ?? prospects[0]);
      setModal("Proposer un bien prospect");
      return;
    }

    if (normalizedAction === "planifier visite" || normalizedAction === "planifier une visite") {
      setProspectActionContext({
        prospect: context.prospect ?? null,
        proposal: context.proposal ?? null,
        property: context.property ?? selectedProperty,
      });
      setModal("Planifier visite prospect");
      return;
    }

    if (normalizedAction === "ouvrir fiche bien prospect" && context.property) {
      showPropertyDetail(context.property);
      return;
    }

    if (normalizedAction === "retirer proposition prospect" && context.prospect && context.proposal) {
      handleProspectProposalRemoval(context.prospect, context.proposal);
      return;
    }

    if (normalizedAction === "marquer proposition interessee" && context.prospect && context.proposal) {
      handleProspectProposalInterest(context.prospect, context.proposal);
      return;
    }

    if ([
      "modifier besoin prospect",
      "prochaine action prospect",
      "planifier visite prospect",
      "ajouter commentaire prospect",
      "changer statut prospect",
      "convertir prospect",
    ].includes(normalizedAction)) {
      setProspectActionContext({
        prospect: context.prospect ?? prospectProposalContext ?? prospects[0],
        proposal: context.proposal ?? null,
        property: context.property ?? null,
      });
      setModal(label);
      return;
    }

    if ([
      "modifier date visite",
      "changer agent visite",
      "annuler visite",
      "marquer visite realisee",
      "retour client visite",
      "creer relance visite",
      "reporter visite",
    ].includes(normalizedAction)) {
      setVisitActionContext({ visit: context.visit ?? allVisits[0] ?? visits[0] });
      setModal(label);
      return;
    }

    if (normalizedAction === "marquer client interesse visite" && context.visit) {
      handleVisitQuickAction(context.visit, "interesse");
      return;
    }

    if (normalizedAction === "marquer sans suite visite" && context.visit) {
      handleVisitQuickAction(context.visit, "sans-suite");
      return;
    }

    if (normalizedAction === "proposer autre bien visite" && context.visit) {
      const prospect = allProspects.find((item) => item.name === context.visit.client) ?? allProspects[0];
      setProspectProposalContext(prospect);
      setModal("Proposer un bien prospect");
      return;
    }

    if (normalizedAction === "creer contrat visite" && context.visit) {
      const property = properties.find((item) => item.name === context.visit.property) ?? selectedProperty;
      setSelectedProperty(property);
      setModal("Créer contrat");
      return;
    }

    if (normalizedAction === "convertir prospect visite" && context.visit) {
      const prospect = allProspects.find((item) => item.name === context.visit.client) ?? allProspects[0];
      setProspectActionContext({ prospect, proposal: null, property: properties.find((item) => item.name === context.visit.property) ?? null });
      setModal("Convertir prospect");
      return;
    }

    if (normalizedAction === "ouvrir bien contrat" && context.contract) {
      const property = propertiesWithArchiveState.find((item) => item.name === context.contract.property) ?? properties.find((item) => item.name === context.contract.property);
      if (property) showPropertyDetail(property);
      return;
    }

    if (normalizedAction === "ouvrir proprietaire contrat" && context.contract) {
      const owner = allOwners.find((item) => item.name === context.contract.owner) ?? owners.find((item) => item.name === context.contract.owner);
      if (owner) {
        setSelectedOwner(owner);
        setClientTab("Propriétaires");
        setClientDetailRequest({ type: "owner", key: owner.id, nonce: Date.now() });
        setActivePage("Clients");
      }
      return;
    }

    if (normalizedAction === "ouvrir locataire contrat" && context.contract) {
      const tenant = allTenants.find((item) => item.name === context.contract.client) ?? tenants.find((item) => item.name === context.contract.client);
      if (tenant) {
        setSelectedTenant(tenant);
        setClientTab("Locataires");
        setClientDetailRequest({ type: "tenant", key: tenant.id, nonce: Date.now() });
        setActivePage("Clients");
      }
      return;
    }

    if ([
      "document signe contrat",
      "actions echeance contrat",
      "gerer echeances contrat",
      "modifier contrat",
      "renouveler contrat",
      "resilier contrat",
    ].includes(normalizedAction)) {
      setContractActionContext({ contract: context.contract ?? allContracts[0] ?? contracts[0] });
      setModal(label);
      return;
    }

    if (normalizedAction === "telecharger contrat" && context.contract) {
      handleContractDocumentAction(context.contract, "Document telecharge", "PDF du contrat ouvert pour telechargement.");
      return;
    }

    if (normalizedAction === "imprimer contrat" && context.contract) {
      handleContractDocumentAction(context.contract, "Document imprime", "Impression du contrat lancee.");
      return;
    }

    if (normalizedAction === "joindre contrat signe" && context.contract) {
      handleContractDocumentAction(context.contract, "Signature ajoutee", "Document signe joint au dossier.");
      return;
    }

    if (normalizedAction === "archiver contrat" && context.contract) {
      handleContractStatusAction(context.contract, "Archive", "Contrat archive avec historique conserve.");
      return;
    }

    if (normalizedAction === "modifier proprietaire" && context.owner) {
      setOwnerActionContext({ owner: context.owner, activeOwnerTab: context.activeOwnerTab ?? "Résumé" });
      setModal("Modifier propriétaire");
      return;
    }

    if ((normalizedAction === "ajouter un bien proprietaire" || (normalizedAction === "ajouter un bien" && context.owner)) && context.owner) {
      setOwnerActionContext({ owner: context.owner, activeOwnerTab: context.activeOwnerTab ?? "Biens" });
      setPropertyOwnerPrefill(context.owner.name);
      setModal("Ajouter un bien");
      return;
    }

    if ((normalizedAction === "generer situation proprietaire" || normalizedAction === "situation proprietaire") && context.owner) {
      setOwnerActionContext({ owner: context.owner, activeOwnerTab: context.activeOwnerTab ?? "Situation financière" });
      setModal("Situation propriétaire");
      return;
    }

    if (normalizedAction === "enregistrer reversement" && context.owner) {
      setOwnerActionContext({ owner: context.owner, activeOwnerTab: context.activeOwnerTab ?? "Reversements" });
      setModal("Enregistrer reversement propriétaire");
      return;
    }

    if ((normalizedAction === "imprimer proprietaire" || normalizedAction === "exporter pdf proprietaire") && context.owner) {
      setOwnerActionContext({
        owner: context.owner,
        activeOwnerTab: context.activeOwnerTab ?? "Résumé",
        output: normalizedAction === "exporter pdf proprietaire" ? "Export PDF" : "Impression",
      });
      setModal(normalizedAction === "exporter pdf proprietaire" ? "Export PDF propriétaire" : "Imprimer propriétaire");
      return;
    }

    if (normalizedAction === "modifier locataire") {
      setTenantActionContext({ tenant: context.tenant ?? selectedTenant, property: context.property, contract: context.contract, activeTenantTab: context.activeTenantTab ?? "Résumé" });
      setModal("Modifier locataire");
      return;
    }

    if (normalizedAction === "enregistrer paiement locataire") {
      setTenantActionContext({ tenant: context.tenant ?? selectedTenant, property: context.property, contract: context.contract, row: context.row, payment: context.payment, activeTenantTab: context.activeTenantTab ?? "Paiements" });
      setModal("Paiement locataire");
      return;
    }

    if (normalizedAction === "generer recu locataire") {
      setTenantActionContext({ tenant: context.tenant ?? selectedTenant, property: context.property, contract: context.contract, row: context.row, payment: context.payment, activeTenantTab: context.activeTenantTab ?? "Documents" });
      setModal("Reçu locataire");
      return;
    }

    if (normalizedAction === "ajouter relance") {
      setTenantActionContext({ tenant: context.tenant ?? selectedTenant, property: context.property, contract: context.contract, row: context.row, activeTenantTab: context.activeTenantTab ?? "Impayés & relances" });
      setModal("Relance locataire");
      return;
    }

    if (normalizedAction === "contrat locataire") {
      setTenantActionContext({ tenant: context.tenant ?? selectedTenant, property: context.property, contract: context.contract, activeTenantTab: context.activeTenantTab ?? "Contrat" });
      setModal("Contrat locataire");
      return;
    }

    if (normalizedAction === "situation locataire") {
      setTenantActionContext({ tenant: context.tenant ?? selectedTenant, property: context.property, contract: context.contract, row: context.row, activeTenantTab: context.activeTenantTab ?? "Résumé" });
      setModal("Situation locataire");
      return;
    }

    if (shouldOpenPaymentModal(label)) {
      const tenantFromLabel = normalizedAction.startsWith("paiement ")
        ? label.replace(/^paiement\s+/i, "").trim()
        : "";
      const rowFromLabel = tenantFromLabel
        ? allRentRows.find((row) => normalizeSearch(row.tenant) === normalizeSearch(tenantFromLabel))
        : null;

      setPaymentContext({
        property: context.property ?? (context.row || rowFromLabel ? properties.find((property) => property.name === (context.row ?? rowFromLabel).property) : selectedProperty),
        row: context.row ?? rowFromLabel ?? null,
        payment: context.payment ?? null,
      });
      setModal("Enregistrer paiement");
      return;
    }

    if (shouldOpenMaintenanceModal(label)) {
      setMaintenanceContext({
        property: context.property ?? selectedProperty,
        maintenance: context.maintenance ?? null,
      });
      setModal("Ajouter entretien");
      return;
    }

    if (normalizedAction === "generer document") {
      setDocumentContext({ property: context.property ?? selectedProperty });
      setModal("Choisir document");
      return;
    }

    if (normalizedAction === "fiche bien pdf") {
      setPropertyPdfContext(context.property ?? selectedProperty);
      setModal("Fiche PDF");
      return;
    }

    if (normalizedAction === "archiver le bien") {
      setArchiveContext(context.property ?? selectedProperty);
      setModal("Archiver bien");
      return;
    }

    setModal(label);
  };

  const startDemo = () => {
    setDemoIndex(0);
    setDemoActive(true);
  };

  const stopDemo = () => {
    setDemoActive(false);
    setDemoRect(null);
  };

  const previousDemoStep = () => {
    setDemoIndex((index) => Math.max(index - 1, 0));
  };

  const nextDemoStep = () => {
    setDemoIndex((index) => {
      if (index >= demoSteps.length - 1) {
        setDemoActive(false);
        setDemoRect(null);
        return index;
      }
      return index + 1;
    });
  };

  const handleNav = (item) => {
    setActivePage(item);
    if (item === "Biens") {
      setPropertyView("list");
    }
  };

  const showPropertyDetail = (property) => {
    setSelectedProperty(propertiesWithArchiveState.find((item) => item.code === property.code) ?? property);
    setPropertyView("detail");
    setActivePage("Biens");
  };

  const handleOwnerSave = ({ owner, addProperty = false }) => {
    const isBaseOwner = owners.some((item) => item.id === owner.id);

    setCreatedOwners((current) => {
      const existingIndex = current.findIndex((item) => item.id === owner.id);
      if (existingIndex >= 0) {
        return current.map((item, index) => (index === existingIndex ? owner : item));
      }
      if (isBaseOwner) return current;
      return [owner, ...current];
    });

    if (isBaseOwner) {
      setOwnerOverrides((current) => ({ ...current, [owner.id]: owner }));
    }

    setSelectedOwner(owner);
    setClientTab("Propriétaires");
    setActivePage("Clients");

    if (addProperty) {
      setPropertyOwnerPrefill(owner.name);
      setModal("Ajouter un bien");
      return;
    }

    setModal(null);
    setOwnerActionContext(null);
  };

  const handleOwnerReversementSave = ({ reversement, owner, generateStatement = false }) => {
    setOwnerReversements((current) => [
      reversement,
      ...current.filter((item) => item.reference !== reversement.reference),
    ]);

    setOwnerOverrides((current) => ({
      ...current,
      [owner.id]: {
        ...(current[owner.id] ?? {}),
        balance: reversement.balance,
        lastPayment: reversement.date,
      },
    }));

    const updatedOwner = {
      ...owner,
      balance: reversement.balance,
      lastPayment: reversement.date,
    };

    setSelectedOwner((current) => (current.id === owner.id ? { ...current, ...updatedOwner } : current));
    setClientTab("Propriétaires");
    setActivePage("Clients");

    if (generateStatement) {
      setOwnerActionContext({ owner: updatedOwner, activeOwnerTab: "Situation financière" });
      setModal("Situation propriétaire");
      return;
    }

    setModal(null);
    setOwnerActionContext(null);
  };

  const handleTenantSave = ({ tenant }) => {
    setTenantOverrides((current) => ({
      ...current,
      [tenant.id]: tenant,
    }));
    setSelectedTenant(tenant);
    setClientTab("Locataires");
    setActivePage("Clients");
    setModal(null);
    setTenantActionContext(null);
  };

  const handleProspectSave = ({ prospect, proposeProperty = false }) => {
    setCreatedProspects((current) => [
      prospect,
      ...current.filter((item) => item.id !== prospect.id),
    ]);
    setClientTab("Prospects");
    setActivePage("Clients");

    if (proposeProperty) {
      setProspectProposalContext(prospect);
      setModal("Proposer un bien prospect");
      return;
    }

    setModal(null);
  };

  const addProspectActivity = (prospect, activity) => {
    const key = getProspectKey(prospect);
    setProspectActivities((current) => ({
      ...current,
      [key]: [
        { date: "19/06/2026", ...activity },
        ...(current[key] ?? []),
      ],
    }));
  };

  const updateProspect = (prospect, patch, activity) => {
    const key = getProspectKey(prospect);
    setProspectOverrides((current) => ({
      ...current,
      [key]: {
        ...(current[key] ?? {}),
        ...patch,
      },
    }));
    if (activity) {
      addProspectActivity({ ...prospect, ...patch }, activity);
    }
  };

  const handleProspectNeedSave = ({ prospect, values }) => {
    const patch = {
      need: values.propertyType,
      propertyType: values.propertyType,
      district: values.districts,
      budget: values.budget,
      objective: values.objective,
      delay: values.delay,
      requirements: values.requirements,
      comment: values.comment,
    };
    updateProspect(prospect, patch, {
      title: "Besoin mis à jour",
      text: `${values.propertyType} · ${values.districts} · ${values.budget}`,
    });
    setModal(null);
    setProspectActionContext(null);
  };

  const handleProspectProposalSave = ({ prospect, properties: selectedProperties, comment }) => {
    const key = getProspectKey(prospect);
    const proposedItems = selectedProperties.map((property) => ({
      code: property.code,
      name: property.name,
      status: property.status,
      return: comment || "Proposition envoyée",
      proposedAt: "19/06/2026",
    }));

    setProspectProposals((current) => {
      const existing = current[key] ?? getDefaultProspectProposals(prospect);
      const byCode = new Map(existing.map((item) => [item.code, item]));
      proposedItems.forEach((item) => byCode.set(item.code, item));
      return { ...current, [key]: Array.from(byCode.values()) };
    });

    updateProspect(prospect, {
      status: prospect.status === "Nouveau" ? "Contacté" : prospect.status,
      next: "Relance proposition",
    }, {
      title: "Proposition envoyée",
      text: `${proposedItems.length} bien${proposedItems.length > 1 ? "s" : ""} proposé${proposedItems.length > 1 ? "s" : ""} · ${comment || "Sans commentaire"}`,
    });
    setModal(null);
    setProspectProposalContext(null);
  };

  const handleProspectProposalRemoval = (prospect, proposal) => {
    const key = getProspectKey(prospect);
    setProspectProposals((current) => ({
      ...current,
      [key]: (current[key] ?? getDefaultProspectProposals(prospect)).filter((item) => item.code !== proposal.code),
    }));
    addProspectActivity(prospect, {
      title: "Proposition retirée",
      text: proposal.name,
    });
  };

  const handleProspectProposalInterest = (prospect, proposal) => {
    const key = getProspectKey(prospect);
    setProspectProposals((current) => ({
      ...current,
      [key]: (current[key] ?? getDefaultProspectProposals(prospect)).map((item) => (
        item.code === proposal.code ? { ...item, return: "Intéressé" } : item
      )),
    }));
    updateProspect(prospect, { status: "Intéressé", next: "Planifier visite" }, {
      title: "Prospect intéressé",
      text: proposal.name,
    });
  };

  const handleProspectNextActionSave = ({ prospect, values }) => {
    updateProspect(prospect, {
      next: `${values.type} · ${values.date}`,
      agent: values.responsible,
    }, {
      title: "Prochaine action planifiée",
      text: `${values.type} le ${values.date} · ${values.comment}`,
    });
    setModal(null);
    setProspectActionContext(null);
  };

  const handleProspectVisitSave = ({ prospect, visit }) => {
    const selectedVisitProperty = properties.find((item) => item.name === visit.property) ?? selectedProperty;
    const existingProspect = allProspects.find((item) => item.name === visit.prospectName);
    const prospectName = (visit.clientMode === "new" ? visit.newProspectName : visit.prospectName) || prospect?.name || "Nouveau prospect";
    const targetProspect = existingProspect ?? prospect ?? {
      id: `PRS-2026-${String(prospects.length + createdProspects.length + 1).padStart(3, "0")}`,
      name: prospectName,
      initials: getInitials(prospectName),
      phone: visit.phone,
      need: visit.need,
      district: selectedVisitProperty.district,
      budget: selectedVisitProperty.price,
      status: "Visite prévue",
      agent: visit.agent,
      next: visit.nextAction,
    };
    const nextVisit = {
      id: `VIS-2026-${String(visits.length + scheduledProspectVisits.length + 1).padStart(3, "0")}`,
      client: prospectName,
      phone: visit.phone,
      need: visit.need,
      property: selectedVisitProperty.name,
      propertyCode: selectedVisitProperty.code,
      address: selectedVisitProperty.address,
      owner: selectedVisitProperty.owner,
      district: selectedVisitProperty.district,
      date: visit.date,
      time: visit.time,
      agent: visit.agent,
      status: "Prévue",
      feedback: visit.internalComment || "Retour à renseigner après visite",
      next: visit.nextAction,
      meetingPlace: visit.meetingPlace,
      priority: visit.priority,
      notifyReminder: visit.notifyReminder === "Oui",
    };

    if (visit.clientMode === "new" && !existingProspect) {
      setCreatedProspects((current) => [targetProspect, ...current]);
    }

    setScheduledProspectVisits((current) => [nextVisit, ...current]);
    setPropertyHistoryOverrides((current) => ({
      ...current,
      [selectedVisitProperty.name]: [
        ["Visite planifiée", `${prospectName} - ${visit.date} ${visit.time} - ${visit.agent}`, "20/06/2026"],
        ...(current[selectedVisitProperty.name] ?? []),
      ],
    }));
    updateProspect(targetProspect, { status: "Visite prévue", next: visit.nextAction, phone: visit.phone, need: visit.need, agent: visit.agent }, {
      title: "Visite planifiée",
      text: `${selectedVisitProperty.name} - ${visit.date} ${visit.time}`,
    });
    setClientTab("Visites");
    setActivePage("Clients");
    setModal(null);
    setProspectActionContext(null);
  };

  const addVisitHistory = (visit, entry) => {
    const key = getVisitKey(visit);
    setVisitHistories((current) => ({
      ...current,
      [key]: [
        { date: "20/06/2026", ...entry },
        ...(current[key] ?? []),
      ],
    }));
  };

  const updateVisit = (visit, patch, history) => {
    const key = getVisitKey(visit);
    const nextVisit = { ...visit, ...patch };
    const property = properties.find((item) => item.name === nextVisit.property);

    setVisitOverrides((current) => ({
      ...current,
      [key]: {
        ...(current[key] ?? {}),
        ...patch,
      },
    }));

    if (history) {
      addVisitHistory(visit, history);
      if (property) {
        setPropertyHistoryOverrides((current) => ({
          ...current,
          [property.name]: [
            [history.title, `${nextVisit.client} - ${history.text}`, "20/06/2026"],
            ...(current[property.name] ?? []),
          ],
        }));
      }
    }

    return nextVisit;
  };

  const updateProspectFromVisit = (visit, patch, activity) => {
    const prospect = allProspects.find((item) => item.name === visit.client);
    if (prospect) {
      updateProspect(prospect, patch, activity);
    }
  };

  const closeVisitModal = () => {
    setModal(null);
    setVisitActionContext(null);
  };

  const handleVisitDateSave = ({ visit, values, report = false }) => {
    const statusPatch = report ? { status: "Reportée" } : {};
    updateVisit(visit, {
      date: values.newDate,
      time: values.newTime,
      notifyReminder: values.notify === "Oui",
      next: report ? "Confirmer nouvelle date" : visit.next,
      ...statusPatch,
    }, {
      title: report ? "Visite reportée" : "Date modifiée",
      text: `${values.newDate} ${values.newTime} - ${values.reason}`,
    });
    closeVisitModal();
  };

  const handleVisitAgentSave = ({ visit, values }) => {
    updateVisit(visit, { agent: values.newAgent }, {
      title: "Agent modifié",
      text: `${visit.agent} vers ${values.newAgent} - ${values.reason}`,
    });
    closeVisitModal();
  };

  const handleVisitCancelSave = ({ visit, values }) => {
    updateVisit(visit, {
      status: "Annulée",
      feedback: values.comment || values.reason,
      next: "Reprendre contact",
      notifyReminder: values.notify === "Oui",
      cancelReason: values.reason,
    }, {
      title: "Visite annulée",
      text: `${values.reason} - ${values.comment}`,
    });
    updateProspectFromVisit(visit, { status: "Contacté", next: "Replanifier visite" }, {
      title: "Visite annulée",
      text: values.reason,
    });
    closeVisitModal();
  };

  const handleVisitCloseSave = ({ visit, values, changeProspect = false }) => {
    const nextStatus = values.interest === "Fort" ? "Client intéressé" : "Réalisée";
    updateVisit(visit, {
      status: nextStatus,
      realizedAt: values.realizedAt,
      clientPresent: values.clientPresent,
      feedback: values.feedback,
      interest: values.interest,
      next: values.nextAction,
      closureComment: values.comment,
    }, {
      title: "Visite réalisée",
      text: `${values.realizedAt} - intérêt ${values.interest}`,
    });

    if (changeProspect) {
      updateProspectFromVisit(visit, {
        status: values.interest === "Faible" ? "Contacté" : "Intéressé",
        next: values.nextAction,
      }, {
        title: "Statut prospect mis à jour",
        text: `${values.interest} - ${values.nextAction}`,
      });
    }

    closeVisitModal();
  };

  const handleVisitFeedbackSave = ({ visit, values }) => {
    updateVisit(visit, {
      feedback: values.feedback,
      positivePoints: values.positivePoints,
      negativePoints: values.negativePoints,
      interest: values.interest,
      decision: values.decision,
      closureComment: values.comment,
      next: values.decision,
    }, {
      title: "Retour client ajouté",
      text: `${values.interest} - ${values.decision}`,
    });
    closeVisitModal();
  };

  const handleVisitReminderSave = ({ visit, values }) => {
    updateVisit(visit, {
      next: `${values.channel} - ${values.nextDate}`,
      lastReminderChannel: values.channel,
      reminderComment: values.message,
      reminderOwner: values.responsible,
    }, {
      title: "Relance planifiée",
      text: `${values.channel} - ${values.nextDate}`,
    });
    closeVisitModal();
  };

  const handleVisitQuickAction = (visit, action) => {
    if (action === "interesse") {
      updateVisit(visit, { status: "Client intéressé", next: "Créer contrat" }, {
        title: "Client intéressé",
        text: "Action rapide depuis la fiche visite",
      });
      updateProspectFromVisit(visit, { status: "Intéressé", next: "Créer contrat" }, {
        title: "Client intéressé",
        text: visit.property,
      });
      return;
    }

    updateVisit(visit, { status: "Sans suite", next: "Dossier classé" }, {
      title: "Visite sans suite",
      text: "Action rapide depuis la fiche visite",
    });
    updateProspectFromVisit(visit, { status: "Perdu", next: "Sans suite" }, {
      title: "Sans suite",
      text: visit.property,
    });
  };

  const handleProspectCommentSave = ({ prospect, values }) => {
    addProspectActivity(prospect, {
      title: values.type,
      text: values.comment,
    });
    setModal(null);
    setProspectActionContext(null);
  };

  const handleProspectStatusSave = ({ prospect, status, reason }) => {
    updateProspect(prospect, {
      status,
      next: status === "Perdu" ? reason : prospect.next,
      lostReason: status === "Perdu" ? reason : "",
    }, {
      title: "Changement de statut",
      text: status === "Perdu" ? `${status} · ${reason}` : status,
    });
    setModal(null);
    setProspectActionContext(null);
  };

  const handleProspectConversionSave = ({ prospect, values }) => {
    const conversion = {
      ...values,
      date: "19/06/2026",
    };
    const key = getProspectKey(prospect);
    setProspectConversions((current) => ({ ...current, [key]: conversion }));
    updateProspect(prospect, { status: "Conclu", next: values.createContract === "Oui" ? "Créer contrat" : "Dossier converti" }, {
      title: "Prospect converti",
      text: `${values.conversionType} · ${values.property}`,
    });

    if (values.createContract === "Oui") {
      const property = properties.find((item) => item.name === values.property) ?? selectedProperty;
      setSelectedProperty(property);
      setModal("Créer contrat");
      setProspectActionContext(null);
      return;
    }

    setModal(null);
    setProspectActionContext(null);
  };

  const handleTenantRelanceSave = ({ relance, tenant }) => {
    setTenantRelances((current) => [
      relance,
      ...current.filter((item) => item.reference !== relance.reference),
    ]);
    setTenantOverrides((current) => ({
      ...current,
      [tenant.id]: {
        ...(current[tenant.id] ?? {}),
        paymentStatus: relance.amount && parseFCFA(relance.amount) > 0 ? "Relancé" : tenant.paymentStatus,
        nextReminder: relance.nextDate,
        lastReminder: relance.channel,
      },
    }));
    setSelectedTenant((current) => (current.id === tenant.id ? {
      ...current,
      paymentStatus: relance.amount && parseFCFA(relance.amount) > 0 ? "Relancé" : current.paymentStatus,
      nextReminder: relance.nextDate,
      lastReminder: relance.channel,
    } : current));
    setClientTab("Locataires");
    setActivePage("Clients");
    setModal(null);
    setTenantActionContext(null);
  };

  const handleTenantReceiptArchive = ({ tenant, receipt }) => {
    setTenantReceiptArchives((current) => [
      { ...receipt, tenantId: tenant.id, tenant: tenant.name, archivedAt: "19/06/2026" },
      ...current.filter((item) => item.numero !== receipt.numero),
    ]);
  };

  const handleTenantAttachment = ({ tenantName, tenantProfile, rent, deposit, entryDate, createContract }) => {
    setSelectedProperty((current) => ({
      ...current,
      tenant: tenantName,
      status: "Loué",
      price: rent || current.price,
      deposit: deposit || current.deposit,
      attachedTenant: {
        ...tenantProfile,
        name: tenantName,
        rent: rent || tenantProfile.rent || current.price,
        deposit: deposit || tenantProfile.deposit || current.deposit,
        entryDate,
        contract: createContract ? "À créer maintenant" : "À créer",
        paymentStatus: tenantProfile.paymentStatus ?? "À jour",
      },
      history: [
        ...(current.history ?? []),
        ["Locataire rattaché", `${tenantName} rattaché au bien. Statut passé à Loué.`, "18/06/2026"],
      ],
      lastAction: `Locataire ${tenantName} rattaché`,
    }));
    setPropertyTab("Locataire");
    setPropertyView("detail");
    setActivePage("Biens");
    setModal(createContract ? "Créer contrat" : null);
  };

  const handleContractGeneration = (contract) => {
    setGeneratedContracts((current) => {
      const existingIndex = current.findIndex((item) => item.number === contract.number);
      if (existingIndex >= 0) {
        return current.map((item, index) => (index === existingIndex ? contract : item));
      }
      return [contract, ...current];
    });
    setSelectedProperty((current) => ({
      ...current,
      status: current.name === contract.property ? "Loué" : current.status,
      tenant: current.name === contract.property ? contract.client : current.tenant,
      activeContractNumber: contract.number,
      history: [
        ...(current.history ?? []),
        ["Contrat généré", `${contract.number} créé et archivé pour ${contract.client}.`, "18/06/2026"],
      ],
      lastAction: current.name === contract.property ? `Contrat ${contract.number} généré` : current.lastAction,
    }));
    setPropertyTab("Contrats");
    setContractTab("Archives");
  };

  const addContractTimeline = (contract, entry) => {
    const key = getContractKey(contract);
    setContractTimelines((current) => ({
      ...current,
      [key]: [
        {
          date: "21/06/2026",
          user: "Aïssata Diarra",
          ...entry,
        },
        ...(current[key] ?? []),
      ],
    }));
  };

  const updateContract = (contract, patch, entry) => {
    const key = getContractKey(contract);
    const nextContract = { ...contract, ...(contractOverrides[key] ?? {}), ...patch };
    setContractOverrides((current) => ({
      ...current,
      [key]: {
        ...(current[key] ?? {}),
        ...patch,
      },
    }));

    if (entry) addContractTimeline(nextContract, entry);

    setPropertyHistoryOverrides((current) => ({
      ...current,
      [nextContract.property]: [
        [entry?.action ?? "Contrat mis à jour", entry?.comment ?? `${nextContract.number} mis à jour.`, "21/06/2026"],
        ...(current[nextContract.property] ?? []),
      ],
    }));
  };

  const handleContractDeadlineSave = ({ contract, values }) => {
    const key = getContractKey(contract);
    const deadline = {
      id: `ECH-${Date.now()}`,
      ...values,
      status: "Planifiée",
    };
    setContractDeadlines((current) => ({
      ...current,
      [key]: [deadline, ...(current[key] ?? [])],
    }));
    addContractTimeline(contract, {
      action: "Échéance ajoutée",
      comment: `${values.type} le ${values.date} - rappel ${values.reminder}.`,
    });
    setModal(null);
    setContractActionContext(null);
  };

  const handleContractEditSave = ({ contract, values }) => {
    updateContract(contract, {
      number: values.number,
      type: values.type,
      status: values.status,
      property: values.property,
      owner: values.owner,
      client: values.client,
      start: values.start,
      end: values.end,
      periodicity: values.periodicity,
      nextDueDate: values.nextDueDate,
      amount: values.amount,
      deposit: values.deposit,
      commission: values.commission,
      financialMode: values.financialMode,
      specialTerms: values.specialTerms,
      model: values.model,
      signedDocument: values.signedDocument,
      observations: values.observations,
    }, {
      action: "Modification",
      comment: `Contrat ${values.number} modifie depuis la fiche contrat.`,
    });
    setModal(null);
    setContractActionContext(null);
  };

  const handleContractRenewalSave = ({ contract, values }) => {
    const amendmentReference = values.generateAmendment === "Oui" ? makeDocumentNumber("AVN", allContracts.length + 1) : "";
    updateContract(contract, {
      status: "Renouvelé",
      start: values.newStart,
      end: values.newEnd,
      amount: values.newAmount || contract.amount,
      deposit: values.newDeposit || contract.deposit,
      commission: values.newCommission || contract.commission,
      renewalModel: values.model,
      renewalTerms: values.terms,
      amendmentGenerated: values.generateAmendment,
      amendmentReference,
      nextDueDate: values.newStart,
      renewalDate: values.newStart,
    }, {
      action: "Renouvellement",
      comment: values.generateAmendment === "Oui"
        ? `Avenant ${amendmentReference} généré pour la période ${values.newStart} - ${values.newEnd}.`
        : `Nouvelle période ${values.newStart} - ${values.newEnd}.`,
    });

    setSelectedProperty((current) => current.name === contract.property ? {
      ...current,
      activeContractNumber: contract.number,
      renewalDate: values.newStart,
      contractEnd: values.newEnd,
      lastAction: values.generateAmendment === "Oui"
        ? `Contrat ${contract.number} renouvelé avec avenant ${amendmentReference}`
        : `Contrat ${contract.number} renouvelé`,
      history: [
        ...(current.history ?? []),
        [
          "Contrat renouvelé",
          values.generateAmendment === "Oui"
            ? `${contract.number} renouvelé du ${values.newStart} au ${values.newEnd}. Avenant ${amendmentReference} généré.`
            : `${contract.number} renouvelé du ${values.newStart} au ${values.newEnd}.`,
          "21/06/2026",
        ],
      ],
    } : current);

    const tenant = allTenants.find((item) => item.name === contract.client);
    if (tenant) {
      setTenantOverrides((current) => ({
        ...current,
        [tenant.id]: {
          ...(current[tenant.id] ?? {}),
          contractEnd: values.newEnd,
          activeContract: contract.number,
          contractStatus: "Renouvelé",
          renewalDate: values.newStart,
          amendmentReference,
          lastAction: values.generateAmendment === "Oui"
            ? `Avenant ${amendmentReference} généré`
            : "Contrat renouvelé",
        },
      }));
    }

    setPropertyTab("Contrats");
    setModal(null);
    setContractActionContext(null);
  };

  const handleContractTerminationSave = ({ contract, values }) => {
    const terminationReference = values.generateDocument === "Oui" ? makeDocumentNumber("RES", allContracts.length + 1) : "";
    const property = propertiesWithArchiveState.find((item) => item.name === contract.property) ?? properties.find((item) => item.name === contract.property);
    const tenant = allTenants.find((item) => item.name === contract.client);
    const detachTenant = values.detachTenant === "Oui";

    updateContract(contract, {
      status: "Résilié",
      terminationDate: values.date,
      terminationReason: values.reason,
      depositReturn: values.returnDeposit,
      depositReturnAmount: values.returnAmount,
      remainingArrears: values.remainingArrears,
      terminationObservations: values.observations,
      terminationDocumentGenerated: values.generateDocument,
      terminationDocumentReference: terminationReference,
    }, {
      action: "Résiliation",
      comment: values.generateDocument === "Oui"
        ? `${contract.number} résilié le ${values.date}. Document ${terminationReference} généré.`
        : `${contract.number} résilié le ${values.date}. Motif : ${values.reason}.`,
    });

    if (property) {
      const nextProperty = {
        ...property,
        status: values.propertyStatus,
        tenant: detachTenant ? "Libre" : property.tenant,
        lastAction: `Contrat ${contract.number} résilié`,
        terminationDate: values.date,
        activeContractNumber: "",
      };

      setPropertyOverrides((current) => ({
        ...current,
        [property.code]: nextProperty,
      }));

      setPropertyHistoryOverrides((current) => ({
        ...current,
        [property.name]: [
          [
            "Contrat résilié",
            detachTenant
              ? `${contract.number} résilié le ${values.date}. Bien passé en ${values.propertyStatus} et locataire détaché.`
              : `${contract.number} résilié le ${values.date}. Bien passé en ${values.propertyStatus}.`,
            "21/06/2026",
          ],
          ...(current[property.name] ?? []),
        ],
      }));

      setSelectedProperty((current) => current.code === property.code ? {
        ...current,
        ...nextProperty,
        history: [
          ...(current.history ?? []),
          [
            "Contrat résilié",
            detachTenant
              ? `${contract.number} résilié le ${values.date}. Bien passé en ${values.propertyStatus} et locataire détaché.`
              : `${contract.number} résilié le ${values.date}. Bien passé en ${values.propertyStatus}.`,
            "21/06/2026",
          ],
        ],
      } : current);
    }

    if (tenant) {
      setTenantOverrides((current) => ({
        ...current,
        [tenant.id]: {
          ...(current[tenant.id] ?? {}),
          contractStatus: "Résilié",
          exitDate: values.date,
          activeContract: "",
          property: detachTenant ? "Détaché du bien" : tenant.property,
          paymentStatus: values.remainingArrears && parseFCFA(values.remainingArrears) > 0 ? "Solde à régulariser" : "Sorti",
          terminationReason: values.reason,
          terminationDocumentReference: terminationReference,
          lastAction: `Résiliation ${contract.number}`,
        },
      }));
    }

    setPropertyTab("Historique");
    setModal(null);
    setContractActionContext(null);
  };

  const handleContractStatusAction = (contract, status, comment) => {
    updateContract(contract, { status }, {
      action: "Changement de statut",
      comment: `${contract.number} passe au statut ${status}. ${comment}`,
    });
  };

  const handleContractDocumentAction = (contract, action, comment) => {
    addContractTimeline(contract, { action, comment });
    setContractActionContext({ contract, documentAction: action });
    setModal("Document signe contrat");
  };

  const handlePaymentRegistration = (payment) => {
    const paymentKey = getPaymentKey(payment);

    setRecordedPayments((current) => {
      const existingIndex = current.findIndex((item) => getPaymentKey(item) === paymentKey);
      if (existingIndex >= 0) {
        return current.map((item, index) => (index === existingIndex ? payment : item));
      }
      return [payment, ...current];
    });

    setSelectedProperty((current) => current.name === payment.property ? {
      ...current,
      lastPayment: `${payment.paid} le ${payment.date}`,
      lastAction: `Paiement ${payment.status.toLowerCase()} enregistré`,
      history: [
        ...(current.history ?? []),
        ["Paiement enregistré", `${payment.amountNow ?? payment.paid} encaissé pour ${payment.period}.`, payment.date],
      ],
    } : current);

    const paymentTenant = allTenants.find((tenant) => tenant.name === payment.tenant) ?? tenants.find((tenant) => tenant.name === payment.tenant);
    const nextTenantStatus = payment.status === "Payé" ? "À jour" : payment.status;
    if (paymentTenant) {
      setTenantOverrides((current) => ({
        ...current,
        [paymentTenant.id]: {
          ...(current[paymentTenant.id] ?? {}),
          paymentStatus: nextTenantStatus,
          lastPayment: payment.date,
          lastReceipt: payment.receipt,
        },
      }));
      setSelectedTenant((current) => (current.id === paymentTenant.id ? {
        ...current,
        paymentStatus: nextTenantStatus,
        lastPayment: payment.date,
        lastReceipt: payment.receipt,
      } : current));
    }

    setPropertyTab("Paiements");
    setFinanceTab("Paiements");
    if (payment.receipt && payment.receipt !== "Non généré") {
      setReceiptPreviewValues(getPaymentReceiptValues(payment));
      setContractTab("Archives");
      setModal("Aperçu reçu paiement");
    } else {
      setModal(null);
    }
  };

  const handleMaintenanceSchedule = ({ maintenance, createCharge }) => {
    const sequence = scheduledMaintenances.length + 1;
    const nextMaintenance = {
      ...maintenance,
      reference: maintenance.reference ?? makeDocumentNumber("ENT", 80 + sequence),
    };

    setScheduledMaintenances((current) => [nextMaintenance, ...current]);

    if (createCharge) {
      setMaintenanceCharges((current) => [makeMaintenanceCharge(nextMaintenance, current.length + 1), ...current]);
    }

    setPropertyHistoryOverrides((current) => ({
      ...current,
      [nextMaintenance.property]: [
        ["Entretien planifié", `${nextMaintenance.type} prévu le ${nextMaintenance.date}.`, "18/06/2026"],
        ...(createCharge ? [["Charge créée", `Charge liée à l'entretien ${nextMaintenance.type}.`, "18/06/2026"]] : []),
        ...(current[nextMaintenance.property] ?? []),
      ],
    }));

    setSelectedProperty((current) => current.name === nextMaintenance.property ? {
      ...current,
      lastAction: `Entretien ${nextMaintenance.type} planifié`,
    } : current);

    setPropertyTab("Charges & entretiens");
    setFinanceTab(createCharge ? "Charges" : "Entretiens");
    setModal(null);
  };

  const handleDocumentTemplateSelection = (templateKey) => {
    const property = documentContext?.property ?? selectedProperty;
    setDocumentDraft({
      templateKey,
      property,
      data: getDocumentDataForProperty(property, allPayments),
    });
    setActivePage("Contrats");
    setContractTab("Génération de document");
    setModal(null);
  };

  const handlePropertyPdfArchive = (property) => {
    const archive = makePropertyPdfArchive(property);
    setPropertyPdfArchives((current) => {
      if (current.some((item) => item.reference === archive.reference)) return current;
      return [archive, ...current];
    });
    setPropertyHistoryOverrides((current) => ({
      ...current,
      [property.name]: [
        ["Fiche PDF archivée", `${archive.reference} ajoutée aux documents du bien.`, "18/06/2026"],
        ...(current[property.name] ?? []),
      ],
    }));
    setPropertyTab("Documents");
  };

  const handlePropertyArchive = ({ property, reason }) => {
    const target = property ?? archiveContext ?? selectedProperty;
    const cleanReason = reason.trim().replace(/\s+/g, " ");
    if (!target || !cleanReason) return;
    const reasonSentence = cleanReason.replace(/[.!?]+$/, "");

    const archive = {
      reason: cleanReason,
      date: "18/06/2026",
    };

    setArchivedProperties((current) => ({
      ...current,
      [target.code]: archive,
    }));
    setPropertyHistoryOverrides((current) => ({
      ...current,
      [target.name]: [
        ["Bien archivé", `${reasonSentence}. Historique, documents, paiements et contrats conservés.`, archive.date],
        ...(current[target.name] ?? []),
      ],
    }));
    setSelectedProperty((current) => current.code === target.code ? {
      ...current,
      status: "Archivé",
      archived: true,
      archiveReason: cleanReason,
      archiveDate: archive.date,
      lastAction: `Archivé : ${cleanReason}`,
    } : current);
    setPropertyTab("Historique");
    setPropertyView("list");
    setModal(null);
    setArchiveContext(null);
  };

  useEffect(() => {
    if (!demoActive) return;

    const step = demoSteps[demoIndex];
    setModal(null);
    setGlobalQuery("");

    if (step.page) setActivePage(step.page);
    if (step.page === "Biens") {
      setPropertyView(step.propertyView ?? "list");
      setSelectedProperty(properties[1]);
      setPropertyTab(step.propertyTab ?? "Résumé");
    }
    if (step.clientTab) setClientTab(step.clientTab);
    if (step.contractTab) setContractTab(step.contractTab);
    if (step.financeTab) setFinanceTab(step.financeTab);
    if (step.adminTab) setAdminTab(step.adminTab);
    if (step.reportType) setReportType(step.reportType);
  }, [demoActive, demoIndex]);

  useEffect(() => {
    if (!demoActive) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") stopDemo();
      if (event.key === "ArrowLeft") previousDemoStep();
      if (event.key === "ArrowRight") nextDemoStep();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [demoActive]);

  useEffect(() => {
    if (!demoActive || !demoStep) return undefined;

    const targetSelector = `[data-demo="${demoStep.target}"]`;

    const measureTarget = () => {
      const target = document.querySelector(targetSelector);
      if (!target) {
        setDemoRect(null);
        return;
      }
      const rect = target.getBoundingClientRect();
      setDemoRect({
        top: Math.max(rect.top, 0),
        left: Math.max(rect.left, 0),
        width: rect.width,
        height: rect.height,
      });
    };

    const focusTarget = () => {
      const target = document.querySelector(targetSelector);
      if (!target) {
        setDemoRect(null);
        return;
      }
      target.scrollIntoView({ block: "center", inline: "nearest", behavior: "smooth" });
      window.setTimeout(measureTarget, 260);
    };

    const timer = window.setTimeout(focusTarget, 120);
    window.addEventListener("resize", measureTarget);
    window.addEventListener("scroll", measureTarget, true);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("resize", measureTarget);
      window.removeEventListener("scroll", measureTarget, true);
    };
  }, [demoActive, demoStep, activePage, propertyView, propertyTab, clientTab, contractTab, financeTab, adminTab, reportType]);

  if (showLogin) {
    return <LoginScreen onLogin={() => setShowLogin(false)} />;
  }

  return (
    <div className="app">
      <Topbar
        activePage={activePage}
        globalQuery={globalQuery}
        onQueryChange={setGlobalQuery}
        onNav={handleNav}
        onAction={openAction}
        onProfile={() => setShowLogin(true)}
        onStartDemo={startDemo}
        demoActive={demoActive}
        notifications={topbarNotifications}
      />

      <main className={activePage === "Dashboard" ? "page-shell dashboard-shell" : "page-shell"}>
        {activePage === "Dashboard" && <DashboardPage onAction={openAction} onOpenProperty={showPropertyDetail} propertiesList={activeProperties} />}
        {activePage === "Biens" && (
          <PropertiesPage
            query={globalQuery}
            onQueryChange={setGlobalQuery}
            display={propertyDisplay}
            onDisplay={setPropertyDisplay}
            view={propertyView}
            selectedProperty={selectedProperty}
            propertyTab={propertyTab}
            onTab={setPropertyTab}
            onSelect={showPropertyDetail}
            onBack={() => setPropertyView("list")}
            onAction={openAction}
            contractsList={allContracts}
            paymentsList={allPayments}
            rentRowsList={allRentRows}
            chargesList={allCharges}
            maintenancesList={allMaintenances}
            propertyHistoryOverrides={propertyHistoryOverrides}
            propertyPdfArchives={propertyPdfArchives}
            propertiesList={propertiesWithArchiveState}
            visitsList={allVisits}
          />
        )}
        {activePage === "Clients" && (
          <ClientsPage
            activeTab={clientTab}
            onTab={setClientTab}
            selectedOwner={selectedOwner}
            onOwner={setSelectedOwner}
            ownersList={allOwners}
            selectedTenant={selectedTenant}
            onTenant={setSelectedTenant}
            tenantsList={allTenants}
            prospectsList={allProspects}
            prospectProposals={prospectProposals}
            prospectActivities={prospectActivities}
            prospectConversions={prospectConversions}
            visitsList={allVisits}
            visitHistories={visitHistories}
            detailRequest={clientDetailRequest}
            tenantRelances={tenantRelances}
            tenantReceiptArchives={tenantReceiptArchives}
            onAction={openAction}
            contractsList={allContracts}
            paymentsList={allPayments}
            rentRowsList={allRentRows}
            reversalsList={allReversals}
          />
        )}
        {activePage === "Contrats" && <ContractsPage activeTab={contractTab} onTab={setContractTab} onAction={openAction} contractsList={allContracts} paymentsList={allPayments} documentDraft={documentDraft} propertyPdfArchives={propertyPdfArchives} contractTimelines={contractTimelines} contractDeadlines={contractDeadlines} />}
        {activePage === "Finance" && <FinancePage activeTab={financeTab} onTab={setFinanceTab} onAction={openAction} paymentsList={allPayments} rentRowsList={allRentRows} chargesList={allCharges} maintenancesList={allMaintenances} reversalsList={allReversals} />}
        {activePage === "Rapports" && (
          <ReportsPage selected={reportType} onSelect={setReportType} onAction={openAction} />
        )}
        {activePage === "Plus" && <AdminPage activeTab={adminTab} onTab={setAdminTab} onAction={openAction} />}
      </main>

      <Footer />
      {demoActive && demoStep && (
        <DemoTour
          step={demoStep}
          index={demoIndex}
          total={demoSteps.length}
          rect={demoRect}
          onNext={nextDemoStep}
          onPrevious={previousDemoStep}
          onStop={stopDemo}
        />
      )}
      {modal && (["Ajouter une charge"].includes(modal) || modal.startsWith("Modifier charge") ? (
        <ChargeFormModal title={modal} onClose={() => setModal(null)} />
      ) : ["Ajouter un bien", "Modifier le bien"].includes(modal) ? (
        <PropertyFormModal
          title={modal}
          property={selectedProperty}
          ownersList={allOwners}
          ownerPrefill={propertyOwnerPrefill}
          onClose={() => {
            setPropertyOwnerPrefill("");
            setModal(null);
          }}
        />
      ) : modal === "Nouveau propriétaire" ? (
        <OwnerFormModal
          sequence={owners.length + createdOwners.length + 1}
          onSave={handleOwnerSave}
          onClose={() => setModal(null)}
        />
      ) : modal === "Nouveau prospect" ? (
        <ProspectFormModal
          sequence={prospects.length + createdProspects.length + 1}
          onSave={handleProspectSave}
          onClose={() => setModal(null)}
        />
      ) : modal === "Proposer un bien prospect" ? (
        <ProspectProposalModal
          prospect={prospectProposalContext ?? prospects[0]}
          onSave={handleProspectProposalSave}
          onClose={() => {
            setProspectProposalContext(null);
            setModal(null);
          }}
        />
      ) : modal === "Modifier besoin prospect" ? (
        <ProspectNeedModal
          prospect={prospectActionContext?.prospect ?? null}
          onSave={handleProspectNeedSave}
          onClose={() => {
            setProspectActionContext(null);
            setModal(null);
          }}
        />
      ) : modal === "Prochaine action prospect" ? (
        <ProspectNextActionModal
          prospect={prospectActionContext?.prospect ?? null}
          onSave={handleProspectNextActionSave}
          onClose={() => {
            setProspectActionContext(null);
            setModal(null);
          }}
        />
      ) : modal === "Planifier visite prospect" ? (
        <ProspectVisitModal
          prospect={prospectActionContext?.prospect ?? null}
          proposal={prospectActionContext?.proposal}
          property={prospectActionContext?.property ?? selectedProperty}
          prospectsList={allProspects}
          onSave={handleProspectVisitSave}
          onClose={() => {
            setProspectActionContext(null);
            setModal(null);
          }}
        />
      ) : modal === "Modifier date visite" ? (
        <VisitDateModal
          visit={visitActionContext?.visit ?? allVisits[0]}
          onSave={handleVisitDateSave}
          onClose={closeVisitModal}
        />
      ) : modal === "Reporter visite" ? (
        <VisitDateModal
          visit={visitActionContext?.visit ?? allVisits[0]}
          report
          onSave={handleVisitDateSave}
          onClose={closeVisitModal}
        />
      ) : modal === "Changer agent visite" ? (
        <VisitAgentModal
          visit={visitActionContext?.visit ?? allVisits[0]}
          onSave={handleVisitAgentSave}
          onClose={closeVisitModal}
        />
      ) : modal === "Annuler visite" ? (
        <VisitCancelModal
          visit={visitActionContext?.visit ?? allVisits[0]}
          onSave={handleVisitCancelSave}
          onClose={closeVisitModal}
        />
      ) : modal === "Marquer visite réalisée" ? (
        <VisitCloseModal
          visit={visitActionContext?.visit ?? allVisits[0]}
          onSave={handleVisitCloseSave}
          onClose={closeVisitModal}
        />
      ) : modal === "Retour client visite" ? (
        <VisitFeedbackModal
          visit={visitActionContext?.visit ?? allVisits[0]}
          onSave={handleVisitFeedbackSave}
          onClose={closeVisitModal}
        />
      ) : modal === "Créer relance visite" ? (
        <VisitReminderModal
          visit={visitActionContext?.visit ?? allVisits[0]}
          onSave={handleVisitReminderSave}
          onClose={closeVisitModal}
        />
      ) : modal === "Ajouter commentaire prospect" ? (
        <ProspectCommentModal
          prospect={prospectActionContext?.prospect ?? prospects[0]}
          onSave={handleProspectCommentSave}
          onClose={() => {
            setProspectActionContext(null);
            setModal(null);
          }}
        />
      ) : modal === "Changer statut prospect" ? (
        <ProspectStatusModal
          prospect={prospectActionContext?.prospect ?? prospects[0]}
          onSave={handleProspectStatusSave}
          onClose={() => {
            setProspectActionContext(null);
            setModal(null);
          }}
        />
      ) : modal === "Convertir prospect" ? (
        <ProspectConversionModal
          prospect={prospectActionContext?.prospect ?? prospects[0]}
          onSave={handleProspectConversionSave}
          onClose={() => {
            setProspectActionContext(null);
            setModal(null);
          }}
        />
      ) : modal === "Modifier propriétaire" ? (
        <OwnerFormModal
          mode="edit"
          owner={ownerActionContext?.owner ?? selectedOwner}
          onSave={handleOwnerSave}
          onClose={() => {
            setOwnerActionContext(null);
            setModal(null);
          }}
        />
      ) : modal === "Situation propriétaire" ? (
        <OwnerStatementModal
          owner={ownerActionContext?.owner ?? selectedOwner}
          chargesList={allCharges}
          paymentsList={allPayments}
          reversalsList={allReversals}
          onClose={() => {
            setOwnerActionContext(null);
            setModal(null);
          }}
        />
      ) : modal === "Enregistrer reversement propriétaire" ? (
        <OwnerReversementModal
          owner={ownerActionContext?.owner ?? selectedOwner}
          onSave={handleOwnerReversementSave}
          onClose={() => {
            setOwnerActionContext(null);
            setModal(null);
          }}
        />
      ) : ["Imprimer propriétaire", "Export PDF propriétaire"].includes(modal) ? (
        <OwnerPrintableModal
          owner={ownerActionContext?.owner ?? selectedOwner}
          activeTab={ownerActionContext?.activeOwnerTab ?? "Résumé"}
          output={modal === "Export PDF propriétaire" ? "Export PDF" : "Impression"}
          chargesList={allCharges}
          paymentsList={allPayments}
          reversalsList={allReversals}
          onClose={() => {
            setOwnerActionContext(null);
            setModal(null);
          }}
        />
      ) : modal === "Modifier locataire" ? (
        <TenantFormModal
          tenant={tenantActionContext?.tenant ?? selectedTenant}
          property={tenantActionContext?.property}
          onSave={handleTenantSave}
          onClose={() => {
            setTenantActionContext(null);
            setModal(null);
          }}
        />
      ) : modal === "Paiement locataire" ? (
        <TenantPaymentModal
          tenant={tenantActionContext?.tenant ?? selectedTenant}
          property={tenantActionContext?.property}
          row={tenantActionContext?.row}
          payment={tenantActionContext?.payment}
          paymentsList={allPayments}
          rentRowsList={allRentRows}
          onSave={handlePaymentRegistration}
          onClose={() => {
            setTenantActionContext(null);
            setModal(null);
          }}
        />
      ) : modal === "Reçu locataire" ? (
        <TenantReceiptModal
          tenant={tenantActionContext?.tenant ?? selectedTenant}
          property={tenantActionContext?.property}
          payment={tenantActionContext?.payment}
          paymentsList={allPayments}
          rentRowsList={allRentRows}
          archivedReceipts={tenantReceiptArchives}
          onArchive={handleTenantReceiptArchive}
          onClose={() => {
            setTenantActionContext(null);
            setModal(null);
          }}
        />
      ) : modal === "Relance locataire" ? (
        <TenantReminderModal
          tenant={tenantActionContext?.tenant ?? selectedTenant}
          row={tenantActionContext?.row}
          onSave={handleTenantRelanceSave}
          onClose={() => {
            setTenantActionContext(null);
            setModal(null);
          }}
        />
      ) : modal === "Contrat locataire" ? (
        <TenantContractModal
          tenant={tenantActionContext?.tenant ?? selectedTenant}
          contract={tenantActionContext?.contract}
          onAction={openAction}
          onClose={() => {
            setTenantActionContext(null);
            setModal(null);
          }}
        />
      ) : modal === "Situation locataire" ? (
        <TenantSituationModal
          tenant={tenantActionContext?.tenant ?? selectedTenant}
          property={tenantActionContext?.property}
          paymentsList={allPayments}
          rentRowsList={allRentRows}
          relancesList={tenantRelances}
          archivedReceipts={tenantReceiptArchives}
          onClose={() => {
            setTenantActionContext(null);
            setModal(null);
          }}
        />
      ) : modal === "Ajouter locataire" ? (
        <AttachTenantModal property={selectedProperty} onClose={() => setModal(null)} onAttach={handleTenantAttachment} />
      ) : modal === "Créer contrat" ? (
        <ContractFormModal property={selectedProperty} tenant={selectedProperty.attachedTenant} onGenerate={handleContractGeneration} onClose={() => setModal(null)} />
      ) : modal === "Gerer echeances contrat" ? (
        <ContractDeadlineModal contract={contractActionContext?.contract ?? allContracts[0]} onSave={handleContractDeadlineSave} onClose={() => { setContractActionContext(null); setModal(null); }} />
      ) : modal === "Actions echeance contrat" ? (
        <ContractDueActionsModal contract={contractActionContext?.contract ?? allContracts[0]} onAction={openAction} onClose={() => { setContractActionContext(null); setModal(null); }} />
      ) : modal === "Document signe contrat" ? (
        <ContractDocumentModal contract={contractActionContext?.contract ?? allContracts[0]} action={contractActionContext?.documentAction} onAction={openAction} onClose={() => { setContractActionContext(null); setModal(null); }} />
      ) : modal === "Modifier contrat" ? (
        <ContractEditModal contract={contractActionContext?.contract ?? allContracts[0]} onSave={handleContractEditSave} onClose={() => { setContractActionContext(null); setModal(null); }} />
      ) : modal === "Renouveler contrat" ? (
        <ContractRenewalModal contract={contractActionContext?.contract ?? allContracts[0]} onSave={handleContractRenewalSave} onClose={() => { setContractActionContext(null); setModal(null); }} />
      ) : modal === "Resilier contrat" ? (
        <ContractTerminationModal contract={contractActionContext?.contract ?? allContracts[0]} onSave={handleContractTerminationSave} onClose={() => { setContractActionContext(null); setModal(null); }} />
      ) : modal === "Enregistrer paiement" ? (
        <PaymentRegistrationModal context={paymentContext} paymentsList={allPayments} rentRowsList={allRentRows} onSave={handlePaymentRegistration} onClose={() => setModal(null)} />
      ) : modal === "Ajouter entretien" ? (
        <MaintenanceFormModal context={maintenanceContext} onSave={handleMaintenanceSchedule} onClose={() => setModal(null)} />
      ) : modal === "Choisir document" ? (
        <DocumentContextMenu property={documentContext?.property ?? selectedProperty} onSelect={handleDocumentTemplateSelection} onClose={() => setModal(null)} />
      ) : modal === "Fiche PDF" ? (
        <PropertyPdfModal property={propertyPdfContext ?? selectedProperty} archived={propertyPdfArchives.some((item) => item.property === (propertyPdfContext ?? selectedProperty).name)} onArchive={handlePropertyPdfArchive} onClose={() => setModal(null)} />
      ) : modal === "Archiver bien" ? (
        <ArchivePropertyModal
          property={archiveContext ?? selectedProperty}
          onConfirm={handlePropertyArchive}
          onClose={() => {
            setArchiveContext(null);
            setModal(null);
          }}
        />
      ) : modal === "Aperçu reçu paiement" && receiptPreviewValues ? (
        <DocumentPreviewModal
          template={documentTemplates.find((item) => item.key === "recu") ?? documentTemplates[1]}
          values={receiptPreviewValues}
          onChange={(name, value) => setReceiptPreviewValues((current) => ({ ...current, [name]: value }))}
          onClose={() => setModal(null)}
        />
      ) : (
        <DemoModal title={modal} onClose={() => setModal(null)} />
      ))}
    </div>
  );
}

function getDemoCardPosition(rect) {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const cardWidth = Math.min(410, viewportWidth - 28);
  const cardHeight = 245;

  if (!rect) {
    return {
      left: Math.max(14, viewportWidth - cardWidth - 22),
      top: 88,
      width: cardWidth,
      arrowPath: "",
    };
  }

  const centerX = rect.left + rect.width / 2;
  const belowTop = rect.top + rect.height + 18;
  const aboveTop = rect.top - cardHeight - 18;
  const top = belowTop + cardHeight < viewportHeight ? belowTop : Math.max(16, aboveTop);
  const left = Math.min(Math.max(14, centerX - cardWidth / 2), viewportWidth - cardWidth - 14);
  const startX = left + cardWidth / 2;
  const startY = top < rect.top ? top + cardHeight : top;
  const endX = centerX;
  const endY = rect.top + rect.height / 2;
  const controlY = (startY + endY) / 2;

  return {
    left,
    top,
    width: cardWidth,
    arrowPath: `M ${startX} ${startY} C ${startX} ${controlY}, ${endX} ${controlY}, ${endX} ${endY}`,
  };
}

function DemoTour({ step, index, total, rect, onNext, onPrevious, onStop }) {
  const position = getDemoCardPosition(rect);
  const spotlightStyle = rect
    ? {
        left: `${Math.max(rect.left - 10, 8)}px`,
        top: `${Math.max(rect.top - 10, 8)}px`,
        width: `${rect.width + 20}px`,
        height: `${rect.height + 20}px`,
      }
    : undefined;
  const isLast = index === total - 1;

  return (
    <div className="demo-tour" role="dialog" aria-label="Mode démonstration E.K immo">
      {rect && <div className="demo-spotlight" style={spotlightStyle} />}
      {rect && position.arrowPath && (
        <svg className="demo-arrow" aria-hidden="true">
          <defs>
            <marker id="demo-arrow-tip" markerWidth="11" markerHeight="11" refX="8" refY="5.5" orient="auto">
              <path d="M1 1 L9 5.5 L1 10 Z" />
            </marker>
          </defs>
          <path d={position.arrowPath} />
        </svg>
      )}
      <article
        className="demo-card"
        style={{ left: `${position.left}px`, top: `${position.top}px`, width: `${position.width}px` }}
      >
        <div className="demo-card-head">
          <span>
            <Sparkles size={16} />
            Mode DEMO
          </span>
          <button onClick={onStop} aria-label="Arrêter le mode démo">
            <XCircle size={18} />
            Arrêter
          </button>
        </div>
        <h2>{step.title}</h2>
        <p>{step.body}</p>
        <div className="demo-progress" aria-label={`Étape ${index + 1} sur ${total}`}>
          <span>Étape {index + 1} / {total}</span>
          <div>
            <i style={{ width: `${((index + 1) / total) * 100}%` }} />
          </div>
        </div>
        <div className="demo-controls">
          <button className="button secondary compact" onClick={onPrevious} disabled={index === 0}>
            <ArrowLeft size={15} /> Précédent
          </button>
          <button className="button primary compact" onClick={onNext}>
            {isLast ? (
              <>
                <CheckCircle2 size={15} /> Terminer
              </>
            ) : (
              <>
                Suivant <ArrowRight size={15} />
              </>
            )}
          </button>
        </div>
      </article>
    </div>
  );
}

function Topbar({ activePage, globalQuery, onQueryChange, onNav, onAction, onProfile, onStartDemo, demoActive, notifications = notificationAlerts }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [readNotificationIds, setReadNotificationIds] = useState([]);
  const results = useMemo(() => getSearchResults(globalQuery), [globalQuery]);
  const hasQuery = globalQuery.trim().length > 0;
  const unreadCount = notifications.filter((item) => !readNotificationIds.includes(item.id)).length;

  const handleResultClick = (page) => {
    onNav(page);
    setSearchOpen(false);
  };

  const handleNotificationView = (page) => {
    onNav(page);
    setNotificationsOpen(false);
    setUserMenuOpen(false);
  };

  const markNotificationAsRead = (id) => {
    setReadNotificationIds((ids) => (ids.includes(id) ? ids : [...ids, id]));
  };

  const handleUserAction = (label) => {
    setUserMenuOpen(false);
    if (label === "Déconnexion") {
      onProfile();
      return;
    }
    onAction(label);
  };

  return (
    <header className="topbar">
      <button className="brand-link" onClick={() => onNav("Dashboard")} aria-label="Retour au dashboard">
        <img src={ekimmoAssets.logo} alt="E.K immo" />
      </button>

      <nav className="nav-tabs" aria-label="Navigation principale" data-demo="main-nav">
        {navItems.map((item) => (
          <button className={activePage === item.page ? "active" : ""} key={item.page} onClick={() => onNav(item.page)}>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="topbar-actions">
        <button className={demoActive ? "demo-launch active" : "demo-launch"} onClick={onStartDemo} data-demo="demo-button">
          <Sparkles size={18} />
          <span>Mode DEMO</span>
        </button>
        <div className="search-menu">
          <button
            className={searchOpen ? "icon-only active" : "icon-only"}
            aria-label="Rechercher"
            aria-expanded={searchOpen}
            onClick={() => {
              setSearchOpen((value) => !value);
              setNotificationsOpen(false);
              setUserMenuOpen(false);
            }}
          >
            <Search size={20} />
          </button>
          {searchOpen && (
            <section className="search-panel" onKeyDown={(event) => event.key === "Escape" && setSearchOpen(false)}>
              <label className="search-box">
                <Search size={18} />
                <input
                  value={globalQuery}
                  onChange={(event) => onQueryChange(event.target.value)}
                  placeholder="Bien, contact, montant..."
                  aria-label="Recherche globale"
                  autoFocus
                />
              </label>
              <div className="search-results">
                {hasQuery &&
                  results.map((result) => (
                    <button className="search-result" key={`${result.type}-${result.match}-${result.detail}`} onClick={() => handleResultClick(result.page)}>
                      <span className={`search-type ${result.tone}`}>{result.type}</span>
                      <span>
                        <strong>{result.match}</strong>
                        <small>{result.detail}</small>
                      </span>
                    </button>
                  ))}
                {hasQuery && results.length === 0 && <p className="search-empty">Aucun résultat</p>}
                {!hasQuery && <p className="search-empty">Recherche globale</p>}
              </div>
            </section>
          )}
        </div>
        <div className="notification-menu">
          <button
            className={notificationsOpen ? "icon-only active" : "icon-only"}
            aria-label="Notifications"
            aria-expanded={notificationsOpen}
            onClick={() => {
              setNotificationsOpen((value) => !value);
              setSearchOpen(false);
              setUserMenuOpen(false);
            }}
          >
            <Bell size={20} />
            {unreadCount > 0 && <span>{unreadCount}</span>}
          </button>
          {notificationsOpen && (
            <section className="notification-panel" onKeyDown={(event) => event.key === "Escape" && setNotificationsOpen(false)}>
              <div className="notification-head">
                <span>
                  <strong>Alertes en cours</strong>
                  <small>{unreadCount} non lue{unreadCount > 1 ? "s" : ""}</small>
                </span>
                <button className="notification-close" onClick={() => setNotificationsOpen(false)} aria-label="Fermer les notifications">
                  Fermer
                </button>
              </div>
              <div className="notification-list">
                {notifications.map((item) => {
                  const isRead = readNotificationIds.includes(item.id);

                  return (
                    <article className={isRead ? `notification-item ${item.tone} read` : `notification-item ${item.tone}`} key={item.id}>
                      <div className="notification-copy">
                        <span className="notification-dot" />
                        <span>
                          <strong>{item.title}</strong>
                          <small>{item.detail}</small>
                        </span>
                        <b>{item.meta}</b>
                      </div>
                      <div className="notification-actions">
                        <button onClick={() => handleNotificationView(item.page)}>
                          <Eye size={15} /> Voir
                        </button>
                        <button onClick={() => markNotificationAsRead(item.id)} disabled={isRead}>
                          <CheckCircle2 size={15} /> Marquer comme lu
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          )}
        </div>
        <button className="icon-only" aria-label="Paramètres" onClick={() => onNav("Plus")}>
          <Settings size={20} />
        </button>
        <div className="user-menu">
          <button
            className={userMenuOpen ? "avatar-button active" : "avatar-button"}
            onClick={() => {
              setUserMenuOpen((value) => !value);
              setSearchOpen(false);
              setNotificationsOpen(false);
            }}
            aria-label="Menu utilisateur"
            aria-expanded={userMenuOpen}
          >
            <span>AD</span>
          </button>
          {userMenuOpen && (
            <section className="user-panel" onKeyDown={(event) => event.key === "Escape" && setUserMenuOpen(false)}>
              <button onClick={() => handleUserAction("Mon profil")}>
                <UserRound size={16} /> Mon profil
              </button>
              <button onClick={() => handleUserAction("Changer mot de passe")}>
                <LockKeyhole size={16} /> Changer mot de passe
              </button>
              <button className="danger" onClick={() => handleUserAction("Déconnexion")}>
                <XCircle size={16} /> Déconnexion
              </button>
            </section>
          )}
        </div>
      </div>
    </header>
  );
}

function DashboardPage({ onAction, onOpenProperty, propertiesList = properties }) {
  const [kpiPeriod, setKpiPeriod] = useState("Mois");
  const [dashboardState, setDashboardState] = useState("Données");
  const kpiValues = dashboardKpisByPeriod[kpiPeriod] ?? dashboardKpisByPeriod.Mois;
  const kpiDetails = dashboardKpiDetailsByPeriod[kpiPeriod] ?? dashboardKpiDetailsByPeriod.Mois;
  const selectedPipeline = getPipelineData("Commercial & visites", kpiPeriod);
  const summaryValues = financeSummaryByPeriod[kpiPeriod] ?? financeSummaryByPeriod.Mois;

  const kpis = [
    { label: "Portefeuille suivi", value: kpiValues[0], icon: Building2, tone: "purple", details: kpiDetails[0] },
    { label: "Biens disponibles", value: kpiValues[1], icon: KeyRound, tone: "gray", details: kpiDetails[1] },
    { label: "Gestion locative", value: kpiValues[2], icon: Home, tone: "purple", details: kpiDetails[2] },
    { label: "Flux attendus", value: kpiValues[3], icon: Banknote, tone: "gray", details: kpiDetails[3] },
    { label: "Impayés", value: kpiValues[4], icon: AlertTriangle, tone: "danger", details: kpiDetails[4] },
    { label: "Honoraires générés", value: kpiValues[5], icon: WalletCards, tone: "gray", details: kpiDetails[5] },
    { label: "Charges et interventions", value: kpiValues[6], icon: ReceiptText, tone: "gray", details: kpiDetails[6] },
    { label: "Reversements en attente", value: kpiValues[7], icon: RefreshCw, tone: "gray", details: kpiDetails[7] },
  ];

  const alerts = [
    ["Loyers en retard", "3 locataires - 3.2M FCFA", "Relancer", "danger"],
    ["Visites du jour", "4 visites programmées", "Voir", "muted"],
    ["Contrats à échéance", "2 baux se terminent ce mois", "Gérer", "dark"],
    ["Maintenance urgente", "Fuite d'eau signalée (Studio Badalabougou)", "Action", "danger"],
    ["Documents manquants", "Assurance habitation dossier LOC-2026-018", "Demander", "muted"],
  ];

  return (
    <>
      <PageIntro
        eyebrow="Tableau de bord"
        title="Bienvenue, Aïssata"
        actions={
          <DashboardFilterBar
            period={kpiPeriod}
            onPeriod={setKpiPeriod}
            state={dashboardState}
            onState={setDashboardState}
          />
        }
      />

      {dashboardState === "Chargement" && <DashboardLoadingState />}

      {dashboardState === "Vide" && (
        <DashboardEmptyState
          onAddProperty={() => onAction("Ajouter un bien")}
          onAddPayment={() => onAction("Enregistrer un paiement")}
        />
      )}

      {dashboardState === "Erreur" && (
        <DashboardErrorState onRetry={() => setDashboardState("Données")} />
      )}

      {dashboardState === "Données" && (
        <>
      <section className="kpi-grid" data-demo="dashboard-kpis">
        {kpis.map((item) => (
          <StatCard item={item} key={item.label} />
        ))}
      </section>

      <section className="two-grid" data-demo="dashboard-charts">
        <Panel title="Suivi des loyers">
          <RentBars period={kpiPeriod} />
        </Panel>
        <Panel title={selectedPipeline.title}>
          <PipelineChart data={selectedPipeline} />
        </Panel>
      </section>

      <section className="three-grid dashboard-bottom">
        <Panel title="Biens à suivre" toolbar={<ArrowRight size={17} />}>
          <div className="watch-list">
            {propertiesList.slice(0, 4).map((property) => (
              <button className="watch-row" key={property.code} onClick={() => onOpenProperty(property)}>
                <img src={property.image} alt="" />
                <span>
                  <strong>{property.name}</strong>
                  <small>{property.district}</small>
                </span>
                <Badge label={property.status} />
              </button>
            ))}
          </div>
        </Panel>

        <Panel title="Alertes importantes" toolbar={<span className="counter">5</span>} data-demo="dashboard-alerts">
          <div className="alert-list">
            {alerts.map(([title, text, action, tone]) => (
              <div className={`alert-row ${tone}`} key={title}>
                <span>
                  <strong>{title}</strong>
                  <small>{text}</small>
                </span>
                <button onClick={() => onAction(title)}>{action}</button>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Résumé financier">
          <div className="finance-summary">
            {[
              ["Factures émises", summaryValues[0], FileText, "dark"],
              ["Paiements reçus", summaryValues[1], CheckCircle2, "muted"],
              ["Restant dû", summaryValues[2], AlertTriangle, "danger"],
              ["Charges enregistrées", summaryValues[3], ReceiptText, "dark"],
              ["Reversements prop. en attente", summaryValues[4], RefreshCw, "muted"],
            ].map(([label, value, Icon, tone]) => (
              <p key={label} className={tone}>
                <span>{label}</span>
                <strong>{value}</strong>
                <Icon size={22} />
              </p>
            ))}
          </div>
        </Panel>
      </section>
        </>
      )}
    </>
  );
}

function PropertiesPage({
  query,
  onQueryChange,
  display,
  onDisplay,
  view,
  selectedProperty,
  propertyTab,
  onTab,
  onSelect,
  onBack,
  onAction,
  contractsList = contracts,
  paymentsList = paymentRecords,
  rentRowsList = rentRows,
  chargesList = charges,
  maintenancesList = maintenances,
  propertyHistoryOverrides = {},
  propertyPdfArchives = [],
  propertiesList = properties,
  visitsList = visits,
}) {
  const [statusFilter, setStatusFilter] = useState("Tous statuts");
  const [typeFilter, setTypeFilter] = useState("Tous types");
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState({
    district: "Tous quartiers",
    owner: "Tous propriétaires",
    tenant: "Tous occupants",
    financialMode: "Tous modes",
    commission: "Toutes commissions",
    period: "Tous formats",
    tag: "Tous équipements",
    occupancy: "Toutes occupations",
    minPrice: "",
    maxPrice: "",
    minSurface: "",
    minRooms: "",
    minBedrooms: "",
    minBaths: "",
  });

  const displayedSelectedProperty = useMemo(
    () => propertiesList.find((property) => property.code === selectedProperty?.code) ?? selectedProperty,
    [propertiesList, selectedProperty]
  );
  const propertyTypes = useMemo(() => uniqueValues(propertiesList.map((property) => property.type)), [propertiesList]);
  const districts = useMemo(() => uniqueValues(propertiesList.map((property) => property.district)), [propertiesList]);
  const ownersList = useMemo(() => uniqueValues(propertiesList.map((property) => property.owner)), [propertiesList]);
  const tenantsList = useMemo(() => uniqueValues(propertiesList.map((property) => property.tenant)), [propertiesList]);
  const financialModes = useMemo(() => uniqueValues(propertiesList.map((property) => property.financialMode)), [propertiesList]);
  const commissions = useMemo(() => uniqueValues(propertiesList.map((property) => property.commission)), [propertiesList]);
  const periods = useMemo(() => uniqueValues(propertiesList.map((property) => property.period)), [propertiesList]);
  const tags = useMemo(() => uniqueValues(propertiesList.flatMap((property) => property.tags)), [propertiesList]);

  const updateAdvancedFilter = (key, value) => {
    setAdvancedFilters((current) => ({ ...current, [key]: value }));
  };

  const resetAdvancedFilters = () => {
    setTypeFilter("Tous types");
    setStatusFilter("Tous statuts");
    setAdvancedFilters({
      district: "Tous quartiers",
      owner: "Tous propriétaires",
      tenant: "Tous occupants",
      financialMode: "Tous modes",
      commission: "Toutes commissions",
      period: "Tous formats",
      tag: "Tous équipements",
      occupancy: "Toutes occupations",
      minPrice: "",
      maxPrice: "",
      minSurface: "",
      minRooms: "",
      minBedrooms: "",
      minBaths: "",
    });
  };

  const activeFilterCount = [
    statusFilter !== "Tous statuts",
    typeFilter !== "Tous types",
    advancedFilters.district !== "Tous quartiers",
    advancedFilters.owner !== "Tous propriétaires",
    advancedFilters.tenant !== "Tous occupants",
    advancedFilters.financialMode !== "Tous modes",
    advancedFilters.commission !== "Toutes commissions",
    advancedFilters.period !== "Tous formats",
    advancedFilters.tag !== "Tous équipements",
    advancedFilters.occupancy !== "Toutes occupations",
    advancedFilters.minPrice,
    advancedFilters.maxPrice,
    advancedFilters.minSurface,
    advancedFilters.minRooms,
    advancedFilters.minBedrooms,
    advancedFilters.minBaths,
  ].filter(Boolean).length;

  const filteredProperties = useMemo(() => {
    return propertiesList.filter((property) => {
      const haystack = normalizeSearch(
        `${property.code} ${property.name} ${property.type} ${property.district} ${property.address} ${property.owner} ${property.tenant} ${property.price} ${property.block ?? ""} ${property.unitNumber ?? ""} ${getPropertyRelationLabel(property)} ${property.tags.join(" ")}`
      );
      const queryMatch = !query || haystack.includes(normalizeSearch(query));
      const archiveFilter = statusFilter === "Archivés";
      const archiveMatch = archiveFilter ? property.archived : !property.archived;
      const statusMatch = statusFilter === "Tous statuts" || archiveFilter || property.status === statusFilter;
      const typeMatch = typeFilter === "Tous types" || property.type === typeFilter;
      const districtMatch = advancedFilters.district === "Tous quartiers" || property.district === advancedFilters.district;
      const ownerMatch = advancedFilters.owner === "Tous propriétaires" || property.owner === advancedFilters.owner;
      const tenantMatch = advancedFilters.tenant === "Tous occupants" || property.tenant === advancedFilters.tenant;
      const financialModeMatch = advancedFilters.financialMode === "Tous modes" || property.financialMode === advancedFilters.financialMode;
      const commissionMatch = advancedFilters.commission === "Toutes commissions" || property.commission === advancedFilters.commission;
      const periodMatch = advancedFilters.period === "Tous formats" || property.period === advancedFilters.period;
      const tagMatch = advancedFilters.tag === "Tous équipements" || property.tags.includes(advancedFilters.tag);
      const occupancyMatch =
        advancedFilters.occupancy === "Toutes occupations" ||
        (advancedFilters.occupancy === "Occupé" && !["Libre", "N/A"].includes(property.tenant)) ||
        (advancedFilters.occupancy === "Libre" && ["Libre", "N/A"].includes(property.tenant));
      const price = parseNumber(property.price);
      const surface = parseNumber(property.surface);
      const minPriceMatch = !advancedFilters.minPrice || price >= parseNumber(advancedFilters.minPrice);
      const maxPriceMatch = !advancedFilters.maxPrice || price <= parseNumber(advancedFilters.maxPrice);
      const minSurfaceMatch = !advancedFilters.minSurface || surface >= parseNumber(advancedFilters.minSurface);
      const minRoomsMatch = !advancedFilters.minRooms || property.rooms >= Number(advancedFilters.minRooms);
      const minBedroomsMatch = !advancedFilters.minBedrooms || property.bedrooms >= Number(advancedFilters.minBedrooms);
      const minBathsMatch = !advancedFilters.minBaths || property.baths >= Number(advancedFilters.minBaths);

      return (
        queryMatch &&
        archiveMatch &&
        statusMatch &&
        typeMatch &&
        districtMatch &&
        ownerMatch &&
        tenantMatch &&
        financialModeMatch &&
        commissionMatch &&
        periodMatch &&
        tagMatch &&
        occupancyMatch &&
        minPriceMatch &&
        maxPriceMatch &&
        minSurfaceMatch &&
        minRoomsMatch &&
        minBedroomsMatch &&
        minBathsMatch
      );
    });
  }, [advancedFilters, propertiesList, query, statusFilter, typeFilter]);

  if (view === "detail") {
    return (
      <PropertyDetail
        property={displayedSelectedProperty}
        activeTab={propertyTab}
        onTab={onTab}
        onBack={onBack}
        onOpenProperty={onSelect}
        onAction={onAction}
        contractsList={contractsList}
        paymentsList={paymentsList}
        rentRowsList={rentRowsList}
        chargesList={chargesList}
        maintenancesList={maintenancesList}
        historyItems={propertyHistoryOverrides[displayedSelectedProperty.name] ?? []}
        propertyPdfArchives={propertyPdfArchives}
        visitsList={visitsList}
      />
    );
  }

  return (
    <>
      <PageIntro
        title="Biens immobiliers"
        actions={
          <Button variant="primary" onClick={() => onAction("Ajouter un bien")}>
            <Plus size={18} /> Ajouter un bien
          </Button>
        }
      />

      <Panel className="filter-panel" data-demo="property-filters">
        <div className="filters-row">
          <label className="field search-field">
            <Search size={19} />
            <input
              placeholder="Rechercher par référence, nom, quartier..."
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
            />
          </label>
          <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} aria-label="Statut">
            {["Tous statuts", "Disponible", "Loué", "Réservé", "Vendu", "En travaux", "Indisponible", "Entretien seul", "Gestion multi-lots", "Archivés"].map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
          <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)} aria-label="Type de bien">
            <option>Tous types</option>
            {propertyTypes.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
          <Button onClick={() => setAdvancedOpen((value) => !value)}>
            <SlidersHorizontal size={17} /> Plus de filtres
            {activeFilterCount > 0 && <span className="filter-count">{activeFilterCount}</span>}
          </Button>
          <Segmented value={display} onChange={onDisplay} options={["cartes", "tableau"]} />
        </div>
        {advancedOpen && (
          <div className="advanced-filters">
            <label>Quartier<select value={advancedFilters.district} onChange={(event) => updateAdvancedFilter("district", event.target.value)}>
              <option>Tous quartiers</option>
              {districts.map((option) => <option key={option}>{option}</option>)}
            </select></label>
            <label>Propriétaire<select value={advancedFilters.owner} onChange={(event) => updateAdvancedFilter("owner", event.target.value)}>
              <option>Tous propriétaires</option>
              {ownersList.map((option) => <option key={option}>{option}</option>)}
            </select></label>
            <label>Occupant<select value={advancedFilters.tenant} onChange={(event) => updateAdvancedFilter("tenant", event.target.value)}>
              <option>Tous occupants</option>
              {tenantsList.map((option) => <option key={option}>{option}</option>)}
            </select></label>
            <label>Occupation<select value={advancedFilters.occupancy} onChange={(event) => updateAdvancedFilter("occupancy", event.target.value)}>
              <option>Toutes occupations</option>
              <option>Occupé</option>
              <option>Libre</option>
            </select></label>
            <label>Mode financier<select value={advancedFilters.financialMode} onChange={(event) => updateAdvancedFilter("financialMode", event.target.value)}>
              <option>Tous modes</option>
              {financialModes.map((option) => <option key={option}>{option}</option>)}
            </select></label>
            <label>Commission<select value={advancedFilters.commission} onChange={(event) => updateAdvancedFilter("commission", event.target.value)}>
              <option>Toutes commissions</option>
              {commissions.map((option) => <option key={option}>{option}</option>)}
            </select></label>
            <label>Format<select value={advancedFilters.period} onChange={(event) => updateAdvancedFilter("period", event.target.value)}>
              <option>Tous formats</option>
              {periods.map((option) => <option key={option}>{option}</option>)}
            </select></label>
            <label>Équipement<select value={advancedFilters.tag} onChange={(event) => updateAdvancedFilter("tag", event.target.value)}>
              <option>Tous équipements</option>
              {tags.map((option) => <option key={option}>{option}</option>)}
            </select></label>
            <label>Montant min<input inputMode="numeric" value={advancedFilters.minPrice} onChange={(event) => updateAdvancedFilter("minPrice", event.target.value)} placeholder="Ex. 500000" /></label>
            <label>Montant max<input inputMode="numeric" value={advancedFilters.maxPrice} onChange={(event) => updateAdvancedFilter("maxPrice", event.target.value)} placeholder="Ex. 2000000" /></label>
            <label>Surface min<input inputMode="numeric" value={advancedFilters.minSurface} onChange={(event) => updateAdvancedFilter("minSurface", event.target.value)} placeholder="m²" /></label>
            <label>Pièces min<input inputMode="numeric" value={advancedFilters.minRooms} onChange={(event) => updateAdvancedFilter("minRooms", event.target.value)} placeholder="0" /></label>
            <label>Chambres min<input inputMode="numeric" value={advancedFilters.minBedrooms} onChange={(event) => updateAdvancedFilter("minBedrooms", event.target.value)} placeholder="0" /></label>
            <label>Salles d'eau min<input inputMode="numeric" value={advancedFilters.minBaths} onChange={(event) => updateAdvancedFilter("minBaths", event.target.value)} placeholder="0" /></label>
            <div className="advanced-filter-footer">
              <strong>{filteredProperties.length} bien{filteredProperties.length > 1 ? "s" : ""}</strong>
              <button onClick={resetAdvancedFilters}>Réinitialiser</button>
            </div>
          </div>
        )}
      </Panel>

      {display === "cartes" ? (
        <section className="property-grid" data-demo="property-grid">
          {filteredProperties.map((property) => (
            <PropertyCard property={property} onSelect={onSelect} key={property.code} />
          ))}
        </section>
      ) : (
        <Panel>
          <DataTable
            columns={["Photo", "Code", "Type", "Structure", "Quartier", "Propriétaire", "Locataire actuel", "Prix", "Statut", "Dernière action", "Action"]}
            rows={filteredProperties.map((property) => [
              <img className="table-thumb" src={property.image} alt="" />,
              property.code,
              property.type,
              getPropertyStructureSummary(property),
              property.district,
              property.owner,
              property.tenant,
              `${property.price} ${property.period}`,
              <Badge label={property.status} />,
              property.lastAction,
              <Button compact onClick={() => onSelect(property)}>
                <Eye size={16} /> Voir fiche
              </Button>,
            ])}
          />
        </Panel>
      )}
    </>
  );
}

function PropertyCard({ property, onSelect }) {
  const relationLabel = getPropertyRelationLabel(property);

  return (
    <article className="property-card" data-demo="property-card">
      <button className="property-image-button" onClick={() => onSelect(property)}>
        <img src={property.image} alt={property.name} />
        <Badge label={property.status} />
      </button>
      <div className="property-card-body">
        <div className="property-meta">
          <span className="property-code">{property.code}</span>
          <strong className="property-price">
            <span>{property.price}</span> <small>{property.period}</small>
          </strong>
        </div>
        <h3>{property.name}</h3>
        <p>
          <MapPin size={16} /> {property.district}
        </p>
        {relationLabel && <span className="relation-pill">{relationLabel}</span>}
        <div className="card-divider" />
        <div className="owner-line">
          <Avatar name={property.owner} />
          <span>{property.owner}</span>
          <button onClick={() => onSelect(property)}>Voir fiche</button>
        </div>
      </div>
    </article>
  );
}

function PropertyDetail({ property, activeTab, onTab, onBack, onOpenProperty, onAction, contractsList = contracts, paymentsList = paymentRecords, rentRowsList = rentRows, chargesList = charges, maintenancesList = maintenances, historyItems = [], propertyPdfArchives = [], visitsList = visits }) {
  const hasHierarchy = isBuildingProperty(property) || Boolean(property.parentCode);
  const tabs = ["Résumé", ...(hasHierarchy ? ["Lots & blocs"] : []), "Propriétaire", "Locataire", "Contrats", "Paiements", "Charges & entretiens", "Documents", "Historique"];
  const effectiveTab = tabs.includes(activeTab) ? activeTab : "Résumé";
  const relationLabel = getPropertyRelationLabel(property);
  const isArchived = property.archived || property.status === "Archivé";

  return (
    <>
      <article className="property-hero-card" data-demo="property-hero">
        <div className="property-hero-image">
          <img src={property.image} alt={property.name} />
          <div>
            <button className="pill" onClick={onBack}>
              <ArrowLeft size={16} /> Retour
            </button>
            <Badge label={property.status} />
          </div>
        </div>
        <div className="property-hero-copy">
          <div>
            <p className="muted-label">{property.code}</p>
            <h1>{property.name}</h1>
            <p>
              <MapPin size={18} /> {property.address}
            </p>
            <div className="property-hero-facts">
              <span>{property.type}</span>
              <span>{property.district}</span>
              <span>{getPropertyStructureSummary(property)}</span>
              <span>{property.financialMode}</span>
            </div>
            {relationLabel && <span className="relation-pill hero-relation">{relationLabel}</span>}
          </div>
          <div className="price-block">
            <strong>{property.price}</strong>
            <span>{property.period}</span>
            <small>Propriétaire : {property.owner}</small>
            {property.focalPoint && <small>Point focal : {property.focalPoint.name}</small>}
            <small>Locataire : {property.tenant}</small>
          </div>
        </div>
        <div className="action-row" data-demo="property-actions">
          <Button variant="primary" onClick={() => onAction("Modifier le bien")}>
            <Pencil size={17} /> Modifier
          </Button>
          <Button onClick={() => onAction("Planifier une visite")}>
            <CalendarDays size={17} /> Planifier visite
          </Button>
          <Button onClick={() => onAction("Ajouter locataire")}>
            <UsersRound size={17} /> Ajouter locataire
          </Button>
          <Button onClick={() => onAction("Créer contrat")}>
            <FileText size={17} /> Créer contrat
          </Button>
          {isAgencyCollectedProperty(property.name) ? (
            <Button onClick={() => onAction("Enregistrer paiement", { property })}>
              <Banknote size={17} /> Paiement
            </Button>
          ) : (
            <Button onClick={() => onAction("Enregistrer paiement", { property })}>
              <Banknote size={17} /> Paiement
            </Button>
          )}
          <Button onClick={() => onAction("Ajouter entretien", { property })}>
            <Wrench size={17} /> Ajouter entretien
          </Button>
          <Button onClick={() => onAction("Ajouter charge")}>
            <ReceiptText size={17} /> Ajouter charge
          </Button>
          <Button onClick={() => onAction("Générer document")}>
            <FileText size={17} /> Générer document
          </Button>
          <Button onClick={() => onAction("Fiche bien PDF", { property })}>
            <Download size={17} /> Fiche PDF
          </Button>
          <Button onClick={() => onAction("Archiver le bien", { property })} disabled={isArchived}>
            <Archive size={17} /> {isArchived ? "Archivé" : "Archiver"}
          </Button>
        </div>
      </article>

      <DetailMetrics
        items={[
          ["Loyer / prix", `${property.price} ${property.period}`],
          ["Statut", property.status],
          ["Contrat", contractsList.find((contract) => contract.property === property.name)?.status ?? "À créer"],
          ["Structure", getPropertyStructureSummary(property)],
          ["Dernier paiement", paymentsList.find((payment) => payment.property === property.name)?.paid ?? "N/A"],
          ["Prochaine action", property.lastAction],
          ["Documents", "8 pièces"],
        ]}
      />

      <Tabs tabs={tabs} active={effectiveTab} onChange={onTab} demo="property-detail-tabs" />
      {effectiveTab === "Résumé" && <PropertySummary property={property} onOpenProperty={onOpenProperty} visitsList={visitsList} />}
      {effectiveTab === "Lots & blocs" && <PropertyHierarchy property={property} onOpenProperty={onOpenProperty} />}
      {effectiveTab === "Propriétaire" && <PropertyOwner property={property} />}
      {effectiveTab === "Locataire" && <PropertyTenant property={property} />}
      {effectiveTab === "Contrats" && <PropertyContracts property={property} contractsList={contractsList} />}
      {effectiveTab === "Paiements" && <PropertyPayments property={property} rentRowsList={rentRowsList} />}
      {effectiveTab === "Charges & entretiens" && <PropertyMaintenance property={property} chargesList={chargesList} maintenancesList={maintenancesList} />}
      {effectiveTab === "Documents" && <PropertyDocuments property={property} onAction={onAction} propertyPdfArchives={propertyPdfArchives} />}
      {effectiveTab === "Historique" && <PropertyHistory property={property} historyItems={historyItems} />}
    </>
  );
}

function PropertySummary({ property, onOpenProperty, visitsList = visits }) {
  const children = getPropertyChildren(property);
  const parent = getPropertyParent(property);
  const propertyVisits = visitsList.filter((visit) => visit.property === property.name || visit.propertyCode === property.code);

  return (
    <section className="detail-grid">
      <div className="detail-main">
        <Panel title="Informations principales">
          <div className="info-grid">
            <Info label="Type" value={property.type} />
            <Info label="Quartier" value={property.district} />
            <Info label="Prix" value={`${property.price} ${property.period}`} />
            <Info label="Caution" value={property.deposit} />
            <Info label="Commission" value={property.commission} />
            <Info label="Statut" value={property.status} />
            <Info label="Occupation actuelle" value={property.tenant} />
            <Info label="Agent responsable" value="Aïssata Diarra" />
            <Info label="Surface" value={property.surface} />
            <Info label="Pièces" value={property.rooms} />
            <Info label="Chambres" value={property.bedrooms} />
            <Info label="Salles de bain" value={property.baths} />
            <Info label="Mode financier" value={property.financialMode} />
            <Info label="Structure" value={getPropertyStructureSummary(property)} />
            {property.block && <Info label="Bloc" value={property.block} />}
            {property.unitNumber && <Info label="Lot" value={property.unitNumber} />}
          </div>
          <div className="property-description">
            <p><strong>Description</strong><span>{property.type} situé à {property.district}, rattaché au portefeuille E.K immo.</span></p>
            <p><strong>Observations</strong><span>{property.lastAction}</span></p>
          </div>
          <div className="tag-row">
            {property.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          {property.financialMode.includes("direct") && (
            <div className="notice">
              Encaissement effectué directement par le propriétaire.
            </div>
          )}
          {isMaintenanceOnlyProperty(property) && property.serviceProvider && (
            <MaintenanceProviderCard provider={property.serviceProvider} compact />
          )}
          {parent && (
            <div className="linked-property-card">
              <img src={parent.image} alt="" />
              <div>
                <span>Immeuble parent</span>
                <strong>{parent.name}</strong>
                <small>{getPropertyStructureSummary(parent)}</small>
              </div>
              <Button compact onClick={() => onOpenProperty(parent)}><Eye size={15} /> Ouvrir</Button>
            </div>
          )}
          {children.length > 0 && (
            <div className="linked-lots-strip">
              {children.slice(0, 3).map((child) => (
                <button key={child.code} onClick={() => onOpenProperty(child)}>
                  <img src={child.image} alt="" />
                  <span>{child.unitNumber}</span>
                  <strong>{child.name}</strong>
                  <small>{child.status}</small>
                </button>
              ))}
            </div>
          )}
        </Panel>
        <Panel title="Localisation">
          <p className="panel-copy">{property.address}</p>
          <div className="map-card">
            <span />
          </div>
        </Panel>
        <Panel title="Visites liées">
          <DataTable
            columns={["Date", "Prospect", "Agent", "Statut", "Prochaine action"]}
            rows={(propertyVisits.length ? propertyVisits : [
              {
                date: "Aucune visite",
                time: "",
                client: "Aucune visite planifiée",
                agent: "E.K immo",
                status: "À planifier",
                next: "Planifier visite",
              },
            ]).map((visit) => [
              `${visit.date}${visit.time ? ` · ${visit.time}` : ""}`,
              visit.client,
              visit.agent,
              <Badge label={visit.status} />,
              visit.next,
            ])}
          />
        </Panel>
      </div>
      <aside className="detail-side">
        <Panel title="Statut & occupation" className="accent-top">
          <div className="status-card-line">
            <div className="round-icon">
              <KeyRound size={20} />
            </div>
            <span>
              <small>Statut actuel</small>
              <strong>{property.status}</strong>
            </span>
          </div>
          <div className="simple-list">
            <p>
              <span>Locataire en place</span>
              <strong>{property.tenant}</strong>
            </p>
            <p>
              <span>Dernière action</span>
              <strong>{property.lastAction}</strong>
            </p>
          </div>
        </Panel>
        <Panel title="Conditions financières">
          <div className="simple-list">
            <p>
              <span>Loyer mensuel</span>
              <strong>{property.price}</strong>
            </p>
            <p>
              <span>Dépôt de garantie</span>
              <strong>{property.deposit}</strong>
            </p>
            <p>
              <span>Commission agence</span>
              <strong>{property.commission}</strong>
            </p>
            <p>
              <span>Prochaine révision</span>
              <strong>01/01/2027</strong>
            </p>
          </div>
        </Panel>
        {isMaintenanceOnlyProperty(property) && property.serviceProvider && (
          <Panel title="Prestataire d'entretien" className="accent-top">
            <MaintenanceProviderCard provider={property.serviceProvider} />
          </Panel>
        )}
      </aside>
    </section>
  );
}

function MaintenanceProviderCard({ provider, compact = false }) {
  return (
    <article className={compact ? "provider-card compact" : "provider-card"}>
      <div className="provider-card-head">
        <div className="round-icon">
          <Wrench size={20} />
        </div>
        <div>
          <span>Prestataire mandaté</span>
          <strong>{provider.company}</strong>
          <small>{provider.contract}</small>
        </div>
      </div>
      <div className="provider-list">
        <p><span>Référent</span><strong>{provider.contact}</strong><small>{provider.role}</small></p>
        <p><span>Téléphone</span><strong>{provider.phone}</strong></p>
        <p><span>Email</span><strong>{provider.email}</strong></p>
        <p><span>Zone couverte</span><strong>{provider.zone}</strong></p>
        <p><span>Délai</span><strong>{provider.responseTime}</strong></p>
        <p><span>Dernière intervention</span><strong>{provider.lastVisit}</strong></p>
      </div>
      <div className="tag-row provider-tags">
        {provider.specialties.map((specialty) => (
          <span key={specialty}>{specialty}</span>
        ))}
      </div>
    </article>
  );
}

function PropertyHierarchy({ property, onOpenProperty }) {
  const children = getPropertyChildren(property);
  const parent = getPropertyParent(property);
  const siblings = parent ? getPropertyChildren(parent) : [];

  if (isBuildingProperty(property)) {
    return (
      <section className="detail-grid">
        <div className="detail-main">
          <Panel title="Structure de l'immeuble">
            <div className="building-illustration">
              <img src={property.image} alt="" />
              <div className="building-blocks">
                {property.structure.blocks.map((block) => (
                  <article key={block.name}>
                    <strong>{block.name}</strong>
                    <span>{block.floors} niveaux</span>
                    <small>{block.units} appartements · {block.available} libre{block.available > 1 ? "s" : ""}</small>
                    <div className="unit-dots" aria-hidden="true">
                      {Array.from({ length: block.units }).map((_, index) => (
                        <i className={index < block.available ? "available" : ""} key={index} />
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>
            <DataTable
              columns={["Lot", "Appartement", "Bloc", "Étage", "Occupant", "Flux", "Statut", "Action"]}
              rows={children.map((child) => [
                child.unitNumber,
                child.name,
                child.block,
                child.floor,
                child.tenant,
                `${child.price} ${child.period}`,
                <Badge label={child.status} />,
                <Button compact onClick={() => onOpenProperty(child)}><Eye size={15} /> Fiche lot</Button>,
              ])}
            />
          </Panel>
        </div>
        <aside className="detail-side">
          <Panel title="Lecture rapide" className="accent-top">
            <div className="simple-list">
              <p><span>Immeuble</span><strong>{property.name}</strong></p>
              <p><span>Adresse</span><strong>{property.address}</strong></p>
              <p><span>Lots rattachés</span><strong>{children.length}</strong></p>
              <p><span>Point focal</span><strong>{property.focalPoint?.name ?? "Propriétaire"}</strong></p>
              <p><span>Mode financier</span><strong>{property.financialMode}</strong></p>
            </div>
          </Panel>
        </aside>
      </section>
    );
  }

  return (
    <section className="detail-grid">
      <div className="detail-main">
        <Panel title="Rattachement de l'appartement">
          {parent && (
            <div className="linked-property-card large">
              <img src={parent.image} alt="" />
              <div>
                <span>Immeuble parent</span>
                <strong>{parent.name}</strong>
                <small>{parent.address}</small>
              </div>
              <Button compact onClick={() => onOpenProperty(parent)}><Eye size={15} /> Ouvrir l'immeuble</Button>
            </div>
          )}
          <div className="info-grid">
            <Info label="Bloc" value={property.block ?? "-"} />
            <Info label="Étage" value={property.floor ?? "-"} />
            <Info label="Lot" value={property.unitNumber ?? "-"} />
            <Info label="Fiche indépendante" value={property.code} />
            <Info label="Occupant" value={property.tenant} />
            <Info label="Flux financier" value={`${property.price} ${property.period}`} />
          </div>
        </Panel>
      </div>
      <aside className="detail-side">
        <Panel title="Autres lots du même immeuble">
          <div className="mini-list">
            {(siblings.length ? siblings : [property]).map((sibling) => (
              <button className="mini-action-row" key={sibling.code} onClick={() => onOpenProperty(sibling)}>
                <span>{sibling.unitNumber ?? sibling.code} · {sibling.name}</span>
                <Badge label={sibling.status} />
              </button>
            ))}
          </div>
        </Panel>
      </aside>
    </section>
  );
}

function PropertyOwner({ property }) {
  const owner = owners.find((item) => item.name === property.owner) ?? owners[0];
  return (
    <section className="detail-grid">
      <Panel title="Fiche propriétaire" className="detail-main">
        <ProfileHeader person={owner} />
        <div className="info-grid">
          <Info label="Téléphone" value={owner.phone} />
          <Info label="Email" value={owner.email} />
          <Info label="Nombre de biens" value={owner.properties} />
          <Info label="Loyers encaissés" value={owner.rent} />
          <Info label="Charges déduites" value={owner.charges} />
          <Info label="Commissions" value={owner.commission} />
          <Info label="Solde à reverser" value={owner.balance} />
          <Info label="Dernier reversement" value={owner.lastPayment} />
          <Info label="Conditions de gestion" value={property.financialMode} />
          <Info label="Commission applicable" value={property.commission} />
          <Info label="Point focal" value={property.focalPoint ? `${property.focalPoint.name} · ${property.focalPoint.role}` : "Identique au propriétaire"} />
        </div>
        {property.focalPoint && (
          <div className="simple-list">
            <p><span>Contact point focal</span><strong>{property.focalPoint.phone}</strong></p>
            <p><span>Email point focal</span><strong>{property.focalPoint.email}</strong></p>
          </div>
        )}
      </Panel>
      <Panel title="Autres biens du propriétaire" className="detail-side">
        <div className="mini-list">
          {properties
            .filter((item) => item.owner === owner.name)
            .concat(properties.slice(1, 3))
            .slice(0, 4)
            .map((item) => (
              <p key={item.code}>
                <span>{item.name}</span>
                <Badge label={item.status} />
              </p>
            ))}
        </div>
      </Panel>
    </section>
  );
}

function PropertyTenant({ property }) {
  const tenant = property.attachedTenant ?? tenants.find((item) => property.tenant.includes(item.name)) ?? tenants[0];
  return (
    <section className="detail-grid">
      <Panel title="Locataire actuel" className="detail-main">
        <ProfileHeader person={tenant} />
        <div className="info-grid">
          <Info label="Téléphone" value={tenant.phone} />
          <Info label="Email" value={tenant.email} />
          <Info label="Bien occupé" value={property.name} />
          <Info label="Contrat rattaché" value={tenant.contract} />
          <Info label="Montant du loyer" value={tenant.rent} />
          <Info label="Caution" value={tenant.deposit} />
          <Info label="Situation de paiement" value={tenant.paymentStatus} />
          <Info label="Date d'entrée" value={tenant.entryDate ?? "01/01/2026"} />
        </div>
      </Panel>
      <Panel title="Relances & documents" className="detail-side">
        <div className="timeline">
          <p>
            <strong>Reçu mai généré</strong>
            <span>05/05/2026</span>
          </p>
          <p>
            <strong>Relance SMS envoyée</strong>
            <span>12/05/2026</span>
          </p>
          <p>
            <strong>Contrat actif vérifié</strong>
            <span>20/05/2026</span>
          </p>
        </div>
      </Panel>
    </section>
  );
}

function PropertyContracts({ property, contractsList = contracts }) {
  const relatedContracts = contractsList.filter((contract) => contract.property === property.name || contract.owner === property.owner);

  return (
    <Panel title="Contrats liés au bien">
      <DataTable
        columns={["Numéro", "Type", "Début", "Fin", "Statut", "Document joint", "Actions"]}
        rows={(relatedContracts.length ? relatedContracts : contracts.filter((contract) => contract.property === property.name || contract.owner === property.owner))
          .map((contract) => [
            contract.number,
            contract.type,
            contract.start,
            contract.end,
            <Badge label={contract.status} />,
            contract.generated ? "Contrat généré" : "PDF signé",
            <div className="table-actions">
              <Button compact><Eye size={16} /> Voir</Button>
              <Button compact><RefreshCw size={15} /> Renouveler</Button>
              <Button compact><Archive size={15} /> Archiver</Button>
            </div>,
          ])}
      />
    </Panel>
  );
}

function PropertyPayments({ property, rentRowsList = rentRows }) {
  if (!isAgencyCollectedProperty(property.name)) {
    return (
      <Panel title="Paiements liés au bien">
        <div className="notice">
          Ce bien est en encaissement direct par le propriétaire. Aucun paiement agence ne peut être enregistré.
        </div>
      </Panel>
    );
  }

  return (
    <Panel title="Paiements liés au bien">
      <DataTable
        columns={["Période", "Locataire", "Montant attendu", "Montant payé", "Solde", "Statut"]}
        rows={rentRowsList
          .filter((row) => isAgencyCollectedProperty(row.property))
          .filter((row) => row.property === property.name || row.owner === property.owner)
          .map((row) => [row.period, row.tenant, row.expected, row.paid, row.balance, <Badge label={row.status} />])}
      />
    </Panel>
  );
}

function PropertyMaintenance({ property, chargesList = charges, maintenancesList = maintenances }) {
  const propertyCharges = chargesList.filter((item) => item.property === property.name);
  const propertyMaintenances = maintenancesList.filter((item) => item.property === property.name);
  const rows = [
    ...propertyCharges.map((item) => ({
      date: item.date,
      type: item.type,
      manager: item.owner,
      amount: item.amount,
      payer: item.payer,
      proof: item.proof,
      status: item.status,
      kind: "Charge",
    })),
    ...propertyMaintenances.map((item) => ({
      date: item.date,
      type: item.type,
      manager: item.manager,
      amount: item.cost,
      payer: item.payer,
      proof: item.proof ?? "Justificatif à joindre",
      status: item.status,
      kind: "Entretien",
    })),
  ];

  return (
    <section className="maintenance-detail-stack">
      {isMaintenanceOnlyProperty(property) && property.serviceProvider && (
        <Panel title="Prestataire mandaté pour ce bien">
          <MaintenanceProviderCard provider={property.serviceProvider} />
        </Panel>
      )}
      <Panel title="Charges & entretiens">
        <DataTable
          columns={["Date", "Nature", "Type", "Responsable", "Montant", "Prise en charge", "Justificatif", "Statut"]}
          rows={(rows.length ? rows : [
            {
              date: "À planifier",
              kind: "Entretien",
              type: "Aucun élément ouvert",
              manager: "E.K immo",
              amount: "0 FCFA",
              payer: "-",
              proof: "-",
              status: "À prévoir",
            },
          ]).map((item) => [item.date, item.kind, item.type, item.manager, item.amount, item.payer, item.proof, <Badge label={item.status} />])}
        />
      </Panel>
    </section>
  );
}

function PropertyDocuments({ property, onAction, propertyPdfArchives = [] }) {
  const pdfRows = propertyPdfArchives
    .filter((archive) => archive.property === property.name)
    .map((archive) => [archive.title, "Fiche PDF", archive.date, <Badge label={archive.status} />, <DocumentActions />]);

  return (
    <Panel title={`Documents - ${property.code}`} toolbar={<Button compact onClick={() => onAction("Importer document")}><Upload size={16} /> Importer</Button>}>
      <DataTable
        columns={["Document", "Type", "Date", "Statut", "Actions"]}
        rows={[
          ...pdfRows,
          ["Contrat de location signé", "Contrat", "01/01/2026", <Badge label="Archivé" />, <DocumentActions />],
          ["Titre foncier scanné", "Titre", "14/03/2026", <Badge label="Archivé" />, <DocumentActions />],
          ["Facture entretien jardin", "Facture", "05/05/2026", <Badge label="Généré" />, <DocumentActions />],
          ["Reçu loyer mai", "Reçu", "06/05/2026", <Badge label="Imprimé" />, <DocumentActions />],
        ]}
      />
    </Panel>
  );
}

function PropertyHistory({ property, historyItems = [] }) {
  const customHistory = [...historyItems, ...(property.history ?? [])];
  return (
    <Panel title={`Historique - ${property.name}`}>
      <div className="timeline">
        {[
          ...customHistory,
          ["Bien créé", "Dossier ouvert par Aïssata Diarra", "12/02/2026"],
          ["Statut modifié", `Passage en statut ${property.status}`, "18/03/2026"],
          ["Document généré", "Mandat de gestion exporté en PDF", "20/03/2026"],
          ["Paiement enregistré", "Loyer mai rapproché avec reçu", "06/05/2026"],
          ["Entretien planifié", "Intervention technique ajoutée", "25/05/2026"],
        ].map(([title, text, date]) => (
          <p key={title + date}>
            <strong>{title}</strong>
            <span>{text} · {date}</span>
          </p>
        ))}
      </div>
    </Panel>
  );
}

function ClientsPage({ activeTab, onTab, selectedOwner, onOwner, ownersList = owners, selectedTenant, onTenant, tenantsList = tenants, prospectsList = prospects, prospectProposals = {}, prospectActivities = {}, prospectConversions = {}, visitsList = visits, visitHistories = {}, detailRequest = null, tenantRelances = [], tenantReceiptArchives = [], onAction, contractsList = contracts, paymentsList = paymentRecords, rentRowsList = rentRows, reversalsList = reversals }) {
  const tabs = ["Propriétaires", "Locataires", "Prospects", "Visites"];
  const [detailView, setDetailView] = useState(null);
  const [selectedProspect, setSelectedProspect] = useState(prospects[0]);
  const [selectedVisit, setSelectedVisit] = useState(visits[0]);
  const [savedScroll, setSavedScroll] = useState(0);
  const [clientSearch, setClientSearch] = useState("");
  const [clientFilterOpen, setClientFilterOpen] = useState(false);
  const [clientExportOpen, setClientExportOpen] = useState(false);
  const [clientFilters, setClientFilters] = useState({
    ownerStatus: "Tous statuts",
    ownerType: "Tous types",
    tenantStatus: "Tous statuts",
    tenantProperty: "Tous biens",
    prospectStatus: "Tous statuts",
    prospectAgent: "Tous agents",
    visitPeriod: "Toutes périodes",
    visitStatus: "Tous statuts",
    visitAgent: "Tous agents",
    visitProperty: "Tous biens",
    visitProspect: "Tous prospects",
    visitQuick: "Toutes visites",
  });
  const actionByTab = {
    "Propriétaires": ["Nouveau propriétaire", "Nouveau propriétaire"],
    Locataires: ["Nouveau locataire", "Nouveau locataire"],
    Prospects: ["Nouveau prospect", "Nouveau prospect"],
    Visites: ["Planifier visite", "Planifier visite"],
  };
  const [actionLabel, actionTitle] = actionByTab[activeTab] ?? ["Nouveau client", "Nouveau client"];

  useEffect(() => {
    setDetailView(null);
    setClientSearch("");
    setClientFilterOpen(false);
    setClientExportOpen(false);
  }, [activeTab]);

  useEffect(() => {
    if (!detailRequest) return;
    if (detailRequest.type === "owner") {
      const owner = ownersList.find((item) => item.id === detailRequest.key) ?? selectedOwner;
      onOwner(owner);
      setDetailView("owner");
    }
    if (detailRequest.type === "tenant") {
      const tenant = tenantsList.find((item) => item.id === detailRequest.key) ?? selectedTenant;
      onTenant(tenant);
      setDetailView("tenant");
    }
  }, [detailRequest, onOwner, onTenant, ownersList, selectedOwner, selectedTenant, tenantsList]);

  const updateClientFilter = (key, value) => {
    setClientFilters((current) => ({ ...current, [key]: value }));
  };

  const resetClientFilters = () => {
    setClientFilters({
      ownerStatus: "Tous statuts",
      ownerType: "Tous types",
      tenantStatus: "Tous statuts",
      tenantProperty: "Tous biens",
      prospectStatus: "Tous statuts",
      prospectAgent: "Tous agents",
      visitPeriod: "Toutes périodes",
      visitStatus: "Tous statuts",
      visitAgent: "Tous agents",
      visitProperty: "Tous biens",
      visitProspect: "Tous prospects",
      visitQuick: "Toutes visites",
    });
    setClientSearch("");
  };

  const filteredOwners = useMemo(() => {
    const search = normalizeSearch(clientSearch);
    return ownersList.filter((owner) => {
      const haystack = normalizeSearch(`${owner.name} ${owner.phone} ${owner.email} ${owner.status} ${owner.type ?? ""}`);
      const statusMatch = clientFilters.ownerStatus === "Tous statuts" || owner.status === clientFilters.ownerStatus;
      const typeMatch = clientFilters.ownerType === "Tous types" || (owner.type ?? "Personne physique") === clientFilters.ownerType;
      return (!search || haystack.includes(search)) && statusMatch && typeMatch;
    });
  }, [clientFilters.ownerStatus, clientFilters.ownerType, clientSearch, ownersList]);

  const filteredTenants = useMemo(() => {
    const search = normalizeSearch(clientSearch);
    return tenantsList.filter((tenant) => {
      const haystack = normalizeSearch(`${tenant.name} ${tenant.phone} ${tenant.email} ${tenant.property} ${tenant.contract} ${tenant.paymentStatus}`);
      const statusMatch = clientFilters.tenantStatus === "Tous statuts" || tenant.paymentStatus === clientFilters.tenantStatus;
      const propertyMatch = clientFilters.tenantProperty === "Tous biens" || tenant.property === clientFilters.tenantProperty;
      return (!search || haystack.includes(search)) && statusMatch && propertyMatch;
    });
  }, [clientFilters.tenantProperty, clientFilters.tenantStatus, clientSearch, tenantsList]);

  const filteredProspects = useMemo(() => {
    const search = normalizeSearch(clientSearch);
    return prospectsList.filter((prospect) => {
      const haystack = normalizeSearch(`${prospect.name} ${prospect.phone} ${prospect.need} ${prospect.district} ${prospect.agent} ${prospect.status} ${prospect.next}`);
      const statusMatch = clientFilters.prospectStatus === "Tous statuts" || prospect.status === clientFilters.prospectStatus;
      const agentMatch = clientFilters.prospectAgent === "Tous agents" || prospect.agent === clientFilters.prospectAgent;
      return (!search || haystack.includes(search)) && statusMatch && agentMatch;
    });
  }, [clientFilters.prospectAgent, clientFilters.prospectStatus, clientSearch, prospectsList]);

  const filteredVisits = useMemo(() => {
    const search = normalizeSearch(clientSearch);
    return visitsList.filter((visit) => {
      const property = properties.find((item) => item.name === visit.property);
      const haystack = normalizeSearch(`${visit.client} ${visit.property} ${property?.district ?? ""} ${visit.agent} ${visit.status} ${visit.feedback} ${visit.next}`);
      const searchMatch = !search || haystack.includes(search);
      const periodMatch = visitMatchesPeriod(visit, clientFilters.visitPeriod);
      const statusMatch = clientFilters.visitStatus === "Tous statuts" || visit.status === clientFilters.visitStatus;
      const agentMatch = clientFilters.visitAgent === "Tous agents" || visit.agent === clientFilters.visitAgent;
      const propertyMatch = clientFilters.visitProperty === "Tous biens" || visit.property === clientFilters.visitProperty;
      const prospectMatch = clientFilters.visitProspect === "Tous prospects" || visit.client === clientFilters.visitProspect;
      const quickMatch = visitMatchesQuickFilter(visit, clientFilters.visitQuick);
      return searchMatch && periodMatch && statusMatch && agentMatch && propertyMatch && prospectMatch && quickMatch;
    });
  }, [clientFilters, clientSearch, visitsList]);

  const openDetail = (type, item) => {
    setSavedScroll(window.scrollY);
    if (type === "owner") onOwner(item);
    if (type === "tenant") onTenant(item);
    if (type === "prospect") setSelectedProspect(item);
    if (type === "visit") setSelectedVisit(item);
    setDetailView(type);
  };

  const closeDetail = () => {
    setDetailView(null);
    window.setTimeout(() => window.scrollTo({ top: savedScroll, behavior: "auto" }), 0);
  };

  const currentSelectedVisit = visitsList.find((visit) => getVisitKey(visit) === getVisitKey(selectedVisit)) ?? selectedVisit;

  const detailContent = detailView === "owner" ? (
    <DetailPageShell title="Fiche propriétaire" subtitle={selectedOwner.name} onBack={closeDetail}>
      <OwnerProfilePanel owner={selectedOwner} onAction={onAction} contractsList={contractsList} paymentsList={paymentsList} reversalsList={reversalsList} />
    </DetailPageShell>
  ) : detailView === "tenant" ? (
    <DetailPageShell title="Fiche locataire" subtitle={selectedTenant.name} onBack={closeDetail}>
      <TenantProfilePanel tenant={selectedTenant} onAction={onAction} contractsList={contractsList} paymentsList={paymentsList} rentRowsList={rentRowsList} relancesList={tenantRelances} archivedReceipts={tenantReceiptArchives} />
    </DetailPageShell>
  ) : detailView === "prospect" ? (
    <DetailPageShell title="Fiche prospect" subtitle={selectedProspect.name} onBack={closeDetail}>
      <ProspectProfilePanel
        prospect={prospectsList.find((item) => getProspectKey(item) === getProspectKey(selectedProspect)) ?? selectedProspect}
        proposals={prospectProposals[getProspectKey(selectedProspect)]}
        activities={prospectActivities[getProspectKey(selectedProspect)]}
        conversion={prospectConversions[getProspectKey(selectedProspect)]}
        visitsList={visitsList}
        onAction={onAction}
      />
    </DetailPageShell>
  ) : detailView === "visit" ? (
    <DetailPageShell title="Fiche visite" subtitle={`${currentSelectedVisit.client} · ${currentSelectedVisit.property}`} onBack={closeDetail}>
      <VisitProfilePanel visit={currentSelectedVisit} histories={visitHistories[getVisitKey(currentSelectedVisit)] ?? []} onAction={onAction} />
    </DetailPageShell>
  ) : null;

  return (
    <>
      <PageIntro
        title="Gestion des Clients"
        actions={
          <Button variant="primary" onClick={() => onAction(actionTitle)}>
            <Plus size={18} /> {actionLabel}
          </Button>
        }
      />
      <Tabs tabs={tabs} active={activeTab} onChange={onTab} demo="client-tabs" />
      {detailContent ?? (
        <>
      <Panel className="filter-panel">
        <div className="filters-row">
          <label className="field search-field mid">
            <Search size={19} />
            <input
              placeholder={`Rechercher dans ${activeTab.toLowerCase()}...`}
              value={clientSearch}
              onChange={(event) => setClientSearch(event.target.value)}
            />
          </label>
          <span className="spacer" />
          <div className="inline-menu-wrap">
            <Button onClick={() => setClientFilterOpen((value) => !value)}>
              <Filter size={17} /> Filtres
            </Button>
          </div>
          <div className="inline-menu-wrap">
            <Button onClick={() => setClientExportOpen((value) => !value)}>
              <Download size={17} /> Exporter
            </Button>
            {clientExportOpen && <ClientExportMenu activeTab={activeTab} onAction={onAction} onClose={() => setClientExportOpen(false)} />}
          </div>
        </div>
        {clientFilterOpen && (
          <ClientFilterControls
            activeTab={activeTab}
            filters={clientFilters}
            onChange={updateClientFilter}
            onReset={resetClientFilters}
            ownersList={ownersList}
            tenantsList={tenantsList}
            prospectsList={prospectsList}
            visitsList={visitsList}
          />
        )}
      </Panel>
      {activeTab === "Propriétaires" && <OwnersView ownersList={filteredOwners} selected={selectedOwner} onOpenDetail={(owner) => openDetail("owner", owner)} />}
      {activeTab === "Locataires" && <TenantsView tenantsList={filteredTenants} onOpenDetail={(tenant) => openDetail("tenant", tenant)} rentRowsList={rentRowsList} />}
      {activeTab === "Prospects" && <ProspectsView prospectsList={filteredProspects} onOpenDetail={(prospect) => openDetail("prospect", prospect)} onAction={onAction} />}
      {activeTab === "Visites" && <VisitsView visitsList={filteredVisits} onOpenDetail={(visit) => openDetail("visit", visit)} onAction={onAction} />}
        </>
      )}
    </>
  );
}

function DetailPageShell({ title, subtitle, onBack, children }) {
  return (
    <section className="client-detail-shell">
      <div className="detail-return-bar">
        <Button onClick={onBack}><ArrowLeft size={17} /> Retour à la liste</Button>
        <div>
          <span>{title}</span>
          <strong>{subtitle}</strong>
        </div>
      </div>
      {children}
    </section>
  );
}

function ClientFilterControls({ activeTab, filters, onChange, onReset, ownersList, tenantsList, prospectsList, visitsList }) {
  const ownerStatuses = uniqueValues(ownersList.map((owner) => owner.status));
  const tenantStatuses = uniqueValues(tenantsList.map((tenant) => tenant.paymentStatus));
  const tenantProperties = uniqueValues(tenantsList.map((tenant) => tenant.property));
  const prospectStatuses = uniqueValues(prospectsList.map((prospect) => prospect.status));
  const prospectAgents = uniqueValues(prospectsList.map((prospect) => prospect.agent));
  const visitStatuses = uniqueValues(visitsList.map((visit) => visit.status));
  const visitAgents = uniqueValues(visitsList.map((visit) => visit.agent));
  const visitProperties = uniqueValues(visitsList.map((visit) => visit.property));
  const visitProspects = uniqueValues(visitsList.map((visit) => visit.client));

  return (
    <div className="advanced-filters client-advanced-filters">
      {activeTab === "Propriétaires" && (
        <>
          <label>Statut<select value={filters.ownerStatus} onChange={(event) => onChange("ownerStatus", event.target.value)}>
            <option>Tous statuts</option>
            {ownerStatuses.map((option) => <option key={option}>{option}</option>)}
          </select></label>
          <label>Type<select value={filters.ownerType} onChange={(event) => onChange("ownerType", event.target.value)}>
            <option>Tous types</option>
            <option>Personne physique</option>
            <option>Société</option>
          </select></label>
        </>
      )}
      {activeTab === "Locataires" && (
        <>
          <label>Statut<select value={filters.tenantStatus} onChange={(event) => onChange("tenantStatus", event.target.value)}>
            <option>Tous statuts</option>
            {tenantStatuses.map((option) => <option key={option}>{option}</option>)}
          </select></label>
          <label>Bien<select value={filters.tenantProperty} onChange={(event) => onChange("tenantProperty", event.target.value)}>
            <option>Tous biens</option>
            {tenantProperties.map((option) => <option key={option}>{option}</option>)}
          </select></label>
        </>
      )}
      {activeTab === "Prospects" && (
        <>
          <label>Statut<select value={filters.prospectStatus} onChange={(event) => onChange("prospectStatus", event.target.value)}>
            <option>Tous statuts</option>
            {prospectStatuses.map((option) => <option key={option}>{option}</option>)}
          </select></label>
          <label>Agent<select value={filters.prospectAgent} onChange={(event) => onChange("prospectAgent", event.target.value)}>
            <option>Tous agents</option>
            {prospectAgents.map((option) => <option key={option}>{option}</option>)}
          </select></label>
        </>
      )}
      {activeTab === "Visites" && (
        <>
          <label>Période<select value={filters.visitPeriod} onChange={(event) => onChange("visitPeriod", event.target.value)}>
            <option>Toutes périodes</option>
            <option>Aujourd'hui</option>
            <option>Cette semaine</option>
            <option>Ce mois</option>
            <option>Mois prochain</option>
          </select></label>
          <label>Statut<select value={filters.visitStatus} onChange={(event) => onChange("visitStatus", event.target.value)}>
            <option>Tous statuts</option>
            {visitStatuses.map((option) => <option key={option}>{option}</option>)}
          </select></label>
          <label>Agent<select value={filters.visitAgent} onChange={(event) => onChange("visitAgent", event.target.value)}>
            <option>Tous agents</option>
            {visitAgents.map((option) => <option key={option}>{option}</option>)}
          </select></label>
          <label>Bien<select value={filters.visitProperty} onChange={(event) => onChange("visitProperty", event.target.value)}>
            <option>Tous biens</option>
            {visitProperties.map((option) => <option key={option}>{option}</option>)}
          </select></label>
          <label>Prospect<select value={filters.visitProspect} onChange={(event) => onChange("visitProspect", event.target.value)}>
            <option>Tous prospects</option>
            {visitProspects.map((option) => <option key={option}>{option}</option>)}
          </select></label>
          <div className="quick-filter-row visit-quick-filters" role="group" aria-label="Filtres rapides visites">
            {["Toutes visites", "Visites du jour", "Visites reportées", "Visites annulées", "Visites conclues"].map((option) => (
              <button
                className={filters.visitQuick === option ? "active" : ""}
                key={option}
                onClick={() => onChange("visitQuick", option)}
                type="button"
              >
                {option}
              </button>
            ))}
          </div>
        </>
      )}
      <Button compact onClick={onReset}>Réinitialiser</Button>
    </div>
  );
}

function ClientExportMenu({ activeTab, onAction, onClose }) {
  const isVisits = activeTab === "Visites";
  const options = isVisits
    ? ["Export Excel visites", "Export PDF visites", "Imprimer planning des visites"]
    : [`Export Excel ${activeTab}`, `Export PDF ${activeTab}`, `Imprimer liste ${activeTab}`];

  return (
    <div className="inline-action-menu">
      {options.map((option) => (
        <button key={option} onClick={() => {
          onAction(option);
          onClose();
        }}>
          {option.includes("PDF") ? <FileText size={16} /> : option.includes("Imprimer") ? <Printer size={16} /> : <Download size={16} />}
          <span>{option.replace(/^Export /, "Export ")}</span>
        </button>
      ))}
    </div>
  );
}

function useDetailNavigation() {
  const [detailOpen, setDetailOpen] = useState(false);
  const [savedScroll, setSavedScroll] = useState(0);

  const openDetail = () => {
    setSavedScroll(window.scrollY);
    setDetailOpen(true);
  };

  const closeDetail = () => {
    setDetailOpen(false);
    window.setTimeout(() => window.scrollTo({ top: savedScroll, behavior: "auto" }), 0);
  };

  return { detailOpen, openDetail, closeDetail };
}

function OwnersView({ ownersList = owners, selected, onOpenDetail }) {
  return (
    <section className="client-list-workspace" data-demo="owner-workspace">
      <Panel title="Liste des propriétaires" toolbar={<span className="muted">{120 + ownersList.length} propriétaires</span>}>
        <div className="owner-list">
          <div className="owner-list-header" aria-hidden="true">
            <span />
            <span>Propriétaire</span>
            <span>Contact</span>
            <span>Biens</span>
            <span>Solde</span>
            <span>Statut</span>
          </div>
          {ownersList.map((owner) => (
            <button
              className={selected.id === owner.id ? "owner-row active" : "owner-row"}
              key={owner.id}
              onClick={() => onOpenDetail(owner)}
            >
              <Avatar name={owner.name} image={owner.avatar} initials={owner.initials} />
              <span>
                <strong>{owner.name}</strong>
                <small>ID: {owner.id}</small>
              </span>
              <span className="contact-cell">
                <small><Mail size={14} /> {owner.email}</small>
                <small><Phone size={14} /> {owner.phone}</small>
              </span>
              <b>{owner.properties}</b>
              <strong>{owner.balance}</strong>
              <Badge label={owner.status} />
            </button>
          ))}
        </div>
      </Panel>
    </section>
  );
}

function OwnerProfilePanel({ owner, onAction, contractsList = contracts, paymentsList = paymentRecords, reversalsList = reversals }) {
  const [tab, setTab] = useState("Résumé");
  const ownedProperties = properties.filter((property) => property.owner === owner.name);
  const ownerCharges = charges.filter((charge) => charge.owner === owner.name);
  const ownerReversals = reversalsList.filter((reversal) => reversal.owner === owner.name);
  const ownerContracts = contractsList.filter((contract) => contract.owner === owner.name);
  const ownerPayments = paymentsList.filter((payment) => payment.owner === owner.name);
  const collectedForOwner = ownerPayments.reduce((sum, payment) => sum + parseFCFA(payment.paid), 0);
  const lastOwnerPayment = ownerPayments[0];
  const tabs = ["Résumé", "Biens", "Situation financière", "Charges", "Reversements", "Documents", "Historique"];

  return (
    <Panel title="Fiche propriétaire" className="profile-panel">
      <ProfileHeader person={owner} />
      <DetailMetrics
        items={[
          ["Biens confiés", owner.properties],
          ["Loyers encaissés", ownerPayments.length ? formatFCFA(collectedForOwner) : owner.rent],
          ["Charges", owner.charges],
          ["Commissions", owner.commission],
          ["Solde à reverser", owner.balance],
        ]}
      />
      <MiniTabs tabs={tabs} active={tab} onChange={setTab} />
      {tab === "Résumé" && (
        <>
          <div className="simple-list">
            <p><span>Type</span><strong>{owner.type ?? "Personne physique"}</strong></p>
            <p><span>Téléphone</span><strong>{owner.phone}</strong></p>
            <p><span>Email</span><strong>{owner.email}</strong></p>
            <p><span>Adresse</span><strong>{owner.address ?? "Adresse à compléter"}</strong></p>
            <p><span>Nombre de biens</span><strong>{owner.properties}</strong></p>
            <p><span>Conditions de gestion</span><strong>{owner.mandateType ?? "Mandat actif"}</strong></p>
            <p><span>Commission</span><strong>{owner.commission}</strong></p>
            <p><span>Reversement</span><strong>{owner.reversementMode ? `${owner.reversementMode} · ${owner.reversementPeriod}` : "Mensuel"}</strong></p>
            {owner.focalPoint && <p><span>Point focal</span><strong>{owner.focalPoint}</strong></p>}
            <p><span>Solde à reverser</span><strong>{owner.balance}</strong></p>
          </div>
          <div className="document-pills">
            {(owner.documents ?? ["Pièce d'identité", "Mandat", "RIB"]).map((document) => <span key={document}>{document}</span>)}
          </div>
        </>
      )}
      {tab === "Biens" && (
        <DataTable
          columns={["Code", "Type", "Quartier", "Statut", "Locataire", "Loyer", "Action"]}
          rows={(ownedProperties.length ? ownedProperties : properties.slice(0, 2)).map((property) => [
            property.code,
            property.type,
            property.district,
            <Badge label={property.status} />,
            property.tenant,
            `${property.price} ${property.period}`,
            <Button compact onClick={() => onAction(`Voir ${property.code}`)}><Eye size={15} /> Voir</Button>,
          ])}
        />
      )}
      {tab === "Situation financière" && (
        <div className="simple-list">
          <p><span>Loyers encaissés pour son compte</span><strong>{ownerPayments.length ? formatFCFA(collectedForOwner) : owner.rent}</strong></p>
          <p><span>Commissions retenues</span><strong>{owner.commission}</strong></p>
          <p><span>Charges déduites</span><strong>{owner.charges}</strong></p>
          <p><span>Reversements effectués</span><strong>{owner.lastPayment}</strong></p>
          <p><span>Solde restant à reverser</span><strong>{owner.balance}</strong></p>
          <p><span>Dernier paiement agence</span><strong>{lastOwnerPayment ? `${lastOwnerPayment.paid} · ${lastOwnerPayment.tenant}` : "Aucun nouveau paiement"}</strong></p>
        </div>
      )}
      {tab === "Charges" && (
        <DataTable
          columns={["Date", "Type", "Bien", "Montant", "Prise en charge", "Statut"]}
          rows={(ownerCharges.length ? ownerCharges : charges.slice(0, 2)).map((charge) => [
            charge.date,
            charge.type,
            charge.property,
            charge.amount,
            charge.payer,
            <Badge label={charge.status} />,
          ])}
        />
      )}
      {tab === "Reversements" && (
        <DataTable
          columns={["Propriétaire", "Loyers", "Commission", "Charges", "Payé", "Solde", "Statut"]}
          rows={(ownerReversals.length ? ownerReversals : reversalsList.slice(0, 2)).map((row) => [
            row.owner,
            row.collected,
            row.commission,
            row.charges,
            row.paid,
            row.balance,
            <Badge label={row.status} />,
          ])}
        />
      )}
      {tab === "Documents" && (
        <div className="mini-list">
          {ownerContracts.map((contract) => (
            <p key={contract.number}><span>{contract.number} · {contract.property}</span><Badge label={contract.status} /></p>
          ))}
          {["Pièce d'identité", "Mandat de gestion", "État propriétaire", "Reçus", "Documents divers"].map((item) => (
            <p key={item}><span>{item}</span><Badge label="Archivé" /></p>
          ))}
        </div>
      )}
      {tab === "Historique" && (
        <div className="timeline">
          <p><strong>Fiche propriétaire créée</strong><span>{owner.name} · 12/02/2026</span></p>
          <p><strong>Reversement enregistré</strong><span>{owner.balance} · {owner.lastPayment}</span></p>
          <p><strong>Document généré</strong><span>État propriétaire · 28/05/2026</span></p>
        </div>
      )}
      <div className="stack-actions">
        <Button onClick={() => onAction("Modifier propriétaire", { owner, activeOwnerTab: tab })}>
          <Pencil size={17} /> Modifier
        </Button>
        <Button onClick={() => onAction("Ajouter un bien propriétaire", { owner, activeOwnerTab: tab })}>
          <Plus size={17} /> Ajouter un bien
        </Button>
        <Button variant="primary" onClick={() => onAction("Générer situation propriétaire", { owner, activeOwnerTab: tab })}>
          <FileText size={17} /> Situation propriétaire
        </Button>
        <Button onClick={() => onAction("Enregistrer reversement", { owner, activeOwnerTab: tab })}>
          <HandCoins size={17} /> Enregistrer reversement
        </Button>
        <Button onClick={() => onAction("Imprimer propriétaire", { owner, activeOwnerTab: tab })}>
          <Printer size={17} /> Imprimer
        </Button>
        <Button onClick={() => onAction("Exporter PDF propriétaire", { owner, activeOwnerTab: tab })}>
          <Download size={17} /> Export PDF
        </Button>
      </div>
    </Panel>
  );
}

function TenantsView({ tenantsList = tenants, onOpenDetail, rentRowsList = rentRows }) {
  return (
    <section className="client-list-workspace">
      <Panel title="Liste des locataires">
        <DataTable
          columns={["Locataire", "Téléphone", "Bien occupé", "Propriétaire", "Loyer", "Impayé", "Contrat actif", "Statut", "Action"]}
          rows={tenantsList.map((tenant) => [
            <button className="table-person" onClick={() => onOpenDetail(tenant)}>
              <Avatar name={tenant.name} />
              <span><strong>{tenant.name}</strong><small>{tenant.id}</small></span>
            </button>,
            tenant.phone,
            tenant.property,
            properties.find((property) => property.name === tenant.property)?.owner ?? "-",
            tenant.rent,
            rentRowsList.find((row) => row.tenant === tenant.name)?.balance ?? (tenant.paymentStatus === "À jour" ? "0 FCFA" : "0 FCFA"),
            tenant.contract,
            <Badge label={tenant.paymentStatus} />,
            <Button compact onClick={() => onOpenDetail(tenant)}><Eye size={15} /> Fiche</Button>,
          ])}
        />
      </Panel>
    </section>
  );
}

function TenantProfilePanel({ tenant, onAction, contractsList = contracts, paymentsList = paymentRecords, rentRowsList = rentRows, relancesList = [], archivedReceipts = [] }) {
  const [tab, setTab] = useState("Résumé");
  const property = properties.find((item) => item.name === tenant.property) ?? properties[0];
  const tenantContracts = contractsList.filter((item) => item.client === tenant.name);
  const contract = tenantContracts.find((item) => item.number === tenant.contract) ?? tenantContracts[0] ?? contracts.find((item) => item.number === tenant.contract) ?? contracts[0];
  const paymentRows = rentRowsList.filter((row) => row.tenant === tenant.name);
  const tenantPayments = paymentsList.filter((payment) => payment.tenant === tenant.name);
  const tenantRelances = relancesList.filter((relance) => relance.tenantId === tenant.id || relance.tenant === tenant.name);
  const tenantReceipts = [
    ...tenantPayments.filter((payment) => payment.receipt && payment.receipt !== "Non généré").map((payment) => ({
      reference: payment.receipt,
      period: payment.period,
      amount: payment.amountNow ?? payment.paid,
      status: "Disponible",
    })),
    ...archivedReceipts.filter((receipt) => receipt.tenantId === tenant.id || receipt.tenant === tenant.name).map((receipt) => ({
      reference: receipt.numero,
      period: receipt.periode,
      amount: receipt.montant,
      status: "Archivé",
    })),
  ];
  const primaryRow = paymentRows.find((row) => row.balance !== "0 FCFA") ?? paymentRows[0];
  const primaryPayment = tenantPayments[0] ?? paymentsList.find((payment) => payment.tenant === tenant.name);
  const tabs = ["Résumé", "Contrat", "Paiements", "Impayés & relances", "Documents"];

  return (
    <Panel title="Fiche locataire" className="profile-panel">
      <ProfileHeader person={tenant} />
      <DetailMetrics
        items={[
          ["Bien occupé", tenant.property],
          ["Loyer", tenant.rent],
          ["Statut", tenant.paymentStatus],
          ["Solde dû", paymentRows.find((row) => row.balance !== "0 FCFA")?.balance ?? "0 FCFA"],
          ["Contrat", contract.number],
        ]}
      />
      <MiniTabs tabs={tabs} active={tab} onChange={setTab} />
      {tab === "Résumé" && (
        <div className="simple-list">
          <p><span>Téléphone</span><strong>{tenant.phone}</strong></p>
          <p><span>Email</span><strong>{tenant.email}</strong></p>
          <p><span>Profession</span><strong>Client locataire</strong></p>
          <p><span>Bien occupé</span><strong>{tenant.property}</strong></p>
          <p><span>Adresse</span><strong>{property.address}</strong></p>
          <p><span>Date d'entrée</span><strong>{contract.start}</strong></p>
          <p><span>Montant du loyer</span><strong>{tenant.rent}</strong></p>
          <p><span>Caution</span><strong>{tenant.deposit}</strong></p>
          <p><span>Statut général</span><Badge label={tenant.paymentStatus} /></p>
        </div>
      )}
      {tab === "Contrat" && (
        <div className="simple-list">
          <p><span>Contrat actif</span><strong>{contract.number}</strong></p>
          <p><span>Date début</span><strong>{contract.start}</strong></p>
          <p><span>Date fin</span><strong>{contract.end}</strong></p>
          <p><span>Conditions particulières</span><strong>Paiement au plus tard le 05</strong></p>
          <p><span>Document signé</span><Badge label="Archivé" /></p>
          <p><span>Statut</span><Badge label={contract.status} /></p>
        </div>
      )}
      {tab === "Paiements" && (
        <DataTable
          columns={["Période", "Attendu", "Payé", "Solde", "Statut", "Reçu"]}
          rows={(paymentRows.length ? paymentRows : rentRows.slice(0, 2)).map((row) => [
            row.period,
            row.expected,
            row.paid,
            row.balance,
            <Badge label={row.status} />,
            tenantPayments.find((payment) => payment.period === row.period && payment.property === row.property)?.receipt ?? "À générer",
          ])}
        />
      )}
      {tab === "Impayés & relances" && (
        <div className="simple-list">
          <p><span>Montant en retard</span><strong>{paymentRows.find((row) => row.balance !== "0 FCFA")?.balance ?? "0 FCFA"}</strong></p>
          <p><span>Ancienneté</span><strong>{tenant.paymentStatus === "À jour" ? "0 jour" : "28 jours"}</strong></p>
          <p><span>Dernière relance</span><strong>SMS le 24/05</strong></p>
          <p><span>Promesse de paiement</span><strong>À confirmer</strong></p>
          <p><span>Litige</span><strong>Aucun</strong></p>
          <p><span>Dernière relance enregistrée</span><strong>{tenantRelances[0] ? `${tenantRelances[0].channel} · ${tenantRelances[0].reason}` : "SMS le 24/05"}</strong></p>
          <p><span>Prochaine action</span><strong>{tenantRelances[0]?.nextDate ?? tenant.nextReminder ?? "Appel de suivi"}</strong></p>
        </div>
      )}
      {tab === "Documents" && (
        <div className="mini-list">
          {tenantContracts.map((item) => (
            <p key={item.number}><span>{item.number} · {item.property}</span><Badge label={item.status} /></p>
          ))}
          {tenantReceipts.map((item) => (
            <p key={`${item.reference}-${item.period}`}><span>{item.reference} · {item.period} · {item.amount}</span><Badge label={item.status} /></p>
          ))}
          {["Pièce d'identité", "Contrat", "Reçus", "Quittances", "Documents divers"].map((item) => (
            <p key={item}><span>{item}</span><Badge label="Archivé" /></p>
          ))}
        </div>
      )}
      <div className="stack-actions">
        <Button onClick={() => onAction("Modifier locataire", { tenant, property, contract, activeTenantTab: tab })}>
          <Pencil size={17} /> Modifier
        </Button>
        <Button variant="primary" onClick={() => onAction("Enregistrer paiement locataire", { tenant, property, contract, row: primaryRow, payment: primaryPayment, activeTenantTab: tab })}>
          <Banknote size={17} /> Enregistrer paiement
        </Button>
        <Button onClick={() => onAction("Générer reçu locataire", { tenant, property, contract, row: primaryRow, payment: primaryPayment, activeTenantTab: tab })}>
          <ReceiptText size={17} /> Générer reçu
        </Button>
        <Button onClick={() => onAction("Ajouter relance", { tenant, property, contract, row: primaryRow, activeTenantTab: tab })}>
          <Bell size={17} /> Ajouter relance
        </Button>
        <Button onClick={() => onAction("Contrat locataire", { tenant, property, contract, activeTenantTab: tab })}>
          <FileText size={17} /> Contrat
        </Button>
        <Button onClick={() => onAction("Situation locataire", { tenant, property, contract, row: primaryRow, activeTenantTab: tab })}>
          <Download size={17} /> Situation
        </Button>
      </div>
    </Panel>
  );
}

function ProspectsView({ prospectsList = prospects, onOpenDetail, onAction }) {
  return (
    <section className="client-list-workspace" data-demo="prospect-workspace">
      <Panel title="Liste des prospects" toolbar={<span className="muted">{prospectsList.length} prospects</span>}>
        <DataTable
          columns={["Prospect", "Téléphone", "Besoin", "Quartiers", "Budget", "Agent", "Statut", "Prochaine action", "Action"]}
          rows={prospectsList.map((prospect) => [
            <button className="table-person" onClick={() => onOpenDetail(prospect)}>
              <Avatar name={prospect.name} />
              <span><strong>{prospect.name}</strong><small>{prospect.status}</small></span>
            </button>,
            prospect.phone,
            prospect.need,
            prospect.district,
            prospect.budget,
            prospect.agent,
            <Badge label={prospect.status} />,
            prospect.next,
            <div className="table-actions">
              <Button compact onClick={() => onOpenDetail(prospect)}><Eye size={15} /> Fiche</Button>
              <Button compact onClick={() => onAction("Prochaine action prospect", { prospect })}><Phone size={15} /> Action</Button>
            </div>,
          ])}
        />
      </Panel>
    </section>
  );
}

function ProspectProfilePanel({ prospect, proposals, activities, conversion, visitsList = visits, onAction }) {
  const proposedProperties = proposals ?? getDefaultProspectProposals(prospect);
  const prospectVisits = visitsList.filter((visit) => visit.client === prospect.name);
  const timelineItems = activities?.length ? activities : getDefaultProspectTimeline(prospect);
  const objective = getProspectObjective(prospect);
  const delay = getProspectDelay(prospect);

  return (
    <Panel title="Fiche prospect" className="profile-panel prospect-profile">
      <ProfileHeader person={{ name: prospect.name, phone: prospect.phone, id: prospect.status }} />
      <ProspectSummaryCards
        prospect={prospect}
        items={[
          ["Statut", prospect.status, "Changer statut prospect"],
          ["Agent", prospect.agent, "Prochaine action prospect"],
          ["Budget", prospect.budget, "Modifier besoin prospect"],
          ["Objectif", objective, "Modifier besoin prospect"],
          ["Délai", delay, "Modifier besoin prospect"],
        ]}
        onAction={onAction}
      />
      <div className="profile-section">
        <h3>Informations principales</h3>
        <div className="simple-list">
          <p><span>Téléphone</span><strong>{prospect.phone}</strong></p>
          <p><span>Besoin immobilier</span><strong>{prospect.need}</strong></p>
          <p><span>Budget</span><strong>{prospect.budget}</strong></p>
          <p><span>Quartiers souhaités</span><strong>{prospect.district}</strong></p>
          <p><span>Agent responsable</span><strong>{prospect.agent}</strong></p>
          <p><span>Statut commercial</span><Badge label={prospect.status} /></p>
          <p><span>Prochaine action</span><strong>{prospect.next}</strong></p>
          {prospect.requirements && <p><span>Exigences particulières</span><strong>{prospect.requirements}</strong></p>}
          {conversion && <p><span>Conversion</span><strong>{conversion.conversionType} · {conversion.property}</strong></p>}
        </div>
      </div>
      <div className="profile-section">
        <div className="profile-section-head">
          <h3>Biens proposés</h3>
          <Button compact onClick={() => onAction("Proposer un bien", { prospect })}><Plus size={15} /> Proposer</Button>
        </div>
        <div className="prospect-proposal-list">
          {proposedProperties.map((proposal) => {
            const property = properties.find((item) => item.code === proposal.code) ?? properties[0];
            return (
              <article className="prospect-proposal-row" key={proposal.code}>
                <div>
                  <strong>{proposal.name}</strong>
                  <span>{proposal.return}</span>
                </div>
                <Badge label={proposal.status} />
                <div className="proposal-row-actions">
                  <Button compact onClick={() => onAction("Ouvrir fiche bien prospect", { prospect, property })}><Eye size={15} /> Fiche</Button>
                  <Button compact onClick={() => onAction("Retirer proposition prospect", { prospect, proposal })}>Retirer</Button>
                  <Button compact onClick={() => onAction("Marquer proposition intéressée", { prospect, proposal })}>Intéressé</Button>
                  <Button compact onClick={() => onAction("Planifier visite prospect", { prospect, proposal })}><CalendarDays size={15} /> Visite</Button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
      <div className="profile-section">
        <h3>Visites effectuées</h3>
        <div className="prospect-visit-list">
          {(prospectVisits.length ? prospectVisits : visits.slice(0, 1)).map((visit) => (
            <article key={`${visit.client}-${visit.date}-${visit.property}`}>
              <strong>{visit.date} · {visit.property}</strong>
              <span>{visit.feedback}</span>
              <Badge label={visit.status} />
            </article>
          ))}
        </div>
      </div>
      <div className="timeline compact-timeline">
        {timelineItems.map((item, index) => (
          <p key={`${item.title}-${index}`}><strong>{item.title}</strong><span>{item.text} · {item.date}</span></p>
        ))}
      </div>
      <div className="stack-actions">
        <Button onClick={() => onAction("Modifier besoin prospect", { prospect })}><Pencil size={17} /> Modifier besoin</Button>
        <Button onClick={() => onAction("Proposer un bien", { prospect })}><Home size={17} /> Proposer bien</Button>
        <Button variant="primary" onClick={() => onAction("Prochaine action prospect", { prospect })}><Phone size={17} /> Prochaine action</Button>
        <Button onClick={() => onAction("Planifier visite prospect", { prospect })}><CalendarDays size={17} /> Planifier visite</Button>
        <Button onClick={() => onAction("Ajouter commentaire prospect", { prospect })}><FileText size={17} /> Commentaire</Button>
        <Button onClick={() => onAction("Changer statut prospect", { prospect })}><RefreshCw size={17} /> Changer statut</Button>
        <Button onClick={() => onAction("Convertir prospect", { prospect })}><CheckCircle2 size={17} /> Convertir</Button>
      </div>
    </Panel>
  );
}

function ProspectSummaryCards({ prospect, items, onAction }) {
  return (
    <div className="detail-metrics prospect-metrics">
      {items.map(([label, value, action]) => (
        <button key={label} onClick={() => onAction(action, { prospect })}>
          <span>{label}</span>
          <strong>{value}</strong>
        </button>
      ))}
    </div>
  );
}

function VisitsView({ visitsList = visits, onOpenDetail, onAction }) {
  return (
    <section className="client-list-workspace" data-demo="visits-workspace">
      <Panel title="Visites programmées et réalisées" toolbar={<span className="muted">{visitsList.length} visites</span>}>
        <DataTable
          columns={["Date & heure", "Prospect / client", "Bien", "Quartier", "Agent", "Statut", "Retour client", "Prochaine action", "Action"]}
          rows={visitsList.map((visit) => {
            const property = properties.find((item) => item.name === visit.property);
            return [
              `${visit.date} · ${visit.time}`,
              visit.client,
              visit.property,
              property?.district ?? "-",
              visit.agent,
              <Badge label={visit.status} />,
              visit.feedback,
              visit.next,
              <Button compact onClick={() => onOpenDetail(visit)}><Eye size={15} /> Fiche</Button>,
            ];
          })}
        />
      </Panel>
    </section>
  );
}

function VisitProfilePanel({ visit, histories = [], onAction }) {
  const property = properties.find((item) => item.name === visit.property) ?? properties[0];
  const [actionMenuOpen, setActionMenuOpen] = useState(false);

  return (
    <Panel title="Fiche visite" className="profile-panel">
      <ProfileHeader person={{ name: visit.client, id: visit.property }} />
      <DetailMetrics
        items={[
          ["Bien", visit.property],
          ["Date & heure", `${visit.date} ${visit.time}`],
          ["Agent", visit.agent],
          ["Statut", visit.status],
          ["Prochaine action", visit.next],
        ]}
      />
      <div className="simple-list">
        <p><span>Bien visité</span><strong>{visit.property}</strong></p>
        <p><span>Adresse</span><strong>{property.address}</strong></p>
        <p><span>Agent</span><strong>{visit.agent}</strong></p>
        <p><span>Date</span><strong>{visit.date}</strong></p>
        <p><span>Heure</span><strong>{visit.time}</strong></p>
        <p><span>Lieu de rendez-vous</span><strong>{visit.meetingPlace ?? property.address}</strong></p>
        <p><span>Statut</span><Badge label={visit.status} /></p>
        <p><span>Retour client</span><strong>{visit.feedback}</strong></p>
        <p><span>Décision</span><strong>{visit.decision ?? (visit.status === "Client intéressé" ? "Convertir en contrat" : "Suivi commercial")}</strong></p>
        <p><span>Prochaine action</span><strong>{visit.next}</strong></p>
        <p><span>Commentaires internes</span><strong>{visit.closureComment ?? `Suivi par ${visit.agent}`}</strong></p>
      </div>
      <div className="timeline compact-timeline">
        {(histories.length ? histories : [
          { title: "Visite créée", text: `${visit.property} - ${visit.date} ${visit.time}`, date: "Dossier initial" },
        ]).map((item, index) => (
          <p key={`${item.title}-${index}`}><strong>{item.title}</strong><span>{item.text} · {item.date}</span></p>
        ))}
      </div>
      <div className="stack-actions">
        <Button onClick={() => onAction("Modifier date visite", { visit })}><Pencil size={17} /> Modifier date</Button>
        <Button onClick={() => onAction("Changer agent visite", { visit })}><UserCog size={17} /> Changer agent</Button>
        <Button onClick={() => onAction("Annuler visite", { visit })}><XCircle size={17} /> Annuler</Button>
        <Button onClick={() => onAction("Marquer visite réalisée", { visit })}><CheckCircle2 size={17} /> Réalisée</Button>
        <Button onClick={() => onAction("Retour client visite", { visit })}><FileText size={17} /> Retour client</Button>
        <Button onClick={() => onAction("Créer relance visite", { visit })}><Bell size={17} /> Relance</Button>
        <div className="visit-action-menu-wrap">
          <Button variant="primary" onClick={() => setActionMenuOpen((value) => !value)}>
            <CheckCircle2 size={17} /> Traiter
          </Button>
          {actionMenuOpen && (
            <div className="inline-action-menu visit-action-menu">
              <button onClick={() => onAction("Marquer client intéressé visite", { visit })}><CheckCircle2 size={15} /> Marquer client intéressé</button>
              <button onClick={() => onAction("Proposer autre bien visite", { visit })}><Home size={15} /> Proposer autre bien</button>
              <button onClick={() => onAction("Créer contrat visite", { visit })}><FileText size={15} /> Créer contrat</button>
              <button onClick={() => onAction("Convertir prospect visite", { visit })}><UsersRound size={15} /> Convertir prospect</button>
              <button onClick={() => onAction("Marquer sans suite visite", { visit })}><XCircle size={15} /> Marquer sans suite</button>
            </div>
          )}
        </div>
        <Button onClick={() => onAction("Reporter visite", { visit })}><CalendarDays size={17} /> Reporter</Button>
      </div>
    </Panel>
  );
}

function VisitDateModal({ visit, report = false, onSave, onClose }) {
  const [values, setValues] = useState({
    newDate: toInputDate(visit.date),
    newTime: visit.time ?? "10:00",
    reason: report ? "Client indisponible, nouvelle date à confirmer." : "Ajustement de planning.",
    notify: "Oui",
  });
  const update = (field) => (event) => setValues((current) => ({ ...current, [field]: event.target.value }));

  return (
    <div className="modal-backdrop">
      <section className="modal-card prospect-form-modal">
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>{report ? "Reporter visite" : "Modifier date"}</h2>
        <p>{visit.client} · {visit.property}</p>
        <div className="form-section">
          <div className="form-grid compact-form">
            <label>Date actuelle<input value={`${visit.date} ${visit.time}`} readOnly /></label>
            <label>Nouvelle date<input type="date" value={values.newDate} onChange={update("newDate")} /></label>
            <label>Nouvelle heure<input type="time" value={values.newTime} onChange={update("newTime")} /></label>
            <label>Notifier agent/client<select value={values.notify} onChange={update("notify")}><option>Oui</option><option>Non</option></select></label>
            <label className="full">Motif<textarea value={values.reason} onChange={update("reason")} /></label>
          </div>
        </div>
        <div className="action-row compact-row">
          <Button onClick={onClose}>Annuler</Button>
          <Button variant="primary" onClick={() => onSave({ visit, values, report })}>Enregistrer modification</Button>
        </div>
      </section>
    </div>
  );
}

function VisitAgentModal({ visit, onSave, onClose }) {
  const [values, setValues] = useState({
    newAgent: visit.agent,
    reason: "Réaffectation selon disponibilité équipe.",
  });
  const update = (field) => (event) => setValues((current) => ({ ...current, [field]: event.target.value }));

  return (
    <div className="modal-backdrop">
      <section className="modal-card prospect-form-modal">
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>Changer agent</h2>
        <p>{visit.client} · {visit.property}</p>
        <div className="form-section">
          <div className="form-grid compact-form">
            <label>Agent actuel<input value={visit.agent} readOnly /></label>
            <label>Nouvel agent<select value={values.newAgent} onChange={update("newAgent")}><option>Mariam Traoré</option><option>Aïssata Diarra</option><option>Issa Maïga</option><option>Cheick Camara</option></select></label>
            <label className="full">Motif<textarea value={values.reason} onChange={update("reason")} /></label>
          </div>
        </div>
        <div className="action-row compact-row">
          <Button onClick={onClose}>Annuler</Button>
          <Button variant="primary" onClick={() => onSave({ visit, values })}>Confirmer</Button>
        </div>
      </section>
    </div>
  );
}

function VisitCancelModal({ visit, onSave, onClose }) {
  const [values, setValues] = useState({
    reason: "Client indisponible",
    comment: "Proposer un nouveau créneau cette semaine.",
    notify: "Oui",
  });
  const update = (field) => (event) => setValues((current) => ({ ...current, [field]: event.target.value }));

  return (
    <div className="modal-backdrop">
      <section className="modal-card prospect-form-modal">
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>Annuler la visite ?</h2>
        <p>Cette action changera le statut de la visite et ajoutera une trace dans l'historique.</p>
        <div className="form-section">
          <div className="form-grid compact-form">
            <label>Motif d'annulation<input value={values.reason} onChange={update("reason")} /></label>
            <label>Notifier client<select value={values.notify} onChange={update("notify")}><option>Oui</option><option>Non</option></select></label>
            <label className="full">Commentaire<textarea value={values.comment} onChange={update("comment")} /></label>
          </div>
        </div>
        <div className="action-row compact-row">
          <Button onClick={onClose}>Annuler</Button>
          <Button variant="primary" onClick={() => onSave({ visit, values })}>Confirmer l'annulation</Button>
        </div>
      </section>
    </div>
  );
}

function VisitCloseModal({ visit, onSave, onClose }) {
  const [values, setValues] = useState({
    realizedAt: toInputDate(visit.date),
    clientPresent: "Oui",
    feedback: visit.feedback ?? "Client satisfait de la visite.",
    interest: visit.interest ?? "Moyen",
    nextAction: visit.next ?? "Relancer après visite",
    comment: "Compte-rendu ajouté par l'agent.",
  });
  const update = (field) => (event) => setValues((current) => ({ ...current, [field]: event.target.value }));

  return (
    <div className="modal-backdrop">
      <section className="modal-card wide-modal prospect-form-modal">
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>Clôturer la visite</h2>
        <p>{visit.client} · {visit.property}</p>
        <div className="form-section">
          <div className="form-grid">
            <label>Visite réalisée le<input type="date" value={values.realizedAt} onChange={update("realizedAt")} /></label>
            <label>Client présent<select value={values.clientPresent} onChange={update("clientPresent")}><option>Oui</option><option>Non</option></select></label>
            <label>Niveau d'intérêt<select value={values.interest} onChange={update("interest")}><option>Faible</option><option>Moyen</option><option>Fort</option></select></label>
            <label>Prochaine action<select value={values.nextAction} onChange={update("nextAction")}><option>Relancer après visite</option><option>Envoyer dossier complet</option><option>Créer contrat</option><option>Proposer autre bien</option><option>Classer sans suite</option></select></label>
            <label className="full">Retour client<textarea value={values.feedback} onChange={update("feedback")} /></label>
            <label className="full">Commentaire<textarea value={values.comment} onChange={update("comment")} /></label>
          </div>
        </div>
        <div className="action-row compact-row">
          <Button onClick={onClose}>Annuler</Button>
          <Button onClick={() => onSave({ visit, values, changeProspect: false })}>Marquer réalisée</Button>
          <Button variant="primary" onClick={() => onSave({ visit, values, changeProspect: true })}>Marquer réalisée et changer statut prospect</Button>
        </div>
      </section>
    </div>
  );
}

function VisitFeedbackModal({ visit, onSave, onClose }) {
  const [values, setValues] = useState({
    feedback: visit.feedback ?? "Retour à compléter",
    positivePoints: "Emplacement, luminosité, sécurité",
    negativePoints: "Budget à confirmer",
    interest: visit.interest ?? "Moyen",
    decision: visit.decision ?? "Relancer après visite",
    comment: "Retour client saisi depuis la fiche visite.",
  });
  const update = (field) => (event) => setValues((current) => ({ ...current, [field]: event.target.value }));

  return (
    <div className="modal-backdrop">
      <section className="modal-card wide-modal prospect-form-modal">
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>Retour client</h2>
        <p>{visit.client} · {visit.property}</p>
        <div className="form-section">
          <div className="form-grid">
            <label className="full">Retour du client<textarea value={values.feedback} onChange={update("feedback")} /></label>
            <label>Points positifs<textarea value={values.positivePoints} onChange={update("positivePoints")} /></label>
            <label>Points négatifs<textarea value={values.negativePoints} onChange={update("negativePoints")} /></label>
            <label>Intérêt<select value={values.interest} onChange={update("interest")}><option>Faible</option><option>Moyen</option><option>Fort</option></select></label>
            <label>Décision<select value={values.decision} onChange={update("decision")}><option>Relancer après visite</option><option>Marquer intéressé</option><option>Proposer autre bien</option><option>Créer contrat</option><option>Sans suite</option></select></label>
            <label className="full">Commentaire<textarea value={values.comment} onChange={update("comment")} /></label>
          </div>
        </div>
        <div className="action-row compact-row">
          <Button onClick={onClose}>Annuler</Button>
          <Button variant="primary" onClick={() => onSave({ visit, values })}>Enregistrer retour</Button>
        </div>
      </section>
    </div>
  );
}

function VisitReminderModal({ visit, onSave, onClose }) {
  const [values, setValues] = useState({
    channel: "WhatsApp",
    message: "Relancer le client après la visite et confirmer son intérêt.",
    nextDate: "2026-06-21",
    responsible: visit.agent,
  });
  const update = (field) => (event) => setValues((current) => ({ ...current, [field]: event.target.value }));

  return (
    <div className="modal-backdrop">
      <section className="modal-card prospect-form-modal">
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>Relance visite</h2>
        <p>{visit.client} · {visit.property}</p>
        <div className="form-section">
          <div className="form-grid compact-form">
            <label>Canal<select value={values.channel} onChange={update("channel")}><option>Appel</option><option>WhatsApp</option><option>SMS</option><option>Email</option></select></label>
            <label>Date prochaine relance<input type="date" value={values.nextDate} onChange={update("nextDate")} /></label>
            <label>Responsable<select value={values.responsible} onChange={update("responsible")}><option>Mariam Traoré</option><option>Aïssata Diarra</option><option>Issa Maïga</option><option>Cheick Camara</option></select></label>
            <label className="full">Message / commentaire<textarea value={values.message} onChange={update("message")} /></label>
          </div>
        </div>
        <div className="action-row compact-row">
          <Button onClick={onClose}>Annuler</Button>
          <Button variant="primary" onClick={() => onSave({ visit, values })}>Enregistrer relance</Button>
        </div>
      </section>
    </div>
  );
}

function ContractsPage({ activeTab, onTab, onAction, contractsList = contracts, paymentsList = paymentRecords, documentDraft = null, propertyPdfArchives = [], contractTimelines = {}, contractDeadlines = {} }) {
  const tabs = ["Contrats", "Génération de document", "Archives"];
  const effectiveTab = activeTab === "Factures & reçus" ? "Archives" : activeTab;
  return (
    <>
      <PageIntro
        title="Contrats & documents"
      />
      <Tabs tabs={tabs} active={effectiveTab} onChange={onTab} demo="contract-tabs" />
      {effectiveTab === "Contrats" && <ContractsList onAction={onAction} contractsList={contractsList} contractTimelines={contractTimelines} contractDeadlines={contractDeadlines} />}
      {effectiveTab === "Génération de document" && <DocumentGeneration onAction={onAction} documentDraft={documentDraft} />}
      {effectiveTab === "Archives" && <ArchivesView onAction={onAction} contractsList={contractsList} paymentsList={paymentsList} propertyPdfArchives={propertyPdfArchives} />}
    </>
  );
}

function ContractsList({ onAction, contractsList = contracts, contractTimelines = {}, contractDeadlines = {} }) {
  const [selected, setSelected] = useState(contractsList[0] ?? contracts[0]);
  const [query, setQuery] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState({
    type: "Tous types",
    status: "Tous statuts",
    property: "Tous biens",
    owner: "Tous propriétaires",
    tenant: "Tous locataires",
    due: "Toutes échéances",
    signature: "Tous documents",
  });
  const { detailOpen, openDetail, closeDetail } = useDetailNavigation();
  const currentSelectedContract = contractsList.find((contract) => getContractKey(contract) === getContractKey(selected)) ?? selected;

  const openContract = (contract) => {
    setSelected(contract);
    openDetail();
  };

  const updateFilter = (key, value) => setFilters((current) => ({ ...current, [key]: value }));
  const resetFilters = () => {
    setQuery("");
    setFilters({
      type: "Tous types",
      status: "Tous statuts",
      property: "Tous biens",
      owner: "Tous propriétaires",
      tenant: "Tous locataires",
      due: "Toutes échéances",
      signature: "Tous documents",
    });
  };

  const filteredContracts = useMemo(() => {
    const search = normalizeSearch(query);
    return contractsList.filter((contract) => {
      const dueLabel = getContractDueLabel(contract);
      const haystack = normalizeSearch(`${contract.number} ${contract.type} ${contract.property} ${contract.owner} ${contract.client} ${contract.status} ${dueLabel}`);
      const typeMatch = filters.type === "Tous types" || contract.type === filters.type;
      const statusMatch = filters.status === "Tous statuts" || contract.status === filters.status;
      const propertyMatch = filters.property === "Tous biens" || contract.property === filters.property;
      const ownerMatch = filters.owner === "Tous propriétaires" || contract.owner === filters.owner;
      const tenantMatch = filters.tenant === "Tous locataires" || contract.client === filters.tenant;
      const dueMatch = filters.due === "Toutes échéances" || dueLabel.includes(filters.due.replace("Échéance ", ""));
      const signatureMatch = filters.signature === "Tous documents" || filters.signature === "Archivé";
      return (!search || haystack.includes(search)) && typeMatch && statusMatch && propertyMatch && ownerMatch && tenantMatch && dueMatch && signatureMatch;
    });
  }, [contractsList, filters, query]);

  return (
    <>
      <Panel className="filter-panel">
        <div className="filters-row">
          <label className="field search-field">
            <Search size={19} />
            <input placeholder="Rechercher un contrat, bien, propriétaire..." value={query} onChange={(event) => setQuery(event.target.value)} />
          </label>
          <select value={filters.type} onChange={(event) => updateFilter("type", event.target.value)}><option>Tous types</option><option>Contrat de location</option><option>Mandat de gestion</option></select>
          <select value={filters.status} onChange={(event) => updateFilter("status", event.target.value)}><option>Tous statuts</option><option>Actif</option><option>Expiré</option><option>Archivé</option></select>
          <select value={filters.property} onChange={(event) => updateFilter("property", event.target.value)}><option>Tous biens</option>{properties.map((property) => <option key={property.code}>{property.name}</option>)}</select>
          <select value={filters.owner} onChange={(event) => updateFilter("owner", event.target.value)}><option>Tous propriétaires</option>{owners.map((owner) => <option key={owner.id}>{owner.name}</option>)}</select>
          <select value={filters.tenant} onChange={(event) => updateFilter("tenant", event.target.value)}><option>Tous locataires</option>{tenants.map((tenant) => <option key={tenant.id}>{tenant.name}</option>)}</select>
          <select value={filters.due} onChange={(event) => updateFilter("due", event.target.value)}><option>Toutes échéances</option><option>Cette semaine</option><option>Ce mois</option><option>Cette année</option></select>
          <Button onClick={() => setFiltersOpen((value) => !value)}><Filter size={17} /> Filtres</Button>
        </div>
        {filtersOpen && (
          <div className="advanced-filters client-advanced-filters">
            <label>Document<select value={filters.signature} onChange={(event) => updateFilter("signature", event.target.value)}>
              <option>Tous documents</option>
              <option>Signé</option>
              <option>À signer</option>
              <option>Archivé</option>
            </select></label>
            <Button compact onClick={resetFilters}>Réinitialiser</Button>
            <span className="muted">{filteredContracts.length} contrat(s) affiché(s)</span>
          </div>
        )}
      </Panel>
      {detailOpen ? (
        <DetailPageShell title="Fiche contrat" subtitle={currentSelectedContract.number} onBack={closeDetail}>
          <ContractProfilePanel
            contract={currentSelectedContract}
            onAction={onAction}
            timelineEntries={contractTimelines[getContractKey(currentSelectedContract)] ?? []}
            customDeadlines={contractDeadlines[getContractKey(currentSelectedContract)] ?? []}
          />
        </DetailPageShell>
      ) : (
      <section className="client-list-workspace" data-demo="contracts-workspace">
        <Panel title="Liste des contrats">
          <DataTable
            columns={["Numéro contrat", "Type", "Bien", "Propriétaire", "Locataire / client", "Date début", "Date fin", "Statut", "Échéance", "Action"]}
            rows={filteredContracts.map((contract) => [
              contract.number,
              contract.type,
              contract.property,
              contract.owner,
              contract.client,
              contract.start,
              contract.end,
              <Badge label={contract.status} />,
              getContractDueLabel(contract),
              <Button compact onClick={() => openContract(contract)}><Eye size={16} /> Fiche</Button>,
            ])}
          />
        </Panel>
      </section>
      )}
    </>
  );
}

function ContractProfilePanel({ contract, onAction, timelineEntries = [], customDeadlines = [] }) {
  const financials = getContractFinancials(contract);
  const property = properties.find((item) => item.name === contract.property);
  const directOwnerCollection = property && !isAgencyCollectedProperty(property.name);
  const deadlines = getContractDeadlines(contract, financials, customDeadlines);
  const timeline = getContractTimeline(contract, property, timelineEntries);
  const nextRent = contract.nextDueDate ?? deadlines.find((item) => item.type === "Prochain loyer")?.date ?? "05/07/2026";

  return (
    <Panel title="Fiche contrat" className="profile-panel">
      <div className="profile-header">
        <div className="round-icon">
          <FileText size={22} />
        </div>
        <div>
          <h3>{contract.number}</h3>
          <p>{contract.type}</p>
        </div>
      </div>
      <div className="simple-list">
        <p><span>Parties concernées</span><strong>{contract.owner} / {contract.client}</strong></p>
        <button className="info-link-row" onClick={() => onAction("Ouvrir bien contrat", { contract })}><span>Bien</span><strong>{contract.property}</strong></button>
        <button className="info-link-row" onClick={() => onAction("Ouvrir proprietaire contrat", { contract })}><span>Propriétaire</span><strong>{contract.owner}</strong></button>
        <button className="info-link-row" onClick={() => onAction("Ouvrir locataire contrat", { contract })}><span>Locataire</span><strong>{contract.client}</strong></button>
        <p><span>Dates</span><strong>{contract.start} - {contract.end}</strong></p>
        <p><span>Montant</span><strong>{financials.amount}</strong></p>
        <p><span>Mode financier</span><strong>{contract.financialMode ?? property?.financialMode ?? "À définir"}</strong></p>
        <p><span>Caution</span><strong>{financials.deposit}</strong></p>
        <p><span>Commission</span><strong>{financials.commission}</strong></p>
        <p><span>Statut</span><Badge label={contract.status} /></p>
        <button className="info-link-row" onClick={() => onAction("Document signe contrat", { contract })}><span>Document signé</span><strong>{contract.signedDocument ?? "Archivé"}</strong></button>
        <button className="info-link-row" onClick={() => onAction("Actions echeance contrat", { contract })}><span>Échéance</span><strong>{getContractDueLabel(contract)}</strong></button>
        <p><span>Prochain loyer</span><strong>{nextRent}</strong></p>
        <p><span>Fin du contrat</span><strong>{contract.end}</strong></p>
        <p><span>Alerte</span><Badge label={contract.number === "CON-2025-088" ? "À valider" : "Planifiée"} /></p>
      </div>
      {directOwnerCollection && (
        <div className="notice">
          Encaissement direct propriétaire : le contrat reste suivi par E.K immo, mais les loyers ne sont pas ajoutés aux paiements agence à collecter.
        </div>
      )}
      <div className="profile-section">
        <div className="section-heading-row">
          <h3>Échéances</h3>
          <Button compact onClick={() => onAction("Gerer echeances contrat", { contract })}><CalendarDays size={16} /> Gérer les échéances</Button>
        </div>
        <div className="deadline-list">
          {deadlines.map((deadline) => (
            <div className="deadline-row" key={`${deadline.type}-${deadline.date}-${deadline.comment}`}>
              <span>
                <strong>{deadline.type}</strong>
                <small>{deadline.comment}</small>
              </span>
              <Badge label={deadline.date} />
            </div>
          ))}
        </div>
      </div>
      <div className="timeline compact-timeline">
        {timeline.map((entry) => (
          <p key={`${entry.date}-${entry.action}-${entry.comment}`}>
            <strong>{entry.action}</strong>
            <span>{entry.date} - {entry.user}{entry.comment ? ` - ${entry.comment}` : ""}</span>
          </p>
        ))}
      </div>
      <div className="stack-actions">
        <Button variant="primary" onClick={() => onAction("Modifier contrat", { contract })}><Pencil size={17} /> Modifier</Button>
        <Button onClick={() => onAction("Renouveler contrat", { contract })}><RefreshCw size={17} /> Renouveler</Button>
        <Button onClick={() => onAction("Resilier contrat", { contract })}><XCircle size={17} /> Résilier</Button>
        <Button onClick={() => onAction("Telecharger contrat", { contract })}><Download size={17} /> PDF</Button>
        <Button onClick={() => onAction("Imprimer contrat", { contract })}><Printer size={17} /> Imprimer</Button>
        <Button onClick={() => onAction("Joindre contrat signe", { contract })}><Upload size={17} /> Contrat signé</Button>
        <Button onClick={() => onAction("Archiver contrat", { contract })}><Archive size={17} /> Archiver</Button>
        <Button onClick={() => onAction("Ouvrir bien contrat", { contract })}><Home size={17} /> Voir fiche bien</Button>
        <Button onClick={() => onAction("Ouvrir proprietaire contrat", { contract })}><UserRound size={17} /> Voir propriétaire</Button>
        <Button onClick={() => onAction("Ouvrir locataire contrat", { contract })}><UsersRound size={17} /> Voir locataire</Button>
      </div>
    </Panel>
  );
}

function getContractDeadlines(contract, financials, customDeadlines = []) {
  const base = [
    { type: "Prochain loyer", date: contract.nextDueDate ?? "05/07/2026", comment: financials.amount },
    { type: "Prochaine révision", date: contract.revisionDate ?? "01/01/2027", comment: "Indexation annuelle à confirmer" },
    { type: "Fin du contrat", date: contract.end, comment: "Contrôler renouvellement ou sortie" },
    { type: "Alerte planifiée", date: contract.number === "CON-2025-088" ? "Dans 32 jours" : "30 jours avant", comment: "Notification agent et manager" },
    { type: "Renouvellement prévu", date: contract.renewalDate ?? "À confirmer", comment: contract.status === "Renouvelé" ? "Renouvellement enregistré" : "Option à valider" },
  ];

  if (contract.status === "Résilié" || contract.terminationDate) {
    base.push({ type: "Résiliation prévue", date: contract.terminationDate ?? contract.end, comment: "Sortie à suivre" });
  }

  return [...customDeadlines.map((item) => ({
    type: item.type,
    date: item.date,
    comment: `${item.reminder} · ${item.notify} · ${item.comment}`,
  })), ...base];
}

function getContractTimeline(contract, property, timelineEntries = []) {
  return [
    ...timelineEntries,
    { date: contract.start, user: contract.owner, action: "Contrat créé", comment: `${contract.number} lié à ${contract.property}` },
    { date: contract.start, user: "Aïssata Diarra", action: "Génération PDF", comment: "Modèle E.K immo alimenté et prêt à archiver" },
    { date: contract.signedAt ?? "18/06/2026", user: "Aïssata Diarra", action: "Signature ajoutée", comment: "Document signé archivé" },
    { date: contract.end, user: "Système", action: "Alerte envoyée", comment: getContractDueLabel(contract) },
    { date: "20/06/2026", user: "Aïssata Diarra", action: "Dernière vérification", comment: `${property?.status ?? "Actif"} · fiche bien liée` },
  ];
}
function getContractFinancials(contract) {
  const property = properties.find((item) => item.name === contract.property);
  const tenant = tenants.find((item) => item.name === contract.client);

  return {
    amount: tenant?.rent ?? (property ? `${property.price} ${property.period}` : "À définir"),
    deposit: tenant?.deposit ?? property?.deposit ?? "À définir",
    commission: property?.commission ?? "À définir",
  };
}

function getContractDueLabel(contract) {
  if (contract.status === "Archivé") return "Archivé";
  if (contract.number === "CON-2025-088") return "32 jours";
  if (contract.end === "Vendu") return "Clôturé";
  return "En cours";
}

function DocumentGeneration({ onAction, documentDraft = null }) {
  const defaultData = documentDraft?.data ?? {
    invoice: invoices[0],
    payment: paymentRecords[0],
    commission: commissions[0],
    property: properties[0],
    owner: owners[0],
    tenant: tenants[0],
  };

  return (
    <DocumentStudio
      initialTemplate={documentDraft?.templateKey ?? "facture"}
      autoOpen={Boolean(documentDraft)}
      title={documentDraft ? `Générer un document - ${documentTemplates.find((item) => item.key === documentDraft.templateKey)?.label ?? "Document"}` : "Atelier de génération documentaire"}
      onAction={onAction}
      data={defaultData}
    />
  );
}

function InvoicesView({ onAction }) {
  const [selected, setSelected] = useState(invoices[0]);
  const [documentNumbers, setDocumentNumbers] = useState(() =>
    Object.fromEntries(invoices.map((invoice, index) => [invoice.number, invoice.number || makeDocumentNumber(getDocumentPrefix(invoice.type), index + 1)]))
  );
  const selectedNumber = documentNumbers[selected.number] ?? selected.number;
  const selectedInvoice = { ...selected, number: selectedNumber };
  const selectedPayment = paymentRecords.find((item) => item.property === selected.property || item.receipt === selected.number) ?? paymentRecords[0];
  const selectedProperty = properties.find((item) => item.name === selected.property) ?? properties[0];
  const selectedOwner = owners.find((item) => item.name === selectedProperty.owner) ?? owners[0];
  const selectedTenant = tenants.find((item) => item.name === selected.client) ?? tenants[0];
  const templateKey = selected.type === "Reçu" ? "recu" : "facture";

  return (
    <section className="document-workspace">
      <Panel
        title="Documents émis"
        toolbar={<span className="muted">{invoices.length} modèles</span>}
      >
        <div className="auto-number-box">
          <label>
            Numéro automatique
            <input
              value={selectedNumber}
              onChange={(event) => setDocumentNumbers((current) => ({ ...current, [selected.number]: event.target.value }))}
            />
            <small>Proposé par E.K immo, modifiable avant génération.</small>
          </label>
        </div>
        <div className="document-list">
          {invoices.map((invoice) => (
            <button className={selected.number === invoice.number ? "active" : ""} key={invoice.number} onClick={() => setSelected(invoice)}>
              <span>
                <strong>{documentNumbers[invoice.number] ?? invoice.number}</strong>
                <small>{invoice.type} · {invoice.client}</small>
              </span>
              <Badge label={invoice.status} />
            </button>
          ))}
        </div>
      </Panel>
      <DocumentStudio
        initialTemplate={templateKey}
        lockedTemplate={templateKey}
        title="Document à remplir"
        onAction={onAction}
        data={{
          invoice: selectedInvoice,
          payment: selectedPayment,
          property: selectedProperty,
          owner: selectedOwner,
          tenant: selectedTenant,
          commission: commissions[0],
        }}
      />
    </section>
  );
}

function getArchiveRecords(contractsList = contracts, paymentsList = paymentRecords, propertyPdfArchives = []) {
  const contractArchives = contractsList
    .filter((contract) => contract.generated || ["Archivé", "Expiré"].includes(contract.status))
    .map((contract) => ({
      id: `contract-${contract.number}`,
      category: "Contrats et mandats",
      reference: contract.number,
      title: contract.type,
      linked: `${contract.property} · ${contract.client}`,
      date: contract.generated ? "18/06/2026" : contract.end === "Vendu" ? "02/11/2024" : contract.end,
      status: contract.status === "Expiré" ? "Archivé" : contract.status,
      module: "Docs",
      owner: contract.owner,
    }));

  const invoiceArchives = invoices.map((invoice) => ({
    id: `invoice-${invoice.number}`,
    category: "Factures, reçus et quittances",
    reference: invoice.number,
    title: `${invoice.type} - ${invoice.client}`,
    linked: `${invoice.property} · ${invoice.amount}`,
    date: invoice.date,
    status: invoice.status,
    module: "Finance",
    owner: invoice.client,
  }));

  const receiptArchives = paymentsList
    .filter((payment) => payment.receipt && payment.receipt !== "Non généré")
    .map((payment) => ({
      id: `payment-${payment.reference}`,
      category: "Factures, reçus et quittances",
      reference: payment.receipt,
      title: `Reçu de paiement ${payment.period}`,
      linked: `${payment.property} · ${payment.paid}`,
      date: payment.date,
      status: payment.status === "Payé" ? "Archivé" : "Généré",
      module: "Finance",
      owner: payment.tenant,
    }));

  const chargeArchives = charges
    .filter((charge) => charge.status !== "Brouillon")
    .map((charge) => ({
      id: `charge-${charge.id}`,
      category: "Charges et entretiens",
      reference: charge.id,
      title: `${charge.type} - ${charge.proof}`,
      linked: `${charge.property} · ${charge.amount}`,
      date: charge.date,
      status: charge.status,
      module: "Finance",
      owner: charge.owner,
    }));

  const maintenanceArchives = maintenances.map((maintenance, index) => ({
    id: `maintenance-${index}`,
    category: "Charges et entretiens",
    reference: `ENT-2026-${String(index + 21).padStart(3, "0")}`,
    title: maintenance.type,
    linked: `${maintenance.property} · ${maintenance.cost}`,
    date: maintenance.date,
    status: maintenance.status,
    module: "Biens",
    owner: maintenance.manager,
  }));

  const draftArchives = [
    ...charges
      .filter((charge) => charge.status === "Brouillon")
      .map((charge) => ({
        id: `draft-charge-${charge.id}`,
        category: "Brouillons",
        reference: charge.id,
        title: `Charge en brouillon - ${charge.type}`,
        linked: `${charge.property} · ${charge.amount}`,
        date: charge.date,
        status: "Brouillon",
        module: "Finance",
        owner: charge.createdBy,
      })),
    {
      id: "draft-bail-a203",
      category: "Brouillons",
      reference: "BRO-DOC-2026-014",
      title: "Contrat de bail - Appartement A-203 Korofina",
      linked: "Appartement A-203 Korofina · nouveau preneur",
      date: "14/06/2026",
      status: "Brouillon",
      module: "Docs",
      owner: "Mariam Traoré",
    },
    {
      id: "draft-mandat-sotuba",
      category: "Brouillons",
      reference: "BRO-MDT-2026-007",
      title: "Mandat de gestion - Villa Sotuba Jardin",
      linked: "Villa Sotuba Jardin · Fatoumata Diallo",
      date: "13/06/2026",
      status: "Brouillon",
      module: "Biens",
      owner: "Cheick Camara",
    },
    {
      id: "draft-report-may",
      category: "Brouillons",
      reference: "BRO-RAP-2026-005",
      title: "Rapport locatif mensuel",
      linked: "Mai 2026 · portefeuille Bamako",
      date: "29/05/2026",
      status: "Brouillon",
      module: "Rapports",
      owner: "Aïssata Diarra",
    },
  ];

  const propertyClientArchives = [
    {
      id: "property-owner-konaté",
      category: "Biens et clients",
      reference: "DOS-PRO-2024-071",
      title: "Dossier propriétaire - Youssouf Konaté",
      linked: "Parcelle Titibougou · mandat vendu",
      date: "02/11/2024",
      status: "Archivé",
      module: "Clients",
      owner: "Youssouf Konaté",
    },
    {
      id: "property-tenant-awa",
      category: "Biens et clients",
      reference: "DOS-LOC-2026-011",
      title: "Dossier locataire - Awa Traoré",
      linked: "Villa Koulouba · pièces validées",
      date: "05/05/2026",
      status: "Archivé",
      module: "Clients",
      owner: "Mariam Traoré",
    },
    {
      id: "provider-office",
      category: "Biens et clients",
      reference: "DOS-PRE-2026-003",
      title: "Fiche prestataire entretien",
      linked: "Plateau Office Center · suivi entretien seul",
      date: "14/06/2026",
      status: "Brouillon",
      module: "Biens",
      owner: "Issa Maïga",
    },
  ];

  const reportArchives = [
    {
      id: "report-finance-may",
      category: "Rapports et exports",
      reference: "RAP-FIN-2026-005",
      title: "Résumé financier mensuel",
      linked: "Mai 2026 · PDF direction",
      date: "31/05/2026",
      status: "Archivé",
      module: "Rapports",
      owner: "Aïssata Diarra",
    },
    {
      id: "report-property-quarter",
      category: "Rapports et exports",
      reference: "RAP-BIE-2026-T2",
      title: "Rapport des biens",
      linked: "Deuxième trimestre 2026 · export Excel",
      date: "15/06/2026",
      status: "Généré",
      module: "Rapports",
      owner: "Admin E.K immo",
    },
  ];

  return [
    ...contractArchives,
    ...invoiceArchives,
    ...receiptArchives,
    ...chargeArchives,
    ...maintenanceArchives,
    ...propertyPdfArchives,
    ...draftArchives,
    ...propertyClientArchives,
    ...reportArchives,
  ];
}

function getArchiveCategoryIcon(category) {
  if (category === "Contrats et mandats") return FileText;
  if (category === "Factures, reçus et quittances") return ReceiptText;
  if (category === "Brouillons") return Pencil;
  if (category === "Charges et entretiens") return Wrench;
  if (category === "Biens et clients") return Building2;
  if (category === "Rapports et exports") return BarChart3;
  return Archive;
}

function ArchivesView({ onAction, contractsList = contracts, paymentsList = paymentRecords, propertyPdfArchives = [] }) {
  const records = useMemo(() => getArchiveRecords(contractsList, paymentsList, propertyPdfArchives), [contractsList, paymentsList, propertyPdfArchives]);
  const [category, setCategory] = useState("Tous les éléments");
  const [status, setStatus] = useState("Tous statuts");
  const [query, setQuery] = useState("");

  const categories = useMemo(() => ["Tous les éléments", ...uniqueValues(records.map((record) => record.category))], [records]);
  const statuses = useMemo(() => ["Tous statuts", ...uniqueValues(records.map((record) => record.status))], [records]);
  const normalizedQuery = normalizeSearch(query);
  const filteredRecords = records.filter((record) => {
    const categoryMatch = category === "Tous les éléments" || record.category === category;
    const statusMatch = status === "Tous statuts" || record.status === status;
    const queryMatch =
      !normalizedQuery ||
      normalizeSearch(`${record.category} ${record.reference} ${record.title} ${record.linked} ${record.module} ${record.owner}`).includes(normalizedQuery);
    return categoryMatch && statusMatch && queryMatch;
  });

  const archivedCount = records.filter((record) => record.status === "Archivé").length;
  const draftCount = records.filter((record) => record.status === "Brouillon").length;
  const generatedCount = records.filter((record) => ["Généré", "Imprimé", "Validée", "Payée"].includes(record.status)).length;
  const categorySummaries = categories.map((item) => {
    const items = item === "Tous les éléments" ? records : records.filter((record) => record.category === item);
    return {
      label: item,
      count: items.length,
      drafts: items.filter((record) => record.status === "Brouillon").length,
    };
  });

  return (
    <section className="archive-workspace" data-demo="document-archive">
      <div className="summary-strip archive-summary">
        <Info label="Éléments classés" value={records.length} />
        <Info label="Archives validées" value={archivedCount} />
        <Info label="Brouillons ouverts" value={draftCount} />
        <Info label="Documents générés" value={generatedCount} />
      </div>
      <section className="archive-layout">
        <Panel title="Catégories">
          <div className="archive-category-list">
            {categorySummaries.map((item) => {
              const Icon = getArchiveCategoryIcon(item.label);
              return (
                <button
                  className={category === item.label ? "archive-category-card active" : "archive-category-card"}
                  key={item.label}
                  onClick={() => setCategory(item.label)}
                >
                  <span><Icon size={19} /></span>
                  <strong>{item.label}</strong>
                  <small>{item.count} élément{item.count > 1 ? "s" : ""} · {item.drafts} brouillon{item.drafts > 1 ? "s" : ""}</small>
                </button>
              );
            })}
          </div>
          <div className="archive-rules">
            <p><span>Classement</span><strong>Par module métier</strong></p>
            <p><span>Brouillons</span><strong>Reprise possible</strong></p>
            <p><span>Archives</span><strong>Lecture et export</strong></p>
          </div>
        </Panel>
        <Panel
          title="Archives & brouillons"
          toolbar={<span className="muted">{filteredRecords.length} élément{filteredRecords.length > 1 ? "s" : ""}</span>}
        >
          <div className="filters-row archive-filters">
            <label className="field search-field">
              <Search size={19} />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Rechercher une référence, un bien, un client..." />
            </label>
            <select value={category} onChange={(event) => setCategory(event.target.value)} aria-label="Catégorie archive">
              {categories.map((item) => <option key={item}>{item}</option>)}
            </select>
            <select value={status} onChange={(event) => setStatus(event.target.value)} aria-label="Statut archive">
              {statuses.map((item) => <option key={item}>{item}</option>)}
            </select>
            <Button onClick={() => {
              setQuery("");
              setCategory("Tous les éléments");
              setStatus("Tous statuts");
            }}>
              <RefreshCw size={17} /> Réinitialiser
            </Button>
          </div>
          <DataTable
            columns={["Catégorie", "Référence", "Document", "Dossier lié", "Date", "Statut", "Module", "Action"]}
            rows={filteredRecords.map((record) => [
              record.category,
              record.reference,
              record.title,
              record.linked,
              record.date,
              <Badge label={record.status} />,
              record.module,
              <div className="table-actions">
                <Button compact onClick={() => onAction(`Ouvrir archive ${record.reference}`)}><Eye size={15} /> Ouvrir</Button>
                {record.status === "Brouillon" ? (
                  <Button compact onClick={() => onAction(`Reprendre brouillon ${record.reference}`)}><Pencil size={15} /> Reprendre</Button>
                ) : (
                  <Button compact onClick={() => onAction(`Télécharger archive ${record.reference}`)}><Download size={15} /> Exporter</Button>
                )}
              </div>,
            ])}
          />
        </Panel>
      </section>
    </section>
  );
}

function DocumentStudio({ initialTemplate = "facture", lockedTemplate, title, data, onAction, autoOpen = false }) {
  const [templateKey, setTemplateKey] = useState(lockedTemplate ?? initialTemplate);
  const [editingKey, setEditingKey] = useState(lockedTemplate ?? (autoOpen ? initialTemplate : null));

  useEffect(() => {
    setTemplateKey(lockedTemplate ?? initialTemplate);
    setEditingKey(lockedTemplate ?? (autoOpen ? initialTemplate : null));
  }, [autoOpen, initialTemplate, lockedTemplate]);

  const activeKey = lockedTemplate ?? editingKey ?? templateKey;
  const template = documentTemplates.find((item) => item.key === activeKey) ?? documentTemplates[0];

  if (!lockedTemplate && !editingKey) {
    return (
      <section className="document-hub" data-demo="document-generation">
        <Panel title={title}>
          <div className="document-template-grid">
            {documentTemplates.map((item) => {
              const relatedFiles = getRelatedDocumentFiles(item.key);
              return (
                <button
                  className={templateKey === item.key ? "document-template-card active" : "document-template-card"}
                  key={item.key}
                  onClick={() => {
                    setTemplateKey(item.key);
                    setEditingKey(item.key);
                  }}
                >
                  <span className="template-card-icon"><FileText size={22} /></span>
                  <span className="template-card-copy">
                    <strong>{item.label}</strong>
                    <small>{item.source}</small>
                  </span>
                  <span className="template-card-meta">
                    <Badge label={item.format} />
                    <small>{relatedFiles.length + 1} source{relatedFiles.length > 0 ? "s" : ""}</small>
                  </span>
                  <span className="template-card-action"><Pencil size={16} /> Modifier</span>
                </button>
              );
            })}
          </div>
        </Panel>
      </section>
    );
  }

  return (
    <DocumentEditor
      compact={Boolean(lockedTemplate)}
      data={data}
      onAction={onAction}
      onBack={lockedTemplate ? null : () => setEditingKey(null)}
      template={template}
      title={title}
    />
  );
}

function DocumentEditor({ compact = false, data, onAction, onBack, template, title }) {
  const relatedFiles = getRelatedDocumentFiles(template.key);
  const defaults = useMemo(() => getDocumentDefaults(template.key, data), [template.key, data]);
  const [values, setValues] = useState(defaults);
  const [previewOpen, setPreviewOpen] = useState(false);

  useEffect(() => {
    setValues(defaults);
  }, [defaults]);

  const updateField = (name, value) => {
    setValues((current) => ({ ...current, [name]: value }));
  };

  return (
    <section className={compact ? "document-editor compact" : "document-editor"} data-demo="document-generation">
      <div className="document-editor-top">
        {onBack && (
          <Button onClick={onBack}>
            <ArrowLeft size={17} /> Modèles
          </Button>
        )}
        <div>
          <span>{template.format}</span>
          <h2>{template.label}</h2>
          <p>{template.source}</p>
        </div>
        <div className="document-editor-actions">
          <Button variant="primary" onClick={() => setPreviewOpen(true)}><Download size={17} /> Générer PDF</Button>
          <Button onClick={() => setPreviewOpen(true)}><Printer size={17} /> Imprimer</Button>
          <Button onClick={() => onAction(`Archiver ${template.label}`)}><Archive size={17} /> Archiver</Button>
        </div>
      </div>

      <Panel title={title}>
        <FillableDocument template={template} values={values} onChange={updateField} />
      </Panel>

      <div className="document-source-strip">
        <img src={ekimmoAssets.logo} alt="E.K immo" />
        <p><span>Modèle actif</span><strong>{template.label}</strong></p>
        <p><span>Fichier</span><strong>{template.source}</strong></p>
        <a href={template.file} target="_blank" rel="noreferrer">
          <Eye size={16} /> Original
        </a>
        {relatedFiles.map((file) => (
          <a href={file.href} target="_blank" rel="noreferrer" key={file.href}>
            <Download size={15} /> {file.label}
          </a>
        ))}
      </div>
      {previewOpen && (
        <DocumentPreviewModal
          template={template}
          values={values}
          onChange={updateField}
          onClose={() => setPreviewOpen(false)}
        />
      )}
    </section>
  );
}

function DocumentPreviewModal({ template, values, onChange, onClose }) {
  return (
    <div className="modal-backdrop document-print-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="modal-card document-print-modal" role="dialog" aria-modal="true" onMouseDown={(event) => event.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="document-print-head">
          <div>
            <span>Aperçu avant impression</span>
            <h2>{template.label}</h2>
            <p>Le PDF sera généré depuis cette version remplie. Les champs modifiés remplacent uniquement les zones variables du modèle source.</p>
          </div>
          <div className="document-editor-actions">
            <Button onClick={() => window.print()}><Printer size={17} /> Imprimer</Button>
            <Button variant="primary" onClick={onClose}><Download size={17} /> Valider la sortie PDF</Button>
          </div>
        </div>
        <FillableDocument template={template} values={values} onChange={onChange} readOnly preview />
      </section>
    </div>
  );
}

function PropertyPdfModal({ property, archived, onArchive, onClose }) {
  const owner = owners.find((item) => item.name === property.owner);
  const tenant = tenants.find((item) => item.name === property.tenant);

  const archive = () => {
    onArchive(property);
  };

  return (
    <div className="modal-backdrop document-print-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="modal-card document-print-modal" role="dialog" aria-modal="true" onMouseDown={(event) => event.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="document-print-head">
          <div>
            <span>Fiche PDF du bien</span>
            <h2>{property.name}</h2>
            <p>Fiche prête à transmettre au client, à imprimer ou à archiver dans les documents du bien.</p>
          </div>
          <div className="document-editor-actions">
            <Button variant="primary" onClick={() => window.print()}><Download size={17} /> Télécharger PDF</Button>
            <Button onClick={() => window.print()}><Printer size={17} /> Imprimer</Button>
            <Button onClick={archive} disabled={archived}><Archive size={17} /> {archived ? "Archivé" : "Archiver dans documents"}</Button>
          </div>
        </div>
        <PropertyPdfDocument property={property} owner={owner} tenant={tenant} />
      </section>
    </div>
  );
}

function PropertyPdfDocument({ property, owner, tenant }) {
  const characteristics = [
    ["Surface", property.surface],
    ["Pièces", property.rooms],
    ["Chambres", property.bedrooms],
    ["Salles de bain", property.baths],
    ["Mode financier", property.financialMode],
  ].filter(([, value]) => value !== undefined && value !== null && value !== "");
  const observations = [
    property.lastAction,
    isMaintenanceOnlyProperty(property) ? "Bien suivi en entretien seul par E.K immo." : "Bien suivi dans le portefeuille de gestion E.K immo.",
    property.focalPoint ? `Point focal : ${property.focalPoint.name} (${property.focalPoint.phone}).` : "",
  ].filter(Boolean);

  return (
    <article className="original-document property-pdf-document">
      <section className="source-sheet property-pdf-sheet">
        <header className="property-pdf-header">
          <img src={ekimmoAssets.logo} alt="E.K immo" />
          <div>
            <span>Fiche du bien</span>
            <h3>{property.name}</h3>
            <p>{property.code}</p>
          </div>
          <Badge label={property.status} />
        </header>

        <img className="property-pdf-photo" src={property.image} alt={property.name} />

        <section className="property-pdf-summary">
          <div>
            <small>Référence</small>
            <strong>{property.code}</strong>
          </div>
          <div>
            <small>Type</small>
            <strong>{property.type}</strong>
          </div>
          <div>
            <small>Quartier</small>
            <strong>{property.district}</strong>
          </div>
          <div>
            <small>Prix</small>
            <strong>{property.price} {property.period}</strong>
          </div>
          <div>
            <small>Caution</small>
            <strong>{property.deposit}</strong>
          </div>
          <div>
            <small>Statut</small>
            <strong>{property.status}</strong>
          </div>
        </section>

        <section className="property-pdf-section">
          <h4>Adresse</h4>
          <p>{property.address}</p>
        </section>

        <section className="property-pdf-two">
          <div className="property-pdf-section">
            <h4>Propriétaire</h4>
            <p><strong>{property.owner}</strong></p>
            <p>{owner?.phone ?? "Téléphone à confirmer"}</p>
            <p>{owner?.email ?? "Email à confirmer"}</p>
          </div>
          <div className="property-pdf-section">
            <h4>Locataire</h4>
            {tenant ? (
              <>
                <p><strong>{tenant.name}</strong></p>
                <p>{tenant.phone}</p>
                <p>{tenant.email}</p>
              </>
            ) : (
              <p>{property.tenant && property.tenant !== "Libre" ? property.tenant : "Non applicable"}</p>
            )}
          </div>
        </section>

        <section className="property-pdf-section">
          <h4>Caractéristiques</h4>
          <div className="property-pdf-facts">
            {characteristics.map(([label, value]) => (
              <p key={label}><span>{label}</span><strong>{value}</strong></p>
            ))}
          </div>
        </section>

        <section className="property-pdf-section">
          <h4>Équipements</h4>
          <div className="property-pdf-tags">
            {(property.tags?.length ? property.tags : ["Équipements à compléter"]).map((tag) => <span key={tag}>{tag}</span>)}
          </div>
        </section>

        <section className="property-pdf-section">
          <h4>Observations</h4>
          {observations.map((item) => <p key={item}>{item}</p>)}
        </section>

        <footer className="property-pdf-footer">
          <img src={ekimmoAssets.logo} alt="E.K immo" />
          <div>
            <strong>E.K immo SAS</strong>
            <span>Niaréla, face mairie - Bamako, Mali</span>
            <span>Contact : +223 72 77 71 77 / +223 44 44 13 31</span>
            <span>www.ekimmo-mali.com</span>
          </div>
        </footer>
      </section>
    </article>
  );
}

function OwnerStatementModal({ owner, chargesList = charges, paymentsList = paymentRecords, reversalsList = reversals, onClose }) {
  const [values, setValues] = useState({
    start: "2026-05-01",
    end: "2026-05-31",
    includeCharges: "Oui",
    includeReversals: "Oui",
  });
  const [preview, setPreview] = useState(false);

  const update = (key, value) => setValues((current) => ({ ...current, [key]: value }));
  const generatePdf = () => {
    setPreview(true);
    window.setTimeout(() => window.print(), 90);
  };

  return (
    <div className="modal-backdrop document-print-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="modal-card document-print-modal owner-statement-modal" role="dialog" aria-modal="true" onMouseDown={(event) => event.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="document-print-head">
          <div>
            <span>Situation propriétaire</span>
            <h2>{owner.name}</h2>
            <p>Générer un état propriétaire avec la période, les charges et les reversements à inclure dans la sortie PDF.</p>
          </div>
          <div className="document-editor-actions">
            <Button onClick={() => setPreview(true)}><Eye size={17} /> Prévisualiser</Button>
            <Button variant="primary" onClick={generatePdf}><Download size={17} /> Générer PDF</Button>
          </div>
        </div>

        <div className="owner-statement-layout">
          <Panel title="Paramètres de l'état">
            <div className="form-grid compact-form">
              <label>Période début<input type="date" value={values.start} onChange={(event) => update("start", event.target.value)} /></label>
              <label>Période fin<input type="date" value={values.end} onChange={(event) => update("end", event.target.value)} /></label>
              <label>Inclure détails des charges<select value={values.includeCharges} onChange={(event) => update("includeCharges", event.target.value)}><option>Oui</option><option>Non</option></select></label>
              <label>Inclure détails des reversements<select value={values.includeReversals} onChange={(event) => update("includeReversals", event.target.value)}><option>Oui</option><option>Non</option></select></label>
            </div>
            <div className="action-row compact-row">
              <Button onClick={onClose}>Annuler</Button>
              <Button onClick={() => setPreview(true)}><Eye size={17} /> Prévisualiser</Button>
              <Button variant="primary" onClick={generatePdf}><Download size={17} /> Générer PDF</Button>
            </div>
          </Panel>

          {preview ? (
            <OwnerStatementDocument
              owner={owner}
              period={values}
              chargesList={chargesList}
              paymentsList={paymentsList}
              reversalsList={reversalsList}
            />
          ) : (
            <Panel className="owner-preview-placeholder">
              <FileText size={34} />
              <h3>Aperçu de la situation propriétaire</h3>
              <p>Cliquez sur Prévisualiser pour contrôler l'état avant génération PDF.</p>
            </Panel>
          )}
        </div>
      </section>
    </div>
  );
}

function OwnerReversementModal({ owner, onSave, onClose }) {
  const [values, setValues] = useState({
    period: "Mai 2026",
    balance: owner.balance,
    amount: parseFCFA(owner.balance) > 0 ? owner.balance : "500 000 FCFA",
    mode: owner.reversementMode ?? "Virement bancaire",
    reference: `REV-2026-${String(Math.max(100, parseFCFA(owner.id) % 900)).padStart(3, "0")}`,
    date: "2026-06-19",
    proof: "",
    observation: `Reversement au profit de ${owner.name}.`,
  });
  const remainingBalance = formatFCFA(Math.max(parseFCFA(values.balance) - parseFCFA(values.amount), 0));

  const update = (key, value) => setValues((current) => ({ ...current, [key]: value }));
  const submit = (generateStatement = false) => {
    const reversement = {
      owner: owner.name,
      ownerId: owner.id,
      period: values.period,
      collected: owner.rent,
      commission: owner.commission,
      charges: owner.charges,
      paid: values.amount,
      balance: remainingBalance,
      status: parseFCFA(remainingBalance) > 0 ? "À reverser" : "Soldé",
      mode: values.mode,
      reference: values.reference,
      date: values.date,
      proof: values.proof || "Justificatif à archiver",
      note: values.observation,
    };

    onSave({ reversement, owner, generateStatement });
  };

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="modal-card wide-modal owner-reversal-modal" role="dialog" aria-modal="true" onMouseDown={(event) => event.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="payment-modal-head">
          <div>
            <span>Reversement propriétaire</span>
            <h2>Enregistrer reversement</h2>
            <p>Le propriétaire est prérempli et le solde restant est calculé automatiquement.</p>
          </div>
          <Badge label={owner.id} />
        </div>

        <div className="form-section">
          <h3>Détails du reversement</h3>
          <div className="form-grid compact-form">
            <label>Propriétaire<input value={owner.name} readOnly /></label>
            <label>Période concernée<input value={values.period} onChange={(event) => update("period", event.target.value)} /></label>
            <label>Solde à reverser<input value={values.balance} onChange={(event) => update("balance", event.target.value)} /></label>
            <label>Montant reversé<input value={values.amount} onChange={(event) => update("amount", event.target.value)} /></label>
            <label>Mode de paiement<select value={values.mode} onChange={(event) => update("mode", event.target.value)}><option>Virement bancaire</option><option>Orange Money</option><option>Moov Money</option><option>Chèque</option><option>Espèces</option></select></label>
            <label>Référence<input value={values.reference} onChange={(event) => update("reference", event.target.value)} /></label>
            <label>Date<input type="date" value={values.date} onChange={(event) => update("date", event.target.value)} /></label>
            <label>Justificatif<input type="file" onChange={(event) => update("proof", event.target.files?.[0]?.name ?? "")} /></label>
            <label className="full">Observation<textarea value={values.observation} onChange={(event) => update("observation", event.target.value)} /></label>
          </div>
        </div>

        <div className="owner-reversal-summary">
          <span>Solde restant calculé</span>
          <strong>{remainingBalance}</strong>
        </div>

        <div className="action-row compact-row">
          <Button onClick={onClose}>Annuler</Button>
          <Button variant="primary" onClick={() => submit(false)}><CheckCircle2 size={17} /> Enregistrer</Button>
          <Button onClick={() => submit(true)}><FileText size={17} /> Enregistrer et générer état</Button>
        </div>
      </section>
    </div>
  );
}

function OwnerPrintableModal({ owner, activeTab = "Résumé", output = "Impression", chargesList = charges, paymentsList = paymentRecords, reversalsList = reversals, onClose }) {
  const isStatement = ["Situation financière", "Reversements"].includes(activeTab);
  const period = {
    start: "2026-05-01",
    end: "2026-05-31",
    includeCharges: "Oui",
    includeReversals: "Oui",
  };

  return (
    <div className="modal-backdrop document-print-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="modal-card document-print-modal" role="dialog" aria-modal="true" onMouseDown={(event) => event.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="document-print-head">
          <div>
            <span>{output}</span>
            <h2>{isStatement ? "Situation propriétaire" : "Fiche propriétaire complète"}</h2>
            <p>{isStatement ? "La sortie reprend l'onglet financier actif de la fiche propriétaire." : "La sortie reprend l'identité, les biens, les conditions de gestion, les documents et les éléments financiers."}</p>
          </div>
          <div className="document-editor-actions">
            <Button variant="primary" onClick={() => window.print()}>
              {output === "Export PDF" ? <Download size={17} /> : <Printer size={17} />}
              {output === "Export PDF" ? "Télécharger PDF" : "Imprimer"}
            </Button>
          </div>
        </div>
        {isStatement ? (
          <OwnerStatementDocument owner={owner} period={period} chargesList={chargesList} paymentsList={paymentsList} reversalsList={reversalsList} />
        ) : (
          <OwnerProfileDocument owner={owner} chargesList={chargesList} paymentsList={paymentsList} reversalsList={reversalsList} />
        )}
      </section>
    </div>
  );
}

function OwnerProfileDocument({ owner, chargesList = charges, paymentsList = paymentRecords, reversalsList = reversals }) {
  const ownedProperties = properties.filter((property) => property.owner === owner.name);
  const ownerPayments = paymentsList.filter((payment) => payment.owner === owner.name);
  const ownerCharges = chargesList.filter((charge) => charge.owner === owner.name);
  const ownerReversals = reversalsList.filter((reversal) => reversal.owner === owner.name);
  const collected = ownerPayments.length ? formatFCFA(ownerPayments.reduce((sum, payment) => sum + parseFCFA(payment.paid), 0)) : owner.rent;

  return (
    <article className="original-document owner-document">
      <section className="source-sheet owner-source-sheet">
        <header className="owner-document-header">
          <img src={ekimmoAssets.logo} alt="E.K immo" />
          <div>
            <span>Fiche propriétaire</span>
            <h3>{owner.name}</h3>
            <p>{owner.id}</p>
          </div>
          <Badge label={owner.status} />
        </header>

        <section className="owner-document-facts">
          <div>
            <small>Téléphone</small>
            <strong>{owner.phone}</strong>
          </div>
          <div>
            <small>Email</small>
            <strong>{owner.email}</strong>
          </div>
          <div>
            <small>Adresse</small>
            <strong>{owner.address ?? "Adresse à compléter"}</strong>
          </div>
          <div>
            <small>Conditions de gestion</small>
            <strong>{owner.mandateType ?? "Mandat actif"}</strong>
          </div>
          <div>
            <small>Commission</small>
            <strong>{owner.commission}</strong>
          </div>
          <div>
            <small>Reversement</small>
            <strong>{owner.reversementMode ? `${owner.reversementMode} · ${owner.reversementPeriod}` : "Mensuel"}</strong>
          </div>
        </section>

        <section className="property-pdf-section">
          <h4>Situation synthétique</h4>
          <div className="property-pdf-facts">
            <p><span>Biens confiés</span><strong>{owner.properties}</strong></p>
            <p><span>Loyers encaissés</span><strong>{collected}</strong></p>
            <p><span>Charges déduites</span><strong>{owner.charges}</strong></p>
            <p><span>Solde à reverser</span><strong>{owner.balance}</strong></p>
            <p><span>Dernier reversement</span><strong>{owner.lastPayment}</strong></p>
            <p><span>Documents</span><strong>{(owner.documents ?? ["Pièce d'identité", "Mandat", "RIB"]).join(", ")}</strong></p>
          </div>
        </section>

        <OwnerDocumentTable
          title="Biens rattachés"
          columns={["Référence", "Bien", "Quartier", "Statut", "Loyer"]}
          rows={(ownedProperties.length ? ownedProperties : properties.slice(0, 2)).map((property) => [property.code, property.name, property.district, property.status, `${property.price} ${property.period}`])}
        />

        <OwnerDocumentTable
          title="Paiements récents"
          columns={["Référence", "Période", "Locataire", "Bien", "Payé"]}
          rows={(ownerPayments.length ? ownerPayments : paymentRecords.slice(0, 2)).map((payment) => [payment.reference, payment.period, payment.tenant, payment.property, payment.paid])}
        />

        <OwnerDocumentTable
          title="Charges et reversements"
          columns={["Type", "Référence", "Date", "Montant", "Statut"]}
          rows={[
            ...ownerCharges.slice(0, 3).map((charge) => ["Charge", charge.id, charge.date, charge.amount, charge.status]),
            ...ownerReversals.slice(0, 3).map((reversal) => ["Reversement", reversal.reference ?? "État propriétaire", reversal.date ?? owner.lastPayment, reversal.paid, reversal.status]),
          ]}
        />

        <footer className="property-pdf-footer">
          <img src={ekimmoAssets.logo} alt="E.K immo" />
          <div>
            <strong>E.K immo SAS</strong>
            <span>Niaréla, face mairie - Bamako, Mali</span>
            <span>Contact : +223 72 77 71 77 / +223 44 44 13 31</span>
            <span>Document généré le 19/06/2026</span>
          </div>
        </footer>
      </section>
    </article>
  );
}

function OwnerStatementDocument({ owner, period, chargesList = charges, paymentsList = paymentRecords, reversalsList = reversals }) {
  const ownerPayments = paymentsList.filter((payment) => payment.owner === owner.name);
  const ownerCharges = chargesList.filter((charge) => charge.owner === owner.name);
  const ownerReversals = reversalsList.filter((reversal) => reversal.owner === owner.name);
  const collected = ownerPayments.reduce((sum, payment) => sum + parseFCFA(payment.paid), 0) || parseFCFA(owner.rent);
  const chargesTotal = ownerCharges.reduce((sum, charge) => sum + parseFCFA(charge.amount), 0) || parseFCFA(owner.charges);
  const reversalsTotal = ownerReversals.reduce((sum, reversal) => sum + parseFCFA(reversal.paid), 0);
  const includeCharges = period.includeCharges === "Oui";
  const includeReversals = period.includeReversals === "Oui";

  return (
    <article className="original-document owner-document">
      <section className="source-sheet owner-source-sheet">
        <header className="owner-document-header">
          <img src={ekimmoAssets.logo} alt="E.K immo" />
          <div>
            <span>État propriétaire</span>
            <h3>{owner.name}</h3>
            <p>{period.start} au {period.end}</p>
          </div>
          <Badge label={owner.status} />
        </header>

        <section className="property-pdf-summary owner-statement-summary">
          <div>
            <small>Loyers encaissés</small>
            <strong>{formatFCFA(collected)}</strong>
          </div>
          <div>
            <small>Commission E.K immo</small>
            <strong>{owner.commission}</strong>
          </div>
          <div>
            <small>Charges déduites</small>
            <strong>{formatFCFA(chargesTotal)}</strong>
          </div>
          <div>
            <small>Reversements enregistrés</small>
            <strong>{formatFCFA(reversalsTotal)}</strong>
          </div>
          <div>
            <small>Solde à reverser</small>
            <strong>{owner.balance}</strong>
          </div>
          <div>
            <small>Dernière opération</small>
            <strong>{owner.lastPayment}</strong>
          </div>
        </section>

        <OwnerDocumentTable
          title="Paiements pris en compte"
          columns={["Date", "Période", "Locataire", "Bien", "Montant"]}
          rows={(ownerPayments.length ? ownerPayments : paymentRecords.slice(0, 2)).map((payment) => [payment.date, payment.period, payment.tenant, payment.property, payment.paid])}
        />

        {includeCharges && (
          <OwnerDocumentTable
            title="Détail des charges"
            columns={["Date", "Type", "Bien", "Montant", "Statut"]}
            rows={(ownerCharges.length ? ownerCharges : charges.slice(0, 2)).map((charge) => [charge.date, charge.type, charge.property, charge.amount, charge.status])}
          />
        )}

        {includeReversals && (
          <OwnerDocumentTable
            title="Détail des reversements"
            columns={["Période", "Référence", "Payé", "Solde", "Statut"]}
            rows={(ownerReversals.length ? ownerReversals : reversals.slice(0, 2)).map((reversal) => [reversal.period ?? "Mai 2026", reversal.reference ?? "État propriétaire", reversal.paid, reversal.balance, reversal.status])}
          />
        )}

        <footer className="property-pdf-footer">
          <img src={ekimmoAssets.logo} alt="E.K immo" />
          <div>
            <strong>E.K immo SAS</strong>
            <span>Niaréla, face mairie - Bamako, Mali</span>
            <span>État propriétaire généré pour contrôle, signature et archivage.</span>
            <span>Contact : +223 72 77 71 77 / +223 44 44 13 31</span>
          </div>
        </footer>
      </section>
    </article>
  );
}

function OwnerDocumentTable({ title, columns, rows }) {
  const displayRows = rows.length ? rows : [["-", "Aucune donnée disponible", "-", "-", "-"]];

  return (
    <section className="property-pdf-section owner-document-table-section">
      <h4>{title}</h4>
      <table className="owner-document-table">
        <thead>
          <tr>{columns.map((column) => <th key={column}>{column}</th>)}</tr>
        </thead>
        <tbody>
          {displayRows.map((row, rowIndex) => (
            <tr key={`${title}-${rowIndex}`}>
              {columns.map((column, columnIndex) => <td key={`${column}-${columnIndex}`}>{row[columnIndex] ?? "-"}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

function FillableDocument({ template, values, onChange, readOnly = false, preview = false }) {
  if (preview) {
    if (template.key === "facture") return <OriginalInvoiceDocument values={values} />;
    if (template.key === "recu") return <OriginalReceiptDocument values={values} />;
    if (template.key === "bordereau") return <OriginalCommissionStatement values={values} />;
  }

  if (template.key === "bail") {
    return <FillableBail values={values} onChange={onChange} readOnly={readOnly} preview={preview} />;
  }

  return (
    <div className={`fillable-document digital ${template.key}`}>
      {template.key === "recu" && <DigitalReceipt values={values} onChange={onChange} readOnly={readOnly} />}
      {template.key === "bordereau" && <DigitalCommissionStatement values={values} onChange={onChange} readOnly={readOnly} />}
      {template.key === "facture" && <DigitalInvoice values={values} onChange={onChange} readOnly={readOnly} />}
    </div>
  );
}

function DigitalDocumentHeader({ title, subtitle, children }) {
  return (
    <header className="digital-doc-header">
      <img src={ekimmoAssets.logo} alt="E.K immo" />
      <div className="company-info">
        <strong>E.K immo SAS</strong>
        <span>Société immobilière</span>
        <span>Niaréla, face mairie - Bamako, Mali</span>
        <span>Contact : +223 72 77 71 77 / +223 44 44 13 31</span>
        <span>RCCM : MA BKO 2022 B-2224</span>
      </div>
      <div className="digital-doc-title">
        <span>{subtitle}</span>
        <h3>{title}</h3>
        {children}
      </div>
    </header>
  );
}

function DigitalField({ name, label, values, onChange, multiline = false, className = "", hideLabel = false, readOnly = false }) {
  const fieldClass = `digital-field ${className} ${hideLabel ? "hide-label" : ""}`.trim();

  return (
    <label className={fieldClass}>
      <span className={hideLabel ? "sr-only" : ""}>{label}</span>
      {multiline ? (
        <textarea value={values[name] ?? ""} onChange={(event) => onChange(name, event.target.value)} readOnly={readOnly} />
      ) : (
        <input value={values[name] ?? ""} onChange={(event) => onChange(name, event.target.value)} readOnly={readOnly} />
      )}
    </label>
  );
}

function DigitalCheck({ name, label, values, onChange, readOnly = false }) {
  return (
    <label className="digital-check">
      <input type="checkbox" checked={Boolean(values[name])} onChange={(event) => onChange(name, event.target.checked)} disabled={readOnly} />
      <span>{label}</span>
    </label>
  );
}

function getInvoiceLines(values) {
  if (Array.isArray(values.invoiceLines) && values.invoiceLines.length > 0) {
    return values.invoiceLines;
  }

  return [{
    id: "invoice-line-1",
    designation: values.designation ?? "",
    loyer: values.loyer ?? "",
    quantite: values.quantite ?? "1",
    montant: values.montant ?? "",
  }];
}

function getCommissionLines(values) {
  if (Array.isArray(values.commissionLines) && values.commissionLines.length > 0) {
    return values.commissionLines;
  }

  const fallbackRows = [
    { id: "commission-line-1", locataire: values.locataire1 ?? "", periode: values.periode1 ?? "", encaisse: values.encaisse1 ?? "", taux: values.taux1 ?? "", commission: values.commission1 ?? "" },
    { id: "commission-line-2", locataire: values.locataire2 ?? "", periode: values.periode2 ?? "", encaisse: values.encaisse2 ?? "", taux: values.taux2 ?? "", commission: values.commission2 ?? "" },
    { id: "commission-line-3", locataire: values.locataire3 ?? "", periode: values.periode3 ?? "", encaisse: values.encaisse3 ?? "", taux: values.taux3 ?? "", commission: values.commission3 ?? "" },
  ].filter((row) => Object.entries(row).some(([key, value]) => key !== "id" && Boolean(value)));

  return fallbackRows.length > 0 ? fallbackRows : [{ id: "commission-line-1", locataire: "", periode: "", encaisse: "", taux: "10%", commission: "" }];
}

function makeDocumentLineId(prefix) {
  return `${prefix}-${Date.now()}-${Math.round(Math.random() * 1000)}`;
}

function EditableCell({ value, onChange, label, multiline = false, readOnly = false }) {
  return (
    <label className="digital-field hide-label">
      <span className="sr-only">{label}</span>
      {multiline ? (
        <textarea value={value ?? ""} onChange={(event) => onChange(event.target.value)} readOnly={readOnly} />
      ) : (
        <input value={value ?? ""} onChange={(event) => onChange(event.target.value)} readOnly={readOnly} />
      )}
    </label>
  );
}

function DigitalInvoice({ values, onChange, readOnly = false }) {
  const rows = getInvoiceLines(values);
  const updateLine = (rowId, field, value) => {
    onChange("invoiceLines", rows.map((row) => (row.id === rowId ? { ...row, [field]: value } : row)));
  };
  const addLine = () => {
    onChange("invoiceLines", [
      ...rows,
      { id: makeDocumentLineId("invoice-line"), designation: "", loyer: "", quantite: "1", montant: "" },
    ]);
  };
  const removeLine = (rowId) => {
    const nextRows = rows.filter((row) => row.id !== rowId);
    onChange("invoiceLines", nextRows.length > 0 ? nextRows : [{ id: makeDocumentLineId("invoice-line"), designation: "", loyer: "", quantite: "1", montant: "" }]);
  };

  return (
    <div className="digital-page invoice-page">
      <DigitalDocumentHeader title="Facture" subtitle="Document digital">
        <div className="digital-meta-grid">
          <DigitalField name="numero" label="Numéro" values={values} onChange={onChange} />
          <DigitalField name="date" label="Date" values={values} onChange={onChange} />
        </div>
      </DigitalDocumentHeader>

      <section className="digital-grid two">
        <div className="digital-box">
          <h4>Facturé à</h4>
          <DigitalField name="client" label="Client / adresse" values={values} onChange={onChange} multiline hideLabel />
        </div>
        <div className="digital-box">
          <h4>Bien concerné</h4>
          <DigitalField name="bien" label="Bien" values={values} onChange={onChange} />
          <DigitalField name="adresse" label="Adresse" values={values} onChange={onChange} />
        </div>
      </section>

      <div className="digital-table-wrap">
        <table className="digital-table invoice-table">
          <thead>
            <tr>
              <th>Désignation</th>
              <th>Loyer mensuel</th>
              <th>Qté</th>
              <th>Montant FCFA</th>
              <th className="row-action-column">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={row.id}>
                <td><EditableCell label={`Désignation ${index + 1}`} value={row.designation} onChange={(value) => updateLine(row.id, "designation", value)} multiline readOnly={readOnly} /></td>
                <td><EditableCell label={`Loyer ${index + 1}`} value={row.loyer} onChange={(value) => updateLine(row.id, "loyer", value)} readOnly={readOnly} /></td>
                <td><EditableCell label={`Quantité ${index + 1}`} value={row.quantite} onChange={(value) => updateLine(row.id, "quantite", value)} readOnly={readOnly} /></td>
                <td><EditableCell label={`Montant ${index + 1}`} value={row.montant} onChange={(value) => updateLine(row.id, "montant", value)} readOnly={readOnly} /></td>
                <td className="row-action-cell">
                  <button type="button" onClick={() => removeLine(row.id)} disabled={readOnly || rows.length === 1} aria-label={`Supprimer la ligne ${index + 1}`}>
                    <XCircle size={17} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="document-row-actions">
        <Button onClick={addLine}><Plus size={17} /> Ajouter une ligne de désignation</Button>
      </div>

      <section className="digital-footer-grid">
        <div className="digital-box">
          <h4>Montant arrêté</h4>
          <DigitalField name="montantLettres" label="Montant en lettres" values={values} onChange={onChange} multiline hideLabel />
        </div>
        <div className="digital-totals">
          <DigitalField name="totalHt" label="Total HT" values={values} onChange={onChange} />
          <DigitalField name="tva" label="TVA" values={values} onChange={onChange} />
          <DigitalField name="totalTtc" label="Total TTC" values={values} onChange={onChange} />
        </div>
      </section>

      <section className="signature-grid">
        <div><span>E.K immo</span><strong>Cachet & signature</strong></div>
        <div><span>Client</span><strong>Bon pour accord</strong></div>
      </section>
    </div>
  );
}

function DigitalReceipt({ values, onChange }) {
  return (
    <div className="digital-page receipt-page">
      <DigitalDocumentHeader title="Reçu d'encaissement" subtitle="Encaissement loyer">
        <div className="digital-meta-grid">
          <DigitalField name="numero" label="N° reçu" values={values} onChange={onChange} />
          <DigitalField name="date" label="Date" values={values} onChange={onChange} />
        </div>
      </DigitalDocumentHeader>

      <section className="digital-grid three">
        <DigitalField name="nom" label="Nom et prénom" values={values} onChange={onChange} />
        <DigitalField name="structure" label="Fonction / structure" values={values} onChange={onChange} />
        <DigitalField name="telephone" label="Téléphone" values={values} onChange={onChange} />
      </section>

      <section className="digital-grid two">
        <DigitalField name="montantChiffres" label="Montant en chiffres" values={values} onChange={onChange} />
        <DigitalField name="montantLettres" label="Montant en lettres" values={values} onChange={onChange} />
      </section>

      <section className="payment-methods">
        <span>Mode de règlement</span>
        <DigitalCheck name="espece" label="Espèces" values={values} onChange={onChange} />
        <DigitalCheck name="cheque" label="Chèque" values={values} onChange={onChange} />
        <DigitalCheck name="virement" label="Virement" values={values} onChange={onChange} />
        <DigitalCheck name="mobileMoney" label="Mobile Money" values={values} onChange={onChange} />
      </section>

      <section className="digital-box">
        <h4>Objet de l'encaissement</h4>
        <DigitalField name="objet" label="Objet" values={values} onChange={onChange} multiline hideLabel />
      </section>

      <section className="digital-grid two">
        <DigitalField name="lieu" label="Lieu" values={values} onChange={onChange} />
        <DigitalField name="agent" label="Agent E.K immo" values={values} onChange={onChange} />
      </section>

      <section className="signature-grid">
        <div><span>Bénéficiaire</span><strong>Signature</strong></div>
        <div><span>E.K immo</span><strong>Signature & cachet</strong></div>
      </section>
    </div>
  );
}

function DigitalCommissionStatement({ values, onChange }) {
  const rows = getCommissionLines(values);
  const updateLine = (rowId, field, value) => {
    onChange("commissionLines", rows.map((row) => (row.id === rowId ? { ...row, [field]: value } : row)));
  };
  const addLine = () => {
    onChange("commissionLines", [
      ...rows,
      { id: makeDocumentLineId("commission-line"), locataire: "", periode: "", encaisse: "", taux: "10%", commission: "" },
    ]);
  };
  const removeLine = (rowId) => {
    const nextRows = rows.filter((row) => row.id !== rowId);
    onChange("commissionLines", nextRows.length > 0 ? nextRows : [{ id: makeDocumentLineId("commission-line"), locataire: "", periode: "", encaisse: "", taux: "10%", commission: "" }]);
  };

  return (
    <div className="digital-page statement-page">
      <DigitalDocumentHeader title="Bordereau commissions" subtitle="Gestion locative">
        <div className="digital-meta-grid">
          <DigitalField name="numero" label="N° bordereau" values={values} onChange={onChange} />
          <DigitalField name="date" label="Date" values={values} onChange={onChange} />
        </div>
      </DigitalDocumentHeader>

      <section className="digital-grid two">
        <DigitalField name="partenaire" label="Propriétaire / partenaire" values={values} onChange={onChange} />
        <DigitalField name="periode" label="Période couverte" values={values} onChange={onChange} />
      </section>

      <div className="digital-table-wrap">
        <table className="digital-table statement-table">
          <thead>
            <tr>
              <th>Locataire / bien</th>
              <th>Période</th>
              <th>Montant encaissé</th>
              <th>Taux</th>
              <th>Commission E.K immo</th>
              <th className="row-action-column">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={row.id}>
                <td><EditableCell label={`Locataire ${index + 1}`} value={row.locataire} onChange={(value) => updateLine(row.id, "locataire", value)} /></td>
                <td><EditableCell label={`Période ${index + 1}`} value={row.periode} onChange={(value) => updateLine(row.id, "periode", value)} /></td>
                <td><EditableCell label={`Montant ${index + 1}`} value={row.encaisse} onChange={(value) => updateLine(row.id, "encaisse", value)} /></td>
                <td><EditableCell label={`Taux ${index + 1}`} value={row.taux} onChange={(value) => updateLine(row.id, "taux", value)} /></td>
                <td><EditableCell label={`Commission ${index + 1}`} value={row.commission} onChange={(value) => updateLine(row.id, "commission", value)} /></td>
                <td className="row-action-cell">
                  <button type="button" onClick={() => removeLine(row.id)} disabled={rows.length === 1} aria-label={`Supprimer la ligne ${index + 1}`}>
                    <XCircle size={17} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="document-row-actions">
        <Button onClick={addLine}><Plus size={17} /> Ajouter une ligne locataire</Button>
      </div>

      <section className="digital-footer-grid">
        <div className="digital-box">
          <h4>Observations</h4>
          <DigitalField name="observations" label="Observations" values={values} onChange={onChange} multiline hideLabel />
        </div>
        <div className="digital-totals">
          <DigitalField name="total" label="Total encaissé" values={values} onChange={onChange} />
          <DigitalField name="totalCommission" label="Total commission" values={values} onChange={onChange} />
          <DigitalField name="netProprietaire" label="Net propriétaire" values={values} onChange={onChange} />
        </div>
      </section>
    </div>
  );
}

function LeaseField({ name, label, values, onChange, multiline = false, readOnly = false, className = "" }) {
  const handleChange = (value) => {
    if (!readOnly) onChange?.(name, value);
  };

  return (
    <label className={`lease-field ${className}`.trim()}>
      <span>{label}</span>
      {multiline ? (
        <textarea value={values[name] ?? ""} onChange={(event) => handleChange(event.target.value)} readOnly={readOnly} />
      ) : (
        <input value={values[name] ?? ""} onChange={(event) => handleChange(event.target.value)} readOnly={readOnly} />
      )}
    </label>
  );
}

function LeaseInlineField({ name, label, values, onChange, readOnly = false, wide = false }) {
  const handleChange = (value) => {
    if (!readOnly) onChange?.(name, value);
  };

  return (
    <input
      aria-label={label}
      className={wide ? "lease-inline-field wide" : "lease-inline-field"}
      value={values[name] ?? ""}
      onChange={(event) => handleChange(event.target.value)}
      readOnly={readOnly}
    />
  );
}

function ContractVariableField({ name, label, values, onChange, multiline = false, options, help, readOnly = false, className = "" }) {
  const handleChange = (value) => {
    if (!readOnly) onChange?.(name, value);
  };

  return (
    <label className={`contract-variable-field ${className}`.trim()}>
      <span>{label}</span>
      {options ? (
        <select value={values[name] ?? ""} onChange={(event) => handleChange(event.target.value)} disabled={readOnly}>
          {options.map((option) => <option key={option}>{option}</option>)}
        </select>
      ) : multiline ? (
        <textarea value={values[name] ?? ""} onChange={(event) => handleChange(event.target.value)} readOnly={readOnly} />
      ) : (
        <input value={values[name] ?? ""} onChange={(event) => handleChange(event.target.value)} readOnly={readOnly} />
      )}
      {help && <small>{help}</small>}
    </label>
  );
}

function LeaseVariableForm({ values, onChange, readOnly = false, includeReference = true }) {
  const fieldProps = { values, onChange, readOnly };

  return (
    <div className="lease-variable-form">
      <div className="form-helper-note">
        Renseignez uniquement les éléments variables du bail. Ces informations alimentent automatiquement le modèle de contrat E.K immo au moment de la génération PDF.
      </div>

      {includeReference && (
        <section className="lease-variable-section">
          <h3>Références du contrat</h3>
          <div className="lease-variable-grid">
            <ContractVariableField name="objet" label="Type de contrat" options={["CONTRAT DE BAIL À USAGE PROFESSIONNEL", "Contrat de bail à usage d'habitation", "Mandat de gestion"]} {...fieldProps} />
            <ContractVariableField name="contratNo" label="Numéro contrat" help="Généré automatiquement, modifiable si besoin." {...fieldProps} />
            <ContractVariableField name="souscritLe" label="Date de souscription" {...fieldProps} />
            <ContractVariableField name="bailleurRep" label="Représentant du bailleur" {...fieldProps} />
          </div>
        </section>
      )}

      <section className="lease-variable-section">
        <h3>Identité du preneur</h3>
        <div className="lease-variable-grid">
          <ContractVariableField name="civilite" label="Civilité" options={["Madame", "Monsieur", "Société"]} {...fieldProps} />
          <ContractVariableField name="preneur" label="Nom complet ou raison sociale" {...fieldProps} />
          <ContractVariableField name="naissance" label="Date et lieu de naissance / création" {...fieldProps} />
          <ContractVariableField name="nina" label="Numéro carte NINA ou pièce d'identité" {...fieldProps} />
          <ContractVariableField name="qualitePreneur" label="Qualité / fonction du signataire" {...fieldProps} />
          <ContractVariableField name="telephonePreneur" label="Téléphone du preneur" {...fieldProps} />
          <ContractVariableField className="full" name="adressePreneur" label="Adresse complète du preneur" {...fieldProps} />
        </div>
      </section>

      <section className="lease-variable-section">
        <h3>Local loué et destination</h3>
        <div className="lease-variable-grid">
          <ContractVariableField name="bien" label="Bien concerné" {...fieldProps} />
          <ContractVariableField name="localType" label="Nature du local" {...fieldProps} />
          <ContractVariableField className="full" name="localAdresse" label="Adresse du local" {...fieldProps} />
          <ContractVariableField className="full" name="designationLocal" label="Désignation détaillée du local" multiline {...fieldProps} />
          <ContractVariableField className="full" name="activite" label="Destination / activité autorisée" multiline {...fieldProps} />
        </div>
      </section>

      <section className="lease-variable-section">
        <h3>Durée et conditions financières</h3>
        <div className="lease-variable-grid three">
          <ContractVariableField name="duree" label="Durée du bail" {...fieldProps} />
          <ContractVariableField name="effetDate" label="Date de prise d'effet" {...fieldProps} />
          <ContractVariableField name="expirationDate" label="Date d'expiration" {...fieldProps} />
          <ContractVariableField name="loyerHt" label="Loyer mensuel HT" {...fieldProps} />
          <ContractVariableField name="loyerTtc" label="Loyer mensuel TTC" {...fieldProps} />
          <ContractVariableField name="paiementJour" label="Échéance de paiement" {...fieldProps} />
          <ContractVariableField name="caution" label="Montant de la caution" {...fieldProps} />
          <ContractVariableField name="cautionMois" label="Nombre de mois de caution" {...fieldProps} />
          <ContractVariableField name="revisionFrequence" label="Périodicité de révision" {...fieldProps} />
        </div>
      </section>

      <section className="lease-variable-section">
        <h3>Domicile, signature et clauses particulières</h3>
        <div className="lease-variable-grid">
          <ContractVariableField name="domicileBailleur" label="Domicile élu du bailleur" {...fieldProps} />
          <ContractVariableField name="domicilePreneur" label="Domicile élu du preneur" {...fieldProps} />
          <ContractVariableField name="lieuSignature" label="Lieu de signature" {...fieldProps} />
          <ContractVariableField name="dateSignature" label="Date de signature" {...fieldProps} />
          <ContractVariableField className="full" name="conditions" label="Conditions particulières à insérer" multiline {...fieldProps} />
        </div>
      </section>
    </div>
  );
}

function FillableBail({ values, onChange, readOnly = false, preview = false }) {
  return (
    <div className="fillable-document digital bail">
      {preview ? (
        <OriginalLeaseDocument values={values} />
      ) : (
        <LeaseVariableForm values={values} onChange={onChange} readOnly={readOnly} />
      )}
    </div>
  );
}

function getDocumentLines(value, fallback = []) {
  const lines = String(value ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return lines.length > 0 ? lines : fallback;
}

function SourceFill({ children }) {
  return <span className="source-fill">{children || "\u00a0"}</span>;
}

function ReceiptLine({ label, value, className = "" }) {
  return (
    <p className={`receipt-source-line ${className}`.trim()}>
      <strong>{label}</strong>
      <SourceFill>{value}</SourceFill>
    </p>
  );
}

function ReceiptMethod({ label, checked }) {
  return (
    <span className="receipt-method">
      <span>{label}</span>
      <i>{checked ? "X" : ""}</i>
    </span>
  );
}

function OriginalInvoiceDocument({ values }) {
  const clientLines = getDocumentLines(values.client, ["Nom et prénom du client", "Adresse"]);
  const rows = getInvoiceLines(values);

  return (
    <article className="original-document original-invoice-document">
      <section className="source-sheet invoice-source-sheet">
        <header className="invoice-source-header">
          <img src={ekimmoAssets.logo} alt="E.K immo" />
          <h3>FACTURE N° {values.numero || "..."} DU {values.date || ".../.../20..."}</h3>
          <div className="invoice-source-client">
            {clientLines.map((line) => <span key={line}>{line}</span>)}
          </div>
        </header>

        <table className="source-table invoice-source-table">
          <thead>
            <tr>
              <th>Désignation</th>
              <th>Loyer mensuel</th>
              <th>Qté</th>
              <th>Montant en FCFA</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td>
                  <strong>{row.designation || "Loyer de..."}</strong>
                  <span>{values.bien}</span>
                  <span>{values.adresse}</span>
                </td>
                <td>{row.loyer}</td>
                <td>{row.quantite}</td>
                <td>{row.montant}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <table className="source-table invoice-total-table">
          <tbody>
            <tr>
              <th>Total HT</th>
              <td>{values.totalHt}</td>
            </tr>
            <tr>
              <th>TVA</th>
              <td>{values.tva}</td>
            </tr>
            <tr>
              <th>Total TTC à payer</th>
              <td>{values.totalTtc}</td>
            </tr>
          </tbody>
        </table>

        <p className="invoice-amount-letters">
          <strong>Arrêté la présente facture à la somme de :</strong>
          <span>{values.montantLettres}</span>
        </p>

        <footer className="source-signatures invoice-source-signatures">
          <strong>Pour Acquit</strong>
          <strong>Pour ekIMMO</strong>
        </footer>
      </section>
    </article>
  );
}

function OriginalReceiptDocument({ values }) {
  return (
    <article className="original-document original-receipt-document">
      <section className="source-sheet receipt-source-sheet">
        <header className="receipt-source-header">
          <img src={ekimmoAssets.logo} alt="E.K immo" />
          <div className="receipt-source-company">
            <strong>Société Immobilière</strong>
            <span>Niaréla Rue ACHKHABAAD en face de la Mairie</span>
          </div>
          <h3>REÇU D'ENCAISSEMENT</h3>
          <strong className="receipt-source-number">{values.numero || "0002"}</strong>
        </header>

        <div className="receipt-source-lines">
          <ReceiptLine label="Nom et Prénom :" value={values.nom} />
          <ReceiptLine label="Fonction/Structure :" value={values.structure} />
          <ReceiptLine label="Téléphone :" value={values.telephone} />
          <ReceiptLine label="Montant (en chiffres) :" value={values.montantChiffres} />
          <ReceiptLine label="Montant (en lettres) :" value={values.montantLettres} />
          <div className="receipt-method-row">
            <strong>REMIS par le client :</strong>
            <ReceiptMethod label="en espèce" checked={values.espece} />
            <ReceiptMethod label="par chèque" checked={values.cheque} />
            <ReceiptMethod label="par virement" checked={values.virement} />
            <ReceiptMethod label="Mobile Money" checked={values.mobileMoney} />
          </div>
          <ReceiptLine label="Objet :" value={values.objet} className="tall" />
          <ReceiptLine label="A :" value={values.lieu} />
        </div>

        <footer className="receipt-source-footer">
          <strong>SIGNATURE DU BENEFICIAIRE</strong>
          <strong>ekIMMO SAS</strong>
          <span>www.ekimmo-mali.com</span>
          <span>RCCM : MA BKO 2022 B-2224 / NIF : 082255646 X</span>
          <span>Contact : +223 72 77 71 77 / +223 44 44 13 31</span>
        </footer>
      </section>
    </article>
  );
}

function OriginalCommissionStatement({ values }) {
  const filledRows = getCommissionLines(values).filter((row) => ["locataire", "periode", "encaisse", "taux", "commission"].some((key) => Boolean(row[key])));
  const rows = [
    ...filledRows,
    ...Array.from({ length: Math.max(0, 10 - filledRows.length) }, () => ({
      locataire: "",
      periode: "",
      encaisse: "",
      taux: "",
      commission: "",
    })),
  ];

  return (
    <article className="original-document original-commission-document">
      <section className="source-sheet commission-source-sheet">
        <header className="commission-source-header">
          <img src={ekimmoAssets.logo} alt="E.K immo" />
          <h3>BORDEREAU DES ENCAISSEMENTS DE LOYERS ET DE RECOUVREMENT DES CRÉANCES LOCATIVES</h3>
          <strong>{values.partenaire || "NOM DU PARTENAIRE"}</strong>
        </header>

        <p className="commission-source-ref">Bordereau N° {values.numero || "..."} du {values.date || "../../20..."}</p>
        <p className="commission-source-amount">Montant encaissé et recouvré : <strong>{values.total || "..." } FCFA</strong></p>

        <table className="source-table commission-source-table">
          <thead>
            <tr>
              <th>Périodes</th>
              <th>Locataires</th>
              <th>Montants encaissés & recouvrés en FCFA</th>
              <th>Taux de commissions</th>
              <th>Commissions en FCFA</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={`${row.locataire}-${index}`}>
                {index === 0 && <td className="commission-period-cell" rowSpan={rows.length}>{values.periode || "Période"}</td>}
                <td>
                  <span>{row.locataire || "\u00a0"}</span>
                  {row.periode && <small>{row.periode}</small>}
                </td>
                <td>{row.encaisse}</td>
                <td>{row.taux}</td>
                <td>{row.commission}</td>
              </tr>
            ))}
            <tr className="commission-total-row">
              <td colSpan={2}>TOTAL</td>
              <td>{values.total}</td>
              <td>{values.taux1 || "10%"}</td>
              <td>{values.totalCommission}</td>
            </tr>
          </tbody>
        </table>

        {values.observations && <p className="commission-source-note">{values.observations}</p>}
        <p className="commission-source-net">Net propriétaire : <strong>{values.netProprietaire}</strong></p>

        <footer className="source-signatures commission-source-signatures">
          <strong>POUR ekIMMO SAS</strong>
          <strong>POUR {values.partenaire || "NOM DU PARTENAIRE"}</strong>
        </footer>
      </section>
    </article>
  );
}

function LeaseFill({ children, wide = false }) {
  return <span className={wide ? "lease-fill wide" : "lease-fill"}>{children || "..."}</span>;
}

function LeaseMeta({ label, children }) {
  return (
    <p>
      <strong>{label}</strong>
      <span>{children}</span>
    </p>
  );
}

function LeaseHeading({ children }) {
  return <h4 className="lease-original-heading">{children}</h4>;
}

function LeaseSubheading({ children }) {
  return <h5 className="lease-original-subheading">{children}</h5>;
}

function OriginalLeaseDocument({ values }) {
  const localAddress = values.localAdresse || values.adresse;
  const signatureDate = values.dateSignature || values.souscritLe;
  const signaturePlace = values.lieuSignature || "Bamako";
  const contractObject = values.objet || "CONTRAT DE BAIL À USAGE PROFESSIONNEL";

  return (
    <article className="original-lease-document">
      <section className="lease-sheet">
        <header className="lease-original-logo">
          <img src={ekimmoAssets.logo} alt="E.K immo" />
        </header>

        <div className="lease-original-meta">
          <LeaseMeta label="CONTRAT N° :">{values.contratNo}</LeaseMeta>
          <LeaseMeta label="LE SOUSCRIT LE :">{values.souscritLe}</LeaseMeta>
          <LeaseMeta label="PRENEUR :">{values.preneur}</LeaseMeta>
          <LeaseMeta label="OBJET :">{contractObject}</LeaseMeta>
        </div>

        <section className="lease-original-section">
          <LeaseHeading>ENTRE LES SOUSSIGNÉS :</LeaseHeading>
          <p>
            La société <strong>ekIMMO SAS</strong>, société par actions simplifiée au capital d’un million
            (1 000 000) de francs CFA, dont le siège social est situé à Niaréla, rue ACHKHABAD,
            en face de la Mairie, Bamako-MALI, immatriculée au registre de commerce et du crédit mobilier
            de Bamako sous le numéro <strong>MA.BKO.2022.B.2224</strong>, représentée par
            Monsieur <LeaseFill>{values.bailleurRep}</LeaseFill>, demeurant à Bamako, en sa qualité de Président
            dûment habilité aux fins des présentes ;
          </p>
          <p>Ci-après dénommée : <strong>« le bailleur »</strong>,</p>
          <p className="lease-centered">ET</p>
          <div className="lease-identity-lines">
            <p><strong>Nom Prénom :</strong> <LeaseFill wide>{values.preneur}</LeaseFill></p>
            <p><strong>Date de naissance :</strong> <LeaseFill wide>{values.naissance}</LeaseFill></p>
            <p><strong>Numéro carte NINA :</strong> <LeaseFill wide>{values.nina}</LeaseFill></p>
            <p><strong>Adresse :</strong> <LeaseFill wide>{values.adressePreneur}</LeaseFill></p>
            <p><strong>Téléphone :</strong> <LeaseFill wide>{values.telephonePreneur}</LeaseFill></p>
          </div>
          <p>Ci-après dénommée : <strong>« le preneur »</strong>,</p>
          <p>Ci-après ensemble dénommées <strong>« les parties »</strong>.</p>
          <p className="lease-centered strong">IL A ÉTÉ CONVENU CE QUI SUIT :</p>
        </section>

        <section className="lease-original-section">
          <LeaseHeading>OBJET DU CONTRAT</LeaseHeading>
          <p>
            La société ekIMMO SAS, es-qualité, le bailleur, donne à bail à usage professionnel à
            <LeaseFill>{values.civilite}</LeaseFill> <LeaseFill wide>{values.preneur}</LeaseFill>,
            es-qualité de <LeaseFill wide>{values.qualitePreneur}</LeaseFill>, le preneur, le local ci-après désigné,
            le preneur déclarant parfaitement le connaître pour l'avoir vu et visité et qu'il l'accepte :
          </p>
          <LeaseSubheading>Désignation du local</LeaseSubheading>
          <p>
            Le local est un <LeaseFill>{values.localType}</LeaseFill>, situé à <LeaseFill wide>{localAddress}</LeaseFill>,
            tel que ledit immeuble existe, s'étend et se comporte avec ses aisances et dépendances sans exception
            ni réserve.
          </p>
          <p className="lease-reference-line">
            Bien concerné : <LeaseFill wide>{values.bien}</LeaseFill> - Désignation : <LeaseFill wide>{values.designationLocal}</LeaseFill>
          </p>
          <LeaseSubheading>Destination du local</LeaseSubheading>
          <p>
            Le preneur devra occuper les lieux loués par lui-même, paisiblement, conformément aux dispositions
            de l'article 113 de l'Acte uniforme portant sur le droit commercial général, et pour exercer les activités
            de <LeaseFill wide>{values.activite}</LeaseFill>.
          </p>
          <p>En cas de changement de l'activité prévue au présent contrat, le preneur doit obtenir l'accord préalable et exprès du bailleur qui peut s'y opposer pour des motifs sérieux. En cas de conflit entre le bailleur et le preneur, il appartient à la partie la plus diligente de saisir la juridiction compétente.</p>
          <p>Les activités du preneur autorisées ne devront donner lieu à aucune contravention ni à aucune plainte ou réclamation de la part de qui que ce soit et, notamment, des autres locataires et/ou occupants de l'immeuble.</p>
          <p>Le preneur fera en conséquence son affaire personnelle de tous les griefs qui seraient faits au bailleur à son sujet, de manière que ce dernier ne soit jamais inquiété et soit garanti de toutes les conséquences qui pourraient en résulter.</p>
        </section>

        <section className="lease-original-section">
          <LeaseHeading>DATE DE PRISE D’EFFET ET DUREE DU CONTRAT</LeaseHeading>
          <p>
            Le présent bail est fait et consenti pour une durée de <LeaseFill>{values.duree}</LeaseFill> à compter du
            <LeaseFill>{values.effetDate}</LeaseFill>. À l'expiration de cette période, le
            <LeaseFill>{values.expirationDate}</LeaseFill>, il sera prorogé d'année en année par tacite reconduction.
            Au cas où l'une des parties n'aurait pas l'intention de renouveler aux mêmes conditions le présent contrat,
            elle devra le notifier trois (3) mois avant l'expiration du bail en cours par lettre recommandée avec accusé
            de réception ou lettre remise en main propre contre décharge.
          </p>
        </section>

        <section className="lease-original-section">
          <LeaseHeading>CONDITIONS FINANCIERES</LeaseHeading>
          <p>Les parties conviennent des conditions financières suivantes :</p>
          <LeaseSubheading>Loyer</LeaseSubheading>
          <p>
            Le présent bail est fait et consenti moyennant un loyer mensuel de :
            <LeaseFill>{values.loyerHt}</LeaseFill> Hors Taxes, <LeaseFill>{values.loyerTtc}</LeaseFill> Toutes Taxes
            Comprises, payable au plus tard <LeaseFill>{values.paiementJour}</LeaseFill>, sans qu'il y ait lieu à avis préalable.
          </p>
          <p>D'un commun accord il est convenu que tout mois entamé est dû en entier. Dès lors, si le preneur devait, pour quelque motif que ce soit, libérer les lieux en cours de mois, il ne pourrait pas réclamer un quelconque remboursement pour le mois entamé et non terminé.</p>
          <p>Le montant du loyer prévu par le présent contrat sera révisé <LeaseFill>{values.revisionFrequence}</LeaseFill>, sans qu'il puisse être revu à la baisse.</p>
          <LeaseSubheading>Dépôt de garantie (caution)</LeaseSubheading>
          <p>
            Le preneur s'engage à verser au bailleur la somme de <LeaseFill>{values.caution}</LeaseFill> correspondant
            à <LeaseFill>{values.cautionMois}</LeaseFill> de loyer, en garantie de paiement du loyer, de la bonne exécution
            des clauses et conditions du présent bail, des réparations d'entretien ou toute autre somme que le preneur peut
            devoir au bailleur dans le cadre du présent contrat de bail.
          </p>
          <p>Le dépôt de garantie versé ne sera pas réévalué. Il ne produira pas d'intérêt pendant la durée de la location. Il est restitué au preneur dans un délai maximal d'un mois à compter de son départ lorsque l'état des lieux de sortie est conforme à l'état des lieux d'entrée, déduction faite, le cas échéant, des sommes restantes dues au bailleur à titre de loyer, charges, impôts remboursables, réparations, ou à tous autres titres.</p>
        </section>

        <section className="lease-original-section">
          <LeaseHeading>REPARATIONS ET ENTRETIENS</LeaseHeading>
          <p>Le preneur est tenu aux réparations d'entretien, il répond des dégradations ou pertes dues à un défaut d'entretien au cours du bail.</p>
          <p>Par dérogation à l'état des lieux, tous les travaux d'embellissement qui seront entrepris par le preneur resteront en fin du bail, la propriété du bailleur sans contrepartie. Au cas où le bailleur aura l'intention de demander que le lieu soit rétabli à leur état initial à la fin du contrat, il doit le notifier trois mois à l'avance avant l'expiration du contrat. Tous les biens mobiliers apportés par le preneur resteront sa propriété exclusive.</p>
          <p>Le bailleur assurera toutes les grosses réparations qui deviendraient nécessaires sur les lieux. Le preneur devra informer le bailleur des grosses dégradations dans un délai de 15 jours sous peine d'être tenu responsable de toute aggravation résultant de son silence ou de son retard.</p>
          <p>Le preneur devra souffrir sans indemnité, ni diminution de loyer, de tous travaux, quels qu'ils soient, de modification, d'amélioration, ou de construction nouvelle, que le bailleur se réserve de faire exécuter dans les locaux loués ou dans l'immeuble, quels qu'en soient les inconvénients.</p>
        </section>

        <section className="lease-original-section">
          <LeaseHeading>ETAT DES LIEUX</LeaseHeading>
          <p>Un état des lieux contradictoire sera fait entre les parties. Le bailleur s'acquittera de la remise en état des lieux au moment de la signature du contrat. À la fin du contrat pour quelque cause que ce soit, le preneur est tenu de s'acquitter de la remise en état des lieux, dans les mêmes conditions qu'il les a trouvés au moment d'intégrer les locaux du Bailleur. L'état des lieux se fera au début et à la fin du contrat, constaté par un Procès-Verbal signé par les parties ou établi par un tiers mandaté par eux, le coût étant supporté à part égale par les parties.</p>
          <p>Si l'état des lieux ne peut être établi dans les conditions prévues ci-dessus, il sera établi par un huissier de Justice, sur l'initiative de la partie la plus diligente, à frais partagés par moitié entre le bailleur et le preneur.</p>
        </section>

        <section className="lease-original-section">
          <LeaseHeading>LES CONDITIONS DE FIN DE CONTRAT</LeaseHeading>
          <p>Les parties peuvent mettre fin au bail à tout moment, après un préavis de trois (3) mois.</p>
          <p>Le bailleur, quant à lui, peut mettre fin au bail à son échéance et après avoir donné le préavis ci-dessus cité, soit pour reprendre le logement en vue de l'occuper lui-même ou une personne de sa famille, soit pour le vendre, soit pour un motif sérieux et légitime en respectant un préavis de trois (3) mois.</p>
          <LeaseSubheading>DÉPART DU PRENEUR</LeaseSubheading>
          <p>Dès la notification du préavis, le preneur devra permettre la visite des lieux loués, en vue de la nouvelle location, deux heures par jour (les jours ouvrables) et ce, après accord avec le bailleur. À défaut d'accord du preneur pour fixer cet horaire, les visites pourront avoir lieu de 17 heures à 19 heures du lundi au samedi inclus.</p>
          <p>Le preneur devra rendre les clés le jour de son déménagement, même si ce dernier a lieu avant l'expiration du terme en cours. Le preneur devra rendre les locaux loués en bon état conformément aux obligations lui incombant en vertu du présent bail.</p>
        </section>

        <section className="lease-original-section">
          <LeaseHeading>CLAUSES RÉSOLUTOIRES</LeaseHeading>
          <p>À défaut de paiement par le preneur de tout ou partie des loyers et/ou charges aux termes convenus, ou du dépôt de garantie, le présent contrat sera si bon semble au bailleur résilié de plein droit sans aucune autre formalité judiciaire, un mois après un commandement de payer demeuré infructueux.</p>
          <p>À défaut de justification de la souscription de la police d'assurance couvrant les risques définis ci-après, le présent contrat sera si bon semble au bailleur, résilié de plein droit sans autre formalité judiciaire, un mois après un commandement demeuré infructueux.</p>
          <p>Le bailleur pourra invoquer le bénéfice de la présente clause en cas de non-paiement, changement de destination des locaux sans accord écrit, inexploitation, manquement à l'entretien, défaut d'assurance, cession du bail sans accord écrit, sous-location prohibée ou mise en location-gérance prohibée.</p>
          <LeaseSubheading>RESILIATION JUDICIAIRE</LeaseSubheading>
          <p>Le bailleur peut demander judiciairement la résiliation du bail pour toutes infractions aux clauses des présentes telles que troubles de voisinage, défaut d'entretien du logement ou par application des clauses résolutoires.</p>
        </section>

        <section className="lease-original-section">
          <LeaseHeading>ASSURANCE PRENEUR</LeaseHeading>
          <p>Le preneur devra se faire assurer contre l'incendie, les explosions, la foudre, le bris de glaces et les dégâts des eaux, auprès d'une compagnie d'assurance notoirement solvable, tous les biens, y compris le local loué, mis à sa disposition par le bailleur dans le cadre du présent contrat du bail. Il devra payer les primes ou cotisations et justifier du tout à première demande au bailleur par la production de la police.</p>
          <p>Cette obligation de s’assurer s’impose au preneur pendant toute la durée de la location. Il est responsable à l'égard du bailleur de tous les dommages aux locaux loués même si leur cause est inconnue, à moins qu'il ne prouve qu'ils aient eu lieu sans sa faute.</p>
        </section>

        <section className="lease-original-section">
          <LeaseHeading>RÈGLEMENTS DE SECURITÉ ET DE SALUBRITÉ</LeaseHeading>
          <p>Le preneur s'interdira tout acte pouvant nuire à la sécurité des personnes et des biens. Il n'utilisera, ni ne stockera de produits explosifs ou inflammables, autres que ceux d'un usage domestique courant. Il observera les règlements sanitaires applicables et laissera pénétrer dans les lieux loués les représentants du bailleur ou toute personne mandatée par le bailleur, chaque fois que ce sera nécessaire pour la sécurité et pour la salubrité.</p>
        </section>

        <section className="lease-original-section">
          <LeaseHeading>CONDITIONS GENERALES DE LOCATION</LeaseHeading>
          <LeaseSubheading>Occupation des locaux</LeaseSubheading>
          <p>Le preneur devra occuper personnellement les lieux loués et ne pourra en conséquence se substituer à toute personne physique ou morale, même à titre gratuit et/ou temporaire, dans les lieux loués. Il ne pourra sous-louer tout ou partie des lieux sans autorisation expresse et écrite du bailleur. Le preneur s'interdit expressément de changer la disposition des locaux sauf autorisation expresse et écrite du bailleur.</p>
          <LeaseSubheading>Entretien et aménagement des lieux loués</LeaseSubheading>
          <p>Le preneur entretiendra les lieux loués en bon état de réparations locatives. Il s'engage à rendre le logement en bon état de réparations locatives et à signaler au bailleur toute anomalie ou dégradation constatée qui pourrait survenir pendant l'occupation.</p>
          <LeaseSubheading>Visites</LeaseSubheading>
          <p>Le preneur devra laisser visiter les lieux loués toutes les fois que le bailleur ou son mandataire le jugera nécessaire, soit pour veiller au bon état des locaux soit pour la vente de l'immeuble ou toute autre cause.</p>
        </section>

        {values.conditions && (
          <section className="lease-original-section">
            <LeaseHeading>CONDITIONS PARTICULIERES</LeaseHeading>
            <p><LeaseFill wide>{values.conditions}</LeaseFill></p>
          </section>
        )}

        <section className="lease-original-section">
          <LeaseHeading>LOI APPLICABLE</LeaseHeading>
          <p>Tout litige né dans l’exécution du présent contrat, sera soumis aux juridictions maliennes et la loi applicable est celle en vigueur au Mali.</p>
          <LeaseHeading>ARTICLE 8 : ÉLECTION DE DOMICILE</LeaseHeading>
          <p>Pour l'exécution des présentes, les parties élisent domicile :</p>
          <p>Pour le bailleur : <LeaseFill wide>{values.domicileBailleur}</LeaseFill>.</p>
          <p>Pour le preneur : <LeaseFill wide>{values.domicilePreneur}</LeaseFill>.</p>
          <p>Fait à <LeaseFill>{signaturePlace}</LeaseFill>, en deux exemplaires originaux, le <LeaseFill>{signatureDate}</LeaseFill>.</p>
        </section>

        <section className="lease-original-signatures">
          <div>
            <strong>Le bailleur</strong>
            <span>Pour ekIMMO</span>
            <em>{values.bailleurRep}</em>
          </div>
          <div>
            <strong>Le preneur</strong>
            <span>{values.civilite} / M.</span>
            <em>{values.preneur}</em>
          </div>
        </section>
      </section>
    </article>
  );
}

function getRelatedDocumentFiles(key) {
  if (key === "facture") {
    return [
      { label: "Facture LAFIA T1 2026.docx", href: ekimmoAssets.factureDocx },
    ];
  }
  if (key === "bordereau") {
    return [
      { label: "Courrier commission LAFIA T1 2026.docx", href: ekimmoAssets.courrierCommissionDocx },
    ];
  }
  if (key === "bail") {
    return [
      { label: "Contrat de bail DOCX", href: ekimmoAssets.bailDocx },
    ];
  }
  return [];
}

function getDocumentDefaults(key, data = {}) {
  const invoice = data.invoice ?? invoices[0];
  const payment = data.payment ?? paymentRecords[0];
  const property = data.property ?? properties[0];
  const owner = data.owner ?? owners.find((item) => item.name === property.owner) ?? owners[0];
  const tenant = data.tenant ?? tenants.find((item) => item.name === invoice.client) ?? tenants[0];
  const commission = data.commission ?? commissions[0];
  const amountNumber = invoice.amount.replace(" FCFA", "");

  if (key === "recu") {
    return {
      numero: invoice.number.replace("FAC", "REC").replace("QUI", "REC"),
      date: invoice.date,
      nom: invoice.client,
      structure: tenant.id ?? "Locataire",
      telephone: tenant.phone ?? "+223 72 77 71 77",
      montantChiffres: invoice.amount,
      montantLettres: "Quatre cent cinquante mille francs CFA",
      espece: payment.mode === "Espèces",
      cheque: payment.mode === "Chèque",
      virement: payment.mode === "Virement",
      mobileMoney: ["Orange Money", "Moov Money"].includes(payment.mode),
      objet: `Encaissement ${payment.period} - ${invoice.property}`,
      lieu: "Bamako",
      agent: "Aïssata Diarra",
    };
  }

  if (key === "bordereau") {
    return {
      numero: "BOR-2026-017",
      date: "05/06/2026",
      partenaire: owner.name,
      periode: "Janvier 2026 à mars 2026",
      locataire1: `${tenant.name} - ${property.name}`,
      locataire2: `${invoice.client} - Résidence ACI Baobab`,
      locataire3: "Cabinet Diarra & Associés - Plateau Office Center",
      periode1: "Janvier 2026",
      periode2: "Février 2026",
      periode3: "Mars 2026",
      encaisse1: "1 504 500",
      encaisse2: "354 000",
      encaisse3: "442 500",
      taux1: "10%",
      taux2: "10%",
      taux3: "10%",
      commission1: commission.commission,
      commission2: "35 400",
      commission3: "44 250",
      commissionLines: [
        { id: "commission-line-1", locataire: `${tenant.name} - ${property.name}`, periode: "Janvier 2026", encaisse: "1 504 500", taux: "10%", commission: commission.commission },
        { id: "commission-line-2", locataire: `${invoice.client} - Résidence ACI Baobab`, periode: "Février 2026", encaisse: "354 000", taux: "10%", commission: "35 400" },
        { id: "commission-line-3", locataire: "Cabinet Diarra & Associés - Plateau Office Center", periode: "Mars 2026", encaisse: "442 500", taux: "10%", commission: "44 250" },
      ],
      total: "16 599 920",
      totalCommission: "1 659 992",
      netProprietaire: "14 939 928",
      observations: "Bordereau préparé pour validation propriétaire et reversement trimestriel E.K immo.",
    };
  }

  if (key === "bail") {
    const rentValue = parseFCFA(property.price);
    const rentHt = rentValue ? formatFCFA(Math.round(rentValue / 1.18)) : property.price;
    const rentTtc = property.price;

    return {
      contratNo: makeDocumentNumber("CON", 46),
      souscritLe: "05/06/2026",
      objet: "CONTRAT DE BAIL À USAGE PROFESSIONNEL",
      bailleur: "E.K immo SAS",
      bailleurRep: "M. Tidiane Niaro",
      civilite: "Madame",
      preneur: tenant.name,
      locataire: tenant.name,
      naissance: "Née le 14/04/1992 à Bamako",
      nina: "NINA-2026-774412",
      qualitePreneur: "Gérante",
      telephonePreneur: tenant.phone ?? "+223 72 77 71 77",
      adressePreneur: "Hamdallaye ACI 2000, Bamako",
      bien: property.name,
      adresse: property.address,
      localType: property.type?.toLowerCase().includes("bureau") ? "bureau" : "magasin",
      localAdresse: property.address,
      designationLocal: `${property.name}, ${property.type}, situé à ${property.district}. Accès et état des lieux rattachés à la fiche bien ${property.code}.`,
      activite: "vente d'articles de fête et de décoration",
      duree: "un (1) an",
      effetDate: "01/06/2026",
      expirationDate: "31/05/2027",
      loyer: `${property.price} ${property.period}`,
      loyerHt: rentHt,
      loyerTtc: rentTtc,
      paiementJour: "10 de chaque mois",
      caution: property.deposit,
      cautionMois: "deux (2) mois",
      revisionFrequence: "tous les deux (2) ans",
      date: "05/06/2026",
      domicileBailleur: "Niaréla, rue Achkhabad, face mairie, Bamako (Mali)",
      domicilePreneur: "Hamdallaye ACI 2000, Bamako (Mali)",
      lieuSignature: "Bamako",
      dateSignature: "05/06/2026",
      conditions: "Paiement au plus tard le 10 de chaque mois. Assurance obligatoire à fournir avant remise des clés. Caution conservée selon l'état des lieux contradictoire.",
    };
  }

  return {
    numero: invoice.number,
    date: invoice.date,
    client: `${invoice.client}\nBamako, Mali`,
    bien: property.name,
    adresse: property.address ?? property.location,
    designation: `Loyer de ${invoice.property}`,
    loyer: amountNumber,
    quantite: "1",
    montant: amountNumber,
    invoiceLines: [
      { id: "invoice-line-1", designation: `Loyer de ${invoice.property}`, loyer: amountNumber, quantite: "1", montant: amountNumber },
    ],
    totalHt: amountNumber,
    tva: "0",
    totalTtc: amountNumber,
    montantLettres: "Arrêté la présente facture à la somme indiquée en francs CFA.",
  };
}

function InvoiceProfilePanel({ invoice, onAction }) {
  const payment = paymentRecords.find((item) => item.property === invoice.property || item.receipt === invoice.number) ?? paymentRecords[0];

  return (
    <Panel title="Fiche facture / reçu" className="profile-panel">
      <ProfileHeader person={{ name: invoice.number, id: invoice.type }} />
      <DetailMetrics
        items={[
          ["Client", invoice.client],
          ["Bien", invoice.property],
          ["Montant", invoice.amount],
          ["Statut", invoice.status],
          ["PDF", "Disponible"],
        ]}
      />
      <div className="simple-list">
        <p><span>Numéro</span><strong>{invoice.number}</strong></p>
        <p><span>Date</span><strong>{invoice.date}</strong></p>
        <p><span>Bénéficiaire</span><strong>{invoice.client}</strong></p>
        <p><span>Bien</span><strong>{invoice.property}</strong></p>
        <p><span>Période</span><strong>{payment.period}</strong></p>
        <p><span>Montant</span><strong>{invoice.amount}</strong></p>
        <p><span>Mode de paiement</span><strong>{payment.mode}</strong></p>
        <p><span>Référence</span><strong>{payment.paymentRef}</strong></p>
        <p><span>Document PDF</span><Badge label={invoice.status} /></p>
      </div>
      <div className="timeline compact-timeline">
        <p><strong>Document généré</strong><span>{invoice.date} · E.K immo</span></p>
        <p><strong>Historique</strong><span>Lié au paiement {payment.reference}</span></p>
      </div>
      <div className="stack-actions">
        <Button variant="primary" onClick={() => onAction(`PDF ${invoice.number}`)}><Download size={17} /> Générer PDF</Button>
        <Button onClick={() => onAction(`Imprimer ${invoice.number}`)}><Printer size={17} /> Imprimer</Button>
        <Button onClick={() => onAction(`Télécharger ${invoice.number}`)}><Download size={17} /> Télécharger</Button>
        <Button onClick={() => onAction(`Archiver ${invoice.number}`)}><Archive size={17} /> Archiver</Button>
        <Button onClick={() => onAction(`Annuler ${invoice.number}`)}><XCircle size={17} /> Annuler</Button>
        <Button onClick={() => onAction(`Fiche paiement ${payment.reference}`)}><Banknote size={17} /> Paiement lié</Button>
      </div>
    </Panel>
  );
}

function InvoiceActions({ invoice, onAction }) {
  return (
    <div className="table-actions">
      <Button compact onClick={() => onAction(`PDF ${invoice.number}`)}><Download size={15} /> PDF</Button>
      <Button compact onClick={() => onAction(`Imprimer ${invoice.number}`)}><Printer size={15} /> Imprimer</Button>
      <Button compact onClick={() => onAction(`Annuler ${invoice.number}`)}><XCircle size={15} /> Annuler</Button>
      <Button compact onClick={() => onAction(`Archiver ${invoice.number}`)}><Archive size={15} /> Archiver</Button>
    </div>
  );
}

function FinancePage({ activeTab, onTab, onAction, paymentsList = paymentRecords, rentRowsList = rentRows, chargesList = charges, maintenancesList = maintenances, reversalsList = reversals }) {
  const tabs = ["Loyers", "Paiements", "Impayés", "Commissions", "Charges", "Entretiens", "Reversements"];
  const effectiveTab = tabs.includes(activeTab) ? activeTab : "Loyers";
  const agencyRentRows = rentRowsList.filter((row) => isAgencyCollectedProperty(row.property));
  const financeActions = {
    Paiements: <Button variant="primary" onClick={() => onAction("Enregistrer paiement", { row: agencyRentRows[0] })}><Banknote size={17} /> Enregistrer un paiement</Button>,
    Charges: <Button variant="primary" onClick={() => onAction("Ajouter une charge")}><Plus size={17} /> Ajouter une charge</Button>,
    Entretiens: <Button variant="primary" onClick={() => onAction("Ajouter un entretien")}><Wrench size={17} /> Ajouter un entretien</Button>,
    Reversements: <Button variant="primary" onClick={() => onAction("Préparer un reversement")}><RefreshCw size={17} /> Préparer un reversement</Button>,
  };

  return (
    <>
      <PageIntro
        title="Finance métier"
        actions={financeActions[effectiveTab] ?? null}
      />
      <Tabs tabs={tabs} active={effectiveTab} onChange={onTab} demo="finance-tabs" />
      {effectiveTab === "Loyers" && <FinanceTable title="Loyers attendus par E.K immo" onAction={onAction} rows={agencyRentRows.map((row) => [row.period, row.tenant, row.property, row.owner, row.expected, row.paid, row.balance, <Badge label={row.status} />, <RentActions row={row} onAction={onAction} />])} columns={["Période", "Locataire", "Bien", "Propriétaire", "Attendu", "Payé", "Solde", "Statut", "Actions"]} />}
      {effectiveTab === "Paiements" && <PaymentForm onAction={onAction} paymentsList={paymentsList} rentRowsList={rentRowsList} />}
      {effectiveTab === "Impayés" && <ArrearsView onAction={onAction} rentRowsList={rentRowsList} />}
      {effectiveTab === "Commissions" && <CommissionsView onAction={onAction} />}
      {effectiveTab === "Charges" && <ChargesView onAction={onAction} chargesList={chargesList} />}
      {effectiveTab === "Entretiens" && <MaintenancesView onAction={onAction} maintenancesList={maintenancesList} />}
      {effectiveTab === "Reversements" && <ReversalsView onAction={onAction} reversalsList={reversalsList} />}
    </>
  );
}

function RentActions({ row, onAction }) {
  return (
    <div className="table-actions">
      <Button compact onClick={() => onAction(`Paiement ${row.tenant}`, { row })}><Banknote size={15} /> Paiement</Button>
      <Button compact onClick={() => onAction(`Détail loyer ${row.tenant}`)}><Eye size={15} /> Détail</Button>
      <Button compact onClick={() => onAction(`État loyer ${row.tenant}`)}><FileText size={15} /> État</Button>
      <Button compact onClick={() => onAction(`Relance ${row.tenant}`)}><Bell size={15} /> Relance</Button>
    </div>
  );
}

function MaintenanceActions({ row, onAction }) {
  return (
    <div className="table-actions">
      <Button compact onClick={() => onAction(`Planifier ${row.type}`)}>Planifier</Button>
      <Button compact onClick={() => onAction(`Modifier ${row.type}`)}>Modifier</Button>
      <Button compact onClick={() => onAction(`Justificatif ${row.type}`)}>Justificatif</Button>
      <Button compact onClick={() => onAction(`Valider ${row.type}`)}>Valider</Button>
      <Button compact onClick={() => onAction(`Terminer ${row.type}`)}>Terminer</Button>
      <Button compact onClick={() => onAction(`Rapport entretien ${row.type}`)}>Rapport</Button>
    </div>
  );
}

function FinanceTable({ title, columns, rows, onAction }) {
  const [query, setQuery] = useState("");
  const [period, setPeriod] = useState("Toutes périodes");
  const [status, setStatus] = useState("Tous statuts");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [extraFilters, setExtraFilters] = useState({
    property: "Tous biens",
    owner: "Tous propriétaires",
    tenant: "Tous locataires",
    balance: "Tous soldes",
  });
  const tableData = useMemo(() => rows.map((row) => ({ row, text: rowToSearchText(row) })), [rows]);
  const propertyOptions = useMemo(() => uniqueValues(rows.map((row) => nodeToText(row[2]))), [rows]);
  const ownerOptions = useMemo(() => uniqueValues(rows.map((row) => nodeToText(row[3]))), [rows]);
  const tenantOptions = useMemo(() => uniqueValues(rows.map((row) => nodeToText(row[1]))), [rows]);
  const filteredRows = useMemo(() => {
    const search = normalizeSearch(query);
    return tableData.filter(({ row, text }) => {
      const statusText = nodeToText(row[7]);
      const balance = parseFCFA(nodeToText(row[6]));
      const searchMatch = !search || text.includes(search);
      const periodMatch = period === "Toutes périodes" || nodeToText(row[0]).includes(period.replace("Période : ", ""));
      const statusMatch = status === "Tous statuts" || statusText === status;
      const propertyMatch = extraFilters.property === "Tous biens" || nodeToText(row[2]) === extraFilters.property;
      const ownerMatch = extraFilters.owner === "Tous propriétaires" || nodeToText(row[3]) === extraFilters.owner;
      const tenantMatch = extraFilters.tenant === "Tous locataires" || nodeToText(row[1]) === extraFilters.tenant;
      const balanceMatch = extraFilters.balance === "Tous soldes" || (extraFilters.balance === "Avec impayé" ? balance > 0 : balance === 0);
      return searchMatch && periodMatch && statusMatch && propertyMatch && ownerMatch && tenantMatch && balanceMatch;
    }).map(({ row }) => row);
  }, [extraFilters, period, query, status, tableData]);

  return (
    <>
      <Panel className="filter-panel">
        <div className="filters-row">
          <label className="field search-field">
            <Search size={19} />
            <input placeholder="Rechercher..." value={query} onChange={(event) => setQuery(event.target.value)} />
          </label>
          <select value={period} onChange={(event) => setPeriod(event.target.value)}><option>Toutes périodes</option><option>Mai 2026</option><option>Juin 2026</option><option>Trimestre</option></select>
          <select value={status} onChange={(event) => setStatus(event.target.value)}><option>Tous statuts</option><option>À jour</option><option>Partiel</option><option>En retard</option><option>Payé</option></select>
          <Button onClick={() => setFiltersOpen((value) => !value)}><Filter size={17} /> Filtres</Button>
          <div className="inline-menu-wrap">
            <Button onClick={() => setExportOpen((value) => !value)}><Download size={17} /> Exporter</Button>
            {exportOpen && (
              <div className="inline-action-menu">
                {["Export Excel finance", "Export PDF finance", "Imprimer état financier"].map((option) => (
                  <button key={option} onClick={() => {
                    onAction(option);
                    setExportOpen(false);
                  }}>
                    {option.includes("PDF") ? <FileText size={16} /> : option.includes("Imprimer") ? <Printer size={16} /> : <Download size={16} />}
                    <span>{option}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        {filtersOpen && (
          <div className="advanced-filters client-advanced-filters">
            <label>Bien<select value={extraFilters.property} onChange={(event) => setExtraFilters((current) => ({ ...current, property: event.target.value }))}><option>Tous biens</option>{propertyOptions.map((option) => <option key={option}>{option}</option>)}</select></label>
            <label>Propriétaire<select value={extraFilters.owner} onChange={(event) => setExtraFilters((current) => ({ ...current, owner: event.target.value }))}><option>Tous propriétaires</option>{ownerOptions.map((option) => <option key={option}>{option}</option>)}</select></label>
            <label>Locataire<select value={extraFilters.tenant} onChange={(event) => setExtraFilters((current) => ({ ...current, tenant: event.target.value }))}><option>Tous locataires</option>{tenantOptions.map((option) => <option key={option}>{option}</option>)}</select></label>
            <label>Solde<select value={extraFilters.balance} onChange={(event) => setExtraFilters((current) => ({ ...current, balance: event.target.value }))}><option>Tous soldes</option><option>Avec impayé</option><option>Soldé</option></select></label>
          </div>
        )}
      </Panel>
      <Panel title={title}>
        <DataTable columns={columns} rows={filteredRows} />
      </Panel>
    </>
  );
}

function CommissionsView({ onAction }) {
  const [selected, setSelected] = useState(commissions[0]);
  const { detailOpen, openDetail, closeDetail } = useDetailNavigation();

  const openCommission = (row) => {
    setSelected(row);
    openDetail();
  };

  if (detailOpen) {
    return (
      <DetailPageShell title="Fiche commission" subtitle={selected.operation} onBack={closeDetail}>
        <CommissionProfilePanel commission={selected} onAction={onAction} />
      </DetailPageShell>
    );
  }

  return (
    <section className="client-list-workspace">
      <div>
        <div className="summary-strip finance-summary">
          <Info label="Total encaissé" value="41 600 000 FCFA" />
          <Info label="Commission agence" value="1 702 500 FCFA" />
          <Info label="Net propriétaires" value="39 897 500 FCFA" />
        </div>
        <Panel title="Commissions agence">
          <DataTable
            rows={commissions.map((row) => [
              row.operation,
              row.property,
              row.owner,
              row.collected,
              row.mode,
              row.commission,
              row.ownerNet,
              <Badge label="Généré" />,
              <Button compact onClick={() => openCommission(row)}><Eye size={16} /> Fiche</Button>,
            ])}
            columns={["Opération", "Bien", "Propriétaire", "Montant encaissé", "Mode", "Commission", "Net propriétaire", "Statut", "Action"]}
          />
        </Panel>
      </div>
    </section>
  );
}

function CommissionProfilePanel({ commission, onAction }) {
  return (
    <Panel title="Fiche commission" className="profile-panel">
      <ProfileHeader person={{ name: commission.operation, id: commission.property }} />
      <DetailMetrics
        items={[
          ["Montant encaissé", commission.collected],
          ["Commission agence", commission.commission],
          ["Net propriétaire", commission.ownerNet],
          ["Mode", commission.mode],
        ]}
      />
      <div className="simple-list">
        <p><span>Type d'opération</span><strong>{commission.operation.includes("Vente") ? "Vente" : "Location / gestion"}</strong></p>
        <p><span>Bien concerné</span><strong>{commission.property}</strong></p>
        <p><span>Propriétaire</span><strong>{commission.owner}</strong></p>
        <p><span>Montant de base</span><strong>{commission.collected}</strong></p>
        <p><span>Mode de calcul</span><strong>{commission.mode}</strong></p>
        <p><span>Taux ou montant fixe</span><strong>{commission.mode}</strong></p>
        <p><span>Commission calculée</span><strong>{commission.commission}</strong></p>
        <p><span>Montant net à reverser</span><strong>{commission.ownerNet}</strong></p>
        <p><span>Statut</span><Badge label="Généré" /></p>
      </div>
      <div className="stack-actions">
        <Button variant="primary" onClick={() => onAction(`Détail commission ${commission.operation}`)}><Eye size={17} /> Détail</Button>
        <Button onClick={() => onAction(`Modifier commission ${commission.operation}`)}><Pencil size={17} /> Modifier</Button>
        <Button onClick={() => onAction(`Rattacher paiement ${commission.operation}`)}><Banknote size={17} /> Paiement</Button>
        <Button onClick={() => onAction(`Rattacher contrat ${commission.operation}`)}><FileText size={17} /> Contrat</Button>
        <Button onClick={() => onAction(`Situation propriétaire ${commission.owner}`)}><HandCoins size={17} /> Situation</Button>
        <Button onClick={() => onAction(`Exporter commission ${commission.operation}`)}><Download size={17} /> Exporter</Button>
      </div>
    </Panel>
  );
}

function parseFCFA(value) {
  return Number(String(value).replace(/[^\d]/g, "")) || 0;
}

function formatFCFA(value) {
  return `${new Intl.NumberFormat("fr-FR").format(value)} FCFA`;
}

function toDateInputValue(value, fallback = "2026-06-19") {
  const text = String(value || "");
  const match = text.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (match) return `${match[3]}-${match[2]}-${match[1]}`;
  return text || fallback;
}

function fromDateInputValue(value) {
  const text = String(value || "");
  const match = text.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (match) return `${match[3]}/${match[2]}/${match[1]}`;
  return text;
}

function chargeMatchesQuickFilter(charge, filter) {
  if (filter === "Charges agence") return charge.payer === "Agence";
  if (filter === "Charges propriétaire") return charge.payer === "Propriétaire";
  if (filter === "Refacturable locataire") return charge.payer.includes("Locataire");
  if (filter === "À valider") return ["À valider", "En attente", "Brouillon"].includes(charge.status);
  if (filter === "Avec justificatif manquant") return charge.proofStatus === "Manquant";
  return true;
}

function getChargeImpactLabel(charge) {
  if (charge.payer === "Agence") return "Supportée par l'agence";
  if (charge.payer === "Propriétaire") return "À déduire du propriétaire";
  if (charge.payer.includes("Locataire")) return "À refacturer au locataire";
  return "Suivi interne uniquement";
}

function ChargesView({ onAction, chargesList = charges }) {
  const [selected, setSelected] = useState(chargesList[0] ?? charges[0]);
  const { detailOpen, openDetail, closeDetail } = useDetailNavigation();
  const [query, setQuery] = useState("");
  const [period, setPeriod] = useState("Toutes périodes");
  const [type, setType] = useState("Tous types");
  const [property, setProperty] = useState("Tous biens");
  const [owner, setOwner] = useState("Tous propriétaires");
  const [tenant, setTenant] = useState("Tous locataires");
  const [payer, setPayer] = useState("Toutes prises en charge");
  const [status, setStatus] = useState("Tous statuts");
  const [amountRange, setAmountRange] = useState("Tous montants");
  const [agent, setAgent] = useState("Tous agents");
  const [quickFilter, setQuickFilter] = useState("Toutes les charges");

  const filteredCharges = useMemo(() => {
    const normalizedQuery = normalizeSearch(query);
    return chargesList.filter((charge) => {
      const amount = parseFCFA(charge.amount);
      const matchesAmount =
        amountRange === "Tous montants" ||
        (amountRange === "Moins de 50 000 FCFA" && amount < 50000) ||
        (amountRange === "50 000 à 200 000 FCFA" && amount >= 50000 && amount <= 200000) ||
        (amountRange === "Plus de 200 000 FCFA" && amount > 200000);
      const haystack = normalizeSearch(`${charge.date} ${charge.type} ${charge.description} ${charge.property} ${charge.owner} ${charge.tenant} ${charge.amount} ${charge.payer} ${charge.status} ${charge.agent}`);
      return (
        (!normalizedQuery || haystack.includes(normalizedQuery)) &&
        (period === "Toutes périodes" || charge.period === period) &&
        (type === "Tous types" || charge.type === type || charge.category === type) &&
        (property === "Tous biens" || charge.property === property) &&
        (owner === "Tous propriétaires" || charge.owner === owner) &&
        (tenant === "Tous locataires" || charge.tenant === tenant) &&
        (payer === "Toutes prises en charge" || charge.payer === payer) &&
        (status === "Tous statuts" || charge.status === status) &&
        matchesAmount &&
        (agent === "Tous agents" || charge.agent === agent) &&
        chargeMatchesQuickFilter(charge, quickFilter)
      );
    });
  }, [agent, amountRange, chargesList, owner, payer, period, property, query, quickFilter, status, tenant, type]);

  useEffect(() => {
    if (filteredCharges.length === 0) return;
    if (!filteredCharges.some((charge) => charge.id === selected.id)) {
      setSelected(filteredCharges[0]);
    }
  }, [filteredCharges, selected.id]);

  const chargeStats = useMemo(() => {
    const currentMonthCharges = chargesList.filter((charge) => charge.period === "Juin 2026");
    return [
      ["Total charges du mois", formatFCFA(currentMonthCharges.reduce((sum, charge) => sum + parseFCFA(charge.amount), 0)), "Toutes les sorties enregistrées sur juin 2026.", ReceiptText],
      ["Charges agence", formatFCFA(chargesList.filter((charge) => charge.payer === "Agence").reduce((sum, charge) => sum + parseFCFA(charge.amount), 0)), "Dépenses prises en charge directement par E.K immo.", Banknote],
      ["Charges propriétaires", formatFCFA(chargesList.filter((charge) => charge.payer === "Propriétaire").reduce((sum, charge) => sum + parseFCFA(charge.amount), 0)), "Montants imputés aux propriétaires concernés.", HandCoins],
      ["Charges refacturables", formatFCFA(chargesList.filter((charge) => charge.payer.includes("Locataire")).reduce((sum, charge) => sum + parseFCFA(charge.amount), 0)), "Sommes récupérables auprès des locataires ou dossiers.", WalletCards],
      ["Charges à valider", String(chargesList.filter((charge) => ["À valider", "En attente", "Brouillon"].includes(charge.status)).length), "Dossiers encore à contrôler avant paiement ou archive.", AlertTriangle],
    ];
  }, [chargesList]);

  const openCharge = (charge) => {
    setSelected(charge);
    openDetail();
  };

  return (
    <section className="charges-screen" data-demo="charges-workspace">
      <div className="charges-header">
        <div>
          <h2>Charges & dépenses</h2>
          <p>Suivi opérationnel des sorties liées aux biens, entretiens, propriétaires, locataires et frais internes E.K immo.</p>
        </div>
      </div>

      <div className="charge-stat-grid">
        {chargeStats.map(([label, value, description, Icon]) => (
          <article className="charge-stat-card" key={label}>
            <span><Icon size={19} /></span>
            <small>{label}</small>
            <strong>{value}</strong>
            <p>{description}</p>
          </article>
        ))}
      </div>

      <Panel className="filter-panel charge-filter-panel">
        <div className="filters-row charge-filters">
          <label className="field search-field">
            <Search size={19} />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Rechercher une charge, un bien, un agent..." />
          </label>
          <select value={period} onChange={(event) => setPeriod(event.target.value)}><option>Toutes périodes</option>{uniqueValues(chargesList.map((charge) => charge.period)).map((item) => <option key={item}>{item}</option>)}</select>
          <select value={type} onChange={(event) => setType(event.target.value)}><option>Tous types</option>{chargeTypes.map((item) => <option key={item}>{item}</option>)}</select>
          <select value={property} onChange={(event) => setProperty(event.target.value)}><option>Tous biens</option>{uniqueValues(chargesList.map((charge) => charge.property)).map((item) => <option key={item}>{item}</option>)}</select>
          <select value={owner} onChange={(event) => setOwner(event.target.value)}><option>Tous propriétaires</option>{uniqueValues(chargesList.map((charge) => charge.owner)).map((item) => <option key={item}>{item}</option>)}</select>
          <select value={tenant} onChange={(event) => setTenant(event.target.value)}><option>Tous locataires</option>{uniqueValues(chargesList.map((charge) => charge.tenant)).map((item) => <option key={item}>{item}</option>)}</select>
          <select value={payer} onChange={(event) => setPayer(event.target.value)}><option>Toutes prises en charge</option>{chargePayers.map((item) => <option key={item}>{item}</option>)}</select>
          <select value={status} onChange={(event) => setStatus(event.target.value)}><option>Tous statuts</option>{chargeStatuses.map((item) => <option key={item}>{item}</option>)}</select>
          <select value={amountRange} onChange={(event) => setAmountRange(event.target.value)}><option>Tous montants</option><option>Moins de 50 000 FCFA</option><option>50 000 à 200 000 FCFA</option><option>Plus de 200 000 FCFA</option></select>
          <select value={agent} onChange={(event) => setAgent(event.target.value)}><option>Tous agents</option>{uniqueValues(chargesList.map((charge) => charge.agent)).map((item) => <option key={item}>{item}</option>)}</select>
          <Button onClick={() => {
            setQuery("");
            setPeriod("Toutes périodes");
            setType("Tous types");
            setProperty("Tous biens");
            setOwner("Tous propriétaires");
            setTenant("Tous locataires");
            setPayer("Toutes prises en charge");
            setStatus("Tous statuts");
            setAmountRange("Tous montants");
            setAgent("Tous agents");
            setQuickFilter("Toutes les charges");
          }}><RefreshCw size={17} /> Réinitialiser</Button>
          <Button onClick={() => onAction("Exporter charges Excel")}><Download size={17} /> Excel</Button>
          <Button onClick={() => onAction("Exporter état charges PDF")}><FileText size={17} /> PDF</Button>
        </div>
        <div className="quick-filter-row" role="group" aria-label="Filtres rapides charges">
          {chargeQuickFilters.map((item) => (
            <button className={quickFilter === item ? "active" : ""} key={item} onClick={() => setQuickFilter(item)}>
              {item}
            </button>
          ))}
        </div>
      </Panel>

      {detailOpen ? (
        <DetailPageShell title="Fiche charge" subtitle={selected.id} onBack={closeDetail}>
          <ChargeProfilePanel charge={selected} onAction={onAction} />
        </DetailPageShell>
      ) : (
      <section className="client-list-workspace charges-detail-layout">
        <Panel title="Tableau des charges" toolbar={<span className="filter-count">{filteredCharges.length}</span>}>
          <DataTable
            columns={["Date", "Type de charge", "Description courte", "Bien concerné", "Propriétaire", "Montant", "Prise en charge", "Statut", "Justificatif", "Action"]}
            rows={filteredCharges.map((row) => [
              row.date,
              row.type,
              row.description,
              row.property,
              row.owner,
              row.amount,
              getChargeImpactLabel(row),
              <Badge label={row.status} />,
              <ChargeProofCell charge={row} />,
              <ChargeActions charge={row} selected={selected} onSelect={openCharge} onAction={onAction} />,
            ])}
          />
          {filteredCharges.length === 0 && <p className="empty-state">Aucune charge ne correspond aux filtres sélectionnés.</p>}
        </Panel>
      </section>
      )}
    </section>
  );
}

function ChargeProofCell({ charge }) {
  return (
    <span className="proof-cell">
      <FileText size={15} />
      <span>
        <strong>{charge.proof}</strong>
        <small>{charge.proofStatus}</small>
      </span>
    </span>
  );
}

function ChargeActions({ charge, selected, onSelect, onAction }) {
  return (
    <div className="table-actions">
      <Button compact onClick={() => onSelect(charge)}><Eye size={15} /> Fiche</Button>
      <Button compact onClick={() => onAction(`Modifier charge ${charge.id}`)}><Pencil size={15} /> Modifier</Button>
      {selected.id === charge.id && <Badge label="Ouverte" />}
    </div>
  );
}

function ChargeProfilePanel({ charge, onAction }) {
  const property = getPropertyByName(charge.property) ?? properties[0];
  const grossRents = "300 000 FCFA";
  const commission = "30 000 FCFA";
  const ownerCharge = charge.payer === "Propriétaire" ? charge.amount : "0 FCFA";
  const ownerNet = charge.payer === "Propriétaire" ? formatFCFA(300000 - 30000 - parseFCFA(charge.amount)) : "Non impacté";

  return (
    <Panel title="Fiche charge" className="profile-panel charge-profile">
      <ProfileHeader person={{ name: charge.type, id: `${charge.amount} · ${charge.property}` }} />
      <p className="charge-headline">
        {charge.type} — {charge.amount} — {charge.property} — {getChargeImpactLabel(charge)}
      </p>
      <DetailMetrics
        items={[
          ["Montant", charge.amount],
          ["Prise en charge", charge.payer],
          ["Statut", charge.status],
          ["Bien", charge.property],
          ["Agent", charge.agent],
        ]}
      />

      {charge.ownerCollection && <Badge label="Encaissement propriétaire" />}

      <div className="profile-section">
        <h3>Informations</h3>
        <div className="simple-list">
          <p><span>Date</span><strong>{charge.date}</strong></p>
          <p><span>Type</span><strong>{charge.type}</strong></p>
          <p><span>Description</span><strong>{charge.description}</strong></p>
          <p><span>Montant</span><strong>{charge.amount}</strong></p>
          <p><span>Statut</span><Badge label={charge.status} /></p>
          <p><span>Agent responsable</span><strong>{charge.agent}</strong></p>
        </div>
      </div>

      <div className="profile-section">
        <h3>Rattachement</h3>
        <div className="simple-list">
          <p><span>Bien</span><strong>{charge.property}</strong></p>
          <p><span>Adresse</span><strong>{property.address}</strong></p>
          <p><span>Propriétaire</span><strong>{charge.owner}</strong></p>
          <p><span>Locataire</span><strong>{charge.tenant}</strong></p>
          <p><span>Entretien lié</span><strong>{charge.linkedMaintenance}</strong></p>
        </div>
      </div>

      <div className="profile-section impact-section">
        <h3>Traitement financier métier</h3>
        <div className="impact-card">
          <strong>{charge.impact}</strong>
          <span>{charge.payer === "Agence" && "La dépense apparaît dans les charges agence et ne réduit pas le reversement propriétaire."}</span>
          <span>{charge.payer === "Propriétaire" && "La dépense peut être déduite du montant net à reverser au propriétaire."}</span>
          <span>{charge.payer.includes("Locataire") && "La dépense doit être réclamée au locataire via facture, relance ou situation locataire."}</span>
          <span>{charge.payer === "Suivi interne uniquement" && "La dépense reste suivie par l'agence sans impact direct sur les encaissements E.K immo."}</span>
        </div>
        {charge.payer === "Propriétaire" && (
          <div className="simple-list">
            <p><span>Loyers encaissés</span><strong>{grossRents}</strong></p>
            <p><span>Commission agence</span><strong>{commission}</strong></p>
            <p><span>Charge propriétaire</span><strong>{ownerCharge}</strong></p>
            <p><span>Net à reverser</span><strong>{ownerNet}</strong></p>
          </div>
        )}
      </div>

      <div className="profile-section">
        <h3>Paiement / justificatifs</h3>
        <div className="simple-list">
          <p><span>Mode de paiement</span><strong>{charge.paymentMode}</strong></p>
          <p><span>Référence paiement</span><strong>{charge.paymentRef}</strong></p>
          <p><span>Facture / reçu</span><strong>{charge.proof}</strong></p>
          <p><span>Photo ou PDF</span><Badge label={charge.proofStatus === "Manquant" ? "Justificatif manquant" : "Justificatif joint"} /></p>
          <p><span>Observation</span><strong>{charge.impact}</strong></p>
        </div>
      </div>

      <div className="profile-section">
        <h3>Historique</h3>
        <div className="timeline compact-timeline">
          <p><strong>Créée par</strong><span>{charge.createdBy}</span></p>
          <p><strong>Modifiée par</strong><span>{charge.modifiedBy}</span></p>
          <p><strong>Validée par</strong><span>{charge.validatedBy} · {charge.validationDate}</span></p>
          {charge.history.map((item) => <p key={item}><strong>Suivi</strong><span>{item}</span></p>)}
        </div>
      </div>

      <div className="stack-actions">
        <Button variant="primary" onClick={() => onAction(`Modifier charge ${charge.id}`)}><Pencil size={17} /> Modifier</Button>
        <Button onClick={() => onAction(`Valider charge ${charge.id}`)}><CheckCircle2 size={17} /> Valider</Button>
        <Button onClick={() => onAction(`Annuler charge ${charge.id}`)}><XCircle size={17} /> Annuler</Button>
        <Button onClick={() => onAction(`Ajouter justificatif ${charge.id}`)}><Upload size={17} /> Justificatif</Button>
        <Button onClick={() => onAction(`Lier charge à un bien`)}><Home size={17} /> Lier bien</Button>
        <Button onClick={() => onAction(`Lier charge à un propriétaire`)}><UserRound size={17} /> Propriétaire</Button>
        <Button onClick={() => onAction(`Lier charge à un locataire`)}><UsersRound size={17} /> Locataire</Button>
        <Button onClick={() => onAction(`Lier charge à entretien`)}><Wrench size={17} /> Entretien</Button>
        <Button onClick={() => onAction(`Historique charge ${charge.id}`)}><History size={17} /> Historique</Button>
      </div>
    </Panel>
  );
}

function MaintenancesView({ onAction, maintenancesList = maintenances }) {
  const [selected, setSelected] = useState(maintenancesList[0] ?? maintenances[0]);
  const { detailOpen, openDetail, closeDetail } = useDetailNavigation();

  const openMaintenance = (row) => {
    setSelected(row);
    openDetail();
  };

  if (detailOpen) {
    return (
      <DetailPageShell title="Fiche entretien" subtitle={`${selected.type} · ${selected.property}`} onBack={closeDetail}>
        <MaintenanceProfilePanel maintenance={selected} onAction={onAction} />
      </DetailPageShell>
    );
  }

  return (
    <section className="client-list-workspace">
      <Panel title="Entretiens prévus ou réalisés">
        <DataTable
          columns={["Bien", "Type", "Date prévue", "Responsable", "Coût estimé", "Coût réel", "Prise en charge", "Justificatif", "Statut", "Action"]}
          rows={maintenancesList.map((row) => [
            row.property,
            row.type,
            row.date,
            row.manager,
            row.cost,
            row.realCost ?? (row.status === "En cours" ? "À confirmer" : row.cost),
            row.payer,
            row.proof ?? "Justificatif à joindre",
            <Badge label={row.status} />,
            <Button compact onClick={() => openMaintenance(row)}><Eye size={16} /> Fiche</Button>,
          ])}
        />
      </Panel>
    </section>
  );
}

function MaintenanceProfilePanel({ maintenance, onAction }) {
  const property = getPropertyByName(maintenance.property) ?? properties[0];

  return (
    <Panel title="Fiche entretien" className="profile-panel">
      <ProfileHeader person={{ name: maintenance.type, id: maintenance.property }} />
      <DetailMetrics
        items={[
          ["Date prévue", maintenance.date],
          ["Responsable", maintenance.manager],
          ["Coût estimé", maintenance.cost],
          ["Statut", maintenance.status],
        ]}
      />
      <div className="simple-list">
        <p><span>Bien concerné</span><strong>{maintenance.property}</strong></p>
        <p><span>Propriétaire</span><strong>{property.owner}</strong></p>
        <p><span>Locataire</span><strong>{property.tenant}</strong></p>
        <p><span>Type d'entretien</span><strong>{maintenance.type}</strong></p>
        <p><span>Description</span><strong>{maintenance.note}</strong></p>
        <p><span>Responsable</span><strong>{maintenance.manager}</strong></p>
        <p><span>Prestataire</span><strong>{maintenance.provider ?? "Prestataire local agréé"}</strong></p>
        <p><span>Date prévue</span><strong>{maintenance.date}</strong></p>
        <p><span>Date réalisée</span><strong>{maintenance.status === "Terminé" ? maintenance.date : "À confirmer"}</strong></p>
        <p><span>Coût estimé</span><strong>{maintenance.cost}</strong></p>
        <p><span>Coût réel</span><strong>{maintenance.realCost ?? (maintenance.status === "En cours" ? "À confirmer" : maintenance.cost)}</strong></p>
        <p><span>Prise en charge</span><strong>{maintenance.payer}</strong></p>
        <p><span>Justificatif</span><Badge label="À valider" /></p>
        <p><span>Observations</span><strong>{maintenance.note}</strong></p>
        <p><span>Statut</span><Badge label={maintenance.status} /></p>
      </div>
      <div className="stack-actions">
        <Button variant="primary" onClick={() => onAction("Planifier entretien", { maintenance, property })}><CalendarDays size={17} /> Planifier</Button>
        <Button onClick={() => onAction(`Modifier ${maintenance.type}`)}><Pencil size={17} /> Modifier</Button>
        <Button onClick={() => onAction(`Affecter responsable ${maintenance.type}`)}><UserCog size={17} /> Responsable</Button>
        <Button onClick={() => onAction(`Ajouter coût ${maintenance.type}`)}><Banknote size={17} /> Ajouter coût</Button>
        <Button onClick={() => onAction(`Ajouter justificatif ${maintenance.type}`)}><Upload size={17} /> Justificatif</Button>
        <Button onClick={() => onAction(`Ajouter photos ${maintenance.type}`)}><Upload size={17} /> Photos</Button>
        <Button onClick={() => onAction(`Valider ${maintenance.type}`)}><CheckCircle2 size={17} /> Valider</Button>
        <Button onClick={() => onAction(`Marquer terminé ${maintenance.type}`)}><CheckCircle2 size={17} /> Terminer</Button>
        <Button onClick={() => onAction(`Rapport entretien ${maintenance.type}`)}><FileText size={17} /> Rapport</Button>
        <Button onClick={() => onAction(`Annuler entretien ${maintenance.type}`)}><XCircle size={17} /> Annuler</Button>
      </div>
    </Panel>
  );
}

function ReversalsView({ onAction, reversalsList = reversals }) {
  const [selected, setSelected] = useState(reversalsList[0] ?? reversals[0]);
  const { detailOpen, openDetail, closeDetail } = useDetailNavigation();

  const openReversal = (row) => {
    setSelected(row);
    openDetail();
  };

  if (detailOpen) {
    return (
      <DetailPageShell title="Fiche reversement" subtitle={selected.owner} onBack={closeDetail}>
        <ReversalProfilePanel reversal={selected} onAction={onAction} />
      </DetailPageShell>
    );
  }

  return (
    <section className="client-list-workspace" data-demo="reversals-workspace">
      <Panel title="Reversements propriétaires">
        <DataTable
          columns={["Propriétaire", "Loyers encaissés", "Commissions", "Charges", "Déjà reversé", "Solde", "Statut", "Action"]}
          rows={reversalsList.map((row) => [
            row.owner,
            row.collected,
            row.commission,
            row.charges,
            row.paid,
            row.balance,
            <Badge label={row.status} />,
            <Button compact onClick={() => openReversal(row)}><Eye size={16} /> Fiche</Button>,
          ])}
        />
      </Panel>
    </section>
  );
}

function ReversalProfilePanel({ reversal, onAction }) {
  return (
    <Panel title="Fiche reversement" className="profile-panel">
      <ProfileHeader person={{ name: reversal.owner, id: "Mai 2026" }} />
      <DetailMetrics
        items={[
          ["Net à reverser", reversal.balance],
          ["Déjà payé", reversal.paid],
          ["Commissions", reversal.commission],
          ["Statut", reversal.status],
        ]}
      />
      <div className="simple-list">
        <p><span>Période concernée</span><strong>{reversal.period ?? "Mai 2026"}</strong></p>
        <p><span>Loyers encaissés</span><strong>{reversal.collected}</strong></p>
        <p><span>Commissions</span><strong>{reversal.commission}</strong></p>
        <p><span>Charges</span><strong>{reversal.charges}</strong></p>
        <p><span>Montant net à reverser</span><strong>{reversal.balance}</strong></p>
        <p><span>Montant payé</span><strong>{reversal.paid}</strong></p>
        <p><span>Mode de paiement</span><strong>{reversal.mode ?? "Virement"}</strong></p>
        <p><span>Référence</span><strong>{reversal.reference ?? "REV-2026-051"}</strong></p>
        <p><span>Justificatif</span><Badge label={reversal.proof ? "Archivé" : "À valider"} /></p>
        <p><span>Observation</span><strong>{reversal.note ?? "État propriétaire généré"}</strong></p>
      </div>
      <div className="stack-actions">
        <Button onClick={() => onAction("Calcul reversement")}><Eye size={17} /> Calcul</Button>
        <Button variant="primary" onClick={() => onAction("Enregistrer reversement")}><HandCoins size={17} /> Enregistrer</Button>
        <Button onClick={() => onAction("Paiement partiel reversement")}><Banknote size={17} /> Partiel</Button>
        <Button onClick={() => onAction("État de reversement")}><FileText size={17} /> Générer état</Button>
        <Button onClick={() => onAction("Exporter reversement PDF")}><Download size={17} /> PDF</Button>
        <Button onClick={() => onAction("Imprimer reversement")}><Printer size={17} /> Imprimer</Button>
        <Button onClick={() => onAction("Archiver reversement")}><Archive size={17} /> Archiver</Button>
        <Button onClick={() => onAction("Annuler reversement")}><XCircle size={17} /> Annuler</Button>
      </div>
    </Panel>
  );
}

function PaymentForm({ onAction, paymentsList = paymentRecords, rentRowsList = rentRows }) {
  const agencyProperties = properties.filter((property) => isAgencyCollectedProperty(property.name));
  const paymentRows = paymentsList.filter((payment) => isAgencyCollectedProperty(payment.property));
  const [selected, setSelected] = useState(paymentRows[0] ?? paymentsList[0] ?? paymentRecords[0]);
  const [receiptNumber, setReceiptNumber] = useState(selected.receipt);
  const modes = paymentModes.includes(selected.mode) ? paymentModes : [selected.mode, ...paymentModes];

  useEffect(() => {
    setReceiptNumber(selected.receipt === "Non généré" ? makeDocumentNumber("REC", 92) : selected.receipt);
  }, [selected]);

  const selectPayment = (reference) => {
    setSelected(paymentRows.find((payment) => payment.reference === reference) ?? selected);
  };

  const selectByProperty = (propertyName) => {
    setSelected(paymentRows.find((payment) => payment.property === propertyName) ?? selected);
  };

  const selectByOwner = (ownerName) => {
    setSelected(paymentRows.find((payment) => payment.owner === ownerName) ?? selected);
  };

  return (
    <section className="payment-layout" data-demo="payment-workspace">
      <Panel title="Enregistrer un paiement">
        <div className="form-grid" key={selected.reference}>
          <label>Locataire<select value={selected.reference} onChange={(event) => selectPayment(event.target.value)}>{paymentRows.map((payment) => <option key={payment.reference} value={payment.reference}>{payment.tenant}</option>)}</select></label>
          <label>Bien<select value={selected.property} onChange={(event) => selectByProperty(event.target.value)}>{agencyProperties.map((property) => <option key={property.code}>{property.name}</option>)}</select></label>
          <label>Propriétaire<select value={selected.owner} onChange={(event) => selectByOwner(event.target.value)}>{owners.map((owner) => <option key={owner.id}>{owner.name}</option>)}</select></label>
          <label>Période<input defaultValue={selected.period} /></label>
          <label>Montant dû<input defaultValue={selected.due} /></label>
          <label>Montant payé<input defaultValue={selected.paid} /></label>
          <label>Solde automatique<input defaultValue={selected.balance} readOnly /></label>
          <label>Mode de paiement<select defaultValue={selected.mode}>{modes.map((mode) => <option key={mode}>{mode}</option>)}</select></label>
          <label>Référence paiement<input defaultValue={selected.paymentRef} /></label>
          <label>Numéro reçu automatique<input value={receiptNumber} onChange={(event) => setReceiptNumber(event.target.value)} /><small>Modifiable si le client impose une référence interne.</small></label>
          <label>Date paiement<input defaultValue={selected.date} /></label>
          <label className="full">Observations<textarea defaultValue={selected.note} /></label>
        </div>
        <div className="action-row compact-row">
          <Button variant="primary" onClick={() => onAction("Enregistrer paiement", { payment: selected, row: rentRowsList.find((row) => row.tenant === selected.tenant && row.property === selected.property) })}><CheckCircle2 size={17} /> Enregistrer paiement</Button>
          <Button onClick={() => onAction("Générer reçu")}><ReceiptText size={17} /> Générer reçu</Button>
          <Button onClick={() => onAction("Imprimer reçu")}><Printer size={17} /> Imprimer reçu</Button>
          <Button onClick={() => onAction("Annuler paiement")}><XCircle size={17} /> Annuler</Button>
          <Button onClick={() => onAction("Voir historique")}><History size={17} /> Voir historique</Button>
          <Button onClick={() => onAction("Rattacher justificatif paiement")}><Upload size={17} /> Justificatif</Button>
        </div>
      </Panel>
      <Panel title="Fiche paiement" className="profile-panel">
        <ProfileHeader person={{ name: selected.tenant, id: selected.reference }} />
        <div className="simple-list">
          <p><span>Période</span><strong>{selected.period}</strong></p>
          <p><span>Bien</span><strong>{selected.property}</strong></p>
          <p><span>Propriétaire</span><strong>{selected.owner}</strong></p>
          <p><span>Montant dû</span><strong>{selected.due}</strong></p>
          <p><span>Montant payé</span><strong>{selected.paid}</strong></p>
          <p><span>Solde restant</span><strong>{selected.balance}</strong></p>
          <p><span>Mode de paiement</span><strong>{selected.mode}</strong></p>
          <p><span>Référence paiement</span><strong>{selected.paymentRef}</strong></p>
          <p><span>Reçu</span><strong>{selected.receipt}</strong></p>
          <p><span>Statut</span><Badge label={selected.status} /></p>
        </div>
        <div className="timeline compact-timeline">
          <p><strong>Observation</strong><span>{selected.note}</span></p>
          <p><strong>Date paiement</strong><span>{selected.date}</span></p>
        </div>
        <div className="profile-section">
          <h3>Historique récent</h3>
          <div className="mini-list">
            {paymentRows.map((payment) => (
              <button className="mini-action-row" key={payment.reference} onClick={() => setSelected(payment)}>
                <span>{payment.tenant} · {payment.paid}</span>
                <Badge label={payment.status} />
              </button>
            ))}
          </div>
        </div>
      </Panel>
    </section>
  );
}

function ArrearsView({ onAction, rentRowsList = rentRows }) {
  const rows = rentRowsList.filter((row) => isAgencyCollectedProperty(row.property)).filter((row) => row.status === "Partiel" || row.status === "Impayé" || row.status === "En retard");
  const [selected, setSelected] = useState(rows[0]);
  const { detailOpen, openDetail, closeDetail } = useDetailNavigation();

  const openArrear = (row) => {
    setSelected(row);
    openDetail();
  };

  if (detailOpen) {
    return (
      <DetailPageShell title="Fiche relance" subtitle={selected.tenant} onBack={closeDetail}>
        <ArrearsProfilePanel row={selected} onAction={onAction} />
      </DetailPageShell>
    );
  }

  return (
    <section className="client-list-workspace">
      <Panel title="Impayés & relances">
        <DataTable
          columns={["Locataire", "Bien", "Propriétaire", "Montant dû", "Ancienneté", "Dernière relance", "Prochaine action", "Statut", "Actions"]}
          rows={rows.map((row, index) => [
            row.tenant,
            row.property,
            row.owner,
            row.balance,
            index === 0 ? "12 jours" : "28 jours",
            index === 0 ? "SMS le 22/05" : "Appel le 24/05",
            index === 0 ? "Encaisser solde" : "Lettre de relance",
            <Badge label={row.status === "Partiel" ? "Relancé" : "En retard"} />,
            <div className="table-actions"><Button compact onClick={() => openArrear(row)}><Eye size={15} /> Fiche</Button><Button compact onClick={() => onAction("Ajouter relance")}>Relancer</Button></div>,
          ])}
        />
      </Panel>
    </section>
  );
}

function ArrearsProfilePanel({ row, onAction }) {
  return (
    <Panel title="Fiche relance" className="profile-panel">
      <ProfileHeader person={{ name: row.tenant, id: row.property }} />
      <div className="simple-list">
        <p><span>Locataire</span><strong>{row.tenant}</strong></p>
        <p><span>Montant dû</span><strong>{row.balance}</strong></p>
        <p><span>Date de relance</span><strong>24/05/2026</strong></p>
        <p><span>Canal de relance</span><strong>SMS + appel</strong></p>
        <p><span>Commentaire</span><strong>Solde en attente de règlement</strong></p>
        <p><span>Engagement du locataire</span><strong>{row.status === "Partiel" ? "Solde annoncé" : "À confirmer"}</strong></p>
        <p><span>Prochaine action</span><strong>{row.status === "Partiel" ? "Encaisser solde" : "Lettre de relance"}</strong></p>
        <p><span>Statut</span><Badge label={row.status === "Partiel" ? "Promesse de paiement" : "En retard"} /></p>
      </div>
      <div className="stack-actions">
        <Button variant="primary" onClick={() => onAction("Ajouter relance")}><Bell size={17} /> Ajouter relance</Button>
        <Button onClick={() => onAction("Promesse de paiement")}><FileText size={17} /> Promesse</Button>
        <Button onClick={() => onAction("Changer statut relance")}><RefreshCw size={17} /> Changer statut</Button>
        <Button onClick={() => onAction("Enregistrer paiement", { row })}><Banknote size={17} /> Paiement</Button>
        <Button onClick={() => onAction("État impayé")}><FileText size={17} /> État impayé</Button>
        <Button onClick={() => onAction("Marquer régularisé")}><CheckCircle2 size={17} /> Régularisé</Button>
        <Button onClick={() => onAction("Historique relance")}><History size={17} /> Historique</Button>
      </div>
    </Panel>
  );
}

function ReportsPage({ selected, onSelect, onAction }) {
  const reportRows = [
    ["Villa Koulouba", "Mamadou Keita", "Awa Traoré", "2 750 000 FCFA", "Payé"],
    ["Résidence ACI Baobab", "Sira Coulibaly", "Oumar Sidibé", "400 000 FCFA", "Partiel"],
    ["Plateau Office Center", "Foncière Mandé", "Cabinet Diarra", "Direct propriétaire", "Suivi"],
  ];

  return (
    <>
      <PageIntro
        title="Rapports & exports"
        actions={
          <Button variant="primary" onClick={() => onAction("Exporter rapport")}>
            <Download size={18} /> Exporter rapport
          </Button>
        }
      />
      <section className="reports-layout" data-demo="reports-layout">
        <div className="report-grid">
          {reports.map(([title, text, Icon]) => (
            <button className={selected === title ? "report-card active" : "report-card"} key={title} onClick={() => onSelect(title)}>
              <span><Icon size={21} /></span>
              <strong>{title}</strong>
              <small>{text}</small>
            </button>
          ))}
        </div>
        <Panel title="Aperçu & filtres" className="report-preview">
          <div className="report-selected">
            <BarChart3 size={28} />
            <div>
              <h3>{selected}</h3>
            </div>
          </div>
          <div className="form-grid compact-form">
            <label>Période<select><option>Mai 2026</option><option>Trimestre en cours</option><option>Année 2026</option></select></label>
            <label>Bien<select><option>Tous les biens</option>{properties.map((property) => <option key={property.code}>{property.name}</option>)}</select></label>
            <label>Propriétaire<select><option>Tous les propriétaires</option>{owners.map((owner) => <option key={owner.id}>{owner.name}</option>)}</select></label>
            <label>Locataire<select><option>Tous les locataires</option>{tenants.map((tenant) => <option key={tenant.id}>{tenant.name}</option>)}</select></label>
            <label>Agent<select><option>Tous les agents</option><option>Mariam Traoré</option><option>Issa Maïga</option><option>Cheick Camara</option></select></label>
            <label>Statut<select><option>Tous statuts</option><option>Actif</option><option>À valider</option><option>Archivé</option><option>Impayé</option></select></label>
            <label>Type d'opération<select><option>Toutes opérations</option><option>Loyer</option><option>Commission</option><option>Charge</option><option>Entretien</option><option>Reversement</option></select></label>
            <label>Format<select><option>PDF</option><option>Excel</option><option>Impression</option></select></label>
          </div>
          <div className="summary-strip">
            <Info label="Lignes" value="142" />
            <Info label="Montant total" value="85.4M FCFA" />
            <Info label="Dernière génération" value="28/05/2026" />
          </div>
          <Panel title="Résultat du rapport" className="nested-panel">
            <DataTable
              columns={["Bien", "Propriétaire", "Locataire", "Montant / info", "Statut"]}
              rows={reportRows.map((row) => [
                row[0],
                row[1],
                row[2],
                row[3],
                <Badge label={row[4]} />,
              ])}
            />
          </Panel>
          <div className="action-row compact-row">
            <Button onClick={() => onAction(`Détail ligne ${selected}`)}><Eye size={17} /> Détail ligne</Button>
            <Button variant="primary" onClick={() => onAction(`Exporter ${selected} PDF`)}><Download size={17} /> PDF</Button>
            <Button onClick={() => onAction(`Exporter ${selected} Excel`)}><Download size={17} /> Excel</Button>
            <Button onClick={() => onAction(`Imprimer ${selected}`)}><Printer size={17} /> Imprimer</Button>
          </div>
        </Panel>
      </section>
    </>
  );
}

function AdminPage({ activeTab, onTab, onAction }) {
  const tabs = ["Utilisateurs", "Rôles & permissions", "Paramètres", "Modèles documents", "Historique"];
  return (
    <>
      <PageIntro
        title="Plus / Administration"
        actions={
          <Button variant="primary" onClick={() => onAction("Ajouter utilisateur")}>
            <Plus size={18} /> Ajouter utilisateur
          </Button>
        }
      />
      <Tabs tabs={tabs} active={activeTab} onChange={onTab} demo="admin-tabs" />
      {activeTab === "Utilisateurs" && <UsersAdmin onAction={onAction} />}
      {activeTab === "Rôles & permissions" && <RolesAdmin onAction={onAction} />}
      {activeTab === "Paramètres" && <SettingsAdmin />}
      {activeTab === "Modèles documents" && <TemplatesAdmin onAction={onAction} />}
      {activeTab === "Historique" && <HistoryAdmin />}
    </>
  );
}

function UsersAdmin({ onAction }) {
  const [selected, setSelected] = useState(users[0]);
  const { detailOpen, openDetail, closeDetail } = useDetailNavigation();

  const openUser = (user) => {
    setSelected(user);
    openDetail();
  };

  if (detailOpen) {
    return (
      <DetailPageShell title="Fiche utilisateur" subtitle={selected.name} onBack={closeDetail}>
        <UserProfilePanel user={selected} onAction={onAction} />
      </DetailPageShell>
    );
  }

  return (
    <section className="client-list-workspace" data-demo="admin-workspace">
      <Panel title="Utilisateurs">
        <DataTable
          columns={["Nom", "Email", "Rôle", "Statut", "Dernière connexion", "Action"]}
          rows={users.map((user) => [
            user.name,
            user.email,
            user.role,
            <Badge label={user.status} />,
            user.lastLogin,
            <div className="table-actions">
              <Button compact onClick={() => openUser(user)}><Eye size={15} /> Fiche</Button>
              <Button compact onClick={() => onAction("Modifier utilisateur")}><Pencil size={15} /> Modifier</Button>
              <Button compact onClick={() => onAction("Désactiver utilisateur")}><XCircle size={15} /> Désactiver</Button>
            </div>,
          ])}
        />
      </Panel>
    </section>
  );
}

function UserProfilePanel({ user, onAction }) {
  const modules =
    user.role === "Administrateur"
      ? "Tous modules"
      : user.role === "Caisse / Encaissement"
        ? "Finance, paiements, reçus"
        : "Biens, clients, contrats, rapports";

  return (
    <Panel title="Fiche utilisateur" className="profile-panel">
      <ProfileHeader person={{ name: user.name, email: user.email, phone: "+223 70 00 00 00", id: user.role }} />
      <DetailMetrics
        items={[
          ["Rôle", user.role],
          ["Statut", user.status],
          ["Dernière connexion", user.lastLogin],
          ["Périmètre", modules],
        ]}
      />
      <div className="simple-list">
        <p><span>Nom complet</span><strong>{user.name}</strong></p>
        <p><span>Email</span><strong>{user.email}</strong></p>
        <p><span>Rôle attribué</span><strong>{user.role}</strong></p>
        <p><span>Permissions principales</span><strong>{modules}</strong></p>
        <p><span>Statut du compte</span><Badge label={user.status} /></p>
        <p><span>Dernière connexion</span><strong>{user.lastLogin}</strong></p>
      </div>
      <div className="stack-actions">
        <Button variant="primary" onClick={() => onAction("Modifier utilisateur")}><Pencil size={17} /> Modifier</Button>
        <Button onClick={() => onAction("Changer rôle utilisateur")}><ShieldCheck size={17} /> Changer rôle</Button>
        <Button onClick={() => onAction("Réinitialiser mot de passe")}><LockKeyhole size={17} /> Mot de passe</Button>
        <Button onClick={() => onAction(user.status === "Suspendu" ? "Réactiver utilisateur" : "Désactiver utilisateur")}><XCircle size={17} /> {user.status === "Suspendu" ? "Réactiver" : "Désactiver"}</Button>
        <Button onClick={() => onAction("Historique utilisateur")}><History size={17} /> Historique</Button>
      </div>
    </Panel>
  );
}

function RolesAdmin({ onAction }) {
  const permissions = ["Voir", "Créer", "Modifier", "Supprimer", "Valider", "Exporter"];
  const modules = ["Dashboard", "Biens", "Clients", "Contrats", "Finance", "Rapports", "Administration"];
  const [profile, setProfile] = useState(roleProfiles[0]);
  const canUse = (permission, index) =>
    profile === "Administrateur" ||
    (profile === "Directeur / Manager" && permission !== "Supprimer") ||
    index < 3 ||
    permission === "Exporter";

  return (
    <Panel title="Rôles et permissions">
      <div className="role-toolbar">
        <label>
          Rôle
          <select value={profile} onChange={(event) => setProfile(event.target.value)}>
            {roleProfiles.map((role) => <option key={role}>{role}</option>)}
          </select>
        </label>
        <div className="table-actions">
          <Button compact onClick={() => onAction("Créer rôle")}><Plus size={15} /> Créer</Button>
          <Button compact onClick={() => onAction(`Modifier rôle ${profile}`)}><Pencil size={15} /> Modifier</Button>
          <Button compact onClick={() => onAction(`Sauvegarder permissions ${profile}`)}><CheckCircle2 size={15} /> Sauvegarder</Button>
          <Button compact onClick={() => onAction(`Dupliquer rôle ${profile}`)}><Archive size={15} /> Dupliquer</Button>
          <Button compact onClick={() => onAction(`Désactiver rôle ${profile}`)}><XCircle size={15} /> Désactiver</Button>
        </div>
      </div>
      <DetailMetrics
        items={[
          ["Rôle sélectionné", profile],
          ["Modules couverts", modules.length],
          ["Permissions", permissions.length],
          ["Dernière mise à jour", "28/05/2026"],
        ]}
      />
      <div className="permission-grid">
        <span>Module</span>
        {permissions.map((permission) => <strong key={permission}>{permission}</strong>)}
        {modules.map((module, rowIndex) => (
          <Fragment key={module}>
            <p key={`${module}-label`}><ShieldCheck size={17} /> {module}</p>
            {permissions.map((permission, index) => (
              <button
                className={canUse(permission, index) && rowIndex < (profile === "Assistant administratif" ? 5 : modules.length) ? "checked" : ""}
                key={`${module}-${permission}`}
                onClick={() => onAction(`Permission ${permission} ${module}`)}
                type="button"
              >
                <span className="sr-only">{permission} {module}</span>
                {canUse(permission, index) && rowIndex < (profile === "Assistant administratif" ? 5 : modules.length) ? "✓" : ""}
              </button>
            ))}
          </Fragment>
        ))}
      </div>
    </Panel>
  );
}

function SettingsAdmin() {
  return (
    <section className="settings-grid">
      <Panel title="Paramètres généraux">
        <div className="form-grid compact-form">
          <label>Nom de l'agence<input defaultValue="E.K immo" /></label>
          <label>Ville<input defaultValue="Bamako" /></label>
          <label>Devise<select><option>FCFA</option></select></label>
          <label>Taux commission par défaut<input defaultValue="5%" /></label>
          <label className="full">Adresse<input defaultValue="ACI 2000, Bamako, Mali" /></label>
        </div>
      </Panel>
      <Panel title="Préférences métier">
        <div className="toggle-list">
          <p><span>Alertes impayés automatiques</span><strong>Activé</strong></p>
          <p><span>Validation reversement manager</span><strong>Activé</strong></p>
          <p><span>Archivage automatique des reçus</span><strong>Activé</strong></p>
          <p><span>Encaissement direct propriétaire</span><strong>Suivi séparé</strong></p>
        </div>
      </Panel>
    </section>
  );
}

function TemplatesAdmin({ onAction }) {
  return (
    <DocumentStudio
      initialTemplate="facture"
      title="Atelier des modèles E.K immo"
      onAction={onAction}
      data={{
        invoice: invoices[0],
        payment: paymentRecords[0],
        commission: commissions[0],
        property: properties[0],
        owner: owners[0],
        tenant: tenants[0],
      }}
    />
  );
}

function HistoryAdmin() {
  return (
    <Panel title="Historique des actions">
      <DataTable
        columns={["Utilisateur", "Action réalisée", "Module", "Date", "Heure", "Ancienne valeur", "Nouvelle valeur"]}
        rows={[
          ["Aïssata Diarra", "Enregistrement de paiement", "Finance", "28/05/2026", "07:52", "Solde 400 000 FCFA", "Paiement 450 000 FCFA"],
          ["Issa Maïga", "Génération de document", "Contrats", "27/05/2026", "18:22", "Brouillon", "Contrat généré"],
          ["Mariam Traoré", "Modification", "Biens", "27/05/2026", "15:40", "Réservé", "Loué"],
          ["Admin", "Annulation de reçu", "Finance", "18/05/2026", "12:01", "Reçu généré", "Reçu annulé"],
        ]}
      />
    </Panel>
  );
}

function LoginScreen({ onLogin }) {
  return (
    <main className="login-screen">
      <section className="login-card">
        <div className="login-brand">
          <img src={ekimmoAssets.logo} alt="E.K immo" />
          <div>
            <strong>E.K immo</strong>
            <span>Gestion immobilière de prestige</span>
          </div>
        </div>
        <h1>Connexion</h1>
        <p>Accédez à votre espace de gestion immobilière.</p>
        <label>Email ou identifiant<input defaultValue="admin@ekimmo.ml" /></label>
        <label>Mot de passe<input type="password" defaultValue="demo2026" /></label>
        <button className="primary-wide" onClick={onLogin}>Se connecter</button>
        <button className="link-button">Mot de passe oublié ?</button>
        <div className="error-demo">Identifiants incorrects.</div>
      </section>
    </main>
  );
}

function StatCard({ item }) {
  const Icon = item.icon;
  return (
    <article className={`stat-card ${item.tone}`}>
      <div className="stat-card-top">
        <div className="stat-icon">
          <Icon size={20} />
        </div>
        <span>{item.label}</span>
      </div>
      <strong>{item.value}</strong>
      {item.details && (
        <div className="stat-breakdown">
          {item.details.map(([label, value]) => (
            <p key={label}>
              <span>{label}</span>
              <b>{value}</b>
            </p>
          ))}
        </div>
      )}
    </article>
  );
}

function DashboardFilterBar({ period, onPeriod, state, onState }) {
  return (
    <section className="dashboard-filter-bar">
      <Filter size={17} />
      <DashboardSelect value={period} onChange={onPeriod} options={periodOptions} ariaLabel="Période des blocs du dashboard" />
      <DashboardSelect value={state} onChange={onState} options={["Données", "Chargement", "Vide", "Erreur"]} ariaLabel="État du tableau de bord" />
      {period === "Période personnalisée" && (
        <div className="custom-period">
          <input type="date" aria-label="Date de début" />
          <input type="date" aria-label="Date de fin" />
        </div>
      )}
    </section>
  );
}

function DashboardLoadingState() {
  return (
    <div className="dashboard-loading-state" aria-busy="true">
      <section className="kpi-grid">
        {Array.from({ length: 8 }).map((_, index) => (
          <article className="stat-card skeleton-card" key={index}>
            <span className="skeleton-line icon" />
            <span className="skeleton-line short" />
            <span className="skeleton-line value" />
            <span className="skeleton-line full" />
            <span className="skeleton-line medium" />
          </article>
        ))}
      </section>
      <section className="two-grid">
        <DashboardSkeletonPanel lines={5} />
        <DashboardSkeletonPanel lines={5} />
      </section>
      <section className="three-grid dashboard-bottom">
        <DashboardSkeletonPanel lines={4} />
        <DashboardSkeletonPanel lines={5} />
        <DashboardSkeletonPanel lines={5} />
      </section>
    </div>
  );
}

function DashboardSkeletonPanel({ lines }) {
  return (
    <article className="panel skeleton-panel">
      <span className="skeleton-line title" />
      <div>
        {Array.from({ length: lines }).map((_, index) => (
          <span className={index % 2 === 0 ? "skeleton-line full" : "skeleton-line medium"} key={index} />
        ))}
      </div>
    </article>
  );
}

function DashboardEmptyState({ onAddProperty, onAddPayment }) {
  return (
    <section className="dashboard-state-card empty">
      <div className="state-icon">
        <BarChart3 size={24} />
      </div>
      <h2>Aucune donnée disponible pour cette période.</h2>
      <p>Ajoutez un bien ou enregistrez un paiement pour alimenter le tableau de bord.</p>
      <div className="action-row">
        <Button variant="primary" onClick={onAddProperty}><Plus size={17} /> Ajouter un bien</Button>
        <Button onClick={onAddPayment}><WalletCards size={17} /> Enregistrer un paiement</Button>
      </div>
    </section>
  );
}

function DashboardErrorState({ onRetry }) {
  return (
    <section className="dashboard-state-card error">
      <div className="state-icon">
        <AlertTriangle size={24} />
      </div>
      <h2>Impossible de charger les données du tableau de bord.</h2>
      <p>La récupération des indicateurs a échoué. Vous pouvez relancer le chargement.</p>
      <Button variant="primary" onClick={onRetry}><RefreshCw size={17} /> Réessayer</Button>
    </section>
  );
}

function DashboardSelect({ value, onChange, options, ariaLabel }) {
  return (
    <label className="dashboard-select">
      <select value={value} onChange={(event) => onChange(event.target.value)} aria-label={ariaLabel}>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
      <ChevronDown size={15} />
    </label>
  );
}

function RentBars() {
  const maxExpected = Math.max(...rentMonthlyEvolution.map((item) => item.expected));
  const bars = rentMonthlyEvolution.map((item, index, items) => {
    const unpaid = Math.max(item.expected - item.collected, 0);
    const collectionRate = Math.round((item.collected / item.expected) * 100);

    return {
      ...item,
      value: Math.round((item.expected / maxExpected) * 100),
      expectedLabel: formatFCFA(item.expected),
      collectedLabel: formatFCFA(item.collected),
      unpaidLabel: formatFCFA(unpaid),
      collectionRate,
      tone: index === items.length - 1 ? "active" : "soft",
    };
  });

  return (
    <div className="rent-chart">
      <div className="bars">
        {bars.map((bar) => (
          <button
            className="bar-button"
            key={bar.month}
            style={{ "--height": `${bar.value}%` }}
            aria-label={`${bar.month}: ${bar.expectedLabel} attendus, ${bar.collectedLabel} encaissés, ${bar.unpaidLabel} impayés, ${bar.collectionRate}% d'encaissement`}
          >
            <i className={bar.tone} />
            <span className="chart-flyout rent-flyout">
              <strong>{bar.month}</strong>
              <span><em>Loyers attendus</em><b>{bar.expectedLabel}</b></span>
              <span><em>Loyers encaissés</em><b>{bar.collectedLabel}</b></span>
              <span><em>Impayés</em><b>{bar.unpaidLabel}</b></span>
              <span><em>Taux d'encaissement</em><b>{bar.collectionRate}%</b></span>
            </span>
          </button>
        ))}
      </div>
      <div className="months">
        {bars.map((bar) => (
          <span key={bar.month}>{bar.month}</span>
        ))}
      </div>
    </div>
  );
}

function PipelineChart({ data }) {
  return (
    <div className="pipeline-layout">
      <div
        className="donut"
        style={{ background: buildPipelineGradient(data.items, data.total) }}
        tabIndex={0}
        aria-label={`Total: ${data.total} dossiers`}
      >
        <strong>{data.total}</strong>
        <span className="donut-label">Total</span>
        <span className="chart-flyout">Total: {data.total}</span>
      </div>
      <div className="pipeline-side">
        <div className="legend-list">
          {data.items.map(([label, value, tone]) => (
            <button key={label} aria-label={`${label}: ${value}`}>
              <i className={tone} />
              <span>{label} ({value})</span>
              <span className="chart-flyout">{label}: {value}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Panel({ title, toolbar, children, className = "", ...props }) {
  return (
    <section className={`panel ${className}`} {...props}>
      {(title || toolbar) && (
        <div className="panel-heading">
          {title && <h2>{title}</h2>}
          {toolbar && <div className="panel-toolbar">{toolbar}</div>}
        </div>
      )}
      {children}
    </section>
  );
}

function PageIntro({ eyebrow, title, subtitle, actions }) {
  return (
    <section className="page-intro">
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {actions && <div className="intro-actions">{actions}</div>}
    </section>
  );
}

function Tabs({ tabs, active, onChange, demo }) {
  return (
    <div className="sub-tabs" role="tablist" data-demo={demo}>
      {tabs.map((tab) => (
        <button className={active === tab ? "active" : ""} onClick={() => onChange(tab)} key={tab}>
          {tab}
        </button>
      ))}
    </div>
  );
}

function MiniTabs({ tabs, active, onChange }) {
  return (
    <div className="mini-tabs" role="tablist">
      {tabs.map((tab) => (
        <button className={active === tab ? "active" : ""} onClick={() => onChange(tab)} key={tab}>
          {tab}
        </button>
      ))}
    </div>
  );
}

function Segmented({ value, onChange, options }) {
  return (
    <div className="segmented">
      {options.map((option) => (
        <button className={value === option ? "active" : ""} key={option} onClick={() => onChange(option)}>
          {option}
        </button>
      ))}
    </div>
  );
}

function Button({ children, variant = "secondary", compact = false, onClick, disabled = false }) {
  return (
    <button className={`button ${variant} ${compact ? "compact" : ""}`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

function getInitials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function Badge({ label }) {
  const tone = statusTone(label);
  return <span className={`badge ${tone}`}>{label}</span>;
}

function statusTone(label) {
  if (["Disponible", "Actif", "À jour", "Payé", "Payée", "Validée", "Déduite", "Conclu", "Archivé", "Imprimé", "Généré", "Réalisée", "Présent", "Justificatif joint"].includes(label)) return "success";
  if (["Loué", "Visite prévue", "Prévue", "Contacté", "Réservé", "Planifié", "À payer", "À reverser", "Refacturable", "Ouverte", "Entretien seul"].includes(label)) return "purple";
  if (["En travaux", "Partiel", "À valider", "À échéance", "À déduire", "En attente", "En cours", "Reportée", "Relancé", "Client intéressé", "Brouillon", "Encaissement propriétaire", "Gestion multi-lots", "Suivi"].includes(label)) return "warning";
  if (["Impayé", "En retard", "Litige", "Perdu", "Suspendu", "Annulée", "Justificatif manquant"].includes(label)) return "danger";
  if (["Inactif", "Indisponible", "Vendu", "Manquant"].includes(label)) return "muted";
  return "default";
}

function Avatar({ name, image, initials }) {
  const label =
    initials ??
    name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  return image ? <img className="avatar" src={image} alt="" /> : <span className="avatar">{label}</span>;
}

function ProfileHeader({ person }) {
  return (
    <div className="profile-header">
      <Avatar name={person.name} image={person.avatar} initials={person.initials} />
      <div>
        <h3>{person.name}</h3>
        <p>{person.id}</p>
      </div>
      {person.email && (
        <span className="profile-contact">
          <Mail size={15} /> {person.email}
        </span>
      )}
      {person.phone && (
        <span className="profile-contact">
          <Phone size={15} /> {person.phone}
        </span>
      )}
    </div>
  );
}

function Info({ label, value }) {
  return (
    <p className="info-item">
      <span>{label}</span>
      <strong>{value}</strong>
    </p>
  );
}

function DetailMetrics({ items }) {
  return (
    <div className="detail-metrics">
      {items.map(([label, value]) => (
        <p key={label}>
          <span>{label}</span>
          <strong>{value}</strong>
        </p>
      ))}
    </div>
  );
}

const nowrapTableColumns = [
  "action",
  "agent",
  "attendu",
  "bien",
  "charge",
  "client",
  "code",
  "commission",
  "contrat",
  "date",
  "echeance",
  "impaye",
  "locataire",
  "loyer",
  "montant",
  "numero",
  "occupant",
  "paye",
  "periode",
  "proprietaire",
  "quartier",
  "reference",
  "solde",
  "statut",
  "telephone",
  "type",
  "valeur",
];

const wrapTableColumns = ["adresse", "commentaire", "description", "derniere action", "details", "historique", "motif", "notes", "observation", "prochaine action"];

function DataTable({ columns, rows }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td className={getCellClass(cell, columns[cellIndex])} data-column={columns[cellIndex]} key={`${rowIndex}-${cellIndex}`}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function getCellClass(cell, column) {
  const classes = [];
  const normalizedColumn = normalizeSearch(column);
  const canWrap = wrapTableColumns.some((keyword) => normalizedColumn.includes(keyword));
  const shouldKeepColumn = !canWrap && nowrapTableColumns.some((keyword) => normalizedColumn.includes(keyword));

  if (shouldKeepColumn) classes.push("nowrap-cell");

  if (typeof cell !== "string") return classes.length ? classes.join(" ") : undefined;

  const value = cell.trim();
  if (
    value.includes("FCFA") ||
    /^[A-Z]{2,}-\d{4}-\d{3}$/.test(value) ||
    /^\d{2}\/\d{2}\/\d{4}(\s+\d{2}:\d{2})?$/.test(value) ||
    /^\+?\d[\d\s]+$/.test(value)
  ) {
    classes.push("nowrap-cell");
  }

  return [...new Set(classes)].join(" ") || undefined;
}

function FilterSelect({ label }) {
  return (
    <button className="filter-select">
      {label} <ChevronDown size={15} />
    </button>
  );
}

function DocumentActions() {
  return (
    <div className="table-actions">
      <Button compact><Eye size={15} /> Voir</Button>
      <Button compact><Download size={15} /> PDF</Button>
      <Button compact><Send size={15} /> Envoyer</Button>
    </div>
  );
}

function ProspectFormModal({ sequence = prospects.length + 1, onSave, onClose }) {
  const generatedId = useMemo(() => `PROS-2026-${String(sequence).padStart(3, "0")}`, [sequence]);
  const [values, setValues] = useState({
    id: generatedId,
    name: "Aminata Sissoko",
    phone: "+223 76 18 45 90",
    email: "aminata.sissoko@gmail.com",
    type: "Particulier",
    source: "WhatsApp",
    objective: "Location",
    propertyType: "Appartement T3",
    districts: "ACI 2000 / Hamdallaye",
    budget: "750 000 FCFA",
    delay: "30 jours",
    requirements: "Séjour lumineux, parking sécurisé, proximité école.",
    agent: "Mariam Traoré",
    status: "Nouveau",
    next: "Appel de qualification",
    comment: "Prospect à qualifier puis orienter vers les biens disponibles.",
  });

  const update = (field) => (event) => {
    setValues((current) => ({ ...current, [field]: event.target.value }));
  };

  const canSave = values.name.trim() && values.phone.trim() && values.propertyType.trim() && values.budget.trim();

  const buildProspect = () => ({
    id: values.id,
    name: values.name.trim(),
    phone: values.phone.trim(),
    email: values.email.trim(),
    type: values.type,
    source: values.source,
    objective: values.objective,
    need: values.propertyType.trim(),
    propertyType: values.propertyType.trim(),
    district: values.districts.trim(),
    budget: values.budget.trim(),
    delay: values.delay.trim(),
    requirements: values.requirements.trim(),
    agent: values.agent,
    status: values.status,
    next: values.next.trim(),
    comment: values.comment.trim(),
  });

  const submit = (proposeProperty = false) => {
    if (!canSave) return;
    onSave({ prospect: buildProspect(), proposeProperty });
  };

  return (
    <div className="modal-backdrop">
      <section className="modal-card wide-modal prospect-form-modal">
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="payment-modal-head">
          <div>
            <span>Prospection commerciale</span>
            <h2>Nouveau prospect</h2>
            <p>Créer une fiche prospect exploitable pour le suivi, les visites et les propositions de biens.</p>
          </div>
          <Badge label={values.id} />
        </div>

        <div className="form-section">
          <h3>Identification</h3>
          <div className="form-grid">
            <label>Nom
              <input value={values.name} onChange={update("name")} />
            </label>
            <label>Téléphone
              <input value={values.phone} onChange={update("phone")} />
            </label>
            <label>Email
              <input value={values.email} onChange={update("email")} />
            </label>
            <label>Type
              <select value={values.type} onChange={update("type")}>
                <option>Particulier</option>
                <option>Société</option>
              </select>
            </label>
            <label className="full">Source
              <select value={values.source} onChange={update("source")}>
                <option>Appel</option>
                <option>WhatsApp</option>
                <option>Recommandation</option>
                <option>Passage agence</option>
                <option>Autre</option>
              </select>
            </label>
          </div>
        </div>

        <div className="form-section">
          <h3>Besoin immobilier</h3>
          <div className="form-grid">
            <label>Objectif
              <select value={values.objective} onChange={update("objective")}>
                <option>Location</option>
                <option>Achat</option>
              </select>
            </label>
            <label>Type de bien recherché
              <input value={values.propertyType} onChange={update("propertyType")} />
            </label>
            <label>Quartiers souhaités
              <input value={values.districts} onChange={update("districts")} />
            </label>
            <label>Budget
              <input value={values.budget} onChange={update("budget")} />
            </label>
            <label>Délai
              <input value={values.delay} onChange={update("delay")} />
            </label>
            <label className="full">Exigences particulières
              <textarea value={values.requirements} onChange={update("requirements")} />
            </label>
          </div>
        </div>

        <div className="form-section">
          <h3>Suivi commercial</h3>
          <div className="form-grid">
            <label>Agent responsable
              <select value={values.agent} onChange={update("agent")}>
                <option>Mariam Traoré</option>
                <option>Aïssata Diarra</option>
                <option>Issa Maïga</option>
                <option>Cheick Camara</option>
              </select>
            </label>
            <label>Statut initial
              <select value={values.status} onChange={update("status")}>
                <option>Nouveau</option>
                <option>Contacté</option>
                <option>Visite prévue</option>
                <option>Intéressé</option>
              </select>
            </label>
            <label>Prochaine action
              <input value={values.next} onChange={update("next")} />
            </label>
            <label className="full">Commentaire
              <textarea value={values.comment} onChange={update("comment")} />
            </label>
          </div>
        </div>

        <div className="action-row compact-row">
          <Button onClick={onClose}>Annuler</Button>
          <Button onClick={() => submit(false)} disabled={!canSave}>Enregistrer</Button>
          <Button variant="primary" onClick={() => submit(true)} disabled={!canSave}>
            <Home size={17} /> Enregistrer et proposer un bien
          </Button>
        </div>
      </section>
    </div>
  );
}

function ProspectProposalModal({ prospect, onSave, onClose }) {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    district: "",
    type: "",
    budget: prospect?.budget ?? "",
    status: "Tous",
  });
  const [selectedCodes, setSelectedCodes] = useState([]);
  const [comment, setComment] = useState("Proposition adaptée au besoin exprimé.");
  const compatibleProperties = useMemo(() => {
    const normalizedQuery = normalizeSearch(query);
    return getCompatibleProperties(prospect, filters).filter((property) => {
      if (!normalizedQuery) return true;
      return normalizeSearch(`${property.code} ${property.name} ${property.type} ${property.district}`).includes(normalizedQuery);
    });
  }, [prospect, filters, query]);

  useEffect(() => {
    setSelectedCodes((current) => current.filter((code) => compatibleProperties.some((property) => property.code === code)));
  }, [compatibleProperties]);

  const toggleProperty = (code) => {
    setSelectedCodes((current) => (
      current.includes(code) ? current.filter((item) => item !== code) : [...current, code]
    ));
  };

  const selectedProperties = compatibleProperties.filter((property) => selectedCodes.includes(property.code));
  const canSave = selectedProperties.length > 0;

  const submit = () => {
    if (!canSave) return;
    onSave({ prospect, properties: selectedProperties, comment });
  };

  return (
    <div className="modal-backdrop">
      <section className="modal-card wide-modal prospect-proposal-modal">
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="payment-modal-head">
          <div>
            <span>Propositions de biens</span>
            <h2>Biens compatibles</h2>
            <p>Rechercher, filtrer puis sélectionner un ou plusieurs biens à proposer au prospect.</p>
          </div>
          <Badge label={prospect?.status ?? "Nouveau"} />
        </div>

        <div className="prospect-proposal-summary">
          <Avatar name={prospect?.name ?? "Prospect"} />
          <div>
            <strong>{prospect?.name}</strong>
            <span>{prospect?.need} · {prospect?.district} · {prospect?.budget}</span>
          </div>
        </div>

        <div className="proposal-filters form-grid compact-form">
          <label className="full">Recherche d'un bien
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Nom, référence, quartier..." />
          </label>
          <label>Quartier
            <select value={filters.district} onChange={(event) => setFilters((current) => ({ ...current, district: event.target.value }))}>
              <option value="">Tous</option>
              <option>ACI 2000</option>
              <option>Badalabougou</option>
              <option>Hamdallaye</option>
              <option>Korofina</option>
              <option>Sotuba</option>
            </select>
          </label>
          <label>Type
            <select value={filters.type} onChange={(event) => setFilters((current) => ({ ...current, type: event.target.value }))}>
              <option value="">Tous</option>
              <option>Appartement</option>
              <option>Villa</option>
              <option>Bureau</option>
              <option>Maison</option>
              <option>Terrain</option>
            </select>
          </label>
          <label>Budget maximum
            <input value={filters.budget} onChange={(event) => setFilters((current) => ({ ...current, budget: event.target.value }))} />
          </label>
          <label>Disponibilité
            <select value={filters.status} onChange={(event) => setFilters((current) => ({ ...current, status: event.target.value }))}>
              <option>Tous</option>
              <option>Disponible</option>
              <option>Loué</option>
              <option>Réservé</option>
              <option>Entretien seul</option>
            </select>
          </label>
        </div>

        <div className="proposal-select-list">
          {compatibleProperties.map((property) => (
            <label className={selectedCodes.includes(property.code) ? "proposal-select-card active" : "proposal-select-card"} key={property.code}>
              <input type="checkbox" checked={selectedCodes.includes(property.code)} onChange={() => toggleProperty(property.code)} />
              <img src={property.image} alt={property.name} />
              <span>
                <strong>{property.name}</strong>
                <small>{property.code} · {property.type} · {property.district}</small>
                <b>{property.price} {property.period}</b>
              </span>
              <Badge label={property.status} />
            </label>
          ))}
          {!compatibleProperties.length && <p className="empty-state-inline">Aucun bien compatible avec ces filtres.</p>}
        </div>

        <div className="form-section">
          <h3>Commentaire associé</h3>
          <div className="form-grid compact-form">
            <label>Commentaire
              <textarea value={comment} onChange={(event) => setComment(event.target.value)} />
            </label>
          </div>
        </div>

        <div className="action-row compact-row">
          <Button onClick={onClose}>Annuler</Button>
          <Button variant="primary" onClick={submit} disabled={!canSave}>
            <Send size={17} /> Proposer
          </Button>
        </div>
      </section>
    </div>
  );
}

function ProspectNeedModal({ prospect, onSave, onClose }) {
  const [values, setValues] = useState({
    propertyType: prospect.propertyType ?? prospect.need ?? "Appartement T3",
    districts: prospect.district ?? "ACI 2000",
    budget: prospect.budget ?? "750 000 FCFA",
    objective: getProspectObjective(prospect),
    delay: getProspectDelay(prospect),
    requirements: prospect.requirements ?? "À préciser avec le client.",
    comment: prospect.comment ?? "Besoin mis à jour depuis la fiche prospect.",
  });
  const update = (field) => (event) => setValues((current) => ({ ...current, [field]: event.target.value }));

  return (
    <div className="modal-backdrop">
      <section className="modal-card wide-modal prospect-form-modal">
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="payment-modal-head">
          <div>
            <span>Fiche prospect</span>
            <h2>Modifier besoin</h2>
            <p>Mettre à jour les critères qui servent aux propositions de biens.</p>
          </div>
          <Badge label={prospect.status} />
        </div>
        <div className="form-section">
          <h3>Besoin immobilier</h3>
          <div className="form-grid">
            <label>Type de bien<input value={values.propertyType} onChange={update("propertyType")} /></label>
            <label>Quartiers<input value={values.districts} onChange={update("districts")} /></label>
            <label>Budget<input value={values.budget} onChange={update("budget")} /></label>
            <label>Objectif<select value={values.objective} onChange={update("objective")}><option>Location</option><option>Achat</option><option>Location pro</option></select></label>
            <label>Délai<input value={values.delay} onChange={update("delay")} /></label>
            <label className="full">Exigences<textarea value={values.requirements} onChange={update("requirements")} /></label>
            <label className="full">Commentaire<textarea value={values.comment} onChange={update("comment")} /></label>
          </div>
        </div>
        <div className="action-row compact-row">
          <Button onClick={onClose}>Annuler</Button>
          <Button variant="primary" onClick={() => onSave({ prospect, values })}>Enregistrer</Button>
        </div>
      </section>
    </div>
  );
}

function ProspectNextActionModal({ prospect, onSave, onClose }) {
  const [values, setValues] = useState({
    type: "Appel",
    date: "22/06/2026",
    responsible: prospect.agent ?? "Mariam Traoré",
    comment: prospect.next ?? "Relancer le prospect sur les biens proposés.",
  });
  const update = (field) => (event) => setValues((current) => ({ ...current, [field]: event.target.value }));

  return (
    <div className="modal-backdrop">
      <section className="modal-card wide-modal prospect-form-modal">
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="payment-modal-head">
          <div>
            <span>Suivi commercial</span>
            <h2>Prochaine action</h2>
            <p>Planifier l'étape suivante du suivi prospect.</p>
          </div>
          <Badge label={prospect.name} />
        </div>
        <div className="form-section">
          <h3>Action à planifier</h3>
          <div className="form-grid">
            <label>Type d'action<select value={values.type} onChange={update("type")}><option>Appel</option><option>WhatsApp</option><option>Visite</option><option>Envoi proposition</option><option>Relance</option></select></label>
            <label>Date prévue<input type="date" value={values.date} onChange={update("date")} /></label>
            <label>Responsable<select value={values.responsible} onChange={update("responsible")}><option>Mariam Traoré</option><option>Aïssata Diarra</option><option>Issa Maïga</option><option>Cheick Camara</option></select></label>
            <label className="full">Commentaire<textarea value={values.comment} onChange={update("comment")} /></label>
          </div>
        </div>
        <div className="action-row compact-row">
          <Button onClick={onClose}>Annuler</Button>
          <Button variant="primary" onClick={() => onSave({ prospect, values })}>Enregistrer</Button>
        </div>
      </section>
    </div>
  );
}

function ProspectVisitModal({ prospect, proposal, property, prospectsList = prospects, onSave, onClose }) {
  const prospectOptions = prospectsList.length ? prospectsList : prospects;
  const initialProspect = prospect ?? prospectOptions[0] ?? null;
  const proposedProperty =
    property ??
    properties.find((item) => item.code === proposal?.code) ??
    getCompatibleProperties(initialProspect)[0] ??
    properties[0];
  const [visit, setVisit] = useState({
    clientMode: "existing",
    prospectName: initialProspect?.name ?? "",
    newProspectName: "",
    phone: initialProspect?.phone ?? "",
    need: initialProspect?.need ?? "Appartement ou villa à visiter",
    property: proposedProperty.name,
    date: "2026-06-20",
    time: "10:00",
    agent: initialProspect?.agent ?? "Mariam Traoré",
    meetingPlace: "Agence E.K immo - Niamakoro",
    priority: "Normale",
    internalComment: "Confirmer la disponibilité du client avant déplacement.",
    nextAction: "Confirmer la présence",
    notifyReminder: "Oui",
  });
  const selectedProperty = properties.find((item) => item.name === visit.property) ?? proposedProperty;
  const update = (field) => (event) => setVisit((current) => ({ ...current, [field]: event.target.value }));
  const setClientMode = (clientMode) => {
    setVisit((current) => ({
      ...current,
      clientMode,
      prospectName: clientMode === "existing" ? (initialProspect?.name ?? prospectOptions[0]?.name ?? "") : current.prospectName,
      newProspectName: clientMode === "new" ? current.newProspectName : "",
      phone: clientMode === "existing" ? (initialProspect?.phone ?? prospectOptions[0]?.phone ?? current.phone) : "",
      need: clientMode === "existing" ? (initialProspect?.need ?? prospectOptions[0]?.need ?? current.need) : "",
    }));
  };
  const updateExistingProspect = (event) => {
    const selectedProspect = prospectOptions.find((item) => item.name === event.target.value);
    setVisit((current) => ({
      ...current,
      prospectName: event.target.value,
      phone: selectedProspect?.phone ?? current.phone,
      need: selectedProspect?.need ?? current.need,
      agent: selectedProspect?.agent ?? current.agent,
    }));
  };

  return (
    <div className="modal-backdrop">
      <section className="modal-card wide-modal prospect-form-modal">
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="payment-modal-head">
          <div>
            <span>Visite prospect</span>
            <h2>Planifier visite</h2>
            <p>Créer une visite reliée au prospect, au bien, à la fiche bien et aux notifications du jour.</p>
          </div>
          <Badge label={visit.clientMode === "new" ? "Nouveau prospect" : (visit.prospectName || "Prospect")} />
        </div>

        <div className="form-section">
          <h3>Client</h3>
          <div className="segmented visit-mode-switch" role="group" aria-label="Type de prospect">
            <button className={visit.clientMode === "existing" ? "active" : ""} type="button" onClick={() => setClientMode("existing")}>Prospect existant</button>
            <button className={visit.clientMode === "new" ? "active" : ""} type="button" onClick={() => setClientMode("new")}>Nouveau prospect</button>
          </div>
          <div className="form-grid">
            {visit.clientMode === "existing" ? (
              <label>Prospect existant<select value={visit.prospectName} onChange={updateExistingProspect}>{prospectOptions.map((item) => <option key={getProspectKey(item)}>{item.name}</option>)}</select></label>
            ) : (
              <label>Nouveau prospect<input value={visit.newProspectName} onChange={update("newProspectName")} placeholder="Nom complet" /></label>
            )}
            <label>Téléphone<input value={visit.phone} onChange={update("phone")} placeholder="+223 ..." /></label>
            <label className="full">Besoin<textarea value={visit.need} onChange={update("need")} /></label>
          </div>
        </div>

        <div className="form-section">
          <h3>Bien</h3>
          <div className="form-grid">
            <label>Bien à visiter<select value={visit.property} onChange={update("property")}>{properties.map((item) => <option key={item.code}>{item.name}</option>)}</select></label>
            <label>Disponibilité du bien<input value={selectedProperty.status} readOnly /></label>
            <label className="full">Adresse<input value={selectedProperty.address} readOnly /></label>
            <label>Propriétaire<input value={selectedProperty.owner} readOnly /></label>
            <label>Quartier<input value={selectedProperty.district} readOnly /></label>
          </div>
        </div>

        <div className="form-section">
          <h3>Planification</h3>
          <div className="form-grid">
            <label>Date<input type="date" value={visit.date} onChange={update("date")} /></label>
            <label>Heure<input type="time" value={visit.time} onChange={update("time")} /></label>
            <label>Agent responsable<select value={visit.agent} onChange={update("agent")}><option>Mariam Traoré</option><option>Aïssata Diarra</option><option>Issa Maïga</option><option>Cheick Camara</option></select></label>
            <label>Lieu de rendez-vous<input value={visit.meetingPlace} onChange={update("meetingPlace")} /></label>
            <label>Priorité<select value={visit.priority} onChange={update("priority")}><option>Normale</option><option>Urgente</option><option>Critique</option></select></label>
            <label className="full">Commentaire interne<textarea value={visit.internalComment} onChange={update("internalComment")} /></label>
          </div>
        </div>

        <div className="form-section">
          <h3>Suivi</h3>
          <div className="form-grid compact-form">
            <label>Prochaine action initiale<select value={visit.nextAction} onChange={update("nextAction")}><option>Confirmer la présence</option><option>Envoyer rappel WhatsApp</option><option>Préparer fiche bien</option><option>Relancer après visite</option><option>Créer dossier locataire</option></select></label>
            <label>Rappel notification<select value={visit.notifyReminder} onChange={update("notifyReminder")}><option>Oui</option><option>Non</option></select></label>
          </div>
        </div>

        <div className="action-row compact-row">
          <Button onClick={onClose}>Annuler</Button>
          <Button variant="primary" onClick={() => onSave({ prospect, visit })}>Planifier visite</Button>
        </div>
      </section>
    </div>
  );
}

function ProspectCommentModal({ prospect, onSave, onClose }) {
  const [values, setValues] = useState({
    type: "Note interne",
    comment: "Ajouter une précision au suivi commercial.",
  });
  const update = (field) => (event) => setValues((current) => ({ ...current, [field]: event.target.value }));

  return (
    <div className="modal-backdrop">
      <section className="modal-card prospect-form-modal">
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>Commentaire</h2>
        <p>Ajouter une note ou un échange client à la timeline du prospect.</p>
        <div className="form-section">
          <div className="form-grid compact-form">
            <label>Type<select value={values.type} onChange={update("type")}><option>Note interne</option><option>Échange client</option></select></label>
            <label>Commentaire<textarea value={values.comment} onChange={update("comment")} /></label>
          </div>
        </div>
        <div className="action-row compact-row">
          <Button onClick={onClose}>Annuler</Button>
          <Button variant="primary" onClick={() => onSave({ prospect, values })}>Enregistrer</Button>
        </div>
      </section>
    </div>
  );
}

function ProspectStatusModal({ prospect, onSave, onClose }) {
  const [status, setStatus] = useState(prospect.status ?? "Nouveau");
  const [reason, setReason] = useState("Budget insuffisant");
  const isLost = status === "Perdu";

  return (
    <div className="modal-backdrop">
      <section className="modal-card prospect-form-modal">
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>Changer statut</h2>
        <p>Mettre à jour le statut commercial du prospect.</p>
        <div className="form-section">
          <div className="form-grid compact-form">
            <label>Statut<select value={status} onChange={(event) => setStatus(event.target.value)}><option>Nouveau</option><option>Contacté</option><option>Visite prévue</option><option>Intéressé</option><option>Conclu</option><option>Perdu</option></select></label>
            {isLost && (
              <label>Motif<select value={reason} onChange={(event) => setReason(event.target.value)}><option>Budget insuffisant</option><option>Autre agence</option><option>Plus intéressé</option><option>Bien non disponible</option><option>Autre</option></select></label>
            )}
          </div>
        </div>
        <div className="action-row compact-row">
          <Button onClick={onClose}>Annuler</Button>
          <Button variant="primary" onClick={() => onSave({ prospect, status, reason: isLost ? reason : "" })}>Enregistrer</Button>
        </div>
      </section>
    </div>
  );
}

function ProspectConversionModal({ prospect, onSave, onClose }) {
  const [values, setValues] = useState({
    conversionType: "Convertir en locataire",
    property: getCompatibleProperties(prospect)[0]?.name ?? properties[0].name,
    entryDate: "01/07/2026",
    rent: prospect.budget ?? "750 000 FCFA",
    deposit: "1 500 000 FCFA",
    createContract: "Oui",
  });
  const update = (field) => (event) => setValues((current) => ({ ...current, [field]: event.target.value }));
  const isTenantConversion = values.conversionType === "Convertir en locataire";

  return (
    <div className="modal-backdrop">
      <section className="modal-card wide-modal prospect-form-modal">
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="payment-modal-head">
          <div>
            <span>Conversion prospect</span>
            <h2>Convertir</h2>
            <p>Transformer le prospect en dossier conclu et rattacher les informations nécessaires.</p>
          </div>
          <Badge label={prospect.name} />
        </div>
        <div className="form-section">
          <h3>Options de conversion</h3>
          <div className="form-grid">
            <label>Option<select value={values.conversionType} onChange={update("conversionType")}><option>Convertir en locataire</option><option>Convertir en client acheteur</option><option>Créer contrat</option><option>Rattacher à un bien</option></select></label>
            <label>Bien<select value={values.property} onChange={update("property")}>{properties.map((property) => <option key={property.code}>{property.name}</option>)}</select></label>
            {isTenantConversion && (
              <>
                <label>Date d'entrée<input type="date" value={values.entryDate} onChange={update("entryDate")} /></label>
                <label>Loyer<input value={values.rent} onChange={update("rent")} /></label>
                <label>Caution<input value={values.deposit} onChange={update("deposit")} /></label>
                <label>Créer contrat<select value={values.createContract} onChange={update("createContract")}><option>Oui</option><option>Non</option></select></label>
              </>
            )}
          </div>
        </div>
        <div className="action-row compact-row">
          <Button onClick={onClose}>Annuler</Button>
          <Button variant="primary" onClick={() => onSave({ prospect, values })}>Convertir</Button>
        </div>
      </section>
    </div>
  );
}

function OwnerFormModal({ sequence = owners.length + 1, owner = null, mode = "create", onSave, onClose }) {
  const isEditMode = mode === "edit" && owner;
  const generatedId = useMemo(() => `PRO-2026-${String(sequence).padStart(3, "0")}`, [sequence]);
  const initialValues = useMemo(() => ({
    type: owner?.type ?? "Personne physique",
    name: owner?.name ?? "Aminata Coulibaly",
    id: owner?.id ?? generatedId,
    phone: owner?.phone ?? "+223 76 45 18 92",
    email: owner?.email ?? "a.coulibaly@exemple.ml",
    address: owner?.address ?? "ACI 2000, Bamako",
    focalPoint: owner?.focalPoint ?? "",
    mandateType: owner?.mandateType ?? "Mandat de gestion locative",
    commission: owner?.commission ?? "5% des loyers encaissés",
    reversementMode: owner?.reversementMode ?? "Virement bancaire",
    reversementPeriod: owner?.reversementPeriod ?? "Mensuel",
    observations: owner?.observations ?? "Propriétaire à rattacher aux biens après validation du mandat.",
  }), [generatedId, owner]);
  const [values, setValues] = useState(initialValues);
  const isCompany = values.type === "Société";
  const canSave = values.name.trim() && values.phone.trim();

  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

  const update = (key, value) => {
    setValues((current) => ({
      ...current,
      [key]: value,
      ...(key === "type" && value === "Personne physique" ? { focalPoint: "" } : {}),
    }));
  };

  const submit = (addProperty = false) => {
    if (!canSave) return;
    const nextOwner = {
      ...owner,
      id: values.id,
      name: values.name.trim(),
      phone: values.phone.trim(),
      email: values.email.trim(),
      address: values.address.trim(),
      type: values.type,
      properties: owner?.properties ?? 0,
      rent: owner?.rent ?? "0 FCFA",
      charges: owner?.charges ?? "0 FCFA",
      commission: values.commission,
      balance: owner?.balance ?? "0 FCFA",
      lastPayment: owner?.lastPayment ?? "N/A",
      status: owner?.status ?? "Actif",
      initials: getInitials(values.name),
      focalPoint: isCompany ? values.focalPoint.trim() : "",
      mandateType: values.mandateType,
      reversementMode: values.reversementMode,
      reversementPeriod: values.reversementPeriod,
      observations: values.observations,
      documents: owner?.documents ?? ["Pièce d'identité", "Mandat", "RIB", "Autre document"],
    };

    onSave({ owner: nextOwner, addProperty });
  };

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="modal-card wide-modal owner-form-modal" role="dialog" aria-modal="true" onMouseDown={(event) => event.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="payment-modal-head">
          <div>
            <span>Fiche client</span>
            <h2>{isEditMode ? "Modifier propriétaire" : "Nouveau propriétaire"}</h2>
            <p>{isEditMode ? "Mettre à jour l'identité, les conditions de gestion, la commission et les documents." : "Créer une fiche propriétaire et lier ses biens par la suite."}</p>
          </div>
          <Badge label={values.id} />
        </div>

        <div className="form-section">
          <h3>Identité</h3>
          <div className="form-grid compact-form">
            <label>Type<select value={values.type} onChange={(event) => update("type", event.target.value)}><option>Personne physique</option><option>Société</option></select></label>
            <label>Nom complet ou raison sociale<input value={values.name} onChange={(event) => update("name", event.target.value)} /></label>
            <label>Identifiant propriétaire généré automatiquement<input value={values.id} readOnly /></label>
            <label>Téléphone<input value={values.phone} onChange={(event) => update("phone", event.target.value)} /></label>
            <label>Email<input value={values.email} onChange={(event) => update("email", event.target.value)} /></label>
            <label>Adresse<input value={values.address} onChange={(event) => update("address", event.target.value)} /></label>
            {isCompany && (
              <label className="full">Point focal, si société<input value={values.focalPoint} onChange={(event) => update("focalPoint", event.target.value)} placeholder="Nom, fonction et téléphone du contact principal" /></label>
            )}
          </div>
        </div>

        <div className="form-section">
          <h3>Conditions de gestion</h3>
          <div className="form-grid compact-form">
            <label>Type de mandat<select value={values.mandateType} onChange={(event) => update("mandateType", event.target.value)}><option>Mandat de gestion locative</option><option>Mandat entretien seul</option><option>Mandat de mise en location</option><option>Mandat de vente</option><option>Mandat mixte</option></select></label>
            <label>Commission agence<input value={values.commission} onChange={(event) => update("commission", event.target.value)} /></label>
            <label>Mode de reversement<select value={values.reversementMode} onChange={(event) => update("reversementMode", event.target.value)}><option>Virement bancaire</option><option>Orange Money</option><option>Moov Money</option><option>Chèque</option><option>Espèces</option></select></label>
            <label>Périodicité de reversement<select value={values.reversementPeriod} onChange={(event) => update("reversementPeriod", event.target.value)}><option>Mensuel</option><option>Bimensuel</option><option>Trimestriel</option><option>À la demande</option></select></label>
            <label className="full">Observations<textarea value={values.observations} onChange={(event) => update("observations", event.target.value)} /></label>
          </div>
        </div>

        <div className="form-section">
          <h3>Documents</h3>
          <div className="document-upload-grid owner-document-grid">
            <label>Pièce d'identité<input type="file" /><small>Carte NINA, passeport ou registre de commerce.</small></label>
            <label>Mandat<input type="file" /><small>Mandat signé ou projet de mandat.</small></label>
            <label>RIB<input type="file" /><small>Compte bancaire ou référence mobile money.</small></label>
            <label>Autre document<input type="file" multiple /><small>Titre, procuration, pièce complémentaire.</small></label>
          </div>
        </div>

        <div className="action-row compact-row">
          <Button onClick={onClose}>Annuler</Button>
          {isEditMode ? (
            <Button variant="primary" disabled={!canSave} onClick={() => submit(false)}><CheckCircle2 size={17} /> Enregistrer les modifications</Button>
          ) : (
            <>
              <Button variant="primary" disabled={!canSave} onClick={() => submit(false)}><CheckCircle2 size={17} /> Enregistrer</Button>
              <Button disabled={!canSave} onClick={() => submit(true)}><Plus size={17} /> Enregistrer et ajouter un bien</Button>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

function ChargeFormModal({ title, onClose }) {
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="modal-card wide-modal" role="dialog" aria-modal="true" onMouseDown={(event) => event.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>{title}</h2>
        <p>Enregistrement d'une dépense métier sans transformer l'écran en comptabilité complète.</p>

        <div className="form-section">
          <h3>Informations générales</h3>
          <div className="form-grid compact-form">
            <label>Date de la dépense<input defaultValue="15/06/2026" /></label>
            <label>Type de charge<select>{chargeTypes.map((item) => <option key={item}>{item}</option>)}</select></label>
            <label>Montant<input defaultValue="45 000" /></label>
            <label>Devise<select><option>FCFA</option></select></label>
            <label>Statut initial<select>{chargeStatuses.map((item) => <option key={item}>{item}</option>)}</select></label>
            <label className="full">Description<textarea defaultValue="Décrire la dépense, le contexte et la décision attendue." /></label>
          </div>
        </div>

        <div className="form-section">
          <h3>Rattachement</h3>
          <div className="form-grid compact-form">
            <label>Bien concerné<select>{properties.map((property) => <option key={property.code}>{property.name}</option>)}</select></label>
            <label>Propriétaire concerné<select>{owners.map((owner) => <option key={owner.id}>{owner.name}</option>)}</select></label>
            <label>Locataire concerné<select><option>Non applicable</option>{tenants.map((tenant) => <option key={tenant.id}>{tenant.name}</option>)}</select></label>
            <label>Entretien lié<select><option>Non lié</option>{maintenances.map((maintenance) => <option key={`${maintenance.property}-${maintenance.type}`}>{maintenance.type} · {maintenance.property}</option>)}</select></label>
            <label>Agent responsable<select><option>Mariam Traoré</option><option>Aïssata Diarra</option><option>Issa Maïga</option><option>Cheick Camara</option></select></label>
          </div>
        </div>

        <div className="form-section">
          <h3>Prise en charge</h3>
          <div className="form-grid compact-form">
            <label>Qui supporte la dépense ?<select>{chargePayers.map((item) => <option key={item}>{item}</option>)}</select></label>
            <label>Impact métier<select><option>Supportée par l'agence</option><option>À déduire du propriétaire</option><option>À refacturer au locataire</option><option>Suivi interne uniquement</option></select></label>
            <label>Badge spécifique<select><option>Aucun</option><option>Encaissement propriétaire</option></select></label>
            <label className="full">Observation métier<textarea defaultValue="Préciser si la charge doit réduire un reversement propriétaire ou être réclamée au locataire." /></label>
          </div>
        </div>

        <div className="form-section">
          <h3>Paiement / justificatif</h3>
          <div className="form-grid compact-form">
            <label>Mode de paiement<select><option>Espèces</option><option>Mobile money</option><option>Virement</option><option>Carte agence</option><option>Virement propriétaire</option></select></label>
            <label>Référence paiement<input defaultValue="CHG-2026-NEW" /></label>
            <label>Justificatif<input type="file" /></label>
            <label>Photo ou PDF<input type="file" multiple /></label>
            <label className="full">Observation<textarea defaultValue="Ajouter une note utile au contrôle ou à la validation." /></label>
          </div>
        </div>

        <div className="action-row compact-row">
          <Button variant="primary" onClick={onClose}><CheckCircle2 size={17} /> Enregistrer</Button>
          <Button onClick={onClose}><Archive size={17} /> Enregistrer brouillon</Button>
          <Button onClick={onClose}><ShieldCheck size={17} /> Valider</Button>
          <Button onClick={onClose}><XCircle size={17} /> Annuler</Button>
        </div>
      </section>
    </div>
  );
}

function TenantFormModal({ tenant, property, onSave, onClose }) {
  const linkedProperty = property ?? properties.find((item) => item.name === tenant.property) ?? properties[0];
  const [values, setValues] = useState({
    name: tenant.name,
    id: tenant.id,
    phone: tenant.phone,
    email: tenant.email,
    address: tenant.address ?? linkedProperty.address,
    profession: tenant.profession ?? "Client locataire",
    identity: tenant.identity ?? "Carte NINA à archiver",
    property: tenant.property,
    rent: tenant.rent,
    deposit: tenant.deposit,
    contract: tenant.contract,
    paymentStatus: tenant.paymentStatus,
    observations: tenant.observations ?? `Locataire rattaché au bien ${tenant.property}.`,
  });
  const canSave = values.name.trim() && values.phone.trim();
  const update = (key, value) => setValues((current) => ({ ...current, [key]: value }));

  const submit = () => {
    if (!canSave) return;
    onSave({
      tenant: {
        ...tenant,
        name: values.name.trim(),
        phone: values.phone.trim(),
        email: values.email.trim(),
        address: values.address.trim(),
        profession: values.profession.trim(),
        identity: values.identity.trim(),
        property: values.property,
        rent: values.rent,
        deposit: values.deposit,
        contract: values.contract,
        paymentStatus: values.paymentStatus,
        observations: values.observations,
      },
    });
  };

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="modal-card wide-modal tenant-form-modal" role="dialog" aria-modal="true" onMouseDown={(event) => event.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="payment-modal-head">
          <div>
            <span>Fiche locataire</span>
            <h2>Modifier locataire</h2>
            <p>Données préremplies depuis la fiche active. Les informations restent liées au bien et au contrat.</p>
          </div>
          <Badge label={values.id} />
        </div>

        <div className="form-section">
          <h3>Identité</h3>
          <div className="form-grid compact-form">
            <label>Nom complet<input value={values.name} onChange={(event) => update("name", event.target.value)} /></label>
            <label>Identifiant locataire<input value={values.id} readOnly /></label>
            <label>Téléphone<input value={values.phone} onChange={(event) => update("phone", event.target.value)} /></label>
            <label>Email<input value={values.email} onChange={(event) => update("email", event.target.value)} /></label>
            <label className="full">Adresse<input value={values.address} onChange={(event) => update("address", event.target.value)} /></label>
            <label>Profession<input value={values.profession} onChange={(event) => update("profession", event.target.value)} /></label>
            <label>Pièce d'identité<input value={values.identity} onChange={(event) => update("identity", event.target.value)} /></label>
          </div>
        </div>

        <div className="form-section">
          <h3>Occupation & conditions</h3>
          <div className="form-grid compact-form">
            <label>Bien occupé<select value={values.property} onChange={(event) => update("property", event.target.value)}>{properties.map((item) => <option key={item.code}>{item.name}</option>)}</select></label>
            <label>Loyer mensuel<input value={values.rent} onChange={(event) => update("rent", event.target.value)} /></label>
            <label>Caution<input value={values.deposit} onChange={(event) => update("deposit", event.target.value)} /></label>
            <label>Contrat actif<input value={values.contract} onChange={(event) => update("contract", event.target.value)} /></label>
            <label>Statut paiement<select value={values.paymentStatus} onChange={(event) => update("paymentStatus", event.target.value)}><option>À jour</option><option>Partiel</option><option>En retard</option><option>Relancé</option><option>Inactif</option></select></label>
            <label className="full">Observations<textarea value={values.observations} onChange={(event) => update("observations", event.target.value)} /></label>
          </div>
        </div>

        <div className="form-section">
          <h3>Documents</h3>
          <div className="document-upload-grid owner-document-grid">
            <label>Pièce d'identité<input type="file" /><small>Carte NINA, passeport ou autre pièce.</small></label>
            <label>Contrat signé<input type="file" /><small>Document signé par les parties.</small></label>
            <label>Reçus<input type="file" multiple /><small>Reçus ou justificatifs associés.</small></label>
            <label>Autre document<input type="file" multiple /><small>Tout document utile au dossier.</small></label>
          </div>
        </div>

        <div className="action-row compact-row">
          <Button onClick={onClose}>Annuler</Button>
          <Button variant="primary" disabled={!canSave} onClick={submit}><CheckCircle2 size={17} /> Enregistrer les modifications</Button>
        </div>
      </section>
    </div>
  );
}

function TenantPaymentModal({ tenant, property, row, payment, paymentsList = paymentRecords, rentRowsList = rentRows, onSave, onClose }) {
  const linkedProperty = property ?? properties.find((item) => item.name === tenant.property) ?? properties[0];
  const initialRow = row
    ?? rentRowsList.find((item) => item.tenant === tenant.name && item.property === linkedProperty.name)
    ?? rentRowsList.find((item) => item.tenant === tenant.name)
    ?? {
      period: "Juin 2026",
      tenant: tenant.name,
      property: linkedProperty.name,
      owner: linkedProperty.owner,
      expected: tenant.rent,
      paid: "0 FCFA",
      balance: tenant.rent,
      status: "En retard",
    };
  const initialPayment = payment
    ?? paymentsList.find((item) => item.tenant === tenant.name && item.property === initialRow.property && item.period === initialRow.period);
  const [values, setValues] = useState({
    tenant: tenant.name,
    property: initialRow.property,
    period: initialRow.period,
    due: initialPayment?.due ?? initialRow.expected ?? tenant.rent,
    paid: initialRow.balance && parseFCFA(initialRow.balance) > 0 ? initialRow.balance : (initialPayment?.paid ?? initialRow.paid ?? tenant.rent),
    mode: initialPayment?.mode ?? "Orange Money",
    paymentRef: initialPayment?.paymentRef ?? "OM-2026-LOC",
    date: toDateInputValue(initialPayment?.date),
    note: initialPayment?.note ?? `Paiement enregistré depuis la fiche locataire ${tenant.name}.`,
    receiptChoice: initialPayment?.receipt && initialPayment.receipt !== "Non généré" ? "Oui" : "Oui",
  });
  const dueAmount = parseFCFA(values.due);
  const paidAmount = parseFCFA(values.paid);
  const balance = formatFCFA(Math.max(dueAmount - paidAmount, 0));
  const status = getPaymentStatus(values.due, values.paid);
  const selectedProperty = properties.find((item) => item.name === values.property) ?? linkedProperty;
  const receiptNumber = initialPayment?.receipt && initialPayment.receipt !== "Non généré"
    ? initialPayment.receipt
    : makeDocumentNumber("REC", paymentsList.length + 111);
  const update = (key, value) => setValues((current) => ({ ...current, [key]: value }));

  const submit = (forceReceipt = false) => {
    const shouldGenerateReceipt = forceReceipt || values.receiptChoice === "Oui";
    onSave({
      reference: initialPayment?.reference ?? makeDocumentNumber("PAY", paymentsList.length + 111),
      period: values.period,
      tenant: values.tenant,
      property: values.property,
      owner: selectedProperty.owner,
      due: values.due,
      paid: values.paid,
      amountNow: values.paid,
      balance,
      mode: values.mode,
      paymentRef: values.paymentRef,
      date: fromDateInputValue(values.date),
      receipt: shouldGenerateReceipt ? receiptNumber : "Non généré",
      status,
      note: values.note,
    });
  };

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="modal-card wide-modal tenant-payment-modal" role="dialog" aria-modal="true" onMouseDown={(event) => event.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="payment-modal-head">
          <div>
            <span>Fiche locataire</span>
            <h2>Enregistrer paiement</h2>
            <p>{tenant.name} · {values.property}</p>
          </div>
          <Badge label={status} />
        </div>

        <div className="form-section">
          <h3>Paiement</h3>
          <div className="form-grid compact-form">
            <label>Locataire<input value={values.tenant} readOnly /></label>
            <label>Bien<input value={values.property} readOnly /></label>
            <label>Période<input value={values.period} onChange={(event) => update("period", event.target.value)} /></label>
            <label>Montant dû<input value={values.due} onChange={(event) => update("due", event.target.value)} /></label>
            <label>Montant payé<input value={values.paid} onChange={(event) => update("paid", event.target.value)} /></label>
            <label>Solde automatique<input value={balance} readOnly /></label>
            <label>Mode de paiement<select value={values.mode} onChange={(event) => update("mode", event.target.value)}>{paymentModes.map((mode) => <option key={mode}>{mode}</option>)}</select></label>
            <label>Référence<input value={values.paymentRef} onChange={(event) => update("paymentRef", event.target.value)} /></label>
            <label>Date<input type="date" value={values.date} onChange={(event) => update("date", event.target.value)} /></label>
            <label>Générer reçu<select value={values.receiptChoice} onChange={(event) => update("receiptChoice", event.target.value)}><option>Oui</option><option>Non</option></select></label>
            <label className="full">Observation<textarea value={values.note} onChange={(event) => update("note", event.target.value)} /></label>
          </div>
        </div>

        <div className="owner-reversal-summary">
          <span>Solde restant calculé</span>
          <strong>{balance}</strong>
        </div>

        <div className="action-row compact-row">
          <Button onClick={onClose}>Annuler</Button>
          <Button variant="primary" onClick={() => submit(false)}><CheckCircle2 size={17} /> Enregistrer</Button>
          <Button onClick={() => submit(true)}><ReceiptText size={17} /> Enregistrer et générer reçu</Button>
        </div>
      </section>
    </div>
  );
}

function TenantReceiptModal({ tenant, property, payment, paymentsList = paymentRecords, rentRowsList = rentRows, archivedReceipts = [], onArchive, onClose }) {
  const linkedProperty = property ?? properties.find((item) => item.name === tenant.property) ?? properties[0];
  const fallbackRow = rentRowsList.find((row) => row.tenant === tenant.name && row.property === linkedProperty.name) ?? rentRowsList.find((row) => row.tenant === tenant.name);
  const fallbackPayment = useMemo(() => ({
    reference: makeDocumentNumber("PAY", 211),
    period: fallbackRow?.period ?? "Mai 2026",
    tenant: tenant.name,
    property: fallbackRow?.property ?? linkedProperty.name,
    owner: linkedProperty.owner,
    due: fallbackRow?.expected ?? tenant.rent,
    paid: fallbackRow?.paid && fallbackRow.paid !== "0 FCFA" ? fallbackRow.paid : tenant.rent,
    amountNow: fallbackRow?.paid && fallbackRow.paid !== "0 FCFA" ? fallbackRow.paid : tenant.rent,
    balance: fallbackRow?.balance ?? "0 FCFA",
    mode: "Orange Money",
    paymentRef: "OM-2026-REC",
    date: "19/06/2026",
    receipt: makeDocumentNumber("REC", 211),
    status: fallbackRow?.status ?? "Payé",
    note: "Reçu généré depuis la fiche locataire.",
  }), [fallbackRow, linkedProperty.name, linkedProperty.owner, tenant.name, tenant.rent]);
  const tenantPayments = paymentsList.filter((item) => item.tenant === tenant.name);
  const paymentOptions = tenantPayments.length ? tenantPayments : [payment ?? fallbackPayment];
  const initialPayment = payment ?? paymentOptions[0] ?? fallbackPayment;
  const [selectedRef, setSelectedRef] = useState(initialPayment.reference);
  const selectedPayment = paymentOptions.find((item) => item.reference === selectedRef) ?? initialPayment;
  const [values, setValues] = useState({
    period: selectedPayment.period,
    amount: selectedPayment.amountNow ?? selectedPayment.paid,
    mode: selectedPayment.mode,
    template: "Reçu d'encaissement E.K immo",
  });
  const [preview, setPreview] = useState(false);
  const [archived, setArchived] = useState(archivedReceipts.some((item) => item.numero === selectedPayment.receipt));

  useEffect(() => {
    setValues({
      period: selectedPayment.period,
      amount: selectedPayment.amountNow ?? selectedPayment.paid,
      mode: selectedPayment.mode,
      template: "Reçu d'encaissement E.K immo",
    });
    setArchived(archivedReceipts.some((item) => item.numero === selectedPayment.receipt));
  }, [archivedReceipts, selectedPayment]);

  const update = (key, value) => setValues((current) => ({ ...current, [key]: value }));
  const receiptValues = getPaymentReceiptValues({
    ...selectedPayment,
    period: values.period,
    paid: values.amount,
    amountNow: values.amount,
    mode: values.mode,
    receipt: selectedPayment.receipt && selectedPayment.receipt !== "Non généré" ? selectedPayment.receipt : makeDocumentNumber("REC", paymentsList.length + 121),
  });

  const archiveReceipt = () => {
    onArchive({ tenant, receipt: { ...receiptValues, periode: values.period, montant: values.amount } });
    setArchived(true);
  };

  const generatePdf = () => {
    setPreview(true);
    window.setTimeout(() => window.print(), 90);
  };

  return (
    <div className="modal-backdrop document-print-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="modal-card document-print-modal tenant-receipt-modal" role="dialog" aria-modal="true" onMouseDown={(event) => event.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="document-print-head">
          <div>
            <span>Génération de reçu</span>
            <h2>{tenant.name}</h2>
            <p>Préparer un reçu fidèle au modèle E.K immo, puis le prévisualiser, générer, imprimer ou archiver.</p>
          </div>
          <div className="document-editor-actions">
            <Button onClick={() => setPreview(true)}><Eye size={17} /> Prévisualiser</Button>
            <Button variant="primary" onClick={generatePdf}><Download size={17} /> Générer PDF</Button>
            <Button onClick={() => window.print()}><Printer size={17} /> Imprimer</Button>
            <Button onClick={archiveReceipt} disabled={archived}><Archive size={17} /> {archived ? "Archivé" : "Archiver"}</Button>
          </div>
        </div>

        <div className="owner-statement-layout">
          <Panel title="Paramètres du reçu">
            <div className="form-grid compact-form">
              <label>Paiement concerné<select value={selectedRef} onChange={(event) => setSelectedRef(event.target.value)}>{paymentOptions.map((item) => <option key={item.reference} value={item.reference}>{item.reference} · {item.period}</option>)}</select></label>
              <label>Période<input value={values.period} onChange={(event) => update("period", event.target.value)} /></label>
              <label>Montant<input value={values.amount} onChange={(event) => update("amount", event.target.value)} /></label>
              <label>Mode de paiement<select value={values.mode} onChange={(event) => update("mode", event.target.value)}>{paymentModes.map((mode) => <option key={mode}>{mode}</option>)}</select></label>
              <label className="full">Modèle de reçu<select value={values.template} onChange={(event) => update("template", event.target.value)}><option>Reçu d'encaissement E.K immo</option><option>Reçu mobile money</option><option>Reçu locatif standard</option></select></label>
            </div>
          </Panel>
          {preview ? (
            <OriginalReceiptDocument values={receiptValues} />
          ) : (
            <Panel className="owner-preview-placeholder">
              <ReceiptText size={34} />
              <h3>Aperçu du reçu</h3>
              <p>Cliquez sur Prévisualiser pour contrôler le document avant impression.</p>
            </Panel>
          )}
        </div>
      </section>
    </div>
  );
}

function TenantReminderModal({ tenant, row, onSave, onClose }) {
  const [values, setValues] = useState({
    reason: "Retard de paiement",
    amount: row?.balance && row.balance !== "0 FCFA" ? row.balance : tenant.rent,
    channel: "WhatsApp",
    comment: `Relance amiable pour ${tenant.name}.`,
    promise: "Paiement promis sous 72h",
    nextDate: "2026-06-24",
  });
  const update = (key, value) => setValues((current) => ({ ...current, [key]: value }));

  const submit = () => {
    onSave({
      tenant,
      relance: {
        reference: makeDocumentNumber("REL", Math.max(100, parseFCFA(tenant.id) % 900)),
        tenantId: tenant.id,
        tenant: tenant.name,
        property: tenant.property,
        reason: values.reason,
        amount: values.amount,
        channel: values.channel,
        comment: values.comment,
        promise: values.promise,
        nextDate: values.nextDate,
        date: "19/06/2026",
      },
    });
  };

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="modal-card wide-modal tenant-reminder-modal" role="dialog" aria-modal="true" onMouseDown={(event) => event.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="payment-modal-head">
          <div>
            <span>Suivi impayés</span>
            <h2>Ajouter relance</h2>
            <p>{tenant.name} · {tenant.property}</p>
          </div>
          <Badge label={values.amount} />
        </div>

        <div className="form-section">
          <h3>Détails de la relance</h3>
          <div className="form-grid compact-form">
            <label>Motif<select value={values.reason} onChange={(event) => update("reason", event.target.value)}><option>Retard de paiement</option><option>Paiement partiel</option><option>Promesse non tenue</option><option>Contrat à régulariser</option><option>Autre</option></select></label>
            <label>Montant concerné<input value={values.amount} onChange={(event) => update("amount", event.target.value)} /></label>
            <label>Canal<select value={values.channel} onChange={(event) => update("channel", event.target.value)}><option>Appel</option><option>WhatsApp</option><option>SMS</option><option>Email</option><option>Visite</option></select></label>
            <label>Promesse de paiement<input value={values.promise} onChange={(event) => update("promise", event.target.value)} /></label>
            <label>Date prochaine relance<input type="date" value={values.nextDate} onChange={(event) => update("nextDate", event.target.value)} /></label>
            <label className="full">Commentaire<textarea value={values.comment} onChange={(event) => update("comment", event.target.value)} /></label>
          </div>
        </div>

        <div className="action-row compact-row">
          <Button onClick={onClose}>Annuler</Button>
          <Button variant="primary" onClick={submit}><Bell size={17} /> Enregistrer relance</Button>
        </div>
      </section>
    </div>
  );
}

function TenantContractModal({ tenant, contract, onAction, onClose }) {
  const activeContract = contract ?? contracts.find((item) => item.client === tenant.name || item.number === tenant.contract) ?? contracts[0];

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="modal-card wide-modal tenant-contract-modal" role="dialog" aria-modal="true" onMouseDown={(event) => event.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <ContractProfilePanel contract={activeContract} onAction={onAction} />
      </section>
    </div>
  );
}

function TenantSituationModal({ tenant, property, paymentsList = paymentRecords, rentRowsList = rentRows, relancesList = [], archivedReceipts = [], onClose }) {
  const [values, setValues] = useState({
    period: "Mai 2026",
    includePayments: "Oui",
    includeArrears: "Oui",
    includeReceipts: "Oui",
  });
  const [preview, setPreview] = useState(false);
  const update = (key, value) => setValues((current) => ({ ...current, [key]: value }));
  const generatePdf = () => {
    setPreview(true);
    window.setTimeout(() => window.print(), 90);
  };

  return (
    <div className="modal-backdrop document-print-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="modal-card document-print-modal tenant-situation-modal" role="dialog" aria-modal="true" onMouseDown={(event) => event.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="document-print-head">
          <div>
            <span>Situation locataire</span>
            <h2>{tenant.name}</h2>
            <p>Générer la situation locataire avec paiements, impayés et reçus selon les options retenues.</p>
          </div>
          <div className="document-editor-actions">
            <Button onClick={() => setPreview(true)}><Eye size={17} /> Prévisualiser</Button>
            <Button variant="primary" onClick={generatePdf}><Download size={17} /> Export PDF</Button>
          </div>
        </div>

        <div className="owner-statement-layout">
          <Panel title="Paramètres de situation">
            <div className="form-grid compact-form">
              <label>Période<input value={values.period} onChange={(event) => update("period", event.target.value)} /></label>
              <label>Inclure paiements<select value={values.includePayments} onChange={(event) => update("includePayments", event.target.value)}><option>Oui</option><option>Non</option></select></label>
              <label>Inclure impayés<select value={values.includeArrears} onChange={(event) => update("includeArrears", event.target.value)}><option>Oui</option><option>Non</option></select></label>
              <label>Inclure reçus<select value={values.includeReceipts} onChange={(event) => update("includeReceipts", event.target.value)}><option>Oui</option><option>Non</option></select></label>
            </div>
            <div className="action-row compact-row">
              <Button onClick={onClose}>Annuler</Button>
              <Button onClick={() => setPreview(true)}><Eye size={17} /> Prévisualiser</Button>
              <Button variant="primary" onClick={generatePdf}><Download size={17} /> Export PDF</Button>
            </div>
          </Panel>
          {preview ? (
            <TenantSituationDocument
              tenant={tenant}
              property={property}
              period={values}
              paymentsList={paymentsList}
              rentRowsList={rentRowsList}
              relancesList={relancesList}
              archivedReceipts={archivedReceipts}
            />
          ) : (
            <Panel className="owner-preview-placeholder">
              <FileText size={34} />
              <h3>Aperçu de la situation locataire</h3>
              <p>Cliquez sur Prévisualiser pour contrôler le document.</p>
            </Panel>
          )}
        </div>
      </section>
    </div>
  );
}

function TenantSituationDocument({ tenant, property, period, paymentsList = paymentRecords, rentRowsList = rentRows, relancesList = [], archivedReceipts = [] }) {
  const linkedProperty = property ?? properties.find((item) => item.name === tenant.property) ?? properties[0];
  const tenantPayments = paymentsList.filter((payment) => payment.tenant === tenant.name);
  const tenantRows = rentRowsList.filter((row) => row.tenant === tenant.name);
  const tenantRelances = relancesList.filter((relance) => relance.tenantId === tenant.id || relance.tenant === tenant.name);
  const tenantReceipts = [
    ...tenantPayments.filter((payment) => payment.receipt && payment.receipt !== "Non généré").map((payment) => [payment.receipt, payment.period, payment.amountNow ?? payment.paid, payment.mode, "Disponible"]),
    ...archivedReceipts.filter((receipt) => receipt.tenantId === tenant.id || receipt.tenant === tenant.name).map((receipt) => [receipt.numero, receipt.periode, receipt.montant, "Archive", "Archivé"]),
  ];
  const includePayments = period.includePayments === "Oui";
  const includeArrears = period.includeArrears === "Oui";
  const includeReceipts = period.includeReceipts === "Oui";
  const dueTotal = tenantRows.reduce((sum, row) => sum + parseFCFA(row.expected), 0) || parseFCFA(tenant.rent);
  const paidTotal = tenantRows.reduce((sum, row) => sum + parseFCFA(row.paid), 0);
  const balanceTotal = tenantRows.reduce((sum, row) => sum + parseFCFA(row.balance), 0);

  return (
    <article className="original-document owner-document tenant-situation-document">
      <section className="source-sheet owner-source-sheet">
        <header className="owner-document-header">
          <img src={ekimmoAssets.logo} alt="E.K immo" />
          <div>
            <span>Situation locataire</span>
            <h3>{tenant.name}</h3>
            <p>{period.period} · {tenant.id}</p>
          </div>
          <Badge label={tenant.paymentStatus} />
        </header>

        <section className="owner-document-facts">
          <div><small>Bien occupé</small><strong>{linkedProperty.name}</strong></div>
          <div><small>Adresse</small><strong>{linkedProperty.address}</strong></div>
          <div><small>Contrat actif</small><strong>{tenant.contract}</strong></div>
          <div><small>Montant dû</small><strong>{formatFCFA(dueTotal)}</strong></div>
          <div><small>Montant payé</small><strong>{formatFCFA(paidTotal)}</strong></div>
          <div><small>Solde restant</small><strong>{formatFCFA(balanceTotal)}</strong></div>
        </section>

        {includePayments && (
          <OwnerDocumentTable
            title="Paiements"
            columns={["Période", "Bien", "Montant dû", "Montant payé", "Solde"]}
            rows={(tenantRows.length ? tenantRows : rentRows.slice(0, 2)).map((row) => [row.period, row.property, row.expected, row.paid, row.balance])}
          />
        )}

        {includeArrears && (
          <OwnerDocumentTable
            title="Impayés et relances"
            columns={["Date", "Motif", "Montant", "Canal", "Prochaine relance"]}
            rows={(tenantRelances.length ? tenantRelances : [{
              date: "24/05/2026",
              reason: balanceTotal > 0 ? "Retard de paiement" : "Aucune relance active",
              amount: formatFCFA(balanceTotal),
              channel: "SMS",
              nextDate: tenant.nextReminder ?? "À planifier",
            }]).map((relance) => [relance.date, relance.reason, relance.amount, relance.channel, relance.nextDate])}
          />
        )}

        {includeReceipts && (
          <OwnerDocumentTable
            title="Reçus"
            columns={["Référence", "Période", "Montant", "Mode", "Statut"]}
            rows={tenantReceipts.length ? tenantReceipts : [["À générer", period.period, formatFCFA(paidTotal), "-", "Brouillon"]]}
          />
        )}

        <footer className="property-pdf-footer">
          <img src={ekimmoAssets.logo} alt="E.K immo" />
          <div>
            <strong>E.K immo SAS</strong>
            <span>Niaréla, face mairie - Bamako, Mali</span>
            <span>Situation locataire générée pour contrôle et archivage.</span>
            <span>Contact : +223 72 77 71 77 / +223 44 44 13 31</span>
          </div>
        </footer>
      </section>
    </article>
  );
}

function AttachTenantModal({ property, onClose, onAttach }) {
  const [mode, setMode] = useState("Locataire existant");
  const [existingTenantName, setExistingTenantName] = useState(tenants[0].name);
  const [contractNow, setContractNow] = useState("Oui");
  const [existingValues, setExistingValues] = useState({
    entryDate: "2026-06-18",
    rent: property.price,
    deposit: property.deposit,
    observations: `Rattachement locataire au bien ${property.name}.`,
  });
  const [newValues, setNewValues] = useState({
    name: "Nouveau locataire Bamako",
    phone: "+223 76 00 00 00",
    address: "Hamdallaye ACI, Bamako",
    profession: "Cadre administratif",
    identity: "Passeport / carte NINA",
    entryDate: "2026-06-18",
    deposit: property.deposit,
    observations: `Création et rattachement au bien ${property.name}.`,
  });
  const selectedTenant = tenants.find((tenant) => tenant.name === existingTenantName) ?? tenants[0];

  const updateExisting = (key, value) => setExistingValues((current) => ({ ...current, [key]: value }));
  const updateNew = (key, value) => setNewValues((current) => ({ ...current, [key]: value }));

  const submit = (forceContract = false) => {
    const createContract = forceContract || (mode === "Locataire existant" && contractNow === "Oui");

    if (mode === "Locataire existant") {
      onAttach({
        tenantName: selectedTenant.name,
        tenantProfile: selectedTenant,
        rent: existingValues.rent,
        deposit: existingValues.deposit,
        entryDate: existingValues.entryDate,
        createContract,
      });
      return;
    }

    onAttach({
      tenantName: newValues.name,
      tenantProfile: {
        id: `LOC-2026-${Math.floor(Math.random() * 80 + 120)}`,
        name: newValues.name,
        phone: newValues.phone,
        email: "locataire@ekimmo.ml",
        property: property.name,
        owner: property.owner,
        rent: property.price,
        deposit: newValues.deposit,
        contract: createContract ? "À créer maintenant" : "À créer",
        paymentStatus: "À jour",
        address: newValues.address,
        profession: newValues.profession,
        identity: newValues.identity,
      },
      rent: property.price,
      deposit: newValues.deposit,
      entryDate: newValues.entryDate,
      createContract,
    });
  };

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="modal-card wide-modal tenant-attach-modal" role="dialog" aria-modal="true" onMouseDown={(event) => event.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>Rattacher un locataire</h2>
        <p>Bien concerné : <strong>{property.name}</strong> · {property.address}</p>

        <Segmented value={mode} onChange={setMode} options={["Locataire existant", "Nouveau locataire"]} />

        {mode === "Locataire existant" ? (
          <div className="form-section">
            <h3>Cas 1 — Locataire existant</h3>
            <div className="form-grid compact-form">
              <label>Sélectionner locataire<select value={existingTenantName} onChange={(event) => setExistingTenantName(event.target.value)}>{tenants.map((tenant) => <option key={tenant.id}>{tenant.name}</option>)}</select></label>
              <label>Date d'entrée<input type="date" value={existingValues.entryDate} onChange={(event) => updateExisting("entryDate", event.target.value)} /></label>
              <label>Loyer mensuel<input value={existingValues.rent} onChange={(event) => updateExisting("rent", event.target.value)} /></label>
              <label>Caution<input value={existingValues.deposit} onChange={(event) => updateExisting("deposit", event.target.value)} /></label>
              <label>Contrat à créer maintenant ?<select value={contractNow} onChange={(event) => setContractNow(event.target.value)}><option>Oui</option><option>Non</option></select></label>
              <label className="full">Observations<textarea value={existingValues.observations} onChange={(event) => updateExisting("observations", event.target.value)} /></label>
            </div>
            <div className="tenant-link-preview">
              <Avatar name={selectedTenant.name} />
              <span>
                <strong>{selectedTenant.name}</strong>
                <small>{selectedTenant.phone} · {selectedTenant.id}</small>
              </span>
              <Badge label={contractNow === "Oui" ? "Contrat à créer" : "Rattachement simple"} />
            </div>
          </div>
        ) : (
          <div className="form-section">
            <h3>Cas 2 — Nouveau locataire</h3>
            <div className="form-grid compact-form">
              <label>Nom complet<input value={newValues.name} onChange={(event) => updateNew("name", event.target.value)} /></label>
              <label>Téléphone<input value={newValues.phone} onChange={(event) => updateNew("phone", event.target.value)} /></label>
              <label className="full">Adresse<input value={newValues.address} onChange={(event) => updateNew("address", event.target.value)} /></label>
              <label>Profession<input value={newValues.profession} onChange={(event) => updateNew("profession", event.target.value)} /></label>
              <label>Pièce d'identité<input value={newValues.identity} onChange={(event) => updateNew("identity", event.target.value)} /></label>
              <label>Date d'entrée<input type="date" value={newValues.entryDate} onChange={(event) => updateNew("entryDate", event.target.value)} /></label>
              <label>Caution<input value={newValues.deposit} onChange={(event) => updateNew("deposit", event.target.value)} /></label>
              <label className="full">Observations<textarea value={newValues.observations} onChange={(event) => updateNew("observations", event.target.value)} /></label>
            </div>
          </div>
        )}

        <div className="sensitive-warning">
          Après validation, le bien passe au statut Loué, l'onglet Locataire et l'historique sont mis à jour. Si un contrat est demandé, le formulaire de création de contrat s'ouvre ensuite.
        </div>

        <div className="action-row compact-row">
          <Button onClick={onClose}>Annuler</Button>
          <Button variant="primary" onClick={() => submit(false)}><UsersRound size={17} /> Rattacher locataire</Button>
          <Button onClick={() => submit(true)}><FileText size={17} /> Rattacher et créer contrat</Button>
        </div>
      </section>
    </div>
  );
}

function PaymentRegistrationModal({ context, paymentsList = paymentRecords, rentRowsList = rentRows, onSave, onClose }) {
  const contextRow = context?.row;
  const contextPayment = context?.payment;
  const initialProperty = context?.property ?? properties.find((property) => property.name === contextRow?.property || property.name === contextPayment?.property) ?? properties[0];
  const isDirectCollection = !isAgencyCollectedProperty(initialProperty.name);
  const initialTenant = contextRow?.tenant ?? contextPayment?.tenant ?? initialProperty.tenant ?? tenants[0].name;
  const initialRow = contextRow
    ?? rentRowsList.find((row) => row.property === initialProperty.name && row.tenant === initialTenant)
    ?? rentRowsList.find((row) => row.property === initialProperty.name)
    ?? {
      period: "Juin 2026",
      tenant: initialTenant,
      property: initialProperty.name,
      owner: initialProperty.owner,
      expected: initialProperty.price,
      paid: "0 FCFA",
      balance: initialProperty.price,
      status: "En retard",
    };
  const initialPayment = contextPayment
    ?? paymentsList.find((payment) => payment.property === initialRow.property && payment.tenant === initialRow.tenant && payment.period === initialRow.period);
  const [period, setPeriod] = useState(initialRow.period);
  const [expected, setExpected] = useState(initialPayment?.due ?? initialRow.expected ?? initialProperty.price);
  const [alreadyPaid, setAlreadyPaid] = useState(initialPayment?.paid ?? initialRow.paid ?? "0 FCFA");
  const [paidNow, setPaidNow] = useState(initialRow.balance && parseFCFA(initialRow.balance) > 0 ? initialRow.balance : "0 FCFA");
  const [mode, setMode] = useState(initialPayment?.mode ?? "Orange Money");
  const [paymentRef, setPaymentRef] = useState(initialPayment?.paymentRef ?? "OM-2026-NEW");
  const [paymentDate, setPaymentDate] = useState(initialPayment?.date ?? "18/06/2026");
  const [note, setNote] = useState(initialPayment?.note ?? "Paiement enregistré depuis la fiche métier E.K immo.");
  const [autoReceipt, setAutoReceipt] = useState(true);
  const expectedAmount = parseFCFA(expected);
  const alreadyPaidAmount = parseFCFA(alreadyPaid);
  const paidNowAmount = parseFCFA(paidNow);
  const totalPaidAmount = Math.min(expectedAmount || alreadyPaidAmount + paidNowAmount, alreadyPaidAmount + paidNowAmount);
  const remainingAmount = Math.max(expectedAmount - totalPaidAmount, 0);
  const totalPaid = formatFCFA(totalPaidAmount);
  const remaining = formatFCFA(remainingAmount);
  const status = getPaymentStatus(expected, totalPaid);
  const tenant = tenants.find((item) => item.name === initialTenant);
  const receiptNumber = initialPayment?.receipt && initialPayment.receipt !== "Non généré"
    ? initialPayment.receipt
    : makeDocumentNumber("REC", paymentsList.length + 101);

  const submit = (forceReceipt = false) => {
    const shouldGenerateReceipt = forceReceipt || autoReceipt;
    const payment = {
      reference: initialPayment?.reference ?? makeDocumentNumber("PAY", paymentsList.length + 101),
      period,
      tenant: initialTenant,
      property: initialProperty.name,
      owner: initialProperty.owner,
      due: expected,
      paid: totalPaid,
      amountNow: formatFCFA(paidNowAmount),
      balance: remaining,
      mode,
      paymentRef,
      date: paymentDate,
      receipt: shouldGenerateReceipt ? receiptNumber : "Non généré",
      status,
      note,
    };

    onSave(payment);
  };

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="modal-card wide-modal payment-registration-modal" role="dialog" aria-modal="true" onMouseDown={(event) => event.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="payment-modal-head">
          <div>
            <span>Bien : {initialProperty.name}</span>
            <h2>Enregistrer un paiement</h2>
            <p>Locataire : {initialTenant}</p>
          </div>
          <Badge label={isDirectCollection ? "Encaissement direct propriétaire" : status} />
        </div>

        {isDirectCollection ? (
          <div className="notice direct-payment-notice">
            Ce bien est en encaissement direct par le propriétaire. Aucun paiement agence ne peut être enregistré.
          </div>
        ) : (
          <>
            <div className="form-section">
              <h3>Montants</h3>
              <div className="form-grid compact-form">
                <label>Période concernée<input value={period} onChange={(event) => setPeriod(event.target.value)} /></label>
                <label>Loyer attendu<input value={expected} onChange={(event) => setExpected(event.target.value)} /></label>
                <label>Montant déjà payé<input value={alreadyPaid} onChange={(event) => setAlreadyPaid(event.target.value)} /></label>
                <label>Montant payé maintenant<input value={paidNow} onChange={(event) => setPaidNow(event.target.value)} /></label>
                <label>Solde restant calculé automatiquement<input value={remaining} readOnly /></label>
                <label>Statut automatique<input value={status} readOnly /></label>
              </div>
            </div>

            <div className="form-section">
              <h3>Paiement</h3>
              <div className="form-grid compact-form">
                <label>Mode de paiement<select value={mode} onChange={(event) => setMode(event.target.value)}>{paymentModes.map((item) => <option key={item}>{item}</option>)}</select></label>
                <label>Référence de paiement<input value={paymentRef} onChange={(event) => setPaymentRef(event.target.value)} /></label>
                <label>Date de paiement<input value={paymentDate} onChange={(event) => setPaymentDate(event.target.value)} /></label>
                <label>Locataire<input value={tenant?.name ?? initialTenant} readOnly /></label>
                <label className="full">Observations<textarea value={note} onChange={(event) => setNote(event.target.value)} /></label>
              </div>
            </div>

            <div className="form-section">
              <h3>Document</h3>
              <label className="check-card">
                <input type="checkbox" checked={autoReceipt} onChange={(event) => setAutoReceipt(event.target.checked)} />
                <span>
                  <strong>Générer reçu automatiquement</strong>
                  <small>{receiptNumber} · avec case Mobile Money pour Orange Money et Moov Money.</small>
                </span>
              </label>
            </div>
          </>
        )}

        <div className="action-row compact-row">
          <Button onClick={onClose}>Annuler</Button>
          {!isDirectCollection && <Button variant="primary" onClick={() => submit(false)}><CheckCircle2 size={17} /> Enregistrer paiement</Button>}
          {!isDirectCollection && <Button onClick={() => submit(true)}><ReceiptText size={17} /> Enregistrer et générer reçu</Button>}
        </div>
      </section>
    </div>
  );
}

function MaintenanceFormModal({ context, onSave, onClose }) {
  const baseProperty = context?.property ?? getPropertyByName(context?.maintenance?.property) ?? properties[0];
  const baseMaintenance = context?.maintenance;
  const [propertyName, setPropertyName] = useState(baseMaintenance?.property ?? baseProperty.name);
  const selectedProperty = getPropertyByName(propertyName) ?? baseProperty;
  const suggestedProvider = selectedProperty.serviceProvider?.company ?? baseMaintenance?.provider ?? "";
  const [type, setType] = useState(baseMaintenance?.type ?? "Plomberie");
  const [description, setDescription] = useState(baseMaintenance?.note ?? "Décrire le besoin, la zone concernée et le résultat attendu.");
  const [priority, setPriority] = useState(baseMaintenance?.priority ?? "Normale");
  const [date, setDate] = useState(baseMaintenance?.date ?? "22/06/2026");
  const [manager, setManager] = useState(baseMaintenance?.manager ?? "Mariam Traoré");
  const [provider, setProvider] = useState(suggestedProvider);
  const [estimatedCost, setEstimatedCost] = useState(baseMaintenance?.cost ?? "95 000 FCFA");
  const [realCost, setRealCost] = useState(baseMaintenance?.realCost ?? "");
  const [payer, setPayer] = useState(baseMaintenance?.payer ?? "Propriétaire");
  const [createCharge, setCreateCharge] = useState("Oui");
  const [proofName, setProofName] = useState(baseMaintenance?.proof ?? "");
  const [beforePhotos, setBeforePhotos] = useState("");
  const [afterPhotos, setAfterPhotos] = useState("");
  const maintenanceTypes = ["Nettoyage", "Plomberie", "Électricité", "Peinture", "Réparation", "Inspection", "Autre"];
  const priorities = ["Normale", "Urgente", "Critique"];
  const managers = ["Mariam Traoré", "Aïssata Diarra", "Issa Maïga", "Cheick Camara"];
  const payers = ["Agence", "Propriétaire", "Locataire", "À déterminer"];

  useEffect(() => {
    const nextProperty = getPropertyByName(propertyName);
    if (nextProperty?.serviceProvider?.company && !baseMaintenance?.provider) {
      setProvider(nextProperty.serviceProvider.company);
    }
  }, [baseMaintenance?.provider, propertyName]);

  const submit = (forceCharge = false) => {
    const maintenance = {
      reference: baseMaintenance?.reference,
      property: propertyName,
      type,
      date,
      manager,
      cost: estimatedCost,
      realCost: realCost || undefined,
      payer,
      status: "Planifié",
      note: description,
      priority,
      provider: provider || "Prestataire à confirmer",
      proof: proofName || undefined,
      beforePhotos: beforePhotos || undefined,
      afterPhotos: afterPhotos || undefined,
    };

    onSave({ maintenance, createCharge: forceCharge || createCharge === "Oui" });
  };

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="modal-card wide-modal maintenance-modal" role="dialog" aria-modal="true" onMouseDown={(event) => event.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="payment-modal-head">
          <div>
            <span>Bien : {propertyName}</span>
            <h2>Ajouter un entretien</h2>
            <p>Suivi technique, coût et charge liée pour E.K immo.</p>
          </div>
          <Badge label={priority} />
        </div>

        <div className="form-section">
          <h3>Informations de l'entretien</h3>
          <div className="form-grid compact-form">
            <label>Bien concerné<select value={propertyName} onChange={(event) => setPropertyName(event.target.value)}>{properties.map((property) => <option key={property.code}>{property.name}</option>)}</select></label>
            <label>Type d'entretien<select value={type} onChange={(event) => setType(event.target.value)}>{maintenanceTypes.map((item) => <option key={item}>{item}</option>)}</select></label>
            <label>Priorité<select value={priority} onChange={(event) => setPriority(event.target.value)}>{priorities.map((item) => <option key={item}>{item}</option>)}</select></label>
            <label>Date prévue<input value={date} onChange={(event) => setDate(event.target.value)} /></label>
            <label>Responsable interne<select value={manager} onChange={(event) => setManager(event.target.value)}>{managers.map((item) => <option key={item}>{item}</option>)}</select></label>
            <label>Prestataire, si connu<input value={provider} onChange={(event) => setProvider(event.target.value)} placeholder="À confirmer" /></label>
            <label className="full">Description du besoin<textarea value={description} onChange={(event) => setDescription(event.target.value)} /></label>
          </div>
        </div>

        <div className="form-section">
          <h3>Coût & prise en charge</h3>
          <div className="form-grid compact-form">
            <label>Coût estimé<input value={estimatedCost} onChange={(event) => setEstimatedCost(event.target.value)} /></label>
            <label>Coût réel, si déjà réalisé<input value={realCost} onChange={(event) => setRealCost(event.target.value)} placeholder="À confirmer" /></label>
            <label>Prise en charge<select value={payer} onChange={(event) => setPayer(event.target.value)}>{payers.map((item) => <option key={item}>{item}</option>)}</select></label>
            <label>Créer automatiquement une charge liée ?<select value={createCharge} onChange={(event) => setCreateCharge(event.target.value)}><option>Oui</option><option>Non</option></select></label>
          </div>
        </div>

        <div className="form-section">
          <h3>Documents</h3>
          <div className="document-upload-grid">
            <label>Justificatif<input type="file" onChange={(event) => setProofName(event.target.files?.[0]?.name ?? "")} /><small>{proofName || "Aucun fichier sélectionné"}</small></label>
            <label>Photos avant<input type="file" multiple onChange={(event) => setBeforePhotos(`${event.target.files?.length ?? 0} photo(s) avant`)} /><small>{beforePhotos || "Aucune photo sélectionnée"}</small></label>
            <label>Photos après<input type="file" multiple onChange={(event) => setAfterPhotos(`${event.target.files?.length ?? 0} photo(s) après`)} /><small>{afterPhotos || "Aucune photo sélectionnée"}</small></label>
          </div>
        </div>

        <div className="action-row compact-row">
          <Button onClick={onClose}>Annuler</Button>
          <Button variant="primary" onClick={() => submit(false)}><CalendarDays size={17} /> Planifier entretien</Button>
          <Button onClick={() => submit(true)}><ReceiptText size={17} /> Planifier et créer charge</Button>
        </div>
      </section>
    </div>
  );
}

function DocumentContextMenu({ property, onSelect, onClose }) {
  const availableTemplates = documentTemplates.map((template) => ({
    ...template,
    description: template.key === "bail"
      ? `Contrat prérempli avec ${property.tenant}`
      : template.key === "bordereau"
        ? `Bordereau lié à ${property.owner}`
        : template.key === "recu"
          ? `Reçu d'encaissement pour ${property.name}`
          : `Facture liée à ${property.name}`,
  }));

  return (
    <div className="modal-backdrop document-menu-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="document-context-menu" role="dialog" aria-modal="true" onMouseDown={(event) => event.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <span>Générer document</span>
        <h2>{property.name}</h2>
        <p>Choisissez le document à préparer. L'atelier Docs s'ouvrira avec les informations du bien déjà renseignées.</p>
        <div className="document-menu-list">
          {availableTemplates.map((template) => (
            <button key={template.key} onClick={() => onSelect(template.key)}>
              <span className="template-card-icon"><FileText size={20} /></span>
              <span>
                <strong>{template.label}</strong>
                <small>{template.description}</small>
              </span>
              <Badge label={template.format} />
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

function ContractDeadlineModal({ contract, onSave, onClose }) {
  const [values, setValues] = useState({
    type: "Prochain loyer",
    date: "2026-07-05",
    reminder: "15 jours",
    notify: "Agent",
    comment: "Vérifier paiement, notification et document associé.",
  });
  const update = (field) => (event) => setValues((current) => ({ ...current, [field]: event.target.value }));

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="modal-card prospect-form-modal" role="dialog" aria-modal="true" onMouseDown={(event) => event.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>Gérer les échéances</h2>
        <p>{contract.number} - {contract.property}</p>
        <div className="form-section">
          <div className="form-grid compact-form">
            <label>Type d'échéance<select value={values.type} onChange={update("type")}><option>Prochain loyer</option><option>Fin de contrat</option><option>Révision</option><option>Renouvellement</option><option>Relance</option><option>Autre</option></select></label>
            <label>Date de l'échéance<input type="date" value={values.date} onChange={update("date")} /></label>
            <label>Rappel avant échéance<select value={values.reminder} onChange={update("reminder")}><option>7 jours</option><option>15 jours</option><option>30 jours</option><option>Personnalisé</option></select></label>
            <label>Personne à notifier<select value={values.notify} onChange={update("notify")}><option>Agent</option><option>Manager</option><option>Propriétaire</option><option>Locataire</option></select></label>
            <label className="full">Commentaire<textarea value={values.comment} onChange={update("comment")} /></label>
          </div>
        </div>
        <div className="action-row compact-row">
          <Button onClick={onClose}>Annuler</Button>
          <Button variant="primary" onClick={() => onSave({ contract, values })}><CalendarDays size={17} /> Enregistrer échéance</Button>
        </div>
      </section>
    </div>
  );
}

function ContractDueActionsModal({ contract, onAction, onClose }) {
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="modal-card prospect-form-modal" role="dialog" aria-modal="true" onMouseDown={(event) => event.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>Actions échéance contrat</h2>
        <p>{contract.number} - {contract.property} - {getContractDueLabel(contract)}</p>
        <div className="document-menu-list compact-document-menu">
          <button onClick={() => onAction("Gerer echeances contrat", { contract })}><CalendarDays size={20} /><span><strong>Gérer les échéances</strong><small>Ajouter un rappel, une révision ou une relance.</small></span></button>
          <button onClick={() => onAction("Renouveler contrat", { contract })}><RefreshCw size={20} /><span><strong>Renouveler</strong><small>Préparer une nouvelle période et un avenant.</small></span></button>
          <button onClick={() => onAction("Resilier contrat", { contract })}><XCircle size={20} /><span><strong>Résilier</strong><small>Mettre le contrat en sortie suivie.</small></span></button>
        </div>
      </section>
    </div>
  );
}

function ContractDocumentModal({ contract, action, onAction, onClose }) {
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="modal-card prospect-form-modal" role="dialog" aria-modal="true" onMouseDown={(event) => event.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>Document signe</h2>
        <p>{contract.number} - {contract.signedDocument ?? "Contrat signé archivé"}</p>
        {action && <div className="notice">{action} ajoute a la timeline du contrat.</div>}
        <div className="action-row compact-row">
          <Button onClick={() => onAction("Telecharger contrat", { contract })}><Download size={17} /> Telecharger</Button>
          <Button onClick={() => onAction("Imprimer contrat", { contract })}><Printer size={17} /> Imprimer</Button>
          <Button variant="primary" onClick={() => onAction("Joindre contrat signe", { contract })}><Upload size={17} /> Joindre signature</Button>
        </div>
      </section>
    </div>
  );
}

function ContractEditModal({ contract, onSave, onClose }) {
  const financials = getContractFinancials(contract);
  const property = properties.find((item) => item.name === contract.property) ?? properties[0];
  const [values, setValues] = useState({
    number: contract.number,
    type: contract.type,
    status: contract.status,
    property: contract.property,
    owner: contract.owner,
    client: contract.client,
    start: contract.start,
    end: contract.end,
    periodicity: contract.periodicity ?? "Mensuelle",
    nextDueDate: contract.nextDueDate ?? "05/07/2026",
    amount: contract.amount ?? financials.amount,
    deposit: contract.deposit ?? financials.deposit,
    commission: contract.commission ?? financials.commission,
    financialMode: contract.financialMode ?? property.financialMode ?? "Encaissement par l'agence",
    specialTerms: contract.specialTerms ?? "Conditions standard E.K immo.",
    model: contract.model ?? "Contrat de bail E.K immo",
    signedDocument: contract.signedDocument ?? "Contrat signé archivé",
    observations: contract.observations ?? "Suivi contractuel a jour.",
  });
  const [confirmSensitive, setConfirmSensitive] = useState(false);
  const update = (field) => (event) => setValues((current) => ({ ...current, [field]: event.target.value }));
  const sensitiveChanged = [
    ["property", contract.property],
    ["owner", contract.owner],
    ["client", contract.client],
    ["amount", contract.amount ?? financials.amount],
    ["deposit", contract.deposit ?? financials.deposit],
    ["commission", contract.commission ?? financials.commission],
    ["financialMode", contract.financialMode ?? property.financialMode ?? "Encaissement par l'agence"],
    ["end", contract.end],
    ["status", contract.status],
  ].some(([field, original]) => values[field] !== original);

  const submit = () => {
    if (sensitiveChanged && !confirmSensitive) {
      setConfirmSensitive(true);
      return;
    }
    onSave({ contract, values });
  };

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="modal-card wide-modal prospect-form-modal" role="dialog" aria-modal="true" onMouseDown={(event) => event.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>Modifier le contrat</h2>
        <p>{contract.number} - donnees pre-remplies et controle des champs sensibles.</p>
        <div className="form-section">
          <h3>Informations generales</h3>
          <div className="form-grid compact-form">
            <label>Numero contrat<input value={values.number} onChange={update("number")} /></label>
            <label>Type<select value={values.type} onChange={update("type")}><option>Contrat de bail</option><option>Contrat de location</option><option>Mandat de gestion</option><option>Contrat de vente</option></select></label>
            <label>Statut<select value={values.status} onChange={update("status")}><option>Actif</option><option>Renouvelé</option><option>Résilié</option><option>Archivé</option><option>Expiré</option></select></label>
            <label>Bien<select value={values.property} onChange={update("property")}>{properties.map((item) => <option key={item.code}>{item.name}</option>)}</select></label>
            <label>Proprietaire<select value={values.owner} onChange={update("owner")}>{owners.map((item) => <option key={item.id}>{item.name}</option>)}</select></label>
            <label>Locataire / client<select value={values.client} onChange={update("client")}>{[...tenants.map((item) => item.name), ...prospects.map((item) => item.name)].map((name) => <option key={name}>{name}</option>)}</select></label>
          </div>
        </div>
        <div className="form-section">
          <h3>Dates</h3>
          <div className="form-grid compact-form">
            <label>Date de debut<input value={values.start} onChange={update("start")} /></label>
            <label>Date de fin<input value={values.end} onChange={update("end")} /></label>
            <label>Periodicite<select value={values.periodicity} onChange={update("periodicity")}><option>Mensuelle</option><option>Trimestrielle</option><option>Annuelle</option></select></label>
            <label>Prochaine échéance<input value={values.nextDueDate} onChange={update("nextDueDate")} /></label>
          </div>
        </div>
        <div className="form-section">
          <h3>Conditions financieres</h3>
          <div className="form-grid compact-form">
            <label>Montant<input value={values.amount} onChange={update("amount")} /></label>
            <label>Caution<input value={values.deposit} onChange={update("deposit")} /></label>
            <label>Commission<input value={values.commission} onChange={update("commission")} /></label>
            <label>Mode financier<select value={values.financialMode} onChange={update("financialMode")}><option>Encaissement par l'agence</option><option>Encaissement direct propriétaire</option><option>Entretien seul</option></select></label>
            <label className="full">Conditions particulieres<textarea value={values.specialTerms} onChange={update("specialTerms")} /></label>
          </div>
        </div>
        <div className="form-section">
          <h3>Document</h3>
          <div className="form-grid compact-form">
            <label>Modele utilise<input value={values.model} onChange={update("model")} /></label>
            <label>Document signe<input value={values.signedDocument} onChange={update("signedDocument")} /></label>
            <label className="full">Observations<textarea value={values.observations} onChange={update("observations")} /></label>
          </div>
        </div>
        {confirmSensitive && (
          <div className="sensitive-confirmation">
            <div>
              <AlertTriangle size={20} />
              <span>
                <strong>Cette modification peut impacter les paiements, échéances ou situations propriétaires. Confirmer la modification ?</strong>
                <small>Champs sensibles modifiés : bien, propriétaire, locataire, montant, caution, commission, mode financier, date de fin ou statut.</small>
              </span>
            </div>
          </div>
        )}
        <div className="action-row compact-row">
          <Button onClick={onClose}>Annuler</Button>
          <Button variant="primary" onClick={submit}><CheckCircle2 size={17} /> {confirmSensitive ? "Confirmer la modification" : "Enregistrer les modifications"}</Button>
        </div>
      </section>
    </div>
  );
}

function ContractRenewalModal({ contract, onSave, onClose }) {
  const financials = getContractFinancials(contract);
  const [preview, setPreview] = useState(false);
  const [values, setValues] = useState({
    oldEnd: contract.end,
    newStart: "01/07/2026",
    newEnd: "30/06/2027",
    newAmount: contract.amount ?? financials.amount,
    newDeposit: contract.deposit ?? financials.deposit,
    newCommission: contract.commission ?? financials.commission,
    terms: "Renouvellement aux conditions actuelles, avec révision possible à la date anniversaire.",
    model: "Avenant de renouvellement E.K immo",
    generateAmendment: "Oui",
  });
  const update = (field) => (event) => setValues((current) => ({ ...current, [field]: event.target.value }));

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="modal-card wide-modal prospect-form-modal" role="dialog" aria-modal="true" onMouseDown={(event) => event.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>Renouveler le contrat</h2>
        <p>{contract.number} — {contract.property}</p>
        <div className="form-section">
          <div className="form-grid compact-form">
            <label>Ancienne date de fin<input value={values.oldEnd} readOnly /></label>
            <label>Nouvelle date de début<input value={values.newStart} onChange={update("newStart")} /></label>
            <label>Nouvelle date de fin<input value={values.newEnd} onChange={update("newEnd")} /></label>
            <label>Nouveau montant du loyer, si changement<input value={values.newAmount} onChange={update("newAmount")} /></label>
            <label>Nouvelle caution, si changement<input value={values.newDeposit} onChange={update("newDeposit")} /></label>
            <label>Nouvelle commission, si changement<input value={values.newCommission} onChange={update("newCommission")} /></label>
            <label>Modèle de renouvellement<input value={values.model} onChange={update("model")} /></label>
            <label>Générer avenant ?<select value={values.generateAmendment} onChange={update("generateAmendment")}><option>Oui</option><option>Non</option></select></label>
            <label className="full">Conditions particulières<textarea value={values.terms} onChange={update("terms")} /></label>
          </div>
        </div>
        {preview && (
          <div className="notice">
            Aperçu avenant : {contract.number} renouvelé du {values.newStart} au {values.newEnd}, montant {values.newAmount}.
          </div>
        )}
        <div className="action-row compact-row">
          <Button onClick={onClose}>Annuler</Button>
          <Button onClick={() => setPreview(true)}><Eye size={17} /> Prévisualiser avenant</Button>
          <Button variant="primary" onClick={() => onSave({ contract, values })}><RefreshCw size={17} /> Confirmer renouvellement</Button>
        </div>
      </section>
    </div>
  );
}

function ContractTerminationModal({ contract, onSave, onClose }) {
  const financials = getContractFinancials(contract);
  const [preview, setPreview] = useState(false);
  const [confirmStrong, setConfirmStrong] = useState(false);
  const [values, setValues] = useState({
    date: "30/06/2026",
    reason: "Fin normale",
    returnDeposit: "Oui",
    returnAmount: financials.deposit,
    remainingArrears: "0 FCFA",
    observations: "Résiliation préparée avec état du bien, solde locataire et document de sortie.",
    generateDocument: "Oui",
    propertyStatus: "Disponible",
    detachTenant: "Oui",
  });
  const update = (field) => (event) => setValues((current) => ({ ...current, [field]: event.target.value }));
  const submit = () => {
    if (!confirmStrong) {
      setConfirmStrong(true);
      return;
    }
    onSave({ contract, values });
  };

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="modal-card wide-modal prospect-form-modal" role="dialog" aria-modal="true" onMouseDown={(event) => event.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>Résilier le contrat</h2>
        <p>{contract.number} — {contract.property}</p>
        <div className="form-section">
          <div className="form-grid compact-form">
            <label>Date de résiliation<input type="date" value={values.date} onChange={update("date")} /></label>
            <label>Motif<select value={values.reason} onChange={update("reason")}><option>Fin normale</option><option>Départ locataire</option><option>Non-paiement</option><option>Accord amiable</option><option>Vente du bien</option><option>Autre</option></select></label>
            <label>Caution à restituer<select value={values.returnDeposit} onChange={update("returnDeposit")}><option>Oui</option><option>Non</option></select></label>
            <label>Montant à restituer<input value={values.returnAmount} onChange={update("returnAmount")} /></label>
            <label>Impayés restants<input value={values.remainingArrears} onChange={update("remainingArrears")} /></label>
            <label>Document de résiliation à générer<select value={values.generateDocument} onChange={update("generateDocument")}><option>Oui</option><option>Non</option></select></label>
            <label>Statut du bien après résiliation<select value={values.propertyStatus} onChange={update("propertyStatus")}><option>Disponible</option><option>Indisponible</option></select></label>
            <label>Détacher le locataire du bien ?<select value={values.detachTenant} onChange={update("detachTenant")}><option>Oui</option><option>Non</option></select></label>
            <label className="full">Observations<textarea value={values.observations} onChange={update("observations")} /></label>
          </div>
        </div>
        {preview && (
          <div className="notice">
            Aperçu document : résiliation de {contract.number} au {values.date}, motif {values.reason}, bien marqué {values.propertyStatus}.
          </div>
        )}
        {confirmStrong && (
          <div className="sensitive-confirmation">
            <div>
              <AlertTriangle size={20} />
              <span>
                <strong>Cette action modifiera le statut du contrat et peut libérer le bien. Confirmer ?</strong>
                <small>Après confirmation, l'historique, la fiche bien et la fiche locataire seront mis à jour.</small>
              </span>
            </div>
          </div>
        )}
        <div className="action-row compact-row">
          <Button onClick={onClose}>Annuler</Button>
          <Button onClick={() => setPreview(true)}><Eye size={17} /> Prévisualiser document</Button>
          <Button variant="primary" onClick={submit}><XCircle size={17} /> Confirmer résiliation</Button>
        </div>
      </section>
    </div>
  );
}

function ContractFormModal({ property: initialProperty = properties[0], tenant: initialTenant = tenants[0], onGenerate, onClose }) {
  const [preview, setPreview] = useState(false);
  const initialOwner = owners.find((item) => item.name === initialProperty.owner) ?? owners[0];
  const tenantOptions = Array.from(new Set([initialTenant?.name, ...tenants.map((tenant) => tenant.name), ...prospects.map((prospect) => prospect.name)].filter(Boolean)));
  const [propertyCode, setPropertyCode] = useState(initialProperty.code);
  const [tenantName, setTenantName] = useState(initialTenant?.name ?? tenants[0].name);
  const [values, setValues] = useState(() => getDocumentDefaults("bail", { property: initialProperty, owner: initialOwner, tenant: initialTenant ?? tenants[0] }));

  const updateLease = (name, value) => {
    setValues((current) => ({ ...current, [name]: value }));
  };

  const handlePropertyChange = (code) => {
    const property = properties.find((item) => item.code === code) ?? properties[0];
    const owner = owners.find((item) => item.name === property.owner) ?? owners[0];
    const tenant = initialTenant?.name === tenantName ? initialTenant : tenants.find((item) => item.name === tenantName) ?? tenants[0];
    const nextDefaults = getDocumentDefaults("bail", { property, owner, tenant });

    setPropertyCode(code);
    setValues((current) => ({
      ...current,
      bien: nextDefaults.bien,
      adresse: nextDefaults.adresse,
      localType: nextDefaults.localType,
      localAdresse: nextDefaults.localAdresse,
      designationLocal: nextDefaults.designationLocal,
      loyer: nextDefaults.loyer,
      loyerHt: nextDefaults.loyerHt,
      loyerTtc: nextDefaults.loyerTtc,
      caution: nextDefaults.caution,
    }));
  };

  const handleTenantChange = (name) => {
    const property = properties.find((item) => item.code === propertyCode) ?? properties[0];
    const owner = owners.find((item) => item.name === property.owner) ?? owners[0];
    const tenant = initialTenant?.name === name ? initialTenant : tenants.find((item) => item.name === name) ?? tenants[0];
    const nextDefaults = getDocumentDefaults("bail", { property, owner, tenant });

    setTenantName(name);
    setValues((current) => ({
      ...current,
      preneur: nextDefaults.preneur,
      locataire: nextDefaults.locataire,
      telephonePreneur: nextDefaults.telephonePreneur,
    }));
  };

  const buildGeneratedContract = (status = "Généré") => {
    const property = properties.find((item) => item.code === propertyCode) ?? initialProperty;
    const tenant = initialTenant?.name === tenantName ? initialTenant : tenants.find((item) => item.name === tenantName) ?? { name: tenantName };

    return {
      number: values.contratNo || `CON-2026-${String(Date.now()).slice(-3)}`,
      type: values.objet?.includes("Mandat") ? "Mandat de gestion" : "Contrat de bail",
      property: property.name,
      owner: property.owner,
      client: tenant.name,
      start: values.effetDate || values.souscritLe,
      end: values.expirationDate || "18/06/2027",
      status,
      generated: true,
    };
  };

  const generateContract = () => {
    onGenerate?.(buildGeneratedContract("Généré"));
    setPreview(true);
  };

  const archiveContract = () => {
    onGenerate?.(buildGeneratedContract("Archivé"));
    onClose();
  };

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="modal-card wide-modal contract-modal" role="dialog" aria-modal="true" onMouseDown={(event) => event.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>Créer contrat</h2>
        <p>Création à partir d'un formulaire métier. Les champs renseignés alimentent automatiquement le modèle de bail E.K immo.</p>
        <div className="form-section">
          <h3>Contrat et rattachement</h3>
          <div className="form-grid">
            <label>Type de contrat<select value={values.objet} onChange={(event) => updateLease("objet", event.target.value)}><option>CONTRAT DE BAIL À USAGE PROFESSIONNEL</option><option>Contrat de bail à usage d'habitation</option><option>Mandat de gestion</option></select></label>
            <label>Numéro contrat<input value={values.contratNo} onChange={(event) => updateLease("contratNo", event.target.value)} /><small>Généré automatiquement, modifiable avant sortie PDF.</small></label>
            <label>Date de souscription<input value={values.souscritLe} onChange={(event) => updateLease("souscritLe", event.target.value)} /></label>
            <label>Bien concerné<select value={propertyCode} onChange={(event) => handlePropertyChange(event.target.value)}>{properties.map((property) => <option value={property.code} key={property.code}>{property.name}</option>)}</select></label>
            <label>Propriétaire / bailleur<select value={values.bailleurRep} onChange={(event) => updateLease("bailleurRep", event.target.value)}><option>M. Tidiane Niaro</option><option>Mamadou Keita</option><option>Sira Coulibaly</option><option>Foncière Mandé</option></select></label>
            <label>Locataire ou client<select value={tenantName} onChange={(event) => handleTenantChange(event.target.value)}>{tenantOptions.map((name) => <option key={name}>{name}</option>)}</select></label>
          </div>
        </div>

        <LeaseVariableForm values={values} onChange={updateLease} includeReference={false} />
        <div className="action-row compact-row">
          <Button onClick={onClose}><Archive size={17} /> Enregistrer brouillon</Button>
          <Button variant="primary" onClick={generateContract}><Download size={17} /> Générer PDF</Button>
          <Button onClick={archiveContract}><Archive size={17} /> Archiver</Button>
        </div>
        {preview && (
          <DocumentPreviewModal
            template={documentTemplates.find((item) => item.key === "bail") ?? documentTemplates[3]}
            values={values}
            onChange={updateLease}
            onClose={() => setPreview(false)}
          />
        )}
      </section>
    </div>
  );
}

function PropertyFormModal({ title, property = properties[0], ownersList = owners, ownerPrefill = "", onClose }) {
  const isEditMode = title === "Modifier le bien";
  const sensitiveInitialValues = useMemo(() => ({
    rent: property?.price ?? "850 000 FCFA",
    status: property?.status ?? "Disponible",
    owner: isEditMode ? (property?.owner ?? ownersList[0].name) : (ownerPrefill || property?.owner || ownersList[0].name),
    tenant: property?.tenant ?? "Libre",
    financialMode: property?.financialMode ?? "Encaissement par l'agence",
    commission: property?.commission ?? "50% du loyer",
    deposit: property?.deposit ?? "1 700 000 FCFA",
  }), [isEditMode, ownerPrefill, ownersList, property]);
  const [propertyNature, setPropertyNature] = useState(property?.parentCode ? "Appartement rattaché" : isBuildingProperty(property) ? "Immeuble parent" : "Bien individuel");
  const [hasFocalPoint, setHasFocalPoint] = useState(true);
  const [sensitiveValues, setSensitiveValues] = useState(sensitiveInitialValues);
  const [confirmSensitiveChange, setConfirmSensitiveChange] = useState(false);
  const sensitiveOptions = {
    status: ["Disponible", "Loué", "Réservé", "Gestion multi-lots", "Entretien seul", "Vendu", "En travaux", "Indisponible"],
    owner: ownersList.map((owner) => owner.name),
    tenant: ["Libre", ...tenants.map((tenant) => tenant.name)],
    financialMode: ["Encaissement par l'agence", "Encaissement direct par le propriétaire", "Contrat entretien seul"],
  };
  const sensitiveLabels = {
    rent: "loyer",
    status: "statut",
    owner: "propriétaire",
    tenant: "locataire",
    financialMode: "mode financier",
    commission: "commission",
    deposit: "caution",
  };
  const changedSensitiveFields = Object.entries(sensitiveValues)
    .filter(([key, value]) => String(value).trim() !== String(sensitiveInitialValues[key]).trim())
    .map(([key]) => sensitiveLabels[key]);

  const updateSensitiveValue = (key, value) => {
    setSensitiveValues((current) => ({ ...current, [key]: value }));
    setConfirmSensitiveChange(false);
  };

  const handleSave = () => {
    if (isEditMode && changedSensitiveFields.length > 0) {
      setConfirmSensitiveChange(true);
      return;
    }
    onClose();
  };

  const confirmSave = () => {
    setConfirmSensitiveChange(false);
    onClose();
  };

  const withCurrentOption = (key) => Array.from(new Set([sensitiveValues[key], ...(sensitiveOptions[key] ?? [])].filter(Boolean)));

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="modal-card wide-modal" role="dialog" aria-modal="true" onMouseDown={(event) => event.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>{title}</h2>
        <div className="form-section">
          <h3>Informations générales</h3>
          <div className="form-grid compact-form">
            <label>Code du bien<input defaultValue="EKM-NEW-001" /></label>
            <label>Type de bien<select><option>Immeuble collectif</option><option>Appartement rattaché</option><option>Appartement individuel</option><option>Maison</option><option>Villa</option><option>Terrain</option><option>Bureau</option><option>Boutique</option></select></label>
            <label>Nom ou désignation<input defaultValue="Appartement B-204 Korofina" /></label>
            <label>Quartier<input defaultValue="ACI 2000, Bamako" /></label>
            <label className="full">Adresse détaillée<input defaultValue="Adresse complète du bien" /></label>
            <label className="full">Description<textarea defaultValue="Description du bien, de ses accès et de ses caractéristiques principales." /></label>
            <label>Statut<select value={sensitiveValues.status} onChange={(event) => updateSensitiveValue("status", event.target.value)}>{withCurrentOption("status").map((option) => <option key={option}>{option}</option>)}</select></label>
            <label>Prix de location<input value={sensitiveValues.rent} onChange={(event) => updateSensitiveValue("rent", event.target.value)} /></label>
            <label>Prix de vente<input placeholder="Si applicable" /></label>
            <label>Montant de caution<input value={sensitiveValues.deposit} onChange={(event) => updateSensitiveValue("deposit", event.target.value)} /></label>
            <label>Commission applicable<input value={sensitiveValues.commission} onChange={(event) => updateSensitiveValue("commission", event.target.value)} /></label>
          </div>
        </div>
        <div className="form-section">
          <h3>Immeuble, blocs et lots</h3>
          <div className="form-grid compact-form">
            <label>Nature du dossier<select value={propertyNature} onChange={(event) => setPropertyNature(event.target.value)}><option>Appartement rattaché</option><option>Immeuble parent</option><option>Bien individuel</option></select></label>
            {propertyNature === "Appartement rattaché" && (
              <>
                <label>Immeuble parent<select>{properties.filter(isBuildingProperty).map((property) => <option key={property.code}>{property.name}</option>)}</select></label>
                <label>Bloc<select><option>Bloc A</option><option>Bloc B</option><option>Bloc C</option></select></label>
                <label>Étage<input defaultValue="2e étage" /></label>
                <label>Numéro du lot<input defaultValue="B-204" /></label>
              </>
            )}
            {propertyNature === "Immeuble parent" && (
              <>
                <label>Nombre de blocs<input defaultValue="2" /></label>
                <label>Nombre d'appartements<input defaultValue="12" /></label>
                <label>Lots disponibles<input defaultValue="3" /></label>
                <label>Référence structure<input defaultValue="STR-KOR-2026" /></label>
              </>
            )}
          </div>
          <div className="form-structure-preview">
            <img src={assets.residence} alt="" />
            <div>
              <strong>{propertyNature === "Immeuble parent" ? "Création d'un immeuble parent" : "Appartement lié à un immeuble"}</strong>
              <span>{propertyNature === "Immeuble parent" ? "Les appartements pourront ensuite être créés comme fiches indépendantes rattachées aux blocs." : "La fiche appartement reste autonome, avec un lien visible vers l'immeuble parent."}</span>
            </div>
          </div>
        </div>
        <div className="form-section">
          <h3>Propriétaire & point focal</h3>
          <div className="form-grid compact-form">
            <label>Propriétaire<select value={sensitiveValues.owner} onChange={(event) => updateSensitiveValue("owner", event.target.value)}>{withCurrentOption("owner").map((option) => <option key={option}>{option}</option>)}</select></label>
            <label>Locataire actuel<select value={sensitiveValues.tenant} onChange={(event) => updateSensitiveValue("tenant", event.target.value)}>{withCurrentOption("tenant").map((option) => <option key={option}>{option}</option>)}</select></label>
            <label>Agent responsable<select><option>Aïssata Diarra</option><option>Mariam Traoré</option><option>Issa Maïga</option><option>Cheick Camara</option></select></label>
            <label>Mode de gestion financière<select value={sensitiveValues.financialMode} onChange={(event) => updateSensitiveValue("financialMode", event.target.value)}>{withCurrentOption("financialMode").map((option) => <option key={option}>{option}</option>)}</select></label>
            <label className="check-line full">
              <input type="checkbox" checked={hasFocalPoint} onChange={(event) => setHasFocalPoint(event.target.checked)} />
              <span>Point focal différent du propriétaire</span>
            </label>
            {hasFocalPoint && (
              <>
                <label>Nom du point focal<input defaultValue="Ousmane Traoré" /></label>
                <label>Fonction / rôle<input defaultValue="Gestionnaire du syndic" /></label>
                <label>Téléphone<input defaultValue="+223 76 55 21 04" /></label>
                <label>Email<input defaultValue="syndic.korofina@foncieremande.ml" /></label>
              </>
            )}
          </div>
        </div>
        <div className="form-section">
          <h3>Détails, médias et documents</h3>
          <div className="form-grid compact-form">
            <label>Nombre de pièces<input defaultValue="4" /></label>
            <label>Surface<input defaultValue="145 m²" /></label>
            <label>État général<select><option>Bon</option><option>À rafraîchir</option><option>En travaux</option><option>À rénover</option></select></label>
            <label>Équipements<input defaultValue="Balcon, sécurité 24h, climatisation" /></label>
            <label className="full">Observations<textarea defaultValue="Dernière action ou point de suivi à conserver dans l'historique." /></label>
            <label>Photos du bien<input type="file" multiple /></label>
            <label>Titre foncier<input type="file" /></label>
            <label>Mandat<input type="file" /></label>
            <label>Autres documents<input type="file" multiple /></label>
          </div>
        </div>
        {confirmSensitiveChange && (
          <div className="sensitive-confirmation" role="alert">
            <div>
              <AlertTriangle size={20} />
              <span>
                <strong>Cette modification peut impacter les contrats, paiements ou situations propriétaires. Confirmer la modification ?</strong>
                <small>Champs sensibles modifiés : {changedSensitiveFields.join(", ")}.</small>
              </span>
            </div>
            <div className="action-row compact-row">
              <Button variant="primary" onClick={confirmSave}><CheckCircle2 size={17} /> Confirmer la modification</Button>
              <Button onClick={() => setConfirmSensitiveChange(false)}>Revenir au formulaire</Button>
            </div>
          </div>
        )}
        <div className="action-row compact-row">
          <Button variant="primary" onClick={handleSave}><CheckCircle2 size={17} /> Enregistrer</Button>
          <Button onClick={handleSave}>Enregistrer comme brouillon</Button>
          <Button onClick={onClose}>Annuler</Button>
        </div>
      </section>
    </div>
  );
}

function getDocumentPreviewContext(title) {
  const normalizedTitle = normalizeSearch(title);
  const isOutputAction = ["pdf", "imprimer", "telecharger", "generer", "exporter"].some((keyword) => normalizedTitle.includes(keyword));
  if (!isOutputAction) return null;

  const invoice = invoices.find((item) => normalizedTitle.includes(normalizeSearch(item.number)));
  if (invoice) {
    const templateKey = invoice.type === "Reçu" || invoice.type === "Quittance" ? "recu" : "facture";
    const property = getPropertyByName(invoice.property) ?? properties[0];
    const owner = owners.find((item) => item.name === property.owner) ?? owners[0];
    const tenant = tenants.find((item) => item.name === invoice.client) ?? tenants[0];

    return {
      template: documentTemplates.find((item) => item.key === templateKey) ?? documentTemplates[0],
      data: { invoice, property, owner, tenant },
    };
  }

  const contract = contracts.find((item) => normalizedTitle.includes(normalizeSearch(item.number)));
  if (contract) {
    const property = getPropertyByName(contract.property) ?? properties[0];
    const owner = owners.find((item) => item.name === contract.owner) ?? owners[0];
    const tenant = tenants.find((item) => item.name === contract.client) ?? tenants[0];

    return {
      template: documentTemplates.find((item) => item.key === "bail") ?? documentTemplates[3],
      data: { property, owner, tenant },
    };
  }

  if (normalizedTitle.includes("recu") || normalizedTitle.includes("quittance")) {
    return { template: documentTemplates.find((item) => item.key === "recu") ?? documentTemplates[1], data: {} };
  }

  if (normalizedTitle.includes("bordereau") || normalizedTitle.includes("commission")) {
    return { template: documentTemplates.find((item) => item.key === "bordereau") ?? documentTemplates[2], data: {} };
  }

  if (normalizedTitle.includes("contrat") || normalizedTitle.includes("bail")) {
    return { template: documentTemplates.find((item) => item.key === "bail") ?? documentTemplates[3], data: {} };
  }

  if (normalizedTitle.includes("facture")) {
    return { template: documentTemplates.find((item) => item.key === "facture") ?? documentTemplates[0], data: {} };
  }

  return null;
}

function ActionDocumentModal({ context, onClose }) {
  const defaults = useMemo(() => getDocumentDefaults(context.template.key, context.data), [context]);
  const [values, setValues] = useState(defaults);

  useEffect(() => {
    setValues(defaults);
  }, [defaults]);

  const updateField = (name, value) => {
    setValues((current) => ({ ...current, [name]: value }));
  };

  return (
    <DocumentPreviewModal
      template={context.template}
      values={values}
      onChange={updateField}
      onClose={onClose}
    />
  );
}

function ArchivePropertyModal({ property, onConfirm, onClose }) {
  const [reason, setReason] = useState("");
  const canConfirm = reason.trim().length > 0;

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="modal-card archive-modal" role="dialog" aria-modal="true" onMouseDown={(event) => event.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="round-icon large">
          <Archive size={22} />
        </div>
        <h2>Archiver ce bien ?</h2>
        <p>
          Ce bien ne sera plus visible dans la liste active, mais son historique, ses documents,
          paiements et contrats seront conservés.
        </p>
        <div className="archive-target">
          <span>Bien concerné</span>
          <strong>{property.code} · {property.name}</strong>
          <small>{property.owner} · {property.district}</small>
        </div>
        <div className="form-grid compact-form">
          <label>
            Motif d’archivage
            <textarea
              value={reason}
              onChange={(event) => setReason(event.target.value)}
              placeholder="Ex. Bien sorti du mandat, vente finalisée, dossier clôturé..."
              required
            />
          </label>
        </div>
        <div className="action-row compact-row">
          <Button onClick={onClose}>Annuler</Button>
          <Button variant="primary" disabled={!canConfirm} onClick={() => onConfirm({ property, reason })}>
            <Archive size={17} /> Confirmer l’archivage
          </Button>
        </div>
      </section>
    </div>
  );
}

function DemoModal({ title, onClose }) {
  const documentContext = getDocumentPreviewContext(title);
  const sensitive = isSensitiveAction(title);

  if (documentContext) {
    return <ActionDocumentModal context={documentContext} onClose={onClose} />;
  }

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="modal-card" role="dialog" aria-modal="true" onMouseDown={(event) => event.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="round-icon large">
          <Plus size={22} />
        </div>
        <h2>{title}</h2>
        <div className="form-grid compact-form">
          <label>Référence<input defaultValue="EKM-DEMO-2026" /></label>
          <label>Responsable<select><option>Aïssata Diarra</option><option>Mariam Traoré</option><option>Issa Maïga</option></select></label>
          {sensitive && (
            <label className="full">Justification<textarea defaultValue="Action sensible à confirmer pour conserver la traçabilité dans l'historique." /></label>
          )}
        </div>
        {sensitive && (
          <div className="sensitive-warning">
            Cette action modifie une donnée importante. La confirmation sera historisée avec l'utilisateur, la date, l'ancienne valeur et la nouvelle valeur.
          </div>
        )}
        <div className="action-row compact-row">
          <Button variant="primary" onClick={onClose}><CheckCircle2 size={17} /> {sensitive ? "Confirmer" : "Valider"}</Button>
          <Button onClick={onClose}>Annuler</Button>
        </div>
      </section>
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <strong>E.K immo</strong>
      <span>© 2026 E.K immo. Tous droits réservés. Gestion immobilière au Mali.</span>
      <nav>
        <a>Mentions légales</a>
        <a>Confidentialité</a>
        <a>Conditions d'utilisation</a>
        <a>Support</a>
      </nav>
    </footer>
  );
}

export default App;

