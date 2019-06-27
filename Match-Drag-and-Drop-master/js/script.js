$(function(){
      $("#myModal").modal({keyboard: false});

    var words; // Global variable
    var sentencename;
    var checkWord;
    var cuingCounter = [];
    var checkError;
    var disabledWords = [];
    var checkSuccess;
    var iniIDs = [];
    var sentNum = 'Set';
    var sentCounter;
    var finalptid;
    var gbusrName;


    function getQNum(){


        var xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

                sentCounter = Number(this.responseText);
                console.log(sentCounter);
                sentenceRequest();
        }


        };
        xmlhttp.open("GET", "ButtonInsert.php?q=check", true);
        xmlhttp.send();


    }

    $('#reviewModal').on('shown.bs.modal', function (e) {

        $.getJSON("grammarcat_sentence_set2.json", function(result){
            //console.log(Object.keys(result).length);
            var count = 1;
            var xmlhttp = new XMLHttpRequest();

            xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {

                    sentCounter = Number(this.responseText);
                    console.log(sentCounter);
                    $.each(result, function(i, field){
                    if(count < sentCounter){
                        $("#appBtn").append("<button style='margin-right: 11px; margin-bottom: 12px' class='w3-button w3-circle w3-teal getReviewId'>" + "Q: " + count + "</button>");
                    }
                    else if(count == sentCounter){
                        $("#appBtn").append("<button style='margin-right: 11px; margin-bottom: 12px' class='w3-button w3-circle w3-green getReviewId'>" + "Q: " + count + "</button>");
                    }

                    else {
                        $("#appBtn").append("<button style='margin-right: 11px; margin-bottom: 12px' class='w3-button w3-circle w3-black w3-disabled getReviewId'>" + "Q: " + count + "</button>");
                    }

                        count += 1;
                    });

            // Active class for review
            var $filterNum = $("#appBtn").children("button.w3-green");

            $filterNum.removeClass("w3-green");
            $filterNum.addClass("w3-teal");

            //get the question number to update
            var filterText = $("#tagNum").text();
            filterText = filterText.match(/\d+/);
            var reviewStatus = filterText[0];
            reviewStatus = parseInt(reviewStatus) - 1;

            //updating review status with active class
            var $getfirst = $("#appBtn").children();

            var $updateClass = $getfirst.eq(reviewStatus);

            $updateClass.removeClass("w3-teal");
            $updateClass.addClass("w3-green");

            }
        };

            xmlhttp.open("GET", "ButtonInsert.php?q=check", true);
            xmlhttp.send();





        });

      });

    $(document).on("click",".getReviewId", function(){


        var filterText = $(this).text();
        filterText = filterText.match(/\d+/);
        sentNum = 'Set'
        sentCounter = filterText[0];
        $("#reviewModal").modal("hide");
        clearPage();
        sentenceRequest();

      });

    $("#reviewModal").on('hidden.bs.modal', function(){
        $("#appBtn").html("");
      });

  //Name check on click submit button
    $("#modalButton").click(function(){
        // Check if Name value not empty
        if (($("#usrname").val()) != "")
            {
                //Check with table if name exists or else insert name
                $.ajax({

                    //AJAX type is "Post".

                    type: "POST",

                    //Data will be sent to "ajax.php".

                    url: "ButtonInsert.php",



                    //Data, that will be sent to "ajax.php".

                    data: {

                        //Assigning value of "name" into "search" variable.


                        Name: $("#usrname").val(),
                    },

                    success: function(data) {

                          if(data == "Exists") {
                            gbusrName = $("#usrname").val();
                            $("#myModal").modal("hide");
                            $("#userName").text("Welcome" + " " + $("#usrname").val());
                            $("#userName").css({"color" : "red"}, {"font-weight" : "bold"});
                            getQNum();
                          }

                          else{
                            gbusrName = $("#usrname").val();
                            $('#myModal').html($('#insModal').html());
                          }

                    }

                });

            }

    });

    //function triggered on clicking the begin button on reviewModal to insertcurrent datetime in user database via ajax call
    $(document).on("click","#beginSet", function(){

        $.ajax({

            //AJAX type is "Post".

            type: "POST",

            //Data will be sent to "ajax.php".

            url: "ButtonInsert.php",



            //Data, that will be sent to "ajax.php".

            data: {

                //Assigning value of "name" into "search" variable.


                ChangeName: gbusrName,
            },

            success: function(data) {

                    console.log(data);
            }

        });

    });

    $("#nextBtn").click(function(){
        var filterText = $("#tagNum").text();
        filterText = filterText.match(/\d+/);
        sentCounter = filterText[0];
        sentCounter = parseInt(sentCounter);
        clearPage();
        $("#nextBtn").show();
        sentNum = 'Set';
        sentCounter += 1;
        cuingCounter.splice(0, cuingCounter.length);
        disabledWords.splice(0, disabledWords.length);
        iniIDs.splice(0, iniIDs.length);
        sentenceRequest();
    });





    function dragWords() {

// Drag and Drop
    for (i = 0; i < words.length; i++) {

        $("#word-"+i).draggable({

            helper: "clone",
            cancel: false,
            revert: function (event, ui) {


                if(!event){

                    // dialg box
                    // $('#section-drop').css({'filter': 'blur(5px)'});
                    // $("#dialog-message").dialog("open");
                    // comment section

                    if(!cuingCounter[$(this).attr("id")])
                    {
                        cuingCounter[$(this).attr("id")] = 1;

                        //console.log($(this).attr("id"));
                       // console.log(cuingCounter);
                    }
                    else { if(cuingCounter[$(this).attr("id")] < 3){cuingCounter[$(this).attr("id")] += 1;};}
                   // console.log(cuingCounter);

                    cuiRequest(cuingCounter[$(this).attr("id")]);
                    addPoints(cuingCounter[$(this).attr("id")], $(this).attr("id"));
                  // console.log($(this).attr("id"));

                }
                return !event;
            }

        });
    }

    }

    $("#Subjective-Pronoun").droppable({
        accept: function(d) {
            console.log(d);
           var returnreq =  matchRequest(d);

            if ('Subjective Pronoun' != returnreq){

                return false;
            }
            else {

                finalptid = d[0].id; // get id of the word
                return true;
            }
        },


        // hoverClass: "highlight",
        tolerance: "fit",


        activate: function (evt, ui) {
            // $(this).find("h2").css("background-color", "cornsilk");
        },
        deactivate: function (evt, ui) {
            $(this).find("h2").css("background-color", "");
        },
        drop: function(evt, ui) {
           // $(this).css({'background-color':'rgb(5, 107, 98)'});
            $(this).find('h2').css({'color':'#fff'});
            $(this).append($(ui.draggable).clone());

            //shake effect
            // $(this).effect( "shake", { times:2 }, 300);

            // display Comment success

            displayCommentSuccess();

            var IDs = [];
            $("#droppable-items").find("button").each(function(){ IDs.push(this.id); });
            //console.log(IDs);

            for (i = 0; i < IDs.length; i++) {
                $('#'+IDs[i]).draggable({ disabled: true });
                $('#'+IDs[i]).css({'color':'rgba(153, 153, 153, 0.6)'});
                $('#'+IDs[i]).css({"background-color":"#fff"});
                $('#'+IDs[i]).css({ "pointer-events": "none"});

            }

            nextSentence(IDs);

        }
    });

    $("#Objective-Pronoun").droppable({
        accept: function(d) {
           var returnreq =  matchRequest(d);
            if ('Objective Pronoun' != returnreq){
                return false;
            }
            else {

                finalptid = d[0].id; // get id of the word
                return true;}
        },


        // hoverClass: "highlight",
        tolerance: "fit",

        activate: function (evt, ui) {
            // $(this).find("h2").css("background-color", "cornsilk");
        },
        deactivate: function (evt, ui) {
            $(this).find("h2").css("background-color", "");
        },
        drop: function(evt, ui) {
            //$(this).css({'background-color':'rgb(5, 107, 98)'});
            $(this).find('h2').css({'color':'#fff'});
            $(this).append($(ui.draggable).clone());
            //shake effect
            // $(this).effect( "shake", { times:2 }, 300);

            // display Comment success
            displayCommentSuccess();

            var IDs = [];
            $("#droppable-items").find("button").each(function(){ IDs.push(this.id); });
         //   console.log(IDs);

            for (i = 0; i < IDs.length; i++) {
                $('#'+IDs[i]).draggable({ disabled: true });
                $('#'+IDs[i]).css({'color':'rgba(153, 153, 153, 0.6)'});
                $('#'+IDs[i]).css({"background-color":"#fff"});
                $('#'+IDs[i]).css({ "pointer-events": "none"});

            }

            nextSentence(IDs);
        }
    });

    $("#Possessive-Pronoun").droppable({
        accept: function(d) {
           var returnreq =  matchRequest(d);
            if ('Possessive Pronoun' != returnreq){
                return false;
            }
            else {

                finalptid = d[0].id; // get id of the word
                return true;}
        },


        // hoverClass: "highlight",
        tolerance: "fit",

        activate: function (evt, ui) {
            // $(this).find("h2").css("background-color", "cornsilk");
        },
        deactivate: function (evt, ui) {
            $(this).find("h2").css("background-color", "");
        },
        drop: function(evt, ui) {
          //  $(this).css({'background-color':'rgb(5, 107, 98)'});
            $(this).find('h2').css({'color':'#fff'});
            $(this).append($(ui.draggable).clone());
            //shake effect
            // $(this).effect( "shake", { times:2 }, 300);

            // display Comment success
            displayCommentSuccess();

            var IDs = [];
            $("#droppable-items").find("button").each(function(){ IDs.push(this.id); });
          //  console.log(IDs);

            for (i = 0; i < IDs.length; i++) {
                $('#'+IDs[i]).draggable({ disabled: true });
                $('#'+IDs[i]).css({'color':'rgba(153, 153, 153, 0.6)'});
                $('#'+IDs[i]).css({"background-color":"#fff"});
                $('#'+IDs[i]).css({ "pointer-events": "none"});

            }

            nextSentence(IDs);
        }
    });

    $("#Auxiliary-Verb").droppable({
        accept: function(d) {
           var returnreq =  matchRequest(d);
            if ('Auxiliary Verb' != returnreq){
                return false;
            }
            else {

                finalptid = d[0].id; // get id of the word
                return true;}
        },

        // hoverClass: "highlight",
        tolerance: "fit",

        activate: function (evt, ui) {
            // $(this).find("h2").css("background-color", "cornsilk");
        },
        deactivate: function (evt, ui) {
            $(this).find("h2").css("background-color", "");
        },
        drop: function(evt, ui) {
          //  $(this).css({'background-color':'rgb(5, 107, 98)'});
            $(this).find('h2').css({'color':'#fff'});
            $(this).append($(ui.draggable).clone());

            //shake effect
            // $(this).effect( "shake", { times:2 }, 300);

            // display Comment success
            displayCommentSuccess();

            var IDs = [];
            $("#droppable-items").find("button").each(function(){ IDs.push(this.id); });
            //console.log(IDs);

            for (i = 0; i < IDs.length; i++) {
                $('#'+IDs[i]).draggable({ disabled: true });
                $('#'+IDs[i]).css({'color':'rgba(153, 153, 153, 0.6)'});
                $('#'+IDs[i]).css({"background-color":"#fff"});
                $('#'+IDs[i]).css({ "pointer-events": "none"});

            }

            nextSentence(IDs);
        }
    });

    $("#Main-Verb").droppable({
        accept: function(d) {
           var returnreq =  matchRequest(d);
            if ('Main Verb' != returnreq){
                return false;
            }
            else {

                finalptid = d[0].id; // get id of the word
                return true;}
        },

        // hoverClass: "highlight",
        tolerance: "fit",

        activate: function (evt, ui) {
            // $(this).find("h2").css("background-color", "cornsilk");
        },
        deactivate: function (evt, ui) {
            $(this).find("h2").css("background-color", "");
        },
        drop: function(evt, ui) {
          //  $(this).css({'background-color':'rgb(5, 107, 98)'});
            $(this).find('h2').css({'color':'#fff'});
            $(this).append($(ui.draggable).clone());

             // display Comment success
            displayCommentSuccess();
          //  $(this).find('h2').css({'background-color':'#4e5a59'});


            var IDs = [];
            $("#droppable-items").find("button").each(function(){ IDs.push(this.id); });
          //  console.log(IDs);

            for (i = 0; i < IDs.length; i++) {
                $('#'+IDs[i]).draggable({ disabled: true });
                $('#'+IDs[i]).css({'color':'rgba(153, 153, 153, 0.6)'});
                $('#'+IDs[i]).css({"background-color":"#fff"});
                $('#'+IDs[i]).css({ "pointer-events": "none"});

            }

            nextSentence(IDs);
        }
    });

    $("#Secondary-Verb").droppable({
            accept: function(d) {
               var returnreq =  matchRequest(d);
                if ('Secondary Verb' != returnreq){
                    return false;
                }
                else {

                    finalptid = d[0].id; // get id of the word
                    return true;}
            },

            // hoverClass: "highlight",
            tolerance: "fit",

            activate: function (evt, ui) {
                // $(this).find("h2").css("background-color", "cornsilk");
            },
            deactivate: function (evt, ui) {
                $(this).find("h2").css("background-color", "");
            },
            drop: function(evt, ui) {
             //   $(this).css({'background-color':'rgb(5, 107, 98)'});
                $(this).find('h2').css({'color':'#fff'});
                $(this).append($(ui.draggable).clone());

                 // display Comment success
                displayCommentSuccess();
             //   console.log(  $(this).find('h2').css({'background-color':'#4e5a59'}));


                var IDs = [];
                $("#droppable-items").find("button").each(function(){ IDs.push(this.id); });
                console.log(IDs);

                for (i = 0; i < IDs.length; i++) {
                    $('#'+IDs[i]).draggable({ disabled: true });
                    $('#'+IDs[i]).css({'color':'rgba(153, 153, 153, 0.6)'});
                    $('#'+IDs[i]).css({"background-color":"#fff"});
                    $('#'+IDs[i]).css({ "pointer-events": "none"});

                }
                nextSentence(IDs);
            }
        });

    $("#Preposition").droppable({
            accept: function(d) {
               var returnreq =  matchRequest(d);
                if ($(this).attr('id') != returnreq){
                    return false;
                }
                else {

                    finalptid = d[0].id; // get id of the word
                    return true;}
            },

            // hoverClass: "highlight",
            tolerance: "fit",

            activate: function (evt, ui) {
                // $(this).find("h2").css("background-color", "cornsilk");
            },
            deactivate: function (evt, ui) {
                $(this).find("h2").css("background-color", "");
            },
            drop: function(evt, ui) {
              //  $(this).css({'background-color':'rgb(5, 107, 98)'});
                $(this).find('h2').css({'color':'#fff'});
                $(this).append($(ui.draggable).clone());

                 // display Comment success
                displayCommentSuccess();
       //         console.log(  $(this).find('h2').css({'background-color':'#4e5a59'}));


                var IDs = [];
                $("#droppable-items").find("button").each(function(){ IDs.push(this.id); });
            //    console.log(IDs);

                for (i = 0; i < IDs.length; i++) {
                    $('#'+IDs[i]).draggable({ disabled: true });
                    $('#'+IDs[i]).css({'color':'rgba(153, 153, 153, 0.6)'});
                    $('#'+IDs[i]).css({"background-color":"#fff"});
                    $('#'+IDs[i]).css({ "pointer-events": "none"});

                }
                nextSentence(IDs);
            }
        });

    $("#Conjunction").droppable({
            accept: function(d) {
               var returnreq =  matchRequest(d);
                if ($(this).attr('id') != returnreq){
                    return false;
                }
                else {

                    finalptid = d[0].id; // get id of the word
                    return true;}
            },

            // hoverClass: "highlight",
            tolerance: "fit",

            activate: function (evt, ui) {
                // $(this).find("h2").css("background-color", "cornsilk");
            },
            deactivate: function (evt, ui) {
                $(this).find("h2").css("background-color", "");
            },
            drop: function(evt, ui) {
             //   $(this).css({'background-color':'rgb(5, 107, 98)'});
                $(this).find('h2').css({'color':'#fff'});
                $(this).append($(ui.draggable).clone());
                 // display Comment success
            displayCommentSuccess();

           //     $(this).find('h2').css({'background-color':'#4e5a59'});


                var IDs = [];
                $("#droppable-items").find("button").each(function(){ IDs.push(this.id); });
              //  console.log(IDs);

                for (i = 0; i < IDs.length; i++) {
                    $('#'+IDs[i]).draggable({ disabled: true });
                    $('#'+IDs[i]).css({'color':'rgba(153, 153, 153, 0.6)'});
                    $('#'+IDs[i]).css({"background-color":"#fff"});
                    $('#'+IDs[i]).css({ "pointer-events": "none"});

                }
                 nextSentence(IDs);
            }
        });





  // Create buttons
    function createButtons(){

        var ajaxcount = 0;
        var speechWordslst = [];
        var wordidlst = [];
        var partsWordlst = [];
        var cid;
        var singlebtn;
        var singleids;
        var maxpts;
        var hyphwords;
        var question = $('.drag-Question').text(); // Retrieving Sentence
        var newquestion = question.replace(/-/g, ""); // check if sentence has any Secondary verb and then joining those words as one word to store in the array
        words = newquestion.match(/\b(\w+)\b/g); // fetching all individual words and storing in an array
         // words containing hyphens
        hyphwords = question.match(/\b(\w+[-']\w+)\b/g); // fetch only those words which are secondary verbs(hyphen)
        if(hyphwords != null){

            $('.drag-Question').text(question.replace(/-/g, " "));

            for (i = 0; i < hyphwords.length; i++) {
                var str = hyphwords[i];
                var newstr = str.replace(/-/g, "");
                words[(words.indexOf(newstr))] = str.replace(/-/g, " ") ;
            }
        }
     //   console.log(words);
      //  console.log(disabledWords);
        var input="";
        for (i = 0; i < words.length; i++) {
          var  butn = '<button type="button" id="word-' + i + '" class="btn btn-default">' + words[i] + '</button>';
            input= input+butn;

        }
        $("#butns-area").append(input);

        $("#butns-area").find("button").each(function(){ //fetching each button and then checking for disabled words or marking disabled words
            //console.log(this.id);
            singlebtn = $(this).text();
            singleids = this.id;
          //  console.log($(this).text());

            if($.inArray(($(this).text()), disabledWords) != -1) {
             //   console.log($(this).text());
               // console.log($(this).attr("id").draggable);

                maxpts = 0;
                cid = this.id;
             //   disabledids.push(cid);
                $('#' + cid).draggable({ disabled: true });
                $('#'+ cid).css({'color':'rgba(153, 153, 153, 0.6)'});
                $('#'+ cid).css({"background-color":"#fff"});
                $('#'+ cid).css({ "pointer-events": "none"});




            }

            else{
                iniIDs.push(this.id);
                maxpts = 3;
            }


          //  console.log(disabledids);
          //  console.log(iniIDs);

        var word_count = words.length;
        dragWords();
        iniBtnInsert(singlebtn, maxpts, singleids, word_count);



    });

              //get parts of sppech for word to update the respective column in the table
            function getSpeech(){

                    console.log(speechWordslst)


                    var xmlhttp = new XMLHttpRequest();

                    xmlhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {

                            myObj = JSON.parse(this.responseText);
                                    for(i = 0; i < speechWordslst.length; i++){
                                     //   console.log(speechWord);

                                     //    console.log(myObj[sentNum][speechWordslst[i]]);
                                        if (myObj[sentNum][speechWordslst[i]] == ''){
                                            partsWordlst.push('empty');


                                        }

                                        else{

                                            partsWordlst.push(myObj[sentNum][speechWordslst[i]]);
                                        }

                                           // console.log(partsWordlst);

                                        if (partsWordlst.length == speechWordslst.length){

                                            console.log("success");
                                            speechUpdate();

                                            }
                                    }


                    }


                    };
                    xmlhttp.open("GET", "questions.php", true);
                    xmlhttp.send();


    }

        function speechUpdate(){

        console.log(wordidlst);
        console.log(partsWordlst);
             $.ajax({

                        //AJAX type is "Post".

                        type: "POST",

                        //Data will be sent to "ajax.php".

                        url: "ButtonInsert.php",



                        //Data, that will be sent to "ajax.php".
                        dataType: 'json',

                        data: {

                            //Assigning value of "name" into "search" variable.



                            wordidlst: wordidlst, // Word id
                            Qnum: sentNum, // question number
                            partsWordlst: partsWordlst,// parts of speech


                        },

                        success: function(data) {


                            console.log(data);
                            var speechWordslst = [];
                            var wordidlst = [];
                            var partsWordlst = [];
                            console.log(iniIDs.length);



                            for(i=0; i < data.length; i++){


                                var splitarr = data[i].split(" ");

                             //   $("#"+splitarr[1]).droppable();
                                console.log('#'+splitarr[0]);

                                            console.log("triggered");
                                          //  console.log('#'+splitarr[0]);
                                            $("#"+splitarr[1]).find('h2').css({'color':'#fff'});
                                            $("#"+splitarr[1]).append($($('#'+splitarr[0]).draggable()).clone());


                                            $('#'+splitarr[0]).draggable({ disabled: true });
                                            $('#'+splitarr[0]).css({'color':'rgba(153, 153, 153, 0.6)'});
                                            $('#'+splitarr[0]).css({"background-color":"#fff"});
                                            $('#'+splitarr[0]).css({ "pointer-events": "none"});

                             }

                             if($("#droppable-items").find("button").length == data.length){

                                $('#nextBtn').show();
                                filterText = sentNum.match(/\d+/);
                                sentCounter = filterText[0];
                                sentCounter = parseInt(sentCounter);
                                $("#scoreText").text("Points you scored: ");
                             }

                            }

                        });
         }

         function iniBtnInsert(singlebtn, maxpts, singleids, word_count){

            speechWord = $('#'+ singleids).text();
            //speechWord = speechWord.replace(" ", "-");
            speechWordslst.push(speechWord);
            wordidlst.push(singleids);

            console.log(singlebtn, maxpts, singleids, word_count);
            $.ajax({

                        //AJAX type is "Post".

                        type: "POST",

                        //Data will be sent to "ajax.php".

                        url: "ButtonInsert.php",



                        //Data, that will be sent to "ajax.php".

                        data: {

                            //Assigning value of "name" into "search" variable.


                            BtnsInsert: singlebtn,
                            Maxpossiblepts: maxpts,
                            WordIds: singleids,
                            Qnum: sentNum,
                            WordCount: word_count,


                        },

                        success: function(data) {

                              console.log(data);
                                ajaxcount += 1;
                            if (word_count == ajaxcount){
                                ajaxcount = 0;
                                getPtsLabel();
                                 getSpeech();
                            }



                        }

                    });

        }


    }

    // update points
    function addPoints(ptsCounter, idWord){

                $.ajax({

                        //AJAX type is "Post".

                        type: "POST",

                        //Data will be sent to "ajax.php".

                        url: "ButtonInsert.php",



                        //Data, that will be sent to "ajax.php".

                        data: {

                            //Assigning value of "name" into "search" variable.


                            CountPts: ptsCounter,
                            Wordids: idWord,
                            Qnum: sentNum,

                        },

                        success: function(data) {


                            console.log(data);
                            getPtsLabel();

                        }

                    });
    }

    function earnedPoints(){

                $.ajax({

                        //AJAX type is "Post".

                        type: "POST",

                        //Data will be sent to "ajax.php".

                        url: "ButtonInsert.php",



                        //Data, that will be sent to "ajax.php".

                        data: {



                            Wordids: finalptid,
                            Qnum: sentNum,

                        },

                        success: function(data) {


                            console.log(data);

                        }

                    });
    }

    // request for question
    function sentenceRequest(){
        $("#tagNum").text(sentCounter);
        $('#nextBtn').hide();
        sentNum = sentNum + sentCounter;
        $("#scoreText").text("Maximum points that could be scored: ");
        var xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
                myObj = JSON.parse(this.responseText);
              //  var name = "1";


                var msg = myObj[sentNum];
                $.each(msg, function(k, v) {
                     if(v===""){

                        disabledWords.push(k);

                       //do actions
                     }
                });
                sentencename = myObj[sentNum]['Sentence'];
                $('.drag-Question').text(sentencename);

                createButtons();
         }


        };
        xmlhttp.open("GET", "questions.php", true);
        xmlhttp.send();
    }

   // check if word dropped matches with the parts of speech in question set
    function matchRequest(checkd){

        var xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
                myObj = JSON.parse(this.responseText);

                var qcheck = checkd.text();

                checkWord = myObj[sentNum][qcheck];



        }


        };
        xmlhttp.open("GET", "questions.php", true);
        xmlhttp.send();

        return checkWord;
    }

    // getting the cuing statements
    function cuiRequest(cuiElement){


        var xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
                myObj = JSON.parse(this.responseText);

          //  console.log(checkWord);
                var qcheck = cuiElement;

              // console.log(cuiElement);
               checkError = myObj[checkWord][qcheck];
             //  console.log(checkWord, qcheck);


                    $('#comment-section').removeClass('comment-success');
                    $('#comment-section').css({"opacity":"1"});
                    $('#comment-section').addClass('comment-sec');
                    $('#comment-section').text(checkError);
        }


        };
        xmlhttp.open("GET", "cuiheirarchy.php", true);
        xmlhttp.send();



    }

    // sentence dropped in correct box, display success
    function confirmationRequest(){


        var xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
                myObj = JSON.parse(this.responseText);


                checkSuccess = myObj[checkWord];
                $('#comment-section').removeClass('comment-sec');
                 $('#comment-section').addClass('comment-success');
                 $('#comment-section').css({"opacity":"1"});
                 $('#comment-section').text(checkSuccess);
        }


        };
        xmlhttp.open("GET", "statements.php", true);
        xmlhttp.send();



    }
    // function to display comments
    function displayCommentSuccess(){

     confirmationRequest();
     earnedPoints(); // function call to update earned points



 }

    function nextSentence(getIds){

        if(iniIDs.length == getIds.length){

            $('#nextBtn').show();
            $("#scoreText").text("Points you scored: ");
        }
    }

    function getPtsLabel(){

        console.log(sentNum);
        var xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
               // console.log(this.responseText);
                $('#scoreLabel').text(this.responseText);
        }


        };
        xmlhttp.open("GET", "GetSource.php?labelPt="+sentNum, true);
        xmlhttp.send();


    }

    function clearPage(){
        $("#butns-area").empty();
        $("#droppable-items").find("button").remove();
        $("#droppable-items").find("h2").css("color", "black");
        $('#comment-section').css({"opacity":"0"});

    }

    // Dialog box for comments
    // $("#dialog-message").dialog({
    //     autoOpen : false,
    //     resizable : false,
    //     width : 200,
    //     height:200,
    //     modal : true,
    //     buttons: {
    //         "Close" : function(){
    //             $( this ).dialog( "close" );
    //         }
    //     },
    //     open: function(event) {
    //         $('.ui-dialog-content.ui-widget-content').css({'height':'auto'});
    //         $('.ui-dialog-buttonpane').css({'padding':'0'});
    //         $('.ui-dialog-buttonpane .ui-dialog-buttonset').css({'float':'unset'});
    //         $('.ui-dialog-buttonpane').find('button:contains("Close")').addClass('closeButton');
    //     },
    //     close : function(ev, ui) {
    //         $('#section-drop').css({'filter': 'blur(0px)'});
    //         return true;
    //     }
    // });




})// execute on document load
