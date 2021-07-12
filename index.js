function createEmployeeRecord(arr) {
  return {
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

function createEmployeeRecords(employeeRecord) { 
  return employeeRecord.map(function(arr){
    return createEmployeeRecord(arr);
  })
}

function createTimeInEvent(employeeRecord, timeStamp) {
  let [date, hour] = timeStamp.split(' ');
  employeeRecord.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date
  })
  return employeeRecord;
}

function createTimeOutEvent(employeeRecord, timeStamp) {
  let [date, hour] = timeStamp.split(' ');
  employeeRecord.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date
  })
  return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, dateQuery) {
  let clockIn = employeeRecord.timeInEvents.find(function(c) {
    return c.date === dateQuery
  })
  let clockOut = employeeRecord.timeOutEvents.find(function(c) {
    return c.date === dateQuery
  })

  return (clockOut.hour - clockIn.hour) / 100
}

function wagesEarnedOnDate(employeeRecord, dateQuery) {
  let wages = hoursWorkedOnDate(employeeRecord, dateQuery) * employeeRecord.payPerHour;
  return parseFloat(wages.toString())
}

function allWagesFor(employeeRecord) {
  let workedDays = employeeRecord.timeInEvents.map(function(e) {
    return e.date;
  });
  let payable = workedDays.reduce(function(memo, d) {
    return memo + wagesEarnedOnDate(employeeRecord, d)
  }, 0);
  return payable;
}

function findEmployeeByFirstName(srcArray, firstName) {
  return srcArray.find(function(e){
    return e.firstName === firstName;
  })
}

function calculatePayroll(employeeRecords) {
  return employeeRecords.reduce(function(memo, e) {
    return memo + allWagesFor(e);
  }, 0)
}