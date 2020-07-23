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

// disegno la griglia di quadrati per i giorni del calendario relativi al mese e all'anno
function drawDays (month, year) {

  var target = $('.modal');
  target.empty();

  var date = month + "-" + year;
  var monthDays = moment(date,'M-YYYY').daysInMonth();

  var template = $('#days-template').html();
  var compiled = Handlebars.compile(template);

  var templateMonth = $('#months-template').html();
  var compiledMonth = Handlebars.compile(templateMonth);

  var mom = moment(month,'M');
  var monthOfYear = mom.format('MMMM');

  var monthHTML = compiledMonth({
    month: monthOfYear
  });
  target.prepend(monthHTML);

  for (var i = 1; i <= monthDays; i++) {
    var dayHTML = compiled({
      day: i,
      holiday: getHolidays(month, year)
    });
    target.append(dayHTML);
  }

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

        if (holidays) {

        }

      } else {
        console.log(data);
      }
    },
    error: function(err) {
      console.log(err);
    }
  });

}

function init() {
  var month = 1;
  var year = 2018;
  drawDays(month, year);
}

$(document).ready(init);
