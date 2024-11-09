import IPublisher from "../../../interfaces/publisher";

class PublisherService {
  async createPublisher(data: IPublisher) {
    try {

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

  async readAllPublisher() {
    try {

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

  async readPublisherById() {
    try {

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

  async updatePublisherById(data: IPublisher) {
    try {

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

  async deletePublisherById() {
    try {

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