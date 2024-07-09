
 
let speech = new SpeechSynthesisUtterance(); 
// The SpeechSynthesisUtterance interface of the Web Speech API represents a speech request. It contains the content the speech service should read and information about how to read it (e.g. language, pitch and volume.)

// it Returns a new SpeechSynthesisUtterance object instance. i.e => SpeechSynthesisUtterance {text: '', lang: '', voice: null, volume: 1, rate: 1, …}

let diff_voices = [];// create array of different voice

let voiceSelect = document.querySelector("select");
/*******************speechSynthesis****************/
// The controller interface for the speech service. this can be used to retrieve information about the synthesis voices available on the device, start and pause speech, and other commands besides. 


        /******Here I solve a Problem lengthy code to smaller code and I learn here how to set createElement , setAttribute and appendChild with the help of Object. code number 2 is optimize than 1 *************/

 /*(1)*/  
    /*********setting multiple voices into option *****/
    // window.speechSynthesis.addEventListener("voiceschanged",(e) => {
    //     e.preventDefault();
    //     console.log(e);
    //     diff_voices = window.speechSynthesis.getVoices();  //The getVoices() method of the SpeechSynthesis interface returns a list of SpeechSynthesisVoice objects representing all the available voices on the current device.
    //     speech.voice = diff_voices[0];
    //     for (let i = 0; i < diff_voices.length; i++) {
    //       let option = document.createElement("option");
    //       option.textContent = `${diff_voices[i].name} (${diff_voices[i].lang})`;
    //       option.setAttribute("data-lang", diff_voices[i].lang);
    //       option.setAttribute("data-name", diff_voices[i].name);
    //       option.setAttribute("value",i);
    //       voiceSelect.appendChild(option);
    //     }
    // });

 /*(2)*/
    window.speechSynthesis.onvoiceschanged = () => {
      diff_voices = window.speechSynthesis.getVoices(); 
      speech.voice = diff_voices[0]; // set default language
      diff_voices.forEach((voice,i) => (voiceSelect.options[i] = new Option(voice.name, i))); // we can also use this loop in method num. 1
    };

    voiceSelect.addEventListener("change", ()=> {
      speech.voice = diff_voices[voiceSelect.value];
    });

    
    
    let Content = document.querySelector("textarea");
    let path = ["./Images/play.png","./Images/pause.png","./Images/resum.png"]
    let imgs = document.querySelector("img");
        imgs.src = path[0]; 
    let P = document.querySelector("p") 
        P.innerHTML = "Listen";

    /*******************Button Events play,pause,resume ***********/
    document.querySelector("button").addEventListener("click", (e)=>{
        e.preventDefault();
       
        if(!Content.value)
        { alert("Please write text before listening");}

        speech.text = Content.value;

        if(imgs.src.match(path[0])){
          window.speechSynthesis.speak(speech);
          imgs.src = path[1];
          P.innerHTML = "Pause";
        }

        else if(imgs.src.match(path[1])){
          window.speechSynthesis.pause();
          imgs.src = path[2];
          P.innerHTML = "Resume ";
        }

        else if( imgs.src.match(path[2])){
          window.speechSynthesis.resume();
          imgs.src = path[1];
          P.innerHTML = "Pause"  
        } 
    });
   
    /********Cut the text from clipboard **********/
  Content.addEventListener("cut",()=>{
    imgs.src = path[0] 
    P.innerHTML = "Listen"  
    window.speechSynthesis.cancel(); 
  })

  /**********When speech is end **********/
  let clear = speech.addEventListener("end",(e)=>{
      e.preventDefault();
      imgs.src = path[0]
      P.innerHTML = "Listen" 
      window.speechSynthesis.cancel(); 
  });
   
     /*********Refreshing the page *********/
     window.onbeforeunload = function (e) {
      window.speechSynthesis.cancel();
      var e = e || window.Event;
      // Firefox
      if (e) {
          e.returnValue = 'Leaving the page';
      }
  
      // For Safari
      return 'Leaving the page';
  };

  
