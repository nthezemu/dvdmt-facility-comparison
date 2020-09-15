const _ = require('lodash')
const json2xls = require('json2xls')
const fs = require('fs')
var XLSX = require('xlsx')
var workbook = XLSX.readFile('dvdmt_file1.xlsx') //50 000 records
var workbook1 = XLSX.readFile('master_facilities.xlsx')

var sheet_name_list = workbook.SheetNames;
var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]])

var sheet_name_list1 = workbook1.SheetNames;
var xlData1 = XLSX.utils.sheet_to_json(workbook1.Sheets[sheet_name_list1[0]])


//defining the translating function
var translate = function(
  zone,
  district,
  dvdmt_name,
  dhis2_name,
  month
  ){
    var obj = {
      "Zone": zone,
      "District Name": district,
      "DVDMT Facility Name": dvdmt_name,
      "DHIS2 Name": dhis2_name,
      "Month": month
    }
  return obj
}

//end of the translating function

var translated_data = []
var year = "2017" //change the year here

_.each(xlData, function (item1,i) {
  //create variables
        var zone = ""
        var district = ""
        var dvdmt_name = ""
        var dhis2_name = "Not Found"
        var month = ""
        var monthdisplay = ""

        //get the data variables
        zone = item1.zone
        district = item1.district
        dvdmt_name = item1.dvdmt_name
        month = item1.month
        console.log(month)
        switch (month) {
          case 1:
          monthdisplay = year.concat('01')
          break;
          case 2:
          monthdisplay = year.concat('02')
          break;
          case 3:
          monthdisplay = year.concat('03')
          break;
          case 4:
          monthdisplay = year.concat('04')
          break;
          case 5:
          monthdisplay = year.concat('05')
          break;
          case 6:
          monthdisplay = year.concat('06')
          break;
          case 7:
          monthdisplay = year.concat('07')
          break;
          case 8:
          monthdisplay = year.concat('08')
          break;
          case 9:
          monthdisplay = year.concat('09')
          break;
          case 10:
          monthdisplay = year.concat('10')
          break;
          case 11:
          monthdisplay = year.concat('11')
          break;
          case 12:
          monthdisplay = year.concat('12')
          break;
          default:
          monthdisplay = ""

        }

        _.each(xlData1, function (item2,j) {
          var district_name = ""
          var facility_name = ""


          //get the variables
          district_name = item2.district
          facility_name = item2.dvdmt_name
          dhis2_name_display = item2.dhis2_name
          //console.log(xlData1)

          //change all the items to lower case
          district = district.toLowerCase()
          dvdmt_name = dvdmt_name.toLowerCase()
          district_name = district_name.toLowerCase()
          facility_name = facility_name.toLowerCase()

          if(district == district_name && dvdmt_name == facility_name){
            //match Found
            dhis2_name = item2.dhis2_name

          }

        })
        //write to the files
        var record = translate(
          zone,
          district,
          dvdmt_name,
          dhis2_name,
          monthdisplay)
          console.log(record)
          translated_data.push(record)

})

//write the data to the filename
var filename = "DVDMT_Mapped_facilities"
fs.writeFileSync('output/' + filename + '_data.xlsx', json2xls(translated_data), 'binary');
