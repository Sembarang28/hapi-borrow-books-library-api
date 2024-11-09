import IPublisher from "../../../interfaces/publisher";
import publisherModel from "../../../models/publisher";

class PublisherService {
  async createPublisher(data: IPublisher) {
    try {
      await publisherModel.createPublisher(data);

      return {
        body: {
          status: true,
          message: 'Data berhasil ditambah',
        },
        code: 201,
      };
    } catch (error) {
      console.log('create publisher service error: ', error);
      return {
        body: {
          status: false,
          message: 'create publisher service error'
        },
        code: 500,
      };
    }
  }

  async readAllPublisher(name: string, address: string, city: string) {
    try {
      const readAllPublisher = await publisherModel.readAllPublisher(name, address, city);

      if (!readAllPublisher[0]) {
        return {
          body: {
            status: false,
            message: 'Data tidak berhasil ditemukan!',
          },
          code: 404,
        }
      }

      return {
        body: {
          status: true,
          message: 'Data berhasil ditemukan',
          data: readAllPublisher,
        },
        code: 200,
      };
    } catch (error) {
      console.log('read all publisher service error: ', error);
      return {
        body: {
          status: false,
          message: 'read all publisher service error'
        },
        code: 500,
      };
    }
  }

  async readPublisherById(id: number) {
    try {
      const readPublisherById = await publisherModel.readPublisherById(id);

      if (!readPublisherById) {
        return {
          body: {
            status: false,
            message: 'Data tidak berhasil ditemukan!',
          },
          code: 404,
        }
      }

      return {
        body: {
          status: true,
          message: 'Data berhasil ditemukan',
          data: readPublisherById,
        },
        code: 200,
      };
    } catch (error) {
      console.log('read publisher service error: ', error);
      return {
        body: {
          status: false,
          message: 'read publisher service error'
        },
        code: 500,
      };
    }
  }

  async updatePublisherById(id: number, data: IPublisher) {
    try {
      await publisherModel.updatePublisherById(id, data);

      return {
        body: {
          status: true,
          message: 'Data berhasil diubah',
        },
        code: 200,
      };
    } catch (error) {
      console.log('update publisher service error: ', error);
      return {
        body: {
          status: false,
          message: 'update publisher service error'
        },
        code: 500,
      };
    }
  }

  async deletePublisherById(id: number) {
    try {
      await publisherModel.deletePublisherById(id);

      return {
        body: {
          status: true,
          message: 'Data berhasil dihapus',
        },
        code: 200,
      };
    } catch (error) {
      console.log('delete publisher service error: ', error);
      return {
        body: {
          status: false,
          message: 'delete publisher service error'
        },
        code: 500,
      };
    }
  }
}

export default new PublisherService();