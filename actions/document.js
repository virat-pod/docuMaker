"use server";
import prisma from "@/lib/db/db";
import { getUser } from "@/lib/auth/auth-helper";

export const documentCreate = async (data, type) => {
  const user = await getUser();
  if (!user) return null;

  const model = type.toLowerCase();
  let filterData = { ...data };

  if (filterData.dueDate) {
    filterData.dueDate = new Date(filterData.dueDate).toISOString();
  }
  if (filterData.validDays !== undefined) {
    filterData.validDays = parseInt(filterData.validDays) || 0;
  }
  if (filterData.total !== undefined) {
    filterData.total =
      parseInt(String(filterData.total).replace(/,/g, ""), 10) || 0;
  }

  const addDocument = await prisma[model].create({
    data: { ...filterData, userId: user.id },
  });

  return addDocument;
};

export const GetDocument = async (type, id) => {
  if (!type || !id) return null;

  const user = await getUser();
  if (!user) return null;

  const model = type.toLowerCase();

  const document = await prisma[model].findFirst({
    where: { id: id, userId: user.id },
  });

  if (!document) return null;
  return JSON.parse(JSON.stringify(document));
};

export const updateDocument = async (document, id, data) => {
  const user = await getUser();
  if (!user) return null;

  const editTask = await prisma[document].updateMany({
    where: { id: id },
    data: data,
  });

  if (!editTask) return null;
  return editTask;
};

export const GetDocuments = async () => {
  const User = await getUser();
  if (!User) return null;

  const [certificates, invoices, quotations, resumes] = await Promise.all([
    prisma.certificate.findMany({ where: { userId: User.id } }),
    prisma.invoice.findMany({ where: { userId: User.id } }),
    prisma.quotation.findMany({ where: { userId: User.id } }),
    prisma.resume.findMany({ where: { userId: User.id } }),
  ]);

  const allDocs = [
    ...certificates,
    ...invoices,
    ...quotations,
    ...resumes
  ];

  return allDocs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

export const deleteDocument = async (type, id) => {
  const User = await getUser();
  if (!User) return null;

  const deleteIt = await prisma[type].delete({ where: { id } });

  return deleteIt;
};
