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
        $projectsLink.addClass('underline');
        $projects.removeClass('hide');
        $bioLink.removeClass('underline');
        $resumeLink.removeClass('underline');
        $bio.addClass('hide');
        $resume.addClass('hide');
    });

    $bioLink.on('click', () => {
        $bioLink.addClass('underline');
        $projects.addClass('hide');
        $projectsLink.removeClass('underline');
        $resumeLink.removeClass('underline');
        $bio.removeClass('hide');
        $resume.addClass('hide');
    });

    $resumeLink.on('click', () => {
        $resumeLink.addClass('underline');
        $projects.addClass('hide');
        $bioLink.removeClass('underline');
        $projectsLink.removeClass('underline');
        $bio.addClass('hide');
        $resume.removeClass('hide');
    });

});
