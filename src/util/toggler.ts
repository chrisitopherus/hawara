const wrapper = document.getElementById('wrapper') as HTMLDivElement;
document.querySelector<HTMLElement>('.bulb')!.addEventListener('click', () => {
    wrapper.classList.toggle('mode--dark');
    wrapper.classList.toggle('mode--light');
})