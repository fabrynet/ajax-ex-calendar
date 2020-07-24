// Creiamo un calendario dinamico con le festività.
// Il calendario partirà da gennaio 2018 e si concluderà a dicembre 2018 (unici dati disponibili sull'API).
// Milestone 1
// Creiamo il mese di Gennaio, e con la chiamata all'API inseriamo le festività.
// Milestone 2
// Diamo la possibilità di cambiare mese, gestendo il caso in cui l'API non possa ritornare festività.
// Attenzione!
// Ogni volta che cambio mese dovrò:
// Controllare se il mese è valido (per ovviare al problema che l'API non carichi holiday non del 2018)
// Controllare quanti giorni ha il mese scelto formando così una lista
// Chiedere all'api quali sono le festività per il mese scelto
// Evidenziare le festività nella lista

function addListeners() {
  $(document).on('click','.prev', prevMonth);
  $(document).on('click','.next', nextMonth);
  $(document).on('swipeleft', nextMonth);
  $(document).on('swiperight', prevMonth);
  $(document).keyup(sendKeyup);
}

function sendKeyup(event) {
  var keyWhich = event.which;
  var keyCode = event.keyCode;
  if (keyWhich == 39 || keyCode == 39) {
      nextMonth();
    } else if (keyWhich == 37 || keyCode == 37) {
      prevMonth();
    }
}

function prevMonth () {

  var yearPrev = $('.months h1').data('year');
  var monthIndex = $('.months h1').data('month');

  if (monthIndex == 1) {
    // alert('Attenzione, non è possibile andare nel ' + (year - 1));
    var yearPrev = yearPrev - 1;
    var monthPrev = 12;
  } else {
    var monthPrev = monthIndex - 1;
  }
  drawMonths(monthPrev, yearPrev);
  drawDays(monthPrev, yearPrev);
}

function nextMonth () {

  var yearNext = $('.months h1').data('year');
  var monthIndex = $('.months h1').data('month');

  if (monthIndex == 12) {
    // alert('Attenzione, non è possibile andare nel ' + (year + 1));
    var yearNext = yearNext + 1;
    var monthNext = 1;
  } else {
    var monthNext = monthIndex + 1;
  }
  drawMonths(monthNext, yearNext);
  drawDays(monthNext, yearNext);
}

function drawMonths (month, year) {

  var target = $('.months');
  target.empty();

  var template = $('#months-template').html();
  var compiled = Handlebars.compile(template);

  var mom = moment(month,'M');
  var monthTxt = mom.format('MMMM');

  var monthHTML = compiled({
    month: monthTxt,
    monthIndex: month,
    year: year
  });
  target.prepend(monthHTML);
}

// disegno la griglia di quadrati per i giorni del calendario relativi al mese e all'anno
function drawDays (month, year) {

  var target = $('.days');
  target.empty();

  var date = month + "-" + year;
  var mom = moment(date,'M-YYYY');
  var monthDays = mom.daysInMonth();

  var template = $('#days-template').html();
  var compiled = Handlebars.compile(template);

  for (var i = 1; i <= monthDays; i++) {

    var date = i + "-" + month + "-" + year;
    var mom = moment(date,'D-M-YYYY');

    var weekDay = mom.weekday();
    // console.log(weekDay);

    if (i == 1) {
      for (var j = 0; j < weekDay; j++) {
        var dayHTML = compiled({
          day: '',
          datecomplete: ''
        });
        target.prepend(dayHTML);
      }
    }

    var datecomplete = moment({ year: mom.year(), month: mom.month(), day: i});
    var obj = {
      day: i,
      datecomplete: datecomplete.format('YYYY-MM-DD')
    }
    var dayHTML = compiled(obj);
    target.append(dayHTML);

    if (weekDay == 5) {
      var day = $('.day[data-datecomplete="' + obj.datecomplete + '"]');
      day.addClass('grey');
    }

    if (weekDay == 6) {
      $('.day[data-datecomplete="' + obj.datecomplete + '"]').addClass('red');
    }

  }

  getHolidays(month, year);

}

function getHolidays(month, year) {

  $.ajax({
    url: 'https://flynn.boolean.careers/exercises/api/holidays',
    data: {
      month: month - 1,
      year: year
    },
    method: 'GET',
    success: function(data) {
      var success = data['success'];
      var holidays = data['response'];

      if (success) {
        printHolidays(holidays);
      } else {
        console.log('Chiamata sbagliata:', data);
        printError(month, year);
      }
    },
    error: function(err) {
      console.log('Errore:', err);
      printError(month, year);
    }
  });

}

function printError (month, year) {
  var target = $('.months');
  target.empty();
  var template = $('#months-template').html();
  var compiled = Handlebars.compile(template);
  var mom = moment(month,'M');
  var monthTxt = mom.format('MMMM');
  var errorHTML = compiled({
    month: monthTxt,
    monthIndex: month,
    year: year,
    error: '(non è possibile prendere le festività per il mese selezionato)'
  });
  target.append(errorHTML);
}


function printHolidays (holidays) {

  var template = $('#holidays-template').html();
  var compiled = Handlebars.compile(template);

  for (var i = 0; i < holidays.length; i++) {
    var day = $('.day[data-datecomplete="' + holidays[i].date + '"]');
    if (day.hasClass('grey')) {
      day.removeClass('grey');
    }
    day.addClass('red');
    var holidayHTML = compiled({
      holiday: holidays[i].name
    });
    day.append(holidayHTML);
  }
}

function init() {
  var startingMonth = 1;
  var startingYear = 2018;
  drawMonths(startingMonth, startingYear);
  drawDays(startingMonth, startingYear);
  addListeners();
}

$(document).ready(init);
