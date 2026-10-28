// Conteúdo institucional da DG Computer, reaproveitado do site atual (dgcomputer.com.br).

export const contato = {
  telefone: "(92) 99986-5111",
  telefoneHref: "tel:+5592999865111",
  whatsapp: "5592999865111",
  email: "info@dgcomputer.com.br",
  endereco: "Rua Apurinã, 56 - Centro",
  cidade: "Manaus - AM",
  cep: "69020-170",
  horario: "Segunda a sábado, das 8h às 18h",
  mapsQuery: "Rua Apurinã, 56 - Centro, Manaus - AM, 69020-170",
  redes: {
    instagram: "https://www.instagram.com/dg_computer/",
    facebook: "https://www.facebook.com/DG-Computer-108324987180672/",
    youtube: "https://www.youtube.com/channel/UC4seFlq4_2Is2Pb2VB8F57Q",
  },
} as const

export function whatsappLink(mensagem = "Olá! Gostaria de algumas informações - DG Computer") {
  return `https://api.whatsapp.com/send?phone=${contato.whatsapp}&text=${encodeURIComponent(mensagem)}`
}

export const navegacao = [
  { href: "/", label: "Início" },
  { href: "/sobre", label: "Sobre" },
  { href: "/historia", label: "História" },
  { href: "/produtos", label: "Produtos" },
  { href: "/loja", label: "Loja" },
  { href: "/faq", label: "FAQ" },
  { href: "/contato", label: "Contato" },
] as const

export const servicos = [
  {
    titulo: "Manutenção de computadores",
    resumo: "Manutenção preventiva e corretiva, upgrades e regravação de BIOS em desktops e notebooks.",
    imagem: "/images/manutencao/corretiva.jpg",
  },
  {
    titulo: "Suporte de TI",
    resumo: "Configuração e gerenciamento de computadores e redes, ethernet e wireless, para a sua empresa.",
    imagem: "/images/servicos/suporte-ti.jpg",
  },
  {
    titulo: "Consultoria de informática",
    resumo: "Serviços estratégicos de TI que ajudam no planejamento e na tomada de decisão.",
    imagem: "/images/servicos/consultoria.jpg",
  },
  {
    titulo: "PC Gamer",
    resumo: "Montagem de PC Gamer em diversas configurações e gerações, do básico ao topo de linha.",
    imagem: "/images/servicos/pc-gamer.jpg",
  },
] as const

export const manutencoes = [
  {
    titulo: "Upgrade de hardware",
    texto: "Troca de componentes como memória, SSD e processador para o seu computador render mais.",
    imagem: "/images/manutencao/upgrade.jpg",
  },
  {
    titulo: "Manutenção preventiva",
    texto: "Limpeza e revisão do equipamento antes que um defeito ou falha aconteça.",
    imagem: "/images/manutencao/preventiva.jpg",
  },
  {
    titulo: "Manutenção corretiva",
    texto: "O conserto: diagnóstico e correção depois que o computador já apresentou o problema.",
    imagem: "/images/manutencao/corretiva.jpg",
  },
  {
    titulo: "Regravação de BIOS",
    texto: "Recuperação do chip que guarda as instruções básicas de inicialização da placa-mãe.",
    imagem: "/images/manutencao/bios.jpg",
  },
] as const

export const diferenciais = [
  {
    titulo: "Qualidade",
    texto: "Equipe especializada, capaz de atender à sua necessidade de maneira eficiente.",
  },
  {
    titulo: "Redução de custos",
    texto: "Uma infraestrutura bem cuidada otimiza recursos e reduz a ociosidade da equipe.",
  },
  {
    titulo: "Agilidade",
    texto: "Profissionais com experiência, preparados para atender de imediato.",
  },
  {
    titulo: "Foco",
    texto: "Você cuida do seu negócio. A gente cuida dos computadores e da rede.",
  },
] as const

export const portfolio = [
  {
    nome: "Larifo Transportes",
    texto: "Site da Larifo, de Caibi-SC, que atua em transportes nacionais e internacionais.",
    imagem: "/images/portfolio/larifo.jpg",
    url: "http://www.larifo.com.br",
  },
  {
    nome: "Amazon Soccer",
    texto: "Site da escolinha de futebol Amazon Soccer, com sede em Manaus.",
    imagem: "/images/portfolio/amazon-soccer.jpg",
    url: "http://www.amazonsoccer.com.br",
  },
  {
    nome: "Oficina do Berg",
    texto: "Site da J.P. Manutenções, especializada em reparos automotivos há mais de 23 anos.",
    imagem: "/images/portfolio/oficina-berg.jpg",
    url: "http://www.oficinaberg.com.br",
  },
] as const
