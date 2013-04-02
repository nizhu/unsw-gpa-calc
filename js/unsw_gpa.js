COURSE_REGEX = /^([A-Z]{4} \d{4}).+(\d+).00\s*\d*.00\s*(\d+)\s*([A-Z]+)$/;
STANDARD_UNIT = 6;

// https://my.unsw.edu.au/student/academiclife/assessment/GuideToUNSWGrades.html
GPA_VALUES = {
  "HD":4,
  "DN":3,
  "CR":2,
  "PS":1,
  "PC":1,
  "FL":0,
  "AF":0,
  "UF":0,
  "NC":0
};

var parse = function(text){
  var textArray = text.split('\n');
  var result = [];
  for (i in textArray){
    var match = COURSE_REGEX.exec(textArray[i]);
    if (match !== null){
      console.log(textArray[i]);
      result.push({
        "code":match[1],
        "units":match[2],
        "mark":match[3],
        "grade":match[4]
      });
    } 
  }
  return result;
}

var calculate_gpa = function(parsed_data){
  var weight = 0;
  var total = 0;

  for (i in parsed_data){
    if (parsed_data[i]['grade'] in GPA_VALUES){
      weight += parsed_data[i]['units'] / STANDARD_UNIT;
      total += GPA_VALUES[parsed_data[i]['grade']];
    }
  }

  return total / weight;
}

function process(){
  var result = parse($('textarea#statement').val());
  var gpa = calculate_gpa(result); 
  $('p#gpa').text(JSON.stringify(gpa));
}
