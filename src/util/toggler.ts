const html = document.querySelector('html')!;
document.querySelector<HTMLElement>('.bulb')!.addEventListener('click', () => {
    html.classList.toggle('mode--dark');
    html.classList.toggle('mode--light');
})