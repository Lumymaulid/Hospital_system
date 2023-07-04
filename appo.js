// Get the elements
const appointmentForm = document.getElementById('appointment-form');
const dateInput = document.getElementById('date-input');
const timeInput = document.getElementById('time-input');
const doctorSelect = document.getElementById('doctor-select');
const submitButton = document.getElementById('submit-button');
const appointmentData = getAppointmentData(); // Replace this with your actual data retrieval logic
res.render('appointment', { appointment: appointmentData });

// Add event listener to the form submit
appointmentForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get the selected values
  const selectedDate = dateInput.value;
  const selectedTime = timeInput.value;
  const selectedDoctor = doctorSelect.value;

  // Perform validation
  if (selectedDate === '' || selectedTime === '' || selectedDoctor === '') {
    alert('Please fill in all the fields.');
    return;
  }

  
  // Display success message
  alert('Appointment scheduled successfully!');
  // You can also redirect the user to a confirmation page or perform other actions as needed
});
