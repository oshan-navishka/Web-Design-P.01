
  // ------------------------Start : Sidebar Handler --------------------------

        let sidebar_open = true;

        $('#menu_btn').on('click', function () {
            if(sidebar_open) {
                $('#sidebar').css({display: 'none'});
                $('#content').css({marginLeft: '0px'});
                sidebar_open = false;
            } else {
                $('#sidebar').css({display: 'block'});
                $('#content').css({marginLeft: '250px'});
                sidebar_open = true;
            }
        });

  // ------------------------End : Sidebar Handler --------------------------