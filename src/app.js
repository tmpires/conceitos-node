"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var express = require("express");
var cors = require("cors");
var uuidv4_1 = require("uuidv4");
var app = express();
app.use(express.json());
app.use(cors());
var repositories = [];
app.get("/repositories", function (request, response) {
    return response.json(repositories);
});
app.post("/repositories", function (request, response) {
    var _a = request.body, title = _a.title, url = _a.url, techs = _a.techs;
    var repo = {
        id: uuidv4_1.uuid(),
        title: title,
        url: url,
        techs: techs,
        likes: 0,
    };
    repositories.push(repo);
    return response.json(repo);
});
app.put("/repositories/:id", function (request, response) {
    var _a = request.body, title = _a.title, url = _a.url, techs = _a.techs;
    var id = request.params.id;
    var repoIndex = repositories.findIndex(function (repo) { return repo.id === id; });
    if (repoIndex < 0) {
        return response.status(400).json({ error: "Repository not found." });
    }
    repositories[repoIndex] = __assign(__assign({}, repositories[repoIndex]), { title: title ? title : repositories[repoIndex].title, url: url ? url : repositories[repoIndex].url, techs: techs ? techs : repositories[repoIndex].techs });
    return response.json(repositories[repoIndex]);
});
app.delete("/repositories/:id", function (request, response) {
    var id = request.params.id;
    var repoIndex = repositories.findIndex(function (repo) { return repo.id === id; });
    if (repoIndex < 0) {
        return response.status(400).json({ error: "Repository not found." });
    }
    repositories.splice(repoIndex, 1);
    return response.status(204).send();
});
app.post("/repositories/:id/like", function (request, response) {
    var id = request.params.id;
    var repoIndex = repositories.findIndex(function (repo) { return repo.id === id; });
    if (repoIndex < 0) {
        return response.status(400).json({ error: "Repository not found." });
    }
    repositories[repoIndex].likes += 1;
    return response.json(repositories[repoIndex]);
});
module.exports = app;
