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

function getHolidays() {
  console.log('ciao');
}

// disegno la griglia di quadrati per i giorni del calendario
function drawSquares (days) {
  var template = $('#days-template').html();
  var compiled = Handlebars.compile(template);
  var squareHTML = compiled();
  var target = $('.modal');
  for (var i = 0; i < days; i++) {
    target.append(squareHTML);
  }
}

function genSelectData () {

  var dayTarget = $('#day');
  var monthTarget = $('#month');
  var yearTarget = $('#year');

  var months = moment.months();

  var template = $('#select-template').html();
  var compiled = Handlebars.compile(template);

  // days
  for (var i = 1; i <= 31; i++) {
    // var optionHTML = $('<option value="' + i + '">' + i + '</option>');
    var optionHTML = compiled({
      value: i,
      valueTxt: i
    });
    dayTarget.append(optionHTML);
  }

  // months
  for (var i = 0; i < months.length; i++) {
    var month = months[i];
    // var optionHTML = $('<option value="' + (i+1) + '">' + month + '</option>');
    var optionHTML = compiled({
      value: i+1,
      valueTxt: month
    });
    monthTarget.append(optionHTML);
  }

  // yearTarget
  for (var i = 1980; i <= 2017; i++) {
    // var optionHTML = $('<option value="' + i + '">' + i + '</option>');
    var optionHTML = compiled({
      value: i,
      valueTxt: i
    });
    yearTarget.append(optionHTML);
  }

}

function checkSelectedData () {
  var day = $('#day').val();
  var month = $('#month').val();
  var year = $('#year').val();
  console.log(day, month, year);

  var dateTxt = day + "/" + month + "/" + year;
  var mom = moment(dateTxt,'D/M/YYYY');
  console.log(mom);

  var isValidDate = mom.isValid();
  if (isValidDate) {
    $('#result').text("E' una data valida");
  } else {
    $('#result').text("Non è una data valida");
  }
}

function getDayOfWeek () {
  var data = $('#input').val();
  console.log(data);

  var mom = moment(data,'DD/MM/YYYY');
  console.log(mom);

  var dayOfWeek = mom.format('dddd');
  console.log(dayOfWeek);

  var target = $('#result');
  target.append(dayOfWeek);
}

function init() {
  getHolidays();
}

$(document).ready(init);
