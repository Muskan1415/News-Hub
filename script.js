const API_KEY = "6de0aa0a36614eda8aa527670b5901ea";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', () => fetchNews("India"));

async function fetchNews(query) {
  const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
  const data = await res.json();
  bindData(data.articles);
}

function bindData(articles) {
  const cardsContainer = document.getElementById('cards-container');
  const newsCardTemplate = document.getElementById('template-news-card');

  cardsContainer.innerHTML = '';

  articles.forEach(article => {
    if (!article.urlToImage) return;

    const cardClone = newsCardTemplate.content.cloneNode(true);
    const newsImg = cardClone.querySelector(".news-img");
    const newsTitle = cardClone.querySelector(".news-title");
    const newsSource = cardClone.querySelector(".news-source");
    const newsDesc = cardClone.querySelector(".news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.textContent = article.title;
    newsDesc.textContent = article.description || "";

    const date = new Date(article.publishedAt).toLocaleDateString('en-US', {
      timeZone: 'Asia/Jakarta'
    });
    newsSource.textContent = `${article.source.name} • ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
      window.open(article.url, "_blank");
    });

    cardsContainer.appendChild(cardClone);
  });
}

let curSelectedNav = null;

function onNavItemClick(id) {
  fetchNews(id);
  const navItem = document.getElementById(id);
  curSelectedNav?.classList.remove('active');
  curSelectedNav = navItem;
  curSelectedNav.classList.add('active');
}

const searchButton = document.querySelector('.search-button');
const searchInput = document.querySelector('.news-input');

searchButton.addEventListener('click', () => {
  const query = searchInput.value.trim();
  if (!query) return;
  fetchNews(query);
  if (curSelectedNav) {
    curSelectedNav.classList.remove('active');
    curSelectedNav = null;
  }
});

// Home button reload
const homeBtn = document.getElementById('home-button');
homeBtn.addEventListener('click', () => {
  window.location.reload();
});
