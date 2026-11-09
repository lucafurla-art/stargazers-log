const repositoryList = document.querySelector("#repository-list");
const status = document.querySelector("#status");

fetch("events.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Could not load starred repositories (${response.status}).`);
    }
    return response.json();
  })
  .then((repositories) => {
    if (!Array.isArray(repositories) || repositories.length === 0) {
      status.textContent = "No starred repositories to show yet.";
      return;
    }

    const items = repositories.map((repository) => {
      const item = document.createElement("li");
      item.className = "repository";

      const heading = document.createElement("h2");
      const link = document.createElement("a");
      link.href = repository.url;
      link.textContent = repository.name;
      heading.append(link);

      const description = document.createElement("p");
      description.textContent = repository.description;

      const date = document.createElement("p");
      date.className = "starred-date";
      date.textContent = `Starred on ${repository.starred_at}`;

      item.append(heading, description, date);
      return item;
    });

    repositoryList.replaceChildren(...items);
    status.textContent = `${repositories.length} starred repositories`;
  })
  .catch((error) => {
    status.textContent = "Unable to load starred repositories. Please try again later.";
    console.error(error);
  });
