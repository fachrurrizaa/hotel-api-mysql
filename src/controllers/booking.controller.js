const prisma = require("../libs/prisma");

exports.createBooking = async (req, res) => {
    const { postId, name, email, startDate, endDate } = req.body;
  
    try {
      // Cek ketersediaan post berdasarkan postId
      const post = await prisma.post.findUnique({
        where: { id: postId },
      });
  
      if (!post) {
        return res.status(404).send({
          message: `Post not found with id ${postId}`,
        });
      }
  
      // Buat booking baru
      const newBooking = await prisma.booking.create({
        data: {
          postId,
          name,
          email,
          startDate,
          endDate,
        },
      });
  
      res.send({ booking: newBooking });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Error creating booking",
      });
    }
};
  