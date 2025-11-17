import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.elder.createMany({
    data: [
      {
        name: "Crista",
        age: 70,
        likes: "Bolsinha",
        wish: "Bolsinha",
        adopted: false,
        image: "/img/foto1.jpg",
      },
      {
        name: "Ilka",
        age: 68,
        likes: "Sandália tam 39",
        wish: "Sandália tam 39 + salgadinho Cheetos laranja ou chocolate",
        adopted: false,
        image: "/img/foto2.jpg",
      },
      {
        name: "Célia",
        age: 72,
        likes: "Presilhas e tiaras",
        wish: "Presilha de cabelo, tiaras",
        adopted: false,
        image: "/img/foto3.jpg",
      },
      {
        name: "Rita",
        age: 69,
        likes: "Casaquinho fino",
        wish: "Casaquinho fino / pantufa",
        adopted: false,
        image: "/img/foto4.jpg",
      },
      {
        name: "Ida",
        age: 75,
        likes: "Chinelinho decorado",
        wish: "Chinelinho decorado tam 39 / perfume ou creme",
        adopted: false,
        image: "/img/foto5.jpg",
      },
      {
        name: "Marisa",
        age: 71,
        likes: "Chocolates",
        wish: "Chocolates Lacta / bolsinha de lado",
        adopted: false,
        image: "/img/foto6.jpg",
      },
      {
        name: "Carin",
        age: 66,
        likes: "Brinquedos de gato",
        wish: "Coisas para gatinha (brinquedinhos) / chocolates",
        adopted: false,
        image: "/img/foto7.jpg",
      },
      {
        name: "Waltraud",
        age: 74,
        likes: "",
        wish: "????",
        adopted: false,
        image: "/img/foto8.jpg",
      },
      {
        name: "Airton",
        age: 78,
        likes: "Chocolate",
        wish: "Chocolate",
        adopted: false,
        image: "/img/foto9.jpg",
      },
      {
        name: "Domingos",
        age: 80,
        likes: "Camiseta masculina",
        wish: "Camiseta masculina",
        adopted: false,
        image: "/img/foto10.jpg",
      },
      {
        name: "Pedro",
        age: 77,
        likes: "Camiseta masculina",
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
