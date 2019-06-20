$(() => {
    // Nav links
    $projectsLink = $('.projects-link');
    $bioLink = $('.bio-link');
    $resumeLink = $('.resume-link');

    // Containers
    $projects = $('.projects');
    $bio = $('.bio');
    $resume = $('.resume');

    $projectsLink.on('click', () => {
        $projects.removeClass('hide');
        $bio = $('.bio').addClass('hide');
        $resume = $('.resume').addClass('hide');
    });

    $bioLink.on('click', () => {
        $projects.addClass('hide');
        $bio = $('.bio').removeClass('hide');
        $resume = $('.resume').addClass('hide');
    });

    $resumeLink.on('click', () => {
        $projects.addClass('hide');
        $bio = $('.bio').addClass('hide');
        $resume = $('.resume').removeClass('hide');
    });

});
