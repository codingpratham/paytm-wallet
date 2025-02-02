import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import { prisma } from "@repo/db/client";

export async function p2pTransfer(to: string, amount: number) {
  try {
    const session = await getServerSession(authOptions);
    const from = session?.user?.id;

    // Check if the session or fromUser exists
    if (!from) {
      return {
        message: "Error: User is not authenticated.",
      };
    }

    console.log("fromUser:", from);

    // Find the recipient user by phone number
    const toUser = await prisma.user.findFirst({
      where: {
        number: to,
      },
    });

    // Check if the recipient user exists
    if (!toUser) {
      return {
        message: "Error: Recipient user not found.",
      };
    }

    console.log("toUser:", toUser.id);

    // Start a transaction to process the balance transfer
    await prisma.$transaction(async (tx) => {
      // Get the sender's balance
      const fromBalance = await tx.balance.findUnique({
        where: { userId: Number(from) },
      });

      // Check if the sender has enough balance
      if (!fromBalance) {
        throw new Error("Sender's balance not found.");
      }

      if (fromBalance.amount < amount) {
        throw new Error("Insufficient funds.");
      }

      console.log("fromBalance:", fromBalance);

      // Decrement the sender's balance
      await tx.balance.update({
        where: { userId: Number(from) },
        data: { amount: { decrement: amount } },
      });

      // Increment the recipient's balance
      await tx.balance.update({
        where: { userId: toUser.id },
        data: { amount: { increment: amount } },
      });

      // Record the P2P transfer in the database
      await tx.p2pTransfer.create({
        data: {
          fromUserId: Number(from),
          toUserId: toUser.id,
          amount,
          timestamp: new Date(),
        },
      });
    });

    // Return success message after transaction
    return {
      message: "Transfer successful.",
    };
  } catch (error) {
    console.error("Error during P2P transfer:", error);

    // Return error message
    return {
      message: error instanceof Error ? error.message : "Unknown error occurred.",
    };
  }
}
