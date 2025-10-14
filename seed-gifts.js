const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("gifts.db");

const presents = [
  {
    id: 1,
    name: "1 ano de academia para os noivos",
    value: "R$ 30,00",
    icon: "🏋️",
  },
  {
    id: 2,
    name: "Aulas de culinária para casais",
    value: "R$ 40,00",
    icon: "🍳",
  },
  {
    id: 3,
    name: "Massagem relaxante para dois",
    value: "R$ 50,00",
    icon: "💆",
  },
  { id: 4, name: "Jantar romântico em casa", value: "R$ 60,00", icon: "🍷" },
  {
    id: 5,
    name: "Kit sobrevivência para recém-casados",
    value: "R$ 70,00",
    icon: "🎒",
  },
  { id: 6, name: "Curso de dança para noivos", value: "R$ 80,00", icon: "💃" },
  {
    id: 7,
    name: "Sertralina simbólica para manter a paz conjugal",
    value: "R$ 90,00",
    icon: "💊",
  },
  {
    id: 8,
    name: "Spray anti-pé-frio para noites de cobertor",
    value: "R$ 100,00",
    icon: "🧦",
  },
  {
    id: 9,
    name: "Vale 'pode escolher o filme hoje'",
    value: "R$ 110,00",
    icon: "🎥",
  },
  {
    id: 10,
    name: "Kit 'sorria e acene' para momentos tensos",
    value: "R$ 120,00",
    icon: "🧸",
  },
  {
    id: 11,
    name: "Curso de como elogiar a comida sem mentir",
    value: "R$ 130,00",
    icon: "🍝",
  },
  {
    id: 12,
    name: "Vale 'dia sem perguntas difíceis'",
    value: "R$ 140,00",
    icon: "🤐",
  },
  {
    id: 13,
    name: "Kit de emergência para visitas inesperadas",
    value: "R$ 150,00",
    icon: "🚪",
  },
  {
    id: 14,
    name: "Curso de como dividir o edredom",
    value: "R$ 160,00",
    icon: "🛏️",
  },
  {
    id: 15,
    name: "Vale 'você estava certo(a)' sem discussão",
    value: "R$ 170,00",
    icon: "✅",
  },
  {
    id: 16,
    name: "Assinatura de elogios diários personalizados",
    value: "R$ 180,00",
    icon: "💌",
  },
  {
    id: 17,
    name: "Curso de como não mexer no celular durante o jantar",
    value: "R$ 190,00",
    icon: "📵",
  },
  {
    id: 18,
    name: "Vale 'sem perguntas durante futebol'",
    value: "R$ 200,00",
    icon: "⚽",
  },
  {
    id: 19,
    name: "Kit de desculpas criativas para esquecer o lixo",
    value: "R$ 210,00",
    icon: "🗑️",
  },
  {
    id: 20,
    name: "Curso de como fingir interesse em séries alheias",
    value: "R$ 220,00",
    icon: "🎬",
  },
  {
    id: 21,
    name: "Manual de como não brigar por besteira",
    value: "R$ 230,00",
    icon: "📘",
  },
  {
    id: 22,
    name: "Almofada com botão de desculpas automáticas",
    value: "R$ 240,00",
    icon: "🛋️",
  },
  {
    id: 23,
    name: "Curso intensivo de 'quem lava a louça hoje'",
    value: "R$ 250,00",
    icon: "🍽️",
  },
  { id: 24, name: "Vale noite sem ronco", value: "R$ 260,00", icon: "😴" },
  {
    id: 25,
    name: "Kit de sobrevivência em compras no shopping",
    value: "R$ 270,00",
    icon: "🛍️",
  },
  {
    id: 26,
    name: "Curso de como elogiar sem parecer forçado",
    value: "R$ 280,00",
    icon: "🗣️",
  },
  {
    id: 27,
    name: "Jogo de tabuleiro 'Quem manda aqui?'",
    value: "R$ 290,00",
    icon: "🎲",
  },
  {
    id: 28,
    name: "Vale 'dia do sofá e série sem culpa'",
    value: "R$ 300,00",
    icon: "📺",
  },
  {
    id: 29,
    name: "Óculos de realidade virtual para fugir de DRs",
    value: "R$ 400,00",
    icon: "🕶️",
  },
  {
    id: 30,
    name: "Jetpack para escapar de tarefas domésticas",
    value: "R$ 500,00",
    icon: "🚀",
  },
  {
    id: 31,
    name: "Agenda para não esquecer datas importantes para o noivo",
    value: "R$ 900,00",
    icon: "📒",
  },
  {
    id: 32,
    name: "Drone personalizado para vigiar o noivo no futebol",
    value: "R$ 1.000,00",
    icon: "🛸",
  },
  {
    id: 33,
    name: "Robô aspirador com sensor de ciúmes",
    value: "R$ 1.500,00",
    icon: "🤖",
  },
  {
    id: 34,
    name: "Assinatura vitalícia de sorvete gourmet para crises da noiva",
    value: "R$ 2.000,00",
    icon: "🍨",
  },
  {
    id: 35,
    name: "Parcela simbólica da Ferrari do noivo",
    value: "R$ 2.500,00",
    icon: "🏎️",
  },
  {
    id: 36,
    name: "Viagem de autoconhecimento da noiva pro Canadá",
    value: "R$ 3.000,00",
    icon: "🛫",
  },
];

db.serialize(() => {
  const stmt = db.prepare(
    "INSERT INTO gifts (id, name, value, icon, count, max) VALUES (?, ?, ?, ?, ?, ?)"
  );
  presents.forEach((p) => {
    stmt.run(p.id, p.name, p.value, p.icon, 0, 2);
  });
  stmt.finalize();
});

db.close();
