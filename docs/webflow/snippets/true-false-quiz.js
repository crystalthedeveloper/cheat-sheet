$(document).ready(function () {
    $('.quiz-cms-item').each(function () {
        var $collectionItem = $(this);
        var formSubmitted = false;

        // Event handler for true option
        $collectionItem.find('.quiz-cms-link-true').on('click', function () {
            if (!formSubmitted) {
                $(this).find('.icon-circle').addClass('selected');
                $collectionItem.find('.quiz-cms-link-false .icon-circle').removeClass('selected'); // Remove 'selected' class from false elements
            }
        });
        // Event handler for false option
        $collectionItem.find('.quiz-cms-link-false').on('click', function () {
            if (!formSubmitted) {
                $(this).find('.icon-circle').addClass('selected');
                $collectionItem.find('.quiz-cms-link-true .icon-circle').removeClass('selected'); // Remove 'selected' class from true elements
            }
        });
        // Event handler for submit button
        $collectionItem.find('.sumbit-answer').on('click', function () {
            formSubmitted = true;
            var totalQuestions = $collectionItem.length;
            var answeredQuestions = $collectionItem.find('.quiz-cms-link-true .selected .status.correct').length + $collectionItem.find('.quiz-cms-link-false .selected .status.correct').length;
            if ($collectionItem.find('.quiz-cms-link-true .selected').find('.status').hasClass('correct')) {
                $collectionItem.find('.quiz-cms-link-true .icon-circle').addClass('answer-true');
                console.log("true");
            } else if ($collectionItem.find('.quiz-cms-link-true .selected').find('.status').hasClass('incorrect')) {
                $collectionItem.find('.quiz-cms-link-true .icon-circle').addClass('answer-false');
                console.log("false");
            } else if ($collectionItem.find('.quiz-cms-link-false .selected').find('.status').hasClass('incorrect')) {
                $collectionItem.find('.quiz-cms-link-false .icon-circle').addClass('answer-false');
                console.log("false");
            } else if ($collectionItem.find('.quiz-cms-link-false .selected').find('.status').hasClass('correct')) {
                $collectionItem.find('.quiz-cms-link-false .icon-circle').addClass('answer-true');
                console.log("true");
            }
            // Check if all questions are answered
            if (totalQuestions === answeredQuestions) {
                console.log("Quiz passed!");
                $('.pass-wrap', $collectionItem).addClass('completed').removeClass('hide');
            } else {
                console.log("Quiz failed.");
                $('.wrong-wrap', $collectionItem).addClass('completed').removeClass('hide');
            }
        });
    });
});