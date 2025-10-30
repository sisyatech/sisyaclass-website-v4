<?php /* reviews.php */ ?>
<div class="reviews-wrapper">
    <h2 class="section-head">Trusted by Parents, Loved by Students</h2>
    <div class="section-sub">More than promises — results you can see</div>

    <div class="reviews-row">
        <!-- LEFT SUMMARY -->
        <aside class="summary" id="summaryBox">
            <h4>EXCELLENT</h4>
            <div class="stars" aria-label="5 out of 5">
                <?php for ($i = 0; $i < 5; $i++): ?>
                    <img src="./assets/star-filled.svg" alt="star" class="star-icon">
                <?php endfor; ?>
            </div>
            <div class="rating-big" id="ratingScore">5.0</div>
            <div class="rating-note" id="ratingNote">Based on 98 reviews</div>
            <div class="google-badge">
                <img class="google-logo" src="./assets/google_b.svg" alt="Google Reviews">
            </div>
        </aside>

        <!-- RIGHT CAROUSEL -->
        <section class="carousel">
            <button class="arrow prev" id="prevBtn" aria-label="Previous">
                <svg viewBox="0 0 24 24">
                    <path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                </svg>
            </button>
            <div class="viewport" id="viewport" style="position:relative;">
                <div class="track" id="track"></div>
            </div>
            <button class="arrow next" id="nextBtn" aria-label="Next">
                <svg viewBox="0 0 24 24">
                    <path d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6z" />
                </svg>
            </button>
        </section>
    </div>
</div>

<style>
    :root {
        --bg: #ffffff;
        --muted: #6b7280;
        --muted-2: #9ca3af;
        --card: #f7f7f8;
        --ring: #e5e7eb;
        --shadow: 0 8px 30px rgba(0, 0, 0, .06);
        --radius: 16px;
        --gap: 16px;
    }

    .reviews-wrapper {
        width: 100%;
        max-width: 1000px;
        margin: 0 auto;
        padding: 20px 0;
        box-sizing: border-box;
    }

    .section-head {
        text-align: center;
        margin-bottom: 4px;
        font-weight: 700;
        font-size: 26px;
    }

    .section-sub {
        text-align: center;
        color: var(--muted);
        font-size: 13px;
        margin-bottom: 18px;
    }

    /* Review Row */
    .reviews-row {
        display: grid;
        grid-template-columns: 220px 1fr;
        gap: 24px;
        align-items: center;
    }

    @media (max-width: 900px) {
        .reviews-row {
            display: flex;
            flex-direction: column;
            gap: 16px;
        }
    }

    /* Summary */
    .summary {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-radius: var(--radius);
        padding: 18px 16px;
    }

    .summary h4 {
        margin: 0 0 8px;
        letter-spacing: .02em;
        font-size: 30px;
        color: #111827;
    }

    @media (max-width:640px) {
        .summary h4 {
            font-size: 20px;
        }
    }

    .stars {
        display: flex;
        gap: 2px;
        margin: 2px 0 6px;
    }

    .stars svg {
        width: 18px;
        height: 18px;
    }

    .rating-big {
        font-weight: 800;
        font-size: 14px;
        color: #111827;
        margin-top: 2px;
    }

    .rating-note {
        color: var(--muted);
        font-size: 12px;
        margin: 4px 0 8px;
        text-align: center;
    }

    .google-badge {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
    }

    .star-icon {
        width: 18px;
        height: 18px;
        display: inline-block;
    }

    .stars-row .star-icon {
        width: 14px;
        height: 14px;
    }

    .google-logo {
        width: 150px;
        height: auto;
    }

    @media (max-width:640px) {
        .google-logo {
            width: 95px;
            height: auto;
        }

    }


    /* Carousel */
    .carousel {
        position: relative;
        flex: 1;
        width: 100%;
        max-width: 100%;
        overflow: hidden;
    }

    .viewport {
        width: 100%;
        overflow-x: auto;
        scroll-snap-type: x mandatory;
        display: flex;
        padding: 0 12px;
        scroll-padding: 12px;

        scrollbar-width: none;
        -ms-overflow-style: none;
    }

    .viewport::-webkit-scrollbar {
        display: none;
    }

    .track {
        display: flex;
        gap: var(--gap);
        scroll-behavior: smooth;
        width: max-content;
        padding-bottom: 4px;
    }

    .card {
        flex: 0 0 230px;
        background: var(--card);
        border: 1px solid var(--ring);
        border-radius: 14px;
        box-shadow: var(--shadow);
        padding: 12px 12px 14px;
        min-height: 200px;
        scroll-snap-align: start;
    }

    @media (max-width:900px) {
        .card {
            flex: 0 0 calc((100% - var(--gap)) / 2);
        }
    }

    @media (max-width:640px) {
        .card {
            flex: 0 0 300px;
            margin: 0 auto;
            scroll-snap-align: center;
            min-height: 180px;
        }

        .viewport {
            padding-left: 8px;
            padding-right: 8px;
        }
    }

    /* Card Head */
    .card-head {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 8px;
    }

    .avatar {
        width: 32px !important;
        height: 32px !important;
        border-radius: 50% !important;
        object-fit: cover;
        border: 1px solid var(--ring);
        background: #fff;
    }

    .who {
        display: flex;
        flex-direction: column;
        line-height: 1.15;
    }

    .name {
        font-weight: 600;
        font-size: 11px;
        color: #111827;
    }

    .date {
        color: var(--muted-2);
        font-size: 10px;
    }

    .g-badge {
        position: absolute;
        top: 10px;
        right: 10px;
        opacity: .8;
    }

    .stars-row {
        display: flex;
        align-items: center;
        gap: 6px;
        margin-bottom: 6px;
    }

    .stars-row .stars svg {
        width: 14px;
        height: 14px;
    }

    .stars-row .stars img {
        width: 20px;
        height: 20px;
    }

    .score-text {
        font-weight: 700;
        font-size: 12px;
        color: #111827;
    }

    .review {
        font-size: 12px;
        color: #374151;
        display: -webkit-box;
        -webkit-line-clamp: 5;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    /* Arrows */
    .arrow {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 36px;
        height: 36px;
        border: none;
        border-radius: 999px;
        background: #fff;
        box-shadow: var(--shadow);
        border: 1px solid var(--ring);
        display: grid;
        place-items: center;
        cursor: pointer;
        z-index: 1000;
    }

    .arrow svg {
        width: 18px;
        height: 18px;
    }

    .arrow:disabled {
        opacity: .6;
        cursor: not-allowed;
    }

    .prev {
        left: 5px;
    }

    .next {
        right: 5px;
    }

    /* Responsive tweaks */
    @media (max-width: 900px) {
        .reviews-row {
            grid-template-columns: 1fr;
            gap: 16px;
        }

        .carousel {
            max-width: 100%;
        }
    }

    @media (max-width: 640px) {
        .section-head {
            font-size: 20px;
        }

        .section-sub {
            font-size: 12px;
        }

        .review {
            font-size: 11px;
            -webkit-line-clamp: 6;
        }

        .arrow {
            width: 28px;
            height: 28px;
            top: auto;
            bottom: 8px;
            transform: none;
            background: rgba(255, 255, 255, 0.9);
            border: 1px solid var(--ring);
            box-shadow: none;
        }

        .avatar-fallback {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: #ccc;
            color: #333;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 16px;
        }


        .prev {
            left: 35%;
        }

        .next {
            right: 35%;
        }
    }
</style>



<script>
    /* ---- DATA ---- */
    const payload = {
        data: [{
                id: 'f5295a39-6674-4559-b900-332118177ff9',
                userName: 'Anandita Banerjee',
                userImage: 'https://play-lh.googleusercontent.com/a-/ALV-UjXLN4umnLse0EUiybmg0wMbE9npTa7D68_QjzhHK0bhCzI8kzIQ',
                date: '2025-08-11T04:28:41.176Z',
                score: 5,
                scoreText: '5',
                url: 'https://play.google.com/store/apps/details?id=com.sisya.sisyaclass&reviewId=f5295a39-6674-4559-b900-332118177ff9',
                title: null,
                text: "I love about this Sisya Class is a user-friendly app that's perfect for online learning. It offers seamless scheduling, interactive tools, and multimedia support, making it easy for students and educators to collaborate effectively. Overall, it's a strong choice for digital education.",
                replyDate: null,
                replyText: null,
                version: '2.1.4',
                thumbsUp: 1,
                criterias: []
            },
            {
                id: 'efe74a25-fd09-44bd-9865-302be1d5f190',
                userName: 'Aasrit Kaur',
                userImage: 'https://play-lh.googleusercontent.com/a/ACg8ocJeKYKjog594qkQ6xapy3AHncB4XWUZb6a1QqObqxMqODZXUA=mo',
                date: '2025-08-08T12:35:04.475Z',
                score: 5,
                scoreText: '5',
                url: 'https://play.google.com/store/apps/details?id=com.sisya.sisyaclass&reviewId=efe74a25-fd09-44bd-9865-302be1d5f190',
                title: null,
                text: "I’ve been using the Sisya Class App for a while now, and I must say — it’s one of the most reliable and well-structured learning platforms out there. Whether you're a school student or preparing for competitive exams, this app makes concepts clear, engaging, and easy to understand.",
                replyDate: null,
                replyText: null,
                version: '2.1.4',
                thumbsUp: 1,
                criterias: []
            },
            {
                id: '8cfef395-e46a-4371-9bbe-934b36ee9533',
                userName: 'Shabaaz Baig',
                userImage: 'https://play-lh.googleusercontent.com/a-/ALV-UjWYedNNIvu2AVKsA3la5pzamd35XolfuBiuVWSmIdVcFcDTr-8',
                date: '2025-08-19T13:56:58.119Z',
                score: 5,
                scoreText: '5',
                url: 'https://play.google.com/store/apps/details?id=com.sisya.sisyaclass&reviewId=8cfef395-e46a-4371-9bbe-934b36ee9533',
                title: null,
                text: "Sisya is a great app where you can learn maths easily for people who think maths is hard even I was weak in maths but now I'm seriously improving thanks to sisya and especially snehal sir who teaches me maths like it's like solving a puzzle so thanks again sisya for helping me in my studies and regaining my reputation in my class thanks�",
                replyDate: null,
                replyText: null,
                version: '2.1.4',
                thumbsUp: 1,
                criterias: []
            },
            {
                id: '3ef9c389-5082-4f60-a2f8-cd1840611756',
                userName: 'C.S. Sachindra',
                userImage: 'https://play-lh.googleusercontent.com/a-/ALV-UjXoTZs_x9g8coepdsY1dl_J8Rxd7SuOubnjYYEI6-BGp_l6an4y',
                date: '2025-05-20T10:37:22.263Z',
                score: 5,
                scoreText: '5',
                url: 'https://play.google.com/store/apps/details?id=com.sisya.sisyaclass&reviewId=3ef9c389-5082-4f60-a2f8-cd1840611756',
                title: null,
                text: "My brother has been learning through the Sisya app, and the experience has been amazing for him. The AI-powered features and instant doubt support have really made his learning smoother and more efficient. What stands out the most is the teaching style – it's interactive and engaging, which helps him stay interested in his studies. Definitely a great platform for students!",
                replyDate: null,
                replyText: null,
                version: '1.1.8',
                thumbsUp: 1,
                criterias: []
            },
            {
                id: '4d3ca5e5-7356-41e2-9148-289dcec0f514',
                userName: 'JASMINE ZAIDI',
                userImage: 'https://play-lh.googleusercontent.com/a/ACg8ocIVxsSTkM6fIpY8mAgiiWfK27NCZsC0p94HqKjtdFLTx5O6MHAx=mo',
                date: '2025-05-20T10:10:07.906Z',
                score: 5,
                scoreText: '5',
                url: 'https://play.google.com/store/apps/details?id=com.sisya.sisyaclass&reviewId=4d3ca5e5-7356-41e2-9148-289dcec0f514',
                title: null,
                text: "Sisya is a great small edtech company that offers quality learning in a fun and easy way. The content is clear, engaging, and perfect for young learners. The team is supportive and truly cares about education. A wonderful platform for kids to learn and grow!",
                replyDate: '2025-07-01T12:23:32.492Z',
                replyText: "Hi,\nThanks for your feedback. We are continuously working on adding more features to our app to make your experience better.",
                version: '1.1.8',
                thumbsUp: 0,
                criterias: []
            },
            {
                id: '7e86bbd6-67b7-423c-b869-0405e4c46663',
                userName: '011 cadet Yasmin',
                userImage: 'https://play-lh.googleusercontent.com/a-/ALV-UjVbvJg1FaaoZPcQcF456HgZIqLqkuBl3f6Gz8YMdi1i5HzA6krm',
                date: '2025-05-20T10:43:00.592Z',
                score: 5,
                scoreText: '5',
                url: 'https://play.google.com/store/apps/details?id=com.sisya.sisyaclass&reviewId=7e86bbd6-67b7-423c-b869-0405e4c46663',
                title: null,
                text: "Sisya Class has been a game changer in my child's learning journey. The content is clear, engaging and tailored to help students truly understand concepts. I have seen real improvement in my child's studies thanks to their dedicated approach and support.I'm truly grateful for the excellent quality education they provide..Thank you SISYA CLASS!",
                replyDate: null,
                replyText: null,
                version: '1.1.8',
                thumbsUp: 0,
                criterias: []
            },
            {
                id: '8cce27f4-2de7-477c-bb14-cd091d148c89',
                userName: 'pavan yaswant',
                userImage: 'https://play-lh.googleusercontent.com/a-/ALV-UjVFowfahWoZiEX-xTFmdvIxCdeL3oibuB77TK1dKfsCdmyL1mxYnQ',
                date: '2025-05-20T10:43:50.590Z',
                score: 5,
                scoreText: '5',
                url: 'https://play.google.com/store/apps/details?id=com.sisya.sisyaclass&reviewId=8cce27f4-2de7-477c-bb14-cd091d148c89',
                title: null,
                text: "great UI, fast response, and user friendly experience and the AI is top notch and classes were amazing their mentors and master teachers were really helpful in solving the doubts , would for sure recommend to join you or your child for jee preparation.",
                replyDate: '2025-07-01T12:23:08.110Z',
                replyText: "Hi,\nThanks for your feedback. We are continuously working on adding more features to our app to make your experience better.",
                version: '1.1.8',
                thumbsUp: 0,
                criterias: []
            }
        ],
        nextPaginationToken: null
    };

    const fmtDate = iso => {
        try {
            const d = new Date(iso);
            return d.toISOString().slice(0, 10);
        } catch (e) {
            return "";
        }
    };
    const starSVG = (filled = true) => filled ?
        '<img src="./assets/star-filled.svg" alt="star" class="star-icon"/>' :
        '<img src="./assets/star-half.svg" alt="star" class="star-icon"/>';


    /* ---- Render Left Summary ---- */
    (function initSummary() {
        const score = 4.8;
        const basedOn = 300;
        document.getElementById('ratingScore').textContent = score.toFixed(1);
        document.getElementById('ratingNote').textContent = `Based on ${basedOn}+ reviews`;
    })();

    /* ---- Render Cards ---- */
    const track = document.getElementById('track');
    payload.data.forEach(r => {
        const card = document.createElement('article');
        card.className = 'card';
        card.innerHTML = `
        <div class="g-badge" aria-hidden="true">
          <img src="./assets/gogle_s.svg" alt="star" class="star-icon">
        </div>
        <div class="card-head">
          <img 
        class="avatar" 
        src="${r.userImage}" 
        alt="${r.userName}" 
        onerror="this.onerror=null; this.outerHTML='<div class=&quot;avatar-fallback&quot;>${r.userName.charAt(0).toUpperCase()}</div>'"
      />

          <div class="who">
            <div class="name">${r.userName}</div>
            <div class="date">${fmtDate(r.date)}</div>
          </div>
        </div>
        <div class="stars-row">
          <div class="stars" aria-label="5 out of 5">
    <?php for ($i = 0; $i < 5; $i++): ?>
        <img src="./assets/star-filled.svg" alt="star" class="star-icon">
    <?php endfor; ?>
</div>
          <div class="score-text"><img src="./assets/blue_tick.svg" alt="star" class="star-icon"></div>
        </div>
        <div class="review">${r.text ? r.text : ""}</div>
      `;
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
            window.open(r.url, '_blank');
        })
        track.appendChild(card);
    });

    /* ---- Arrow Logic ---- */
    const viewport = document.getElementById('viewport');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    function updateArrows() {
        const maxScroll = track.scrollWidth - viewport.clientWidth;
        prevBtn.disabled = viewport.scrollLeft <= 0;
        nextBtn.disabled = viewport.scrollLeft >= (maxScroll - 2);
    }

    function scrollByPage(dir) {
        const page = viewport.clientWidth - 24;
        viewport.scrollBy({
            left: dir * page,
            behavior: 'smooth'
        });
        setTimeout(updateArrows, 320);
    }

    prevBtn.addEventListener('click', () => scrollByPage(-1));
    nextBtn.addEventListener('click', () => scrollByPage(1));
    viewport.addEventListener('scroll', updateArrows);
    window.addEventListener('resize', updateArrows);
    updateArrows();
</script>