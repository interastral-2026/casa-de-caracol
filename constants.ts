
import { ModuleDetail, ModuleKey, InfoCardData, SustainabilityItem } from './types';
import { IMAGE_ASSETS } from './imageAssets';

export const MODULE_DATA: Record<ModuleKey, ModuleDetail> = {
  jacuzzi: {
    title: "Jacuzzi Caracol Neon",
    texts: [
      "Uma obra de arte funcional inspirada na geometria sagrada do caracol. O fluxo espiral da água proporciona uma massagem natural e envolvente.",
      "Equipada com iluminação LED Neon em tom âmbar que realça as curvas orgânicas à noite. Utiliza materiais sustentáveis e um sistema de filtragem biológica que dispensa produtos químicos agressivos."
    ],
    images: IMAGE_ASSETS.modules.jacuzzi,
    hotspotTarget: "0m 1m 2m"
  },
  cozinha: {
    title: "Cozinha Criativa e Ecológica",
    texts: [
      "Espaço eficiente, saudável e amigo da natureza. Construída com cimento reciclado, gesso e design acolhedor.",
      "O coração da casa, cheio de aromas e calor, onde a sustentabilidade se encontra com a arte culinária."
    ],
    images: IMAGE_ASSETS.modules.cozinha,
    hotspotTarget: "1m 0.5m -4m"
  },
  wc: {
    title: "Casa de Banho Moderno e Sustentável",
    texts: [
      "Design minimalista com materiais reciclados, higiénico e relaxante.",
      "Integra sistemas de baixo consumo de água e a possibilidade de tratamento orgânico de águas cinzentas."
    ],
    images: IMAGE_ASSETS.modules.wc,
    hotspotTarget: "-1m 0.5m -2m"
  },
  pool: {
    title: "Piscina Natural com Energia Solar",
    texts: [
      "Um espelho d’água que reflete o céu e a arquitetura viva da casa.",
      "Piscina com design biônico construída com materiais reciclados. Filtragem por plantas, bombas de baixo consumo e aquecimento solar."
    ],
    images: IMAGE_ASSETS.modules.pool,
    hotspotTarget: "3m 0.5m 1m"
  },
  casa: {
    title: "Casa Caracol",
    texts: [
      "Ambiente criativo e relaxante, com materiais reciclados e arte natural.",
      "O design em espiral otimiza a luz natural e a ventilação, seguindo os padrões da natureza. É a sua Escultura Habitacional."
    ],
    images: IMAGE_ASSETS.modules.casa,
    hotspotTarget: "1m 0.5m 7m"
  },
  parede: {
    title: "Parede Artística",
    texts: [
      "Detalhes com textura natural e estética sustentável.",
      "Cada detalhe foi projetado para transmitir sensação de conforto e inspiração."
    ],
    images: IMAGE_ASSETS.modules.parede,
    hotspotTarget: "3m 0.5m 1m"
  },
  mesa: {
    title: "Mobiliário S-CARGO",
    texts: [
      "Espaço de convivência ecológico feito com materiais reciclados.",
      "Design artístico e materiais ecológicos integrados na vivência diária."
    ],
    images: IMAGE_ASSETS.modules.mesa,
    hotspotTarget: "1m 0.5m -4m"
  }
};

export const INFO_CARDS_LIST: InfoCardData[] = [
  { id: 'jacuzzi', video: '', title: 'Jacuzzi Caracol', description: 'Massagem natural e relaxamento profundo em espiral.' },
  { id: 'cozinha', video: '', title: 'Cozinha', description: 'Coração da casa, saudável e ecológico.' },
  { id: 'casa', video: '', title: 'Casa Caracol', description: 'O design em espiral que respira.' },
  { id: 'pool', video: '', title: 'Piscina', description: 'Espelho d’água com reflexos neon.' }
];

export const SUSTAINABILITY_SYSTEMS: SustainabilityItem[] = [
  {
    title: "ISOLAMENTO E MATERIAIS",
    subtitle: "ISOCEL — Papel reciclado",
    details: ["λ = 0.039 W/mK", "100% reciclável", "Aplicação por insuflação"],
    chartType: "bar"
  },
  {
    title: "SISTEMAS ENERGÉTICOS",
    subtitle: "SFI • Aerogeradores • PEDI",
    details: ["Painéis 21%+", "Monitorização App", "Baterias de Lítio"],
    chartType: "pie"
  },
  {
    title: "GESTÃO DA ÁGUA",
    subtitle: "Ciclo Fechado",
    details: ["Recolha Pluvial", "Filtragem Orgânica", "Jardim Biônico"],
    chartType: "line"
  }
];
