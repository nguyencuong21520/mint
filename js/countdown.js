
document.addEventListener('DOMContentLoaded', () => {
    // Target date: 18:00 18/01/2026
    const targetDate = new Date('2026-01-18T18:00:00');

    function updateCountdown() {
        const now = new Date();
        const diff = targetDate - now;

        if (diff <= 0) {
            // Timer finished
            document.getElementById('countdown-days').innerText = '00';
            document.getElementById('countdown-hours').innerText = '00';
            document.getElementById('countdown-minutes').innerText = '00';
            document.getElementById('countdown-seconds').innerText = '00';
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        updateElement('countdown-days', days);
        updateElement('countdown-hours', hours);
        updateElement('countdown-minutes', minutes);
        updateElement('countdown-seconds', seconds);
    }

    function updateElement(id, value) {
        const element = document.getElementById(id);
        const currentValue = element.innerText;
        const formattedValue = String(value).padStart(2, '0');

        if (currentValue !== formattedValue) {
            element.innerText = formattedValue;
            
            // Animate parent element (the card)
            const card = element.parentElement;
            
            // Remove animation class to reset it
            card.classList.remove('tick-border');
            
            // Trigger reflow
            void card.offsetWidth;
            
            // Add animation class
            card.classList.add('tick-border');
        }
    }

    // Initial call
    updateCountdown();

    // Update every second
    setInterval(updateCountdown, 1000);
});
