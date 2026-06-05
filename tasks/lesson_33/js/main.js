$(document).ready(function() {
    const apiKey = '18eaeb4f';
    let currentQuery = '';
    let currentType = 'movie';
    let currentPage = 1;

    $('#search-form').on('submit', function(e) {
        e.preventDefault();
        currentQuery = $('#title-input').val().trim();
        currentType = $('#type-select').val();
        currentPage = 1;

        if (currentQuery) {
            searchMovies(currentQuery, currentType, currentPage);
        }
    });

    function searchMovies(query, type, page) {
        const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(query)}&type=${type}&page=${page}`;

        $('#message-container').hide().empty();
        $('#details-section').hide().empty();

        $.ajax({
            url: url,
            method: 'GET',
            dataType: 'json',
            success: function(response) {
                if (response.Response === 'True') {
                    renderMovies(response.Search);
                    renderPagination(parseInt(response.totalResults), page);
                    $('#results-section').show();
                } else {
                    $('#results-section').hide();
                    showError(response.Error === 'Movie not found!' ? 'Movie not found!' : response.Error);
                }
            },
            error: function() {
                $('#results-section').hide();
                showError('Error connecting to the movie database.');
            }
        });
    }

    function renderMovies(movies) {
        const $grid = $('#movie-grid');
        $grid.empty();

        movies.forEach(movie => {
            const poster = movie.Poster !== 'N/A' ? movie.Poster : './assets/img/no_poster.svg';
            const movieCard = `
                <div class="movie-card">
                    <div class="movie-card__poster-wrapper">
                        <img src="${poster}" alt="${movie.Title}" class="movie-card__poster">
                    </div>
                    <div class="movie-card__content">
                        <h3 class="movie-card__title" title="${movie.Title}">${movie.Title}</h3>
                        <span class="movie-card__year">${movie.Year}</span>
                        <button class="movie-card__btn" data-id="${movie.imdbID}">Details</button>
                    </div>
                </div>
            `;
            $grid.append(movieCard);
        });

        $('.movie-card__btn').on('click', function() {
            const imdbID = $(this).data('id');
            showMovieDetails(imdbID);
        });
    }

    function renderPagination(totalResults, currentPage) {
        const $pagination = $('#pagination');
        $pagination.empty();

        const totalPages = Math.ceil(totalResults / 10);
        if (totalPages <= 1) return;

        const maxButtons = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
        let endPage = Math.min(totalPages, startPage + maxButtons - 1);

        if (endPage - startPage + 1 < maxButtons) {
            startPage = Math.max(1, endPage - maxButtons + 1);
        }

        if (currentPage > 1) {
            $pagination.append(`<button class="movie-results__page-btn" data-page="${currentPage - 1}">◀</button>`);
        }

        for (let i = startPage; i <= endPage; i++) {
            const activeClass = i === currentPage ? 'movie-results__page-btn--active' : '';
            $pagination.append(`<button class="movie-results__page-btn ${activeClass}" data-page="${i}">${i}</button>`);
        }

        if (currentPage < totalPages) {
            $pagination.append(`<button class="movie-results__page-btn" data-page="${currentPage + 1}">▶</button>`);
        }

        $('.movie-results__page-btn').on('click', function() {
            const page = $(this).data('page');
            currentPage = page;
            searchMovies(currentQuery, currentType, page);
        });
    }

    function showMovieDetails(imdbID) {
        const url = `https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}&plot=full`;

        $.ajax({
            url: url,
            method: 'GET',
            dataType: 'json',
            success: function(response) {
                if (response.Response === 'True') {
                    renderDetails(response);
                    $('html, body').animate({
                        scrollTop: $('#details-section').offset().top - 40
                    }, 500);
                }
            }
        });
    }

    function renderDetails(movie) {
        const $details = $('#details-section');
        const poster = movie.Poster !== 'N/A' ? movie.Poster : './assets/img/no_poster.svg';

        const detailsHtml = `
            <div class="movie-details__card">
                <div class="movie-details__left">
                    <img src="${poster}" alt="${movie.Title}" class="movie-details__poster">
                </div>
                <div class="movie-details__right">
                    <div class="movie-details__meta">
                        <div class="movie-details__title-area">
                            <h2 class="movie-details__title">${movie.Title}</h2>
                            <span class="movie-details__release">Released: ${movie.Released}</span>
                        </div>
                        <div class="movie-details__score">
                            <svg viewBox="0 0 64 64" class="movie-details__score-svg">
                                <circle cx="32" cy="32" r="28" class="movie-details__score-track"></circle>
                                <circle cx="32" cy="32" r="28" class="movie-details__score-bar" style="stroke-dashoffset: ${175.9 - (175.9 * (parseFloat(movie.imdbRating) || 0) / 10)};"></circle>
                                <text x="32" y="37" text-anchor="middle" class="movie-details__score-text">${movie.imdbRating !== 'N/A' ? movie.imdbRating : 'N/A'}</text>
                            </svg>
                        </div>
                    </div>
                    
                    <div class="movie-details__specs">
                        <div class="movie-details__spec-item"><strong>Genre:</strong> ${movie.Genre}</div>
                        <div class="movie-details__spec-item"><strong>Runtime:</strong> ${movie.Runtime}</div>
                        <div class="movie-details__spec-item"><strong>Director:</strong> ${movie.Director}</div>
                        <div class="movie-details__spec-item"><strong>Actors:</strong> ${movie.Actors}</div>
                        <div class="movie-details__spec-item"><strong>Language:</strong> ${movie.Language}</div>
                        <div class="movie-details__spec-item"><strong>Awards:</strong> ${movie.Awards}</div>
                    </div>

                    <p class="movie-details__description">${movie.Plot}</p>
                </div>
            </div>
        `;

        $details.html(detailsHtml).show();
    }

    function showError(message) {
        $('#message-container')
            .html(`<div class="movie-message__error">${message}</div>`)
            .css('display', 'flex');
    }
});
