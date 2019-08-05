import HttpService from "./HttpService";
import AuthService from "./AuthService";

export default {
  query,
  getById,
  remove,
  save,
  handleUploadImage,
  saveComment
};

function query(filter) {
  console.log("query");
  return HttpService.get(_getUrl(), filter);
}

function getById(id) {
  return HttpService.get(_getUrl(id));
}

function remove(post) {
  return HttpService.delete(_getUrl(post._id), post);
}

function save(post) {
  if (post._id) {
    return HttpService.put(_getUrl(post._id), post);
  } else {
    return HttpService.post(_getUrl(), post);
  }
}

async function saveComment(postId, newCommentTxt) {
  let comment = {
    postId,
    userId: AuthService.getLoggedInUser()._id,
    txt: newCommentTxt,
    timeStamp:  Date.now()
  };
   let res = await HttpService.put(_getUrl(`comment/${postId}`),comment)
}

async function handleUploadImage(file) {
  const form = new FormData();
  form.append("imgUpload", file);
  const URL =
    process.env.NODE_ENV === "production"
      ? `/upload/cloudinary`
      : `//localhost:3000/upload/cloudinary`;
  try {
    const res = await fetch(URL, {
      method: "POST",
      body: form
    });
    const result = await res.json();
    return result.url;
  } catch (err) {
    throw err;
  }
}

function _getUrl(id = "") {
  return `post/${id}`;
}
