function initHeader() {
    const languageOptions = document.querySelectorAll('.language-select');
    const languageIndicator = document.getElementById('languageIndicator');

    if (languageOptions && languageIndicator) {
        languageOptions.forEach(option => {
            option.addEventListener('click', function(e) {
                e.preventDefault();
                languageIndicator.textContent = this.getAttribute('data-lang');
                languageOptions.forEach(opt => opt.classList.remove('fw-bold'));
                this.classList.add('fw-bold');
            });
        });
    }
}
