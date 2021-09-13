const header = document.querySelector('.header__nav')

window.addEventListener('DOMContentLoaded', function(){
    fixHeader()
})

const fixHeader = () => {
    const getScrollY = window.scrollY
    const whenFix = 600
    if (getScrollY >= whenFix) {
        header.classList.add('fixed')
    }else {
        header.classList.remove('fixed')
    }
}
window.addEventListener('scroll',fixHeader)