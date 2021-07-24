// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);
window.addEventListener('resize', () => {
  // We execute the same script as before
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});

let InterditsOuObligatoires = {"&" : [], "@" : []};

let ObligatoiresIndexMaisMieux = [-1];

function SelectObligatoires(txt) {
    
    elem = document.getElementsByClassName('ask')[0];
    if (elem) {
        elem.parentNode.removeChild(elem);
    }

    divtohide = document.getElementsByClassName('result')[0];
    divtohide.style = "display : none;"
    divresult = document.getElementsByClassName('look')[0];
    divresult.innerHTML += '<div class="Obligatoire ask"><h2 style="color: #00916d">Lettres permises (@) :</h2><input id="Obligatoireinput"><button id="boutoncoolobligatoire" class="valider">Selection terminée</button></div>'
    
    buttonac = document.getElementById("boutoncoolobligatoire");

    

    document.getElementById("Obligatoireinput").focus();
    Edit = false;

    if (!ObligatoiresIndexMaisMieux.includes(txt.length - 1)) {
        ObligatoiresIndexMaisMieux.push(txt.length - 1);
    } else {
        console.log(ObligatoiresIndexMaisMieux);
        Edit = true;
        betterindex = ObligatoiresIndexMaisMieux.indexOf(txt.length - 1) - 1;
        console.log(betterindex);
        oldtexte = InterditsOuObligatoires["@"][betterindex];
        
        
        for (let i = 0; i < oldtexte.length; i++) {
            document.getElementById("Obligatoireinput").value += oldtexte[i].toLowerCase();
        }
        
    }
    document.getElementById("saisie").readOnly = true;
    

    function changestatus() {
        
        texte = document.getElementById("Obligatoireinput").value.toUpperCase().split('');
        
        const nt = [];
        for (let i = 0; i < texte.length; i++) {
            nt.push(texte[i]);
        }

        if (Edit == false) {
            InterditsOuObligatoires["@"].push(nt);
        } else {
            InterditsOuObligatoires["@"][betterindex] = nt;
            console.log(InterditsOuObligatoires);
        }
        
        //elem = document.getElementsByClassName('ask')[0];
        //elem.parentNode.removeChild(elem);
        //document.getElementsByClassName('result')[0].style = "display : block;";
        divresult = document.getElementsByClassName('look')[0];
        //divresult.innerHTML += '<div class=><h2>Saisie prise en compte</h2><img src="./images/checked.svg" width="10%"></div>'
        document.getElementById("Obligatoireinput").value = "Saisie prise en compte";
        document.getElementById("Obligatoireinput").style = "background-color : #11998e; color : white; text-align : center";
        document.getElementById("saisie").removeAttribute('readonly');
        document.getElementById("saisie").focus();
        
        document.getElementsByClassName("valider")[1].style = "display : none";

        validerbuttonleft.style = "background-color : #11998e; cursor : pointer";
        validerbuttonleft.disabled = false;

        
       
    }
    document.getElementById("saisie").value = txt;


    var validerbuttonleft = document.getElementsByClassName("valider")[0];

    validerbuttonleft.style = "background-color : #e53935; cursor : default";;
    validerbuttonleft.disabled = true;
    buttonac.addEventListener('click', changestatus);


}

function SelectInterdit(txt) {
    elem = document.getElementsByClassName('ask')[0];
    if (elem) {
        elem.parentNode.removeChild(elem);
    }

    
    
    divtohide = document.getElementsByClassName('result')[0];
    divtohide.style = "display : none;"
    divresult = document.getElementsByClassName('look')[0];

    
    
    divresult.innerHTML += '<div class="Interdits ask"><h2 style="color: #e53935;">Lettres interdites (&) :</h2><input id="Interditinput"><button id="boutoncoolinterdits" class="valider"">Selection terminée</button></div>'
    buttonac = document.getElementById("boutoncoolinterdits");
    document.getElementById("Interditinput").focus();
    document.getElementById("saisie").readOnly = true;

    function changestatus() {
        
        texte = document.getElementById("Interditinput").value.toUpperCase().split('');
        const nt = [];
        for (let i = 0; i < texte.length; i++) {
            nt.push(texte[i]);
        }
        InterditsOuObligatoires["&"].push(nt);
        document.getElementById("Interditinput").value = "Saisie prise en compte";
        document.getElementById("Interditinput").style = "background-color : #11998e; color : white; text-align : center";
        document.getElementById("Interditinput").readOnly = true;
        document.getElementById("saisie").removeAttribute('readonly');
        document.getElementById("saisie").focus();

        document.getElementsByClassName("valider")[1].style = "display : none";

        validerbuttonleft.style = "background-color : #e53935; cursor : default";;
        validerbuttonleft.disabled = true;
        
       
    }
    document.getElementById("saisie").value = txt;

    var validerbuttonleft = document.getElementsByClassName("valider")[0];

    validerbuttonleft.style = "background-color : #e53935; cursor : default";;
    validerbuttonleft.disabled = true;

    buttonac.addEventListener('click',changestatus);
    

}


function detectchanged() {
    var max = 21;
    if (document.getElementById("saisie").value.length > max) {
        document.getElementById("consigne").textContent = "Mot trop long";
        document.getElementById("consigne").style = "color : #e53935";
        document.getElementsByClassName("valider")[0].style = "background-color : #e53935; cursor : default";
    } else {
        if (document.getElementById("consigne").textContent != "Critère pour le mot cherché :") {
            document.getElementById("consigne").textContent = "Critère pour le mot cherché :";
            document.getElementById("consigne").style = "color : black";
            document.getElementsByClassName("valider")[0].style = "background-color : #11998e; cursor : pointer";
        }
        
        if ( document.getElementById("saisie").value[document.getElementById("saisie").value.length - 1] == "@") {
            oldvalue = document.getElementById("saisie").value;
            SelectObligatoires(oldvalue);
        }
        if ( document.getElementById("saisie").value[document.getElementById("saisie").value.length - 1] == "&") {
            oldvalue = document.getElementById("saisie").value;
            SelectInterdit(oldvalue);
        }
    }
    
}

function browseweb(){
    elementactuel = document.getElementById("resultats").value;
    window.open('https://www.larousse.fr/dictionnaires/francais/' + elementactuel.toLowerCase(), '_blank').focus();
}

function addCaracter(carac) {
    function insertAtCursor(myField, myValue) {
        //IE support
        if (document.selection) {
            myField.focus();
            sel = document.selection.createRange();
            sel.text = myValue;
            
            myField.focus();
            
        }
        //MOZILLA and others
        else if (myField.selectionStart || myField.selectionStart == '0') {
            var startPos = myField.selectionStart;
            var endPos = myField.selectionEnd;
            myField.value = myField.value.substring(0, startPos)
                + myValue
                + myField.value.substring(endPos, myField.value.length);
            myField.focus();
            myField.selectionStart = startPos + 1;
            myField.selectionEnd = startPos + 1;
        } else {
            myField.value += myValue;
        }
    }

    insertAtCursor(document.getElementById("saisie"), carac);
    detectchanged();
}

function endWaiterInterdits(){
    var texte = document.getElementById("Interditinput").value;
    resultatvoulu = texte.toUpperCase().split(' ');
    resultatvoulu = resultatvoulu.split('');
    console.log(resultatvoulu);
}

function go() {
    
    elem = document.getElementsByClassName('ask')[0];
    if (elem) {
        elem.parentNode.removeChild(elem);
    }

    resultat = document.getElementById("saisie").value.toUpperCase()
    

    taille = resultat.length;
    
    function problem(type) {
        alert(type);
    }

    var file =  localStorage.getItem(taille);

    if (file == null) {
        //problem("Mot trop long (" + taille.toString() + " / 21 lettres)");
        return "error";
    } else {
        file = file.split(',');
    }

    

    mots = file
    let continuer = false
    function distanceHamming(motatrouver, diff, error) {

        

        

        

        var texte = "";
        
        function SelectObligatoires() {
            divtohide = document.getElementsByClassName('result')[0];
            divtohide.style = "display : none;"
            divresult = document.getElementsByClassName('look')[0];
            divresult.innerHTML += '<div class="Obligatoire ask"><h2 style="color: #2c7744">Lettres obligatoires (@) séparés par des espaces</h2><input id="Obligatoireinput"><button id="boutoncoolinterdits" class="valider">Selection terminée</button></div>'
            
            buttonac = document.getElementById("boutoncoolinterdits");

            function changestatus() {
                
                texte = document.getElementById("Obligatoireinput").textContent.toUpperCase().split("");
                InterditsOuObligatoires["@"] += texte;
                
               
            }

            buttonac.addEventListener('click',changestatus());
   
   
        }

        
        var ObligatoiresIndex = [];
        var InterditsIndex = [];
        
        
        for (let caracindex = 0; caracindex < motatrouver.length; caracindex++) {
            if (Object.keys(InterditsOuObligatoires).includes(motatrouver[caracindex])) {
                if (motatrouver[caracindex] == "&") {
                    InterditsIndex.push(caracindex);

                } else {
                    ObligatoiresIndex.push(caracindex);

                }
            }
        }
        
        
        
        
        
        var touslesmots = []
        
        var attention = ["*", " "];
        
        var special = {"/" : ["A", "E", "I", "O", "U", "Y"], "#" : [ "B", "C", "D", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "V", "W", "X", "Z"]};

        scoremin = 0
        for (let lettre = 0; lettre < motatrouver.length; lettre++) {
            if (attention.includes(motatrouver[lettre])) {
                scoremin++;
            }
        }
        
        
        
        
        console.log(mots);
        for (let motindex = 0; motindex < mots.length; motindex++) {
            var line = mots[motindex];

            
            var score = 0;
            for (let charac = 0; charac < line.length; charac++) {
                if (line[charac] != motatrouver[charac]) {
                    if ( Object.keys(special).includes(motatrouver[charac])) {
                        if (special[motatrouver[charac]].includes(line[charac])) {
                            
                        } else {
                            score++;
                        }
                    } else if (Object.keys(InterditsOuObligatoires).includes(motatrouver[charac])) {
                        if (motatrouver[charac] == "&") {
                            indexducarac = InterditsIndex.indexOf(charac);
                            if (InterditsOuObligatoires["&"][indexducarac].includes(line[charac])) {
                                score++;
                            }
                                
                        } else {
                            indexducarac = ObligatoiresIndex.indexOf(charac);
                            
                            if (InterditsOuObligatoires["@"][indexducarac].includes(line[charac])) {
                                
                            } else {
                                score++;
                            }

                        }
                    } else {
                        score++;
                    }
                    
                }
            }
            var tuplee = [score, line];

            
            
            touslesmots.push(tuplee);
        }
            
        
            
        var filtre = touslesmots.sort();

        

        var Minimum = diff;
        var max = scoremin + Minimum;
        var listefinale = [];
        for (let i = 0; i < filtre.length; i++) {
            if (filtre[i][0] <= max) {
                listefinale.push(filtre[i][1]);
            }
        }

        console.log(listefinale);

        select = document.getElementById('resultats');
        select.innerHTML = "";
        for (var i = 0; i < listefinale.length; i++){
            var opt = document.createElement('option');
            opt.value = listefinale[i];
            opt.innerHTML = listefinale[i];
            select.appendChild(opt);
        }

        document.getElementById('resultats').focus();

        function addChercherInternet() {
            divresult = document.getElementsByClassName('result')[0];
            var btn = document.createElement('button');
            btn.value = "Chercher sur internet";
            btn.innerHTML = "Chercher sur internet";
            btn.className = "internet";
            btn.id = "boutonpoursurflarousse";
            btn.setAttribute('onclick','browseweb()');
            divresult.appendChild(btn);
        }

       

        textresult = document.getElementById('textresultat');
        if (listefinale.length > 1) {
            divtohide = document.getElementsByClassName('result')[0];
            divtohide.style = "display : block;"
            if (error == "none") {
                textresult.innerHTML = listefinale.length.toString() + " résultats trouvés";
                textresult.style = "color : #115099;";
            } else {
                textresult.innerHTML = "Pas de résultat. Voilà " + listefinale.length.toString() + " résultats voisins";
                textresult.style = "color : #e53935";;
            }
            if (document.getElementById("boutonpoursurflarousse")) {

            } else {
                addChercherInternet();
            }
            
            
        }
        if (listefinale.length == 1) {
            divtohide = document.getElementsByClassName('result')[0];
            divtohide.style = "display : block;"
            if (error == "none") {
                textresult.innerHTML = "1 résultat trouvé";
                textresult.style = "color : #115099;";
            } else {
                textresult.innerHTML = "Pas de résultat. Voilà 1 résultat voisin";
                textresult.style = "color : #e53935";;
            }
            if (document.getElementById("boutonpoursurflarousse")) {

            } else {
                addChercherInternet();
            }
        }
        if (listefinale.length == 0) {
            error = "pasdupremiercoup"
            return distanceHamming(motatrouver, diff + 1, error)
        }

        
                
        
    }

    distanceHamming(resultat, 0, "none");

}

document.onkeypress = function(evt) {
    evt = evt || window.event;
    var charCode = evt.keyCode || evt.which;
    if (document.getElementById("saisie") == document.activeElement) {
        if (charCode == 13) {
            go();
        }
    }
    
};

