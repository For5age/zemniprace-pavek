let isUnlocked = false;
const CALENDAR_PASSWORD = "pavek2024"; // Change this password

function unlockCalendar() {
    const input = document.getElementById('calPassword');
    if (input.value === CALENDAR_PASSWORD) {
        isUnlocked = true;
        alert('Kalendář odemčen! Nyní můžete upravovat dostupnost.');
        input.value = '';
        document.querySelectorAll('.cal-day').forEach(day => {
            day.classList.add('editable');
        });
    } else {
        alert('Nesprávné heslo');
    }
}

// Generate calendar for next 2 months
window.addEventListener('DOMContentLoaded', () => {
    const calendar = document.getElementById('calendar');
    const days = ['Po', 'Út', 'St', 'Čt', 'Pá', 'So', 'Ne'];
    
    days.forEach(day => {
        const header = document.createElement('div');
        header.className = 'cal-header';
        header.textContent = day;
        calendar.appendChild(header);
    });

    const today = new Date();

    for (let i = 0; i < 60; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        const dayNum = date.getDate();
        const key = date.toISOString().split('T')[0];
        
        const dayEl = document.createElement('div');
        dayEl.className = 'cal-day ' + (Math.random() > 0.3 ? 'available' : 'busy');
        dayEl.textContent = dayNum;
        dayEl.dataset.date = key;
        
        dayEl.onclick = function() {
            if (!isUnlocked) {
                alert('Nejprve odemkněte kalendář zadáním hesla.');
                return;
            }
            this.className = this.className.includes('available') 
                ? 'cal-day editable busy' 
                : 'cal-day editable available';
        };
        
        calendar.appendChild(dayEl);
    }
});