import Hapi from '@hapi/hapi';

interface ResBody {
  status: boolean;
  message: string;
  data?: [] | {};
}

async function response(h: Hapi.ResponseToolkit, statusCode: number, resBody: ResBody, cookie?: string) {
  try {
    if (cookie) {
      h.state('refreshToken', cookie, {
        isHttpOnly: true,
        path: '/',
        ttl: 7 * 24 * 60 * 60,
        isSameSite: "None",
        isSecure: true,
      })
    };

    return h.response(resBody).code(statusCode);
  } catch (error) {
    console.log("response function error: ", error);
    return h.response({
      status: false,
      message: "response function error"
    }).code(500)
  }
}

export default response;