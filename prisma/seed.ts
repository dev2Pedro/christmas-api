import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.elder.createMany({
    data: [
      {
        name: "Crista",
        age: 70,
        likes:
          "Uma senhora meiga e carinhosa, sempre curiosa e apaixonada por tudo que envolve culturas internacionais.",
        wish: "Bolsinha",
        adopted: false,
        image: "/img/foto1.jpg",
      },
      {
        name: "Ilka",
        age: 68,
        likes:
          "Estilosa e vaidosa, participa ativamente das atividades e demonstra muito afeto. Está sempre elegante, com suas joias charmosas.",
        wish: "Sandália tam 39 + salgadinho Cheetos laranja ou chocolate",
        adopted: false,
        image: "/img/foto2.jpg",
      },
      {
        name: "Célia",
        age: 72,
        likes:
          "Extremamente amável e divertida, é fofa e bem-humorada, um verdadeiro doce de senhora.",
        wish: "Presilha de cabelo, tiaras",
        adopted: false,
        image: "/img/foto3.jpg",
      },
      {
        name: "Rita",
        age: 69,
        likes:
          "Serena e tranquila, demonstra uma gentileza que acolhe todos ao seu redor.",
        wish: "Casaquinho fino / pantufa",
        adopted: false,
        image: "/img/foto4.jpg",
      },
      {
        name: "Ida",
        age: 75,
        likes: "Engraçada e acolhedora, sempre carinhosa e muito comunicativa.",
        wish: "Chinelinho decorado tam 39 / perfume ou creme",
        adopted: false,
        image: "/img/foto5.jpg",
      },
      {
        name: "Marisa",
        age: 71,
        likes:
          "Afetuosa e participativa, destaca-se pela criatividade nas atividades.",
        wish: "Chocolates Lacta / bolsinha de lado",
        adopted: false,
        image: "/img/foto6.jpg",
      },
      {
        name: "Carin",
        age: 66,
        likes:
          "Gentil e amável, cuidadosa com todos; é apaixonada por gatos e por música clássica.",
        wish: "Coisas para gatinha (brinquedinhos) / chocolates",
        adopted: false,
        image: "/img/foto7.jpg",
      },
      {
        name: "Waltraud",
        age: 101,
        likes:
          "Carinhosamente conhecida como a “vovó da casa”, adora mandar beijos e assistir. Uma presença especial com seus 101 anos.",
        wish: "Itens de higiene, sabonetes, toalhas ou coisinhas de cabelo",
        adopted: false,
        image: "/img/foto8.jpg",
      },
      {
        name: "Airton",
        age: 78,
        likes:
          "Conhecido pelo apelido “Airton Senna”, é divertido, participativo e sempre muito atencioso.",
        wish: "Chocolate",
        adopted: false,
        image: "/img/foto9.jpg",
      },
      {
        name: "Domingos",
        age: 80,
        likes: "Um senhor tímido, mas de uma generosidade notável.",
        wish: "Camiseta masculina",
        adopted: false,
        image: "/img/foto10.jpg",
      },
      {
        name: "Pedro",
        age: 77,
        likes:
          "Bem-humorado e comunicativo, extrovertido nas interações do grupo.",
        wish: "Camiseta masculina",
        adopted: false,
        image: "/img/foto11.jpg",
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
