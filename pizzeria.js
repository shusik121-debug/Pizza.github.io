const menu = document.querySelector('.menu');
let isSticky = false;

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    
    if (scrollY >= windowHeight - 100) {
        if (!isSticky) {
            menu.style.position = 'fixed';
            menu.style.top = '0';
            menu.style.bottom = 'auto';
            menu.style.left = '0';
            menu.style.width = '100%';
            menu.style.display = 'flex'; 
            menu.style.zIndex = '1000';
            menu.style.marginTop = '0'; 
            isSticky = true;
        }
    } else {
        if (isSticky) {
            menu.style.position = 'absolute'; 
            menu.style.top = 'auto';
            menu.style.bottom = '20';
            menu.style.left = '0';
            menu.style.width = '100%';
            menu.style.display = 'flex';
            menu.style.marginTop = 'calc(70vh - 100px)';
            isSticky = false;
        }
    }
});

const targetDiv = [
    document.getElementById('catalog'),
    document.getElementById('Reviews-about-us'),
];
const mainDiv = document.getElementById('main');
const button = document.querySelector('.floating-btn');

const observer = new IntersectionObserver((entries) => {
    const isMainVisible = entries.some(entry => {
        return entry.target.id === 'main' && 
               (entry.intersectionRatio > 0.1 || entry.intersectionRect.height / window.innerHeight > 0.1);
    });
    button.style.display = isMainVisible ? 'none' : 'block';
}, {
    threshold: [0.2, 0.3, 0.4, 0.5, 0.7, 1]
});
if (mainDiv) observer.observe(mainDiv);
targetDiv.forEach(div => {
    if (div) observer.observe(div);
});

document.addEventListener('DOMContentLoaded', () => {
    const mainArea = document.getElementById('main');
    
    const menuMap = {
        'popular-catalog': document.querySelector('.menu .popular'),
        'pizza-catalog': document.querySelector('.menu .pizza'),
        'snacks-catalog': document.querySelector('.menu .snacks'),
        'Drinks-catalog': document.querySelector('.menu .drinks'),
        'Desserts-catalog': document.querySelector('.menu .Desserts'),
        'sauces-catalog': document.querySelector('.menu .Sauces'),
        'Combo-catalog': document.querySelector('.menu .Combo'),
        'Reviews-about-us': document.querySelector('.menu .Reviews')
    };
    
    const sections = Object.keys(menuMap).map(id => document.getElementById(id));
    
    function removeActiveClass() {
        Object.values(menuMap).forEach(menuItem => {
            if (menuItem) menuItem.classList.remove('active');
        });
    }
    
    function setActiveSection(sectionId) {
        if (mainArea) {
            const rect = mainArea.getBoundingClientRect();
            const isInMain = rect.top <= 0 && rect.bottom >= window.innerHeight;
            const scrollTop = mainArea.scrollTop;
            const isScrollingInMain = scrollTop > 0;
            
            if (isInMain || isScrollingInMain) {
                return;
            }
        }
        
        removeActiveClass();
        const activeMenuItem = menuMap[sectionId];
        if (activeMenuItem) {
            activeMenuItem.classList.add('active');
        }
    }
    
    const observer = new IntersectionObserver((entries) => {
        let maxRatio = 0;
        let mostVisibleSection = null;
        
        entries.forEach(entry => {
            if (entry.intersectionRatio > maxRatio) {
                maxRatio = entry.intersectionRatio;
                mostVisibleSection = entry.target;
            }
        });
        
        if (mostVisibleSection && maxRatio >= 1) {
            setActiveSection(mostVisibleSection.id);
        }
    }, { 
        threshold: [0.5, 0.6, 0.8, 1]
    });
    
    sections.forEach(section => {
        if (section) observer.observe(section);
    });
    
    setTimeout(() => {
        const firstVisible = sections.find(section => {
            const rect = section.getBoundingClientRect();
            return rect.top < window.innerHeight && rect.bottom > 0;
        });
        if (firstVisible) setActiveSection(firstVisible.id);
    }, 100);
});