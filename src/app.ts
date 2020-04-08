import express = require('express');
import cors = require('cors');
import { uuid } from "uuidv4";

interface Repository {
  id: string,
  title: string,
  url: string,
  techs: string[],
  likes: number,
}

const app = express();

app.use(express.json());
app.use(cors());

const repositories: Array<Repository> = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const {
    title,
    url,
    techs,
  } = request.body;

  const repo = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };

  repositories.push(repo);

  return response.json(repo);
});

app.put("/repositories/:id", (request, response) => {
  const {
    title,
    url,
    techs,
  } = request.body;
  const {
    id
  } = request.params;

  const repoIndex = repositories.findIndex(repo => repo.id === id)

  if(repoIndex < 0) {
    return response.status(400).json({ error: "Repository not found."})
  }

  repositories[repoIndex] = {
    ...repositories[repoIndex],
    title: title? title : repositories[repoIndex].title,
    url: url? url : repositories[repoIndex].url,
    techs: techs? techs : repositories[repoIndex].techs,
  }

  return response.json(repositories[repoIndex]);
});

app.delete("/repositories/:id", (request, response) => {
  const {
    id
  } = request.params;

  const repoIndex = repositories.findIndex(repo => repo.id === id)

  if(repoIndex < 0) {
    return response.status(400).json({ error: "Repository not found."})
  }

  repositories.splice(repoIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const {
    id
  } = request.params;

  const repoIndex = repositories.findIndex(repo => repo.id === id)

  if(repoIndex < 0) {
    return response.status(400).json({ error: "Repository not found."})
  }

  repositories[repoIndex].likes += 1;
  
  return response.json(repositories[repoIndex]);
});

export = app;
