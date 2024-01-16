import {setFormValue, submitSignUpForm, validateEmail, validatePassword, isValid, refreshValidation, getValidationStatus} from "./utils.js"


////// ДЕМОНСТРАЦИОННЫЙ УЧАСТОК КОДА. На оценку не влияет, исключительно для саморазвития.

// Предлагаю "поиграться" с частями кода ниже, чтобы познакомиться с JS
// Получаем элемент и меняем его класс, который определеён в библиотеке стилей materialize
const passwords = document.querySelectorAll('.password');
// password.classList.add("valid")
// password.classList.remove("valid")

// В браузере можно посмотреть, что из себя представляет документ
// (CTRL+SHIFT+i для открытия консоли и открыть вкладку "консоль", туда будет залогированно значение)
console.log("Document")
console.log(document)

// Если запросить id, которого нет в DOM дереве - вернется undefined
// => надо быть осторожней: коллега может поменять id вашего элемента и упадёт !ВАШ! код
// const first_name = document.getElementById('first_name_invalid');
// first_name.oninput = (e) => validatePassword(e)

// Селекция по классу. Может пригодится, для того, чтобы упростить обработку полей в двух формах.
// Чтобы не делать кучу уникальных айди, можно определённым полям формы давать один класс и обрабатывать их в цикле
// const passwords = document.querySelectorAll('.password')
// console.log(passwords)
// for (const password of passwords) {
//   password.style.background = "red"
// }

////// КОНЕЦ ДЕМОНСТРАЦИОННОГО УЧАСТКА КОДА. Дальше код для оцениваемой части задания


// Выписываем все айдишники HTMl-элементов в константы для переиспользования
const first_name_id = 'first_name'
const last_name_id = 'last_name'
const password_class = 'password'
const email_class = 'email'
const password_repeat_id = 'password-repeat'

const sign_in_link_id = 'sign_in_link'
const sign_up_form_id = 'sign_up_form'
// const sign_in_form_id = 'sign_in_form'  // Пригодится
const sign_up_btn_id = 'sign_up_btn'
const sign_in_form_id = 'sign_in_form'
const sign_up_link_id = 'sign_up_link'

// Устанавливаем начальные значения валидации, чтобы при заполнении некоторых
// полей функция getValidationStatus не давала ложный true
refreshValidation([email_class, password_class, password_repeat_id])
// Получаем элемент DOM-дерева по id и присваиваем значение аттрибуту oninput
// oninput вызывается с параметром "event" каждый раз, когда ввод меняется
// Значение, которое мы присваеваем этому аттрибуту - это функция, определённая в стрелочном стиле
// Гуглить по тегам "события JS", "onchange/oninput HTML", "стрелочные функции JS", ...

const first_name = document.getElementById(first_name_id);
first_name.oninput = (e) => {
  setFormValue(first_name_id, e.target.value)
  //console.log(getValidationStatus())
}  // Установить значение без валидации
document.getElementById(last_name_id).oninput = (e) => setFormValue(last_name_id, e.target.value)

// Функция для создания callback'а для валидируемого поля. Для всех таких полей
// одинаковая логика: если они стерты, то они не валидны и не невалидны, иначе
// они проверяются на валидность
const validatedField = (key, validator) => {
  return (e) => {
    setFormValue(key, e.target.value, validator)
    if (e.target.value.length == 0) {
      e.target.classList.remove("valid")
      e.target.classList.remove("invalid")
      return
    }
    if (isValid(key)) {
      e.target.classList.remove("invalid")
      e.target.classList.add("valid")
    } else {
      e.target.classList.remove("valid")
      e.target.classList.add("invalid")
    }
  }
}

const emails = document.querySelectorAll("." + email_class);
Array.from(emails).forEach((email) => {
  email.addEventListener("input", validatedField(email_class, validateEmail))
})
// email.oninput = (e) => setFormValue(email_id, e.target.value, validateEmail) // Установить значение с валидацией

// console.log(passwords);
Array.from(passwords).forEach((password) => {
  password.addEventListener("input", validatedField(password_class, validatePassword))
})

// Проверка повтора пароля. функцию проверки приходится писать в main, а не в
// utils, так как все валидаторы принимают один аргумент - значение в поле, а
// в данном случае валидация зависит еще и от значени в поле #password
document.getElementById("password-repeat").oninput = validatedField(
  password_repeat_id,
  (e) => {
    if (document.getElementById("password").value != e) {
      return false
    } else {
      console.log("match")
      return true
    }
  }
)

// Разблокировка кнопки  в форме регистрации. Если все требуемые поля валидны,
// кнопка будет доступна
Array.from(document.querySelectorAll("#first_name, #last_name, #email, #password, #password-repeat")).forEach((field) => {
  field.addEventListener("input", (e) => {
    if (getValidationStatus()) {
      document.getElementById("sign_up_btn").disabled = false
    } else {
      document.getElementById("sign_up_btn").disabled = true
    }
  })
})

// Разблокировка кнопки в форме авторизации. Если все требуемые поля валидны,
// кнопка будет доступна
Array.from(document.querySelectorAll("#auth_email, #auth_password")).forEach((field) => {
  field.addEventListener("input", (e) => {
    if (getValidationStatus()) {
      document.getElementById("sign_in_btn").disabled = false
    } else {
      document.getElementById("sign_in_btn").disabled = true
    }
  })
})
    
// Меняем стили объекта DOM дерева. Это позволяет скрыть форму регистрации и показать форму авторизации
// Объект формы не исключается из DOM дерева, а просто становистя невидимым
const switch_to_sign_in = document.getElementById(sign_in_link_id);
switch_to_sign_in.onclick = (e) => {
  document.getElementById(sign_up_form_id).style.display = "none"
  document.getElementById(sign_in_form_id).style.display = ""
  refreshValidation([email_class, password_class])
}

const switch_to_sign_up = document.getElementById(sign_up_link_id);
switch_to_sign_up.onclick = (e) => {
  document.getElementById(sign_up_form_id).style.display = ""
  document.getElementById(sign_in_form_id).style.display = "none"
  refreshValidation([email_class, password_class, password_repeat_id])
}

const sign_up_btn = document.getElementById(sign_up_btn_id);
sign_up_btn.onclick = (e) => {
  // При нажатии кнопки в форме по умолчанию происходит перезагрузка страницы.
  // Чтобы отключить его, нужно отменить стандартное поведение события
  e.preventDefault()
  submitSignUpForm()
}