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
      // var data = $.csv.toArrays(response);
      var sheetData = $.csv.toObjects(response);
      console.log(sheetData);

      var html = "<table id='list-table'>";
      html += "<tr><th>সংগঠনের/প্রদানকারীর নাম</th><th>পণ্যের বিবরণ</th><th>পরিমান (জন)</th><th>বিতরণের প্রস্তাবিত স্থান</th><th>প্রতিনিধিগনের নাম ও মোবাইল নং</th></tr>";

      // Iterate over each row of data and add it to the table
      sheetData.forEach(function (row) {
        html += "<tr>";
        html += `<td>${row['সংগঠনের / প্রদানকারীর নাম']}</td>`;
        html += `<td>${row['পণ্যের বিবরণ']}</td>`;
        html += `<td>${row['পরিমাণ (জন)']}</td>`;
        html += `<td>${row['বিতরণের জন্য প্রস্তাবিত স্থান']}</td>`;
        html += `<td>${row['প্রতিনিধির নাম ও মোবাইল নং']}</td>`;
        html += "</tr>";
      });

      html += "</table>";

      // Append the generated table to the #list div
      $('#list').html(html);

    },
  });
});