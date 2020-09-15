const _ = require('lodash')
const json2xls = require('json2xls')
const fs = require('fs')
var XLSX = require('xlsx')
var workbook = XLSX.readFile('dvdmt_file.xlsx') //50 000 records
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
  dhis2_name
  ){
    var obj = {
      "Zone": zone,
      "District Name": district,
      "DVDMT Facility Name": dvdmt_name,
      "DHIS2 Name": dhis2_name
    }
  return obj
}

//end of the translating function

var translated_data = []

_.each(xlData, function (item1,i) {
  //create variables
        var zone = ""
        var district = ""
        var dvdmt_name = ""
        var dhis2_name = "Not Found"

        //get the data variables
        zone = item1.zone
        district = item1.district
        dvdmt_name = item1.dvdmt_name

        _.each(xlData1, function (item2,j) {
          var district_name = ""
          var facility_name = ""


          //get the variables
          district_name = item2.district
          facility_name = item2.dvdmt_name
          dhis2_name_display = item2.dhis2_name
          //console.log(xlData1)

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
          dhis2_name)
          console.log(record)
          translated_data.push(record)

})

//write the data to the filename
var filename = "DVDMT_Mapped_facilities"
fs.writeFileSync('output/' + filename + '_data.xlsx', json2xls(translated_data), 'binary');
