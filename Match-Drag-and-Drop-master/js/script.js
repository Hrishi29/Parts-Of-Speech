$(function(){
    
    var words; // Global variable
    var sentencename;
    var checkWord;
    var cuingCounter = []; 
    var checkError;
    var disabledWords = [];
    var checkSuccess;
    var iniIDs = [];
    var sentNum = 'Set';
    var sentCounter = 21;
    
  //  $("#myModal").modal({keyboard: false});
    $("#modalButton").click(function(){
        
        if (($("#usrname").val()) != "")
            {
                $("#myModal").modal("hide");
                $("#userName").text("Welcome" + " " + $("#usrname").val());
                $("#userName").css({"color" : "red"}, {"font-weight" : "bold"});
            }
        
    });
    
    $("#nextBtn").click(function(){
        $("#butns-area").empty();
        $("#droppable-items").find("button").remove();
        $("#droppable-items").find("h2").css("color", "black");
        $('#comment-section').css({"opacity":"0"});
        $("#nextBtn").toggle();
        sentNum = 'Set';
        sentCounter += 1; 
        cuingCounter.splice(0, cuingCounter.length);
        disabledWords.splice(0, disabledWords.length);
        iniIDs.splice(0, iniIDs.length);
        sentenceRequest(); 
    });
    
    sentenceRequest(); 
    
    
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
                       // console.log($(this).attr("id"));
                       // console.log(cuingCounter);
                    }
                    else { if(cuingCounter[$(this).attr("id")] < 3){cuingCounter[$(this).attr("id")] += 1;};}
                    //console.log(cuingCounter);
                    cuiRequest(cuingCounter[$(this).attr("id")]);
                   
                    
                }
                return !event;
            }
            
            
            
        });
    }

    }

    $("#Subjective-Pronoun").droppable({
        accept: function(d) {
           var returnreq =  matchRequest(d);
            if ('Subjective Pronoun' != returnreq){
                
                return false;
            }
            else { return true;}
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
            else {return true;}
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
            else {return true;}
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
            else {return true;}
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
            else {return true;}
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
                else {return true;}
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
                else {return true;}
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
                else {return true;}
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
        
        
        dragWords();
       // iniBtnInsert(singlebtn, maxpts, singleids);
     
        
    });

    function iniBtnInsert(singlebtn, maxpts, singleids){    
           
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
                            
                        },

                        success: function(data) {


                            console.log(data);

                        }

                    });
            
        }
        
    }
    
    function sentenceRequest(){
        
        sentNum = sentNum + sentCounter;
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
    
    
    function cuiRequest(cuiElement){
        
        
        var xmlhttp = new XMLHttpRequest();
        
        xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
                myObj = JSON.parse(this.responseText);
                
          //  console.log(checkWord);
                var qcheck = cuiElement;
                
            //   console.log(cuiElement);
               checkError = myObj[checkWord][qcheck];
              //  console.log(checkError);
                
                
                    $('#comment-section').removeClass('comment-success');
                    $('#comment-section').css({"opacity":"1"});
                    $('#comment-section').addClass('comment-sec');
                    $('#comment-section').text(checkError);
        }
            
            
        };
        xmlhttp.open("GET", "cuiheirarchy.php", true);
        xmlhttp.send();
       
        
        
    }
    
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
     
     
     
 }
    
    function nextSentence(getIds){
        
        if(iniIDs.length == getIds.length){
            $('#nextBtn').toggle();
                
        }
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