import IWriter from "../../../interfaces/writer";
import writerModel from '../../../models/writer';

class WriterService {
  async createWriter(data: IWriter) {
    try {
      await writerModel.createWriter(data);

      return {
        body: {
          status: true,
          message: 'Data berhasil ditambah!',
        },
        code: 201,
      }
    } catch (error) {
      console.log('create writer service error: ', error);
      return {
        body: {
          status: false,
          message: 'create writer service error'
        },
        code: 500,
      };
    }
  }

  async readAllWriter(name: string) {
    try {
      const readAllWriter = await writerModel.readAllWriter(name);

      if (!readAllWriter[0]) {
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
          message: 'Data berhasil ditemukan!',
          data: readAllWriter,
        },
        code: 200,
      }
    } catch (error) {
      console.log('read all writer service error: ', error);
      return {
        body: {
          status: false,
          message: 'read all writer service error'
        },
        code: 500,
      };
    }
  }

  async readWriterById(id: number) {
    try {
      const readWriterById = await writerModel.readWriterById(id);

      if (!readWriterById) {
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
          message: 'Data berhasil ditemukan!',
          data: readWriterById,
        },
        code: 200,
      }
    } catch (error) {
      console.log('read writer service error: ', error);
      return {
        body: {
          status: false,
          message: 'read writer service error'
        },
        code: 500,
      };
    }
  }

  async updateWriter(id: number, data: IWriter) {
    try {
      const readWriterById = await writerModel.readWriterById(id);

      if (!readWriterById) {
        return {
          body: {
            status: false,
            message: 'Data tidak berhasil ditemukan!',
          },
          code: 404,
        }
      }

      await writerModel.updateWriterById(id, data);

      return {
        body: {
          status: true,
          message: 'Data berhasil diubah!',
        },
        code: 200,
      }
    } catch (error) {
      console.log('update writer service error: ', error);
      return {
        body: {
          status: false,
          message: 'update writer service error'
        },
        code: 500,
      };
    }
  }

  async deleteWriter(id: number) {
    try {
      const readWriterById = await writerModel.readWriterById(id);

      if (!readWriterById) {
        return {
          body: {
            status: false,
            message: 'Data tidak berhasil ditemukan!',
          },
          code: 404,
        }
      }

      await writerModel.deleteWriterById(id);

      return {
        body: {
          status: true,
          message: 'Data berhasil dihapus!',
        },
        code: 200,
      }
    } catch (error) {
      console.log('delete writer service error: ', error);
      return {
        body: {
          status: false,
          message: 'delete writer service error'
        },
        code: 500,
      };
    }
  }
}

export default new WriterService();