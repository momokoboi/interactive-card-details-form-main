// Validation logic

// initiate variable to track approval status
let approved = true

// assign submit listener to the submit button
const sub_button = document.getElementById("form_sub")
sub_button.addEventListener("click", check_inputs) // call check_inputs when clicked

// main function to validate and update the UI
function check_inputs(event) {
    // prevent default form submission behavior
    event.preventDefault()

    // reset approval status to true
    approved = true

    // get input values from the form fields
    const card_name = document.getElementById("ic_name").value.trim() // name on card
    const card_number = document.getElementById("i_cnumber").value.trim() // card number
    const card_month = document.getElementById("ic_xpmonth").value.trim() // expiration month
    const card_year = document.getElementById("ic_xpyear").value.trim() // expiration year
    const cvc_number = document.getElementById("i_ccvc").value.trim() // CVC code

    // regex patterns to validate the inputs
    const name_regex = /^[\w\s]{1,20}$/ // only letters, numbers, and spaces (max 20 chars)
    const card_number_regex = /^[0-9]{16}$/ // exactly 16 digits
    const card_month_regex = /^(0[1-9]|1[0-2])$/ // valid months (01-12)
    const card_year_regex = /^(2[5-9]|[3-9][0-9])$/ // valid years (25-99)
    const cvc_number_regex = /^[1-9][0-9]{2}$/ // 3 digits (100-999)

    // get card display elements
    let cc_name = document.getElementById("namec") // name on the card display
    let cc_number = document.getElementById("number") // card number display
    let cc_date = document.getElementById("datec") // expiration date display
    let cc_cvc = document.getElementById("cvc") // CVC display

    let errors = [] // array to store validation errors (e.g., name_i, number_i, etc.)

    // validate inputs and track errors

    // card name validation
    if (!name_regex.test(card_name)) {
        approved = false
        errors.push("name_i")
    }

    // card number validation
    if (!card_number_regex.test(card_number)) {
        approved = false
        errors.push("number_i")
    }

    // month validation
    if (!card_month_regex.test(card_month)) {
        approved = false
        errors.push("mm_i")
    }

    // year validation
    if (!card_year_regex.test(card_year)) {
        approved = false
        errors.push("yy_i")
    }

    // cvc validation
    if (!cvc_number_regex.test(cvc_number)) {
        approved = false
        errors.push("cvc_i")
    }

    // handle errors or update UI
    if (!approved) {
        // call function to display error messages
        handleErrors(errors, card_name, card_number, card_month, card_year, cvc_number, cc_name, cc_number, cc_date, cc_cvc)
    } else {
        // update card display with user inputs
        cc_name.innerText = card_name || "Jane Appleseed"
        cc_number.innerText = formatCardNumber(card_number) || "0000 0000 0000 0000"
        cc_date.innerText = `${card_month}/${card_year}` || "00/00"
        cc_cvc.innerText = cvc_number || "000"

        // disable input fields
        let complete = document.getElementById("input_fields")
        complete.style.display = "none"

        // show success message
        let valid = document.getElementById("success")
        valid.style.display = "flex"
    }
}

// function to handle and display error messages
function handleErrors(errors, card_name, card_number, card_month, card_year, cvc_number, cc_name, cc_number, cc_date, cc_cvc) {
    // card name error
    if (errors.includes("name_i")) {
        const error_name = document.getElementsByClassName("name")[0]
        error_name.style.display = "block"
        error_name.innerHTML = "<p>[Invalid Name] - Use letters & numbers only, max length is 20!</p>"
        cc_name.innerText = "Jane Appleseed"
    } else {
        const error_name = document.getElementsByClassName("name")[0]
        error_name.style.display = "none"
        cc_name.innerText = card_name
    }

    // card number error
    if (errors.includes("number_i")) {
        const error_number = document.getElementsByClassName("number")[0]
        error_number.style.display = "block"
        error_number.innerHTML = "<p>[Invalid Card-Number] - Must have a length of 16 digits!</p>"
        cc_number.innerText = "0000 0000 0000 0000"
    } else {
        const error_number = document.getElementsByClassName("number")[0]
        error_number.style.display = "none"
        cc_number.innerText = formatCardNumber(card_number)
    }

    // expiration month error
    if (errors.includes("mm_i")) {
        const error_month = document.getElementsByClassName("month")[0]
        error_month.style.display = "inline-block"
        error_month.innerHTML = "<p>[Month] 01-12 only</p>"
        cc_date.innerText = "00/00"
    } else {
        const error_month = document.getElementsByClassName("month")[0]
        error_month.style.display = "none"
        cc_date.innerText = card_month + "/"
    }

    // expiration year error
    if (errors.includes("yy_i")) {
        const error_year = document.getElementsByClassName("year")[0]
        error_year.style.display = "inline-block"
        error_year.innerHTML = "<p>[Year] 25-99 only</p>"
        if (!cc_date.innerText.includes("/")) {
            cc_date.innerText += "00"
        }
    } else {
        const error_year = document.getElementsByClassName("year")[0]
        error_year.style.display = "none"
        cc_date.innerText += card_year
    }

    // cvc error
    if (errors.includes("cvc_i")) {
        const error_cvc = document.getElementsByClassName("cvcerror")[0]
        error_cvc.style.display = "block"
        error_cvc.innerHTML = "<p>[Invalid CVC] - 3 digits, 100-999 only</p>"
    } else {
        const error_cvc = document.getElementsByClassName("cvcerror")[0]
        error_cvc.style.display = "none"
        cc_cvc.innerText = cvc_number
    }
}

// function to format card number with spaces (every 4 digits)
function formatCardNumber(cardNumber) {
    let formatted = "" // string to store the formatted number
    for (let i = 0; i < cardNumber.length; i++) {
        formatted += cardNumber[i] // add the current digit
        // add a space after every 4th digit (except the last group)
        if ((i + 1) % 4 === 0 && i !== cardNumber.length - 1) {
            formatted += " "
        }
    }
    return formatted // return the formatted string
}
