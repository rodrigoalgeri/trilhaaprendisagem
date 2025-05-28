import Chart from 'chart.js';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize the progress chart
    initProgressChart();
    
    // Add event listeners for preferences
    setupPreferenceListeners();
    
    // Setup course card interactions
    setupCourseCards();
    
    // Simulate notification system
    setTimeout(showNotification, 5000);
});

function initProgressChart() {
    const ctx = document.getElementById('progressChart').getContext('2d');
    
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4', 'Semana 5', 'Semana 6'],
            datasets: [{
                label: 'Seu progresso',
                data: [10, 25, 30, 40, 55, 68],
                backgroundColor: 'rgba(52, 152, 219, 0.2)',
                borderColor: '#3498db',
                borderWidth: 3,
                tension: 0.4,
                pointBackgroundColor: '#3498db',
                pointRadius: 4
            }, {
                label: 'Média da turma',
                data: [15, 20, 25, 35, 40, 45],
                backgroundColor: 'rgba(149, 165, 166, 0.2)',
                borderColor: '#95a5a6',
                borderWidth: 2,
                tension: 0.4,
                pointBackgroundColor: '#95a5a6',
                pointRadius: 3,
                borderDash: [5, 5]
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Progresso (%)'
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'bottom'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${context.raw}%`;
                        }
                    }
                }
            }
        }
    });
}

function setupPreferenceListeners() {
    // Toggle interest tags
    const interestTags = document.querySelectorAll('.interest-tag');
    interestTags.forEach(tag => {
        tag.addEventListener('click', () => {
            tag.classList.toggle('selected');
        });
    });
    
    // Save preferences button
    const saveButton = document.getElementById('save-preferences');
    saveButton.addEventListener('click', () => {
        const selectedInterests = Array.from(document.querySelectorAll('.interest-tag.selected'))
            .map(tag => tag.textContent);
        
        const learningPace = document.getElementById('pace-slider').value;
        
        const formats = Array.from(document.querySelectorAll('.checkbox-group input:checked'))
            .map(checkbox => checkbox.parentElement.textContent.trim());
        
        console.log('Preferências salvas:', { selectedInterests, learningPace, formats });
        
        showNotification('Preferências atualizadas! Suas recomendações foram personalizadas.');
        
        // In a real application, this would trigger an API call to update user preferences
        // and then refresh the recommendations
    });
}

function setupCourseCards() {
    const courseButtons = document.querySelectorAll('.course-card button');
    courseButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const courseTitle = e.target.closest('.course-card').querySelector('h3').textContent;
            console.log(`Curso selecionado: ${courseTitle}`);
            
            // In a real application, this would navigate to the course page
            // or update the UI accordingly
            if (button.textContent === 'Continuar') {
                showNotification(`Retomando curso: ${courseTitle}`);
            } else {
                showNotification(`Iniciando novo curso: ${courseTitle}`);
            }
        });
    });
}

function showNotification(message = 'Nova atividade disponível! Confira suas recomendações.') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <div class="notification-content">
            <p>${message}</p>
            <button class="close-notification">×</button>
        </div>
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Add styles
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.backgroundColor = 'white';
    notification.style.padding = '15px';
    notification.style.borderRadius = '8px';
    notification.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    notification.style.zIndex = '1000';
    notification.style.maxWidth = '300px';
    notification.style.transform = 'translateY(100px)';
    notification.style.opacity = '0';
    notification.style.transition = 'all 0.3s ease';
    
    notification.querySelector('.notification-content').style.display = 'flex';
    notification.querySelector('.notification-content').style.justifyContent = 'space-between';
    notification.querySelector('.notification-content').style.alignItems = 'center';
    
    const closeBtn = notification.querySelector('.close-notification');
    closeBtn.style.background = 'none';
    closeBtn.style.border = 'none';
    closeBtn.style.fontSize = '20px';
    closeBtn.style.cursor = 'pointer';
    closeBtn.style.marginLeft = '10px';
    
    // Show notification with animation
    setTimeout(() => {
        notification.style.transform = 'translateY(0)';
        notification.style.opacity = '1';
    }, 100);
    
    // Set up auto-dismiss
    const dismissTimeout = setTimeout(() => {
        dismissNotification(notification);
    }, 5000);
    
    // Add close button functionality
    closeBtn.addEventListener('click', () => {
        clearTimeout(dismissTimeout);
        dismissNotification(notification);
    });
}

function dismissNotification(notification) {
    notification.style.transform = 'translateY(100px)';
    notification.style.opacity = '0';
    
    setTimeout(() => {
        notification.remove();
    }, 300);
}

