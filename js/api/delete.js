const ID = localStorage.getItem('idValue');

const Toast = Swal.mixin({
  toast: true,
  position: 'center',
  iconColor: 'white',
  customClass: {
    popup: 'colored-toast',
  },
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
});

async function deleteContent() {
    await Swal.fire({
        title: 'Do you really want to delete the content?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonColor: '#FF9C28',
        iconColor: '#FF9C28',
        confirmButtonText: 'YES',
        denyButtonText: 'NO',
      }).then((result) => {
        if (result.isConfirmed) {
            fetch(URL+"/"+ID, {
                method: 'DELETE'
            }).then((response) => {
                if (response.status == 200) {
                    Swal.fire({
                        title: 'Deleted!', 
                        showConfirmButton: true,
                        showCancelButton: false,
                        icon: 'success',
                        iconColor: '#FF9C28',
                        confirmButtonText: 'Nice :)',
                        confirmButtonColor: '#FF9C28'
                    }).then(() => {
                        window.location.reload();
                    })
                }
            })
        } else if (result.isDenied) {
            Toast.fire({
                icon: 'error',
                title: 'Not deleted',
            })
        }
      })
    
}
