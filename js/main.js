// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Form submission
document.getElementById('quoteForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const data = {
        projectType: formData.get('projectType'),
        name: formData.get('name'),
        contact: formData.get('contact'),
        details: formData.get('details'),
        timestamp: new Date().toISOString()
    };
    
    try {
        const response = await fetch('api/submit-form.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        if (response.ok) {
            document.getElementById('contactForm').style.display = 'none';
            document.getElementById('successMessage').style.display = 'block';
        } else {
            alert('Omlouváme se, došlo k chybě. Zkuste to prosím znovu nebo nás kontaktujte přímo na telefonu.');
        }
    } catch (error) {
        alert('Omlouváme se, došlo k chybě. Zkuste to prosím znovu nebo nás kontaktujte přímo na telefonu.');
    }
});