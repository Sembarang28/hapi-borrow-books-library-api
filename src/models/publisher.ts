import { equal } from "joi";
import prisma from "../config/databaseConnection";
import IPublisher from "../interfaces/publisher";

class PublisherModel {
  static async createPublisher(data: IPublisher) {
    return await prisma.publisher.create({
      data: {
        name: data.name,
        address: data.address,
        city: data.city,
      },
    });
  }

  static async readAllPublisher(name: string, address: string, city: string) {
    return await prisma.publisher.findMany({
      where: {
        name: { contains: name, mode: 'insensitive' },
        address: { contains: address, mode: 'insensitive' },
        city: { contains: city, mode: 'insensitive' },
      }
    });
  }

  static async readPublisherById(id: number) {
    return await prisma.publisher.findUnique({
      where: {
        id,
      }
    });
  }

  static async updatePublisherById(id: number, data: IPublisher) {
    return await prisma.publisher.update({
      where: {
        id,
      },
      data: {
        name: data.name,
        address: data.address,
        city: data.city,
      },
    });
  }

  static async deletePublisherById(id: number) {
    return await prisma.publisher.delete({
      where: {
        id,
      }
    });
  }
}

export default PublisherModel;