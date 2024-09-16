const inputNumeroMobileBill = document.getElementById("bill");
const inputNumeroMobileCustom = document.getElementById("custom-tip");
const inputNumeroMobileAmountPeople = document.getElementById("amount_people");
const inputNumeroDesktopBill = document.getElementById("bill-desktop");
const inputNumeroDesktopCustom = document.getElementById("custom-tip-desktop");
const inputNumeroDesktopAmountPeople = document.getElementById(
  "amount_people-desktop"
);
const inputGroupOptions = document.querySelectorAll('input[name="tip"]');
const inputGroupOptionsDesktop = document.querySelectorAll(
  'input[name="tip-desktop"]'
);
const paragraphsMessageError = document.getElementsByClassName("message-error");
const divContainerMobile = document.getElementsByClassName(
  "container-main-mobile"
)[0];
const tipAmountMobile = document.getElementById("tip-amount");
const totalPersonMobile = document.getElementById("total-person");
const tipAmountDesktop = document.getElementById("tip-amount-desktop");
const totalPersonDesktop = document.getElementById("total-person-desktop");
const buttomMobile = document.getElementById("buttom-reset");
const buttomDesktop = document.getElementById("buttom-reset-desktop");


function buttomDisable(inputNumberPeople,
  inputGroupOptions,
  inputBill,
  inputCustom,
  buttom
){
  let numberPeople = 0;
  let bill = 0;
  let option = 0;
  let custom = 0;

  if (parseFloat(inputBill.value)!= 0 && parseFloat(inputBill.value) != "" && !isNaN(parseFloat(inputBill.value))) {
    bill = parseFloat(inputBill.value);
  }

  if (parseFloat(inputCustom.value) != 0 && parseFloat(inputCustom.value) != "" && !isNaN(parseFloat(inputCustom.value))) {
    custom = parseFloat(inputCustom.value);
    option = custom;
  }

  if(parseInt(inputNumberPeople.value) != 0 && parseInt(inputNumberPeople.value)!="" && !isNaN(parseInt(inputNumberPeople.value))){
    numberPeople = parseInt(inputNumberPeople.value);
  }

  inputGroupOptions.forEach((radio) => {
    if (radio.checked) {
      option = radio.value;
      console.log(radio.value);
    }
  });

  if(numberPeople === 0 && bill === 0 && option === 0){
    if(!buttom.classList.contains('buttom-disable')){
      buttom.classList.add('buttom-disable');
      buttom.disabled = true;
      console.log(buttom.disabled)
    }
  }else{
    if(buttom.classList.contains('buttom-disable')){
      buttom.classList.remove('buttom-disable');
      buttom.disabled = false;
    }
  }
}
function buttomReset(inputNumberPeople,
  inputGroupOptions,
  inputBill,
  inputCustom,buttom,tipAmount,totalAmount){
    buttom.addEventListener('click',() => {
      inputNumberPeople.value = '';
      inputBill.value = '';
      inputCustom.value = '';
      inputGroupOptions.forEach((radio) => {
        if(radio.checked){
          radio.checked = false;
        }
      })
      tipAmount.textContent = '0.00'
      totalAmount.textContent = '0.00'
      buttomDisable(inputNumberPeople,
        inputGroupOptions,
        inputBill,
        inputCustom,
        buttom)
    })
}
function calculateAmounts(
  inputNumberPeople,
  inputGroupOptions,
  inputBill,
  inputCustom,
  textAmount,
  textTotal
) {
  let numberPeople = 0;
  let calculate = 0;
  let calculateTotal = 0;
  let bill = 0;
  let option = 0;
  let custom = 0;

  if (parseFloat(inputBill.value)!= 0 && parseFloat(inputBill.value) != "" && !isNaN(parseFloat(inputBill.value))) {
    bill = parseFloat(inputBill.value);
  }

  if (parseFloat(inputCustom.value) != 0 && parseFloat(inputCustom.value) != "" && !isNaN(parseFloat(inputCustom.value))) {
    custom = parseFloat(inputCustom.value);
    option = custom;
  }

  if(parseInt(inputNumberPeople.value) != 0 && parseInt(inputNumberPeople.value)!="" && !isNaN(parseInt(inputNumberPeople.value))){
    numberPeople = parseInt(inputNumberPeople.value);
  }

  inputGroupOptions.forEach((radio) => {
    if (radio.checked) {
      option = radio.value;
      console.log(radio.value);
    }
  });

  

  if (numberPeople != 0) {
    if (option > 0 && bill > 0) {
      calculate = (option / 100) * bill * (1 / numberPeople);
      textAmount.textContent = calculate.toFixed(2);
      calculateTotal = (option / 100) * bill;
      textTotal.textContent = calculateTotal.toFixed(2);
    }
  }
}
function formatInputToDecimal(inputElement) {
  inputElement.addEventListener("input", (e) => {
    const regex = /^\d*\.?\d{0,2}$/;
    let value = e.target.value;

    // Asegurar que si el valor empieza con ".", se añada "0" antes
    if (value.startsWith(".")) {
      value = "0" + value;
    }

    // Verificar si el valor cumple con el formato correcto
    if (!regex.test(value)) {
      e.target.value = value
        .replace(/[^0-9.]/g, "") // Remover caracteres no permitidos
        .replace(/(\..*)\./g, "$1") // Asegurar solo un punto decimal
        .replace(/(\.\d{2})\d+/g, "$1") // Limitar a dos decimales
        .replace(/^\./, "0."); // Añadir "0" si el primer carácter es un punto
    } else {
      e.target.value = value; // Si cumple con el formato, se deja el valor tal cual
    }
  });

  inputElement.addEventListener("blur", (e) => {
    let value = e.target.value;

    // Si el valor termina con un punto decimal, añadir "0"
    if (value.endsWith(".")) {
      e.target.value = value + "0";
    }
  });
}
function formatInputToDecimalWithRange(inputElement) {
  inputElement.addEventListener("input", (e) => {
    let value = e.target.value;

    // Asegurar que si el valor empieza con ".", se añada "0" antes
    if (value.startsWith(".")) {
      value = "0" + value;
    }

    // Expresión regular para permitir hasta dos decimales
    const regex = /^\d*\.?\d{0,2}$/;

    // Si el valor no cumple con el patrón de la expresión regular, formatearlo
    if (!regex.test(value)) {
      value = value
        .replace(/[^0-9.]/g, "") // Remover caracteres no permitidos
        .replace(/(\..*)\./g, "$1") // Asegurar solo un punto decimal
        .replace(/(\.\d{2})\d+/g, "$1") // Limitar a dos decimales
        .replace(/^\./, "0."); // Añadir "0" si el primer carácter es un punto
    }

    // Convertir el valor a número flotante para verificar el rango
    const numericValue = parseFloat(value);

    // Limitar el valor a un máximo de 100 y un mínimo de 0
    if (numericValue > 100) {
      value = "100";
    } else if (numericValue < 0) {
      value = "0";
    }

    // Establecer el valor corregido en el campo de entrada
    e.target.value = value;
  });
}
function formatInputToPositiveInteger(inputElement) {
  inputElement.addEventListener("input", (e) => {
    let value = e.target.value;

    // Remover todo lo que no sea un número (solo números enteros positivos)
    value = value.replace(/[^0-9]/g, "");

    // Actualizar el valor del campo con el valor corregido
    e.target.value = value;
  });
}
function checkedRadioDisable(
  inputElementCustom,
  inputElementGroup,
  inputElementNumberPeople,
  inputElementBill,
  textAmount,
  textTotal,
  buttom
) {
  inputElementCustom.addEventListener("input", () => {
    inputElementGroup.forEach((radio) => {
      radio.checked = false;
    });

    validationNumberOfPeople(
      inputElementBill,
      inputElementGroup,
      inputElementNumberPeople,
      inputElementCustom
    );
    calculateAmounts(
      inputElementNumberPeople,
      inputElementGroup,
      inputElementBill,
      inputElementCustom,
      textAmount,
      textTotal
    );
    buttomDisable(inputElementNumberPeople,
      inputElementGroup,
      inputElementBill,
      inputElementCustom,
      buttom)
  });
  inputElementGroup.forEach((radio) => {
    radio.addEventListener("change", () => {
      if (radio.checked) {
        inputElementCustom.value = "";
        validationNumberOfPeople(
          inputElementBill,
          inputElementGroup,
          inputElementNumberPeople,
          inputElementCustom
        );
        calculateAmounts(
          inputElementNumberPeople,
          inputElementGroup,
          inputElementBill,
          inputElementCustom,
          textAmount,
          textTotal
        );
        buttomDisable(inputElementNumberPeople,
          inputElementGroup,
          inputElementBill,
          inputElementCustom,
          buttom)
      }
    });
  });
  inputElementNumberPeople.addEventListener("input", () => {
    validationNumberOfPeople(
      inputElementBill,
      inputElementGroup,
      inputElementNumberPeople,
      inputElementCustom
    );
    calculateAmounts(
      inputElementNumberPeople,
      inputElementGroup,
      inputElementBill,
      inputElementCustom,
      textAmount,
      textTotal
    );
    buttomDisable(inputElementNumberPeople,
      inputElementGroup,
      inputElementBill,
      inputElementCustom,
      buttom)
  });
  inputElementBill.addEventListener("input", () => {
    validationNumberOfPeople(
      inputElementBill,
      inputElementGroup,
      inputElementNumberPeople,
      inputElementCustom
    );
    calculateAmounts(
      inputElementNumberPeople,
      inputElementGroup,
      inputElementBill,
      inputElementCustom,
      textAmount,
      textTotal
    );
    buttomDisable(inputElementNumberPeople,
      inputElementGroup,
      inputElementBill,
      inputElementCustom,
      buttom)
  });
}
function validationNumberOfPeople(
  inputElementBill,
  inputElementGroup,
  inputElementNumberPeople,
  inputElementCustom
) {
  let numberBill = 0;
  let selectTip = 0;
  let numberPeople = 0;

  numberPeople = inputElementNumberPeople.value;

  if (numberBill < parseFloat(inputElementBill.value)) {
    numberBill = parseFloat(inputElementBill.value);
  }

  inputElementGroup.forEach((radio) => {
    if (selectTip < radio.value && radio.checked) {
      selectTip = radio.value;
    }
  });

  if (selectTip < parseFloat(inputElementCustom.value)) {
    selectTip = parseFloat(inputElementCustom.value);
  }

  if (
    (numberPeople === "" || parseInt(numberPeople) === 0) &&
    selectTip > 0 &&
    numberBill > 0
  ) {
    inputElementNumberPeople.style.outline = "3px solid #E17052";

    const style = getComputedStyle(divContainerMobile);
    if (style.display != "none") {
      console.log(style.display);
      const paragraphMessageError = paragraphsMessageError[0];
      if (paragraphMessageError.classList.contains("d-none")) {
        // Eliminar 'd-none' y agregar 'd-flex'
        paragraphMessageError.classList.remove("d-none");
        paragraphMessageError.classList.add("d-flex");
      }
    } else {
      const paragraphMessageError = paragraphsMessageError[1];
      if (paragraphMessageError.classList.contains("d-none")) {
        // Eliminar 'd-none' y agregar 'd-flex'
        paragraphMessageError.classList.remove("d-none");
        paragraphMessageError.classList.add("d-flex");
      }
    }
  } else {
    inputElementNumberPeople.style.outline = "none";

    const style = getComputedStyle(divContainerMobile);
    console.log(style.display);
    if (style.display != "none") {
      const paragraphMessageError = paragraphsMessageError[0];
      if (paragraphMessageError.classList.contains("d-flex")) {
        // Eliminar 'd-none' y agregar 'd-flex'
        paragraphMessageError.classList.remove("d-flex");
        paragraphMessageError.classList.add("d-none");
      }
    } else {
      const paragraphMessageError = paragraphsMessageError[1];
      if (paragraphMessageError.classList.contains("d-flex")) {
        // Eliminar 'd-none' y agregar 'd-flex'
        paragraphMessageError.classList.remove("d-flex");
        paragraphMessageError.classList.add("d-none");
      }
    }
  }
}

function updateFunctions() {
  formatInputToDecimal(inputNumeroMobileBill);
  formatInputToDecimalWithRange(inputNumeroMobileCustom);
  formatInputToPositiveInteger(inputNumeroMobileAmountPeople);
  checkedRadioDisable(
    inputNumeroMobileCustom,
    inputGroupOptions,
    inputNumeroMobileAmountPeople,
    inputNumeroMobileBill,
    tipAmountMobile,
    totalPersonMobile,
    buttomMobile
  );
  buttomDisable(inputNumeroMobileAmountPeople,inputGroupOptions,inputNumeroMobileBill,inputNumeroMobileCustom,buttomMobile)
  buttomReset(inputNumeroMobileAmountPeople,inputGroupOptions,inputNumeroMobileBill,inputNumeroMobileCustom,buttomMobile,tipAmountMobile,totalPersonMobile)
  formatInputToDecimal(inputNumeroDesktopBill);
  formatInputToDecimalWithRange(inputNumeroDesktopCustom);
  formatInputToPositiveInteger(inputNumeroDesktopAmountPeople);
  checkedRadioDisable(
    inputNumeroDesktopCustom,
    inputGroupOptionsDesktop,
    inputNumeroDesktopAmountPeople,
    inputNumeroDesktopBill,
    tipAmountDesktop,
    totalPersonDesktop,
    buttomDesktop
  );
  buttomDisable(inputNumeroDesktopAmountPeople,inputGroupOptionsDesktop,inputNumeroDesktopBill,inputNumeroDesktopCustom,buttomDesktop);
  buttomReset(inputNumeroDesktopAmountPeople,inputGroupOptionsDesktop,inputNumeroDesktopBill,inputNumeroDesktopCustom,buttomDesktop,tipAmountDesktop,totalPersonDesktop)
}

updateFunctions();
