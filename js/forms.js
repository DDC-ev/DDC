/**
 * DDC Form Handler - Unified Form Logic
 * Handles Contact, Booking, and Newsletter forms with validation and Google Sheets integration.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Configuration
    const CONFIG = {
        scriptURL: 'https://script.google.com/macros/s/AKfycbzXePgtPMabmPOFwxwoDKN7z7opjGt6a9dmDBjvzdOb88cPhAu13vOm181ItOLMurKPvQ/exec',
        honeypotField: 'website_url', // Anti-spam field
    };

    /**
     * Helper to show validation errors
     */
    const toggleFieldError = (field, errorMsg, show) => {
        const errorElement = field.parentElement.querySelector('.field-error');
        if (show) {
            field.classList.add('border-red-500', 'shake');
            if (errorElement) {
                errorElement.textContent = errorMsg;
                errorElement.style.display = 'block';
            }
            setTimeout(() => field.classList.remove('shake'), 400);
        } else {
            field.classList.remove('border-red-500');
            if (errorElement) errorElement.style.display = 'none';
        }
    };

    /**
     * Basic Email Validation
     */
    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    /**
     * Handle Form Submission
     */
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const submitBtn = form.querySelector('[type="submit"]');
        const originalBtnHTML = submitBtn.innerHTML;
        const successMsg = form.querySelector('.success-msg');
        
        // 1. Bot Check (Honeypot)
        const honeypot = form.querySelector(`[name="${CONFIG.honeypotField}"]`);
        if (honeypot && honeypot.value) {
            console.warn('Bot detected');
            return;
        }

        // 2. Validation
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                toggleFieldError(field, 'This field is required.', true);
                isValid = false;
            } else if (field.type === 'email' && !isValidEmail(field.value)) {
                toggleFieldError(field, 'Please enter a valid email address.', true);
                isValid = false;
            } else {
                toggleFieldError(field, '', false);
            }
        });

        if (!isValid) return;

        // 3. UI Loading State
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin mr-2"></i>Sending...';
        form.classList.add('opacity-70', 'pointer-events-none');

        try {
            const formData = new FormData(form);
            // Add a timestamp if needed, though Apps Script usually does this
            // formData.append('timestamp', new Date().toISOString());

            const response = await fetch(CONFIG.scriptURL, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) throw new Error('Network response was not ok');
            
            // 4. Success State
            form.reset();
            if (successMsg) {
                successMsg.style.display = 'block';
                successMsg.classList.add('animate-bounce-in');
                submitBtn.style.display = 'none';
            } else {
                submitBtn.innerHTML = '<i class="fa-solid fa-check mr-2"></i>Sent Successfully!';
                submitBtn.classList.replace('bg-emerald-500', 'bg-green-600');
            }

            // Trigger custom event for other listeners (like analytics)
            form.dispatchEvent(new CustomEvent('ddcFormSuccess', { detail: { type: form.id } }));

        } catch (error) {
            console.error('Form Error:', error);
            submitBtn.innerHTML = '<i class="fa-solid fa-triangle-exclamation mr-2"></i>Error. Try again';
            submitBtn.classList.replace('bg-emerald-500', 'bg-red-600');
            
            setTimeout(() => {
                submitBtn.innerHTML = originalBtnHTML;
                submitBtn.disabled = false;
                form.classList.remove('opacity-70', 'pointer-events-none');
            }, 3000);
        }
    };

    // Attach to all forms with specific IDs or data attributes
    const forms = document.querySelectorAll('#contactForm, #booking-form, .newsletter-form');
    forms.forEach(form => {
        form.addEventListener('submit', handleFormSubmit);
        
        // Clear errors on input
        form.querySelectorAll('input, textarea, select').forEach(input => {
            input.addEventListener('input', () => toggleFieldError(input, '', false));
        });
    });
});

// Add some CSS for the animations
const style = document.createElement('style');
style.textContent = `
    .shake { animation: shake 0.4s ease-in-out; }
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    .animate-bounce-in {
        animation: bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }
    @keyframes bounceIn {
        from { transform: scale(0.8); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
    }
`;
document.head.appendChild(style);
