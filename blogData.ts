
export interface BlogPost {
    id: string;
    date: string;
    image: string;
    translations: {
      pt: { title: string; excerpt: string; content: string[] };
      en: { title: string; excerpt: string; content: string[] };
    };
  }
  
  export const BLOG_POSTS: BlogPost[] = [
    {
      id: 'bionic-revolution',
      date: '15 MAR 2024',
      image: 'https://files.catbox.moe/ve30iy.png',
      translations: {
        pt: {
          title: 'A Revolução da Arquitetura Biónica: Porquê a Espiral?',
          excerpt: 'Descubra como a geometria do caracol otimiza a energia e o conforto térmico nas nossas Esculturas Habitacionais.',
          content: [
            'A natureza não usa linhas retas. Durante milhões de anos, a evolução aperfeiçoou formas que maximizam a resistência com o mínimo de material. A espiral do caracol é o exemplo máximo desta eficiência.',
            'Nas nossas casas "A Porta do Caracol", a forma espiral não é apenas estética. Ela cria um fluxo de ar natural que reduz a necessidade de climatização artificial em 60%.',
            'Viver numa estrutura biónica é reconectar-se com o ritmo biológico, onde a luz solar percorre as divisões de forma fluida, acompanhando o movimento da terra.'
          ]
        },
        en: {
          title: 'The Bionic Revolution: Why the Spiral?',
          excerpt: 'Discover how snail geometry optimizes energy and thermal comfort in our Inhabitable Sculptures.',
          content: [
            'Nature doesn\'t use straight lines. For millions of years, evolution has perfected shapes that maximize strength with minimal material. The snail\'s spiral is the ultimate example of this efficiency.',
            'In our "Snail Door" houses, the spiral shape is not just aesthetic. It creates a natural airflow that reduces the need for artificial climate control by 60%.',
            'Living in a bionic structure means reconnecting with your biological rhythm, where sunlight flows through rooms following the earth\'s movement.'
          ]
        }
      }
    },
    {
      id: 'sustainable-tech',
      date: '02 FEV 2024',
      image: 'https://files.catbox.moe/a9f0uq.png',
      translations: {
        pt: {
          title: 'Construção Passiva: O Poder do ISOCEL e Materiais Reciclados',
          excerpt: 'Como transformamos papel reciclado e cimento sustentável em casas que duram mais de 80 anos com pegada zero.',
          content: [
            'O segredo do nosso isolamento térmico reside no ISOCEL, uma fibra de papel reciclado que oferece uma resistência térmica superior à lã de rocha tradicional.',
            'Ao utilizar materiais reciclados, não só reduzimos o desperdício global, como criamos paredes que "respiram", evitando a humidade e garantindo um ar interior purificado.',
            'Aliado ao nosso sistema de gestão pluvial em ciclo fechado, cada módulo caracol funciona como um pequeno ecossistema independente e regenerativo.'
          ]
        },
        en: {
          title: 'Passive Construction: The Power of ISOCEL and Recycled Materials',
          excerpt: 'How we transform recycled paper and sustainable cement into homes that last 80+ years with zero footprint.',
          content: [
            'The secret to our thermal insulation lies in ISOCEL, a recycled paper fiber that offers thermal resistance superior to traditional rock wool.',
            'By using recycled materials, we not only reduce global waste but also create walls that "breathe", preventing humidity and ensuring purified indoor air.',
            'Combined with our closed-cycle rainwater management system, each snail module functions as a small independent and regenerative ecosystem.'
          ]
        }
      }
    },
    {
      id: 'art-of-living',
      date: '20 JAN 2024',
      image: 'https://i.imgur.com/szVWZnM.png',
      translations: {
        pt: {
          title: 'Viver numa Escultura: A Fusão entre Arte, Luxo e Funcionalidade',
          excerpt: 'Saiba por que a arquitetura modular biónica está a tornar-se a escolha preferida de colecionadores de arte e amantes da natureza.',
          content: [
            'Habitar a Arte significa que cada janela, cada curva e cada textura foi pensada para inspirar o habitante. Não é uma casa, é uma experiência sensorial contínua.',
            'Os nossos módulos permitem uma personalização total. Pode começar com um estúdio Caracol e expandir a sua escultura habitacional à medida que a sua família ou necessidades crescem.',
            'A iluminação Neon em tons âmbar, integrada nas nossas estruturas, transforma a casa numa obra de arte luminosa durante a noite, respeitando a escuridão natural do ambiente.'
          ]
        },
        en: {
          title: 'The Art of Living: Merging Art, Luxury, and Functionality',
          excerpt: 'Find out why bionic modular architecture is becoming the preferred choice for art collectors and nature lovers.',
          content: [
            'Inhabiting Art means that every window, every curve, and every texture was designed to inspire the dweller. It\'s not a house; it\'s a continuous sensory experience.',
            'Our modules allow for total customization. You can start with a Snail studio and expand your living sculpture as your family or needs grow.',
            'Amber-toned Neon lighting, integrated into our structures, transforms the house into a luminous work of art at night, respecting the environment\'s natural darkness.'
          ]
        }
      }
    }
  ];
  