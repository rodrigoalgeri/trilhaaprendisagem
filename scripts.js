document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    const navLinks = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('.section');
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    // Menu toggle for mobile
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('show');
    });
    
    // Navigation click handler
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            
            // Hide all sections
            sections.forEach(section => {
                section.classList.remove('active');
            });
            
            // Show target section
            document.getElementById(targetId).classList.add('active');
            
            // Update active link
            navLinks.forEach(navLink => {
                navLink.classList.remove('active');
            });
            this.classList.add('active');
            
            // Close mobile menu if open
            navMenu.classList.remove('show');
            
            // Scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });
    
    // Start Journey button
    const startJourneyBtn = document.getElementById('start-journey');
    if (startJourneyBtn) {
        startJourneyBtn.addEventListener('click', function() {
            // Hide all sections
            sections.forEach(section => {
                section.classList.remove('active');
            });
            
            // Show trilhas section
            document.getElementById('trilhas').classList.add('active');
            
            // Update active link
            navLinks.forEach(navLink => {
                navLink.classList.remove('active');
            });
            document.querySelector('nav ul li a[href="#trilhas"]').classList.add('active');
            
            // Scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Testimonials Carousel
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const indicators = document.querySelectorAll('.carousel-indicators .indicator');
    const prevTestimonial = document.getElementById('prev-testimonial');
    const nextTestimonial = document.getElementById('next-testimonial');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonialCards.forEach(card => card.classList.remove('active'));
        indicators.forEach(ind => ind.classList.remove('active'));
        
        testimonialCards[index].classList.add('active');
        indicators[index].classList.add('active');
        currentTestimonial = index;
    }
    
    if (prevTestimonial && nextTestimonial) {
        prevTestimonial.addEventListener('click', function() {
            let newIndex = currentTestimonial - 1;
            if (newIndex < 0) newIndex = testimonialCards.length - 1;
            showTestimonial(newIndex);
        });
        
        nextTestimonial.addEventListener('click', function() {
            let newIndex = currentTestimonial + 1;
            if (newIndex >= testimonialCards.length) newIndex = 0;
            showTestimonial(newIndex);
        });
        
        // Auto-rotate testimonials
        setInterval(function() {
            let newIndex = currentTestimonial + 1;
            if (newIndex >= testimonialCards.length) newIndex = 0;
            showTestimonial(newIndex);
        }, 7000);
    }
    
    // Click on indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            showTestimonial(index);
        });
    });
    
    // Discover Carousel
    const discoverCarousel = document.getElementById('discover-carousel');
    const prevDiscover = document.getElementById('prev-discover');
    const nextDiscover = document.getElementById('next-discover');
    
    if (discoverCarousel && prevDiscover && nextDiscover) {
        const cardWidth = 320; // card width + margin
        
        prevDiscover.addEventListener('click', function() {
            discoverCarousel.scrollBy({
                left: -cardWidth,
                behavior: 'smooth'
            });
        });
        
        nextDiscover.addEventListener('click', function() {
            discoverCarousel.scrollBy({
                left: cardWidth,
                behavior: 'smooth'
            });
        });
    }
    
    // Filter and Search functionality for Trilhas
    const searchInput = document.getElementById('search-trilhas');
    const filterSelect = document.getElementById('filter-trilhas');
    const trilhasGrid = document.getElementById('trilhas-grid');
    const trilhaCards = document.querySelectorAll('.trilha-card');
    
    if (searchInput && filterSelect) {
        function filterTrilhas() {
            const searchTerm = searchInput.value.toLowerCase();
            const filterValue = filterSelect.value;
            
            trilhaCards.forEach(card => {
                const title = card.querySelector('h4').textContent.toLowerCase();
                const description = card.querySelector('p').textContent.toLowerCase();
                const type = card.classList.contains('em-andamento') ? 'em-andamento' : 
                            card.classList.contains('concluida') ? 'concluidas' : 
                            card.classList.contains('recomendada') ? 'recomendadas' : '';
                
                const matchesSearch = title.includes(searchTerm) || description.includes(searchTerm);
                const matchesFilter = filterValue === 'todas' || filterValue === type;
                
                card.style.display = matchesSearch && matchesFilter ? 'block' : 'none';
            });
        }
        
        searchInput.addEventListener('input', filterTrilhas);
        filterSelect.addEventListener('change', filterTrilhas);
    }
    
    // Initialize Charts for Dashboard
    function initializeCharts() {
        // Progress Chart
        const progressCtx = document.getElementById('progress-chart');
        if (progressCtx) {
            const progressChart = new Chart(progressCtx, {
                type: 'line',
                data: {
                    labels: ['1 Mai', '8 Mai', '15 Mai', '22 Mai', '29 Mai'],
                    datasets: [{
                        label: 'Horas de estudo',
                        data: [2, 5, 3, 7, 4],
                        borderColor: '#4a6bff',
                        backgroundColor: 'rgba(74, 107, 255, 0.1)',
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Horas'
                            }
                        }
                    }
                }
            });
        }
        
        // Skills Chart
        const skillsCtx = document.getElementById('skills-chart');
        if (skillsCtx) {
            const skillsChart = new Chart(skillsCtx, {
                type: 'radar',
                data: {
                    labels: ['UX/UI Design', 'HTML/CSS', 'JavaScript', 'Design Thinking', 'Prototyping', 'User Research'],
                    datasets: [{
                        label: 'Nível de habilidade',
                        data: [85, 60, 45, 70, 80, 65],
                        backgroundColor: 'rgba(74, 107, 255, 0.2)',
                        borderColor: '#4a6bff',
                        pointBackgroundColor: '#4a6bff',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: '#4a6bff'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        r: {
                            angleLines: {
                                display: true
                            },
                            suggestedMin: 0,
                            suggestedMax: 100
                        }
                    }
                }
            });
        }
        
        // Learning Style Chart
        const learningStyleCtx = document.getElementById('learning-style-chart');
        if (learningStyleCtx) {
            const learningStyleChart = new Chart(learningStyleCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Visual', 'Auditivo', 'Leitura/Escrita', 'Prático'],
                    datasets: [{
                        data: [40, 15, 20, 25],
                        backgroundColor: [
                            '#4a6bff',
                            '#2ec76d',
                            '#ff7846',
                            '#ffc107'
                        ],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                padding: 20
                            }
                        }
                    },
                    cutout: '60%'
                }
            });
        }
    }
    
    initializeCharts();
    
    // Profile Editing functionality
    const editProfileBtn = document.getElementById('edit-profile');
    const editInterestsBtn = document.getElementById('edit-interests');
    
    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', function() {
            alert('Funcionalidade de edição de perfil será implementada em breve!');
        });
    }
    
    if (editInterestsBtn) {
        editInterestsBtn.addEventListener('click', function() {
            alert('Funcionalidade de edição de interesses será implementada em breve!');
        });
    }
    
    // Accessibility improvements
    document.querySelectorAll('.achievement-item').forEach(item => {
        item.setAttribute('tabindex', '0');
        item.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                // Show tooltip or description
                alert(this.getAttribute('title'));
            }
        });
    });
});

