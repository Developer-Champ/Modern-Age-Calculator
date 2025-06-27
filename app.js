document.addEventListener('DOMContentLoaded', function() {
    // Set max date to today
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    document.getElementById('birthdate').max = `${yyyy}-${mm}-${dd}`;

    const calculateBtn = document.getElementById('calculate-btn');
    const resultDiv = document.getElementById('result');
    const errorDiv = document.getElementById('error');

    calculateBtn.addEventListener('click', function() {
        // Hide previous results/errors
        resultDiv.classList.remove('show');
        errorDiv.style.display = 'none';

        // Get input value
        const birthdateInput = document.getElementById('birthdate').value;

        // Validate input
        if (!birthdateInput) {
            showError('Please select your date of birth');
            return;
        }

        const birthDate = new Date(birthdateInput);
        const today = new Date();

        if (birthDate > today) {
            showError('Birth date cannot be in the future');
            return;
        }

        // Calculate age in years
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        // Calculate exact age breakdown
        let years = age;
        let months = today.getMonth() - birthDate.getMonth();
        let days = today.getDate() - birthDate.getDate();

        if (days < 0) {
            months--;
            // Get days in previous month
            const prevMonthLastDay = new Date(
                today.getFullYear(),
                today.getMonth(),
                0
            ).getDate();
            days += prevMonthLastDay;
        }

        if (months < 0) {
            years--;
            months += 12;
        }

        // Calculate weeks
        const weeks = Math.floor(days / 7);
        days = days % 7;

        // Calculate next birthday
        const nextBirthday = new Date(
            today.getFullYear(),
            birthDate.getMonth(),
            birthDate.getDate()
        );

        if (nextBirthday < today) {
            nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
        }

        const daysUntilNextBirthday = Math.ceil(
            (nextBirthday - today) / (1000 * 60 * 60 * 24)
        );

        // Format birthdate for display
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedBirthdate = birthDate.toLocaleDateString('en-US', options);

        // Display results
        document.getElementById('age-result').textContent = `${age} years old`;
        document.getElementById('birthdate-result').textContent = `Born on ${formattedBirthdate}`;
        document.getElementById('years').textContent = years;
        document.getElementById('months').textContent = months;
        document.getElementById('days').textContent = days;
        document.getElementById('weeks').textContent = weeks;

        let nextBirthdayText;
        if (daysUntilNextBirthday === 0) {
            nextBirthdayText = '🎉 Today is your birthday! 🎉';
        } else if (daysUntilNextBirthday === 1) {
            nextBirthdayText = 'Tomorrow is your birthday!';
        } else {
            nextBirthdayText = `${daysUntilNextBirthday} days until your next birthday`;
        }
        document.getElementById('next-birthday').textContent = nextBirthdayText;

        // Show result
        resultDiv.classList.add('show');
    });

    function showError(message) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
    }
});
