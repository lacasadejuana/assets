export function generatePaginationHTML(el, args) {
    var template = '<li class="page-item"><\/li>';
    var linkTemplate = '<a class="page-link"><\/a>';
    var currentPage = args.currentPage;
    var totalPage = args.totalPage;
    var rangeStart = args.rangeStart;
    var rangeEnd = args.rangeEnd;
    var i;
    // Disable page range, display all the pages
    if (args.pageRange === null) {
        for (i = 1; i <= totalPage; i++) {
            var button = $(template)
                .attr('data-num', i)
                .append($(linkTemplate).html(i));
            if (i == currentPage) {
                button.addClass('active');
            }
            el.append(button);
        }
        return;
    }
    if (rangeStart <= 3) {
        for (i = 1; i < rangeStart; i++) {
            var button = $(template)
                .attr('data-num', i)
                .append($(linkTemplate).html(i));
            if (i == currentPage) {
                button.addClass('active');
            }
            el.append(button);
        }
    }
    else {
        var button = $(template)
            .attr('data-num', 1)
            .append($(linkTemplate).html('1'));
        el.append(button);
        var button = $(template)
            .addClass('disabled')
            .append($(linkTemplate).html('...'));
        el.append(button);
    }
    for (i = rangeStart; i <= rangeEnd; i++) {
        var button = $(template)
            .attr('data-num', i)
            .append($(linkTemplate).html(i));
        if (i == currentPage) {
            button.addClass('active');
        }
        el.append(button);
    }
    if (rangeEnd >= totalPage - 2) {
        for (i = rangeEnd + 1; i <= totalPage; i++) {
            var button = $(template)
                .attr('data-num', i)
                .append($(linkTemplate).html(i));
            el.append(button);
        }
    }
    else {
        var button = $(template)
            .addClass('disabled')
            .append($(linkTemplate).html('...'));
        el.append(button);
        var button = $(template)
            .attr('data-num', totalPage)
            .append($(linkTemplate).html(totalPage));
        el.append(button);
    }
}
export function createPagination(paginationSetting) {
    var el = $('<ul class="pagination" role="navigation"></ul>');
    var currentPage = paginationSetting.current_page;
    var pageRange = 5;
    var totalPage = Math.ceil(paginationSetting.total / paginationSetting.per_page);
    var rangeStart = currentPage - pageRange;
    var rangeEnd = currentPage + pageRange;
    if (rangeEnd > totalPage) {
        rangeEnd = totalPage;
        rangeStart = totalPage - pageRange * 2;
        rangeStart = rangeStart < 1 ? 1 : rangeStart;
    }
    if (rangeStart <= 1) {
        rangeStart = 1;
        rangeEnd = Math.min(pageRange * 2 + 1, totalPage);
    }
    generatePaginationHTML(el, {
        totalPage: totalPage,
        currentPage: currentPage,
        pageRange: pageRange,
        rangeStart: rangeStart,
        rangeEnd: rangeEnd
    });
    $('#pagination').append(el);
}
//# sourceMappingURL=generatePaginationHTML.js.map