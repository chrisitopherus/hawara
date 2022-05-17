"use strict";
const wrapper = document.getElementById('wrapper');
document.querySelector('.bulb').addEventListener('click', () => {
    wrapper.classList.toggle('mode--dark');
    wrapper.classList.toggle('mode--light');
});
//# sourceMappingURL=toggler.js.map