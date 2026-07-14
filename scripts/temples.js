const hamButton = document.querySelector('#menu-button');
const navigation = document.querySelector('#nav-menu');

hamButton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    hamButton.classList.toggle('open');
    const isExpanded = hamButton.getAttribute('aria-expanded') === 'true';
    hamButton.setAttribute('aria-expanded', !isExpanded);
});