module.exports = function () {
  let module = {};

  module.init = function (dependencies) {
    return dependencies.baseClass.magicMethods(
      class Devices {
        constructor(config, token) {
          this._config = config;
          this._token = token;
          this._endpoints = {
            get_list: "/v1.0/devices",
            get_details: "/v1.0/devices/{device_id}",
            get_passCode:
              "/v1.0/devices/{device_id}/door-lock/temp-password/{password_id}",
            post_passCode: "/v1.0/devices/{device_id}/door-lock/temp-password",
            post_ticket: "/v1.0/devices/{device_id}/door-lock/password-ticket",
            delete_passCode:
              "/v1.0/devices/{device_id}/door-lock/temp-passwords/{password_id}",
          };
        }

        endpoints() {
          return this._endpoints;
        }

        __get(name) {
          let caller = new dependencies.Caller(
            this._config,
            this._endpoints,
            dependencies,
            this._token
          );
          return caller.send(name, arguments);
        }
      }
    );
  };
  return module;
};
