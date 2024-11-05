const img = document.querySelector('.meme-image');
        const loading = document.querySelector('.loading');
        const errorMessage = document.querySelector('.error-message');
        const subredditLink = document.querySelector('.subreddit');
        const autoPlayToggle = document.getElementById('autoPlayToggle');
        const nextBtn = document.getElementById('nextBtn');
        const shareBtn = document.getElementById('shareBtn');
        let currentSubreddit = '';
        let timer;

        function openReddit(event) {
            event.preventDefault();
            if (currentSubreddit) {
                window.open(`https://reddit.com/r/${currentSubreddit}`, '_blank');
            }
        }
        
        const showLoading = () => {
            loading.style.display = 'block';
            img.style.opacity = '0.3';
            errorMessage.style.display = 'none';
        };

        const hideLoading = () => {
            loading.style.display = 'none';
            img.style.opacity = '1';
        };

        const showError = () => {
            errorMessage.style.display = 'block';
            hideLoading();
        };

        const memeGenerator = async () => {
            showLoading();
            try {
                const res = await fetch("https://meme-api.com/gimme");
                if (!res.ok) throw new Error('Failed to fetch meme');
                
                const json = await res.json();
                img.src = json.url;
                currentSubreddit = json.subreddit;
                subredditLink.textContent = `r/${currentSubreddit}`;
                subredditLink.href = `https://reddit.com/r/${currentSubreddit}`;
                
                img.onload = () => {
                    hideLoading();
                    img.classList.add('fade-in');
                    setTimeout(() => img.classList.remove('fade-in'), 500);
                };

                img.onerror = () => {
                    showError();
                };
            } catch (error) {
                showError();
                console.error('Error fetching meme:', error);
            }
        };

        const startAutoPlay = () => {
            timer = setInterval(memeGenerator, 3000);
        };

        const stopAutoPlay = () => {
            clearInterval(timer);
        };

        // Event Listeners
        nextBtn.addEventListener('click', () => {
            stopAutoPlay();
            memeGenerator();
            if (autoPlayToggle.checked) startAutoPlay();
        });

        shareBtn.addEventListener('click', async () => {
            try {
                await navigator.share({
                    title: 'Check out this meme!',
                    url: img.src
                });
            } catch (err) {
                window.open(img.src, '_blank');
            }
        });

        autoPlayToggle.addEventListener('change', (e) => {
            if (e.target.checked) {
                startAutoPlay();
            } else {
                stopAutoPlay();
            }
        });

        img.addEventListener('mouseover', stopAutoPlay);
        img.addEventListener('mouseleave', () => {
            if (autoPlayToggle.checked) startAutoPlay();
        });

        // Initial load
        memeGenerator();
        if (autoPlayToggle.checked) startAutoPlay();