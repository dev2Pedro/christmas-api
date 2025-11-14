import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.elder.createMany({
    data: [
      {
        name: "Dona Maria",
        age: 78,
        likes: "Tricô, ouvir músicas antigas e tomar chá",
        wish: "Um kit de tricô com lãs coloridas e um rádio",
      },
      {
        name: "Seu João",
        age: 82,
        likes: "Jogar damas, jardinagem e contar histórias",
        wish: "Um jogo de damas e ferramentas de jardinagem",
      },
      {
        name: "Dona Ana",
        age: 75,
        likes: "Ler romances, cozinhar e cuidar de plantas",
        wish: "Livros de romance e um kit de temperos",
      },
      {
        name: "Seu Pedro",
        age: 80,
        likes: "Pintar paisagens, ouvir rádio e fazer palavras-cruzadas",
        wish: "Tintas e pincéis para pintura",
      },
      {
        name: "Dona Rosa",
        age: 76,
        likes: "Cozinhar doces, bordar e assistir novelas",
        wish: "Linhas de bordar e um cobertor quentinho",
      },
      {
        name: "Seu Antônio",
        age: 84,
        likes: "Jogar xadrez, ler jornais e fazer caminhadas",
        wish: "Um tabuleiro de xadrez e um par de tênis confortável",
      },
      {
        name: "Dona Rafaela",
        age: 21,
        likes: "Ler livros de fantasia, desenhar e ouvir música",
        wish: "Um livro e um conjunto de material de desenho",
      },
    ],
  });

  console.log("🌱 Seed executada com sucesso!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
