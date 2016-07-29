'use strict';
//http://www.json-generator.com/api/json/get/bTNPIQRrQO?indent=2
fetch('http://beta.json-generator.com/api/json/get/VJCi-3bO-')
  .then(function(response) {
    //console.log(`response.headers: ${response.headers.get('Content-Type')}`); // application/json; charset=utf-8
    //console.log(`response.status: ${response.status}`); // 200
    return response.json();
  })
  .then(function(data) {
    //console.log(`data: ${JSON.stringify(data)}`);
    drawTable(data)
  });

function uniq(a) {
  return Array.from(new Set(a));
}
var selectList = [];

function drawTable(data) {
  // draw table
  //console.log(`data: ${JSON.stringify(data)}`);
  var tableHeader = '<tr>' +
    '<th>ID</th>' +
    '<th>FULL NAME</th>' +
    '<th>DEPARTMENT</th>' +
    '</tr>';
  var tableContent = "";
  for (var i = 0; i < data.length; i++) {
    //making login in model
    var login = data[i].full_name[0].charAt(0) + data[i].full_name.split(/(\s+)/)[2];
    login = login.toLowerCase();
    var tableRow = '<tr class="clickable-row">' +
      '<td>' + login + '</td>' +
      '<td>' + data[i].full_name + '</td>' +
      '<td>' + data[i].department + '</td>' +
      '</tr>';
    tableContent += tableRow;
    selectList.push(data[i].department);
  };
  $('.table').append(tableHeader + tableContent);
  // draw Department Select List
  selectList = uniq(selectList).sort();
};
$('#tableElement').on('click', '.clickable-row', function(event) {
  $(this).addClass('active').siblings().removeClass('active');
  var id = $(this).closest('tr').find('td:nth-child(1)').text();
  var fullName = $(this).closest('tr').find('td:nth-child(2)').text();
  //console.log(fullName);
  var department = $(this).closest('tr').find('td:nth-child(3)').text();
  //console.log(`id: ${id}, fullName: ${fullName}, department: ${department}`);
  $("#inputId").val(id);
  $("#inputName").val(fullName);
  $("#inputDepartment").val(department);
  var depSelectContent = "";
  var index = selectList.indexOf(department);
  if (index > -1) {
    selectList.splice(index, 1);
  }
  selectList.unshift(department);
  for (var i = 0; i < selectList.length; i++) {
    var depSelectElem = '<option>' + selectList[i] + '</option>';
    depSelectContent += depSelectElem;
  };
  $('#depSelect').html("");
  $('#depSelect').append(depSelectContent);
});
$('#saveRow').click(function(e) {
  e.preventDefault();
  var id = $('#inputId').val();
  var fullName = $('#inputName').val();
  var department = $('#depSelect').val();
  // check for correct fullname
  var fullNameArray = fullName.split(/(\s+)/);
  if (id && fullName && department) {
    if (fullNameArray.length >= 2) {
      //console.log(`id: ${id}, fullName: ${fullName}, department: ${department}`);
      // making login
      var loginArray = fullName.split(/(\s+)/);
      var login = loginArray[0].charAt(0) + loginArray[2];
      login = login.toLowerCase();
      $('#tableElement .active td:nth-child(1)').html(login);
      $('#tableElement .active td:nth-child(2)').html(fullName);
      $('#tableElement .active td:nth-child(3)').html(department);
      var se = $('#depSelect option:selected').text();
      //console.log(success);
    } else {
      //alert("Enter correct fullName");
      $('#myModal2').modal("show");
      setTimeout(hideFunc, 2000);

      function hideFunc() {
        $('#myModal2').modal("hide");
      }
      $('#myform').on('submit', function(ev) {

        var data = $(this).serializeObject();
        json_data = JSON.stringify(data);
        $("#results").text(json_data);
        $(".modal-body").text(json_data);
        // $("#results").text(data);
        ev.preventDefault();
      });
    };
  } else {
    //alert("please select row in table!");
    $('#myModal').modal("show");
    setTimeout(hideFunc, 2000);

    function hideFunc() {
      $('#myModal').modal("hide");
    }
    $('#myform').on('submit', function(ev) {

      var data = $(this).serializeObject();
      json_data = JSON.stringify(data);
      $("#results").text(json_data);
      $(".modal-body").text(json_data);
      // $("#results").text(data);
      ev.preventDefault();

    });
  }

});
