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
    var datecomplete = moment({ year: mom.year(), month: mom.month(), day: i});
    console.log(month);
    var dayHTML = compiled({
      day: i,
      datecomplete: datecomplete.format('YYYY-MM-DD')
    });
    target.append(dayHTML);
  }

  drawMonths (month, year);
  getHolidays(month, year);

}

function drawMonths (month, year) {

  var target = $('.months');
  target.empty();

  var template = $('#months-template').html();
  var compiled = Handlebars.compile(template);

  var mom = moment(month,'M');
  var monthOfYear = mom.format('MMMM');

  var monthHTML = compiled({
    month: monthOfYear
  });
  target.prepend(monthHTML);
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
      console.log(success, holidays);

      if (success) {
        printHolidays(holidays);
      } else {
        console.log(data);
      }
    },
    error: function(err) {
      console.log(err);
    }
  });

}

function printHolidays (holidays) {

  var template = $('#holidays-template').html();
  var compiled = Handlebars.compile(template);

  for (var i = 0; i < holidays.length; i++) {
  var target = $('.day[data-datecomplete="' + holidays[i].date + '"]');
  target.addClass('red');
  holidayHTML = compiled({
    holiday: holidays[i].name
  });
  console.log(holidayHTML);
  target.append(holidayHTML);
  }
}

function init() {
  var month = 4;
  var year = 2018;
  drawDays(month, year);
  drawMonths(month, year);
  addListeners();
}

$(document).ready(init);
