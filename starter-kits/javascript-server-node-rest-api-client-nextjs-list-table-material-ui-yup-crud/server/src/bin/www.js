import server from '../app.js';
import CONSTANTS from '../config/constants.config.js';
import NetworksUtils from '../utils/networks.utils.js';
import CustomEventEmitter from '../custom/event.emitter.custom.js';
import UsersController from '../controllers/users.controller.js';

// Perform here all the one-time events after the server initiated successfully.
CustomEventEmitter.on(CONSTANTS.EVENTS.SERVER_UP, async () => {
  // Load all the users and the products (Simulate to initiate the database connection).
  const dataPromises = ['users', 'products'].map((key) => NetworksUtils.sendRequest({
    url: `${CONSTANTS.DATA.BASE_URL}${key}?limit=100&skip=0`,
    method: 'GET',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  }));
  const data = {};
  [data.users, data.products] = await Promise.all(dataPromises);
  UsersController.initiate(data.users.users);
});

export default server;
