$(function() {
    const videoSections = [
        { video: $('#video1').get(0), section: $('.video-section').eq(0) },
        { video: $('#video2').get(0), section: $('.video-section').eq(1) }
    ];

    videoSections.forEach(({ video, section }) => {
        if (!video) {
            console.error("Video element not found");
            return;
        }

        const sectionOffsetTop = section.offset().top;
        const sectionHeight = section.outerHeight();

        $(window).on('scroll', function() {
            const currentScrollPosition = $(document).scrollTop();

            // 當滾動到影片區塊範圍時
            if (currentScrollPosition >= sectionOffsetTop && currentScrollPosition < sectionOffsetTop + sectionHeight) {
                // 計算滾動進度
                const scrollProgress = (currentScrollPosition - sectionOffsetTop) / sectionHeight;

                // 將滾動進度對應到影片播放進度
                video.currentTime = scrollProgress * video.duration;

                // 確保影片在滾動到區塊底部前播放完畢
                if (scrollProgress >= 1) {
                    video.currentTime = video.duration;
                    video.pause();
                }
            } else if (currentScrollPosition < sectionOffsetTop) {
                // 如果在影片區塊之前滾動，重置影片
                video.currentTime = 0;
            }
        });
    });
});