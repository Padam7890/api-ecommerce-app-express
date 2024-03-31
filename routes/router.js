const ProductRouter = require("./productRoute");
const categoryRouter = require("./categoryRoute");
const UserRouter = require("./userRoute");
const subcategoryRoute = require("./subcategoryRoute");
const checkAuth = require("../middleware/auth");

function LoadRoutes(app) {
  app.use("/products", checkAuth , ProductRouter);
  app.use("/categories", categoryRouter);
  app.use("/subcategories",subcategoryRoute)

  
  /*

  /*
    http://localhost:3000/auth/register
  */
  app.use("/auth", UserRouter);

  //   app.post("/favorites", checkAuth, async (request, response) => {
  //     const id = request.user_id;

  //     const { product_id } = request.body;

  //     const favourite = await prisma.favourites.create({
  //       data: {
  //         product_id: product_id,
  //         user_id: id,
  //       },
  //     });

  //     response.json({
  //       message: "Product added to favourites",
  //       favourite: favourite,
  //     });
  //   });
}

module.exports = LoadRoutes;