function reverse(str) {
  var charList = str.split("");
  var reverseList = charList.reverse();
  var reversedStr = reverseList.join("");

  return reversedStr;
}

function checkPalindrome(str) {
  var reversedStr = reverse(str);
  if (str === reversedStr) {
    return true;
  }
  return false;
}

function dateToStr(date) {
  var dateStr = {
    day: "",
    month: "",
    year: "",
  };
  if (date.day < 10) {
    dateStr.day = "0" + date.day;
  } else {
    dateStr.day = date.day.toString();
  }
  if (date.month < 10) {
    dateStr.month = "0" + date.month;
  } else {
    dateStr.month = date.month.toString();
  }
  dateStr.year = date.year.toString();

  return dateStr;
}

function getAllDateFormats(date) {
  var dateStr = dateToStr(date);
  var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
  var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
  var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
  var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
  var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
  var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllDateFormats(date) {
  var listOfPalindromes = getAllDateFormats(date);
  var flag = false;
  for (var i = 0; i < listOfPalindromes.length; i++) {
    if (checkPalindrome(listOfPalindromes[i])) {
      flag = true;
      break;
    }
  }
  return flag;
}

function nextPalindrome(date) {
  var ctr = 0;
  var nextDate = dayIncrement(date);
  while (1) {
    ctr++;
    var isPalindrome = checkPalindromeForAllDateFormats(nextDate);
    if (isPalindrome) {
      break;
    }
    nextDate = dayIncrement(nextDate);
  }
  return [ctr, nextDate];
}
function isLeapYear(year) {
  if (year % 400 === 0) {
    return true;
  }
  if (year % 4 === 0 && year % 100 != 0) {
    return true;
  } else {
    return false;
  }
}

function dayIncrement(date) {
  var day = date.day + 1;
  var month = date.month;
  var year = date.year;

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 2) {
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month++;
      }
    } else {
      if (day > 28) {
        day = 1;
        month++;
      }
    }
  } else {
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month++;
    }
  }
  if (month > 12) {
    month = 1;
    year++;
  }
  return {
    day: day,
    month: month,
    year: year,
  };
}

var date = {
  day: 2,
  month: 2,
  year: 2020,
};

console.log(checkPalindromeForAllDateFormats(date));

var dateInput = document.querySelector("#date-input");
var check = document.querySelector(".check");
var clear = document.querySelector(".clear");
var showDisplay = document.querySelector(".output");
var error = document.querySelector(".error");
var loader = document.querySelector("#loader");
console.log(loader);

clear.addEventListener("click", clearEventHandler);
check.addEventListener("click", checkEventHandler);
loader.style.display = "none";

function clearEventHandler() {
  loader.style.display = "none";
  dateInput.value = "";
  showDisplay.textContent = "";
  error.style.display = "none";
}

function checkEventHandler() {
  if (dateInput.value != "") {
    loader.style.display = "flex";
    error.style.display = "none";
    showDisplay.style.display = "block";
    var dateList = dateInput.value.split("-");
    var day = Number(dateList[2]);
    var month = Number(dateList[1]);
    var year = Number(dateList[0]);
    var date = {
      day: day,
      month: month,
      year: year,
    };
    if (checkPalindromeForAllDateFormats(date)) {
      setTimeout(() => {
        loader.style.display = "none";
        showDisplay.innerText = "Yayy!! Your Birthday is Palindrome 🎉🎈✨💖 ";
      }, 2000);
    } else {
      var [ctr1, nextDate] = nextPalindrome(date);
      setTimeout(() => {
        loader.style.display = "none";
        showDisplay.innerText = `ohh ho!! The next Palindromic date is ${nextDate.day}-${nextDate.month}-${nextDate.year}. You missed it by ${ctr1} days 😔😥😢😩`;
      }, 2000);
    }
  } else {
    loader.style.display = "none";
    error.style.display = "block";
    showDisplay.style.display = "none";
    error.innerText = "Please enter your birth-day";
  }
}
