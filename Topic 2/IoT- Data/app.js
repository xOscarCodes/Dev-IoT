const devices = JSON.parse(localStorage.getItem('devices')) || [];

devices.forEach(function (device) {
  $('#devices tbody').append(`
      <tr>
        <td>${device.user}</td>
        <td>${device.name}</td>
      </tr>`
  );
});

$('#add-device').on('click', function () {
  const user = $('#user').val();
  const name = $('#name').val();
  devices.push({ user, name });
  console.log(devices);
  localStorage.setItem('devices', JSON.stringify(devices));
  location.href = 'device-list.html';

});