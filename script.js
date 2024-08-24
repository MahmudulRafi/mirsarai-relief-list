$(document).ready(function () {

  const sheetId = "1k4t4Ylm4UduGMjV2OY4Sn7bSsUTBYxysECc-y-JcLw8";
  // sheetName is the name of the TAB in your spreadsheet (default is "Sheet1")
  const sheetName = encodeURIComponent("25.8");
  const sheetURL = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${sheetName}`;

  $.ajax({
    type: "GET",
    url: sheetURL,
    dataType: "text",
    success: function (response) {

      var sheetData = $.csv.toObjects(response);

      var tableHeader = "<tr><th>সংগঠনের/প্রদানকারীর নাম</th><th>পণ্যের বিবরণ</th><th>পরিমান (জন)</th><th>বিতরণের প্রস্তাবিত স্থান</th><th>প্রতিনিধিগনের নাম ও মোবাইল নং</th></tr>";
 
      $("#list-table thead").append(tableHeader);

      sheetData.forEach(function (row) {
        var tableRow = "";
        tableRow += "<tr>";
        tableRow += `<td>${row['সংগঠনের / প্রদানকারীর নাম']}</td>`;
        tableRow += `<td>${row['পণ্যের বিবরণ']}</td>`;
        tableRow += `<td>${row['পরিমাণ (জন)']}</td>`;
        tableRow += `<td>${row['বিতরণের জন্য প্রস্তাবিত স্থান']}</td>`;
        tableRow += `<td>${row['প্রতিনিধির নাম ও মোবাইল নং']}</td>`;
        tableRow += "</tr>";
        
        $("#list-table tbody").append(tableRow);

      });
    },
  });
});