global.args = require('minimist')(process.argv.slice(2))
const fetch = require('node-fetch');
function tryPost() {

  // if (!validate()) return;

  auth = args['id']
  

  proxyFetch("https://cors.root.workers.dev/", "https://api.medium.com/v1/me", {
    method: "get",
    headers: {
      "Authorization": "Bearer " + auth,
      "Content-type": "application/json",
      "Accept": "application/json",
      "Accept-Charset": "utf-8",
    }
  }).then(response => status(response, gotId, "Failed to retrieve user args['id']")).catch(_ => error("Failed to contact the API"));
}

function markValid(item, isValid) {
  if (isValid) {
    item.addClass('is-valid');
    item.removeClass('is-invalid');
  } else {
    item.addClass('is-invalid');
    item.removeClass('is-valid');
  }
}

function validate() {
  markValid($('#postTitle'), args['name'] !== "");
  markValid($('#markdownText'), args['content'] !== "");
  markValid($('#apiKey'), args['id'].match("[A-fa-f0-9]{65}"));
  markValid($('#corsProxy'), args['cors'] !== "");

  return $('.is-invalid').length == 0;
}

function proxyFetch(proxyurl, url, init) {
  init['headers']['X-Corsify-Url'] = url;
  init['mode'] = 'cors'

  return fetch(proxyurl, init)
}

function error(err) {
  console.log(err)
  return void(0)
}


function status(response, next, err) {
  if (response.status >= 200 && response.status < 300) {
    response.json().then(next);
  } else {
    let status = response.status;
    if (status == 401)
      status = "unauthorized";
    error("Failed to retrieve user args['id']: " + status);
  }
}

function gotId(data) {
  // console.log(data)
  createPost(data);

  error("Invalid response from the API");
}

function createPost(data) {
  // console.log(data)
  let postUrl = "https://api.medium.com/v1/users/" + data["data"]["id"] + "/posts";
  // console.log(postUrl)
  let postData = {
    "title": args['name'],
    "contentFormat": "markdown",
    "content": args['content'],
    "publishStatus": "draft",
  }

  proxyFetch("https://cors.root.workers.dev/", postUrl, {
    method: "post",
    headers: {
      "Authorization": "Bearer " + args['id'],
      "Content-type": "application/json",
      "Accept": "application/json",
      "Accept-Charset": "utf-8",
    },
    body: JSON.stringify(postData),
  }).then(response => status(response, gotPostData, "Failed to publish the post")).catch(_ => error("Failed to contact the API"));
}


function gotPostData(data) {
  if ("data" in data) {
    if ("title" in data['data'] && "url" in data['data']) {
      return;
    }
  }

  error("Invalid response from the API");
}

tryPost()
