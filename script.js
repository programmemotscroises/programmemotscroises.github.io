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

        validerbuttonleft.style = "background-color : #11998e; cursor : pointer";
        validerbuttonleft.disabled = false;
        
       
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

let whofocus;

function lastfocusset(id){
    whofocus = id;
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

    insertAtCursor(document.getElementById(whofocus), carac);
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


let IndexsCaracs = [-1, -1]

function selectcase(id) {
    
    //id = id.split('-')[1];
    which = document.getElementById(id).parentNode.className;
    
    which = which.split(' ')[1];
    if (which == "mot1") {
        IndexsCaracs[0] =  parseInt(id.split('-')[1]) - 1;
    } else {
        IndexsCaracs[1] = parseInt(id.split('-')[1]) - 1;
    }
    others = document.getElementsByClassName(which)[0].childNodes;

    

    for (let i = 0; i < others.length; i += 1) {
        others[i].style.backgroundColor = 'white';
    }

    document.getElementById(id).style.backgroundColor = "#00916d";

    if (IndexsCaracs[0] != -1 && IndexsCaracs[1] != -1) {
        document.getElementsByClassName('valider')[0].style = "display : block;";
        location.href = "#";
        location.href = "#valider-button";
        
    }
    


}

function distanceHammingSiplyfied(motatrouver, diff, error) {

    taille = motatrouver.length;
    

    var file =  localStorage.getItem(taille);

    if (file == null) {
        //problem("Mot trop long (" + taille.toString() + " / 21 lettres)");
        return "error";
    } else {
        file = file.split(',');
    }

    

    mots = file;

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

    listefinale = [motatrouver, listefinale];

    /*
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

    */
    
    if (listefinale.length == 0) {
        error = "pasdupremiercoup"
        return distanceHamming(motatrouver, diff + 1, error)
    } else {
        return listefinale;
    }

    
            
    
}

Mots = {"Mot1" : "", "Mot2" : ""};
let WordsSelected = 0

function generate() {

    document.getElementById("buttonvalider1").textContent = "Ok";
    document.getElementById("buttonvalider1").style = "display : none";

    document.getElementById("buttonvalider2").textContent = "Ok";
    document.getElementById("buttonvalider2").style = "display : none";

    document.getElementById("whattodo").textContent = "";


    console.log(IndexsCaracs);
    mot1 = document.getElementsByClassName("mot1")[0];


    mot2 = document.getElementsByClassName("mot2")[0];

    

    


    mot2.style = "flex-direction : column";
    others = mot2.childNodes;


    carac1index = IndexsCaracs[0];
    carac2index = IndexsCaracs[1];

    for (let i = 0; i < others.length; i += 1) {
        if (i == 0) {
            others[i].style = 'margin : 0; margin-top : 50px; border: 5px black solid;border-top: 5px black solid;border-bottom: 2.5px black solid;';
        }
        else if (i == others.length - 1) {
            others[i].style = 'margin : 0; border: 5px black solid;border-top: 2.5px black solid;border-bottom: 5px black solid;';
        } else {
            others[i].style = 'margin : 0; border: 5px black solid;border-top: 2.5px black solid;border-bottom: 2.5px black solid;';
        }
        
    }
    var divresult = document.getElementsByClassName("final")[0];
    var content;
    if (document.getElementsByClassName("mot2final").length > 0) {
        document.getElementsByClassName("mot2final")[0].parentNode.removeChild(document.getElementsByClassName("mot2final")[0])
        
    }
    
    content = document.createElement('div');
    
    
    var mot2final = document.createElement('div');
    mot2final.innerHTML = mot2.innerHTML;
    mot2final.style = "display : flex; flex-direction: column; margin-left: 50%;"
    mot2final.className = "mot2final";
    
    mots2enfants = mot2final.childNodes;

    var mot2toreplace;
    for (let i = 0; i < mots2enfants.length; i += 1) {
        if (i == carac2index) {
            mot2toreplace = mots2enfants[i];
            break
        }
        
        
    }
    
    var clientWidth = Math.round(Math.floor(parseFloat(parseFloat(document.getElementById("1-1").offsetWidth) / vh)) + 0.45);
    console.log(clientWidth.toString() + "vh de largeur détecté.");
    widthtotake = clientWidth;
    
    margintoto = carac1index * widthtotake;

    mot2toreplace.innerHTML = mot1.innerHTML;
    mot2toreplace.style = "display : flex; flex-direction : row; margin : 0px; padding: 0px; border: 0; margin-left: -" + margintoto.toString() +  "vh; width: fit-content;";
    console.log(mot2toreplace.childNodes[1]);
    for (let j = 1; j < mot2toreplace.childNodes.length; j += 2) {
        mot2toreplace.childNodes[j].style = "margin : 0px";
    }
    
    divresult.appendChild(content);
    content.appendChild(mot2final);

    document.getElementsByClassName("mot1")[0].style = "display : none";
    document.getElementsByClassName("mot2")[0].style = "display : none";
}


function gotolink(url) {
    window.open(url, "_blank");
}

function create() {
    Mot1Texte = Mots["Mot1"];
    Mot2Texte = Mots["Mot2"];

    String.prototype.replaceAt = function(index, replacement) {
        if (index >= this.length) {
            return this.valueOf();
        }
     
        return this.substring(0, index) + replacement + this.substring(index + 1);
    }

    if (Mot1Texte[IndexsCaracs[0]] != Mot2Texte[IndexsCaracs[1]]) {
        console.log("Le croisement ne correspond pas ! : " + Mot1Texte[IndexsCaracs[0]] + " et " + Mot2Texte[IndexsCaracs[1]]);
        if (Mot1Texte[IndexsCaracs[0]] == "*" && (Mot2Texte[IndexsCaracs[1]] == "#" || Mot2Texte[IndexsCaracs[1]] == "/")) {
            Mot1Texte = Mot1Texte.replaceAt(IndexsCaracs[0], Mot2Texte[IndexsCaracs[1]]);
        } else if (Mot2Texte[IndexsCaracs[1]] == "*" && (Mot1Texte[IndexsCaracs[0]] == "#" || Mot1Texte[IndexsCaracs[0]] == "/")) {
            Mot2Texte = Mot2Texte.replaceAt(IndexsCaracs[1], Mot1Texte[IndexsCaracs[0]]);
        } else if (Mot1Texte[IndexsCaracs[0]] == "*"){
            Mot1Texte = Mot1Texte.replaceAt(IndexsCaracs[0], Mot2Texte[IndexsCaracs[1]]);
        } if (Mot2Texte[IndexsCaracs[1]] == "*"){
            Mot2Texte = Mot2Texte.replaceAt(IndexsCaracs[1], Mot1Texte[IndexsCaracs[0]]);
        }
        console.log("On arrive donc à : " + Mot1Texte + " | " + Mot2Texte);
    }

    if (Mot1Texte[IndexsCaracs[0]] != Mot2Texte[IndexsCaracs[1]]) {
        document.getElementById("whattodo").textContent = "Les lettres croisées ne correspondent pas";
        document.getElementById("whattodo").style.color = "#eb3349";
        modifytext("1");
        modifytext("2");

        IndexsCaracs = [-1, -1];
        WordsSelected = 0;
    } else {

    
    
    generate();

    

    

    

    


    mot1resultats = distanceHammingSiplyfied(Mot1Texte, 0, "none");
    mot2resultats = distanceHammingSiplyfied(Mot2Texte, 0, "none");
    

    function croisement(mot1, index1, mot2, index2) {

        mots1 = mot1[1]
        mots2 = mot2[1]

        ListeFinale = []

        for (let mot1index = 0; mot1index < mots1.length; mot1index++) {
            caracmot1 = mots1[mot1index][index1];
            for (let mot2index = 0; mot2index < mots2.length; mot2index++) {
                caracmot2 = mots2[mot2index][index2];
                if (caracmot2 == caracmot1) {
                    tuplee = [mots1[mot1index], mots2[mot2index]];
                    ListeFinale.push(tuplee);
                }
            }

        }

        console.log(ListeFinale.length.toString() + " résultats")
        return ListeFinale

    }
    
        

    fin = croisement(mot1resultats, IndexsCaracs[0], mot2resultats, IndexsCaracs[1]);
    console.log(fin);

    

    if (fin.length > 30) {
        document.getElementsByClassName("mot2final")[0].style = ""; 
        document.getElementsByClassName("mot2final")[0].innerHTML = '<h1 style="text-align: center; color : rgb(229, 57, 53);">Il y a trop de combinaisons possibles (' + fin.length.toString() + ')</h1>';
        document.getElementsByClassName('valider')[0].textContent = "Modifier la recherche";
        document.getElementsByClassName('valider')[0].setAttribute('onclick','modifier();');
        
    } else if (fin.length > 0) {
        containerselect = document.getElementsByClassName("result2")[0]

        var h1 = document.createElement('h1');

        if (document.getElementById("lenombre")) {
            elem = document.getElementById("lenombre");
            elem.parentNode.removeChild(elem);
        }
        h1.id = "lenombre";
        if (fin.length == 1) {
            h1.textContent = fin.length.toString() + " croisement trouvé";
        } else {
            h1.textContent = fin.length.toString() + " croisements trouvés";
        }
        
        h1.style = "color : #115099; text-align: center";
        containerRESULTAT = document.getElementsByClassName("mot2final")[0].parentNode;
        containerRESULTAT.prepend(h1);

        var select = document.createElement('select');
        select.id = "resultats";

        
        
        
        containerselect.appendChild(select);
        

        select = document.getElementById('resultats');
        select.innerHTML = "";
        for (var i = 0; i < fin.length; i++){
            var opt = document.createElement('option');
            var texteeeee = fin[i].toString();
            texteeeee = texteeeee.replace(',', ' ');
            opt.value = texteeeee;
            opt.innerHTML = texteeeee;
            select.appendChild(opt);
        }

        seepreview();

        location.href = "#";
        location.href = "#resultats";


        document.getElementById('resultats').setAttribute('onchange','seepreview();');

        
        
        

        document.getElementsByClassName('valider')[0].textContent = "Modifier la recherche";
        document.getElementsByClassName('valider')[0].setAttribute('onclick','modifier();');
    } else {
        document.getElementsByClassName("mot2final")[0].style = ""; 
        document.getElementsByClassName("mot2final")[0].innerHTML = '<h1 style="text-align: center; color : rgb(229, 57, 53);"> Aucun croisement possible</h1>';
        document.getElementsByClassName('valider')[0].textContent = "Modifier la recherche";
        document.getElementsByClassName('valider')[0].setAttribute('onclick','modifier();');
    }

    }
    
}

function modifier() {
    document.getElementById('saisie1').style = "display : block;";
    document.getElementById('buttonvalider1').style = "display : block;";

    document.getElementById('saisie2').style = "display : block;";
    document.getElementById('buttonvalider2').style = "display : block;";

    document.getElementById("whattodo").textContent = "Commencez par choisir deux mots";
    document.getElementById('buttonvalider1').setAttribute('onclick','tobutton1()');
    document.getElementById('buttonvalider2').setAttribute('onclick','tobutton2()');
    WordsSelected = 0;

    document.getElementsByClassName('valider')[0].textContent = "Valider";
    document.getElementsByClassName('valider')[0].setAttribute('onclick','create();');
    document.getElementsByClassName('valider')[0].style = "display : none;";
    IndexsCaracs = [-1, -1];
    elem = document.getElementById("resultats");
    elem.parentNode.removeChild(elem);

    document.getElementById("saisie1").focus();
    whofocus = "saisie1";
}

function modifytext(lequel) {
    if (WordsSelected != 0) {
        WordsSelected -= 1;
    }
    console.log(WordsSelected);

    
    
    document.getElementById("whattodo").textContent = "Commencez par choisir deux mots";

    id = "saisie" + lequel;
    document.getElementById(id).style = "display : block";
    elem = document.getElementsByClassName("ligne mot" + lequel)[0];
    elem.parentNode.removeChild(elem);
    document.getElementById("buttonvalider" + lequel).textContent = "Ok";
    document.getElementById("buttonvalider" + lequel).style = "background-color : #115099";

    if (lequel == "1") {
        document.getElementById("buttonvalider" + lequel).setAttribute('onclick', 'tobutton1()');
    } else {
        document.getElementById("buttonvalider" + lequel).setAttribute('onclick', 'tobutton2()');
    }
    
    
}



function createit(mot, lequel) {

    if (document.getElementsByClassName("mot" + lequel).length > 0) {
        elem = document.getElementsByClassName("mot" + lequel)[0]
        elem.parentNode.removeChild(elem);
    }

    containere = document.getElementsByClassName("saisiee" + lequel)[0];

    var container = document.createElement('div');
    container.className = "ligne mot" + lequel;

    containere.prepend(container);

    texte = mot
    taille = texte.length;

    for (let i = 0; i < taille; i ++) {
        var btn = document.createElement('button');
        btn.id = lequel + "-"+(i + 1).toString();
        btn.textContent = texte[i];
        btn.setAttribute('onclick','selectcase(this.id);');
        if (i == 0) {
            btn.className = "case case-left";
            //btn.style = "margin-left : 20px"
        } else if (i == taille - 1) {
            btn.className = "case case-right";
        } else {
            btn.className = "case";
        }
        
        container.appendChild(btn);
    }

    document.getElementById("saisie" + lequel).style = "display : none";
    document.getElementById("buttonvalider" + lequel).textContent = "Modifier";
    document.getElementById("buttonvalider" + lequel).style = "background:linear-gradient(90deg, #4776e6 0%,#8e54e9 100% );";
    
    
    

    document.getElementById("buttonvalider" + lequel).setAttribute('onclick','modifytext(' + lequel +')');
    WordsSelected += 1;
    
    console.log(WordsSelected);

    if (WordsSelected == 2) {
        
        document.getElementById("whattodo").textContent = "Cliquez sur les cases sur lesquelles les mots se croisent";
        document.getElementById("whattodo").style.color = "#115099";
        
    }
}




function tobutton1(){


    texte = document.getElementById("saisie1").value.toUpperCase();

    Mots["Mot1"] = texte;


    createit(texte, "1");
    

    

}

function tobutton2(){

    texte = document.getElementById("saisie2").value.toUpperCase();
    Mots["Mot2"] = texte

    createit(texte, "2");
    

}

function seepreview() {
    valeur = document.getElementById("resultats").value;
    mot1 = valeur.split(' ')[0];
    mot2 = valeur.split(' ')[1];

    

    createit(mot1, "1");
    createit(mot2, "2");

    generate();

    lemot2 = document.getElementsByClassName("mot2final")[0];
    console.log(lemot2.childNodes.length)
    urlmot2 = 'https://www.larousse.fr/dictionnaires/francais/' + valeur.split(' ')[1];
    urlmot1 = 'https://www.larousse.fr/dictionnaires/francais/' + valeur.split(' ')[0];
    for (var i = 0; i < lemot2.childNodes.length; i++){
        var btn = lemot2.childNodes[i];
        if (i != IndexsCaracs[1]) { 
            chaine = 'gotolink("' + urlmot2 + '")'
            btn.setAttribute("onclick", chaine);
        } else {
            chaine = 'gotolink("' + urlmot1 + '")'
            btn.setAttribute("onclick", chaine);
        }    
    }
}

function basicfocus(){
    var path = window.location.pathname;
    var page = path.split("/").pop();

    if (page == "croisement.html") {
        whofocus = "saisie1";
    }
    if (page == "index.html") {
        whofocus = "saisie";
    }

}

basicfocus();
