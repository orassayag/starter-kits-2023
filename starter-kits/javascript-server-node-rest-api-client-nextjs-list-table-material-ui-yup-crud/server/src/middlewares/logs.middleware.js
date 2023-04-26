import Logger from '../services/logger.service.js';
import CustomError from '../custom/error.custom.js';

class LogMiddleware {
  constructor() {
    throw new CustomError({ message: 'Cannot create an instance of a static class' });
  }

  /**
   * Log handler middleware.
   *
   * Log each incoming request to the server.
   * @param {object} req - A request object with the body and parameters.
   * @param {object} res - A response object to return JSON.
   * @param {object} next - The next middleware function in the chain.
   * @returns {void}
   */
  static log(req, res, next) {
    const {
      body,
      query,
      params,
      method,
      originalUrl,
    } = req;
    let info = `Entered to ${method} ${originalUrl} `;
    if (Object.keys(body).length) {
      info += `| body: ${JSON.stringify(body)}`;
    }
    if (Object.keys(query).length) {
      info += `| query: ${JSON.stringify(query)}`;
    }
    if (Object.keys(params).length) {
      info += `| params: ${JSON.stringify(params)}`;
    }
    Logger.info(info);
    return next();
  }
}

export default LogMiddleware;
