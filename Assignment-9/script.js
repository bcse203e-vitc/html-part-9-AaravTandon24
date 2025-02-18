document.addEventListener("DOMContentLoaded", () => {
    const bookButton = document.getElementById('book-button');
    const modal = document.getElementById('booking-modal');
    const closeModal = document.getElementById('close-modal');
    const bookingForm = document.getElementById('booking-form');
    const appointmentsTable = document.getElementById('appointments-table').getElementsByTagName('tbody')[0];
    const confirmationPopup = document.getElementById('confirmation-popup');
    const closeConfirmationPopup = document.getElementById('close-confirmation');

    const fullName = document.getElementById('full-name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const service = document.getElementById('service');
    const date = document.getElementById('date');
    const terms = document.getElementById('terms');

    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const phoneError = document.getElementById('phone-error');
    const serviceError = document.getElementById('service-error');
    const dateError = document.getElementById('date-error');
    const termsError = document.getElementById('terms-error');

    bookButton.addEventListener('click', () => {
        modal.style.display = 'flex';
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    loadAppointments();

    bookingForm.addEventListener('submit', (event) => {
        event.preventDefault();

        if (validateForm()) {
            const appointment = {
                name: fullName.value,
                email: email.value,
                phone: phone.value,
                service: service.value,
                date: date.value,
                status: 'Pending'
            };

            let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
            appointments.push(appointment);
            localStorage.setItem('appointments', JSON.stringify(appointments));

            addAppointmentToTable(appointment);

            bookingForm.reset();
            modal.style.display = 'none';

            confirmationPopup.style.display = 'block';
            document.getElementById('confirmation-message').textContent = `Thank You ${fullName.value}! Your appointment for ${service.options[service.selectedIndex].text} at ${new Date(date.value).toLocaleString()} is confirmed.`;
        }
    });

    function validateForm() {
        let isValid = true;

        nameError.textContent = '';
        emailError.textContent = '';
        phoneError.textContent = '';
        serviceError.textContent = '';
        dateError.textContent = '';
        termsError.textContent = '';

        if (!fullName.value.trim()) {
            nameError.textContent = 'Name is required.';
            isValid = false;
        }

        if (!email.value.trim() || !validateEmail(email.value)) {
            emailError.textContent = 'Please enter a valid email.';
            isValid = false;
        }

        if (!phone.value.trim() || !validatePhone(phone.value)) {
            phoneError.textContent = 'Please enter a valid 10-digit phone number.';
            isValid = false;
        }

        if (!service.value) {
            serviceError.textContent = 'Please select a service.';
            isValid = false;
        }

        if (!date.value) {
            dateError.textContent = 'Please select a date and time.';
            isValid = false;
        }

        if (!terms.checked) {
            termsError.textContent = 'You must agree to the terms and conditions.';
            isValid = false;
        }

        return isValid;
    }

    function validateEmail(email) {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    }

    function validatePhone(phone) {
        const regex = /^[0-9]{10}$/;
        return regex.test(phone);
    }

    function loadAppointments() {
        const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
        appointments.forEach(appointment => {
            addAppointmentToTable(appointment);
        });
    }

    function addAppointmentToTable(appointment) {
        const row = appointmentsTable.insertRow();
        row.innerHTML = `
            <td>${appointment.name}</td>
            <td>${appointment.service}</td>
            <td>${new Date(appointment.date).toLocaleString()}</td>
            <td>${appointment.status}</td>
        `;
    }

    closeConfirmationPopup.addEventListener('click', () => {
        confirmationPopup.style.display = 'none';
    });

    
});
