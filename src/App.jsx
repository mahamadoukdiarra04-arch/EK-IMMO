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

const navItems = ["Dashboard", "Biens", "Clients", "Contrats", "Finance", "Rapports", "Plus"];

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
    body: "Le dashboard synthétise les volumes de biens, loyers, impayés, charges et reversements attendus pour EK IMMO.",
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
    body: "Depuis une fiche, EK IMMO peut modifier le bien, planifier une visite, créer un contrat, enregistrer un paiement ou générer des documents.",
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
    title: "Finance métier EK IMMO",
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
    body: "EK IMMO suit les loyers encaissés, commissions, charges, montants déjà reversés et soldes nets à payer.",
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
    tags: ["Piscine", "Groupe électrogène", "Garage double", "Jardin"],
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
    status: "En travaux",
    price: "1 900 000 FCFA",
    period: "/mois",
    image: assets.office,
    surface: "210 m²",
    rooms: 5,
    bedrooms: 0,
    baths: 3,
    deposit: "3 800 000 FCFA",
    commission: "7%",
    financialMode: "Encaissement direct par le propriétaire",
    lastAction: "Peinture à valider",
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
    client: "EK IMMO",
    start: "15/03/2026",
    end: "14/03/2027",
    status: "Actif",
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
    date: "17/05/2026",
    type: "Plomberie",
    property: "Studio Badalabougou",
    owner: "Moussa Touré",
    amount: "95 000 FCFA",
    payer: "Propriétaire",
    proof: "Reçu artisan",
    status: "À valider",
  },
  {
    date: "20/05/2026",
    type: "Gardiennage",
    property: "Résidence ACI Baobab",
    owner: "Sira Coulibaly",
    amount: "180 000 FCFA",
    payer: "Agence",
    proof: "Facture mensuelle",
    status: "Payé",
  },
  {
    date: "25/05/2026",
    type: "Climatisation",
    property: "Villa Koulouba",
    owner: "Mamadou Keita",
    amount: "240 000 FCFA",
    payer: "Refacturable au locataire",
    proof: "Devis signé",
    status: "En cours",
  },
];

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
  Année: ["1 284", "96", "1 188", "906.8M FCFA", "38.6M FCFA", "126.7M FCFA", "49.2M FCFA", "372.4M FCFA"],
  "Période personnalisée": ["76", "14", "62", "42.9M FCFA", "1.9M FCFA", "6.8M FCFA", "2.2M FCFA", "24.7M FCFA"],
};

const rentBarsByIndicator = {
  "Loyers attendus": {
    Jour: [["Lun", 48], ["Mar", 72], ["Mer", 58], ["Jeu", 66], ["Ven", 82], ["Sam", 42]],
    Semaine: [["S1", 54], ["S2", 68], ["S3", 61], ["S4", 79], ["S5", 72], ["S6", 84]],
    Mois: [["Jan", 52], ["Fév", 66], ["Mar", 72], ["Avr", 56], ["Mai", 80], ["Juin", 75]],
    Année: [["2021", 45], ["2022", 57], ["2023", 64], ["2024", 73], ["2025", 81], ["2026", 88]],
    "Période personnalisée": [["J1", 38], ["J2", 56], ["J3", 64], ["J4", 51], ["J5", 77], ["J6", 69]],
  },
  "Paiements reçus": {
    Jour: [["Lun", 42], ["Mar", 63], ["Mer", 52], ["Jeu", 61], ["Ven", 72], ["Sam", 34]],
    Semaine: [["S1", 49], ["S2", 61], ["S3", 57], ["S4", 70], ["S5", 66], ["S6", 76]],
    Mois: [["Jan", 48], ["Fév", 58], ["Mar", 63], ["Avr", 52], ["Mai", 72], ["Juin", 68]],
    Année: [["2021", 38], ["2022", 49], ["2023", 58], ["2024", 69], ["2025", 74], ["2026", 82]],
    "Période personnalisée": [["J1", 35], ["J2", 49], ["J3", 58], ["J4", 45], ["J5", 70], ["J6", 62]],
  },
  "Soldes impayés": {
    Jour: [["Lun", 18], ["Mar", 25], ["Mer", 21], ["Jeu", 30], ["Ven", 24], ["Sam", 16]],
    Semaine: [["S1", 26], ["S2", 22], ["S3", 31], ["S4", 28], ["S5", 19], ["S6", 16]],
    Mois: [["Jan", 20], ["Fév", 24], ["Mar", 18], ["Avr", 32], ["Mai", 26], ["Juin", 21]],
    Année: [["2021", 34], ["2022", 29], ["2023", 25], ["2024", 22], ["2025", 19], ["2026", 16]],
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
  Année: ["1.28B FCFA", "1.05B FCFA", "230.4M FCFA", "112.6M FCFA", "372.4M FCFA"],
  "Période personnalisée": ["54.2M FCFA", "43.8M FCFA", "10.4M FCFA", "6.3M FCFA", "18.9M FCFA"],
};

const periodWeight = {
  Jour: 0.22,
  Semaine: 0.48,
  Mois: 1,
  Année: 7.6,
  "Période personnalisée": 0.72,
};

const rentTargetByPeriod = {
  Jour: 3800000,
  Semaine: 18600000,
  Mois: 85400000,
  "Ann\u00e9e": 906800000,
  "P\u00e9riode personnalis\u00e9e": 42900000,
};

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

function isAgencyCollectedProperty(name) {
  const property = getPropertyByName(name);
  return !property || !property.financialMode.includes("direct par le propriétaire");
}

function getAgencyRentRows() {
  return rentRows.filter((row) => isAgencyCollectedProperty(row.property));
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

function getSearchResults(query) {
  const normalizedQuery = normalizeSearch(query).trim();
  if (!normalizedQuery) return [];

  return searchEntries
    .filter((entry) => entry.haystack.includes(normalizedQuery))
    .slice(0, 8);
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
  const [clientTab, setClientTab] = useState("Propriétaires");
  const [selectedOwner, setSelectedOwner] = useState(owners[0]);
  const [selectedTenant, setSelectedTenant] = useState(tenants[0]);
  const [contractTab, setContractTab] = useState("Contrats");
  const [financeTab, setFinanceTab] = useState("Loyers");
  const [adminTab, setAdminTab] = useState("Utilisateurs");
  const [reportType, setReportType] = useState(reports[0][0]);
  const demoStep = demoSteps[demoIndex];

  const openAction = (label) => setModal(label);

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
    setSelectedProperty(property);
    setPropertyView("detail");
    setActivePage("Biens");
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
        onProfile={() => setShowLogin(true)}
        onStartDemo={startDemo}
        demoActive={demoActive}
      />

      <main className={activePage === "Dashboard" ? "page-shell dashboard-shell" : "page-shell"}>
        {activePage === "Dashboard" && <DashboardPage onAction={openAction} onOpenProperty={showPropertyDetail} />}
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
          />
        )}
        {activePage === "Clients" && (
          <ClientsPage
            activeTab={clientTab}
            onTab={setClientTab}
            selectedOwner={selectedOwner}
            onOwner={setSelectedOwner}
            selectedTenant={selectedTenant}
            onTenant={setSelectedTenant}
            onAction={openAction}
          />
        )}
        {activePage === "Contrats" && <ContractsPage activeTab={contractTab} onTab={setContractTab} onAction={openAction} />}
        {activePage === "Finance" && <FinancePage activeTab={financeTab} onTab={setFinanceTab} onAction={openAction} />}
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
      {modal && (["Ajouter un bien", "Modifier le bien"].includes(modal) ? (
        <PropertyFormModal title={modal} onClose={() => setModal(null)} />
      ) : modal === "Créer contrat" ? (
        <ContractFormModal onClose={() => setModal(null)} />
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
    <div className="demo-tour" role="dialog" aria-label="Mode démonstration EK IMMO">
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

function Topbar({ activePage, globalQuery, onQueryChange, onNav, onProfile, onStartDemo, demoActive }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const results = useMemo(() => getSearchResults(globalQuery), [globalQuery]);
  const hasQuery = globalQuery.trim().length > 0;

  const handleResultClick = (page) => {
    onNav(page);
    setSearchOpen(false);
  };

  return (
    <header className="topbar">
      <button className="brand-link" onClick={() => onNav("Dashboard")} aria-label="Retour au dashboard">
        <img src={ekimmoAssets.logo} alt="EK IMMO" />
      </button>

      <nav className="nav-tabs" aria-label="Navigation principale" data-demo="main-nav">
        {navItems.map((item) => (
          <button className={activePage === item ? "active" : ""} key={item} onClick={() => onNav(item)}>
            {item}
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
            onClick={() => setSearchOpen((value) => !value)}
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
        <button className="icon-only" aria-label="Notifications">
          <Bell size={20} />
          <span />
        </button>
        <button className="icon-only" aria-label="Paramètres" onClick={() => onNav("Plus")}>
          <Settings size={20} />
        </button>
        <button className="avatar-button" onClick={onProfile} aria-label="Ouvrir l'écran de connexion">
          <span>AD</span>
        </button>
      </div>
    </header>
  );
}

function DashboardPage({ onAction, onOpenProperty }) {
  const [kpiPeriod, setKpiPeriod] = useState("Mois");
  const kpiValues = dashboardKpisByPeriod[kpiPeriod] ?? dashboardKpisByPeriod.Mois;
  const selectedPipeline = getPipelineData("Commercial & visites", kpiPeriod);
  const summaryValues = financeSummaryByPeriod[kpiPeriod] ?? financeSummaryByPeriod.Mois;

  const kpis = [
    { label: "Biens enregistrés", value: kpiValues[0], icon: Building2, tone: "purple" },
    { label: "Biens disponibles", value: kpiValues[1], icon: KeyRound, tone: "gray" },
    { label: "Biens loués", value: kpiValues[2], icon: Home, tone: "purple" },
    { label: "Loyers attendus", value: kpiValues[3], icon: Banknote, tone: "gray" },
    { label: "Impayés", value: kpiValues[4], icon: AlertTriangle, tone: "danger" },
    { label: "Commissions générées", value: kpiValues[5], icon: WalletCards, tone: "gray" },
    { label: "Charges", value: kpiValues[6], icon: ReceiptText, tone: "gray" },
    { label: "Reversements en attente", value: kpiValues[7], icon: RefreshCw, tone: "gray" },
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
          />
        }
      />

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
            {properties.slice(0, 4).map((property) => (
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

  const propertyTypes = useMemo(() => uniqueValues(properties.map((property) => property.type)), []);
  const districts = useMemo(() => uniqueValues(properties.map((property) => property.district)), []);
  const ownersList = useMemo(() => uniqueValues(properties.map((property) => property.owner)), []);
  const tenantsList = useMemo(() => uniqueValues(properties.map((property) => property.tenant)), []);
  const financialModes = useMemo(() => uniqueValues(properties.map((property) => property.financialMode)), []);
  const commissions = useMemo(() => uniqueValues(properties.map((property) => property.commission)), []);
  const periods = useMemo(() => uniqueValues(properties.map((property) => property.period)), []);
  const tags = useMemo(() => uniqueValues(properties.flatMap((property) => property.tags)), []);

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
    return properties.filter((property) => {
      const haystack = normalizeSearch(
        `${property.code} ${property.name} ${property.type} ${property.district} ${property.address} ${property.owner} ${property.tenant} ${property.price} ${property.tags.join(" ")}`
      );
      const queryMatch = !query || haystack.includes(normalizeSearch(query));
      const statusMatch = statusFilter === "Tous statuts" || property.status === statusFilter;
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
  }, [advancedFilters, query, statusFilter, typeFilter]);

  if (view === "detail") {
    return (
      <PropertyDetail
        property={selectedProperty}
        activeTab={propertyTab}
        onTab={onTab}
        onBack={onBack}
        onAction={onAction}
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
            {["Tous statuts", "Disponible", "Loué", "Réservé", "Vendu", "En travaux", "Indisponible"].map((option) => (
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
            columns={["Photo", "Code", "Type", "Quartier", "Propriétaire", "Locataire actuel", "Prix", "Statut", "Dernière action", "Action"]}
            rows={filteredProperties.map((property) => [
              <img className="table-thumb" src={property.image} alt="" />,
              property.code,
              property.type,
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
  return (
    <article className="property-card" data-demo="property-card">
      <button className="property-image-button" onClick={() => onSelect(property)}>
        <img src={property.image} alt={property.name} />
        <Badge label={property.status} />
      </button>
      <div className="property-card-body">
        <div className="property-meta">
          <span>{property.code}</span>
          <strong>
            {property.price} <small>{property.period}</small>
          </strong>
        </div>
        <h3>{property.name}</h3>
        <p>
          <MapPin size={16} /> {property.district}
        </p>
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

function PropertyDetail({ property, activeTab, onTab, onBack, onAction }) {
  const tabs = ["Résumé", "Propriétaire", "Locataire", "Contrats", "Paiements", "Charges & entretiens", "Documents", "Historique"];

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
              <span>{property.financialMode}</span>
            </div>
          </div>
          <div className="price-block">
            <strong>{property.price}</strong>
            <span>{property.period}</span>
            <small>Propriétaire : {property.owner}</small>
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
          <Button onClick={() => onAction("Enregistrer paiement")}>
            <Banknote size={17} /> Paiement
          </Button>
          <Button onClick={() => onAction("Ajouter entretien")}>
            <Wrench size={17} /> Ajouter entretien
          </Button>
          <Button onClick={() => onAction("Ajouter charge")}>
            <ReceiptText size={17} /> Ajouter charge
          </Button>
          <Button onClick={() => onAction("Générer document")}>
            <FileText size={17} /> Générer document
          </Button>
          <Button onClick={() => onAction("Fiche bien PDF")}>
            <Download size={17} /> Fiche PDF
          </Button>
          <Button onClick={() => onAction("Archiver le bien")}>
            <Archive size={17} /> Archiver
          </Button>
        </div>
      </article>

      <DetailMetrics
        items={[
          ["Loyer / prix", `${property.price} ${property.period}`],
          ["Statut", property.status],
          ["Contrat", contracts.find((contract) => contract.property === property.name)?.status ?? "À créer"],
          ["Dernier paiement", paymentRecords.find((payment) => payment.property === property.name)?.paid ?? "N/A"],
          ["Prochaine action", property.lastAction],
          ["Documents", "8 pièces"],
        ]}
      />

      <Tabs tabs={tabs} active={activeTab} onChange={onTab} demo="property-detail-tabs" />
      {activeTab === "Résumé" && <PropertySummary property={property} />}
      {activeTab === "Propriétaire" && <PropertyOwner property={property} />}
      {activeTab === "Locataire" && <PropertyTenant property={property} />}
      {activeTab === "Contrats" && <PropertyContracts property={property} />}
      {activeTab === "Paiements" && <PropertyPayments property={property} />}
      {activeTab === "Charges & entretiens" && <PropertyMaintenance property={property} />}
      {activeTab === "Documents" && <PropertyDocuments property={property} onAction={onAction} />}
      {activeTab === "Historique" && <PropertyHistory property={property} />}
    </>
  );
}

function PropertySummary({ property }) {
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
          </div>
          <div className="property-description">
            <p><strong>Description</strong><span>{property.type} situé à {property.district}, rattaché au portefeuille EK IMMO.</span></p>
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
        </Panel>
        <Panel title="Localisation">
          <p className="panel-copy">{property.address}</p>
          <div className="map-card">
            <span />
          </div>
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
        </div>
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
  const tenant = tenants.find((item) => property.tenant.includes(item.name)) ?? tenants[0];
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
          <Info label="Date d'entrée" value="01/01/2026" />
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

function PropertyContracts({ property }) {
  return (
    <Panel title="Contrats liés au bien">
      <DataTable
        columns={["Numéro", "Type", "Début", "Fin", "Statut", "Document joint", "Actions"]}
        rows={contracts
          .filter((contract) => contract.property === property.name || contract.owner === property.owner)
          .map((contract) => [
            contract.number,
            contract.type,
            contract.start,
            contract.end,
            <Badge label={contract.status} />,
            "PDF signé",
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

function PropertyPayments({ property }) {
  if (!isAgencyCollectedProperty(property.name)) {
    return (
      <Panel title="Paiements liés au bien">
        <div className="notice">
          Encaissement effectué directement par le propriétaire. Ce bien reste suivi pour les visites, documents,
          charges et entretiens, mais il n'apparaît pas comme loyer à encaisser par EK IMMO.
        </div>
      </Panel>
    );
  }

  return (
    <Panel title="Paiements liés au bien">
      <DataTable
        columns={["Période", "Locataire", "Montant attendu", "Montant payé", "Solde", "Statut"]}
        rows={getAgencyRentRows()
          .filter((row) => row.property === property.name || row.owner === property.owner)
          .map((row) => [row.period, row.tenant, row.expected, row.paid, row.balance, <Badge label={row.status} />])}
      />
    </Panel>
  );
}

function PropertyMaintenance({ property }) {
  const propertyCharges = charges.filter((item) => item.property === property.name);
  const propertyMaintenances = maintenances.filter((item) => item.property === property.name);
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
      proof: "Justificatif à joindre",
      status: item.status,
      kind: "Entretien",
    })),
  ];

  return (
    <Panel title="Charges & entretiens">
      <DataTable
        columns={["Date", "Nature", "Type", "Responsable", "Montant", "Prise en charge", "Justificatif", "Statut"]}
        rows={(rows.length ? rows : [
          {
            date: "À planifier",
            kind: "Entretien",
            type: "Aucun élément ouvert",
            manager: "EK IMMO",
            amount: "0 FCFA",
            payer: "-",
            proof: "-",
            status: "À prévoir",
          },
        ]).map((item) => [item.date, item.kind, item.type, item.manager, item.amount, item.payer, item.proof, <Badge label={item.status} />])}
      />
    </Panel>
  );
}

function PropertyDocuments({ property, onAction }) {
  return (
    <Panel title={`Documents - ${property.code}`} toolbar={<Button compact onClick={() => onAction("Importer document")}><Upload size={16} /> Importer</Button>}>
      <DataTable
        columns={["Document", "Type", "Date", "Statut", "Actions"]}
        rows={[
          ["Contrat de location signé", "Contrat", "01/01/2026", <Badge label="Archivé" />, <DocumentActions />],
          ["Titre foncier scanné", "Titre", "14/03/2026", <Badge label="Archivé" />, <DocumentActions />],
          ["Facture entretien jardin", "Facture", "05/05/2026", <Badge label="Généré" />, <DocumentActions />],
          ["Reçu loyer mai", "Reçu", "06/05/2026", <Badge label="Imprimé" />, <DocumentActions />],
        ]}
      />
    </Panel>
  );
}

function PropertyHistory({ property }) {
  return (
    <Panel title={`Historique - ${property.name}`}>
      <div className="timeline">
        {[
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

function ClientsPage({ activeTab, onTab, selectedOwner, onOwner, selectedTenant, onTenant, onAction }) {
  const tabs = ["Propriétaires", "Locataires", "Prospects", "Visites"];
  return (
    <>
      <PageIntro
        title="Gestion des Clients"
        actions={
          <Button variant="primary" onClick={() => onAction("Nouveau client")}>
            <Plus size={18} /> Nouveau client
          </Button>
        }
      />
      <Tabs tabs={tabs} active={activeTab} onChange={onTab} demo="client-tabs" />
      <Panel className="filter-panel">
        <div className="filters-row">
          <label className="field search-field mid">
            <Search size={19} />
            <input placeholder={`Rechercher dans ${activeTab.toLowerCase()}...`} />
          </label>
          <span className="spacer" />
          <Button>
            <Filter size={17} /> Filtres
          </Button>
          <Button>
            <Download size={17} /> Exporter
          </Button>
        </div>
      </Panel>
      {activeTab === "Propriétaires" && <OwnersView selected={selectedOwner} onSelect={onOwner} onAction={onAction} />}
      {activeTab === "Locataires" && <TenantsView selected={selectedTenant} onSelect={onTenant} onAction={onAction} />}
      {activeTab === "Prospects" && <ProspectsView onAction={onAction} />}
      {activeTab === "Visites" && <VisitsView onAction={onAction} />}
    </>
  );
}

function OwnersView({ selected, onSelect, onAction }) {
  return (
    <section className="master-detail" data-demo="owner-workspace">
      <Panel title="Liste des propriétaires" toolbar={<span className="muted">124 propriétaires</span>}>
        <div className="owner-list">
          <div className="owner-list-header" aria-hidden="true">
            <span />
            <span>Propriétaire</span>
            <span>Contact</span>
            <span>Biens</span>
            <span>Solde</span>
            <span>Statut</span>
          </div>
          {owners.map((owner) => (
            <button
              className={selected.id === owner.id ? "owner-row active" : "owner-row"}
              key={owner.id}
              onClick={() => onSelect(owner)}
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
      <OwnerProfilePanel owner={selected} onAction={onAction} />
    </section>
  );
}

function OwnerProfilePanel({ owner, onAction }) {
  const [tab, setTab] = useState("Résumé");
  const ownedProperties = properties.filter((property) => property.owner === owner.name);
  const ownerCharges = charges.filter((charge) => charge.owner === owner.name);
  const ownerReversals = reversals.filter((reversal) => reversal.owner === owner.name);
  const tabs = ["Résumé", "Biens", "Situation financière", "Charges", "Reversements", "Documents", "Historique"];

  return (
    <Panel title="Fiche propriétaire" className="profile-panel">
      <ProfileHeader person={owner} />
      <DetailMetrics
        items={[
          ["Biens confiés", owner.properties],
          ["Loyers encaissés", owner.rent],
          ["Charges", owner.charges],
          ["Commissions", owner.commission],
          ["Solde à reverser", owner.balance],
        ]}
      />
      <MiniTabs tabs={tabs} active={tab} onChange={setTab} />
      {tab === "Résumé" && (
        <>
          <div className="simple-list">
            <p><span>Téléphone</span><strong>{owner.phone}</strong></p>
            <p><span>Email</span><strong>{owner.email}</strong></p>
            <p><span>Nombre de biens</span><strong>{owner.properties}</strong></p>
            <p><span>Conditions de gestion</span><strong>Mandat actif</strong></p>
            <p><span>Commission</span><strong>{owner.commission}</strong></p>
            <p><span>Solde à reverser</span><strong>{owner.balance}</strong></p>
          </div>
          <div className="document-pills">
            <span>Pièce d'identité</span>
            <span>Mandat</span>
            <span>RIB</span>
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
          <p><span>Loyers encaissés pour son compte</span><strong>{owner.rent}</strong></p>
          <p><span>Commissions retenues</span><strong>{owner.commission}</strong></p>
          <p><span>Charges déduites</span><strong>{owner.charges}</strong></p>
          <p><span>Reversements effectués</span><strong>{owner.lastPayment}</strong></p>
          <p><span>Solde restant à reverser</span><strong>{owner.balance}</strong></p>
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
          rows={(ownerReversals.length ? ownerReversals : reversals.slice(0, 2)).map((row) => [
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
        <Button onClick={() => onAction("Modifier propriétaire")}>
          <Pencil size={17} /> Modifier
        </Button>
        <Button onClick={() => onAction("Ajouter un bien")}>
          <Plus size={17} /> Ajouter un bien
        </Button>
        <Button variant="primary" onClick={() => onAction("Générer situation propriétaire")}>
          <FileText size={17} /> Situation propriétaire
        </Button>
        <Button onClick={() => onAction("Enregistrer reversement")}>
          <HandCoins size={17} /> Enregistrer reversement
        </Button>
        <Button onClick={() => onAction("Imprimer situation propriétaire")}>
          <Printer size={17} /> Imprimer
        </Button>
        <Button onClick={() => onAction("Exporter PDF")}>
          <Download size={17} /> Export PDF
        </Button>
      </div>
    </Panel>
  );
}

function TenantsView({ selected, onSelect, onAction }) {
  return (
    <section className="master-detail">
      <Panel title="Liste des locataires">
        <DataTable
          columns={["Locataire", "Téléphone", "Bien occupé", "Propriétaire", "Loyer", "Impayé", "Contrat actif", "Statut", "Action"]}
          rows={tenants.map((tenant) => [
            <button className="table-person" onClick={() => onSelect(tenant)}>
              <Avatar name={tenant.name} />
              <span><strong>{tenant.name}</strong><small>{tenant.id}</small></span>
            </button>,
            tenant.phone,
            tenant.property,
            properties.find((property) => property.name === tenant.property)?.owner ?? "-",
            tenant.rent,
            tenant.paymentStatus === "À jour" ? "0 FCFA" : rentRows.find((row) => row.tenant === tenant.name)?.balance ?? "0 FCFA",
            tenant.contract,
            <Badge label={tenant.paymentStatus} />,
            <Button compact onClick={() => onSelect(tenant)}><Eye size={15} /> Fiche</Button>,
          ])}
        />
      </Panel>
      <TenantProfilePanel tenant={selected} onAction={onAction} />
    </section>
  );
}

function TenantProfilePanel({ tenant, onAction }) {
  const [tab, setTab] = useState("Résumé");
  const property = properties.find((item) => item.name === tenant.property) ?? properties[0];
  const contract = contracts.find((item) => item.number === tenant.contract) ?? contracts[0];
  const paymentRows = rentRows.filter((row) => row.tenant === tenant.name);
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
          ["Contrat", tenant.contract],
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
          <p><span>Contrat actif</span><strong>{tenant.contract}</strong></p>
          <p><span>Date début</span><strong>{contract.start}</strong></p>
          <p><span>Date fin</span><strong>{contract.end}</strong></p>
          <p><span>Conditions particulières</span><strong>Paiement au plus tard le 05</strong></p>
          <p><span>Document signé</span><Badge label="Archivé" /></p>
          <p><span>Statut</span><Badge label={contract.status} /></p>
        </div>
      )}
      {tab === "Paiements" && (
        <DataTable
          columns={["Période", "Attendu", "Payé", "Solde", "Statut"]}
          rows={(paymentRows.length ? paymentRows : rentRows.slice(0, 2)).map((row) => [
            row.period,
            row.expected,
            row.paid,
            row.balance,
            <Badge label={row.status} />,
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
          <p><span>Prochaine action</span><strong>Appel de suivi</strong></p>
        </div>
      )}
      {tab === "Documents" && (
        <div className="mini-list">
          {["Pièce d'identité", "Contrat", "Reçus", "Quittances", "Documents divers"].map((item) => (
            <p key={item}><span>{item}</span><Badge label="Archivé" /></p>
          ))}
        </div>
      )}
      <div className="stack-actions">
        <Button onClick={() => onAction("Modifier locataire")}>
          <Pencil size={17} /> Modifier
        </Button>
        <Button variant="primary" onClick={() => onAction("Paiement enregistré")}>
          <Banknote size={17} /> Enregistrer paiement
        </Button>
        <Button onClick={() => onAction("Générer reçu")}>
          <ReceiptText size={17} /> Générer reçu
        </Button>
        <Button onClick={() => onAction("Ajouter relance")}>
          <Bell size={17} /> Ajouter relance
        </Button>
        <Button onClick={() => onAction(`Voir contrat ${tenant.contract}`)}>
          <FileText size={17} /> Contrat
        </Button>
        <Button onClick={() => onAction("Situation locataire")}>
          <Download size={17} /> Situation
        </Button>
      </div>
    </Panel>
  );
}

function ProspectsView({ onAction }) {
  const [selected, setSelected] = useState(prospects[0]);
  const stages = ["Nouveau", "Contacté", "Visite prévue", "Intéressé", "Conclu", "Perdu"];
  return (
    <section className="prospect-workspace" data-demo="prospect-workspace">
      <div className="pipeline-columns">
        {stages.map((stage) => (
          <Panel title={stage} key={stage}>
            <div className="prospect-stack">
              {prospects
                .filter((prospect) => prospect.status === stage)
                .map((prospect) => (
                  <article
                    className={selected.name === prospect.name ? "prospect-card active" : "prospect-card"}
                    key={prospect.name}
                    onClick={() => setSelected(prospect)}
                  >
                    <strong>{prospect.name}</strong>
                    <small>{prospect.phone}</small>
                    <p>{prospect.need}</p>
                    <span><MapPin size={14} /> {prospect.district}</span>
                    <span><Wallet size={14} /> {prospect.budget}</span>
                    <div>
                      <Avatar name={prospect.agent} />
                      <small>{prospect.agent}</small>
                    </div>
                    <button onClick={(event) => { event.stopPropagation(); onAction(prospect.next); }}>{prospect.next}</button>
                  </article>
                ))}
            </div>
          </Panel>
        ))}
      </div>
      <ProspectProfilePanel prospect={selected} onAction={onAction} />
    </section>
  );
}

function ProspectProfilePanel({ prospect, onAction }) {
  const suggestedProperties = Array.from(
    new Map(
      properties
        .filter((property) => normalizeSearch(`${property.type} ${property.district}`).includes(normalizeSearch(prospect.need.split(" ")[0])) || normalizeSearch(property.district).includes(normalizeSearch(prospect.district.split(" ")[0])))
        .concat(properties.slice(0, 2))
        .map((property) => [property.code, property])
    ).values()
  ).slice(0, 3);
  const prospectVisits = visits.filter((visit) => visit.client === prospect.name);

  return (
    <Panel title="Fiche prospect" className="profile-panel prospect-profile">
      <ProfileHeader person={{ name: prospect.name, phone: prospect.phone, id: prospect.status }} />
      <DetailMetrics
        items={[
          ["Statut", prospect.status],
          ["Agent", prospect.agent],
          ["Budget", prospect.budget],
          ["Objectif", prospect.need.includes("Bureau") ? "Location pro" : "Location"],
          ["Délai", "30 jours"],
        ]}
      />
      <div className="simple-list">
        <p><span>Téléphone</span><strong>{prospect.phone}</strong></p>
        <p><span>Besoin immobilier</span><strong>{prospect.need}</strong></p>
        <p><span>Budget</span><strong>{prospect.budget}</strong></p>
        <p><span>Quartiers souhaités</span><strong>{prospect.district}</strong></p>
        <p><span>Agent responsable</span><strong>{prospect.agent}</strong></p>
        <p><span>Statut commercial</span><Badge label={prospect.status} /></p>
        <p><span>Prochaine action</span><strong>{prospect.next}</strong></p>
      </div>
      <div className="profile-section">
        <h3>Biens proposés</h3>
        <div className="mini-list">
          {suggestedProperties.map((property) => (
            <p key={property.code}><span>{property.name}</span><Badge label={property.status} /></p>
          ))}
        </div>
      </div>
      <div className="profile-section">
        <h3>Visites effectuées</h3>
        <div className="mini-list">
          {(prospectVisits.length ? prospectVisits : visits.slice(0, 1)).map((visit) => (
            <p key={`${visit.client}-${visit.date}`}><span>{visit.date} · {visit.property}</span><Badge label={visit.status} /></p>
          ))}
        </div>
      </div>
      <div className="timeline compact-timeline">
        <p><strong>Échange commercial</strong><span>{prospect.next}</span></p>
        <p><strong>Commentaire</strong><span>Besoin suivi par {prospect.agent}</span></p>
      </div>
      <div className="stack-actions">
        <Button onClick={() => onAction("Modifier besoin prospect")}><Pencil size={17} /> Modifier besoin</Button>
        <Button onClick={() => onAction("Proposer un bien")}><Home size={17} /> Proposer bien</Button>
        <Button variant="primary" onClick={() => onAction(prospect.next)}><Phone size={17} /> Prochaine action</Button>
        <Button onClick={() => onAction("Planifier une visite")}><CalendarDays size={17} /> Planifier visite</Button>
        <Button onClick={() => onAction("Ajouter commentaire prospect")}><FileText size={17} /> Commentaire</Button>
        <Button onClick={() => onAction("Changer statut prospect")}><RefreshCw size={17} /> Changer statut</Button>
        <Button onClick={() => onAction("Convertir prospect")}><CheckCircle2 size={17} /> Convertir</Button>
      </div>
    </Panel>
  );
}

function VisitsView({ onAction }) {
  const [selected, setSelected] = useState(visits[0]);
  return (
    <section className="master-detail" data-demo="visits-workspace">
      <Panel title="Visites programmées et réalisées" toolbar={<Button compact onClick={() => onAction("Planifier une visite")}><Plus size={16} /> Planifier</Button>}>
        <DataTable
          columns={["Date & heure", "Prospect / client", "Bien", "Agent", "Statut", "Retour client", "Prochaine action", "Action"]}
          rows={visits.map((visit) => [
            `${visit.date} · ${visit.time}`,
            visit.client,
            visit.property,
            visit.agent,
            <Badge label={visit.status} />,
            visit.feedback,
            visit.next,
            <Button compact onClick={() => setSelected(visit)}><Eye size={15} /> Fiche</Button>,
          ])}
        />
      </Panel>
      <VisitProfilePanel visit={selected} onAction={onAction} />
    </section>
  );
}

function VisitProfilePanel({ visit, onAction }) {
  const property = properties.find((item) => item.name === visit.property) ?? properties[0];
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
        <p><span>Lieu de rendez-vous</span><strong>{property.address}</strong></p>
        <p><span>Statut</span><Badge label={visit.status} /></p>
        <p><span>Retour client</span><strong>{visit.feedback}</strong></p>
        <p><span>Décision</span><strong>{visit.status === "Client intéressé" ? "Convertir en contrat" : "Suivi commercial"}</strong></p>
        <p><span>Prochaine action</span><strong>{visit.next}</strong></p>
        <p><span>Commentaires internes</span><strong>Suivi par {visit.agent}</strong></p>
      </div>
      <div className="stack-actions">
        <Button onClick={() => onAction("Modifier date visite")}><Pencil size={17} /> Modifier date</Button>
        <Button onClick={() => onAction("Changer agent visite")}><UserCog size={17} /> Changer agent</Button>
        <Button onClick={() => onAction("Annuler visite")}><XCircle size={17} /> Annuler</Button>
        <Button onClick={() => onAction("Marquer visite réalisée")}><CheckCircle2 size={17} /> Réalisée</Button>
        <Button onClick={() => onAction("Retour client visite")}><FileText size={17} /> Retour client</Button>
        <Button onClick={() => onAction("Créer relance visite")}><Bell size={17} /> Relance</Button>
        <Button variant="primary" onClick={() => onAction(visit.status === "Client intéressé" ? "Créer contrat" : visit.next)}>
          <CheckCircle2 size={17} /> {visit.status === "Client intéressé" ? "Convertir" : "Traiter"}
        </Button>
        <Button onClick={() => onAction("Reporter visite")}><CalendarDays size={17} /> Reporter</Button>
      </div>
    </Panel>
  );
}

function ContractsPage({ activeTab, onTab, onAction }) {
  const tabs = ["Contrats", "Génération de document", "Factures & reçus"];
  return (
    <>
      <PageIntro
        title="Contrats & documents"
        actions={
          <Button variant="primary" onClick={() => onAction("Créer contrat")}>
            <Plus size={18} /> Créer contrat
          </Button>
        }
      />
      <Tabs tabs={tabs} active={activeTab} onChange={onTab} demo="contract-tabs" />
      {activeTab === "Contrats" && <ContractsList onAction={onAction} />}
      {activeTab === "Génération de document" && <DocumentGeneration onAction={onAction} />}
      {activeTab === "Factures & reçus" && <InvoicesView onAction={onAction} />}
    </>
  );
}

function ContractsList({ onAction }) {
  const [selected, setSelected] = useState(contracts[0]);

  return (
    <>
      <Panel className="filter-panel">
        <div className="filters-row">
          <label className="field search-field">
            <Search size={19} />
            <input placeholder="Rechercher un contrat, bien, propriétaire..." />
          </label>
          <select><option>Type</option><option>Contrat de location</option><option>Mandat de gestion</option></select>
          <select><option>Statut</option><option>Actif</option><option>Expiré</option><option>Archivé</option></select>
          <select><option>Bien</option>{properties.map((property) => <option key={property.code}>{property.name}</option>)}</select>
          <select><option>Propriétaire</option>{owners.map((owner) => <option key={owner.id}>{owner.name}</option>)}</select>
          <select><option>Locataire</option>{tenants.map((tenant) => <option key={tenant.id}>{tenant.name}</option>)}</select>
          <select><option>Échéance</option><option>Cette semaine</option><option>Ce mois</option><option>Cette année</option></select>
          <Button><Filter size={17} /> Filtres</Button>
        </div>
      </Panel>
      <section className="master-detail" data-demo="contracts-workspace">
        <Panel title="Liste des contrats">
          <DataTable
            columns={["Numéro contrat", "Type", "Bien", "Propriétaire", "Locataire / client", "Date début", "Date fin", "Statut", "Échéance", "Action"]}
            rows={contracts.map((contract) => [
              contract.number,
              contract.type,
              contract.property,
              contract.owner,
              contract.client,
              contract.start,
              contract.end,
              <Badge label={contract.status} />,
              getContractDueLabel(contract),
              <Button compact onClick={() => setSelected(contract)}><Eye size={16} /> Fiche</Button>,
            ])}
          />
        </Panel>
        <ContractProfilePanel contract={selected} onAction={onAction} />
      </section>
    </>
  );
}

function ContractProfilePanel({ contract, onAction }) {
  const financials = getContractFinancials(contract);
  const property = properties.find((item) => item.name === contract.property);
  const tenant = tenants.find((item) => item.name === contract.client);
  const directOwnerCollection = property && !isAgencyCollectedProperty(property.name);

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
        <p><span>Bien</span><strong>{contract.property}</strong></p>
        <p><span>Dates</span><strong>{contract.start} - {contract.end}</strong></p>
        <p><span>Montant</span><strong>{financials.amount}</strong></p>
        <p><span>Mode financier</span><strong>{property?.financialMode ?? "À définir"}</strong></p>
        <p><span>Caution</span><strong>{financials.deposit}</strong></p>
        <p><span>Commission</span><strong>{financials.commission}</strong></p>
        <p><span>Statut</span><Badge label={contract.status} /></p>
        <p><span>Document signé</span><Badge label="Archivé" /></p>
        <p><span>Échéance</span><strong>{getContractDueLabel(contract)}</strong></p>
      </div>
      {directOwnerCollection && (
        <div className="notice">
          Encaissement direct propriétaire : le contrat reste suivi par EK IMMO, mais les loyers ne sont pas ajoutés aux paiements agence à collecter.
        </div>
      )}
      <div className="profile-section">
        <h3>Échéances</h3>
        <div className="mini-list">
          <p><span>Prochain loyer</span><strong>{tenant ? tenant.rent : financials.amount}</strong></p>
          <p><span>Fin du contrat</span><strong>{contract.end}</strong></p>
          <p><span>Alerte</span><Badge label={contract.number === "CON-2025-088" ? "À valider" : "Planifié"} /></p>
        </div>
      </div>
      <div className="timeline compact-timeline">
        <p><strong>Contrat créé</strong><span>{contract.start} · {contract.owner}</span></p>
        <p><strong>Document signé archivé</strong><span>{contract.number} · PDF disponible</span></p>
        <p><strong>Dernière vérification</strong><span>{property?.status ?? "Actif"} · fiche bien liée</span></p>
      </div>
      <div className="stack-actions">
        <Button variant="primary" onClick={() => onAction(`Modifier ${contract.number}`)}><Pencil size={17} /> Modifier</Button>
        <Button onClick={() => onAction(`Renouveler ${contract.number}`)}><RefreshCw size={17} /> Renouveler</Button>
        <Button onClick={() => onAction(`Résilier ${contract.number}`)}><XCircle size={17} /> Résilier</Button>
        <Button onClick={() => onAction(`Télécharger ${contract.number}`)}><Download size={17} /> PDF</Button>
        <Button onClick={() => onAction(`Imprimer ${contract.number}`)}><Printer size={17} /> Imprimer</Button>
        <Button onClick={() => onAction(`Joindre contrat signé ${contract.number}`)}><Upload size={17} /> Contrat signé</Button>
        <Button onClick={() => onAction(`Archiver ${contract.number}`)}><Archive size={17} /> Archiver</Button>
        <Button onClick={() => onAction(`Voir fiche bien ${contract.property}`)}><Home size={17} /> Voir fiche bien</Button>
        <Button onClick={() => onAction(`Voir fiche propriétaire ${contract.owner}`)}><UserRound size={17} /> Voir propriétaire</Button>
        <Button onClick={() => onAction(`Voir fiche locataire ${contract.client}`)}><UsersRound size={17} /> Voir locataire</Button>
      </div>
    </Panel>
  );
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

function DocumentGeneration({ onAction }) {
  return (
    <DocumentStudio
      initialTemplate="facture"
      title="Atelier de génération documentaire"
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

function InvoicesView({ onAction }) {
  const [selected, setSelected] = useState(invoices[0]);
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
        <div className="document-list">
          {invoices.map((invoice) => (
            <button className={selected.number === invoice.number ? "active" : ""} key={invoice.number} onClick={() => setSelected(invoice)}>
              <span>
                <strong>{invoice.number}</strong>
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
          invoice: selected,
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

function DocumentStudio({ initialTemplate = "facture", lockedTemplate, title, data, onAction }) {
  const [templateKey, setTemplateKey] = useState(lockedTemplate ?? initialTemplate);

  useEffect(() => {
    setTemplateKey(lockedTemplate ?? initialTemplate);
  }, [initialTemplate, lockedTemplate]);

  const template = documentTemplates.find((item) => item.key === templateKey) ?? documentTemplates[0];
  const relatedFiles = getRelatedDocumentFiles(template.key);

  return (
    <section className={lockedTemplate ? "document-studio locked" : "document-studio"} data-demo="document-generation">
      {!lockedTemplate && (
        <Panel title="Modèles EK IMMO">
          <div className="template-list">
            {documentTemplates.map((item) => (
              <button className={template.key === item.key ? "active" : ""} key={item.key} onClick={() => setTemplateKey(item.key)}>
                <FileText size={17} />
                <span>
                  <strong>{item.label}</strong>
                  <small>{item.source}</small>
                </span>
              </button>
            ))}
          </div>
        </Panel>
      )}

      <Panel title={title}>
        <FillableDocument template={template} data={data} />
        <div className="action-row compact-row">
          <Button variant="primary" onClick={() => onAction(`Générer ${template.label}`)}><Download size={17} /> Générer PDF</Button>
          <Button onClick={() => onAction(`Imprimer ${template.label}`)}><Printer size={17} /> Imprimer</Button>
          <Button onClick={() => onAction(`Archiver ${template.label}`)}><Archive size={17} /> Archiver</Button>
        </div>
      </Panel>

      <Panel title="Sources">
        <div className="document-source-card">
          <img src={ekimmoAssets.logo} alt="EK IMMO" />
          <p><span>Modèle actif</span><strong>{template.label}</strong></p>
          <p><span>Format</span><strong>{template.format}</strong></p>
          <p><span>Fichier</span><strong>{template.source}</strong></p>
          <a href={template.file} target="_blank" rel="noreferrer">
            <Eye size={16} /> Ouvrir le modèle original
          </a>
        </div>
        {relatedFiles.length > 0 && (
          <div className="document-links">
            {relatedFiles.map((file) => (
              <a href={file.href} target="_blank" rel="noreferrer" key={file.href}>
                <Download size={15} /> {file.label}
              </a>
            ))}
          </div>
        )}
      </Panel>
    </section>
  );
}

function FillableDocument({ template, data }) {
  const defaults = useMemo(() => getDocumentDefaults(template.key, data), [template.key, data]);
  const [values, setValues] = useState(defaults);

  useEffect(() => {
    setValues(defaults);
  }, [defaults]);

  const updateField = (name, value) => {
    setValues((current) => ({ ...current, [name]: value }));
  };

  if (template.key === "bail") {
    return <FillableBail values={values} onChange={updateField} />;
  }

  return (
    <div className={`fillable-document digital ${template.key}`}>
      {template.key === "recu" && <DigitalReceipt values={values} onChange={updateField} />}
      {template.key === "bordereau" && <DigitalCommissionStatement values={values} onChange={updateField} />}
      {template.key === "facture" && <DigitalInvoice values={values} onChange={updateField} />}
    </div>
  );
}

function DigitalDocumentHeader({ title, subtitle, children }) {
  return (
    <header className="digital-doc-header">
      <img src={ekimmoAssets.logo} alt="EK IMMO" />
      <div className="company-info">
        <strong>EK IMMO SAS</strong>
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

function DigitalField({ name, label, values, onChange, multiline = false, className = "", hideLabel = false }) {
  const fieldClass = `digital-field ${className} ${hideLabel ? "hide-label" : ""}`.trim();

  return (
    <label className={fieldClass}>
      <span className={hideLabel ? "sr-only" : ""}>{label}</span>
      {multiline ? (
        <textarea value={values[name] ?? ""} onChange={(event) => onChange(name, event.target.value)} />
      ) : (
        <input value={values[name] ?? ""} onChange={(event) => onChange(name, event.target.value)} />
      )}
    </label>
  );
}

function DigitalCheck({ name, label, values, onChange }) {
  return (
    <label className="digital-check">
      <input type="checkbox" checked={Boolean(values[name])} onChange={(event) => onChange(name, event.target.checked)} />
      <span>{label}</span>
    </label>
  );
}

function DigitalInvoice({ values, onChange }) {
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
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><DigitalField name="designation" label="Désignation" values={values} onChange={onChange} multiline hideLabel /></td>
              <td><DigitalField name="loyer" label="Loyer mensuel" values={values} onChange={onChange} hideLabel /></td>
              <td><DigitalField name="quantite" label="Quantité" values={values} onChange={onChange} hideLabel /></td>
              <td><DigitalField name="montant" label="Montant" values={values} onChange={onChange} hideLabel /></td>
            </tr>
          </tbody>
        </table>
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
        <div><span>EK IMMO</span><strong>Cachet & signature</strong></div>
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
      </section>

      <section className="digital-box">
        <h4>Objet de l'encaissement</h4>
        <DigitalField name="objet" label="Objet" values={values} onChange={onChange} multiline hideLabel />
      </section>

      <section className="digital-grid two">
        <DigitalField name="lieu" label="Lieu" values={values} onChange={onChange} />
        <DigitalField name="agent" label="Agent EK IMMO" values={values} onChange={onChange} />
      </section>

      <section className="signature-grid">
        <div><span>Bénéficiaire</span><strong>Signature</strong></div>
        <div><span>EK IMMO</span><strong>Signature & cachet</strong></div>
      </section>
    </div>
  );
}

function DigitalCommissionStatement({ values, onChange }) {
  const rows = [
    ["locataire1", "periode1", "encaisse1", "taux1", "commission1"],
    ["locataire2", "periode2", "encaisse2", "taux2", "commission2"],
    ["locataire3", "periode3", "encaisse3", "taux3", "commission3"],
  ];

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
              <th>Commission EK IMMO</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([client, period, collected, rate, commission], index) => (
              <tr key={client}>
                <td><DigitalField name={client} label={`Locataire ${index + 1}`} values={values} onChange={onChange} hideLabel /></td>
                <td><DigitalField name={period} label={`Période ${index + 1}`} values={values} onChange={onChange} hideLabel /></td>
                <td><DigitalField name={collected} label={`Montant ${index + 1}`} values={values} onChange={onChange} hideLabel /></td>
                <td><DigitalField name={rate} label={`Taux ${index + 1}`} values={values} onChange={onChange} hideLabel /></td>
                <td><DigitalField name={commission} label={`Commission ${index + 1}`} values={values} onChange={onChange} hideLabel /></td>
              </tr>
            ))}
          </tbody>
        </table>
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

function FillableBail({ values, onChange }) {
  const fields = [
    ["bailleur", "Bailleur"],
    ["locataire", "Locataire"],
    ["bien", "Bien loué"],
    ["adresse", "Adresse"],
    ["loyer", "Loyer mensuel"],
    ["caution", "Dépôt de garantie"],
    ["date", "Date de signature"],
  ];

  return (
    <div className="fillable-document digital bail">
      <div className="digital-page lease-page">
        <DigitalDocumentHeader title="Contrat de bail" subtitle="Usage d'habitation" />
        <div className="contract-fields">
          {fields.map(([name, label]) => (
            <DigitalField name={name} label={label} values={values} onChange={onChange} key={name} />
          ))}
          <DigitalField className="full" name="conditions" label="Conditions particulières" values={values} onChange={onChange} multiline />
        </div>
        <section className="lease-clauses">
          <h4>Clauses principales</h4>
          <p>Le bailleur met à disposition le bien désigné ci-dessus. Le locataire s'engage à respecter les conditions d'occupation, de paiement et d'entretien convenues.</p>
          <p>Les paiements sont suivis par EK IMMO et les justificatifs sont archivés dans le dossier numérique du bien.</p>
        </section>
        <section className="signature-grid">
          <div><span>Bailleur</span><strong>Lu et approuvé</strong></div>
          <div><span>Locataire</span><strong>Lu et approuvé</strong></div>
          <div><span>EK IMMO</span><strong>Cachet agence</strong></div>
        </section>
      </div>
    </div>
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
      total: "16 599 920",
      totalCommission: "1 659 992",
      netProprietaire: "14 939 928",
      observations: "Bordereau préparé pour validation propriétaire et reversement trimestriel EK IMMO.",
    };
  }

  if (key === "bail") {
    return {
      bailleur: owner.name,
      locataire: tenant.name,
      bien: property.name,
      adresse: property.address,
      loyer: `${property.price} ${property.period}`,
      caution: property.deposit,
      date: "05/06/2026",
      conditions: "Paiement au plus tard le 05 de chaque mois. Caution conservée selon l'état des lieux contradictoire.",
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
        <p><strong>Document généré</strong><span>{invoice.date} · EK IMMO</span></p>
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

function FinancePage({ activeTab, onTab, onAction }) {
  const tabs = ["Loyers", "Paiements", "Impayés", "Factures & reçus", "Commissions", "Charges", "Entretiens", "Reversements"];
  const agencyRentRows = getAgencyRentRows();

  return (
    <>
      <PageIntro
        title="Finance métier"
      />
      <Tabs tabs={tabs} active={activeTab} onChange={onTab} demo="finance-tabs" />
      {activeTab === "Loyers" && <FinanceTable title="Loyers attendus par EK IMMO" rows={agencyRentRows.map((row) => [row.period, row.tenant, row.property, row.owner, row.expected, row.paid, row.balance, <Badge label={row.status} />, <RentActions row={row} onAction={onAction} />])} columns={["Période", "Locataire", "Bien", "Propriétaire", "Attendu", "Payé", "Solde", "Statut", "Actions"]} />}
      {activeTab === "Paiements" && <PaymentForm onAction={onAction} />}
      {activeTab === "Impayés" && <ArrearsView onAction={onAction} />}
      {activeTab === "Factures & reçus" && <InvoicesView onAction={onAction} />}
      {activeTab === "Commissions" && <CommissionsView onAction={onAction} />}
      {activeTab === "Charges" && <ChargesView onAction={onAction} />}
      {activeTab === "Entretiens" && <MaintenancesView onAction={onAction} />}
      {activeTab === "Reversements" && <ReversalsView onAction={onAction} />}
    </>
  );
}

function RentActions({ row, onAction }) {
  return (
    <div className="table-actions">
      <Button compact onClick={() => onAction(`Paiement ${row.tenant}`)}><Banknote size={15} /> Paiement</Button>
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

function FinanceTable({ title, columns, rows }) {
  return (
    <>
      <Panel className="filter-panel">
        <div className="filters-row">
          <label className="field search-field">
            <Search size={19} />
            <input placeholder="Rechercher..." />
          </label>
          <select><option>Période : Mai 2026</option><option>Juin 2026</option><option>Trimestre</option></select>
          <Button><Filter size={17} /> Filtres</Button>
          <Button><Download size={17} /> Exporter</Button>
        </div>
      </Panel>
      <Panel title={title}>
        <DataTable columns={columns} rows={rows} />
      </Panel>
    </>
  );
}

function CommissionsView({ onAction }) {
  const [selected, setSelected] = useState(commissions[0]);

  return (
    <section className="master-detail">
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
              <Button compact onClick={() => setSelected(row)}><Eye size={16} /> Fiche</Button>,
            ])}
            columns={["Opération", "Bien", "Propriétaire", "Montant encaissé", "Mode", "Commission", "Net propriétaire", "Statut", "Action"]}
          />
        </Panel>
      </div>
      <CommissionProfilePanel commission={selected} onAction={onAction} />
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

function ChargesView({ onAction }) {
  const [selected, setSelected] = useState(charges[0]);

  return (
    <section className="master-detail" data-demo="charges-workspace">
      <Panel title="Charges enregistrées">
        <DataTable
          columns={["Date", "Type", "Bien", "Propriétaire", "Montant", "Prise en charge", "Justificatif", "Statut", "Action"]}
          rows={charges.map((row) => [
            row.date,
            row.type,
            row.property,
            row.owner,
            row.amount,
            row.payer,
            row.proof,
            <Badge label={row.status} />,
            <Button compact onClick={() => setSelected(row)}><Eye size={16} /> Fiche</Button>,
          ])}
        />
      </Panel>
      <ChargeProfilePanel charge={selected} onAction={onAction} />
    </section>
  );
}

function ChargeProfilePanel({ charge, onAction }) {
  const property = getPropertyByName(charge.property) ?? properties[0];

  return (
    <Panel title="Fiche charge" className="profile-panel">
      <ProfileHeader person={{ name: charge.type, id: charge.property }} />
      <DetailMetrics
        items={[
          ["Montant", charge.amount],
          ["Prise en charge", charge.payer],
          ["Statut", charge.status],
          ["Bien", charge.property],
        ]}
      />
      <div className="simple-list">
        <p><span>Date</span><strong>{charge.date}</strong></p>
        <p><span>Type de dépense</span><strong>{charge.type}</strong></p>
        <p><span>Description</span><strong>Dépense liée à {charge.property}</strong></p>
        <p><span>Bien concerné</span><strong>{charge.property}</strong></p>
        <p><span>Adresse</span><strong>{property.address}</strong></p>
        <p><span>Propriétaire</span><strong>{charge.owner}</strong></p>
        <p><span>Locataire concerné</span><strong>{property.tenant}</strong></p>
        <p><span>Montant</span><strong>{charge.amount}</strong></p>
        <p><span>Prise en charge</span><strong>{charge.payer}</strong></p>
        <p><span>Justificatif</span><strong>{charge.proof}</strong></p>
        <p><span>Statut</span><Badge label={charge.status} /></p>
        <p><span>Période</span><strong>Mai 2026</strong></p>
      </div>
      <div className="timeline compact-timeline">
        <p><strong>Observation</strong><span>Dépense rattachée au bien et visible dans la situation propriétaire.</span></p>
        <p><strong>Contrôle</strong><span>Vérifier la prise en charge avant reversement propriétaire.</span></p>
      </div>
      <div className="stack-actions">
        <Button onClick={() => onAction("Créer charge")}><Plus size={17} /> Créer charge</Button>
        <Button variant="primary" onClick={() => onAction(`Modifier charge ${charge.type}`)}><Pencil size={17} /> Modifier</Button>
        <Button onClick={() => onAction(`Ajouter justificatif ${charge.type}`)}><Upload size={17} /> Justificatif</Button>
        <Button onClick={() => onAction(`Affecter charge à un bien`)}><Home size={17} /> Affecter bien</Button>
        <Button onClick={() => onAction(`Affecter charge à un propriétaire`)}><UserRound size={17} /> Affecter propriétaire</Button>
        <Button onClick={() => onAction(`Lier charge à entretien`)}><Wrench size={17} /> Lier entretien</Button>
        <Button onClick={() => onAction(`Valider charge ${charge.type}`)}><CheckCircle2 size={17} /> Valider</Button>
        <Button onClick={() => onAction(`Intégrer charge situation propriétaire`)}><HandCoins size={17} /> Situation</Button>
        <Button onClick={() => onAction(`Archiver charge ${charge.type}`)}><Archive size={17} /> Archiver</Button>
      </div>
    </Panel>
  );
}

function MaintenancesView({ onAction }) {
  const [selected, setSelected] = useState(maintenances[0]);

  return (
    <section className="master-detail">
      <Panel title="Entretiens prévus ou réalisés">
        <DataTable
          columns={["Bien", "Type", "Date prévue", "Responsable", "Coût estimé", "Coût réel", "Prise en charge", "Justificatif", "Statut", "Action"]}
          rows={maintenances.map((row) => [
            row.property,
            row.type,
            row.date,
            row.manager,
            row.cost,
            row.status === "En cours" ? "À confirmer" : row.cost,
            row.payer,
            "Justificatif à joindre",
            <Badge label={row.status} />,
            <Button compact onClick={() => setSelected(row)}><Eye size={16} /> Fiche</Button>,
          ])}
        />
      </Panel>
      <MaintenanceProfilePanel maintenance={selected} onAction={onAction} />
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
        <p><span>Prestataire</span><strong>Prestataire local agréé</strong></p>
        <p><span>Date prévue</span><strong>{maintenance.date}</strong></p>
        <p><span>Date réalisée</span><strong>{maintenance.status === "Terminé" ? maintenance.date : "À confirmer"}</strong></p>
        <p><span>Coût estimé</span><strong>{maintenance.cost}</strong></p>
        <p><span>Coût réel</span><strong>{maintenance.status === "En cours" ? "À confirmer" : maintenance.cost}</strong></p>
        <p><span>Prise en charge</span><strong>{maintenance.payer}</strong></p>
        <p><span>Justificatif</span><Badge label="À valider" /></p>
        <p><span>Observations</span><strong>{maintenance.note}</strong></p>
        <p><span>Statut</span><Badge label={maintenance.status} /></p>
      </div>
      <div className="stack-actions">
        <Button variant="primary" onClick={() => onAction(`Planifier ${maintenance.type}`)}><CalendarDays size={17} /> Planifier</Button>
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

function ReversalsView({ onAction }) {
  const [selected, setSelected] = useState(reversals[0]);

  return (
    <section className="master-detail" data-demo="reversals-workspace">
      <Panel title="Reversements propriétaires">
        <DataTable
          columns={["Propriétaire", "Loyers encaissés", "Commissions", "Charges", "Déjà reversé", "Solde", "Statut", "Action"]}
          rows={reversals.map((row) => [
            row.owner,
            row.collected,
            row.commission,
            row.charges,
            row.paid,
            row.balance,
            <Badge label={row.status} />,
            <Button compact onClick={() => setSelected(row)}><Eye size={16} /> Fiche</Button>,
          ])}
        />
      </Panel>
      <ReversalProfilePanel reversal={selected} onAction={onAction} />
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
        <p><span>Période concernée</span><strong>Mai 2026</strong></p>
        <p><span>Loyers encaissés</span><strong>{reversal.collected}</strong></p>
        <p><span>Commissions</span><strong>{reversal.commission}</strong></p>
        <p><span>Charges</span><strong>{reversal.charges}</strong></p>
        <p><span>Montant net à reverser</span><strong>{reversal.balance}</strong></p>
        <p><span>Montant payé</span><strong>{reversal.paid}</strong></p>
        <p><span>Mode de paiement</span><strong>Virement</strong></p>
        <p><span>Référence</span><strong>REV-2026-051</strong></p>
        <p><span>Justificatif</span><Badge label="À valider" /></p>
        <p><span>Observation</span><strong>État propriétaire généré</strong></p>
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

function PaymentForm({ onAction }) {
  const [selected, setSelected] = useState(paymentRecords[1]);
  const agencyProperties = properties.filter((property) => isAgencyCollectedProperty(property.name));
  const paymentRows = paymentRecords.filter((payment) => isAgencyCollectedProperty(payment.property));

  return (
    <section className="payment-layout" data-demo="payment-workspace">
      <Panel title="Enregistrer un paiement">
        <div className="form-grid">
          <label>Locataire<select>{tenants.map((tenant) => <option key={tenant.id}>{tenant.name}</option>)}</select></label>
          <label>Bien<select>{agencyProperties.map((property) => <option key={property.code}>{property.name}</option>)}</select></label>
          <label>Propriétaire<select>{owners.map((owner) => <option key={owner.id}>{owner.name}</option>)}</select></label>
          <label>Période<input defaultValue="Mai 2026" /></label>
          <label>Montant dû<input defaultValue="850 000 FCFA" /></label>
          <label>Montant payé<input defaultValue="450 000 FCFA" /></label>
          <label>Solde automatique<input defaultValue="400 000 FCFA" readOnly /></label>
          <label>Mode de paiement<select>{paymentModes.map((mode) => <option key={mode}>{mode}</option>)}</select></label>
          <label>Référence paiement<input defaultValue="OM-250528-118" /></label>
          <label>Date paiement<input defaultValue="28/05/2026" /></label>
          <label className="full">Observations<textarea defaultValue="Paiement partiel reçu via Orange Money. Relance prévue pour le solde." /></label>
        </div>
        <div className="action-row compact-row">
          <Button variant="primary" onClick={() => onAction("Paiement enregistré")}><CheckCircle2 size={17} /> Valider</Button>
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

function ArrearsView({ onAction }) {
  const rows = getAgencyRentRows().filter((row) => row.status === "Partiel" || row.status === "Impayé");
  const [selected, setSelected] = useState(rows[0]);

  return (
    <section className="master-detail">
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
            <div className="table-actions"><Button compact onClick={() => setSelected(row)}><Eye size={15} /> Fiche</Button><Button compact onClick={() => onAction("Ajouter relance")}>Relancer</Button></div>,
          ])}
        />
      </Panel>
      <ArrearsProfilePanel row={selected} onAction={onAction} />
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
        <Button onClick={() => onAction("Enregistrer paiement")}><Banknote size={17} /> Paiement</Button>
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

  return (
    <section className="master-detail" data-demo="admin-workspace">
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
              <Button compact onClick={() => setSelected(user)}><Eye size={15} /> Fiche</Button>
              <Button compact onClick={() => onAction("Modifier utilisateur")}><Pencil size={15} /> Modifier</Button>
              <Button compact onClick={() => onAction("Désactiver utilisateur")}><XCircle size={15} /> Désactiver</Button>
            </div>,
          ])}
        />
      </Panel>
      <UserProfilePanel user={selected} onAction={onAction} />
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
          <label>Nom de l'agence<input defaultValue="EK IMMO" /></label>
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
      title="Atelier des modèles EK IMMO"
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
          <img src={ekimmoAssets.logo} alt="EK IMMO" />
          <div>
            <strong>EK IMMO</strong>
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
      <div className="stat-icon">
        <Icon size={20} />
      </div>
      <span>{item.label}</span>
      <strong>{item.value}</strong>
    </article>
  );
}

function DashboardFilterBar({ period, onPeriod }) {
  return (
    <section className="dashboard-filter-bar">
      <Filter size={17} />
      <DashboardSelect value={period} onChange={onPeriod} options={periodOptions} ariaLabel="Période des blocs du dashboard" />
      {period === "Période personnalisée" && (
        <div className="custom-period">
          <input type="date" aria-label="Date de début" />
          <input type="date" aria-label="Date de fin" />
        </div>
      )}
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

function RentBars({ period }) {
  const source = rentBarsByIndicator["Loyers attendus"][period] ?? rentBarsByIndicator["Loyers attendus"].Mois;
  const target = rentTargetByPeriod[period] ?? rentTargetByPeriod.Mois;
  const bars = source.map(([label, value], index, items) => {
    const amount = Math.round((target * value) / 100);
    return {
      label,
      value,
      amount,
      amountLabel: formatCompactFCFA(amount),
      tone: index === items.length - 1 ? "active" : "soft",
    };
  });

  return (
    <div className="rent-chart">
      <div className="bars">
        {bars.map((bar) => (
          <button
            className="bar-button"
            key={bar.label}
            style={{ "--height": `${bar.value}%` }}
            aria-label={`${bar.label}: ${bar.amountLabel}`}
          >
            <i className={bar.tone} />
            <span className="chart-flyout">{bar.label}: {bar.amountLabel}</span>
          </button>
        ))}
      </div>
      <div className="months">
        {bars.map((bar) => (
          <span key={bar.label}>{bar.label}</span>
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

function Button({ children, variant = "secondary", compact = false, onClick }) {
  return (
    <button className={`button ${variant} ${compact ? "compact" : ""}`} onClick={onClick}>
      {children}
    </button>
  );
}

function Badge({ label }) {
  const tone = statusTone(label);
  return <span className={`badge ${tone}`}>{label}</span>;
}

function statusTone(label) {
  if (["Disponible", "Actif", "À jour", "Payé", "Conclu", "Archivé", "Imprimé", "Généré", "Réalisée"].includes(label)) return "success";
  if (["Loué", "Visite prévue", "Prévue", "Contacté", "Réservé", "Planifié", "À payer", "À reverser"].includes(label)) return "purple";
  if (["En travaux", "Partiel", "À valider", "À échéance", "En cours", "Reportée", "Relancé", "Client intéressé"].includes(label)) return "warning";
  if (["Impayé", "En retard", "Litige", "Perdu", "Suspendu"].includes(label)) return "danger";
  if (["Inactif", "Indisponible", "Vendu"].includes(label)) return "muted";
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
      <span className="profile-contact">
        <Mail size={15} /> {person.email}
      </span>
      <span className="profile-contact">
        <Phone size={15} /> {person.phone}
      </span>
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
                <td className={getCellClass(cell)} key={`${rowIndex}-${cellIndex}`}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function getCellClass(cell) {
  if (typeof cell !== "string") return undefined;

  const value = cell.trim();
  if (
    value.includes("FCFA") ||
    /^[A-Z]{2,}-\d{4}-\d{3}$/.test(value) ||
    /^\d{2}\/\d{2}\/\d{4}(\s+\d{2}:\d{2})?$/.test(value) ||
    /^\+?\d[\d\s]+$/.test(value)
  ) {
    return "nowrap-cell";
  }

  return undefined;
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

function ContractFormModal({ onClose }) {
  const [preview, setPreview] = useState(false);

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="modal-card wide-modal" role="dialog" aria-modal="true" onMouseDown={(event) => event.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>Créer contrat</h2>
        <p>Création à partir des biens, propriétaires et clients déjà enregistrés.</p>
        <div className="form-section">
          <h3>Contrat</h3>
          <div className="form-grid">
            <label>Type de contrat<select>{["Contrat de location", "Mandat de gestion", "Mandat de vente", "Promesse de vente", "Autre document contractuel"].map((item) => <option key={item}>{item}</option>)}</select></label>
            <label>Bien concerné<select>{properties.map((property) => <option key={property.code}>{property.name}</option>)}</select></label>
            <label>Propriétaire<select>{owners.map((owner) => <option key={owner.id}>{owner.name}</option>)}</select></label>
            <label>Locataire ou client<select>{[...tenants.map((tenant) => tenant.name), ...prospects.map((prospect) => prospect.name)].map((name) => <option key={name}>{name}</option>)}</select></label>
            <label>Date début<input defaultValue="01/06/2026" /></label>
            <label>Date fin<input defaultValue="31/05/2027" /></label>
            <label>Montant du loyer ou prix<input defaultValue="2 750 000 FCFA" /></label>
            <label>Caution<input defaultValue="5 500 000 FCFA" /></label>
            <label>Commission<input defaultValue="8%" /></label>
            <label>Modèle de contrat<select>{templates.map((template) => <option key={template}>{template}</option>)}</select></label>
            <label className="full">Conditions particulières<textarea defaultValue="Paiement au plus tard le 05 de chaque mois. Caution conservée selon l'état des lieux." /></label>
          </div>
        </div>
        {preview && (
          <div className="document-preview modal-preview">
            <strong>EK IMMO</strong>
            <h3>Contrat de location</h3>
            <p>Bien : Villa Koulouba</p>
            <p>Propriétaire : Mamadou Keita</p>
            <p>Locataire : Awa Traoré</p>
            <p>Montant : 2 750 000 FCFA</p>
          </div>
        )}
        <div className="action-row compact-row">
          <Button onClick={onClose}><Archive size={17} /> Enregistrer brouillon</Button>
          <Button onClick={() => setPreview(true)}><Eye size={17} /> Prévisualiser</Button>
          <Button variant="primary" onClick={onClose}><Download size={17} /> Générer PDF</Button>
          <Button onClick={onClose}><Archive size={17} /> Archiver</Button>
        </div>
      </section>
    </div>
  );
}

function PropertyFormModal({ title, onClose }) {
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="modal-card wide-modal" role="dialog" aria-modal="true" onMouseDown={(event) => event.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>{title}</h2>
        <div className="form-section">
          <h3>Informations générales</h3>
          <div className="form-grid compact-form">
            <label>Code du bien<input defaultValue="EKM-NEW-001" /></label>
            <label>Type de bien<select><option>Maison</option><option>Appartement</option><option>Villa</option><option>Terrain</option><option>Bureau</option><option>Boutique</option><option>Immeuble</option></select></label>
            <label>Nom ou désignation<input defaultValue="Nouveau bien" /></label>
            <label>Quartier<input defaultValue="ACI 2000, Bamako" /></label>
            <label className="full">Adresse détaillée<input defaultValue="Adresse complète du bien" /></label>
            <label className="full">Description<textarea defaultValue="Description du bien, de ses accès et de ses caractéristiques principales." /></label>
            <label>Statut<select><option>Disponible</option><option>Loué</option><option>Réservé</option><option>Vendu</option><option>En travaux</option><option>Indisponible</option></select></label>
            <label>Prix de location<input defaultValue="850 000 FCFA" /></label>
            <label>Prix de vente<input placeholder="Si applicable" /></label>
            <label>Montant de caution<input defaultValue="1 700 000 FCFA" /></label>
            <label>Commission applicable<input defaultValue="50% du loyer" /></label>
          </div>
        </div>
        <div className="form-section">
          <h3>Rattachement</h3>
          <div className="form-grid compact-form">
            <label>Propriétaire<select>{owners.map((owner) => <option key={owner.id}>{owner.name}</option>)}</select></label>
            <label>Locataire actuel<select><option>Libre</option>{tenants.map((tenant) => <option key={tenant.id}>{tenant.name}</option>)}</select></label>
            <label>Agent responsable<select><option>Aïssata Diarra</option><option>Mariam Traoré</option><option>Issa Maïga</option><option>Cheick Camara</option></select></label>
            <label>Mode de gestion financière<select><option>Encaissement par l'agence</option><option>Encaissement direct par le propriétaire</option></select></label>
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
        <div className="action-row compact-row">
          <Button variant="primary" onClick={onClose}><CheckCircle2 size={17} /> Enregistrer</Button>
          <Button onClick={onClose}>Enregistrer comme brouillon</Button>
          <Button onClick={onClose}>Ajouter propriétaire</Button>
          <Button onClick={onClose}>Annuler</Button>
        </div>
      </section>
    </div>
  );
}

function DemoModal({ title, onClose }) {
  const sensitive = isSensitiveAction(title);

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
      <strong>Ek-immo</strong>
      <span>© 2026 Ek-immo. Tous droits réservés. Gestion immobilière au Mali.</span>
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
