function Visibility(node) {
    let $WindowHeight = $(window).outerHeight(),
        $WindowScrollTop = $(window).scrollTop(),
        $NodeHeight = node.outerHeight(true),
        $NodeTop = node.offset().top

    if ($WindowScrollTop + $WindowHeight > $NodeTop && $WindowScrollTop < $NodeTop + $NodeHeight) {
        return true
    } else {
        return false
    }

}

export default Visibility