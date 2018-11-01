$(function(){
    sentenceRequest(); 
    
    var words; // Global variable
    var sentencename;
    var checkWord;
    
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
                    $('#comment-section').text('Please try once again');
                    $('#comment-section').removeClass('comment-success')
                    $('#comment-section').css({"opacity":"1"});
                    $('#comment-section').addClass('comment-sec')
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
            $(this).css({'background-color':'rgb(5, 107, 98)'});
            $(this).find('h2').css({'color':'#fff'});
            $(this).append($(ui.draggable).clone());
            //shake effect
            // $(this).effect( "shake", { times:2 }, 300);

            // display Comment success
            displayCommentSuccess();

            var IDs = [];
            $("#droppable-items").find("button").each(function(){ IDs.push(this.id); });
            console.log(IDs);

            for (i = 0; i < IDs.length; i++) {
                $('#'+IDs[i]).draggable({ disabled: true });
                $('#'+IDs[i]).css({'color':'rgba(153, 153, 153, 0.6)'});
                $('#'+IDs[i]).css({"background-color":"#fff"});
                $('#'+IDs[i]).css({ "pointer-events": "none"});

            }
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
            $(this).css({'background-color':'rgb(5, 107, 98)'});
            $(this).find('h2').css({'color':'#fff'});
            $(this).append($(ui.draggable).clone());
            //shake effect
            // $(this).effect( "shake", { times:2 }, 300);

            // display Comment success
            displayCommentSuccess();

            var IDs = [];
            $("#droppable-items").find("button").each(function(){ IDs.push(this.id); });
            console.log(IDs);

            for (i = 0; i < IDs.length; i++) {
                $('#'+IDs[i]).draggable({ disabled: true });
                $('#'+IDs[i]).css({'color':'rgba(153, 153, 153, 0.6)'});
                $('#'+IDs[i]).css({"background-color":"#fff"});
                $('#'+IDs[i]).css({ "pointer-events": "none"});

            }
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
            $(this).css({'background-color':'rgb(5, 107, 98)'});
            $(this).find('h2').css({'color':'#fff'});
            $(this).append($(ui.draggable).clone());
            //shake effect
            // $(this).effect( "shake", { times:2 }, 300);

            // display Comment success
            displayCommentSuccess();

            var IDs = [];
            $("#droppable-items").find("button").each(function(){ IDs.push(this.id); });
            console.log(IDs);

            for (i = 0; i < IDs.length; i++) {
                $('#'+IDs[i]).draggable({ disabled: true });
                $('#'+IDs[i]).css({'color':'rgba(153, 153, 153, 0.6)'});
                $('#'+IDs[i]).css({"background-color":"#fff"});
                $('#'+IDs[i]).css({ "pointer-events": "none"});

            }
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
            $(this).css({'background-color':'rgb(5, 107, 98)'});
            $(this).find('h2').css({'color':'#fff'});
            $(this).append($(ui.draggable).clone());
            
            //shake effect
            // $(this).effect( "shake", { times:2 }, 300);

            // display Comment success
            displayCommentSuccess();

            var IDs = [];
            $("#droppable-items").find("button").each(function(){ IDs.push(this.id); });
            console.log(IDs);

            for (i = 0; i < IDs.length; i++) {
                $('#'+IDs[i]).draggable({ disabled: true });
                $('#'+IDs[i]).css({'color':'rgba(153, 153, 153, 0.6)'});
                $('#'+IDs[i]).css({"background-color":"#fff"});
                $('#'+IDs[i]).css({ "pointer-events": "none"});

            }
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
            $(this).css({'background-color':'rgb(5, 107, 98)'});
            $(this).find('h2').css({'color':'#fff'});
            $(this).append($(ui.draggable).clone());
            $()

            console.log(  $(this).find('h2').css({'background-color':'#4e5a59'}));


            var IDs = [];
            $("#droppable-items").find("button").each(function(){ IDs.push(this.id); });
            console.log(IDs);

            for (i = 0; i < IDs.length; i++) {
                $('#'+IDs[i]).draggable({ disabled: true });
                $('#'+IDs[i]).css({'color':'rgba(153, 153, 153, 0.6)'});
                $('#'+IDs[i]).css({"background-color":"#fff"});
                $('#'+IDs[i]).css({ "pointer-events": "none"});

            }
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
                $(this).css({'background-color':'rgb(5, 107, 98)'});
                $(this).find('h2').css({'color':'#fff'});
                $(this).append($(ui.draggable).clone());
                $()

                console.log(  $(this).find('h2').css({'background-color':'#4e5a59'}));


                var IDs = [];
                $("#droppable-items").find("button").each(function(){ IDs.push(this.id); });
                console.log(IDs);

                for (i = 0; i < IDs.length; i++) {
                    $('#'+IDs[i]).draggable({ disabled: true });
                    $('#'+IDs[i]).css({'color':'rgba(153, 153, 153, 0.6)'});
                    $('#'+IDs[i]).css({"background-color":"#fff"});
                    $('#'+IDs[i]).css({ "pointer-events": "none"});

                }
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
                $(this).css({'background-color':'rgb(5, 107, 98)'});
                $(this).find('h2').css({'color':'#fff'});
                $(this).append($(ui.draggable).clone());
                $()

                console.log(  $(this).find('h2').css({'background-color':'#4e5a59'}));


                var IDs = [];
                $("#droppable-items").find("button").each(function(){ IDs.push(this.id); });
                console.log(IDs);

                for (i = 0; i < IDs.length; i++) {
                    $('#'+IDs[i]).draggable({ disabled: true });
                    $('#'+IDs[i]).css({'color':'rgba(153, 153, 153, 0.6)'});
                    $('#'+IDs[i]).css({"background-color":"#fff"});
                    $('#'+IDs[i]).css({ "pointer-events": "none"});

                }
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
                $(this).css({'background-color':'rgb(5, 107, 98)'});
                $(this).find('h2').css({'color':'#fff'});
                $(this).append($(ui.draggable).clone());
                $()

                console.log(  $(this).find('h2').css({'background-color':'#4e5a59'}));


                var IDs = [];
                $("#droppable-items").find("button").each(function(){ IDs.push(this.id); });
                console.log(IDs);

                for (i = 0; i < IDs.length; i++) {
                    $('#'+IDs[i]).draggable({ disabled: true });
                    $('#'+IDs[i]).css({'color':'rgba(153, 153, 153, 0.6)'});
                    $('#'+IDs[i]).css({"background-color":"#fff"});
                    $('#'+IDs[i]).css({ "pointer-events": "none"});

                }
            }
        });

    



  // Create buttons
    function createButtons(){
        
               
        
        var question = $('.drag-Question').text();
        
        words= question.match(/\b(\w+)\b/g);
        var input="";
        for (i = 0; i < words.length; i++) {
          var  butn = '<button type="button" id="word-' + i + '" class="btn btn-default">' + words[i] + '</button>';
            input= input+butn;
        }
        $("#butns-area").append(input);
        dragWords();
    }

    function sentenceRequest(){
        
        var xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
                myObj = JSON.parse(this.responseText);
              //  var name = "1";
                sentencename = myObj.Set21.Sentence;
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
            
                checkWord = myObj['Set21'][qcheck];
                
               
                
        }
            
            
        };
        xmlhttp.open("GET", "questions.php", true);
        xmlhttp.send();
       
        return checkWord;
    }
    
    
    // function to display comments
 function displayCommentSuccess(){
     $('#comment-section').removeClass('comment-sec');
     $('#comment-section').addClass('comment-success');
     $('#comment-section').text('Success');
     $('#comment-section').css({"opacity":"1"});
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