// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Order from "@/models/Order";
import connectDb from "@/middleware/mongoose";

const handler = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { orderId, field, newStatus } = req.body;

      

      let updateData = {};
      if (field === "status") {
        updateData = { status: newStatus };
      } else if (field === "deliveryStatus") {
        updateData = { deliveryStatus: newStatus };
      } else {
        console.log("Invalid field specified:", field);
        return res.status(400).json({ success: false, message: "Invalid field specified" });
      }

      const updatedOrder = await Order.findOneAndUpdate(
        { orderId: orderId },
        updateData,
        { new: true }
      );

      if (!updatedOrder) {
        return res.status(404).json({ success: false, message: "Order not found" });
      }

      res.status(200).json({ success: true, updatedOrder });
    } catch (error) {
      console.error("Error updating order:", error); // Log the error for debugging
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(400).json({ success: false, message: "Invalid request method" });
  }
};

export default connectDb(handler);
