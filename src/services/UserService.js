import HttpService from "./HttpService";
import AuthService from "./AuthService";

export default {
  getById,
  save,
  query,
  toggleLike
};

function query() {
  return HttpService.get(_getUrl());
}

function getById(id) {
  return HttpService.get(_getUrl(id));
}

function save(user) {
  return HttpService.put(_getUrl(), user);
}

function toggleLike(postId) {
  let userId = AuthService.getLoggedInUser()._id;
  return HttpService.patch(_getUrl("likes"), { userId, postId });
}

function _getUrl(endpoint = "") {
  return `user/${endpoint}`;
}
