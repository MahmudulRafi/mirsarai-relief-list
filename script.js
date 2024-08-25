$(document).ready(function () {
  // Hide all tabs initially except for the first one
  $(".tabcontent").hide();
  $("#Form").show();

  // Function to open the tab
  window.openTab = function(evt, tabName) {
    $(".tabcontent").hide();  // Hide all tabs
    $("#" + tabName).show();  // Show the selected tab

    if (tabName === "List") {
      loadTableData();  // Load data when List tab is shown
    }
  }

  // Function to load table data
  function loadTableData() {
    const sheetId = "1k4t4Ylm4UduGMjV2OY4Sn7bSsUTBYxysECc-y-JcLw8";
    const sheetName = encodeURIComponent("25.8");
    const sheetURL = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${sheetName}`;

    // Clear existing data
    $("#list-table thead").empty();
    $("#list-table tbody").empty();

    // Fetch and render data
    $.ajax({
      type: "GET",
      url: sheetURL,
      dataType: "text",
      success: function (response) {
        var sheetData = $.csv.toObjects(response);

        var tableHeader =
          "<tr><th>সংগঠনের/প্রদানকারীর নাম</th><th>পণ্যের বিবরণ</th><th>পরিমান (জন)</th><th>বিতরণের প্রস্তাবিত স্থান</th><th>প্রতিনিধিগনের নাম ও মোবাইল নং</th></tr>";

        $("#list-table thead").html(tableHeader);

        sheetData.forEach(function (row) {
          var tableRow = "";
          tableRow += "<tr>";
          tableRow += `<td>${row["সংগঠনের / প্রদানকারীর নাম"]}</td>`;

          var items = row['পণ্যের বিবরণ'].split(","); 
          var squareIcon = "•"; 
          var rowList = items.map(item => `${squareIcon} ${item.trim()}`).join(" "); 
          
          tableRow += `<td>${rowList}</td>`;
          tableRow += `<td>${row["পরিমাণ (জন)"] || "N/A"}</td>`;
          tableRow += `<td>${row["বিতরণের জন্য প্রস্তাবিত স্থান"]}</td>`;
          tableRow += `<td>${row["প্রতিনিধির নাম ও মোবাইল নং"]}</td>`;
          tableRow += "</tr>";

          $("#list-table tbody").append(tableRow);
        });
      },
    });
  }

  // Initially load the form data only
  $("#Form").show();
});
