document.addEventListener('DOMContentLoaded', function() {
    setDefaultDate(); //Установка даты по умолчанию
});

// Функция для установки текущей даты по умолчанию
function setDefaultDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
    const day = String(today.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;

    document.getElementById('date').value = formattedDate;
}

document.getElementById('expenseForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const amountInput = document.getElementById('amount');
    const categoryInput = document.getElementById('category');
    const dateInput = document.getElementById('date');
    const date = dateInput.value;
    const amount = amountInput.value;
    const category = categoryInput.value;
    const comment = document.getElementById('comment').value;

    const amountFeedback = document.getElementById('amountFeedback');
    const successMessage = document.getElementById('success-message');

    // Сброс классов ошибки перед проверкой
    amountInput.classList.remove('is-invalid');
    categoryInput.classList.remove('is-invalid');
    dateInput.classList.remove('is-invalid');

    let valid = true; 

    //Проверка суммы
    if (!amount) {
        amountInput.classList.add('is-invalid'); 
        valid = false; 
    } 
    if (amount < 0) {
        amountFeedback.textContent = 'Сумма должна быть больше нуля.'; 
        amountInput.classList.add('is-invalid');
        valid = false;
    }

    //Проверка категории
    if (!category) {
        categoryInput.classList.add('is-invalid'); 
        valid = false; 
    }

    //Проверка даты
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Убираем время из текущей даты для корректного сравнения
    selectedDate.setHours(0, 0, 0, 0);
    if (selectedDate > today) {
        dateInput.classList.add('is-invalid'); 
        valid = false; 
    }
   
    // Прерываем выполнение в случае невалидности
    if (!valid) {
        return; 
    }
    
    // Объект для хранения данных
    const expense = {
      date: date,
      amount: amount,
      category: category,
      comment: comment
    };

    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  
    expenses.push(expense);
  
    localStorage.setItem('expenses', JSON.stringify(expenses));
  
    successMessage.innerText = 'Данные успешно сохранены!';
    successMessage.style.display = 'block'; 

    // Скрываем сообщение об успехе через 3 секунды 
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 3000);

    // Очистка формы после сохранения
    document.getElementById('expenseForm').reset();

    //Установка даты по умолчанию после reset
    setDefaultDate(); 
  });
 

