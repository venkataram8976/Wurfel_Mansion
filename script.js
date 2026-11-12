document.addEventListener('DOMContentLoaded', () => {
  // Appointment Data
  const bookingState = {
    fullName: '',
    mobile: '',
    email: '',
    city: '',
    visitors: '',
    selectedDate: null,
    selectedSlot: '',
    beverages: '',
    foodPreference: '',
    allergies: 'No',
    allergyDetail: '',
    children: 'No',
    childrenAge: '',
    pets: 'No',
    music: ''
  };

  // Dropdown Handling
  const dropdownBoxes = document.querySelectorAll('.custom-select-box');

  dropdownBoxes.forEach(box => {
    const header = box.querySelector('.select-header');
    const labelSpan = header.querySelector('span:first-child');
    const options = box.querySelectorAll('.select-option');

    header.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = box.classList.contains('open');
      closeAllDropdowns();
      if (!isOpen) {
        box.classList.add('open');
      }
    });

    options.forEach(option => {
      option.addEventListener('click', (e) => {
        e.stopPropagation();
        const value = option.getAttribute('data-value');
        labelSpan.textContent = value;
        box.classList.remove('open');

        // Handle dynamic inputs for specific dropdowns
        if (box.id === 'allergiesSelectBox') {
          handleAllergiesChange(value);
        } else if (box.id === 'childrenSelectBox') {
          handleChildrenChange(value);
        }
      });
    });
  });

  function closeAllDropdowns() {
    dropdownBoxes.forEach(box => box.classList.remove('open'));
  }

  document.addEventListener('click', () => {
    closeAllDropdowns();
  });

  // Allergy Conditional Field
  const allergyDetailsContainer = document.getElementById('allergyDetailsContainer');
  function handleAllergiesChange(val) {
    bookingState.allergies = val;
    if (val === 'Yes') {
      allergyDetailsContainer.classList.add('visible');
    } else {
      allergyDetailsContainer.classList.remove('visible');
    }
  }

  // Children Accompanying Conditional Field
  const childrenAgeContainer = document.getElementById('childrenAgeContainer');
  function handleChildrenChange(val) {
    bookingState.children = val;
    if (val === 'Yes') {
      childrenAgeContainer.classList.add('visible');
    } else {
      childrenAgeContainer.classList.remove('visible');
    }
  }

  // Calendar Day Selection
  const calDays = document.querySelectorAll('.cal-day:not(.empty)');
  calDays.forEach(dayEl => {
    dayEl.addEventListener('click', () => {
      calDays.forEach(d => d.classList.remove('active'));
      dayEl.classList.add('active');
      bookingState.selectedDate = `August ${dayEl.getAttribute('data-day')}, 2026`;
    });
  });

  // Time Slot Selection
  const slotBtns = document.querySelectorAll('.slot-btn');
  slotBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      slotBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      bookingState.selectedSlot = btn.getAttribute('data-slot');
    });
  });

  // Form Submit -> Confirmation Screen View
  const form = document.getElementById('appointmentForm');
  const mainContent = document.getElementById('mainPageContent');
  const confirmationView = document.getElementById('confirmationView');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    bookingState.fullName = document.getElementById('fullName').value;
    bookingState.mobile = document.getElementById('mobileNumber').value;
    bookingState.email = document.getElementById('emailAddress').value;
    bookingState.city = document.getElementById('cityInput').value;

    mainContent.style.display = 'none';
    confirmationView.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Reset & Book Another Visit
  const bookAnotherBtn = document.getElementById('bookAnotherBtn');
  bookAnotherBtn.addEventListener('click', () => {
    confirmationView.classList.remove('active');
    mainContent.style.display = 'block';

    form.reset();

    // Reset dropdown text
    document.getElementById('visitorsSelectLabel').textContent = 'NUMBER OF VISITORS';
    document.getElementById('beveragesLabel').textContent = 'PREFERRED BEVERAGES';
    document.getElementById('foodLabel').textContent = 'FOOD PREFERENCE';
    document.getElementById('allergiesLabel').textContent = 'FOOD ALLERGIES';
    document.getElementById('childrenLabel').textContent = 'CHILDREN ACCOMPANYING';
    document.getElementById('petsLabel').textContent = 'PETS ACCOMPANYING';
    document.getElementById('musicLabel').textContent = 'FAVOURITE MUSIC';

    allergyDetailsContainer.classList.remove('visible');
    childrenAgeContainer.classList.remove('visible');

    slotBtns.forEach(btn => btn.classList.remove('selected'));
    calDays.forEach(day => day.classList.remove('active'));

    const bookingSection = document.getElementById('bookingFormSection');
    bookingSection.scrollIntoView({ behavior: 'smooth' });
  });
});
