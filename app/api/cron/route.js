import prisma from "@/lib/db/db";

export const GET = async (req) => {
  try {
    const twentyDaysAgo = new Date();
    twentyDaysAgo.setDate(twentyDaysAgo.getDate() - 20);
    const [certificates, invoices, quotations, resumes] = await Promise.all([
      prisma.certificate.deleteMany({
        where: { createdAt: { lt: twentyDaysAgo } },
      }),
      prisma.invoice.deleteMany({
        where: { createdAt: { lt: twentyDaysAgo } },
      }),
      prisma.quotation.deleteMany({
        where: { createdAt: { lt: twentyDaysAgo } },
      }),
      prisma.resume.deleteMany({
        where: { createdAt: { lt: twentyDaysAgo } },
      }),
    ]);

    const deleteCount =
      certificates.count + invoices.count + quotations.count + resumes.count;

    return Response.json({ success: true, deleteCount });
  } catch (err) {
    return Response.json({ success: false, error: err.message });
  }
};
