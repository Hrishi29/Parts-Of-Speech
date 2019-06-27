function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


function getAllCookies() {


    var pairs = document.cookie.split(';');

    var cookies = {};
    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split("=");
        cookies[(pair[0] + '').trim()] = unescape(pair[1]);
    }

    return cookies;


}

function checkCookie() {

    var cookies = getAllCookies();

    var favcount = 0;

    for (var name in cookies) {
        var user = getCookie($.trim(name));


        if (user != "") {

            var array_user = user.split(',');
            var i;


            var tabledata = $('#example').DataTable({
                responsive: {
                    details: {
                            type: 'column',
                            target: -1
                        }
                },
                retrieve: true,
                "iDisplayLength": 25,

                columnDefs: [
                     {
                    className: 'control',
                    orderable: false,
                    targets:   -1
                 },
                    {
                    orderable: false,
                    className: 'select-checkbox',
                    targets: 0
                }],
                select: {
                    style: 'multi',
                    selector: 'td:first-child'
                },
                order: [
                    [1, 'asc']
                ],



            });

            $('[data-toggle="tooltip"]').tooltip();
            // flen = array_user.length;
            for (i = 0; i < array_user.length; i++) {

                var fav_cookie = array_user[i];
                //  alert(fav_cookie);
                $.ajax({

                    //AJAX type is "Post".

                    type: "POST",

                    //Data will be sent to "ajax.php".

                    url: "ajax/courses.ajax.php",



                    //Data, that will be sent to "ajax.php".

                    data: {

                        // school_cookie: school_name1,
                        cookie_fav: fav_cookie


                    },

                    success: function(data) {

                        $('#favtable tr:last').after(data);
                        $(".bagdecount").html($('#favtable tr').length - 1);

                    }

                });

                $("#maintable11 tr").each(function() {


                    if (fav_cookie == $(this).children('td:nth-child(2)').attr('id')) {


                        $(this).addClass('selected');

                        tabledata.rows($(this)).select();

                        $(this).addClass("active1");
                        $(".active1").css({
                            "background-color": "white",
                            "color": "black"
                        });
                        $(this).children('td:nth-child(1)').tooltip("disable");

                    }

                });

            }



        } else {

            // alert("cookies are not set");
        }


    }


}


$(document).ready(function() {



    $("#stateselfil").on("click", function() {

        $('input:checkbox[name="option_state"]').each(function() {

            if ($(this).is(':checked')) {

                $(this).prop('checked', false);
            }

        });

        $(this).hide();
        $(".firstacc").hide();
        $(".spanschool").text("");
        $("#schooltexthide").text("");
        $("#schoolselfil").hide();
        $(".btnschlhide").text("");
        $(".filtersubjects").html("Please Select State and School");
        $(".filtercourse").html("Please Select State and School");
        $(".filterschools").html("Please Select a State");

    });

    $("#schoolselfil").on("click", function() {

        $('input:checkbox[name="option1"]').each(function() {

            if ($(this).is(':checked')) {

                $(this).prop('checked', false);
            }

        });

        $(this).hide();
        $(".firstacc").hide();
        $(".spanschool").text("");
        $("#schooltexthide").text("");
        $(".filtersubjects").html("Please Select a School");
        $(".filtercourse").html("Please Select a School");

    });

    $(".resetbtn").on("click", function() {

        $(".filtersubjects").html("Please Select State and School");
        $(".filtercourse").html("Please Select State and School");
        $(".filterschools").html("Please Select a State");
        $(".btnschlhide").text("");
        $(".btnstatehide").text("");
        $("#stateselfil").hide();
        $("#schoolselfil").hide();

        $('input:checkbox[name="option_state"]').each(function() {

            if ($(this).is(':checked')) {

                $(this).prop('checked', false);
            }
        });


        $(".firstacc").hide();
        $(".spanschool").text("");
        $("#schooltexthide").text("");

    });



    $('input:checkbox[name="option1"]').each(function() {
        if ($(this).is(':checked')) {
            this.scrollIntoView({
                behavior: 'auto',
                text: 'center',
                inline: 'center'
            });

            $(".btnschlhide").text($.trim($(this).val()));


        }
    });



    $('input:checkbox[name="option_state"]').each(function() {

        if ($(this).is(':checked')) {
            this.scrollIntoView({
                behavior: 'auto',
                text: 'center',
                inline: 'center'
            });

            $(".btnstatehide").text($.trim($(this).val()));

        }
    });


    //  $('.modalschool').text($(".firstacc").find("span:first").text());
    $(document).on("click", ".emailsnd", function() {

        function getCookie(cname) {
            var name = cname + "=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        }


        function getAllCookies() {


            var pairs = document.cookie.split(';');

            var cookies = {};
            for (var i = 0; i < pairs.length; i++) {
                var pair = pairs[i].split("=");
                cookies[(pair[0] + '').trim()] = unescape(pair[1]);
            }

            return cookies;


        }


        var firstn = $(".fname").val();
        var lastn = $(".lname").val();
        var ename = $(".eid").val();
        var favta = $(".location").html();
        //  var collegename = $(".firstacc").find("span:first").text();

        var cookies = getAllCookies();

        for (var name in cookies) {
            var user = getCookie($.trim(name));

            if (user != "") {

                var array_user = user.split(',');
                var i;


                for (i = 0; i < array_user.length; i++) {

                    var fav_cookie = array_user[i];

                    $.ajax({

                        //AJAX type is "Post".

                        type: "POST",

                        //Data will be sent to "ajax.php".

                        url: "favorites.php",



                        //Data, that will be sent to "ajax.php".

                        data: {

                            //Assigning value of "name" into "search" variable.


                            firstname: firstn,
                            lastname: lastn,
                            emailid: ename,
                            cook_fav: fav_cookie


                        },

                        success: function(data) {



                        }

                    });

                }

            } else {

            }

        }




        $.ajax({

            //AJAX type is "Post".

            type: "POST",

            //Data will be sent to "ajax.php".

            url: "email.php",



            //Data, that will be sent to "ajax.php".

            data: {

                //Assigning value of "name" into "search" variable.


                firstname: firstn,
                lastname: lastn,
                emailid: ename,
                emailht: favta,

            },

            success: function(data) {


                $(".reqemail").html(data);

            }

        });



    });

    $(document).on("change", "#course_form :checkbox", function() {

        var checkboxValues = [];

        var checkboxValues1 = [];

        $(".collegehide").hide();
        $('#loader').show();

        $('input:checkbox[name="option2"]').each(function() {
            if ($(this).is(':checked')) {

                checkboxValues1.push($(this).val());



            }

        });


        $('input:checkbox[name="subject_option"]').each(function() {
            if ($(this).is(':checked')) {

                checkboxValues.push($(this).val());



            }

        });

        $('input:checkbox[name="option1"]').each(function() {
            if ($(this).is(':checked')) {

                var school_subject_check = $(this).val();

                $.ajax({

                    //AJAX type is "Post".

                    type: "POST",

                    //Data will be sent to "ajax.php".

                    url: "ajax/courses.ajax.php",



                    //Data, that will be sent to "ajax.php".

                    data: {

                        //Assigning value of "name" into "search" variable.


                        school_state: school_subject_check,
                        subject_number_name: checkboxValues,
                        course_number_name: checkboxValues1
                        //   subj_info: subjvalue

                    },

                    success: function(data) {

                        if ($(".firstacc").find("span:first").text() == $.trim(school_subject_check)) {

                            $('#example').dataTable().fnClearTable();
                            $(".collegehide").show();
                            $('#loader').hide();


                            $(".first_table").html(data);

                            var tabledata = $('#example').DataTable({
                                  responsive: {
                                    details: {
                                            type: 'column',
                                            target: -1
                                        }
                                },
                                retrieve: true,
                                "iDisplayLength": 25,
                                columnDefs: [
                                        {
                                        className: 'control',
                                        orderable: false,
                                        targets:   -1
                                     },
                                    {
                                    orderable: false,
                                    className: 'select-checkbox',
                                    targets: 0
                                }],
                                select: {
                                    style: 'multi',
                                    selector: 'td:first-child'
                                },
                                order: [
                                    [1, 'asc']
                                ],


                            });

                            $('[data-toggle="tooltip"]').tooltip();



                            $("#favtable tr").each(function() {

                                var checkselect = $(this).children('td:nth-child(2)').attr('id');


                                $("#maintable11 tr").each(function() {


                                    if (checkselect == $(this).children('td:nth-child(2)').attr('id')) {


                                        $(this).addClass('selected');

                                        tabledata.rows($(this)).select();

                                        $(this).addClass("active1");
                                        $(".active1").css({
                                            "background-color": "white",
                                            "color": "black"
                                        });
                                        $(this).children('td:nth-child(1)').tooltip("disable");

                                    }

                                });



                            });
                            $(".bagdecount").html($('#favtable tr').length - 1);

                            tabledata.on('click', 'tr', function() {




                                $('.tempdiv').html($(this).closest('tr').html());
                                $(".tempdiv td:first-child").remove();
                                var html1 = "<td>" + $("#schooltext").text() + "</div>";
                                $(".tempdiv").prepend(html1);
                                $(".tempdiv td").wrapAll('<tr>');



                                $(".hidecheck").html('false');

                                function getCookie(cname) {

                                    var name = cname + "=";
                                    var decodedCookie = decodeURIComponent(document.cookie);
                                    var ca = decodedCookie.split(';');
                                    for (var i = 0; i < ca.length; i++) {
                                        var c = ca[i];
                                        while (c.charAt(0) == ' ') {
                                            c = c.substring(1);
                                        }
                                        if (c.indexOf(name) == 0) {
                                            return c.substring(name.length, c.length);
                                        }
                                    }
                                    return "";

                                }




                                $("#favtable tr").each(function() {


                                    if ($(this).children('td:nth-child(2)').attr('id') == $(".tempdiv td:nth-child(2)").attr('id')) {

                                        $(this).closest('tr').remove();
                                        $(".hidecheck").html('true');


                                        var school_name = $("#schooltext").text();
                                        var user = getCookie($.trim(school_name));

                                        if (user != "") {


                                            var array_user = user.split(',');
                                            var index_array = array_user.indexOf($(this).children('td:nth-child(2)').attr('id'));
                                            array_user.splice(index_array, index_array + 1);

                                            if (array_user != "" && array_user != null)

                                            {

                                                document.cookie = school_name + "=" + array_user + ";";

                                            } else {

                                                document.cookie = school_name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

                                            }



                                        } else {

                                            alert("Something is Wrong!");

                                        }


                                    }


                                });


                                if ($(".hidecheck").html() == "false") {


                                    $('#favtable tr:last').after($('.tempdiv').html());


                                    var school_name = $("#schooltext").text();
                                    var user = getCookie($.trim(school_name));

                                    if (user != "") {


                                        var array_user = user.split(',');
                                        var array_value = $(".tempdiv td:nth-child(2)").attr('id');
                                        array_user.push(array_value);
                                        document.cookie = school_name + "=" + array_user + ";";

                                    } else {

                                        var array_ids = [];
                                        var school_value = $(".tempdiv td:nth-child(2)").attr('id');

                                        array_ids.push(school_value);
                                        document.cookie = school_name + "=" + array_ids + ";";

                                    }


                                }
                                $(".bagdecount").html($('#favtable tr').length - 1);

                                $(this).closest("tr").toggleClass("active1");
                                $(".active1").css({
                                    "background-color": "white",
                                    "color": "black"
                                });
                                $(this).hover("background-color", "#f5f5f5");


                            });




                            tabledata.on('select', function(e, dt, type, indexes) {

                                $(".select-checkbox").hover(function() {

                                    $(this).tooltip("disable");
                                });
                            });



                            tabledata.on('deselect', function(e, dt, type, indexes) {



                                $(".select-checkbox").hover(function() {

                                    $(this).tooltip("enable");
                                });


                            });

                        } 

                    }



                });


            }
        });

    });


    $(document).on("click", ".favclearbtn", function() {

        var tabledata = $('#example').DataTable({
            responsive: {
                    details: {
                            type: 'column',
                            target: -1
                        }
                },
            retrieve: true,
            "iDisplayLength": 25,

            columnDefs: [
                {
                    className: 'control',
                    orderable: false,
                    targets:   -1
                 },
                {
                orderable: false,
                className: 'select-checkbox',
                targets: 0
            }],
            select: {
                style: 'multi',
                selector: 'td:first-child'
            },
            order: [
                [1, 'asc']
            ],



        });

        $("#favtable tr").each(function() {

            var checkselect = $(this).children('td:nth-child(2)').attr('id');

            $("#maintable11 tr").each(function() {


                if (checkselect == $(this).children('td:nth-child(2)').attr('id')) {

                    $(this).removeClass('selected');

                    tabledata.rows($(this)).deselect();

                }

            });

            if ($(this).children('td:first-child').html() != "")

            {
                var hold_name = $(this).children('td:first-child').html();

                var hold_name = hold_name.replace('&amp;', '&');

                // alert($(this).children('td:first-child').html());

                $(this).closest('tr').remove();

                document.cookie = $.trim(hold_name) + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
            }

        });

        $(".bagdecount").html(0);

    });


    $(document).on("change", "#subject_form :checkbox", function() {

        var checkboxValues = [];

        var checkboxValues1 = [];

        $(".collegehide").hide();
        $('#loader').show();

        $('input:checkbox[name="option2"]').each(function() {
            if ($(this).is(':checked')) {

                checkboxValues1.push($(this).val());



            }

        });


        $('input:checkbox[name="subject_option"]').each(function() {
            if ($(this).is(':checked')) {

                checkboxValues.push($(this).val());



            }

        });

        $('input:checkbox[name="option1"]').each(function() {
            if ($(this).is(':checked')) {

                var school_subject_check = $(this).val();

                $.ajax({

                    //AJAX type is "Post".

                    type: "POST",

                    //Data will be sent to "ajax.php".

                    url: "ajax/courses.ajax.php",



                    //Data, that will be sent to "ajax.php".

                    data: {

                        //Assigning value of "name" into "search" variable.


                        school_state: school_subject_check,
                        subject_number_name: checkboxValues,
                        course_number_name: checkboxValues1

                    },

                    success: function(data) {

                        if ($(".firstacc").find("span:first").text() == $.trim(school_subject_check)) {

                            $('#example').dataTable().fnClearTable();
                            $(".collegehide").show();
                            $('#loader').hide();


                            $(".first_table").html(data);




                            var tabledata = $('#example').DataTable({
                                
                                responsive: {
                                    details: {
                                            type: 'column',
                                            target: -1
                                        }
                                },
                                retrieve: true,
                                "iDisplayLength": 25,

                                columnDefs: [
                                       {
                                        className: 'control',
                                        orderable: false,
                                        targets:   -1
                                     },
                                    {
                                    orderable: false,
                                    className: 'select-checkbox',
                                    targets: 0
                                }],
                                select: {
                                    style: 'multi',
                                    selector: 'td:first-child'
                                },
                                order: [
                                    [1, 'asc']
                                ],



                            });

                            $('[data-toggle="tooltip"]').tooltip();

                            $("#favtable tr").each(function() {


                                var checkselect = $(this).children('td:nth-child(2)').attr('id');


                                $("#maintable11 tr").each(function() {


                                    if (checkselect == $(this).children('td:nth-child(2)').attr('id')) {


                                        $(this).addClass('selected');

                                        tabledata.rows($(this)).select();

                                        $(this).addClass("active1");
                                        $(".active1").css({
                                            "background-color": "white",
                                            "color": "black"
                                        });
                                        $(this).children('td:nth-child(1)').tooltip("disable");

                                    }

                                });



                            });

                            $(".bagdecount").html($('#favtable tr').length - 1);

                            tabledata.on('click', 'tr', function() {




                                $('.tempdiv').html($(this).closest('tr').html());
                                $(".tempdiv td:first-child").remove();
                                var html1 = "<td>" + $("#schooltext").text() + "</div>";
                                $(".tempdiv").prepend(html1);
                                $(".tempdiv td").wrapAll('<tr>');


                                $(".hidecheck").html('false');

                                function getCookie(cname) {

                                    var name = cname + "=";
                                    var decodedCookie = decodeURIComponent(document.cookie);
                                    var ca = decodedCookie.split(';');
                                    for (var i = 0; i < ca.length; i++) {
                                        var c = ca[i];
                                        while (c.charAt(0) == ' ') {
                                            c = c.substring(1);
                                        }
                                        if (c.indexOf(name) == 0) {
                                            return c.substring(name.length, c.length);
                                        }
                                    }
                                    return "";

                                }




                                $("#favtable tr").each(function() {

                                    if ($(this).children('td:nth-child(2)').attr('id') == $(".tempdiv td:nth-child(2)").attr('id')) {

                                        $(this).closest('tr').remove();

                                        $(".hidecheck").html('true');


                                        var school_name = $("#schooltext").text();
                                        var user = getCookie($.trim(school_name));

                                        if (user != "") {


                                            var array_user = user.split(',');
                                            var index_array = array_user.indexOf($(this).children('td:nth-child(2)').attr('id'));
                                            array_user.splice(index_array, index_array + 1);

                                            if (array_user != "" && array_user != null)

                                            {

                                                document.cookie = school_name + "=" + array_user + ";";

                                            } else {

                                                document.cookie = school_name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

                                            }


                                        } else {

                                            alert("Something is Wrong!");

                                        }


                                    }


                                });


                                if ($(".hidecheck").html() == "false") {


                                    $('#favtable tr:last').after($('.tempdiv').html());


                                    var school_name = $("#schooltext").text();
                                    var user = getCookie($.trim(school_name));

                                    if (user != "") {


                                        var array_user = user.split(',');
                                        var array_value = $(".tempdiv td:nth-child(2)").attr('id');
                                        array_user.push(array_value);
                                        document.cookie = school_name + "=" + array_user + ";";

                                    } else {

                                        var array_ids = [];
                                        var school_value = $(".tempdiv td:nth-child(2)").attr('id');

                                        array_ids.push(school_value);
                                        document.cookie = school_name + "=" + array_ids + ";";

                                    }


                                }

                                $(".bagdecount").html($('#favtable tr').length - 1);

                                $(this).closest("tr").toggleClass("active1");
                                $(".active1").css({
                                    "background-color": "white",
                                    "color": "black"
                                });
                                $(this).hover("background-color", "#f5f5f5");


                            });




                            tabledata.on('select', function(e, dt, type, indexes) {

                                $(".select-checkbox").hover(function() {

                                    $(this).tooltip("disable");
                                });
                            });



                            tabledata.on('deselect', function(e, dt, type, indexes) {


                                $(".select-checkbox").hover(function() {

                                    $(this).tooltip("enable");
                                });


                            });

                        }




                    }



                });


            }
        });

    });




    $(document).click(function() {

        $(".school_alert").hide();
        $(".reqemail").html('');
        $(".state_alert").hide();

    });



    //state checkbox
    $('#state_form :checkbox').change(function() {

        if (this.checked) {
            // the checkbox is now checked 
            var summ = $('#state_form :input[type="checkbox"]:checked').length;

            if (summ == 1) {
                $(".btnstatehide").text($.trim($(this).val()));
                var var_state = $(this).val();
                $("#stateselfil").show();

                $.ajax({

                    //AJAX type is "Post".

                    type: "POST",

                    //Data will be sent to "ajax.php".

                    url: "ajax/courses.ajax.php",



                    //Data, that will be sent to "ajax.php".

                    data: {

                        //Assigning value of "name" into "search" variable.


                        state_state: var_state


                        //   subj_info: subjvalue

                    },

                    success: function(data) {



                        $(".filterschools").html(data);



                    }

                });


            }

            if (summ == 2)

            {
                $(this).prop('checked', false);
                $(".state_alert").show();

            }

        } else {
            $(".filtersubjects").html("Please Select State and School");
            $(".filtercourse").html("Please Select State and School");
            $(".filterschools").html("Please select state");
            $("#stateselfil").hide();
            $(".btnstatehide").text("");
            $("#schoolselfil").hide();
            $(".btnschlhide").text("");


            $(".firstacc").hide();
            $(".spanschool").text("");
            $("#schooltexthide").text("");



        }


    });


    //select school checkbox



    $(document).on("change", "#myform :checkbox", function() {

        var schoolcheckboxValues = [];

        var subjectcheckboxValues = [];

        var coursecheckboxValues = [];

        // $('.modalschool').text($.trim($(this).val()));
        //$('#example').dataTable().fnClearTable();
        $(".collegehide").hide();
        $('#loader').show();

        $(".filtersubjects").hide();
        $('#loader_subj').show();

        $(".filtercourse").hide();
        $('#loader_course').show();


        if (this.checked) {
            // the checkbox is now checked 
            var summ = $('#myform :input[type="checkbox"]:checked').length;

            if (summ == 1)

            {
                $(".firstacc").show();
                var accschoolname = $.trim($(this).val());
                $(".spanschool").html(accschoolname);
                $("#schooltexthide").html($(this).val());

                $(".btnschlhide").text($.trim($(this).val()));

                $("#schoolselfil").show();


                var school_subject_check = $(this).val();

                var checkboxValues = [];

                var checkboxValues1 = [];


                $('input:checkbox[name="option2"]').each(function() {
                    if ($(this).is(':checked')) {

                        checkboxValues1.push($(this).val());



                    }

                });


                $('input:checkbox[name="subject_option"]').each(function() {
                    if ($(this).is(':checked')) {

                        checkboxValues.push($(this).val());



                    }

                });

                $('input:checkbox[name="option1"]').each(function() {
                    if ($(this).is(':checked')) {

                        var school_subject_check = $(this).val();

                        $.ajax({

                            //AJAX type is "Post".

                            type: "POST",

                            //Data will be sent to "ajax.php".

                            url: "ajax/courses.ajax.php",



                            //Data, that will be sent to "ajax.php".

                            data: {

                                //Assigning value of "name" into "search" variable.


                                school_state: school_subject_check,
                                subject_number_name: checkboxValues,
                                course_number_name: checkboxValues1
                                //   subj_info: subjvalue

                            },

                            success: function(data) {

                                if ($(".firstacc").find("span:first").text() == $.trim(school_subject_check)) {

                                    $('#example').dataTable().fnClearTable();
                                    $("#loader").hide();
                                    $(".collegehide").show();
                                    // $(".firstacc").find("tbody").html(data);
                                    //  var lmTable = $("#example").dataTable( { bRetrieve : true } );
                                    //  $('#example').dataTable().fnAddData(data);

                                    $(".first_table").html(data);

                                    var tabledata = $('#example').DataTable({


                                        responsive: {
                                            details: {
                                                    type: 'column',
                                                    target: -1
                                                }
                                        },

                                        retrieve: true,
                                        "iDisplayLength": 25,

                                        columnDefs: [
                                            {
                                            className: 'control',
                                            orderable: false,
                                            targets:   -1
                                         },
                                            {
                                            orderable: false,
                                            className: 'select-checkbox',
                                            targets: 0
                                        }],
                                        select: {
                                            style: 'multi',
                                            selector: 'td:first-child'
                                        },
                                        order: [
                                            [1, 'asc']
                                        ],


                                    });

                                    $('[data-toggle="tooltip"]').tooltip();


                                    $("#favtable tr").each(function() {
                                        //  alert($(this).children('td:first-child').attr('id'));

                                        var checkselect = $(this).children('td:nth-child(2)').attr('id');


                                        $("#maintable11 tr").each(function() {


                                            if (checkselect == $(this).children('td:nth-child(2)').attr('id')) {

                                                // $(this).children('td:nth-child(1)').css({"content": "\2714", "margin-top": "-11px", "margin-left": "-4px", "text-align":"center"});
                                                $(this).addClass('selected');

                                                tabledata.rows($(this)).select();
                                                //  $(this).children('td:nth-child(1)').attr("checked", "checked");
                                                $(this).addClass("active1");
                                                $(".active1").css({
                                                    "background-color": "white",
                                                    "color": "black"
                                                });
                                                $(this).children('td:nth-child(1)').tooltip("disable");

                                            }

                                        });



                                    });

                                    tabledata.on('click', 'tr', function() {




                                        $('.tempdiv').html($(this).closest('tr').html());
                                        $(".tempdiv td:first-child").remove();
                                        var html1 = "<td>" + $("#schooltext").text() + "</div>";
                                        $(".tempdiv").prepend(html1);
                                        $(".tempdiv td").wrapAll('<tr>');
                                        //   alert((".tempdiv").html());
                                        // alert($(".tempdiv td:first-child").attr('id'));


                                        $(".hidecheck").html('false');

                                        function getCookie(cname) {

                                            var name = cname + "=";
                                            var decodedCookie = decodeURIComponent(document.cookie);
                                            var ca = decodedCookie.split(';');
                                            for (var i = 0; i < ca.length; i++) {
                                                var c = ca[i];
                                                while (c.charAt(0) == ' ') {
                                                    c = c.substring(1);
                                                }
                                                if (c.indexOf(name) == 0) {
                                                    return c.substring(name.length, c.length);
                                                }
                                            }
                                            return "";

                                        }




                                        //        $('#favtable').html($('.tempdiv').html());
                                        //   alert($('#favtable td:first-child').attr('id'));
                                        $("#favtable tr").each(function() {
                                            //  alert($(this).children('td:first-child').attr('id'));

                                            if ($(this).children('td:nth-child(2)').attr('id') == $(".tempdiv td:nth-child(2)").attr('id')) {

                                                $(this).closest('tr').remove();
                                                // alert($(this).children('td:first-child').attr('id'));
                                                $(".hidecheck").html('true');


                                                var school_name = $("#schooltext").text();
                                                var user = getCookie($.trim(school_name));

                                                if (user != "") {

                                                    //  alert("Welcome again " + user); 
                                                    var array_user = user.split(',');
                                                    var index_array = array_user.indexOf($(this).children('td:nth-child(2)').attr('id'));
                                                    array_user.splice(index_array, index_array + 1);

                                                    if (array_user != "" && array_user != null)

                                                    {

                                                        document.cookie = school_name + "=" + array_user + ";";

                                                    } else {

                                                        document.cookie = school_name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

                                                    }

                                                    //      alert(document.cookie);

                                                } else {

                                                    alert("Something is Wrong!");

                                                }


                                            }


                                        });


                                        if ($(".hidecheck").html() == "false") {
                                            //  alert($(this).children('td:first-child').attr('id'));

                                            $('#favtable tr:last').after($('.tempdiv').html());


                                            var school_name = $("#schooltext").text();
                                            var user = getCookie($.trim(school_name));

                                            if (user != "") {

                                                // alert("Welcome again " + user); 
                                                var array_user = user.split(',');
                                                var array_value = $(".tempdiv td:nth-child(2)").attr('id');
                                                array_user.push(array_value);
                                                document.cookie = school_name + "=" + array_user + ";";
                                                // alert(document.cookie);
                                                // document.cookie = school_name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
                                            } else {

                                                var array_ids = [];
                                                var school_value = $(".tempdiv td:nth-child(2)").attr('id');
                                                //   alert(school_value);
                                                array_ids.push(school_value);
                                                document.cookie = school_name + "=" + array_ids + ";";
                                                // alert(document.cookie);
                                            }


                                        }

                                        $(".bagdecount").html($('#favtable tr').length - 1);

                                        $(this).closest("tr").toggleClass("active1");
                                        $(".active1").css({
                                            "background-color": "white",
                                            "color": "black"
                                        });
                                        $(this).hover("background-color", "#f5f5f5");


                                    });




                                    tabledata.on('select', function(e, dt, type, indexes) {
                                        //   var count = tabledata.rows( { selected: true } ).count();
                                        //    $(".bagdecount").html(count);
                                        $(".select-checkbox").hover(function() {

                                            $(this).tooltip("disable");
                                        });
                                    });



                                    tabledata.on('deselect', function(e, dt, type, indexes) {

                                        //       var decount = $(".bagdecount").html();
                                        //        var decount = decount - 1; 
                                        //      $(".bagdecount").html(decount);
                                        $(".select-checkbox").hover(function() {

                                            $(this).tooltip("enable");
                                        });


                                    });

                                }


                            }



                        });
                    }
                });


            }


            if (summ == 2) {

                $(this).prop('checked', false);
                $(".school_alert").show();
                $("#loader").hide();
                $(".collegehide").show();

            }




            if (summ == 3) {

                var orderschool = $.trim($(".spanschool").text());
                var orderschool1 = $.trim($(".spanschool1").text());
                var orderschool2 = $.trim($(".spanschool2").text());

                if (orderschool1 != "" && orderschool2 == "" && orderschool != "") {

                    $(".thirdacc").show();
                    var accschoolname = $.trim($(this).val());
                    $(".spanschool2").html(accschoolname);
                }


                if (orderschool1 != "" && orderschool2 != "" && orderschool == "") {

                    $(".firstacc").show();
                    var accschoolname = $.trim($(this).val());
                    $(".spanschool").html(accschoolname);
                    $("#schooltexthide").html($(this).val());
                }

                if (orderschool1 == "" && orderschool2 != "" && orderschool != "") {

                    $(".secondacc").show();
                    var accschoolname = $.trim($(this).val());
                    $(".spanschool1").html(accschoolname);


                }

                var school_subject_check = $(this).val();

                var checkboxValues = [];

                var checkboxValues1 = [];


                $('input:checkbox[name="option2"]').each(function() {
                    if ($(this).is(':checked')) {

                        checkboxValues1.push($(this).val());



                    }

                });


                $('input:checkbox[name="subject_option"]').each(function() {
                    if ($(this).is(':checked')) {

                        checkboxValues.push($(this).val());



                    }

                });

                $('input:checkbox[name="option1"]').each(function() {
                    if ($(this).is(':checked')) {

                        var school_subject_check = $(this).val();

                        $.ajax({

                            //AJAX type is "Post".

                            type: "POST",

                            //Data will be sent to "ajax.php".

                            url: "ajax/courses.ajax.php",



                            //Data, that will be sent to "ajax.php".

                            data: {

                                //Assigning value of "name" into "search" variable.


                                school_state: school_subject_check,
                                subject_number_name: checkboxValues,
                                course_number_name: checkboxValues1
                                //   subj_info: subjvalue

                            },

                            success: function(data) {

                                if ($(".firstacc").find("span:first").text() == $.trim(school_subject_check)) {

                                    $('#example').dataTable().fnClearTable();


                                    $(".first_table").html(data);

                                    var tabledata = $('#example').DataTable({
                                        responsive: {
                                            details: {
                                                    type: 'column',
                                                    target: -1
                                                }
                                        },
                                        retrieve: true,
                                        "iDisplayLength": 25,

                                        columnDefs: [
                                            {
                                            className: 'control',
                                            orderable: false,
                                            targets:   -1
                                         },
                                            {
                                            orderable: false,
                                            className: 'select-checkbox',
                                            targets: 0
                                        }],
                                        select: {
                                            style: 'multi',
                                            selector: 'td:first-child'
                                        },
                                        order: [
                                            [1, 'asc']
                                        ],


                                    });

                                    $('[data-toggle="tooltip"]').tooltip();


                                    $("#favtable tr").each(function() {


                                        var checkselect = $(this).children('td:nth-child(2)').attr('id');


                                        $("#maintable11 tr").each(function() {


                                            if (checkselect == $(this).children('td:nth-child(2)').attr('id')) {


                                                $(this).addClass('selected');

                                                tabledata.rows($(this)).select();

                                                $(this).addClass("active1");
                                                $(".active1").css({
                                                    "background-color": "white",
                                                    "color": "black"
                                                });
                                                $(this).children('td:nth-child(1)').tooltip("disable");

                                            }

                                        });



                                    });

                                    tabledata.on('click', 'tr', function() {




                                        $('.tempdiv').html($(this).closest('tr').html());
                                        $(".tempdiv td:first-child").remove();
                                        var html1 = "<td>" + $("#schooltext").text() + "</div>";
                                        $(".tempdiv").prepend(html1);
                                        $(".tempdiv td").wrapAll('<tr>');



                                        $(".hidecheck").html('false');

                                        function getCookie(cname) {

                                            var name = cname + "=";
                                            var decodedCookie = decodeURIComponent(document.cookie);
                                            var ca = decodedCookie.split(';');
                                            for (var i = 0; i < ca.length; i++) {
                                                var c = ca[i];
                                                while (c.charAt(0) == ' ') {
                                                    c = c.substring(1);
                                                }
                                                if (c.indexOf(name) == 0) {
                                                    return c.substring(name.length, c.length);
                                                }
                                            }
                                            return "";

                                        }




                                        $("#favtable tr").each(function() {


                                            if ($(this).children('td:nth-child(2)').attr('id') == $(".tempdiv td:nth-child(2)").attr('id')) {

                                                $(this).closest('tr').remove();

                                                $(".hidecheck").html('true');


                                                var school_name = $("#schooltext").text();
                                                var user = getCookie($.trim(school_name));

                                                if (user != "") {


                                                    var array_user = user.split(',');
                                                    var index_array = array_user.indexOf($(this).children('td:nth-child(2)').attr('id'));
                                                    array_user.splice(index_array, index_array + 1);

                                                    if (array_user != "" && array_user != null)

                                                    {

                                                        document.cookie = school_name + "=" + array_user + ";";

                                                    } else {

                                                        document.cookie = school_name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

                                                    }


                                                } else {

                                                    alert("Something is Wrong!");

                                                }


                                            }


                                        });


                                        if ($(".hidecheck").html() == "false") {

                                            $('#favtable tr:last').after($('.tempdiv').html());


                                            var school_name = $("#schooltext").text();
                                            var user = getCookie($.trim(school_name));

                                            if (user != "") {


                                                var array_user = user.split(',');
                                                var array_value = $(".tempdiv td:nth-child(2)").attr('id');
                                                array_user.push(array_value);
                                                document.cookie = school_name + "=" + array_user + ";";

                                            } else {

                                                var array_ids = [];
                                                var school_value = $(".tempdiv td:nth-child(2)").attr('id');

                                                array_ids.push(school_value);
                                                document.cookie = school_name + "=" + array_ids + ";";

                                            }


                                        }

                                        $(".bagdecount").html($('#favtable tr').length - 1);

                                        $(this).closest("tr").toggleClass("active1");
                                        $(".active1").css({
                                            "background-color": "white",
                                            "color": "black"
                                        });
                                        $(this).hover("background-color", "#f5f5f5");


                                    });




                                    tabledata.on('select', function(e, dt, type, indexes) {

                                        $(".select-checkbox").hover(function() {

                                            $(this).tooltip("disable");
                                        });
                                    });



                                    tabledata.on('deselect', function(e, dt, type, indexes) {


                                        $(".select-checkbox").hover(function() {

                                            $(this).tooltip("enable");
                                        });


                                    });

                                }


                            }



                        });


                    }
                });
            }


            if (summ == 4) {

                $(this).prop('checked', false);
                $(".school_alert").show();

            }

        } else {

            var delschoolname = $.trim($(this).val());

            $("#schoolselfil").hide();
            $(".btnschlhide").text("");
            var comp1 = $(".spanschool1").text();
            var comp2 = $(".spanschool2").text();
            var comp = $.trim($(".spanschool").text());

            if (delschoolname == comp) {

                $(".firstacc").hide();
                $(".spanschool").text("");
                $("#schooltexthide").text("");
            }



            if (delschoolname == comp1) {

                $(".secondacc").hide();
                $(".spanschool1").text("");

            }


            if (delschoolname == comp2) {

                $(".thirdacc").hide();
                $(".spanschool2").text("");
            }
            // the checkbox is now no longer checked




        }



        $('input:checkbox[name="subject_option"]').each(function() {
            if ($(this).is(':checked')) {

                subjectcheckboxValues.push($(this).val());

            }

        });


        $('input:checkbox[name="option2"]').each(function() {
            if ($(this).is(':checked')) {

                coursecheckboxValues.push($(this).val());

            }

        });

        $('input:checkbox[name="option1"]').each(function() {
            if ($(this).is(':checked')) {

                schoolcheckboxValues.push($(this).val());

            }


        });


        $.ajax({

            //AJAX type is "Post".

            type: "POST",

            //Data will be sent to "ajax.php".

            url: "ajax/courses.ajax.php",



            //Data, that will be sent to "ajax.php".

            data: {

                //Assigning value of "name" into "search" variable.


                school_state1: schoolcheckboxValues,
                subject_number_name: subjectcheckboxValues



            },

            success: function(data) {

                if ($.trim(data) == "")

                {

                    $('#loader_subj').hide();
                    $(".filtersubjects").show();
                    $(".filtersubjects").html("Please select a school");

                } else {
                    $('#loader_subj').hide();
                    $(".filtersubjects").show();

                    $(".filtersubjects").html(data);

                }

            }

        });

        $.ajax({

            //AJAX type is "Post".

            type: "POST",

            //Data will be sent to "ajax.php".

            url: "ajax/courses.ajax.php",



            //Data, that will be sent to "ajax.php".

            data: {

                //Assigning value of "name" into "search" variable.


                school_state2: schoolcheckboxValues,
                course_number_name: coursecheckboxValues
                //   subj_info: subjvalue

            },

            success: function(data) {

                if ($.trim(data) == "")

                {
                    $('#loader_course').hide();
                    $(".filtercourse").show();

                    $(".filtercourse").html("Please select a school");

                } else {

                    $('#loader_course').hide();
                    $(".filtercourse").show();
                    $(".filtercourse").html(data);

                }



            }

        });

        // this will contain a reference to the checkbox   

    });



    $('[data-toggle="tooltip"]').tooltip();


    var tabledata = $('#example').DataTable({
           responsive: {
            details: {
                type: 'column',
                target: -1
            }
        },
        
        
        retrieve: true,
        "iDisplayLength": 25,

        columnDefs: [
            {
            className: 'control',
            orderable: false,
            targets:   -1
             },
            
            {
            orderable: false,
            className: 'select-checkbox',
            targets: 0,


        }],
        select: {
            style: 'multi',
            selector: 'td:first-child'
        },
        order: [
            [1, 'asc']
        ],




    });

  
    


    $(".schooldrop").on("click", function() {
        $(".collegehide").toggle();
    });


    $(".schooldrop1").on("click", function() {
        $(".collegehide1").toggle();
    });


    $(".schooldrop2").on("click", function() {
        $(".collegehide2").toggle();
    });


    $(".schoolmultisearch").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $(".filterschools div").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });


    $(".subjectmultisearch").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $(".filtersubjects div").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    $(".coursemultisearch").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $(".filtercourse div").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    $(".statemultisearch").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $(".filterstate div").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });




    $('#example1').DataTable({
        "paging": false,
        "ordering": false,
        "info": false,
        "language": {
            "sZeroRecords": "",
            "sEmptyTable": ""
        },
        "filter": false,
        "order": [
            [0, "asc"]
        ]
    });




    tabledata.on('click', '.select-checkbox', function() {




        $('.tempdiv').html($(this).closest('tr').html());
        $(".tempdiv td:first-child").remove();
        var html1 = "<td>" + $("#schooltext").text() + "</div>";
        $(".tempdiv").prepend(html1);
        $(".tempdiv td").wrapAll('<tr>');
        //   alert((".tempdiv").html());
        // alert($(".tempdiv td:first-child").attr('id'));


        $(".hidecheck").html('false');

        function getCookie(cname) {

            var name = cname + "=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";

        }




        $("#favtable tr").each(function() {


            if ($(this).children('td:nth-child(2)').attr('id') == $(".tempdiv td:nth-child(2)").attr('id')) {

                $(this).closest('tr').remove();

                $(".hidecheck").html('true');


                var school_name = $("#schooltext").text();
                var user = getCookie($.trim(school_name));

                if (user != "") {


                    var array_user = user.split(',');
                    var index_array = array_user.indexOf($(this).children('td:nth-child(2)').attr('id'));
                    array_user.splice(index_array, index_array + 1);

                    if (array_user != "" && array_user != null)

                    {

                        document.cookie = school_name + "=" + array_user + ";";

                    } else {

                        document.cookie = school_name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

                    }



                } else {

                    alert("Something is Wrong!");

                }


            }


        });


        if ($(".hidecheck").html() == "false") {


            $('#favtable tr:last').after($('.tempdiv').html());


            var school_name = $("#schooltext").text();
            var user = getCookie($.trim(school_name));

            if (user != "") {


                var array_user = user.split(',');
                var array_value = $(".tempdiv td:nth-child(2)").attr('id');
                array_user.push(array_value);
                document.cookie = school_name + "=" + array_user + ";";

            } else {

                var array_ids = [];
                var school_value = $(".tempdiv td:nth-child(2)").attr('id');

                array_ids.push(school_value);
                document.cookie = school_name + "=" + array_ids + ";";

            }


        }

        $(".bagdecount").html($('#favtable tr').length - 1);



        $(this).closest('tr').toggleClass("active1");
        $(".active1").css({
            "background-color": "white",
            "color": "black"
        });
        $(this).hover("background-color", "#f5f5f5");


    });




    tabledata.on('select', function(e, dt, type, indexes) {


        $(".select-checkbox").hover(function() {
            $(this).tooltip("disable");
        });


    });




    tabledata.on('deselect', function(e, dt, type, indexes) {


        $(".select-checkbox").hover(function() {

            $(this).tooltip("enable");
        });


    });




});


function w3_open() {
    $("#mySidebar").show();
    var sideheight = $(window).height() - 75.58;
    // alert(sideheight);
    $("#mySidebar").css("height", sideheight);
    document.getElementById("mySidebar").style.display = "block";
    document.getElementById("myOverlay").style.display = "block";
}

function w3_close() {
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("myOverlay").style.display = "none";
}

function myAccFunc() {
    var x = document.getElementById("demoAcc");

    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
        x.previousElementSibling.className += "";
        $("#subjaw").addClass("fa-angle-down");
        $("#subjaw").removeClass("fa-angle-right");
    } else {
        x.className = x.className.replace("w3-show", "w3-hide");

        x.previousElementSibling.className =
            x.previousElementSibling.className.replace("", "");
        $("#subjaw").removeClass("fa-angle-down");
        $("#subjaw").addClass("fa-angle-right");
    }
}

function myAccFunc1() {
    var x = document.getElementById("demoAcc1");
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
        x.previousElementSibling.className += "";
        $("#schoolaw").addClass("fa-angle-down");
        $("#schoolaw").removeClass("fa-angle-right");
    } else {
        x.className = x.className.replace("w3-show", "w3-hide");
        x.previousElementSibling.className =
            x.previousElementSibling.className.replace("", "");
        $("#schoolaw").removeClass("fa-angle-down");
        $("#schoolaw").addClass("fa-angle-right");
    }
}

function myAccFunc2() {
    var x = document.getElementById("demoAcc2");
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
        x.previousElementSibling.className += "";
        $("#courseaw").addClass("fa-angle-down");
        $("#courseaw").removeClass("fa-angle-right");
    } else {
        x.className = x.className.replace("w3-show", "w3-hide");
        x.previousElementSibling.className =
            x.previousElementSibling.className.replace("", "");
        $("#courseaw").removeClass("fa-angle-down");
        $("#courseaw").addClass("fa-angle-right");
    }
}

function myAccFunc3() {
    var x = document.getElementById("demoAcc3");
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
        x.previousElementSibling.className += "";
        $("#stateaw").addClass("fa-angle-down");
        $("#stateaw").removeClass("fa-angle-right");
    } else {
        x.className = x.className.replace("w3-show", "w3-hide");
        x.previousElementSibling.className =
            x.previousElementSibling.className.replace("", "");
        $("#stateaw").removeClass("fa-angle-down");
        $("#stateaw").addClass("fa-angle-right");
    }
}

var myVar;

function myFunction() {
    myVar = setTimeout(showPage, 3000);
}

function showPage() {
    document.getElementById("loader").style.display = "none";
    $(".collegehide").show();
}