const ics = require("ics")
const path = require('path')
const fs = require('fs')

// Build objects of date objects for each supplied date
function getDates(dateString) {
  return dateString
    .trim()
    .split("-")
    .map((string) => string.trim().split("."))
    .map((dateArr) => new Date(parseInt(dateArr[2]), parseInt(dateArr[1]) - 1, parseInt(dateArr[0]))); // Build a date object from year, month and day
}


filePath = path.join(__dirname, 'src/assets/events.txt');

fs.readFile(filePath, {encoding: 'utf-8'}, async function (err, data) {
  if (err) {
    console.error(err)
    return
  }


  // Build objects of date objects for each supplied date
  const events = []

  const lines = data.split('\n');
  lines.forEach(line => {
    if (line.trim() === '') return
    const [eventType, eventName, eventDate, eventLink] = line.split(';').map(it => it.trim());
    events.push({
      type: eventType,
      name: eventName,
      dates: getDates(eventDate),
      link: eventLink,
    })
  });

  const calendarEvents = events.map(event => {
    let date1 = event.dates[0]
    let date2 = event.dates[event.dates.length - 1]

    let dayAfter = new Date(date2)
    dayAfter.setDate(dayAfter.getDate() + 1)

    let description;
    let url;
    if (event.link && event.link !== '') {
      description = "Sign up at " + event.link
      url = event.link
    }

    return {
      title: event.name,
      description: description,
      start: [date1.getFullYear(), date1.getMonth() + 1, date1.getDate()],
      end: [dayAfter.getFullYear(), dayAfter.getMonth() + 1, dayAfter.getDate()],
      url: url
    }
  });


  ics.createEvents(calendarEvents, (error, value) => {
    if (error) {
      console.error(error)
      return
    }

    fs.writeFileSync(`${__dirname}/src/assets/IClub_events.ics`, value)
  })

});
