//div class overview
const overview = document.querySelector(".overview");
//github username
const username = "Chad-J-B";
//unordered list to display repos list
const repoList = document.querySelector(".repo-list");
//section class repos
const reposSection = document.querySelector(".repos");
//section class repo-data
const repoDataSection = document.querySelector(".repo-data");
//back to repo gallery button
const backToRepos = document.querySelector(".view-repos");
//search by name input
const filterInput = document.querySelector(".filter-repos");



const gitUserInfo = async function(){
    const userInfo = await fetch(`https://api.github.com/users/${username}`);
    const data = await userInfo.json();
    displayUserInfo(data);
};

gitUserInfo();

const displayUserInfo = function(data) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `<figure>
    <img alt="user avatar" src=${data.avatar_url} />
  </figure>
  <div>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Bio:</strong> ${data.bio}</p>
    <p><strong>Location:</strong> ${data.location}</p>
    <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
  </div>`;
    overview.append(div);

    gitReposData();
};

const gitReposData = async function() {
  const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
  const reposData = await fetchRepos.json();
  repoInformation(reposData);
};

const repoInformation = function(repos) {
  filterInput.classList.remove("hide");
  for(const repo of repos) {
    const repoItem = document.createElement("li");
    repoItem.classList.add("repo");
    repoItem.innerHTML = `<h3>${repo.name}</h3>`
    repoList.append(repoItem);
  }
};

repoList.addEventListener("click", function(e) {
  if(e.target.matches("h3")) {
     const repoName = e.target.innerText;
     getRepoInfo(repoName);
  }
});

const getRepoInfo = async function(repoName) {
  const fetchInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
  const repoInfo = await fetchInfo.json();
  console.log(repoInfo);
  const fetchLanguages = await fetch(repoInfo.languages_url);
  const languageData = await fetchLanguages.json();
  //console.log(languageData);

  ///make list of languages
  const languages = [];
  for(const language in languageData) {
    languages.push(language);
  }
  //console.log(languages);
  displayRepoInfo(repoInfo, languages);
};

const displayRepoInfo = function(repoInfo, languages) {
  backToRepos.classList.remove("hide");
  repoDataSection.innerHTML = "";
  repoDataSection.classList.remove("hide");
  reposSection.classList.add("hide");
  const div = document.createElement("div");
  div.innerHTML = `<h3>Name: ${repoInfo.name}</h3>
  <p>Description: ${repoInfo.description}</p>
  <p>Default Branch: ${repoInfo.default_branch}</p>
  <p>Languages: ${languages.join(", ")}</p>
  <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">Veiw Repo on GitHub!</a>`;
  repoDataSection.append(div);
};
 
backToRepos.addEventListener("click", function() {
  reposSection.classList.remove("hide");
  repoDataSection.classList.add("hide");
  backToRepos.classList.add("hide");
});

filterInput.addEventListener("input", function(e) {
  const searchInput = e.target.value;
  //console.log(searchInput);
  const repos = document.querySelectorAll(".repo");
  const searchLowerText = searchInput.toLowerCase();

  for(const repo of repos){
    const repoLowerText = repo.innerText.toLowerCase();
    if(repoLowerText.includes(searchLowerText)) {
      repo.classList.remove("hide");
    } else {
      repo.classList.add("hide");
    }
  }
});





///language url : "https://api.github.com/repos/Chad-J-B/Potluck-Guestlist/languages"