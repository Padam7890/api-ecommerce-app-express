const ProductRouter = require("./productRoute");
const categoryRouter = require("./categoryRoute");
const UserRouter = require("./userRoute");
const subcategoryRoute = require("./subcategoryRoute");
const imageRoute = require("./imageRoute")
const bannerRoute = require("./bannerRoute")
const logoRoute = require("./logoRoute");
const checkAuth = require("../middleware/auth");
const orderRoute = require("./orderRoute")
const menuRouter = require("./menuRoute")
const mailRouter = require("./mailRouter");
const adRoute = require("./adRoute");
const cilentsRoute = require("./cilentRoute");

function LoadRoutes(app) {
  app.use("/", mailRouter);
  app.use("/products" , ProductRouter);
  app.use("/categories",  categoryRouter);
  app.use("/subcategories",  subcategoryRoute)
  app.use('/image', checkAuth, imageRoute)
  app.use('/banner', checkAuth,  bannerRoute)
  app.use('/logos', checkAuth, logoRoute)
  app.use('/order',  orderRoute)
  app.use('/menu', checkAuth, menuRouter)
  app.use("/advertisement", checkAuth, adRoute)
  app.use('/cilents',checkAuth, cilentsRoute)

  
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