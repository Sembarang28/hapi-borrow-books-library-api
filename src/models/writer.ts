import prisma from "../config/databaseConnection";
import IWriter from "../interfaces/writer";

class WriterModel {
  static async createWriter(data: IWriter) {
    return await prisma.writers.create({
      data: {
        name: data.name,
        birthDate: new Date(data.birthDate),
        birthPlace: data.birthPlace,
      }
    });
  }

  static async readAllWriter(name: string) {
    return await prisma.writers.findMany({
      where: {
        name: { contains: name, mode: 'insensitive' },
      }
    });
  }

  static async readWriterById(id: number) {
    return await prisma.writers.findUnique({
      where: {
        id,
      },
      select: {
        name: true,
        birthDate: true,
        birthPlace: true,
      }
    });
  }

  static async updateWriterById(id: number, data: IWriter) {
    return await prisma.writers.update({
      where: {
        id,
      },
      data: {
        name: data.name,
        birthDate: new Date(data.birthDate),
        birthPlace: data.birthPlace,
      }
    });
  }

  static async deleteWriterById(id: number) {
    return await prisma.writers.delete({
      where: {
        id,
      }
    });
  }
}

export default WriterModel;