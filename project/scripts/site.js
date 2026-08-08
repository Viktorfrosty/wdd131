const menuItems = [
  {
    id: 'sourdough-loaf',
    name: 'Heritage Sourdough',
    category: 'bread',
    price: 6.5,
    description: 'A crisp, tangy loaf baked fresh each morning using our signature starter.',
    image: 'images/bread_selection.webp',
  },
  {
    id: 'almond-croissant',
    name: 'Almond Croissant',
    category: 'pastry',
    price: 4.75,
    description: 'Flaky pastry filled with almond cream, topped with toasted almonds and powdered sugar.',
    image: 'images/croissant-spotlight.webp',
  },
  {
    id: 'latte',
    name: 'Vanilla Latte',
    category: 'coffee',
    price: 3.95,
    description: 'Smooth espresso with steamed milk and house-made vanilla syrup.',
    image: 'images/coffee_drinks.webp',
  },
  {
    id: 'baguette',
    name: 'Classic Baguette',
    category: 'bread',
    price: 3.75,
    description: 'A crisp exterior and a soft interior make this a perfect sandwich companion.',
    image: 'images/bread_selection.webp',
  },
  {
    id: 'morning-bun',
    name: 'Cinnamon Morning Bun',
    category: 'pastry',
    price: 4.25,
    description: 'Sweet and spiced with a caramel glaze, ideal for a cozy breakfast treat.',
    image: 'images/counter-bakery.webp',
  },
  {
    id: 'espresso',
    name: 'Double Espresso',
    category: 'coffee',
    price: 2.95,
    description: 'Rich and bold espresso served in a small cup for an energizing pick-me-up.',
    image: 'images/coffee_drinks.webp',
  },
];

const favoriteKey = 'bakery-favorites';

const getFavorites = () => {
  const stored = localStorage.getItem(favoriteKey);
  return stored ? JSON.parse(stored) : [];
};

const saveFavorites = (favorites) => {
  localStorage.setItem(favoriteKey, JSON.stringify(favorites));
};

const updateFavoriteCount = () => {
  const countElement = document.querySelector('#favorite-count');
  if (!countElement) return;
  const favorites = getFavorites();
  countElement.textContent = `Favorites saved: ${favorites.length}`;
};

const renderFeaturedItems = () => {
  const featuredContainer = document.querySelector('#featured-items');
  if (!featuredContainer) return;
  const featured = menuItems.filter((item) => item.category !== 'coffee').slice(0, 4);
  featuredContainer.innerHTML = featured
    .map(
      (item) => `
        <article class="feature-card">
          <h3>${item.name}</h3>
          <p>${item.description}</p>
          <p><strong>Price:</strong> $${item.price.toFixed(2)}</p>
        </article>
      `
    )
    .join('');
};

const renderMenu = (filter = 'all') => {
  const menuGrid = document.querySelector('#menu-grid');
  if (!menuGrid) return;

  const filterButtons = document.querySelectorAll('.filter-button');
  filterButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.filter === filter);
  });

  const filteredItems = filter === 'all' ? menuItems : menuItems.filter((item) => item.category === filter);

  menuGrid.innerHTML = filteredItems
    .map((item) => {
      const favorites = getFavorites();
      const isFavorite = favorites.includes(item.id);
      return `
        <article class="menu-card">
          <img src="${item.image}" alt="${item.name}" loading="lazy">
          <h2>${item.name}</h2>
          <p class="menu-meta">${item.description}</p>
          <p class="price">$${item.price.toFixed(2)}</p>
          <div class="menu-footer">
            <button class="favorite-button ${isFavorite ? 'active' : ''}" data-id="${item.id}">
              ${isFavorite ? 'Saved' : 'Save favorite'}
            </button>
            <span class="menu-category">${item.category}</span>
          </div>
        </article>
      `;
    })
    .join('');

  const favoriteButtons = menuGrid.querySelectorAll('.favorite-button');
  favoriteButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const itemId = button.dataset.id;
      const favorites = getFavorites();
      const isActive = favorites.includes(itemId);

      const updated = isActive ? favorites.filter((id) => id !== itemId) : [...favorites, itemId];
      saveFavorites(updated);
      renderMenu(filter);
      updateFavoriteCount();
    });
  });
};

const handleFilterClick = () => {
  const filterButtons = document.querySelectorAll('.filter-button');
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      renderMenu(button.dataset.filter);
    });
  });
};

const initNavigation = () => {
  const menuToggle = document.querySelector('#menu-toggle');
  const navigation = document.querySelector('#primary-navigation');
  if (!menuToggle || !navigation) return;

  menuToggle.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navigation.classList.contains('open')) {
      navigation.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.focus();
    }
  });
};

window.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  renderFeaturedItems();
  renderMenu();
  handleFilterClick();
  updateFavoriteCount();
});