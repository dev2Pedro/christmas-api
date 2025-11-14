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
      },
      {
        name: "Ilka",
        age: 68,
        likes: "Sandália tam 39",
        wish: "Sandália tam 39 + salgadinho Cheetos laranja ou chocolate",
        adopted: false,
      },
      {
        name: "Célia",
        age: 72,
        likes: "Presilhas e tiaras",
        wish: "Presilha de cabelo, tiaras",
        adopted: false,
      },
      {
        name: "Rita",
        age: 69,
        likes: "Casaquinho fino",
        wish: "Casaquinho fino / pantufa",
        adopted: false,
      },
      {
        name: "Ida",
        age: 75,
        likes: "Chinelinho decorado",
        wish: "Chinelinho decorado tam 39 / perfume ou creme",
        adopted: false,
      },
      {
        name: "Marisa",
        age: 71,
        likes: "Chocolates",
        wish: "Chocolates Lacta / bolsinha de lado",
        adopted: false,
      },
      {
        name: "Carin",
        age: 66,
        likes: "Brinquedos de gato",
        wish: "Coisas para gatinha (brinquedinhos) / chocolates",
        adopted: false,
      },
      {
        name: "Waltraud",
        age: 74,
        likes: "",
        wish: "????",
        adopted: false,
      },
      {
        name: "Airton",
        age: 78,
        likes: "Chocolate",
        wish: "Chocolate",
        adopted: false,
      },
      {
        name: "Domingos",
        age: 80,
        likes: "Camiseta masculina",
        wish: "Camiseta masculina",
        adopted: false,
      },
      {
        name: "Pedro",
        age: 77,
        likes: "Camiseta masculina",
        wish: "Camiseta masculina",
        adopted: false,
        image: "/img/foto1.jpg",
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
